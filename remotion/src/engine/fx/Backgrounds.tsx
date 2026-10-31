import React from 'react';
import {AbsoluteFill, Img, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {useSpec} from '../context';
import type {Background} from '../types';

export const resolveSrc = (src: string) => (/^(https?:|data:|blob:)/.test(src) ? src : staticFile(src.replace(/^\/+/, '')));

const hexToRgb = (hex: string): [number, number, number] => {
	const h = hex.replace('#', '');
	const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h.slice(0, 6);
	const n = parseInt(full, 16);
	return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

/** Shade a hex colour: amt -1..1 (negative darkens). */
export const shade = (hex: string, amt: number) => {
	const [r, g, b] = hexToRgb(hex);
	const f = (c: number) => Math.round(amt < 0 ? c * (1 + amt) : c + (255 - c) * amt);
	return `rgb(${f(r)}, ${f(g)}, ${f(b)})`;
};

export const alpha = (hex: string, a: number) => {
	const [r, g, b] = hexToRgb(hex);
	return `rgba(${r}, ${g}, ${b}, ${a})`;
};

/** Noise texture layer generated with feTurbulence. */
const Noise: React.FC<{freq: string; octaves?: number; seed?: number; matrix: string; blend?: React.CSSProperties['mixBlendMode']; opacity?: number; id: string}> = ({
	freq,
	octaves = 3,
	seed = 3,
	matrix,
	blend = 'multiply',
	opacity = 1,
	id,
}) => (
	<AbsoluteFill style={{mixBlendMode: blend, opacity}}>
		<svg width="100%" height="100%" preserveAspectRatio="none">
			<filter id={id} x="0" y="0" width="100%" height="100%">
				<feTurbulence type="fractalNoise" baseFrequency={freq} numOctaves={octaves} seed={seed} stitchTiles="stitch" />
				<feColorMatrix type="matrix" values={matrix} />
			</filter>
			<rect width="100%" height="100%" filter={`url(#${id})`} />
		</svg>
	</AbsoluteFill>
);

/** grey noise whose alpha = strength (multiply darkens, screen lightens) */
const greyMatrix = (strength: number) => `0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${-strength} ${strength}`;

const Gobo: React.FC = () => {
	const frame = useCurrentFrame();
	const drift = Math.sin(frame / 90) * 6;
	return (
		<AbsoluteFill style={{mixBlendMode: 'soft-light', opacity: 0.75, filter: 'blur(14px)', transform: `skewX(-18deg) translateX(${drift}px)`}}>
			<div
				style={{
					position: 'absolute',
					left: '20%',
					top: '-10%',
					width: '75%',
					height: '120%',
					backgroundImage:
						'repeating-linear-gradient(90deg, rgba(255,255,255,0.9) 0 22%, rgba(0,0,0,0.35) 22% 26%), repeating-linear-gradient(0deg, rgba(255,255,255,0) 0 30%, rgba(0,0,0,0.35) 30% 33%)',
				}}
			/>
		</AbsoluteFill>
	);
};

export const SceneBackground: React.FC<{bg?: Background; sceneIndex: number}> = ({bg, sceneIndex}) => {
	const {palette} = useSpec();
	const frame = useCurrentFrame();
	const {fps, width} = useVideoConfig();
	const b: Background = bg ?? {kind: 'solid', color: palette.bg};
	const c = b.color ?? (b.kind === 'paper' || b.kind === 'grid' || b.kind === 'dots' ? palette.paper : palette.bg);
	const c2 = b.color2 ?? shade(c, -0.35);
	const id = `bg${sceneIndex}`;
	const drift = b.drift ? (frame / fps) * b.drift : 0;
	const unit = width / 1080;

	let content: React.ReactNode = null;
	switch (b.kind) {
		case 'solid':
			content = (
				<>
					<AbsoluteFill style={{background: c}} />
					<AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 35%, ${alpha('#ffffff', 0.1)} 0%, transparent 60%)`}} />
					<Noise id={id} freq="0.9" octaves={1} matrix={greyMatrix(0.08)} />
				</>
			);
			break;
		case 'gradient':
			content = <AbsoluteFill style={{background: `linear-gradient(160deg, ${c} 0%, ${c2} 100%)`}} />;
			break;
		case 'radial':
			content = <AbsoluteFill style={{background: `radial-gradient(circle at 50% 42%, ${c} 0%, ${c2} 75%)`}} />;
			break;
		case 'mesh':
			content = (
				<AbsoluteFill
					style={{
						background: `radial-gradient(at 18% 22%, ${c} 0, transparent 55%), radial-gradient(at 82% 30%, ${c2} 0, transparent 50%), radial-gradient(at 50% 85%, ${shade(c, 0.35)} 0, transparent 55%), ${shade(c2, -0.5)}`,
						filter: 'saturate(1.15)',
						transform: `scale(1.15) rotate(${Math.sin(frame / 120) * 3}deg)`,
					}}
				/>
			);
			break;
		case 'paper':
			content = (
				<>
					<AbsoluteFill style={{background: c}} />
					<Noise id={id} freq="0.04" octaves={4} matrix={greyMatrix(0.16)} />
					<Noise id={`${id}f`} freq="0.7" octaves={2} seed={9} matrix={greyMatrix(0.1)} />
					<AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 40%, transparent 55%, ${alpha('#5a4a30', 0.18)} 100%)`}} />
				</>
			);
			break;
		case 'grid':
		case 'dots': {
			const cell = Math.round(54 * unit);
			const line = b.color2 ?? alpha('#4a5a7a', 0.28);
			content = (
				<>
					<AbsoluteFill style={{background: c}} />
					<AbsoluteFill
						style={{
							backgroundImage:
								b.kind === 'grid'
									? `linear-gradient(${line} ${Math.max(1, unit * 1.6)}px, transparent ${Math.max(1, unit * 1.6)}px), linear-gradient(90deg, ${line} ${Math.max(1, unit * 1.6)}px, transparent ${Math.max(1, unit * 1.6)}px)`
									: `radial-gradient(circle, ${line} ${unit * 2.4}px, transparent ${unit * 2.8}px)`,
							backgroundSize: `${cell}px ${cell}px`,
							backgroundPosition: `${drift}px 0`,
						}}
					/>
					<Noise id={id} freq="0.05" octaves={3} matrix={greyMatrix(0.12)} />
				</>
			);
			break;
		}
		case 'fabric':
		case 'denim': {
			const base = b.kind === 'denim' ? b.color ?? '#1d2f5c' : c;
			content = (
				<>
					<AbsoluteFill style={{background: base}} />
					<AbsoluteFill
						style={{
							backgroundImage: `repeating-linear-gradient(45deg, ${alpha('#ffffff', 0.07)} 0 ${2 * unit}px, transparent ${2 * unit}px ${5 * unit}px), repeating-linear-gradient(-45deg, ${alpha('#000000', 0.12)} 0 ${1.5 * unit}px, transparent ${1.5 * unit}px ${4 * unit}px)`,
						}}
					/>
					<Noise id={id} freq="0.5 0.08" octaves={2} matrix={greyMatrix(0.22)} />
					{b.kind === 'denim' ? (
						<div
							style={{
								position: 'absolute',
								inset: 18 * unit,
								border: `${3 * unit}px dashed ${alpha('#cfe0ff', 0.75)}`,
								borderRadius: 18 * unit,
							}}
						/>
					) : null}
				</>
			);
			break;
		}
		case 'wood':
			content = (
				<>
					<AbsoluteFill style={{background: c === palette.bg ? '#3b2416' : c}} />
					<Noise id={id} freq="0.004 0.12" octaves={3} seed={4} matrix="0 0 0 0 0.12  0 0 0 0 0.06  0 0 0 0 0.02  0 0 0 -1.1 0.95" />
					<AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, rgba(255,190,120,0.18), rgba(0,0,0,0.55) 85%)'}} />
				</>
			);
			break;
		case 'concrete':
			content = (
				<>
					<AbsoluteFill style={{background: c === palette.bg ? '#8d8b87' : c}} />
					<Noise id={id} freq="0.012" octaves={5} matrix={greyMatrix(0.3)} />
					<Noise id={`${id}b`} freq="0.9" octaves={1} matrix={greyMatrix(0.12)} />
				</>
			);
			break;
		case 'studio':
			content = (
				<>
					<AbsoluteFill style={{background: `radial-gradient(ellipse 80% 55% at 50% 38%, ${shade(c, 0.28)} 0%, ${c} 45%, ${shade(c, -0.45)} 100%)`}} />
					<Noise id={id} freq="0.6" octaves={2} matrix={greyMatrix(0.1)} />
				</>
			);
			break;
		case 'void':
			content = (
				<>
					<AbsoluteFill style={{background: b.color ?? '#070707'}} />
					<AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 45%, ${alpha('#ffffff', 0.05)} 0%, transparent 60%)`}} />
				</>
			);
			break;
		case 'halftone': {
			const s = 22 * unit;
			content = (
				<>
					<AbsoluteFill style={{background: c}} />
					<AbsoluteFill
						style={{
							backgroundImage: `radial-gradient(circle, ${alpha('#000000', 0.22)} ${s * 0.18}px, transparent ${s * 0.2}px)`,
							backgroundSize: `${s}px ${s}px`,
							maskImage: 'radial-gradient(ellipse at 50% 40%, transparent 20%, black 85%)',
							WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, transparent 20%, black 85%)',
						}}
					/>
				</>
			);
			break;
		}
		case 'stripes':
			content = (
				<AbsoluteFill
					style={{
						background: `repeating-linear-gradient(135deg, ${c} 0 ${40 * unit}px, ${c2} ${40 * unit}px ${80 * unit}px)`,
						backgroundPosition: `${drift}px 0`,
					}}
				/>
			);
			break;
		case 'image':
			content = b.src ? (
				<Img
					src={resolveSrc(b.src)}
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						filter: `${b.blur ? `blur(${b.blur}px)` : ''} ${b.grayscale ? 'grayscale(1)' : ''} brightness(${1 - (b.dim ?? 0)})`,
						transform: `scale(${1.04 + (drift ? drift / 4000 : 0)})`,
					}}
				/>
			) : null;
			break;
		case 'video':
			content = b.src ? (
				<OffthreadVideo
					src={resolveSrc(b.src)}
					muted={b.muted ?? true}
					startFrom={Math.round((b.trimStart ?? 0) * fps)}
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						filter: `${b.blur ? `blur(${b.blur}px)` : ''} ${b.grayscale ? 'grayscale(1)' : ''} brightness(${1 - (b.dim ?? 0)})`,
					}}
				/>
			) : null;
			break;
	}

	return (
		<AbsoluteFill style={{overflow: 'hidden'}}>
			{content}
			{b.gobo ? <Gobo /> : null}
		</AbsoluteFill>
	);
};
