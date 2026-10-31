# Keynote-clean kinetic type (light)

**White (or alternating white/black) canvases, one quiet typeface, 60–80% negative space, small sentence-case lines, and one accent hue that moves.** All the energy goes into 1–5-frame transitions: exposure burns, invert strobes, liquid fills, dot-grid dissolves. The type itself stays calm. It reads as "Apple keynote": expensive through restraint.

References (6): v03 v49 v55 v59 v61 v71. Mostly 16:9. Cousins: dark-product-promo (the dark twin) and floating-ui-demo (UI on wallpapers).

---

## 1. Signature look
| element | rule | evidence |
|---|---|---|
| White base | Off-white `#f6f7fc`/`#f4f4f2`/`#ffffff`. Neutrals fill 85–97% of every frame (v71). | 6/6 |
| One family | A single geometric or neo-grotesk (Poppins, Helvetica, SF Rounded) for everything. | 6/6 |
| Small type | Body lines with cap height 2.5–3.5% of frame height, at 18–40% of frame width. One giant keyword scene at most every ~5 s. | 6/6 |
| Emphasis by colour or grey value | A keyword is red only while it is new, then turns black (v59). Grey vs black does the work, not weight (v03 v61). | v03 v59 v61 v71 |
| Travelling accent | One hue physically moves through the piece: footage → caret → clip → highlight bar (v55 purple). | v55 v71 |
| Flat toy diagrams | Explain software with flat coloured bars, a playhead and labelled multiplayer cursors instead of screen recordings (v59). Or float screen recordings as shadowed panels (v49). | v59 v49 v55 |
| Light/dark swings | 3 luma swings (≈215 ↔ 25), each one a transition event (v61). White/black alternation alone is a rhythm (v71). | v61 v71 v03 |

## 2. Palette recipes
| recipe | bg | ink | accent | accent2 | paper | source |
|---|---|---|---|---|---|---|
| Lilac-white rotation | `#f6f7fc` | `#4a4a4f` grey type | rotate per scene: `#4a8fe8` → `#d12e29` → `#9a8cf0` → `#3ddc6a` | `#929395` mid grey | `#fafcfd` | v03 |
| Travelling purple | `#ffffff` | `#111014` | `#8340df` (caret, clip, bar, new letters) | `#e5243b` (means "problem") | `#c8c8cc` inactive list items | v55 |
| Keynote red | `#ffffff` | `#1d1d1f` | `#c0161c` new keyword, settles to black | `#f09da2` colour-wash flash | `#f2f2f2` | v59 |
| White/black + keyword hue | `#ffffff` ↔ `#000000` | `#111111` / `#ffffff` | `#fc3819` "risk" word with glow | `#148ef9` "simple" word | `#0049ac` end card | v71 |

## 3. Type system
| role | engine | size (% W, 16:9) | treatment | evidence |
|---|---|---|---|---|
| Line | `clean`, `caps: false` | 2.2–3.2 (18–40% width) | `anim: "focus"` (blur-in per word, ~6 f, newest word slightly greyer) or `"words"` with `sync` | v61 v49 v59 |
| Hero word → line | `clean` | hero 18–24 (40–46% width) then line 3 | show the first word huge, then snap to the full sentence small on the next spoken word: two layers with `until` / `at` | v55 v58 |
| Keyword scene | `clean` | 14–20 (≈85% width) | one keyword per scene coloured with `accent` + `fx.glow`; rest of the phrase in ink | v71 |
| Typed caret line | `clean` or `mono` | 2.5–3 | `typewriter` with `leadColor` = accent (new letters are born in the accent and cool to ink) | v55 v71 |
| Numbered benefit card | `clean` | numeral 14 + label 3 | oversized gradient numeral on a glass card | v03 |

## 4. Motion signature
- **`animFps: 0`**, fps 30.
- **Settle:** minimal. `camera.settle` 1.02–1.04, `settleR` 0.75 (v55: half-life ~2 f, settled by ~15 f). Long expo ease-outs with **no overshoot anywhere**: premium comes from restraint (v55).
- **Quiet type, loud transitions:** captions never bounce. Transitions are 1–5-frame events, and each trick is used once (v71).
- **Cut mix** (84 classified): `flash`/`burn` (exposure, light leak) 25% · plain cut 22% · `zoom` 11% · in-shot morphs 10% · `ink`/liquid/`wash` 8% · `whip-*` 7% · `black` 5% · `invert`/`strobe` 3% · `pixel` (dot-grid dissolve, v61) and `glitch` occasionally.
- **Hand momentum across cuts:** ease-in out of a shot over 8–11 f, start the next already moving (v59).
- **Sync:** cuts on the first word of each sentence (±0.1 s, v59). Scenes ≈ 2 beats long, with major transitions on beats/onsets (7 of 17 within ±0.1 s, v71). Text timing floats around the VO; hard transitions sit on beats (±0.13 s, v61).
- **End card decelerates:** logo → tagline → a 2 s linear fade to black (v71).

## 5. Recurring devices
1. **Hero word, then line** (v55 v58).
2. **Keyword colour sweep + glow** (v71). Approximate with an `accent` word plus `fx.glow` and `anim: "mask"`.
3. **Glyph-icon substitution**: a logo as the "I", a prohibition sign as the "o" (v59 v81). Place a `shape`/`image` over a gap in the text.
4. **Multiplayer cursors as characters**: several `cursor` layers in different colours acting on a flat diagram (v59).
5. **The subject is the transition**: the effect the video sells becomes the cut (dot-grid `pixel`, flicker `strobe`, v61 v49).
6. **Colour-wash flash** = "AI magic", reused for every generative moment (v59). Use `transition: wash` with `color`.
7. **Exposure as glue**: every major cut passes through white (`flash-ramp`, `burn`), which feels organic on a white base (v03).
8. **Emoji/prop rebus** for sensitive or abstract consequences, orbiting the centred type (v71). Needs user PNGs.

## 6. Skeleton (30 s, 16:9, ≈14 scenes)
| t (s) | beat | scene | cut in |
|---|---|---|---|
| 0–2.7 | Thesis acted out: the metaphor happens literally | white canvas, the accent object morphs | — |
| 2.7–7 | Pain in the old tool | floated screen panel, red "problem" marker | `flash-ramp` |
| 7–9 | "What if…" | black canvas, one line | `invert` |
| 9–18 | Solution: 3 feature lines | hero-word → line, a flat diagram with cursors | `zoom`, `wash` |
| 18–23 | Word-locked feature list | list highlight moves on each spoken item | `cut` |
| 23–27 | Before/after | two panels, a pixel dissolve | `pixel` |
| 27–30 | End card | logo + tagline + comment keyword, a slow fade | `flash-ramp` |

## 7. Example VideoSpec (16:9, asset-free)
```json
{
  "width": 1920, "height": 1080, "fps": 30, "animFps": 0,
  "palette": {"bg": "#ffffff", "ink": "#111014", "accent": "#8340df", "accent2": "#e5243b", "paper": "#f4f4f6"},
  "finish": {"grain": 0.03, "vignette": 0.12},
  "scenes": [
    {"id": "hero-word", "duration": 2.6,
     "background": {"kind": "solid", "color": "#ffffff"},
     "camera": {"settle": 1.03, "settleR": 0.75, "drift": 0.01},
     "layers": [
       {"type": "text", "text": "Still", "style": "clean", "size": 20, "y": 48, "caps": false, "until": 0.7, "exit": "cut", "anim": "focus"},
       {"type": "text", "text": "Still typing captions by hand?", "style": "clean", "size": 3.2, "y": 48, "caps": false, "at": 0.7, "anim": "focus",
        "accent": ["captions"], "accentColor": "#8340df"}
     ]},
    {"id": "pain", "duration": 3.0, "transition": {"type": "flash-ramp"},
     "background": {"kind": "solid", "color": "#f4f4f6"},
     "camera": {"settle": 1.04, "settleR": 0.75, "pan": [{"at": 1.4, "x": 58, "y": 50, "frames": 28}]},
     "layers": [
       {"type": "ui", "kind": "window", "title": "captions_final_v7.srt", "text": "00:00:12,400 --> 00:00:14,100", "theme": "light", "y": 46, "w": 54, "anim": "rise"},
       {"type": "shape", "kind": "rect", "x": 66, "y": 52, "w": 3, "h": 14, "fill": "#e5243b", "color": "#e5243b", "at": 1.2, "draw": 4},
       {"type": "text", "text": "Two hours. Every video.", "style": "clean", "size": 2.8, "y": 78, "caps": false, "at": 1.6, "anim": "focus"}
     ]},
    {"id": "what-if", "duration": 2.0, "transition": {"type": "invert", "frames": 2},
     "background": {"kind": "solid", "color": "#000000"},
     "camera": {"settle": 1.02, "settleR": 0.75},
     "layers": [
       {"type": "text", "text": "What if they wrote themselves?", "style": "clean", "size": 3.2, "y": 48, "caps": false, "color": "#ffffff", "anim": "words", "stagger": 5,
        "accent": ["themselves?"], "accentColor": "#8340df"}
     ]},
    {"id": "feature", "duration": 3.4, "transition": {"type": "wash", "color": "#8340df"},
     "background": {"kind": "solid", "color": "#ffffff"},
     "camera": {"settle": 1.03, "settleR": 0.75},
     "layers": [
       {"type": "ui", "kind": "prompt", "text": "Caption this video in my brand font", "theme": "light", "accent": "#8340df", "y": 40, "w": 46, "cps": 24, "anim": "pop"},
       {"type": "cursor", "color": "#8340df", "path": [{"x": 80, "y": 80, "t": 0.6}, {"x": 71, "y": 41, "t": 1.6, "click": true}]},
       {"type": "text", "text": "Synced to every word.", "style": "clean", "size": 2.8, "y": 64, "caps": false, "at": 2.0, "anim": "focus"}
     ]},
    {"id": "endcard", "duration": 3.0, "transition": {"type": "flash-ramp"},
     "background": {"kind": "solid", "color": "#ffffff"},
     "camera": {"settle": 1.02, "settleR": 0.8, "drift": 0},
     "layers": [
       {"type": "text", "text": "Every word.\nZero typing.", "style": "clean", "size": 3.6, "y": 44, "caps": false, "anim": "words", "stagger": 5},
       {"type": "badge", "text": "Comment \"CAPTIONS\"", "variant": "pill", "color": "#8340df", "textColor": "#ffffff", "size": 2.6, "y": 62, "at": 1.4, "anim": "pop"}
     ]}
  ]
}
```

## 8. Do / don't
**Do**
- Keep 60–80% of the frame empty. Small type on lots of white reads as confidence.
- Let one accent hue carry the brand, and make it move or change meaning over time (new → settled).
- Put all the "wow" into the cut: 1–5 frames, a different trick each time.

**Don't**
- Use bold caps, extrudes, stickers or bounce.
- Show more than one typeface or more than one accent per scene.
- Add texture beyond faint grain. No halftone or paper here (`finish.grain` ≤ 0.04, low vignette).

## 9. Engine notes and gaps
- **Keyword colour-fill sweep over 12–20 f** (v71): not a text anim. Use `mask` + accent colour. Possible fix: `anim: "sweep"` with a colour gradient position.
- **Liquid fill / shape-morph objects between scenes** (v55's purple object morphing into a caret, v71 liquid): needs a custom SVG-morph component.
- **Glyph-icon substitution**: possible with manual layout, but there is no inline-icon-in-text support. Possible fix: `text` tokens like `{icon:src}`.
- **Named cursor labels** (multiplayer "Claude / You" tags, v59): `cursor` has no label. Pair it with a `badge` that follows the same path, or add `cursor.label`.
