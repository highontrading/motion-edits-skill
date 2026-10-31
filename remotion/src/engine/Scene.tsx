import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {custom} from '../custom';
import {useSceneFrameOf} from './context';
import {SceneBackground} from './fx/Backgrounds';
import {Stepped} from './lib/stepped';
import {clamp01, curves, decay, decaySpeed, iclamp, ramp, rampSpeed, rand, wiggle} from './lib/motion';
import {LayerView} from './layers/LayerView';
import type {CutType, Scene as SceneSpec, Transition} from './types';

/** Default frames of motion on each side of a cut, per type (measured: exits ramp 6–10f, entrances settle 8–15f). */
export const CUT_FRAMES: Partial<Record<CutType, number>> = {
	zoom: 8,
	'whip-left': 6,
	'whip-right': 6,
	'whip-up': 6,
	'whip-down': 6,
	spin: 9,
	desat: 5,
	'flash-ramp': 5,
	focus: 9,
	ink: 12,
	circle: 9,
	slide: 9,
	object: 8,
	glitch: 3,
	invert: 2,
	black: 2,
	flash: 6,
	wash: 4,
	burn: 8,
	strobe: 6,
	pixel: 10,
	flip: 7,
	shrink: 14,
};

/** Transitions whose incoming scene is revealed over the outgoing one (needs overlap). */
export const OVERLAP_CUTS: CutType[] = ['ink', 'circle', 'slide', 'pixel'];

/** SVG mask of randomly-appearing tiles (pixel dissolve). Small data URI, cheap to rasterise. */
const pixelMask = (p: number, seed: number, aspect: number) => {
	const cols = 9;
	const rows = Math.max(4, Math.round(cols / aspect));
	let rects = '';
	for (let r = 0; r < rows; r++)
		for (let c = 0; c < cols; c++) {
			const t = rand(seed + r * 31 + c * 7) * 0.8;
			if (p >= t) rects += `<rect x='${c}' y='${r}' width='1.02' height='1.02'/>`;
		}
	return `url("data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${cols} ${rows}' preserveAspectRatio='none'>${rects}</svg>`)}")`;
};

const whipVec = (t: CutType): [number, number] =>
	t === 'whip-left' ? [-1, 0] : t === 'whip-right' ? [1, 0] : t === 'whip-up' ? [0, -1] : t === 'whip-down' ? [0, 1] : [0, 0];

/** Noisy-circle clip polygon for ink / organic iris reveals. */
const inkPolygon = (r: number, seed: number, rough: number) => {
	const pts: string[] = [];
	const n = 48;
	for (let i = 0; i < n; i++) {
		const a = (i / n) * Math.PI * 2;
		const rr = r * (1 + (rand(seed + i * 3.1) - 0.5) * rough);
		pts.push(`${50 + Math.cos(a) * rr}% ${50 + Math.sin(a) * rr * 0.6}%`);
	}
	return `polygon(${pts.join(', ')})`;
};

export const SceneView: React.FC<{
	scene: SceneSpec;
	index: number;
	durationInFrames: number;
	inT?: Transition;
	outT?: Transition;
	animFps?: number;
	prevLetterbox?: number;
}> = ({scene, index, durationInFrames, inT, outT, animFps, prevLetterbox}) => {
	return (
		<Stepped animFps={scene.animFps ?? animFps}>
			<SceneInner scene={scene} index={index} durationInFrames={durationInFrames} inT={inT} outT={outT} prevLetterbox={prevLetterbox} />
		</Stepped>
	);
};

const SceneInner: React.FC<{scene: SceneSpec; index: number; durationInFrames: number; inT?: Transition; outT?: Transition; prevLetterbox?: number}> = ({
	scene,
	index,
	durationInFrames: D,
	inT,
	outT,
	prevLetterbox = 0,
}) => {
	const frame = useCurrentFrame();
	const {width, height, fps} = useVideoConfig();
	const frameOf = useSceneFrameOf();
	const u = width / 1080;
	const cam = scene.camera ?? {};
	const inType = inT?.type ?? 'cut';
	const outType = outT?.type ?? 'cut';
	const inF = inT?.frames ?? CUT_FRAMES[inType] ?? 0;
	const outF = outT?.frames ?? CUT_FRAMES[outType] ?? 0;
	const f = frame;
	const tail = f - D; // >=0 while this scene is shown under an overlapping incoming transition

	let scale = 1;
	let tx = 0;
	let ty = 0;
	let rot = 0;
	let blurX = 0;
	let blurY = 0;
	let blur = 0;
	let sat = 1;
	let bright = 1;
	let invert = 0;
	let chroma = 0;
	let clip: string | undefined;
	let mask: string | undefined;
	let rotY = 0;
	let origin: [number, number] = cam.origin ?? [50, 50];

	// ── nested reveal: start zoomed into the embed box that shows the previous scene, then pull back
	const embedBox = inType === 'shrink' ? (scene.layers ?? []).find((l) => l.type === 'embed') : undefined;
	let settleFrom = cam.settle ?? (inType === 'zoom' ? 1.18 : 1.1);
	let settleR = cam.settleR ?? 0.82;
	if (embedBox && embedBox.type === 'embed') {
		const bx = embedBox.x ?? 50;
		const by = embedBox.y ?? 40;
		origin = [bx, by];
		settleFrom = 100 / (embedBox.w ?? 60);
		settleR = Math.pow(0.02, 1 / Math.max(4, inF));
		const remain = 1 - decay(f, settleR);
		tx += ((50 - bx) / 100) * width * remain;
		ty += ((50 - by) / 100) * height * remain;
	}
	// ── scene-open settle (every reference does this: 1.08–1.15 → 1, expo-out, no overshoot)
	if (settleFrom !== 1) scale *= 1 + (settleFrom - 1) * (1 - decay(f, settleR));

	// ── entry by transition type
	if (inType === 'zoom') blur += decaySpeed(f, 0.6) * 10 * u;
	const [wx, wy] = whipVec(inType);
	if (wx || wy) {
		// incoming content continues the outgoing motion: it starts offset against the direction of travel
		// and decays to rest (momentum / velocity-matched cut)
		const p = 1 - decay(f, 0.7);
		tx += -wx * width * 0.55 * p;
		ty += -wy * height * 0.55 * p;
		const sp = decaySpeed(f, 0.7);
		blurX += Math.abs(wx) * sp * 40 * u;
		blurY += Math.abs(wy) * sp * 40 * u;
	}
	if (inType === 'spin') {
		rot += -24 * (1 - decay(f, 0.72));
		blur += decaySpeed(f, 0.7) * 8 * u;
	}
	if (inType === 'focus') blur += (1 - decay(f, Math.pow(0.03, 1 / Math.max(1, inF)))) * 22 * u;
	if (inType === 'desat') sat *= iclamp(f, [0, inF + 1], [0, 1]);
	if (inType === 'invert' && f < inF) invert = 1;
	if (inType === 'glitch' && f < inF) {
		chroma = 14 * u;
		tx += wiggle(f, index, 18 * u, 1);
	}
	if (inType === 'circle' && f < inF + 1) clip = `circle(${curves.settle(clamp01(f / inF)) * 75}% at 50% 50%)`;
	if (inType === 'ink' && f < inF + 1) clip = inkPolygon(curves.settle(clamp01(f / inF)) * 95, index * 7, 0.35);
	if (inType === 'slide' && f < inF + 1) tx += width * (1 - decay(f, 0.68));
	if (inType === 'pixel' && f < inF + 1) mask = pixelMask(clamp01(f / inF) * 1.25, index * 13, width / height);
	if (inType === 'strobe' && f < inF && f % 2 === 0) invert = 1;
	if (inType === 'flip') rotY += -90 * (1 - decay(f, 0.7));

	// ── exit into the next cut: motion ramps exponentially and the cut lands at peak speed
	const exitStart = D - outF;
	if (f >= exitStart && outF > 0 && tail < 0) {
		const ef = f - exitStart + 1;
		const p = ramp(ef, outF, 1.45);
		const sp = rampSpeed(ef, outF, 1.45);
		if (outType === 'zoom') {
			scale *= 1 + 0.55 * p;
			blur += sp * 9 * u;
		}
		const [ox, oy] = whipVec(outType);
		if (ox || oy) {
			tx += ox * width * 0.45 * p;
			ty += oy * height * 0.45 * p;
			blurX += Math.abs(ox) * sp * 40 * u;
			blurY += Math.abs(oy) * sp * 40 * u;
		}
		if (outType === 'spin') {
			rot += 32 * p;
			scale *= 1 + 0.25 * p;
			blur += sp * 6 * u;
		}
		if (outType === 'desat') sat *= 1 - p;
		if (outType === 'flip') rotY += 90 * p;
		if (outType === 'flash-ramp') bright *= 1 + 1.6 * p;
	}
	if (tail >= 0 && outType === 'slide') {
		tx -= width * 0.25 * (1 - decay(tail, 0.68));
		bright *= 1 - 0.35 * clamp01(tail / 6);
	}

	// ── continuous drift, punch-ins, pans, shake
	scale *= 1 + (cam.drift ?? 0.025) * clamp01(f / Math.max(1, D));
	for (const p of cam.punch ?? []) {
		const pf = frameOf(p.at, -1);
		if (pf >= 0 && f >= pf) {
			const n = p.frames ?? 4;
			scale *= 1 + ((p.scale ?? 1.1) - 1) * (f - pf <= n ? ramp(f - pf, n, 1.6) : 1);
		}
	}
	let panX = 0;
	let panY = 0;
	for (const p of cam.pan ?? []) {
		const pf = frameOf(p.at, -1);
		if (pf >= 0 && f >= pf) {
			const pp = curves.glide(clamp01((f - pf) / (p.frames ?? 20)));
			panX = panX + ((50 - p.x) / 100) * width * pp - panX * pp;
			panY = panY + ((50 - p.y) / 100) * height * pp - panY * pp;
		}
	}
	tx += panX;
	ty += panY;
	if (cam.shake) {
		tx += wiggle(f, index * 3, cam.shake * u, 2);
		ty += wiggle(f, index * 5 + 1, cam.shake * u, 2);
	}

	// ── grade
	const g = scene.grade ?? {};
	const drainF = g.drainAt !== undefined ? frameOf(g.drainAt, -1) : -1;
	if (drainF >= 0 && f >= drainF) sat *= 1 - clamp01((f - drainF) / 6);
	sat *= g.saturation ?? 1;
	const filterParts = [
		sat !== 1 ? `saturate(${sat.toFixed(3)})` : '',
		g.contrast ? `contrast(${g.contrast})` : '',
		bright !== 1 || g.brightness ? `brightness(${(bright * (g.brightness ?? 1)).toFixed(3)})` : '',
		invert ? 'invert(1) hue-rotate(180deg)' : '',
		blur > 0.3 ? `blur(${blur.toFixed(2)}px)` : '',
		chroma ? `drop-shadow(${chroma}px 0 0 rgba(255,0,60,0.75)) drop-shadow(-${chroma}px 0 0 rgba(0,220,255,0.75))` : '',
		g.filter ?? '',
	].filter(Boolean);
	const mbId = `mb-${index}`;
	const useMb = blurX > 0.5 || blurY > 0.5;
	if (useMb) filterParts.push(`url(#${mbId})`);

	const Custom = scene.custom ? custom[scene.custom] : undefined;
	const bgBleed = (1 + (2 * Math.abs(tx)) / width + (2 * Math.abs(ty)) / height + Math.abs(rot) / 40) / Math.min(1, scale);

	// animated letterbox (bars close in over ~7 frames, expo-out)
	const lbTarget = scene.letterbox ?? 0;
	const lb = lbTarget === prevLetterbox ? lbTarget : prevLetterbox + (lbTarget - prevLetterbox) * decay(f + 1, 0.62);

	return (
		<AbsoluteFill
			style={{
				overflow: 'hidden',
				clipPath: clip,
				WebkitClipPath: clip,
				maskImage: mask,
				WebkitMaskImage: mask,
				maskSize: '100% 100%',
				WebkitMaskSize: '100% 100%',
				perspective: rotY ? '1800px' : undefined,
				background: rotY ? '#000' : undefined,
			}}
		>
			{useMb ? (
				<svg width="0" height="0" style={{position: 'absolute'}}>
					<filter id={mbId} x="-20%" y="-20%" width="140%" height="140%">
						<feGaussianBlur stdDeviation={`${blurX.toFixed(1)} ${blurY.toFixed(1)}`} />
					</filter>
				</svg>
			) : null}
			<AbsoluteFill
				style={{
					transform: `translate(${tx}px, ${ty}px) scale(${scale}) rotate(${rot}deg)${rotY ? ` rotateY(${rotY}deg)` : ''}`,
					transformOrigin: `${origin[0]}% ${origin[1]}%`,
					filter: filterParts.join(' ') || undefined,
				}}
			>
				{/* bleed: grow the background while the camera translates/rotates so frame edges never show */}
				<AbsoluteFill style={{transform: bgBleed > 1.001 ? `scale(${bgBleed})` : undefined}}>
					<SceneBackground bg={scene.background} sceneIndex={index} />
				</AbsoluteFill>
				{Custom ? <Custom {...(scene.customProps ?? {})} /> : null}
				{(scene.layers ?? []).map((l, i) => (
					<LayerView key={i} layer={l} index={i + 1} />
				))}
			</AbsoluteFill>
			{g.tint ? <AbsoluteFill style={{background: g.tint, mixBlendMode: 'color'}} /> : null}
			{lb > 0.05 ? (
				<>
					<div style={{position: 'absolute', left: 0, right: 0, top: 0, height: `${lb}%`, background: '#000'}} />
					<div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: `${lb}%`, background: '#000'}} />
				</>
			) : null}
		</AbsoluteFill>
	);
};

