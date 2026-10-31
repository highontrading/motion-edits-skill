"""Turn photos into collage cut-outs (transparent PNGs) — the core asset of the collage-explainer style.

Usage:
    python3 tools/cutout.py <image> [<image> ...] --out remotion/public/cutouts [--model isnet-general-use] [--trim]

Each output is <name>.png with the background removed and (with --trim) cropped to the subject.
Use it in a spec as {"type": "image", "src": "cutouts/<name>.png", "cutout": true}.
Models: isnet-general-use (default, objects), u2net_human_seg (people), birefnet-general (best, slower).
"""
import argparse
import os
import sys

from PIL import Image


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("images", nargs="+")
    ap.add_argument("--out", required=True)
    ap.add_argument("--model", default="isnet-general-use")
    ap.add_argument("--trim", action="store_true")
    a = ap.parse_args()

    from rembg import new_session, remove

    session = new_session(a.model)
    os.makedirs(a.out, exist_ok=True)
    for p in a.images:
        im = Image.open(p).convert("RGBA")
        cut = remove(im, session=session, post_process_mask=True)
        if a.trim:
            bbox = cut.getchannel("A").point(lambda v: 255 if v > 12 else 0).getbbox()
            if bbox:
                pad = 6
                cut = cut.crop((max(0, bbox[0] - pad), max(0, bbox[1] - pad), min(cut.width, bbox[2] + pad), min(cut.height, bbox[3] + pad)))
        name = os.path.splitext(os.path.basename(p))[0] + ".png"
        dst = os.path.join(a.out, name)
        cut.save(dst)
        print(f"{p} -> {dst} ({cut.width}x{cut.height})", file=sys.stderr)


if __name__ == "__main__":
    main()
