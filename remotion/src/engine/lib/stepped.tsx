import React from 'react';
import {Freeze, useCurrentFrame, useVideoConfig} from 'remotion';

/**
 * "Animated on twos/threes": the collage-explainer signature (v06, v09, v11, v13, v15, v19, v23…).
 * Children only update `animFps` times per second while cuts stay frame-accurate on the
 * master timeline. 12 fps = stop-motion/paper feel, 15 fps = slightly smoother, 0/undefined = off.
 *
 * For a 30 fps master and 12 fps animation the hold pattern alternates 2,3,2,3 frames —
 * exactly the cadence measured in the references.
 */
export const Stepped: React.FC<{animFps?: number; children: React.ReactNode}> = ({animFps, children}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	if (!animFps || animFps >= fps) return <>{children}</>;
	const step = fps / animFps;
	const stepped = Math.floor(Math.floor(frame / step) * step + 1e-6);
	return <Freeze frame={stepped}>{children}</Freeze>;
};

export const steppedFrame = (frame: number, fps: number, animFps?: number) => {
	if (!animFps || animFps >= fps) return frame;
	const step = fps / animFps;
	return Math.floor(Math.floor(frame / step) * step + 1e-6);
};
