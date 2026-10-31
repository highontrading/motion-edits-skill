# Dark product promo (keynote-dark, neon accent)

**A near-black set where colour exists only as light.** One accent hue (cyan, lime, electric blue, signal orange or brand green) appears only as glows, rims, carets, pressed buttons and the URL. Small, perfectly kerned sentence-case type types on. Real product UI floats as lit objects. The pacing alternates a 0.5 s burst with a 1.2–1.8 s still hold. The premium read comes from restraint plus one hero object.

References (8): v01 v02 v07 v18 v33 v38 v57 v83. Five of the eight are 16:9 (YouTube/X/LinkedIn cuts). Cousins: keynote-clean-type (the light twin) and floating-ui-demo.

---

## 1. Signature look
| element | rule | evidence |
|---|---|---|
| Void set | Near-black or charcoal ground with mean luma 11–35. A dot grid, HUD grid lines or a single drifting glow are the only textures. | 8/8 (dot-grid void v57, HUD v18, studio charcoal v38) |
| Colour = light | The accent is never a surface fill. It is a glow, rim, caret or pressed state, in one hue family of ~5 tints (v33). | v07 v18 v33 v38 v57 |
| One object, one verb per shot | A macro close-up of the click, then the typing, then the send, then the publish (v33). Alternate tiny objects in black with extreme macro crops. | v33 v18 v57 |
| Real product as proof | Real screens, files and comments, staged on the set rather than shown as raw screen recordings. | 8/8 |
| Hero object | A CG statue, a 3D hardware box, a stone icon, a 3D room (v01 v02 v38 v83). | 4/8 (engine gap, see §9) |
| Monochrome grade | A total B/W grade across CG, UI and footage with one brand accent makes cheap captures look like a luxury campaign (v02). | v01 v02 |

## 2. Palette recipes
| recipe | bg | ink | accent (light only) | accent2 | paper (end card) | source |
|---|---|---|---|---|---|---|
| Cyan typing | `#050505` | `#f0f0f0` | `#28f8e0` leading edge → white | `#28e8b4` bracket glyphs | `#000000` slogan end | v07 |
| Acid-lime HUD | `#0b0b0b` | `#ffffff` | `#d2fa18` (send, badges, glows, URL) | `#4d5412` glow falloff | `#0b0b0b` | v18 |
| Electric-blue rim | `#0a111d` | `#ffffff` | `#31a3db` rim/glow | `#0a6cff` pressed buttons | `#fefefe` inverted end card + `#111111` text | v33 |
| Warm charcoal + orange | `#1b191e` | `#e6d1b4` cream | `#e66521` signal orange ("Click", product) | `#7e746b` taupe gradient end | `#1b191e` | v38 |
| B/W luxury + green | `#0c090d` | `#e8e5e9` | `#56905e` brand green (URL/buttons only) | `#757477` grey | `#050206` | v02 |

## 3. Type system
| role | engine | size (% W, 16:9) | treatment | evidence |
|---|---|---|---|---|
| Sentence | `clean` (Inter), sentence case, `caps: false` | 2.5–4 (line = 18–40% of width) | `anim: "typewriter"` with `leadColor` = accent, `cps` 18–30; or `anim: "ghost"` (small grey ghost → settle) | v07 v02 v57 |
| Hero line | `clean`, larger | 6–8 (≈47% width) | the only big line in the piece, no colour fill | v07 |
| Giant word behind the product | `clean` or `grotesk` | 20–30 (83–92% width, may bleed) | cream → grey gradient (use `color` + `fx.shadow`), `z` under the object | v38 v01 |
| Code/HUD | `mono` | 1.5–2.5 | corner labels, code snippets, brackets `< >` via `shape bracket` | v18 v07 |
| CTA keyword | `clean`, with the keyword in the accent and `fx.glow` | 5–7 | "Comment "WORD"" typed beside the product, held ≥1.2 s | v01 v38 v57 |

Emphasis is size or grey value (`#909090` for secondary words), never bold fills (v07).

## 4. Motion signature
- **`animFps: 0`**, fps 24–30 (v07 v18 v33 at 24). Use 60 only for UI-only demos.
- **Calm/burst rhythm:** ~0.5 s of violent camera, then 1.2–1.8 s of stillness for reading (v01). Bursts are 1–1.5 s of dense motion separated by near-static holds (v33).
- **Settle:** small and quick. `camera.settle` 1.03–1.06, `settleR` 0.75. Fly-ins cover half the distance in frame 1, then a 10–12 f exponential tail (v57).
- **Ease into the cut, ease out after it:** zoom velocity ×1.3–1.6 per frame for 7–8 f before the cut (v02). Use `zoom`.
- **Cut mix** (100 classified): plain cut 24% · `flash`/`flash-ramp` (4-frame exposure ramp, v02) 17% · `zoom` 15% · in-shot object/occluder changes 14% · `whip-*` 9% · `black` 8% · `pixel` (dot-matrix/pixel dissolve) 7%.
- **Sync:** main cuts on beats, secondary reveals on off-beat eighths (v33). Prompt typing spans 2–3 beats (~1–1.3 s), the send bloom lands on the beat, then a flash and the result (v18).
- **End:** a slow decay. A 40-frame glow fade (v33), dropping all colour for the final 3–4 s (v07), or one inverted white end card (v33).

## 5. Recurring devices
1. **Prompt → result loop**: `ui` `prompt` typed, a `cursor` click on send, then `transition: flash` to the result (v18 v33).
2. **Leading-edge colour typing**: `typewriter` + `leadColor` (v07 v35 v51).
3. **Strike through the old way**: `shape line` drawn across a feed or tutorial thumbnail (v07).
4. **Cursor as the narrator's hand**: eased arcs, a dwell, a click on the VO verb (v57).
5. **Flicker montage of proof**: `image.cycle` every 3 frames through 6–10 thumbnails (v03 v65 v57).
6. **Reveal the tool**: zoom out of a finished visual into the software window that made it (v57). Use the `shrink` transition with an `embed`.
7. **Brand drain**: the glowing logo loses glow and colour to become the flat mark (v33). Use `grade.drainAt` on the last scene.
8. **Comment-keyword CTA as UI**: the comment typed, then an auto-reply `ui` `chat` (v57).

## 6. Skeleton (30 s, 16:9, ≈14 shots)
| t (s) | beat | shot | cut in |
|---|---|---|---|
| 0–2.5 | Call-out: the viewer's habit | the habit shown, then struck through | — |
| 2.5–5.5 | Agitation | a deadline UI, then one lonely typed line on black | `zoom` |
| 5.5–8 | Brand reveal | the hero object or wordmark with a glow bloom | `flash-ramp` |
| 8–20 | Proof ×3 (prompt → result) | macro click / type / send / result per shot | `flash`, `pixel`, `whip-*` |
| 20–24 | The promise | one hero line, no props | `black` |
| 24–30 | CTA | comment-keyword typed beside the product; held ≥1.2 s; colour drains | `zoom` |

## 7. Example VideoSpec (16:9, asset-free)
```json
{
  "width": 1920, "height": 1080, "fps": 30, "animFps": 0,
  "palette": {"bg": "#050505", "ink": "#f0f0f0", "accent": "#28f8e0", "accent2": "#28e8b4", "paper": "#000000"},
  "finish": {"grain": 0.05, "vignette": 0.45},
  "scenes": [
    {"id": "callout", "duration": 2.6,
     "background": {"kind": "dots", "color": "#0a0a0a"},
     "camera": {"settle": 1.04, "settleR": 0.75, "drift": 0.015},
     "layers": [
       {"type": "text", "text": "Stop rebuilding the same dashboard.", "style": "clean", "size": 3.6, "y": 46, "caps": false,
        "anim": "typewriter", "cps": 28, "leadColor": "#28f8e0"},
       {"type": "shape", "kind": "line", "x": 22, "y": 46, "x2": 78, "y2": 46, "color": "#ff4b4b", "stroke": 6, "at": 1.7, "draw": 6}
     ]},
    {"id": "agitate", "duration": 2.6, "transition": {"type": "zoom"},
     "background": {"kind": "void"},
     "camera": {"settle": 1.05, "settleR": 0.75},
     "layers": [
       {"type": "ui", "kind": "progress", "title": "Q3 report", "value": 0.18, "theme": "dark", "accent": "#ff4b4b", "y": 40, "w": 46, "anim": "rise"},
       {"type": "text", "text": "and the deadline is tomorrow.", "style": "clean", "size": 2.8, "y": 64, "caps": false, "color": "#909090", "at": 1.0, "anim": "ghost"}
     ]},
    {"id": "brand", "duration": 2.4, "transition": {"type": "flash-ramp"},
     "background": {"kind": "radial", "color": "#0d2a2a", "color2": "#030303"},
     "camera": {"settle": 1.06, "settleR": 0.78, "drift": 0.02},
     "layers": [
       {"type": "text", "text": "Meet Autopilot", "style": "clean", "size": 7, "y": 46, "caps": false, "anim": "focus",
        "accent": ["autopilot"], "accentColor": "#28f8e0", "fx": {"glow": "#28f8e099"}}
     ]},
    {"id": "proof", "duration": 3.4, "transition": {"type": "pixel"},
     "background": {"kind": "dots", "color": "#0a0a0a"},
     "camera": {"settle": 1.04, "settleR": 0.75, "punch": [{"at": 1.9, "scale": 1.12, "frames": 6}]},
     "layers": [
       {"type": "ui", "kind": "prompt", "text": "Build the Q3 dashboard from last month's data", "theme": "dark", "accent": "#28f8e0", "y": 44, "w": 52, "cps": 30, "anim": "pop"},
       {"type": "cursor", "path": [{"x": 70, "y": 70, "t": 0.4}, {"x": 73, "y": 47, "t": 1.7, "click": true}]},
       {"type": "text", "text": "Done.", "style": "clean", "size": 4, "y": 66, "caps": false, "at": 2.2, "color": "#28f8e0", "anim": "pop"}
     ]},
    {"id": "cta", "duration": 3.2, "transition": {"type": "black", "frames": 3},
     "background": {"kind": "void"},
     "camera": {"settle": 1.03, "settleR": 0.8, "drift": 0},
     "grade": {"drainAt": 2.4},
     "layers": [
       {"type": "text", "text": "Comment \"AUTO\"", "style": "clean", "size": 5.5, "y": 44, "caps": false, "anim": "typewriter", "cps": 20,
        "accent": ["\"auto\""], "accentColor": "#28f8e0", "fx": {"glow": "#28f8e066"}},
       {"type": "text", "text": "and I'll send you the template", "style": "clean", "size": 2.6, "y": 56, "caps": false, "color": "#909090", "at": 1.0, "anim": "words", "stagger": 4}
     ]}
  ]
}
```
For 9:16, set `1080×1920`, multiply text sizes by ~1.8, and stack lines at 60–70% width (v07's variation note).

## 8. Do / don't
**Do**
- Spend the accent only where the eye should go: action, product, URL.
- Show something real (the actual UI, file or comment). Fake but plausible UI copy needs grey secondary labels to sell it (v33).
- Hold still. A 1.2–1.8 s static read after every burst is part of the look.

**Don't**
- Fill surfaces with the accent, or use two accent hues.
- Use pop-scale bounces on type. Use type-on, ghost-settle or blur-in.
- Show a raw, full-screen, unstaged screen recording.

## 9. Engine notes and gaps
- **3D hero objects and one-world CG camera moves** (v01 v02 v38 v83, 4/8): not in the engine. Use a user-supplied render as an `image`/`video` layer, or write a three.js custom component (`src/custom/`).
- **Glass card stacks with rim light and 3D tilt** (v57 v33): `ui` cards are flat. Possible fix: `tiltX/tiltY` on `Pos` plus a `rim` glow on `ui`.
- **Weight-morph type** (heavy blob → Regular, v57): not available. Possible fix: a variable-font `anim: "weight"`.
- **Foreground occluder wipes** (the statue's shoulder crossing the lens, v01): `transition: object` with a user PNG covers the simple case.
