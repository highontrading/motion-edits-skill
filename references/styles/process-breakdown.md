# Process / behind-the-scenes breakdown

**Show the dish and its ingredients together.** The finished edit plays in a window while its raw assets, the editor timeline, 3D gizmos or tool panels are shown beside or around it. Or a tutorial walks through real software that never looks like a screen recording: panels become sticker cards on a cutting mat, or a bezelled tablet on a workbench, filmed by a drifting camera with a glowing cursor. Proof of craft is the selling point. These videos double as ads for templates, courses, presets and plugins.

References (5): v39 v48 v60 v65 v69. v73 also opens with an 8 s editor build timelapse. Cousins: tabletop-flatlay-collage (the same mat sets) and dark-product-promo.

---

## 1. Signature look
| element | rule | evidence |
|---|---|---|
| Result first, then deconstruct | The finished shot plays in the first 2–8 s, then dissolves into its layer build. | v60 v69 v39 v65 |
| Three-zone split | An **Assets** column (raw cut-outs, green-screen tiles), an **Animation** preview window (~50% width) and a scrolling timeline below. The background is the finished piece's poster darkened ~70%. | v48 |
| Machinery left visible | 3D gizmos, motion paths and a moving playhead stay visible: "this is real comp work". | v39 v48 |
| Framed like art | The comp window hangs as a canvas inside a themed painting or photo. | v39 |
| Software as tactile collage | UI panels cropped into rounded sticker cards (thick white border, drop shadow) on a textured mat; never a raw screen recording. | v60 v69 |
| One pointer colour | A single accent does all the pointing: the cursor halo, click ripples, highlighter, keyword type. | v69 (lime) v65 (orange) |
| Velocity proof | A flip-book of 10 finished pieces in 1.7 s, accelerating into the claim word. | v65 |

## 2. Palette recipes
| recipe | bg | ink | accent (pointer) | accent2 | paper | source |
|---|---|---|---|---|---|---|
| Cutting-mat lime | `#1f4a46` teal mat | `#f3f3f3` | `#d7ea02` lime (cursor halo, ripples, keywords) | `#364a0f` olive drop shadow | `#1b1b1b` dark UI | v69 |
| Desk-mat sticker | `#2f5d3a` green mat | `#ffffff` sticker border | `#d01c22` red marker | `#e9b61d` gold title | `#f2efe8` | v60 |
| Process reel black | `#020202` | `#f2f2f2` | `#c45e28` brand orange | `#6a9cf0` neon blue (one emotional word) | `#2b2b2b` search bar | v65 |
| Assets → Animation | `#141210` (poster at 30%) | `#ffffff` | `#13c522` green-screen green (signals "raw") | `#e8cf3a` highlighter yellow | `#f2efe8` | v48 |

## 3. Type system
| role | engine | size (% W, 9:16) | treatment | evidence |
|---|---|---|---|---|
| Per-noun section title | `impact` | 16–28 (50–90% width) | each title has its own colourway: `color` + `fx.stroke` 3–4 in a contrasting `strokeColor` + `extrude` 4; drops letter by letter (`anim: "letters"`) | v60 |
| Lead-in + glow payoff | `clean` small white + `condensed` large in the accent | 5 + 12–16 | `fx.glow` in the accent, olive `extrude` 3; built word by word ≤0.3 s after the word | v69 |
| Zone labels | `clean` regular | 4–6 | "Assets" / "Animation", no effects | v48 |
| Emotional word | `serif-italic` + `fx.glow` | 20 (≈78% width) | one per video; the rest of the line stays tiny | v65 |
| UI text | `ui` `window`/`dialog`/`search` | — | the real tool's words | 5/5 |

## 4. Motion signature
- **`animFps: 15`** for collage/process material (v39 v48, v60 at 16, v65 at 16). Use `animFps: 0` for a UI walkthrough (v69) so cursor and reframes stay smooth.
- **Reframe every ~2 s**: expo-out with peak at f2–4, a 12–18 f settle, motion blur, no overshoot (v69). Use `camera.pan` with `frames: 16`.
- **Arrive before you name it**: the camera lands on the control 0.3–0.6 s before the VO says it, and the highlight appears on the word (v69).
- **Settle:** `camera.settle` 1.06–1.1, `settleR` 0.82. A long continuous camera with in-camera wipes (cloud, fold, shatter, whip): only ~6 hard cuts in 68 s (v60).
- **Cut mix** (81 classified): plain cut 32% · in-camera wipes/reframes 32% · `zoom` 12% · `flash`/`burn` (film-burn, click-flash) 11% · `whip-*` 3%. Designed transitions only at chapter boundaries (v69).
- **Assets lead the result by 2 frames** at every change, as a small cause → effect cue (v48).
- **Sync:** word-locked cuts during the VO (mean offset ≈0 s). Beat-locked cuts (≤0.15 s early) once the VO ends (v39).

## 5. Recurring devices
1. **Assets / Animation / Timeline split**: a `video` (card, ~50% width) for the finished edit, a `group` of `image` tiles for assets, and a `ui` `window` strip for the timeline (v48).
2. **Sticker-card UI**: `image` with `print: true` (white border) and `shadow: "soft"`, tilted ±3–8°, on `background: grid` tinted as a cutting mat (v60).
3. **Glowing cursor + click ripple**: a `cursor` with `click: true` in the accent colour (v69).
4. **Morphing "not needed" window**: one retro `ui` `dialog` whose text swaps per spoken noun ("No layers / No keyframes / No expressions") (v69). Use a `text` with `anim: "swap"` inside.
5. **Flip-book of portfolio**: `image.cycle` every 3–5 f, accelerating into the claim word (v65).
6. **Reveal the tool**: pull back from the finished frame into the editor window (v57 v62 v39). Use `transition: shrink` + `embed`.
7. **Growing CTA stack**: each VO noun (tutorial, library, project file) adds one card while the camera tilts up (v62).

## 6. Skeleton (35 s, tutorial-promo variant)
| t (s) | beat | shot | cut in |
|---|---|---|---|
| 0–4 | Result first | the finished shot full-frame, then cards fly onto the mat | — |
| 4–8 | Title: what it is | a per-noun outlined title drops in letter by letter | `zoom` |
| 8–12 | Deconstruct | a dissolve into the layer build; assets column + preview | `ink` |
| 12–26 | Steps ×3 | UI sticker cards; reframe every 2 s; cursor clicks on each verb; lime highlights | camera `pan`, `cut` on beats |
| 26–30 | Velocity proof | a flip-book of finished pieces | `flash` |
| 30–35 | CTA | a growing stack of what you get + comment keyword | `burn` |

## 7. Example VideoSpec (9:16)
`PLACEHOLDER_*` are user-supplied (the finished edit and its screenshots). Remove them to render asset-free.
```json
{
  "width": 1080, "height": 1920, "fps": 30, "animFps": 15,
  "palette": {"bg": "#1f4a46", "ink": "#f3f3f3", "accent": "#d7ea02", "accent2": "#364a0f", "paper": "#1b1b1b"},
  "finish": {"grain": 0.07, "vignette": 0.45},
  "scenes": [
    {"id": "result-first", "duration": 3.2,
     "background": {"kind": "void"},
     "camera": {"settle": 1.08, "settleR": 0.82, "drift": 0.03},
     "layers": [
       {"type": "video", "src": "PLACEHOLDER_finished_edit.mp4", "muted": true, "w": 78, "y": 44, "card": true, "radius": 24},
       {"type": "text", "text": "made in 60 seconds", "style": "clean", "size": 5, "y": 80, "caps": false, "at": 1.4, "anim": "focus"}
     ]},
    {"id": "title", "duration": 2.6, "transition": {"type": "zoom"},
     "background": {"kind": "grid", "color": "#1f4a46"},
     "camera": {"settle": 1.1, "settleR": 0.82},
     "layers": [
       {"type": "text", "text": "SMART", "style": "impact", "size": 22, "y": 36, "color": "#d01c22", "anim": "letters", "stagger": 2,
        "fx": {"stroke": 4, "strokeColor": "#e9b61d", "extrude": 4, "extrudeColor": "#111111"}},
       {"type": "text", "text": "GRID", "style": "impact", "size": 30, "y": 52, "color": "#e9b61d", "at": 0.5, "anim": "letters", "stagger": 2,
        "fx": {"stroke": 4, "strokeColor": "#ffffff", "extrude": 4, "extrudeColor": "#111111"}}
     ]},
    {"id": "step", "duration": 4.4, "transition": {"type": "cut"},
     "background": {"kind": "grid", "color": "#1f4a46"},
     "camera": {"settle": 1.06, "settleR": 0.82, "pan": [{"at": 1.8, "x": 60, "y": 46, "frames": 16}, {"at": 3.4, "x": 46, "y": 58, "frames": 16}]},
     "animFps": 0,
     "layers": [
       {"type": "ui", "kind": "window", "title": "Grid settings", "text": "Columns 6 · Gutter 24 · Animate on", "theme": "dark", "accent": "#d7ea02", "y": 46, "w": 84, "rotate": -2, "anim": "drop"},
       {"type": "cursor", "color": "#d7ea02", "path": [{"x": 30, "y": 70, "t": 0.4}, {"x": 62, "y": 46, "t": 1.6, "click": true}, {"x": 46, "y": 58, "t": 3.2, "click": true}]},
       {"type": "text", "text": "click", "style": "clean", "size": 5, "y": 18, "caps": false, "at": 1.6, "anim": "pop"},
       {"type": "text", "text": "Columns", "style": "condensed", "size": 14, "y": 25, "color": "#d7ea02", "at": 1.7, "anim": "pop",
        "fx": {"glow": "#d7ea0299", "extrude": 3, "extrudeColor": "#364a0f"}}
     ]},
    {"id": "flipbook", "duration": 2.0, "transition": {"type": "flash"},
     "background": {"kind": "void"},
     "camera": {"settle": 1.06, "settleR": 0.8},
     "layers": [
       {"type": "image", "src": "PLACEHOLDER_work_01.jpg", "w": 70, "y": 44, "print": true, "shadow": "soft",
        "cycle": {"srcs": ["PLACEHOLDER_work_02.jpg", "PLACEHOLDER_work_03.jpg", "PLACEHOLDER_work_04.jpg", "PLACEHOLDER_work_05.jpg"], "every": 4}},
       {"type": "text", "text": "viral", "style": "serif-italic", "size": 20, "y": 78, "caps": false, "at": 1.2, "anim": "focus", "color": "#d7ea02", "fx": {"glow": "#d7ea0288"}}
     ]},
    {"id": "cta", "duration": 3.0, "transition": {"type": "burn"},
     "background": {"kind": "grid", "color": "#1f4a46"},
     "camera": {"settle": 1.08, "settleR": 0.82},
     "layers": [
       {"type": "badge", "text": "PROJECT FILE", "variant": "tape", "color": "#d7ea02", "textColor": "#111111", "size": 5, "y": 34, "rotate": -4, "anim": "pop"},
       {"type": "badge", "text": "TUTORIAL", "variant": "tape", "color": "#f3f3f3", "textColor": "#111111", "size": 5, "y": 44, "rotate": 3, "at": 0.5, "anim": "pop"},
       {"type": "ui", "kind": "search", "text": "comment GRID", "theme": "dark", "y": 60, "w": 80, "at": 1.0, "anim": "rise"}
     ]}
  ]
}
```

## 8. Do / don't
**Do**
- Open on the payoff. Craft proof only works once the viewer wants the result.
- Keep the story legible inside a small window: one subject per segment, ≤4 words of type, a B/W + one-accent palette (v48).
- Give the raw assets a deliberately "raw" colour code (green-screen green), so the eye knows what is ingredient and what is result.

**Don't**
- Show an unstaged, full-frame screen capture. Put it on a set or in a bezel, and move a camera over it.
- Use more than one pointer colour.
- Let the timeline or UI become the subject. It is evidence; the finished piece stays the hero.

## 9. Engine notes and gaps
- **Scrolling NLE timeline strip with a moving playhead** (v48 v39 v73): not a layer kind. Possible fix: `ui.kind: "timeline"` with tracks `[{color, clips}]` and a playhead synced to scene time.
- **3D gizmos/motion paths over a comp, a transparency checkerboard dissolve, glass shatter** (v39 v60): need custom components.
- **Sped-up build timelapse**: supply a screen recording as `video` with `playbackRate` 4–8.
