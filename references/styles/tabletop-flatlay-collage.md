# Tabletop flat-lay collage

**Every sentence is a physical set seen from above or at a slight angle.** The surfaces are grid paper, wood desks, felt, cutting mats, corkboard and parchment. The text is *printed on objects in that world*: a typed tag, a CRT dialog, a sticky note, a postcard. A constant subtitle pill carries the full script underneath. It is calmer and more "documentary" than the halftone poster collage, with longer shots and more events inside each shot.

References (10): v08 v13 v14 v15 v19 v20 v25 v27 v30 v62. Cousins: halftone-poster-collage (louder, flatter), process-breakdown (v60/v69 use the same cutting-mat set for tutorials).

---

## 1. Signature look
| element | rule | evidence |
|---|---|---|
| Set per sentence | A new *material* for every sentence (v08: 22 sets in 47 s) rather than a new flat colour. | 10/10 |
| Edge clutter, empty centre | Props crowd the frame edges (paper balls, clips, pens, phone) and leave the middle 50–60% for the hero object or text. | v15 v25 v27 v30 |
| Type lives on props | Captions are typed into dialogs, tags, notebooks and tickets at speech rate (~10 chars/s). | v19 v20 v30 (prop-as-text-surface) |
| Two text layers | A neutral always-on **subtitle pill/bar** at y 68–76% plus a stylised hero phrase. The pill switches on the word; the hero lands ~0.3 s later. | 5/10 (v08 v13 v14 v25 v16) |
| Hand marks | Marker ellipses, X's, underlines and highlighter sweeps draw on in 4–8 frames, at human-pen speed. | 9/10 |
| Foreground depth | Real objects at the frame edges blurred 15–25 px give 2.5D depth for free. | v25 v27 |
| Finish | Halftone, grain, oval vignette, a slight chroma fringe, soft contact shadows, and blind-shadow gobos on some sets. | 10/10 |

## 2. Palette recipes
Rule: a **desaturated material base** plus **one accent family for labels** plus **one alert colour (red) for negation and emphasis**. Save full saturation for a single transition or the payoff.

| recipe | bg | ink | accent | accent2 | paper | source |
|---|---|---|---|---|---|---|
| Lab desk | `#c8c7c8` grey desk | `#2a2a2a` (pill) | `#f2d43a` sticky-note yellow | `#c8323a` pen red | `#dbdbdb` | v25 |
| Archive sepia | `#57442e` tobacco | `#140e08` | `#a3352b` oxblood (the key word of every line) | `#1f3550` navy (once) | `#e3c99e` parchment | v30 |
| Finance news | `#2543a7` royal blue / `#462719` walnut | `#ffffff` | `#f0b818` yellow | `#d71718` red | `#dcdcdc` grid | v08 |
| Retro-tech mood swing | `#1f87a2` teal (promise) → `#b57b1d` mustard (doubt) | `#111111` | `#f2c230` yellow with a `#d8332a` offset | `#e05d17` orange (dates) | `#e8e4da` | v19 v15 |

Hue tracks mood (v19): cool blues and teals while the claim is optimistic, mustard and red once doubt sets in.

## 3. Type system
| role | engine | size (% W) | treatment | evidence |
|---|---|---|---|---|
| Subtitle track | `captions: {enabled, style: "pill", y: 74, font: "clean", maxWords: 4}` | 4–4.5 | white on ~55–80% black pill tinted by the scene; 2–4-word chunks | v08 v13 v14 v25 |
| Prop text | `typewriter` in `mono`/`serif`, or `ui` `dialog`/`window` text | 4–7 | `cps` 10–14, red emphasis line | v19 v30 |
| Hero phrase | `grotesk` (wide black) or `impact` | 16–26 (70–95% line width) | caps, stacked; yellow fill + red misregistration (`fx.extrude` 3–4 in red) or a white grey-extrude | v15 v19 v20 |
| Scene face | swap per set: `serif` (history), `pixel` (markets/tech), `marker`/`script` (feelings, questions) | 10–20 | "the typeface is a scene property" | v08 v13 |
| Handwritten labels | `marker` or `script` | 6–9 | lowercase; writes on with the VO within ~0.1 s (`anim: "letters"`, `sync`) | v25 v27 |

## 4. Motion signature
- **`animFps: 15`** (7/10 on twos; v13 and v30 at 12; v08 at 16). Stop-motion hands can drop to 3–6 updates/s (v30): use image `jitter`.
- **Settle:** a long, floaty shot-open settle. `camera.settle` 1.08–1.15, `settleR` 0.86–0.9, so rest arrives in 21–45 frames (v20, v19: 40 f). Then `drift` 0.02.
- **Events inside the shot, not cuts:** shots are long (avg 2.1–4.2 s, the longest of the collage families), but something happens every ~0.7 s: a pan, swap, light sweep, write-on or stamp (v13 v22). Use `camera.pan` and `punch` on nouns.
- **Cut mix** (156 classified): plain cut 54% · `zoom` (velocity-matched, ramp into the cut) 16% · in-shot reveals ≈13% · `black` 3% · `slide` 3% · `flash`/`whip` 2% each. v25 runs 4 of 12 transitions as velocity-matched zooms.
- **Sync:** cut on the first word of the sentence (±0.1 s, v08). Write-ons land on their spoken word. Snap to the music grid when the VO allows it (v27, ±0.1 s).
- **Entrances:** image `drop`/`stamp`/`slide-*` with `shadow: "soft"`, props tilted 5–15°; text `typewriter`; shapes `draw` 4–8 f.

## 5. Recurring devices
1. **Prop as text surface**: `ui` `dialog`/`window` (retro OS alert), `badge` `tape`, a notebook page (`background: grid`) (v19 v20 v30).
2. **Velocity-matched zoom** between sets (`transition: zoom`) (v15 v25).
3. **Numbers as objects**: `counter` `flip` (split-flap age/years), a slapped correction sticker (`badge` over the old number), a year flip-book (v08 v14 v30).
4. **Evidence clipping**: a newspaper image with a highlighter `shape rect` at 40% opacity, or text `highlight` (v13 v25).
5. **Black-void bookends** for the turn and the date callback (v15 v19).
6. **Antithesis = inverted palette**: two cards with swapped bg/ink (v20 `#0e493c` on `#e1b15c`, then the reverse).
7. **Tint the losers**: a 12-frame red wash on non-chosen items (v20). Use `grade.tint` on that scene or a red `rect` at 60% opacity.
8. **Duplicate-at-depth swarm**: the same sticky note at 3 depths with `blur` 0/6/14 (v25).

## 6. Skeleton (40 s, ≈14 sets)
| t (s) | beat | set | cut in |
|---|---|---|---|
| 0–1.4 | Quiet open: a serif typewriter question on paper | `paper`, one line, blinking caret | — |
| 1.4–4 | Loud second shot: a dense prop wall | `wood` desk, 5–8 props drop in on nouns | `zoom` |
| 4–9 | Who/what + the name card (at ~16%) | CRT/OS `dialog` typing the name | `cut` |
| 9–19 | Claim, 3 facts | grid, felt and kraft sets; one hero prop each; counters | `zoom`, `cut` |
| 19–21 | "But…" | black void, one word in the accent | `black` |
| 21–31 | Doubt/evidence | clippings with highlighter, marker circles | `slide`, `cut` |
| 31–35 | Moral | inverted-palette twin cards | `cut` |
| 35–40 | CTA in-world | a notebook or book opens to the URL, a stamp lands | `zoom` |

## 7. Example VideoSpec
`PLACEHOLDER_*.png` are user-supplied cut-outs. Remove them to render asset-free.
```json
{
  "width": 1080, "height": 1920, "fps": 30, "animFps": 15,
  "palette": {"bg": "#c8c7c8", "ink": "#1a1a1a", "accent": "#f2d43a", "accent2": "#c8323a", "paper": "#ece6d8"},
  "finish": {"grain": 0.08, "halftone": 0.1, "vignette": 0.45, "chroma": 1.2},
  "captions": {"enabled": true, "style": "pill", "y": 74, "maxWords": 4, "font": "clean", "size": 4.2, "bg": "#2a2a2acc"},
  "scenes": [
    {"id": "quiet-open", "duration": 1.6,
     "background": {"kind": "paper", "color": "#ece6d8"},
     "camera": {"settle": 1.06, "settleR": 0.88, "drift": 0.015},
     "layers": [
       {"type": "text", "text": "a glue that didn't stick?", "style": "serif-italic", "size": 7.5, "y": 42, "caps": false,
        "anim": "typewriter", "cps": 18, "leadColor": "#f2d43a"}
     ]},
    {"id": "prop-wall", "duration": 3.2, "transition": {"type": "zoom"},
     "background": {"kind": "wood", "color": "#6b432f", "gobo": true},
     "camera": {"settle": 1.12, "settleR": 0.87, "drift": 0.02, "punch": [{"at": 2.0, "scale": 1.08}]},
     "layers": [
       {"type": "image", "src": "PLACEHOLDER_glue_tube_cutout.png", "cutout": true, "shadow": "soft", "x": 50, "y": 44, "w": 58, "rotate": -6, "anim": "drop"},
       {"type": "image", "src": "PLACEHOLDER_pen_cutout.png", "x": 8, "y": 70, "w": 40, "rotate": 30, "blur": 18, "z": 5, "depth": 1.6},
       {"type": "text", "text": "A FAILED\nEXPERIMENT", "style": "grotesk", "size": 13, "y": 22, "at": 1.0, "color": "#f2c230",
        "anim": "words", "stagger": 3, "fx": {"extrude": 4, "extrudeColor": "#d8332a"}}
     ]},
    {"id": "name-card", "duration": 2.6, "transition": {"type": "cut"},
     "background": {"kind": "grid", "color": "#dcdcdc"},
     "camera": {"settle": 1.1, "settleR": 0.88},
     "layers": [
       {"type": "ui", "kind": "dialog", "title": "IMPORTANT MESSAGE", "text": "It became the sticky note.", "theme": "light", "y": 40, "w": 80, "cps": 14, "anim": "pop", "smooth": true},
       {"type": "shape", "kind": "ellipse", "x": 62, "y": 43, "w": 44, "h": 7, "color": "#c8323a", "stroke": 7, "at": 1.8, "draw": 6},
       {"type": "badge", "text": "1968", "variant": "tape", "color": "#f2d43a", "textColor": "#1a1a1a", "size": 5, "x": 24, "y": 24, "rotate": -8, "at": 0.4}
     ]},
    {"id": "number", "duration": 2.8, "transition": {"type": "zoom"},
     "background": {"kind": "fabric", "color": "#541717"},
     "camera": {"settle": 1.12, "settleR": 0.86},
     "layers": [
       {"type": "counter", "from": 0, "to": 12, "duration": 1.0, "mode": "flip", "style": "impact", "size": 30, "y": 40, "color": "#f2c230"},
       {"type": "text", "text": "years to reach a shelf", "style": "marker", "size": 8, "y": 58, "caps": false, "color": "#f3ead8", "at": 1.1, "anim": "letters", "stagger": 2}
     ]},
    {"id": "moral", "duration": 2.6, "transition": {"type": "black", "frames": 1},
     "background": {"kind": "solid", "color": "#0e493c"},
     "camera": {"settle": 1.08, "settleR": 0.88},
     "layers": [
       {"type": "text", "text": "FAILURE", "style": "grotesk", "size": 14, "y": 36, "color": "#e1b15c", "anim": "slam"},
       {"type": "text", "text": "IS A FIRST\nDRAFT", "style": "grotesk", "size": 11, "y": 52, "color": "#ffffff", "at": 0.6, "anim": "words", "stagger": 4,
        "underline": "scribble", "underlineColor": "#c8323a"}
     ]}
  ]
}
```
The `captions` track needs `"words"`. Without a VO it shows nothing, so the spec still renders.

## 8. Do / don't
**Do**
- Choose a material for each sentence's *meaning* (felt = casino/money, lab grid = science, cork = investigation).
- Keep the subtitle pill identical all video. Vary only the hero type.
- Let props physically deliver the text: drop, stamp, slide in from under another prop.

**Don't**
- Let hero type and pill say the same words at the same size. The hero paraphrases at 3–5× the size.
- Hold a set longer than ~4.5 s without an internal event.
- Use clean vector icons. Every object should look photographed, with a contact shadow and the halftone.

## 9. Engine notes and gaps
- Type laid in the perspective of a notebook or pitch: approximate with `tilt` (e.g. `[45, -8]`) on the text layer. Exact corner-pinning to a photographed surface is not available.
- Stop-motion hands placing objects (v30): approximate with image `jitter` plus `drop`. A true hand cycle needs a custom sprite component.
- The subtitle pill picking up the scene tint: set `captions.bg` per video. There is no per-scene caption colour yet. Possible fix: `scene.captions` overrides.
