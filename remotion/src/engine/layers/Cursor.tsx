import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {clamp01, curves, decay} from '../lib/motion';
import type {CursorLayer} from '../types';

/**
 * macOS-style arrow cursor following a path (seconds relative to the scene). Moves with a glide curve
 * between points; `click` points dip the cursor and emit a ring pulse (v05, v35, v36).
 */
export const CursorView: React.FC<{layer: CursorLayer}> = ({layer}) => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();
	const u = width / 1080;
	const t = frame / fps;
	const pts = layer.path;
	if (!pts.length || t < pts[0].t) return null;
	let x = pts[pts.length - 1].x;
	let y = pts[pts.length - 1].y;
	for (let i = 0; i < pts.length - 1; i++) {
		if (t >= pts[i].t && t < pts[i + 1].t) {
			const p = curves.glide(clamp01((t - pts[i].t) / (pts[i + 1].t - pts[i].t)));
			x = pts[i].x + (pts[i + 1].x - pts[i].x) * p;
			y = pts[i].y + (pts[i + 1].y - pts[i].y) * p;
			break;
		}
	}
	const clicks = pts.filter((p) => p.click && t >= p.t).map((p) => (t - p.t) * fps);
	const lastClick = clicks.length ? clicks[clicks.length - 1] : 999;
	const press = lastClick < 6 ? 0.85 + 0.15 * decay(lastClick + 1, 0.55) : 1;
	const size = (layer.size ?? 70) * u;
	return (
		<div style={{position: 'absolute', left: (x / 100) * width, top: (y / 100) * height, zIndex: layer.z ?? 50, pointerEvents: 'none'}}>
			{lastClick < 14 ? (
				<div
					style={{
						position: 'absolute',
						left: -size * 0.6,
						top: -size * 0.6,
						width: size * 1.2,
						height: size * 1.2,
						borderRadius: 999,
						border: `${4 * u}px solid ${layer.color ?? '#ffffff'}`,
						transform: `scale(${0.3 + lastClick / 10})`,
						opacity: 1 - lastClick / 14,
					}}
				/>
			) : null}
			<svg width={size} height={size} viewBox="0 0 24 24" style={{transform: `scale(${press})`, transformOrigin: '0 0', filter: `drop-shadow(0 ${3 * u}px ${5 * u}px rgba(0,0,0,0.45))`}}>
				<path d="M3 2 L3 19 L7.6 14.8 L10.6 21.5 L13.4 20.3 L10.5 13.7 L16.8 13.7 Z" fill={layer.color === '#000000' ? '#000' : '#111'} stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
			</svg>
		</div>
	);
};
