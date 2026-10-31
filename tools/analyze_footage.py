"""Analyse the user's own footage before editing it.

Usage:
    python3 tools/analyze_footage.py <clip1> [<clip2> ...] --out footage.json [--sheets DIR] [--no-transcript]

For every clip it reports: size/fps/duration/rotation/audio, shot cuts, silent stretches (for jump-cut
tightening), a per-second motion/brightness profile (to find the energetic moments and dead air),
and the word-level transcript. With --sheets it also writes contact sheets (4 fps) so Claude can look
at the footage before planning the edit.
"""
import argparse
import json
import os
import re
import subprocess
import sys

import numpy as np


def probe(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", path], capture_output=True, text=True, check=True).stdout
    meta = json.loads(out)
    v = next((s for s in meta["streams"] if s["codec_type"] == "video"), None)
    a = next((s for s in meta["streams"] if s["codec_type"] == "audio"), None)
    rot = 0
    if v:
        for sd in v.get("side_data_list", []) or []:
            if "rotation" in sd:
                rot = int(sd["rotation"])
        rot = int(v.get("tags", {}).get("rotate", rot))
    num, den = (v["r_frame_rate"].split("/") if v else ("0", "1"))
    w, h = (v["width"], v["height"]) if v else (0, 0)
    if abs(rot) in (90, 270):
        w, h = h, w
    return {
        "width": w,
        "height": h,
        "fps": round(float(num) / float(den or 1), 3) if v else 0,
        "duration": round(float(meta["format"]["duration"]), 3),
        "rotation": rot,
        "has_audio": a is not None,
    }


def silences(path, noise_db=-35, min_len=0.35):
    r = subprocess.run(["ffmpeg", "-v", "info", "-i", path, "-af", f"silencedetect=noise={noise_db}dB:d={min_len}", "-f", "null", "-"], capture_output=True, text=True)
    starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", r.stderr)]
    ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", r.stderr)]
    return [{"s": round(s, 2), "e": round(e, 2)} for s, e in zip(starts, ends)]


def motion_profile(path, sheets_dir=None, label=""):
    import cv2

    cap = cv2.VideoCapture(path)
    fps = cap.get(cv2.CAP_PROP_FPS) or 30
    prev = None
    per_sec, cuts, thumbs = {}, [], []
    prev_hist = None
    i = 0
    step = max(1, round(fps / 4))
    while True:
        ok, fr = cap.read()
        if not ok:
            break
        small = cv2.resize(fr, (160, int(160 * fr.shape[0] / fr.shape[1])))
        g = cv2.cvtColor(small, cv2.COLOR_BGR2GRAY).astype(np.int16)
        hsv = cv2.cvtColor(small, cv2.COLOR_BGR2HSV)
        hist = cv2.calcHist([hsv], [0, 1], None, [32, 16], [0, 180, 0, 256])
        cv2.normalize(hist, hist)
        sec = int(i / fps)
        d = per_sec.setdefault(sec, {"motion": [], "luma": []})
        if prev is not None:
            d["motion"].append(float(np.abs(g - prev).mean()))
            hd = cv2.compareHist(prev_hist, hist, cv2.HISTCMP_BHATTACHARYYA)
            if hd > 0.4 and (not cuts or i / fps - cuts[-1] > 0.3):
                cuts.append(round(i / fps, 2))
        d["luma"].append(float(g.mean()))
        if sheets_dir is not None and i % step == 0:
            thumbs.append((round(i / fps, 2), cv2.resize(fr, (240, int(240 * fr.shape[0] / fr.shape[1])))))
        prev, prev_hist = g, hist
        i += 1
    cap.release()
    prof = [{"t": s, "motion": round(float(np.mean(v["motion"])) if v["motion"] else 0, 2), "luma": round(float(np.mean(v["luma"])), 1)} for s, v in sorted(per_sec.items())]
    sheets = []
    if sheets_dir is not None and thumbs:
        os.makedirs(sheets_dir, exist_ok=True)
        cols, rows = 5, 3
        th, tw = thumbs[0][1].shape[:2]
        for k in range(0, len(thumbs), cols * rows):
            sheet = np.full((rows * (th + 22), cols * tw, 3), 20, np.uint8)
            for n, (t, im) in enumerate(thumbs[k : k + cols * rows]):
                x, y = (n % cols) * tw, (n // cols) * (th + 22)
                sheet[y + 22 : y + 22 + th, x : x + tw] = im[:th, :tw]
                cv2.putText(sheet, f"{t:.2f}s", (x + 4, y + 16), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 220, 255), 1)
            p = os.path.join(sheets_dir, f"{label}_sheet_{k // (cols * rows) + 1:02d}.jpg")
            cv2.imwrite(p, sheet, [cv2.IMWRITE_JPEG_QUALITY, 85])
            sheets.append(p)
    return prof, cuts, sheets


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("clips", nargs="+")
    ap.add_argument("--out", required=True)
    ap.add_argument("--sheets", default=None)
    ap.add_argument("--no-transcript", action="store_true")
    ap.add_argument("--model", default="small")
    a = ap.parse_args()

    result = []
    for c in a.clips:
        label = os.path.splitext(os.path.basename(c))[0]
        info = probe(c)
        prof, cuts, sheets = motion_profile(c, a.sheets, label)
        entry = {"file": c, **info, "cuts": cuts, "silences": silences(c) if info["has_audio"] else [], "profile": prof, "sheets": sheets}
        if info["has_audio"] and not a.no_transcript:
            tmp = os.path.join("/tmp", f"{label}.words.json")
            subprocess.run([sys.executable, os.path.join(os.path.dirname(__file__), "transcribe.py"), c, tmp, "--model", a.model], check=False)
            if os.path.exists(tmp):
                entry["transcript"] = json.load(open(tmp))
        result.append(entry)
        print(f"{label}: {info['width']}x{info['height']} {info['fps']}fps {info['duration']}s, {len(cuts)} cuts, {len(entry['silences'])} silences", file=sys.stderr)
    json.dump(result, open(a.out, "w"), indent=1)


if __name__ == "__main__":
    main()
