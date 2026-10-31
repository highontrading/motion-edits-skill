# Halftone poster collage

**One VO clause = one flat-colour poster.** Each poster has one hero cut-out photo, one heavy-caps keyword the prop half-covers, and a halftone + grain print finish. All of it is animated on 12 fps so it reads as printed and hand-made. This is the library's core explainer look.

References (12): v05 v06 v09 v10 v11 v12 v16 v17 v21 v22 v53 v70. Close cousins: tabletop-flatlay-collage (B) and lyric-beat-collage.

---

## 1. Signature look
| element | rule | evidence |
|---|---|---|
| Art direction | Real cut-out photos (props, people, logos) with contact shadows on a flat or lightly textured field. Never flat stock vectors. | 12/12 |
| One poster per clause | A new background hue, prop and type treatment every 1.5–2.6 s (median shot ≈2.0 s). A background is never reused for the next idea. | v05 v06 v11 |
| Field | One dominant hue fills ≥60% of the frame: `solid`, `paper` or `halftone`. Black **statement cards** (`void`) come every ~8–10 s as a rhythm reset. | v09 v10 v11 v12 v13 |
| Depth sandwich | The keyword sits **behind** the hero prop: the prop covers 10–30% of the letters. | 9/12 (v06 v09 v10 v15 v17 v53 v70…) |
| Finish | Halftone screen, grain, vignette and a slight RGB fringe over everything. This is what welds stock, AI renders and footage into one print. | 12/12 |
| Footage | Allowed only as a "proof" burst, graded desaturated and cool so the graphics own the colour. | v09 v11 v16 v21 |

## 2. Palette recipes
Rule: **1 dominant hue + 1 neutral + 1 accent per poster**. Accents keep a fixed meaning for the whole video: red = negative/alarm, green = money/positive, orange or yellow = the reveal. Never put two saturated posters back to back without a black card between them (v10).

| recipe | bg (field) | ink | accent | accent2 | paper / card | source |
|---|---|---|---|---|---|---|
| Poster rotation | rotate per scene: `#c2694b` → `#dcdcdc` → `#5a5b24` → `#de3333` → `#588db6` | `#f2f2f2` (extrude = darker field hue) | `#a70f0b` negative | `#2bd96b` money | `#040404` card | v06, v05 |
| Statement-card orange | `#af3631` red paper | `#ffffff` | `#e8730c` (the one word on every black card) | `#df1a1d` | `#0f0f0f` | v10 |
| Brand-lifted | `#2b2a3d` navy / `#114fd3` flag blue | `#d4d2d0` silver | `#e33f5f` red | `#f7d637` gold | `#030303` + `#f0961a` | v09 |
| Pixel-retro | `#141414` near-black | `#e5d6bf` cream | `#e21e08` signal red (badges) | `#fab208` mustard ("good news") | `#e5d6bf` | v70 |

Grade as story: drain to B/W on the refusal or failure beat (`grade.drainAt`), as in v17 (saturation ×0.2 over 6 frames on "He said no") and v05 ("ugly car").

## 3. Type system
| role | engine | size (% width) | treatment | evidence |
|---|---|---|---|---|
| Hero keyword | `impact` (condensed) or `grotesk` (wide black) | 18–30, so the line spans **55–95%** of frame width | caps, tight leading `lineHeight: 0.85`, `fx.extrude` 6–10 px in a darker shade of the field (or grey `#555`), `anim: "slam"` or `"words"` | v05 v06 v11 v12 v15 v17 |
| Size zigzag | the same face, three lines | small 8–10 / huge 22–30 / small | the verb is huge and the connective tiny | v20 v19 |
| Label | `badge` `stitched` or `solid` | 5–7 | maroon/black/green, `anim: "wipe"`. Morph meaning in place with a second badge on the word. | v05 v06 v70 |
| Statement card | `grotesk` white on `void` | 9–14 | one word in the accent colour, `anim: "focus"` (focus-pull type) | v09 v10 |
| Whisper connector | `script` or `clean` | 5–7 | lowercase, against the heavy caps | v05 v23 |
| Retro/UI text | `pixel` or `mono` inside `ui` dialogs | 4–6 | typed | v10 v15 v70 |

Change the display face with the set when the prop suggests one (road sign → condensed, newspaper → serif, CRT → pixel), but keep one heavy grotesk as the main voice (v12 v21).

## 4. Motion signature
- **`animFps: 12`** (8/12 refs at 12 fps; v22/v70 at 15; v12/v16 render on ones at 18). Run UI typing and counters at full rate by giving those scenes `animFps: 0` (v10).
- **Settle:** `camera.settle` 1.10–1.15, `settleR` 0.75–0.82. Decelerate-only: peak speed in frames 1–4 with no bounce (v10). Props may overshoot by one drawing (v08).
- **Drift:** 0.02–0.03 per scene. **Punch** 1.08–1.12 on the number or the name.
- **Cut mix** (234 classified transitions): plain cut 52% · `zoom` (velocity-matched) 10% · `black` 1–3 f 8% · `whip-*` 6% · `flash`/`invert` 5% · `slide` 4% · `desat`/`ink` ≈2% each. v11 and v15 run almost every cut as a `zoom`. Pick **one** dominant grammar per video.
- **Sync:** cut on the clause's first syllable (median +0.03 s, v13; ±0.08 s, v11). In practice lead by 0.1–0.15 s (`offset: -0.12`). The keyword lands on its word. Multi-word statements build slightly ahead, so the full line holds 0.5–1 s (v10).
- **Entrances:** image `pop`/`drop`/`stamp`/`swing` (hung props), text `slam`/`words`, badge `wipe`, shapes `draw` 6–8 f.

## 5. Recurring devices
1. **Type behind the prop**: image `z: 2` over text `z: 1` (v06 v09 v10 v15 v53 v70).
2. **Black statement card** with one accent word and a hand-drawn ellipse, every ~10 s (v09 v10 v11 v12 v13).
3. **Pun prop**: the object *is* the sentence (eggs as the O's, a cloche lift for "free", a mousetrap for "punished") (v10 v21).
4. **Data as objects**: `counter` `flip`/`tick`, stepped bar `chart`, a slapped correction sticker (v06 v08 v16).
5. **Native UI as a metaphor layer**: macOS dialog, notification, XP window (`ui` `dialog`/`notification`/`window`) (v09 v10 v11 v15).
6. **One recurring symbol** recast as a new prop in every scene (v21's asterisk, v12's popcorn bucket).
7. **Flash punctuation**: 1–3 f `invert`/`flash` on montage beats (v17 v53).

## 6. Skeleton (40 s, ≈18 scenes)
| t (s) | beat | scene recipe | cut in |
|---|---|---|---|
| 0–1.5 | Hook: a concrete shock | hero prop pops on a saturated field, the keyword slams behind it | — |
| 1.5–6 | Setup ×2–3 | new field per clause, badge on the noun | `cut` / `zoom` |
| 6–8 | Named principle (at ~17% of runtime) | `ui` dialog or black card "THIS IS THE ___ EFFECT" | `black` |
| 8–14 | Definition | 2–3 posters, each a pun prop | `zoom` |
| 14–26 | Proof ×3 (brands) | brand-coloured fields, real logos (user-supplied), counters | `cut`, `whip-*` |
| 26–30 | Turn / reframe | black statement card, one accent word | `desat` or `black` |
| 30–36 | Moral (said twice) | inverted-palette reprise of an earlier poster | `invert` |
| 36–40 | CTA | the same collage language: phone/search UI with the URL badge | `zoom` |

## 7. Example VideoSpec
`PLACEHOLDER_*.png` files are user-supplied cut-outs (run `tools/cutout.py`). Delete those layers to render asset-free.
```json
{
  "width": 1080, "height": 1920, "fps": 30, "animFps": 12,
  "palette": {"bg": "#c2694b", "ink": "#f2f2f2", "accent": "#e8730c", "accent2": "#2bd96b", "paper": "#dcdcdc"},
  "finish": {"grain": 0.08, "halftone": 0.14, "vignette": 0.4, "chroma": 1},
  "scenes": [
    {"id": "hook", "duration": 2.2,
     "background": {"kind": "solid", "color": "#c2694b"},
     "camera": {"settle": 1.14, "settleR": 0.78, "drift": 0.025},
     "layers": [
       {"type": "text", "text": "THE PRICE TAG\nIS LYING", "style": "impact", "size": 24, "y": 70, "lineHeight": 0.85, "z": 1,
        "anim": "slam", "fx": {"extrude": 8, "extrudeColor": "#7a3a24"}},
       {"type": "image", "src": "PLACEHOLDER_price_tag_cutout.png", "cutout": true, "shadow": "soft", "x": 50, "y": 44, "w": 62, "z": 2, "anim": "pop"},
       {"type": "shape", "kind": "burst", "x": 76, "y": 26, "w": 22, "color": "#f7d637", "at": 0.6, "draw": 6}
     ]},
    {"id": "principle", "duration": 2.4, "transition": {"type": "black", "frames": 2},
     "background": {"kind": "void"},
     "camera": {"settle": 1.1, "settleR": 0.8},
     "layers": [
       {"type": "text", "text": "this is the", "style": "script", "size": 7, "y": 34, "caps": false, "anim": "pop"},
       {"type": "text", "text": "ANCHORING\nEFFECT", "style": "grotesk", "size": 15, "y": 46, "at": 0.3, "anim": "focus",
        "accent": ["anchoring"], "accentColor": "#e8730c"},
       {"type": "shape", "kind": "ellipse", "x": 50, "y": 42, "w": 80, "h": 9, "color": "#e8730c", "stroke": 8, "at": 0.9, "draw": 7}
     ]},
    {"id": "proof", "duration": 2.8, "transition": {"type": "zoom"},
     "background": {"kind": "grid", "color": "#dcdcdc"},
     "camera": {"settle": 1.12, "settleR": 0.8, "punch": [{"at": 1.6, "scale": 1.1}]},
     "animFps": 0,
     "layers": [
       {"type": "ui", "kind": "notification", "label": "Store", "title": "Today only", "text": "Was $199, now $79", "y": 30, "w": 84, "anim": "slide-down"},
       {"type": "badge", "text": "62% OFF", "variant": "stitched", "color": "#7a0f12", "size": 6.5, "y": 58, "at": 0.8, "anim": "wipe"},
       {"type": "counter", "from": 199, "to": 79, "duration": 0.8, "mode": "flip", "prefix": "$", "style": "impact", "size": 22, "y": 74, "at": 1.4, "color": "#111111"}
     ]},
    {"id": "moral", "duration": 2.4, "transition": {"type": "invert"},
     "background": {"kind": "halftone", "color": "#de3333"},
     "camera": {"settle": 1.12, "settleR": 0.78},
     "grade": {"drainAt": 1.8},
     "layers": [
       {"type": "text", "text": "THE FIRST NUMBER WINS", "style": "impact", "size": 20, "y": 40, "anim": "words", "stagger": 4,
        "fx": {"extrude": 8, "extrudeColor": "#7d1414"}},
       {"type": "badge", "text": "ANCHORING", "variant": "solid", "color": "#040404", "size": 6, "y": 60, "at": 1.0, "anim": "pop"}
     ]},
    {"id": "cta", "duration": 2.6, "transition": {"type": "zoom"},
     "background": {"kind": "studio", "color": "#1a1a1a"},
     "animFps": 0,
     "layers": [
       {"type": "ui", "kind": "search", "text": "yourbrand.com", "y": 40, "w": 82, "theme": "light", "anim": "pop"},
       {"type": "cursor", "path": [{"x": 82, "y": 70, "t": 0.6}, {"x": 64, "y": 41, "t": 1.4, "click": true}]},
       {"type": "badge", "text": "LINK IN BIO", "variant": "stitched", "color": "#e8730c", "size": 6, "y": 58, "at": 1.5, "anim": "wipe"}
     ]}
  ]
}
```
To sync with a VO, add `"words": "vo.words.json"`. Replace each `duration` with `"start": {"word": "<first word>", "offset": -0.12}` and give keyword layers `"sync": true`.

## 8. Do / don't
**Do**
- Choose the prop before the type. If the prop explains the line, the type can be one word.
- Keep 2–4 type treatments per video, with one heavy grotesk as the constant.
- Put a black card between two saturated posters, and drop one in every ~10 s.
- Step at 12 fps, but keep UI typing smooth (`animFps: 0` on those scenes).

**Don't**
- Use crossfades. Use cuts, zooms, whips and black blinks.
- Centre a static prop with no settle. Every poster lands with a settle.
- Use more than one saturated accent per poster, or swap accent meanings mid-video.
- Ship typos at 80% frame width: v16 and v62 ship "WIEGHT" and similar. Proofread every keyword.

## 9. Engine notes and gaps
- Perspective-matched type on a surface (v11's notebook, v16's words painted on the pitch): not supported; `rotate` is 2D only. Possible fix: a `skew`/`tiltX` field on `Pos`.
- Tracked graphic masks on footage (v11's balaclava): needs a custom component that keyframes an image over a video.
- Character gags (blinks, a flapping jaw, v05/v14): approximate with `image.swap` at 2–3 timestamps, or write a custom sprite component.
