# Series kits

A kit is the fixed part of a channel's look, copied into every episode's spec:
- `palette`
- `finish`
- `animFps`
- `overlay` (series badge or logo)
- the CTA scene
- the signature transitions (as a note)

Create one per channel: `<channel>.json`, containing a partial VideoSpec. Merge it into each new episode spec.

Example skeleton:
```json
{
  "palette": {"bg": "#101010", "ink": "#ffffff", "accent": "#e8301c", "accent2": "#2bd96b", "paper": "#efe9dc"},
  "finish": {"grain": 0.07, "vignette": 0.35, "halftone": 0.12},
  "animFps": 15,
  "overlay": [{"type": "badge", "text": "MIND TRICKS · EP", "variant": "pill", "x": 80, "y": 5, "size": 2.8, "color": "#e8301c", "anim": "pop"}],
  "_signature": "zoom (momentum) ×4–6, invert on the turn, circle into the CTA",
  "_cta": {"background": {"kind": "studio", "color": "#1a1a1a"}, "transition": {"type": "circle"}}
}
```
