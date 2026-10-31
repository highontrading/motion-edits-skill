# Motion language: the quantitative vocabulary of the library

Source: section 4 (motion & timing) of all 82 breakdowns (v01–v83; v72 is a byte-identical copy of v71 and is not counted), plus the spring and bezier recipes in section 8. All frame counts are at **30 fps** unless marked otherwise. Values measured at another rate were converted: a per-step decay ratio `r_step` at `animFps` becomes `r30 = r_step^(animFps/30)`. Pixel speeds are quoted at 720 px frame width, and also as a % of frame width (%W) so they carry over to any size.

Engine names used below: `camera.settle / settleR / drift / punch / pan / shake`, `animFps`, `transition.type`, layer `anim` / `exit` / `sync` / `stagger`, image `float` / `jitter`, and the helpers in `remotion/src/engine/lib/motion.ts`: `decay(f, r)`, `decayFrames(r)`, `ramp(f, frames, growth)`, `curves.*`, `springs.*`, `wiggle()`.

---

## 0. Default motion rules (cheat-sheet)

| # | Rule | Numbers | Engine |
|---|---|---|---|
| 1 | **Entrances decay, they don't ease in.** Peak speed on frame 1–2 of the move, then each frame keeps a fixed fraction of the last frame's speed. | Median r = **0.86**/frame (IQR 0.80–0.89, n = 43). UI snaps 0.55–0.75. Documentary settles 0.90–0.95. | `decay(f, 0.86)`; `curves.settle` for fixed-length moves |
| 2 | **Exits ramp into the cut**, which lands on the fastest, blurriest frame. | Growth median **×1.33**/frame (IQR 1.21–1.40), over **8 f** (IQR 6–12). Seen in ~55/82. | `ramp(f, 8, 1.33)`; transitions `zoom`, `whip-*`, `spin` |
| 3 | **Camera never overshoots.** Only small physical props (stickers, pills, bubbles, hanging things) are allowed to bounce. | 59/82 state "no overshoot / no sign flip" for the camera. Prop overshoot is 4–10% scale or 1–3° rotation, settled in 4–10 f. | `springs.firm` for camera; prop pops `{damping 14, stiffness 220, mass 0.6}` |
| 4 | **Every shot arrives already moving** with a scene-open settle. | Start scale median **1.10** (1.03 UI … 1.18). 90% done in ~15 f, at rest in 26–40 f. Seen in ~55/82. | `camera: {settle: 1.10, settleR: 0.86}` |
| 5 | **Nothing is ever fully still** except deliberate breaths (punchline, CTA). | Slow drift of ≈1.5–2% scale per second, i.e. `drift` 0.03–0.06 per 2–3 s scene. Minimum hold without any motion ≈ 0.4–1.0 s. | `camera.drift: 0.04` |
| 6 | **Step the animation for collage, paper and diorama looks**, keep it smooth for UI, 3D-CG and AI-cinematic looks. | 55/82 step some or all of the animation. 15 fps (on twos) is the most common rate (26 videos), then 12 fps (9). 27/82 are smooth. | `animFps: 15` (collage), `12` (print/halftone), `0` (UI/CG) |
| 7 | **Visual event every 0.3–0.6 s**, even when the cut rate is low. | Median cut rate 0.43 cuts/s (IQR 0.37–0.57), median shot 2.0 s. In-shot events fill the gaps. | layer `at` times, `punch`, `pan` |
| 8 | **Pace curve:** fast hook → steady body → one montage burst → slow moral → longest hold on the CTA. | Hook 0.6–1.5 s shots. Burst 0.1–0.7 s shots (19/82). CTA 3.1–6.6 s (median ≈ 4–5 s, ≥27/82). | scene `duration` |
| 9 | **Cuts land on the first syllable of the new phrase**, at most a frame or two early. | Median offset **−0.04 s** (IQR −0.07…+0.01, n = 63). 56/63 fall within −0.10…+0.05 s. | `start: {word, offset: -0.04}` (−0.12…−0.25 when the shot needs a settle first) |
| 10 | **Hero keywords appear on the word; secondary words echo it.** | Hero 0…+0.1 s. Connectors/body +0.2…+0.4 s. Typed text tracks speech and finishes ≤0.3 s after the word. | `sync: true` (≈2 f early); add delay for echo text |
| 11 | **VO is the clock; the beat is a secondary grid.** Snap a VO cut to a beat only when one is within ~2–3 frames. Cut montages and music-only pieces to the beat. | 40/82 VO-only, 13 partial, 29 beat-locked or dual-locked (6 of them music-only). Beat tolerance ±0.10 s. | `spec.beats` + `{beat: n}` / `{downbeat: n}` / `{onset: n}` |
| 12 | **Put an SFX hit (whoosh/impact) on every big transition.** | Strong audio onsets coincide with cuts in ≥10 videos (v06 v08 v25 v38 v42 v47 v48 v57 v59 v68). | `audio.sfx[{at}]` |

---

## 1. Easing families

### 1.1 Exponential-decay entrances and settles (the house curve)

The move peaks on the first 1–2 frames after the cut or the element's start (sometimes after a 2–4 frame "attack"), then each frame keeps a constant fraction `r` of the previous frame's speed. There is no ease-in and no overshoot.

Measured `r` per 30 fps frame (n = 43 videos): **median 0.86**, IQR 0.80–0.89, range 0.55–0.945.

| Class | r (30 fps) | 90% done | At rest (98%) | Used for | Evidence |
|---|---|---|---|---|---|
| UI snap / card / prop pop | 0.55–0.75 | 4–8 f | 7–14 f | UI cards, panels, wrappers, letterbox close | v18 (halves every 1.5 f), v51 0.70, v55 (half-life 2 f), v58 0.6–0.8, v71 0.55, v78 (70% in 2 f) |
| **Scene settle / camera landing (default)** | **0.80–0.89** | 10–20 f | 17–34 f | scene-open settle, post-cut push/pull, slide-ins | v01 v02 0.80; v07 0.865; v13 0.905; v14 0.865; v26 0.86; v27 0.865; v28 0.84; v29 0.865; v31 0.87; v47 0.85; v73 0.85; v75 0.82; v80 0.87 |
| Long documentary settle | 0.90–0.95 | 22–45 f | 38–75 f | calm openers, archival, heavy objects | v06 0.945; v11 0.93; v12 0.90; v19 0.915; v22 0.92; v34 0.93; v77 opening push 0.90 |

Related shapes:
- **Burst-then-glide:** a 2-frame attack, a ~4-frame decay to a *constant* speed, then a linear push (v52). The settle runs into `drift` instead of reaching zero (v14: expo-out over 18–24 f from 1.12, then linear −0.12%/frame).
- **Heavy rise:** an ease-in of 4–6 f, then a 15–34 f tail (v53 calculator, v65 box 11 in / 22 out, v63 opener 14 in / 27 out). Use `bezier(0.35,0,0.1,1)` or `(0.45,0,0.15,1)` over 32–40 f.
- **50% in frame 1:** fly-ins and nested zoom-outs put about half the travel in the first frame, then a 10–12 f tail (v57, v77). Use r ≈ 0.75 with a large first step (`decay(f, 0.5)` for the first 2 f).

**Engine mapping.**
- `decay(f, r)` with r = 0.86 by default. `decayFrames(0.86) = 26` (98%); 90% is reached at 15 f.
- `curves.settle` = `bezier(0.16,1,0.3,1)` is the most-cited curve in the corpus (30 mentions). Use it when the move must end at a fixed frame (24–40 f).
- Spring alternative from the recipes: critically/over-damped `{damping 26–30, stiffness 120, mass 1}` (v15 v17 v62 v63) or `{damping 200, stiffness 120}` (v01 v10 v51 v69 v82). Prefer `decay`, because its length is explicit.
- Per stepped rate: at `animFps: 12`, a measured per-step ratio of 0.7–0.8 equals r30 0.87–0.91.

### 1.2 Ramp-into-cut exits

The outgoing shot accelerates (a zoom, pan, tilt, roll or push) and the hard cut lands at peak speed, usually with directional blur. The incoming shot then either continues the same vector and decays (velocity-matched), or starts settled.

Frequency: ~55/82 (e.g. v01 v02 v03 v04 v07 v10 v11 v12 v15 v16 v18 v20 v21 v22 v25 v26 v27 v30 v31 v33 v34 v36 v37 v45 v46 v47 v49 v50 v51 v53 v57 v59 v61 v62 v63 v64 v66 v67 v68 v73 v74 v75 v76 v77 v78 v80 v81 v82 v83).

| Measure | Median | IQR / range | Examples |
|---|---|---|---|
| Speed growth per frame (30 fps) | **×1.33** | IQR 1.21–1.40; range 1.11–2.0 | v01 1.37 (0.88→13.04 over 8 f); v04 1.4–1.5; v51 1.35; v59 1.3–1.5; v45 ×2.0 (doubling every frame, 4–6 f) |
| Ramp length | **8 f** | IQR 6–12; range 3–20 | snap exits 3–4 f (v21 v49 v75 v76); gentle 13–20 f (v07 v57 v67 v74) |
| Very long "motivated drift" ramps | — | 23–62 f | v20 blur-masked whips, v43 57-frame ease-in drift, v67 ×3 over 35 f |
| Peak speed at the cut | 30–60 px/f @720 (4–8 %W/f) | single-frame snaps 85–196 px/f | v09 85–115, v30 60, v50 56, v71 196 |

Variants:
- **Velocity-matched (momentum) cut:** the incoming shot keeps the same direction and decays over 8–20 f. Seen in ~22 videos (v04 v18 v20 v25 v26 v27 v30 v31 v37 v46 v49 v50 v56 v59 v63 v64 v66 v67 v74 v78 v80 v83). In v18 the whole thing lasts 10 f: ×3–6 over 4 f, then 5–6 f decaying to 0.15×. In v37 the zoom chain keeps one direction across each pair (in → in, out → out).
- **Accelerate into a settled frame:** the incoming shot starts at rest, as in v45's signature exit (scale 1 → 1.12 over 6 f, `Easing.in(exp)`, blur 0 → 12 px).
- **Rotational ramp:** −2.4 → −6.9°/f (≈ −22° in 7 f, v45); spin-out 0 → 25° in 9–10 f (v17); spin-zoom whip with zoom +1.65 → 5.2%/f and roll −1.8 → −6.2°/f over 11 f (v56).
- **Hero-word punch exit:** 2 f of scale-up + blur on the last word before the cut (v54).

**Engine mapping.** `ramp(f, 8, 1.33)` for custom exits, and `rampSpeed()` for the blur amount. Transition `zoom` already ramps ×1.45/f into the cut and starts the incoming shot at 1.18×. `whip-*` is the momentum cut and `spin` is the rotational ramp. The corpus bezier for an expo-in is `(0.7,0,0.84,0)` (5 mentions), and `curves.accelerate` `(0.55,0,1,0.45)` is close to it.

### 1.3 Symmetric (and out-biased) in-shot camera moves

Reframes inside a shot (pans to the named item, tilts, trucks, device zoom-outs, carousel slides) are **bells**: speed rises, peaks mid-move and falls, with no overshoot.

| Measure | Value | Examples |
|---|---|---|
| Duration | median ≈ 25 f; range 8–94 f | v80 desk pans 8–12 f; v76 device zoom-out 9 f @18 (15 f); v51 24–32 f; v46 40–48 f; v15 54 f; v20 tilt 94 f |
| Shape | ~half symmetric, ~half **out-biased** (in : out ≈ 1 : 1.5–2) | symmetric: v08 v16 v35 v42 v47 v51 v58 v66 v74; out-biased: v12 8/12, v17 8/25, v33 8/15, v39 4/7, v54 5/10–12, v63 9/15, v64 19/30, v75 9/15 |
| Peak speed | 20–56 px/f @720 (3–8 %W/f) | v54 20–36, v58 38, v66 40, v62 56 |
| Rhythm | move → hold 0.4–0.5 s → move | v09 ring travel, v26, v54 |

**Engine mapping.** `curves.glide` = `bezier(0.65,0,0.35,1)` (11 mentions; v35 v46 v51 v62 v76) for symmetric moves. For out-biased moves the corpus uses `bezier(0.6,0,0.2,1)` (8 mentions; v33 v58 v63 v66), `(0.45,0,0.15,1)` or `(0.5,0,0.15,1)`; that is `curves.reframe`. `camera.pan[{at, x, y, frames, curve}]` with frames 18–45 and `curve: "glide"` (default), `"reframe"` or `"settle"`; `blur` (default on) adds a directional blur that peaks mid-move.

### 1.4 Springs and overshoot: when yes, when no

**Never overshoot:** camera moves, scene settles, type. 59/82 state it explicitly. Some say it outright: "this video never bounces" (v51), "nothing springs or bounces" (v71), "text never bounces" (v57), "props land softly, not springy" (v63). Type does not bounce in any video except per-letter drops (v60 v62).

**Overshoot is allowed on** small physical or sticker-like objects (≈38/82):

| Object | Overshoot | Settle | Evidence |
|---|---|---|---|
| Sticker / starburst / pill / icon pop | scale 0 → 1.10–1.15 → 1 | 3–8 f | v04 sparkle 1.15 (8 f); v18 pill 1.1 (4 f); v19 starburst 1.1 (6 f); v68 1.15 (6 f); v76 1.1 (3–4 f) |
| Chat bubble / badge | 0.6 → 1.05 → 1, or ~5% | 6–8 f | v04 6 f; v44 5% + rotation, 8 f; v78 one overshoot, 6–8 f |
| Card / prop landing | rotation 1–3° past rest | 6–10 f | v30 ±1.5°; v31; v32 2–3°; v39 1–2° |
| Thrown object | 2 sign flips | ~10 f | v34 catalog (`{10,120,0.8}`) |
| Impact pop-and-recoil (music edits) | zoom +4.1 then −1.95 | 2–3 f | v23 |
| One-frame camera rebound | a single opposite frame | 1 f | v02, v53, v57 (the only camera "overshoots" measured) |

**Spring presets in the recipes** (129 configs across 74 videos):
- Pop, damping 9–16: 80 configs in 49 videos, median `{damping 12, stiffness 200}`. Most repeated: `{14, 220, 0.6}`, `{12, 200}`, `{10, 220, 0.6}`.
- Firm, damping 17–30: 39 configs in 31 videos, median `{20, 140}`.
- Critically/over-damped, damping ≥ 200: 7 videos.
- Pendulum, damping ≤ 8: v08 `{8,120}`, v50 `{4,23,1}`, v70 `{6,120,0.6}`.

**Engine mapping.** `springs.pop` for stickers and pills. Its current value `{11,190,0.6}` gives ζ = 11 / (2√(190·0.6)) ≈ 0.52, i.e. ~15% overshoot by the standard damped-oscillator formula, about twice what was measured. `{14, 220, 0.6}` (ζ ≈ 0.61, ~9%) matches the measurements better; check it with a still render. `springs.device` (~2–4%) for phones and devices rising. `springs.firm` for anything on the camera.

### 1.5 Pendulum swings (hanging props)

Seen in ~20 videos: handset, bundle, chalkboard, tablet, lamp, lantern, stars on strings, jars, coins on rods (v04 v06 v08 v12 v14 v19 v22 v32 v37 v39 v44 v48 v50 v53 v67 v68 v70).

| Kind | Period | Amplitude | Decay | Evidence |
|---|---|---|---|---|
| Idle sway (keeps a hold alive) | 1.0–1.6 s | ±3–5° | barely decays | v19 `4°·e^(−t/0.6s)·sin(2πt/1.6s)`; v39 ~1 s, ±5° |
| Swing-in settle (prop arrives) | 0.6–1.3 s | 15–35° → 0 | 2–3 half-cycles, done in 12–18 f (quick) or ~2.2 s (slow) | v12 0.6 s period, ~3 swings ≈ one per beat; v50 1.3 s, 35° → 8° after one half-swing, settled 2.2 s; v68 3 half-cycles in 18 f; v70 2–3 oscillations in 12 f |

Pivot at the string or nail top (`transform-origin` above the object). **Engine:** `springs.swing {4,60,0.8}` (ζ ≈ 0.29, period ≈ 0.76 s) suits the quick swing-in. Image layers take `anim: "swing"` (an under-damped swing-in from the top edge). For the continuous idle sway after the entrance, add `"loop": "sway"` (±2.5°, ~2.6 s period; any positioned layer).

---

## 2. Animation frame rate (stepped animation)

Stepping means that animated values update only every 2–3 frames, while cuts and the VO stay frame-accurate. This is the single biggest contributor to the handmade or printed feel (v06: "the main reason the piece feels handmade rather than template-smooth").

### 2.1 Counts (82 videos)

| Effective animation rate | Whole video | Plus sections only | Videos |
|---|---|---|---|
| ~10 fps (on 3s) | 2 | — | v29 v32 |
| **12 fps** (2-3-2-3 cadence) | 9 | — | v05 v06 v09 v10 v11 v13 v26 v30 v31 |
| **15 fps** (on twos) | 20 | 6 | stepped in a 30 fps container: v14 v15 v19 v20 v23 v44 v62 v70 v74 v40 v41 v42 · delivered at 15: v22 v25 v27 v28 v36 v37 v39 v48 · sections: v47 v63 v64 v67 v73 v77 |
| 16–17 fps | 7 | — | v60 (posterised 16–17) · delivered at 16: v08 v34 v53 v65 v66 v68 |
| 18 fps | 5 | 2 | v54 (3 on / 1 hold) · delivered: v12 v16 v52 v76 · sections: v56 v83 |
| ~20 fps (a duplicate every 3rd frame) | 4 | — | v17 v21 v45 v49 |
| **Smooth 24–30 fps** | **27** | — | v01 v02 v03 v04 v07 v18 v24 v33 v35 v38 v43 v46 v50 v51 v55 v57 v58 v59 v61 v69 v71 v75 v78 v79 v80 v81 v82 |

Totals: 47 videos are stepped throughout, 8 mix stepped and smooth sections, and 27 are smooth. Caveat: some of the 19 files delivered at 15–18 fps may be platform re-encodes (their breakdowns note "likely a re-encode"). The 28 videos stepped inside a 24/30 fps container are deliberate.

> Note for `engine-spec.md`: it says 12 fps is "most of the reference library". The measurements say **15 fps (on twos) is the most common stepped rate** (26 videos vs 9 at 12 fps).

### 2.2 When each is used

| Look | Rate | Evidence |
|---|---|---|
| Halftone/print posters, paper collage with heavy texture | 12 (or 10 for "archival print") | v06 v09 v11 v13 v26 v31; v29 10 fps on a CRT/print finish |
| Cut-out collage, diorama, puppet theatre, pixel art | 15 (on twos) | v14 v15 v19 v20 v22 v23 v44 v62 v70 |
| AE-process reels and tutorials about collage (the video demonstrates its own lesson) | 15–16 | v39 v48 v60 ("Posterize Time 16–17") |
| **Smooth instead**: 3D-CG product promos, SaaS/UI demos (16:9), Apple-keynote type, AI-cinematic editorial, UI-collage brand explainers | 0 (smooth) | 18 UI/CG promos (v01–v04 v07 v18 v33 v35 v38 v46 v51 v55 v57 v58 v59 v61 v69 v71); AI-cinematic v24 v50; UI-collage v75 v78–v82 |

Rule: **step when the surface is physical** (paper, cut-outs, props, puppets, pixels). **Stay smooth when the surface is a screen or glass** (UI, CG, photoreal).

### 2.3 How mixed rates are used

1. **Layer mixing: graphics stepped, "live" layers smooth.** UI typing and photo pans run every frame in v10, footage at native rate in v13 v14 v31, fog and smoke smooth in v32, caret and grain on 1s in v29, graphics at 20 fps against smooth footage in v45. The opposite also occurs: v11 and v09 step even the footage and its camera.
2. **The reverse: footage stepped, graphics smooth.** AI b-roll held on 2s for a filmic feel against crisp 30 fps type (v47); film footage stepped on 2s from a 50% slow-down (v81).
3. **Section mixing as a rhythm device:** v77 (list smooth, lesson on 2s, which separates "the list" from "the lesson"); v64 (three sections on 2s: "stepped feels handmade, smooth feels cinematic; alternating the two is itself a rhythm device"); v56 (first 8 s at 18, then 30); v63 (sky/type section at 15); v67 (TV room, photo wall and CTA type on 2s); v73 (shots 3, 6–8 and 12); v83 (room sections at 18, carousel at 30).
4. **Sub-rates for loops:** hands, glove and walk cycles on 2s of 15 = 7.5 fps (v22; v08 ≈ 8 poses/s); a stop-motion hook at ~3 fps (8–10 frame holds, v30); pixel sprites at 7.5 fps (v70).
5. **Stepped accents in a smooth video:** single-frame zoom jolts every 2–3 f on a UI timeline (v18); doodles and grain "boil" on 2s/3s (v15 v60 v74).

**Engine mapping.** `animFps` sets the whole video and a scene can override it, which covers sections. Rates: 15 for collage, 12 for print, 0 for UI. `Stepped` freezes the whole scene (camera, footage and UI included); mark the layers that must stay fluid (footage, typing, UI) with `"smooth": true`. Cursors and particles are not positioned layers and always step with the scene. When stepping, keep the same curves but expect each step to carry 2–2.5× the per-frame displacement. Bake motion blur into fast steps (v11).

---

## 3. Scene-open settle

| Measure | Value | Evidence |
|---|---|---|
| Frequency | ~55/82 shots "enter already moving". ~27 of them use an explicit scale settle; the rest a position or tilt decay. | scale: v06 v11 v13 v14 v15 v16 v19 v20 v26 v28 v29 v31 v44 v47 v52 v58 v64 v73 v76 v77 v83 … |
| Direction | **Zoom-out into place** (content shrinks to 1.0) dominates. A push-in "breath" (content grows) is the alternative. | out: v13 v14 v19 v20 v26 v29 v31 v44 v47 v58 v64; in: v22 v24 v27 v36 v73 v76 |
| Start scale | **median 1.10** (IQR 1.08–1.12); UI 1.03–1.04; zoom-transition entries 1.18–1.6 | v58 3–4% oversize; v19 1.08–1.12; v13 1.08–1.15; v20 1.10–1.15; v14 1.12; v31 1.10–1.18 |
| Curve | expo-out, peak on the first frame | v19: 50% of travel in ~8 f, 90% in ~26 f, rest at ~40 f |
| Duration | 90% at 15–26 f; at rest 26–45 f (bigger moves take longer). UI 6–8 f. | v20 21–45 f; v31 tail 30–40 f; v14 90% in 12–18 f; v58 6–8 f |
| Rotation on the same curve | optional −10° → 0 or −20° → 0 | v20, v14 CTA phone, v63 |
| Followed by | a slow linear drift or a pull-out that never stops | v13 −10…−18 net after the settle; v14 linear scale-down |
| Exceptions | the incoming shot is deliberately static | v45 (exit carries the energy), v69 (holds truly still for UI legibility), v40–v43 wrappers |

**Engine:** `camera: {settle: 1.10, settleR: 0.86}`. Use settleR 0.80 with settle 1.04 for UI scenes and settleR 0.90–0.93 for documentary openers. The spec example `settleR: 0.82` sits at the snappy end.

---

## 4. Entrance and exit vocabulary

Frequency = number of videos whose motion section names the move (keyword count, rounded; treat as a lower bound).

### 4.1 Type entrances

| Move | Frames @30 | Parameters | Freq | Engine |
|---|---|---|---|---|
| **Word blur-in / blur-fade** (default caption voice) | 3–8 (median 6) | opacity 0 or 0.3 → 1, blur 6–12 px → 0, optional scale 1.05 → 1 or 4–12 px rise | ~31 (v03 v19 v20 v21 v29 v35 v51 v61 v65 v73 v74 v82 v83…) | `anim: "focus"` |
| **Typewriter / type-on** | per char: 1–2.5 f | speech rate 15–22 cps so the last letter lands on the word (v19 v66); UI 30 cps = 1 char/f (v29 v55 v78); hero titles 12 cps (v07); AI stream 150 cps (v46); colour-lead on the newest 3–5 glyphs, settling over 6–8 f (v07 v35 v58) | ~59 | `anim: "typewriter", cps, leadColor` |
| **Word-by-word build/pop** | 1–3 per word | either VO-synced or on a fixed cadence of 0.23 s (v09), 0.25 s = 6 f (v73, eighth notes), 0.375 s (v34) or 6 f (v61 CTA) | ~52 | `anim: "words"`, `sync: true` or `stagger` |
| **Hard cut-on** (no tween) | 1–2 | an optional 1–3 f white block "caret" the size of the coming word (v45); a 1-frame word pop with brackets (v07) | ~44 | `anim: "none"` / `pop` |
| Ghost → solid / grey → black | 6–10 | 30% for 6–8 f, then 100% in 4 f (v42); grey → ink 3–10 f (v51 v75) | ~28 | `anim: "ghost"` |
| Slam from large | 3–9 | 1.3–1.6× + blur → 1.0, no overshoot (v06 v12 v74); stamp 1.4 → 1 in 3 f (v04); scale-snap 1.4 → 1 in 2 f (v59) | ~22 | `anim: "slam"` |
| Per-letter tumble / drop / random order | letter 3–4 f, stagger 1–2 f; 10–20 f total | drop from ~40 px with baseline jitter (v60 v62 overshoot allowed); random order ~10 f for 12 letters (v74) | ~25 | `anim: "letters"` |
| Scramble / pixel resolve | 4–8 | LCD scramble 4 f (v53); pixel blocks 4–8 f (v70); geometric glyphs 4–6 f/letter (v59) | ~26 incl. particle assembles | `anim: "scramble"` |
| Mask wipe L→R / rise from behind a line | 4–8 | badge wipe 4–6 f; highlighter 4 f per word to 16 f per line (v47 v63 v74) | ~35 wipes, 10 highlighters | `anim: "mask" / "rise"`, `highlight` |
| Glow-on / neon flicker | 4–8, cool-down 8–40 | opacity 0 → 0.9 + glow 0 → 10 px (v41); neon on 2 f / off 1–4 f / on (v41 v64) | ~20 | text `fx.glow` + `anim: "focus"` |
| Tracking collapse | 6–25 | wide → normal letter-spacing (v57 v71 v74 v75) | 4 | ⚠ custom |
| Squash-stretch landing | 2–3 | scaleY ≈ 3 → 1 (v75); squash-pop 2 f (v71) | 3 | ⚠ custom |

### 4.2 Prop, sticker and UI entrances

| Move | Frames @30 | Parameters | Freq | Engine |
|---|---|---|---|---|
| Slide-in with directional blur | 3–10 (median 6) | ease-out, travel 20 px to 25 %W (v46: 25 %W over 22 f) | ~39 | image `anim: "slide-*"` |
| Rise from the bottom edge | 6–16 (props); 15–40 (heavy, long tail) | translateY +40–110% → 0, peak at f2 (v69) | ~26 | `anim: "rise"` |
| Drop-in from above / from the lens | 3–8 + 6–10 settle | scale 3 → 1 + blur, 4 + 12 f (v67); cascade 3–6 f each over 0.4 s (v53) | ~27 | `anim: "drop"` |
| Sticker / pill / icon pop | 2–8 | 0 → 1.1–1.15 → 1; stagger 1–3 f (v27 v39 v44) | ~19 stickers | `anim: "pop"` / `"stamp"` |
| 3D card flip | 6–10 | edge-on at the midpoint, content swapped there (v44 v64) | ~12 | image `anim: "flip"`; `transition: "flip"` |
| Hand-drawn ellipse / underline / scribble write-on | ellipse 4–8 (median 6); underline 4–8; scribble 15–18 | linear or ease-out stroke draw (v18 15 f linear) | 22 ellipse, 14 underline, 4 scribble | `shape: ellipse/underline/scribble`, `draw` |
| Rack-focus / defocus-in | 5–16 | 10–20 px → 0 (v30 v70) | ~21 | `anim: "focus"`, transition `focus` |
| Pendulum swing-in | 12–18 (quick) | see 1.5 | ~20 | image `anim: "swing"` |
| UI card / dialog / toast | 4–8 | dialog grows from its icon in 4 f (v76); line-to-window scaleY 0.02 → 1 in 5 f (v69); toast 4 f (v07) | ~20 | `ui` layers |
| In-place swap on the noun | 1 | hard swap, the shadow persists (v13); prop swap leads its noun by 0.05–0.15 s | ~15 | image `swap` |

### 4.3 Exits

| Exit | Frames | Freq / evidence |
|---|---|---|
| **Hard cut: nothing animates out** (the default) | 0 | the large majority. Stated outright in ≥12 (v06 v09 v13 v14 v15 v16 v19 v20 v29 v30 v39 v41) |
| Carried off by the camera ramp into the cut | the ramp (6–12) | ~55 (see 1.2). Captions travel and defocus with the plate (v24 v26) |
| Defocus / blur-out | 3–8 (v29), 5 (v73 v74) | ~8 |
| Slide-out with blur / italic-drop | 4–8 (v49: skew 12°, 20 px down, 4 f) | ~6 |
| Glitch / RGB collapse | 2–6 (v57 3 f + 6 f fade; v74 2–3 f) | ~6 |
| Fade | 6–12; linear 8–22 f only for CTAs/endings (v38 v61 v62 v65) | ~6 |
| Content-specific: backspace erase (v18), squeeze-to-caret 9 f (v55), shatter 15 f (v60), melt/particle 4–6 f (v34), pushed off by the next line (v34 v70) | — | 1–2 each |

**Engine:** leave `exit` unset (cut) by default. `exit: "blur"` for defocus-outs, `"slide-*"` for push-offs, `"fade"` only on the CTA tail.

---

## 5. Camera language

| Move | Frequency | Numbers | Engine |
|---|---|---|---|
| **Constant slow push / pull (drift)** | ≥25 state "never static"; nearly every collage, AI and UI-collage shot | ≈1–3% scale per second: 1–1.5%/s (v45), 1–3%/s on holds (v63), 4–6% over 2–3 s (v35), 3–8% per scene (v62), 2–10% per AI shot (v41), +5%/s on a UI hero (v46). Pull-outs are as common as pushes on collage stages (v13 v15 v67: pulls in 12/15 shots). | `drift: 0.03–0.06`; negative `drift` (−0.03…−0.06) for a slow pull-out |
| Decaying push after the cut ("push-in breath") | ~10 | first-frame peak, settles in 0.5–1.1 s (v22) | `settle: 0.94–0.97` (starts small and decays up to 1) + `drift` |
| **Punch-ins** | 24 | (a) in-shot bell: 4 f attack / 6–8 f release, 6–10% (v04), peak ≈0.1 s before the punchline (v22); (b) 1-frame jolt of +4% or rot −3.5° with 4 f residual on stressed words (v35 v76 v83); (c) punch-in cut 1.3–1.5× instant + 2–4 f settle (v27 v66 v79); (d) UI reframe to 1.6–2.3× (v18 v35 v51 v58) | `punch: [{at:{word}, scale: 1.08–1.12}]`; (c)/(d) = a new scene with `transition: cut` |
| Whip pan / tilt | 48 | 2–8 f per side, 10–20 f total across the cut (v18 10, v55 16, v50 18–20); peak 30–60 px/f @720 = 4–8 %W/f; heavy directional blur | `transition: "whip-left/right/up/down"` |
| Zoom-through | 22 | ease-in 6–16 f (zoom rate ×8–10), cut, 6–9 f out (v62 v73 v78) | `transition: "zoom"` |
| **Pans across a big canvas** (multiplane / one-world) | ~19 | travel 55–63 %W per move (v12 ~400 px, v20 440 px, v68 455 px @720) up to ~1.5 W per shot (v63); 0.6–1.5 s per reframe; move-hold-move with ≤0.5 s holds (v26 v54); reframes **lead** the named item by 0.3–0.6 s (v69) | `pan: [{at, x, y, frames: 18–45}]` |
| Rolls / rotation accents | 45 mention rotation | micro-roll ±1–6° (v24); roll on a push +32° over 3 s (v76); tabletop camera net rot −46…+39 per shot (v63); 180° roll in 0.9 s (v23, music) | `camera.rotate: [{at, deg, frames=18}]` (expo-out roll); `camera.exit.rotate` for a roll into a cut; `transition: "spin"` |
| Rack focus as a beat marker | 21 | subject blur vs caption sharp (v24 v26); defocus pulses | `camera.focus[{at, depth, frames}]` with layer `depth`; `transition: "focus"` |
| **Shakes** | **4/82** (19 state "no shake") | v18 0.3 s; v28 6-frame damped wiggle (rot ±5°, pan ±7 px) on landings; v67 once, to mark doubt; v54 jitter on FEAR | `shake: 0` default; ≤0.3 s, only on an impact or a doubt beat |
| 3D orbits | 5 (v01 v57 v76 v78 v83) | v78 orbits swing and settle like a damped spring (rot +4.2 → −4.1 → +2.0) | layer `tilt` → `tiltTo` for a linear 3D drift; a damped orbit is ⚠ custom |
| Perspective-tilted UI planes | ~10 | 5–15° (v82), 15–30° (v81), 3D tilt −25°/15° (v04) with edge DOF | layer `tilt: [x, y]`, `tiltTo` for a slow 3D drift |
| **Letterbox moves** | 3 (+2 windowed) | close-in: bars 0 → 20% of height each, expo-out over 6–8 f, 47/65/78/86/93/97% of the travel on frames 1–6 (v78; v79 55/73/84/90/96/100%); open: band → full frame ~10 f (v77) | `scene.letterbox: 20` closes in over ~6 f with expo-out (decay r = 0.5: 50/75/88/94/97%); a following scene with `letterbox: 0` opens it the same way (faster than v77's ~10 f) |
| Locked-off | 12 | only for UI legibility (v69: zero drift between moves), wrappers (v40 v43), white type "breath" cards (v76), the last 1.1 s (v38) | `drift: 0, settle: 1` |

---

## 6. Secondary motion (idle life)

Rule: **every hold carries at least one live element** (v27 v31 v39: "a static frame always has life").

| Element | Numbers | Freq | Engine |
|---|---|---|---|
| Idle float / bob | wrapper ±3 px V, ±1.5 px H, 0.1° roll, ~8 s sine (v41 v42); cards ±4 px (v35); drift amplitude 6–14 px, period 40–70 f (v33); card Y-wobble ±3–5° (v57) | ~40 real (keyword hits 64) | image `float` (px); `"loop": "bob"` (±6 px, ~2.9 s) on any positioned layer |
| Constant micro-drift on holds | ~0.5 px/f (v17); min flow ≈0.4 even on holds (v23); holds drift 0.3–0.5 zoom units/f (v50) | ~25 | `drift` |
| Stop-motion jitter / line boil | redraw every 2–3 f; paper luma ±10 (v21); grain on twos (v15); outlines re-drawn every ~3 f (v60) | ~14 | image `jitter` (px), `wiggle(f, seed, 2, 3)` |
| Blinks | caret period 15–16 f (v04 v75); googly-eye swaps every ~0.5 s (v05); sparkle twinkles 4–6 f (v26); pixel mascot frames every 0.27 s (v70) | ~20 blink, 28 caret | text caret via `typewriter`; `"loop": "blink"` (0.5 s on / 0.5 s at 15% opacity) on any positioned layer |
| Cursors | travel 15–25 f per move on curved ease-in-out paths (v55 v59); dwell 4–6 f before a click (v57 v58); 4 f ease-out into the click (v52); click = scale 0.95 for 2–3 f + ring pulse (v59 v75); drag ≈0.6 s, drop with a 4 f blur → sharp settle (v35); fast badge drags 5–6 f over ~250–300 px (v36); idle multiplayer cursors ±10 px sine, 2 s (v59) | 27 | `cursor: {path:[{x,y,t,click}]}` |
| Pendulum sway (idle, after the entrance) | see 1.5 | ~20 | `anim: "swing"` for the entrance + `"loop": "sway"` for the idle |
| Live screens | video or scrolling UI inside phones and laptops on most CTAs (v02 v03 v06 v15 v19 …) | very common | `ui: phone` with `src`, `video` card |
| Glow breathing | +5–7 luma over ~1.4 s (v07); glow decays 33–40 f (v33) | ~10 | `"loop": "breathe"` (opacity 0.56–1, ~2.4 s); a glow-radius breathe is ⚠ custom |
| Ambient particles (dust, sparkles, embers, bokeh, confetti, snow) | low counts, slow drift (≤4% of frame height per second at 12 fps) | 41 | `{"type": "particles", "kind": "dust", "count": 24, "opacity": 0.5}`; `area: [x, y, w, h]` to keep them near the hero |

---

## 7. Pacing

### 7.1 Cut rate and shot length

All 82: **median 0.43 cuts/s** (IQR 0.37–0.57; range 0.06–0.95). Median shot length across the 32 videos that report one: **2.0 s** (IQR 1.3–2.4).

| Style | Cuts/s (median, range) | Median shot | In-shot events | Videos |
|---|---|---|---|---|
| Collage / paper / diorama explainer | 0.41 (0.25–0.73) | 1.4–2.5 s | every 0.3–1.0 s | v05–v17, v19–v22, v25, v29–v32, v34, v37, v44, v53, v54, v62, v66, v70 |
| AI-photoreal / cinematic story | 0.40 (0.34–0.42) | 2.2–2.8 s | camera always moving; graphic beat every 0.8–1.2 s (v56) | v24 v26 v47 v50 v56 v63 v64 v67 v68 |
| UI / SaaS promo (16:9 mostly) | 0.5 (0.06–0.66), hard cuts often 0.1–0.25 | 1.3–3 s | camera-state change every 1.2–2.0 s (v35 ≈24 states in 37 s; v69 43 events, median spacing 2.0 s) | v01–v04 v07 v18 v33 v35 v38 v46 v49 v51 v52 v55 v57–v59 v61 v65 v69 |
| UI-collage brand explainer (9:16) | 0.56 (0.36–0.78) | 1.1–1.9 s | 3–6 events per shot (v76: one per 0.4–0.5 s) | v45 v74–v83 |
| Music / lyric kinetic type | 0.76 (0.4–0.95) | 0.5–1.9 s = 1–2 beats or one bar | an event on every beat (v28) | v23 v28 v36 v71 v73 |
| Process reel / tutorial | 0.09–0.5 | 2–3 s or one 50 s shot | a reframe or reveal every 1–2 s | v39 v48 v60 v69 |
| Showcase template | 0 outer; inner 0.2–0.8 | — | the wrapper is static by design | v40–v43 |

### 7.2 Pace across a video

| Section | Rule | Frequency / evidence |
|---|---|---|
| **Hook** (first 3–7 s) | the fastest part: 0.4–1.5 s shots, 3–6 visual states per second at the extreme | ~25: v17 4 states/s; v18 6 states in 1.5 s; v29 0.4–0.5 s; v35 4 states in 3.7 s; v45 1.5 cuts/s; v51 4 surfaces in 2.8 s; v59 0.6–0.8 s; v79 4 looks in 3.7 s |
| **Body** | one scene per sentence (v51 v70 v78 v82: scene length tracks sentence length; single-word definitions 0.84–1.0 s, clauses 1.5–2.5 s, two-beat pairs 3.2–3.6 s); data and reading scenes get the longest holds (3.7–4.5 s) | most |
| **Montage burst** (one per video, usually in the 2nd half, on lists, evidence or emotion) | 0.1–1.07 s shots, often snapped to the beat. Accelerating version: 1.33, 0.45, 0.55, 0.33, 0.33, 0.17, 0.11 s (v16). Extreme: 12 cuts in 4.3 s, 3–14 f each (v78). Flicker swaps every 2–5 f (v03 v65). | ~19: v03 v06 v09 v11 v13 v14 v16 v17 v21 v24 v31 v34 v44 v45 v65 v68 v73 v74 v78 |
| **Moral / thesis** | slows to 2.2–4.8 s holds; "fast = facts, slow = philosophy" (v17) | ~10: v14 v17 v24 v34 v44 v63 v67 v74 v78 |
| **Pre-punchline staccato** | two short shots (0.87 s, 1.0 s) just before the punchline (v37); punchline holds of 0.7–1.0 s with flow < 0.3 | v37 v12 |
| **CTA** | the longest or second-longest hold: 3.1–6.6 s (median ≈4–5 s), with internal stacking so it stays alive (v62); a loop for comment-reading (v70 5.9 s) | ≥27 |

---

## 8. Sync

### 8.1 Cut vs. VO phrase start

| Measure | Value |
|---|---|
| Median offset (cut − first word of the new phrase) | **−0.04 s** (n = 63 videos; IQR −0.07…+0.01) |
| Distribution | 35 lead, 12 on the word, 16 lag; 56/63 within −0.10…+0.05 s |
| Frame-locked styles (median within ±1 f) | v11 v12 v13 v14 v20 v26 v51 v54 v78 v79 ("the picture changes on the syllable") |
| Consistent leads of 0.1–0.25 s | v05 v07 v31 v46 v47 v55 (when not on a beat), v63 |
| Deliberate larger leads | −0.2…−0.3 s when the new scene needs a beat to settle (zoom-out reveal v76, fade-up from black v77, setting the scene v66); −0.44 s with a black card holding the breath (v67) |
| Deliberate lags | +0.3…+0.45 s to let the previous image finish its word or move (v19 v20 v22 v25 v78) |
| Cuts in VO gaps | result shots land 0.5–1.2 s after the VO stops (v58); whips fill the VO pause (v26); the title-drop cut sits in the narrator's pause (v16); cuts in the gap between phrases (v34 v57) |

**Engine:** `start: {word, offset: -0.04}` by default; −0.12 (the spec's rule) when the scene opens with a settle or a reveal. Mid-sentence reframes go on the stressed verb or noun ±0.05 s (v51 v70).

### 8.2 Keyword reveal vs. spoken word

| Text register | Offset | Evidence |
|---|---|---|
| **Hero keyword / single-word caption** | 0…+0.1 s (0–3 f) | v12 hero hits +0.00–0.03; v19; v31 ±0.1; v38 median 0.04; v51 ±1 f; v53 on the syllable; v74 ±2 f; v78 0–4 f |
| Subtitle pill / chunk captions | switch on the chunk onset ±1 f; chunks of 1–3 words, 0.3–0.8 s each | v08 v16 v25 v26 v31 v35 (1 chunk per 0.4 s) |
| Body / connector words, "echo" type | +0.2…+0.4 s (the type confirms what was just heard) | v03 v07 v08 (median +0.3) v29 v45 v54 v62 (median +0.3) v82 v83 (legible at +0.3–0.45) |
| Typed text (UI) | tracks speech ±0.15 s, sized to span the phrase; finishes ≤0.3 s after the word | v19 v22 v27 v30 v66 v79; typed prompts may run progressively ahead (up to 1 s, v46) or lag the spoken instruction (+0.4–1.2 s, v58) |
| Slow-entering words | complete +0.6–0.9 s (the entrance itself takes ~0.3 s) | v60 letter drops, v43 heavy rises |
| Front-loaded statement cards | first word on its onset, the rest of the phrase 0.3–1.0 s early for reading time | v09 v10 v14 (shot 2) v30 v71 (keyword −0.42 s so the sweep lands on the word) |
| Containers and emphasis | empty pill/badge leads by 0.04–0.08 s, then the word fills (v44 v70); ellipses and underlines land 0.0–0.4 s before (v76) or ~0.3 s after (v24 v67) |
| **Props and physical actions** | the motion peak lands on the noun: start the move early (−0.48 s throw v34, −0.5 s rise v53); prop drops are frame-accurate to spoken nouns (v15 ±0.02 s); literal action on the word (v64 v66) |
| Lyric (sung) type | +0.2…+0.4 s after the sung word, snapped to the next beat or onset; "the beat wins over the syllable" (v23); held notes become scrolling, letter-appending text (v28) |

**Engine:** `sync: true` (≈2 f early) matches the hero register. For echo text, set word `at` to `{word, offset: +0.25}`.

### 8.3 Beat-locking

| Class | Count | Videos | Rule |
|---|---|---|---|
| VO-only (cut-to-beat offsets at chance level) | **40** | v01 v02 v04 v05 v06 v08 v09 v10 v13 v14 v15 v16 v20 v22 v25 v26 v29 v34 v35 v37 v38 v41 v43 v45 v46 v47 v49 v51 v54 v57 v58 v59 v60 v65 v74 v75 v76 v77 v79 v82 | the music is a bed |
| Partial (beat used for some cuts only) | **13** | v03 v07 v11 v12 v19 v21 v39 v44 v55 v61 v66 v70 v71 | nudge a VO cut onto a beat when one is within ~2–3 f (v19 v66); snap the **montage** to the beat (v21 v44); beat only for big mode changes (v07); "the edit snaps to whichever of word or beat is nearer" (v12); after the VO ends, switch to beat sync (v39) |
| Beat-locked or dual-locked (VO-led cuts that also hit the grid) | **29** | v17 v18 v23 v24 v27 v28 v30 v31 v32 v33 v36 v40 v42 v48 v50 v52 v53 v56 v62 v63 v64 v67 v68 v69 v73 v78 v80 v81 v83 | tolerance ±0.10 s; hard cuts on the beat, soft transitions on the VO (v63); cut = beat + 2 f (v64); VO edited onto the grid so cuts sit 0.02–0.19 s before the beat (v68 v78) |

When each applies:
- **Story/explainer with a dense VO:** VO-only. Snap montage cuts and section starts to the beat.
- **Premium, slower VO laid on music (AI-cinematic, UI-collage):** dual-lock. Record or edit the VO so sentence starts fall on beats, then cut on both.
- **Music-only or lyric:** beat-locked (next subsection).
- **Camera bumps and flashes:** on beats and keywords together (v80); the flash peaks on the music hit and resolves on the VO (v43); the white frame pre-empts the hit by ~0.17 s (v28).

### 8.4 Music-only edits (6: v18 v23 v28 v33 v36 v73)

| Rule | Numbers |
|---|---|
| Hard cuts on the beat or just before it | v18: 13/15 cuts within ±0.2 s, 8 within ±0.05 s; v33: −0.07…+0.06 s; v23: mean \|offset\| 0.08 s on a 0.905 s grid |
| Secondary reveals on the off-beat eighth ("the and") | v33 (+0.21 s at 143.6 BPM); v71 cuts on beats and half-beats |
| Cycles on the eighth-note grid | colour swaps every 8 f at 112 BPM (v36); caption words every 6 f = 0.25 s at 123 BPM (v73) |
| Scene = one bar or two beats | v36: 1.73–2.2 s ≈ one bar at 112 BPM; v71: 0.9–1.4 s ≈ 2 beats at 103 BPM |
| Typing fitted to beats | prompt typing spans 2–3 beats; the send-bloom lands on a beat (v18) |
| Cuts on strong onsets | ≤0.1 s (v36); type hits on onsets (v28) |

---

## 9. Engine gaps found

Checked against `remotion/src/engine/types.ts` (the source of truth). Status: **DONE** = use the named field; **PARTIAL** = the common case works; **OPEN** = no field yet.

| Technique | Frequency | Status | Field / how it could be built |
|---|---|---|---|
| **Per-layer frame rate** (footage, UI typing and cursors smooth inside a stepped scene; 7.5 fps sprite/hand loops; stepped AI b-roll inside a smooth scene) | layer mixing in v10 v13 v14 v31 v32 v45 v47 v81; sub-rates in v08 v22 v30 v70 | **PARTIAL** | `"smooth": true` keeps a positioned layer at full fps inside a stepped scene. Open: a per-layer `animFps` for sub-rates (7.5 fps loops), stepping a layer inside a smooth scene, `smooth` on cursors |
| **Camera roll / rotation** (micro-roll, roll-on-push, roll into a cut outside the `spin` transition) | ~45 | **DONE** | `camera.rotate: [{at, deg, frames=18}]` (expo-out), `camera.exit.rotate` for a roll into the cut. Open: a continuous `roll` that drifts like `drift` |
| **Snap-to-beat** for VO-led cuts (move a word-anchored `start` onto the nearest beat when it is within ±3 f) | 13 partial + 29 dual-locked | **DONE** | `"snap": "beat"` or `"downbeat"` on the scene (±0.12 s window, needs `spec.beats`); beat TimeRefs `{beat: n}`, `{downbeat: n}`, `{onset: n}` |
| **Out-biased reframe curve** `bezier(0.6,0,0.2,1)`, and `curve` choice on `pan` | 8 recipe mentions, ~10 measured | **DONE** | `curves.reframe`; `pan[{…, curve: "glide"\|"reframe"\|"settle"}]` |
| Spring preset `springs.pop` overshoot (was ~15% vs the measured 4–10%) | 49 videos use damping 9–16 pops | **DONE** | retuned to `{damping 14, stiffness 220, mass 0.6}` |
| Explicit **exit ramp** without a transition effect (accelerate into a settled incoming frame, as in v45 and v54's hero-word punch exit) | ~5 (the matched versions are covered by `zoom`/`whip-*`) | **DONE** | `camera.exit: {zoom, x, y, rotate, frames=8}` (×1.4/frame ramp with speed blur) |
| Idle pendulum sway after the entrance, blink loops, glow breathing | ~20 + ~20 + ~10 | **PARTIAL** | `loop: "sway" \| "blink" \| "breathe" \| "bob" \| "pulse"` with fixed amplitudes. Open: `{prop, period, amp, damping}` parameters, a glow-radius breathe |
| Camera 3D orbit around floating UI | 5 | **PARTIAL** | layer `tilt` + `tiltTo` (linear drift). Open: a damped-spring orbit (v78), camera-plane tilt |
| Letterbox **open** (band → full frame, ~10 f) | 1 (v77) | **DONE** | the next scene sets `letterbox: 0`; the bars open with the same ~6 f expo-out. Open: a custom duration, a mid-scene change |
| Text tracking-collapse and squash-stretch entrances | 4 + 3 | **OPEN** | text `anim: "track"` (tracking 0.6 em → 0 over 6–25 f on `curves.settle`), `"squash"` (scaleY 3 → 1 in 3 f) |
