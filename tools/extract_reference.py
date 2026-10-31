"""Per-video extraction: cuts, motion metrics, palettes, contact sheets, keyframes, audio beats, transcript.

Usage: python3 -I extract.py <video.mp4> <out_dir>
"""
import json
import os
import subprocess
import sys

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

SAMPLE_FPS = 4          # contact-sheet sampling rate
DENSE_WINDOW = 0.35     # seconds around each cut sampled at every frame
SHEET_COLS, SHEET_ROWS = 5, 3
THUMB_W = 240
CUT_BEFORE, CUT_AFTER = 5, 5   # frames shown either side of a cut (every frame)
CUTS_PER_SHEET = 3
CUT_THUMB_W = 150


def probe(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", path],
                         capture_output=True, text=True, check=True).stdout
    return json.loads(out)


def palette(img_bgr, k=5):
    small = cv2.resize(img_bgr, (64, 64), interpolation=cv2.INTER_AREA).reshape(-1, 3).astype(np.float32)
    _, labels, centers = cv2.kmeans(small, k, None, (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 20, 1.0),
                                    3, cv2.KMEANS_PP_CENTERS)
    counts = np.bincount(labels.flatten(), minlength=k)
    order = np.argsort(-counts)
    return [{"hex": "#%02x%02x%02x" % tuple(int(c) for c in centers[i][::-1]), "share": round(float(counts[i] / counts.sum()), 3)}
            for i in order]


def analyse_frames(path):
    cap = cv2.VideoCapture(path)
    fps = cap.get(cv2.CAP_PROP_FPS) or 30
    prev_gray, prev_hist = None, None
    rows = []
    idx = 0
    while True:
        ok, frame = cap.read()
        if not ok:
            break
        small = cv2.resize(frame, (180, int(180 * frame.shape[0] / frame.shape[1])))
        gray = cv2.cvtColor(small, cv2.COLOR_BGR2GRAY)
        hsv = cv2.cvtColor(small, cv2.COLOR_BGR2HSV)
        hist = cv2.calcHist([hsv], [0, 1], None, [32, 16], [0, 180, 0, 256])
        cv2.normalize(hist, hist)
        r = {"f": idx, "t": round(idx / fps, 4), "luma": round(float(gray.mean()), 2),
             "sat": round(float(hsv[..., 1].mean()), 2)}
        if prev_gray is not None:
            r["diff"] = round(float(np.abs(gray.astype(np.int16) - prev_gray).mean()), 3)
            r["hist"] = round(float(cv2.compareHist(prev_hist, hist, cv2.HISTCMP_BHATTACHARYYA)), 4)
            flow = cv2.calcOpticalFlowFarneback(prev_gray, gray, None, 0.5, 3, 15, 3, 5, 1.2, 0)
            fx, fy = flow[..., 0], flow[..., 1]
            h, w = gray.shape
            ys, xs = np.mgrid[0:h, 0:w]
            cx, cy = xs - w / 2, ys - h / 2
            norm = np.sqrt(cx ** 2 + cy ** 2) + 1e-6
            # scale in px per frame at the 180px-wide analysis size
            r["flow_mag"] = round(float(np.sqrt(fx ** 2 + fy ** 2).mean()), 3)
            r["pan_x"] = round(float(np.median(fx)), 3)
            r["pan_y"] = round(float(np.median(fy)), 3)
            r["zoom"] = round(float(((fx * cx + fy * cy) / norm).mean()), 3)        # + = zoom in / expand
            r["rot"] = round(float(((fy * cx - fx * cy) / norm).mean()), 3)         # + = clockwise
        else:
            r.update(diff=0, hist=0, flow_mag=0, pan_x=0, pan_y=0, zoom=0, rot=0)
        rows.append(r)
        prev_gray, prev_hist = gray.astype(np.int16), hist
        idx += 1
    cap.release()
    return fps, rows


def detect_cuts(rows, fps):
    hist = np.array([r["hist"] for r in rows])
    diff = np.array([r["diff"] for r in rows])
    cuts = []
    min_gap = max(2, int(fps * 0.12))
    for i in range(1, len(rows)):
        lo, hi = max(1, i - 8), min(len(rows), i + 8)
        local = np.median(hist[lo:hi])
        strong = hist[i] > 0.35 and hist[i] > 2.5 * local
        flash = diff[i] > 40 and diff[i] > 3 * (np.median(diff[lo:hi]) + 1)
        if (strong or flash) and (not cuts or i - cuts[-1] >= min_gap):
            cuts.append(i)
    return cuts


def font(size):
    for p in ["/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", "/usr/share/fonts/dejavu/DejaVuSans-Bold.ttf"]:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def grab(path, frame_ids):
    cap = cv2.VideoCapture(path)
    want = sorted(set(frame_ids))
    got, idx, j = {}, 0, 0
    while j < len(want):
        ok, frame = cap.read()
        if not ok:
            break
        if idx == want[j]:
            got[idx] = frame
            j += 1
        idx += 1
    cap.release()
    return got


def make_sheets(frames, labels, out_dir, prefix):
    keys = sorted(frames)
    if not keys:
        return []
    h0, w0 = frames[keys[0]].shape[:2]
    tw, th = THUMB_W, int(THUMB_W * h0 / w0)
    per = SHEET_COLS * SHEET_ROWS
    f = font(18)
    paths = []
    for s in range(0, len(keys), per):
        sheet = Image.new("RGB", (SHEET_COLS * tw, SHEET_ROWS * (th + 24)), (20, 20, 20))
        d = ImageDraw.Draw(sheet)
        for n, k in enumerate(keys[s:s + per]):
            im = Image.fromarray(cv2.cvtColor(frames[k], cv2.COLOR_BGR2RGB)).resize((tw, th))
            x, y = (n % SHEET_COLS) * tw, (n // SHEET_COLS) * (th + 24)
            sheet.paste(im, (x, y + 24))
            d.text((x + 4, y + 2), labels[k], fill=(255, 220, 0), font=f)
        p = os.path.join(out_dir, f"{prefix}_{s // per + 1:02d}.jpg")
        sheet.save(p, quality=85)
        paths.append(os.path.basename(p))
    return paths


def make_cut_sheets(frames, rows, cuts, n, out_dir):
    out = []
    f = font(13)
    for s0 in range(0, len(cuts), CUTS_PER_SHEET):
        group = cuts[s0:s0 + CUTS_PER_SHEET]
        h0, w0 = next(iter(frames.values())).shape[:2]
        tw, th = CUT_THUMB_W, int(CUT_THUMB_W * h0 / w0)
        cols = CUT_BEFORE + CUT_AFTER
        sheet = Image.new("RGB", (cols * tw, len(group) * (th + 20)), (20, 20, 20))
        d = ImageDraw.Draw(sheet)
        for gi, c in enumerate(group):
            for k, i in enumerate(range(c - CUT_BEFORE, c + CUT_AFTER)):
                if i < 0 or i >= n or i not in frames:
                    continue
                im = Image.fromarray(cv2.cvtColor(frames[i], cv2.COLOR_BGR2RGB)).resize((tw, th))
                x, y = k * tw, gi * (th + 20)
                sheet.paste(im, (x, y + 20))
                lab = f"{rows[i]['t']:.2f}s" + (" CUT%d" % (cuts.index(c) + 1) if i == c else "")
                d.text((x + 3, y + 3), lab, fill=(255, 80, 80) if i == c else (255, 220, 0), font=f)
        name = f"cuts_{s0 // CUTS_PER_SHEET + 1:02d}.jpg"
        sheet.save(os.path.join(out_dir, name), quality=85)
        out.append({"sheet": name, "cuts": [{"cut": cuts.index(c) + 1, "t": rows[c]["t"]} for c in group]})
    return out


def audio_analysis(path, out_dir):
    wav = os.path.join(out_dir, "audio.wav")
    r = subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", path, "-vn", "-ac", "1", "-ar", "22050", wav])
    if r.returncode != 0 or not os.path.exists(wav):
        return None
    import librosa
    y, sr = librosa.load(wav, sr=22050)
    if len(y) == 0 or np.abs(y).max() < 1e-4:
        os.remove(wav)
        return {"silent": True}
    tempo, beats = librosa.beat.beat_track(y=y, sr=sr)
    onset_env = librosa.onset.onset_strength(y=y, sr=sr)
    onsets = librosa.onset.onset_detect(onset_envelope=onset_env, sr=sr, units="time")
    strength = onset_env[librosa.time_to_frames(onsets, sr=sr)] if len(onsets) else []
    strong = [round(float(t), 3) for t, s in zip(onsets, strength) if s > np.percentile(onset_env, 97)]
    rms = librosa.feature.rms(y=y)[0]
    res = {"tempo_bpm": round(float(np.atleast_1d(tempo)[0]), 1),
           "beats": [round(float(t), 3) for t in librosa.frames_to_time(beats, sr=sr)],
           "strong_onsets": strong,
           "rms_mean": round(float(rms.mean()), 4)}
    try:
        from faster_whisper import WhisperModel
        model = WhisperModel("small", device="cpu", compute_type="int8")
        y16 = librosa.resample(y, orig_sr=sr, target_sr=16000).astype(np.float32)
        segs, info = model.transcribe(y16, word_timestamps=True, vad_filter=True)
        res["language"] = info.language
        res["transcript"] = [{"start": round(s.start, 2), "end": round(s.end, 2), "text": s.text.strip(),
                              "words": [{"w": w.word.strip(), "s": round(w.start, 2), "e": round(w.end, 2)} for w in (s.words or [])]}
                             for s in segs]
    except Exception as e:  # transcription is best-effort
        res["transcript_error"] = str(e)
    os.remove(wav)
    return res


def motion_chart(rows, cuts, audio, fps, out_path):
    W, H = 1600, 360
    im = Image.new("RGB", (W, H), (255, 255, 255))
    d = ImageDraw.Draw(im)
    dur = rows[-1]["t"] or 1
    flow = np.array([r["flow_mag"] for r in rows])
    diff = np.array([r["diff"] for r in rows])
    def pts(a, color):
        m = max(a.max(), 1e-6)
        xy = [(int(r["t"] / dur * (W - 40)) + 20, H - 30 - int(v / m * (H - 70))) for r, v in zip(rows, a)]
        d.line(xy, fill=color, width=2)
    for b in (audio or {}).get("beats", []):
        x = int(b / dur * (W - 40)) + 20
        d.line([(x, 20), (x, H - 30)], fill=(220, 220, 255))
    pts(diff, (60, 140, 255))
    pts(flow, (255, 120, 0))
    for c in cuts:
        x = int(rows[c]["t"] / dur * (W - 40)) + 20
        d.line([(x, 10), (x, H - 30)], fill=(220, 0, 0), width=2)
    f = font(14)
    for s in range(int(dur) + 1):
        x = int(s / dur * (W - 40)) + 20
        d.text((x - 4, H - 24), str(s), fill=(0, 0, 0), font=f)
    d.text((20, 0), "red=cut  blue=pixel diff  orange=optical-flow magnitude  lavender=music beats   (x = seconds)", fill=(0, 0, 0), font=f)
    im.save(out_path)


def main(src, out_dir):
    os.makedirs(out_dir, exist_ok=True)
    meta = probe(src)
    v = next(s for s in meta["streams"] if s["codec_type"] == "video")
    fps, rows = analyse_frames(src)
    cuts = detect_cuts(rows, fps)
    n = len(rows)
    bounds = [0] + cuts + [n]

    sample_ids = set(range(0, n, max(1, round(fps / SAMPLE_FPS))))
    labels = {}
    shot_mid = []
    for a, b in zip(bounds[:-1], bounds[1:]):
        shot_mid.append((a + b - 1) // 2)
    keyframes = grab(src, shot_mid + list(sample_ids) + [i for c in cuts for i in range(max(0, c - CUT_BEFORE), min(n, c + CUT_AFTER))])

    shots = []
    for si, (a, b) in enumerate(zip(bounds[:-1], bounds[1:])):
        seg = rows[a + 1:b] if b - a > 1 else rows[a:b]
        mid = shot_mid[si]
        mag = [r["flow_mag"] for r in seg] or [0]
        shots.append({
            "shot": si + 1, "start": rows[a]["t"], "end": round(b / fps, 3), "dur": round((b - a) / fps, 3),
            "frames": b - a,
            "mean_flow": round(float(np.mean(mag)), 3), "peak_flow": round(float(np.max(mag)), 3),
            "net_pan_x": round(float(sum(r["pan_x"] for r in seg)), 1), "net_pan_y": round(float(sum(r["pan_y"] for r in seg)), 1),
            "net_zoom": round(float(sum(r["zoom"] for r in seg)), 1), "net_rot": round(float(sum(r["rot"] for r in seg)), 1),
            "mean_luma": round(float(np.mean([r["luma"] for r in seg] or [0])), 1),
            "palette": palette(keyframes[mid]) if mid in keyframes else [],
            "keyframe": f"key_shot{si + 1:02d}.jpg",
        })
        if mid in keyframes:
            cv2.imwrite(os.path.join(out_dir, f"key_shot{si + 1:02d}.jpg"), keyframes[mid], [cv2.IMWRITE_JPEG_QUALITY, 88])

    samp = {k: keyframes[k] for k in sample_ids if k in keyframes}
    for k in samp:
        labels[k] = f"{rows[k]['t']:.2f}s f{k}"
    sheets = make_sheets(samp, labels, out_dir, "sheet")

    trans = make_cut_sheets(keyframes, rows, cuts, n, out_dir)

    audio = audio_analysis(src, out_dir)
    motion_chart(rows, cuts, audio, fps, os.path.join(out_dir, "motion_chart.png"))

    cps = len(cuts) / (n / fps) if n else 0
    summary = {
        "source": os.path.basename(src), "width": v["width"], "height": v["height"], "fps": round(fps, 3),
        "duration": round(n / fps, 3), "frames": n, "aspect": round(v["width"] / v["height"], 3),
        "num_shots": len(shots), "cuts_per_sec": round(cps, 3),
        "avg_shot_len": round(float(np.mean([s["dur"] for s in shots])), 3),
        "median_shot_len": round(float(np.median([s["dur"] for s in shots])), 3),
        "shots": shots, "transition_sheets": trans, "contact_sheets": sheets, "audio": audio,
    }
    json.dump(summary, open(os.path.join(out_dir, "summary.json"), "w"), indent=1)
    with open(os.path.join(out_dir, "per_frame.csv"), "w") as fh:
        keys = list(rows[0].keys())
        fh.write(",".join(keys) + "\n")
        for r in rows:
            fh.write(",".join(str(r.get(k, "")) for k in keys) + "\n")
    print(f"{os.path.basename(src)}: {n} frames, {len(shots)} shots, {len(sheets)} sheets, {len(trans)} cut sheets")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
