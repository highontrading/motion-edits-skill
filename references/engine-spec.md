# Engine reference: the VideoSpec JSON

The Remotion engine in `remotion/` renders a **VideoSpec**: a JSON description of the whole video. Write the spec, put the assets in `remotion/public/`, then render. Types live in `remotion/src/engine/types.ts`, which is the source of truth when this doc and the code disagree.

```bash
cd remotion
npx remotion render src/index.ts MotionVideo out/video.mp4 --props=../work/spec.json --browser-executable=/opt/pw-browsers/chromium
npx remotion still  src/index.ts MotionVideo out/frame.jpg --frame=120 --props=../work/spec.json
```
`--props` takes a file that contains `{"spec": { ... }}`. Without a local Chromium path, drop `--browser-executable`.

---

## Top level

| field | meaning |
|---|---|
| `width`, `height` | **Required.** 1080×1920 (9:16 Reels/Shorts/TikTok), 1920×1080 (16:9 YouTube), 1080×1080 (1:1), 1080×1350 (4:5 feed), 1440×1800, 3840×2160… Anything works; every size in the engine is relative to frame width. |
| `fps` | 30 by default. Use 24 for a cinematic feel, 60 only for UI/product demos. |
| `duration` | Seconds. Default: last VO word + 0.6 s, or the sum of scene durations. |
| `animFps` | **Stepped animation**: 12 = collage/stop-motion feel (most of the reference library), 15 = a bit smoother, 0 = silky. Cuts stay frame-accurate. A scene can override it. |
| `palette` | `{bg, ink, accent, accent2, paper}`, used as defaults by every layer. |
| `words` | VO word timestamps: an array, or a path under `public/` to the JSON from `tools/transcribe.py`. Enables word refs and `sync`. |
| `audio` | `{vo, music, musicVolume=0.35, duckTo, sfx:[{src, at, volume}]}`. `duckTo` (e.g. 0.12) ducks the music whenever someone is speaking. |
| `overlay` | layers drawn above every scene without camera motion (film-frame border, HUD, vote bar, series badge, logo) |
| `captions` | Persistent subtitle track from `words`: `{enabled, style: pill\|bar\|karaoke\|bold, y, maxWords, color, activeColor, bg, font, size}`. |
| `finish` | `{grain=0.07, vignette=0.35, halftone, scanlines, paper, chroma, letterbox}`. Texture over everything. |
| `scenes` | An ordered list of scenes. |

## Time references (`TimeRef`)
- A number is seconds. For a scene `start` it's absolute; for a layer `at`/`until` it's relative to the scene start.
- `{"word": "exploded"}` is the moment that word is spoken: the first match at or after the scene start, or after the video start for scene `start`. Add `nth`, `offset` (seconds, e.g. `-0.12` so the cut leads the word), or multi-word `"word": "think small"`.
- `{"wordIndex": 42}` points at a word by its index in the transcript.

**Rule from the references:** start each scene ~0.1 s **before** its sentence: `"start": {"word": "Sales", "offset": -0.12}`. Reveal keywords **on** their word.

## Scene

```json
{
  "id": "hook",
  "start": {"word": "In", "offset": -0.1},
  "duration": 2.4,
  "background": {"kind": "paper", "color": "#efe9dc", "gobo": false},
  "transition": {"type": "zoom"},
  "camera": {"settle": 1.1, "settleR": 0.82, "drift": 0.025, "punch": [{"at": {"word": "now"}, "scale": 1.12}], "shake": 0},
  "grade": {"saturation": 1, "drainAt": {"word": "ugly"}, "tint": "#ff660022"},
  "animFps": 12,
  "layers": [ ... ],
  "custom": "MyComponent", "customProps": {}
}
```
- `start` / `duration`: if `start` is missing, the scene follows the previous one. If `duration` is missing, the scene runs until the next scene's start.
- **Camera:** every scene gets an expo-out **settle** from `settle` to 1 (the most consistent pattern in the library; ~1.08–1.15). `drift` is a slow push across the scene. `punch` adds 4-frame punch-ins on words. `pan` takes `[{at, x, y, frames}]` and moves the virtual camera to centre on (x, y)%, for exploring a big collage canvas.
- **`letterbox`**: % of the height per bar. Bars close in over ~7 frames when the value changes between scenes (UI scenes inside bars vs. full-bleed posters, v04 v78).
- **Camera `origin`**: `[x, y]` % is the transform origin for settle and punch moves.
- **Grade:** `drainAt` drains the colour to B/W over 6 frames on a story beat.

### Backgrounds (`background.kind`)
`solid` (with soft top light + noise) · `gradient` · `radial` · `mesh` (animated gradient blobs) · `paper` · `grid` (notebook) · `dots` · `fabric` · `denim` (with stitched border) · `wood` · `concrete` · `studio` (lit wall) · `void` (near-black) · `halftone` · `stripes` · `image` (`src`, `dim`, `blur`, `grayscale`, `drift`) · `video` (`src`, `trimStart`, `muted`, `dim`, `blur`). `gobo: true` adds window-light shadows.

### Transitions (`scene.transition.type`, the cut INTO this scene)
| type | what happens | from |
|---|---|---|
| `cut` | hard cut (the incoming scene still settles) | everywhere |
| `zoom` | **zoom-punch / velocity-matched**: the outgoing zoom ramps ×1.45/frame into the cut at peak speed with blur; the incoming scene starts at 1.18× and settles | v11 v12 v15 v25 v37 |
| `whip-left/right/up/down` | **momentum cut**: both shots share one motion curve; the outgoing accelerates out, the incoming keeps moving the same way and decays; directional blur | v05 v18 v20 v26 |
| `spin` | rotation ramps into the cut, the incoming unwinds | v17 |
| `flash` | 1 white frame, then decays (~55%/frame) | v12 v17 v28 |
| `flash-ramp` | exposure ramps to white over 5 frames, then falls off | v02 v03 v38 |
| `invert` | the first 2 frames of the incoming shot are colour-inverted | v04 v17 v21 v34 |
| `black` | 1–3 black frames | v20 |
| `desat` | the outgoing drains to grey, the incoming colour returns | v06 |
| `focus` | the incoming pulls focus from heavy blur | v24 v26 v29 |
| `glitch` | 3 frames of RGB split + jitter | v16 |
| `circle` | iris opens on the incoming | v08 v25 v35 |
| `ink` | organic blot reveal | v10 v42 |
| `slide` | the incoming card slides over the dimming outgoing | v12 |
| `wash` | a flat colour (`color`) floods the frame for ~4 frames around the cut | v58 v59 v69 |
| `burn` | a warm film-burn / light-leak bloom sweeps across the cut | v69 v81 |
| `strobe` | the incoming shot alternates inverted/normal for 6 frames | v65 v71 |
| `pixel` | the incoming scene appears through random tiles | v35 v46 v58 |
| `flip` | card flip: the outgoing turns edge-on, the incoming turns in | v44 v64 |
| `shrink` | **nested reveal**: needs an `embed` layer in the incoming scene. It starts zoomed so the box fills the frame (showing the previous scene's last frame) and pulls back into its container | v76 v77 v51 |
| `object` | a big blurred object (`src` PNG or a dark disc) crosses and wipes | v05 |
`frames` overrides the default length. `color` applies to flash/black/object.

## Layers
All visual layers share **position** (`x`, `y` = centre in %, `w` = width % of frame, `h` = height % of frame (images/shapes), `rotate`, `z`, `opacity`) and **timing** (`at`, `until`, `exit`: `fade|pop|blur|slide-*`). Default `y` is 40, the upper-middle band, so text stays clear of platform UI. Keep important content between 12% and 78% of the height on 9:16.

### `text`
```json
{"type": "text", "text": "THIS IS THE\nPRATFALL EFFECT", "style": "impact", "size": 14, "y": 38,
 "anim": "words", "sync": true, "accent": ["pratfall", "effect"], "accentColor": "#2bd96b",
 "fx": {"extrude": 10, "extrudeColor": "#0b2a55"}, "underline": "scribble", "highlight": "#e8301c"}
```
- `style`: `impact` (Anton, the default keyword voice) · `grotesk` (Archivo Black) · `clean` (Inter) · `serif` (Playfair) · `serif-italic` (Instrument Serif) · `script` (Caveat) · `marker` · `mono` · `condensed` (Oswald) · `pixel` (VT323).
- `size` is % of frame width; keywords in the references run 12–30. `\n` sets manual breaks; long text auto-wraps, and anything still too wide auto-shrinks to fit.
- `anim`: `pop` · `slam` (lands from 1.45× + blur) · `words` (word-by-word) · `ghost` (grey small → solid) · `focus` (blur → sharp) · `letters` (per-letter tumble) · `typewriter` (`cps`, `leadColor`) · `scramble` · `mask` (L→R wipe) · `rise` (from behind a line) · `none`.
- `karaoke`: the whole text shows in `dimColor` and each word lights up when spoken (needs `sync`) or every `stagger` frames.
- `swap`: `text` holds alternatives separated by ` | `. They hard-swap in place every `stagger` frames, or on their spoken words with `sync` (slot/poster word swaps, list items).
- `sync: true` reveals each word at its VO timestamp (≈2 frames early). Without it, `stagger` sets frames per word (default 3).
- `fx`: `extrude` (3D depth px), `extrudeColor`, `doubled` (same-colour offset copy), `shadow`, `stroke` (outline type), `glow`, `blend` (`difference` for colour-flipping type).

### `badge`
Label badge (`variant`: `stitched` dashed inner border · `solid` · `outline` · `pill` · `tape`), `color`, `textColor`, `size`, `anim`: `wipe|pop|words|typewriter`.

### `image`
`src` (under `public/` or a URL), `cutout: true` (white paper edge + contact shadow, for PNG cut-outs from `tools/cutout.py`), `print: true` (bordered photo print), `shadow`: `soft|hard|long|none`, `anim`: `pop|drop|rise|slide-*|fade|focus|spin-in|stamp`, `float` (bob px), `jitter` (stop-motion px), `grayscale`, `halftone`, `swap: {src, at, glow}` (swap in place on a word with a glow flash), `cycle: {srcs, every=3, until}` (flicker-montage through several images). Extra `anim` values: `swing` (pendulum hang) and `flip` (3D card flip in).

### `video` (the user's footage)
`src`, `trimStart`, `playbackRate`, `volume`/`muted`, `fit`, `punch: [{at, scale=1.12, frames=4, hold}]`, `grayscale`, `card: true` (rounded floating card when `w` is set). With no `w` it fills the frame.

### `shape`
`kind`: `ellipse` (marker circle around a word) · `circle` · `underline` · `scribble` · `arrow` · `cross` · `check` · `bracket` · `line` · `rect` · `burst` (comic starburst). Draws on over `draw` frames, with `color`, `stroke`, `fill`.

### `counter`
`from`, `to`, `duration` (s), `decimals`, `prefix`, `suffix`, `separator`, `mode`: `roll` (expo-out) · `tick` (stepped) · `flip` (split-flap tiles), `style`, `size`, `color`, `fx`.

### `ui`
`kind`: `bubble` (comic speech bubble with `text`) · `search` (types `text`) · `notification` (`label`, `title`, `text`) · `chat` (`messages: [{from: me|them, text, at}]`) · `window` / `dialog` (`title`, `text` typed or `src` image/video) · `prompt` (AI prompt box, typed and sent with a bloom) · `tweet` (`title`, `label`, `text`) · `button` · `progress` (`value`) · `phone` (`src` or typed `text`). `theme`: `light|dark`, `accent`, `cps`.

### `embed`
`scene` (another scene's `id`), `mode`: `last` (frozen on that scene's final frame, the default) or `live`, `radius`, `aspect`, `shadow`. It renders that scene inside the box: the scene becomes a phone screen, TV, post or window. Pair it with `transition: {type: "shrink"}` for nested reveals.

Every positioned layer also takes `blur` (px). Use it for depth-of-field planes, e.g. a huge blurred copy of a word in the foreground.

### `cursor`
`path: [{x, y, t, click}]` (t = seconds in the scene). A click dips the cursor and pulses a ring.

### `chart`
`kind`: `line|area|bar|donut`, `data`, `labels`, `marker: true` (thick hand-drawn black line), `draw` (frames), `color`, `color2`, `showValues`.

### `group`
`layers: [...]` sharing one entrance, `anim`.

## Custom components
If a scene needs something the layers can't express (3D, particles, a bespoke infographic), write a React component in `remotion/src/custom/`, register it in `custom/index.ts`, and reference it with `"custom": "Name"`. It inherits the scene's camera, grade, stepping and transitions. Use `useCurrentFrame()` and the helpers in `engine/lib/motion.ts` (`decay`, `ramp`, `springs`, `curves`), not linear interpolation.

## QA
Run `python3 tools/review_render.py out/video.mp4 out/review/`, then read the sheets and cut strips. Check pacing, overflow, readability, sync and dead frames before delivering.
