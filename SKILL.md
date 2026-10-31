---
name: motion-edits
description: Create high-end motion-graphics videos, explainer videos and short-form edits (Reels/Shorts/TikTok/YouTube) as rendered MP4s in any aspect ratio, using a Remotion engine built from frame-level analysis of 82 professional edits. Use when asked to make, design, animate, script, storyboard or edit a motion graphic, explainer, kinetic-typography piece, promo/ad, product or UI demo, lyric/music edit, or a series of such videos for a channel, or to add motion graphics, captions, punch-ins and transitions to the user's own footage.
---

# Motion Edits

This skill produces finished, premium motion videos. It works from four things:
- **rules and numbers** measured frame by frame from 82 reference edits (`references/`)
- **12 style families** to choose and mix from (`references/styles/`)
- a **Remotion engine** (`remotion/`) that renders a JSON **VideoSpec**: one scene per clause, measured easing, momentum cuts, word-synced type, procedural textures and a film finish
- **tools** for voice-over, beats, footage analysis, cut-outs, mattes, rendering and QA (`tools/`)

Two modes, which can be mixed in one video:
- **Standalone motion graphics**: no footage needed. Type, cut-outs, UI mockups, charts, counters, particles and textures carry it.
- **Footage edit**: the user's clips are the backbone. Tighten, punch in, caption, add keyword slams and B-roll cards, put text behind the subject, grade, add transitions.

Any aspect ratio: set `width`/`height` in the spec (9:16 1080×1920 by default; 16:9, 1:1, 4:5 and others all work).

## Read first
1. `references/playbook.md`: **the rules. Read it every time.**
2. `references/engine-spec.md`: every spec field, layer, transition and render command. Read it before writing a spec.
3. `references/styles/README.md`: pick a style family, then read that family's file (its example spec is a good starting point).

Deep dives, when a decision needs them:
- `script-structure.md`: genre templates, hooks, clause → scene → prop rules, worked examples
- `motion-language.md`: easing, frame rates, pacing, sync numbers
- `transitions.md`: 63 transitions with frame counts and how to build each one
- `typography-color.md`: type classes, pairings, sizes, safe zones, palettes, finish amounts
- `sound-design.md`: bed, ducking, SFX placement, beat sync, music-only edits
- `footage-editing.md`: integration modes, punch-ins, montage, captions, two worked footage specs
- `engine-gaps.md`: what the engine still can't do, and workarounds
- `breakdowns/vNN.md` + `breakdowns/_TAXONOMY.md`: shot-by-shot evidence. Grep by tag for a precedent (`grep -l "text-behind-subject" references/breakdowns/*.md`).

A complete worked example (script → scratch VO → spec) is in `remotion/src/specs/examples/zeigarnik.json` (script: `work/zeigarnik.script.txt`).

## Workflow

### 0. Setup (once per environment)
```bash
cd remotion && npm install
```
```bash
pip install faster-whisper librosa opencv-python-headless "rembg[cpu]" piper-tts pillow numpy
```
`ffmpeg` is required. If librosa crashes with a segfault, set `NUMBA_CACHE_DIR=/tmp/numba_cache`.

### 1. Brief
Get these, or choose sensible defaults without stalling:
- topic or message
- platform and aspect ratio
- length (shorts: 20–45 s)
- voice: the user's VO file, a script to voice, or none
- footage or photos
- brand (palette, fonts, logo)
- tone
- how many versions

If the user only gives a topic, write the script yourself.

### 2. Script → clause sheet
Use `script-structure.md`. Hook in the first sentence (8–15 words, shock in the first 3 words) → setup → turn → named principle at 16–40% → proof → antithesis moral → CTA (last 10–14%, ≥2.5 s). Split it into clauses: **one clause = one scene ≈ 6 words ≈ 2–2.8 s**. For each clause, write down:
- the literal **prop or picture** for the noun
- the **keyword**: 1–3 words that become type
- a **device**: badge, counter, UI, chart, doodle, swap, particles
- the **cut into it**

### 3. Voice and timing
- **User VO:** `python3 tools/transcribe.py vo.mp3 remotion/public/<proj>/vo.words.json`
- **No VO yet:** `python3 tools/tts.py script.txt remotion/public/<proj>/vo.wav --speed 1.15 --words remotion/public/<proj>/vo.words.json` gives an offline scratch voice. Tell the user it's a placeholder; their own VO can replace it later, since word refs re-time automatically when it's re-transcribed.
- **Music-led or no VO:** `python3 tools/beats.py music.mp3 remotion/public/<proj>/beats.json`, then set `"beats"` and use `{beat|downbeat|onset: n}` refs and `snap`.
- **Scene starts:** `{"word": "...", "offset": -0.06}` on each clause's first word. Scene word refs resolve in order, but use a multi-word ref ("why writing") when the word also appears just before. Keywords use `sync` or `at: {word}`.

### 4. Look
Pick **one style family** (styles README). Then lock in:
- **palette**: field colours that rotate per scene, plus 1–2 accents with fixed meanings
- **type pairing**: a heavy display voice plus a whisper-weight voice
- **animFps**: 15 for collage/editorial, 12 for rough print, 0 for UI/3D/cinematic
- **finish**: grain + vignette, plus halftone for print looks
- **one signature transition**, repeated, plus 1–3 supporting types

### 5. Assets
- **Footage:**
  - `python3 tools/analyze_footage.py clips/*.mp4 --out work/footage.json --sheets work/sheets`, then **look at the sheets**
  - `tools/tighten.py` removes dead air
  - `tools/matte.py` makes a subject matte for text-behind-subject
- **Photos:** `python3 tools/cutout.py photos/* --out remotion/public/<proj>/cutouts --trim`, then use them as `image` with `cutout: true`. Put type at a lower `z` than the cut-out to tuck it behind.
- **No assets:** type, procedural backgrounds, UI mockups, charts, counters, shapes, particles and `embed`. Write a custom component in `remotion/src/custom/` only when a literal object is essential.
- Only use logos, likenesses, music and SFX the user supplies or has rights to. Learn techniques; never copy a creator's branding, characters, end cards or scripts.

### 6. Write the spec
Write `work/<proj>.spec.json` as `{"spec": {...}}`, starting from the chosen family's example. Assets go under `remotion/public/<proj>/`. Apply the playbook checklist while writing.

### 7. Preview, render, review, fix
1. **Stills first:**
   ```bash
   cd remotion && npx remotion still src/index.ts MotionVideo /tmp/f.jpg --frame=N --props=../work/<proj>.spec.json --scale=0.4
   ```
   Do one per scene (mid-scene frame), tile them, look, and fix overflow, contrast, clutter and empty frames.
2. **Render:**
   ```bash
   python3 tools/render.py work/<proj>.spec.json out/<proj>.mp4
   ```
   Add `--draft` for a half-resolution preview. It applies the grain and halftone finish in ffmpeg, which is much faster.
3. **Review:**
   ```bash
   python3 tools/review_render.py out/<proj>.mp4 out/review/
   ```
   Read the contact sheets and cut strips. Check that cuts sit on clause starts, nothing is unreadable for less than 0.5 s, no dead stretch runs longer than 1.5 s, and nothing has broken (blank layers, black gaps, edge reveals).
4. Fix and re-render. Deliver the MP4 with a short shot list and anything the user should replace (scratch VO, placeholder assets, music).

### 8. Versions and series
- **Variations:** keep the script and vary the style family, palette, type pairing, signature transition, textures and hook device. Render each.
- **Channel series:** lock a kit (palette, type pairing, finish, overlay badge, CTA card, 2–3 signature transitions). Save it in `remotion/src/specs/kits/<channel>.json` and start every episode from it (see `kits/README.md`).

## Defaults when unsure
- **Format:** 1080×1920, 30 fps.
- **Style:** halftone-poster-collage for explainers, native-ui-explainer for business/tech, dark-product-promo for tools.
- **Motion:** `animFps` 15, settle 1.10 (the default), scenes 1.2–2.8 s.
- **Type:** keywords in `impact`/`bebas` at size 18–30, with a `serif-italic` or `script` whisper word. `stitched` badges in a deep accent.
- **Cuts:** `zoom` as the signature, plain `cut` for punch, `flash` or `invert` for reveals, `circle` into the CTA.
- **Finish and audio:** `grain` 0.07, `vignette` 0.35. Music bed at `musicVolume` 0.3 with `duckTo` 0.12.
