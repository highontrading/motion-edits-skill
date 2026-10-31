# vNN — <short descriptive title>

**Source creator handle:** <from filename> · **Format:** <W×H, aspect, fps, duration> · **Shots:** <n> · **Avg shot:** <s> · **Music BPM:** <bpm or n/a> · **VO:** <yes/no, language>

**Style tags:** <comma list from the controlled vocabulary in _TAXONOMY.md, plus new ones if needed>

**One-line essence:** <what makes this look high-end, in one sentence>

## 1. Concept & script structure
- Topic / genre (explainer, brand story, tutorial promo, ad, listicle, motivational…)
- Narrative beats: hook (0–3s) → setup → turn → payoff → CTA. Give timestamps.
- Hook mechanics: exactly what happens in the first 1.5s to stop the scroll.
- Script → visual mapping rule (e.g. "every VO clause gets its own visual; keywords become on-screen type").

## 2. Visual language
- **Art direction:** (collage / flat vector / 3D / UI mockup / footage-led / kinetic type / mixed) and the reasoning.
- **Backgrounds & textures:** paper, grain, halftone, grids, gradients, footage; how they change between scenes.
- **Colour:** dominant palette with hex (use summary.json palettes + your eye), accent colour rules, contrast strategy, grading.
- **Typography:** typefaces (describe class: heavy grotesk, condensed, serif, script, mono; name the likely font if recognisable), weights, case, size relative to frame width, tracking, colour, stroke/shadow/3D extrude, label/badge treatments, emphasis rules (which words get highlighted and how).
- **Layout & composition:** safe zones, where text sits, centre vs. thirds, scale of hero element, negative space.
- **Assets:** cut-out photos, stock footage, icons, 3D renders, UI screenshots, logos, hand-drawn doodles, stickers, cursors.
- **Finishing / FX:** grain, chromatic aberration, glow, motion blur, drop shadows, depth of field, vignettes, light leaks, scan lines, paper tears.

## 3. Shot-by-shot timeline
Table, one row per shot (merge false cuts flagged by the detector; split missed ones). Use real times.

| # | In–Out (s) | Dur | VO / on-screen text | What we see | Motion (what moves, how, easing, duration) | Into next (transition) |
|---|---|---|---|---|---|---|

## 4. Motion & timing analysis
- **Pacing:** cuts/sec, typical shot length, how pace changes across the video.
- **Easing signatures:** (e.g. "fast ease-out entrances ~6–8 frames with slight overshoot; exits are hard cuts"). Use the per-frame motion data/curve to back this up.
- **Entrance / exit vocab:** list each type seen with frame counts (pop-scale, slide+blur, mask wipe, typewriter, per-letter stagger, scale-from-0 with overshoot, stamp, drop-in w/ bounce…).
- **Camera:** constant slow push-ins? parallax layers? shakes? whip pans? 3D orbits? Quantify from net_zoom / pan.
- **Secondary motion:** idle wiggle, floating, flicker, stop-motion frame-rate (on 2s/3s), cursor movements.
- **Sync:** how cuts & hits align to VO words and music beats/onsets (give offsets, e.g. "cut lands ~0.15s before the phrase starts").

## 5. Transitions catalogue
For each distinct transition type: name, where (timestamps), frame-by-frame description from the cut sheets, duration in frames, how to rebuild.

## 6. Sound design
Music character, SFX (whooshes, clicks, pops, typing, risers, impacts), ducking under VO, silence moments.

## 7. What makes it high-end (the transferable lessons)
5–10 bullet rules a motion designer could apply to a completely different topic.

## 8. Remotion rebuild recipe
- Composition settings (size, fps, duration).
- Layer stack per typical scene.
- Key components needed (name them generically, e.g. `<LabelBadge>`, `<CutoutPopIn>`, `<TypewriterCaption>`, `<GrainOverlay>`), with props & timing values (frames, spring configs `{damping, stiffness, mass}` or bezier curves).
- Any tricky effect and how to achieve it in Remotion/CSS/SVG/Three.js.

## 9. Variation ideas
3 ways to reuse this style for different topics/channels (e.g. finance explainer, SaaS promo, fitness tip), and what you'd change.
