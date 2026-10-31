"""QA a rendered video: contact sheets (4 fps) + every-frame strips around detected cuts + a motion chart.

Usage:
    python3 tools/review_render.py out/video.mp4 out/review/

This reuses the reference-analysis pipeline so a render can be compared like-for-like with the reference
breakdowns (pacing, cut sync, entrances). Always look at the sheets before delivering a video.
"""
import os
import subprocess
import sys

here = os.path.dirname(os.path.abspath(__file__))

if __name__ == "__main__":
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    subprocess.run([sys.executable, os.path.join(here, "extract_reference.py"), sys.argv[1], sys.argv[2]], check=True)
