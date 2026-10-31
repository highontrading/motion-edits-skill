/**
 * Motion vocabulary measured from the reference library (see references/motion-language.md).
 *
 * The references almost never use symmetric ease-in-out or bouncy springs. Their signature is:
 *  - ENTRANCES decay exponentially: fastest on the first (stepped) frame, then each frame keeps
 *    ~0.70–0.88 of the previous frame's speed. No overshoot on camera moves.
 *  - EXITS ramp exponentially into a hard cut: speed grows ~1.3–1.6x per frame for 4–10 frames and
 *    the cut lands at peak speed (motion blur hides it).
 *  - Physical props (stickers, phones, signs) may overshoot ~6–10% with a quick spring.
 */
import {Easing, interpolate, spring} from 'remotion';

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Progress 0→1 of an exponential-decay settle. `r` = fraction of speed kept per frame (0.7 snappy … 0.9 floaty). */
export const decay = (frame: number, r = 0.8): number => {
	if (frame <= 0) return 0;
	return clamp01(1 - Math.pow(r, frame));
};

/** Frames a decay settle needs to reach `done` (default 98%) of its travel. */
export const decayFrames = (r = 0.8, done = 0.98) => Math.ceil(Math.log(1 - done) / Math.log(r));

/** Progress 0→1 of an exponential ramp-in that peaks exactly at `frames` (use for exits into a cut). */
export const ramp = (frame: number, frames: number, growth = 1.45): number => {
	if (frame <= 0) return 0;
	if (frame >= frames) return 1;
	const total = (Math.pow(growth, frames) - 1) / (growth - 1);
	const done = (Math.pow(growth, frame) - 1) / (growth - 1);
	return clamp01(done / total);
};

/** Instantaneous normalised speed of a ramp (for motion-blur amount). */
export const rampSpeed = (frame: number, frames: number, growth = 1.45) =>
	frame <= 0 || frame > frames ? 0 : Math.pow(growth, frame) / Math.pow(growth, frames);

/** Instantaneous normalised speed of a decay (1 on the first frame). */
export const decaySpeed = (frame: number, r = 0.8) => (frame < 0 ? 0 : Math.pow(r, frame));

/** Cubic-bezier presets (CSS-style) that match measured curves. */
export const curves = {
	/** Expo-out settle used for scene-open zooms (50% done at ~8f, 90% at ~26f @30fps). */
	settle: Easing.bezier(0.16, 1, 0.3, 1),
	/** Fast UI slide-in, no overshoot. */
	snap: Easing.bezier(0.2, 0.9, 0.1, 1),
	/** Symmetric camera move inside a shot (ease-in 15f / ease-out 15f). */
	glide: Easing.bezier(0.65, 0, 0.35, 1),
	/** Ease-in into a cut. */
	accelerate: Easing.bezier(0.55, 0, 1, 0.45),
	linear: Easing.linear,
} as const;

export type CurveName = keyof typeof curves;

/** Spring presets (Remotion `spring` config). */
export const springs = {
	/** Sticker / prop pop with ~8% overshoot. */
	pop: {damping: 11, stiffness: 190, mass: 0.6},
	/** Phone/device rise with a small overshoot (~4%). */
	device: {damping: 16, stiffness: 120, mass: 0.9},
	/** Critically damped, no overshoot. */
	firm: {damping: 200, stiffness: 160, mass: 0.7},
	/** Pendulum / hanging sign. */
	swing: {damping: 4, stiffness: 60, mass: 0.8},
} as const;

export type SpringName = keyof typeof springs;

export const springAt = (frame: number, fps: number, name: SpringName = 'pop', durationInFrames?: number) =>
	spring({frame, fps, config: springs[name], durationInFrames});

/** Map progress through a [from,to] range. */
export const lerp = (p: number, from: number, to: number) => from + (to - from) * p;

/** interpolate with clamping on both ends. */
export const iclamp = (f: number, input: number[], output: number[], easing?: (t: number) => number) =>
	interpolate(f, input, output, {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing});

/** Deterministic pseudo-random in [0,1) from a seed (frame-stable, render-safe). */
export const rand = (seed: number) => {
	const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
	return x - Math.floor(x);
};

/** Small hand-held / idle wiggle, stepped so it reads as stop-motion. */
export const wiggle = (frame: number, seed: number, amp = 2, every = 3) => {
	const k = Math.floor(frame / every);
	return (rand(seed * 31 + k) - 0.5) * 2 * amp;
};
