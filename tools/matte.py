"""Subject matte for footage → transparent WebM, so type can sit BEHIND the person (text-behind-subject,
seen in 21/82 references).

Usage:
    python3 tools/matte.py <clip> <out.webm> [--start 0] [--duration 4] [--fps 30] [--model u2net_human_seg] [--width 1080]

Writes a VP9 WebM with an alpha channel containing only the subject. In a spec, stack three layers in one
scene: the original clip as `background: {kind: "video"}`, the keyword `text` layer, then
`{"type": "video", "src": "matte.webm", "transparent": true, "muted": true}` on top, with the same
trimStart/start so it lines up. Keep segments short (2–6 s): it processes frame by frame on CPU
(roughly 2–5 frames/s at 720p).
"""
import argparse
import os
import subprocess
import sys
import tempfile

from PIL import Image


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("clip")
    ap.add_argument("out")
    ap.add_argument("--start", type=float, default=0)
    ap.add_argument("--duration", type=float, default=4)
    ap.add_argument("--fps", type=float, default=30)
    ap.add_argument("--width", type=int, default=1080)
    ap.add_argument("--model", default="u2net_human_seg", help="u2net_human_seg (people), isnet-general-use (objects), birefnet-portrait")
    a = ap.parse_args()

    from rembg import new_session, remove

    session = new_session(a.model)
    with tempfile.TemporaryDirectory() as td:
        src = os.path.join(td, "src")
        dst = os.path.join(td, "dst")
        os.makedirs(src)
        os.makedirs(dst)
        subprocess.run(
            ["ffmpeg", "-v", "error", "-ss", str(a.start), "-t", str(a.duration), "-i", a.clip, "-vf", f"fps={a.fps},scale={a.width}:-2", os.path.join(src, "%05d.png")],
            check=True,
        )
        frames = sorted(os.listdir(src))
        for i, name in enumerate(frames):
            im = Image.open(os.path.join(src, name)).convert("RGBA")
            remove(im, session=session, post_process_mask=True).save(os.path.join(dst, name))
            if i % 15 == 0:
                print(f"matte {i + 1}/{len(frames)}", file=sys.stderr)
        subprocess.run(
            ["ffmpeg", "-v", "error", "-y", "-framerate", str(a.fps), "-i", os.path.join(dst, "%05d.png"), "-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p", "-b:v", "4M", "-auto-alt-ref", "0", a.out],
            check=True,
        )
    print(f"done -> {a.out} ({len(frames)} frames)", file=sys.stderr)


if __name__ == "__main__":
    main()
