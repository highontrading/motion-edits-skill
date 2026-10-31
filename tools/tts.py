"""Scratch voice-over from a script (offline Piper TTS) + word timings, so a video can be fully VO-synced
before the user records (or supplies) the real voice. Swap in the real VO later: re-run transcribe.py on it
and the spec's word refs re-time automatically.

Usage:
    python3 tools/tts.py script.txt remotion/public/vo.wav [--voice en_US-ryan-high] [--speed 1.12] [--words remotion/public/vo.words.json]

--speed > 1 speaks faster. The references run ~2.6 words/s overall and ~3.1 while talking (median), so
1.1–1.2 suits short-form. Voices download once from huggingface.co/rhasspy/piper-voices into
~/.cache/piper (e.g. en_US-ryan-high, en_US-lessac-high, en_GB-alan-medium, en_US-amy-medium).
"""
import argparse
import os
import subprocess
import sys
import urllib.request

CACHE = os.path.expanduser("~/.cache/piper")


def ensure_voice(name: str) -> str:
    lang, speaker, quality = name.split("-")
    base = f"https://huggingface.co/rhasspy/piper-voices/resolve/main/{lang.split('_')[0]}/{lang}/{speaker}/{quality}/{name}"
    os.makedirs(CACHE, exist_ok=True)
    model = os.path.join(CACHE, f"{name}.onnx")
    for suffix in (".onnx", ".onnx.json"):
        dst = os.path.join(CACHE, name + suffix)
        if not os.path.exists(dst):
            print(f"downloading {name}{suffix}", file=sys.stderr)
            urllib.request.urlretrieve(base + suffix, dst)
    return model


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("script")
    ap.add_argument("out")
    ap.add_argument("--voice", default="en_US-ryan-high")
    ap.add_argument("--speed", type=float, default=1.12)
    ap.add_argument("--words", default=None)
    ap.add_argument("--pause", type=float, default=0.18, help="seconds of silence between sentences")
    a = ap.parse_args()

    text = open(a.script).read().strip() if os.path.exists(a.script) else a.script
    model = ensure_voice(a.voice)
    raw = a.out + ".raw.wav"
    subprocess.run(
        [sys.executable, "-m", "piper", "-m", model, "-f", raw, "--length-scale", f"{1 / a.speed:.3f}", "--sentence-silence", str(a.pause)],
        input=text.encode(),
        check=True,
    )
    # trim leading silence so the first word lands at ~0.05 s (house rule: VO starts on frame 0)
    subprocess.run(
        ["ffmpeg", "-v", "error", "-y", "-i", raw, "-af", "silenceremove=start_periods=1:start_threshold=-45dB,adelay=50|50,loudnorm=I=-16:TP=-1.5:LRA=11", "-ar", "44100", a.out],
        check=True,
    )
    os.remove(raw)
    print(f"voice-over -> {a.out}", file=sys.stderr)
    if a.words:
        subprocess.run([sys.executable, os.path.join(os.path.dirname(os.path.abspath(__file__)), "transcribe.py"), a.out, a.words], check=True)


if __name__ == "__main__":
    main()
