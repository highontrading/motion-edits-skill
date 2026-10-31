# Engine gaps: what the references need, and what the engine already does

A prioritised build list for `remotion/src/engine/`. It compares every "Remotion rebuild recipe" in the 82 breakdowns (plus the motion, transition and lessons sections) against the engine. The first pass was made at commit `f772e1b`, which added `embed`/`shrink`, `wash`/`burn`/`strobe`/`pixel`/`flip` cuts, `karaoke`/`swap` text, `swing`/`flip`/`cycle` images, `ui: bubble`, `scene.letterbox`, `spec.overlay`, `Pos.blur` and `camera.origin`. Since then the engine has also shipped: the `particles` layer; `tilt`/`tiltTo`, `depth`, `loop` and `smooth` on every positioned layer; `camera.focus` (rack focus), `camera.parallax`, `camera.rotate`, `camera.exit`, `pan[].curve`/`blur`; `zoom` `target`/`peak`; `dissolve` (`through`), `wipe` (`shape`, `direction`) and `iris-close` cuts; `circle` `at`; text `weight`, `lineSizes`, `fill` and eight more type styles; badge `anim: "swap"`; `video` `aspect`, `anim` and `transparent` (with `tools/matte.py`); `scene.snap`, beat TimeRefs and the music fields (`musicStart`, `musicFadeOut`, `musicLoop`, smooth ducking). The status column below reflects that. When the code and this doc disagree, `types.ts` wins.

**How counts were made.** "Videos" is the number of the 82 references whose breakdown mentions the technique, found by keyword search over all sections and then checked by reading the matches. Treat each count as ±3. Example ids are the clearest instances.

**Priority rule** (the priority is the original build priority; DONE rows keep it for reference)
- **P0**: in more than 25% of videos (21 or more), and missing, or present only in a form that can't express the common case.
- **P1**: in 10–25% of videos (8–20), missing or partial.
- **P2**: in fewer than 10% of videos (7 or fewer), or already covered apart from small tweaks.

**Status**: **DONE** = a spec field covers the common case (the field is named; refinements still open are listed in "Still open"). **PARTIAL** = a field exists but misses measured behaviour that matters. **OPEN** = no field; the only route is a `custom` component or a manual workaround.

---

## 1. The table

| # | Component / technique | Videos | Example ids | Engine today (field) | Status | Still open | Pri |
|---|---|---|---|---|---|---|---|
| 1 | **Ambient particles & sparkles** (4-point twinkles, dust, embers, falling coins/leaves, pixel sparkles) | 41 (50%) | v04 v26 v31 v46 v54 v66 v68 v77 | `{"type": "particles", "kind": "dust\|sparkle\|embers\|bokeh\|confetti\|snow", count, color, size, speed, seed, opacity, area}` | **DONE** | sprite/coin PNGs, one-shot `burstAt`, depth tiers, pixel sparkles | P0 |
| 2 | **3D perspective tilt** of UI planes, cards, type and the camera (rotateX/Y, orbit) | 35 (43%) | v01 v07 v52 v57 v76 v77 v80 v83 | `tilt: [rotX, rotY]` + `tiltTo` (linear drift over the layer's life) on every positioned layer | **DONE** (layers) | camera-plane tilt, rotateZ in the tilt, idle `orbit`, `tilt-in` entrance, eased/timed `tiltTo` keys | P0 |
| 3 | **Per-layer depth parallax** (layers move at different rates under one camera) | 34 (41%) | v22 v37 v44 v56 v66 v77 v80 | layer `depth` (<1 far, >1 near) + `camera.parallax` (default 60) | **DONE** | `background.depth` | P0 |
| 4 | **Zoom-through into a target** (push into a screen/card/door/word, cut at peak) | 33 (40%) | v02 v07 v20 v39 v53 v57 v62 v73 | `transition: {type: "zoom", target: [x, y], peak: 3–6}` | **DONE** | `<Freeze>` during peaks > ×3, peak `flash`; the reverse `dive` (§4.3) | P0 |
| 5 | **Text behind subject** (type sandwiched between a plate and a foreground matte) | 30 (37%) | v01 v09 v39 v41 v44 v45 v73 v74 v77 | cut-out PNG at a higher `z` (stills); `video` `transparent: true` + `tools/matte.py` stacked by hand over the text (footage) | **PARTIAL** | `foreground: {src, z}` sugar that keeps plate and matte locked (§3.5) | P0 |
| 6 | **Rack focus / animated depth of field** mid-shot | 25 (30%) | v03 v24 v26 v44 v56 v75 v81 | `camera.focus: [{at, depth, frames}]` blurs layers by their `depth` distance (~16 px per depth unit); static `blur` | **DONE** | configurable DOF slope (`dof`), blur cap, 2 px blur snapping | P0 |
| 7 | **Word swap in a container** (pill/badge/bar that resizes to the new word; push/blur swap styles) | 23 (28%) | v06 v33 v47 v63 v65 v69 v75 v76 v77 | text `anim: "swap"` and badge `anim: "swap"` (`"A \| B \| C"`, by `stagger` or `sync`); the badge snaps to each word's width | **PARTIAL** | spring width animation, `swapStyle` (push-up / blur / fade), explicit swap times, `growFrom` | P0 |
| 8 | **Persistent overlay frame** (film-edge border, viewfinder brackets, showcase poster around a content window, vote bar) | 20 (24%) | v41 v42 v65 v74 v75 v78 v81 v82 | `spec.overlay` layers (no camera; `at`/`until` are absolute) | **PARTIAL** | content-window `frame.inset`, ready-made `chrome` kinds, per-scene ranges by id | P1 |
| 9 | **Orbit / carousel / vortex arrays** (thumbnails or icons on a ring, spiral, sliding row, card deck) | 20 (24%) | v02 v06 v12 v20 v52 v57 v71 v79 v83 | none | **OPEN** | the whole `array` layer (§4.2) | P1 |
| 10 | **Nested-reveal zoom** (scene shrinks into a container in the next scene, or the camera dives into a screen whose content becomes the next scene) | 18 (22%) | v04 v12 v16 v37 v69 v76 v77; dive: v01 v60 v80 | `embed` layer (`scene`, `mode: last\|live`) + `transition: {type: "shrink"}` | **PARTIAL** | `dive` (the reverse), `mode: "continue"`, joint flash | P1 |
| 11 | **Pendulum hang** (props on strings swing in, then sway) | 17 (21%) | v06 v08 v12 v19 v37 v50 v67 v68 v70 | image `anim: "swing"` (fixed 28°, 1.1 s) + `loop: "sway"` (fixed ±2.5° idle) | **PARTIAL** | parametric `swing: {amp, period, decay, pivot, idle, string}` | P1 |
| 12 | **Pixel / tile dissolve** (scene or layer built from or broken into tiles) | 14 (17%) | v10 v45 v55 v58 v69 v70 | `pixel` cut (9-column random mask, scene-level only) | **PARTIAL** | `cell`, `colors`, `order`; layer-level `anim`/`exit: "pixel"` | P1 |
| 13 | **Light leak / film burn** | 14 (17%) | v03 v34 v74 v75 v78 v81 | `burn` cut overlay (`color`) | **PARTIAL** | `origin`, `color2`, `hold`; in-shot `leak` layer | P1 |
| 14 | **Karaoke paragraph** (whole text dim, words light up as spoken) | 14 (17%) | v04 v28 v51 v76 v77 v81 v82 | text `anim: "karaoke"` + `dimColor` (instant switch with a short glow) | **PARTIAL** | `karaokeFade`, `spokenColor`, line unit, `follow` scroll | P1 |
| 15 | **Text filled with gradient / halftone / image / video** | 14 (17%) | v03 v07 v15 v20 v23 v55 v68 v80 v82 | text `fill`: a CSS gradient string or an image `src` (`background-clip: text`) | **DONE** | video fill, procedural halftone fill, fill + `fx.extrude` together | P1 |
| 16 | **Marquee / scrolling type band** | 14 (17%) | v03 v17 v64 v76 v77 v78 | none (manual: a long `text` + `camera.pan`) | **OPEN** | `marquee` (§4.9) | P1 |
| 17 | **Handwriting write-on** (script text drawn letter by letter) | 12 (15%) | v08 v13 v14 v15 v44 v76 v81 | `script`/`marker`/`signature` fonts with generic anims (`letters`, `mask`) | **OPEN** | `anim: "write"` (§4.10) | P1 |
| 18 | **Flip-book flicker montage** (content swaps every 2–6 frames inside a fixed frame) | 12 (15%) | v03 v16 v54 v65 v75 | image `cycle: {srcs, every, until}` (fixed interval, images only) | **PARTIAL** | per-swap `durations`, video clips, flash between swaps | P1 |
| 19 | **Colour-sweep / bar wipe** (feathered colour band, blinds, twin bars) | 11 (13%) | v12 v13 v47 v58 v60 v71 v74 v76 | `wash` (flat full-frame flood); `wipe` with `shape: line\|diagonal\|split` and `direction` (hard edge; `slab` renders as `line`) | **PARTIAL** | feathered `sweep`, `blinds`, a coloured seam/bar; see the `wipe` bug note in §1.1 | P1 |
| 20 | **Speech bubble** (comic, with a tail aimed at a speaker) | 11 (13%) | v04 v22 v23 v28 v41 v48 v69 | `ui` `kind: "bubble"` (fixed tail, Inter 800) | **PARTIAL** | `tail` target, bubble shapes, font choice, grow-from-tail | P1 |
| 21 | **Card flip with a back face** | 10 (12%) | v20 v30 v44 v57 v64 v82 | `flip` cut and image `anim: "flip"` (edge-on to flat, no back face) | **PARTIAL** | a real two-sided `flip: {at, back}` (§4.14) | P1 |
| 22 | **Animated letterbox** (bars close or open on a cut; band scenes) | 9 (11%) | v04 v77 v78 v79 v80 | `scene.letterbox` (% per bar); bars animate whenever the value changes between scenes (close or open), decay r = 0.5 | **DONE** | `{top, bottom, color}` bands, `letterboxFrames`, a mid-scene change | P1 |
| 23 | **Text-selection highlight** (selection fill + drag handles on chosen words) | 9 (11%) | v29 v52 v55 v59 v75 v76 v79 v81 | `highlight` bar behind the whole layer | **OPEN** | `select` (§4.16) | P1 |
| 24 | Magnifier / loupe callout | 7 (9%) | v08 v11 v25 v50 v53 v56 | none | **OPEN** | | P2 |
| 25 | Text on a path (ring, arc, spiral) | 8 (10%) | v05 v23 v78 v82 | none | **OPEN** | | P2 |
| 26 | Shape morph (pill → bar, orb → avatar) | 8 (10%) | v52 v56 v62 v75 | none (badge `swap` snaps width without a tween) | **OPEN** | | P2 |
| 27 | Invert strobe (alternating negative frames) | 5 (6%) | v56 v65 v71 v79 | `strobe` cut (`frames`) | **DONE** | `pattern`, mid-shot strobe | P2 |
| 28 | Slot-reel word (vertical list spins, lands on the target) | 4 (5%) | v16 v29 v52 | `counter` roll (numbers only); text `anim: "swap"` (hard swaps) | **PARTIAL** | `anim: "reel"` | P2 |
| 29 | Multi-plane DOF type (huge blurred foreground copy of a word) | 4 explicit (5%) | v06 v74 v75 v81 | `blur` + `z` + `depth` (+ `camera.focus`) | **DONE** | | P2 |
| 30 | Redaction box → text | 4 (5%) | v07 v56 v71 | none | **OPEN** | | P2 |
| 31 | Torn-paper tear-open reveal | 3 (4%) | v42 v62 v66 | `ink` cut (smooth edge) | **PARTIAL** | `tear` | P2 |
| 32 | Emoji/icon substituted for a letter inside a word | 1 (1%) | v59 | none | **OPEN** | | P2 |

**OPEN list (no field yet):** #9 orbit/carousel arrays · #16 marquee · #17 handwriting write-on · #23 text selection · #24 magnifier · #25 text on a path · #26 shape morph · #30 redaction · #32 glyph-to-icon. **PARTIAL (field exists, refinements open):** #5 #7 #8 #10 #11 #12 #13 #14 #18 #19 #20 #21 #28 #31.

Things the references use that the engine **already covers** (no work needed): stepped 12 fps animation (with `smooth` layers inside stepped scenes), expo-out settle, zoom/whip/spin/flash/invert/glitch/ink/circle/wash/burn/strobe/pixel/flip/dissolve/wipe/iris-close cuts, camera `exit` ramps, `rotate` rolls and `pan` curves with blur, cut-outs with paper edge, halftone/grain/vignette finish, typewriter/scramble/mask/rise/karaoke/swap type, extrude/stroke type, gradient/image fills, per-line sizes, highlighter bar, marker ellipse/underline/arrow draw-ons, counters incl. split-flap, chat/notification/prompt/window/bubble UIs, cursor paths, punch-ins, idle `loop`s (bob, sway, pulse, breathe, blink), beat-snapped scene starts.

### 1.1 Engine issues found in the consistency pass: all fixed
`wipe` direction, `slab`/`diagonal` with `direction`, the `dissolve` `through` colour dip, `iris-close` reopening from `at`, `wash`/`burn` honouring `frames`, shape `fill` timing, negative-`z` layers, no-VO duration, and `ui` sizes scaling with `w` were all fixed and verified with test renders.

---

## 2. Render-cost rules for every new component

Headless Chromium usually renders on the CPU (SwiftShader), so every pixel an effect touches costs time. The current engine is fast because it follows these rules. Keep to them:

1. **Animate only `transform` and `opacity` per frame.** Position, scale, rotation and 3D are cheap. Changing `width`/`height`/`left` triggers layout. Changing `filter` re-rasterises the element.
2. **No per-frame full-frame SVG filters.** That includes `feTurbulence`, `feDisplacementMap`, `feComponentTransfer` and `feGaussianBlur` on the whole frame. Bake textures once into data-URI tiles (`fx/noise.ts` shows how) or ship PNG/WebM assets.
3. **No full-frame `mix-blend-mode` for more than ~12 frames.** A short overlay like `burn` is fine. A persistent leak or overlay must use normal blending with pre-lightened colours, or a pre-rendered asset.
4. **Blur budget.** No more than 2 elements per frame with a changing blur, at most 20 px at 1080 w. Snap animated blur to 2 px steps so identical frames hit the cache. For a huge blurred element, render it at 50% size with half the blur radius, then `scale(2)`. The cost drops ~4×.
5. **Masks must be static.** A `mask-image`/`clip-path` with a fixed image or simple shape is cheap. A video used as a mask is expensive, because each frame uploads a new mask texture. Use pre-keyed alpha video instead (§3.5).
6. **Measure text with `@remotion/layout-utils` `measureText` inside `useMemo`**, never with `getBoundingClientRect` during render. It is deterministic and does no per-frame layout.
7. **Deterministic randomness only**: `rand(seed)` from `lib/motion.ts`, never `Math.random()`.
8. **Respect `Stepped`**. New components read `useCurrentFrame()` inside the scene, so they automatically step at `animFps`. Don't bypass it with `useVideoConfig`-derived clocks.
9. **Cap DOM node counts**: ≤ 80 particles, ≤ 400 tiles, ≤ 24 array items per layer.
10. **Don't scale DOM text past ×3 for more than 2 frames.** Chromium re-rasterises scaled text at the new size. Freeze the content (`<Freeze>`) during big zooms so only the transform changes.

---

## 3. P0 specs

### 3.1 Particles layer (#1: 41 videos)

> **Status: DONE** as `{"type": "particles", "kind": "dust|sparkle|embers|bokeh|confetti|snow", "count", "color", "size", "speed", "seed", "opacity", "area": [x, y, w, h], "z"}` (`size`/`speed` are multipliers). **Still open** from the proposal below: `sprite`/`coins`/`pixels` kinds with a PNG `src`, colour arrays, `direction`, `life`, one-shot `burstAt` and `depths` tiers.

Lessons v31 ("give every still one live element") and v46 ("pixel sparkles give a flat demo a designed finish") make particles the cheapest secondary motion. The original proposal:

```ts
export type ParticlesLayer = Pos & Timing & {
	type: 'particles';
	kind: 'sparkle' | 'dust' | 'embers' | 'bokeh' | 'confetti' | 'coins' | 'pixels' | 'sprite';
	/** sprite image for 'sprite' | 'coins' (PNG under public/) */
	src?: string;
	/** default per kind (table below); hard cap 80 */
	count?: number;
	color?: string | string[];
	/** min/max particle size in % of frame width */
	size?: [number, number];
	/** spawn box in % of frame (default = the layer box from x/y/w/h) */
	area?: {x: number; y: number; w: number; h: number};
	direction?: 'up' | 'down' | 'out' | 'none';
	/** travel in % of frame height per second */
	speed?: number;
	/** frames per particle life cycle (loops with a per-particle phase) */
	life?: number;
	/** one-shot burst on a word instead of a loop */
	burstAt?: TimeRef;
	/** depth tiers, e.g. [0.6, 1, 1.8]: each particle picks one; sets size ×, blur and parallax (§3.3) */
	depths?: number[];
	seed?: number;
};
```

**Rendering.** One absolutely positioned `div` per particle, with only `transform` and `opacity` changing. Each particle's phase, position, size and depth tier come from `rand(seed + i·k)`, and its local frame is `(f + phase) % life`. Sprites are cached:
- `sparkle`: an SVG data URI of a 4-point star path.
- `bokeh`: a `radial-gradient` disc with the softness baked into the gradient. Don't use `filter: blur`.
- `pixels`: plain squares.
- `coins`: the given PNG with a `rotateY` spin.

For depth tiers, blur each tier once (a static filter on the tier's wrapper), not each particle.

**Timing defaults (measured)**

| kind | count | life / motion | source |
|---|---|---|---|
| sparkle | 6–12 near the hero | scale 0 → 1 → 0 over 10–15 f with ±15° rotation; burst uses spring `{damping 10, stiffness 180}`; idle twinkle ±8% every 20 f | v04 v26 |
| pixels | 12 within ~28% FW (300 px) of the target | 4 f on with a scale pop, then fade over 9 f | v46 |
| embers | 20–40 | rise 30–60 px over the life (~45 f), fade at the top | v68 v54 |
| dust | ~30 specks, 1–3 px | drift 0.2–0.5 px/f, opacity flicker every 2–3 f | v10 v31 v80 |
| coins / confetti | 12–24 | fall at 3 depth tiers: size ×0.6/1/1.8, blur 4/0/12 px, random spin | v77 |
| bokeh | 6–10 | 1–3 px/f drift, opacity 0.15–0.35 | v04 v76 |

**Pitfalls.** No per-particle `filter` or `box-shadow` glow: bake the glow into the sprite gradient. At 12 fps stepping, particle motion should still read as drift, so keep `speed` at or below 4% of frame height per second for ambient kinds.

### 3.2 3D tilt: layers and camera (#2: 35 videos)

> **Status: DONE for layers** as `tilt: [rotateX, rotateY]` and `tiltTo: [rotateX, rotateY]` (a linear drift across the layer's lifetime, perspective 1200 px at 1080 w) on every positioned layer. **Still open:** rotateZ and `perspective` inside the tilt, timed/eased `tiltTo` keys, idle `orbit`, camera-plane tilt and the `tilt-in` entrance.

The common case is a flat UI or card set on a tilted plane with slow 3D drift. Lessons: v80 "tilt the UI plane 15–40° and blur near/far"; v83 "never show a flat screenshot".

```ts
export type Tilt = {
	/** degrees */
	x?: number; // rotateX: + tips the top away
	y?: number; // rotateY
	z?: number; // rotateZ (roll)
	/** px at 1080 w, default 1200 */
	perspective?: number;
};

// on Pos (every positioned layer)
tilt?: Tilt;
/** animate to new tilt values; holds the last one */
tiltTo?: {at: TimeRef; frames?: number; curve?: 'glide' | 'settle' | 'accelerate'; tilt: Tilt}[];
/** idle 3D sway: ±amp degrees on Y (and amp/2 on X), period in seconds */
orbit?: {amp: number; period: number};

// on Camera (the whole scene plane, applied with preserve-3d)
tilt?: Tilt;
tiltTo?: Pos['tiltTo'];

// new ImageAnim / UI anim
| 'tilt-in' // enters from rotateX 25°, rotateY −20°, settles flat-ish to its `tilt`
```

**Rendering.**
- Layer tilt goes on the inner wrapper as `perspective(P) rotateX() rotateY() rotateZ()`. Using the function form means the parent doesn't need `transform-style: preserve-3d`. Order it after the entrance transform.
- Camera tilt sets `perspective` on the scene root and `transform-style: preserve-3d` on the camera container, and appends `rotateX/rotateY` to the existing camera transform.
- Increase the background bleed by `1 / cos(max(|x|, |y|))` so edges never show.
- `tiltTo` uses `curves.glide` (symmetric) by default, or `settle` (expo-out) for snaps.

**Timing defaults (measured)**
- Static UI planes: rotateX 6–18°, rotateY −8 to −18°, rotateZ −4 to −8°, perspective 800–1400 px. v01 and v07 use rotateX 18 / rotateZ −4…−8; v57 uses rotateY −18 / rotateX 6; v80 uses 1400 px.
- Floor or "printed on a surface" type: rotateX 55–70° (v16, v34).
- Slow orbit: ±8° over 1.2 s (v76).
- Perspective swing: rotY 0 → −14°, rotX 0 → 6° over 14 f, `bezier(0.6,0,0.4,1)` (v52).
- Carousel truck: rotateY 0 → −18° over 28 f, `bezier(0.45,0,0.55,1)` (v83).
- 3D exit: rotateX 0 → 25° and rotateY 0 → −20° with a translate, ease-in into the cut (v75).
- Pair the plane with DOF: blur the far edge 4–8 px (§3.3).

**Pitfalls.**
- Never put `backdrop-filter` (glass cards) inside a 3D-transformed parent. It is very slow in SwiftShader and renders wrong. Fake glass with a semi-opaque gradient plus a static pre-blurred copy of the background.
- Text on planes tilted more than 60° aliases. Add `-webkit-font-smoothing: antialiased` and keep a type size of at least 4% FW.
- Chromium forces `preserve-3d` flat on any element that also has `filter`, `overflow: hidden`, `opacity < 1`, `clip-path` or `mask`. The camera container carries `filter` (grade, blur), and the scene root carries `clipPath`/`maskImage` during circle, ink and pixel cuts. So put `preserve-3d` on a new wrapper *inside* the filtered camera container, and keep `perspective` on that wrapper's parent.

### 3.3 Depth system: per-layer parallax + rack focus (#3: 34, #6: 25 videos)

> **Status: DONE** as layer `depth`, `camera.parallax` (px of extra travel per depth unit, default 60) and `camera.focus: [{at, depth, frames=6}]`. Layers off the focus plane blur ~16 px per depth unit (no blur until the first `focus` key). **Still open:** `background.depth`, a configurable `dof` slope / cap and 2 px blur snapping.

These two belong together: one `depth` number per layer drives both parallax and blur.

```ts
// on Pos
/** depth plane: 0 = infinitely far (locked), 1 = subject plane (default, current behaviour), >1 = foreground */
depth?: number;

// on Background
depth?: number; // default 1 (current behaviour); 0.3 is a typical painted backdrop

// on Camera
/** blur px (at 1080 w) per unit of |depth − focusDepth|; 0 disables auto-DOF. Default 0 */
dof?: number;
/** depth plane in focus at scene start, default 1 */
focusDepth?: number;
/** rack focus: move the focus plane on a word */
focus?: {at: TimeRef; depth: number; frames?: number}[];
```

**Rendering.**
- `SceneInner` already computes the camera `tx, ty, scale` (settle, drift, punch, pan, shake). Publish them in a `CameraContext`.
- In `LayerView`, a layer with depth `d ≠ 1` adds a delta transform: `translate(tx·(d−1), ty·(d−1)) scale(1 + (scale−1)·(d−1))` about the frame centre. Foreground layers then move faster and background layers slower.
- The background wrapper does the same with `background.depth`.
- Auto-DOF: `blur = dof · |d − focusDepth(f)|`, rounded to 2 px steps. `focusDepth(f)` decays toward each `focus` target with `decay(f − at, r)`, where r is chosen so 98% of the move is done at `frames`.
- An explicit `blur` on a layer overrides auto-DOF.

**Timing defaults (measured)**
- Depth factors: 0.3 backdrop / 0.6 mid props / 1.0 subject / 1.4 foreground particles (v66); 0.6 / 0.8 / 1.0 (v37); parallax 1 / 0.7 / 0.4 with blur 0 / 6 / 14 px (v77). Foreground moves 2× the background (v22: −14 vs −28 px/f) to 3× (v66).
- DOF slope: v80 uses blur = |Δz| × 0.02 px per CSS z-unit. Suggested default in depth units: `dof: 10` (10 px one plane away), capped at 18 px, which matches v77's 0 / 6 / 14 px tiers.
- Rack focus speed: 2 f snap (v44, v81 "focus hunt" blur 10 → 0); ~6 f standard (v75); 13 f slow incoming pull (v03). Default `frames: 6`.
- Ghost or foreground type: a huge copy of the keyword at depth 1.6–2.2, blur 12–20 px, opacity 0.3–0.6 (v74, v81).

**Pitfalls.** Changing blur re-rasterises the element every frame. During a rack focus, only the 1–2 layers whose blur changes pay that cost; the 2 px snapping keeps the other frames cached. Very large foreground blurs (more than 40% FW wide) should use the half-resolution trick (§2.4).

### 3.4 Zoom-through into a target (#4: 33 videos)

> **Status: DONE** as `"transition": {"type": "zoom", "target": [x, y], "peak": 3–6}` (the outgoing exit ramp zooms about `target`; `peak` defaults to 1.55). **Still open:** the `flash` option, auto `<Freeze>` for peaks above ×3, and the `peak: 2.2 / frames: 8` defaults when `target` is set.

```ts
// on Transition (applies to type 'zoom'; the cut INTO a scene describes the outgoing scene's exit)
/** point in % of frame that the outgoing scene zooms into (default [50, 50]) */
target?: [number, number];
/** peak scale of the outgoing scene at the cut, default 1.55 */
peak?: number;
/** 1-frame flash at the peak (v12), colour = `color` */
flash?: boolean;
```

**Rendering.** Only the exit ramp of the outgoing scene uses `target` as its transform origin. This keeps `camera.origin` free for settle and punch. The exit ramp stays `ramp(ef, outF, 1.45)`, with scale `1 + (peak − 1)·p` and blur `rampSpeed · 9 px`. If `peak > 3`, wrap the outgoing layers in `<Freeze>` at the ramp start so the DOM isn't re-laid out while it is scaled up. The incoming scene keeps its existing 1.18 → 1 settle. For "the next scene is what was inside the screen", use §4.3 `dive` instead.

**Timing defaults (measured)**

| peak | out frames | ids |
|---|---|---|
| ×1.12–1.25 (subtle push) | 4–6 | v45 v49 |
| ×1.9–2.2 (standard) | 7–8 | v02 v07 v62 |
| ×2.6–3 (into a card or door) | 3–10 | v20 v53 |
| ×5.5–6 (through a frame) | 2–16 | v57 v73 |

- Incoming settle: 1.15 → 1 over 9–20 f, expo-out.
- Ease-in curve: `Easing.in(Easing.exp)` or growth ≈ 1.45 per frame.
- Default `frames: 8`, `peak: 2.2` when `target` is set.

**Pitfalls.** Scaling past ×3 rasterises text at enormous sizes. Use `Freeze` plus the motion blur already applied to the exit, or a flash. Keep the incoming scene's own blur ≤ 10 px.

### 3.5 Text behind subject: foreground matte (#5: 30 videos)

> **Status: PARTIAL.** `video` `transparent: true` and `tools/matte.py` (footage → VP9-alpha WebM) are in the engine, so the sandwich works by hand: `background: {kind: "video", src, trimStart: T}` → `text` → `{type: "video", src: "matte.webm", transparent: true, muted: true}` (from `tools/matte.py clip --start T`). **Still open:** the `foreground` sugar below.

The house rule: occlude the keyword with the hero (v06, v15, v23, v36, v68, v70 lessons). When the subject is a separate cut-out PNG this already works by ordering layers: background plate → text (`z: 5`) → cut-out (`z: 6`). For a photo or footage plate, the planner stacks plate → text → matte video by hand, and has to copy the geometry, trim and entrance itself. The field below removes that bookkeeping and covers still plates and backgrounds too.

```ts
export type Matte = {
	/** the subject alone, same framing and size as the plate:
	 *  PNG with alpha for stills; WebM (VP9 alpha) or MOV (ProRes 4444) for footage, from tools/matte.py (rembg/SAM/RVM) */
	src: string;
	/** z of the foreground copy; default = (highest text/badge z in the scene) + 1 */
	z?: number;
};

// on ImageLayer, VideoLayer and Background (kind image|video)
foreground?: Matte;
```

**Rendering.** When the scene's layers are expanded, each layer with `foreground` gets a synthetic clone layer:
- same `x, y, w, h, rotate`, entrance, idle and `swap` as the original;
- `src = foreground.src`, `z = foreground.z`;
- no `cutout`/`print`/`shadow` treatment unless set on the matte;
- for video: `<OffthreadVideo transparent>` with the same `trimStart` and `playbackRate`, so the two stay frame-locked.

A background with a `foreground` adds a full-frame clone above the text layers, inside the camera container, so the clone shares the settle and punch. No CSS masks are involved: the matte is pre-keyed alpha, so each frame costs one extra decode.

**Timing defaults (measured)**
- Behind-subject type enters while the subject is still: lines slide in about 8 f per line (v56). Other entrances: `translateX(−40%) → 0` with blur 10 → 0 px over 8 f and a 7 f delay per line (v09), or a letter-by-letter giant word at ~2.5 f per letter (v74: 6 letters in ~15 f).
- Type size 65–100% FW, often bleeding off both edges (v01, v45). Place it so the subject covers 1–2 letters or the lower ≤ 35% of the cap height (v39 hides the "K", v41 hides the bottom of "PLANS"). The word must stay readable.
- Optional glow: `text-shadow 0 0 10px` at 45% white (v41).

**Pitfalls.**
- The matte must match the plate pixel for pixel. Generate both from the same source frame size, and put any `fit: cover` crop on both.
- Don't build the matte at render time with `mask-image: url(video)`. A per-frame video mask is the expensive path (§2.5).
- A soft edge on the matte (2–4 px feather) hides segmentation errors. Do it in the matte tool, not with a CSS filter.

### 3.6 Word swap in a container (#7: 23 videos)

> **Status: PARTIAL.** Text `anim: "swap"` and badge `anim: "swap"` take `"A | B | C"`, swapped every `stagger` frames (default 12) or on each alternative's first spoken word with `sync`. The badge box re-sizes around each word instantly. **Still open:** the width spring, `swapStyle`, explicit `at` lists and `growFrom`.

```ts
export type SwapStyle = 'cut' | 'pop' | 'push-up' | 'blur' | 'fade';

// TextLayer (anim: 'swap' already exists)
swapStyle?: SwapStyle; // default 'pop'

// BadgeLayer
swap?: {
	texts: string[]; // alternatives after the first `text`
	at?: TimeRef[]; // explicit swap times; else `every` frames, or the first spoken word of each with `sync`
	every?: number;
	sync?: boolean;
	style?: SwapStyle;
};
/** container width follows the current text with a spring (default 'auto') */
fit?: 'auto' | 'fixed';
/** the container grows from a dot or caret before the text appears */
growFrom?: 'none' | 'dot' | 'left' | 'tail';
```

**Rendering.**
- Measure every alternative once with `measureText` (same font, size and tracking) in `useMemo`.
- The badge box width is `lerp(wPrev, wNext, springAt(f − swapF, fps, {damping: 20, stiffness: 200}))`. Apply it as `transform: scaleX` on a background div, with text children counter-scaled, or as a `clip-path: inset()` on a max-width box. Don't animate `width`.
- Swap styles:
  - `push-up`: outgoing `translateY 0 → −8%`, opacity → 0, ease-in over 10 f; incoming from +8% (v07).
  - `blur`: both copies blur 0 → 8 px → 0 over 4 f with a 1-frame accent tint (v51).
  - `pop`: scale 1 → 1.08 → 1 over 2 drawn frames (v06, v33).
  - `fade`: 2-frame crossfade (v78).
- `growFrom: 'dot'`: a circle of cap-height diameter scales 0 → 1 over 3 f, then the width expands over 6 f, then the text types or pops (v10, v47, v75).

**Timing defaults (measured)**
- Swap on the word onset, frame-exact ±1 f (v76). Template poster swaps land at onset + 3 f (v77). A fixed cadence of 12 f is used when there is no VO (v33).
- Container stretch: capsule → bar ~8 f (v50, v63); bubble stretches from the tail ~6 f (v69); label box grows from the left in 4 f, then types at 20–22 cps (v48, v66).
- Density: up to 6 swaps in 2.6 s in one shot, instead of cuts (v77).

**Pitfalls.** Don't measure with the DOM at render time. A swap inside a tilted (§3.2) container must measure in local units; it does, because the measurement happens before the transform.

---

## 4. P1 specs

### 4.1 Persistent overlay frame / showcase poster (#8: 20 videos)

> **Status: PARTIAL.** `spec.overlay` draws layers above every scene without camera motion (`at`/`until` are absolute seconds or refs). **Still open:** the items below.

Missing: a **content window** (the video plays inside a poster or sleeve frame: v39, v41, v42, v65), per-scene ranges, and ready-made frame chrome.

```ts
// VideoSpec
frame?: {
	/** the scene stack renders inside this window (insets in % of frame); the area outside shows `bg` + overlay layers */
	inset: {top: number; right: number; bottom: number; left: number};
	radius?: number;
	bg?: string;
	/** scale the scenes into the window (true) or crop them (false) */
	fit?: boolean;
};
// any overlay layer
scenes?: {from?: string; to?: string}; // show only between these scene ids
// new layer kind for chrome
type: 'chrome'; kind: 'film-edge' | 'brackets' | 'viewfinder' | 'hud'; color?: string; label?: string; numbers?: boolean;
```

**Rendering.** `frame.inset` wraps the scene `Sequence`s in a single container with `transform: translate() scale()` plus `overflow: hidden` and `border-radius`. That is one transform for the whole video. `chrome` kinds are static SVG built once in `useMemo`:
- `film-edge`: edge text, ▲ marks and frame numbers.
- `brackets`: four corner L's.
- `viewfinder`: brackets plus a REC dot that blinks every 15 f, and mono labels.
- `hud`: crosshair circles and thin rules.

Write your own edge text. Never copy a film-stock or creator brand mark.

**Timing.**
- Chrome holds for the whole video, or for whole chapters (v74, v78). It cuts or fades with the scenes, never moves with the camera.
- Brackets may "breathe" `scale 1 + 0.04·sin(f/6)` (v65).
- A vote or CTA bar stays visible for 100% of the runtime (v41 lesson).

**Pitfalls.** No blend modes on chrome. Make it a static PNG/SVG, so Chromium caches it, and use near-opaque colours.

### 4.2 Array layouts: orbit, carousel, vortex, deck (#9: 20 videos)

> **Status: OPEN.**

```ts
export type ArrayLayer = Pos & Timing & {
	type: 'array';
	layout: 'orbit' | 'carousel' | 'vortex' | 'deck' | 'grid';
	items: (ImageLayer | TextLayer | BadgeLayer)[]; // positions are computed; their own x/y are ignored
	/** orbit/vortex radius in % of frame width (rx, ry); ry < rx gives the tilted ellipse */
	radius?: [number, number];
	/** orbit: degrees per second; carousel: seconds per step; deck: frames per shuffle */
	speed?: number;
	/** vortex: start radius × and rotation the items spiral in from */
	from?: {radius: number; rotate: number};
	stagger?: number; // frames between items
	/** item index for the carousel's centred slot, or advance on words */
	steps?: TimeRef[];
	/** pass items behind a subject: z flips when sin θ < 0 */
	wrap?: boolean;
};
```

**Rendering.** Each item gets a `transform` computed per frame:
- orbit: `x = cx + rx·cos θ`, `y = cy + ry·sin θ`, `scale = 0.8 + 0.2·sin θ`. Set `zIndex` from sin θ when `wrap` is on (v20).
- vortex: θ and r spring in from `from` (v52).
- carousel: translateX by step × item spacing, using `decay` r = 0.8 (v02).
- deck: the front card goes `translateZ(−200px)` with opacity → 0 every `speed` frames while the next rises (v57).
- grid: cells pop in order, one per word (v06, v81).

**Timing defaults (measured)**
- Orbit: 180° over 2 s, radius shrinking 35% → 20% FW (v06); radius 0.3 W (v79); orbit ellipse rx = 1.1 × text width, ry = 0.35 × text height (v44).
- Vortex: 12 cards, r 900 → 420 px (83% → 39% FW), rotation −30° → 0, 1 f stagger, spring `{damping 22, stiffness 120}` (v52).
- Carousel: one card width per step, 15 f expo-out (v02); outgoing to −110%, incoming from +110% (v12).
- Deck: shuffle every 12 f; entrance stagger 3 f, spring `{damping 22, stiffness 220}` (v57).
- Grid tiles: scale 0.85 → 1 over 4 f, 2.5 f apart (v06, v81).

**Pitfalls.** No per-item blur in orbit. Use the depth tiers of §3.3 (scale + static blur per tier). At most 24 items.

### 4.3 Nested-reveal zoom, both directions (#10: 18 videos)

> **Status: PARTIAL.** `embed` + `transition: shrink` already covers "the outgoing scene shrinks into a box in the incoming scene" (v76, v77). Missing:
- (a) The reverse, **dive**: the camera pushes into a screen in the outgoing scene, and the incoming scene starts as that screen's content at full frame (v01, v60, v80).
- (b) `mode: 'live'` shows the embedded scene at the host's local frame, not the embedded scene's own continuing time.
- (c) An optional flash frame.

```ts
// CutType
| 'dive' // outgoing zooms so its `embed`-like target box fills the frame; the cut lands at full cover
// Transition
box?: {x: number; y: number; w: number; h?: number}; // target box for 'dive' in % (or reuse `target` + `peak`)
flash?: boolean; // 1–2 white frames at the joint (v76 fast versions)
// EmbedLayer
mode?: 'last' | 'live' | 'continue'; // 'continue' = the embedded scene keeps running from its own end frame
```

**Rendering.**
- `dive` is §3.4 with `peak = 100 / box.w` and `target` = the box centre. In the last frame the outgoing box exactly fills the frame and the incoming scene starts at scale 1 with no settle.
- `continue` renders the target scene inside `<Sequence from={−targetDuration}>`, so its local frame keeps advancing past its end. This only works for content that holds or loops.

**Timing (measured)**
- Shrink: 2–9 f (v76); 60% of the scale change in the first frame, 6 f expo-out to the post's image rect (v77); 8 f from ≈2.4× (v04); 12 f from 3.2× (v37); 6 f to ×0.45, then a pan (v12).
- Dive into a screen: 12 f (v80).

**Pitfalls.** An `embed` mounts a second copy of the whole scene. Even frozen, it costs layout and paint on every frame it is visible. Limit it to about 1.5 s, or cover it with UI. Never nest an embed inside an embed.

### 4.4 Pendulum hang (#11: 17 videos)

> **Status: PARTIAL.** Image `anim: "swing"` exists with fixed values (28°, period 1.1 s, decay 2.1/s), and `loop: "sway"` adds a fixed ±2.5° idle sway after any entrance. **Still open:** the parametric field and the string below.

```ts
// ImageLayer / BadgeLayer / UILayer
swing?: {
	amp?: number; // degrees at entry, default 28
	period?: number; // seconds, default 1.1
	decay?: number; // amplitude time constant in seconds, default 0.5
	pivot?: [number, number]; // transform-origin in % of the layer, default [50, -8]
	idle?: number; // ± degrees of endless sway after settling (0 = still)
	string?: {color?: string; length?: number}; // draws a line from the pivot up off-frame
};
```

**Rendering.** `rotate = amp·e^(−t/decay)·cos(2πt/period) + idle·sin(2πt/period)` around `pivot`. The string is a static 2 px div above the pivot that rotates with the layer.

**Timing (measured)**
- 35° → 8° after one half-swing, period 1.3 s, settled in ~2.2 s (v50).
- −35°·e^(−t/0.35)·cos(2πt/0.6) (v68).
- 18°, T = 0.7 s (v67).
- 9°·e^(−f/25) (v12).
- Idle ±3–5°, period 1–2 s (v37, v39, v14).
- Two or three visible swings is the house look (v50 lesson). Physical props are the only place overshoot is allowed (v68, v70).

### 4.5 Pixel / tile dissolve, layer level (#12: 14 videos)

> **Status: PARTIAL.** The `pixel` cut covers the scene-to-scene version (9 random columns, no colours). **Still open:** everything below.

Most references instead build a **word or prop** from tiles (v70 "build type from the medium's own particles"; v09, v33, v69).

```ts
// Transition (pixel)
cell?: number; // tile size in % of frame width, default 11 (9 columns)
colors?: string[]; // tiles flash these flat colours for 1–2 f before showing the scene (v55)
order?: 'random' | 'diagonal' | 'radial';
// TextAnim / ImageAnim
| 'pixel' // the layer assembles from tiles
// exit
| 'pixel'
```

**Rendering.** For a layer, a grid of `div`s sized to the layer box. Each cell's `opacity` (and for colours `background`) switches at `delay_i = order(i) · frames`. The layer content shows through a `clip-path` union, or simply sits under the tiles with the tiles fading out. That means ≤ 400 nodes, opacity only. The scene-level mask stays a small data URI, rebuilt per frame (≤ 200 rects is cheap).

**Timing (measured)**
- Word resolve: 2–4 unique frames over 4–8 f (v70).
- Scene dissolve: 4 f with 1.5% FW tiles (v55); 8 f with 8 px cells (v10); diagonal wave delay `(col+row)·0.6` f (v61).
- Ease-in builds of ~20 f ending on the cut, with 3.5% FW tiles (v58).
- Click explosion: ~20 px glowing tiles scatter 6–8 f (v69).

### 4.6 Light leak / film burn (#13: 14 videos)

> **Status: PARTIAL.** The `burn` cut exists (`color` sets the core; it sweeps left → right over ~11 f). **Still open:** an in-shot leak, a choice of origin, and colour pairs.

```ts
// Transition (burn)
origin?: 'left' | 'right' | 'top' | 'bottom' | 'tl' | 'tr' | 'bl' | 'br';
color2?: string; // hot core → outer colour
hold?: number; // frames at full white (burn-to-white)
// new layer
type: 'leak'; at: TimeRef; frames?: number; origin?: ...; color?: string; color2?: string; src?: string // PNG/WebM leak asset
```

**Rendering.** A `radial-gradient` div translated across the frame (transform only), with opacity following `sin(πp)`. A `src` asset plays with normal blending. Allow `screen` blend only when `frames ≤ 12`.

**Timing (measured)**
- Orange `#f16c12` → `#ffd27a` rising in 4 f (v74).
- `#f5a623` → white over ~6 f (v75).
- Amber from the top edge, 8 f (v78).
- Corner sweep to white over 11 f, hold 7 f, fade up (v03).
- 2-frame burn hit (v34).
- Film-burn frames 2–3 f each, used both as a cut and as an in-shot flicker (v75).

### 4.7 Karaoke paragraph (#14: 14 videos)

> **Status: PARTIAL.** `anim: "karaoke"` with `dimColor` exists, but switches colour instantly and adds a 6-frame glow. **Still open:** the fields below.

```ts
// TextLayer
spokenColor?: string; // colour after the word is spoken; default = color (some references return to 70%)
karaokeFade?: number; // frames dim → lit, default 5
karaokeUnit?: 'word' | 'line';
/** keep the active line at this y (%) by scrolling the block (v77, v81) */
follow?: number;
```

**Rendering.** Interpolate colour over `karaokeFade` frames (a colour change only; no layout). `follow` translates the whole block so the active line sits at `follow`, with `decay` r = 0.75.

**Timing (measured)**
- Grey `#7a7a7a` → `#111` (v76); `#9a9a9a` → `#1a1a1a` over 6 f (v04); idle white at 45% → `#fff` with a 6 f fade per line (v81); `#bdbdbd` → green on real UI copy (v82); ~4 f per word (v51, v78).
- New lines push the block up by one line (v77).

### 4.8 Text fills (#15: 14 videos)

> **Status: DONE** as `TextLayer.fill`: a CSS gradient string (`"linear-gradient(#fff, #8a8a8a 45%, #fff 55%, #555)"`) or an image `src` under `public/`, applied with `background-clip: text`. Accent words keep their flat `accentColor`. **Still open:** a video fill, a procedural halftone fill, and the extrude conflict noted below.

```ts
// TextFx
fill?:
	| {kind: 'gradient'; stops: string[]; angle?: number}
	| {kind: 'halftone'; color: string; dot?: number}
	| {kind: 'image'; src: string}
	| {kind: 'video'; src: string; trimStart?: number};
```

**Rendering.** `gradient`, `halftone` and `image` use `background-clip: text` with `color: transparent`. They are static and cheap. Halftone is a `radial-gradient` dot background with 3 px dots at 45° (v80). `video` renders `<OffthreadVideo>` masked by a **static** SVG text mask (`mask-image` of the glyph outlines, built once). A changing video under a fixed mask is acceptable.

**Defaults (measured)**
- Chrome: `linear-gradient(#fff, #8a8a8a 45%, #fff 55%, #555)` (v23).
- Silver: `#fff → #c9c9c9` (v20).
- Gold glow: `#ffd23a → #e08a00` (v68).
- Gradient tail on the last word: `#fff 55% → #b8e8f0` (v07).

**Pitfall.** `background-clip: text` conflicts with `fx.extrude`'s text-shadow stack (the shadows are painted under a transparent fill). Render the extrude as a second copy underneath.

### 4.9 Marquee band (#16: 14 videos)

> **Status: OPEN.** Workaround: one long `text` layer with `"caps": true` and a slow `camera.pan`, or a `custom` component.

```ts
// TextLayer
marquee?: {speed: number; dir?: 'left' | 'right'; rows?: number; gap?: number; band?: string};
// speed in % of frame width per second; rows alternate direction; band = background colour of a ribbon
```

**Rendering.** Repeat the text N times in a row and translateX modulo one repeat width (measured with `measureText`). Use a static blur for the background-type variant.

**Defaults (measured)**
- Background type rows: ±3 px/f (≈8% FW/s), opacity 0.2, blur 4 px (v17).
- Ribbon: 180 px/s (≈17% FW/s) (v64).
- Fast blurred marquee: 40 px/f with blur 8 px (v78).
- Ghost word drifting 0 → −6…−8% over the hold (v76, v77).

### 4.10 Handwriting write-on (#17: 12 videos)

> **Status: OPEN.** The fonts exist (`script`, `marker`, `signature`); the nearest anims are `mask` (left → right wipe) and `letters`.

```ts
// TextAnim
| 'write' // script text drawn on letter by letter with a pen-tip
// TextLayer
framesPerChar?: number; // default 1.5
pathSrc?: string; // optional SVG of single-stroke glyph paths for a true stroke draw
```

**Rendering.**
- Default: a per-glyph `clip-path: inset(0 X% 0 0)` wipe, left to right in reading order, plus a 2-frame lead highlight on the active glyph. That is cheap and needs no paths.
- With `pathSrc`: SVG `strokeDashoffset` per path. Build the paths offline with a node tool (opentype.js plus a single-line font), never at render time.

**Timing (measured)**
- ~1 letter per frame (v44, v76).
- 2 f per character (v08).
- 8 letters in 0.9 s (v14).
- A word in 9 f (v81).
- A signature in 21 f, linear (v15).
- Pencil: 4 letters in 20 f (v68).

### 4.11 Flip-book flicker montage (#18: 12 videos)

> **Status: PARTIAL.** `image.cycle: {srcs, every=3, until}` exists with a fixed interval. **Still open:** video clips and a schedule.

```ts
// ImageLayer.cycle and a new VideoLayer.cycle
cycle?: {srcs: string[]; every?: number; durations?: number[]; flash?: {color: string; frames: number}; until?: TimeRef};
```

**Rendering.** Precompute the cumulative frame table. For video, one `<Sequence>` per clip (`<Series>`), each an `OffthreadVideo` with `premountFor` so decode doesn't stall.

**Timing (measured)**
- 2–3 f per swap (v03).
- 2–6 f (v54).
- Accelerating `[5,3,2,2,2,2,2,1,4,4]` frames at 16 fps, i.e. ×1.9 at 30 fps (v65), ~6 swaps/s at peak.
- Archival shots shrinking 1.33 s → 0.11 s across 7 cuts (v16).

### 4.12 Colour sweep / bar wipes (#19: 11 videos)

> **Status: PARTIAL.** `wash` floods a flat colour; `wipe` (`shape: line|diagonal|split`, `direction: left|right|up|down`) is a hard-edged wipe (see the bug note in §1.1). **Still open:** `sweep` (feathered band) and `blinds`.

```ts
// CutType
| 'sweep' // a feathered colour band crosses the frame; the cut happens under full cover
| 'blinds' // N bars collapse (scaleY 1→0) with a stagger to reveal the incoming
// Transition
angle?: number; // sweep direction in degrees, default 135
feather?: number; // 0–1 soft edge, default 0.25
bars?: number; // blinds count, default 8; 2 = twin bars from opposite sides
```

**Rendering.** `sweep`: one oversized div with a `linear-gradient` (solid core, feathered edges), translated across the frame. The cut swaps under the core. `blinds`: N divs with `scaleY` and a per-bar delay. Transforms only.

**Timing (measured)**
- Feathered sweep 3–5 f (v58).
- Bar ~25% FW crossing L→R in 3 f (v76).
- White strip 15% H sweeping up in 4 f (v60).
- Diagonal fill from bottom-left in 2 f (v74).
- Slow brand sweeps 12–20 f (v71).
- Blinds: 8 bars with a 2 f stagger (v12).
- Twin bars ~7 f (v13).

### 4.13 Speech bubble (#20: 11 videos)

> **Status: PARTIAL.** `{"type": "ui", "kind": "bubble", "text"}` exists with a fixed tail and Inter 800. **Still open:** the fields below.

```ts
// UILayer kind 'bubble'
tail?: {x: number; y: number}; // tip position in % of frame (aims at the speaker's mouth)
bubble?: 'comic' | 'round' | 'thought' | 'shout';
font?: TypeStyleName; // comic default: 'marker'
anim?: 'pop' | 'grow' | 'words'; // pop = spring scale from the tail; words = fill word by word
```

**Rendering.** The bubble outline and tail are one static SVG path built from the box size and the tail vector, with a 4 px black stroke for `comic`. Scale it from a `transform-origin` at the tail.

**Timing (measured)**
- Spring `{damping 12, stiffness 200, mass 0.6}`, pop in 3–4 f with overshoot (v22, v41, v48, v69).
- Grow from bottom-left in ~6 f (v79); words fill on their VO words +0.13–0.2 s (v79).
- The bubble survives a punch-in cut in the same screen position (v41).

### 4.14 Card flip with back face (#21: 10 videos)

> **Status: PARTIAL.** The `flip` cut (outgoing turns edge-on, incoming turns in) and image `anim: "flip"` exist, without a back face. **Still open:** the two-sided field below.

```ts
// ImageLayer / BadgeLayer / group
flip?: {at: TimeRef; back: Layer; axis?: 'y' | 'x'; frames?: number; spin?: number /* extra rotateZ */};
```

**Rendering.** A parent with `transform-style: preserve-3d` holding two children, the back pre-rotated 180° and both with `backface-visibility: hidden`. Animate the parent's `rotateY`. The flip uses a `perspective()` transform function so that `preserve-3d` isn't needed on outer layers (see §3.2's flattening pitfall).

**Timing (measured)**
- 10 f rotateY 0 → 180°, perspective 900 px, face swap at f5, spring `{damping 14}` (v44).
- Disc flip 90 → 0 over 10 f, ease-out cubic (v82).
- Digit cards 90 → 0 over 8 f, staggered 2–3 f, perspective 800 (v20).
- Page flip 4 f + 6 px blur (v30).
- Ticket flip-swap in 2 f (v12).

### 4.15 Animated letterbox (#22: 9 videos)

> **Status: DONE.** `scene.letterbox` (% of height per bar) animates whenever the value changes from the previous scene, closing or opening, with `decay(f+1, 0.5)` (50 / 75 / 88 / 94 / 97% of the travel), which matches the measured 55 / 73 / 84 / 90 / 96 / 100% (v78, v79). **Still open:** the band object and frame count below.
- **Fields (open):**

```ts
// Scene
letterbox?: number | {top: number; bottom: number; color?: string};
letterboxFrames?: number; // default 6
```

- **Values (measured):** bars of 20% H each on 9:16 (255 px at 720 w → 383 px at 1080 w; v78, v79); 22.5–22.6% (v04, v80). A band opens to full frame over ~10 f (v77). Use bars for UI or talking-point scenes and full bleed for posters (v78 lesson).

### 4.16 Text-selection highlight (#23: 9 videos)

> **Status: OPEN.**

```ts
// TextLayer
select?: {
	words: string[] | [number, number]; // target words or a token index range
	at?: TimeRef; // default: the first target word's VO time − 0.2 s
	color?: string; // fill, default '#b3d4fc'
	handles?: boolean | string; // iOS-style caret handles (colour)
	grow?: 'sweep' | 'word'; // sweep L→R, or extend word by word as spoken
	frames?: number; // sweep duration, default 9
};
```

**Rendering.** Wrap the target tokens in a span with an absolutely positioned fill child (`scaleX` 0 → 1, origin left, behind the glyphs) and two handle children: a 3 px bar plus a 10 px dot. No measurement is needed, because the span's own box is the selection box.

**Timing (measured)**
- Fill `#9cc3dd` sweeping in 3 steps over 9 f, handles `#1e88d0` (v29).
- `#b3d4fc` (v75).
- Yellow `#f2e46a` with handles (v79).
- Word-by-word expansion as spoken (v81).
- Lands 0–0.4 s before its word (v76).
- Whole-scene "becomes a layer": a dashed bounding box with corner handles, scaling to ~80% (v59).

---

## 5. P2 sketches (build when convenient)

| Technique | Proposed field | Approach and numbers |
|---|---|---|
| Magnifier callout | `type: 'magnifier', source: {x,y,w}, target: {x,y,w}, zoom: 1.4–4, src` | A circle `clip-path` on a scaled copy of the source image (static scale, no filter) plus a white 2–3 px ring. Optional trapezoid connector at `rgba(255,30,30,.45)` (v50). Scale-in 8 f (v56); a ring sweep in 2 f as a wipe (v53). |
| Text on path | `TextLayer.path: 'circle' \| 'arc' \| 'spiral', radius, rotateSpeed` | SVG `<textPath>`, built once, with the group rotated per frame (transform only). Ring text rotates −18° over a scene (v78). |
| Shape morph | covered by §3.6 container spring | For pill → bar or square → pill, animate border-radius once at the swap via two stacked boxes crossfading over 6–8 f (v63, v79). |
| Invert strobe (**DONE** as the `strobe` cut) | add `pattern: number[]` (1 = inverted) and a mid-shot `grade.strobeAt` | Measured 13 f with a 4 f period (v65); 5 frames on `f % 2` (v71); invert / sepia / invert (v56). |
| Slot reel | `TextLayer.anim: 'reel'`, `text: 'a \| b \| … \| target'`, `frames: 18` | A vertical list in an `overflow: hidden` window, translateY with `Easing.out(Easing.cubic)` over 18 f, ~1 line/frame at peak, landing on the last item (v52). Years roll upward (v16, v29). |
| Redaction box → text | `TextAnim: 'redact'` | Each word starts as a dark box of its own size and dissolves to the glyph in ~4 f exactly on the VO word (v56). Block-censor wipe (v71). |
| Tear-open reveal | `CutType: 'tear'`, `src` (torn-edge hole PNG) | Scale a static torn-hole PNG mask 40% → 150%+ over ~16 f (v62). Ragged holes merging over ~7 f (v66). The mask image is static; only its `mask-size` and position change. |
| Emoji in a word | `TextLayer.glyphs: {[letterIndex]: src}` | An inline `<Img>` sized 0.8 em, baseline-aligned, replacing one letter ("o" → 🚫, "I" → logo; v59). Use your own icons. |

---

## 6. Suggested build order

Done since the first pass: the depth system (§3.2 layer tilt + §3.3 `depth`/`camera.focus`), particles (§3.1), the zoom `target`/`peak` (§3.4), `text.fill` (§4.8) and the letterbox curve (§4.15). Remaining, in order:

1. **Fix the `wipe` direction bug (§1.1)**: a one-line change in `Scene.tsx`.
2. **Foreground matte (§3.5)**: an engine clone pass on top of `tools/matte.py` / `video.transparent`. Add a still-image mode (rembg → PNG) to the tool.
3. **Dive (§4.3a)**: on top of the `zoom` `target`/`peak` exit.
4. **Container swaps (§3.6)**: width spring and swap styles; needs `@remotion/layout-utils` `measureText`.
5. **Arrays (§4.2)**: reuse the `depth` blur/parallax for the depth tiers.
6. Then the remaining P1 list in table order. The cheapest wins are the karaoke fade, marquee and blinds/sweep: each under ~60 lines of code.

Every new field should go into `engine-spec.md` with its measured default and two reference ids, the same way the existing transition table cites its sources.
