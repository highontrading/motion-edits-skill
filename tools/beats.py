"""Beat grid + strong onsets for music-led edits (no VO, or cuts snapped to the beat).

Usage:
    python3 tools/beats.py <music file> <out.json>

Output: {"tempo": 128.0, "beats": [...s], "downbeats": [...s], "onsets": [...s strongest hits], "duration": s}
Use beats/downbeats as scene `start` times (seconds) and onsets for flashes, slams and punch-ins.
The references cut on the VO when there is one and on the beat when there isn't; montages snap to beats.
"""
import json
import os
import sys

import numpy as np

os.environ.setdefault("NUMBA_CACHE_DIR", "/tmp/numba_cache")


def main():
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    import librosa

    y, sr = librosa.load(sys.argv[1], sr=22050, mono=True)
    tempo, beat_frames = librosa.beat.beat_track(y=y, sr=sr)
    beats = librosa.frames_to_time(beat_frames, sr=sr)
    env = librosa.onset.onset_strength(y=y, sr=sr)
    on = librosa.onset.onset_detect(onset_envelope=env, sr=sr, units="frames")
    strong = [float(librosa.frames_to_time(f, sr=sr)) for f in on if env[f] > np.percentile(env, 95)]
    # downbeats: pick the phase (0-3) whose beats carry the most low-frequency energy
    S = np.abs(librosa.stft(y))
    low = S[: int(S.shape[0] * 0.08)].sum(axis=0)
    bf = np.asarray(beat_frames)
    phase = int(np.argmax([low[bf[k::4]].mean() if len(bf[k::4]) else 0 for k in range(4)])) if len(bf) >= 4 else 0
    out = {
        "tempo": round(float(np.atleast_1d(tempo)[0]), 2),
        "beats": [round(float(b), 3) for b in beats],
        "downbeats": [round(float(b), 3) for b in beats[phase::4]],
        "onsets": [round(t, 3) for t in strong],
        "duration": round(len(y) / sr, 3),
    }
    json.dump(out, open(sys.argv[2], "w"), indent=1)
    print(f"tempo {out['tempo']} BPM, {len(out['beats'])} beats, {len(out['onsets'])} strong onsets", file=sys.stderr)


if __name__ == "__main__":
    main()
