import React, {useMemo} from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {rand} from '../lib/motion';
import type {Finish as FinishSpec} from '../types';
import {grainTile, noiseTile} from './noise';

/**
 * Global finishing pass. Every high-end reference carries texture on top of everything:
 * fine film grain (always), plus optional halftone screen, vignette, scanlines, paper multiply,
 * and letterbox bars. Grain re-seeds every 2 frames so it shimmers like film without boiling.
 */
export const Grain: React.FC<{opacity: number; seedEvery?: number}> = ({opacity, seedEvery = 2}) => {
	const frame = useCurrentFrame();
	const k = Math.floor(frame / seedEvery);
	// one cached tile, jumped to a pseudo-random offset every `seedEvery` frames
	const ox = Math.floor(rand(k) * 256);
	const oy = Math.floor(rand(k + 101) * 256);
	return (
		<AbsoluteFill
			style={{pointerEvents: 'none', mixBlendMode: 'overlay', opacity, backgroundImage: grainTile(3), backgroundRepeat: 'repeat', backgroundPosition: `${ox}px ${oy}px`}}
		/>
	);
};

export const Halftone: React.FC<{opacity: number; size?: number}> = ({opacity, size}) => {
	const {width} = useVideoConfig();
	const s = size ?? Math.max(5, Math.round(width / 210));
	return (
		<AbsoluteFill
			style={{
				pointerEvents: 'none',
				opacity,
				mixBlendMode: 'multiply',
				backgroundImage: `radial-gradient(circle at center, rgba(0,0,0,0.55) 0, rgba(0,0,0,0.55) ${s * 0.22}px, transparent ${s * 0.3}px)`,
				backgroundSize: `${s}px ${s}px`,
			}}
		/>
	);
};

export const Vignette: React.FC<{strength: number}> = ({strength}) => (
	<AbsoluteFill
		style={{
			pointerEvents: 'none',
			background: `radial-gradient(ellipse at 50% 48%, transparent 45%, rgba(0,0,0,${0.75 * strength}) 100%)`,
		}}
	/>
);

export const Scanlines: React.FC<{opacity: number}> = ({opacity}) => (
	<AbsoluteFill
		style={{
			pointerEvents: 'none',
			opacity,
			backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.6) 0px, rgba(0,0,0,0.6) 1px, transparent 2px, transparent 4px)',
		}}
	/>
);

export const PaperMultiply: React.FC<{opacity: number}> = ({opacity}) => (
	<AbsoluteFill
		style={{
			pointerEvents: 'none',
			mixBlendMode: 'multiply',
			opacity,
			backgroundImage: noiseTile('paper', 512, '0.035', 4, 7, '0 0 0 0 0.93  0 0 0 0 0.9  0 0 0 0 0.84  0 0 0 -1.4 1.25'),
		}}
	/>
);

export const Letterbox: React.FC<{pct: number}> = ({pct}) => (
	<AbsoluteFill style={{pointerEvents: 'none'}}>
		<div style={{position: 'absolute', left: 0, right: 0, top: 0, height: `${pct}%`, background: '#000'}} />
		<div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: `${pct}%`, background: '#000'}} />
	</AbsoluteFill>
);

export const FinishPass: React.FC<{finish?: FinishSpec}> = ({finish}) => {
	const f = useMemo(() => ({grain: 0.07, vignette: 0.35, ...finish}), [finish]);
	return (
		<>
			{f.paper ? <PaperMultiply opacity={f.paper} /> : null}
			{f.halftone ? <Halftone opacity={f.halftone} /> : null}
			{f.scanlines ? <Scanlines opacity={f.scanlines} /> : null}
			{f.vignette ? <Vignette strength={f.vignette} /> : null}
			{f.grain ? <Grain opacity={f.grain * 2.2} /> : null}
			{f.letterbox ? <Letterbox pct={f.letterbox} /> : null}
		</>
	);
};
