import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {useSpec} from '../context';
import {typeStyles} from '../lib/fonts';
import {clamp01, curves, decay} from '../lib/motion';
import type {CounterLayer} from '../types';
import {textFxStyle} from './Text';

const fmt = (v: number, decimals: number, sep: string) => {
	const fixed = v.toFixed(decimals);
	const [int, dec] = fixed.split('.');
	const withSep = sep ? int.replace(/\B(?=(\d{3})+(?!\d))/g, sep) : int;
	return dec ? `${withSep}.${dec}` : withSep;
};

/**
 * Number counter. 'roll' = expo-out count (lands on the spoken number), 'tick' = stepped ticker,
 * 'flip' = split-flap digits that flip once each when they change (v14).
 */
export const CounterView: React.FC<{layer: CounterLayer; startFrame: number}> = ({layer, startFrame}) => {
	const frame = useCurrentFrame();
	const {fps, width} = useVideoConfig();
	const {palette} = useSpec();
	const unit = width / 1080;
	const f = Math.max(0, frame - startFrame);
	const dur = (layer.duration ?? 1.2) * fps;
	const mode = layer.mode ?? 'roll';
	let p = clamp01(f / dur);
	p = mode === 'tick' ? Math.floor(p * 12) / 12 : curves.settle(p);
	const v = layer.from + (layer.to - layer.from) * p;
	const text = `${layer.prefix ?? ''}${fmt(v, layer.decimals ?? 0, layer.separator ?? ',')}${layer.suffix ?? ''}`;
	const st = typeStyles[layer.style ?? 'impact'];
	const color = layer.color ?? palette.ink;
	const size = ((layer.size ?? 18) / 100) * width;

	const common: React.CSSProperties = {
		fontFamily: st.fontFamily,
		fontWeight: st.fontWeight,
		fontSize: size,
		lineHeight: 1,
		letterSpacing: `${st.tracking}em`,
		color,
		fontVariantNumeric: 'tabular-nums',
		textAlign: 'center',
		...textFxStyle(layer.fx, color, unit),
	};

	if (mode === 'flip') {
		const prevText = `${layer.prefix ?? ''}${fmt(layer.from + (layer.to - layer.from) * clamp01((f - 3) / dur), layer.decimals ?? 0, layer.separator ?? ',')}${layer.suffix ?? ''}`;
		return (
			<div style={{...common, display: 'flex', justifyContent: 'center', gap: size * 0.06}}>
				{text.split('').map((ch, i) => {
					const changed = prevText[i] !== ch;
					const flip = changed ? 1 - decay(2, 0.5) : 1;
					return (
						<span
							key={i}
							style={{
								display: 'inline-block',
								background: '#151515',
								color: '#f4f1ea',
								padding: `${size * 0.06}px ${size * 0.1}px`,
								borderRadius: size * 0.06,
								boxShadow: `inset 0 -${size * 0.5}px 0 rgba(255,255,255,0.04), 0 ${6 * unit}px ${14 * unit}px rgba(0,0,0,0.4)`,
								transform: `scaleY(${flip})`,
							}}
						>
							{ch}
						</span>
					);
				})}
			</div>
		);
	}
	return <div style={common}>{text}</div>;
};
