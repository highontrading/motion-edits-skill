# Lyric / beat collage (music-led)

**No narrator: the music is the script.** Every lyric line, or every musical bar in a showreel, becomes a fully different poster world: one hue, one texture, one face. The line's keyword is set huge and physically integrated (split around a falling body, behind a crown, stretched across three frame-widths). Cuts and slams snap to the beat grid, the animation runs on twos, and 1-frame white flashes punctuate the snare. It is the highest-energy family in the library.

References (3): v23 v28 v36. Also the inner edits of showcase-frame-poster (v41–v43) and the beat-locked CTA sections of v39 and v61. Cousins: halftone-poster-collage (VO-led).

---

## 1. Signature look
| element | rule | evidence |
|---|---|---|
| One line, one world | Change the dominant hue, texture and font on every line: 7 colour worlds in 14.7 s (v23), and 6 print formats (duotone, headline, key-art, social post, scrapbook, ransom note) in v28. | 3/3 |
| Keyword as set piece | 70–90% of frame width, built into the scene (letters split around a figure, a word behind a crown, a word on a spiral). | v23 v28 v36 |
| Depth sandwich | Type between a foreground cut-out and the background (v23 v36: number behind the plane, clouds in front). | 3/3 |
| Visualise the performance | Held notes become repeated letters plus a camera scroll ("LESSOOOON" runs ~3 frame-widths). Repeated words become tiled walls. "Wrecked" breaks the layout apart. | v28 |
| One IP-free palette per piece | Each line has its own world, but the piece keeps one family (red/blue/white/black in v28) so it stays coherent. | v28 v23 |
| Finish | Halftone, RGB-offset outline on cut-outs, grain, vignette, HUD ornaments (crosshairs, barcodes, tiny body text). | 3/3 |

## 2. Palette recipes
| recipe | worlds in sequence (bg) | ink | accent | accent2 | source |
|---|---|---|---|---|---|
| Colour-world rotation | `#9c8371` sepia → `#060606` noir → `#beb1a5` beige → `#1e3d22` night-vision → `#808080` grey studio → `#880a0c` red poster → `#4e0c09` + `#a77849` mustard finale | `#ffffff` / `#060606` | `#e07b2a` orange | `#4eb45f` night green | v23 |
| Hero tricolour | `#e1292e` red / `#0c0c65` navy / `#f2f0f0` white | `#f2f0f0` | `#1f56b0` blue | `#a01218` deep red | v28 (generic hero palette, no IP) |
| Bar showreel | `#d2cfc9` tile grey → `#6daad7` sky → `#4f8a3a` pitch → `#5a3a2a` brick → `#1f1f1f` charcoal CTA | `#ffffff` | `#e72b2c` signal red | `#e8762e` orange keyword | v36 |

Saturation is a beat-level switch: crush it 65 → 0 in 4 f between lines, or bloom 0 → 78 over 9 f (v23). Use `transition: desat` or `grade.saturation` per scene.

## 3. Type system
| role | engine | size (% W, 1:1) | treatment | evidence |
|---|---|---|---|---|
| Keyword | `impact` or `grotesk` | 24–40 (70–90% width) | `anim: "slam"` on the beat; `letters` for split-strip stagger; `fx.extrude` or a 2 px darker `stroke` + `shadow` | v23 v28 |
| Soft partner word | `script` (extruded casual script) | 10–14 | lowercase against the heavy caps ("DON'T / Tell / DREAMS") | v23 |
| One-off serif | `serif` (slab-like) | 10 | the only serif in the piece, for contrast | v28 |
| Repeated word wall | `impact`, many `text` layers, or one `text` with `\n` repeats | 10–14 | tumbles on a "lost" lyric | v28 |
| Swap cycle | `text` `anim: "swap"` with `"A | B | C"` and `stagger` = an eighth note in frames | 20+ | substitution on eighths | v36 |
| Social-post card | `ui` `tweet` / `bubble` | — | drops in and fills the frame as a scene change | v28 |

## 4. Motion signature
- **`animFps: 15`** (3/3 on twos). Add smear frames on big moves (a gap, see §9).
- **Scene length = musical unit:** 1 bar (v36: ~2.1 s at 112 BPM) or 2 beats (v28). Average 1.05–2.0 s, the shortest in the library.
- **Beat beats syllable:** land cuts and slams on the music grid (±0.1 s) even if that is 0.2–0.4 s after the word is sung (v23). At 15 fps a beat is only 5–6 drawings, so every hit is within ±2 f (v28).
- **Settle:** landing settles of 6–10 drawings with no overshoot (`camera.settle` 1.12, `settleR` 0.8). Finale and monolith settles are long, 24–30 f (`settleR` 0.9).
- **Never a static frame:** each layout gets a landing settle, one internal push or pull, and an exit move (v28).
- **Cut mix** (30 classified): `flash` (1-frame white) 23% · `whip-*` 16% · plain cut 16% · in-shot morph 13% · `zoom` 10% · `slide` 10% · `ink`/shape-wipe 6% · `black` 3%. Plus `desat` saturation crushes and eye → lens match-cuts.

## 5. Recurring devices
1. **Stretched-word scroll**: one very wide `text` (repeated letters) with `camera.pan` along it over the held note (v28).
2. **Split letters around a figure**: two `text` layers left and right of a cut-out, or `anim: "letters"` (v23).
3. **Colourway swap on eighths**: `image.cycle` with `every` = frames per eighth (v36: 8 f at 112 BPM, 30 fps).
4. **Drag-and-drop "apply"**: a `cursor` drags a file badge onto the scene, and on drop a new element appears plus a ±10–15% regrade and a 1-frame scale kick (v36).
5. **White flash on the snare**: `transition: flash`, `frames: 1`.
6. **HUD ornaments**: `shape` crosshair lines, `mono` micro-text and a barcode in the corners as designed texture (v23).

## 6. Skeleton (15–22 s, music only)
| t | unit | world | cut in |
|---|---|---|---|
| 0–1.6 | line 1 (hook) | a surreal collage portrait spins in; the 3 hook words assemble | — |
| 1.6–3.5 | line 2 | noir spotlight; the keyword tag, then the camera rolls | `flash` |
| 3.5–5.5 | line 3 | warm beige masks; the keyword behind the head | `whip-*` |
| 5.5–7.6 | line 4 | night-vision green; split letters | `cut` on the beat |
| 7.6–9.1 | line 5 | grey studio; saturation crushed | `desat` |
| 9.1–12 | line 6 (peak) | red poster; the stretched word scroll | `flash` |
| 12–15 | finale | mustard + red; the monolith keyword with a long settle | `zoom` |
| (+2) | CTA | dark card, one keyword in quotes, held 1 s | `black` |

## 7. Example VideoSpec (1:1, asset-free, 120 BPM ⇒ beat = 0.5 s)
Scene starts are beat refs against an inline 120 BPM grid. For a real track, replace `beats` with the `tools/beats.py` output path and add `"audio": {"music": "PLACEHOLDER_track.mp3"}`. With a VO, anchor on words instead and add `"snap": "beat"`. **Give the last scene a `duration` (or set the top-level `duration`).** With no VO, the video length is the last scene's start + duration; without either, the last scene defaults to 2.5 s. (Frame 45 here is the 1-frame white `flash` into `line2`, on beat 3.)
```json
{
  "width": 1080, "height": 1080, "fps": 30, "animFps": 15, "duration": 10.5,
  "beats": {"beats": [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 11.5, 12.0, 12.5, 13.0, 13.5, 14.0, 14.5, 15.0, 15.5],
            "downbeats": [0.0, 2.0, 4.0, 6.0, 8.0, 10.0, 12.0, 14.0]},
  "palette": {"bg": "#060606", "ink": "#ffffff", "accent": "#e07b2a", "accent2": "#4eb45f", "paper": "#beb1a5"},
  "finish": {"grain": 0.1, "halftone": 0.12, "vignette": 0.45, "chroma": 2},
  "scenes": [
    {"id": "line1", "start": {"beat": 0}, "background": {"kind": "paper", "color": "#9c8371"}, "camera": {"settle": 1.14, "settleR": 0.8, "drift": 0.03},
     "layers": [
       {"type": "text", "text": "KEEP", "style": "grotesk", "size": 22, "y": 30, "anim": "slam"},
       {"type": "text", "text": "your", "style": "script", "size": 14, "y": 47, "caps": false, "color": "#e07b2a", "at": 0.5, "anim": "pop", "fx": {"extrude": 5, "extrudeColor": "#7a4318"}},
       {"type": "text", "text": "HEAD DOWN", "style": "impact", "size": 17, "y": 70, "at": 1.0, "color": "#060606", "anim": "letters", "stagger": 1}
     ]},
    {"id": "line2", "start": {"beat": 3}, "transition": {"type": "flash", "frames": 1}, "background": {"kind": "radial", "color": "#3a3a3a", "color2": "#060606"}, "camera": {"settle": 1.12, "settleR": 0.8, "punch": [{"at": 1.0, "scale": 1.1, "frames": 4}]},
     "layers": [
       {"type": "badge", "text": "WHILE THEY", "variant": "solid", "color": "#ffffff", "textColor": "#060606", "size": 6, "y": 30, "anim": "wipe"},
       {"type": "text", "text": "TALK\nTALK\nTALK", "style": "impact", "size": 20, "y": 62, "lineHeight": 0.9, "at": 1.0, "anim": "words", "stagger": 2}
     ]},
    {"id": "line3-scroll", "start": {"beat": 7}, "transition": {"type": "whip-left"}, "background": {"kind": "solid", "color": "#880a0c"}, "camera": {"settle": 1.1, "settleR": 0.8, "pan": [{"at": 0.2, "x": 80, "y": 50, "frames": 40}]},
     "layers": [
       {"type": "text", "text": "LOUDERRRRRR", "style": "impact", "size": 40, "x": 50, "y": 50, "w": 260, "color": "#ffffff", "anim": "mask", "fx": {"extrude": 4, "extrudeColor": "#4e0c09", "shadow": true}}
     ]},
    {"id": "line4", "start": {"beat": 11}, "transition": {"type": "desat"}, "background": {"kind": "halftone", "color": "#1e3d22"}, "camera": {"settle": 1.12, "settleR": 0.8},
     "layers": [
       {"type": "text", "text": "LET THEM", "style": "grotesk", "size": 10, "y": 32, "color": "#4eb45f", "anim": "slam"},
       {"type": "text", "text": "SEE IT", "style": "impact", "size": 30, "y": 54, "at": 0.5, "color": "#ffffff", "anim": "slam", "fx": {"glow": "#4eb45f88"}}
     ]},
    {"id": "finale", "start": {"beat": 15}, "duration": 3.0, "transition": {"type": "zoom"}, "background": {"kind": "solid", "color": "#4e0c09"}, "camera": {"settle": 1.25, "settleR": 0.9, "drift": 0.02},
     "layers": [
       {"type": "text", "text": "WHEN IT'S DONE", "style": "impact", "size": 26, "y": 46, "color": "#a77849", "anim": "slam", "z": 3, "fx": {"extrude": 10, "extrudeColor": "#2a0705"}},
       {"type": "shape", "kind": "burst", "x": 50, "y": 46, "w": 90, "h": 50, "color": "#e07b2a", "stroke": 4, "at": 0.5, "z": 1}
     ]}
  ]
}
```
In `line3-scroll`, `w: 260` lets the stretched word run past the frame and the camera `pan` travels along it.

## 8. Do / don't
**Do**
- Run `tools/beats.py` first, set `spec.beats`, and start every scene on `{"beat": n}` (or a downbeat for bar-long scenes).
- Give every line one hue + black/white. Change the font when the world changes.
- Put one thing in front of the type in at least half the scenes.

**Don't**
- Subtitle the lyric. Only the 1–3 most singable words become type.
- Cut on the syllable when it is off the grid. The beat wins.
- Use more than one flash per bar. Flashes lose power fast.

## 9. Engine notes and gaps
- **Beat timing is covered**: `spec.beats` plus `{"beat": n}` / `{"downbeat": n}` / `{"onset": n}` refs, and `scene.snap`. Layer `at` also accepts beat refs (they are absolute), so slams can sit on onsets.
- **Video length:** beat refs now resolve in `calculateMetadata`, but a music-only spec's length is the last scene's `start + duration`. If the last scene has no `duration` it gets 2.5 s; give it an explicit `duration` (or set a top-level `duration`) so the end lands on the bar.
- **Scene length in beats** is not a field. Give every scene a beat `start` and let the next start end it.
- **Smear frames / motion-stretch on whips**: not built in. `whip-*` adds directional blur, which is the closest substitute.
- **Layout "falling apart" physics** ("wrecked", v28): needs a custom component.
- **Text on a spiral path** (v23): there is no text-on-path. Possible fix: `text.path` (an SVG path).
