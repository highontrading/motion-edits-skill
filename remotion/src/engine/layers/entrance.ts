import type React from 'react';
import {clamp01, decay, springAt, wiggle} from '../lib/motion';
import type {ImageAnim} from '../types';

/**
 * Entrance vocabulary for props/cards/devices. Values are measured from the references:
 * slides decay at ~0.78/frame with no overshoot; pops & stamps use a quick spring with ~8% overshoot;
 * 'drop' falls with a single bounce; 'focus' resolves from blur.
 */
export const entranceStyle = (anim: ImageAnim | undefined, f: number, fps: number, unit: number): React.CSSProperties => {
	if (!anim || anim === 'none') return {};
	if (f < 0) return {opacity: 0};
	const d = decay(f + 1, 0.78);
	const blurPx = (1 - d) * 14 * unit;
	switch (anim) {
		case 'pop': {
			const s = springAt(f, fps, 'pop');
			return {transform: `scale(${s})`};
		}
		case 'stamp': {
			const s = 1.6 - 0.6 * springAt(f, fps, 'firm');
			return {transform: `scale(${s}) rotate(${(1 - d) * -8}deg)`, opacity: clamp01(f / 2)};
		}
		case 'drop': {
			const s = springAt(f, fps, 'pop');
			return {transform: `translateY(${(1 - s) * -120}%)`};
		}
		case 'rise':
		case 'slide-up':
			return {transform: `translateY(${(1 - d) * 110}%)`, filter: `blur(${blurPx * 0.4}px)`};
		case 'slide-down':
			return {transform: `translateY(${(1 - d) * -110}%)`, filter: `blur(${blurPx * 0.4}px)`};
		case 'slide-left':
			return {transform: `translateX(${(1 - d) * 120}%)`, filter: `blur(${blurPx * 0.4}px)`};
		case 'slide-right':
			return {transform: `translateX(${(1 - d) * -120}%)`, filter: `blur(${blurPx * 0.4}px)`};
		case 'fade':
			return {opacity: d};
		case 'focus':
			return {filter: `blur(${blurPx}px)`, opacity: clamp01(d * 1.4), transform: `scale(${1.06 - 0.06 * d})`};
		case 'spin-in': {
			const s = springAt(f, fps, 'device');
			return {transform: `scale(${s}) rotate(${(1 - s) * -90}deg)`};
		}
	}
	return {};
};

export const exitStyle = (exit: string | undefined, f: number, unit: number): React.CSSProperties => {
	if (!exit || exit === 'cut') return {};
	const p = clamp01(f / 5);
	switch (exit) {
		case 'fade':
			return {opacity: 1 - p};
		case 'pop':
			return {transform: `scale(${1 - p})`, opacity: 1 - p};
		case 'blur':
			return {filter: `blur(${p * 16 * unit}px)`, opacity: 1 - p};
		case 'slide-up':
			return {transform: `translateY(${-p * 130}%)`};
		case 'slide-down':
			return {transform: `translateY(${p * 130}%)`};
		case 'slide-left':
			return {transform: `translateX(${-p * 130}%)`};
		case 'slide-right':
			return {transform: `translateX(${p * 130}%)`};
	}
	return {};
};

export const idleStyle = (f: number, seed: number, float = 0, jitter = 0): string => {
	const parts: string[] = [];
	if (float) parts.push(`translateY(${Math.sin(f / 22 + seed) * float}px)`);
	if (jitter) parts.push(`translate(${wiggle(f, seed, jitter)}px, ${wiggle(f, seed + 9, jitter)}px)`);
	return parts.join(' ');
};
