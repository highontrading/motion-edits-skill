import React, {useMemo} from 'react';
import {AbsoluteFill, Audio, Sequence, useVideoConfig} from 'remotion';
import {CaptionTrack} from './Captions';
import {defaultPalette, SpecContext} from './context';
import {FinishPass} from './fx/Finish';
import {resolveSrc} from './fx/Backgrounds';
import {layoutScenes, resolveTime, setBeats, videoDuration} from './lib/time';
import {CUT_FRAMES, OVERLAP_CUTS, SceneView} from './Scene';
import {CutOverlay, overlayPost, overlayPre} from './transitions/CutOverlay';
import type {VideoSpec, Word} from './types';
import {ScenesContext} from './layers/Embed';
import {LayerView} from './layers/LayerView';
import type {TimedScene} from './lib/time';

/** postFinish: grain/halftone are applied afterwards by tools/render.py (ffmpeg) — much faster renders. */
export type SpecVideoProps = {spec: VideoSpec; postFinish?: boolean};

export const specWords = (spec: VideoSpec): Word[] => (Array.isArray(spec.words) ? spec.words : []);

export const specDurationInFrames = (spec: VideoSpec) => {
	const fps = spec.fps ?? 30;
	return Math.max(1, Math.round(videoDuration(spec, specWords(spec)) * fps));
};

/** Renders a VideoSpec: scenes on the timeline, cut transitions, captions, audio and the finishing pass. */
export const SpecVideo: React.FC<SpecVideoProps> = ({spec, postFinish}) => {
	const {fps, durationInFrames} = useVideoConfig();
	const words = specWords(spec);
	setBeats(typeof spec.beats === 'object' ? spec.beats : undefined);
	const palette = useMemo(() => ({...defaultPalette, ...spec.palette}), [spec.palette]);
	const total = durationInFrames / fps;
	const scenes = useMemo(() => layoutScenes(spec, words, fps, total), [spec, words, fps, total]);

	const musicVol = spec.audio?.musicVolume ?? 0.35;
	const duck = spec.audio?.duckTo;
	// speech regions with pauses < 0.6 s merged, so the bed doesn't pump between words
	const speech = useMemo(() => {
		const out: [number, number][] = [];
		for (const w of words) {
			const last = out[out.length - 1];
			if (last && w.s - last[1] < 0.6) last[1] = Math.max(last[1], w.e);
			else out.push([w.s, w.e]);
		}
		return out;
	}, [words]);
	const fadeOut = spec.audio?.musicFadeOut ?? 0.6;
	const musicVolume = (f: number) => {
		const t = f / fps;
		let v = musicVol;
		if (duck !== undefined && speech.length) {
			// distance outside the nearest speech region; attack 0.13 s before, release 0.33 s after
			let k = 1;
			for (const [s, e] of speech) {
				if (t >= s - 0.13 && t <= e + 0.33) {
					const into = t < s ? (s - t) / 0.13 : t > e ? (t - e) / 0.33 : 0;
					k = Math.min(k, into);
				}
			}
			v = duck + (musicVol - duck) * k;
		}
		const total = durationInFrames / fps;
		if (fadeOut > 0 && t > total - fadeOut) v *= Math.max(0, (total - t) / fadeOut);
		return v;
	};

	// lets `embed` layers render any scene (frozen on its last frame) inside a box
	const renderScene = (t: TimedScene) => <SceneView scene={t} index={t.index + 1000} durationInFrames={t.durationInFrames} animFps={spec.animFps} />;

	return (
		<ScenesContext.Provider value={{scenes, animFps: spec.animFps, render: renderScene}}>
		<AbsoluteFill style={{background: palette.bg}}>
			{scenes.map((s, i) => {
				const next = scenes[i + 1];
				const outT = next?.transition;
				const overlap = outT && OVERLAP_CUTS.includes(outT.type) ? outT.frames ?? CUT_FRAMES[outT.type] ?? 8 : 0;
				return (
					<Sequence key={i} from={s.from} durationInFrames={s.durationInFrames + overlap} premountFor={Math.round(fps)} name={s.id ?? `scene ${i + 1}`}>
						{s.transition?.type === 'dissolve' && s.transition.through ? (
							<AbsoluteFill style={{background: s.transition.through, zIndex: i, opacity: 1}} />
						) : null}
						<SpecContext.Provider value={{words, palette, sceneStartSec: s.from / fps, sceneDurationInFrames: s.durationInFrames}}>
							<AbsoluteFill style={{zIndex: i}}>
								<SceneView
									scene={s}
									index={i}
									durationInFrames={s.durationInFrames}
									inT={s.transition}
									outT={outT}
									animFps={spec.animFps}
									prevLetterbox={scenes[i - 1]?.letterbox ?? 0}
								/>
							</AbsoluteFill>
						</SpecContext.Provider>

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

			{spec.overlay?.length ? (
				<SpecContext.Provider value={{words, palette, sceneStartSec: 0, sceneDurationInFrames: durationInFrames}}>
					<AbsoluteFill style={{zIndex: 850, pointerEvents: 'none'}}>
						{spec.overlay.map((l, k) => (
							<LayerView key={k} layer={l} index={k + 1} />
						))}
					</AbsoluteFill>
				</SpecContext.Provider>
			) : null}

			{spec.captions?.enabled && words.length ? <CaptionTrack words={words} spec={spec.captions} /> : null}

			<AbsoluteFill style={{zIndex: 950, pointerEvents: 'none'}}>
				<FinishPass finish={postFinish ? {...spec.finish, grain: 0, halftone: 0} : spec.finish} />
			</AbsoluteFill>

			{spec.audio?.vo ? <Audio src={resolveSrc(spec.audio.vo)} /> : null}
			{spec.audio?.music ? (
				<Audio
					src={resolveSrc(spec.audio.music)}
					volume={musicVolume}
					loop={spec.audio.musicLoop ?? true}
					startFrom={Math.round((spec.audio.musicStart ?? 0) * fps)}
				/>
			) : null}
			{/* scene SFX are mounted at the top level so whooshes/risers can lead into a cut and ring past it */}
			{scenes.flatMap((s, i) =>
				(s.sfx ?? []).map((x, k) => {
					const at = resolveTime(x.at ?? 0, words, s.from / fps) ?? s.from / fps;
					return (
						<Sequence key={`ssfx${i}-${k}`} from={Math.max(0, Math.round(at * fps))}>
							<Audio src={resolveSrc(x.src)} volume={x.volume ?? 0.8} />
						</Sequence>
					);
				}),
			)}
			{(spec.audio?.sfx ?? []).map((x, k) => {
				const at = resolveTime(x.at, words, 0, true) ?? 0;
				return (
					<Sequence key={`sfx${k}`} from={Math.round(at * fps)}>
						<Audio src={resolveSrc(x.src)} volume={x.volume ?? 0.8} />
					</Sequence>
				);
			})}
		</AbsoluteFill>
		</ScenesContext.Provider>
	);
};
