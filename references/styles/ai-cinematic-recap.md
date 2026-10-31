# AI-still cinematic recap

**Photoreal plates (AI-generated stills, dioramas, film frames) are cut like a trailer.** Each plate gets a deliberate camera move plus one or two animated props. Scenes alternate warm and cool grades. The graphics live *inside* the world: titles on façades, name tags on chests, keywords behind heads. Evidence beats switch to tactile print (newspapers, case files) with highlighter. The type register changes with the rhetorical register.

References (8): v34 v45 v47 v56 v63 v64 v67 v68. Cousins: mono-accent-documentary (B/W, calmer) and stage-diorama-theatre (illustrated).

---

## 1. Signature look
| element | rule | evidence |
|---|---|---|
| Plates, not slides | Every still gets a camera move (pull + rotate, truck, rack focus) and at least one moving element. A still is never static. | 8/8 |
| One set per sentence, one grade for all | Wildly different sets (desert, workshop, lab, court) are unified by one grade: an amber crush and heavy vignette (v68), or soft filmic lifted blacks with halation (v56). | 8/8 |
| Warm/cool alternation | Each scene owns one temperature, and the polarity tracks the story (freedom = warm, prison = cold, v64). | v56 v63 v64 v67 |
| Graphics in the world | A 3D title on a building, a TV lower-third tag tracked to a chest, a map on a gallery wall, a title behind the actor's head. | v56 v45 v68 v34 |
| Evidence interludes | Print props (newspaper, clipboard, case file on a desk) with highlighter sweeps and marker circles. | v63 v67 v47 v56 |
| Medium switch for "today" | Story-world AI plates give way to real footage for the present-day proof, cut 3–4× faster with one-word captions. | v68 v45 |
| Finish | Grain, vignette ~30% corners, bloom. Scanlines on v34 v45. A halftone/dot mesh on v47 v63 v68. | 8/8 |

## 2. Palette recipes
Rule: **one dominant temperature per scene + one saturated accent**, with a fixed valence code: red = death/rejection/fake, green = improvement, yellow = key fact or evidence.

| recipe | bg | ink | accent | accent2 | paper | source |
|---|---|---|---|---|---|---|
| Amber diorama | `#2a1a0e` amber-black | `#e6e6e6` setup words | `#f6c21a` → `#e08a00` payoff glow | `#1a1a1a` type on amber cards | `#c1874d` amber card | v68 |
| Warm/cool trailer | alternate `#161728` navy ↔ `#592513` oxblood wood | `#ffffff` | `#d71a24` signal red | `#1f6fe8` electric blue tags | `#f2d71b` lemon (paper, highlighter) | v56 |
| Valence hospital | `#2f222d` plum (dread) → `#1097ec` sky (hope) | `#353233` | `#bb3c46` alarm red | `#2bd62b` chart green | `#dcd3ce` paper | v63 |
| Cold mystery | `#16202a` cold blue | `#f0f0f0` | `#d9232b` name tag/underline | `#f2e23c` highlighter | `#e4e4e7` newsprint | v67 v47 |

Desaturation is narrative: colour → B/W for death or denial (v67: saturation 84 → 35 over 6 f). Use `grade.drainAt`. Past vs present = B/W vs colour (v34).

## 3. Type system
Two or three voices, switched by rhetorical register (v63, v64, v45 each use 3–7 registers):

| register | engine | size (% W) | treatment | evidence |
|---|---|---|---|---|
| Narrative claim | `grotesk` caps (heavy, rounded-wide) | 10–16 (65–85% width) | setup words white/grey, payoff words in the accent with `fx.glow`; `anim: "words"` on the word | v68 v63 |
| Twist / sensational | `impact` or `grotesk` red | 14–20 | `fx.extrude` 6 in a darker red + `shadow` | v56 v64 |
| Narrator aside / moral | `serif-italic` | 6–9, one word at a time for the moral | white with a soft glow, slow cadence | v47 v63 v67 |
| Facts / stats / dates | `mono` (typewriter) or `condensed` | 5–8 | typed with a caret, red underline grows with it | v63 v67 |
| Running caption (optional) | `clean` light, lowercase | 4–5 | one thin white word-by-word line under every world | v45 |
| Name tag | `badge` `solid` red or blue | 3.5–4.5 | pinned beside the person | v56 v67 |
| Connector/keyword stack | `grotesk`: white small connectors, huge red keywords, ratio ~1:2.5 | 5 / 13 | centred on a near-black textured card | v34 |

## 4. Motion signature
- **`animFps: 0`** for plates. Give tabletop, archival or hook sections `animFps: 15` (v47 v64 v67 mix 15 and 30, v56's hook is stepped at ~18). The texture shift signals the change of mode.
- **Settle:** start at 103–110% and decay over 15–25 f: `camera.settle` 1.06–1.1, `settleR` 0.85. Diorama entrances can start defocused and rack in while pulling back (v64): `transition: focus`.
- **Cut at peak velocity:** end shots on an accelerating move and start the next decelerating (v67). Use `zoom`/`whip-*` on 1/3 of cuts.
- **Cut mix** (135 classified): plain cut 37% · `flash`/burn/bloom 15% · `whip-*` 14% · `zoom` 5% · `circle` (iris/portal) 5% · `invert` 2–3 f as chapter markers (v34 v56 v68) · `focus`/`slide`/object 2% each.
- **Sync:** big events (flashes, strobes, cuts) on the beat within ±2 f. Small type trails the VO by 0.1–0.3 s (v56). Captions trail the noun by ~0.2 s (v45).
- **Easing:** weighted expo-out with no bounce (4-frame ramps, 15–40-frame decays, v67). Hung objects (portraits, signs) use image `swing`.

## 5. Recurring devices
1. **Iris portal from a point already in the picture** (lamp, red dot, palms, chart endpoint) (v63: almost every transition). Use `transition: circle`; the origin is fixed (see gaps).
2. **Invert flash as a chapter marker**: 2 frames, no other graphics (v68 v34 v56).
3. **Name tags and labels pinned to people/objects**: `badge` next to the subject (v56 v67).
4. **Evidence desk**: grid paper, aged photo cards tilted 5–15°, tape, a newspaper with a highlighter (`shape rect` at low opacity) (v63 v67).
5. **Pure type cards for turn points**: a flat amber or black card with only the key phrase (v68 v56).
6. **Era colour coding**: B/W on red for the past, full colour for the present (v34).
7. **List montage**: 0.6 s per item, 2-frame invert-spin flashes, one starburst colour per item (v34). Use `shape burst` + `transition: invert`.
8. **Callback prop**: the hero prop from the hook returns with a flash before the CTA (v64).

## 6. Skeleton (40 s, ≈16 plates)
| t (s) | beat | plate | cut in |
|---|---|---|---|
| 0–3 | Hook: the verb physically happens to the subject in 1 s | dramatic plate + 3D red title | — |
| 3–8 | Setup: tonal flip from dread to hope | warm/cool alternate, a portrait card flutters in | `whip-*` |
| 8–13 | Character + context | name tag on the subject; date typed in mono | `circle` |
| 13–15 | "But it gets crazier" | flat textured type card | `invert` |
| 15–27 | Escalation, 4–5 plates | camera moves, a prop event each | `flash`, `zoom`, `whip-*` |
| 27–31 | Evidence interlude | newspaper desk, highlighter on the spoken words | `cut` |
| 31–35 | Today: the medium switch | real footage cards (user-supplied), 3–4× faster | `flash` |
| 35–40 | Moral (serif, one word at a time) → CTA | spotlight on black → device mockup | `focus` |

## 7. Example VideoSpec
`PLACEHOLDER_*` files are user-supplied AI plates or photos. Remove them to render asset-free (the type cards and evidence scene still work).
```json
{
  "width": 1080, "height": 1920, "fps": 30, "animFps": 0,
  "palette": {"bg": "#161728", "ink": "#ffffff", "accent": "#d71a24", "accent2": "#f2d71b", "paper": "#e4e4e7"},
  "finish": {"grain": 0.1, "vignette": 0.5, "halftone": 0.06},
  "scenes": [
    {"id": "hook", "duration": 2.8,
     "background": {"kind": "image", "src": "PLACEHOLDER_plate_museum_vault.jpg", "dim": 0.2},
     "camera": {"settle": 1.08, "settleR": 0.85, "drift": 0.04},
     "layers": [
       {"type": "text", "text": "FAKE", "style": "grotesk", "size": 18, "y": 30, "anim": "slam", "fx": {"extrude": 6, "extrudeColor": "#555555"}},
       {"type": "text", "text": "MOON ROCK", "style": "grotesk", "size": 16, "y": 40, "at": 0.3, "color": "#d71a24", "anim": "slam",
        "fx": {"extrude": 6, "extrudeColor": "#7a0c10", "shadow": true}}
     ]},
    {"id": "who", "duration": 3.0, "transition": {"type": "whip-left"},
     "background": {"kind": "image", "src": "PLACEHOLDER_plate_curator_office_warm.jpg", "dim": 0.1},
     "camera": {"settle": 1.06, "settleR": 0.85, "pan": [{"at": 1.2, "x": 60, "y": 50, "frames": 24}]},
     "layers": [
       {"type": "badge", "text": "THE CURATOR", "variant": "solid", "color": "#1f6fe8", "size": 4, "x": 70, "y": 56, "at": 1.4, "anim": "wipe"},
       {"type": "text", "text": "it sat behind glass for decades", "style": "clean", "size": 4.6, "y": 70, "caps": false, "at": 0.2, "anim": "words", "stagger": 5}
     ]},
    {"id": "turn", "duration": 2.0, "transition": {"type": "invert", "frames": 2},
     "background": {"kind": "concrete", "color": "#1c1a1a"},
     "camera": {"settle": 1.1, "settleR": 0.82},
     "layers": [
       {"type": "text", "text": "but it gets", "style": "grotesk", "size": 6, "y": 38, "anim": "pop"},
       {"type": "text", "text": "CRAZIER", "style": "grotesk", "size": 15, "y": 46, "at": 0.4, "color": "#f2d71b", "anim": "slam", "fx": {"glow": "#f2d71b66"}}
     ]},
    {"id": "evidence", "duration": 3.2, "transition": {"type": "flash"},
     "background": {"kind": "grid", "color": "#e4e4e7"},
     "camera": {"settle": 1.08, "settleR": 0.86, "punch": [{"at": 1.6, "scale": 1.1}]},
     "animFps": 15,
     "layers": [
       {"type": "text", "text": "AUGUST 2009", "style": "mono", "size": 6, "y": 26, "color": "#1a1a1a", "anim": "typewriter", "cps": 16, "underline": "line", "underlineColor": "#d71a24"},
       {"type": "text", "text": "Museum admits its\n\"moon rock\" is petrified wood", "style": "serif", "size": 6.5, "y": 44, "color": "#1a1a1a", "at": 0.8, "anim": "mask",
        "highlight": "#f2d71b"},
       {"type": "shape", "kind": "ellipse", "x": 50, "y": 47, "w": 70, "h": 8, "color": "#d71a24", "stroke": 7, "at": 2.0, "draw": 6}
     ]},
    {"id": "moral", "duration": 3.0, "transition": {"type": "focus"},
     "background": {"kind": "radial", "color": "#2a2a30", "color2": "#050505"},
     "camera": {"settle": 1.06, "settleR": 0.88, "drift": 0.02},
     "layers": [
       {"type": "text", "text": "trust the label\nless than the lab", "style": "serif-italic", "size": 7.5, "y": 44, "caps": false, "anim": "words", "stagger": 9,
        "fx": {"glow": "#ffffff44"}}
     ]}
  ]
}
```

## 8. Do / don't
**Do**
- Give every plate a decisive 16–22-frame camera move plus one live prop (v73 and v63 make stills feel like cinema this way).
- Match the transition to the story event: a portal at the straw, an X-ray at "hospital", a camera-flash strobe at "seized" (v56).
- Keep one consistent protagonist across generated plates (the same face, wardrobe and palette).

**Don't**
- Show AI plates at 100% for more than ~1.5 s without motion. Interpolation artefacts and the "slideshow" read appear immediately.
- Use one type style everywhere. Switch register when the rhetoric switches, but never more than one register per scene.
- Grade every scene the same temperature. The warm/cool swap is the rhythm.

## 9. Engine notes and gaps
- **Tracked or perspective-pinned graphics** (titles on façades, tags tracked to a moving chest, v56 v45): not supported. Possible fix: a corner-pin field (`quad: [[x,y]×4]`) on text/badge layers plus keyframed positions.
- **Iris that grows from a point in the picture** (v63, ~8 uses): `circle` has a fixed origin. Possible fix: `transition.origin: [x, y]`.
- **Pixel-materialise titles** (v68: type assembles from glowing fragments in 4 f): there is no text anim for it. `scramble` is the nearest. Possible fix: `anim: "pixel"`.
- **Image-to-video plates**: use the `video` layer with user-supplied clips. The engine cannot animate a still beyond camera moves and layer motion.
