---
name: motion-edits
description: Create high-end motion-graphics videos, explainer videos, short-form edits (Reels/Shorts/TikTok) and YouTube videos as rendered MP4s with Remotion, in any aspect ratio. Use when asked to make, design, animate, edit or storyboard a motion graphic, explainer, kinetic-typography piece, promo/ad, product or UI demo, lyric/music edit, or to add motion graphics, captions and transitions to the user's own footage. Built from frame-level analysis of 82 professional reference edits.
---

# Motion Edits

This skill produces finished, premium-looking motion videos. Its knowledge comes from frame-by-frame breakdowns of 82 high-end reference edits: collage explainers, brand-story documentaries, UI/product promos, kinetic lyric edits and footage-led edits. That knowledge is turned into rules, timing numbers and a Remotion engine that renders a JSON **VideoSpec**.

There are two modes. Pick one, or mix them in the same video:
- **Standalone motion graphics**: no footage. Type, cut-outs, UI, charts, textures and transitions carry everything.
- **Footage edit**: the user's clips are the backbone. The skill tightens the edit, adds punch-ins, captions, keyword type, overlays, B-roll cards and transitions, and makes it look like one designed piece.

Any aspect ratio: set `width`/`height` in the spec. Every size in the engine is relative to frame width.

## Files
- `references/engine-spec.md`: **read before writing a spec.** All fields, layers, transitions and render commands.
- `references/playbook.md`: the high-end rules. Pacing, sync, the motion vocabulary with measured numbers, type and colour systems, script structure. **Read every time.**
- `references/styles/`: style families (look, when to use, spec skeleton). Pick one per video.
- `references/transitions.md`, `references/motion-language.md`, `references/typography-color.md`, `references/script-structure.md`, `references/sound-design.md`, `references/footage-editing.md`: deep dives.
- `references/breakdowns/vNN.md`: 82 shot-by-shot reference breakdowns. Grep them by tag (`_TAXONOMY.md`) when you need a precedent for a specific device.
- `remotion/`: the engine. `src/engine/` holds the primitives, `src/custom/` holds bespoke components, `src/specs/` holds example specs.
- `tools/`: `transcribe.py` (VO → word timings), `beats.py` (music → beat grid), `analyze_footage.py` (user clips → shots, silences, transcript, contact sheets), `cutout.py` (photo → transparent cut-out), `matte.py` (footage → alpha subject matte for text-behind-subject), `tighten.py` (remove dead air + re-transcribe), `render.py` (**the way to render**: Remotion + ffmpeg finish), `review_render.py` (render → contact sheets for QA).

## Workflow

### 1. Brief
Find out, or default sensibly without stalling:
- topic or message
- platform and aspect ratio (default 9:16 at 1080×1920)
- length (default 30–45 s for shorts)
- voice-over (provided audio, a script to be voiced, or none: music/text-led)
- footage and photos
- brand colours and fonts
- tone

If the user gives only a topic, write the script yourself (step 2) and go.

### 2. Script and beat sheet
Follow `references/script-structure.md`. The reference formula is **hook (≤1.5 s, a concrete shock or claim) → setup → turn → named principle/payoff → proof ×2 → moral → CTA**. Split the script into **clauses: one clause = one scene = one visual idea**, roughly 1–2.5 s each. For every clause, decide:
- the **literal prop or picture**: the noun made physical
- the **keyword** that becomes giant type: the verb or claim, 1–3 words
- the **device**: badge, counter, UI, chart, doodle, swap
- the **cut into it**: a transition type

### 3. Audio and timing
- **VO file** → run `python3 tools/transcribe.py vo.mp3 remotion/public/vo.words.json`, then set `"words": "vo.words.json"`. Drive scene starts and keyword reveals from word refs. Scenes start ~0.1 s **before** their clause (`offset: -0.12`); keywords land **on** their word.
- **No VO** → use a music bed with `tools/beats.py`. Scenes change on beats or downbeats, slams and flashes land on strong onsets, and montages speed up on the beat grid.
- Leave the music ducked under VO (`duckTo: 0.12–0.18`).

### 4. Style and look
Choose a style family from `references/styles/` that fits the content (see the index there). Fix the **palette**: bg/ink plus one or two accents with fixed meanings (e.g. red = problem, green = money/positive). Choose the **type pairing**: a heavy display voice plus a whisper-weight accent voice. Choose the **finish**: grain always; halftone/paper/scanlines per style. Choose the **animFps**: 15 for collage/editorial (12 for rougher stop-motion), 0 for UI/3D/cinematic.

### 5. Assets
- **User footage** → `python3 tools/analyze_footage.py clips/*.mp4 --out work/footage.json --sheets work/sheets`, then look at the sheets. Pick the best moments, cut the silences, and find where the energy is. See `references/footage-editing.md`.
- **Photos** → make cut-outs with `tools/cutout.py --trim` and use them with `"cutout": true`.
- **No assets** → build the frames from type, procedural backgrounds, UI mockups, charts, counters, doodles and shapes. The engine needs no stock files. Generate simple SVG props in a custom component when a literal object is essential.
- Only use logos, brand marks or people's likenesses the user supplies or has the rights to. Never imitate a specific creator's branded intro or end card.

### 6. Write the spec
Write it to `work/<name>.spec.json` as `{"spec": {...}}`, following `references/engine-spec.md`. Apply the **high-end checklist**:
1. A new background/set **and** a new focal object every scene. Never two consecutive scenes with the same composition.
2. Every scene opens with a settle (default), and roughly every third cut is a *motion* cut (zoom, whip, spin) whose exit ramps into the cut. The rest are hard cuts, flashes, iris or object wipes. Vary them, but keep 2–4 types per video.
3. On-screen type = keywords only (or a separate subtitle track). Keywords are 12–30% of frame width in the display face, with one accent colour.
4. At least one "physical" device per 3 scenes: a cut-out with shadow, a stitched badge, a doodle circling a word, a UI element, a counter, a swap.
5. One accent colour per scene, a dominant hue per scene, and the hue changes on every cut.
6. Grain on everything. Halftone or paper texture for editorial and collage styles.
7. Safe zones for 9:16: key content between y 12–78%, x 6–94%.
8. CTA scene: 3–5 s, the simplest composition in the video.

### 7. Render, review, fix
1. Render 3–5 stills at key frames (`npx remotion still … --frame=N`) and look at them. Fix overflow, contrast, empty frames and clutter.
2. Render the MP4.
3. Run `python3 tools/review_render.py out/video.mp4 out/review/` and read the contact sheets and cut strips. Check that cuts land on clauses, that nothing is unreadable for less than 0.5 s, and that no scene is static for more than 1.5 s without a new event.
4. Fix, re-render, and deliver the MP4 path plus a short shot list.

### 8. Variations and series
When asked for several videos or versions, vary on purpose:
- the style family
- the palette
- the type pairing
- the transition set
- the background textures
- the hook device

Keep the script structure. For a channel series, lock a **series kit** (palette, type pairing, finish, CTA card, 2–3 signature transitions) and save it as a JSON snippet in `remotion/src/specs/kits/` so every episode matches.

## Defaults when unsure
9:16 at 1080×1920, 30 fps, `animFps` 15 for collage/explainer or 0 for UI/product, `grain` 0.07, `vignette` 0.35. Keywords use `impact` at size 14–24 with `anim: "slam"` or `"words"`. Labels use `stitched` badges in a deep accent. Scene length is 1.2–2.5 s. Cuts: `zoom` for momentum, `cut` for punch, `flash` for reveals, `circle` for the CTA.
