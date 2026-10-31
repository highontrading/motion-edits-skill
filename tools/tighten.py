"""Jump-cut tightening: remove dead air from a talking clip, then re-transcribe the result.

Usage:
    python3 tools/tighten.py <clip> <out.mp4> [--min-silence 0.35] [--keep 0.08] [--noise -35] [--words out.words.json]

Silences longer than --min-silence are cut, leaving --keep seconds of breath on each side, so the edit
keeps the rhythm of fast short-form VO (references run ~2.7–3.3 words/s with pauses under 0.5 s).
With --words, the tightened clip is transcribed so captions and word refs match the new timeline.
"""
import argparse
import os
import re
import subprocess
import sys


def silences(path, noise, min_len):
    r = subprocess.run(["ffmpeg", "-v", "info", "-i", path, "-af", f"silencedetect=noise={noise}dB:d={min_len}", "-f", "null", "-"], capture_output=True, text=True)
    s = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", r.stderr)]
    e = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", r.stderr)]
    return list(zip(s, e))


def duration(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path], capture_output=True, text=True).stdout
    return float(out.strip())


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("clip")
    ap.add_argument("out")
    ap.add_argument("--min-silence", type=float, default=0.35)
    ap.add_argument("--keep", type=float, default=0.08)
    ap.add_argument("--noise", type=float, default=-35)
    ap.add_argument("--words", default=None)
    a = ap.parse_args()

    total = duration(a.clip)
    keep, cursor = [], 0.0
    for s, e in silences(a.clip, a.noise, a.min_silence):
        cut_from, cut_to = s + a.keep, e - a.keep
        if cut_to - cut_from > 0.05:
            keep.append((cursor, cut_from))
            cursor = cut_to
    keep.append((cursor, total))
    keep = [(s, e) for s, e in keep if e - s > 0.04]
    sel = "+".join(f"between(t,{s:.3f},{e:.3f})" for s, e in keep)
    subprocess.run(
        [
            "ffmpeg", "-v", "error", "-y", "-i", a.clip,
            "-vf", f"select='{sel}',setpts=N/FRAME_RATE/TB",
            "-af", f"aselect='{sel}',asetpts=N/SR/TB",
            "-c:v", "libx264", "-crf", "17", "-c:a", "aac", "-b:a", "192k", a.out,
        ],
        check=True,
    )
    new = duration(a.out)
    print(f"{total:.2f}s -> {new:.2f}s ({len(keep)} segments, removed {total - new:.2f}s)", file=sys.stderr)
    if a.words:
        subprocess.run([sys.executable, os.path.join(os.path.dirname(os.path.abspath(__file__)), "transcribe.py"), a.out, a.words], check=True)


if __name__ == "__main__":
    main()
