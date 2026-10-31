# Typography & colour systems

What the 82 reference videos do with type and colour, turned into rules that map onto the VideoSpec engine (`engine-spec.md`). Counts such as "31/82" come from scanning the visual-language section of every breakdown (`references/breakdowns/vNN.md` §2) and are accurate to ±2–3 videos. Sizes are given as % of frame width (fw) or % of frame height (fh). Pixel values marked "@720" were measured on 720-wide frames; multiply by 1.5 for the engine, whose `fx` pixels are 1080-wide units (`unit = width/1080`).

---

## 0. House rules (do these by default)

| # | Rule | Evidence |
|---|---|---|
| H1 | **Each scene has one dominant field colour, one neutral and one accent.** There is never a second saturated accent in the same frame. | ≈46/82 state it outright (v04 v05 v08 v11 v15 v17 v19 v47 v62 v63 v64 v74 …) |
| H2 | **The accent means something, and keeps meaning it** for the whole video: red = problem/negation, green = win/money/brand, yellow/gold = "the thing"/value, orange = the reveal. | ≈40 videos assign accent semantics (see §5.2) |
| H3 | **Only the keyword becomes type.** 1–3 words per clause, word-synced. The narration is not subtitled unless you deliberately use the two-layer system (§4.9). | ≈70/82 have no persistent subtitle track |
| H4 | **The keyword is set big and heavy, and the connector words small and light**, in the same lockup. | 41/82 show explicit size jumps; 21/82 explicit whisper/lead-in pairing |
| H5 | **One emphasis device per line**: colour, OR size, OR a drawn mark, OR a container. Never stack all four on one word. | v15 v21 v25 v27 v44 v63 v71 v76 v80 |
| H6 | **Type lives in the scene.** Depth-sort it behind the hero object, print it on props, or carry it on a physical label. Don't float it like a sticker over everything. | behind-subject 31/82, in-scene/prop text ≈30/82 |
| H7 | **Change the background with the clause** and never repeat a background colour in two consecutive shots (collage/explainer mode). | 21 say so explicitly; ≈55/82 change surface per beat |
| H8 | **One finishing pass over everything**: grain + vignette (+ halftone for print looks). This is what welds stock, AI stills, UI and footage into one world. | grain 72/82, vignette 71/82, halftone 48/82 |
| H9 | **Keep important type between y 12% and 78% on 9:16.** Subtitles go at y 68–76%. Nothing goes below ~82%. | v08 v10 v13 v14 v16 v19 v21 v25 v53 v62 v63 |
| H10 | **Proofread every on-screen string.** Giant type magnifies typos, and 6 references ship them (v16 v54 v62 v63 v69 v70). | — |

---

## 1. Typeface classes

### 1.1 Frequency and engine mapping

"Any" = the class appears somewhere in the video (counted). "Primary" = it carries most of the on-screen type (judged from the notes, so treat it as approximate).

| Class | Typical fonts in refs | Any | Primary voice | Register / job | Engine `style` | Free Google alternative if missing |
|---|---|---|---|---|---|---|
| **Heavy condensed grotesk**, caps | Anton, Bebas Neue, Oswald Bold, League Gothic, Druk Condensed, Impact | 32 | ≈14 | Poster keyword, slogans, section titles, burned-in captions | `impact` (Anton) · `condensed` (Oswald 500/700) · `bebas` (Bebas Neue) | Bebas Neue, League Gothic, Big Shoulders Display Black, Antonio |
| **Wide / extended ultra-heavy grotesk**, caps | Archivo Black, Helvetica Neue Black Extended, Druk Wide, Monument Extended | 28 | ≈12 | Collage hero stacks, alarm words, statement cards | `grotesk` (Archivo Black, moderately wide) | For truly extended type: Archivo (variable, wdth 125, wght 900), Unbounded Black, Rubik Mono One, Krona One |
| **Heavy geometric sans**, caps | Montserrat Black/ExtraBold, Gilroy Black, Poppins Black, Futura Heavy | 27 | ≈8 | Hero caps with a softer, rounder voice; badge text | `geometric` (Poppins 900; `weight: 800` for ExtraBold) | Montserrat 900, Poppins 900, Outfit 900 |
| **Rounded heavy display** | Bowlby One, Rubik Black, Lilita One, Fredoka, Dela Gothic One, Cooper Black, SF Pro Rounded | 34 | ≈7 | CTA stickers, playful titles, numbers, "toy" worlds | `rounded` (Nunito 900, SF Pro Rounded class) | Bowlby One, Rubik 900, Lilita One, Fredoka 700, Dela Gothic One, Titan One, Nunito 900 (for SF Rounded) |
| **Clean neo-grotesk**, sentence case | Inter, SF Pro, Helvetica Neue, Neue Haas, Geist | ≈60 (incl. UI copy) | ≈22 | Keynote/SaaS promos, UI text, small "confident" captions | `clean` (Inter 600) | Inter (400–900), Inter Tight, Geist, Archivo |
| **Geometric/humanist product sans** | Poppins, Google/Product Sans, Sora, Plus Jakarta, Figtree | 22 | ≈6 | Quiet captions, whisper lines, soft-UI products | `geometric` with `caps: false, weight: 600` (Poppins 600), or `clean` | Poppins 400–600, Figtree, Plus Jakarta Sans, Sora, Outfit, DM Sans |
| **Italic serif** (condensed, high contrast) | Instrument Serif Italic, Editorial New Italic, Playfair Italic | 21 | ≈10 | History, biography, "voice/attitude", documentary narration | `serif-italic` (Instrument Serif) | Instrument Serif; for heavy italic payoffs use Playfair Display Black Italic or DM Serif Display Italic |
| **Roman display serif / Didone** | Playfair, Bodoni, Didot, DM Serif Display, Gloock | ≈19 | ≈3 | Emotional keyword, mastheads, "luxury" lockups | `serif` (Playfair 700/900) · `didone` (DM Serif Display) | Playfair Display, Bodoni Moda, DM Serif Display, Gloock, Fraunces Black |
| **Text / transitional serif** | Lora, Libre Baskerville, Newsreader, Source Serif, Times | ≈10 | ≈2 | Subtitle pill (v25), book-ish openers (v27), motivational (v42) | `serif` (approx.) | Newsreader, Source Serif 4, Libre Caslon, Lora, Tinos |
| **Slab / wood-type / Clarendon** | Rockwell, Clarendon, Rye, Cooper | 16 | 0 | Americana, history plaques, "old poster" asides | `slab` (Roboto Slab 800) | Rye, Alfa Slab One, Zilla Slab 700, Roboto Slab 900 |
| **Inscriptional caps** | Cinzel, Trajan | 2 | 1 (v32) | Ancient/museum headings | none | Cinzel, Cinzel Decorative |
| **Typewriter slab** | Special Elite, Courier Prime, American Typewriter | 16 | 2 (v30 v63 stats) | "Plain truth", dates, stats, vote bars, desk notes | `typewriter` (Special Elite) | Special Elite, Courier Prime |
| **Code monospace** | JetBrains Mono, IBM Plex Mono, Roboto Mono | 11 | 1 (v18) | HUD labels, terminals, code jokes, label-maker strips | `mono` (JetBrains 500/700) | (covered) |
| **Casual handwriting / marker** | Caveat, Gochi Hand, Patrick Hand, Permanent Marker | ≈28 | 2 (v27 v25 notes) | Sticky notes, annotations, asides, "human" voice | `script` (Caveat 700) · `marker` (Permanent Marker) | Gochi Hand, Patrick Hand, Kalam, Caveat Brush |
| **Thin monoline signature script** | Allura, Great Vibes, Amsterdam | 9 | 0 | Names, poetic parallels, a small colour echo under a headline | `signature` (Mrs Saint Delafield) | Allura, Great Vibes, Mrs Saint Delafield, Monsieur La Doulaise |
| **Tall condensed marker** | Shadows Into Light, Reenie Beanie | 2 (v82 v83) | 2 | Single punch noun next to a tight grotesk | none | Shadows Into Light, Reenie Beanie |
| **Pixel / bitmap** | Silkscreen, Pixelify Sans, VT323, Press Start | 11 | 1 (v70) | Game/retro worlds, time jumps, LCD props, CTA URLs | `pixel` (VT323, thin) | Pixelify Sans 700, Silkscreen, Jersey 10, Press Start 2P (chunkier than VT323) |
| **Techno / squared** | Eurostile Ext, Orbitron, Audiowide, Bungee, Russo One | 6 | 0 | URL/brand labels in CTAs | `tech` (Space Grotesk 700) is the nearest; squared display faces are a gap | Orbitron, Audiowide, Bungee, Russo One |
| **Comic** | Bangers, Komika | 7 | 0 | Speech bubbles | none (`ui.bubble` uses Inter 800) | Bangers |
| **Blackletter** | Old English, UnifrakturCook | 3 | 0 | Newspaper mastheads only | none | UnifrakturCook |

### 1.2 Typeface is a scene property (the register map)

Collage and explainer edits change the face with the world or with the rhetorical job (v08 v12 v13 v21 v23 v48 v53 v64 v66 v78). Assign faces by **job**, not at random:

| Job of the line | Face | Refs |
|---|---|---|
| Claim / fact / number / alarm | heavy condensed or wide grotesk caps (`impact`, `grotesk`) | v05 v06 v11 v15 v17 v19 v63 |
| Voice, attitude, emotion, history, the moral | italic serif (`serif-italic`), small | v24 v26 v29 v31 v45 v47 v65 v73 |
| Product / UI / "premium SaaS" | clean grotesk sentence case (`clean`), small | v07 v33 v49 v51 v55 v59 v61 v71 |
| Plain truth, stats, dates, typed facts | typewriter / mono (`mono`) | v22 v30 v63 v78 |
| Aside, annotation, human touch | handwriting (`script`, `marker`) | v13 v25 v27 v53 v74 v81 |
| Game, retro tech, a time jump | pixel (`pixel`) | v08 v16 v53 v70 |
| Payoff / CTA | rounded heavy, or the hero face with extrude | v36 v37 v63 v67 v68 |

**Limits.** Use at most 3 faces in the body of a video (v37 uses exactly 3; v44 uses 3). The exception is a **4-voice mixed lockup in the hook only** (v02, v50), after which you drop back to one clean face. A "one face per scene" collage (v08 v64 v48 with 7–13 faces) works only when one heavy grotesk stays the recurring voice (v12 lesson). Premium SaaS mode uses **one family for everything** (v07 v38 v49 v59 v61 v71).

---

## 2. Pairing systems

### 2.1 Display + whisper (size and weight contrast)

The keyword is heavy and large; connectors ("the", "is", "how you") are light or small and sit tucked against it. Measured keyword:connector size ratios:

| Band | Ratio | Where | Refs |
|---|---|---|---|
| Editorial calm | **1.2–2×** | stepped two-line headline, last word one step bigger | v83 (1.2×), v82 (1.25–2×), v45 (1.3×), v19 (1.7×), v74 (1.8×) |
| Poster | **2–3×** | lead-in line over payoff line, size see-saw | v24 (2–2.5×), v64 (2.25×), v34 (2.4×), v69 (2.5×), v79 (2.5×), v17 (≈3×), v31 (number 3×) |
| Keynote extreme | **5–10×** | one giant word, tiny sentence | v75 (5×), v29 (≈5×), v62 (≈6×), v55 (≈7×), v54 ladder (8:1), v80 (≈8×), v71 (8–10×) |

Rules:
- **Pick one band per video and stay in it.** Collage explainers live in the poster band; Apple/SaaS promos in the extreme band (everything small except 1–3 hero words); documentaries in the calm band.
- Whisper words are 8–15% fw (v54), 10–15% fw (v62) or 20–30% fw (v34). Hero words are 55–95% fw.
- **Weight contrast inside one family** gives editorial polish with zero new fonts: Black + Light Italic (v01), Light + Heavy Italic at 1.8× (v74), Regular + SemiBold (v38, v76). *Engine:* two `text` layers with different `weight` (e.g. `clean` at `weight: 800` over `clean` at `weight: 400`). Only loaded weights render true: Inter 400/600/800, Poppins 600/800/900, Nunito 300/800/900, Playfair 700/900, Roboto Slab 400/800, Space Grotesk 400/700; other values are synthesised or snap to the nearest. There is no Inter Light or Light Italic (gap G1).
- The **size see-saw** is small – BIG – small ("IT / REVEALS / you.", v42; "Forty five / **billion** / dollars", v24; "SUDDENLY / **LONG SHIPS** / APPEAR…", v32).
- **Mixed-scale satellite lockup**: the hero word at 55–70% fw with tiny satellite words at ~12% of its size orbiting it (v80, v54, v50).

### 2.2 Two-tone line splits

Split a 2-line stack into **setup line in neutral, payoff line in accent**, same face and size. Seen in 13/82 (v05 v09 v17 v20 v21 v34 v38 v44 v47 v63 v68 v76 v79).
- White line + red/green line (v05 "THEY EVEN CALLED / THEIR OWN CAR").
- Light-grey setup + glowing yellow-orange payoff `#f6c21a→#e08a00` (v68).
- Cream + orange action word: "One **Click**" (v38).
- Navy line + red line under one heading, a brand two-colour split (v09).
- **Antithesis = inverted palette**: line 1 dark green `#0e493c` on mustard, line 2 mustard `#e1b15c` on dark green (v20).
- A three-colour 3-line CTA stack, each line with its own darker extrude: mustard/red/blue (v67), red/grey/larger black (v56, v63).

*Engine:* `accent: [...words]` + `accentColor` for the payoff words, or one `text` layer per line.

### 2.3 Stack shapes

| Shape | Description | Refs |
|---|---|---|
| Centred ragged poster | 2–5 lines, leading 0.85–0.95, tracking −1…−3%, lines touching | v06 v08 v10 v34 v44 |
| Stair-step | each line indented right and/or larger | v03 v14 v54 v83 |
| Three-tier headline | small caps / HUGE accent / small caps (35% / 80% / 85% fw) | v32 |
| Staircase words | one word per line stepping diagonally | v54 v64 |
| Neon multi-colour stack | 6 lines, each its own colour, size and bloom, justified to ~50% fw; the verb is largest | v64 |
| Split around subject | the word divided either side of a body or trophy ("DO \| WN", "MORE \| WEIGHT" at 38% each) | v16 v23 v77 |
| Two-column flank | caption words in two columns either side of a phone, 25% in from each edge | v46 v51 |

*Engine:* stacks = `\n` breaks in one `text` layer. Per-line sizes use `lineSizes`, e.g. `"text": "IT\nREVEALS\nyou.", "lineSizes": [0.45, 1.6, 0.45]` for the small – BIG – small see-saw. Different fonts or colours per line still need one layer per line.

### 2.4 Cross-family pairings that recur

- **Grotesk = information, italic serif = attitude** (v45 v65 v67). The italic serif gets the emotional word at up to 78% fw ("motion", v65) while the rest stays tiny.
- **Bold grotesk + coloured script echo**: a small monoline script repeats the headline, right-aligned under it at ~45% of its size, in the accent colour (v81). Tight bold grotesk + one halftone handwritten punch noun with a blurred ghost copy (v82 v83).
- **Heavy caps + soft script**: "DON'T" + 3D script "Tell" (v23); "STYLE" + handwriting on a post-it (v53).

---

## 3. Sizes, placement and safe zones

### 3.1 Size by mode (engine `size` = % fw)

| Element | Size | Refs |
|---|---|---|
| Collage keyword, 1–2 words | **70–95% fw** (`size` 18–30 for Anton caps) | v05 v08 v10 v11 v23 v53 v62 |
| Hero stack, 2–4 lines | 55–75% fw per line | v06 v09 v12 v20 v34 v68 |
| Giant bleed word | 100–180% fw, cropped by the frame | v38 (92% bleeding), v45 (≈100%), v57 (180%), v71, v78 (130%), v82 (140%) |
| Keynote hero word | 40–50% fw, cap height 13–27% fh | v07 (47%), v55 (40–46%), v71 (85%) |
| Italic serif caption (doc mode) | 30–50% fw per chunk, cap height ≈3% fh | v26 v29 v31 v73 |
| Single italic serif word | 12–35% fw | v29 v47 v50 v64 v67 |
| Keynote sentence / SaaS caption | 12–37% fw, cap height 2.2–4% fh | v33 v51 v57 v59 v61 v75 |
| Lead-in / connector | 10–30% fw, or 35–45% of the hero's cap height | v34 v62 v69 v70 |
| Micro labels, HUD, metadata | cap height 1.5–3% fh, tracked +10…+150 | v18 v38 v40 v41 v54 |

**Cap height vs font size:** cap height ≈ 0.7 × font size for Inter/Helvetica and ≈ 0.75–0.8 × for Anton/Oswald. On 9:16, 1% fh = 1.78% fw. A "2.5% fh cap" caption is therefore ≈ 6% fw font in Inter.

### 3.2 Subtitle / caption sizing

| System | Font | Size | Box | y (9:16) | Refs |
|---|---|---|---|---|---|
| Subtitle pill | Helvetica/SF Medium–Bold, sentence case | 3.6–4% fw | rounded rect, r 6–8 px@720, `rgba(30,30,30,.55–.6)`, pad 6×12 | 68–76% | v08 v14 |
| Serif pill | Source Serif / Newsreader Semibold | 3.6% fw | `#2a2a2a` @80%, r 4, pad 6×10 | 76% | v25 |
| Caption bar | Oswald Medium caps | cap 2.3% fh (≈6% fw font) | square black box 70–75% alpha, pad 6×8 | 75% | v13 |
| Bar, no radius | Inter Semibold | cap 2.5% fh | black 50% | 68% | v16 |
| Running caption, no box | Inter Light lowercase, wide word gaps (~1.5 em) | cap 2.2% fh, line 35–60% fw | none, soft shadow | 55–75% | v45 |
| Found-footage caption | Source/Open Sans Semibold | 4% fh | black 55% | 72% | v11 |
| Footage highlight box | the video's own italic serif | 3% fh cap | tight `#111` @90%, pad 4–6, no radius | on chest | v31 v26 |
| Burned-in "creator" caption | Anton caps, yellow `#f2c12e` with 2 px dark stroke | ≈25% of the video's width, one word | none | centre | v77 |

Chunking: 2–5 words per chunk (pill) or 1–4 (bar). Switch on the first word's VO start (±0.1 s). The art-directed keyword lands ~0.3 s after (v08). Translucent black boxes **take on the scene tint** (maroon on red, dark green on green), so don't colour them.

*Engine:* `captions: {enabled, style: "pill"|"bar"|"karaoke"|"bold", y, maxWords, size, bg, font}`. Defaults are already pill 3.6 / bar 4.2 / bold 8.5 at y 76 (bold y 68). Use `font: "serif"` for the v25 serif pill.

### 3.3 Vertical placement per aspect ratio

| Aspect | Hero keyword band | Captions / subtitles | Keep clear | Refs |
|---|---|---|---|---|
| **9:16 collage / explainer** | y 15–55%: upper third (15–35%) when a prop owns the centre, dead centre (45–55%) on type-only cards | y 68–76% | bottom 18–22% (IG/TikTok UI); top 8% | v05 v06 v10 v13 v14 v16 v20 v21 v53 |
| **9:16 documentary (italic serif)** | on the subject: beside the head (25–35%) or across the chest (45–60%); alternate left/right so the face stays clear | none, or the box variant on bright footage | lower third. Captions are never at the bottom | v24 v26 v31 v73 |
| **9:16 keynote / SaaS** | dead centre y 48–52%, single line, 25–30% side margins | — | corners | v07 v55 v59 v71 v76 |
| **9:16 with hero low** (prop at 60–100% fh) | type at y 8–25% | — | — | v32 v62 v68 |
| **9:16 face fills top** | type low, y 72–82% (exception) | — | — | v11 |
| **1:1** | centre band y 40–60%; type wraps the subject, dense to the edges | — | — | v23 v28 |
| **16:9** | thirds: headline top-left (x 0–38%, y 12–28%), product centre, giant word full-width behind | subtitle y ≈86% | no social safe zone; keep 4% margins | v38 v46 v57 v58 |
| **Letterboxed window inside 9:16** | type inside the band (e.g. 720×770 band at y 255–1025 px of 1280), active line at y 45–60% | — | the bars themselves | v04 v76 v77 v78 v79 |
| **Print-frame wrapper** (3:4 page around a 9:16 window) | headline in the top 20%, 36–38 px@720 margins | vote/CTA bar in the bottom 7% | — | v40 v41 v43 |

*Engine:* `y` is the layer centre in %; the default 40 is already the upper-middle band. Letterbox with `scene.letterbox` (% of height per bar; the bars animate in ~6 frames when the value changes between scenes). `finish.letterbox` is a static bar over the whole video.

---

## 4. Type treatments

Frequencies count videos whose typography notes describe the treatment.

| Treatment | Videos | Parameters seen | Use it for | Engine |
|---|---|---|---|---|
| **3D extrude / long shadow** | 22 | depth 4–10 px@720 (≈6–15 engine px) down-right; colour = fill darkened ~50% (white → `#8a8a8a`, red → `#7a0c10`, yellow → dark brown); often + soft shadow | collage hero words, CTAs, signage standing on props | `fx: {extrude: 8–14, extrudeColor}` |
| **Doubled / misregistration offset** | 7 | same-colour copy at ~40% opacity (v05); hard red copy +4 px@720 under yellow (v19); RGB-offset outline ±4 px on cut-outs (v28) | print/retro look on a hero claim | `fx.doubled` (same colour only; red-under-yellow needs a 2nd layer) |
| **Outline / stroke** | ≈25 (type only) | 2–4 px contrasting outline + dark extrude (v60 section titles); 3 px black stroke on yellow (v04 v16); outline-only neon 2 px + 8–12 px glow (v34); hollow 1–1.5 px at 40% opacity behind content (v42); white 6–8 px "sticker outline" (v76 v80) | titles, sticker words, ghost layers | `fx: {stroke, strokeColor}` (stroke alone = hollow; with extrude = filled) |
| **Glow / bloom on type** | 39 | white 8–12 px @40% on photos (v24 v26 v41 v54); keyword colour, radius ≈0.8× cap height @60% (v71); yellow 20 px (v64); lime 20 px @60% + olive drop shadow 3 px (v69) | dark scenes, backlit/neon looks, the emotional word | `fx.glow: "#hex"` (two-ring halo) |
| **Hard drop shadow** | ≈8 | 4 px offset, 0 blur, black (v14); 6 px hard (v70 pixel); emboss shadow 6 px / blur 8 / 60% (v47) | sticker and pixel looks | `fx.doubled` (hard same-colour offset copy at 7 px/1080); `fx.shadow` is soft; a black hard shadow is a gap (G11) |
| **Highlight bar / marker sweep** | 19 | box wipes L→R behind the word in ~4 frames (v74); yellow highlighter on a headline (v31 v67); lime highlighter pill at ~45% of line size (v80); red box caret-wipe (v03) | the moral's pivot word, names, UI labels | `highlight: "#hex"` (skewed bar, scaleX wipe) |
| **Drawn marks** (ellipse, underline, scribble, strike, X) | 35 | marker ellipse ~10 px stroke@720 in red `#c92f31` (v37) or yellow/lime (v22 v24 v73); a 2 px underline that grows with the typing (v63 v67); strike-through L→R (v07) | the one key number/word per scene | `shape` `ellipse`/`underline`/`scribble`/`cross` + `draw` frames; `text.underline` |
| **Label badges, tags, pills, tape** | 65 (all containers) | solid rect r 6 px with white heavy caps; torn-paper strips; tape at −2°; tilted luggage tags −30° (v14); name tags on solid red/blue rotated −3…−8° (v56 v67) | names, verbs that change, list items | `badge` `variant: solid\|pill\|tape\|outline` |
| **Stitched badge** | 7 | dashed inner border 1–2 px, inset ~6 px; maroon, black, green, yellow `#f2c40f`, gold `#e0b40a` | warm "patch" labels in collage explainers | `badge variant: "stitched"` |
| **Behind-subject placement** | 31 (type notes), ≈40 incl. layout notes | keyword 74–100% fw behind a cut-out that hides 1–3 letters (v06 v37 v38 v45 v68); covered letters redrawn as a 1 px outline over the body (v37); type sandwiched between a fg prop and the bg (v23 v53) | almost every collage poster | `z` order: text layer below an `image` `cutout` layer. Footage: `video` background → `text` → `video` `transparent: true` matte from `tools/matte.py` (see `footage-editing.md` §3) |
| **In-scene / prop-surface text** | ≈30 | perspective-matched paint on a pitch, road or facade (v16 v34 v56); multiplied onto a notebook at −12° (v11); burned into logs (v32); 3D metal words standing on a TV (v43); glowing signage on a building (v73) | making words "found in the world" | `tilt: [rotX, rotY]` for perspective (55–70° rotateX for floor type), `rotate`, `fx.blend: "multiply"`; skew and perspective-matched tracking are gaps (G7) |
| **Karaoke / grey→ink reveal** | 17 | unspoken words grey `#7a7a7a`–`#9a9a9a` (or 30–40% grey) → ink over 6–10 frames as they are spoken (v19 v29 v61 v75 v76 v82); spoken word green, others grey (v77) | calm SaaS, docs, quote cards | `anim: "karaoke"`, `dimColor`, `sync: true`; `anim: "ghost"` for small-grey→solid |
| **Colour leading edge on typing** | 5 | new chars cyan `#28f8e0` → white over 6–8 f (v07); last 6–10 chars cyan or rainbow (v46 v51); new letters lavender at 20% → ink over 8 f (v55); typed chars orange → white (v58) | anything typed; "AI generating" | `anim: "typewriter"`, `leadColor`, `cps` |
| **Word blur-in** | ≈12 | Gaussian 8 px → 0, opacity 0→1, tracking +0.2 em → 0, 4–8 f (v51 v61 v74) | premium calm captions | `anim: "focus"` |
| **Giant blurred echo / DOF type** | ≈8 | same word ×2.5–3.5, pale grey `#e3e3e3` or 35% opacity, cropped, behind (v69 v71 v76 v77); phrase huge and blurred 6–10 px in fg + bg, sharp in the middle (v81); offset ghost copy 35–40% opacity, 12–25 px blur, +0.6 em down (v82 v83) | depth without imagery | duplicate `text` layers with `blur`, `opacity`, `z` |
| **Gradient fill** | 13 | white → light grey vertical (`#fff → #c8c8c8`, v20 v66); cream → taupe L→R, "lit from left" (v38); purple gradient on the active list item (v55) | silver/metal headlines | `fill: "linear-gradient(180deg, #fff, #c8c8c8)"` (any CSS gradient) |
| **Halftone / texture inside letters** | ≈8 | halftone fade-out to the bottom (v28); dot fill (v15 v80); grunge/distressed fill (v08 v41 v62); grain inside letters (v76) | print looks | `fill: "textures/halftone.png"` (an image `src` under `public/` fills the letters); a procedural halftone fill is a gap (G4) |
| **Difference / multiply blend** | 9 | white type flips to blue over a yellow disc (v17); letters overlapping a red "?" flip to white (v21); multiply type onto a coloured card (v14 v19) | type crossing shapes | `fx.blend: "difference"\|"multiply"` |
| **One word at a time** | 9 | one italic serif word per spoken word, centred (v29 v47 v56 v64 v67) | ceremonial moral, reflective lines | `anim: "words"` + `sync`, or `anim: "swap"` |
| **Container leads, words trail** | ≈4 | an empty pill pops ~0.1 s before the phrase, then fills word by word (v44) | quotes, badges | `badge` + `anim: "words"` |
| **Letter-level tricks** | ≈8 | per-letter drop with bounce and baseline jitter (v60 v62); scramble assemble (v45 v81); wide tracking +400 collapsing to normal (v57 v75); stretched letters "driiivve" (v78); glyphs swapped for icons at cap height (v59) | titles, single emphasis words | `anim: "letters" \| "scramble"`; tracking collapse and glyph swap are gaps |

### 4.9 Two-layer system: subtitle pill/bar vs hero keyword

Six collage explainers (v08 v13 v14 v16 v25 v45) run **two text layers with separate jobs**:
1. A constant, neutral subtitle (pill or bar, §3.2) for comprehension. It changes on the word and persists across cuts.
2. An art-directed hero keyword (paraphrased, 1–3 words) for emphasis. It lands ~0.3 s after the word, and its treatment may change every scene.

Use it when the VO is dense and fast (>3 words/s) or the audience may watch muted. Everywhere else, use keyword-only type (H3). Never style the subtitle; keep it identical for the whole video (v13 lesson: "change the hero treatment per scene, keep the caption constant").

### 4.10 Emphasis rules (which word gets the accent)

1. **The payoff word of each line is the biggest or the coloured one**, never both plus a mark: CHOICE, DECOY, SMARTER (v12); JUST, COST, HOURS (v06).
2. **The pivot word** of a turn gets the accent (yellow CHANGED, v15; orange TURNED IT INTO SOME, v66). The whole climax line may take the accent once (orange, v15).
3. **Numbers are the largest type on screen** and get their own beat (v30 v31). Typical treatments: tiles, flip counter, or italic serif at 3× caption size.
4. **Proper nouns** get a label tab, a name tag or a roman title, not colour (v56 v63 v66 v67).
5. **Negation** gets red, a black bar, an X, or a prohibition sign stamped over the "o" of "not" (v06 v27 v81).
6. **Emphasis by device, not weight**: ellipse, sticky note, marker swipe (v25 v27). **Never use the same device twice in a row** (v76 v80): squiggle → selection box → glow underline → colour swap.
7. **Temporal colour**: the key word is red only while it's new, then turns black (v59); the newest word is brightest (v19).
8. **Caps + huge only in the hook**; afterwards emphasis comes from colour or a UI affordance (v79).
9. **Ration type**: in mood pieces only 3 phrases get type at all (v37 v39).

---

## 5. Colour

### 5.1 Palette structures

| Structure | Videos | Recipe | Refs |
|---|---|---|---|
| **Dominant field + neutral + 1 accent per scene** (default) | ≈46 | saturated or textured field; type white on mid/dark, black on light; one accent for the keyword | v05 v08 v11 v15 v17 v19 v62 v63 v64 |
| **Neutral base + one brand accent for the whole video** | ≈20 | black/white/grey everywhere; one hue marks every action (button, keyword, cursor, glow, URL) | v07 v18 v33 v38 v52 v55 v57 v69 v76 v78 v79 v82 v83 |
| **One colour world, never changes** | 5 | locked ground + locked treatment; only the hero object changes | v30 (sepia), v32 (parchment), v38 (charcoal), v54 (oxblood), v57 (dark green) |
| **B/W (or desaturated) + 1 accent** | ≈12 | world sat ≈0–15/255; one accent for "the thing" and for annotations | v02 v22 v24 v25 v29 v31 v48 v73 |
| **Brand-lifted palette** | ≈6 | pull field and accent from the subject's brand; keep footage desaturated so the graphics own the colour | v09 v14 v47 |
| **One counter-colour pair** (IP palette) | 2 | e.g. red + navy across all scenes | v28 |

Contrast rule (v06 v78): **white type on mid/dark fields, black or dark-tone type on light fields, never mid-tone type on a mid-tone field.** The one deliberate exception is low-contrast "heavy" words (maroon STRUGGLE in a spotlight, v70; navy on black, v62).

### 5.2 Accent semantics

| Colour | Meaning | Refs |
|---|---|---|
| **Red / brick / oxblood** | negation, problem, danger, refusal, death, price/warning, "the selling side", the mistake | v04 v05 v06 v12 v17 v19 v20 v21 v27 v29 v55 v62 v63 v67 v75 |
| **Green (signal/lime/emerald)** | win, money, improvement, the solution, the prize, the brand's own words | v04 v05 v13 v17 v34 v53 v63 v75 v78 |
| **Yellow / gold** | "the thing that matters", value, wisdom, key facts, names, annotations | v12 v17 v20 v22 v24 v31 v68 v73 |
| **Orange** | the reveal, dates and threats, the action word | v10 v13 v19 v38 |
| **Cyan / electric blue** | technology, AI streaming, the timer/payoff, light in dark UI | v07 v33 v41 v46 v65 |
| **Neon outline green / blue** | positive solution phrase / the moral | v34 |
| **Cool vs warm** | the two sides of an antithesis (Batman cool / Joker warm; prison grey / lab amber; promise teal / doubt mustard) | v19 v37 v39 v64 v82 |

A full semantic set used by one video: red = keyword, white = connectors, neon green = solution, neon blue = moral, yellow = small labels (v34).

### 5.3 Per-scene hue rotation

- **One hue per clause/poster, changing on nearly every cut** (≈45/82). v06 runs 25+ paper colours in 40 s; v08 runs 22 backgrounds in 47 s; v23 runs 7 colour worlds in 14.7 s (one per lyric line).
- **Insert a black card between saturated sets**: never two saturated sets in a row (v10). Black statement cards every ~8–10 s act as palate cleansers (v11).
- **Hue tracks mood**: optimistic sky/teal for the claim, mustard/red for the doubt (v19).
- **Save one new colour for the payoff**: cyan only for "the timer" (v41), one red second hand (v42), full colour only at the payoff (v24 v31).
- A **per-entry accent** on a fixed template gives series identity: orange / teal / oxblood (v40–v43).

*Engine:* set `background.color` per scene and `palette.accent` globally; override with `accentColor` per layer.

### 5.4 Light/dark alternation

23/82 alternate luminance as a rhythm device; every cut doubles as a luma hit. Measured mean luma per shot:
- v53: 71 → 159 → 60 → 143 → 72 → 33 → 166 → 136 → 168 → 38
- v74: 6 → 198 → 28 → 245 → 152 → 48 → 225 (first 12 s)
- v82: 16 → 54 → 34 → 197 → 49 → 7 → 126 → 36 → 119 → 28 → 71 → 221
- v61: 215 ↔ 25, three swings, each one a transition event

Rule: alternate between luma < 60 and luma > 140 on consecutive scenes, and hold a dark "emotional middle" section for 6–10 s (v76, luma 30–60). A **brightness slam for the CTA** works after a long dark run: an amber card at luma 154 against 30–70 before it (v44).

### 5.5 Selective colour, B/W + accent, grade as story

| Device | Parameters | Refs | Engine |
|---|---|---|---|
| **Selective colour**: the world desaturated, the hero keeps colour | world sat 10–40/255; the hero's suit, a green bin or the product in colour | v24 v26 v29 v31 v73 | `image` `grayscale` on everything except the hero cut-out; or `grade.saturation` + an un-graded cut-out (gap G8) |
| **Drain on a beat** | sat 35 → 7 over ~6 f on "he said no" (v17); 65 → 0 in 4 f (v23); 84 → 35 over 6 f on "death" (v67); full → mono on "ugly car" (v05) | v05 v17 v21 v23 v67 | `grade.drainAt: {word}` (6 frames) |
| **Colour returns at the payoff** | sat 4 → 36 on "Today…" (v31); 0 → 78 over 9 f (v23) | v23 v31 | per-scene `grade.saturation` |
| **Past = B/W, present = colour** | — | v31 v34 v48 | `grade.saturation: 0` for past scenes |
| **Same set, regraded** for a reversal | sepia triumph → cold blue-grey backlash on the same stage | v26 | `grade.tint` |
| **Tint the losers** | non-chosen elements wash to `#c0303a` at ~70% over 0.4 s | v20 | gap (per-layer tint, G8); approximate with `opacity` + `grayscale` on image losers |
| **Colour only as light** (dark UI) | surfaces black and dark glass; accent spent only on rims, glows, carets and pressed states | v33 v51 v59 | `fx.glow`, `ui.accent` |

### 5.6 Grading and finish amounts

| Finish | Videos | Measured amounts | Engine `finish` |
|---|---|---|---|
| Film grain | 72 | ~4% luma noise (v66), 8% (v70), ~10% (v56 v60); strongest on black cards | `grain`: 0.04–0.06 subtle, 0.07 default, 0.10–0.12 heavy |
| Vignette | 71 | edges −25% luma (v06), corners −30–40% (v08 v37 v60 v83), oval −50…−70% (v68), −60% (v54); spotlight oval with edges at ~25% luma (v30 v32) | `vignette`: 0.25 light, 0.35 default, 0.5–0.6 heavy, 0.7+ spotlight |
| Halftone dot screen | 48 | 3–4 px dots@720 (v06 v19 v22 v28 v63); dot-mesh 3 px pitch at 5–6% opacity (v67 v68); coarse on cut-outs (v16) | `halftone`: 0.06 mesh, 0.12–0.2 print, 0.3 coarse; `image.halftone` per cut-out |
| Depth of field | 59 | background 6–25 px blur; fg occluders 8–20 px | layer `blur`, `background.blur` |
| Chromatic aberration | 23 | 1–2 px RGB fringe on all edges (v29); 2–3 px on type (v47 v74); 4 px on slams (v45) | `chroma`: 1–2, 4 for hits |
| Scanlines / line screen | 9 | 1 line per 3–4 px@720 (v29); 3 px pitch at 6–8% (v34); 1 px every 3 px at 10–15% (v45); vertical lines (v24 v73) | `scanlines`: 0.06–0.15 (vertical not supported) |
| Paper multiply | — | — | `paper` |
| Explicitly clean, no grain | 8 | Apple/SaaS keynote looks: v07 v33 v51 v52 v55 v59 v61 v71 | `grain: 0, vignette: 0–0.15` |

**Finish presets:**
- *Print collage*: `{grain: .08, vignette: .4, halftone: .15, chroma: 1}`
- *Archival/CRT doc*: `{grain: .06, vignette: .45, halftone: .1, scanlines: .1, chroma: 1.5}`
- *Cinematic AI-still*: `{grain: .1, vignette: .5, halftone: .06}` + layer `blur` for DOF
- *Spotlit sepia diorama*: `{grain: .07, vignette: .7, paper: .3}`
- *Keynote/SaaS*: `{grain: 0, vignette: .1}`
- *Dark neon UI*: `{grain: .02, vignette: .45}` + glows

---

## 6. Palette recipes (hex, roles, source)

Roles: **F** = field/background, **N** = neutral/ink, **A** = accent, **A2** = second accent (use sparingly), **S** = shadow/extrude. Map them to `palette: {bg, ink, accent, accent2, paper}`.

| # | Name | F | N | A | A2 / S | From |
|---|---|---|---|---|---|---|
| 1 | Halftone poster rotation (one per clause) | `#c2694b` → `#de3333` → `#1a447c` → `#b57b1d` → `#5a5b24` | white / black | black bar for negation `#040404` | S `#8a8a8a` extrude on white type | v06 |
| 2 | Black statement card | `#080808` + dust | `#ffffff` | `#e8730c` / `#e0841a` keyword | S soft dark glow; red ellipse `#e0201a` | v10 v11 |
| 3 | Yellow alarm set | `#d1aa1e` | `#d9d9d9` + grey extrude | `#e9070f` | S `#7a0c10` | v11 |
| 4 | Cinema warm / cool | `#c31415` / `#0e1225` | `#ffffff` | `#f0a020` gold "smart" | A2 `#e25335` alarm | v12 |
| 5 | Money vs refusal | `#79a711` → `#560909` → `#0b0b0b` | white | `#b5141a` refusal | A2 `#d6b607` value | v17 |
| 6 | Dark HUD, one action colour | `#0d0d12` + 15% grid lines | `#ffffff`, `#8a8a8a` | `#d2fa18` | glow `#4d5412` falloff | v18 |
| 7 | Print misregistration | `#468289` teal grid | white | `#f2c230` fill | S `#d8332a` hard offset copy | v19 |
| 8 | Antithesis swap | `#d19f4f` mustard ↔ `#0e493c` bottle green | each is the other's ink | `#ee3d14` dates | A2 `#f5c21b` sparkle | v20 |
| 9 | B/W archive + one yellow | `#dcdcd1` paper, `#222122`–`#6b6968` greys | `#151515` | `#e4c21e` | A2 `#a01b1c` | v22 |
| 10 | Selective-colour editorial | `#c5c5c3` grey paper (sat ≈0) | `#efebe4` serif | `#e6dc3a` annotation | hero `#1d2a4a` navy | v24 v73 |
| 11 | Lab desk | `#dbdbdb` / `#c8c7c8` | `#1c1c1c` | `#f2d43a` sticky yellow | A2 `#c8323a` pen red; dark `#101e20` | v25 |
| 12 | Warm tabletop | `#e0dde1` paper | `#3a3638` | `#ccb024` mustard plates | A2 `#d32a2e` marker; lifted black `#1d1a1d` | v27 |
| 13 | Sepia archive drawer | `#e3c99e` / `#57442e` / `#140e08` | `#151210` | `#a3352b` oxblood | A2 `#1f3550` navy, once | v30 |
| 14 | Parchment diorama | `#e4bb90`, vignette edge `#251a10` | `#3a2a1a` | `#910f0d` blood red | A2 `#1e6952` water only | v32 |
| 15 | Dark neon SaaS | `#000000`; navy `#0a111d` / `#182739` | `#ffffff`, `#75767b` labels | `#31a3db` rim glow | A2 `#0a6cff` pressed / `#7fe3ff` text | v33 |
| 16 | Charcoal studio + orange | `#201f1b` + halftone patches `#2b2829` | `#e6d1b4` cream → `#7e746b` | `#e66521` | — | v38 |
| 17 | Retro print page | `#dcd3b8` cream | `#21231a` ink, `#8a8676` grey | `#d2502a` / `#2f6a64` / `#8a2f2a` (one per entry) | stripes `#d9632b` `#b8322a` `#e0a43a` | v40–v43 |
| 18 | Oxblood one-world | `#380908` → `#691d1f` glow, `#1c0101` corners | `#e9e1d6` glowing serif | `#ff3b3b` neon marks | A2 `#c25a5f` rose | v54 |
| 19 | White + one purple | `#fdfdfe` | `#111014` | `#8340df` → `#cdb6fa` | inactive `#c8c8cc`; problem `#e5243b` | v55 |
| 20 | Dark green dot-grid | `#030703` + drifting glow `#0d1d12` | `#f8f6fb` | `#3baf49` | — | v57 |
| 21 | Valence set | `#2f222d` plum / `#292827` slate | `#2b3a4a` | `#bb3c46` death/rejection | A2 `#2bd62b` improvement glow | v63 |
| 22 | Neon stack on concrete | `#1e1e1e` | `#f2f2f2` | `#3fd0e8` `#ef3a3f` `#f2c331` `#45d64a` (one per line) | each line with its own bloom | v64 |
| 23 | Amber diorama | `#e49309` → `#6b3e04` vignette | `#e6e6e6` setup / `#1a1a1a` on amber | `#f6c21a` → `#e08a00` key facts + `#ff9a00` glow | — | v68 |
| 24 | Teal mat + lime | `#03352c` / `#074435`, grid `#65c4a2` | `#f3f3f3` | `#d7ea02` | S `#364a0f` olive shadow | v69 |
| 25 | Pixel zine | `#0a0b05` / `#dac6a5` | `#e5d6bf` cream | `#e21e08` badge | A2 `#fab208` good news; `#7a0f14` heavy word | v70 |
| 26 | Keynote B/W + one hue per keyword | `#f3f5f2` ↔ `#000000` | black / white | `#fc3819` risk | A2 `#148ef9` simple; endcard `#0049ac` | v71 |
| 27 | Poster green | `#8ad260` | `#142803` | `#e8c21a` box | A2 `#d8221a` box; invert flash `#752d9f` | v78 |
| 28 | Soft UI + risograph | `#ebe8ec`; riso `#edce93` | `#1d1b1f` | `#f96c32` | dots `#d7a65f` `#d16834` `#6b6a3e` | v52 |

The hex values are for adapting to new topics. Don't recreate a specific creator's branded end-cards or template frames.

---

## 7. Backgrounds and textures

### 7.1 Frequency and engine mapping

Counts are videos whose background notes mention the surface at least once. Most videos use 5–15 different surfaces.

| Surface | Videos | Engine `background.kind` | Notes / gaps |
|---|---|---|---|
| Paper / parchment / newsprint / kraft card | ≈60 | `paper` (`color`) | parchment `#e4bb90`; cream `#dcd3b8`; grey paper `#c5c5c3`. Add `gobo` for room light |
| Grid paper / notebook / graph | ≈45 | `grid` | teal-line grid `#e9e7e2` / `#5aa49a` (v81); 52–110 px cells@720 |
| Black void / near-black card | ≈55 | `void` | add dust/grain; rounded projector-gate vignette (v11) |
| White / off-white flat | ≈40 | `solid` `#f3f5f2`–`#fefefe` | keynote cards; usually no texture |
| Radial glow / spotlight pool | ≈40 | `radial` (`color`, `color2`) | off-centre glow that drifts between scenes (v57); spotlight oval (v30 v32) |
| Sky / clouds | ≈39 | `gradient` or `image` | the "XP/Simpsons sky" set is very common in collage |
| Wall / brick / plaster / concrete / lockers | ≈44 | `concrete`, `studio`, or `image` | — |
| AI or photographic set | ≈33 | `image` (`drift`, `blur`) | 2.5D: subject cut-out as a separate `image` layer |
| Wood desk / walnut / planks | 29 | `wood` | top-down flat-lays with framing clutter at the edges, centre ~50% empty (v15) |
| Venetian-blind / window gobo shadows | 21 | `gobo: true` on any kind | bands ~15% darker, ~10% fh apart (v20) |
| Fabric / felt / denim / velvet / damask | 20 | `fabric`, `denim` (stitched border) | velvet/damask needs `image` |
| Gradient / mesh / blob | 19 | `gradient`, `mesh` | red-orange mesh (v59); green blob (v81) |
| Studio seamless / cyc | 17 | `studio` | — |
| OS wallpaper / desktop | 17 | `image` (+ `blur` 8–25 px for UI promos) | blurred wallpaper + white dot-grid overlay as a constant "product world" (v55) |
| Cutting mat (self-healing, ruler numbers) | 15 | `grid` with green/teal `color` (approx.) | **gap**: ruler ticks, protractor arcs, mat colour (v60 v69) |
| Footage plate | 13 | `video` (`dim`, `blur`) | grade footage cool/desaturated so the graphics own the colour (v09 v45) |
| Dot grid / LED dot matrix | 10 | `dots` | 1–2 px dots at ~74 px pitch, 10–15% opacity (v57) |
| Stripes | 9 | `stripes` | — |
| Sunburst rays | 8 | none → **gap** | 16 slowly rotating rays (v11); could be built from `stripes` + rotation in a custom component |
| Chalkboard / slate | 7 | `concrete` dark + grain (approx.) | **gap** |
| Blueprint | 6 | `grid` blue `#2f5db7` (approx.) | — |
| Harlequin / checker / op-art | ≈5 | none → `image` | v37 v39 v44 |
| Film-frame chrome (Kodak edge print, VHS sleeve, viewfinder HUD) | ≈10 | `overlay` layers (PNG `image` + `text`) | v18 v40–v43 v74 v75 v78 |

### 7.2 Background rules

1. **One surface per idea.** Change material and hue on every clause in collage mode (v05 v08 v19 v25 v62). No two consecutive shots share a background colour (v19).
2. **The background carries meaning**: denim = Americana, black void = dramatic statement, orange grid = blueprint/plan, green hills = nature brand, grid notebook = CTA/study (v05). In v82 the surfaces encode the two sides of the argument.
3. **Or lock one set** for a brand or product piece: charcoal + halftone patches (v38), oxblood velvet (v54), near-black with a drifting green glow and a dot grid (v57). Then change only lighting and the hero object.
4. **Two alternating modes** for UI promos: a silent flat white type canvas vs a rich blurred-wallpaper UI world (v55), or a full-bleed poster vs a letterboxed UI window (v78 v79).
5. **Flat surfaces get "photographed"**: gobo light, a radial hotspot, lens barrel warp (v67, gap), DOF on the edges.
6. **CTA surfaces repeat across a creator's videos**: grid paper with gobo (v60 v62 v63 v81), a dark Ae-glow card (v80 v81). Reuse your own CTA surface for consistency, but design your own; don't copy a reference's.

---

## 8. Engine gaps (technique → frequency → how to build)

Status checked against `remotion/src/engine/types.ts`. **DONE** = use the named field; **PARTIAL** = the field covers the common case, the rest is open; **OPEN** = no field yet.

| ID | Gap | Frequency | Status | Build |
|---|---|---|---|---|
| G1 | **Per-layer font weight** (Black + Light Italic in one family; Regular → SemiBold) | weight contrast ≈15; weight-morph entrance 1 (v57) | **PARTIAL**: `weight` on `text` | Loaded weights: Inter 400/600/800, Poppins 600/800/900, Nunito 300/800/900, Playfair 700/900 (+ italic 400/700), Roboto Slab 400/800, Space Grotesk 400/700. Open: Inter 300 / Light Italic, and the weight-morph entrance (animate `font-variation-settings` on Inter's variable axis) |
| G2 | **Missing families**: rounded heavy, heavy geometric, typewriter, signature script, tall marker, slab/wood-type, techno, comic, blackletter, Cinzel | rounded 34, heavy geometric 27, slab 16, typewriter 16, signature 9, comic 7, techno 6 | **PARTIAL**: `geometric` (Poppins 900), `rounded` (Nunito 900), `slab` (Roboto Slab 800), `typewriter` (Special Elite), `signature` (Mrs Saint Delafield), `bebas`, `didone` (DM Serif Display), `tech` (Space Grotesk) | Open: comic (Bangers), squared techno (Orbitron), tall marker (Shadows Into Light), blackletter, Cinzel |
| G3 | **Per-line / per-word sizes in one stack** (lead-in + payoff, see-saw) | 41 | **DONE** (per line): `lineSizes: [0.45, 1.6, 0.45]` | Open: per-word sizes inside one line (`sizes: {word: mult}`); stack separate layers meanwhile |
| G4 | **Gradient and texture fills** (silver gradient, lit-from-left, halftone/grunge inside letters) | gradient 13, texture ≈8 | **DONE**: `fill` = a CSS gradient string or an image `src` | Open: a procedural halftone/pattern fill; `fill` with `fx.extrude` (the extrude shadows paint under the transparent glyphs) |
| G5 | **Text behind a subject in footage** (roto) | ≈6 footage cases (v41 v45 v56 v73 v77) | **DONE** (by hand): `video` `transparent: true` + `tools/matte.py` | Stack `video` background → text → matte `video` (`transparent: true, muted: true`) with the same `trimStart`; for stills use an `image` cut-out with higher `z`. Open: a `foreground` field that keeps plate and matte locked |
| G6 | **Covered-letter outline read-through** | 1 (v37) | **DONE** (manual) | duplicate the text layer with `fx.stroke` above the cut-out |
| G7 | **Perspective / skew text on surfaces** (pitch, road, facade, notebook) | ≈10 | **PARTIAL**: `tilt: [rotX, rotY]`, `tiltTo` | Open: `skewX`, rotateZ inside the tilt, a custom `perspective` |
| G8 | **Per-layer tint / grade** (tint losers red, keep hero in colour while the world drains) | ≈8 | **OPEN** | `tint`, `saturation` on any layer; make `grade.drainAt` skip layers flagged `keepColor`. Today: `image.grayscale`, `video.grayscale` |
| G9 | **Colour sweep fill** (keyword colour fills L→R over 12–20 f) | 3 (v32 v71 v79) | **OPEN** | animate a gradient stop on `background-clip: text` (the static `fill` exists) |
| G10 | **Text on a path / circular text** | 5 (v12 v54 v78 v82) | **OPEN** | SVG `<textPath>`; `path: "arc"\|"circle"`, `radius` |
| G11 | **Hard (0-blur) drop shadow** and colour misregistration copy | ≈10 | **PARTIAL**: `fx.doubled` (same-colour offset copy) | Open: `fx.hardShadow: {x, y, color}`, `fx.offsetCopy: {x, y, color}`; meanwhile a second text layer offset by 0.4–0.6% fw |
| G12 | **Tracking collapse** (+400 → 0) and glyph-to-icon substitution | 3 (v57 v75), 1 (v59) | **OPEN** | animate `letterSpacing`; `icons: {char: src}` inline images at cap height |
| G13 | **Selection-handle box** (dashed rect + 4 square handles growing with the text) | 4 (v10 v45 v52 v57) | **OPEN** | `text.frame: "selection"` |
| G14 | **Backgrounds**: cutting mat with rulers, sunburst rays, chalkboard, harlequin, blueprint, lens barrel warp | mat 15, sunburst 8, chalk 7, blueprint 6 | **OPEN** | new `background.kind`s; barrel warp as an SVG displacement filter on the background only |
| G15 | **Vertical line screen** (ribbed paper, v24 v73) | 2 | **OPEN** | `finish.scanlines` with `orientation: "vertical"` |
