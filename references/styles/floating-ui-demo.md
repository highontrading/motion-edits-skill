# Floating-UI product demo (dreamy wallpaper)

**Sharp, rounded product UI cards float over defocused, painterly wallpapers (sky, alpine, soft pastel), filmed by one smooth virtual camera.** Something is always being typed, with a coloured leading edge. The structure is a prompt → result ping-pong, with results shown in the VO's silences. A recurring "processing" signifier (a pixel-tile dissolve or colour sweep) and a dark, quiet CTA close it. It is the calmest promo family: long reframes instead of cuts.

References (5): v35 v46 v51 v52 v58. Four of the five are 16:9. Cousins: keynote-clean-type (white voids) and dark-product-promo (black voids).

---

## 1. Signature look
| element | rule | evidence |
|---|---|---|
| UI on wallpaper | Sharp UI windows and cards (rounded, soft shadow) over a blurred, colourful backdrop, the way keynotes stage screenshots. The window covers ~70% of the frame and the wallpaper frames it like a passe-partout (v58). | 5/5 |
| One surface per sentence | Cut to a new environment (sky / white void / black void / dot grid) exactly on the sentence's first word, ±1 f (v51). | v51 v52 v35 |
| Rebuilt, oversized UI | UI rebuilt as clean vector layers, so the camera can punch in 2–3× without pixelation (v35). | v35 v52 |
| Always typing | Every UI moment has text being written (prompt, chat, caption), with a coloured leading edge. | 5/5 |
| Colour only as light | Neutral layouts; saturated colour is reserved for glows, typing edges, halftone blooms on send, and brand sweeps. | v51 v46 v58 |
| Human moment | One footage beat (with a glass caption pill) at the emotional word ("your idea") breaks the UI monotony (v52). | v52 v35 |

## 2. Palette recipes
| recipe | bg (wallpaper) | ink | accent | accent2 | paper (UI) | source |
|---|---|---|---|---|---|---|
| Sky keynote | `#71a2f4` sky → blurred | `#131015` | `#1a6ff8` caret block, blue wipe | rainbow lead `#4ade80` → `#facc15` → `#e040fb` | `#fefefe` / `#e6e3e7` | v51 |
| Warm-grey pastel | `#ece9e4` warm grey | `#1d1b1f` | `#f96c32` brand orange (logo, caret, send) | `#d4f53c` lime (UI content only) | `#ffffff` | v52 |
| Cool → warm agent | `#2b91f5` (hook) → terracotta wallpaper | `#e8e4e7` on `#1c191d` UI | `#e8622c` typed edge, send | `#f99500` sweep | `#221e21` dark UI | v58 |
| Nature pastel | blurred landscape (user image) or `mesh` `#9cc7e8` / `#f2c6a0` | `#ffffff` UI text on dark, `#111` on light | `#2a9fe0` streaming text, dot bursts | `#c4e35a` newest hook word | `#0a070b` CTA | v46 |

## 3. Type system
| role | engine | size (% W, 16:9) | treatment | evidence |
|---|---|---|---|---|
| Caption | `clean` (Inter/SF), sentence case | 1.6–3 (12–23% width) | calm, small, `anim: "focus"` (blur-in), never pops | v51 |
| Hook keyword pairs | `clean` Title Case, white + soft shadow | 3–4 | two columns either side of a phone/card | v46 |
| Prompt text | inside `ui` `prompt` (typed, `cps` 20–40 or VO-locked) | — | `accent` = leading-edge colour | v46 v51 v58 |
| Hero → line | `clean` | 14–18 → 2.5 | the first word huge in the brand colour, then it snaps small and turns near-black 5–6 f later | v58 |
| Code log | `mono` | 1.2–1.6 | a scrolling "in the background" log | v52 |
| CTA | `clean` or `condensed` heavy | 4–6 | white logo + one line on a blurred, dark product library | v35 v46 v58 |

## 4. Motion signature
- **`animFps: 0`**, fps 30 (v35 at 24).
- **Virtual camera instead of cuts:** in long UI shots, use symmetric ease-in-out reframes of 24–32 f (v51) or 1.4–1.6 s (v46). Change framing about every 1.5 s on the keyword (v35). Use `camera.pan` (frames 24–40) and `punch` at 1.6–2.2× on the exact element the VO names (v51).
- **Settle on hard cuts:** 3–4% oversize decaying in 6–8 f (v58): `camera.settle` 1.035, `settleR` 0.72.
- **Momentum across cuts:** accelerate the drift before the cut and launch the next shot at the same speed and direction (v46). Use `whip-*` or `slide` in the drift direction.
- **Cut mix** (84 classified): plain cut 33% · in-shot reframes 23% · `zoom` 20% · `flash` 5% · `whip-*` 4% · `slide` 3% · `circle`/logo iris 2% · `pixel` dissolve on "send" (v46 v58).
- **Two easing families only:** expo ease-out for arrivals, symmetric ease-in-out for reframes. Never linear, never bouncy (v46).
- **Sync:** surface cut on the sentence's first word (±1 f). VO-named UI events within ±0.15 s (v35). Results play in the VO gaps (v58). Zoom pulses of 1 f on music onsets (v51).

## 5. Recurring devices
1. **Prompt → result ping-pong**: a typed instruction, then the changed result, with a glow pulse on the changed object (v58).
2. **Pixel-tile dissolve = "processing"**: used every time something is sent (v35 v46 v58). Use `transition: pixel`.
3. **Brand-colour sweep as a transition**, which also signals the hook → product switch (v58). Use `transition: wash`.
4. **Result first**: the hook shows the finished output on a phone (v46).
5. **Carry the object across cuts**: the edit's own frame becomes the attachment thumbnail in the next prompt (v51). Use an `embed` of the previous scene inside a `ui` card.
6. **Shape iris from the brand**: the outro opens through the logo silhouette (v35). Approximate with `circle`.
7. **Agent checklist**: green ticks (`shape check`) on each completed step (v35).

## 6. Skeleton (30 s, 16:9, ≈12 shots)
| t (s) | beat | shot | cut in |
|---|---|---|---|
| 0–3.5 | Result-first hook: a self-referential claim | the finished output on a phone over a blurred sky, keyword pairs either side | — |
| 3.5–8 | Step 1: describe | prompt card typed with a coloured edge, the previous frame as an attachment | `cut` on the first word |
| 8–9 | Processing | pixel-tile dissolve | `pixel` |
| 9–15 | Result 1 | NLE/app window; the camera punches to the changed element; a glow pulse | `zoom` |
| 15–22 | Step 2 + result 2 | ping-pong again on a new surface (white or black void) | `wash`, `cut` |
| 22–26 | Human moment | a footage card with a glass caption pill (user-supplied) | `slide` |
| 26–30 | CTA | blurred product library, logo, one pill button, comment keyword | `circle` |

## 7. Example VideoSpec (16:9, asset-free)
The wallpaper is a procedural `mesh`. To use a real photo, swap in `{"kind": "image", "src": "PLACEHOLDER_wallpaper.jpg", "blur": 24}`.
```json
{
  "width": 1920, "height": 1080, "fps": 30, "animFps": 0,
  "palette": {"bg": "#71a2f4", "ink": "#131015", "accent": "#1a6ff8", "accent2": "#e040fb", "paper": "#fefefe"},
  "finish": {"grain": 0.03, "vignette": 0.2},
  "scenes": [
    {"id": "result-first", "duration": 3.4,
     "background": {"kind": "mesh", "color": "#71a2f4", "color2": "#f2c6a0"},
     "camera": {"settle": 1.035, "settleR": 0.72, "drift": 0.02},
     "layers": [
       {"type": "ui", "kind": "phone", "theme": "dark", "y": 50, "w": 18, "anim": "rise"},
       {"type": "text", "text": "Your\nfinished\nedit", "style": "clean", "size": 2.2, "y": 50, "w": 14, "caps": false, "color": "#ffffff", "weight": 800, "at": 0.3, "anim": "words", "stagger": 4, "z": 20},
       {"type": "text", "text": "You see\nthis edit?", "style": "clean", "size": 2.6, "x": 30, "y": 50, "caps": false, "anim": "focus", "fx": {"shadow": true}, "color": "#ffffff"},
       {"type": "text", "text": "No editor\ntouched it.", "style": "clean", "size": 2.6, "x": 70, "y": 50, "caps": false, "at": 1.4, "anim": "focus", "fx": {"shadow": true}, "color": "#ffffff"}
     ]},
    {"id": "prompt", "duration": 3.6, "transition": {"type": "cut"},
     "background": {"kind": "mesh", "color": "#9cc7e8", "color2": "#ffffff"},
     "camera": {"settle": 1.035, "settleR": 0.72, "punch": [{"at": 2.4, "scale": 1.6, "frames": 8}]},
     "layers": [
       {"type": "ui", "kind": "prompt", "text": "Cut the pauses, add captions, export for Reels", "theme": "light", "accent": "#1a6ff8", "y": 50, "w": 52, "cps": 26, "anim": "pop"},
       {"type": "cursor", "path": [{"x": 60, "y": 80, "t": 0.5}, {"x": 74, "y": 53, "t": 2.2, "click": true}]}
     ]},
    {"id": "result", "duration": 3.8, "transition": {"type": "pixel"},
     "background": {"kind": "solid", "color": "#131015"},
     "camera": {"settle": 1.035, "settleR": 0.72, "pan": [{"at": 1.6, "x": 62, "y": 56, "frames": 30}]},
     "layers": [
       {"type": "ui", "kind": "window", "title": "Timeline", "text": "14 pauses removed · captions added", "theme": "dark", "accent": "#1a6ff8", "y": 50, "w": 70, "anim": "fade", "tilt": [6, -10], "tiltTo": [2, -3]},
       {"type": "shape", "kind": "check", "x": 80, "y": 34, "w": 4, "color": "#4ade80", "stroke": 6, "at": 1.0, "draw": 6},
       {"type": "shape", "kind": "check", "x": 80, "y": 44, "w": 4, "color": "#4ade80", "stroke": 6, "at": 1.5, "draw": 6}
     ]},
    {"id": "human", "duration": 3.0, "transition": {"type": "wash", "color": "#1a6ff8"},
     "background": {"kind": "mesh", "color": "#f2c6a0", "color2": "#e6e3e7"},
     "camera": {"settle": 1.035, "settleR": 0.72, "drift": 0.025},
     "layers": [
       {"type": "text", "text": "You just bring the idea.", "style": "clean", "size": 3.4, "y": 50, "caps": false, "anim": "words", "stagger": 5,
        "accent": ["idea."], "accentColor": "#1a6ff8"}
     ]},
    {"id": "cta", "duration": 3.0, "transition": {"type": "circle"},
     "background": {"kind": "solid", "color": "#0a070b"},
     "camera": {"settle": 1.02, "settleR": 0.8, "drift": 0},
     "layers": [
       {"type": "text", "text": "Try it free", "style": "clean", "size": 4.4, "y": 40, "caps": false, "color": "#ffffff", "anim": "focus"},
       {"type": "ui", "kind": "button", "text": "Comment \"AGENT\"", "theme": "dark", "accent": "#1a6ff8", "y": 62, "w": 56, "at": 0.8, "anim": "pop"}
     ]}
  ]
}
```

## 8. Do / don't
**Do**
- Reframe instead of cut inside complex UI (log → timeline → whole window), so the viewer always knows where to look.
- Type the spoken sentence into the product's own input, slightly ahead of the voice, and end with a real click before the line ends (v46).
- Keep authenticity marks: plausible model chips, real track colours, even a typo in a prompt (v58).

**Don't**
- Put busy UI on a busy wallpaper. The wallpaper must be blurred and lower-contrast than the UI.
- Use bounce, shake or stepped animation here.
- Leave the camera dead for more than ~2 s in a UI shot.

## 9. Engine notes and gaps
- **Blurred photo wallpapers**: `background.image` with `blur` works but needs a user photo. `mesh` is the asset-free stand-in.
- **Glass (backdrop-blur) UI cards and curved/bent panels** (v49 v35): `tilt`/`tiltTo` give the perspective, but there is no glass material and no curve. Possible fix: `ui.glass: true` and `ui.curve`.
- **Real product skins**: `ui` kinds are generic. For a recognisable app, supply screenshots via `ui.src` (window/phone) or `image` with `radius`.
- **Typed text inside a `ui` phone** is a fixed ~3.7% of frame width with fixed padding, so it does not scale with the phone's `w`: on a phone narrower than ~25% of the frame, long words clip. Leave the phone's `text` empty and put a `text` layer (higher `z`) over the screen, as in the example.
- **Streaming text inside a window body** (code logs scrolling): not built in. Use `typewriter` with `mono`, or a custom component.
