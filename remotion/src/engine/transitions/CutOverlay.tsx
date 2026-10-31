import React from 'react';
import {AbsoluteFill, Img, useCurrentFrame, useVideoConfig} from 'remotion';
import {resolveSrc} from '../fx/Backgrounds';
import {clamp01, ramp} from '../lib/motion';
import type {Transition} from '../types';

/**
 * Overlays that sit ON TOP of a cut (rendered in a Sequence starting `pre` frames before the cut).
 *  flash       — 1 white frame at the cut, then a fast fade (v12)
 *  flash-ramp  — exposure ramps to white into the cut then falls off (v02, v03)
 *  black       — 1–3 black frames (v20)
 *  object      — a large blurred object/shape crosses the frame and wipes (v05 hubcap)
 */
export const CutOverlay: React.FC<{t: Transition; pre: number}> = ({t, pre}) => {
	const frame = useCurrentFrame();
	const {width} = useVideoConfig();
	const f = frame - pre; // 0 = cut frame
	const color = t.color ?? '#ffffff';
	switch (t.type) {
		case 'flash': {
			if (f < 0) return null;
			// full white on the cut frame, then each frame keeps ~55% of the previous opacity
			return <AbsoluteFill style={{background: color, opacity: Math.pow(0.55, f)}} />;
		}
		case 'flash-ramp': {
			const o = f < 0 ? ramp(f + pre + 1, pre, 1.5) : Math.pow(0.62, f);
			return <AbsoluteFill style={{background: color, opacity: clamp01(o)}} />;
		}
		case 'wash': {
			// flat colour floods in over 2 frames, holds through the cut, releases over ~4
			const rel = Math.pow(0.02, 1 / Math.max(2, (t.frames ?? 4) + 2));
			const o = f < 0 ? clamp01((f + pre + 1) / pre) : f < 1 ? 1 : Math.pow(rel, f);
			return <AbsoluteFill style={{background: t.color ?? '#2f6bff', opacity: o}} />;
		}
		case 'burn': {
			// warm film-burn / light-leak bloom sweeping across the cut
			const n = pre + (t.frames ?? 8);
			const p = clamp01((f + pre) / n);
			const o = Math.sin(Math.PI * p);
			const x = -20 + 140 * p;
			return (
				<AbsoluteFill
					style={{
						opacity: o,
						mixBlendMode: 'screen',
						background: `radial-gradient(ellipse 70% 90% at ${x}% 45%, ${t.color ?? '#ffb347'} 0%, rgba(255,90,20,0.85) 35%, rgba(120,0,0,0) 75%)`,
					}}
				/>
			);
		}
		case 'black':
			return f >= 0 && f < (t.frames ?? 2) ? <AbsoluteFill style={{background: t.color ?? '#000'}} /> : null;
		case 'object': {
			const n = t.frames ?? 8;
			const p = clamp01((f + n / 2) / n);
			const x = -0.9 + 2 * p; // -0.9 → 1.1 frame widths
			const speedBlur = 22 * (width / 1080) * Math.sin(Math.PI * p);
			return (
				<AbsoluteFill style={{pointerEvents: 'none'}}>
					<div
						style={{
							position: 'absolute',
							top: '-15%',
							height: '130%',
							width: '130%',
							left: `${x * 100 - 15}%`,
							filter: `blur(${speedBlur}px)`,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						{t.src ? (
							<Img src={resolveSrc(t.src)} style={{height: '100%', objectFit: 'contain'}} />
						) : (
							<div style={{width: '100%', height: '100%', borderRadius: '50%', background: t.color ?? '#111'}} />
						)}
					</div>
				</AbsoluteFill>
			);
		}
	}
	return null;
};

export const overlayPre = (t: Transition): number => {
	switch (t.type) {
		case 'flash-ramp':
			return t.frames ?? 5;
		case 'wash':
			return 2;
		case 'burn':
			return 3;
		case 'object':
			return Math.ceil((t.frames ?? 8) / 2);
		default:
			return 0;
	}
};

export const overlayPost = (t: Transition): number => {
	switch (t.type) {
		case 'flash':
			return 8;
		case 'flash-ramp':
			return 10;
		case 'black':
			return t.frames ?? 2;
		case 'wash':
			return 6;
		case 'burn':
			return 8;
		case 'object':
			return Math.ceil((t.frames ?? 8) / 2) + 1;
		default:
			return 0;
	}
};
