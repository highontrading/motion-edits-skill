import React, {useMemo} from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {typeStyles} from './lib/fonts';
import {decay} from './lib/motion';
import type {Captions as CaptionSpec, Word} from './types';

type Chunk = {words: Word[]; s: number; e: number};

/** Group VO words into short caption chunks, breaking on punctuation, pauses and max length. */
export const chunkWords = (words: Word[], maxWords = 4): Chunk[] => {
	const chunks: Chunk[] = [];
	let cur: Word[] = [];
	words.forEach((w, i) => {
		cur.push(w);
		const next = words[i + 1];
		const punct = /[.,!?;:]$/.test(w.w);
		const pause = next ? next.s - w.e > 0.35 : true;
		if (cur.length >= maxWords || punct || pause) {
			chunks.push({words: cur, s: cur[0].s, e: next ? Math.min(next.s, w.e + 0.6) : w.e + 0.6});
			cur = [];
		}
	});
	return chunks;
};

/**
 * Persistent subtitle layer (separate from hero keyword type), as in v08/v13/v16/v25:
 *  pill    — semi-transparent rounded pill, sentence case, y≈76%
 *  bar     — 72% black box, Oswald caps
 *  karaoke — active word highlighted in accent
 *  bold    — big heavy word-by-word captions (talking-head / footage edits)
 */
export const CaptionTrack: React.FC<{words: Word[]; spec: CaptionSpec}> = ({words, spec}) => {
	const frame = useCurrentFrame();
	const {fps, width} = useVideoConfig();
	const u = width / 1080;
	const style = spec.style ?? 'pill';
	const chunks = useMemo(() => chunkWords(words, spec.maxWords ?? (style === 'bold' ? 3 : 5)), [words, spec.maxWords, style]);
	const t = frame / fps;
	const chunk = chunks.find((c) => t >= c.s - 0.04 && t < c.e);
	if (!chunk) return null;
	const st = typeStyles[spec.font ?? (style === 'pill' ? 'clean' : style === 'bold' ? 'impact' : 'condensed')];
	const size = (spec.size ?? (style === 'bold' ? 8.5 : style === 'pill' ? 3.6 : 4.2)) * (width / 100);
	const f = Math.round((t - chunk.s) * fps);
	const pop = style === 'bold' ? 0.86 + 0.14 * decay(f + 1, 0.6) : 1;
	const color = spec.color ?? '#ffffff';
	const active = spec.activeColor ?? '#ffd400';
	const caps = style === 'bar' || style === 'bold';

	const text = chunk.words.map((w, i) => {
		const on = t >= w.s - 0.03;
		const isActive = on && (i === chunk.words.length - 1 || t < chunk.words[i + 1].s);
		return (
			<span
				key={i}
				style={{
					color: style === 'karaoke' || style === 'bold' ? (isActive ? active : color) : color,
					opacity: style === 'bold' && !on ? 0 : 1,
				}}
			>
				{caps ? w.w.toUpperCase() : w.w}{' '}
			</span>
		);
	});

	const box: React.CSSProperties =
		style === 'pill'
			? {background: spec.bg ?? 'rgba(0,0,0,0.55)', padding: `${10 * u}px ${26 * u}px`, borderRadius: 999, backdropFilter: 'blur(8px)'}
			: style === 'bar'
				? {background: spec.bg ?? 'rgba(0,0,0,0.72)', padding: `${8 * u}px ${20 * u}px`}
				: {textShadow: `0 ${4 * u}px ${16 * u}px rgba(0,0,0,0.6), 0 0 ${3 * u}px rgba(0,0,0,0.9)`};

	return (
		<div style={{position: 'absolute', left: 0, right: 0, top: `${spec.y ?? (style === 'bold' ? 68 : 76)}%`, display: 'flex', justifyContent: 'center', zIndex: 900}}>
			<div
				style={{
					...box,
					maxWidth: '84%',
					textAlign: 'center',
					fontFamily: st.fontFamily,
					fontWeight: style === 'pill' ? 600 : st.fontWeight,
					fontSize: size,
					lineHeight: 1.15,
					letterSpacing: `${st.tracking}em`,
					transform: `translateY(-50%) scale(${pop})`,
				}}
			>
				{text}
			</div>
		</div>
	);
};
