import React, {createContext, useContext} from 'react';
import {AbsoluteFill, Freeze, useVideoConfig} from 'remotion';
import {SpecContext, useSpec} from '../context';
import type {TimedScene} from '../lib/time';
import type {EmbedLayer} from '../types';

/** Timeline of all scenes, provided by SpecVideo so an `embed` layer can render another scene. */
export const ScenesContext = createContext<{scenes: TimedScene[]; animFps?: number; render?: (s: TimedScene) => React.ReactNode}>({scenes: []});

/**
 * Renders another scene inside a box (a phone screen, a TV, an Instagram post…). With mode 'last' it shows
 * that scene's final frame, which is exactly what was on screen at the cut — so a `shrink` transition
 * reads as one continuous pull-back from the old scene into its new container.
 */
export const EmbedView: React.FC<{layer: EmbedLayer}> = ({layer}) => {
	const {scenes, render} = useContext(ScenesContext);
	const spec = useSpec();
	const {width, height, fps} = useVideoConfig();
	const target = scenes.find((s) => s.id === layer.scene);
	const u = width / 1080;
	if (!target || !render) return null;
	const aspect = layer.aspect ?? width / height;
	// inner canvas is rendered at full video size and scaled into the box
	const boxW = ((layer.w ?? 60) / 100) * width;
	const k = boxW / width;
	const content = (
		<SpecContext.Provider value={{...spec, sceneStartSec: target.from / fps, sceneDurationInFrames: target.durationInFrames}}>
			{render(target)}
		</SpecContext.Provider>
	);
	return (
		<div
			style={{
				width: '100%',
				aspectRatio: `${aspect}`,
				position: 'relative',
				overflow: 'hidden',
				borderRadius: (layer.radius ?? 0) * u,
				boxShadow: layer.shadow === false ? undefined : `0 ${18 * u}px ${44 * u}px rgba(0,0,0,0.45)`,
			}}
		>
			<div style={{position: 'absolute', left: 0, top: 0, width, height, transform: `scale(${k})`, transformOrigin: '0 0'}}>
				<AbsoluteFill>
					{(layer.mode ?? 'last') === 'last' ? <Freeze frame={target.durationInFrames - 1}>{content}</Freeze> : content}
				</AbsoluteFill>
			</div>
		</div>
	);
};
