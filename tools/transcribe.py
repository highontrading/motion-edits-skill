"""Transcribe a voiceover / footage audio track to word-level timestamps for the engine.

Usage:
    python3 tools/transcribe.py <audio-or-video> <out.json> [--model small] [--language en]

Output: {"language": "en", "duration": 31.2, "words": [{"w": "In", "s": 0.12, "e": 0.3}, ...],
         "segments": [{"s": 0.12, "e": 5.2, "text": "..."}]}
Put the json under remotion/public/ and reference it from a spec as "words": "vo.words.json".
"""
import argparse
import json
import os
import subprocess
import sys
import tempfile


def to_wav(src: str, dst: str) -> None:
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-vn", "-ac", "1", "-ar", "16000", dst], check=True)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("src")
    ap.add_argument("out")
    ap.add_argument("--model", default="small", help="tiny|base|small|medium|large-v3")
    ap.add_argument("--language", default=None)
    a = ap.parse_args()

    from faster_whisper import WhisperModel

    with tempfile.TemporaryDirectory() as td:
        wav = os.path.join(td, "a.wav")
        to_wav(a.src, wav)
        import numpy as np
        import wave

        with wave.open(wav) as w:
            audio = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768.0
            duration = w.getnframes() / w.getframerate()
        model = WhisperModel(a.model, device="cpu", compute_type="int8")
        segs, info = model.transcribe(audio, word_timestamps=True, vad_filter=True, language=a.language)
        words, segments = [], []
        for s in segs:
            segments.append({"s": round(s.start, 3), "e": round(s.end, 3), "text": s.text.strip()})
            for w in s.words or []:
                words.append({"w": w.word.strip(), "s": round(w.start, 3), "e": round(w.end, 3)})

    out = {"language": info.language, "duration": round(duration, 3), "words": words, "segments": segments}
    os.makedirs(os.path.dirname(os.path.abspath(a.out)), exist_ok=True)
    with open(a.out, "w") as fh:
        json.dump(out, fh, indent=1)
    print(f"{len(words)} words, {len(segments)} segments, {duration:.1f}s, language={info.language} -> {a.out}", file=sys.stderr)


if __name__ == "__main__":
    main()
