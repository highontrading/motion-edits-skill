# Showcase frame poster

**A 100% static, print-designed page frames one to three small moving windows.** Think of a video-club poster, a VHS sleeve or a gallery label: cream paper, a giant condensed headline, hairline rules, catalogue metadata, a tricolour stripe and a persistent "COMMENT 1 TO VOTE" bar. Because the shell never moves, the moving clip inside reads as a precious exhibit. Use it to wrap UGC, contest entries, comparisons, portfolio pieces and episodic series.

References (4): v40 v41 v42 v43. All are 3:4 feed posts (720×960). The inner edits are AI-cinematic, one-world serif and photo-composite pieces. Cousins: any family can be the inner edit.

---

## 1. Signature look
| element | rule | evidence |
|---|---|---|
| Frozen shell | Outside-window motion ≈0.8/255 per frame. The only shell motion allowed is a slow idle float on the case. | 4/4 |
| Physical frame for a digital clip | Each 9:16 clip sits in a VHS case/sleeve with a label colour, spine text, barcode and "FINALIST SERIES". | 4/4 |
| Small window | The 9:16 window is ~38% of frame width (v41). Three tilted windows at −4°/+1°/+3°, with the centre one highest and on top (v40). | v40 v41 |
| Editorial hierarchy | Four type sizes only: a giant ultra-condensed headline (87% width), one subtitle, one micro-label, one roundel, on a 38 px margin grid. | v40 v41 v43 |
| Series grammar | NOW PLAYING / FINALIST 03 / SIDE A / barcode "FW-03": numbering and catalogue language create episodes. The digit repeats in three places. | v41 v43 |
| Built-in CTA | A monospaced vote bar visible for 100% of the runtime, not an end card. | 4/4 |
| End hold | ~3 s of stillness after the content ends, for reading, voting and a seamless loop. | v40 |

## 2. Palette recipes
Rule: warm, strictly limited print colours, so *any* inner footage reads against them. **One accent per contender/entry**, used for every interactive or status element (badge, now-playing, play icon, vote number).

| recipe | bg (paper) | ink | accent (entry) | accent2 | stripe set | source |
|---|---|---|---|---|---|---|
| Video club cream | `#dcd3b8` | `#21231a` | `#d2502a` / `#2f6a64` / `#8a2f2a` (one per tape) | `#8a8676` secondary text | `#d9632b` / `#b8322a` / `#e0a43a` | v40 |
| Finalist orange | `#e0d6bb` | `#231d16` | `#cf4113` | `#dc9a3a` mustard | orange / `#fad295` / `#acbba8` sage | v41 |
| Finalist teal | `#e0d6bb` | `#231d16` | `#32634d` | `#dc9a3a` | same layout, accent swapped | v42 |
| Oxblood archive | `#e0d6bb` | `#1a1914` | `#843129` | `#b58777` muted rose | `#a43c23` / `#c5954b` / `#3f5f47` | v43 |

## 3. Type system
| role | engine | size (% W, 3:4) | treatment | evidence |
|---|---|---|---|---|
| Headline | `condensed` (Oswald) or `impact` | 16–22 (46–87% width) | ink, all caps, tracking 0, boxed by a 1 px rule above and a 3 px rule below (`shape line`) | v40 v41 v43 |
| Kicker / metadata | `clean` small caps | 1.6–2 | `tracking: 0.12`, accent or rose, slash separators | v40 v41 |
| Vote bar | `mono` | 2.4–3 | cream on an ink bar, digit boxed in the accent | 4/4 |
| Spine / vertical label | `condensed` | 2 | `rotate: -90` | v41 v43 |
| Roundel | `badge` `solid` circle-ish | 2.5 | "TOP 03" in the accent | v40 |

## 4. Motion signature
- Shell: **no camera**. `camera: {"settle": 1, "drift": 0}` on every scene. Entrances are `fade` or none. The case float uses image `float` 2–3 px at most.
- Inner window: whatever family the entry uses. In the references the inner edits step on 2s (15 fps), cut on the keyword's first syllable +1–2 f, and run their own transitions.
- Shared clock: in multi-window comparisons, all clips run on **one clock** so the eye can jump between windows on the same beat (v40).
- Timing: content ≈ 10–14 s, then a ~3 s hold. Total 13–15 s.

## 5. Recurring devices
1. **Static shell as `overlay`**: put the whole poster in top-level `overlay` layers so it sits above every scene with no camera motion.
2. **The window as a `video` layer with `w`, `card` and `rotate`**: the user's clip(s) (placeholders).
3. **Persistent vote bar**: `shape rect` (ink) + `mono` text + a `badge` digit in the accent.
4. **Per-entry accent swap**: the same layout, only `palette.accent` and the number change (v41 → v42).
5. **Hairline rules and stripes**: `shape line` / `rect` 2–6 px tall.

## 6. Skeleton (14 s)
| t (s) | what moves | what is static |
|---|---|---|
| 0–0.5 | the inner clip starts | the full shell is already there from frame 0 |
| 0.5–11 | the inner edit plays (its own style) | header, case, metadata, stripes, vote bar |
| 11–14 | nothing: a `hold` scene with the case showing VOTE NOW (or loop) | everything; the vote bar stays |

## 7. Example VideoSpec (3:4)
`PLACEHOLDER_entry.mp4` is the user's 9:16 clip. Without it the shell still renders (remove the video layer).
```json
{
  "width": 1080, "height": 1440, "fps": 30, "animFps": 0,
  "palette": {"bg": "#e0d6bb", "ink": "#231d16", "accent": "#cf4113", "accent2": "#dc9a3a", "paper": "#f0e7c8"},
  "finish": {"grain": 0.05, "vignette": 0.1, "paper": 0.15},
  "overlay": [
    {"type": "shape", "kind": "line", "x": 50, "y": 5, "x2": 94.5, "y2": 5, "color": "#231d16", "stroke": 2, "draw": 1},
    {"type": "text", "text": "EPISODE 01", "style": "condensed", "size": 17, "x": 36, "y": 11, "color": "#231d16", "align": "left", "anim": "none"},
    {"type": "shape", "kind": "line", "x": 50, "y": 18, "x2": 94.5, "y2": 18, "color": "#231d16", "stroke": 5, "draw": 1},
    {"type": "text", "text": "NOW PLAYING / SIDE A", "style": "clean", "size": 1.8, "x": 22, "y": 21, "color": "#cf4113", "tracking": 0.12, "caps": true, "anim": "none"},
    {"type": "text", "text": "YOUR STUDIO / SCREENING ROOM", "style": "clean", "size": 1.8, "x": 78, "y": 21, "color": "#231d16", "tracking": 0.12, "caps": true, "anim": "none"},
    {"type": "badge", "text": "01", "variant": "solid", "color": "#cf4113", "textColor": "#f0e7c8", "size": 4, "x": 85, "y": 11},
    {"type": "text", "text": "SERIES / ORIGINAL EDITS", "style": "condensed", "size": 2.2, "x": 12, "y": 55, "rotate": -90, "color": "#231d16", "anim": "none"},
    {"type": "shape", "kind": "rect", "x": 50, "y": 86.4, "w": 89, "h": 0.4, "fill": "#cf4113", "color": "#cf4113", "draw": 1},
    {"type": "shape", "kind": "rect", "x": 50, "y": 87.2, "w": 89, "h": 0.4, "fill": "#dc9a3a", "color": "#dc9a3a", "draw": 1},
    {"type": "shape", "kind": "rect", "x": 50, "y": 88.0, "w": 89, "h": 0.4, "fill": "#acbba8", "color": "#acbba8", "draw": 1},
    {"type": "shape", "kind": "rect", "x": 50, "y": 93, "w": 89, "h": 5, "fill": "#231d16", "color": "#231d16", "draw": 1},
    {"type": "text", "text": "COMMENT \"1\" TO VOTE", "style": "mono", "size": 2.8, "x": 46, "y": 93, "color": "#f0e7c8", "anim": "none"},
    {"type": "badge", "text": "1", "variant": "solid", "color": "#cf4113", "textColor": "#f0e7c8", "size": 2.8, "x": 88, "y": 93}
  ],
  "scenes": [
    {"id": "cue", "duration": 0.6,
     "background": {"kind": "paper", "color": "#e0d6bb"},
     "camera": {"settle": 1, "drift": 0},
     "layers": [
       {"type": "shape", "kind": "rect", "x": 52, "y": 53, "w": 46, "h": 62, "fill": "#231d16", "color": "#231d16", "rotate": -1, "draw": 1},
       {"type": "badge", "text": "PLAY", "variant": "solid", "color": "#cf4113", "textColor": "#f0e7c8", "size": 3, "x": 52, "y": 53, "rotate": -1}
     ]},
    {"id": "exhibit", "duration": 11, "transition": {"type": "cut"},
     "background": {"kind": "paper", "color": "#e0d6bb"},
     "camera": {"settle": 1, "drift": 0},
     "layers": [
       {"type": "shape", "kind": "rect", "x": 52, "y": 53, "w": 46, "h": 62, "fill": "#231d16", "color": "#231d16", "rotate": -1, "draw": 1},
       {"type": "video", "src": "PLACEHOLDER_entry.mp4", "w": 38, "x": 52, "y": 53, "rotate": -1, "card": true, "radius": 6, "muted": false}
     ]},
    {"id": "hold", "duration": 2.8, "transition": {"type": "cut"},
     "background": {"kind": "paper", "color": "#e0d6bb"},
     "camera": {"settle": 1, "drift": 0},
     "layers": [
       {"type": "shape", "kind": "rect", "x": 52, "y": 53, "w": 46, "h": 62, "fill": "#231d16", "color": "#231d16", "rotate": -1, "draw": 1},
       {"type": "text", "text": "VOTE\nNOW", "style": "condensed", "size": 9, "x": 52, "y": 53, "rotate": -1, "color": "#f0e7c8", "anim": "none"}
     ]}
  ]
}
```
For a three-way comparison, add two more case + `video` pairs at x ≈ 20 / 50 / 80, `w` 26, `rotate` −4 / +1 / +3, with the centre one at the highest `z`. Give all three the same `trimStart` so they share a clock.

## 8. Do / don't
**Do**
- Design the shell like print: a margin grid, 4 type sizes, 1 px and 3 px rules, real catalogue language.
- Change only the accent colour and the number between entries.
- Keep the CTA bar on screen for the whole runtime.

**Don't**
- Animate the shell (no settles, drifts, pops) or add grain heavy enough to "boil" the paper.
- Let the inner window exceed ~45% of frame width. Smallness is what makes it precious.
- Copy a specific channel's tournament branding. Invent your own series name, numbering and colours.

## 9. Engine notes and gaps
- **Barcodes, ruler ticks and spine typography**: build them from `shape line`/`rect` and `mono` text. There is no barcode primitive.
- **The shell must ignore the scene camera**: `overlay` already does. Keep `camera.settle: 1` on the scene so the window stays still too.
- **Synced multi-clip playback**: separate `video` layers start together at scene start, which is enough. There is no shared-clock guard if the clips have different lengths.
