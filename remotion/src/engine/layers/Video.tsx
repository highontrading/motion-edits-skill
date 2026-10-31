import React from 'react';
import {OffthreadVideo, useCurrentFrame, useVideoConfig} from 'remotion';
import {useSceneFrameOf} from '../context';
import {decay, ramp} from '../lib/motion';
import type {VideoLayer} from '../types';
import {resolveSrc} from '../fx/Backgrounds';

/**
 * Footage layer — for editing the user's own clips. Supports trims, speed, punch-in zooms on words
 * (4f to peak, 6–8f settle, 6–10% scale — v04), B/W, and a floating card treatment.
 */
export const VideoView: React.FC<{layer: VideoLayer; startFrame: number}> = ({layer, startFrame}) => {
	const frame = useCurrentFrame();
	const {fps, width} = useVideoConfig();
	const frameOf = useSceneFrameOf();
	const unit = width / 1080;

	let scale = 1;
	for (const p of layer.punch ?? []) {
		const pf = frameOf(p.at, -1);
		if (pf < 0 || frame < pf) continue;
		const target = p.scale ?? 1.12;
		const inF = p.frames ?? 4;
		const local = frame - pf;
		if (local <= inF) scale *= 1 + (target - 1) * ramp(local, inF, 1.6);
		else if (p.hold !== undefined && local > inF + p.hold * fps) {
			scale *= 1 + (target - 1) * (1 - decay(local - inF - p.hold * fps, 0.75));
		} else scale *= target;
	}

	const full = layer.w === undefined;
	return (
		<div
			style={{
				width: '100%',
				height: full ? '100%' : undefined,
				aspectRatio: full ? undefined : '16 / 9',
				overflow: 'hidden',
				borderRadius: layer.radius ? layer.radius * unit : layer.card ? 22 * unit : undefined,
				boxShadow: layer.card ? `0 ${18 * unit}px ${40 * unit}px rgba(0,0,0,0.5)` : undefined,
			}}
		>
			<OffthreadVideo
				src={resolveSrc(layer.src)}
				startFrom={Math.round((layer.trimStart ?? 0) * fps) + Math.max(0, -startFrame)}
				playbackRate={layer.playbackRate ?? 1}
				volume={layer.muted ? 0 : layer.volume ?? 1}
				muted={layer.muted}
				style={{
					width: '100%',
					height: '100%',
					objectFit: layer.fit ?? 'cover',
					transform: `scale(${scale})`,
					filter: layer.grayscale ? 'grayscale(1) contrast(1.08)' : undefined,
				}}
			/>
		</div>
	);
};
