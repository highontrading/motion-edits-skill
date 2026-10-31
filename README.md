# motion-edits-skill

A Claude skill for making **high-end motion-graphics videos**: explainers, short-form edits (Reels / Shorts / TikTok), promos, kinetic-type pieces, lyric edits and footage edits with motion graphics. It renders finished MP4s with Remotion in **any aspect ratio**.

The knowledge comes from a frame-level study of **82 professional reference edits**:
- cut detection, frame-by-frame transition strips and optical-flow motion measurement
- palettes, music beat grids and word-timed VO transcripts
- a written shot-by-shot breakdown of every video (`references/breakdowns/`)
- synthesised playbooks for style, motion, transitions, type and colour, script structure, sound and footage editing

## What it can do
- **Standalone motion graphics** from a topic or script: kinetic type, collage cut-outs, UI mockups, charts, counters and procedural textures. No stock assets are needed.
- **Footage edits** from your clips: shot and silence analysis, selects, punch-ins, synced captions, keyword slams, B-roll cards, grading and transitions.
- **Any format**: 9:16, 16:9, 1:1 or 4:5, set per video.
- **Series and variations**: lock a channel "kit" (palette, type, finish, signature transitions), or deliberately vary the style family for unique versions.

## Layout
```
SKILL.md                    entry point: workflow + rules Claude follows
references/
  playbook.md               the high-end rules (read every time)
  engine-spec.md            VideoSpec JSON reference for the engine
  styles/                   style families with example specs
  motion-language.md        measured easing, pacing and sync numbers
  transitions.md            transitions catalogue
  typography-color.md       type and colour systems
  script-structure.md       narrative templates, hooks, clause→scene mapping
  sound-design.md           music, VO, SFX and beat sync
  footage-editing.md        editing user footage with motion graphics
  engine-gaps.md            prioritised list of techniques not yet in the engine
  breakdowns/               82 reference breakdowns + tag taxonomy
remotion/                   the rendering engine (Remotion + React)
tools/                      transcribe, beats, analyze_footage, cutout, render, review_render
```

## Install
**Claude Code (CLI / desktop):** clone into your skills folder:
```bash
git clone https://github.com/highontrading/motion-edits-skill ~/.claude/skills/motion-edits
```
Then install the engine and tool dependencies once:
```bash
cd ~/.claude/skills/motion-edits/remotion && npm install
```
```bash
pip install faster-whisper librosa opencv-python-headless "rembg[cpu]" pillow numpy
```
`ffmpeg` and a Chromium (Remotion downloads one automatically) are also required.

**claude.ai / Claude app:** zip the repo (or just `SKILL.md`, `references/` and `tools/`) and upload it under Settings → Capabilities → Skills. Rendering needs a code-execution environment with Node and ffmpeg.

## Use
Ask in plain language, for example:
- "Make a 35-second 9:16 explainer about why airlines overbook flights, collage style."
- "Here's my voice-over (vo.mp3). Turn it into a high-end motion video for YouTube Shorts."
- "Edit these 4 clips into a 30 s reel with captions, punch-ins and beat-synced cuts, 4:5."
- "Give me 3 different style variations of this script for three channels."

Manual render:
```bash
python3 tools/render.py work/my.spec.json out/my-video.mp4
```
```bash
python3 tools/review_render.py out/my-video.mp4 out/review/
```

## Render speed
Remotion renders in a headless browser, so speed depends on the CPU. On a 4-core cloud container a 25 s 1080×1920 video took about 30 minutes, roughly 2 s per frame. A modern laptop or desktop is several times faster. Use stills and `--draft` (half resolution) while iterating, and render full size once.

## Notes
- The reference videos themselves are **not** in this repo; only their analysis is. Everything the skill produces is original: it learns techniques, never copies creators' branding, characters, end cards or scripts.
- Use only music, SFX, logos, footage and likenesses you own or have licensed.
