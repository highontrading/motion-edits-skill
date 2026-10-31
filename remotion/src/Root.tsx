import React from 'react';
import {CalculateMetadataFunction, Composition, staticFile} from 'remotion';
import {SpecVideo, specDurationInFrames, type SpecVideoProps} from './engine/SpecVideo';
import type {VideoSpec, Word} from './engine/types';
import demo from './specs/demo.json';

/**
 * `MotionVideo` renders any VideoSpec passed via --props (a JSON file or inline JSON):
 *   npx remotion render src/index.ts MotionVideo out/video.mp4 --props=specs/my-video.json
 * Size, fps and duration come from the spec, so any aspect ratio works.
 * `words` may be an array or a path (under public/) to a transcript json from tools/transcribe.py.
 */
const calculateMetadata: CalculateMetadataFunction<SpecVideoProps> = async ({props}) => {
	let spec: VideoSpec = props.spec;
	if (typeof spec.words === 'string') {
		const res = await fetch(staticFile(spec.words));
		const words = (await res.json()) as Word[] | {words: Word[]};
		spec = {...spec, words: Array.isArray(words) ? words : words.words};
	}
	const fps = spec.fps ?? 30;
	return {
		props: {spec},
		fps,
		width: spec.width,
		height: spec.height,
		durationInFrames: specDurationInFrames(spec),
	};
};

export const Root: React.FC = () => {
	return (
		<Composition
			id="MotionVideo"
			component={SpecVideo}
			defaultProps={{spec: demo as unknown as VideoSpec}}
			calculateMetadata={calculateMetadata}
			width={1080}
			height={1920}
			fps={30}
			durationInFrames={300}
		/>
	);
};
