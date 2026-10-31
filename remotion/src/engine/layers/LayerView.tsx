import React from 'react';
import {Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {useCamera, useSceneFrameOf, useSpec} from '../context';
import {ParticlesView} from './Particles';
import {clamp01} from '../lib/motion';
import type {Layer, TextLayer} from '../types';
import {typeStyles} from '../lib/fonts';
import {BadgeView} from './Badge';
import {ChartView} from './Chart';
import {CounterView} from './Counter';
import {CursorView} from './Cursor';
import {entranceStyle, exitStyle, idleStyle} from './entrance';
import {ImageView} from './Image';
import {ShapeView} from './Shape';
import {TextBlock} from './Text';
import {UIView} from './UI';
import {FitWidth} from './FitWidth';
import {EmbedView} from './Embed';
import {VideoView} from './Video';

/** Average glyph width in em per type style — used to auto-wrap text that has no manual \n. */
const GLYPH_EM: Record<string, number> = {impact: 0.46, grotesk: 0.7, clean: 0.56, serif: 0.56, 'serif-italic': 0.45, script: 0.42, marker: 0.62, mono: 0.6, condensed: 0.5, pixel: 0.5};

export const autoWrap = (layer: TextLayer, boxPx: number, frameW: number): TextLayer => {
	if (layer.text.includes('\n')) return layer;
	const style = layer.style ?? 'impact';
	const size = ((layer.size ?? typeStyles[style].size) / 100) * frameW;
	const maxChars = Math.max(4, Math.floor(boxPx / (size * (GLYPH_EM[style] ?? 0.55))));
	if (layer.text.length <= maxChars) return layer;
	const lines: string[] = [];
	let cur = '';
	for (const word of layer.text.split(/\s+/)) {
		if (cur && (cur + ' ' + word).length > maxChars) {
			lines.push(cur);
			cur = word;
		} else cur = cur ? cur + ' ' + word : word;
	}
	if (cur) lines.push(cur);
	return {...layer, text: lines.join('\n')};
};

const defaultAnim = (layer: Layer) => {
	if ('anim' in layer && layer.anim) return undefined; // handled by the layer itself or below
	switch (layer.type) {
		case 'image':
			return 'pop' as const;
		case 'ui':
			return 'rise' as const;
		case 'counter':
			return 'pop' as const;
		case 'chart':
		case 'group':
			return 'fade' as const;
	}
	return undefined;
};

/** Positions a layer (centre x/y in %, width in %), handles its time window, entrance, exit and idle motion. */
export const LayerView: React.FC<{layer: Layer; index: number}> = ({layer, index}) => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();
	const {sceneDurationInFrames} = useSpec();
	const frameOf = useSceneFrameOf();
	const u = width / 1080;

	const cam = useCamera();
	if (layer.type === 'particles') {
		const ps = frameOf(layer.at, 0);
		const pe = layer.until !== undefined ? frameOf(layer.until, sceneDurationInFrames) : 1e9;
		return frame >= ps && frame < pe ? <ParticlesView layer={layer} startFrame={ps} /> : null;
	}
	if (layer.type === 'cursor') {
		const start = frameOf(layer.at, 0);
		return frame >= start ? <CursorView layer={layer} /> : null;
	}

	const start = frameOf(layer.at, 0);
	const end = layer.until !== undefined ? frameOf(layer.until, sceneDurationInFrames) : sceneDurationInFrames + 10;
	const exitFrames = layer.exit && layer.exit !== 'cut' ? 5 : 0;
	if (frame < start || frame >= end + exitFrames) return null;
	const f = frame - start;

	// entrance for media-type layers (text & badges animate internally)
	let anim: string | undefined;
	if (layer.type === 'image' || layer.type === 'ui' || layer.type === 'group') anim = layer.anim ?? defaultAnim(layer);
	else if (layer.type === 'embed') anim = undefined;
	else if (layer.type === 'counter' || layer.type === 'chart') anim = defaultAnim(layer);
	else if (layer.type === 'video') anim = layer.anim ?? (layer.w === undefined ? undefined : 'fade');
	const ent = entranceStyle(anim as never, f, fps, u);
	const ex = frame >= end ? exitStyle(layer.exit, frame - end, u) : {};
	const idle = layer.type === 'image' ? idleStyle(f, index * 13 + 1, (layer.float ?? 0) * u, (layer.jitter ?? 0) * u) : '';

	const x = layer.x ?? 50;
	const y = layer.y ?? (layer.type === 'video' && layer.w === undefined ? 50 : 40);
	const full = layer.type === 'video' && layer.w === undefined;
	const w = layer.w ?? (layer.type === 'text' ? 88 : layer.type === 'ui' ? 80 : layer.type === 'image' ? 60 : layer.type === 'shape' ? 40 : layer.type === 'chart' ? 80 : layer.type === 'embed' ? 60 : undefined);
	const hPx = layer.h !== undefined ? (layer.h / 100) * height : layer.type === 'shape' ? ((w ?? 40) / 100) * width * 0.35 : undefined;

	let inner: React.ReactNode = null;
	switch (layer.type) {
		case 'text':
			// manual line breaks only (\n); auto-shrink if the widest line overflows the layer box
			inner = (
				<FitWidth maxPx={((w ?? 88) / 100) * width}>
					<TextBlock layer={autoWrap(layer, ((w ?? 88) / 100) * width, width)} startFrame={start} />
				</FitWidth>
			);
			break;
		case 'badge':
			inner = <BadgeView layer={layer} startFrame={start} />;
			break;
		case 'image':
			inner = <ImageView layer={layer} startFrame={start} />;
			break;
		case 'video':
			// own Sequence so the clip starts at trimStart when the layer appears (not at scene start)
			inner = (
				<Sequence from={start} layout="none">
					<VideoView layer={layer} startFrame={start} />
				</Sequence>
			);
			break;
		case 'shape':
			inner = <ShapeView layer={layer} startFrame={start} />;
			break;
		case 'counter':
			inner = (
				<FitWidth maxPx={((w ?? 88) / 100) * width}>
					<CounterView layer={layer} startFrame={start} />
				</FitWidth>
			);
			break;
		case 'ui':
			inner = <UIView layer={layer} startFrame={start} />;
			break;
		case 'chart':
			inner = <ChartView layer={layer} startFrame={start} />;
			break;
		case 'embed':
			inner = <EmbedView layer={layer} />;
			break;
		case 'group':
			inner = (
				<div style={{position: 'relative', width: '100%', height: '100%'}}>
					{layer.layers.map((l, i) => (
						<LayerView key={i} layer={l} index={index * 100 + i} />
					))}
				</div>
			);
			break;
	}

	// parallax: layers off depth 1 move more/less than the camera; rack focus blurs layers off the focus plane
	let depthT = '';
	let focusBlur = 0;
	if (layer.depth !== undefined) {
		const d = layer.depth - 1;
		const drift = (cam.scale - 1) * cam.parallax * 6;
		depthT = `translate(${d * (cam.tx * 0.35 + drift * ((layer.x ?? 50) - 50) / 50)}px, ${d * cam.ty * 0.35}px) scale(${1 + d * (cam.scale - 1)})`;
		if (cam.focusDepth !== undefined) focusBlur = Math.round(Math.abs(layer.depth - cam.focusDepth) * 16);
	}
	let tiltT = '';
	if (layer.tilt || layer.tiltTo) {
		const a = layer.tilt ?? [0, 0];
		const b = layer.tiltTo ?? a;
		const p = clamp01(f / Math.max(1, end - start));
		tiltT = `perspective(${1200 * u}px) rotateX(${a[0] + (b[0] - a[0]) * p}deg) rotateY(${a[1] + (b[1] - a[1]) * p}deg)`;
	}
	const transforms = [depthT, tiltT, ent.transform, ex.transform, idle, layer.rotate ? `rotate(${layer.rotate}deg)` : ''].filter(Boolean).join(' ');
	const totalBlur = (layer.blur ?? 0) + focusBlur;
	const filter = [ent.filter, ex.filter, totalBlur ? `blur(${totalBlur * u}px)` : ''].filter(Boolean).join(' ');
	const opacity = (layer.opacity ?? 1) * Number(ent.opacity ?? 1) * Number(ex.opacity ?? 1);

	if (full) {
		return <div style={{position: 'absolute', inset: 0, zIndex: layer.z ?? index, opacity, filter: filter || undefined, transform: transforms || undefined}}>{inner}</div>;
	}
	if (layer.type === 'group') {
		return <div style={{position: 'absolute', inset: 0, zIndex: layer.z ?? index, opacity, filter: filter || undefined, transform: transforms || undefined}}>{inner}</div>;
	}
	return (
		<div
			style={{
				position: 'absolute',
				left: `${x}%`,
				top: `${y}%`,
				width: w !== undefined ? `${w}%` : undefined,
				height: hPx,
				transform: 'translate(-50%, -50%)',
				zIndex: layer.z ?? index,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					width: '100%',
					height: hPx ? '100%' : undefined,
					opacity,
					filter: filter || undefined,
					transform: transforms || undefined,
					transformOrigin: ent.transformOrigin,
					clipPath: ent.clipPath,
				}}
			>
				{inner}
			</div>
		</div>
	);
};

