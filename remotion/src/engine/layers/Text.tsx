import React, {useMemo} from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {useSceneFrameOf, useSpec} from '../context';
import {typeStyles} from '../lib/fonts';
import {clamp01, decay, iclamp, rand} from '../lib/motion';
import {resolveTime} from '../lib/time';
import type {TextFx, TextLayer, Word} from '../types';
import {shade} from '../fx/Backgrounds';
import {DrawPath} from './Shape';

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9$%€£₹]/g, '');

/** Stack of text-shadows = 3D extrude / doubled shadow / glow. */
export const textFxStyle = (fx: TextFx | undefined, color: string, unit: number): React.CSSProperties => {
	if (!fx) return {};
	const shadows: string[] = [];
	if (fx.extrude) {
		const ec = fx.extrudeColor ?? shade(color.startsWith('#') ? color : '#888888', -0.55);
		const d = Math.round(fx.extrude * unit);
		for (let i = 1; i <= d; i++) shadows.push(`${i}px ${i}px 0 ${ec}`);
		shadows.push(`${d + 4}px ${d + 6}px ${12 * unit}px rgba(0,0,0,0.45)`);
	}
	if (fx.doubled) shadows.push(`${7 * unit}px ${7 * unit}px 0 ${color.startsWith('#') ? color + '55' : 'rgba(0,0,0,0.35)'}`);
	if (fx.shadow) shadows.push(`0 ${6 * unit}px ${18 * unit}px rgba(0,0,0,0.45)`);
	if (fx.glow) shadows.push(`0 0 ${18 * unit}px ${fx.glow}`, `0 0 ${42 * unit}px ${fx.glow}`);
	const out: React.CSSProperties = {};
	if (shadows.length) out.textShadow = shadows.join(', ');
	if (fx.stroke) out.WebkitTextStroke = `${fx.stroke * unit}px ${fx.strokeColor ?? color}`;
	if (fx.stroke && !fx.extrude) out.color = 'transparent';
	if (fx.blend) out.mixBlendMode = fx.blend as React.CSSProperties['mixBlendMode'];
	return out;
};

/** Map each text token to a VO timestamp (greedy, tolerant to small mismatches). */
export const syncTokens = (tokens: string[], words: Word[], fromSec: number, fallbackGap: number): number[] => {
	const pool = words.filter((w) => w.s >= fromSec - 0.35);
	const out: number[] = [];
	let j = 0;
	let last = fromSec;
	for (const t of tokens) {
		const n = norm(t);
		let found = -1;
		for (let k = j; k < Math.min(pool.length, j + 6); k++) {
			const pw = norm(pool[k].w);
			if (pw === n || (n.length > 3 && (pw.startsWith(n) || n.startsWith(pw)))) {
				found = k;
				break;
			}
		}
		if (found >= 0) {
			last = pool[found].s;
			j = found + 1;
		} else {
			last = last + fallbackGap;
		}
		out.push(last);
	}
	return out;
};

type Unit = {text: string; start: number; accent: boolean; line: number};

export const TextBlock: React.FC<{layer: TextLayer; startFrame: number}> = ({layer, startFrame}) => {
	const frame = useCurrentFrame();
	const {fps, width} = useVideoConfig();
	const {words, palette, sceneStartSec} = useSpec();
	const unit = width / 1080;
	const st = typeStyles[layer.style ?? 'impact'];
	const caps = layer.caps ?? st.caps;
	const color = layer.color ?? palette.ink;
	const accentColor = layer.accentColor ?? palette.accent;
	const accentSet = useMemo(() => new Set((layer.accent ?? []).map(norm)), [layer.accent]);
	const anim = layer.anim ?? (layer.sync ? 'words' : 'pop');
	const f = frame - startFrame;
	const fontSize = ((layer.size ?? st.size) / 100) * width;
	const stagger = layer.stagger ?? 3;

	const lines = layer.text.split('\n');
	const units: Unit[] = useMemo(() => {
		const tokens: {t: string; line: number}[] = [];
		lines.forEach((ln, li) => ln.split(/\s+/).filter(Boolean).forEach((t) => tokens.push({t, line: li})));
		let starts: number[];
		if (layer.sync && words.length) {
			const layerStartSec = sceneStartSec + startFrame / fps;
			const secs = syncTokens(tokens.map((x) => x.t), words, layerStartSec, stagger / fps);
			// words appear ~2 frames before they are spoken (references: on or slightly before the word)
			starts = secs.map((s) => Math.max(0, Math.round((s - layerStartSec) * fps) - 2));
		} else {
			starts = tokens.map((_, i) => i * stagger);
		}
		return tokens.map((x, i) => ({text: x.t, start: starts[i], line: x.line, accent: accentSet.has(norm(x.t))}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [layer.text, layer.sync, words, sceneStartSec, startFrame, fps, stagger, accentSet]);

	const totalChars = layer.text.length;
	const cps = layer.cps ?? 22;
	const typedChars = Math.floor((f / fps) * cps);
	const lastStart = units.length ? units[units.length - 1].start : 0;
	const doneFrame = anim === 'typewriter' || anim === 'scramble' ? Math.ceil((totalChars / cps) * fps) : lastStart + 6;

	// whole-block transforms
	let blockStyle: React.CSSProperties = {};
	if (anim === 'pop') {
		const p = decay(f + 1, 0.62);
		blockStyle = {transform: `scale(${0.82 + 0.18 * p})`, opacity: clamp01(f / 2 + 0.34)};
	} else if (anim === 'slam') {
		const p = decay(f + 1, 0.58);
		blockStyle = {transform: `scale(${1.45 - 0.45 * p})`, filter: `blur(${(1 - p) * 10 * unit}px)`, opacity: clamp01(p * 1.6)};
	} else if (anim === 'mask') {
		const p = decay(f + 1, 0.72);
		blockStyle = {clipPath: `inset(-20% ${100 - p * 100}% -20% -5%)`};
	}

	const fxStyle = textFxStyle(layer.fx, color, unit);

	let charCursor = 0;
	const renderUnit = (u: Unit, idx: number) => {
		const uf = f - u.start;
		const col = u.accent ? accentColor : color;
		const txt = caps ? u.text.toUpperCase() : u.text;
		let style: React.CSSProperties = {display: 'inline-block', whiteSpace: 'pre', color: fxStyle.color ?? col};
		let content: React.ReactNode = txt;

		if (anim === 'words') {
			if (uf < 0) style.opacity = 0;
			else {
				const p = decay(uf + 1, 0.6);
				style.transform = `translateY(${(1 - p) * 0.18}em) scale(${0.8 + 0.2 * p})`;
				style.opacity = clamp01(0.35 + p);
			}
		} else if (anim === 'ghost') {
			if (uf < 0) style.opacity = 0;
			else {
				const p = decay(uf + 1, 0.74);
				style.transform = `scale(${0.75 + 0.25 * p})`;
				style.opacity = 0.4 + 0.6 * p;
				style.color = p < 0.85 ? '#8a8a8a' : col;
			}
		} else if (anim === 'focus') {
			if (uf < 0) style.opacity = 0;
			else {
				const p = decay(uf + 1, 0.7);
				style.filter = `blur(${(1 - p) * 12 * unit}px)`;
				style.opacity = clamp01(p * 1.3);
			}
		} else if (anim === 'letters') {
			content = txt.split('').map((ch, ci) => {
				const lf = uf - ci * 1.2;
				const p = lf < 0 ? 0 : decay(lf + 1, 0.6);
				return (
					<span key={ci} style={{display: 'inline-block', opacity: p > 0 ? 1 : 0, transform: `translateY(${(1 - p) * 0.35}em) rotate(${(1 - p) * (rand(ci + idx) - 0.5) * 30}deg)`}}>
						{ch}
					</span>
				);
			});
		} else if (anim === 'rise') {
			const p = uf < 0 ? 0 : decay(uf + 1, 0.7);
			content = <span style={{display: 'inline-block', transform: `translateY(${(1 - p) * 105}%)`}}>{txt}</span>;
			style.overflow = 'hidden';
			style.verticalAlign = 'bottom';
		} else if (anim === 'typewriter' || anim === 'scramble') {
			const chars = txt.split('');
			content = chars.map((ch, ci) => {
				const gi = charCursor + ci;
				if (anim === 'typewriter') {
					if (gi >= typedChars) return <span key={ci} style={{opacity: 0}}>{ch}</span>;
					const age = (f / fps) * cps - gi;
					const lead = layer.leadColor && age < 3 ? layer.leadColor : undefined;
					return (
						<span key={ci} style={{color: lead}}>
							{ch}
						</span>
					);
				}
				// scramble: random glyphs until resolve point
				const resolveAt = gi;
				const glyphs = '#%&@$*+=/<>?ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
				if (typedChars < resolveAt - 6) return <span key={ci} style={{opacity: 0}}>{ch}</span>;
				if (typedChars < resolveAt) return <span key={ci} style={{opacity: 0.8}}>{ch === ' ' ? ' ' : glyphs[Math.floor(rand(gi * 7 + Math.floor(f / 2)) * glyphs.length)]}</span>;
				return <span key={ci}>{ch}</span>;
			});
			charCursor += chars.length + 1;
		}
		return (
			<React.Fragment key={idx}>
				<span style={style}>{content}</span>
				{' '}
			</React.Fragment>
		);
	};

	const caretOn = anim === 'typewriter' && Math.floor(f / 8) % 2 === 0;
	const byLine = lines.map((_, li) => units.map((u, i) => ({u, i})).filter((x) => x.u.line === li));
	const underlineP = clamp01((f - doneFrame) / 7);
	const hlP = decay(f + 1, 0.72);

	return (
		<div
			style={{
				fontFamily: st.fontFamily,
				fontWeight: st.fontWeight,
				fontStyle: st.fontStyle,
				fontSize,
				lineHeight: layer.lineHeight ?? st.lineHeight,
				letterSpacing: `${layer.tracking ?? st.tracking}em`,
				textAlign: layer.align ?? 'center',
				color,
				position: 'relative',
				...fxStyle,
				...blockStyle,
			}}
		>
			{layer.highlight ? (
				<div
					style={{
						position: 'absolute',
						inset: '8% -3% 4% -3%',
						background: layer.highlight,
						transform: `scaleX(${hlP}) skewX(-6deg)`,
						transformOrigin: 'left center',
						zIndex: -1,
						borderRadius: 4 * unit,
					}}
				/>
			) : null}
			{byLine.map((ln, li) => (
				<div key={li}>
					{ln.map(({u, i}) => renderUnit(u, i))}
					{li === byLine.length - 1 && caretOn ? <span style={{display: 'inline-block', width: '0.06em', height: '0.9em', background: layer.leadColor ?? color, verticalAlign: 'middle'}} /> : null}
				</div>
			))}
			{layer.underline && layer.underline !== 'none' && underlineP > 0 ? (
				<div style={{position: 'absolute', left: '-4%', right: '-4%', bottom: `-${0.32 * (layer.lineHeight ?? st.lineHeight)}em`, height: '0.35em'}}>
					<DrawPath
						kind={layer.underline === 'scribble' ? 'scribble' : 'underline'}
						progress={underlineP}
						color={layer.underlineColor ?? color}
						stroke={Math.max(3, fontSize * 0.06)}
					/>
				</div>
			) : null}
		</div>
	);
};

