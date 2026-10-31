import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {useSpec} from '../context';
import {rand} from '../lib/motion';
import type {ParticlesLayer} from '../types';

/**
 * Ambient particles (41/82 references): dust motes drifting through light, sparkles twinkling around a
 * hero, rising embers, out-of-focus bokeh, confetti bursts, snow. Deterministic (seeded) and cheap:
 * one small element per particle, animated with transform + opacity only.
 */
export const ParticlesView: React.FC<{layer: ParticlesLayer; startFrame: number}> = ({layer, startFrame}) => {
	const frame = useCurrentFrame();
	const {width, height, fps} = useVideoConfig();
	const {palette} = useSpec();
	const kind = layer.kind ?? 'dust';
	const count = Math.min(layer.count ?? ({dust: 40, sparkle: 18, embers: 30, bokeh: 14, confetti: 60, snow: 50} as const)[kind], 200);
	const seed = (layer.seed ?? 1) * 101;
	const sz = (layer.size ?? 1) * (width / 1080);
	const sp = layer.speed ?? 1;
	const t = (frame - startFrame) / fps;
	const [ax, ay, aw, ah] = layer.area ?? [0, 0, 100, 100];
	const color = layer.color ?? (kind === 'embers' ? '#ff9a3c' : kind === 'confetti' ? palette.accent : '#ffffff');
	const confettiColors = [palette.accent, palette.accent2, '#ffd400', '#ffffff', '#2f6bff'];

	const items = [];
	for (let i = 0; i < count; i++) {
		const r1 = rand(seed + i * 3.7);
		const r2 = rand(seed + i * 9.1);
		const r3 = rand(seed + i * 5.3);
		let x = ax + r1 * aw;
		let y = ay + r2 * ah;
		let size = 4 * sz;
		let opacity = 1;
		let rot = 0;
		let style: React.CSSProperties = {};
		switch (kind) {
			case 'dust': {
				x += Math.sin(t * 0.6 * sp + i) * 1.5;
				y += -((t * 1.2 * sp + r3 * 100) % 100) * 0.08 + Math.cos(t * 0.5 + i) * 1;
				size = (2 + r3 * 5) * sz;
				opacity = 0.25 + 0.5 * Math.abs(Math.sin(t * 0.8 + i));
				style = {borderRadius: 99, background: color, filter: r3 > 0.7 ? `blur(${2 * sz}px)` : undefined};
				break;
			}
			case 'sparkle': {
				const tw = Math.max(0, Math.sin(t * (2 + r3 * 3) * sp + i * 1.7));
				size = (10 + r3 * 26) * sz * (0.4 + 0.6 * tw);
				opacity = tw;
				rot = t * 40 * (r3 - 0.5);
				style = {
					background: color,
					clipPath: 'polygon(50% 0, 58% 42%, 100% 50%, 58% 58%, 50% 100%, 42% 58%, 0 50%, 42% 42%)',
					filter: `drop-shadow(0 0 ${6 * sz}px ${color})`,
				};
				break;
			}
			case 'embers': {
				const life = (t * 0.18 * sp * (0.6 + r3) + r2) % 1;
				y = ay + ah * (1 - life);
				x += Math.sin(t * 2 + i) * 2;
				size = (3 + r3 * 5) * sz;
				opacity = Math.sin(Math.PI * life);
				style = {borderRadius: 99, background: color, boxShadow: `0 0 ${10 * sz}px ${color}`};
				break;
			}
			case 'bokeh': {
				x += Math.sin(t * 0.25 * sp + i) * 3;
				y += Math.cos(t * 0.2 * sp + i * 2) * 2;
				size = (40 + r3 * 110) * sz;
				opacity = 0.12 + 0.18 * Math.abs(Math.sin(t * 0.4 + i));
				style = {borderRadius: 99, background: `radial-gradient(circle, ${color} 0%, ${color} 55%, transparent 72%)`, filter: `blur(${4 * sz}px)`};
				break;
			}
			case 'confetti': {
				const fall = ((t * 0.35 * sp * (0.7 + r3 * 0.6) + r2) % 1.2) - 0.1;
				y = ay + ah * fall;
				x += Math.sin(t * 3 + i) * 3;
				size = (10 + r3 * 12) * sz;
				rot = t * 360 * (r3 - 0.5) * 2;
				style = {background: confettiColors[i % confettiColors.length], height: size * 0.45, borderRadius: 2};
				break;
			}
			case 'snow': {
				const fall = (t * 0.08 * sp * (0.6 + r3) + r2) % 1;
				y = ay + ah * fall;
				x += Math.sin(t + i) * 2;
				size = (3 + r3 * 7) * sz;
				opacity = 0.5 + 0.5 * r3;
				style = {borderRadius: 99, background: color};
				break;
			}
		}
		items.push(
			<div
				key={i}
				style={{
					position: 'absolute',
					left: (x / 100) * width,
					top: (y / 100) * height,
					width: size,
					height: style.height ?? size,
					opacity: opacity * (layer.opacity ?? 1),
					transform: `translate(-50%, -50%) rotate(${rot}deg)`,
					...style,
				}}
			/>,
		);
	}
	return <AbsoluteFill style={{pointerEvents: 'none', zIndex: layer.z ?? 40}}>{items}</AbsoluteFill>;
};
