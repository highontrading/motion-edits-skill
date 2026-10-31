# Editing the user's own footage with motion graphics

Use this guide when the user's clips (talking head, B-roll, travel, product, screen recordings, archival) are the backbone of the video. It covers how footage is integrated with graphics, how it is cut, graded, captioned and paced, and how to build all of it with the engine. The rules come from the 82 reference breakdowns. Evidence is cited as `vNN`.

**What the library contains.** 29/82 references are tagged `footage-led`. 14/82 are `documentary-archival`. 29/82 use AI-generated stills or image-to-video clips treated as footage (v24 v26 v31 v47 v56 v63 v64 v67 v68 v73…). **None of the 82 is a true talking-head video.** Talking-head guidance below transfers the caption, punch and pacing systems measured on VO-led edits, and every rule that is a craft convention rather than a measurement is marked *(convention)*.

Read `engine-spec.md` first. Field names here (`video`, `trimStart`, `punch`, `captions`, `transition.type`…) are engine fields.

---

## 0. House rules vs. flavours

**House rules** (seen in most footage-led references; do these every time):
1. **One finish over everything.** Grain (59/82 tagged), vignette (46/82) and often halftone (46/82 mention it) sit over footage *and* graphics, so mixed sources read as one film (v09 v16 v29 v31 v45 v68).
2. **Grade the footage down so the graphics own the colour.** Footage is desaturated, cooled or flattened, and the accent colour lives in the type (v09 v45 v68 v79).
3. **Cut on the word.** Footage cuts land within ±0.1 s of the word that motivates them, usually 1–2 frames *before* it. Medians: −0.04 s (v24), −0.06 s (v68), −0.08 s (v74), +0.05 s (v09).
4. **Registers have jobs.** Footage carries proof, the present day and action. Designed cards carry abstractions and turns. Graphic scenes carry claims (v09 v65 v68 v74 v81).
5. **Footage sections run faster than graphic sections.** Footage montages cut at 2–4× the pace of the surrounding scenes (v13 v16 v24 v68).
6. **Captions are a separate, constant layer.** The caption system stays the same through every cut, and the clips change underneath it (v13 v16 v31 v45).
7. **Keep the camera off footage that is already moving.** Handheld or moving clips get no added camera move (v09 v74 v77). Stills and locked-off shots get a settle and a drift.

**Flavours** (choose 1–3 per video):
- B/W world with one accent colour (v02 v24 v31).
- Selective colour on the subject (5/82: v24 v26 v29 v31 v73).
- Stepped 12–15 fps footage (v09 v11 v47 v56).
- Text behind the subject (21/82).
- Tracked labels (v56 v67 v11).
- Footage in cards on black (v74 v27).
- Footage inside device or UI frames (v16 v18 v40 v58).
- Letterbox window (9/82).
- Accelerating montage (v16 v65).
- Burned word-pop captions (v68 v77).

---

## 1. Integration modes: how footage sits in the frame

| Mode | When | Measured | Refs | Engine |
|---|---|---|---|---|
| **Full-frame** | The default for A-roll, proof clips and montages | Most footage scenes. Native camera motion kept | v09 v13 v16 v68 v81 | `video` layer with no `w`, or a `video` background |
| **Card / inset on black or paper** | Off-ratio (16:9 in 9:16) or low-quality clips, B-roll inside a talking-head video, "proof" clips | Width 76–92% of the frame. Corner radius ≈3% of width (≈30 px at 1080). Inset ≈12% from each edge (v27). Enters as a full-frame zoom-blur that shrinks to the card over ~10 f with an expo-out (v25) | v74 v27 v25 v04 v22 | `video` with `w: 76–92`, `card: true`, `radius: 30`, `aspect` (16/9 default; `0.5625` vertical, `1` square) and an entrance `anim` (`pop`, `rise`, `slide-*`, `focus`) |
| **Device / UI frame** | "It's on a screen": phone, CRT, NLE monitor, VHS case | The frame stays still while the clip plays inside. Inner cuts land on strong onsets ±0.1 s (v40) | v16 v18 v40 v58 v80 v81; frame-in-frame tagged in 32/82 | `ui` `kind: phone`/`window` with `src: "clip.mp4"` (plays from 0, muted) |
| **Letterbox window** | A UI or talking-point beat inside a full-bleed edit | Bars of 255/1280 px top and bottom (≈20% each), leaving a ≈1:1.07 band. The bars animate open from 22% to 0 over ~10 f, `out-cubic` | v77 v78 v79 v80 | `scene.letterbox: 20`: the bars animate (~6 f expo-out) whenever the value changes between scenes; set `letterbox: 0` on the next scene to open them |
| **Cut-out / roto subject** | A person on a new background, brand-word walls, text behind the subject | Roto CEO in front of a 100%-width brand word, at 0.7–0.9 s per card in a triplet (v45) | v45 v73 v74 v77 | Stills: `tools/cutout.py` + `image` with `cutout`. Video: `tools/matte.py` → `video` with `transparent: true` |
| **Porthole / shape mask** | A one-off accent | Circular mask with a white ring (v77) | v77 | `video` with `w`, `aspect: 1` and `radius` ≥ half the box width in px (e.g. `w: 40, radius: 220`), plus a `shape` `circle` ring (`w` ≈ the box + 2) |

**Rules**
- Never letterbox a 16:9 clip with plain black bars in 9:16. Either fill the frame (crop it, see §2), or make it a deliberate card on a designed ground with a shadow and radius (v74: "inset cards let low-quality or off-ratio footage sit in a 9:16 frame and look deliberate").
- Cards sit centred, between y 35–50%, and leave the bottom 22% for captions and platform UI.
- Device frames lock the composition. Use them when the clip is evidence of something happening *on a screen* (v18: AI results played inside the AE viewer with the toolbar visible).

### Text behind the subject (21/82 mention it, 10 tagged)
- **What it is:** a giant keyword at 85–100% of frame width, placed at y 20–30%, behind the head or shoulders. The subject's matte is the top layer (v45 "$8 Billion" behind the CEO's head; v56 the film title behind the actor's head; v68 "BILLION" behind the tower; v77 "IMPOSSIBLE" behind the actor).
- **How it enters:** line by line, each line sliding in over ~8 f with an expo-out (v56). Or letter by letter every 2–3 f (v74: 6 letters in ~15 f). Or outline first, then filled (v77).
- **Stills and AI plates:** cut the subject out with `tools/cutout.py --model u2net_human_seg --trim` and stack three layers: the plate as an `image` layer or `background`, then the `text` at a lower `z`, then the cut-out at a higher `z`.
- **Moving footage:** build a matte with `python3 tools/matte.py clip.mp4 remotion/public/matte.webm --start T --duration 3` (a VP9 WebM with alpha; rembg on CPU, ~2–5 frames/s at 720p, so keep it to 2–6 s). Then stack in one scene:
  ```json
  {"background": {"kind": "video", "src": "clip.mp4", "trimStart": 12.4, "muted": true},
   "animFps": 0,
   "layers": [
     {"type": "text", "text": "IMPOSSIBLE", "style": "impact", "size": 26, "y": 26, "anim": "rise"},
     {"type": "video", "src": "matte.webm", "transparent": true, "muted": true, "trimStart": 0}
   ]}
  ```
  The matte's frame 0 is the clip at `T` (= the background's `trimStart`), so keep the two in sync and don't give either a `punch` unless both get it. A slow `camera.drift` is fine: it moves the whole stack together.
- Cheaper alternatives: freeze the frame (export a still, cut it out, hold it 0.8–1.5 s; v24 and v31 run 1–2.5 s stills anyway), or place the word in the negative space above the head (y 12–22%).

### Captions placed in the scene (in-scene captions, v24 v26 v31)
- Captions sit **on the subject's chest, centred at y 45–55%**, not in a lower third (v24 v31). Or they go in the negative space beside the head (v02, v73: x 6–50%, y 25–50%).
- They move with the camera. A caption is part of the scene and leaves with the camera move, never by fading (v24: "caption exits by travelling with the camera move"; v26: it "moves, scales and blurs with the camera").
- **Engine:** in-scene captions are `text` layers inside the scene (with `anim: "words", sync: true`), so the scene `camera` moves them. The global `captions` track is screen-space and does *not* move with the camera. Choose one system per section.

### Tracked labels (v56 v67 v11)
- **Name tags on chests:** a solid red or blue rectangle at a −3° to −8° tilt, with white bold-italic text at ~5% of frame height. Two entrances are used:
  - **fly-in:** from −12° to −4° over 11 f, spring `{damping 14, stiffness 160, mass 0.6}`;
  - **expand:** a 1-px bar grows to a rectangle over 5 f, then the text de-blurs over 6 f (v56, v67).
- **Titles pinned to a building** ride with the plate (v56).
- **A tracked graphic mask over a head** (v11's balaclava) recolours on a word.
- **Engine today:**
  - On stills, anything inside the scene is "tracked for free" because the camera transforms the whole scene.
  - On locked-off footage, place a `badge` (`variant: "solid"`, `rotate: -5`, `anim: "wipe"`) next to the subject.
  - On moving footage, the label needs a track (gap G2). Otherwise keep labels to shots where the subject moves less than ~3% of the frame width over the label's lifetime *(convention)*.

---

## 2. Reframing and punch-ins

There are three distinct punches. Don't mix up their sizes.

| Punch | Scale | Timing | Use | Refs | Engine |
|---|---|---|---|---|---|
| **Bump** (emphasis) | ×1.06–1.12 | 4 f up, then hold or settle over 6–8 f. Optional 9° rotation jolt | On a stressed word, a number, or a notification landing | v04 (6–10%, 4 up / 8 down), v79 (instant 112% → 4 f settle) | `video.punch: [{at:{word}, scale:1.1, frames:4, hold:0.6}]` |
| **Reframe jump** (hides a jump cut) | ×1.15–1.4 | Instant (1 frame), optional 2–3 f blur first. Residual drift decays over ~10 f | On every jump cut in a talking head; "handheld documentary zoom" inside one shot | v27 (1.3× instant), v31 (1.4× after 3 f blur), v14 (reframe jump cuts inside one scene) | New scene on the cut, with `punch: [{at:0, scale:1.18, frames:1}]` on the video layer |
| **Detail crop** | ×1.8–2.2 | Hard cut, the incoming shot sharpens from ~10 px blur over 3 f | To the thing the VO names: a face, a product, a UI element | v29 (1.8×, defocus 10→0 px in 3 f), v58 (≈2.2× to the named UI chip) | New scene, `punch: [{at:0, scale:2, frames:1}]` + `transition: {type:"focus"}` |

**When**
- **Talking head:** alternate wide (×1.0) and tight (×1.15–1.25) framings at **every** jump cut, so no two consecutive segments share a framing *(convention; the reference analogue is v14's reframe jumps)*.
  - Use at most **one bump per sentence**, roughly every 2–4 s, on the stressed word.
  - Never place two bumps < 0.5 s apart, except in beat runs.
- **Music edits:** put bumps on beats. v80 lands 3 punch-ins on consecutive beats 0.44–0.9 s apart (zoom spikes +1.6/+1.6/+1.1 on beats 6.22/6.66/7.66).
- **Camera punch vs. video punch:**
  - `video.punch` scales only the clip, so the type stays put. Use it for footage emphasis.
  - `camera.punch` scales the whole scene, type included. Use it when the type should "hit" with the picture.

**Reframing 16:9 → 9:16.** `fit: "cover"` always centre-crops. If the subject is off-centre, pre-crop with ffmpeg: `ffmpeg -i in.mp4 -vf "crop=ih*9/16:ih:X:0,scale=1080:1920" out.mp4`, where X is the left edge in px, chosen so the eyes sit at 40–50% of the width. An `objectPosition` field and auto-reframing are still open (gap G6).

**Settle on footage.** Every scene gets the default camera settle (×1.10 → 1, ratio 0.82). That is right for stills and graphics. For **consecutive A-roll segments** set `camera: {settle: 1.0, drift: 0.02}`. A zoom pulse on every jump cut reads as a glitch. The reframe punch already marks the cut.

---

## 3. Speed ramps

**Evidence:** the library has essentially **no time-remapped footage**. Its "ramps" are *camera* velocity ramps into cuts:
- `ramp-into-cut` on 9 of 14 cuts in v04, accelerating ×1.45/frame for ~7 f;
- the momentum cut in v67 (ease-in over 10–35 f, cut at peak velocity);
- exits in v16 (6–10 f, peak on the last frame).

The engine does the camera version natively with `transition: {type: "zoom" | "whip-*" | "spin"}`. On footage, a ramp is usually better faked this way than time-remapped.

**When you do want a real speed change** *(convention)*:
- **Speed-up into a cut:** 1.0× → 2–4× over the last 8–12 f of the outgoing clip. Pair it with a `zoom` or `whip` transition.
- **Slow-down after a hit:** 0.4–0.6× for 0.5–1.5 s after the cut, then a return to 1.0×. Use it for a sunset, a pour, a jump, a product reveal.
- **Slow-mo quality:** only use 0.5× if the source is ≥ 50 fps (check `fps` in `footage.json`). 0.25× needs 120 fps. Below that, frames duplicate and judder.

**Engine today**
- `playbackRate` is constant per layer. A stepwise ramp therefore means consecutive scenes (or layers with `at`/`until`), each with its own `playbackRate` and a `trimStart` computed so the source time is continuous. A clip running at rate r for d seconds consumes r·d seconds of source.
- Smooth ramps are still a gap (G3); pre-render instead: `ffmpeg -i in.mp4 -filter:v "setpts='if(lt(T,1.2),PTS,1.2/TB+(PTS-1.2/TB)/0.5)'" ...` for a 1.0× → 0.5× change at 1.2 s, or split the clip with `trim` + `setpts` and `concat`.

---

## 4. Montage acceleration

A montage is a **list of evidence** (v09 v13): a run of clips cut faster than everything around it.

| Ref | Clip lengths | Notes |
|---|---|---|
| v16 | 1.33, 0.45, 0.55, 0.33, 0.33, 0.17, 0.11 s | 7 archival clips, each shorter than the last, into a kick. Handheld jitter: zoom +0.5–1.4%, rotation ±1° every 2–3 f |
| v65 | 5, 3, 2, 2, 2, 2, 2, 1, 4, 4 f (at 16 fps ≈ ×1.9 at 30) | Flip-book inside fixed brackets, accelerating to the word "viral", then 2 slower frames to land |
| v68 | 0.50, 0.94, 0.75, 1.07, 0.81 s | Real-store footage after AI-story scenes of ~2.5 s, i.e. ×3–4 the pace. One or two caption words per clip |
| v13 | 9 clips in 8.6 s, mean 0.95 s, min 0.33 s | The fastest section of the video |
| v09 | 0.34–1.2 s, 5 cuts in 3.3 s | Footage burst, cut on word onsets |
| v17 | every 0.5–0.6 s = 1 beat | Cuts land 0.06–0.13 s *after* the beat, with 1-frame white flashes between clips |
| v24 | 1.07, 0.93, 1.10 s | Proof montage at ~1.0 s per clip vs. the 2.7 s average, one title per clip |
| v78 | 0.1–0.47 s for 3 s | Hyper-cut sports footage |

**Rules**
- **Montage pace = 2–4× the surrounding scene pace.** For a 2.5 s average elsewhere, run 0.6–1.0 s clips and accelerate.
- **Shrink ratio ≈ 0.6–0.8 per clip, floor 2–3 frames (0.07–0.1 s).** Example sequence at 30 fps: 30, 20, 14, 10, 7, 5, 3, 3 f.
- **Count:** 4–9 clips per montage.
- **Exit on a hard stop:** a void card (v16 black "breath" card), a held hero shot, or the keyword. Mark the entry and exit of the register change with a 2-frame `invert` (v68) or a 1-frame `flash` (v17).
- **Cut points:** on words (VO edits) or on beats, then half-beats, then quarter-beats (music edits; see §8).
- **Each clip shows one readable action.** Trim to the action's peak, because a 0.2 s clip has no time for a lead-in *(convention)*.

---

## 5. Jump-cut tightening (silence removal)

The library has no talking heads, but it does compress process footage: v65 jump-cuts screen recordings every ~0.5 s, and v73 runs an After Effects timelapse with cuts every 0.2–1.0 s. And it **protects deliberate pauses**:
- the 1 s near-silent "What changed?" card (v24);
- ~0.5 s VO pauses before turns that fall on hard cuts to text cards (v56);
- the slowed "This… is… the…" title drop (v16).

**Rules** *(convention, with tool defaults)*
- **Detect:** `analyze_footage.py` reports `silences` at < −35 dB lasting ≥ 0.35 s.
- **Cut:** keep **0.08 s before** speech resumes and **0.12 s after** it stops, so the residual gap is ≈0.2 s. Drop any silence whose trimmed span is < 0.15 s, because that cut is not worth the jump.
- **Protect:** keep 0.4–1.0 s before the **turn** line ("But…", "Here's the thing…") and before the CTA. Put a text card or a B-roll cut in that pause (v56).
- **Fillers** ("um", "uh", false starts): Whisper often drops fillers from the transcript. A gap between consecutive words of > 0.35 s with audio energy is usually a filler. Cut it like a silence. Re-listen.
- **Restarts:** if a sentence is repeated, keep the *last* take (usually the cleanest). Find duplicates by matching the first 3–4 words in the transcript.
- **Hide each cut:** alternate the framing (§2), cut to B-roll, or cover it with a keyword card. A raw same-framing jump is acceptable at most once every ~5 s.
- **Audio:** apply 10–12 ms fades at every audio cut so it doesn't click (the snippet below does).

**Pipeline.** Build a tightened A-roll file first, then **re-transcribe it**, because captions and word refs must use the *tightened* timeline. `tools/tighten.py` does both in one step:

```bash
python3 tools/tighten.py footage/aroll.mp4 remotion/public/footage/aroll_tight.mp4 \
  --min-silence 0.35 --keep 0.08 --noise -35 --words remotion/public/footage/aroll_tight.words.json
```

It keeps `--keep` seconds on *both* sides of each cut and has no audio fades or protected pauses. When you need the asymmetric 0.08 / 0.12 s padding, the 10–12 ms fades and a list of jump-cut times (for reframe punches), use this script instead:

```python
# work/tighten.py  — run: python3 work/tighten.py work/footage.json 0
import json, subprocess, sys
f = json.load(open(sys.argv[1]))[int(sys.argv[2])]
dur, PAD_IN, PAD_OUT, MIN_CUT = f["duration"], 0.08, 0.12, 0.15
keep, t = [], 0.0
for s in f["silences"]:
    a, b = s["s"] + PAD_OUT, s["e"] - PAD_IN
    if b - a < MIN_CUT:
        continue
    if a > t:
        keep.append((t, a))
    t = b
if dur - t > 0.05:
    keep.append((t, dur))
parts = []
for i, (a, b) in enumerate(keep):
    parts.append(f"[0:v]trim={a:.3f}:{b:.3f},setpts=PTS-STARTPTS[v{i}];"
                 f"[0:a]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS,"
                 f"afade=t=in:d=0.01,afade=t=out:st={max(0, b - a - 0.012):.3f}:d=0.012[a{i}]")
fc = ";".join(parts) + ";" + "".join(f"[v{i}][a{i}]" for i in range(len(keep))) + f"concat=n={len(keep)}:v=1:a=1[v][a]"
out = "remotion/public/footage/aroll_tight.mp4"
subprocess.run(["ffmpeg", "-y", "-i", f["file"], "-filter_complex", fc, "-map", "[v]", "-map", "[a]",
                "-r", "30", "-c:v", "libx264", "-crf", "16", "-c:a", "aac", "-b:a", "192k", out], check=True)
subprocess.run(["ffmpeg", "-y", "-i", out, "-vn", "-ac", "1", "-ar", "48000", out.replace(".mp4", ".wav")], check=True)
cuts, acc = [], 0.0          # jump-cut times on the tightened timeline
for a, b in keep[:-1]:
    acc += b - a
    cuts.append(round(acc, 3))
json.dump({"keep": keep, "jump_cuts": cuts}, open("work/aroll_cuts.json", "w"), indent=1)
print(f"{len(keep)} segments, {dur:.1f}s -> {sum(b - a for a, b in keep):.1f}s")
```
Then: `python3 tools/transcribe.py remotion/public/footage/aroll_tight.wav remotion/public/footage/aroll_tight.words.json`.

Phone footage is often variable-frame-rate and rotated. The `-r 30` re-encode above fixes both before Remotion sees the file. Do the same (`ffmpeg -i in.mp4 -r 30 -c:v libx264 -crf 16 out.mp4`) for every B-roll clip whose `fps` in `footage.json` is not a clean 24/25/30/60.

---

## 6. Grading to unify mixed sources

| Strategy | Numbers | Refs | Engine |
|---|---|---|---|
| **Desaturate the footage, graphics keep the colour** | Footage graded cool/desaturated (`#2a3543`, `#5b6f79`). Brand colours stay in the type | v09 v79 | `video.grayscale` (full B/W) or `grade.saturation: 0.6–0.8` |
| **Flat and muted, lifted blacks** | Blacks at `#141113`–`#141316`, low saturation | v45 v29 | `grade: {contrast: 0.9, brightness: 1.04, saturation: 0.75}` (grades the whole scene, type included) |
| **Whole video B/W + one accent** | Everything monochrome. One brand colour (green buttons, URL) is the only hue | v02; 34/82 mention B/W/monochrome | `video.grayscale: true` on every clip, accent colour on `text`/`badge` only |
| **Grade as timeline** | Past = B/W (saturation ≈0–4/255), present/payoff = colour (saturation 4 → 36 on "Today", footage 54–92) | v31 | Story scenes with `video.grayscale: true`, payoff scenes in colour |
| **Grade as meaning** | Drain to B/W on the refusal (1 → 0.15 over 9 f, v17), on death (84 → 35 over 6 f, v67), on denial (1 f, v67). Same set regraded cold blue for the backlash (v26) | v17 v26 v67 v23 | `grade.drainAt: {word}` (6 f drain) |
| **Selective colour on the subject** | The world B/W, the hero's suit or the key object in colour. A 3-flash on/off flicker at 12 fps, ~0.5 s, then solid (v31) | 5/82: v24 v26 v29 v31 v73 | Stills: B/W plate + colour cut-out on top. Video: the clip as a `video` layer with `grayscale: true`, then its `tools/matte.py` matte (`transparent: true`) in colour on top, same `trimStart` |
| **One warm grade for all sets** | Amber, heavy vignette (edge luma −50 to −70%), dot mesh 3 px at 6%, ±2 px chroma, applied to the real footage too | v68 | `grade.tint: "#ff9a0018"`, `finish: {vignette: 0.55, halftone: 0.08, chroma: 1.5}` |
| **Warm/cool alternation per scene** | Every shot owns one temperature, alternating each cut | v56 v67 | Alternate `grade.tint` between warm and cool per scene |

**Texture over everything** (the unifier):
- **Grain** `finish.grain` 0.06–0.10. v56 runs ~10%.
- **Halftone** 0.08–0.15 for editorial or archival work (v09 v16 v29 v31 v68). Skip it for clean travel or product work.
- **Vignette** 0.35–0.55 (v45 0.55, v56 ~30% corners).
- **Scanlines** 0.10–0.12 + **chroma** 1–2 px for a CRT/analogue feel (v29 v45).
- `tools/render.py` applies grain and halftone in ffmpeg, so they cover footage for free.

**Engine caveat.** `scene.grade` filters the *whole scene*, type included, and `grade.tint` is a colour-blend over everything. To keep type in pure accent colour over graded footage:
- use `video.grayscale` (per layer), not `grade.saturation: 0`;
- keep tints ≤ 10% alpha (`…18`);
- or put the type in the global `captions` track, which is outside the scene grade.

Per-layer saturation, contrast and tint need gap G7.

---

## 7. Captions for talking-head and footage content

Word-by-word captions are tagged in 47/82. A persistent subtitle bar or pill appears in 5 (v08 v13 v14 v16 v25), karaoke in 2 (v77 v81). Five measured systems:

| System | Look | Size / position | Timing | Refs | Engine |
|---|---|---|---|---|---|
| **Word-pop (burned, creator style)** | Heavy condensed caps (Anton class), yellow `#f2c12e`/`#f5c518`, 2–3 px dark stroke + shadow | 1–2 words. ~25–45% of frame width per word. y 48–50% (v68), or 68–72% when the face fills the upper half | Hard swap on each word start. 1-frame pop, no fade | v68 v77 | `captions: {style:"bold", maxWords:2, size:9, y:70, color:"#ffffff", activeColor:"#f5c518"}` |
| **Running word build (spine)** | Light/regular neo-grotesk, lowercase as spoken, white `#f2f2f2` + soft shadow | Cap height ≈2.2% of frame height. 35–60% wide. y 55–75%, over the chest | Each word cuts on in 1 f, trailing the voice by +0.1–0.4 s. The newest word is grey `#a0a0a0`, then turns white | v45 v02 | Approximate it with `captions: {style:"karaoke", font:"clean", size:4.6, y:64, color:"#f2f2f2", activeColor:"#a0a0a0", maxWords:5}`, which shows the whole chunk at once. `style:"bold"` builds word by word but forces caps. A true lowercase build needs G11 |
| **Editorial italic on the chest** | Italic serif (Instrument Serif class), lowercase, white with an 8–12 px soft glow | Cap ≈3% of height. 1–3 words, 30–50% wide. y 45–55%. One emphasis word per sentence at 2–2.5× size | Chunk replace every 0.3–0.6 s, ±0.1 s of the word | v24 v31 v26 v73 | In-scene `text` layers, `style:"serif-italic"`, `anim:"words"`, `sync:true` |
| **Subtitle bar / pill** | Semibold sans, sentence case, on a 35–55% black box (no radius) or a pill | Cap ≈2.2–2.5% of height. 2–4-word chunks. y 68% (v16), 72% (v11), 75% (v13) | Switches on chunk onsets ±1 f. Persists across cuts. Carries 3 f over a footage cut (v31) | v16 v13 v11 v09 v08 | `captions: {style:"bar"}` or `"pill"`, `y:70`, `maxWords:4` |
| **Karaoke** | Full line visible, the spoken word recoloured (green `#2fd06a`) | Line in the upper-middle band | Active word = the one being spoken | v77 v81 | `captions: {style:"karaoke", activeColor:"#2fd06a"}` |

**Rules**
- **Exactly one caption system per section.** Never stack two subtitle lines. v14 left the source clip's burned subtitles under its own pill and they compete. Crop or blur source subtitles (gap G10).
- **Box only when needed.** Use a translucent box only on bright or busy footage (v09 adds a 35% box only over snow). v31 switches to a tight `#111` 90% box only for busy footage.
- **Keyword slams are separate from captions.** The caption carries the sentence, and a `text` layer (`anim:"slam"`, `style:"impact"`, size 14–24) carries the one keyword on its word. Two text layers give "both the vibe and the full sentence" (v16).
  - Put the slam in the top band (y 15–25%) over the head, or on a cut-away card.
  - On a talking head, never put it over the mouth or eyes.
- **Emphasis by colour or scale, not new fonts.** Use one accent colour for the keyword (`activeColor`, or `accent` on a text layer). Or scale the emphasis word 2–2.5× within the caption (v24). Spoken word = colour (v77).
- **Safe zone:** captions between y 55–75% on 9:16. Keep everything above 78% because platform UI covers the bottom ~20%. `bold` defaults to y 68, `pill` to y 76 (lower it to 70–72 on busy talking heads).
- **Spell-check the transcript.** Whisper mishears brand names (v58 "Nvidia" for "invideo"), and the references ship typos that undercut the premium feel (v16). Fix `words.json` by hand before rendering.

---

## 8. How graphics scenes alternate with footage

- **Register grammar (house rule).**
  - Claim → designed scene: collage, UI, kinetic type.
  - Pivot or abstraction → flat text card (black void, paper or plaid), 1.0–2.9 s (v24: 1.0 s; v56: 1.5 and 2.9 s; v68: 1.25–1.94 s).
  - Proof, action or the present day → footage (v09 v65 v68 v81: the verbs "tell" and "show" switch to footage).
- **Proportions seen:**
  - roughly a third each of type cards, graphic worlds and footage (v74);
  - footage only for the "today" payoff after a graphic story (v68 v31);
  - footage as the hook and CTA, graphics in the middle (v02).
- **Mark register switches:** a 2-frame `invert` at the chapter change (v68, both into and out of the footage section), a black void card before the montage (v16), a 1-frame `flash` between montage clips (v17), or a `focus` pull on every cut (v24).
- **Footage-to-graphics links that work:**
  - Footage shrinks to a card (v25), the card becomes the UI or timeline (v55 morph).
  - A footage frame becomes a screen inside the next scene (v16 CRT frame-in-frame).
  - A match on a shape or colour (v55).
- **Talking-head alternation** *(convention built from the above)*:
  - A-roll segments of 2–5 s;
  - a B-roll cut-away or card every 2–3 A-roll segments (every ~6–10 s);
  - a keyword or number card at the turn;
  - A-roll for the CTA (the face sells the CTA).
  - Never more than ~8 s of uninterrupted A-roll without a punch, card, B-roll or graphic event.

---

## 9. Pacing

| Content | Average shot | Cuts/s | Refs |
|---|---|---|---|
| Footage/AI-plate documentary | 2.4–3.0 s (median 2.1–2.5) | 0.34–0.42 | v24 0.38, v31 0.41, v56 0.34, v67 ~0.37, v68 0.42 |
| Mixed-world news relay | ~1.5 s | 0.6–1.5 incl. internal swaps | v45 |
| Footage montage | 0.3–1.1 s | 1–3 | v13 v16 v24 v68 |
| Collage explainer (for contrast) | 1.6–2.2 s | 0.55–0.73 | v09 v16 |

- **Something must change every 0.8–1.2 s** even when shots run 3 s: a caption chunk, a label, a punch, a camera event (v56). Caption replacement every 0.3–0.6 s carries the rhythm in slow footage edits (v24).
- **Three gears:** a fast hook (≥ 2 visual states in the first 1.5 s), a mid-tempo body, a fast montage at the proof, then a slow CTA of 3.8–5.8 s (v16 v45 v68).
- **Hook within 1.5 s:** the first frame is already the strongest image or contains the question (v24, v56: the first word and the big type land within 0.5 s).
- **VO-led edit:** cut on the word, 1–2 f early. A scene starts ~0.1 s before its sentence (`start: {word, offset:-0.1}`, or a number computed from `words.json`).
- **Music-led edit (no VO):**
  - main cuts on beats with a mean |offset| ≤ 0.08 s (v23), within ±0.12 s (v28), or 13/15 cuts within ±0.2 s (v18);
  - secondary changes (punches, title words, swaps) on the off-beat eighth note, the "and" (v33 v36 v73);
  - a flash may **pre-empt** the hit by ~0.15 s so the bloom peaks on it (v28);
  - lead each cut by 1–2 frames (v33 −0.07 s, v68 0.04–0.19 s before the beat).
- **Hybrid (VO + music):** the VO is placed on the music grid, so sentence starts and beats coincide (v24 v31 v68). Follow the VO and let 2/3 of the big events (flashes, strobes, cuts) land within ±2 f of a beat (v56).
- **Stepped cadence:** graphics at 12–15 fps with footage at its native rate (v13 v14 v31), or the AI/b-roll on 2s with graphics at 30 (v47 v56), for a filmic contrast. Engine: `animFps` freezes the **whole scene, footage included**, but a layer with `"smooth": true` keeps full fps inside a stepped scene, so put the footage on a `video` *layer* (not a `video` background) with `smooth: true` and let the graphics step. Set `animFps: 0` on footage-only scenes unless you want stepped footage (v09 v11 step it deliberately). The reverse (stepped footage inside a smooth scene) is still gap G8.

---

## 10. Workflow with the engine

### Step 1. Analyse
```bash
python3 tools/analyze_footage.py clips/*.mp4 --out work/footage.json --sheets work/sheets
```
For each clip, `footage.json` holds:
- `width, height, fps, duration, rotation, has_audio`: decide the crop (16:9 vs 9:16), slow-mo headroom (fps ≥ 50) and whether the clip needs a CFR re-encode.
- `cuts`: shot changes inside a clip (histogram jump > 0.4, ≥ 0.3 s apart). Treat each span between cuts as a separate shot. Don't start a select within 0.1 s of a cut.
- `silences`: `[{s, e}]` at < −35 dB for ≥ 0.35 s. Use them for tightening (§5) and to spot natural sentence boundaries.
- `profile`: per-second `{t, motion, luma}`.
  - **Motion:** rank seconds *within* the clip. The top third are action selects for montages and beat hits. Near-zero seconds are static: good for text-heavy holds or stills for text-behind-subject.
  - **Luma:** flags dark (< ~30) or blown (> ~225) seconds. Avoid them, or grade them.
- `transcript`: word timings of the clip's own audio. Use it to find sentences, restarts and quotable lines.
- `sheets`: contact sheets at 4 fps (5×3 grid, 3.75 s per sheet). **Look at every sheet** before planning. Note the subject position (for crops), the eye line (for caption y), clean backgrounds (for text) and gestures (for punches).

### Step 2. Choose selects
- **A-roll:** pick the takes. Order the sentences into hook → setup → turn → payoff → CTA (see `script-structure.md`). The hook is the most surprising sentence, even if it was said last.
- **B-roll:** for every A-roll sentence, choose a clip that shows the noun or verb literally (the "script → visual" rule in v56 and v68).
  - Select length: 0.6–2.5 s; 0.3–1.0 s inside montages.
  - Start on the motion onset. Skip the first 0.2–0.5 s of handheld clips where the operator is still settling *(convention)*.
  - End before the camera stops.
- **Write a select list:** `{clip, in, out, role: aroll|broll|montage|card-bg, note}`.

### Step 3. Prepare files
- Tighten the A-roll (§5) → `public/footage/aroll_tight.mp4` + `.wav` + `.words.json`.
- Re-encode B-roll to CFR 30 fps and crop to 9:16 where it will be full-frame (§2).
- Optional pre-trim of B-roll to its select (`ffmpeg -ss IN -to OUT`). Then `trimStart: 0`, and `ui` device frames (which ignore `trimStart`) work too.
- Music: `python3 tools/beats.py music.mp3 work/beats.json`.

### Step 4. Write the spec
- Top level:
  - `width/height` 1080×1920, `fps: 30`, `animFps: 0`;
  - `words`: the tightened transcript;
  - `audio: {vo: tightened wav, music, musicVolume 0.3, duckTo 0.12–0.18}`;
  - `captions` (§7) and `finish` (§6).
- **A-roll scenes:** one scene per segment between jump cuts (or per sentence).
  - The `video` layer has `src` = the tightened A-roll, `muted: true` (the sound comes from `audio.vo`, so it is continuous across scene cuts) and **`trimStart` = the scene's start time on the tightened timeline**.
  - Alternate `punch: [{at:0, scale:1.18, frames:1}]` (tight) and no punch (wide).
  - Add `camera: {settle: 1.0, drift: 0.02}`.
- **Numeric starts:** because `trimStart` must be a number, give A-roll scenes numeric `start`s computed from `words.json` (first word of the segment − 0.1 s), not word refs. Snippet:
  ```python
  import json; W = json.load(open("remotion/public/footage/aroll_tight.words.json"))["words"]
  def start_of(word_index): return round(max(0, W[word_index]["s"] - 0.1) * 30) / 30   # frame-aligned
  ```
- **B-roll cut-away:**
  - a full-frame `video` layer (`src` = B-roll, `trimStart` = select in, `muted: true` or `volume: 0.15` for natural sound);
  - **or** a card: `background: {kind:"video", src: aroll_tight, trimStart: <scene start>, blur: 18, dim: 0.5}` with a `video` layer `{w: 86, card: true, radius: 30, y: 42}` on top. The speaker stays present but blurred behind the B-roll card.
- **Layer `at` gotcha:** a `video` layer with `at > 0` plays from `trimStart + at × playbackRate`, not from `trimStart`, because the clip runs on the scene clock. Either keep `at: 0`, or subtract: `trimStart = desired_in − at × playbackRate`.
- **Keyword slam:** a `text` layer `{style:"impact", anim:"slam", at:{word:"…"}, size:16–22, y:18–24}` over the A-roll. Or a 0.6–1.2 s cut-away card (`background: {kind:"void"}`) entered with `flash`/`invert` and left with `cut`.
- **Labels:** a `badge` (`variant:"solid"`, `rotate:-5`) next to the subject on locked-off shots.
- **Stills for text-behind-subject:** `ffmpeg -ss T -i clip.mp4 -frames:v 1 still.png`, then `tools/cutout.py still.png --out remotion/public/cutouts --model u2net_human_seg --trim`. Layers, bottom to top: `image` plate (full-frame, `fit: "cover"`) → giant `text` → `image` cut-out (`cutout: false`, at the same position and scale as the plate) → captions.

### Step 5. Captions
- Choose one system from §7. Check that `words.json` matches the **tightened** audio.
- Fix the spelling of names.
- The `captions` track is global. It also shows over keyword cards, so keep keyword cards ≤ 1.2 s, or let the slam duplicate the spoken word on purpose (v68 does).

### Step 6. Transitions (the cut INTO each scene)
| Join | Type | Refs |
|---|---|---|
| A-roll → A-roll (jump cut) | `cut` with a framing change | v14 v27 |
| A-roll → B-roll | `zoom` (momentum) or `whip-left/right`, matched to the camera direction in the B-roll | v11 v67 |
| into a keyword / turn card | `flash` (1 white frame) or `invert` (2 f) | v17 v68 |
| montage clip → clip | `cut` (with a `flash` on every 2nd–3rd for accent) | v16 v17 |
| register change (story → footage) | `invert` | v68 |
| every cut in a calm editorial piece | `focus` (start soft, rack in over 3–12 f) | v24 v29 |
| into the CTA | `circle` or `zoom` | v08 v25 |

Keep 2–4 transition types per video. Roughly every third cut should be a motion cut.

### Step 7. Render and QA
- `python3 tools/render.py work/x.spec.json out/x.mp4 --draft` first. Then render at full size and run `python3 tools/review_render.py out/x.mp4 out/review/`.
- Check:
  - captions match the audio within ±2 f (watch the jump-cut seams);
  - no face is covered by type;
  - no black edges after punches and whips;
  - montage clips each read;
  - B-roll cards stay above y 78%;
  - the A-roll audio has no clicks at the cuts.

---

## 11. Worked example A: a 30 s talking head → captioned, punched-in short

The source is a 30 s selfie clip, tightened to ~24.6 s (§5), with 3 B-roll clips. **All `src` paths are placeholders. Every `start`/`trimStart` is a placeholder too:** replace them with values from `aroll_tight.words.json` and `work/aroll_cuts.json`, keeping each A-roll `trimStart` equal to its scene `start`. Placeholder script: "Your videos aren't boring. Your first three seconds are. Most people open with a logo… Instead, open with the result… Here's the trick: … Save this for your next edit."

```json
{"spec": {
  "width": 1080, "height": 1920, "fps": 30, "animFps": 0,
  "palette": {"bg": "#0b0b0c", "ink": "#ffffff", "accent": "#f5c518", "accent2": "#2bd96b", "paper": "#ece6d8"},
  "words": "footage/PLACEHOLDER_aroll_tight.words.json",
  "audio": {"vo": "footage/PLACEHOLDER_aroll_tight.wav", "music": "music/PLACEHOLDER_bed.mp3", "musicVolume": 0.28, "duckTo": 0.12},
  "captions": {"enabled": true, "style": "bold", "maxWords": 2, "size": 9, "y": 70, "color": "#ffffff", "activeColor": "#f5c518"},
  "finish": {"grain": 0.06, "vignette": 0.32},
  "scenes": [
    {"id": "hook-tight", "start": 0, "duration": 2.4,
     "camera": {"settle": 1.06, "settleR": 0.8, "drift": 0.02},
     "layers": [
       {"type": "video", "src": "footage/PLACEHOLDER_aroll_tight.mp4", "trimStart": 0, "muted": true,
        "punch": [{"at": 0, "scale": 1.18, "frames": 1}, {"at": {"word": "boring"}, "scale": 1.08, "frames": 4, "hold": 0.5}]},
       {"type": "text", "text": "BORING?", "style": "impact", "size": 20, "y": 20, "anim": "slam", "at": {"word": "boring"}, "until": 2.3,
        "fx": {"shadow": true}}
     ]},
    {"id": "a2-wide", "start": 2.4, "duration": 2.6, "transition": {"type": "cut"},
     "camera": {"settle": 1.0, "drift": 0.02},
     "layers": [
       {"type": "video", "src": "footage/PLACEHOLDER_aroll_tight.mp4", "trimStart": 2.4, "muted": true,
        "punch": [{"at": {"word": "three"}, "scale": 1.1, "frames": 4, "hold": 0.6}]},
       {"type": "counter", "from": 0, "to": 3, "duration": 0.5, "at": {"word": "three"}, "mode": "tick", "suffix": "s",
        "style": "impact", "size": 18, "y": 19, "color": "#f5c518"}
     ]},
    {"id": "broll-card-logo", "start": 5.0, "duration": 2.6, "transition": {"type": "zoom"},
     "background": {"kind": "video", "src": "footage/PLACEHOLDER_aroll_tight.mp4", "trimStart": 5.0, "blur": 18, "dim": 0.5},
     "camera": {"settle": 1.1, "drift": 0.03},
     "layers": [
       {"type": "video", "src": "footage/PLACEHOLDER_broll_logo_intro.mp4", "trimStart": 1.2, "muted": true,
        "w": 86, "y": 40, "card": true, "radius": 30, "grayscale": true},
       {"type": "shape", "kind": "cross", "at": {"word": "logo"}, "x": 50, "y": 40, "w": 30, "color": "#e8301c", "stroke": 12, "draw": 6}
     ]},
    {"id": "a3-tight", "start": 7.6, "duration": 3.6, "transition": {"type": "cut"},
     "camera": {"settle": 1.0, "drift": 0.02},
     "layers": [
       {"type": "video", "src": "footage/PLACEHOLDER_aroll_tight.mp4", "trimStart": 7.6, "muted": true,
        "punch": [{"at": 0, "scale": 1.2, "frames": 1}]},
       {"type": "badge", "text": "OPEN WITH THE RESULT", "variant": "solid", "color": "#1d6b33", "textColor": "#ffffff",
        "size": 5, "y": 18, "rotate": -4, "anim": "wipe", "at": {"word": "result"}}
     ]},
    {"id": "turn-card", "start": 11.2, "duration": 1.0, "transition": {"type": "flash"},
     "background": {"kind": "void"},
     "layers": [
       {"type": "text", "text": "THE TRICK", "style": "impact", "size": 24, "y": 40, "anim": "slam", "accent": ["trick"], "accentColor": "#f5c518"}
     ]},
    {"id": "a4-wide", "start": 12.2, "duration": 3.8, "transition": {"type": "invert"},
     "camera": {"settle": 1.0, "drift": 0.025},
     "layers": [
       {"type": "video", "src": "footage/PLACEHOLDER_aroll_tight.mp4", "trimStart": 12.2, "muted": true,
        "punch": [{"at": {"word": "first"}, "scale": 1.1, "frames": 4, "hold": 0.5}]}
     ]},
    {"id": "broll-full-result", "start": 16.0, "duration": 2.6, "transition": {"type": "whip-left"},
     "camera": {"settle": 1.0, "drift": 0.0},
     "layers": [
       {"type": "video", "src": "footage/PLACEHOLDER_broll_result.mp4", "trimStart": 0.4, "muted": true},
       {"type": "text", "text": "show it first", "style": "serif-italic", "size": 11, "y": 46, "anim": "words", "sync": true,
        "at": {"word": "show"}, "fx": {"glow": "#ffffff66"}}
     ]},
    {"id": "a5-tight", "start": 18.6, "duration": 3.8, "transition": {"type": "cut"},
     "camera": {"settle": 1.0, "drift": 0.02},
     "layers": [
       {"type": "video", "src": "footage/PLACEHOLDER_aroll_tight.mp4", "trimStart": 18.6, "muted": true,
        "punch": [{"at": 0, "scale": 1.16, "frames": 1}, {"at": {"word": "every"}, "scale": 1.08, "frames": 4}]}
     ]},
    {"id": "broll-phone", "start": 22.4, "duration": 2.2, "transition": {"type": "zoom"},
     "background": {"kind": "paper", "color": "#ece6d8"},
     "layers": [
       {"type": "ui", "kind": "phone", "src": "footage/PLACEHOLDER_broll_screen_pretrimmed.mp4", "y": 44, "w": 58, "anim": "rise"},
       {"type": "text", "text": "SAVE THIS", "style": "impact", "size": 16, "y": 12, "color": "#111111", "anim": "slam", "at": {"word": "save"}}
     ]},
    {"id": "cta-wide", "start": 24.6, "duration": 3.0, "transition": {"type": "circle"},
     "camera": {"settle": 1.08, "drift": 0.03},
     "layers": [
       {"type": "video", "src": "footage/PLACEHOLDER_aroll_tight.mp4", "trimStart": 24.6, "muted": true}
     ]}
  ]
}}
```
**Why it is built this way**
- `audio.vo` is the tightened A-roll audio and every A-roll layer is `muted`, so the speech runs continuously over 10 scene cuts and drives captions, ducking and word refs.
- Framings alternate tight (1.16–1.2) and wide (1.0) at every jump cut. A bump punch lands on one stressed word per sentence.
- B-roll arrives every ~6–8 s: a card over the blurred speaker, then a full-frame cutaway, then a device frame. Each one enters on a motion cut (`zoom`, `whip-left`).
- The turn gets a 1.0 s void card with `flash` in and `invert` out (v24 v68).
- The keyword slams sit at y 12–20, above the face. Captions sit at y 70.
- The `ui` phone plays its clip from 0, so pre-trim that file.

---

## 12. Worked example B: 5 travel/product clips cut to music

A music-only edit at 120 BPM (beat 0.5 s), 16 s = 8 bars. **Placeholder** beat times assume the first beat at 0.0. Replace them with `beats` and `downbeats` from `work/beats.json`, and start each scene **1 frame (0.033 s) before** its beat. Structure:
- hook: 2 bars on clip 1 with a kinetic title;
- 1 bar each on clips 2 and 3;
- an accelerating montage of 2, 2, 1, 1, ½, ½ beats;
- a 0.5× slow-down "landing" on the sunset (a stepwise ramp, §3; needs a ≥ 50 fps source);
- an end title.

```json
{"spec": {
  "width": 1080, "height": 1920, "fps": 30, "animFps": 0, "duration": 16.0,
  "palette": {"bg": "#0a0a0a", "ink": "#ffffff", "accent": "#ff7a2f", "accent2": "#3fd0c9"},
  "audio": {"music": "music/PLACEHOLDER_track_120bpm.mp3", "musicVolume": 1.0},
  "finish": {"grain": 0.06, "vignette": 0.38, "chroma": 1},
  "scenes": [
    {"id": "hook-coast", "start": 0, "duration": 3.967,
     "grade": {"saturation": 0.85, "contrast": 1.06, "tint": "#ff8a3d14"},
     "camera": {"settle": 1.12, "settleR": 0.85, "drift": 0.03},
     "layers": [
       {"type": "video", "src": "footage/PLACEHOLDER_clip1_drone_coast.mp4", "trimStart": 2.0, "muted": true},
       {"type": "text", "text": "LISBON", "style": "impact", "size": 30, "y": 38, "anim": "letters", "at": 0.467},
       {"type": "badge", "text": "48 HOURS", "variant": "pill", "color": "#ff7a2f", "textColor": "#111111", "size": 4.6,
        "y": 50, "anim": "pop", "at": 1.967}
     ]},
    {"id": "street", "start": 3.967, "duration": 2.0, "transition": {"type": "whip-left"},
     "grade": {"saturation": 0.85, "contrast": 1.06, "tint": "#3fd0c912"},
     "camera": {"settle": 1.0, "drift": 0.0},
     "layers": [
       {"type": "video", "src": "footage/PLACEHOLDER_clip2_street_walk.mp4", "trimStart": 0.8, "muted": true,
        "punch": [{"at": 0.533, "scale": 1.08, "frames": 3}, {"at": 1.533, "scale": 1.08, "frames": 3}]},
       {"type": "text", "text": "walk", "style": "serif-italic", "size": 16, "y": 40, "anim": "focus", "at": 0.033}
     ]},
    {"id": "food", "start": 5.967, "duration": 2.0, "transition": {"type": "zoom"},
     "grade": {"saturation": 0.9, "contrast": 1.06, "tint": "#ff8a3d14"},
     "layers": [
       {"type": "video", "src": "footage/PLACEHOLDER_clip3_pastry_closeup.mp4", "trimStart": 0.3, "muted": true},
       {"type": "text", "text": "EAT", "style": "impact", "size": 26, "y": 36, "anim": "slam", "at": 0.033,
        "fx": {"extrude": 8, "extrudeColor": "#7a2a08"}}
     ]},
    {"id": "m1-tram", "start": 7.967, "duration": 1.0, "transition": {"type": "cut"},
     "camera": {"settle": 1.05, "drift": 0.0},
     "layers": [{"type": "video", "src": "footage/PLACEHOLDER_clip4_tram.mp4", "trimStart": 1.0, "muted": true}]},
    {"id": "m2-sunset-wide", "start": 8.967, "duration": 1.0, "transition": {"type": "flash"},
     "camera": {"settle": 1.05, "drift": 0.0},
     "layers": [{"type": "video", "src": "footage/PLACEHOLDER_clip5_sunset.mp4", "trimStart": 0.5, "muted": true}]},
    {"id": "m3-coast-b", "start": 9.967, "duration": 0.5, "transition": {"type": "cut"},
     "camera": {"settle": 1.0},
     "layers": [{"type": "video", "src": "footage/PLACEHOLDER_clip1_drone_coast.mp4", "trimStart": 9.0, "muted": true}]},
    {"id": "m4-street-b", "start": 10.467, "duration": 0.5, "transition": {"type": "cut"},
     "camera": {"settle": 1.0},
     "layers": [{"type": "video", "src": "footage/PLACEHOLDER_clip2_street_walk.mp4", "trimStart": 6.0, "muted": true}]},
    {"id": "m5-food-b", "start": 10.967, "duration": 0.25, "transition": {"type": "cut"},
     "camera": {"settle": 1.0},
     "layers": [{"type": "video", "src": "footage/PLACEHOLDER_clip3_pastry_closeup.mp4", "trimStart": 3.2, "muted": true}]},
    {"id": "m6-tram-b", "start": 11.217, "duration": 0.25, "transition": {"type": "cut"},
     "camera": {"settle": 1.0},
     "layers": [{"type": "video", "src": "footage/PLACEHOLDER_clip4_tram.mp4", "trimStart": 4.4, "muted": true}]},
    {"id": "landing-sunset-slow", "start": 11.467, "duration": 2.5, "transition": {"type": "invert"},
     "grade": {"saturation": 0.95, "contrast": 1.05, "tint": "#ff8a3d18"},
     "camera": {"settle": 1.15, "settleR": 0.88, "drift": 0.02},
     "layers": [
       {"type": "video", "src": "footage/PLACEHOLDER_clip5_sunset_60fps.mp4", "trimStart": 3.0, "playbackRate": 0.5, "muted": true},
       {"type": "text", "text": "stay a little longer", "style": "serif-italic", "size": 10, "y": 42, "anim": "words", "stagger": 15, "at": 0.533}
     ]},
    {"id": "end-title", "start": 13.967, "duration": 2.033, "transition": {"type": "black", "frames": 2},
     "background": {"kind": "void"},
     "layers": [
       {"type": "text", "text": "SEE YOU\nTHERE", "style": "impact", "size": 22, "y": 40, "anim": "mask", "at": 0.033,
        "accent": ["there"], "accentColor": "#ff7a2f"},
       {"type": "shape", "kind": "underline", "at": 0.533, "x": 50, "y": 52, "w": 46, "color": "#ff7a2f", "stroke": 10, "draw": 6}
     ]}
  ]
}}
```
**Why it is built this way**
- Main cuts sit 1 frame before the beat (v33 v68). Title words and punches land on beats or the "and" (0.533 = the off-beat eighth 0.5 + 1 f after the scene start; v33 v73).
- Montage lengths run 1.0, 1.0, 0.5, 0.5, 0.25, 0.25 s, a 2× then 2× shrink to a 7-frame floor (v16 v65). The second montage clip enters on a 1-frame flash (v17). The montage exits on a 2-frame `invert` into the slowed landing shot (v68).
- The slow-down (0.5×) after the rush is the footage ramp, stepwise (§3).
- One warm tint (8–10% alpha) and the same grain, vignette and 1 px chroma unify five differently shot clips. A cool tint on the street shot gives the warm/cool alternation (v56).
- No captions (music-only). The kinetic titles carry the text, one word or phrase per shot.

---

## 13. Engine gaps that matter for footage

| # | Gap | Status | Why it matters (frequency) | Implementation sketch |
|---|---|---|---|---|
| **G1** | **Subject matte for video** (text behind subject, selective colour, cut-out person on a new background) | **DONE** (by hand): `tools/matte.py` + `video` `transparent: true`. Open: `matte` sugar that stacks base → behind-layers → matte automatically | Text behind subject/object in 21/82, selective colour in 5/82, roto'd subjects in v45 v73 v74 v77 | **Shipped:** `tools/matte.py clip.mp4 out.webm --start T --duration D` (rembg per frame → VP9 WebM with alpha) and `transparent` passed through to `<OffthreadVideo>`, so the matte clip is a second `video` layer with a higher `z` than the text and the same timing. **Open:** Robust Video Matting or a 3-frame temporal median on the alpha for steadier edges, and `matte: "clip.matte.webm"` sugar that renders base → behind-layers → matte automatically. Selective colour = base with `grayscale` + matte in colour |
| **G2** | **Motion tracking** for labels, name tags, masks and pinned titles | **OPEN** | Tracked labels/masks in v11 v56 v67 (16/82 mention tracking) | **Tool:** `tools/track.py clip.mp4 --at 1.2 --box x,y,w,h --out tracks/tag.json`. OpenCV CSRT/KLT, or MediaPipe face/pose for people, outputs per-frame `{t, x, y, scale, rot}` in % of frame. **Engine:** `track: "tracks/tag.json"` on any layer adds the track offset to `x/y` (and optionally scale), after `trimStart`/`playbackRate` mapping. Also smooth with a 5-frame moving average |
| **G3** | **Speed ramps / time remap** | **OPEN** | Constant `playbackRate` only. The camera-ramp version exists as transitions (v04: 9/14 cuts) | **Engine:** `speed: [{at, rate}]` keyframes on `video`. Integrate source time `S(t) = trimStart + ∫rate dt` with eased segments and render per frame by setting the frame's media time (e.g. a `<Freeze>`/`startFrom` trick, or `<Video>` with frame-accurate seek in render mode). **Interim tool:** `tools/ramp.py in.mp4 --map "0:1,1.2:1,1.5:3,2.0:0.5"` builds the clip with ffmpeg `setpts` + `minterpolate=fps=60:mi_mode=mci` for smooth slow-mo |
| **G4** | **Auto silence-cut / A-roll track** | **PARTIAL**: `tools/tighten.py` (silence cut + re-transcribe). Open: the engine A-roll track and `{cut: n}` TimeRefs | Every talking-head edit. Today: `tools/tighten.py` or the §5 script + numeric `trimStart` bookkeeping | **Tool:** promote `tighten.py` (§5) to `tools/tighten.py` with `--pad-in 0.08 --pad-out 0.12 --keep-before "but,here's"` and filler detection. It outputs the tightened mp4/wav, re-transcribed words and the jump-cut list. **Engine:** a top-level `aroll: {src, segments:[[in,out],…]}` that plays a continuous A-roll under all scenes (scenes reference it with `background: {kind:"aroll"}` and keep their own punches/framing), remaps `words` automatically, and exposes `{cut: n}` TimeRefs for the jump cuts |
| **G5** | **Video card aspect + entrances** | **DONE**: `video.aspect` (number, e.g. `0.5625`, `1`) and `video.anim` (any image entrance). Open: `h` on video, a `shrink-to-card` entrance | Cards in v74 are 16:9 *or* 1:1; v25 shrinks full-frame → card over 10 f. (Before `aspect`/`anim`, cards were forced to 16:9 and always faded in.) | Add `aspect: "9/16" \| "1/1" \| "4/5" \| number` (default from the clip's own ratio) and honour `h`. Allow `anim` on video layers (`pop`, `rise`, `slide-*`, `focus`, plus a new `shrink-to-card`: scale from `100/w` to 1 over 10 f, expo-out) |
| **G6** | **Reframe / object position** | **OPEN** | `fit: cover` centre-crops 16:9 into 9:16. Subjects off-centre get cut | Add `focus: {x, y}` (CSS `objectPosition`) and keyframed `pan: [{at, x, y, frames}]` on the video layer. Auto version: MediaPipe face centre per second → smoothed `focus` track (pairs with G2) |
| **G7** | **Per-layer grade on footage** | **OPEN** | `scene.grade` also tints the type, and only `grayscale` is per layer. Footage-only desaturation, lifted blacks and cool/warm grades are the house rule (§6) | Add `filter`/`saturation`/`contrast`/`brightness`/`tint` to `video` layers and `video` backgrounds. Optional `lut: "luts/teal.cube"` via a pre-baked ffmpeg `lut3d` pass |
| **G8** | **Mixed frame rates in one scene** | **PARTIAL**: `smooth: true` keeps footage layers fluid in a stepped scene. Open: stepped footage in a smooth scene, `video` backgrounds | `animFps` freezes the whole scene, including footage. References step graphics at 12–15 fps while footage runs native (v13 v14 v31), or the reverse (v47 v56) | Render `video` layers outside `<Freeze>` (or add `videoFps` / `stepVideo: false`), so graphics and footage step independently |
| **G9** | **Per-scene letterbox window** | **DONE**: `scene.letterbox` animates between scenes (close and open). Open: a custom duration | 9/82 use an animated letterbox band (255 px bars at 1280, opening over ~10 f). `finish.letterbox` is global and static | `scene.letterbox: {size: 20, animate: "open" \| "close", frames: 10}` → animated `clipPath: inset()` on the scene |
| **G10** | **Crop/blur regions in footage** | **OPEN** | Burned-in source subtitles compete with the caption track (v14 v24 v27) | `video.crop: {top, bottom, left, right}` (%) and `video.blurRegion: [{x, y, w, h}]` (a backdrop-filter rect inside the clip box) |
| **G11** | **Per-scene caption control** | **OPEN** | The global `captions` track also shows over keyword cards and title scenes | `scene.captions: false` (or a style override per scene). A `build` style (lowercase, words appear on their timestamp, newest word in `activeColor`) for the v45 spine. Optional per-word `emphasis` list rendered in the accent at 2× size (v24) |
| **G12** | **Trim for UI device frames** | **OPEN** | `ui` phone/window `src` video ignores trims and always plays muted from 0 | Pass `trimStart`, `playbackRate`, `muted` through to the `<OffthreadVideo>` in `UI.tsx` |
| **G13** | **Beat TimeRefs** | **DONE**: `spec.beats` + `{beat: n}` / `{downbeat: n}` / `{onset: n}`, `scene.snap`. Open: `{eighth: n}` | Music edits need numeric starts copied from `beats.json` | Top-level `beats: "beats.json"` + TimeRefs `{beat: n, offset}` / `{downbeat: n}` / `{eighth: n}`, mirroring word refs |
| **G14** | **Freeze-frame** | **OPEN** | Freeze holds (v40 holds the last frame of all 3 tapes) and stills for text-behind-subject need manual ffmpeg exports | `video.freezeAt: TimeRef` holds the current source frame from that moment (Remotion `<Freeze>` around the video) |
