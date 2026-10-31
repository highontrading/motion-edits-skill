# Transitions catalogue

Every distinct transition found in the 82 reference breakdowns (v01–v83; there is no v72), with duplicates merged. Each entry gives the frame-by-frame mechanics, the measured length, the story beat it suits and how to build it with the engine (`scene.transition.type`, layers and camera). Anything the engine can't do yet is marked **ENGINE GAP**, followed by an implementation sketch.

**Units.** Frame counts are at **30 fps** unless noted. Ten of the references animate on twos (12–16 fps with `animFps`), so one "step" there is 2–2.5 real frames. Pixel figures from the 720-px-wide analysis renders are also given as **% of frame width (W)**: 24 px = 3.3% W, 40–55 px = 5.5–7.6% W. Blur radii are given the same way: 12 px ≈ 1.7% W, 20–30 px ≈ 2.8–4.2% W.

**Sources.** Frequencies count the videos whose section 5 (transitions) or "Into next" timeline column uses the technique. The curve numbers come from section 4 (motion).

---

## 0. Quick reference

| # | Transition | Videos | Median frames (range) | Engine |
|---|---|---|---|---|
| 1.1 | Plain hard cut on word/beat | 74/82 (41% of all 1,231 joins) | 0 | `cut` |
| 1.2 | Hard cut + settle | settle in 66/82 | 0 + 20 settle (6–45) | `cut` + `camera.settle` |
| 1.3 | Zoom-punch (velocity-matched zoom) | 22 | 8 out + 12 in (2–26 / 4–30) | `zoom` |
| 1.4 | Whip pan / momentum slide | 23 | 6 out + 10 in (3–14 / 5–40) | `whip-*` |
| 1.5 | Ramp-into-cut (one-sided) | 27 | 8 (2–35) | partial (GAP: static landing) |
| 1.6 | Spin / roll whip, roll-match | 19 | 8 out + 8 in (3–20 / 4–20) | `spin` |
| 1.7 | Punch-in / punch-out jump reframe | 26 | 1 + 4 settle (2–10) | new scene + `cut` |
| 1.8 | In-canvas camera move (no cut) | 23 | 18 (3–90) | `camera.pan` (GAP: velocity blur) |
| 1.9 | Slide push / carousel | 14 | 10 (2–21) | `whip-*` approx (GAP: true push) |
| 1.10 | Entrance-carried cut | 15 | 10 (5–16) | `cut` + layer `anim` |
| 1.11 | Action cut (click-cut) | 2 | 0 | `cut` + `cursor` |
| 2.1 | Dip to black / black frames | 25 | 2 black (1–7) | `black` |
| 2.2 | Luma-flip hard cut | 18 | 0 | `cut` + background |
| 2.3 | Invert flash | 17 | 2 (1–3) | `invert` |
| 2.4 | Exposure bloom / burn-to-white | 16 | 9 (3–20) | `flash-ramp` |
| 2.5 | White flash frame | 15 | 1 + 0–6 decay | `flash` |
| 2.6 | Strobe | 12 | 4 (2–45) | chained 1-frame scenes |
| 2.7 | Light-leak burn | 11 | 7 (2–21) | **GAP** (`flash` + colour approx) |
| 2.8 | Cut to void / statement card | 10 | 0 | `cut` + `void` background |
| 2.9 | Colour-wash flash | 9 | 4 flood + 20 relax (1–29) | `flash` + `color` (GAP: relax) |
| 2.10 | Overexposed landing / glare | 6 | 10 (5–18) | `flash` (GAP: glare blur) |
| 2.11 | Fade to black (ending) | 6 | 8–10 (3–60) | layer `exit: fade` on void |
| 2.12 | Glow-silhouette reveal | 1 | 3–5 | **GAP** |
| 3.1 | Colour-field flood wipe | 10 | 4 (2–16) | **GAP** |
| 3.2 | Circle iris open / portal | 8 | 6 (2–12) | `circle` |
| 3.3 | Letterbox open / close / slit | 7 | 6–7 (3–16) | **GAP** |
| 3.4 | Spotlight iris close | 6 | 8 (2–28) | **GAP** |
| 3.5 | Ink / organic blot matte | 5 | 15 (6–30) | `ink` |
| 3.6 | Line / bar wipe | 5 | 5 (2–16) | **GAP** (`object` approx) |
| 3.7 | Lens / loupe / keyhole reframe | 4 | 7 (2–12) | **GAP** |
| 3.8 | Shape / logo iris | 3 | 6 (3–8) | **GAP** |
| 4.1 | Paper / panel slide-over | 17 | 8–10 (4–22) | `slide` |
| 4.2 | Foreground occluder / object wipe | 17 | 6 (3–20) | `object` |
| 4.3 | Card / disc flip | 8 | 10 (2–30) | **GAP** |
| 4.4 | Cloud / smoke / fog pass | 7 | 16 (9–36) | `object` approx |
| 4.5 | Shatter / burst / crumple | 5 | 15 (2–30) | **GAP** |
| 4.6 | Paper tear-open | 3 | 7 (4–8) | `ink` approx |
| 4.7 | Sticker / card burst cover | 3 | 4 cover (4–40) | composable layers |
| 4.8 | Slab / shutter / fold wipe | 3 | 15 (3–30) | `object` approx |
| 4.9 | Hand / cursor drag wipe | 2 | 15 (10–20) | **GAP** |
| 5.1 | In-place swap / state cut | 12 | 1–3 | image `swap` |
| 5.2 | Cross-dissolve | 10 | 8 (3–19) | **GAP** |
| 5.3 | Shape / object morph | 9 | 9 (3–22) | **GAP** |
| 5.4 | Match cut | 8 | 0 (+1 flash) | `cut` / `flash` |
| 5.5 | Motion bridge / pre-lap | 8 | 1–4 before + 3–10 after | composable |
| 5.6 | Persistent element across cut | 7 | 0–13 | composable (GAP: overlay track) |
| 5.7 | Polarity / inverse match | 6 | 0–6 | `cut` + palette swap |
| 5.8 | Caption morph exit | 6 | 6 (4–15) | text `exit` approx |
| 6.1 | Focus-pull / defocus cut | 24 | 12 (3–24) | `focus` |
| 6.2 | Desaturate handoff / grade drain | 10 | 6 (1–9) | `desat`, `grade.drainAt` |
| 6.3 | Dim-and-overlay | 5 | 5 (4–15) | dark layer |
| 6.4 | Background re-light | 5 | 8 (3–60) | **GAP** |
| 6.5 | Saturation return | 4 | 20 (6–45) | **GAP** |
| 7.1 | RGB split / slice glitch | 16 | 3 (1–12) | `glitch` |
| 7.2 | Pixel / block / tile dissolve | 10 | 5 (2–30) | **GAP** |
| 7.3 | Dot-matrix / halftone dissolve | 5 | 8 (4–48) | **GAP** |
| 7.4 | Flicker montage | 5 | 2–6 per shot | chained short scenes |
| 7.5 | Click-ripple / ring burst | 5 | 6–18 | `cursor` + `flash` |
| 7.6 | Warp / twirl / hyperspace | 5 | 4 (1–36) | **GAP** |
| 7.7 | CRT power-off / collapse-to-line | 4 | 4–5 (2–17) | **GAP** |
| 7.8 | Film-gate roll / burn frames | 3 | 4 (2–16) | **GAP** |
| 7.9 | Redaction / block-censor / backspace | 3 | 3–5 | **GAP** |
| 8.1 | Nested zoom-out (frame-in-frame) | 19 | 8 (2–39) | **GAP** (two-pass workaround) |
| 8.2 | Zoom-through into a frame / screen | 15 | 16 (8–50) | `zoom` + framed image |
| 8.3 | Zoom-out context reveal | 5 | 14 (9–23) | `camera.settle` large |
| 8.4 | In-container content cut | 5 | 0–2 | `ui` `src` + image `swap` |
| 8.5 | App-switcher shrink and swipe | 2 | 12–20 | **GAP** |
| 8.6 | Nested-shape zoom | 1 | 19 + 4 iris | **GAP** |

---

## House rules vs flavours

### House rules (near-universal; do these on every video)
1. **The hard cut is the backbone.** 41% of all 1,231 shot joins are plain hard cuts (per-video median 39%). 74/82 videos have at least one. A plain cut works when the cut frame sits on the VO word onset (−0.1 s to +2 frames; v08, v09, v10, v68 cut 1 frame *before* the sentence) or within ±0.1 s of a beat (v18: 13/15 cuts within ±0.2 s of a beat).
2. **The incoming shot is already moving on frame 1.** It starts at 103–115% scale and decays to 100% with an exponential ease-out, losing 12–30% of its remaining velocity per frame (×0.70–0.88 velocity per frame), with **no overshoot**. A post-cut settle is described in 66/82 motion sections, and "no overshoot / no sign flip" is stated in 56/82. This is the engine's default `camera.settle`, so never turn it off except on a locked void card.
3. **Motion transitions accelerate into the cut and decelerate out of it.** Velocity grows ×1.3–1.6 per frame over the last 6–10 frames (v01 ×1.37, v02 ×1.3–1.6, v04 ×1.4–1.5, v36 ×1.5). The cut lands on the fastest frame (stated explicitly in 35/82 motion sections), and the incoming shot starts at matching velocity in the same direction. A momentum-family transition (zoom-punch, whip, ramp, spin) appears in **58/82** videos.
4. **Short.** The median effect transition lasts 6–12 frames, and flashes 1–3 frames. Only clouds, irises, nested zooms and in-canvas moves run past 20 frames.
5. **Blur scales with speed.** Add directional or radial blur only on the 1–4 frames around peak velocity: 6–24 px at 720 W (0.8–3.3% W) for whips, 4–8 px radial for zooms.
6. **Sound sells it.** A whoosh is mentioned in 79/82 sound sections and an impact in 69/82. Put a whoosh peaking on the cut frame under every motion transition and an impact under every flash or invert (`audio.sfx: [{src, at}]`).
7. **One signature transition per video, repeated.** v04 ramp-into-cut ×10, v11 zoom-punch ×5, v15 ×5, v37 ×6, v45 zoom-through ×6, v24 focus-pull ×7, v76 nested zoom-out ×4, v69 film burn ×4, v32 ink morph ×4. The signature carries roughly a quarter to a half of the non-cut joins, and every other effect is used once or twice.

### Flavours (choose one family per video to match the tone)
| Tone | Signature family | Evidence |
|---|---|---|
| Collage explainer, energetic | zoom-punch + settle, invert flash | v11 v12 v15 v16 v25 v37 v80 |
| Cinematic / documentary, calm | focus-pull cuts, dip to black, light leaks | v24 v26 v29 v32 v70 v73 |
| UI / SaaS promo | nested zoom-out, punch-in reframes, pixel/tile dissolves, colour-wash | v46 v51 v58 v59 v76 v77 |
| Lyric / poster kinetic | strobes, colour-field wipes, glitch frames | v23 v28 v71 v74 |
| One-world 3D / diorama | occluder wipes, zoom-through into frames, in-canvas moves | v01 v37 v39 v44 v83 |
| Halftone poster, 12 fps | plain hard cuts with a ≥60° hue jump or a luma flip | v06 v14 v19 |

---

## Shared curve maths (use these for every motion transition)

| Quantity | Measured | Engine / Remotion equivalent |
|---|---|---|
| Ease-in into cut | velocity ×1.3–1.6/frame over 6–10 f (v01 0.88→13.04 over 8 f) | `Easing.in(Easing.exp)` or `bezier(0.7,0,0.84,0)`; engine `zoom` ramps ×1.45/frame |
| Ease-out after cut | ×0.70–0.88/frame; 90% settled in 0.4–0.6 s | `Easing.out(Easing.exp)`, `bezier(0.16,1,0.3,1)`, `spring({damping:30, stiffness:120})` |
| Settle start scale | 1.03–1.18 (median ~1.10) | `camera.settle: 1.08–1.15` |
| Fast pops | ×0.55–0.72/frame, 6–8 f | `settleR` lower / spring damping 14–20 |
| Whip peak speed | 24–55 px/f at 720 W (3.3–7.6% W/f); max 66 px/f (v15) | `whip-*` |
| Symmetric in-canvas whip | ease-in-out 18–20 f, peak ~56 px/f | `camera.pan` + `bezier(0.65,0,0.35,1)` |
| Overshoot | absent in 56/82; small (≤8%) only on stickers/props | settle without overshoot |

---

## 1. Motion / momentum cuts

### 1.1 Plain hard cut on the word or beat
- **Aliases:** hard cut on onset, beat-locked cut, sentence-surface cut, page-turn cut.
- **Seen:** 74/82 have at least one; 41% of all joins. It is the *dominant* join (≥60% of joins) in v06 (23/25), v08, v09, v13, v14 (16/16), v19 (12/12), v29, v31, v41, v52, v68, v70, v75, v78. It never appears in v01, v03, v04, v23, v35, v38, v42 or v48, which hide every change.
- **Frame by frame:** last frame of A → first frame of B. Nothing else.
- **Frames:** 0.
- **When to use:** the default for every new sentence or idea. It only reads cleanly if the cut changes the set a lot: a hue jump of ≥60°, a luma jump of ≥15 units, or a different world, palette or type system (v06, v70, v78, v79).
- **Build:** `"transition": {"type": "cut"}` (the default). Time it with `"start": {"word": "X", "offset": -0.1}`. On a music-only edit, snap `start` to `round(beat × fps)/fps`.

### 1.2 Hard cut + settle (cut into a decelerating push)
- **Aliases:** settle-zoom cut, cut into continuing motion, landing pull-back, "camera lands".
- **Seen:** it is the stated default cut grammar in v02 v13 v14 v19 v20 v22 v25 v31 v32 v39 v44 v52 v58 v77 v83, and a post-cut settle is measured in 66/82 motion sections.
- **Frame by frame:** f0 = B at 103–115% (v19, v20: 110–115%; v58: 103–104%), already at peak velocity. f1–f6 lose 20–30% velocity per frame. The shot reaches 90% settled at 0.4–0.6 s and rests at 0.7–1.5 s, with no overshoot. Optional extras: a −10° → 0° rotation (v20), or a lateral drift that decays over 10 f (v27).
- **Frames:** 0 + settle 20 (6–45).
- **When to use:** every scene that has no other effect. It makes a hard cut feel like an arrival instead of a slide change.
- **Build:** `cut` + `"camera": {"settle": 1.10, "settleR": 0.82}`. Use `settle 1.03–1.05` for UI and footage (v58), and 1.10–1.15 for collage stages (v19, v20). On a void or statement card, set `"settle": 1` (locked; v15, v19).

### 1.3 Zoom-punch cut (velocity-matched zoom)
- **Aliases:** zoom-punch, ramp-into-cut zoom, speed-matched zoom cut, zoom-matched cut, zoom-snap cut, velocity-matched zoom-out cut.
- **Seen:** 22/82: v02 v04 v07 v11 v12 v15 v16 v18 v20 v25 v26 v27 v30 v36 v37 v43 v49 v53 v56 v74 v78 v80. It is the signature in v11 (×5), v12 (×4), v15 (×5), v37 (×6), v80 (×4) and v25 (×4, as zoom-out).
- **Frame by frame:**
  1. Over the last 4–14 frames A scales up with an exponential ease-in (scale 1 → 1.06–1.25; v11 ×1.6 per 12 fps step) and radial blur grows to 4–8 px.
  2. The hard cut lands on the fastest frame.
  3. B opens at 1.06–1.20 and keeps moving in the same direction, decaying ×0.75–0.85/frame for 10–30 frames.
  - Zoom-out version (v25, v26, v36): A goes 1 → 0.82–0.94 and B goes 1.12–1.18 → 1. v36 mixes the two: A zooms out and B zooms in, so the cut feels like a punch.
  - v16 adds a −3.6° rotation kick on B. v30 is a one-update lunge: +4–5% scale on the last frame only.
- **Frames:** out 8 (2–26) + in 12 (4–30); median total ~20.
- **When to use:** sentence-to-sentence momentum in energetic explainers. Zoom-in suits "go deeper / the next thing"; zoom-out suits "step back / return to the hero layout" (v26 25.3) or contrast (v25).
- **Build:** `"transition": {"type": "zoom", "frames": 8}` on B. The engine ramps A ×1.45/frame with blur and starts B at 1.18×. Use `frames: 4–6` for a snappy 12 fps look (v11) and 10–14 for a glide (v37). For the zoom-out variant: **ENGINE GAP** (no direction parameter). Proposed `"direction": "out"`: A scale `1 → 0.82` with `Easing.in(Easing.cubic)` over 8 f. B still starts **over-scaled** and shrinks (`1.18 → 1`, `Easing.out(Easing.cubic)`), because in the references the eye reads it as the pull-back continuing (v25). Add a 4–8 px radial blur on the 2 frames around the cut.

### 1.4 Whip pan / momentum slide
- **Aliases:** momentum cut, whip-pan, velocity-matched slide, blur-masked composite whip, slide-through, scroll-whip, whip-tilt.
- **Seen:** 23/82: v04 v05 v16 v18 v20 v21 v26 v29 v33 v35 v36 v46 v49 v50 v54 v55 v59 v61 v63 v64 v75 v82 v83 (cut-crossing whips only; in-canvas whips are 1.8).
- **Frame by frame:**
  1. A translates with an ease-in for 3–14 frames, accelerating ×1.4–1.5/frame to 24–55 px/f at 720 W, and a directional blur grows to 12–24 px.
  2. The cut lands on the peak-blur frame.
  3. B enters already moving the same way at about the same speed and decays over 5–40 frames (v46: 42 px/f → 0 over 22 f; v26: 54 px/f decaying over ~1.3 s; v29: ×0.68 per step).
  - Vertical versions: v16, v18, v49, v63 and v64 (B from +30% → 0 over 18 f). Scroll-through (v33): an exponential scroll plus a luma dip to 40% on the last 2 frames.
  - In v35 the cut lands on a 2.3× framing already moving at 38 px/f; mirrored edge tiles fill the exposed background.
- **Frames:** out 6 (3–14) + in 10 (5–40).
- **When to use:** lateral story moves such as "next item", "meanwhile", a list advance or a cause → effect handoff. Vertical whips suit "drop down to the detail" or "rise to the result".
- **Build:** `"transition": {"type": "whip-left", "frames": 10}` (also `whip-right|up|down`). Both shots share one curve with directional blur. Use `frames: 6–8` for a 2–3-step smear (v05, v54) and 14–20 for a glide (v46). Match the direction to the next layout: content that leaves left means `whip-left`.

### 1.5 Ramp-into-cut (one-sided: accelerate, then land dead)
- **Aliases:** ease-in whip to hard cut, accelerate-and-smear exit, punch-in exit, zoom-through to static, tilt-out → black, slide-out to blank, shake-out, title smear cut.
- **Seen:** 27/82: v01 v02 v04 v07 v10 v11 v16 v18 v21 v22 v23 v28 v45 v47 v50 v51 v54 v61 v64 v65 v67 v68 v74 v76 v81 v82 v83.
- **Frame by frame:** A accelerates for 2–35 frames (v01 8 f at ×1.37/frame; v07 13 f to 26 px/f with blur 0 → 12 px; v45 4–6 f of exponential zoom with blur 0 → 10 px; v67 10–35 f). The cut lands at peak speed, and **B is static** or a contrasting frame: pure black (v16, v65, v74, v83), a still white frame (v51), a bright screen (v28) or a void. The stop is felt as a full stop.
  - Smear variants: the last 1–2 frames get a 60 px horizontal smear (v10, v68, v71), or 7 frames of ±zoom/rotation jitter (v18 shake-out, v21 shake-whip).
- **Frames:** ramp 8 (2–35); landing 0.
- **When to use:** a "full stop" before a time jump, a title line, the turn of a story or a statement card (v16 13.72, 26.83), and "being yanked to the next screen" in promos (v01).
- **Build:** **ENGINE GAP.** `zoom` and `whip-*` always add incoming motion. Workarounds:
  1. Use `zoom`/`whip-*` on B and set B's `camera.settle: 1` to kill most of the landing.
  2. When B is black, put a 1–3-frame scene with `background.kind: "void"` between them.
  - Proposed: `"transition": {"type": "zoom|whip-*", "land": "static"}`, or a scene-level `camera.exitRamp: {scale: 1.25 | x: -30, frames: 8, blur: true}` that applies `Easing.in(Easing.exp)` to A's last N frames. Shake-out already exists: `camera.shake` on the last 7 frames.

### 1.6 Spin / roll whip and roll-match
- **Aliases:** rotational defocus whip, spin-out/spin-in, roll-whip, spin-zoom whip, whip-rotate, rotation match, camera roll through, invert-spin.
- **Seen:** 19/82: v03 v13 v17 v23 v32 v34 v39 v42 v45 v49 v50 v56 v63 v67 v74 v75 v78 v81 v82.
- **Frame by frame:** the rotation accelerates ×1.3/frame into the cut. A turns 5–40° (v03 5° + blur 14 px over 6 f; v17 0 → 25° with `bezier(0.7,0,1,0.5)`; v56 −40° plus scale 1.6 over 11 f; v81 −24°/f for 3 f). B starts counter-rotated by 15–30° and unwinds to 0 over 4–20 frames (v17 −15° → 0 in 8 f; v56 roll-match 30° → 10° over 20 f).
  - Roll-match (v23, v56, v67): B starts at the *same* tilt and straightens out, so the rotation reads as one continuous move.
  - v17 adds a hot-colour flare on the last frame. v34 combines it with an invert flash (−9°, scale 1.08).
- **Frames:** out 8 (3–20) + in 8 (4–20).
- **When to use:** disorientation, "the world turned", a twist, or the jump to a new POV (v34). It is also the logo exit (v82 tilt/zoom whip to the logo).
- **Build:** `"transition": {"type": "spin", "frames": 10}`. To get v03's soft version, give B `focus` instead and put A's layers on `exit: "blur"`. Only one transition fits per cut, so the combined spin + focus is an **ENGINE GAP** (proposed `"blur": true` on `spin`).

### 1.7 Punch-in / punch-out jump reframe
- **Aliases:** punch-in cut, snap zoom, step zoom, jump punch with defocus, blurred jump-cut, hero-to-line snap.
- **Seen:** 26/82: v03 v06 v10 v11 v13 v14 v15 v18 v25 v27 v29 v31 v33 v35 v41 v46 v51 v52 v55 v58 v59 v61 v66 v71 v75 v79.
- **Frame by frame:** one frame later the same composition is at 1.1–2.3× (v79 1.1–1.2, v27 1.3, v66 1.3–1.5, v06 1.6, v51 1.6–2.2, v18/v46/v61 2×, v58/v75 2.2×, v03/v35 2.3×, v33 3.5×, v71 4–5×; v52 also jumps *out* to 0.35×), re-centred on the element the VO names. Then a 2–10-frame settle of 3–5%. Optional extras: 3 frames of 8–10 px blur on the new framing (v06, v29), or a continued pan (v13: offset right, easing out over 0.8 s).
- **Frames:** 1 + 4 settle (2–10).
- **When to use:** emphasis on a stressed word ("zero", "drowning", "in history"), pointing at a UI element (the send button), and "not X, but Y" contrasts (punch-in, then punch-out; v25).
- **Build:** make a new scene that repeats the layers of the previous one with every `w`/`size` multiplied by the punch factor and `x`/`y` re-centred on the target: `x' = 50 + (x − tx)·k`. Use `"transition": {"type": "cut"}` and `"camera": {"settle": 1.04}`. For a punch inside a scene that returns, use `camera.punch: [{at: {"word": "zero"}, scale: 1.12}]`; on footage, use the `video` layer's `punch: [{at, scale: 1.4, frames: 1, hold: true}]`. The blur-on-arrival variant: `"transition": {"type": "focus", "frames": 3}`.

### 1.8 In-canvas camera move (a transition with no cut)
- **Aliases:** canvas reframe snap, continuous tilt, whip within one set, world-locked pan, camera truck, crash-zoom + whip-tilt, lens-blur whip, stroke-follow.
- **Seen:** 23/82: v01 v09 v12 v19 v20 v23 v24 v25 v28 v30 v32 v34 v38 v42 v44 v50 v56 v60 v66 v70 v73 v79 v80.
- **Frame by frame:** one big canvas (2–3× the frame) holds both "scenes". The camera translates between regions on an S-curve: ease-in for 5–15 f, a peak of 40–56 px/f at 720 W with 1–3 frames of directional blur, then an ease-out over 10–24 f. Examples:
  - v09: 7 f push → 1 blur frame → new crop 85% settled → 10–14 f decel.
  - v50 / v32: an 18–20 f symmetric ease-in-out.
  - v20: a 90 f tilt-up following a gas plume into the sky.
  - v44: a 46 f vertical scroll with ~5 f of empty sky at peak.
- **Frames:** 18 (3–90).
- **When to use:** beats that belong in one place: a list across a desk, "three angles" of one set, cause → effect along a drawn line (v60), "rises into" (v20). It avoids a cut inside one sentence pair (v70).
- **Build:** put the layers at canvas coordinates beyond the frame (e.g. `x: 150`, `x: 250`) and drive `"camera": {"pan": [{"at": {"word": "second"}, "x": 150, "y": 40, "frames": 18}]}`. **ENGINE GAP:** `pan` has no velocity-scaled motion blur. Proposed: `pan[].blur: true`, giving `blur = 0.4 × |v| px` along the direction of travel and capped at 24 px at 1080 W. Keep labels inside the panned canvas, not in screen space (v66).

### 1.9 Slide push / carousel (both shots visible together)
- **Aliases:** push-up/push-down scene replace, card push, carousel slide, vertical slide push, slide-push, split-screen layout slide, scroll push, snap-up swap.
- **Seen:** 14/82: v02 v04 v07 v08 v09 v12 v21 v42 v47 v58 v62 v66 v67 v82.
- **Frame by frame:** A and B sit side by side, one frame width or height apart (a carousel shows 15% of each neighbour; v42), and translate together.
  - Fast pushes: 2–4 frames with blur (v04, v05, v08).
  - Page-scroll pushes: 6–21 frames, either an ease-in-out (v47 `bezier(0.65,0,0.35,1)` over 20 f; v42 21 f in-out cubic) or a 2-frame rise with an exponential decay ×0.8/frame (v02).
  - Children stagger by 2 f (v07).
- **Frames:** 10 (2–21).
- **When to use:** "next option on the menu", lists of alternatives, scrolling a feed or page, and the before/after of the same layout system.
- **Build:** a fast push ≈ `"transition": {"type": "whip-left", "frames": 6}`. **ENGINE GAP** for a true push in which both scenes are visible and travel one frame width on an in-out curve. Proposed `"type": "push-left|right|up|down"`: render A and B in one flex row, `translateX: 0 → −100%` with `bezier(0.65,0,0.35,1)` over 10–20 f, blur only if the peak exceeds 30 px/f.

### 1.10 Entrance-carried cut
- **Aliases:** empty set then hero rises, 3D object entrance mid-rotation, pendulum swing-in, drop-in layer, drop-in from lens, hard cut onto a sliding device, rise-in window.
- **Seen:** 15/82: v06 v08 v15 v17 v19 v36 v38 v46 v50 v54 v58 v59 v67 v68 v83.
- **Frame by frame:** a hard cut lands on a bare or near-bare set (v15: 2 frames of empty felt). The hero arrives within 0–4 frames and absorbs the jolt:
  - rises from the bottom with a +6° kick (v15);
  - starts edge-on at `rotateY(110°)` and turns to 0 over 5 drawings (v06);
  - swings in on a damped pendulum (v08, v68);
  - drops in at 300% defocused → 100% over 16 f, peaking at f4 (v67);
  - lands from 115% blurred in 15 f (v50);
  - enters from the edge with a 9 f ease-out (v83).
- **Frames:** 10 (5–16).
- **When to use:** introducing the subject of the next sentence ("Jensen", "the phone", the product), or a re-entry after the text clears (v38).
- **Build:** `cut` + image `anim: "rise" | "drop" | "slide-*" | "spin-in" | "stamp"`, with the layer `at: 0.03–0.13`. For the 300% lens drop use `anim: "focus"` + `w` large and **ENGINE GAP**: proposed `anim: "lens-drop"` with scale 3 → 1 and blur 24 → 0 px over 16 f, expo-out. For a pendulum, put `float` on a top pivot: **ENGINE GAP**, proposed `anim: "swing"` with `rotate 35° → 0` on a damped spring (`damping 12`) and `transformOrigin` at the top.

### 1.11 Action cut (click-cut)
- **Seen:** v33 (the cut lands on the frame where the button squash bottoms out). v53 is similar: a counter value swap with a 1-frame zoom jolt of −10.6 reads as a cut.
- **Frames:** 0.
- **When to use:** UI demos: show the *result* of the click in the next shot.
- **Build:** a `cursor` path with `click: true` at time *t*, and the next scene `start` = *t* + 0.03 s, `transition: cut`.

---

## 2. Flashes and exposure

### 2.1 Dip to black / black frames
- **Aliases:** 1-frame black flash, black blink, black gap, cut to black, dip to black with zoom kick, backdrop drop, black strobe.
- **Seen:** 25/82: v02 v04 v07 v11 v12 v16 v17 v20 v21 v23 v24 v35 v39 v41 v57 v61 v62 v64 v65 v74 v75 v77 v79 v82 v83.
- **Frame by frame:**
  - Blink: 1 black frame (2 on twos) between scenes (v20, v62, v64, v75).
  - Gap: 2–3 black frames (v17, v41).
  - Dip: opacity → 0 over 3–4 f, 3–6 black frames, then a hard cut in or a fade-up (v21 6 f; v82 4 f down + 3 hold; v83 6 black frames then a fade-up while pulling back; v11 fade-up 20% → 100% over 0.5 s; v23 a 21-frame light-up).
  - A 3% scale-down kick during the dip (v35).
- **Frames:** 2 black (1–7); up to ~25 including the ramps.
- **When to use:** "resets the eye before a big new set" (v20), a chapter break (v21 before the collapse), the reflective half of a story (v17), a punctuation pause between "what it is" and "the catalogue" (v83), a blink before the CTA world (v62).
- **Build:** `"transition": {"type": "black", "frames": 2}` (`color` for a near-black like `#0b0b0c`). For a fade-up from black, set B's layers' `anim: "fade"` (or text `anim: "ghost"`) with `at: 0`. Pair it with a low impact or a silence gap in the music.

### 2.2 Luma-flip hard cut (dark ↔ light)
- **Aliases:** dark → light hard cut, brightness slam, quiet-to-loud cut, light-to-paper cut, cut on beat with luma flip.
- **Seen:** 18/82: v06 v07 v25 v26 v29 v33 v34 v37 v44 v48 v50 v52 v53 v55 v63 v70 v73 v75.
- **Frame by frame:** one frame changes mean luma by 15–190 units (v07 11 → 63, v29 11 → 138, v37 51 → 148, v44 30 → 154, v53 55 → 184, v75 33 → 244, v50 a 190-unit diff). It is often followed by 0.3–0.4 s of empty hold (v50).
- **Frames:** 0.
- **When to use:** a scroll-stopper in the hook, an act break, "story over, now the pitch" (v37, v33, v44), "impact" without a white flash (v53). Save the brightest frame of the video for the CTA (v33).
- **Build:** `cut` + B `background: {kind: "paper"|"solid", color: "#f4f2ee"}` after a `void` A, or the reverse. Make the luma jump ≥60 units for an act break.

### 2.3 Invert flash
- **Aliases:** negative frame, flash hit, invert-spin flash, frame inversion.
- **Seen:** 17/82: v04 v17 v21 v34 v45 v47 v49 v54 v56 v65 v68 v71 v75 v77 v78 v79 v80.
- **Frame by frame:** 1–3 frames of `invert(1)` (often with `hue-rotate(180deg)`, so red → cyan and lime → violet `#6d5cff`), on the first frames of B or the last of A. Variants:
  - Both sides (v68, v79): the last A frame inverted, then the first B frame inverted, then normal.
  - Red frame, then 2 inverted (v21).
  - 1 white frame, then 2 inverted frames that preview the next word (v80).
  - With 6–8 px blur (v78), with a −8% scale jolt (v54), or rotated −9° and scaled 1.08 (v34).
- **Frames:** 2 (1–3).
- **When to use:** a camera-flash "shock" cut, a chapter change (story → present-day footage, footage → CTA; v68), one "snap" per list item (v34), landing on an impact word (v78 "for").
- **Build:** `"transition": {"type": "invert", "frames": 2}`. **ENGINE GAP** for the two-sided and rotated variants. Proposed params `"side": "both"` and `"kick": {"rotate": -9, "scale": 1.08}`. Pair with an impact SFX.

### 2.4 Exposure bloom / burn-to-white
- **Aliases:** white exposure flash, push + bleach, light-flash push, brightness-pop cut, lamp-bloom white-out, scan flash, wash to white, white bloom flash, fade-to-white.
- **Seen:** 16/82: v01 v02 v03 v21 v31 v35 v40 v43 v46 v47 v49 v50 v51 v56 v61 v82.
- **Frame by frame:** exposure ramps up over 3–8 frames (luma +50 to +120, often desaturating and with the push still accelerating). The frame holds near white for 0–7 frames, the cut hides at the peak, and B decays from white over 3–6 frames.
  - v43 is the cleanest measurement: luma 108 → 137 → 164 → 227 → 248, held for 2 frames, then 219 → 192 → 158 → 98 (3 up, 2 hold, 4 down).
  - v40: 3 up and 6 down. v56: a 4-frame triangle to 80% white. v03: 5–8 up and 4 hold.
  - Radial version from a light source: v50 lamp, v47 scanner bracket.
- **Frames:** 9 (3–20).
- **When to use:** "magic happened", product reveals, the move from hook to product, hiding a cross-dissolve inside overexposure (v56), the light-switch into a bright CTA (v35, v49).
- **Build:** `"transition": {"type": "flash-ramp", "frames": 9}` (a 5-frame ramp to white, then the fall-off). For a radial bloom from a point (v47, v50): **ENGINE GAP**. Proposed `"origin": {x, y}`: a white radial gradient scaling 1 → 6× with opacity 0 → 1 over 4 f, `mix-blend-mode: screen`, and `saturate(0)` on A.

### 2.5 White flash frame
- **Aliases:** white-frame flash cut, impact frame, flash-frame cut, flash + match-cut.
- **Seen:** 15/82: v12 v17 v22 v24 v28 v45 v47 v49 v64 v65 v67 v74 v76 v78 v80.
- **Frame by frame:** 1 pure-white frame (luma 214–248; 2 frames for an accent), then B. Either B starts clean or white decays over ~6 frames (v12). v78 adds a 1-frame 120% punch on B. v64 uses a brightness pop of +60 luma instead of pure white.
- **Frames:** 1 + 0–6 decay; total median 2 (1–7).
- **When to use:** between montage clips landing 0.1 s after the beat (v17), impact when objects land (v67), a match cut (v28: real eye → mask lens in the same screen area), the last beat before the CTA (v28).
- **Build:** `"transition": {"type": "flash", "frames": 4}` (1 white frame, then ~55%/frame decay). Use `color: "#f4f2f2"` for an off-white. Pair it with an impact or a camera-shutter SFX.

### 2.6 Strobe
- **Aliases:** strobe flash intro, strobe-in, invert strobe, colour strobe, background strobe, logo colour-flash sequence, flicker-on type, countdown card flicker.
- **Seen:** 12/82: v11 v16 v18 v28 v35 v38 v41 v49 v56 v65 v71 v73.
- **Frame by frame:**
  - Openers alternate single frames white ↔ black or glyph (v18 the first 10 frames; v35 4 frames; v28 1 halftone + 1 black).
  - Invert strobes toggle every 1–2 frames for 3–13 frames with a 3% zoom pulse on each "on" (v65, v71 landing on the onset).
  - Colour sequences hold each colour for 5–8 f (v11: yellow → blue → white → black, ending on an inverted logo held 0.83 s).
  - Flicker-on type: opacity `[0,0,1,1,0,1,1]` over 7 f with a cyan bloom (v41).
- **Frames:** 4 (2–45).
- **When to use:** a cold open on the first downbeat, an impact word, a brand or logo moment, or "power on".
- **Build:** chain 1–2-frame scenes, each with `duration: 0.034` (1 f at 30 fps), `background: {kind: "solid", color}` and `transition: cut`. Set `animFps: 0` on them. For an invert strobe, alternate 2-frame scenes that repeat the same layers with `transition: invert`. Proposed: `"type": "strobe", "pattern": ["#fff","#000"], "frames": 4`.

### 2.7 Light-leak burn
- **Aliases:** light-leak burn to white, film burn, logo film burn, warm light wash, light-leak carry, orange light burn, light-leak bloom flash.
- **Seen:** 11/82: v03 v09 v34 v58 v69 v74 v75 v76 v77 v78 v81.
- **Frame by frame:** a warm radial bloom (`#f16c12`, `#f5a623`, `#ffb347` → white, or `#fad162` → `#f48c4d`) enters from a frame edge or corner for 2–4 frames, peaks at near-white (luma 250) for 1–3 frames, and the cut hides under it. B fades out of the white over 2–5 frames, often with a cool cyan-white flare peeling off (v78) or brightness 1.4–1.8 → 1 (v77, v81).
  - v75 keyframes: opacity [0, 1, 1, 0] at [0, 2, 5, 7].
  - v76 carry: a pink leak tints the end of A and stays 2 f into B, 10–14 f total.
  - v69: the burn is shaped like a logo, with ragged edges and grain.
- **Frames:** 7 (2–21).
- **When to use:** warm and nostalgic, "film" tone, story → reflection, the transition into footage, a brand moment.
- **Build:** **ENGINE GAP.** The approximation is `"type": "flash", "color": "#ffb347", "frames": 6`, but it is flat, not radial. Proposed `"type": "leak"` with `color`, `from: "tl|tr|bl|br|top|bottom"`, and `frames`. Implementation: a radial-gradient layer (colour → `#fff` → transparent), radius 150% of the diagonal, centred off-frame at `from`, `mix-blend-mode: screen`. Opacity keyframes [0, 1, 1, 0] at [0, 3, 5, 8] with a hard switch A → B at f4, plus `brightness(1.4 → 1)` on B over 5 f.

### 2.8 Cut to void / statement card
- **Aliases:** cut to black void, black statement card, type-only void, text card, paper breath card.
- **Seen:** 10/82: v02 v05 v09 v11 v13 v15 v19 v25 v40 v56. v26 uses the white version (paper breath card).
- **Frame by frame:** a hard cut to pure black (or a grey gradient or near-white paper). The camera is **locked** (no settle). The first word appears at 30–40% grey and blurred, and resolves (v09).
- **Frames:** 0; the card holds for 1–3 s.
- **When to use:** "statement" captions between collage scenes, the turn, the reframe, the punchline (v15), abstract sentences, the threat and the answer as bookends (v19), tonal breaks before a reveal (v13).
- **Build:** a new scene with `background: {kind: "void"}`, `camera: {settle: 1, drift: 0}`, `transition: cut`, and text `anim: "ghost"` or `"focus"`.

### 2.9 Colour-wash flash
- **Aliases:** red flash, flash hit, colour-channel strobe, flash-glitch colour frames, blue wash, ember flash, lime halftone flash, colour-wash bloom open.
- **Seen:** 9/82: v18 v21 v53 v58 v59 v61 v65 v71 v78.
- **Frame by frame:** the frame floods with a saturated tint over 1–4 frames (v59 lilac → magenta → hot pink, saturation 59 → 211; v78 1 frame of `#c00` multiply; v53 1 frame of `#1fae5a` green sampled from the light; v21 `#c0201a` + screen). The cut hides under it, and B starts tinted and relaxes to its natural grade over 20–25 frames (v59). Other variants:
  - Brand-coloured single-frame plates: v71 yellow-on-white → black with a blue streak → solid blue → blue with blocks.
  - A lime dot-grid vignette fading over 6 f (v18).
  - Opening: v58 a `#2b91f5` layer at 0.9 → 0 opacity with a backdrop blur of 20 → 0 px over 7 f.
- **Frames:** flood 4 (1–7) + relax 20 (0–25).
- **When to use:** "AI magic / generation" (v59, v18), an impact frame to kick off a montage (v78), a brand-colour punctuation.
- **Build:** `"transition": {"type": "flash", "color": "#ff3fa4", "frames": 4}`. **ENGINE GAP** for the tinted relax on B. Proposed `grade.from: {saturation: 3, hueRotate: -20, frames: 24}`, i.e. `filter: saturate(3) hue-rotate(-20deg)` → `saturate(1)` with ease-out. `grade.tint` is static, so it can't relax over time.

### 2.10 Overexposed landing / glare reveal
- **Aliases:** luminance-flash hard cut, glare cut, glare reveal, exposure flash on a mugshot, white-haze dissolve.
- **Seen:** 6/82: v09 v10 v35 v38 v47 v64.
- **Frame by frame:** B's first frame is 1.5–1.8× brighter than its settled luma (v38 76 vs 40) and decays exponentially over 8–12 f, "like the exposure catching up". The glare version adds blur and scale: `brightness(1.8–2.2) blur(12–14px) scale(1.12)` → normal over 15–18 f (v09, v10). v64 adds brightness +90 decaying over 12 f after a black blink.
- **Frames:** 10 (5–18).
- **When to use:** openings (v09, v35, v47), a hero landing (v64), and the cut from a dark UI to a new section (v38).
- **Build:** `"transition": {"type": "flash", "frames": 9}`. For glare, use `focus` on B (blur → sharp) and **ENGINE GAP**: `focus` has no brightness. Proposed `"type": "focus", "bloom": 1.8`.

### 2.11 Fade to black (ending)
- **Seen:** 6/82: v45 v49 v54 v65 v71 v83. v12, v16, v22 and v57 end on a 1-frame black tail.
- **Frame by frame:** a linear opacity ramp to black over 8–10 f (v45 8, v49 10, v65 8). v71 uses a 2 s ramp from end card to black; v83 cuts to 3 black frames "to close the loop".
- **Frames:** 8–10 (3–60).
- **When to use:** only at the very end, after the CTA. In 81/82 videos nothing fades mid-story.
- **Build:** a final scene with `background: {kind: "void"}` whose layers have `until: duration − 0.3` and `exit: "fade"`, or a 3-frame `black` scene to close a loop.

### 2.12 Glow-silhouette reveal
- **Seen:** v45 (14.55, 15.48, 16.15 yellow; 8.24 white).
- **Frame by frame:** the incoming cut-out first appears as a flat `#f5e04a` (or white) fill of its alpha with an outer glow for 3 frames, then the real pixels by f5.
- **When to use:** introducing a person or object in a news montage.
- **Build:** **ENGINE GAP.** Proposed image `anim: "silhouette"`: render the PNG twice; the top copy uses `brightness(0) invert(1) sepia(1) saturate(5) drop-shadow(0 0 30px)`, with opacity 1 → 0 between f3 and f5. The nearest existing effect is image `swap: {glow: true}`.

---

## 3. Masks and irises

### 3.1 Colour-field flood wipe
- **Aliases:** colour-block expand wipe, badge-expand wipe, feathered colour sweep, teal colour wipe, liquid fill wipe, ribbon mask wipe, rising shape wipe, shape-wipe panel with bulge, colour card wipe-down, blue wash.
- **Seen:** 10/82: v23 v28 v51 v54 v58 v62 v64 v68 v71 v74.
- **Frame by frame:** a flat brand-colour shape grows to fill the frame and *becomes the next background*. Shapes seen:
  - v28: a type band grows vertically with sine-wave edges (amplitude 2% H), from 18% → 110% H in 3 f, `Easing.in(Easing.quad)`.
  - v62: a badge band grows from 10% → 100% H over 16 f.
  - v64: a centre strip opens from 6% W to full width with barrel-bulging edges over 16 f.
  - v58: a diagonal flood with a ~25%-soft edge in 2–3 f, then the next colour sweeps over it the same way.
  - v71: a wave path with 2–3 sine bumps at 4% H amplitude rises from 100% to −10% in 6 f.
  - v23: a triangle apex rises from the bottom in 4 f.
  - v54: a sinuous red ribbon carries the new content inside it with parallax.
- **Frames:** 4 (2–16).
- **When to use:** a section heading or keyword taking over the screen ("CONTRAST" becomes the background), a brand-colour beat, lyric line changes.
- **Build:** **ENGINE GAP.** The approximation is `"type": "object"` with a solid-colour PNG `src` (it crosses rather than grows). Proposed `"type": "wipe"` with `shape: "band|wave|diagonal|panel|triangle"`, `color`, `from: "bottom|left|centre|bl"` and `frames`. Implement as an SVG `clipPath` on B, plus a solid layer of `color` that leads it by 1–2 frames: `wave` = path with sine edges (amplitude 2–4% H); `diagonal` = `linear-gradient(135deg, #000 40%, transparent 65%)` mask translating −100% → 0; `panel` = `inset(0 x% 0 x% round 40px)` with x going 47% → −5%.

### 3.2 Circle iris open / portal
- **Aliases:** circular lens iris, iris-expand from a dot, portal / black-hole, circle wipe from type, burn iris, earth iris, radial halftone portal, glowing-point iris, spinning circle iris, glowing portal window grow.
- **Seen:** 8/82: v25 v35 v47 v51 v53 v56 v63 v67. v63 alone uses 4 variants.
- **Frame by frame:** a seed appears at a motivated point (a lamp, a glowing chart vertex, the speaker's mouth, joined palms, the centre of a keyword, a black dot). B opens inside a growing circle (radius 0–60% → past the diagonal) over 2–12 frames with an ease-in. Edge styles:
  - hard (v63 black disc);
  - 2 px white rim plus a glass refraction edge (v35);
  - a white feathered bloom ring at ~15% of the radius, whitening A as it passes (v63);
  - a torn-dirt edge (v67, turbulence-displaced);
  - halftone dots growing toward the rim (v51);
  - soft pink-red burn edges (v67);
  - a rectangle with a white glow (v56).
  - v63 also rotates the whole frame −5°/f during the open.
- **Frames:** 6 (2–12).
- **When to use:** "a window into the next idea": data → story (the end of the stat becomes the window; v63 25.03), a portal or "go inside", look-closer beats, the CTA open (v53).
- **Build:** `"transition": {"type": "circle", "frames": 6}`. **ENGINE GAP** for origin and edge. Proposed `"origin": {"x": 62, "y": 18}`, `"edge": "hard|rim|bloom|rough|halftone"`, `"shape": "circle|rect"`. Implementation: `clipPath: circle(r at x% y%)` with r interpolated 0 → 150% using `Easing.in(Easing.quad)`. `bloom` = a radial-gradient white ring layer at the same r (blur 30–40 px) plus A `brightness → 1.6`. `rough` = `feTurbulence` + `feDisplacementMap` (scale 20) on the mask.

### 3.3 Letterbox open / close / slit
- **Aliases:** letterbox close-in, letterbox open, letterbox collapse, letterbox window, mask-collapse reframe to 9:16, "darkness" slit-wipe.
- **Seen:** 7/82: v18 v37 v77 v78 v79 v80 v81.
- **Frame by frame:**
  - Close-in (v78, v79): B is full-frame on the cut, then black bars slide in from top and bottom to 255 px each (20% H each on 1280 H) over 6–7 f with an exponential ease-out, while the content scales 1 → 0.98. The **reverse (letterbox → full-bleed) is always an instant hard cut.**
  - Open (v77): a 16:9 band, `inset(22% 0)` → `inset(0)` over 10 f, `Easing.out(Easing.cubic)`.
  - Collapse (v80): `inset(42% 0)` over 3–4 f, a "cinema" cue.
  - Slit (v37): a dark band at y ≈ 48% thickens over 3 f, then B expands from it to full by f5 (the top edge moves faster than the bottom).
- **Frames:** 6–7 (3–16).
- **When to use:** a "cinema" or "story" register, quotes and footage, a chapter-like change of format, darkness swallowing a subject (v37).
- **Build:** **ENGINE GAP.** `finish.letterbox` is global and static. Workaround: two full-width black `image` layers (`w: 100, h: 20`) at `y: 10` / `y: 90` with `anim: "slide-down"` / `"slide-up"`. Proposed `"type": "letterbox"` with `to: 0.2` (bar height as a fraction of H), `frames: 7` and expo-out; `to: 0` opens it. Implement with `clipPath: inset(${p}% 0 ${p}% 0)` on the scene.

### 3.4 Spotlight iris close / vignette close
- **Aliases:** spotlight iris, lens vignette close, organic iris-close, iris close + flash cut, defocus + vignette out, dim-out.
- **Seen:** 6/82: v32 v34 v47 v54 v63 v77.
- **Frame by frame:** a soft-edged circular vignette closes from the frame edge to 22–70% of the width and either stays as a pool of light (v32: radius 120% → 22% over 28 f, outside at 25% opacity, 40 px feather; v47: the stop moves 80% → 35% in 6 f) or closes fully, followed by a hard cut (v34: 4 f, then a hard cut to bright sky with luma ×3.8; v54: 8 f with a noise-displaced edge, then 4 frames of grunge texture).
- **Frames:** 8 (2–28).
- **When to use:** "focus on this proof object", the turn text inside the pool (v32), "look closer" (v63 microscope), a dark close before a bright reveal.
- **Build:** **ENGINE GAP.** Proposed `"type": "iris-close"` with `to: 0.22` (radius as a fraction of W), `feather: 40`, `outside: 0.25` and `frames`. It is a scene-level overlay: `radial-gradient(circle at x y, transparent r, rgba(0,0,0,.85) r+feather)`. For a non-cut spotlight, add proposed `grade.spotlight: {at, r, frames}`.

### 3.5 Ink / organic blot matte
- **Aliases:** ink-blot luma matte, ink/liquid wipe, ink-blot shape wipe, smoke/burn wipe, ink-disintegration morph.
- **Seen:** 5/82: v10 v23 v30 v32 v42.
- **Frame by frame:**
  - v10: 2 steps of flat red, then irregular black blobs grow and B shows through the "holes"; the blobs shrink to a dark centre spot (~16 f).
  - v23: black tendrils sweep across the paper until the frame is black (~13 f).
  - v42: a green blob with a torn edge grows from *behind the subject* (the subject matte stays above it) over ~30 f, `Easing.out(Easing.quad)`.
  - v30: a smoke/char matte eats from the centre outward, leaving scraps of A at the top and bottom edges for 2–3 updates.
  - v32: a figure breaks into ink and smoke particles from the edges inward, a brightness flash peaks mid-way, and the new figure reassembles over 6–9 f.
- **Frames:** 15 (6–30).
- **When to use:** organic and emotional turns, history or art tone, "the old version dissolves into the new one" (v32 figure states), darkness spreading.
- **Build:** `"transition": {"type": "ink", "frames": 15}`. **ENGINE GAP** for the behind-subject growth (v42: put the cut-out in both scenes on top with `anim: "none"`; see 5.6) and for particle disintegration (a custom component: a noise-threshold mask sweeping 0 → 1, plus a particle emitter on the mask edge).

### 3.6 Line / bar wipe
- **Aliases:** scan-line wipe, line wipe, white bar wipe, bar wipe, light sweep, white panel wipe with hard mask edge.
- **Seen:** 5/82: v18 v34 v47 v60 v76.
- **Frame by frame:**
  - Line: a white 2–6 px vertical line crosses L → R over 13–15 f; the area it has passed shows B (hard edge plus a white seam; v18 before/after upscaling, v60).
  - Bar: a light-grey panel 15–25% wide sweeps in 3–4 f, with B revealed behind its trailing edge (v60, v76).
  - Sweep: a soft vertical white bar crosses in 2 f (v34).
- **Frames:** 5 (2–16).
- **When to use:** before/after comparisons, "scanning", clean UI section changes.
- **Build:** **ENGINE GAP.** The approximation is `"type": "object"` with a white-bar PNG `src` (`color: "#e6e6e6"`). Proposed `"type": "wipe", "shape": "line|bar", "direction": "right", "seam": "#fff", "width": 0.25`. Tie B's `clipPath: inset(0 ${100−x}% 0 0)` to the bar's x.

### 3.7 Lens / loupe / keyhole reframe
- **Aliases:** lens/iris re-frame, magnifier loupe wipe, keyhole push-through, keyhole pull-back.
- **Seen:** 4/82: v08 v53 v66 v67.
- **Frame by frame:**
  - Loupe: a thick black ring (porthole or magnifier rim, ~20% W thick) sweeps in from the side over 2–4 f, and the area inside shows the scene at ×1.6–2.2 with a soft circular vignette feathered at ~15% of the radius (v08, v53). It can slide again to re-frame (v08 21.19).
  - Keyhole: a blurred keyhole PNG racks into focus, then the camera pushes through the opening (×2.5 over ~12 f, ease-out); the foreground scales ~3× faster than the background (v66).
- **Frames:** 7 (2–12).
- **When to use:** "look closer", evidence, investigation, a secret.
- **Build:** **ENGINE GAP.** Keyhole workaround: a foreground keyhole `image` (PNG with alpha, `w: 300`) in A, then `"transition": {"type": "zoom"}`. Proposed `"type": "loupe"` with `{x, y, r: 0.3, zoom: 2}`: a ring SVG translating 120% → 0 over 2–4 f, and B rendered at `scale(2.2)` with `radial-gradient(transparent 55%, #000 75%)` masking.

### 3.8 Shape / logo iris
- **Aliases:** blob-shape iris, speech-bubble mask morph, logo film burn (shape).
- **Seen:** 3/82: v28 v35 v69.
- **Frame by frame:**
  - v35: a brand-silhouette clip path (cream fill, thin white outline) scales 0.1 → 3.5 from the centre over 8 f with `Easing.in(Easing.cubic)`, carrying B and a halftone texture that fades over the last 3 f.
  - v28 (the reverse): the full frame is clipped by a rounded rect + tail that shrinks to 45% W over ~6 f while its fill fades to flat blue `#1f56b0`.
  - v69: a logo-shaped burn with turbulent edges grows 0.6 → 2.5 over 3–4 f.
- **Frames:** 6 (3–8).
- **When to use:** a brand moment or a speech or quote. Use **your own** generic shape (bubble, star, blob), never another creator's logo.
- **Build:** **ENGINE GAP.** Proposed `"type": "circle", "shape": "path:<svg-d>"`, a generalised iris with an SVG `clipPath`, scaled `0.1 → 3.5`.

---

## 4. Object and physical wipes

### 4.1 Paper / panel slide-over
- **Aliases:** slide-in paper overlay, torn-paper rise, paper slide-up, slide-up cover wipe, plate slide-up, slide-up panel push, card drop-over, card slam, patch slam, rise-over, perspective screen slide-in, side panel slide, slide-over black card, panel overlay, layer wipe-over.
- **Seen:** 17/82: v05 v08 v15 v19 v21 v22 v25 v28 v29 v44 v48 v56 v62 v64 v67 v78 v82.
- **Frame by frame:** a full-frame (or 80–100%) sheet carrying B (newspaper, notebook page, dark plate, UI panel) slides up or in over A. It peaks within 3 f and decelerates over 4–14 f (v25: peak at 3 f, 12 f settle, a dark shadow band along its leading edge). The sheet has a contact shadow and often a torn white edge (v19), a slight rotation (v22) or vertical blur (v67, peak 30–52 px/f). Card slams scale 1.3 → 1.0 over 7 f expo (v08). In v56 B is blurred 12 → 0 px while rising on 2s.
- **Frames:** 8–10 (4–22).
- **When to use:** evidence ("here's the document"), "meanwhile, the paper reported…", adding a layer of explanation while A stays as context (v78), a physical page-turn feel in collage explainers.
- **Build:** `"transition": {"type": "slide", "frames": 8}` (B slides over a dimming A). Give B `background: {kind: "paper"}`. For torn edges, use an `image` with `cutout: true` as B's main layer. **ENGINE GAP:** direction (`slide` is single-direction) and in-scene overlays that keep A visible (v78 panel; workaround: a `ui` `window` or `image` layer with `anim: "slide-up"` inside A).

### 4.2 Foreground occluder / object wipe
- **Aliases:** occluder wipe, object fly-through, rolling-hubcap wipe, axe smash, vehicle wipe, throw-in, dark fly-through, tree-trunk wipe, send-icon swoop, icon-led transition, object-into-lens, shard dim, sticky-note flip mask, dark band wipe-down.
- **Seen:** 17/82: v01 v03 v05 v10 v17 v23 v32 v34 v39 v63 v66 v69 v74 v76 v77 v78 v80.
- **Frame by frame:** a large dark, motion-blurred object crosses close to camera, translating −30% → 130% (or scaling 0.3 → 3–4× as it flies at the lens) over 3–10 f. It covers 80–100% of the frame for 2–4 f, with luma dipping to ~24 (v01). The scene switches on the frame of maximum coverage, and B is revealed as it passes (v03: luma 70 → 244 in 2 f).
  - Light objects work too: a giant brand-blue icon covering ~40% in 3 f (v80), a tumbling paper prop (v34), an Ae-style app icon rotating −25° → 10° while scaling 0.6 → 1.4 (v76).
  - v32 adds an RGB split and a full-frame blur of 4 → 10 px during the pass.
- **Frames:** 6 (3–20).
- **When to use:** one-world continuity (v01 hides *every* change behind the statue), action verbs (smash, throw, drive), and the move from type to object.
- **Build:** `"transition": {"type": "object", "src": "props/trunk.png", "frames": 8}`, or `"color": "#111"` for the default dark disc. Pick a PNG that relates to the story (a motivated object). **ENGINE GAP** for direction and scale-through-lens. Proposed `"path": "lr|rl|bt|tb|lens"`; `lens` = scale 0.3 → 4 with `rotateY 40° → 0`, ease-in, cut at 100% coverage.

### 4.3 Card / disc flip
- **Aliases:** card-flip portal, card flip "not X but Y", tilted card swap, perspective band unfold, 3D book open, 3D card tilt/flip pair, disc flip, 3D tilt-away, card spin-away.
- **Seen:** 8/82: v22 v28 v30 v37 v44 v64 v75 v82. v06, v49 and v74 use related 3D rotations.
- **Frame by frame:** a card rotates on Y with `perspective: 800–900px` for 4–10 frames. At 90° (edge-on, with a ~4 px horizontal blur) the face texture swaps, and it unwinds to 0°.
  - v44: 0 → 180° over 10 f, landing on a music onset.
  - v82: an ellipse grows from a vertical line to a full circle over 10 f, carrying new text; the reverse sends the text into strips.
  - v37 portal: at edge-on the back face is a window already holding B; the camera zooms through it (12/frame decaying over 8 f) until the border leaves the frame.
- **Frames:** 10 (2–30).
- **When to use:** "not X, but Y", a reveal of the other side, before/after, tarot-like reveals (v44), the start of a CTA (v30 book opens).
- **Build:** **ENGINE GAP.** Write a custom component `FlipCard {front, back, at, frames: 10, axis: "y"}`: `rotateY` 0 → 180 with `Easing.inOut(Easing.cubic)`, swap at 90°, `backfaceVisibility: hidden`. Proposed `"type": "flip"`, which renders A on the front and B on the back of a full-frame card. The portal = `flip` + `zoom`.

### 4.4 Cloud / smoke / fog pass
- **Aliases:** cloud push-through, cloud wipe, cloud tilt-through, fog wipe, push-through clouds, smoke reveal, white haze.
- **Seen:** 7/82: v14 v16 v31 v32 v36 v50 v60.
- **Frame by frame:** 2–3 cloud or smoke PNGs at 120% W rise from y = 110% (or scale 1 → 2.5 toward the lens), with staggered 3 f offsets, covering the frame to near-white (luma 204–236) for 2–5 frames. The scene swaps under the cover, and the clouds keep travelling out on the new scene while decelerating. v31 is the long version: A tilts up for 27 f (ease-in), the clouds hold for 5 f, then travel out over 12 f, ~36 f in total. v32 uses warm sepia fog with A visible through it at ~20%.
- **Frames:** 16 (9–36).
- **When to use:** openings (from white into the world; v14, v50), time passing, "up in the sky / dreams", the move from earth to sky (v31).
- **Build:** `"transition": {"type": "object", "src": "fx/clouds.png", "frames": 12}`. **ENGINE GAP** for the vertical rise and scale-through. Proposed `"path": "bt"` / `"lens"` (see 4.2) and `"hold": 3`.

### 4.5 Shatter / burst / crumple
- **Aliases:** glass shatter, overflow shatter, type shatter, object burst (gift lid), stop-motion crumple.
- **Seen:** 5/82: v28 v29 v57 v60 v65.
- **Frame by frame:**
  - Glass (v60, ~15 f): the card breaks into 20–30 Voronoi shards that fly outward from the centre with rotation and gravity (y += ½·g·t²), revealing the next layer.
  - Overflow (v28, ~16 f): glyphs pile at an edge and fall with ±180° rotation, then the frame whites out.
  - Lid burst (v65): −400 px with 25° rotation in 3 f plus 1 dark frame.
  - Crumple (v29): 4 crumple PNG states on 3-frame holds while scale goes 3 → 1.
- **Frames:** 15 (2–30).
- **When to use:** "it broke", a failure, an overflow, unboxing, rejection (crumple → bin).
- **Build:** **ENGINE GAP.** Write a custom component `Shatter {src: A-still, shards: 24, at}` with precomputed polygons as `clip-path` copies, each given `v0` from the centre and `rotate`. Render A's last frame with `remotion still` as the source.

### 4.6 Paper tear-open
- **Aliases:** paper-hole tear-open, paper-tear reveal, torn film-strip wipe.
- **Seen:** 3/82: v28 v62 v66.
- **Frame by frame:**
  - v62: a torn-edge hole in a dark texture scales from 40% → >150% of the frame over 8 f with a spring (`damping 18`) and a newsprint ring.
  - v66: 3–4 ragged white-edged holes tear open and merge over ~7 f.
  - v28: 4–5 torn strips (12–15% H each) sweep in alternating directions over 4 f with a 1 f stagger, and stay on as decoration.
- **Frames:** 7 (4–8).
- **When to use:** collage openings, "breaking through", archive and paper worlds.
- **Build:** the approximation is `"type": "ink", "frames": 8`. **ENGINE GAP:** proposed `"type": "tear"`, an SVG mask of a jagged path (`feTurbulence` + `feDisplacementMap` on a growing circle) with a 4 px white stroke on the edge.

### 4.7 Sticker / card burst cover
- **Aliases:** sticker burst cover, card explosion in, thumbnail vortex.
- **Seen:** 3/82: v27 v52 v57.
- **Frame by frame:** v27: ~30 white-bordered cut-outs scale 0 → 1 outward from the centre with a 0.5–1 f stagger, at random ±15° and 12–30% W, covering the frame in 4 f. The scene swaps underneath, then the sticker field drops away with an ease-in over 5 f, with per-sticker delays of 0–2 f. v57 sends 3 waves of cards flying from in front of the camera to their slots. v52 spirals cards in (rotation −30° → 0°, radius 900 → 420 px) over ~40 f.
- **Frames:** cover 4 + drop 5 (4–40).
- **When to use:** "everyone / a flood of…", social proof, "so many options".
- **Build:** composable in the engine: 25–30 `image` layers with `anim: "pop"` and `at` staggered by 0.017–0.033 s, ordered by distance from the centre, then the next scene with `transition: cut`. **ENGINE GAP** for the drop-away (proposed `group` `exit: "slide-down"` with a per-child delay).

### 4.8 Slab / shutter / fold wipe
- **Aliases:** black-slab wipe, black slab + smear, chevron paper-fold wipe, door/roller-shutter reveal.
- **Seen:** 3/82: v60 v71 v82. v22 also uses a roller shutter on the way into its zoom-through.
- **Frame by frame:**
  - v82: a full-height black slab enters from the left and covers the frame in 8 f (ease-in-out), then lifts upward like a shutter in 7 f to reveal B. A persistent pill stays on top and swaps its text while covered.
  - v60: two paper panels meet in a V whose apex travels down over ~30 f.
  - v71: a black slab covers the lower half while the text smears, then goes to full black (3 f).
- **Frames:** 15 (3–30).
- **When to use:** antithesis ("selling… → storytelling"), page and section changes.
- **Build:** approximately `"type": "object", "color": "#000", "frames": 8`. **ENGINE GAP:** proposed `"type": "wipe", "shape": "slab", "then": "lift"`.

### 4.9 Hand / cursor drag wipe
- **Aliases:** hand-pull wipe, hand-of-god insert, cursor-dragged page wipe.
- **Seen:** 2/82 (v44, v62); v62 uses it twice, once with a cursor.
- **Frame by frame:** a cut-out hand (white scribble outline) grabs the top edge of A and drags it down out of frame over ~20 f (ease-in), exposing B above (v62). Or a body part enters from the top with heavy blur, performs the change under occlusion, and exits (v44, ~10–20 f). Or a cursor drags a grid-paper sheet in diagonally, followed by 1 black frame (v62).
- **Frames:** 15 (10–20).
- **When to use:** "behind the scenes / the maker's hand", process reels, the move into a CTA world.
- **Build:** **ENGINE GAP.** The cursor version is composable: a `cursor` path plus an `image` sheet with `anim: "slide-*"`, timed together, then `black` 1 f. A hand that pulls A needs a custom component (A's translateY with a hand PNG pinned to its top edge).

---

## 5. Morphs and match cuts

### 5.1 In-place swap / state cut
- **Aliases:** prop replacement, in-place object swap, glow-flash swap, block replacement, word swaps on the same ground, "FFX drop", in-shot value swap, X-ray flash, state cut, blurred jump-cut, in-place UI swap.
- **Seen:** 12/82: v05 v12 v13 v14 v29 v36 v53 v56 v60 v64 v69 v77.
- **Frame by frame:** the set, island, shadow and title stay. The prop, word or value is replaced on the noun in 1–3 frames, with a ±2–5% scale kick over 3 f (v36, v12), a 2–3-frame outer glow (v05 pizza → cardboard), 3 frames of heavy vertical blur (v14 `stdDeviation 0 40`), a 1-frame camera jolt (v53) or a 4-frame X-ray version (v56).
- **Frames:** 1–3.
- **When to use:** "a new visual per noun" at the lowest cost, reveal-the-truth beats, before/after, counters.
- **Build:** image `"swap": {"src": "cardboard.png", "at": {"word": "cardboard"}, "glow": true}`. For text, use two text layers with `until` / `at` on the same word. Add `camera.punch` with `scale: 1.03` for the kick.

### 5.2 Cross-dissolve
- **Aliases:** crossfade, double exposure, micro-dissolve, zoom-out dissolve, spin-push + dissolve, transparency-checkerboard dissolve, whip + cross-dissolve, cross-dissolve to white with type continuity.
- **Seen:** 10/82 only: v02 v28 v30 v39 v44 v60 v79 v80 v82 v83. Most of the library never dissolves, which is the lesson.
- **Frame by frame:** linear or ease-in-out opacity over 3–19 frames, almost always *combined* with motion: a zoom-in midpoint (v30, ~15 f, peak ~40 px/update), scale-down (v79, 6 f), a decelerating pan (v83, 12 f), rotation (v39, 4 f), or the next line already typing (v82, 19 f). v60 dissolves through a checkerboard at 75% white to say "these are PNG layers".
- **Frames:** 8 (3–19).
- **When to use:** soft emotional moments, ground → space (v44), a match dissolve on a shared element (v30's date "1893"), the dark CTA entry (v79). Never use it as the default.
- **Build:** **ENGINE GAP** (no dissolve type). Through-colour versions exist: `flash-ramp` (through white) and `black` (through black). Proposed `"type": "dissolve", "frames": 8, "through": null|"white"|"black"` rendering both scenes for N frames, with B opacity = `Easing.inOut(Easing.cubic)(t)` and both cameras running.

### 5.3 Shape / object morph
- **Aliases:** morph crossfade, bar-to-monolith, card strip → clock hand, pill morph, shape-becomes-UI, footage → caret squeeze, footage → clip, shrink-to-dot → grow-to-disc, collapse to strip.
- **Seen:** 9/82: v17 v23 v42 v50 v52 v55 v59 v76 v82.
- **Frame by frame:** one element animates its bounds (`x, y, width, height, borderRadius`, FLIP-style) from layout A to its role in layout B over 3–22 frames, and cross-fades its contents at the midpoint. Examples:
  - The orb shrinks into the chat avatar (v52, 3–4 f).
  - The footage card's scaleX goes 1 → 0.02 over 9 f with an ease-in while a `#8340df` fill fades in over the last 4 f, so it *becomes* the text caret (v55).
  - A sunburst disc dissolves into a clock face of the same size and position (v17, 12 f).
  - The hero icon shrinks to a 12 px dot, travels, and grows into the next scene's disc container (v82, ~19 f).
  - A white pill covers the headline and stretches into a search bar (v50, CTA).
- **Frames:** 9 (3–22).
- **When to use:** "this becomes that": cause → mechanism, product → UI, idea → tool, the move into the CTA search bar.
- **Build:** **ENGINE GAP.** Custom component `Morph {from: {x,y,w,h,r,color}, to: {...}, at, frames: 8, easing: bezier(0.65,0,0.35,1)}` placed at the end of A and the start of B with identical geometry. Proposed `"type": "morph", "from": "<layerId in A>", "to": "<layerId in B>"`: the engine tweens the bounding box and cross-fades the contents.

### 5.4 Match cut (position / shape / colour)
- **Aliases:** mirrored-set reversal, match dissolve on the date, white flash + match-cut, match cut on the hero object, accent-shape match cut, zoom-through match on a shape, same-location revisit, positional zoom-through match.
- **Seen:** 8/82: v07 v26 v28 v30 v50 v55 v64 v68.
- **Frame by frame:** A and B share a screen position, size, shape or colour, and the cut lands on that shared element. Examples:
  - Same stage, camera and composition with the grade, pose and crowd swapped (v26 sepia → cold blue, joined by a focus-pull cut).
  - The painting keeps its size and position while the environment changes (v50).
  - A purple caret square → a purple timeline clip at a similar position (v55).
  - Barred window → cell bars, sold with a +60 luma pop (v64).
  - "files" → "For" at the same position (v07).
  - The same shop revisited at night (v68).
- **Frames:** 0 (+1 white frame or +60 luma pop optional).
- **When to use:** reversal ("the same moment, reversed"), "same fact, new chapter", time jumps at a fixed location, idea → product.
- **Build:** `"transition": {"type": "cut"}` (or `flash` with `frames: 2`). Give the matched layers **identical** `x, y, w`, and set B `camera.settle: 1.0–1.03` so the match doesn't drift on landing.

### 5.5 Motion bridge / pre-lap
- **Aliases:** motion bridge across the cut, object carry-over, prop-led cut, match-move across the cut, velocity hand-off, object pre-lap, object exit as transition cue.
- **Seen:** 8/82: v05 v11 v30 v34 v53 v57 v66 v82.
- **Frame by frame:** an object already moving at the end of A continues in B with the same velocity and screen path: an arrow (v05), the brain falling out of the bottom of A into the top of B (v66), a boot sliding up one update before the cut (v30), the catalogue shrinking toward and then flying into a mailbox (v34). Pre-lap (v82): B's hero appears *over* A 4 frames before the cut, so the eye is already locked on it.
- **Frames:** visible 1–4 f before + 3–10 f after.
- **When to use:** cause → consequence, "and then…", keeping the eye's anchor through a world change.
- **Build:** composable: put the same `image` in both scenes. In A use `anim: "none"` and an `exit: "slide-down"` timed to the cut; in B use `anim: "slide-down"` (it enters from the top) with `at: 0`. For a pre-lap, add B's hero as a layer in A with `at = duration − 0.13`. **ENGINE GAP** for exact velocity matching (proposed shared `bridge: {id, path, frames}` across scenes).

### 5.6 Persistent element across the cut
- **Aliases:** caption carry-over, punch-in with persistent overlay, text match-cut into UI, background-only cut, anchor dissolve, set dissolve with persistent foreground, flash-frame background swap (object locked).
- **Seen:** 7/82: v31 v41 v47 v59 v80 v82 v83.
- **Frame by frame:** a caption, speech bubble, dot or terminal window holds its exact screen position through the cut (it may keep typing or scrambling) while only the plate, background or container changes, by hard cut (v59, v41) or by a 10–13 f dissolve underneath (v80, v83, v82).
- **Frames:** 0–13.
- **When to use:** continuity of thought across a change of world: "the same sentence, now inside the product" (v59), "same fact, new chapter" (v47).
- **Build:** **ENGINE GAP** (layers are scene-scoped). Workaround: duplicate the layer in A and B with identical `x, y, w, size, style`; set `anim: "none"` in B and `camera: {settle: 1, drift: 0}` on both scenes near the cut, and `transition: cut`. Proposed top-level `overlays: [{layer, from: TimeRef, until: TimeRef}]` rendered above all scenes and outside the camera.

### 5.7 Polarity / inverse match
- **Aliases:** reprise inversion, colour-inverted twin cards, hard invert (same layout), inverse match cut, white flash-up polarity flip, glitch-streak invert.
- **Seen:** 6/82: v06 v20 v34 v51 v71 v81.
- **Frame by frame:** the same layout and type with background and foreground swapped (white-on-black ↔ black-on-white, or blue/white ↔ white/blue), on the beat. It is either instant (v71 1 frame, v81) or ramped as an S-curve over 6 f (v34). v51 adds a 1-frame magenta streak and 3 frames of 10 px blur on the words.
- **Frames:** 0–6.
- **When to use:** antithesis ("X — and then the opposite"), a chant or refrain repeat, "the cut itself is the antithesis" (v20).
- **Build:** a new scene with the same layers and the `palette` `bg`/`ink` swapped (or `text.fx.blend: "difference"` over a background that changes), `transition: cut`. Ramped version: **ENGINE GAP** (see 6.4).

### 5.8 Caption morph exit
- **Aliases:** text blur-dissolve, blur-collapse, blur-morph text swap, weight-morph caption replace, text bloom-out, slot-machine reel.
- **Seen:** 6/82: v01 v50 v51 v52 v57 v61.
- **Frame by frame:**
  - Payoff words blur out one after another over ~15 f, leaving a clean frame for the CTA (v01).
  - Words blur and shrink to dots in 4 f (v50).
  - The old caption tints blue, blurs to a 12 px midpoint and jitters ±6 px while the new one resolves in the same spot (v51, ~4 f).
  - The new word blooms in as a heavy blob and relaxes (v57, 6–8 f).
  - A vertical word list decelerates over ~10 f onto the keyword (v52).
- **Frames:** 6 (4–15).
- **When to use:** type-led promos, between lines inside one scene, clearing the frame before the CTA.
- **Build:** text layer `exit: "blur"` with `until` on the word, and the next text `anim: "focus"` at the same `x, y`. **ENGINE GAP** for the slot reel (proposed text `anim: "reel"`) and the weight morph (a variable-font `wght` tween).

---

## 6. Focus and colour

### 6.1 Focus-pull / defocus cut
- **Aliases:** focus-pull cut, defocus-out bridge, rack-focus open, defocus → rack-focus in, blur-out cut, defocus-in, bloom-defocus cut, blur-dissolve to dark, autofocus hunt pulse, defocus-resolve entrance.
- **Seen:** 24/82: v03 v12 v24 v26 v29 v30 v32 v37 v38 v40 v42 v44 v47 v50 v62 v63 v64 v66 v70 v73 v74 v76 v77 v81. Signature in v24 (×7), v29 (×4) and v32 (×3).
- **Frame by frame:** A softens from 0 → 8–20 px over 3–8 f (often with a 1.06 push; v26). Hard cut. B starts at 8–30 px blur (1.1–4.2% W; v26 20–30 px at 720 W) and sharpens over 3–16 f with `Easing.out(Easing.cubic)`, often while settling from 1.05 → 1 (v70). Variants:
  - Bloom-defocus (v42): `blur [0,18,0]` and `brightness [1,1.35,1]` across [−4, 0, +4] f; the double version pulses twice over 9 f.
  - Snap (v47): 3 frames at 20 px, then sharp.
  - Blur-dissolve to dark (v37): blur plus luma down to 40% over 6 f.
  - Autofocus pulse (v81): a 2-frame 10 px blur at 1.02 scale with a yellow focus bracket, used as an accent.
- **Frames:** 12 total (3–24); out 4 (3–8), in 8 (3–16).
- **When to use:** calm and contemplative VO, documentary, AI-still stories, "one lens focusing on the next idea" (v24). It is the soft cut for gentle tone, where zoom-punch would be too loud.
- **Build:** `"transition": {"type": "focus", "frames": 10}` on B, plus A's layers `exit: "blur"` with `until` = A end − 0.15 s for the defocus-out half. **ENGINE GAP** for blurring A's background together with its layers, and for bloom. Proposed `"type": "focus", "out": 5, "in": 10, "bloom": 1.35` applying `filter: blur()` to the whole outgoing scene.

### 6.2 Desaturate handoff / grade drain
- **Aliases:** desaturate handoff, grade-shift colour → B/W, grade drain, desaturate-dissolve to black, grade-drop cut, smear + desaturation.
- **Seen:** 10/82: v05 v06 v17 v21 v23 v47 v50 v67 v71 v73.
- **Frame by frame:**
  - Handoff (v06): A drains to grey over 3 f (saturation 168 → 146 → 29), the cut lands on the grey frame, and B starts at ~70% saturation, reaching 100% over ≈6 f with `Easing.out(Easing.quad)`.
  - Beat (v05, v17, v21): saturation 1 → 0.1–0.15 over 6–9 f on "collapsed", "the turn", "ugly", with no cut.
  - Grade-drop (v73): a hard cut from a colour shot to a B/W shot.
  - Into black (v21): saturation 53 → 0 over 8 f, then black, before the CTA.
- **Frames:** 6 (1–9).
- **When to use:** "the same thing in a different colour" (lists of competitors; v06), loss and failure, the turn, the past, death (v67).
- **Build:** `"transition": {"type": "desat", "frames": 6}` for the handoff, or `"grade": {"drainAt": {"word": "collapsed"}}` for the in-shot beat (it drains to B/W over 6 frames). A B/W scene is `grade.saturation: 0`.

### 6.3 Dim-and-overlay
- **Aliases:** dim-down + overlay pop, dim-and-overlay, grade dip, dim / eclipse, defocus-to-type.
- **Seen:** 5/82: v07 v23 v31 v49 v69.
- **Frame by frame:** A darkens to 40–50% luma over 5 f (v31 luma 89 → 66 → 35, with `saturate(0.4)`), or greys to `#797979` with blur on everything except the type (v49), or blurs ~12 px to push back (v69). A new element (newspaper, "Done!!", a question) pops in on top. It is a "scene within a scene" without a cut, like a modal state.
- **Frames:** 5 (4–15).
- **When to use:** questions, quotes, pop-ups, "focus on this" over context.
- **Build:** inside A, add a full-frame black `image` (a solid PNG, `w: 100, h: 100, opacity: 0.6`, `anim: "fade"`, `at` on the word) below the new element, then the element with `anim: "pop"` / `"spin-in"`. **ENGINE GAP** for blurring only the background (proposed scene `background.blurAt: {at, px: 12}`).

### 6.4 Background re-light / colour step
- **Aliases:** background luma/colour step without a cut, black → white flash (tonal flip), colour fade background, card-fill dissolve, linear luma fades, brighten-and-reframe.
- **Seen:** 5/82: v13 v17 v61 v71 v75. v34 and v82 use it inside other moves.
- **Frame by frame:** the set changes colour under persistent type or props: over 3–7 f with `Easing.out(Easing.cubic)` (v17 grey → black → lime → grey), over ~10 f with an ease-in (v13 black → white while the white text fades and the black text builds), or over 12 f via `interpolateColors #100d11 → #4a474b → #e4e0e4` while children crossfade (v61).
- **Frames:** 8 (3–60).
- **When to use:** a mid-sentence tonal flip ("didn't just X — it Y"; v13), re-lighting a scene instead of cutting, beat accents.
- **Build:** **ENGINE GAP.** Workaround: a full-frame solid `image` layer of the new colour with `anim: "fade"` at the word, placed below the content layers (low `z`). Proposed `background.to: {color, at, frames}`.

### 6.5 Saturation return / colour bloom
- **Aliases:** saturation fade-in with zoom kick, saturation bloom, B/W → colour on zoom-through, generate-in resolve (de-solarise).
- **Seen:** 4/82: v23 v24 v55 v73. v59 has a related tint relax.
- **Frame by frame:** B (or the photo inside a frame) starts at 0–30% saturation, or in solarised false colour, and blooms to full over 6–45 f: 9 f with a +4 zoom pop (v23), 45 f (v24), 20 f (v55), or the last 6 f of a zoom-through (v73).
- **Frames:** 20 (6–45).
- **When to use:** "it came alive", the past → the present, an AI result appearing.
- **Build:** **ENGINE GAP.** Proposed `grade.from: {saturation: 0.3, frames: 30}` (the reverse of `drainAt`). Approximation: an A scene with `grade.saturation: 0`, then B with `transition: desat` (B starts at ~70% and returns).

---

## 7. Glitch and digital

### 7.1 RGB split / slice glitch
- **Aliases:** glitch-flash, RGB-split flash, RGB-fringe glitch dissolve, glitch materialise, glitch-in, RGB smear to black, echo-glitch out, chromatic zoom-out, mosaic glitch, slice glitch, glitch datamosh, B/W pixel-sort, glitch-streak, glitch collapse / slice displacement, axe-smash RGB.
- **Seen:** 16/82: v01 v03 v09 v16 v17 v32 v35 v51 v53 v57 v66 v71 v74 v75 v76 v81.
- **Frame by frame:** 1–4 frames of red/cyan channel offset (±6–10 px at 720 W, up to ±20–40 px for a smear; v57). Horizontal slices of 4–6 bands shift ±10–80 px (v74, v76), with a horizontal blur of up to 60 px, sometimes dotted pixel dropout (v03) or a B/W ghost of B (v75). Then clean. Longer versions (~10 f, v01) ramp luma 52 → 117 to mask a big switch. In v53 it rides a zoom-through (scale 1 → 2.5 over 3 f plus RGB ±8 px, then B lands from 1.6 with a spring).
- **Frames:** 3 (1–12).
- **When to use:** tech, AI, news "breaking", tension, list items in a hype promo, masking a jump between very different sources (UI → store).
- **Build:** `"transition": {"type": "glitch", "frames": 3}` (RGB split + jitter). Use `frames: 6–10` for v01-style masks. Global chroma fringe: `finish.chroma`. **ENGINE GAP** for slice displacement and pixel-sort. Proposed `"style": "rgb|slices|sort|echo"`: `slices` = 4–6 horizontal `clip-path` bands with seeded random translateX of ±3–10% W per frame; `echo` = 3–4 offset copies at decreasing opacity.

### 7.2 Pixel / block / tile dissolve
- **Aliases:** pixel-dissolve swap, block-wipe swap, tile mosaic build, white bloom → tile dissolve, glowing tile-grid wipe, pixel/block dissolve, pixel-block wipe reveal, pixel-tile dissolve on send, pixel-block glitch, square-strobe flicker, mosaic.
- **Seen:** 10/82: v10 v45 v46 v49 v55 v58 v69 v70 v71 v79.
- **Frame by frame:** a grid of squares (1.5–4% W, or 6–20 px) reveals B with per-cell random delays.
  - Fast: 2–4 f with delays of 0–3 f (v55: purple `#8340df` and cyan `#5ac8fa` squares blooming from the submit button, some outlined and some filled; v79: 12–20 random rectangles over 3 f plus 1 frame of RGB ±6 px).
  - Column sweep: a ragged column of bright tiles (`#f5d000`, 3.5% W) grows from an edge, with delay = `base(x) + random(0..4)`, each tile visible for 3 f before turning transparent over B (v58).
  - Slow: ~16×9 tiles fade their white overlay over 0–30 f with a 2 px glowing outline for the first 6 f (v46).
  - Element-level: the button explodes into glowing lime squares (v69, 6–8 f), or a note breaks into 12–20 px squares that scatter and reassemble (v70, 4–6 f).
  - Strobe rects: 1–2 random rectangles covering 20–45% of the image flash for 1–2 f before each photo change, as crops of the next image, inverted crops, white blocks or black bars (v49).
- **Frames:** 5 (2–30).
- **When to use:** "processing / sending / generating" in AI and UI promos, digital or pixel-art worlds, a fast photo montage.
- **Build:** **ENGINE GAP.** Proposed `"type": "pixels"` with `cell: 0.035` (fraction of W), `frames: 6`, `order: "random|left|from:{x,y}"`, `colors: ["#f5d000"]` and `hold: 3`. Implement as an SVG mask of `N×M` rects; each cell's reveal frame = `delay(x, y) + seededRandom·4`; B is shown through revealed cells, with a coloured tile for `hold` frames before each cell turns clear.

### 7.3 Dot-matrix / halftone dissolve
- **Aliases:** dot-assemble reveal, dot-matrix flash, yellow dot-matrix flash, dot-grid dissolve, dot-mosaic → photo resolve, radial halftone portal.
- **Seen:** 5/82: v06 v33 v35 v51 v61.
- **Frame by frame:** an LED-like grid of round dots (pitch ≈ 2% W) samples A's luminance for ~3 f and fades over ~6 f with a random per-dot delay of 0–4 f to reveal B (v33). The long version (v61, ~48 f): ~46×26 dots flood in by colour from the left, then a dark wave sweeps diagonally (delay `(x + y)·0.6` f). Mosaic → photo: dots grow `r = lerp(0.35, 0.72)·cell` until they touch, then the photo crossfades in over ~8 f. Logotype (v06): 40–80 dots inside the glyph bounds scale to cover over 6 drawings, then crossfade to the solid glyph.
- **Frames:** 8 (4–48).
- **When to use:** tech launches, "assembling" a logo or idea, halftone poster worlds.
- **Build:** **ENGINE GAP** (`finish.halftone` is a static texture). Proposed `"type": "dots"` with `pitch: 0.02`, `frames: 8`, `wave: "random|diagonal"`. Implement as a canvas grid with per-dot opacity = `noise(x,y,t) × luma(A)` decaying with a delay.

### 7.4 Flicker montage / rapid substitution
- **Aliases:** in-frame flicker montage, accelerating archival montage, rapid substitution, flip-book inside brackets, beat-cut logo montage.
- **Seen:** 5/82: v03 v13 v16 v21 v54. v65 has a flip-book inside brackets.
- **Frame by frame:** the same position or container, with content hard-cut every 2–6 frames. Shot lengths shrink toward a keyword (v16: 1.33 s → 0.11 s over 7 clips; v65: `[5,3,2,2,2,2,2,1,4,4]` frames at 16 fps toward "viral"), each clip with handheld jitter.
- **Frames:** 2–6 per shot.
- **When to use:** lists of evidence, "already went viral", building energy into a modern payoff, many examples of one thing.
- **Build:** chain scenes with `duration` 0.07–0.2 s, `transition: cut`, `camera.settle: 1.02`, and image `jitter: 2` for handheld feel. In a container, use one scene with an image `swap` chain, or a `ui` `phone` with `src` per scene.

### 7.5 Click-ripple / ring burst
- **Aliases:** click-ripple zoom-through, green click-ripple flash, offset-ring burst, halftone ring burst, pixel sparkle burst, ring flash.
- **Seen:** 5/82: v08 v33 v42 v46 v69.
- **Frame by frame:** on a click or impact, 2–3 concentric rounded outlines (6–10 px stroke, glow) expand from the point (scale 1 → 1.6, r 20 → 600 px), with opacity 1 → 0 over 6–18 f. The frame flashes +35% luma (v33) or takes an acid-green `#2ee52e` overlay at 70% for 1 f that decays exponentially over 16–20 f (v69). v08 uses 5–6 wavy offset outlines of a silhouette with a 1 f stagger and slight overshoot.
- **Frames:** 6–18.
- **When to use:** UI clicks that change the scene, "applied!", a hero entrance accent.
- **Build:** a `cursor` with `click: true` (it pulses a ring), plus the next scene's `"transition": {"type": "flash", "color": "#2ee52e", "frames": 12}`. Extra rings: `shape` `kind: "circle"` layers with `draw: 6` and `exit: "fade"`, staggered by 1 f.

### 7.6 Warp / twirl / hyperspace
- **Aliases:** twirl/swirl, warp → white → black, zoom-through with kaleidoscope blur, hyperspace warp + type shatter, light-streak zoom-through.
- **Seen:** 5/82: v24 v27 v57 v65 v76.
- **Frame by frame:**
  - v76: the card twists into a vortex (angle 0 → 540° at the centre) over 3 f, and B appears already settled.
  - v65: a centre bulge (1.4× magnification, barrel edges) for 1 f, then 1 white frame, then 1 black frame with only B's hero element glowing, then the bright scene.
  - v27: 1 frame of a mirrored 3×3 tile of B with heavy radial blur, then B lands from 1.25 over 12 f.
  - v57: white streaks radiate from the centre for 4 f, then the caption breaks into stretched slabs for 2 f.
  - v24: ~40 vertical light streaks multiply into a spectrum, then a 2-frame white flash.
- **Frames:** 4 (1–36).
- **When to use:** "mind-blown", a speed jump into the future, a light switch into the CTA.
- **Build:** **ENGINE GAP.** A custom component using an SVG `feDisplacementMap` with a pre-rendered swirl or radial map, or a WebGL shader via `@remotion/three`. The kaleidoscope = 9 tiles with alternating `scaleX(-1)` / `scaleY(-1)` plus blur.

### 7.7 CRT power-off / collapse-to-line
- **Aliases:** TV-off flare, CRT power-off, collapse-streak, shrink-to-light, collapse to strip.
- **Seen:** 4/82: v04 v21 v35 v50. v71 and v76 contain the same squash.
- **Frame by frame:** content squashes (scaleY 1 → 0.02–0.05, scaleX 1 → 1.1) with a white glow and a horizontal blur over 2–5 f, then collapses to a point. v04's full version: 1 black frame, 1 zoom-blurred frame, a white anamorphic starburst collapsing scaleY then scaleX over 4 f, 3 black frames, then a 10 f fade-up into the CTA. v50: the frame shrinks to a small square with a glowing border over ~6 f, then to a star point.
- **Frames:** 4–5 (2–17).
- **When to use:** the end of a story section, "switch off", separating story from CTA (v04).
- **Build:** **ENGINE GAP.** Proposed `"type": "crt"`: A `scaleY 1 → 0.03` with `Easing.in(Easing.cubic)` over 3 f, plus a white `box-shadow` glow, then `scaleX → 0`, then `black` for 3 f.

### 7.8 Film-gate roll / burn frames
- **Aliases:** vertical frame-roll, countdown card flicker, film burn flicker, near-black film-gate frame.
- **Seen:** 3/82: v08 v75 v81. v12 adds a 1 near-black frame.
- **Frame by frame:** the outgoing image tiles vertically with 8% black gaps and scrolls up one frame height in 4 f, then B lands (v81). Four 4-frame full-colour cards (red → charcoal → black → white) act as a "film leader" (v08). Cream `#fcfcee` frames with dirt, scratches and an edge burn, 2–3 f each (v75).
- **Frames:** 4 (2–16).
- **When to use:** analogue, archive and retro tone; a duration beat ("three years"; v08).
- **Build:** the leader is composable as chained 4-frame `solid` scenes (see 2.6). Frame roll: **ENGINE GAP** (proposed `"type": "roll"`: A rendered twice stacked with an 8% black gap, translateY −100% over 4 f).

### 7.9 Redaction / block-censor / backspace
- **Aliases:** block-censor wipe, redaction smear, backspace erase.
- **Seen:** 3/82: v18 v71 v75.
- **Frame by frame:** each word is replaced in turn by a solid rectangle the size of its bounding box (red `#fc3819`, black, blue `#148ef9`) with a 1 f stagger, then one black bar covers the line and collapses horizontally to a sliver over 2 f (v71, 5 f total). Or the caption collapses into a black bar for 1 f, then an inverted outlined flash of the next word for 2 f (v75). Or the title is deleted right to left at ~2 chars/frame, then a hard cut (v18).
- **Frames:** 3–5.
- **When to use:** "the thing they don't want you to see", correction, a typographic exit that feels like an edit.
- **Build:** **ENGINE GAP.** Proposed text `exit: "redact"` (per-word boxes in `highlight` colours, 1 f stagger, then `scaleX → 0.05`) and `exit: "backspace"` (the reverse of `typewriter`, `cps: 60`).

---

## 8. Container / nested reveals

### 8.1 Nested zoom-out (frame-in-frame)
- **Aliases:** nested reveal zoom-out, pull-back reveal into frame-in-frame, frame-in-frame zoom-out, zoom-out reveal into a frame, poster → wallpaper zoom-out, zoom-out into print, pull-back to the UI, frame-becomes-layer, scale-down window handoff, thumbnail-into-slot, card snap, zoom-out into the CTA card.
- **Seen:** 19/82: v04 v12 v16 v27 v29 v37 v51 v59 v60 v61 v62 v67 v69 v74 v76 v77 v78 v80 v81. Signature in v76 (×4).
- **Frame by frame:** A keeps playing. Its container scales from full-bleed down to the rect of a UI element, frame or device in B, while B's frame and background fade in over frames 0–2 or 0–3:
  - lock-screen wallpaper, iMessage image, iPhone screen, Instagram post (v76: `scale(0.42)`, border radius 0 → 48 px, 9 f, `bezier(0.65,0,0.35,1)`; fast versions hide the switch behind a 1–2 frame white flash);
  - gilt frame on damask (v12: 1 → 0.45 in 6 f);
  - CRT TV (v16);
  - gold frame on a salon wall (v37: 3.2 → 1, 12 f expo-out, velocity −7/f continuous across the cut);
  - newspaper photo (v67);
  - an NLE or After Effects viewer (v60, v62: to ~55–60% over ~20–35 f).
  - v77 does 60% of the scale change in frame 1 (`Easing.out(Easing.expo)`, 6 f).
  - v27 shrinks footage to a 76% W rounded card over 10 f.
- **Frames:** 8 (2–39).
- **When to use:** "it was all on a phone / in a post / in a timeline", meta reveals ("it's just After Effects"), social proof (the idea becomes a post), a museum or memory frame (v29), the move into the CTA card (v80, v81).
- **Build:** **ENGINE GAP.** Two-pass workaround:
  1. Render A alone to `public/nest/A.mp4`.
  2. In B, place `{"type": "video", "src": "nest/A.mp4", "card": true, "w": 42, "x": 50, "y": 45}` inside the device or frame layers.
  3. Set B `"camera": {"settle": 2.38, "settleR": 0.7}` (settle = 100 / w), so frame 0 shows the card full-bleed and the camera expo-settles out to reveal the container, with `transition: cut`.
  - Caveat: the settle scales about the centre, so centre the card or accept the drift.
  - Proposed native `"type": "nest", "into": "<layerId>"`: render A as a `<Sequence>` inside B's target rect, with the rect interpolated from the full frame to the target over 6–9 f and `borderRadius 0 → 48`.

### 8.2 Zoom-through into a frame or screen
- **Aliases:** screen dive, whip-zoom into the screen, fly-through picture frame, zoom-through window, zoom-through into a (framed) card, frame-in-frame zoom-through, door-reveal, zoom-into-light portal, push-in into a card with hidden background swap, zoom-through on a selected card, zoom-through push in Z.
- **Seen:** 15/82: v01 v02 v22 v24 v37 v39 v53 v57 v60 v62 v63 v65 v73 v80 v83.
- **Frame by frame:** the camera pushes (ease-in, 6–40 f) into a framed photo, window, device screen, doorway, locker or card until the frame's inner edge leaves the canvas (scale ~1.9–5.5×). The contents *become* B, which continues with a 6–12 f ease-out. Details:
  - The photo's saturation often blooms 0 → 1 over the last 6 f (v73) or 0.3 → 1 over ~45 f (v24).
  - Luma jumps +20 at the swap (v63), or 1 frame of full-frame colour sampled from the light (v53 `#1fae5a`).
  - v83 swaps the background while the card fills ~85% of the frame, then pulls back to a new arrangement, so it reads as one continuous shot.
  - v57 scales the clicked card 1 → 6 in 2 f, and B is already composed around a small copy of that card (landing 1.15 → 1 over 6 f).
- **Frames:** 16 (8–50).
- **When to use:** "go inside" (the product, the story, the past), a scene-per-picture history explainer, "click → you're in".
- **Build:** in A, place B's first frame (from `remotion still … --frame=0`) as a centred `image` with `print: true` (or inside a `ui` `phone`/`window` with `src`), and add `camera.drift` to push. Then give B `"transition": {"type": "zoom", "frames": 10}`: the engine's ×1.45/frame ramp carries the frame edge off-canvas and lands B at 1.18 → 1. For the colour bloom, combine it with 6.5. **ENGINE GAP** for an exact pixel match (proposed `nest` in reverse: `"type": "nest", "from": "<layerId in A>"`).

### 8.3 Zoom-out context reveal
- **Aliases:** zoom-out reveal to grid, zoom-out reveal (new environment around the subject), macro pull-back reveal, type-to-picture zoom-out, in-shot pull-back recompose.
- **Seen:** 5/82: v02 v08 v33 v57 v70.
- **Frame by frame:** the cut (or the start) is tight on one cell, a detail or a macro corner. A fast pull-back peaks within 1–2 f and decays over 9–23 f (v02: a 3×3 wall, peak on f2, 12 f decay; v08: 9 f expo where the money sunburst appears around the held subject; v33: ~3× over ~23 f with an asymmetric ease, content building during it).
- **Frames:** 14 (9–23).
- **When to use:** "one of many" (a grid), "it's bigger than you think", an establishing reveal after a close-up.
- **Build:** a new scene with the wide layout and `"camera": {"settle": 2.5–3, "settleR": 0.75}`, `transition: cut`. The tight start comes from the large settle.

### 8.4 In-container content cut
- **Aliases:** in-card content cut, screen-content motion-blur swap, flip-book inside brackets, vertical blur-smear object swap, windowed cuts.
- **Seen:** 5/82: v03 v06 v14 v38 v65. v40 cuts inside VHS windows.
- **Frame by frame:** the card, frame, phone or brackets stay fixed in position and scale while the inner media hard-swaps. Optional extras: a 2-frame vertical smear (scaleY 1.4, `blur(0 12px)`; v06), or 3 frames of `blur 0 40` with the old prop moving −100% and the new one coming from +100% (v14).
- **Frames:** 0–2.
- **When to use:** UI demos and showreels: "the container is the continuity", so a content change never reads as a cut.
- **Build:** `ui` `phone`/`window` with `src`, plus an `image` `swap: {src, at}` chain, or one scene per content with an identical container layer and `camera.settle: 1`.

### 8.5 App-switcher shrink and swipe
- **Aliases:** app-switcher shrink + swipe, card carousel slide (iOS app-switcher feel).
- **Seen:** 2/82: v77 v81.
- **Frame by frame:** the full-screen scene scales to a multitasking card (radius 40 px) over 8 f with an ease-out, swipes sideways over 4 f, and the next card zooms to full screen (v81); ~12 f in total for v77.
- **Frames:** 12–20.
- **When to use:** switching between apps or platforms, "and then on Instagram…".
- **Build:** **ENGINE GAP.** Use the `nest` workaround (8.1) for the shrink, then `whip-left` into a scene that starts at `camera.settle: 1.6`. Proposed `"type": "switcher"`.

### 8.6 Nested-shape zoom
- **Seen:** v25 (4.07–5.33, 19 f).
- **Frame by frame:** flat polygons in saturated colours, each born as a dot in the centre of the previous one and scaled to overfill the frame in ~4 f with `scale = 60^t` (exponential, so the perceived speed stays constant), rotated ±10°. The chain ends on a circle containing B that opens like an iris (radius 40 px → the diagonal over 3–4 f).
- **Frames:** 19 + 4 iris.
- **When to use:** "going deeper and deeper", a hypnotic hook, a chapter dive.
- **Build:** **ENGINE GAP.** Custom component `ShapeTunnel {shapes: [{kind, color}], perShape: 4}`, followed by B with `"transition": {"type": "circle", "frames": 4}`.

---

## Engine gaps (summary, by priority)

| Gap | Videos affected | Proposed spec addition |
|---|---|---|
| Nested zoom-out / frame-in-frame (8.1, 8.5) | 21 | `transition: {type: "nest", into: layerId, frames: 8}`; today: two-pass render + `video card` + large `camera.settle` |
| One-sided ramp-into-cut with static landing (1.5) | 27 | `transition.land: "static"` or `camera.exitRamp: {scale|x|y|rotate, frames, blur}` |
| Light-leak burn (2.7) | 11 | `type: "leak", color, from, frames` (screen-blended radial gradient, [0,1,1,0] at [0,3,5,8]) |
| Cross-dissolve (5.2) | 10 | `type: "dissolve", frames, through` |
| Colour-field / line / slab wipes (3.1, 3.6, 4.8) | 18 | `type: "wipe", shape: band|wave|diagonal|panel|line|bar|slab, color, from, frames` |
| Pixel / dot dissolves (7.2, 7.3) | 15 | `type: "pixels"` / `"dots"`, with `cell`, `order`, `colors`, `hold` |
| Persistent overlay across cuts (5.6, 3.5 v42) | 8 | top-level `overlays: [{layer, from, until}]` outside the camera |
| Morph between layouts (5.3) | 9 | `type: "morph", from: layerId, to: layerId` (FLIP tween) |
| Iris origin, edge, shape; iris close (3.2, 3.4, 3.8) | 15 | `circle` + `origin`, `edge`, `shape: path`; new `iris-close` |
| Letterbox animate (3.3) | 7 | `type: "letterbox", to: 0.2` |
| Card flip / portal (4.3) | 8 | `type: "flip"` |
| Pan motion blur (1.8) | 23 | `camera.pan[].blur: true` |
| True push / carousel (1.9) | 14 | `type: "push-left|right|up|down"` |
| Grade relax, saturation return, background re-light (2.9, 6.4, 6.5) | 14 | `grade.from: {saturation, hueRotate, frames}`, `background.to: {color, at, frames}` |
| Outgoing defocus + bloom (6.1, 2.10) | 24 | `focus: {out, in, bloom}` applied to the whole scene |
| Glitch styles (7.1) | 16 | `glitch.style: rgb|slices|sort|echo` |
| Object path / lens fly-through (4.2, 4.4) | 24 | `object.path: lr|rl|bt|tb|lens`, `hold` |
| Invert both sides + kick (2.3) | 17 | `invert.side: "both"`, `kick: {rotate, scale}` |
| Strobe (2.6) | 12 | `type: "strobe", pattern, frames` (today: chained 1-frame scenes) |
| CRT, warp/twirl, frame roll, shatter, tear, hand-pull (7.7, 7.6, 7.8, 4.5, 4.6, 4.9) | 22 combined | custom components first; promote the ones used in ≥3 videos |

---

## Transition mixing rules

### How many types per video
- **Distinct techniques:** a median of **8** per video (range 3–14) are listed in section 5. Excluding plain cuts and settles, my tagging gives a median of 8 (range 2–14). One or two are in-scene devices rather than cuts.
- **Effect families:** most videos draw on **4 families** (median of distinct non-cut categories across "Into next" columns; range 0–7). v06, v14 and v19 use none: a 12 fps halftone poster style runs on hard cuts plus colour jumps alone.
- **Rule:** pick **1 signature + 2–4 supporting effects + hard cuts** for a 20–40 s video, and add one flash or invert family for impacts. Going past 8 distinct effects reads as a showreel. That is fine for promos (v35, v50, v63, v74 use 11–14), but not for explainers.

### How often each is used
| Join type | Share / usage |
|---|---|
| Plain hard cut | 41% of all joins (median 39% per video). Use 30–60% in explainers, 0–20% in one-world 3D promos (v01, v04, v23, v35, v38, v42 have none) |
| Signature effect | 3–10 uses per video, ≈25–50% of the non-cut joins (v04 ×10, v24 ×7, v37 ×6, v45 ×6, v11 ×5, v15 ×5) |
| Supporting effects | 1–2 uses each |
| Flash / invert accents | 1–3 per video, each on an impact word or a chapter change, never two flashes within ~1 s unless it is a strobe |
| Dissolve | 0 in 72/82; at most 1–2, always combined with motion |
| Fade to black | only the final 8–10 f (6/82) |
- Shots run a median of **16 per video** (range 4–29): about 0.5–0.7 joins per second, of which ~6–9 are effects.

### What precedes the CTA (about 77 videos have an end ask)
| Into-CTA move | Count | Examples |
|---|---|---|
| **Hard cut on the first CTA word** ("Editors…", ±0.1 s), usually to a contrasting ground | 36 | v05 v06 v08 v09 v10 v11 v13 v24 v30 v31 v33 v44 v46 v77 v78 |
| Flash / invert / burn / white wash | 8 | v03 v28 v32 v35 v49 v54 v68 v69 |
| Momentum (zoom-punch, zoom-through, whip) | 8 | v12 v26 v27 v29 v37 v42 v45 v81 |
| Black frame / dip / dissolve-to-black reset | 8 | v04 v17 v20 v21 v41 v57 v61 v62 |
| Panel or plate slides up over the story | 7 | v47 v52 v64 v65 v67 v82 (v38: fade-out on the shared bg) |
| Morph / nested zoom-out / iris / caption exit / pixel dissolve | 10 | v01 v18 v50 v53 v60 v70 v76 v79 v80 v23 |
- **Rules:**
  1. Default to a **hard cut on "Editors" (or the first CTA word) with a luma or palette change of ≥60 units.** The CTA is often the brightest (v33, v37, v44) or the most neutral frame of the video.
  2. If the story ended loud, insert a **reset** first: 1–6 black frames, a desaturate-dissolve to black (v21), or a cut to a type-only void (v02).
  3. Clear the frame: caption blur-dissolve (v01) or text fade-out (v38) before the CTA builds.
  4. The CTA scene itself is calm: long holds (2–6 s), a single settle, and no effect transitions inside it except the end-card reveal (zoom-out into the card, v80, v81; icon-led flip, v76, v77).

### Ordering patterns
1. **Cold open from an effect** (13/82: v09 v14 v18 v28 v33 v35 v45 v46 v47 v50 v58 v62 v65): a strobe, glare, cloud or smoke push-through, colour-wash, paper tear-open or dot-matrix lands on the first downbeat (v18 at 0.51 s). Then the first hard cut comes within 0.7–1.6 s.
2. **Front-load the energy.** The densest effect transitions sit in the hook (0–8 s; v02 motion spikes cluster before 24 s, then mean flow drops below 0.2), and the middle runs on the signature plus hard cuts.
3. **Escalate toward the payoff.** Shot lengths shrink into the key line (v16: 1.33 s → 0.11 s; v65: 5 → 2 f), then one big transition (zoom-through, nested reveal, light burn) lands the payoff.
4. **Punctuate turns with stillness.** Before "but", the twist or the moral: a void or statement card (10/82), a dip to black, or a ramp-into-cut that stops dead (v16). A grade drain sits on the turn word (v05, v17, v21).
5. **Chapter changes get the strongest polarity flip:** an invert flash (v68: story → footage, footage → CTA), a luma flip (v29, v37), or a red or white flash to kick off a montage (v78, v17).
6. **Pair transitions.** A letterbox closes with an eased move but always opens with an instant hard cut (v78). Punch-in → punch-out bracket a contrast (v25). A zoom-in chain ends with a zoom-out to return to the hero layout (v26).
7. **Tone sets the family:** calm VO uses focus pulls and dips to black (v24, v29, v70); hype uses zoom-punch, invert and glitch (v11, v45, v71). Don't mix focus-pull and zoom-punch as co-signatures in one video; none of the 82 does.
8. **Never repeat a non-signature effect back to back.** Alternate the signature with hard cuts (the signature lands every 2–4 joins in v11, v15, v37).
9. **Ending:** the CTA, then hold or loop. 6/82 fade to black over 8–10 f, and v12, v16, v22, v57 and v83 end on 1–3 black frames to close the loop.
