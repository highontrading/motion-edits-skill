# Stage diorama / puppet theatre

**Every sentence is a hand-built stage.** Painted backdrop → set piece → hero cut-out on a plinth → props hung on strings → a blurred foreground occluder (curtain swag, leaves, a hand). One continuous camera zooms *through* the stages. Facts become physical performances: a card flips, a frame swings on its nail, a figure ink-dissolves into its next identity. Type is rationed and carved, burned or printed into the world.

References (5): v32 v37 v44 v50 v66. Also v39, which is the same diorama language shown inside a process frame. Cousins: halftone-poster-collage (flatter) and ai-cinematic-recap (photoreal).

---

## 1. Signature look
| element | rule | evidence |
|---|---|---|
| Layered set | 3–5 depth planes per scene: back wall, set piece, hero, hanging props, foreground occluder blurred 12–25 px. | 5/5 |
| One world-material | Parchment and a tree-stump plinth (v32), paper theatre and tarot (v37 v44), the subject's own paintings as sets (v66), lit gallery rooms (v50). | 5/5 |
| Spotlight | An oval spotlight pool on the hero, with corners crushed to ~40% luma (v37). | v32 v37 v44 v50 |
| Period art per scene | Playing card, tarot, engraving, oil painting, paper-cut waves, unified by one halftone + grain + heavy vignette pass. | v37 v66 |
| Contrast world | When the stakes rise ("But this time…"), hard-switch to a darker, photoreal register (v44). The art-direction switch *is* the plot point. | v44 |

## 2. Palette recipes
Rule: a warm, low-key base (mean luma 24–117) with **one red accent** for keywords and **one secondary hue reserved for a single semantic** (water, night, the painting's sky). The CTA is the only bright frame (v44: luma 154 vs 30–70 elsewhere).

| recipe | bg | ink | accent | accent2 | paper | source |
|---|---|---|---|---|---|---|
| Museum parchment | `#322213` bark | `#3a2a1a` | `#910f0d` blood red | `#1e6952` teal (water only) | `#fbc889` gold label / parchment | v32 |
| Carnival night | `#19191d` navy night | `#e9deca` off-white | `#c92f31` marker red | `#295db2` cobalt paper sea | `#633432` harlequin oxblood | v37 |
| Puppet theatre | `#141a2e` navy | `#ffffff` | `#ce9936` gold stars | `#3b452f` dark green (stakes world) | `#ddd8d4` card | v44 |
| Painter's palette | `#141723` navy | `#ffffff` (grey extrude) | `#ae7f19` chrome yellow | `#163f98` cobalt | `#b45c28` gilt | v66 |

## 3. Type system
Rationed: v37 sets only **3 VO phrases** as type in 29 s. The rest is carried by props whose printed labels *are* the keywords (tarot footers, signs, plaques).

| role | engine | size (% W) | treatment | evidence |
|---|---|---|---|---|
| Three-tier headline | `serif` caps in one layer with `lineSizes: [0.4, 1.4, 0.4]`: small dark / huge red / small dark | 12 base (≈5 / 17 / 5) | `accent` on the middle line; built word by word 0.1–0.3 s after each word | v32 |
| Title behind the figure | `impact` tall condensed, off-white | 22–26 (≈74% width) | `z` below the hero cut-out | v37 v39 |
| Chunky typed caption | `grotesk`, white → grey with `fx.extrude` 3–5 grey + `shadow` | 9–14 | `anim: "typewriter"` or `"letters"`, stagger 1 | v66 |
| Quote pill | `badge` `pill` | 4–5 | the empty container pops just before the phrase, then fills | v44 |
| Poetic parallel | `script` | 6–8 | placed diagonally opposite its pair | v44 |
| Labels on props | `badge` `tape`/`solid`, or `serif` small on a plaque | 3.5–5 | museum label strips, ticket booths | v32 v37 |

## 4. Motion signature
- **`animFps: 15`** (v37 v44). Use 12 (or 10) for heavy parchment worlds (v32), and 0 for lit-gallery AI sets (v50).
- **Settle:** cut in slightly zoomed and decay, then keep a slow push. `camera.settle` 1.1–1.14, `settleR` 0.84, `drift` 0.03. Nothing is ever static until the CTA (v44).
- **Continuous zoom chain:** ramp the zoom into every cut and out of the next **in the same direction** (v37: 13 scenes read as one fall). Use `transition: zoom` on 50–70% of cuts.
- **Cut mix** (75 classified): plain cut 34% · `zoom` 18% (the highest share of any family) · in-camera reveals 14% · `flash` 6% · `whip-*` 5% · `focus`/`ink` 4% each · object/match 4% · `circle` (spotlight iris) 2%.
- **Physical prop motion:** hung props swing with an under-damped spring (≈1.3 s period, 2–3 visible swings, v50 → image `anim: "swing"`). Card flips take 10 f (`anim: "flip"`). Prop drops have a 2–3° rotational overshoot and settle in 6–8 f (v32).
- **Sync:** props land on their word ±0.15 s; cuts lead the sentence by ~0.1 s (v37). Pivot sections land on the strongest music onset (v66).

## 5. Recurring devices
1. **Evolve the subject, don't replace it**: the same figure on the same plinth ink-dissolves into its next identity on each keyword (v32). Use `image.swap` with `glow`, or a scene split with `transition: ink`.
2. **Spotlight iris for the twist** ("here's the crazy part"): `transition: iris-close` with `at` on the hero, or a `radial` background with a dark edge (v32).
3. **Card-flip portal**: the back of a card becomes the door to the next scene (v37 v44). Use `transition: flip`.
4. **Hand of god**: a giant hand deals, merges or plants (v44 v32). Use an image `slide-*` with `shadow: "long"`.
5. **Frame-edge peekers**: heads, hands and curtain swags at 20–40% of the frame edge with `blur` 14–24 and `depth` 1.5–1.8, so they slide faster than the set during drift (v44).
6. **Tall-canvas travel**: one long diorama explored with S-curve tilts, then a pull-out reveals the whole canvas as a summary (v32). Use `camera.pan`.
7. **Map route / timeline** as period artefacts: `shape arrow` drawn over a `paper` map, `counter` years (v32).

## 6. Skeleton (40 s, ≈12 stages)
| t (s) | beat | stage | cut in |
|---|---|---|---|
| 0–3 | Hook / thesis question | the hero card spins in on frame 1 under a spotlight | — |
| 3–9 | Side A's assets, one prop per word | 3 tarot cards fly in on their words | `zoom` |
| 9–15 | Side B's contrast | a new stage, colour-coded warm vs cool | `zoom` |
| 15–18 | Twist | spotlight iris on the hero | `iris-close` |
| 18–28 | Evolution / proof | the figure morphs on its plinth per keyword; map route | `ink`, `zoom` |
| 28–33 | Stakes switch (optional) | darker photoreal stage, cut every ~1 s on the music | `flash`, `cut` |
| 33–36 | Payoff | wide tableau, the title behind the hero | `zoom` |
| 36–40 | CTA | the only bright flat frame, URL on a carved sign | `flash-ramp` |

## 7. Example VideoSpec
`PLACEHOLDER_*.png` are user-supplied cut-outs (hero figure, card, curtain). Remove them to render asset-free.
```json
{
  "width": 1080, "height": 1920, "fps": 30, "animFps": 15,
  "palette": {"bg": "#19191d", "ink": "#e9deca", "accent": "#c92f31", "accent2": "#295db2", "paper": "#d8c9a8"},
  "finish": {"grain": 0.09, "halftone": 0.12, "vignette": 0.6},
  "scenes": [
    {"id": "thesis", "duration": 3.0,
     "background": {"kind": "radial", "color": "#633432", "color2": "#100e0d"},
     "camera": {"settle": 1.14, "settleR": 0.84, "drift": 0.03, "parallax": 80},
     "layers": [
       {"type": "particles", "kind": "dust", "count": 40, "opacity": 0.5, "z": 0},
       {"type": "text", "text": "PAWN", "style": "impact", "size": 26, "y": 38, "z": 1, "anim": "mask", "depth": 0.8},
       {"type": "image", "src": "PLACEHOLDER_pawn_card.png", "cutout": true, "shadow": "soft", "x": 50, "y": 46, "w": 46, "z": 2, "anim": "spin-in", "depth": 1.1},
       {"type": "image", "src": "PLACEHOLDER_curtain_swag.png", "x": 12, "y": 10, "w": 60, "blur": 16, "z": 5, "depth": 1.7}
     ]},
    {"id": "assets", "duration": 3.4, "transition": {"type": "zoom"},
     "background": {"kind": "fabric", "color": "#1f3a2a"},
     "camera": {"settle": 1.12, "settleR": 0.84, "drift": 0.03},
     "layers": [
       {"type": "badge", "text": "SMALL", "variant": "solid", "color": "#e9deca", "textColor": "#19191d", "size": 5, "x": 22, "y": 46, "rotate": -8, "at": 0.2, "anim": "pop"},
       {"type": "badge", "text": "SLOW", "variant": "solid", "color": "#e9deca", "textColor": "#19191d", "size": 5, "x": 50, "y": 42, "at": 0.9, "anim": "pop"},
       {"type": "badge", "text": "EXPENDABLE", "variant": "solid", "color": "#e9deca", "textColor": "#19191d", "size": 5, "x": 78, "y": 46, "rotate": 8, "at": 1.6, "anim": "pop"},
       {"type": "text", "text": "or so they say", "style": "script", "size": 8, "y": 64, "caps": false, "at": 2.2, "anim": "pop", "color": "#ce9936"}
     ]},
    {"id": "twist", "duration": 2.8, "transition": {"type": "iris-close", "at": [50, 46]},
     "background": {"kind": "radial", "color": "#2a2622", "color2": "#050505"},
     "camera": {"settle": 1.1, "settleR": 0.84, "punch": [{"at": 1.5, "scale": 1.1}]},
     "layers": [
       {"type": "text", "text": "UNTIL\nTHE LAST ROW\nCHANGES EVERYTHING", "style": "serif", "size": 12, "y": 40, "color": "#e9deca",
        "lineSizes": [0.4, 1.4, 0.4], "accent": ["the", "last", "row"], "accentColor": "#c92f31", "anim": "words", "stagger": 6, "fx": {"shadow": true}}
     ]},
    {"id": "evolve", "duration": 3.2, "transition": {"type": "zoom"},
     "background": {"kind": "paper", "color": "#d8c9a8"},
     "camera": {"settle": 1.12, "settleR": 0.84, "drift": 0.03},
     "layers": [
       {"type": "image", "src": "PLACEHOLDER_pawn_figure.png", "cutout": true, "shadow": "soft", "x": 50, "y": 46, "w": 50, "anim": "drop",
        "swap": {"src": "PLACEHOLDER_queen_figure.png", "at": 1.6, "glow": true}},
       {"type": "badge", "text": "PROMOTED", "variant": "tape", "color": "#c92f31", "size": 4.5, "y": 70, "at": 1.6, "anim": "wipe"}
     ]},
    {"id": "cta", "duration": 2.6, "transition": {"type": "flash-ramp"},
     "background": {"kind": "solid", "color": "#e2e00d"},
     "camera": {"settle": 1.06, "settleR": 0.8, "drift": 0},
     "animFps": 0,
     "layers": [
       {"type": "text", "text": "BUILD YOUR OWN STAGE", "style": "grotesk", "size": 10, "y": 38, "color": "#111111", "anim": "words", "stagger": 4},
       {"type": "badge", "text": "yourbrand.com", "variant": "solid", "color": "#111111", "textColor": "#e2e00d", "size": 5, "y": 52, "at": 0.9, "anim": "typewriter"}
     ]}
  ]
}
```

## 8. Do / don't
**Do**
- Build depth on every stage: at least one blurred foreground element and one hung or floating prop.
- Put the keyword *on a prop* (card footer, plaque, sign) before reaching for a caption.
- Colour-code the two sides of a comparison (cool vs warm) so the antithesis reads without words (v39).

**Don't**
- Caption every sentence. Three to five type moments in 30–40 s.
- Use springy UI bounces. Overshoot belongs only to physically hung or thrown props.
- Mix photoreal and illustrated stages randomly. Switch register once, on the story's turn.

## 9. Engine notes and gaps
- A true ink-dissolve *morph* between two figures (v32): only `image.swap` with a glow, or a scene-level `ink` cut. A masked organic morph needs a custom component.
- Parallax between planes is covered by per-layer `depth` (back wall 0.7–0.9, hero 1–1.1, foreground 1.5–1.8) plus `camera.parallax` 60–90. Rack between planes with `camera.focus`.
- An iris from a point (lamp, keyhole) is covered by `circle`/`iris-close` with `at: [x, y]`.
- Hanging-string props that swing *during* a camera move: use `loop: "sway"` after a `swing` entrance.
