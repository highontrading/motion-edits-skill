import React, {useLayoutEffect, useRef, useState} from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {useSpec} from '../context';
import {clamp01, decay} from '../lib/motion';
import type {ShapeLayer} from '../types';

/** Hand-drawn path library in a 100×100 box (non-uniformly scaled to the layer box). */
const PATHS: Record<string, string> = {
	// imperfect ellipse that overshoots its start (marker circling a word)
	ellipse: 'M 12 58 C 8 30, 40 12, 70 16 C 96 20, 99 52, 82 72 C 64 92, 22 90, 8 70 C 2 60, 6 44, 22 34',
	circle: 'M 50 6 C 78 6, 94 26, 94 50 C 94 76, 74 94, 50 94 C 24 94, 6 76, 6 50 C 6 26, 24 6, 52 8',
	underline: 'M 2 60 C 25 52, 60 50, 98 46',
	scribble: 'M 2 40 C 30 30, 70 30, 98 34 C 70 44, 40 52, 14 62 C 40 60, 62 58, 80 64',
	arrow: 'M 4 80 C 30 70, 60 46, 92 18 M 92 18 L 70 22 M 92 18 L 86 40',
	cross: 'M 10 10 L 90 90 M 90 10 L 10 90',
	check: 'M 8 55 L 38 84 L 94 14',
	bracket: 'M 30 4 L 8 4 L 8 96 L 30 96 M 70 4 L 92 4 L 92 96 L 70 96',
	line: 'M 0 50 L 100 50',
	rect: 'M 4 4 L 96 4 L 96 96 L 4 96 Z',
	burst:
		'M 50 2 L 58 32 L 86 14 L 70 42 L 98 50 L 70 58 L 86 86 L 58 68 L 50 98 L 42 68 L 14 86 L 30 58 L 2 50 L 30 42 L 14 14 L 42 32 Z',
};

/** Scale the 100×100 path coordinates to the real box so strokes stay uniform and draw-on dashes stay exact. */
const scalePath = (d: string, w: number, h: number) => {
	let i = 0;
	return d.replace(/-?\d+(\.\d+)?/g, (n) => String(((i++ % 2 === 0 ? w : h) * parseFloat(n)) / 100));
};

export const DrawPath: React.FC<{kind: string; progress: number; color: string; stroke: number; fill?: string}> = ({kind, progress, color, stroke, fill}) => {
	const ref = useRef<HTMLDivElement>(null);
	const [box, setBox] = useState<[number, number] | null>(null);
	useLayoutEffect(() => {
		if (ref.current) setBox([ref.current.offsetWidth, ref.current.offsetHeight]);
	}, []);
	return (
		<div ref={ref} style={{width: '100%', height: '100%'}}>
			{box && box[0] > 0 ? (
				<svg viewBox={`0 0 ${box[0]} ${box[1]}`} style={{width: '100%', height: '100%', overflow: 'visible'}}>
					<path
						d={scalePath(PATHS[kind] ?? PATHS.line, box[0], box[1])}
						fill={fill && progress >= 1 ? fill : 'none'}
						stroke={color}
						strokeWidth={stroke}
						strokeLinecap="round"
						strokeLinejoin="round"
						pathLength={1}
						strokeDasharray="1 1"
						strokeDashoffset={1 - progress}
					/>
				</svg>
			) : null}
		</div>
	);
};

export const ShapeView: React.FC<{layer: ShapeLayer; startFrame: number}> = ({layer, startFrame}) => {
	const frame = useCurrentFrame();
	const {width} = useVideoConfig();
	const {palette} = useSpec();
	const f = frame - startFrame;
	const draw = layer.draw ?? 7;
	const progress = layer.kind === 'burst' ? 1 : clamp01(decay(f + 1, Math.pow(0.02, 1 / draw)));
	const scale = layer.kind === 'burst' ? 0.3 + 0.7 * decay(f + 1, 0.6) : 1;
	return (
		<div style={{width: '100%', height: '100%', transform: `scale(${scale}) rotate(${layer.kind === 'burst' ? f * 0.6 : 0}deg)`}}>
			<DrawPath kind={layer.kind} progress={progress} color={layer.color ?? palette.ink} stroke={(layer.stroke ?? 7) * (width / 1080)} fill={layer.fill} />
		</div>
	);
};
