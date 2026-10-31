import React, {useMemo} from 'react';
import {AbsoluteFill, Audio, Sequence, useVideoConfig} from 'remotion';
import {CaptionTrack} from './Captions';
import {defaultPalette, SpecContext} from './context';
import {FinishPass} from './fx/Finish';
import {resolveSrc} from './fx/Backgrounds';
import {layoutScenes, resolveTime, videoDuration} from './lib/time';
import {CUT_FRAMES, OVERLAP_CUTS, SceneView} from './Scene';
import {CutOverlay, overlayPost, overlayPre} from './transitions/CutOverlay';
import type {VideoSpec, Word} from './types';

export type SpecVideoProps = {spec: VideoSpec};

export const specWords = (spec: VideoSpec): Word[] => (Array.isArray(spec.words) ? spec.words : []);

export const specDurationInFrames = (spec: VideoSpec) => {
	const fps = spec.fps ?? 30;
	return Math.max(1, Math.round(videoDuration(spec, specWords(spec)) * fps));
};

/** Renders a VideoSpec: scenes on the timeline, cut transitions, captions, audio and the finishing pass. */
export const SpecVideo: React.FC<SpecVideoProps> = ({spec}) => {
	const {fps, durationInFrames} = useVideoConfig();
	const words = specWords(spec);
	const palette = useMemo(() => ({...defaultPalette, ...spec.palette}), [spec.palette]);
	const total = durationInFrames / fps;
	const scenes = useMemo(() => layoutScenes(spec, words, fps, total), [spec, words, fps, total]);

	const musicVol = spec.audio?.musicVolume ?? 0.35;
	const duck = spec.audio?.duckTo;
	const musicVolume = (f: number) => {
		if (duck === undefined || !words.length) return musicVol;
		const t = f / fps;
		const speaking = words.some((w) => t >= w.s - 0.15 && t <= w.e + 0.25);
		return speaking ? duck : musicVol;
	};

	return (
		<AbsoluteFill style={{background: palette.bg}}>
			{scenes.map((s, i) => {
				const next = scenes[i + 1];
				const outT = next?.transition;
				const overlap = outT && OVERLAP_CUTS.includes(outT.type) ? outT.frames ?? CUT_FRAMES[outT.type] ?? 8 : 0;
				return (
					<Sequence key={i} from={s.from} durationInFrames={s.durationInFrames + overlap} premountFor={Math.round(fps)} name={s.id ?? `scene ${i + 1}`}>
						<SpecContext.Provider value={{words, palette, sceneStartSec: s.from / fps, sceneDurationInFrames: s.durationInFrames}}>
							<AbsoluteFill style={{zIndex: i}}>
								<SceneView scene={s} index={i} durationInFrames={s.durationInFrames} inT={s.transition} outT={outT} animFps={spec.animFps} />
							</AbsoluteFill>
						</SpecContext.Provider>
						{(s.sfx ?? []).map((x, k) => {
							const at = resolveTime(x.at ?? 0, words, s.from / fps) ?? s.from / fps;
							return (
								<Sequence key={k} from={Math.round(at * fps) - s.from}>
									<Audio src={resolveSrc(x.src)} volume={x.volume ?? 0.8} />
								</Sequence>
							);
						})}
					</Sequence>
				);
			})}

			{scenes.map((s, i) => {
				const t = s.transition;
				if (!t || i === 0) return null;
				const pre = overlayPre(t);
				const post = overlayPost(t);
				if (pre + post === 0) return null;
				return (
					<Sequence key={`t${i}`} from={s.from - pre} durationInFrames={pre + post} name={`cut ${t.type}`}>
						<AbsoluteFill style={{zIndex: 800}}>
							<CutOverlay t={t} pre={pre} />
						</AbsoluteFill>
					</Sequence>
				);
			})}

			{spec.captions?.enabled && words.length ? <CaptionTrack words={words} spec={spec.captions} /> : null}

			<AbsoluteFill style={{zIndex: 950, pointerEvents: 'none'}}>
				<FinishPass finish={spec.finish} />
			</AbsoluteFill>

			{spec.audio?.vo ? <Audio src={resolveSrc(spec.audio.vo)} /> : null}
			{spec.audio?.music ? <Audio src={resolveSrc(spec.audio.music)} volume={musicVolume} loop /> : null}
			{(spec.audio?.sfx ?? []).map((x, k) => {
				const at = resolveTime(x.at, words, 0, true) ?? 0;
				return (
					<Sequence key={`sfx${k}`} from={Math.round(at * fps)}>
						<Audio src={resolveSrc(x.src)} volume={x.volume ?? 0.8} />
					</Sequence>
				);
			})}
		</AbsoluteFill>
	);
};
