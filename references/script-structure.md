# Script structure: from idea to clause sheet

How the 82 reference edits are written, and how to write an original script that maps onto the engine. Where a number comes from the transcripts (`analysis/vNN/summary.json`, Whisper word timings, 76 VO videos), it says "measured". Where it comes from the breakdowns, the evidence is given as video ids.

Read this before step 2 of the workflow (script and beat sheet). The output of this file is a **clause sheet**: one row per scene, with its words, prop, keyword, device, transition and SFX.

---

## 0. House rules (near-universal)

| # | Rule | Evidence |
|---|---|---|
| 1 | **VO starts on frame 0.** No intro, no logo, no silence. The first word lands at 0.0–0.1 s. | measured: 74/76 VO videos |
| 2 | **The first sentence is the hook and is 8–15 words long** (median 11). It ends at ~4.3 s (p25 2.5 s, p75 5.1 s). Its first 3 words must already carry the shock: a number, a famous name, "you", or a contradiction. | measured |
| 3 | **One clause = one scene = one visual idea.** A scene holds about 6 spoken words (p25 4.4, p75 7.9) and lasts ~2–2.8 s. The median sentence is 8 words / 2.8 s, so long sentences split into 2 scenes at the comma. | measured; it is the stated script→visual rule in most breakdowns |
| 4 | **Cut on the first syllable of the clause, not on the beat.** The first word of the new clause starts a median 0.02 s after the cut (IQR −0.05 to +0.09 s). 75% of cuts fall within 0.15 s of a word start. In the engine: `"start": {"word": "...", "offset": -0.1}`. | measured |
| 5 | **The noun becomes a literal prop; the claim or verb becomes type.** Only 1–3 words per clause get display type. | v05 v06 v10 v11 v13 v14 v15 v21 v25 v27 v37 v47 v53 … |
| 6 | **Abstract or pivot lines go on an empty card** (black, a flat colour, or blank paper) with one accent word. Concrete lines get a full set. This alternation is the rhythm. | v09 v10 v11 v15 v19 v29 v31 v34 v55 v56 v57 v64 v68 |
| 7 | **Numbers, dates and names get the biggest, most physical treatment** in the video (a counter, a stamp, a flip tile, a written date). | v05 v08 v14 v16 v20 v30 v31 v45 v53 |
| 8 | **A named principle or turn arrives at 16–40% of runtime**, never in the title card at 0 s. | v19 16%, v11 17%, v12 32%, v05 40% |
| 9 | **The moral is a two-line antithesis** ("X feels fake. / Y feels human.") on two cards with inverted palettes. | v05 v14 v20 v29 v37 v39 v77 |
| 10 | **CTA = the last 10–14% of runtime, at least 2.5 s, with the simplest composition** and a final hold of ≥1 s. | 76/82 have a CTA; v35 v36 v38 holds 1.0–1.2 s |
| 11 | **VO pauses are never empty.** The median longest gap is 0.67 s, and every gap ≥0.3 s carries a cut, a transition or a build. | measured; v07 v09 v26 v27 v39 v43 v47 v49 |

Flavours (optional, genre-specific) are in the templates below.

---

## 1. Narrative templates by genre

Beat starts and ends are % of runtime. Seconds are given for 20 / 30 / 45 / 60 s cuts. Word budgets assume the measured median of **2.6 words/s** (section 5). How often each genre occurs in the library:

| Genre | Count | Typical runtime | Videos |
|---|---|---|---|
| Story-explainer (history / case study / named principle) | 37 | 32–50 s | v05 v06 v09 v10 v11 v12 v14 v16 v17 v20 v22 v24 v25 v27 v29–v32 v34 v47 v50 v63 v64 v66 v68 v74 v76; news variant v08 v13 v15 v19 v21 v26 v44 v45 v56 v67 |
| Product / tool promo | 22 | 18–40 s | v01 v02 v03 v07 v18 v33 v35 v36 v38 v46 v49 v51 v52 v53 v55 v57 v58 v59 v65 v70 v71 v83 |
| Tutorial / process reel | 7 | 20–96 s | v60 v61 v62 v69; process reels v39 v48 v73 |
| Listicle | 1 pure + list sections in 9 more | 39 s | v77; list sections v03 v09 v15 v21 v34 v37 v54 v57 v62 |
| Lyric / music edit | 5 | 10–30 s | v23 v28; music-only v18 v33 v36 |
| Manifesto / motivational / opinion essay | 11 | 13–45 s | v04 v41 v42 v43 v54 v75 v78 v79 v80 v81 (v40 wrapper) |
| Comparison / antithesis | 3 pure + antithesis close in 7 more | 28–38 s | v37 v39 v82; closes v05 v14 v20 v29 v54 v64 v77 |

Music-only promos (v18 v33 v36) and v39 (antithesis told as a process reel) sit in two rows. Durations in the library: <20 s 10, 20–30 s 16, 30–40 s 30, 40–50 s 22, 50 s+ 4 (median 37 s).

### 1.1 Story-explainer: history → named principle → proof → moral → CTA

Built from v05 v06 v10 v11 v12 v14 v20 v76. The CTA is a near-constant 4.4–5.5 s in the 38–57 s references, so on 60 s cap it at ~6 s and give the rest to proof.

| Beat | % | 20 s | 30 s | 45 s | 60 s | What it does |
|---|---|---|---|---|---|---|
| Hook | 0–10 | 0–2.0 | 0–3.0 | 0–4.5 | 0–6.0 | Date or number + famous name + shock word ("In 1959, [brand] sold a small, ugly car…", v05). |
| History / setup | 10–33 | 2.0–6.6 | 3.0–9.9 | 4.5–14.8 | 6.0–19.8 | 2–4 story clauses. The odd move, the doubters, the result ("sales exploded"). |
| Named principle | 33–38 | 6.6–7.6 | 9.9–11.4 | 14.8–17.1 | 19.8–22.8 | One 1–2 s card: "This is the ___ effect." Delivered by a device (dialog, notification, title slam). |
| Mechanism / authority | 38–50 | 7.6–10.0 | 11.4–15.0 | 17.1–22.5 | 22.8–30.0 | Why it works: one research line or a 3-step chain (limited → valuable → urgent, v11). |
| Proof ×2 | 50–75 | 10.0–15.0 | 15.0–22.5 | 22.5–33.8 | 30.0–45.0 | Two (at 45 s+, three) modern examples, each faster than the last (v11: 2.1 s, 4.1 s, 4.2 s). |
| Moral | 75–88 | 15.0–17.6 | 22.5–26.4 | 33.8–39.6 | 45.0–52.8 | Antithesis pair or reframe. |
| CTA | 88–100 | 17.6–20.0 | 26.4–30.0 | 39.6–45.0 | 52.8–60.0 | Section 6. |

At 20 s: drop the mechanism and keep one proof. Word budget: 20 s ≈ 50 words, 30 s ≈ 78, 45 s ≈ 117, 60 s ≈ 155.

Variants:
- **Origin story** (v14 v22 v30 v34 v64 v68): hook → humble start → protagonist → inciting problem → bold move → payoff number → lesson (often a callback to the hook phrase) → CTA. The "named principle" slot becomes the payoff number.
- **News / mystery** (v08 v13 v19 v21 v67): shock claim → twist ("not by a competitor, by its own government") → background → collapse or "But there's a catch" (60–70%) → open question → CTA. It ends unresolved; the question *is* the moral (v19 v21 v26 v67).
- **Bookend**: the hook phrase returns as the last story line (v19 "by 2029", v22/v48 "one insult", v29 beauty → brain, v47 "those little black lines").

### 1.2 Product / tool promo

Built from v01 v03 v07 v35 v38 v53 v57.

| Beat | % | 20 s | 30 s | 45 s | 60 s | What it does |
|---|---|---|---|---|---|---|
| Hook | 0–12 | 0–2.4 | 0–3.6 | 0–5.4 | 0–7.2 | Either a pain call-out ("Stop doing X", "Still doing X?", v01 v03 v07) or the **result first**: the coveted output playing before any explanation (v38 v46 v49 v61). |
| Agitate | 12–28 | 2.4–5.6 | 3.6–8.4 | 5.4–12.6 | 7.2–16.8 | 2–3 pains, one prop each (countdown to 0, crossed-out list, clock, v03). |
| Reveal | 28–38 | 5.6–7.6 | 8.4–11.4 | 12.6–17.1 | 16.8–22.8 | Product name + one-line promise. Wordmark first, then the promise (v07). |
| Demo / how it works | 38–70 | 7.6–14.0 | 11.4–21.0 | 17.1–31.5 | 22.8–42.0 | 3 steps, each one visible state change (click → grid builds, v38). Prompt → result ping-pong for AI tools (v18 v58). |
| Proof + value bomb | 70–86 | 14.0–17.2 | 21.0–25.8 | 31.5–38.7 | 42.0–51.6 | Real output, numbers, "And the best part? It's free." (v38 v61 v65). |
| CTA | 86–100 | 17.2–20.0 | 25.8–30.0 | 38.7–45.0 | 51.6–60.0 | Comment-keyword or URL, shown as UI (section 6). |

Measured CTA length in 18–20 s promos: 2.3–3.8 s (v01 v03 v07 v38 v53).

### 1.3 Tutorial

Built from v60 v61 v62 v69. Tutorials speak fastest (measured median 3.0 words/s) and pause least (longest gap 0.49 s).

| Beat | % | 20 s | 30 s | 45 s | 60 s | What it does |
|---|---|---|---|---|---|---|
| Hook: the result | 0–10 | 0–2.0 | 0–3.0 | 0–4.5 | 0–6.0 | The finished effect plays. "This is how you make ___ in under a minute." |
| Promise | 10–18 | 2.0–3.6 | 3.0–5.4 | 4.5–8.1 | 6.0–10.8 | Technique name + ease claim + what you don't need ("no keyframes, no expressions", v69). |
| Steps | 18–80 | 3.6–16.0 | 5.4–24.0 | 8.1–36.0 | 10.8–48.0 | 3 steps at 20–30 s, 5–7 at 60 s. One step = one UI action, 3–7 s each. The camera lands on the control 0.3–0.6 s before it is named (v69). |
| Result replay | 80–88 | 16.0–17.6 | 24.0–26.4 | 36.0–39.6 | 48.0–52.8 | The finished effect again, full frame. |
| CTA | 88–100 | 17.6–20.0 | 26.4–30.0 | 39.6–45.0 | 52.8–60.0 | "Comment ___ for the files", or "Save this". |

A theory lesson (v62) swaps the steps for define → demonstrate ×3 → the common mistake → moral.

### 1.4 Listicle

Built from v77 (8 items), plus list sections in v03 v09 v15 v21 v34 v54.

| Beat | % | 20 s | 30 s | 45 s | 60 s | What it does |
|---|---|---|---|---|---|---|
| Hook | 0–8 | 0–1.6 | 0–2.4 | 0–3.6 | 0–4.8 | Frame and count, or authority ("[Expert] once said…", v77). |
| Items | 8–70 | 1.6–14.0 | 2.4–21.0 | 3.6–31.5 | 4.8–42.0 | One item = one container. Keep an **anchor word** that repeats ("Without…"). |
| The one thing | 70–80 | 14.0–16.0 | 21.0–24.0 | 31.5–36.0 | 42.0–48.0 | The payoff item, set huge. |
| Reframe | 80–88 | 16.0–17.6 | 24.0–26.4 | 36.0–39.6 | 48.0–52.8 | Triad ("That's not X. That's Y. That's Z.", v77). |
| CTA | 88–100 | 17.6–20.0 | 26.4–30.0 | 39.6–45.0 | 52.8–60.0 | |

Item timing: **1.0–1.5 s per item in a long list** (v77 1.3 s), **0.4–0.8 s per item in a burst montage** snapped to the beat (v21 0.4–0.7 s, v34 0.6 s, v54 0.8–1.5 s). Numbered benefits: 3 cards of ~1 s each (v03). Item count by length: 20 s → 3, 30 s → 5, 45 s → 7, 60 s → 8–10.

### 1.5 Lyric / music edit

Built from v23 v28 (sung) and v18 v33 v36 (music-only). The song is the script; on-screen words carry it.

| Beat | % | 20 s | 30 s | 45 s | 60 s | What it does |
|---|---|---|---|---|---|---|
| Hook line / first bar | 0–12 | 0–2.4 | 0–3.6 | 0–5.4 | 0–7.2 | A complete visual idea (a surreal portrait, a flash strobe) before 1 s. |
| Lines | 12–75 | 2.4–15.0 | 3.6–22.5 | 5.4–33.8 | 7.2–45.0 | **One lyric line = one colour world**, ~2–3 s per line (v23: 7 worlds in 14.7 s). Music-only: one scene = one bar (v36: 2.1 s at 112 BPM). |
| Payoff line / drop | 75–90 | 15.0–18.0 | 22.5–27.0 | 33.8–40.5 | 45.0–54.0 | The biggest word and the densest image. |
| End card | 90–100 | 18.0–20.0 | 27.0–30.0 | 40.5–45.0 | 54.0–60.0 | Still hold on the music tail (v18 1.5 s, v36 1.0 s). |

Lyric rules: sung elongations become repeated letters ("LESSOOOON", v28), repeated words become tiled walls (v28 "IT" ×60), and cuts snap to the beat even when that is 0.2–0.4 s after the sung word (v23). See `sound-design.md` §6.

### 1.6 Manifesto / motivational

Built from v04 v41 v78 v79 v81.

| Beat | % | 20 s | 30 s | 45 s | 60 s | What it does |
|---|---|---|---|---|---|---|
| Thesis / provocation | 0–8 | 0–1.6 | 0–2.4 | 0–3.6 | 0–4.8 | A reversal: "They copied you? Good." / "Pressure doesn't ruin you, it reveals you." |
| Negation list | 8–25 | 1.6–5.0 | 2.4–7.5 | 3.6–11.2 | 4.8–15.0 | "Not your logo. Not your colours. Not your product." (v81), or "Let them…" ×3 (v04). |
| Turn / redefinition | 25–40 | 5.0–8.0 | 7.5–12.0 | 11.2–18.0 | 15.0–24.0 | "So what?" → what it really is. |
| Evidence | 40–58 | 8.0–11.6 | 12.0–17.4 | 18.0–26.1 | 24.0–34.8 | One case or intimate proof (the 2 AM idea, a customer telling friends). Often real footage. |
| Advice / chant triad | 58–78 | 11.6–15.6 | 17.4–23.4 | 26.1–35.1 | 34.8–46.8 | Three parallel lines with an accelerating rhythm. |
| Maxim | 78–87 | 15.6–17.4 | 23.4–26.1 | 35.1–39.1 | 46.8–52.2 | Restates the thesis as a bookend. |
| CTA | 87–100 | 17.4–20.0 | 26.1–30.0 | 39.1–45.0 | 52.2–60.0 | |

Manifestos read faster than stories (measured median 2.9 words/s, net 3.5) in short declaratives, and get the most UI-as-script scenes (v04 v75 v79 v80 v81).

### 1.7 Comparison / antithesis

Built from v82 (5 pairs), v37 v39 (assets → weaknesses → counter-list → flip), v29 (beauty vs brain).

| Beat | % | 20 s | 30 s | 45 s | 60 s | What it does |
|---|---|---|---|---|---|---|
| Hook frames the pair | 0–8 | 0–1.6 | 0–2.4 | 0–3.6 | 0–4.8 | "Here's the difference between A and B." / "Why being A is better than being B." |
| Define A, then B | 8–16 | 1.6–3.2 | 2.4–4.8 | 3.6–7.2 | 4.8–9.6 | One word each, each in its own world. |
| Alternating pairs ×3–5 | 16–64 | 3.2–12.8 | 4.8–19.2 | 7.2–28.8 | 9.6–38.4 | ~1.8 s per side (v82: 5 pairs in 18 s). Side A and side B keep fixed looks and alternate light/dark. |
| The flip | 64–78 | 12.8–15.6 | 19.2–23.4 | 28.8–35.1 | 38.4–46.8 | "A fights the darkness. B became it." (v37). |
| Moral | 78–88 | 15.6–17.6 | 23.4–26.4 | 35.1–39.6 | 46.8–52.8 | |
| CTA | 88–100 | 17.6–20.0 | 26.4–30.0 | 39.6–45.0 | 52.8–60.0 | |

Pair count by length: 20 s → 2–3, 30 s → 3–4, 45 s → 5, 60 s → 6.

---

## 2. Hook mechanics catalogue (0–1.5 s)

### 2.1 The verbal hook (first sentence), 75 non-lyric VO videos

| Type | Count | Pattern | Examples |
|---|---|---|---|
| Number / date lead | 14 | the first 1–3 words are a year, an amount or a count | v05 v06 v08 v14 v15 v16 v17 v20 v22 v24 v30 v31 v48 v53 |
| "You / your" claim or scenario | 11 | the viewer is the subject: "Your brain has a glitch." / "You walk into a…" | v11 v12 v25 v47 v58 v59 v61 v62 v75 v76 v81 |
| Contradiction / reversal | 10 | "X doesn't ruin you, it reveals you." / "Most come from labs. This one…" | v04 v29 v41 v42 v43 v55 v64 v66 v71 v78 |
| Famous brand, person or IP in the first 3 words | 10 | a recognisable name plus an unexpected verb | v09 v10 v13 v26 v34 v44 v45 v52 v68 v77 |
| Question / "What if" | 8 | the line ends on "?" and the image half-answers it | v03 v27 v37 v39 v50 v54 v57 v80 |
| Result-pointing | 6 | "You see this…? It was made with…" / "This is how you make this" | v38 v46 v49 v51 v60 v69 |
| Shock news / stakes | 5 | death, ban, collapse or obsolescence in sentence 1 | v19 v21 v56 v63 v67 |
| Curiosity promise | 4 | "Here's a fact no one tells you" / "a rule every ___ needs to know" | v02 v74 v79 v82 |
| First-person discovery | 3 | "I found / I barely see people talk about…" | v35 v65 v83 |
| Imperative call-out | 2 | "Stop doing X." | v01 v07 |
| "Before X, there was Y" | 1 (+3 brand leads) | time contrast | v32 (v26 v34 v68) |
| Pain statement | 1 | "Doing X alone is a lonely road." | v70 |

Stack two types where you can: a number plus a brand (v05 v24), a brand plus "you" (v47), a contradiction plus a date (v30 "invented in 1851. Nobody cared for 70 years.").

### 2.2 The visual hook (what moves before 1.5 s)

Counts are keyword-tagged from the breakdowns' "hook mechanics" notes, so treat them as lower bounds. Most hooks combine 3–4 of these; "three or more distinct visual events before 1.5 s" is the norm.

| Mechanic | Count | What happens, with numbers | Examples | Engine |
|---|---|---|---|---|
| A prop arrives on the first noun | ≥37 | pop, drop, slam, rise or fly-in on the spoken word; lands within 4–9 frames | v05 v11 v13 v15 v32 v53 v67 v68 | `image` `anim: pop/drop/rise/stamp`, `at: {word}` |
| The camera is already moving on frame 1 | ≥29 | the push or pull is at peak speed on frame 1 and decays ×0.8–0.85 per frame over 9–20 frames | v04 v08 v12 v16 v39 v44 v63 v77 | `camera.settle` 1.15–1.25, `drift` |
| Type writes on the first word | ≥25 | typewriter with a coloured caret, per-letter assembly, or word-by-word blur-in, locked to the VO | v07 v27 v33 v52 v57 v74 | `text` `anim: typewriter/letters/focus`, `sync: true` |
| Quiet → loud contrast | ≥19 | 0.5–1.4 s of near-black with small type (≈30–36% width), then a hard cut or burn into a dense, bright collage | v07 v27 v29 v33 v57 v74 | scene 1 `background: void`, scene 2 `transition: burn/flash` |
| Flash / strobe | ≥17 | 4–10 frames alternating white or inverted frames before the first word lands | v18 v35 v45 v61 v65 | `transition: strobe/flash/invert` |
| Famous logo, face or IP | ≥13 | recognisable in <0.3 s | v08 v13 v44 v58 v60 v77 | user-supplied `image` only |
| Familiar UI | ≥11 | a tweet, a desktop dock, a search list, a notification | v58 v77 v81 v82 | `ui` |
| Visual pun before the line is parsed | ≥9 | the image acts out the sentence: a computer hanging from a noose for "obsolete" (v19), a coffin growing behind the living subject on "died" (v67), a tractor planted in frame 1 before "tractors" is said (v22) | v11 v19 v22 v29 v55 v64 v66 v67 | `image` + `swap`, `shape` |
| Rapid product swap | 2 | the hero object swaps colourway every 4 frames (0.27 s) for ~1 s | v25 v36 | `image.cycle: {srcs, every: 4}` |

Measured: the first detected cut comes at a median 1.67 s (p25 0.47 s). Plan 1–3 scenes inside the first sentence: the hook line is often split into 3 one-second fragments, each with its own visual (v17 "20 billion. / On the table. / He said no.").

**Hook checklist:** frame 0 is a finished composition, not an empty background. Something is moving on frame 1. The first noun gets a physical object by 0.5 s. The key word is on screen by 1.0 s. There is a luma or colour jump before 1.5 s.

---

## 3. Clause → scene mapping

### 3.1 Splitting the script

1. Split at every full stop. Then split any sentence longer than ~10 words or ~3 s at its comma or conjunction ("but", "and", "because", "until").
2. Target **6 ± 2 words and 1.5–3 s per scene** (measured median 6 words per shot). Scenes under 1.0 s are for list bursts and hook fragments only; scenes over 4 s need an in-shot event every ~0.7 s (v13: a pan, swap, light sweep or write-on on every named noun).
3. Mark each clause with a **register**: *claim/story* (concrete), *pivot/abstraction*, *proof*, *list*, *moral*, or *CTA*. The register picks the treatment:

| Register | Treatment | Frequency / evidence | Engine |
|---|---|---|---|
| Claim / story (concrete noun) | Full set: background + hero prop + keyword type, often behind the prop | every story explainer | `background` (paper, wood, image…), `image cutout`, `text z` below the prop |
| Pivot / abstraction ("And somehow…", "It's science.", "But there's a catch.") | Empty card: black, flat colour or blank paper, centred type, one accent word | ≥13 videos (v09 v10 v11 v15 v19 v29 v31 v34 v56 v57 v64 v68 v55) | `background: void/solid/paper`, `text accent`, `transition: cut/black` |
| Proof | Real artefact: footage, real UI, newspaper clipping, chart made of objects | v09 v13 v14 v16 v24 v27 v31 v68 | `video card`, `ui`, `chart`, `image print` |
| List | Props that land on their word, OR one canvas the camera pans across, OR one figure that morphs | v15 v37 (props), v09 v32 (canvas), v32 (morph) | `image at: {word}`; `camera.pan`; `image.swap` |
| Moral / antithesis | Two cards, same layout, inverted palettes | v14 v20 v05 | two scenes, swap `bg`/`ink` |
| Emotional reset ("Most people would've quit.") | No image at all; small type on empty paper | v29 v31 | `background: paper`, `text style: serif-italic size 6–10` |

4. Alternate dense and empty. After 2–3 busy scenes, give one empty card (v29 v31 v76). A video with no empty card feels like a slideshow.

### 3.2 Picking the set for a clause

- **One world per sentence**: change the background material and hue on every sentence (v08: 22 backgrounds in 47 s). Pick the world by literal association with the key noun (v78: "world" → a globe, "remember" → astronauts, "sells shoes" → a notification).
- **The interface that would carry the sentence** (UI-manifesto style, 10+ videos: v04 v75 v76 v79 v80 v81): a personal truth → a text thread, a blunt verdict → an AI chat reply, a principle → a lock-screen notification, a lesson → a Notes page, a named rule → a dialog box. The UI then *performs* the words (typing, sending, highlighting). Engine: `ui kind: chat|notification|dialog|prompt|search|tweet`.
- **Several actors → one set and one text device each** (v20: a tweet card, a game-console LCD, a cassette label, a gilded frame), so the viewer tracks who is who by look alone.
- **A reversal reuses the same set with a new grade** instead of a new location (v26 sepia triumph → cold blue backlash; v17 drain to B/W on the refusal). Engine: `grade.drainAt`, `grade.tint`.
- **Verbs become actions**: walking, a fist bang, a door rolling up (v22), hands drilling a bone (v64), a cursor dragging the "friction" tag away (v80).

### 3.3 Choosing the literal prop

Work through these in order and stop at the first one that reads in under a second:

1. **The pun**: the object that *is* the sentence. "From zero" → a counter rolling down to 0 (v03). "Free food" → a cloche lift (v10). "Too dangerous to release" → a hatching egg (v21). "Punished" → a mousetrap (v21). "A bet" → a slot machine (v45). "Editing for money" → a cloche "serving" the editing apps (v53). "Drowning in pain" → a figure sinking underwater (v66). "Prison + toothbrush" → a toothbrush stabbed into the title like a shiv (v64).
2. **Two literal nouns fused into one surreal image**: HQ standing on the globe for "most valuable on earth", glowing eyes for "he could see" (v17).
3. **Data as a physical object**, not a chart: a report card for revenue (v14), a chart whose points are the product bottles (v25), a split-flap counter for an age (v14), a bag of cash for "$46 billion" (v10), a building full of cash for "revenue" (v45).
4. **The period-correct device** for the era: a retro computer for "the future of computing" (v19), a typewriter for 1890s facts (v30), an old phone for nostalgia (v81).
5. **Emoji rebus** for sensitive or hard-to-show consequences (v71: baby, money with wings, angry face).

**Object-as-letter** (3 videos, 5 instances): replace a letter of the keyword with an object that means the word. Eggs as the O's in FOOD (v10), a logo as the "I" in AI and a lightbulb as the "i" in "think" (v59), a prohibition sign as the "o" in "not" or "doesn't" (v59 v81). Engine gap: there is no glyph-replacement option, so place an `image` over a space in the word manually (`text` with a gap + `image w≈size×0.6` at the letter's x), or build a custom component.

**Symbol motifs**: one recurring object carries the idea through every scene, reinvented per set.
- A hero prop travels through 10 worlds (v12 popcorn bucket and price tag; v50 the painting).
- One symbol is reinvented per scene (v21: an asterisk becomes an idol, a chick, a porthole, bait and a chip).
- One accent-coloured object morphs footage → caret → square → timeline clip (v55).
- A recurring UI actor applies the result in every scene (v36: cursor + file badge).
- A recalled prop closes the loop before the CTA (v64 Polaroid; v29 the glamour still, now in colour).

Rule: **plant the payoff in the hook.** Put the object of the final punchline in frame 1 before it is mentioned (v22).

### 3.4 Prop timing

- Props land **on their spoken word ±0.15 s** (v37 v35 v15). List items land frame-accurately on their nouns (v15).
- The scene cuts in 0.05–0.15 s **before** the clause. Containers (badges, dialog boxes) pop just before the phrase and fill word by word 0.1–0.2 s after each word (v44).
- Engine: `"at": {"word": "cheese"}` on the prop; `"start": {"word": "One", "offset": -0.1}` on the scene.

---

## 4. Picking keywords for on-screen type

### 4.1 Which words

| Priority | Word class | Treatment | Evidence |
|---|---|---|---|
| 1 | Numbers, dates, money | the largest type in the video (2× its neighbours), a counter, a flip tile or a stamp, plus a hand-drawn ellipse | v08 v14 v19 v24 v31 v73 |
| 2 | The claim verb or verdict phrase | hero type: "IT DOESN'T SELL", "HE SAID NO", "They WON" | v13 v17 v24 |
| 3 | The named principle / product name | title slam or a device (dialog, notification, label) | v05 v11 v19 v76 |
| 4 | Negation words | a black label bar, an X, a strike-through or a prohibition sign | v06 v07 v27 v81 |
| 5 | List nouns | one word per item, each on its own prop or tile | v09 v15 v37 v54 |
| 6 | Emotional words | a separate voice: script, serif italic or handwriting | v13 v65 v74 |
| — | Connectors ("and", "the", "that was") | small lead-in type at 1/2.5–1/8 of the keyword size, or nothing | v34 (1:2.5), v54 (8:1), v62 |

Limits: **≤3 display words per clause** (v01 v25 v47 v68) and **≤4 words readable at once** (v33). Some edits ration type to 3 phrases in the whole video, which makes each hit harder (v37 v39).

### 4.2 Two-tier text system (6 videos: v08 v13 v14 v16 v25 v45)

A constant, small subtitle track carries the full VO for comprehension, and the hero keyword carries emotion. The pill switches on the word; the hero type lands ~0.3 s later (v08 v13 v14 v16 v25 v45). Engine: `captions: {enabled: true, style: "pill", y: 74–76, maxWords: 3–4}` plus `text` keyword layers.

Single-tier alternatives: only the words being spoken, word-synced (v24 v31 v74; `text anim: words, sync: true`), or the UI is the caption (v46 v79: the spoken sentence types into the product's input box).

### 4.3 Verbatim or paraphrase

- **Verbatim** for promos and UI-typed lines (v07 v61). The type is the VO.
- **Paraphrase** is allowed for hero type in explainers (v03 v08), but keep the spoken keyword inside it so sync still works.

### 4.4 Emphasis inside a phrase

Use one device per keyword and never the same twice in a row (v76): an accent colour on the payoff word (`accent: [...]`), a size jump of 1.8–2.5× (v34 v74), a marker ellipse or underline (`shape ellipse/underline`, draws in 4–8 frames, v25), a colour leading edge on typed text (`typewriter leadColor`, v07 v35), or a key word that is red only while new, then turns black (v59). For brand voice, keep one accent hue on the words the brand owns (v57).

---

## 5. VO style and words per second

Measured over 76 VO videos (Whisper word timings):

| Metric | p25 | Median | p75 | Range |
|---|---|---|---|---|
| Words/s over the whole VO (pauses included) | 2.39 | **2.61** | 2.94 | 2.02–3.62 |
| Words/s while talking (pauses ≥0.3 s removed) | 2.84 | **3.10** | 3.45 | 2.49–3.98 |
| Pauses ≥0.3 s per video | 8 | 10 | 13 | 1–20 (≈2.9 per 10 s) |
| Longest single pause | 0.58 s | 0.67 s | 0.84 s | 0.36–3.2 s |
| Silence after the last word | 0.27 s | 0.39 s | 0.59 s | music-only CTA tails 1.5–6.3 s (v14 v16 v37 v39 v41 v71) |

By genre (median words/s, whole VO / while talking): story explainers 2.56 / 2.86, news 2.46 / 2.85, promos 2.74 / 3.41, manifestos and antithesis 2.92 / 3.51, tutorials 3.01 / 3.42.

**Word budget = runtime × 2.6** for a calm documentary read, **× 2.9** for a punchy promo or manifesto, **× 3.2** max for a tutorial. Subtract 0.4 s for the tail. A 30 s script is 70–85 words, not 120.

Delivery: 50 of 76 narrators are described as calm, measured or deliberate, 20 as fast or punchy, 13 as first-person creator voices. A **calm voice over a busy picture** is the dominant premium register (v75: "the gap between high visual energy and a quiet voice is the hook"). Fast reads (≥3.3 words/s: v38 v49 v65 v69 v83) are for promos and tutorials only.

Writing for the voice:
- Short declaratives. Median sentence 8 words; quarter of sentences ≤5 words. One-word sentences ("Good." "Why?" "Speed.") get a 0.3–0.5 s pause before them (v04 v62).
- Put the pause before the turn: "But it gets crazier." / "What changed?" / "And the strangest part?" (v24 v56 v64). This is where a type-only card goes.
- Slow down for the title drop or the moral: ~1 s gaps between words (v16 "This… is… the…"); one word at a time for the moral (v63).
- For AI or prompt demos, leave 1.1–2.0 s VO gaps while results play (v58). The VO never describes the result; the picture proves it.

---

## 6. CTA patterns (generic, brand-neutral)

Frequency: comment-a-keyword ~30/82, URL / site / search bar ~42/82, vote or participation 4/82 (v40–v43), slogan + logo or no CTA ~6/82 (v07 v23 v71 v73 v74 v75).

| Pattern | Structure | Visual | Evidence |
|---|---|---|---|
| Audience call-out + offer + place | "[Audience], [what they get] at [place]." | phone, tablet or laptop mockup with the site, URL in a pill or typed into a search bar | most story explainers |
| Comment-keyword | "Comment [WORD] and we'll send you [thing]." | an on-screen comment field typing the keyword, then an auto-reply bubble | v57 v82 v83 |
| Bridge line | one sentence that links the story's theme to the offer ("[Topic] moves fast. So does [offer].") | the same set as the story | v45 v64 v66 |
| Cliff-hanger route | ask the open question, then point to where the answer or the method lives | the keyhole / question card, then the product | v67 v19 |
| Scarcity before the ask | "It's new. The first ___ are still to come." | calendar, a "1ST" outline | v70 |
| Participation | "Comment 1, 2 or 3 to vote." | a persistent vote bar for 100% of runtime | v40–v43 |
| Slogan close | two short lines on black, then the wordmark; no ask | type only | v07 v71 |
| Music-only CTA | VO ends; end card holds on the music | URL card, 4.8–6.3 s | v14 v16 v37 v39 |

Rules:
1. **Length:** 2.3–3.8 s in a 20 s video, 4.4–5.5 s in a 40–50 s video. Never over 6 s (v60's 9 s CTA is the outlier).
2. **The simplest composition in the video:** one object, one line of type, one accent colour. Calm the motion: cream or black ground, slow pull-back (v45 v44).
3. **Hold the final frame ≥1.0–1.2 s** so it can be read and screenshotted (v35 v36 v38).
4. **Keep the CTA in-world** where possible: the story's desk, book or wall carries the phone or URL (v08 v12 v24 v30).
5. **Demonstrate the action** (the comment typed, the search typed and clicked) rather than only saying it (v05 v57 v63).
6. Write your own wording from the user's offer. Do not reuse any reference creator's CTA lines, keyword, URL, mascot or end-card layout.

Engine: a final scene with `ui kind: search|chat|button`, `text` 1–2 lines, `background: solid/paper`, `transition: flash-ramp` or `burn` into it (v65 v77), `duration` = CTA seconds; the spec `duration` default (last word + 0.6 s) is too short for a hold, so set it explicitly.

---

## 7. Writing tips for original scripts

1. **Write the hook last.** First find the single most surprising fact, number or contradiction in the material, then move it to word 1–3.
2. **Every sentence must be picturable.** If a clause has no noun you can show, either make it a pivot card (and keep it ≤6 words) or rewrite it around a concrete noun.
3. **Name things.** Dates, places, amounts, named people and named principles outperform generic claims. Check facts; the reference library ships visible typos and they read as amateur (v16 v54 v62).
4. **One idea per sentence, 8 words median.** Read it aloud at 2.6 words/s with a stopwatch.
5. **Use the turn word.** "But", "Until", "Here's the catch", "What changed?" at 55–70% of runtime resets attention.
6. **Close with an antithesis or a callback.** Two parallel lines with one word swapped, or the hook phrase returning.
7. **Lists of three, each faster than the last.**
8. **Don't explain what the picture shows.** In demos, let the result play in a VO gap.
9. **Write the clause sheet as you write the script** (template below). If a row has no prop, the line is not ready.

### Clause-sheet template

| # | Time (s) | VO clause | Register | Set / background | Literal prop or device | Keyword type | Transition in | SFX |
|---|---|---|---|---|---|---|---|---|

---

## 8. Worked examples (original topics)

All brand names below are invented placeholders. Each script was timed against the measured reading rates in §5.

### Example A: story-explainer, 30 s, "The open loop"

**Script (77 words, 2.6 words/s)**
> In the 1920s, a Berlin waiter remembered every unpaid order. The moment a bill was paid, he forgot it completely. A young psychologist tested it. This is the Zeigarnik effect. Unfinished tasks stay stuck in your head. Finished ones get deleted. It's why a cliffhanger keeps you watching, and why a half-full progress bar makes you finish the form. Your brain hates an open loop. So don't close every loop. Leave one open. Follow for part two.

**Clause sheet**

| # | Time | VO clause | Register | Set | Prop / device | Keyword type | In | SFX |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.0–1.5 | In the 1920s, | hook | `paper` sepia street print | `counter` 1900 → 1920, `suffix: "s"`, `mode: flip` | 1920s (the counter is the type) | (open) `settle: 1.2` | flip ticks |
| 2 | 1.5–3.8 | a Berlin waiter remembered every unpaid order. | story | `wood` café table, warm `gobo` | waiter cut-out; 5 order slips orbit his head, entering on "every" | UNPAID ORDER on a `badge tape`, `at: {word: "unpaid"}` | `whip-left` | paper flutter |
| 3 | 3.8–6.4 | The moment a bill was paid, he forgot it completely. | story | same table | slip `swap` to a PAID stamp on "paid"; slips vanish on "forgot" | FORGOT | `cut` | stamp thud, then a soft whoosh out |
| 4 | 6.4–7.9 | A young psychologist tested it. | story | `grid` notebook | `ui window` styled as a notebook page, `typewriter` | TESTED (`marker`) | `focus` | typing ticks |
| 5 | 7.9–10.0 | This is the Zeigarnik effect. | named principle | `void` | `ui notification`, title "New insight", text "Zeigarnik effect" | ZEIGARNIK EFFECT, `slam`, `size 14`, extrude | `zoom` | impact + short riser into it |
| 6 | 10.0–12.6 | Unfinished tasks stay stuck in your head. | mechanism | `solid` mustard | head silhouette covered in sticky notes (3 depths, blurred copies) | STUCK, sticky-note yellow | `cut` | 3 soft pops |
| 7 | 12.6–14.2 | Finished ones get deleted. | mechanism (antithesis half) | `solid` white | `ui dialog` "Move to Trash?" + `cursor` click on "deleted" | DELETED, `strike` via `shape cross` | `invert` | click + whoosh |
| 8 | 14.2–16.9 | It's why a cliffhanger keeps you watching, | proof 1 | `studio` dark | a TV (`embed` or `image`) showing a tiny figure hanging off a cliff edge | CLIFFHANGER | `whip-right` | whoosh |
| 9 | 16.9–20.7 | and why a half-full progress bar makes you finish the form. | proof 2 | `dots` light | `ui progress value 50`, then `cursor` click; the bar fills to 100 on "finish" | FINISH, green | `cut` | UI click, tick per step |
| 10 | 20.7–23.0 | Your brain hates an open loop. | moral setup | `void` | `shape ellipse` that draws 85% and stops (`draw` 8 frames), around the word LOOP | OPEN LOOP | `black` | silence 0.3 s, then a low hit |
| 11 | 23.0–24.6 | So don't close every loop. | moral A | `solid` black, ink white | the same open ellipse | DON'T CLOSE | `cut` | none |
| 12 | 24.6–26.4 | Leave one open. | moral B (inverted palette) | `solid` white, ink black | the ellipse, still open | LEAVE ONE OPEN, `accent: ["open"]` | `invert` | impact |
| 13 | 26.4–30.0 | Follow for part two. | CTA | `paper` | the open ellipse becomes an arrow (`shape arrow`) pointing at "PART 2" | PART 2 → | `flash-ramp` | soft whoosh, then music only for the 1.2 s hold |

**Visual idea per clause (why each prop):** 1, the date is an event, not a caption. 2, "remembered every" = slips orbiting the head. 3, "paid" is acted out by a stamp, and "forgot" is the slips disappearing. 4, "tested" = a lab notebook. 5, the principle is *delivered* as a notification. 6, "stuck" is literal (sticky notes). 7, "deleted" uses the most familiar delete gesture. 8, the pun: a cliff-hanger is a person hanging off a cliff. 9, the proof the viewer has felt themselves. 10–12, the **symbol motif**: one unclosed circle carries the moral and the CTA, so the video itself ends on an open loop.

### Example B: product promo, 20 s, fictional focus app "Hush"

**Script (48 words, 2.4 words/s overall, with the CTA hold)**
> Your phone buzzed. Again. Every ping steals your focus, and getting it back takes forever. Meet Hush. One tap starts a focus block. Hush holds every notification and delivers them when you're done. Two hours. Zero pings. And it's free to start. Try Hush today. Link in bio.

**Clause sheet**

| # | Time | VO clause | Register | Set | Prop / device | Keyword type | In | SFX |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.0–1.0 | Your phone buzzed. | hook (pain) | `void` | `ui phone`; 4 `ui notification` cards stack in, every 4 frames, from frame 1 | none | (open) `camera.shake` small | 4 notification dings |
| 2 | 1.0–1.6 | Again. | hook | same, pushed in | 6 more notifications burst | AGAIN, `slam`, red | `zoom` | impact |
| 3 | 1.6–3.6 | Every ping steals your focus, | agitate | `solid` grey | a focus meter (`ui progress`) drains 80 → 20 on "steals" | FOCUS | `cut` | descending tick |
| 4 | 3.6–5.6 | and getting it back takes forever. | agitate | `paper` | a clock whose hands spin fast (`custom` or `image spin-in`) | FOREVER, `ghost` | `whip-down` | clock ticks |
| 5 | 5.6–6.8 | Meet Hush. | reveal | `mesh` calm blue | wordmark `text` + `shape burst` | HUSH | `flash-ramp` | riser 0.3 s into the flash, then a soft sting |
| 6 | 6.8–8.6 | One tap starts a focus block. | demo 1 | `studio` | `ui button` "Start focus" + `cursor` click on "tap" | ONE TAP | `cut` | UI click |
| 7 | 8.6–10.6 | Hush holds every notification | demo 2 | same, reframed (`camera.pan`) | notifications fly into a drawer that closes on "holds" | HOLDS | `slide` | swoosh ×3 + drawer thunk |
| 8 | 10.6–12.8 | and delivers them when you're done. | demo 3 | same | the drawer opens; one tidy summary card slides out | WHEN YOU'RE DONE | `cut` | soft pop |
| 9 | 12.8–14.8 | Two hours. Zero pings. | proof | `void` | `counter` 0:00 → 2:00, `mode: flip`; then a `counter` 0 for pings | ZERO PINGS | `invert` | flip ticks, then silence 0.2 s |
| 10 | 14.8–16.4 | And it's free to start. | value bomb | `solid` brand green | price tag `badge stitched` | FREE | `zoom` | impact |
| 11 | 16.4–20.0 | Try Hush today. Link in bio. | CTA | `paper` | phone mockup with the app; `ui button` "Try free"; hold the last 1.2 s | TRY HUSH | `cut` | soft whoosh, then music tail |

**Visual idea per clause:** the pain is shown as noise (stacked notifications) and the product as silence (one card), so the before/after reads with no words. Clause 7's drawer is the pun for "holds". The counter in 9 makes the claim an event. The CTA is the quietest frame in the video.

### Example C: comparison / antithesis, 30 s, "Busy vs. productive"

**Script (61 words, 2.0 words/s overall: a deliberate read with 0.3–0.5 s pauses between halves, at the slow end of the measured 2.02–3.62 range)**
> Busy and productive look the same from the outside. Busy answers every message. Productive answers the right one. Busy starts ten things. Productive finishes three. Busy measures hours. Productive measures results. Busy says yes to everything. Productive says no, kindly. Here's the flip. Busy feels like progress. Productive is progress. Pick one task today and finish it. Save this for Monday.

**World rules:** BUSY = a cluttered warm world (`background: stripes` orange/red, `animFps: 12`, 5–8 layers, `camera.shake 0.3`, `style: impact`). PRODUCTIVE = a calm white world (`background: solid #f4f2ee`, `animFps: 0`, one object, `style: serif-italic`). Every half alternates, so each cut is also a luma flip.

| # | Time | VO clause | Register | Set | Prop / device | Keyword type | In | SFX |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.0–3.6 | Busy and productive look the same from the outside. | hook | split frame: both worlds side by side behind one office window | two identical desks; the left one jitters | BUSY · PRODUCTIVE | (open) `settle: 1.2` | none; the music starts on frame 0 |
| 2 | 3.6–5.2 | Busy answers every message. | A1 | busy | `ui chat` with 8 messages flooding in | EVERY | `cut` | message pops, rapid |
| 3 | 5.2–6.8 | Productive answers the right one. | B1 | calm | `ui chat` with one message, one reply | THE RIGHT ONE | `cut` | one soft click |
| 4 | 6.8–8.2 | Busy starts ten things. | A2 | busy | 10 progress bars all at 10% | TEN | `whip-up` | whoosh |
| 5 | 8.2–9.6 | Productive finishes three. | B2 | calm | 3 bars fill to 100 with `shape check` marks | THREE | `cut` | 3 ticks |
| 6 | 9.6–11.0 | Busy measures hours. | A3 | busy | a `counter` of hours racing up | HOURS | `whip-up` | clock ticks |
| 7 | 11.0–12.4 | Productive measures results. | B3 | calm | a `chart bar` drawing on | RESULTS | `cut` | soft riser |
| 8 | 12.4–14.2 | Busy says yes to everything. | A4 | busy | a stamp YES hits 6 papers | YES, stamp | `whip-up` | 6 stamp thuds |
| 9 | 14.2–16.2 | Productive says no, kindly. | B4 | calm | one paper; a hand slides it back | NO, KINDLY | `cut` | paper slide |
| 10 | 16.2–17.6 | Here's the flip. | turn | `void` | none | THE FLIP | `spin` | silence 0.4 s before, then an impact |
| 11 | 17.6–19.6 | Busy feels like progress. | flip A | busy, desaturated (`grade.drainAt`) | a treadmill (or a running figure going nowhere) | FEELS LIKE | `cut` | whoosh, looping |
| 12 | 19.6–21.6 | Productive is progress. | flip B | calm | one staircase step, the figure steps up | IS | `cut` | single hit |
| 13 | 21.6–25.4 | Pick one task today and finish it. | moral | `paper` | a to-do list; one item gets a `shape check` on "finish" | ONE TASK | `focus` | pen tick |
| 14 | 25.4–30.0 | Save this for Monday. | CTA | calm | a bookmark icon (`ui button`) pressed by a `cursor`; hold 1.2 s | SAVE THIS | `flash-ramp` | click, then music tail |

**Visual idea per clause:** the comparison is carried by the world, not the words, so a viewer with the sound off can still follow it. Clauses 11–12 are the pun pair (a treadmill vs. a step). The flip card (10) is the only empty frame, which is why it hits.

---

## 9. Engine gaps found while writing this

| Technique | Frequency | Status / how to build |
|---|---|---|
| Object-as-letter (an icon replaces a glyph) | 3 videos (v10 v59 v81) | **OPEN.** No glyph-replacement option. Place an `image` in a gap of the `text` manually, or add a `text.glyphs: [{index, src}]` option that measures the letter box and swaps it. |
| Two-tier text with the hero keyword trailing the pill by ~0.3 s | 6 videos (v08 v13 v14 v16 v25 v45) | **PARTIAL.** Possible with `captions` + `text` `at: {word, offset: 0.3}`, but there is no paraphrase-aware sync. Write the hero text with the spoken keyword inside it. |
| Ghost pre-show of the next line (~30% opacity, then solid on its word) | v42 v02 | **PARTIAL.** `anim: ghost` covers single lines; a `preview` opacity before `at` would generalise it. |
| Same set regraded for a reversal | v26 v17 | **PARTIAL.** `grade.drainAt` covers drain to B/W; a new scene with a different `grade.tint` and `transition: dissolve` gives a soft regrade. There is no timed tint change mid-scene (`grade.tintAt`). |
| Sung-syllable stretch (repeated letters that scroll) | v28 | **OPEN.** Needs a custom component, or `text` + `camera.pan` across a long repeated word. |
