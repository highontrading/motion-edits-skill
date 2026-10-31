import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {useSpec} from '../context';
import {typeStyles} from '../lib/fonts';
import {decay, springAt} from '../lib/motion';
import type {BadgeLayer} from '../types';
import {shade} from '../fx/Backgrounds';
import {TextBlock} from './Text';

/**
 * Label badge: the most reused device in the collage explainers (v05, v06, v08, v10, v12…):
 * a solid rectangle in a deep accent with a dashed "stitched" inner border, heavy caps text,
 * revealed by a left→right mask wipe (~5 frames) or a pop.
 */
export const BadgeView: React.FC<{layer: BadgeLayer; startFrame: number}> = ({layer, startFrame}) => {
	const frame = useCurrentFrame();
	const {fps, width} = useVideoConfig();
	const {palette} = useSpec();
	const unit = width / 1080;
	const f = frame - startFrame;
	const variant = layer.variant ?? 'stitched';
	const bg = layer.color ?? '#7a0f12';
	const fg = layer.textColor ?? '#ffffff';
	const st = typeStyles[layer.style ?? 'grotesk'];
	const size = layer.size ?? 5.2;
	const anim = layer.anim ?? 'wipe';

	let wrap: React.CSSProperties = {};
	if (anim === 'wipe') {
		const p = decay(f + 1, 0.66);
		wrap = {clipPath: `inset(-10% ${100 - p * 100}% -10% -2%)`};
	} else if (anim === 'pop') {
		const s = springAt(f, fps, 'pop');
		wrap = {transform: `scale(${s})`};
	}

	const box: React.CSSProperties = {
		display: 'inline-block',
		padding: `${0.32 * size * unit * 10}px ${0.55 * size * unit * 10}px`,
		background: variant === 'outline' ? 'transparent' : variant === 'tape' ? `${bg}e6` : bg,
		border: variant === 'outline' ? `${4 * unit}px solid ${bg}` : undefined,
		borderRadius: variant === 'pill' ? 999 : variant === 'tape' ? 2 * unit : 6 * unit,
		boxShadow: variant === 'outline' ? undefined : `0 ${8 * unit}px ${22 * unit}px rgba(0,0,0,0.35)`,
		position: 'relative',
		transform: variant === 'tape' ? 'rotate(-2deg)' : undefined,
	};

	return (
		<div style={{display: 'flex', justifyContent: 'center', ...wrap}}>
			<div style={box}>
				{variant === 'stitched' ? (
					<div
						style={{
							position: 'absolute',
							inset: 7 * unit,
							border: `${2.5 * unit}px dashed ${shade(bg, 0.55)}`,
							borderRadius: 3 * unit,
							pointerEvents: 'none',
						}}
					/>
				) : null}
				<TextBlock
					layer={{
						type: 'text',
						text: layer.text,
						style: layer.style ?? 'grotesk',
						size,
						color: fg,
						caps: st.caps,
						anim: anim === 'words' ? 'words' : anim === 'typewriter' ? 'typewriter' : anim === 'swap' ? 'swap' : 'none',
						sync: layer.sync,
						stagger: layer.stagger,
						lineHeight: 1.02,
						accentColor: palette.accent,
					}}
					startFrame={startFrame}
				/>
			</div>
		</div>
	);
};
