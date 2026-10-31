/**
 * VideoSpec: the JSON contract between the skill (Claude writing a video plan) and the engine.
 * Every field is optional unless noted; defaults encode the "house style" measured from references.
 * Full documentation: references/engine-spec.md
 */

/** Seconds (number), or a reference to a spoken word from the VO transcript. */
export type TimeRef =
	| number
	| {word: string; nth?: number; after?: number; offset?: number}
	| {wordIndex: number; offset?: number}
	/** n-th beat / downbeat / strong onset (0-based) from spec.beats (tools/beats.py output) */
	| {beat: number; offset?: number}
	| {downbeat: number; offset?: number}
	| {onset: number; offset?: number};

export type Word = {w: string; s: number; e: number};

export type Pos = {
	/** centre x/y in % of frame (0–100). Defaults: 50 / 40 (upper-middle third keeps clear of platform UI). */
	x?: number;
	y?: number;
	/** width in % of frame width */
	w?: number;
	/** height in % of frame height (images only; otherwise auto) */
	h?: number;
	rotate?: number;
	z?: number;
	/** 0–1 */
	opacity?: number;
	/** static gaussian blur in px (depth-of-field planes, foreground ghost type) */
	blur?: number;
	/** idle loop after the entrance: gentle bob, pendulum sway, scale pulse, glow breathe, or blink */
	loop?: 'bob' | 'sway' | 'pulse' | 'breathe' | 'blink';
	/** keep this layer smooth (full fps) inside a stepped (animFps) scene — footage, typing, cursors */
	smooth?: boolean;
	/** 3D tilt [rotateX, rotateY] in degrees (UI planes 6–18°, cards, posters) */
	tilt?: [number, number];
	/** animate the tilt to this value across the layer's lifetime (slow 3D drift) */
	tiltTo?: [number, number];
	/** parallax depth: 1 = moves with the camera, <1 = far (moves less), >1 = near (moves more). Also drives rack focus. */
	depth?: number;
};

export type Timing = {
	/** when the layer appears: seconds relative to scene start, or a word ref (absolute). Default 0. */
	at?: TimeRef;
	/** when the layer leaves (same rules). Default: end of scene. */
	until?: TimeRef;
	/** exit animation when `until` is reached */
	exit?: 'cut' | 'fade' | 'pop' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'blur';
};

export type TypeStyleName =
	| 'impact' // ultra-heavy condensed caps (Anton) — the default keyword voice
	| 'grotesk' // heavy geometric sans (Archivo Black / Poppins Black)
	| 'clean' // Inter semibold, Apple-clean
	| 'serif' // editorial serif (Playfair Display / Instrument Serif)
	| 'serif-italic'
	| 'script' // handwritten accent (Caveat)
	| 'marker' // Permanent Marker
	| 'mono' // JetBrains Mono — prompts, terminals, code
	| 'condensed' // Oswald — subtitles / captions
	| 'pixel' // VT323 — bitmap/retro
	| 'geometric' // Poppins Black — heavy geometric caps
	| 'rounded' // Nunito Black — friendly rounded (SF Pro Rounded class)
	| 'slab' // Roboto Slab ExtraBold
	| 'typewriter' // Special Elite — typed documents
	| 'signature' // Mrs Saint Delafield — signature script
	| 'bebas' // Bebas Neue — tall condensed caps
	| 'didone' // DM Serif Display — high-contrast fashion serif
	| 'tech'; // Space Grotesk — techy UI display

export type TextFx = {
	/** 3D extrude depth in px (stacked text-shadows). */
	extrude?: number;
	extrudeColor?: string;
	/** doubled same-colour offset shadow (v05 FROM DOMINO'S). */
	doubled?: boolean;
	/** soft drop shadow */
	shadow?: boolean;
	/** outline stroke width in px (outline-type) */
	stroke?: number;
	strokeColor?: string;
	glow?: string;
	/** mix-blend-mode, e.g. 'difference' */
	blend?: string;
};

export type TextAnim =
	| 'pop' // whole block scales 0.85→1 + fade, 4f
	| 'slam' // from 1.4x scale, blurred, lands in 3–5f
	| 'words' // word-by-word pop, synced to VO when `sync` is true
	| 'ghost' // words appear small/grey then settle (v02)
	| 'focus' // words resolve from blur (v03, v09)
	| 'letters' // per-letter stagger
	| 'typewriter' // characters typed with caret
	| 'scramble' // glyph scramble then resolve
	| 'mask' // wipe reveal left→right
	| 'rise' // slide up from below a mask line
	| 'karaoke' // whole text shown dim; each word lights up as it is spoken (needs sync or stagger)
	| 'swap' // `text` holds alternatives separated by " | "; they replace each other in place every `stagger` frames (or on their spoken words with sync)
	| 'none';

export type TextLayer = Pos &
	Timing & {
		type: 'text';
		text: string;
		style?: TypeStyleName;
		/** font size as % of frame width (default by style ~ 11) */
		size?: number;
		color?: string;
		/** words (case-insensitive) rendered in accentColor */
		accent?: string[];
		accentColor?: string;
		/** uppercase (default true for impact/grotesk/condensed) */
		caps?: boolean;
		align?: 'left' | 'center' | 'right';
		lineHeight?: number;
		tracking?: number;
		anim?: TextAnim;
		/** reveal words at their VO timestamps (needs spec.words) */
		sync?: boolean;
		/** frames between words/letters when not synced */
		stagger?: number;
		/** highlight bar / marker behind the text */
		highlight?: string;
		underline?: 'scribble' | 'line' | 'none';
		underlineColor?: string;
		fx?: TextFx;
		/** leading-edge colour for typewriter (v07) */
		leadColor?: string;
		/** characters per second for typewriter */
		cps?: number;
		/** colour of not-yet-spoken words for anim 'karaoke' (default 35% ink) */
		dimColor?: string;
		/** font weight override (where the family has it) */
		weight?: number;
		/** per-line size multipliers for stacked lockups, e.g. [0.45, 1.6, 0.45] = small/HUGE/small */
		lineSizes?: number[];
		/** fill letters with a gradient / image instead of a flat colour: CSS gradient string or image src */
		fill?: string;
	};

export type BadgeLayer = Pos &
	Timing & {
		type: 'badge';
		text: string;
		variant?: 'stitched' | 'solid' | 'outline' | 'pill' | 'tape';
		color?: string;
		textColor?: string;
		style?: TypeStyleName;
		size?: number;
		/** 'swap': text holds alternatives "A | B | C" swapped in place; the badge resizes around each word */
		anim?: 'wipe' | 'pop' | 'words' | 'typewriter' | 'swap';
		sync?: boolean;
		stagger?: number;
	};

export type ImageAnim =
	| 'pop'
	| 'drop'
	| 'rise'
	| 'slide-left'
	| 'slide-right'
	| 'slide-up'
	| 'slide-down'
	| 'fade'
	| 'focus'
	| 'spin-in'
	| 'stamp'
	| 'swing' // hung from the top edge, enters with an under-damped pendulum swing (v12, v50, v68)
	| 'flip' // 3D card flip in around the Y axis
	| 'none';

export type ImageLayer = Pos &
	Timing & {
		type: 'image';
		src: string;
		/** cut-out treatment: white paper edge + contact shadow */
		cutout?: boolean;
		/** photo-print treatment: white border card */
		print?: boolean;
		radius?: number;
		shadow?: 'none' | 'soft' | 'hard' | 'long';
		anim?: ImageAnim;
		/** idle float/bob amplitude in px */
		float?: number;
		/** stop-motion jitter amplitude in px */
		jitter?: number;
		grayscale?: boolean;
		fit?: 'contain' | 'cover';
		/** halftone the image (vintage print) */
		halftone?: boolean;
		/** swap to another image at a time (object-swap, v05 pizza→cardboard) */
		swap?: {src: string; at: TimeRef; glow?: boolean};
		/** flicker-montage: cycle through these sources every `every` frames (v03, v25, v65) */
		cycle?: {srcs: string[]; every?: number; until?: TimeRef};
	};

export type VideoLayer = Pos &
	Timing & {
		type: 'video';
		src: string;
		/** trim start in seconds of the source */
		trimStart?: number;
		playbackRate?: number;
		volume?: number;
		muted?: boolean;
		fit?: 'cover' | 'contain';
		radius?: number;
		/** punch-in zooms: [{at, scale, frames}] */
		punch?: {at: TimeRef; scale?: number; frames?: number; hold?: number}[];
		grayscale?: boolean;
		/** card treatment (rounded + shadow) when not full-frame */
		card?: boolean;
		/** box aspect ratio when `w` is set (default 16/9; use 9/16 for vertical clips, 1 for square) */
		aspect?: number;
		/** entrance animation (default 'fade'; cards often use 'rise', 'pop' or 'slide-*') */
		anim?: ImageAnim;
		/** play a transparent (alpha) WebM — e.g. a subject matte from tools/matte.py layered over type */
		transparent?: boolean;
	};

export type ShapeLayer = Pos &
	Timing & {
		type: 'shape';
		kind: 'ellipse' | 'underline' | 'arrow' | 'scribble' | 'circle' | 'burst' | 'cross' | 'check' | 'bracket' | 'line' | 'rect';
		color?: string;
		stroke?: number;
		fill?: string;
		/** draw-on duration in frames */
		draw?: number;
		/** for 'line'/'arrow': end point in % */
		x2?: number;
		y2?: number;
	};

export type CounterLayer = Pos &
	Timing & {
		type: 'counter';
		from: number;
		to: number;
		/** seconds */
		duration?: number;
		decimals?: number;
		prefix?: string;
		suffix?: string;
		/** thousands separator */
		separator?: string;
		style?: TypeStyleName;
		size?: number;
		color?: string;
		mode?: 'roll' | 'flip' | 'tick';
		fx?: TextFx;
	};

export type UILayer = Pos &
	Timing & {
		type: 'ui';
		kind: 'search' | 'notification' | 'chat' | 'window' | 'phone' | 'dialog' | 'prompt' | 'tweet' | 'button' | 'progress' | 'bubble';
		/** primary text (typed into search/prompt/dialog) */
		text?: string;
		title?: string;
		/** app/source label (notification), handle (tweet) */
		label?: string;
		/** chat messages */
		messages?: {from: 'me' | 'them'; text: string; at?: TimeRef}[];
		theme?: 'light' | 'dark';
		accent?: string;
		/** image/video src shown inside window/phone */
		src?: string;
		/** characters per second for typed text */
		cps?: number;
		/** 0–1 for progress */
		value?: number;
		anim?: ImageAnim;
	};

export type CursorLayer = Timing & {
	type: 'cursor';
	/** path points in % with times (seconds relative to scene) */
	path: {x: number; y: number; t: number; click?: boolean}[];
	color?: string;
	size?: number;
	z?: number;
};

export type ChartLayer = Pos &
	Timing & {
		type: 'chart';
		kind: 'line' | 'bar' | 'area' | 'donut';
		data: number[];
		labels?: string[];
		color?: string;
		color2?: string;
		/** draw duration in frames */
		draw?: number;
		stroke?: number;
		/** marker-style (thick hand-drawn black line, v05 TRUST) */
		marker?: boolean;
		showValues?: boolean;
		style?: TypeStyleName;
	};

/**
 * Render another scene (by id) inside a box: the building block of nested reveals, where the previous
 * scene becomes the content of a phone, TV, window or post in the next scene (v76, v77, v51).
 * Combine with camera {settle, origin} so the next scene starts zoomed into the box and pulls back.
 */
/** Ambient particles — in 41/82 references (dust motes, sparkles, embers, bokeh, confetti, snow). */
export type ParticlesLayer = Timing & {
	type: 'particles';
	kind?: 'dust' | 'sparkle' | 'embers' | 'bokeh' | 'confetti' | 'snow';
	count?: number;
	color?: string;
	/** size multiplier */
	size?: number;
	/** speed multiplier */
	speed?: number;
	seed?: number;
	opacity?: number;
	z?: number;
	/** restrict to a region in % [x, y, w, h] */
	area?: [number, number, number, number];
};

export type EmbedLayer = Pos &
	Timing & {
		type: 'embed';
		scene: string;
		/** 'last' = freeze on the embedded scene's last frame (default), 'live' = keep playing it */
		mode?: 'last' | 'live';
		radius?: number;
		/** aspect ratio of the box, default = video aspect */
		aspect?: number;
		shadow?: boolean;
	};

export type GroupLayer = Pos &
	Timing & {
		type: 'group';
		layers: Layer[];
		anim?: ImageAnim;
	};

export type Layer =
	| TextLayer
	| BadgeLayer
	| ImageLayer
	| VideoLayer
	| ShapeLayer
	| CounterLayer
	| UILayer
	| CursorLayer
	| ChartLayer
	| EmbedLayer
	| ParticlesLayer
	| GroupLayer;

export type BackgroundKind =
	| 'solid'
	| 'gradient'
	| 'radial'
	| 'paper'
	| 'grid'
	| 'dots'
	| 'fabric'
	| 'denim'
	| 'wood'
	| 'concrete'
	| 'studio'
	| 'void'
	| 'halftone'
	| 'stripes'
	| 'mesh'
	| 'image'
	| 'video';

export type Background = {
	kind: BackgroundKind;
	color?: string;
	color2?: string;
	src?: string;
	/** window-light gobo shadows (v05 TRUST scene) */
	gobo?: boolean;
	/** slow parallax drift of the background in px/s */
	drift?: number;
	/** for video backgrounds */
	trimStart?: number;
	muted?: boolean;
	dim?: number;
	blur?: number;
	grayscale?: boolean;
};

export type CutType =
	| 'cut' // plain hard cut (still gets the scene-open settle)
	| 'zoom' // velocity-matched zoom-punch: exit zoom ramps in, next settles from 1.15x (v11, v12, v15)
	| 'whip-left' // momentum cut: both shots share one horizontal motion curve + directional blur
	| 'whip-right'
	| 'whip-up'
	| 'whip-down'
	| 'spin' // rotation ramp into the cut (v17)
	| 'flash' // 1-frame white then fast fade (v12)
	| 'flash-ramp' // 4–8 frame exposure ramp to white (v02, v03)
	| 'invert' // 1–3 colour-inverted frames on the incoming shot (v04, v17, v21)
	| 'black' // 1–3 black frames between (v20)
	| 'desat' // outgoing drains to grey, incoming colour returns (v06)
	| 'focus' // incoming shot pulls focus from blur (v24)
	| 'ink' // ink-blot / organic matte wipe (v10)
	| 'circle' // iris / lens wipe (v08)
	| 'object' // a large blurred object crosses the frame and wipes (v05 hubcap)
	| 'slide' // card push: incoming slides over outgoing
	| 'glitch' // RGB split + slice for 3–4 frames
	| 'wash' // flat colour floods the frame for ~4 frames then releases into the new scene (v58, v59, v69)
	| 'burn' // warm film-burn / light-leak bloom over the cut (v69, v81)
	| 'strobe' // 4–6 frames alternating inverted/normal on the incoming shot (v65, v71)
	| 'pixel' // incoming scene revealed through randomly appearing tiles (v35, v46, v58)
	| 'flip' // card flip: outgoing turns edge-on, incoming turns in (v44, v64)
	| 'shrink' // nested reveal: outgoing scene shrinks into an `embed` box of the incoming scene (v76)
	| 'dissolve' // cross-dissolve (optionally `through` a colour) — rare in the library, use for time jumps
	| 'wipe' // a hard-edged wipe of the incoming scene; `shape`: line | diagonal | slab | split
	| 'iris-close'; // outgoing closes to a circle (spotlight) before the cut, incoming opens (v32, v47)

export type Transition = {
	type: CutType;
	/** frames of the effect on each side of the cut (default per type) */
	frames?: number;
	color?: string;
	/** for 'object': image src of the wiping object */
	src?: string;
	/** for 'zoom': zoom INTO this point [x, y] % (a door, a screen, an eye) instead of the centre */
	target?: [number, number];
	/** for 'zoom': peak scale at the cut (default 1.55; 3–6 for a true zoom-through into an object) */
	peak?: number;
	/** for 'wipe': edge shape; for 'dissolve': `through` colour */
	shape?: 'line' | 'diagonal' | 'slab' | 'split';
	through?: string;
	/** for 'wipe' / 'circle': direction or origin */
	direction?: 'left' | 'right' | 'up' | 'down';
	at?: [number, number];
};

export type Camera = {
	/** starting scale of the scene-open settle (1 = none). Default 1.1 */
	settle?: number;
	/** decay ratio per frame for the settle (0.7 snappy – 0.9 floaty). Default 0.82 */
	settleR?: number;
	/** slow continuous push over the scene as a fraction (0.03 = +3%). Default 0.025 */
	drift?: number;
	/** additional mid-scene punch-ins */
	punch?: {at: TimeRef; scale?: number; frames?: number}[];
	/** pan target in % of frame (moves the whole scene) */
	pan?: {at: TimeRef; x: number; y: number; frames?: number; blur?: boolean; curve?: 'glide' | 'reframe' | 'settle'}[];
	/** rotate / roll the camera: [{at, deg, frames}] (camera roll appears in ~45/82 references, usually 1–8°) */
	rotate?: {at: TimeRef; deg: number; frames?: number}[];
	/** exit ramp into the next cut without a transition effect: accelerate zoom/pan/rotation over the last `frames` */
	exit?: {zoom?: number; x?: number; y?: number; rotate?: number; frames?: number};
	/** handheld shake amplitude (px) */
	shake?: number;
	/** transform origin in % for settle/punch (e.g. the centre of an embed box for nested reveals) */
	origin?: [number, number];
	/** rack focus: which `depth` plane is sharp, changing over time (layers off the plane blur ~6px per depth unit) */
	focus?: {at: TimeRef; depth: number; frames?: number}[];
	/** parallax amount for `depth` layers during drift/pan (px of extra travel per depth unit). Default 60 */
	parallax?: number;
};

export type Grade = {
	saturation?: number;
	contrast?: number;
	brightness?: number;
	/** e.g. 'sepia(0.3)' extra CSS filter */
	filter?: string;
	/** tint overlay colour with opacity e.g. '#ff6a0033' */
	tint?: string;
	/** animate saturation to 0 at a time (story beat colour drain, v05/v17) */
	drainAt?: TimeRef;
};

export type Scene = {
	id?: string;
	/** start time (seconds or word ref). Defaults to the previous scene's end. */
	start?: TimeRef;
	/** snap the start to the nearest beat/downbeat within ±0.12 s (needs spec.beats) */
	snap?: 'beat' | 'downbeat';
	/** duration in seconds (alternative to the next scene's start) */
	duration?: number;
	background?: Background;
	layers?: Layer[];
	camera?: Camera;
	grade?: Grade;
	/** transition INTO this scene from the previous one */
	transition?: Transition;
	/** animated letterbox bars (% of height each side) — closes in over ~7 frames with expo-out (v04, v78, v79) */
	letterbox?: number;
	/** override global stepped animation fps for this scene (0 = smooth) */
	animFps?: number;
	/** scene-local SFX */
	sfx?: {src: string; at?: TimeRef; volume?: number}[];
	/** name of a custom component registered in src/custom/index.ts */
	custom?: string;
	customProps?: Record<string, unknown>;
};

export type Finish = {
	/** film grain opacity 0–0.25. Default 0.07 */
	grain?: number;
	/** halftone dot overlay opacity 0–0.4 */
	halftone?: number;
	/** vignette strength 0–1. Default 0.35 */
	vignette?: number;
	/** chromatic aberration px */
	chroma?: number;
	/** scanlines opacity */
	scanlines?: number;
	/** paper-texture multiply over everything */
	paper?: number;
	/** letterbox bars as % of height each (v04) */
	letterbox?: number;
};

export type Captions = {
	/** persistent subtitle pill/bar driven by the VO words (v08, v13, v16) */
	enabled?: boolean;
	style?: 'pill' | 'bar' | 'karaoke' | 'bold';
	/** vertical position in % */
	y?: number;
	/** max words per chunk */
	maxWords?: number;
	color?: string;
	activeColor?: string;
	bg?: string;
	font?: TypeStyleName;
	size?: number;
};

export type Palette = {
	bg?: string;
	ink?: string;
	accent?: string;
	accent2?: string;
	paper?: string;
};

export type VideoSpec = {
	/** REQUIRED output size, e.g. 1080x1920 (9:16), 1920x1080 (16:9), 1080x1080 (1:1), 1080x1350 (4:5) */
	width: number;
	height: number;
	fps?: number;
	/** total duration in seconds; default = VO length + 0.6s or last scene end */
	duration?: number;
	/** global stepped-animation rate (12 = collage stop-motion, 15 = smoother, 0 = off). Default 0 */
	animFps?: number;
	palette?: Palette;
	audio?: {
		vo?: string;
		music?: string;
		musicVolume?: number;
		/** duck music under VO to this volume (smooth: ~4f attack, ~10f release, holds through pauses < 0.6s) */
		duckTo?: number;
		/** start the music file at this many seconds in */
		musicStart?: number;
		/** fade the music out over the last N seconds of the video (default 0.6) */
		musicFadeOut?: number;
		/** loop the music if shorter than the video (default true) */
		musicLoop?: boolean;
		sfx?: {src: string; at: TimeRef; volume?: number}[];
	};
	/** word timestamps of the VO (from tools/transcribe.py) — or a path to the json under public/ */
	words?: Word[] | string;
	/** beat grid from tools/beats.py ({beats, downbeats, onsets}) or a path to it under public/ — enables beat TimeRefs */
	beats?: {beats: number[]; downbeats?: number[]; onsets?: number[]} | string;
	captions?: Captions;
	finish?: Finish;
	/** layers drawn above every scene without camera motion: film-frame borders, HUDs, vote bars, watermarks, logos */
	overlay?: Layer[];
	scenes: Scene[];
};
