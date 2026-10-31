# Style families

All 82 reference videos are assigned to **12 reusable style families**, one primary family per video. Each family has a playbook in this folder covering: look, palette recipes (hex + roles), type system (engine `style` names), motion signature (animFps, settle, cut mix), devices, a 30–45 s skeleton, an example VideoSpec, do/don't, and engine gaps.

**Pick one family per video as its backbone.** Borrow devices from at most one or two others (see §4).

Cut-mix percentages in the playbooks come from classifying the "into next" column of every shot table in the breakdowns (1,321 transitions). Shot lengths, fps and palettes come from the breakdown headers and colour sections.

---

## 1. The families

| family | one-line look | best for | energy (1–5) | reference videos | animFps |
|---|---|---|---|---|---|
| [halftone-poster-collage](halftone-poster-collage.md) | One flat-colour poster per clause: a cut-out hero prop over a heavy caps keyword, with halftone + grain and black statement cards | brand/marketing psychology, business "why X works", news explainers; faceless explainer channels | **4** (shots ≈2.0 s) | v05 v06 v09 v10 v11 v12 v16 v17 v21 v22 v53 v70 (12) | **12** |
| [tabletop-flatlay-collage](tabletop-flatlay-collage.md) | A physical set per sentence (grid paper, desk, felt, cork). Text is typed onto props; a constant subtitle pill; marker annotations | finance/tech news, history of an object or company, data-heavy explainers, myth-busting | **3** (shots 2.1–4.2 s, an event every ~0.7 s) | v08 v13 v14 v15 v19 v20 v25 v27 v30 v62 (10) | **15** (12 for sepia archive) |
| [stage-diorama-theatre](stage-diorama-theatre.md) | Layered theatre stages (curtains, plinths, tarot, paintings) under a spotlight, with one continuous zoom chain; type is rationed | character/rivalry comparisons, history and legend, art history, philosophical micro-essays | **3** | v32 v37 v44 v50 v66 (5) | **15** (10–12 parchment) |
| [mono-accent-documentary](mono-accent-documentary.md) | A B/W (or single-hue) world with one accent colour for the thing that matters; small italic-serif captions; zoom-settled stills | founder biographies, persistence stories, prestige business history, essays | **2** | v24 v26 v29 v31 v54 v73 (6) | **12** |
| [ai-cinematic-recap](ai-cinematic-recap.md) | Photoreal AI plates cut like a trailer, alternating warm and cool; graphics pinned into the world; print-evidence interludes | true-crime/mystery, movie trivia, origin stories, history with drama, news recaps | **4** | v34 v45 v47 v56 v63 v64 v67 v68 (8) | **0** (15 for evidence/tabletop scenes) |
| [dark-product-promo](dark-product-promo.md) | Near-black void, colour only as light (glow, rim, caret); small type typing on; prompt → result; calm/burst rhythm | SaaS/AI tool launches, dev tools, template/plugin stores; 16:9 YouTube/X/LinkedIn | **3** | v01 v02 v07 v18 v33 v38 v57 v83 (8) | **0** (fps 24–30) |
| [keynote-clean-type](keynote-clean-type.md) | White canvases, one quiet typeface, 60–80% empty space, one travelling accent; all the energy in 1–5-frame transitions | a single feature, conceptual product promos, spec ads, PSAs | **3** | v03 v49 v55 v59 v61 v71 (6) | **0** |
| [floating-ui-demo](floating-ui-demo.md) | Sharp UI cards on blurred dreamy wallpapers, one virtual camera reframing, always typing, pixel dissolve on "send" | AI-agent and app walkthroughs, sponsored tool demos, prompt-to-result proof | **2** | v35 v46 v51 v52 v58 (5) | **0** |
| [native-ui-explainer](native-ui-explainer.md) | Each sentence inside the UI that would carry it (chat, notification, notes, tweet); light/dark flips; one brand accent; footage payoff | founder/creator advice, branding and marketing lessons, listicles, personal brand | **4** (shots 1.5–2.4 s) | v04 v74 v75 v76 v77 v78 v79 v80 v81 v82 (10) | **0** (15 for a poster/lesson section) |
| [lyric-beat-collage](lyric-beat-collage.md) | One colour world per lyric line or bar; a giant integrated keyword; on twos; flashes on the beat | lyric edits, music teasers, hype edits, short preset/showreel ads with no VO | **5** (shots 1.05–2.0 s) | v23 v28 v36 (3) | **15** |
| [process-breakdown](process-breakdown.md) | Finished piece + its ingredients: an assets column, a live preview, the timeline; or UI sticker cards on a cutting mat with a glowing cursor | tutorials, course and template promos, "how I made this", plugin walkthroughs | **2** | v39 v48 v60 v65 v69 (5) | **15** (0 for UI walkthroughs) |
| [showcase-frame-poster](showcase-frame-poster.md) | A static print poster (cream paper, giant condensed headline, vote bar) framing 1–3 small moving windows | contests/UGC voting, comparisons, portfolio "exhibits", episodic series | **1** shell (the inner clip carries the energy) | v40 v41 v42 v43 (4) | **0** (shell) |

**Formats:** 9:16 is the default for every family except dark-product-promo, keynote-clean-type and floating-ui-demo (most refs 16:9), lyric-beat-collage (1:1) and showcase-frame-poster (3:4).

### What every family shares (house rules)
These are near-universal; details are in `../playbook.md`.
- **Scene-open settle** on almost every cut (`camera.settle` 1.03–1.16). Only the size and decay change per family.
- **Cut on the first syllable of the clause** (lead 0–0.15 s). Keywords land on their word. Music-led edits cut on the beat instead.
- **One accent with a fixed meaning** per video (or per entry).
- **A finishing pass** (grain at minimum) that welds mixed sources into one medium.
- **No crossfades.** Every family moves through cuts, zooms, whips, flashes or in-camera wipes.

---

## 2. How to choose

### Step 1: what drives the timing?
| situation | go to |
|---|---|
| No voice-over; the music is the script (a lyric, hype or showreel ad) | **lyric-beat-collage** |
| You are wrapping someone else's finished clip (contest, UGC, portfolio exhibit, side-by-side comparison) | **showcase-frame-poster**, with the clip inside |
| VO-led | continue to step 2 |

### Step 2: what is the video *for*?
| goal | sub-question | family |
|---|---|---|
| **Sell software / a digital product** | premium, mysterious, dev or creator tool; dark brand | dark-product-promo |
| | one feature or one idea, Apple-calm, light brand | keynote-clean-type |
| | an AI agent or app doing a multi-step task (prompt → result) | floating-ui-demo |
| | the product *is* craft (templates, presets, plugins, courses) | process-breakdown |
| **Explain an idea** (psychology, business, marketing, science) | loud, fast, many brands/props, one principle | halftone-poster-collage |
| | many facts, numbers, documents, a timeline | tabletop-flatlay-collage |
| | advice or a lesson that lives on the phone (messages, notes, social) | native-ui-explainer |
| | two characters/sides, a fable, art or philosophy | stage-diorama-theatre |
| **Tell a story about a person or event** | calm, prestige, a moral; one protagonist | mono-accent-documentary |
| | dramatic, mysterious, "you won't believe"; needs many locations | ai-cinematic-recap |

### Step 3: sanity-check against assets, tone and platform
| if you have… | prefer | avoid |
|---|---|---|
| **No assets at all** | keynote-clean-type, native-ui-explainer, dark-product-promo (all asset-free in the engine) | collage families (they need cut-out photos) |
| Product/brand photos and cut-outs | halftone-poster, tabletop, stage-diorama | — |
| AI-generated stills | ai-cinematic-recap, mono-accent-documentary, stage-diorama | keynote (it is too clean for stills) |
| User footage (talking head, B-roll) | mono-accent (B/W grade + accent), native-ui (footage payoff), ai-cinematic (footage for "today") | showcase as the main body |
| Real product UI captures | floating-ui-demo, dark-product-promo, process-breakdown | collage (use only inside retro device frames) |

| tone | families (calm → loud) |
|---|---|
| calm / prestige | showcase (1) → mono-accent, floating-ui, process (2) |
| confident / premium | dark-promo, keynote, tabletop, stage-diorama (3) |
| punchy / viral | halftone-poster, native-ui, ai-cinematic (4) → lyric-beat (5) |

Topic → family shortcuts: **finance news** → tabletop · **brand psychology** → halftone-poster · **founder story** → mono-accent · **scandal/true crime** → ai-cinematic · **AI tool** → floating-ui or dark-promo · **creator advice** → native-ui · **art/history legend** → stage-diorama · **tutorial** → process-breakdown.

---

## 3. Energy dial (applies inside any family)
| lever | calmer | punchier | evidence |
|---|---|---|---|
| Average shot | 2.5–4 s with internal events | 1.0–1.8 s | L 1.05–2.0 s vs I 1.5–4.7 s |
| `animFps` | 0 (smooth) | 12 (rough stop-motion) | A at 12, D at 12 but slow, F/H/I at 0 |
| Settle | `settle` 1.03, `settleR` 0.75 (snappy, small) or 1.15/0.9 (floaty) | `settle` 1.12–1.15, `settleR` 0.78 | |
| Cut mix | plain cuts + `focus` + reframes | `zoom`, `whip-*`, `flash`, `invert` ≥30% | D 60% cuts / 10% focus vs E 15% flash + 14% whip |
| Luma | steady | alternate light/dark every cut | J, H, v53 |
| Type | small, sentence case, blur-in | giant caps, `slam`, extrude | H vs A |

---

## 4. Making variations and mixing families

### Re-skin one family (variations)
Keep the family's **grammar** (scene unit, type pairing, cut mix, settle) and change only:
1. **Palette, role for role**: swap hexes but keep the roles (`bg` field, `ink`, one meaning-bearing `accent`, an optional `accent2`). Example: the halftone poster's red = negative / green = money becomes gold = gains / plum = risk for a finance channel.
2. **Materials and worlds**: choose sets from the topic (gym rubber + chalkboard for fitness, ledger paper + felt for finance, a lab bench for health). Every reference's §9 variation list does exactly this.
3. **Per-entry accent swap** for series: a fixed layout with one accent per episode (showcase v41 orange → v42 teal).
4. **Aspect**: 16:9 → 9:16 means stacking lines at 60–70% width, multiplying text `size` by ~1.8, and moving content into y 12–78%. 9:16 → 1:1 means keeping the centre stage and cutting edge clutter.
5. **Energy**: use the dial in §3 without changing family.

### Mix families (proven combinations from the library)
Rule: **one backbone family carries ≥70% of the runtime.** A borrowed family enters only at a **chapter boundary** and is announced by a **texture gear change**: an `animFps` switch, a `letterbox` change, a grade drain, or a light ↔ dark flip. Keep these invariant across the mix: the caption system, the accent's meaning, and the finish.

| backbone | + borrowed | where it enters | evidence |
|---|---|---|---|
| halftone-poster-collage | black statement cards + real footage burst (from ai-cinematic) | footage = "proof", cut on the beat, desaturated | v09 v11 v13 v16 |
| stage-diorama-theatre | ai-cinematic (dark photoreal) | exactly on the story's "But…"; the switch *is* the plot point | v44 |
| native-ui-explainer | halftone poster / film-frame posters | the lesson section, stepped to 15 fps with grain | v77 v78 |
| ai-cinematic-recap | tabletop evidence desk | evidence interludes (newspapers, case files), 15 fps | v63 v67 v47 |
| mono-accent-documentary | process-breakdown opener | the first 6–8 s show the editor build, then the story | v73 |
| any family | process-breakdown frame | wrap the finished edit with assets + timeline for a craft-proof cut | v39 v48 |
| any family | showcase-frame-poster shell | as a static exhibit or contest entry | v41 v42 v43 |
| keynote-clean-type | dark-product-promo | alternate white ↔ black worlds as the rhythm | v61 v71 |
| floating-ui-demo | footage (human moment) | the single emotional word | v52 |
| any VO family | collage-language CTA | the CTA built from the same props and sets, never a flat template card | v08 v12 v30 |

Avoid: mixing two loud families evenly (halftone + lyric at 50/50 reads as a template sampler); changing the accent meaning between sections; putting keynote-clean white type over a halftone collage world.

---

## 5. Engine gaps found while writing these playbooks
| technique | where (refs) | status / how to build |
|---|---|---|
| Shape layers (ellipse, rect, line, burst…) render blank | every family | **Bug:** in test stills and a 15-frame mp4 (engine at 06:44), no shape drew. The likely cause is that `DrawPath` (layers/Shape.tsx) never gets a measured box from `useLayoutEffect` + `offsetWidth`. Fix: compute the box from the layer's `w`/`h` instead. |
| Beat-anchored scenes make a 1-second video | music-led (L), beat-locked CTAs | **Bug:** `specDurationInFrames` runs before `setBeats`. Workaround: set top-level `duration`. |
| Tracked / corner-pinned graphics on photos and footage | v56 v45 v11 v16 v73 | `tilt` gives static perspective only. Needs a `quad` corner-pin + keyframed position. |
| Selective colour / text-behind-subject inside one image or clip | v24 v26 v31 v73 v74 v77 | Needs a matte. Supply a cut-out (`tools/cutout.py`) or add `image.mask`. |
| 3D hero objects, one-world CG camera | v01 v02 v38 v83 | A custom three.js component or a user render. |
| Pixel-materialise text, weight-morph, colour-sweep fill, marquee | v68 v70 v57 v71 v78 | New text anims: `pixel`, `weight`, `sweep`, `marquee`. |
| Liquid/shape morph objects between scenes, ink morph of a figure | v55 v71 v32 | A custom SVG-morph component. |
| NLE timeline strip with a playhead | v48 v39 v73 v18 | `ui.kind: "timeline"`. |
| Glass (backdrop-blur), rim-lit, curved UI | v33 v35 v49 v57 | `ui.glass`, `ui.rim`, `ui.curve`. |
| Text on a path, smear frames, layout-collapse physics | v23 v28 | Custom components. |
| Per-scene caption colour | v08 v13 v14 | `scene.captions` override. |
