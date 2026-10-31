# Sound design: music, VO balance, SFX, silence and sync

What the 82 reference edits do with sound, and how to set it in the engine. Read it together with `script-structure.md` (VO pacing) and `transitions.md` (what the SFX sit on).

**Read the evidence carefully.** No stems were available. The data is:
- the tempo, beat grid, **strong onsets** and mean RMS that librosa extracted from each finished mix (`analysis/vNN/summary.json`), and
- Whisper word timings for the VO.

"SFX" below means a strong onset that coincides with a visual event (a cut, slam, pop or click) within ±0.1 s, read as a designed hit by the breakdown author. Counts say how many breakdowns describe that SFX type; they are evidence of the *pattern*, not proof of the exact sample used. "Measured" marks numbers computed from the data.

---

## 0. House rules

| # | Rule | Evidence |
|---|---|---|
| 1 | **A music bed runs under the whole video**, from frame 0 to the last frame, including the CTA. It never stops for a "drop to silence". | 79/82 have a continuous bed; only v28 (CTA near-silent), v70 (bed stops at 34.1 s, outro on claps) and v71 (2 s fade with the picture) end it early |
| 2 | **The VO is the lead; the music sits ~12 dB under it** and is not audibly pumped. | v20 ("~12 dB under the VO", "no ducking pumping"); "music never competes" v31 v35 v58; "not ducked hard because it's already low" v69 |
| 3 | **Every visual hit gets a sound**: a whoosh on motion cuts, an impact on type slams, a click on cursor clicks, ticks under typing, pops on stickers. | whoosh-type SFX in 79/82 breakdowns, impacts in 72, clicks 47, typing 43, pops 41 |
| 4 | **VO pauses are filled with picture and SFX, not silence.** A pause carries a cut or a whoosh. | 33 breakdowns discuss silence and none has dead air; measured median longest pause only 0.67 s |
| 5 | **With VO, cut on the word, not on the beat.** Beat sync is a flavour layered on top. | measured: cuts land on a beat 33% of the time vs 28% by chance |
| 6 | **Without VO, the music is the clock**: scene = bar, slams = strong onsets. | v18 v33 v36 v23 v28 v73 |
| 7 | **Hold the end card on the music tail** for ≥1 s after the last word or hit. | measured median 0.39 s word→end, and 1.0–6.3 s music-only end holds in v14 v16 v18 v36 v37 v39 v41 v71 |

---

## 1. Music character and BPM

### 1.1 Character (keyword-tagged from the 82 breakdowns; one video can carry two tags)

| Character | Count | Typical use | Examples |
|---|---|---|---|
| Soft / airy / warm electronic, pads, light kick | 43 | the default bed for explainers and UI promos | v07 v20 v24 v35 v47 v55 v58 v59 v63 v79 |
| Driving / upbeat (trap, tech-house, bright pop) | 23 | product promos, contest promos, fast collage | v03 v04 v05 v18 v33 v36 v53 v60 |
| Dark / ominous cinematic pulse, sub hits | 13 | mystery, news, villain, critique | v17 v21 v37 v44 v50 v54 v56 v67 |
| Lo-fi / hip-hop | 13 | halftone collage explainers, community promos | v06 v08 v19 v62 v70 v80 |
| Piano / acoustic / plucked / orchestral | 8 | history, biography, "forgotten hero" | v20 v24 v30 v31 v63 v68 |
| Sung vocal (lyric edit) | 3 | lyric edits; the vocal is the script | v23 v28 (v73 one fragment) |

Rule: **pick the bed by the story's register, not by the topic.** History and biography go warm and acoustic. Mystery and critique go dark with a pulse. Product and contest promos go driving. Brand philosophy and manifestos go soft electronic with a steady kick. The music is deliberately flat: measured mean RMS sits in a narrow 0.103–0.155 band (median 0.129) across all 82 mixes, so no reference relies on a big musical drop.

### 1.2 BPM distribution (measured, librosa tempo)

| BPM band | Count | Videos |
|---|---|---|
| 60–79 | 1 | v23 (66; feels 133) |
| 80–89 | 5 | v09 v29 v34 v70 v78 (81; detected 161) |
| 90–99 | 9 | v14 v16 v17 v39 v43 v52 v62 v65 v69 |
| 100–109 | 12 | v11 v21 v26 v30 v31 v32 v35 v37 v44 v68 v71 v79 |
| 110–119 | 16 | v02 v12 v13 v15 v19 v20 v25 v36 v38 v53 v55 v58 v67 v74 v77 v83 |
| 120–129 | 14 | v07 v18 v24 v27 v41 v45 v46 v47 v56 v57 v63 v73 v76 v82 |
| 130–139 | 9 | v04 v05 v10 v42 v54 v59 v61 v66 v80 |
| 140–149 | 6 | v03 v08 v33 v40 v60 v64 |
| 150–159 | 7 | v06 v22 v48 v49 v50 v75 v81 |
| 160+ | 3 | v01 v28 v51 (all felt half-time, ~80) |

**Median 117.5 BPM; 70% of the library sits between 100 and 140.** By genre (median): story / history 112, news 117.5, VO promos 117.5, tutorials 118, music-only and lyric 123, manifestos 129.5. Half-time ambiguity is common: v01 v28 v51 v78 detect at ~161 but play as ~80, and v23 detects at 66 but plays as 133. Use `tools/beats.py` and sanity-check the beat by ear or against the visual rhythm; if scenes feel twice too long, halve the beat grid.

Defaults:
- calm documentary VO: **100–118 BPM**
- promo / manifesto: **120–140 BPM**
- music-only showreel: **112–144 BPM**, scenes on bars
- avoid sub-90 beds under VO unless the mood is grave (v09 v29 are the slow exceptions)

### 1.3 Beat math (for planning)

| BPM | Beat (s) | Beat in frames at 30 fps | at 24 fps | Bar of 4 (s) | 2 beats at 30 fps |
|---|---|---|---|---|---|
| 90 | 0.667 | 20.0 | 16.0 | 2.67 | 40.0 |
| 100 | 0.600 | 18.0 | 14.4 | 2.40 | 36.0 |
| 108 | 0.556 | 16.7 | 13.3 | 2.22 | 33.3 |
| 112 | 0.536 | 16.1 | 12.9 | 2.14 | 32.1 |
| 117.5 | 0.511 | 15.3 | 12.3 | 2.04 | 30.6 |
| 123 | 0.488 | 14.6 | 11.7 | 1.95 | 29.3 |
| 129 | 0.465 | 14.0 | 11.2 | 1.86 | 27.9 |
| 136 | 0.441 | 13.2 | 10.6 | 1.76 | 26.5 |
| 144 | 0.417 | 12.5 | 10.0 | 1.67 | 25.0 |
| 152 | 0.395 | 11.8 | 9.5 | 1.58 | 23.7 |

A median scene of ~2–2.8 s is roughly one bar at 100–120 BPM. That is why the references feel musical without being beat-locked.

---

## 2. VO / music balance and ducking

### 2.1 What the references do

- The bed sits **~12 dB under the VO** (v20) and is described as "never competing" (v31 v35 v58), "low", or "well under the VO" in most breakdowns. Only 6 breakdowns mention ducking at all (v17 v20 v24 v49 v69 v74), and those that do say it is **not audible**: the bed is mixed low enough that it barely needs to move.
- Some beds **thin out** (fewer onsets) under type-only or lesson sections instead of being turned down: v02 from 24 s, v75 after 36 s, v77 during the lesson. Some **get busier** under the CTA or title drop: v16 from 26 s, v34 at 31 s.
- VO is close-mic'd and dry (repeated across the promo breakdowns: "close-mic", "dry", "studio-dry").

### 2.2 Engine settings

```json
"audio": {
  "vo": "vo.mp3",
  "music": "bed.mp3",
  "musicVolume": 0.35,
  "duckTo": 0.18,
  "sfx": [{"src": "sfx/whoosh_soft.wav", "at": {"word": "Meet", "offset": -0.15}, "volume": 0.45}]
}
```

- `musicVolume` is the bed's gain when nobody speaks (default 0.35). Use 0.35–0.5 for music-only edits and VO-less CTA tails, depending on how loud the file is mastered.
- `duckTo` is the bed's gain while speaking. Target the bed at **−12 to −18 dB under the VO**: **0.18–0.25** for a quiet, sparse bed and **0.12–0.15** for a loud, dense or vocal-ish bed. Check by ear on a phone speaker. If you can follow the melody while the VO talks, it is too loud.
- How the engine ducks (from `SpecVideo.tsx`): words closer than 0.6 s are merged into one speech region, so the bed **holds down through short pauses**. Around each region the volume ramps linearly from `musicVolume` to `duckTo` over 0.13 s before the first word (~4 f attack) and back over 0.33 s after the last word (~10 f release). Only pauses ≥0.6 s let the bed swell; the references have about 10 pauses ≥0.3 s per video, and roughly a third of those are long enough to swell. That swell is the right direction (§4), but keep it gentle: **`musicVolume` at most ~2–2.5× `duckTo`** (e.g. 0.35 / 0.16), or pre-mix the bed low and leave `duckTo` unset, which is what the references sound like.
- Music fields: `musicStart` (seconds into the file, to start on a strong bar or skip an intro), `musicFadeOut` (fade over the last N seconds, default 0.6; set 0 when the track resolves on the end card by itself), and `musicLoop` (default `true`; set `false` when the track is long enough, so a seam can never land mid-scene). Start the bed on frame 0.

### 2.3 Mix order (loudest to quietest)

VO (reference 1.0) > impacts on slams and the principle card (0.5–0.7) > whooshes on motion cuts (0.35–0.5) > UI clicks, pops, dings (0.25–0.4) > typing ticks and clock ticks (0.15–0.3) > music bed under VO (≈0.18) > ambience (0.1). These are starting values for the engine's linear `volume` field; the engine default for an SFX is 0.8, which is too loud for anything but a hero impact.

---

## 3. The SFX vocabulary

Counts = breakdowns that describe the SFX type (from onset clusters on matching visual events).

| SFX | Count | Where it goes | Timing rule | Examples |
|---|---|---|---|---|
| **Whoosh / swoosh / swish** | 79 | motion cuts (zoom, whip, spin, zoom-through), camera whips, slide-ins, card shuffles | starts 0.1–0.25 s before the cut and peaks on the cut frame; length 0.3–0.6 s. Use one per motion cut, not per hard cut | v09 v12 v25 v27 v49 v57 |
| **Impact / hit / thud / slam / boom** | 72 | keyword slams, the named-principle card, big numbers, a cut to black, the CTA pivot, a prop landing | on the landing frame (±1 frame); a sub-drop for cuts to black or "the reveal" | v12 v13 v17 v20 v54 v66 |
| **UI / mouse click** | 47 | every cursor click, button press, toggle, send | on the click frame (when the cursor dips) | v33 v35 v38 v57 v58 v59 |
| **Typing / keyboard ticks** | 43 | every typewriter reveal, prompt box, search bar, URL in the CTA | one tick per character at the type rate (~10 chars/s in v30; dense key-click loops in v18) and stop exactly when the type stops | v06 v18 v29 v30 v63 v67 |
| **Pop** | 41 | stickers, badges, chat bubbles, icon pops, word-by-word builds | on each element's first frame; vary the pitch slightly across a run | v11 (4-hit dialog cluster) v53 v78 v79 |
| **Riser / swell / charge-up** | 34 | into a white flash, a title drop, a portal or a section change | ends on the flash or cut; v12's riser onset sits 0.26 s before the flash; 0.3–1.5 s long | v12 v24 v53 v54 v56 v61 |
| **Tick (clock, counter)** | 28 | counters, clocks, timers, flip tiles, list-item swaps | one per counter step or flip | v06 v17 v41 v42 v43 |
| **Paper: rustle, tear, slap, page flip** | 20 | collage props landing, torn reveals, newspapers, flip-books | on the landing or tear frame | v08 v19 v30 v31 v62 |
| **Ding / notification / chime / beep** | 16 | notifications, alerts, scanner beeps, a "solved" state | on the notification's arrival | v04 v47 v76 v79 |
| **Glitch / stutter / zap / buzz** | 16 | glitch, invert and strobe cuts; pixel dissolves; neon switch-on | for the length of the effect (2–6 frames) | v16 v18 v57 v58 v64 v68 |
| **Foley (object-specific)** | 15 | the topic's own sound: axe chop, boot stomp, zipper zip, shutter rattle, footsteps, claps, stone clack | on the physical action | v22 v30 v32 v64 v70 v75 |
| **Stamp** | 7 | stamped labels, DECLINED / BANNED / ZIP stamps | on contact | v15 v16 v30 v37 |
| **Shimmer / sparkle** | 7 | handwriting write-ons, logo glows, sparkles | under the write-on | v13 v14 v33 v68 |
| **Logo sting** | 7 | brand reveal, end card | on the logo's settle | v24 v25 v52 v58 |
| **Camera shutter** | 5 | invert or white strobes, Polaroid flashes, viewfinder UIs | on the flash frame | v56 v64 v81 |

### 3.1 Placement relative to cuts and type

- **Sound leads picture for motion, and lands with picture for contact.** Whooshes and risers start before the cut and peak on it; impacts, clicks, pops and stamps land on the exact frame the object makes contact or the word lands.
- **Not every cut gets an SFX.** Measured: only 25% of detected cuts sit within ±0.1 s of a strong onset, and strong onsets run at a median 0.77 per second, so roughly half of the designed hits sit on in-shot events (a prop landing, a word slam, a click) rather than on cuts. Rule: SFX on every *motion* cut (zoom, whip, spin, flash) and on every in-shot hero event; hard cuts between two sentences can ride on the VO alone.
- **Typing always has sound.** If a `text anim: typewriter`, `ui search` or `ui prompt` is on screen, a typing bed runs under it and stops with it.
- **Density:** about one designed hit every 1.0–1.5 s across the video (measured onset rate). The list section and the CTA are the densest (v77: dense in the list, almost dry in the lesson, dense again in the CTA). The emotional or reflective section is the quietest (v79: footage section with no extra hits).
- **Semantic SFX beat generic SFX**: a zipper zip on the "ZIP" stamp (v30), a scanner beep in a barcode story (v47), a shutter on a camera-UI strobe (v81), 8-bit blips in a pixel-art world (v70). Pick the sound of the topic's own verb, as you would for the transition (see `transitions.md`).
- **UI foley** for UI-mockup styles: keyboard clicks under typing, send/receive swooshes on chat bubbles, notification dings, mouse clicks on buttons (v76 v79 v80 v81).

### 3.2 Engine

Two places hold SFX:
- **Global `audio.sfx`**: `{src, at, volume}` with `at` as an absolute `TimeRef` (seconds or a word ref). It plays to the end of the file regardless of scenes.
- **Scene `sfx`**: `[{src, at, volume}]` with `at` relative to the scene start (default: the scene's first frame); a word ref resolves to the first match at or after the scene start. Scene SFX are mounted at the top level of the video, so a **negative `at` leads into the cut** (e.g. `"at": -0.2` for a whoosh that peaks on the scene's first frame) and **tails ring past the scene's end** into the next one.

So:
- use **scene `sfx`** for anything tied to a scene, including whoosh and riser lead-ins (negative `at`) and impact tails, so retiming the scene moves them;
- use **global `audio.sfx`** for sounds tied to the VO or the music rather than to a scene (a sub-drop on a word, a sting on a beat).

```json
"audio": {"sfx": [
  {"src": "sfx/whoosh_short.wav", "at": {"word": "This", "offset": -0.25}, "volume": 0.45}
]},
"scenes": [
  {"id": "principle", "start": {"word": "This", "offset": -0.1}, "transition": {"type": "zoom"},
   "sfx": [{"src": "sfx/impact_low.wav", "at": {"word": "Zeigarnik"}, "volume": 0.6}],
   "layers": [{"type": "text", "text": "ZEIGARNIK EFFECT", "anim": "slam", "at": {"word": "Zeigarnik"}}]}
]
```

**Sourcing:** the engine ships no audio. Every music and SFX file must come from the user or a library the user has a licence for (for example a royalty-free SFX pack or a production-music subscription). Never extract audio from the reference videos or any other creator's posts. If no licensed audio is available, render without it and give the user a cue sheet (time, SFX type, volume) so they can drop sounds in during their own edit.

---

## 4. Silence and drop moments

The references almost never go silent. The tools are short and deliberate:

| Device | Length | Where | Evidence |
|---|---|---|---|
| **Breath before the turn** | 0.3–1.0 s of no VO (music continues) | before "What changed?", "And the strangest part?", "But it gets crazier", a one-word line ("Speed.") | v24 (0.3 s before + 0.5 s after "What changed?"), v56 (~0.5 s), v62 (0.34 s), v64 (~0.3 s), v29 (0.6 s before the bookend) |
| **Deliberately slowed title drop** | ~1 s gaps between words | "This… is… the…" with a slow rotating hero object | v16 |
| **Result plays in a VO gap** | 1.1–2.0 s gaps | AI / prompt demos; the result shot plays with music + result SFX only | v58 (2.0, 1.1 and 1.5 s gaps) |
| **VO-less brand moment** | 3.4 s | a logo and tagline play on music alone before the end | v71 |
| **Dark single-word card** | 0.7–0.9 s | the music carries the breath, with a near-black card | v50 (18.0–18.7 s and 35.7–36.5 s) |
| **Music-only CTA** | 4.8–6.3 s | VO ends; the end card cuts on beats | v14 v16 v37 v39 |
| **Bed thins / dry close** | last 5–10 s | fewer onsets, so the close plays nearly dry under the VO | v02 v75 v77 |
| **Bed stops for the outro** | last 5 s | the music grid stops and claps + VO carry the CTA | v70 (only case) |
| **End on near-silence** | last 0.7–2 s | energy and motion fall to ~0 together | v28 v71 (2 s fade) v61 (0.7 s music-only hold) |

Rules:
1. **A silence is a picture event too.** Every VO gap ≥0.3 s gets a cut, a whoosh, a build or a breath card. Measured: 39% of detected cuts sit inside a VO pause of ≥0.2 s, and the rest land within 0.15 s of a word start.
2. **Silence is never total.** The bed keeps playing under every breath (no breakdown reports dead air). A true dead-air gap reads as a mistake on a phone.
3. **One designed breath per 30 s**, placed right before the turn or the moral. More than two and the pacing sags.
4. **A "drop" is an absence of hits, not of music**: strip the SFX and hold one still card for 0.5–1 s, then land the next line with the biggest impact in the video.
5. In the engine, a breath is simply a gap in the VO file. A gap of ≥0.6 s lets the ducker swell the bed (§2.2), which is the right direction; shorter gaps hold the bed down. Keep `musicVolume` close enough to `duckTo` that it sounds like a swell rather than a pump.

---

## 5. Beat-sync rules

### 5.1 With VO (76 videos)

Measured:
- Cuts land within ±0.07 s of a beat **33%** of the time, against **28%** expected by chance. Overall, the VO is the clock, not the music.
- The first word of the new clause starts a median **+0.02 s** after the cut (IQR −0.05 to +0.09 s; p10 −0.12, p90 +0.17).
- 14/76 VO edits are measurably beat-locked (≥20 points above chance): v17 v20 v24 v27 v30 v35 v50 v52 v53 v56 v62 v63 v67 v69.

Rules:
1. **Scene starts follow the VO**: `"start": {"word": "...", "offset": -0.1}`.
2. **Nudge onto the beat when it's free.** If a clause start is within ±0.1 s of a beat, move the cut onto the beat (v30: "pick cut points where a VO clause starts within ±0.1 s of a beat"; v66: lock hits to the word ±0.05 s and nudge them onto the beat where possible). Otherwise keep the word.
3. **Big events on beats, small type on the voice**: flashes, strobes and section pivots land on the beat or on a strong onset (±2 frames, v56 v63 v66); keywords trail the VO by 0.1–0.3 s.
4. **Montage and list bursts snap to the beat grid**, 0.4–1.0 s per item (v21 0.4–0.7 s, v44 ~1 s, v34 0.6 s). A burst can also shrink on the grid: v16's archival montage goes 1.3 s → 0.1 s.
5. **Hits land a hair after the beat for a human feel**: montage cuts 2–4 frames after the beat (v17), whips ending on the beat + 2 frames (v64).
6. **Switch the clock when the VO ends**: word-locked during VO, beat-locked (≤0.15 s early) for a music-only CTA (v39).
7. **Camera micro-impulses on beats** keep long UI holds alive: 10-frame zoom or pan bumps per beat (v80), 1-frame zoom pulses on onsets (v51).

### 5.2 Without VO (music-only and lyric)

1. **One scene = one bar** (v36: ~2.1 s at 112 BPM, with the "drop" mid-bar so every scene has a setup and a payoff). Short punchy scenes = 2 beats (v71: "scenes ≈ 2 beats long").
2. **Main cuts on beats, secondary reveals on off-beat eighths** (v33). Word builds tick on an eighth-note grid (v73: 6 frames at 24 fps, 123 BPM).
3. **Slams and flashes on strong onsets**, not just on the grid (v28, at 15 fps every hit within ±2 frames; v42 locks transitions to SFX onsets to the frame).
4. **Lyric edits: the beat beats the syllable.** Land the slam on the beat even if it is 0.2–0.4 s after the sung word (v23). Sustained notes become repeated letters while the camera scrolls (v28).
5. **Prompt → result as the beat unit** for tool promos: a typed prompt over 2–3 beats (~1–1.3 s), the send bloom on a beat, then a flash and the result (v18).

### 5.3 Engine workflow

```bash
python3 tools/beats.py remotion/public/bed.mp3 work/beats.json
# → {"tempo": 123.0, "beats": [...], "downbeats": [...], "onsets": [...], "duration": ...}
```
Copy the JSON under `remotion/public/` (or paste it inline) and set `"beats": "beats.json"` on the spec. Then:
- No VO: use `{"downbeat": n}` (bars) as scene `start` values and `{"onset": n}` / `{"beat": n}` (0-based, with optional `offset`) for `transition: flash/strobe/invert`, `camera.punch`, SFX and `text anim: slam` times.
- With VO: build scene starts from word refs, then add `"snap": "beat"` (or `"downbeat"`) to the scenes that should lock to the music: a start within ±0.12 s of a beat moves onto it.

---

## 6. Music-only edits

Six videos have no VO (v18 v33 v36 v40 v73 and the v28 lyric track; v23's sung vocal plays the same role). They run 10–30 s.

| Rule | Evidence |
|---|---|
| On-screen copy carries the story. Keep each line to ≤4 words readable at once, typed or built word by word on the beat. | v33 |
| The narrative unit is an *action*: prompt → result (v18), drag-drop → visible upgrade (v36), click → build (v33). Each one gets a click + whoosh + impact chain. | v18 v33 v36 |
| One recurring actor (a cursor, a file icon) carries the viewer through every scene. | v36 |
| Make the "drop" visible twice: a new element *and* a regrade (±10–15% luma or saturation) on the same frame, plus a 1-frame scale kick, all on the strongest onset of the bar. | v36 |
| The hook is a 4–10-frame strobe or a quiet typed line, matched to the intro of the track (v33's first 1.8 s has sparse onsets and a quiet typed hook). | v18 v33 |
| End on a 1.0–1.5 s still hold over the music tail, or a 3 s frozen hold for a loopable post. | v18 v36 v40 |
| Trim the track so its natural ending (or a clean bar line) lands on the end card; do not fade a mid-phrase bed. | v33 (track resolves on the end card), v18 |

Spec skeleton for a music-only edit:

```json
{"audio": {"music": "track.mp3", "musicVolume": 0.5,
           "sfx": [{"src": "sfx/whoosh.wav", "at": 1.75, "volume": 0.45},
                   {"src": "sfx/riser.wav",  "at": 3.30, "volume": 0.4}]},
 "scenes": [
   {"id": "s1", "start": 0.00, "transition": {"type": "strobe"}},
   {"id": "s2", "start": 1.95, "transition": {"type": "whip-left"}},
   {"id": "s3", "start": 3.90, "duration": 1.95, "transition": {"type": "flash"},
    "sfx": [{"src": "sfx/impact.wav", "at": 0, "volume": 0.6}]}
 ]}
```
(starts = consecutive downbeats from `beats.py`; here 123 BPM, one bar = 1.95 s. With `"beats": "beats.json"` on the spec, write them as `{"downbeat": 0}`, `{"downbeat": 1}`, … instead. The whoosh leads the whip by 0.2 s and the riser ends on the flash; they can be global as here, or scene `sfx` with a negative `at`. The impact sits inside s3. **Give the last scene a `duration`** (or set top-level `duration`): with no VO, the video length is the last scene's start + duration, and without it the render is 1 s long.)

---

## 7. Cue-sheet checklist (per video)

1. Bed chosen by register (§1.1), 100–140 BPM, at least as long as the video, starting on frame 0.
2. `duckTo` set so the bed is ~12–18 dB under the VO, with `musicVolume` at most ~2–2.5× of it (§2.2); `musicStart` / `musicFadeOut` / `musicLoop` set so the track starts on a bar and ends cleanly.
3. One whoosh per motion cut (lead 0.1–0.25 s), one impact per keyword slam and per principle or number card.
4. Clicks on every cursor click, typing under every typewriter, pops on every badge or bubble.
5. At least one topic-specific foley sound.
6. One designed breath before the turn; no dead air anywhere.
7. Montage and list bursts on the beat grid; flashes on strong onsets.
8. CTA: the bed keeps playing; a soft whoosh in; ≥1 s still hold on the tail.
9. Every audio file is user-supplied or licensed.

---

## 8. Engine gaps

| Technique | Frequency in the references | Status | Engine today / how it could be built |
|---|---|---|---|
| Smooth ducking (attack/release, hold across short pauses) | the "no pumping" bed is near-universal; the VO has ~10 pauses ≥0.3 s per video | **DONE** | `audio.duckTo`: ~4 f attack, ~10 f release, holds through pauses < 0.6 s. Open: configurable attack/release/hold |
| Music start offset, trim and end fade | v33 v18 (track resolves on the end card), v71 (2 s fade) | **DONE** | `audio.musicStart`, `audio.musicFadeOut` (default 0.6 s), `audio.musicLoop` (default `true`) |
| Bed thinning / per-section music level | v02 v75 v77 (thin), v16 v34 (build) | **OPEN** | one global level today. Proposed: a scene-level `musicVolume` override, interpolated over ~8 frames at the scene boundary |
| Beat-referenced timing | 14/76 VO edits beat-locked; all 6 music-only edits | **DONE** | `spec.beats` (the `beats.py` JSON or a path under `public/`), TimeRefs `{beat: n}` / `{downbeat: n}` / `{onset: n}`, and `scene.snap: "beat" \| "downbeat"` (±0.12 s) |
| Automatic SFX per transition | whooshes on 79/82, impacts on 72/82 | **OPEN** | SFX are listed by hand. Proposed: `transition.sfx` (`{src, lead, volume}`), or a spec-level map `sfxKit: {zoom: "...", whip: "...", flash: "..."}` applied automatically |
| Typing sounds tied to typewriter text | 43/82 | **OPEN** | manual `sfx` entries. Proposed: `text.typeSfx: {src, every: 1 char, volume}` (and the same for `ui search`/`prompt`), retriggering a short tick per revealed character |
| Scene SFX that start before the cut or ring past it | every whoosh lead-in and riser (34/82) | **DONE** | scene `sfx` are mounted at the top level: negative `at` leads in, tails ring past the scene |
| Pitch / variation on repeated pops and ticks | implied wherever 3+ pops run in a cluster (v11 v53) | **OPEN** | no playback-rate option on SFX. Proposed: `sfx[].rate` (pitch via `playbackRate`) and `sfx[].jitter` for random ±5% per hit |
