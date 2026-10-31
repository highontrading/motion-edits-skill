# Mono-accent documentary

**A quiet prestige look.** The world is black-and-white (or one single hue), and **one accent colour marks only the thing the script points at**: the product, the number, the hero's suit. Small lowercase italic-serif captions sit on the subject's chest, 1–3 words at a time. AI or archival stills get slow settles and rack focuses, and the finish is grain, halftone and sometimes CRT scanlines. Restraint is the hook.

References (6): v24 v26 v29 v31 v54 v73. Cousins: ai-cinematic-recap (full colour, louder) and stage-diorama-theatre.

---

## 1. Signature look
| element | rule | evidence |
|---|---|---|
| Monochrome base | Mean saturation ≈0–4/255 on most shots (v31), or one hue world (v54 oxblood). | 6/6 |
| Selective colour | The protagonist or hero object stays in colour against a grey world: a navy suit, a yellow vacuum, a green bin. | 4/6 (v24 v26 v29 v31; v73 too) |
| Single accent | One signal hue for every annotation and the CTA: yellow `#d2b30d` (v31), lime-yellow `#d8d23a` (v24), acid yellow `#e6dc3a` (v73). | 6/6 |
| Grade = timeline | B/W = past or struggle; colour returns on the payoff sentence (v31: saturation 4 → 36 on "Today…"). | v31 v26 v29 |
| Breath cards | Empty paper frames with one small serif word between busy shots. | v24 v29 v31 |
| Finish | Grain, dust, halftone. Scanlines and RGB split for a CRT/print flavour (v29 v73). Glow on type over photos. | 6/6 |

## 2. Palette recipes
Rule: greys + one accent. Real colour appears only as (a) the selective-colour subject, (b) the accent on annotations, (c) the "present day" payoff.

| recipe | bg | ink | accent | accent2 | paper | source |
|---|---|---|---|---|---|---|
| Signal-yellow B/W | `#141414` | `#f2f2f2` caption | `#d2b30d` (the thing) | — | `#e8e6e1` breath card | v31 |
| Acid-yellow business | `#3a3a3a` desaturated street | `#efebe4` warm white | `#e6dc3a` ellipses/underlines | `#1c2a4a` the hero's navy suit (selective) | `#d9d6cf` | v73 v24 |
| Oxblood world | `#380908` / `#1c0101` | `#e9e1d6` cream glow serif | `#ff3b3b` signal red marks | `#c25a5f` dusty rose ("BUT") | `#bcb6b2` halftone objects | v54 |
| Paper-grey CRT | `#cfcdc8` paper grey | `#141414` | `#0a7a35` semantic green (one object) | `#247db5` tech blue badges | `#c9a33a` gilt frame | v29 |

## 3. Type system
| role | engine | size (% W) | treatment | evidence |
|---|---|---|---|---|
| Caption | `serif-italic`, lowercase (`caps: false`) | 6–8 (cap height ≈3% of frame height) | 1–3 words per chunk, centred on the subject's chest, `anim: "words"` with `sync` or `"focus"`; white with `fx.glow` `#00000066` on photos, black on paper | v24 v26 v31 v73 |
| Hero word | `serif-italic` | 16–22 (43–70% width) | one per video (the number or the climactic word) | v26 v73 |
| Busy-background caption | `serif-italic` + `highlight: "#000000"` | 6–7 | black box behind the words | v31 v26 |
| Single-hue editorial | `serif` caps + `fx.glow` | 8–30, ratio 8:1 hero:whisper | staircase stacking | v54 |
| Machine words | `mono`/`clean` caps | 4–5 | only for typing, tech terms, dates | v29 |

## 4. Motion signature
- **`animFps: 12`** for graphics and stills (v26 v31; v29 posterises to 10). Footage stays smooth (`animFps: 0` on footage scenes).
- **Settle:** every still enters with a zoom-settle from 110–118% to 100% over ~1 s, exponential, no overshoot. Use `camera.settle` 1.12–1.16 and `settleR` 0.9. Alternatively a 0.35–1.0 s zoom-out (v26).
- **One live element per still**: falling cash, sparks, a passing car, orbiting rings (v31). Use `float`, `jitter` or a slow `slide-*`.
- **Cut mix** (92 classified): plain cut 60% · `focus` (incoming racks from blur) 10% · `zoom` 6% · `whip-*` 5% · `black`/`flash`/`invert` 2% each. v24 runs every cut as a focus pull. v54 rarely cuts at all and chains eased pans over one canvas.
- **Sync:** cuts on the first syllable (median lead ~0.04 s, v26; ≤0.1 s, v24). Word builds every 6 f on the eighth-note grid (v73: 123 BPM at 24 fps).
- **Punctuation:** rack focus, a single-frame recolour, or `grade.drainAt` instead of more cuts. Reserve the harshest effect (an `invert` frame) for one emotional keyword (v54 "fear").

## 5. Recurring devices
1. **Selective colour**: a `grayscale: true` background image plus the hero as a colour cut-out on top (v24 v31).
2. **Hand-drawn accent marks** on numbers: `shape` `ellipse`/`underline`/`scribble` in the accent, `draw` 4–6 f, landing on the number's word (v24 v73).
3. **Newspaper headline proof** with an accent highlight bar (v31 v24).
4. **Paper breath card**: dead-static, black serif, one line (v24 v29 v31).
5. **Pull-back punchline**: zoom out to reveal the drawing is in a bin or the portrait is in a museum frame (v29). Use a high `camera.settle` (1.4–1.8) with `settleR` 0.93.
6. **Captions parented to the scene** so they push and defocus with the image (v26). Engine layers already ride the scene camera.
7. **Text behind the subject** (v73): needs the subject as a cut-out above the text.

## 6. Skeleton (38 s, ≈14 shots)
| t (s) | beat | shot | cut in |
|---|---|---|---|
| 0–6 | Hook: a number + a paradox | sky → factory → office stills, the number in hero serif | `focus` |
| 6–11 | Origin / problem | B/W portrait, caption on the chest, one live element | `cut` |
| 11–14 | Breath card: the question | paper, one serif line | `cut` |
| 14–24 | Struggle (3 beats) | B/W stills, the selective-colour object appears | `focus`, `whip-*` |
| 24–28 | Proof | newspaper headline + accent bar | `cut` |
| 28–33 | Payoff: colour returns | the same set regraded to colour | `desat` (the incoming colour returns) |
| 33–38 | Moral + CTA | empty paper, the moral word by word; an accent ring on the CTA | `focus` |

## 7. Example VideoSpec
`PLACEHOLDER_*` files are user-supplied (a B/W photo and a colour cut-out of the hero object). Remove them to render asset-free.
```json
{
  "width": 1080, "height": 1920, "fps": 30, "animFps": 12,
  "palette": {"bg": "#141414", "ink": "#f2f2f2", "accent": "#d2b30d", "accent2": "#1c2a4a", "paper": "#e8e6e1"},
  "finish": {"grain": 0.1, "halftone": 0.08, "vignette": 0.45, "scanlines": 0.04},
  "scenes": [
    {"id": "hook", "duration": 3.0,
     "background": {"kind": "image", "src": "PLACEHOLDER_desk_bw.jpg", "grayscale": true, "dim": 0.15},
     "camera": {"settle": 1.15, "settleR": 0.9, "drift": 0.02},
     "layers": [
       {"type": "counter", "from": 0, "to": 312, "duration": 1.4, "style": "serif-italic", "size": 22, "y": 40, "color": "#f2f2f2"},
       {"type": "text", "text": "rejections", "style": "serif-italic", "size": 7, "y": 50, "caps": false, "at": 1.5, "anim": "focus"}
     ]},
    {"id": "struggle", "duration": 3.2, "transition": {"type": "focus"},
     "background": {"kind": "concrete", "color": "#3a3a3a"},
     "camera": {"settle": 1.14, "settleR": 0.9, "drift": 0.02},
     "grade": {"saturation": 0.05},
     "layers": [
       {"type": "image", "src": "PLACEHOLDER_manuscript_colour.png", "cutout": false, "shadow": "soft", "x": 50, "y": 46, "w": 56, "anim": "fade", "float": 4},
       {"type": "text", "text": "she kept\nwriting", "style": "serif-italic", "size": 7, "y": 62, "caps": false, "at": 0.4, "anim": "words", "stagger": 6,
        "fx": {"glow": "#00000088"}}
     ]},
    {"id": "breath", "duration": 2.4, "transition": {"type": "cut"},
     "background": {"kind": "paper", "color": "#e8e6e1"},
     "camera": {"settle": 1.0, "drift": 0},
     "layers": [
       {"type": "text", "text": "why didn't she quit?", "style": "serif-italic", "size": 7, "y": 44, "caps": false, "color": "#141414", "anim": "focus"}
     ]},
    {"id": "proof", "duration": 3.0, "transition": {"type": "focus"},
     "background": {"kind": "paper", "color": "#d9d6cf"},
     "camera": {"settle": 1.12, "settleR": 0.9, "punch": [{"at": 1.4, "scale": 1.08}]},
     "layers": [
       {"type": "text", "text": "NUMBER ONE\nBESTSELLER", "style": "serif", "size": 10, "y": 38, "color": "#141414", "highlight": "#d2b30d", "anim": "mask"},
       {"type": "shape", "kind": "ellipse", "x": 50, "y": 38, "w": 86, "h": 10, "color": "#d2b30d", "stroke": 7, "at": 1.3, "draw": 5}
     ]},
    {"id": "moral", "duration": 3.0, "transition": {"type": "focus"},
     "background": {"kind": "void", "color": "#0c0c0c"},
     "camera": {"settle": 1.1, "settleR": 0.9},
     "layers": [
       {"type": "text", "text": "persistence\nis the product", "style": "serif-italic", "size": 8, "y": 42, "caps": false, "anim": "words", "stagger": 6,
        "accent": ["product"], "accentColor": "#d2b30d"},
       {"type": "shape", "kind": "circle", "x": 50, "y": 62, "w": 18, "color": "#d2b30d", "stroke": 5, "at": 1.8, "draw": 8}
     ]}
  ]
}
```

## 8. Do / don't
**Do**
- Decide the accent's single meaning before you start ("the thing that matters"), and never use it decoratively.
- Alternate dense image frames with empty paper frames.
- Keep captions small (cap height ~3% of frame height). Let one hero word per video go big.

**Don't**
- Use heavy grotesk caps or pop animations. Words resolve with blur or ghost-settle.
- Bounce or overshoot anything. The tone is documentary.
- Let colour leak in before the payoff: no coloured UI or logos until the grade turns.

## 9. Engine notes and gaps
- Selective colour on a *single* photo or footage clip (keep one object in colour inside one image): not possible without a matte. Possible fix: `image.colorMask` taking a mask PNG, or supply the subject as a separate cut-out.
- Text tucked behind a subject in AI stills (v73): needs a roto'd cut-out layer above the text. `tools/cutout.py` can make it.
- Grade "colour returns" (B/W → colour) inside one scene: `drainAt` only goes *to* grey. Split into two scenes with a `desat` cut (the incoming colour returns), or add a `grade.fillAt`.
- Rack focus inside a still is possible: put the background image and the cut-out on separate `depth` planes and animate `camera.focus`.
