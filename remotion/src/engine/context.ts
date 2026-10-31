import {createContext, useContext} from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {resolveTime} from './lib/time';
import type {Palette, TimeRef, Word} from './types';

export type SpecCtx = {
	words: Word[];
	palette: Required<Palette>;
	sceneStartSec: number;
	sceneDurationInFrames: number;
};

export const defaultPalette: Required<Palette> = {
	bg: '#101010',
	ink: '#ffffff',
	accent: '#e8301c',
	accent2: '#2bd96b',
	paper: '#efe9dc',
};

export const SpecContext = createContext<SpecCtx>({
	words: [],
	palette: defaultPalette,
	sceneStartSec: 0,
	sceneDurationInFrames: 1,
});

export const useSpec = () => useContext(SpecContext);

/** Convert a TimeRef into a frame number relative to the current scene. */
export const useSceneFrameOf = () => {
	const {words, sceneStartSec} = useSpec();
	const {fps} = useVideoConfig();
	return (ref: TimeRef | undefined, fallback = 0) => {
		const abs = resolveTime(ref, words, sceneStartSec);
		if (abs === undefined) return fallback;
		return Math.round((abs - sceneStartSec) * fps);
	};
};

/** Frame inside the scene, plus helpers. */
export const useSceneFrame = () => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();
	const ctx = useSpec();
	return {frame, fps, width, height, ...ctx};
};

/** Words spoken inside [fromSec, toSec) — used by synced text and captions. */
export const wordsBetween = (words: Word[], fromSec: number, toSec: number) => words.filter((w) => w.s >= fromSec - 0.02 && w.s < toSec);
