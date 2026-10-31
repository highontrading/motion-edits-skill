# Native-UI business explainer

**Every sentence lives inside the interface that would naturally carry it, and the UI performs the line.** An iMessage thread types and sends it, a notification drops it, a Notes page or tweet holds it, an AI chat answers it. It is world-hopping between familiar containers, light and dark flipping on almost every cut, one brand accent across all worlds, and real film footage saved for the emotional payoff. It is the most "native to the phone" family, used for advice, branding and marketing-psychology scripts.

References (10): v04 v74 v75 v76 v77 v78 v79 v80 v81 v82. Cousins: keynote-clean-type (when UI is drawn flat) and halftone-poster-collage (when worlds become posters).

---

## 1. Signature look
| element | rule | evidence |
|---|---|---|
| Sentence inside its UI | Notification = a named principle, chat bubble = an aside, dialog = "understand", pinned note = "remember", App Store rank = "success". | 10/10 |
| The UI performs the line | Typing at 0.7–1 char/frame finishes as the voice finishes (v79). Also sending, tapping, selecting, karaoke on a paragraph (v81). | 10/10 |
| Light/dark flip | Alternate scene luma on almost every cut (≈35 ↔ 235, v04; v80 and v82 flip every 1–3 s). | 8/10 |
| One brand accent | One green/lime family across all worlds (buttons, keywords, highlighter, CTA border). Native UI blues stay inside the UI. | 8/10 (v75 v76 v77 v78 v79 v81 v82 v83) |
| Recurring chrome | A film-frame/Kodak border, a camcorder HUD, or an animated letterbox, so wildly different worlds read as one piece. | v74 v77 v78 v79 v80 v81 |
| DOF + tilt | UI planes tilted 15–40° with near/far blur (6–15 px) look photographed. Use `tilt` + `depth` + `camera.focus`. | v75 v80 v82 v04 |
| Footage for the payoff | A single locked-off cinematic shot with ghosted captions in its negative space. | 7/10 |

## 2. Palette recipes
| recipe | bg (light / dark) | ink | accent (brand) | accent2 (semantic) | paper | source |
|---|---|---|---|---|---|---|
| Lime founder | `#ffffff` / `#2c3437` | `#1d4335` | `#c8e04a` (pills, keywords, CTA border `#d7f26a`) | `#0d7efa` iOS blue (inside UI only) | `#e9e9eb` bubble grey | v79 |
| Value green vs selling red | `#f7f7f7` / `#141414` | `#1d1d1f` | `#3ddc84` green = good behaviour | `#e0503f` red = selling behaviour | `#ffffff` | v75 v76 |
| Kodak montage | `#f8f8f8` / `#0f0f0f` | `#0f0f0f` / `#f8f8f8` | **one per scene**: `#0bba5a`, `#b115aa`, `#f16c12`, `#068a71` | `#e0201b` full-stop dot | `#ffffff` | v74 |
| Antithesis worlds | bright commercial `#f2f2f2` vs dark cinematic `#0c0c0c` | `#111111` / `#ffffff` | `#4caf50` brand green | `#e6d23a` yellow highlight (once) | `#ffffff` | v82 |

## 3. Type system
| role | engine | size (% W, 9:16) | treatment | evidence |
|---|---|---|---|---|
| Body caption | `clean` bold, sentence case, `tracking: -0.03` | 6–8 (25–33% width) | `anim: "focus"` per word on the syllable (4–6 f); quiet and small | v74 v75 v76 |
| Payoff word | `clean` heavy, or `serif-italic` | ×1.8 the lead-in | a light lead-in + heavy payoff in one phrase | v74 |
| Hero numeric lockup | `clean` | numeral 40–50, words 7 | "The **1** thing…" | v75 |
| Manifesto poster | `impact` | 18–26 (71–100% width) | a full-bleed accent field with dark-olive type (`#142803` on `#8ad260`) | v78 v77 |
| Script echo | `script` in the accent | 6–8 | a small right-aligned coloured echo under the grotesk | v81 v82 |
| Plain-truth line | `mono` or `clean` | 5–6 | `typewriter` at 1 char/frame (`cps: 30`) | v78 |
| UI-native text | `ui` layers (chat, notification, tweet, search) | — | the UI *is* the caption | 10/10 |
| Paragraph karaoke | `clean`, `anim: "karaoke"`, `dimColor` grey | 5 | the whole thought in grey, the spoken line lit | v81 v77 v76 |

## 4. Motion signature
- **`animFps: 0`**. Drop to `animFps: 15` for a "lesson/poster" section (v77 switches to 2s from 19 s on). The texture gear change marks the chapter.
- **Settle:** the camera always eases out from the cut, an exponential decay over ~0.4 s with no overshoot (v76): `camera.settle` 1.06–1.08, `settleR` 0.8. Give each beat an impulse with `punch` 1.05–1.08 over 10 f on keywords and beats (v80).
- **Velocity-matched cuts:** accelerate out (4 f ease-in), land the next already moving (v75 v80). Use `zoom`/`whip-*`.
- **Cut mix** (211 classified): plain cut 38% · `flash`/`burn`/light leak 17% · `zoom` 12% · in-shot UI events 9% · `whip-*` 4% · `black` 4% · `shrink`/twirl/nested 3% · `glitch` 2% · `invert` (on the stressed word) 1–2%.
- **Sync:** cut on the first word of the sentence (±1 f, v78; 0–0.1 s before, v76 v81). Keyword reveals within ±4 f of the spoken word. Template word-swaps trail by ~0.1 s (v77).
- **Shape of the edit:** a loud hook (huge caps, confetti, emoji) for 3 s, then a quiet, small-type body, then a decelerating ending of minimal cards with grey → black value reveals (v79 v75).

## 5. Recurring devices
1. **Chat thread as spine**: `ui` `chat` with `messages[].at` on the VO words (v75 v79 v81).
2. **Notification drop** for a named principle (v76 v04).
3. **Nested reveal**: shrink the last scene into the next container (a phone screen, IG post) 3–4 times a minute (v76). Use `transition: shrink` + an `embed` layer + `camera.origin`.
4. **Letterbox format shift as a chapter marker**: square/16:9 cards for the rules, full 9:16 for proofs (v76 v78 v80). Use `scene.letterbox` 12–22.
5. **Film-frame overlay**: top-level `overlay` with thin `rect` rules, mono frame numbers and an edge-print label (v74 v78).
6. **Cursor acting the verb**: drag the friction tag away, push the slider (v80).
7. **Prohibition stamp on "not"**: `shape circle` + `line` in red over the "o" (v81).
8. **Recap panel**: the whole moral as a stack of highlighted lines before the CTA (v78 v79). Use `text` with `highlight`.
9. **Antithesis world swap**: side A always bright/commercial, side B always dark/cinematic (v82).

## 6. Skeleton (40 s, ≈20 scenes)
| t (s) | beat | container | cut in |
|---|---|---|---|
| 0–3 | Loud hook | huge kinetic caps + emoji/confetti on white | — |
| 3–5 | Diagnosis | a poster collage or tweet card | `invert` |
| 5–12 | Reframe | an iMessage thread typing the logic | `cut` on the first word |
| 12–14 | Named principle | notification drop on a lock screen | `zoom` |
| 14–24 | Proof ×3 | each example inside its own native UI (store page, maps pin, chat), tilted with DOF | `whip-*`, `flash` |
| 24–30 | Emotional payoff | real footage, locked off, ghost captions in negative space (user-supplied) | `burn` |
| 30–35 | Recap | Notes page / recap panel, karaoke | `shrink` |
| 35–40 | CTA | a glowing pill button + comment keyword | `cut` |

## 7. Example VideoSpec (9:16, asset-free)
```json
{
  "width": 1080, "height": 1920, "fps": 30, "animFps": 0,
  "palette": {"bg": "#ffffff", "ink": "#1d4335", "accent": "#c8e04a", "accent2": "#0d7efa", "paper": "#f7f7f7"},
  "finish": {"grain": 0.04, "vignette": 0.2},
  "overlay": [
    {"type": "text", "text": "FRAME 24 · 400", "style": "mono", "size": 2.2, "x": 50, "y": 4, "color": "#9a9a9a", "caps": true}
  ],
  "scenes": [
    {"id": "hook", "duration": 2.8,
     "background": {"kind": "solid", "color": "#ffffff"},
     "camera": {"settle": 1.08, "settleR": 0.8},
     "layers": [
       {"type": "text", "text": "YOUR INBOX\nIS RUNNING YOUR", "style": "grotesk", "size": 9, "y": 34, "color": "#1d4335", "anim": "words", "stagger": 3},
       {"type": "text", "text": "DAY", "style": "grotesk", "size": 17, "y": 46, "at": 0.9, "color": "#8f2a1a", "anim": "slam"},
       {"type": "shape", "kind": "burst", "x": 80, "y": 24, "w": 16, "h": 9, "fill": "#c8e04a", "color": "#c8e04a", "at": 1.2}
     ]},
    {"id": "thread", "duration": 4.2, "transition": {"type": "invert", "frames": 2},
     "background": {"kind": "solid", "color": "#2c3437"},
     "camera": {"settle": 1.06, "settleR": 0.8, "drift": 0.02},
     "layers": [
       {"type": "ui", "kind": "chat", "theme": "dark", "y": 44, "w": 86, "anim": "rise", "messages": [
         {"from": "them", "text": "Quick question?", "at": 0.3},
         {"from": "them", "text": "Saw my email?", "at": 1.2},
         {"from": "me", "text": "In deep work…", "at": 2.2},
         {"from": "them", "text": "Just 2 mins!", "at": 3.0}]}
     ]},
    {"id": "principle", "duration": 2.8, "transition": {"type": "zoom"},
     "background": {"kind": "gradient", "color": "#1d4335", "color2": "#0b1a14"},
     "camera": {"settle": 1.07, "settleR": 0.8, "punch": [{"at": 1.4, "scale": 1.06, "frames": 10}]},
     "layers": [
       {"type": "ui", "kind": "notification", "label": "Focus", "title": "47 interruptions today", "text": "longest focus block: 9 minutes", "theme": "light", "y": 30, "w": 86, "anim": "slide-down", "tilt": [14, -10], "tiltTo": [6, -4]},
       {"type": "text", "text": "That's not a schedule.", "style": "clean", "size": 7, "y": 56, "caps": false, "color": "#ffffff", "at": 1.0, "anim": "focus"},
       {"type": "text", "text": "It's a queue.", "style": "clean", "size": 12, "y": 64, "caps": false, "color": "#c8e04a", "at": 1.8, "anim": "focus"}
     ]},
    {"id": "recap", "duration": 3.6, "transition": {"type": "burn"},
     "background": {"kind": "solid", "color": "#f7f7f7"},
     "letterbox": 14,
     "camera": {"settle": 1.06, "settleR": 0.8},
     "layers": [
       {"type": "text", "text": "Block the morning. Batch the replies. Kill the badges. Measure output, not response time.", "style": "clean", "size": 6, "y": 44, "w": 80,
        "caps": false, "anim": "karaoke", "stagger": 7, "dimColor": "#b9b9b9", "color": "#111111"}
     ]},
    {"id": "cta", "duration": 3.0, "transition": {"type": "cut"},
     "background": {"kind": "solid", "color": "#0c0c0c"},
     "camera": {"settle": 1.05, "settleR": 0.8, "drift": 0},
     "layers": [
       {"type": "ui", "kind": "button", "text": "Get the template", "theme": "dark", "accent": "#c8e04a", "y": 44, "w": 60, "anim": "pop"},
       {"type": "cursor", "path": [{"x": 80, "y": 70, "t": 0.5}, {"x": 56, "y": 45, "t": 1.3, "click": true}]},
       {"type": "text", "text": "comment FOCUS", "style": "script", "size": 8, "y": 58, "caps": false, "color": "#c8e04a", "at": 1.6, "anim": "pop"}
     ]}
  ]
}
```

## 8. Do / don't
**Do**
- Choose each container by the noun of its sentence (alarm → iOS alarm, cart → shopping UI, "they posted" → tweet).
- Keep body type small and quiet, so the 2–3 hero lockups hit.
- Give green/red (or your accent pair) a moral meaning and never break it.

**Don't**
- Use more than one brand accent, or recolour native UI chrome with it. The accent goes on buttons, keywords and highlighter only.
- Show a container without it *doing* something (typing, sending, lighting up) within 0.5 s.
- Copy a real app's exact skin or another creator's end card. Build generic "chat / notification / note" UI and let the user supply their own branding.

## 9. Engine notes and gaps
- **3D tilt + DOF of UI planes** (v80 v75 v82 v04): covered by `tilt`/`tiltTo` (UI at 6–18°, up to 40° for hero shots), `depth` per plane and `camera.focus` racks. Native app chrome is still generic.
- **Text-selection highlight menus, app-icon labels, Notion/Spotify skins** (v77 v81): approximate with `text.highlight` and generic `ui` kinds.
- **Marquee-scrolling poster type** (v78): not built in. Use a wide `text` with `camera.pan`, or add `anim: "marquee"`.
- **Ghost captions composited into footage depth** (roto, v77 v79): use a `tools/matte.py` matte as a `video` layer with `transparent: true` above the caption (see `footage-editing.md` §1). Without one, place the type in the footage's negative space.
