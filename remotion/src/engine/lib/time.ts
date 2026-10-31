import type {Scene, TimeRef, VideoSpec, Word} from '../types';

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9$%€£₹]/g, '');

/** Resolve a word reference to absolute seconds. Returns undefined when it can't be resolved. */
export const resolveWord = (words: Word[], ref: {word: string; nth?: number; after?: number; offset?: number}) => {
	const target = norm(ref.word);
	const parts = ref.word.trim().split(/\s+/).map(norm);
	let seen = 0;
	for (let i = 0; i < words.length; i++) {
		if (ref.after !== undefined && words[i].s < ref.after - 0.05) continue;
		let hit = false;
		if (parts.length > 1) {
			hit = parts.every((p, k) => words[i + k] && norm(words[i + k].w) === p);
		} else {
			const w = norm(words[i].w);
			hit = w === target || (target.length >= 4 && w.startsWith(target));
		}
		if (hit) {
			seen++;
			if (seen === (ref.nth ?? 1)) return words[i].s + (ref.offset ?? 0);
		}
	}
	return undefined;
};

type Beats = {beats: number[]; downbeats?: number[]; onsets?: number[]};
let BEATS: Beats = {beats: []};
/** Register the beat grid for {beat|downbeat|onset} refs (set once per render by SpecVideo). */
export const setBeats = (b: Beats | undefined) => {
	BEATS = b ?? {beats: []};
};

/** Resolve a TimeRef to absolute seconds. Numbers are relative to `base` (scene start) unless `absolute`. */
export const resolveTime = (ref: TimeRef | undefined, words: Word[], base = 0, absolute = false): number | undefined => {
	if (ref === undefined) return undefined;
	if (typeof ref === 'number') return absolute ? ref : base + ref;
	if ('beat' in ref) return BEATS.beats[ref.beat] !== undefined ? BEATS.beats[ref.beat] + (ref.offset ?? 0) : undefined;
	if ('downbeat' in ref) return BEATS.downbeats?.[ref.downbeat] !== undefined ? BEATS.downbeats[ref.downbeat] + (ref.offset ?? 0) : undefined;
	if ('onset' in ref) return BEATS.onsets?.[ref.onset] !== undefined ? BEATS.onsets[ref.onset] + (ref.offset ?? 0) : undefined;
	if ('wordIndex' in ref) {
		const w = words[ref.wordIndex];
		return w ? w.s + (ref.offset ?? 0) : undefined;
	}
	return resolveWord(words, {...ref, after: ref.after ?? (absolute ? undefined : base)});
};

export type TimedScene = Scene & {index: number; from: number; durationInFrames: number; startSec: number; endSec: number};

/**
 * Lay scenes on the timeline. A scene's start is its `start` ref, else the previous scene's end.
 * Its end is its own `duration`, else the next scene's start, else the video end.
 * Cuts by default lead the VO phrase by ~0.12s (measured median across references).
 */
export const layoutScenes = (spec: VideoSpec, words: Word[], fps: number, totalSec: number): TimedScene[] => {
	const snapTo = (t: number | undefined, mode?: 'beat' | 'downbeat') => {
		if (t === undefined || !mode) return t;
		const grid = mode === 'downbeat' ? BEATS.downbeats ?? [] : BEATS.beats;
		let best = t;
		let bd = 0.121;
		for (const b of grid) if (Math.abs(b - t) < bd) {
			bd = Math.abs(b - t);
			best = b;
		}
		return best;
	};
	// word refs for scene starts resolve in order: each one searches only after the previous scene's start,
	// so a word that also appears earlier in the script (e.g. "unfinished" in the hook) can't jump back
	const starts: (number | undefined)[] = [];
	let prev = -1;
	for (const sc of spec.scenes) {
		let t: number | undefined;
		const r = sc.start;
		if (r !== undefined && typeof r === 'object' && 'word' in r) t = resolveWord(words, {...r, after: r.after ?? prev + 0.05});
		else t = resolveTime(r, words, 0, true);
		t = snapTo(t, sc.snap);
		starts.push(t);
		if (t !== undefined) prev = t;
	}
	const out: TimedScene[] = [];
	let cursor = 0;
	spec.scenes.forEach((s, i) => {
		const st = starts[i] ?? cursor;
		let end: number | undefined;
		if (s.duration !== undefined) end = st + s.duration;
		else {
			const next = starts.slice(i + 1).find((v) => v !== undefined);
			end = next ?? totalSec;
			if (next === undefined && i < spec.scenes.length - 1) {
				// spread remaining time evenly over the following unspecified scenes
				const remaining = spec.scenes.length - i;
				end = st + (totalSec - st) / remaining;
			}
		}
		const from = Math.round(st * fps);
		const to = Math.max(from + 1, Math.round(end * fps));
		out.push({...s, index: i, from, durationInFrames: to - from, startSec: st, endSec: end});
		cursor = end;
	});
	return out;
};

export const videoDuration = (spec: VideoSpec, words: Word[]): number => {
	if (spec.duration) return spec.duration;
	const lastWord = words.length ? words[words.length - 1].e : 0;
	const sceneEnd = spec.scenes.reduce((acc, s) => {
		const st = resolveTime(s.start, words, 0, true);
		return st !== undefined && s.duration ? Math.max(acc, st + s.duration) : acc;
	}, 0);
	const summed = spec.scenes.every((s) => s.start === undefined && s.duration) ? spec.scenes.reduce((a, s) => a + (s.duration ?? 0), 0) : 0;
	return Math.max(lastWord + 0.6, sceneEnd, summed, 1);
};
