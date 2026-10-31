"""Render a VideoSpec to MP4 — the recommended way to render.

Usage:
    python3 tools/render.py work/my.spec.json out/my-video.mp4 [--frames 0-89] [--concurrency 3] [--draft]

Renders the clean picture with Remotion, then applies the film grain and halftone screen in ffmpeg
(software compositing of full-frame blend modes in Chromium roughly doubles render time; ffmpeg does
the same look in milliseconds). The spec file may be {"spec": {...}} or the bare spec.
--draft renders at half resolution for fast previews.
"""
import argparse
import json
import os
import shutil
import subprocess
import sys
import tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENGINE = os.path.join(ROOT, "remotion")
CHROMIUM = "/opt/pw-browsers/chromium"


def halftone_tile(path: str, w: int, h: int, cell: int) -> None:
    from PIL import Image, ImageDraw

    im = Image.new("L", (w, h), 255)
    d = ImageDraw.Draw(im)
    r = max(1.0, cell * 0.22)
    for y in range(0, h + cell, cell):
        for x in range(0, w + cell, cell):
            cx, cy = x + cell / 2, y + cell / 2
            d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=115)
    im.convert("RGB").save(path)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("spec")
    ap.add_argument("out")
    ap.add_argument("--frames", default=None)
    ap.add_argument("--concurrency", type=int, default=max(1, (os.cpu_count() or 2) - 1))
    ap.add_argument("--draft", action="store_true")
    ap.add_argument("--crf", type=int, default=18)
    a = ap.parse_args()

    data = json.load(open(a.spec))
    spec = data.get("spec", data)
    finish = {"grain": 0.07, "vignette": 0.35, **(spec.get("finish") or {})}
    scale = 0.5 if a.draft else 1.0
    w, h = int(spec["width"] * scale) // 2 * 2, int(spec["height"] * scale) // 2 * 2

    with tempfile.TemporaryDirectory() as td:
        props = os.path.join(td, "props.json")
        json.dump({"spec": spec, "postFinish": True}, open(props, "w"))
        raw = os.path.join(td, "raw.mp4")
        cmd = ["npx", "remotion", "render", "src/index.ts", "MotionVideo", raw, f"--props={props}", f"--concurrency={a.concurrency}", "--crf=14", "--log=error"]
        if a.draft:
            cmd.append("--scale=0.5")
        if a.frames:
            cmd.append(f"--frames={a.frames}")
        if os.path.exists(CHROMIUM):
            cmd.append(f"--browser-executable={CHROMIUM}")
        print("rendering:", " ".join(cmd), file=sys.stderr)
        subprocess.run(cmd, cwd=ENGINE, check=True)

        inputs = ["-i", raw]
        chains = []
        last = "[0:v]"
        grain = float(finish.get("grain") or 0)
        if grain > 0:
            strength = max(1, int(round(grain * 230)))
            chains.append(f"{last}noise=c0s={strength}:c0f=t+u[g]")
            last = "[g]"
        halftone = float(finish.get("halftone") or 0)
        if halftone > 0:
            tile = os.path.join(td, "halftone.png")
            halftone_tile(tile, w, h, max(4, round(w / 210)))
            inputs += ["-loop", "1", "-i", tile]
            chains.append(f"{last}[1:v]blend=all_mode=multiply:all_opacity={min(0.6, halftone * 1.6):.3f}:shortest=1[ht]")
            last = "[ht]"
        os.makedirs(os.path.dirname(os.path.abspath(a.out)) or ".", exist_ok=True)
        if chains:
            filt = ";".join(chains)
            cmd = ["ffmpeg", "-v", "error", "-y", *inputs, "-filter_complex", filt, "-map", last, "-map", "0:a?", "-c:v", "libx264", "-crf", str(a.crf), "-preset", "medium", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", a.out]
            subprocess.run(cmd, check=True)
        else:
            shutil.copy(raw, a.out)
    print(f"done -> {a.out}", file=sys.stderr)


if __name__ == "__main__":
    main()
