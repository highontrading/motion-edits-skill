import React from 'react';
import {Img, OffthreadVideo, useCurrentFrame, useVideoConfig} from 'remotion';
import {useSceneFrameOf, useSpec} from '../context';
import {fonts} from '../lib/fonts';
import {clamp01, decay, springAt} from '../lib/motion';
import type {UILayer} from '../types';
import {resolveSrc} from '../fx/Backgrounds';

/**
 * Familiar-interface mockups. References type the script INTO real-looking UI (v04, v05, v07, v18, v19, v35):
 * search bars, notifications, chat, OS dialogs, AI prompt boxes, phones and windows. Text types at ~22 cps
 * with a blinking caret; the element itself slides/pops in.
 */
const useTyped = (text: string | undefined, f: number, fps: number, cps = 22) => {
	if (!text) return {shown: '', done: true};
	const n = Math.max(0, Math.floor((f / fps) * cps));
	return {shown: text.slice(0, n), done: n >= text.length};
};

const Caret: React.FC<{f: number; color: string}> = ({f, color}) =>
	Math.floor(f / 8) % 2 === 0 ? <span style={{display: 'inline-block', width: '0.07em', height: '1em', background: color, marginLeft: '0.04em', verticalAlign: 'text-bottom'}} /> : null;

export const UIView: React.FC<{layer: UILayer; startFrame: number}> = ({layer, startFrame}) => {
	const frame = useCurrentFrame();
	const {fps, width} = useVideoConfig();
	const {palette} = useSpec();
	const frameOf = useSceneFrameOf();
	// sizes scale with the layer box (designed at w = 80% of a 1080-wide frame)
	const u = (width / 1080) * ((layer.w ?? 80) / 80);
	const f = frame - startFrame;
	const dark = layer.theme === 'dark';
	const surface = dark ? '#16171b' : '#f7f7f5';
	const ink = dark ? '#f2f2f2' : '#121212';
	const sub = dark ? '#9a9ca3' : '#6b6b6b';
	const accent = layer.accent ?? palette.accent;
	const typeStart = 6; // text starts typing after the element lands
	const typed = useTyped(layer.text, f - typeStart, fps, layer.cps);
	const card: React.CSSProperties = {
		background: surface,
		color: ink,
		borderRadius: 26 * u,
		boxShadow: `0 ${20 * u}px ${50 * u}px rgba(0,0,0,0.35), 0 0 0 ${1 * u}px rgba(0,0,0,0.08)`,
		fontFamily: fonts.inter,
		overflow: 'hidden',
	};

	switch (layer.kind) {
		case 'search':
			return (
				<div style={{...card, borderRadius: 999, display: 'flex', alignItems: 'center', gap: 22 * u, padding: `${26 * u}px ${36 * u}px`, fontSize: 40 * u}}>
					<svg width={44 * u} height={44 * u} viewBox="0 0 24 24">
						<circle cx="10" cy="10" r="6.5" stroke={sub} strokeWidth="2.4" fill="none" />
						<line x1="15" y1="15" x2="21" y2="21" stroke={sub} strokeWidth="2.6" strokeLinecap="round" />
					</svg>
					<span style={{flex: 1, whiteSpace: 'nowrap', overflow: 'hidden'}}>
						{typed.shown}
						<Caret f={f} color={accent} />
					</span>
				</div>
			);
		case 'notification':
			return (
				<div style={{...card, background: dark ? 'rgba(30,30,34,0.86)' : 'rgba(250,250,250,0.9)', backdropFilter: 'blur(20px)', padding: 28 * u, display: 'flex', gap: 24 * u, alignItems: 'center'}}>
					<div style={{width: 84 * u, height: 84 * u, borderRadius: 20 * u, background: accent, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 40 * u}}>
						{(layer.label ?? 'A').slice(0, 1).toUpperCase()}
					</div>
					<div style={{flex: 1, minWidth: 0}}>
						<div style={{display: 'flex', justifyContent: 'space-between', fontSize: 26 * u, color: sub, fontWeight: 600}}>
							<span>{(layer.label ?? 'App').toUpperCase()}</span>
							<span>now</span>
						</div>
						<div style={{fontSize: 34 * u, fontWeight: 700, marginTop: 4 * u}}>{layer.title}</div>
						<div style={{fontSize: 32 * u, color: dark ? '#d6d6d6' : '#2a2a2a', marginTop: 2 * u}}>{layer.text}</div>
					</div>
				</div>
			);
		case 'chat':
			return (
				<div style={{display: 'flex', flexDirection: 'column', gap: 18 * u, fontFamily: fonts.inter}}>
					{(layer.messages ?? []).map((m, i) => {
						const mf = f - (m.at !== undefined ? frameOf(m.at, 0) - startFrame : i * 14);
						if (mf < 0) return null;
						const s = springAt(mf, fps, 'pop');
						const me = m.from === 'me';
						return (
							<div key={i} style={{alignSelf: me ? 'flex-end' : 'flex-start', maxWidth: '78%', transform: `scale(${s})`, transformOrigin: me ? 'right bottom' : 'left bottom'}}>
								<div
									style={{
										background: me ? layer.accent ?? '#2f7cf6' : dark ? '#26272b' : '#e9e9eb',
										color: me ? '#fff' : ink,
										fontSize: 36 * u,
										lineHeight: 1.3,
										padding: `${20 * u}px ${28 * u}px`,
										borderRadius: 34 * u,
										borderBottomRightRadius: me ? 8 * u : 34 * u,
										borderBottomLeftRadius: me ? 34 * u : 8 * u,
										boxShadow: `0 ${8 * u}px ${18 * u}px rgba(0,0,0,0.18)`,
									}}
								>
									{m.text}
								</div>
							</div>
						);
					})}
				</div>
			);
		case 'dialog':
		case 'window':
			return (
				<div style={{...card, borderRadius: 18 * u}}>
					<div style={{display: 'flex', alignItems: 'center', gap: 12 * u, padding: `${18 * u}px ${22 * u}px`, background: dark ? '#222327' : '#e8e8e6', borderBottom: `${1 * u}px solid rgba(0,0,0,0.1)`}}>
						{['#ff5f57', '#febc2e', '#28c840'].map((c) => (
							<div key={c} style={{width: 22 * u, height: 22 * u, borderRadius: 99, background: c}} />
						))}
						<div style={{flex: 1, textAlign: 'center', fontSize: 26 * u, color: sub, fontWeight: 600, marginRight: 66 * u}}>{layer.title ?? ''}</div>
					</div>
					{layer.src ? (
						/\.(mp4|mov|webm)$/i.test(layer.src) ? (
							<OffthreadVideo src={resolveSrc(layer.src)} muted style={{width: '100%', display: 'block'}} />
						) : (
							<Img src={resolveSrc(layer.src)} style={{width: '100%', display: 'block'}} />
						)
					) : (
						<div style={{padding: `${40 * u}px ${44 * u}px`, fontSize: 40 * u, lineHeight: 1.35, minHeight: 160 * u, fontWeight: layer.kind === 'dialog' ? 600 : 500}}>
							{typed.shown}
							{!typed.done ? <Caret f={f} color={ink} /> : null}
							{layer.kind === 'dialog' ? (
								<div style={{display: 'flex', justifyContent: 'flex-end', gap: 18 * u, marginTop: 34 * u}}>
									<div style={{padding: `${12 * u}px ${30 * u}px`, borderRadius: 12 * u, background: dark ? '#333' : '#e2e2e2', fontSize: 28 * u}}>Cancel</div>
									<div style={{padding: `${12 * u}px ${30 * u}px`, borderRadius: 12 * u, background: accent, color: '#fff', fontSize: 28 * u}}>OK</div>
								</div>
							) : null}
						</div>
					)}
				</div>
			);
		case 'prompt': {
			const sendF = Math.ceil(((layer.text?.length ?? 0) / (layer.cps ?? 22)) * fps) + typeStart + 4;
			const bloom = f >= sendF ? 1 - decay(f - sendF + 1, 0.7) : 0;
			return (
				<div style={{...card, background: dark ? '#0f1012' : '#ffffff', borderRadius: 28 * u, padding: 30 * u, border: `${2 * u}px solid ${dark ? '#2a2b30' : '#e4e4e4'}`}}>
					<div style={{fontFamily: fonts.mono, fontSize: 34 * u, lineHeight: 1.4, minHeight: 100 * u, color: ink}}>
						{typed.shown}
						{!typed.done ? <Caret f={f} color={accent} /> : null}
					</div>
					<div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 16 * u}}>
						<div
							style={{
								width: 72 * u,
								height: 72 * u,
								borderRadius: 99,
								background: typed.done ? accent : sub,
								boxShadow: bloom ? `0 0 ${60 * u * (1 - bloom)}px ${accent}` : undefined,
								transform: `scale(${1 + (bloom ? 0.25 * (1 - bloom) : 0)})`,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: '#000',
								fontSize: 40 * u,
								fontWeight: 800,
							}}
						>
							↑
						</div>
					</div>
				</div>
			);
		}
		case 'tweet':
			return (
				<div style={{...card, padding: 36 * u, borderRadius: 30 * u}}>
					<div style={{display: 'flex', gap: 20 * u, alignItems: 'center'}}>
						<div style={{width: 84 * u, height: 84 * u, borderRadius: 99, background: accent}} />
						<div>
							<div style={{fontWeight: 800, fontSize: 34 * u}}>{layer.title ?? 'Name'}</div>
							<div style={{color: sub, fontSize: 28 * u}}>{layer.label ?? '@handle'}</div>
						</div>
					</div>
					<div style={{fontSize: 38 * u, lineHeight: 1.35, marginTop: 24 * u}}>
						{typed.shown}
						{!typed.done ? <Caret f={f} color={accent} /> : null}
					</div>
				</div>
			);
		case 'button': {
			const press = layer.value !== undefined && f > 10 ? decay(f - 10, 0.6) : 1;
			return (
				<div
					style={{
						display: 'inline-flex',
						padding: `${30 * u}px ${64 * u}px`,
						borderRadius: 999,
						background: accent,
						color: '#fff',
						fontFamily: fonts.inter,
						fontWeight: 800,
						fontSize: 46 * u,
						boxShadow: `0 0 ${50 * u}px ${accent}88, 0 ${12 * u}px ${30 * u}px rgba(0,0,0,0.35)`,
						transform: `scale(${0.94 + 0.06 * press})`,
					}}
				>
					{layer.text ?? 'Get started'}
				</div>
			);
		}
		case 'progress': {
			const v = clamp01((layer.value ?? 1) * clamp01(f / (1.2 * fps)));
			return (
				<div style={{...card, padding: 26 * u, borderRadius: 22 * u}}>
					<div style={{display: 'flex', justifyContent: 'space-between', fontSize: 30 * u, fontWeight: 700, marginBottom: 16 * u}}>
						<span>{layer.title ?? 'Loading'}</span>
						<span>{Math.round(v * 100)}%</span>
					</div>
					<div style={{height: 22 * u, borderRadius: 99, background: dark ? '#2a2a2e' : '#e5e5e5', overflow: 'hidden'}}>
						<div style={{width: `${v * 100}%`, height: '100%', background: accent, borderRadius: 99}} />
					</div>
				</div>
			);
		}
		case 'bubble': {
			// comic speech bubble that pops on a cut-out person (v22, v48)
			return (
				<div style={{position: 'relative', display: 'inline-block', background: dark ? '#111' : '#fff', color: ink, borderRadius: 48 * u, padding: `${26 * u}px ${38 * u}px`, fontFamily: fonts.inter, fontWeight: 800, fontSize: 46 * u, lineHeight: 1.15, border: `${5 * u}px solid ${dark ? '#fff' : '#111'}`, boxShadow: `${8 * u}px ${10 * u}px 0 rgba(0,0,0,0.35)`}}>
					{typed.shown || layer.text}
					<div style={{position: 'absolute', left: '18%', bottom: -34 * u, width: 0, height: 0, borderLeft: `${22 * u}px solid transparent`, borderRight: `${22 * u}px solid transparent`, borderTop: `${36 * u}px solid ${dark ? '#fff' : '#111'}`}} />
				</div>
			);
		}
		case 'phone':
			return (
				<div style={{borderRadius: 70 * u, padding: 16 * u, background: '#0b0b0c', boxShadow: `0 ${30 * u}px ${70 * u}px rgba(0,0,0,0.55), inset 0 0 0 ${3 * u}px #333`}}>
					<div style={{borderRadius: 56 * u, overflow: 'hidden', aspectRatio: '9 / 19.5', background: surface, position: 'relative'}}>
						{layer.src ? (
							/\.(mp4|mov|webm)$/i.test(layer.src) ? (
								<OffthreadVideo src={resolveSrc(layer.src)} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
							) : (
								<Img src={resolveSrc(layer.src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
							)
						) : (
							<div style={{padding: 40 * u, paddingTop: 120 * u, fontFamily: fonts.inter, fontSize: 40 * u, fontWeight: 700, color: ink}}>
								{typed.shown}
								{!typed.done ? <Caret f={f} color={accent} /> : null}
							</div>
						)}
						<div style={{position: 'absolute', top: 18 * u, left: '50%', transform: 'translateX(-50%)', width: 190 * u, height: 54 * u, borderRadius: 99, background: '#000'}} />
					</div>
				</div>
			);
	}
	return null;
};
