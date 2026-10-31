import React from 'react';
import {Img, useCurrentFrame, useVideoConfig} from 'remotion';
import {useSceneFrameOf} from '../context';
import {clamp01} from '../lib/motion';
import type {ImageLayer} from '../types';
import {resolveSrc} from '../fx/Backgrounds';

/**
 * Photo / prop layer. `cutout` = the collage-explainer treatment: a thin white paper edge around the
 * alpha matte plus a soft contact shadow, so a PNG reads as a physically cut photo on a set.
 * `print` = white-bordered photo print. `swap` = in-place object swap on a spoken word with a glow flash.
 */
export const ImageView: React.FC<{layer: ImageLayer; startFrame: number}> = ({layer}) => {
	const frame = useCurrentFrame();
	const {width} = useVideoConfig();
	const frameOf = useSceneFrameOf();
	const unit = width / 1080;
	const swapF = layer.swap ? frameOf(layer.swap.at, 1e9) : 1e9;
	const swapped = frame >= swapF;
	const src = swapped && layer.swap ? layer.swap.src : layer.src;
	const glow = layer.swap?.glow !== false && Math.abs(frame - swapF) <= 3 ? 1 - Math.abs(frame - swapF) / 4 : 0;

	const filters: string[] = [];
	if (layer.cutout) {
		const e = 3.2 * unit;
		filters.push(
			`drop-shadow(${e}px 0 0 #fff)`,
			`drop-shadow(-${e}px 0 0 #fff)`,
			`drop-shadow(0 ${e}px 0 #fff)`,
			`drop-shadow(0 -${e}px 0 #fff)`,
		);
	}
	const sh = layer.shadow ?? (layer.cutout || layer.print ? 'soft' : 'none');
	if (sh === 'soft') filters.push(`drop-shadow(0 ${14 * unit}px ${22 * unit}px rgba(0,0,0,0.45))`);
	if (sh === 'hard') filters.push(`drop-shadow(${10 * unit}px ${12 * unit}px 0 rgba(0,0,0,0.55))`);
	if (sh === 'long') filters.push(`drop-shadow(${24 * unit}px ${30 * unit}px ${6 * unit}px rgba(0,0,0,0.35))`);
	if (layer.grayscale) filters.push('grayscale(1) contrast(1.1)');
	if (layer.halftone) filters.push('contrast(1.25) saturate(0.9)');
	if (glow > 0) filters.push(`brightness(${1 + glow * 0.9})`, `drop-shadow(0 0 ${40 * unit * glow}px rgba(255,200,80,${glow}))`);

	const img = (
		<Img
			src={resolveSrc(src)}
			style={{
				width: '100%',
				height: layer.h ? '100%' : 'auto',
				objectFit: layer.fit ?? 'contain',
				display: 'block',
				borderRadius: layer.radius ? layer.radius * unit : undefined,
			}}
		/>
	);

	const dots = layer.halftone ? (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				mixBlendMode: 'multiply',
				backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.45) ${1.6 * unit}px, transparent ${2.1 * unit}px)`,
				backgroundSize: `${6 * unit}px ${6 * unit}px`,
				WebkitMaskImage: `url(${resolveSrc(src)})`,
				maskImage: `url(${resolveSrc(src)})`,
				WebkitMaskSize: '100% 100%',
				maskSize: '100% 100%',
			}}
		/>
	) : null;

	if (layer.print) {
		return (
			<div
				style={{
					background: '#f7f5ef',
					padding: `${14 * unit}px ${14 * unit}px ${14 * unit}px`,
					boxShadow: `0 ${16 * unit}px ${30 * unit}px rgba(0,0,0,0.45)`,
					filter: filters.filter((x) => !x.startsWith('drop-shadow(0 1')).join(' ') || undefined,
					position: 'relative',
				}}
			>
				<div style={{position: 'relative'}}>
					{img}
					{dots}
				</div>
			</div>
		);
	}
	return (
		<div style={{position: 'relative', width: '100%', height: layer.h ? '100%' : undefined, filter: filters.join(' ') || undefined, opacity: clamp01(1)}}>
			{img}
			{dots}
		</div>
	);
};
