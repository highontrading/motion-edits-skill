# The playbook: what makes it look high-end

These rules are distilled from frame-level analysis of 82 professional edits. Each rule has numbers and an engine setting, and links to the deep-dive doc. Read this every time. Read the deep dives when a decision needs more than the rule.

> Evidence key: "41/82" = the share of reference videos that do it. `vNN` = a reference breakdown in `breakdowns/`.

---

## 1. Story and script ([script-structure.md](script-structure.md))
1. **VO starts on frame 0.** The first sentence is the hook: 8–15 words, ending by ~4.3 s. Its first three words carry the shock: a number, a famous name, "you", or a contradiction.
2. **One clause = one scene = one visual idea**, about 6 spoken words or 2–2.8 s. Split long sentences at the comma.
3. **The noun becomes a literal prop; the claim becomes type.** Only 1–3 words per clause get display type.
4. **Abstract or pivot lines go on an empty card** (void, a flat colour or blank paper, one accent word). Concrete lines get a full set. Alternating the two creates the rhythm.
5. **Numbers, dates and names get the biggest, most physical treatment**: a counter, a stamp, a flip tile or a handwritten date.
6. **Named principle or turn at 16–40% of runtime.** The moral is a two-line antithesis on inverted palettes. The CTA takes the last 10–14% (≥2.5 s) and is the simplest composition in the video.
7. **No dead air.** Every pause of 0.3 s or more carries a cut, a build or an SFX.

## 2. Timing and sync ([motion-language.md](motion-language.md) §7–8)
| Rule | Number | Engine |
|---|---|---|
| Cut on the first syllable of the clause | median −0.04 s (−0.10…+0.05) | `start: {word, offset: -0.04}`; use −0.12 when the shot needs to settle first |
| Hero keyword appears on its word | 0…+0.1 s | `sync: true` |
| Connector/echo text trails | +0.2…+0.4 s | later `at` |
| VO is the clock; the beat is secondary | snap only if a beat is within ±0.1 s | `snap: "beat"` |
| No VO → the music is the clock | scene = 1 bar, slams on onsets | `beats`, `{downbeat: n}`, `{onset: n}` |
| Cut rate | median 0.43 cuts/s, shots ~2 s, **a visual event every 0.3–0.6 s** | layer `at`s, `punch`, `pan` |
| Pace curve | fast hook (0.6–1.5 s shots) → steady body → one montage burst (0.1–0.7 s shots) → slow moral → CTA held 3–6 s | scene `duration`s |

## 3. Motion ([motion-language.md](motion-language.md))
1. **Entrances decay; they don't ease in.** Peak speed on frame 1–2, then keep r ≈ 0.86 of the speed each frame (UI snaps 0.55–0.75, documentary 0.90–0.95). This is the engine default.
2. **Exits ramp into the cut** (×1.33/frame over ~8 frames), and the cut lands on the fastest, blurriest frame. Use `zoom`, `whip-*`, `spin` or `camera.exit`.
3. **The camera never overshoots.** Only small props bounce, by 4–10% (`anim: "pop"`, `"swing"`).
4. **Every shot arrives already moving**: settle from about 1.10 scale. This is the default; keep it.
5. **Nothing is fully still** except deliberate breaths. Drift is about 0.03–0.06 per scene.
6. **Step the animation for collage, paper and diorama looks** (`animFps: 15`, or 12 for rougher print). Keep UI, 3D and cinematic looks smooth (`0`). Footage, typing and cursors in stepped scenes can be `smooth: true`.

## 4. Transitions ([transitions.md](transitions.md))
1. **The hard cut is the backbone**: about 40% of all joins. It has to land on a word or a beat, and the incoming shot settles.
2. **Pick one signature transition per video and repeat it** (3–10×). It carries a quarter to a half of the non-cut joins, and every other effect is used once or twice. Keep 2–4 types per video in total.
3. **Keep them short**: effect transitions 6–12 frames, flashes 1–3 frames.
4. **Blur only around peak velocity.**
5. **Sound sells it**: a whoosh peaks on every motion cut, an impact lands under every flash or invert.

| Tone | Signature family |
|---|---|
| Collage explainer, energetic | `zoom` (momentum) + settle, `invert` accents |
| Cinematic or documentary, calm | `focus` cuts, `black` dips, `burn` light leaks |
| UI / SaaS promo | `shrink` nested reveals, punch-ins, `pixel`, `wash` |
| Lyric / poster kinetic | `strobe`, `wipe`, `glitch` |
| Diorama / one-world 3D | `zoom` with `target` + `peak` 3–6 (zoom-through), camera `pan` |
| Halftone poster | plain cuts with a ≥60° hue jump or a light/dark flip |

## 5. Type ([typography-color.md](typography-color.md))
1. **Only the keyword becomes type** (1–3 words, word-synced). Full narration only goes in a separate `captions` layer, and only deliberately.
2. **Big and heavy keyword, small and light connector**, in one lockup. Size ratios run 2–3× (typical) up to 5–10× (hero). Use `lineSizes` or separate layers.
3. **One emphasis device per line**: colour **or** size **or** a drawn mark **or** a container.
4. **Type lives in the scene.** Put it behind the hero object (cut-out at a higher `z`, or a footage matte), on props or UI, or on labels and badges. Avoid floating stickers over everything.
5. **Keyword size is 12–30% of frame width** in the display face (`impact`, `bebas`, `grotesk`, `geometric`). Editorial pieces use `serif-italic` or `didone` at a smaller size.
6. **Safe zones (9:16):** important type between y 12% and 78%. Subtitles at y 68–76%. Nothing below ~82%.
7. **Proofread every string.** Giant type magnifies typos.

## 6. Colour and finish ([typography-color.md](typography-color.md) §5–6)
1. **Per scene: one dominant field + one neutral + one accent.** Never two saturated accents in one frame.
2. **The accent keeps its meaning all video**: red = problem/negation, green = win/money, yellow or gold = "the thing", orange = reveal.
3. **New background with every clause** in collage/explainer mode. Never the same field colour twice in a row, and flip between light and dark often.
4. **One finishing pass over everything**: grain (72/82) + vignette (71/82), plus halftone for print looks (48/82). This is what welds stock, AI stills, UI and footage into one world.
5. **Grade is a story tool**: drain to B/W on a negative beat (`grade.drainAt`), use selective colour for "the one that matters", B/W for the past and colour for the present.

## 7. Sound ([sound-design.md](sound-design.md))
1. **A music bed runs under the whole video**, about 12 dB under the VO (`musicVolume` ≈ 0.3, `duckTo` ≈ 0.12), with no audible pumping.
2. **Every visual hit gets a sound**: whoosh on motion cuts, impact on slams, click on cursor clicks, ticks under typing, pop on stickers. These come from the user or a licensed library only.
3. **Hold the end card on the music tail** for ≥1 s after the last word.

## 8. Footage ([footage-editing.md](footage-editing.md))
1. **Tighten first** (`tools/tighten.py`): no pause longer than ~0.35 s.
2. **Punch-ins in three sizes**: bump ×1.06–1.12 over 4 frames on stressed words, reframe jumps ×1.15–1.4 on a new sentence, detail crops ×1.8–2.2.
3. **Alternate footage with graphics scenes**: a graphics card on every abstract line, footage for proof and emotion.
4. **Unify sources** with one grade and finish. Put B-roll in cards (`video` with `w`, `card`, `aspect`) on textured backgrounds.
5. **Text behind the subject** with `tools/matte.py`. Use captions (`bold` or `karaoke`) when the speaker is on camera.

## 9. The pre-delivery checklist
- [ ] The hook lands in the first 1.5 s: something moves, plus a number, a name or a contradiction.
- [ ] Every scene has a new background or set **and** a new focal object.
- [ ] Cuts sit on clause starts (check the cut strips against the transcript).
- [ ] One signature transition, repeated; at most 4 transition types in total.
- [ ] Keywords only, word-synced, inside safe zones, readable for ≥0.5 s, spelled correctly.
- [ ] One accent per scene with a fixed meaning.
- [ ] Grain and vignette on; halftone if it's a print look.
- [ ] No still stretch over 1.5 s without an event (except the CTA hold).
- [ ] The CTA is the simplest frame and is held ≥1 s at the end.
- [ ] Audio: VO clean, music bed under it, SFX on the hits, no clipping.
- [ ] Rendered, reviewed with `tools/review_render.py`, fixed, and re-rendered.
