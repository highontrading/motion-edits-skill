import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {useSpec} from '../context';
import {typeStyles} from '../lib/fonts';
import {clamp01, curves, decay} from '../lib/motion';
import type {ChartLayer} from '../types';

/**
 * Charts that draw on. `marker` = the thick black hand-drawn line style of the collage explainers
 * (v05 TRUST SKYROCKETS); otherwise clean infographic bars/lines/donut.
 */
export const ChartView: React.FC<{layer: ChartLayer; startFrame: number}> = ({layer, startFrame}) => {
	const frame = useCurrentFrame();
	const {width} = useVideoConfig();
	const {palette} = useSpec();
	const u = width / 1080;
	const f = frame - startFrame;
	const draw = layer.draw ?? 24;
	const p = curves.settle(clamp01(f / draw));
	const data = layer.data;
	const max = Math.max(...data, 1);
	const color = layer.color ?? (layer.marker ? '#111111' : palette.accent);
	const st = typeStyles[layer.style ?? 'condensed'];
	const W = 1000;
	const H = 600;

	if (layer.kind === 'bar') {
		return (
			<div style={{display: 'flex', alignItems: 'flex-end', gap: '4%', width: '100%', aspectRatio: `${W} / ${H}`}}>
				{data.map((v, i) => {
					const bp = clamp01(decay(f - i * 3 + 1, 0.8));
					return (
						<div key={i} style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end'}}>
							{layer.showValues ? (
								<div style={{fontFamily: st.fontFamily, fontWeight: st.fontWeight, fontSize: 44 * u, color, opacity: bp}}>{Math.round(v * bp)}</div>
							) : null}
							<div style={{width: '100%', height: `${(v / max) * 82 * bp}%`, background: i === data.length - 1 ? layer.color2 ?? color : color, borderRadius: `${10 * u}px ${10 * u}px 0 0`}} />
							{layer.labels ? <div style={{fontFamily: st.fontFamily, fontSize: 30 * u, marginTop: 10 * u, color: palette.ink}}>{layer.labels[i]}</div> : null}
						</div>
					);
				})}
			</div>
		);
	}

	if (layer.kind === 'donut') {
		const r = 40;
		const c = 2 * Math.PI * r;
		const frac = clamp01(data[0] / (data[1] ?? 100)) * p;
		return (
			<svg viewBox="0 0 100 100" style={{width: '100%'}}>
				<circle cx="50" cy="50" r={r} fill="none" stroke={layer.color2 ?? 'rgba(255,255,255,0.15)'} strokeWidth={12} />
				<circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth={12} strokeDasharray={`${c * frac} ${c}`} transform="rotate(-90 50 50)" strokeLinecap="round" />
				<text x="50" y="57" textAnchor="middle" fontFamily={st.fontFamily} fontWeight={st.fontWeight} fontSize="20" fill={palette.ink}>
					{Math.round(frac * 100)}%
				</text>
			</svg>
		);
	}

	const pts = data.map((v, i) => [(i / (data.length - 1)) * W, H - (v / max) * H * 0.9] as const);
	const d = layer.marker
		? pts.map(([x, y], i) => `${i ? 'L' : 'M'} ${x} ${y}`).join(' ')
		: pts.map(([x, y], i) => (i ? `C ${pts[i - 1][0] + W / (data.length - 1) / 2} ${pts[i - 1][1]}, ${x - W / (data.length - 1) / 2} ${y}, ${x} ${y}` : `M ${x} ${y}`)).join(' ');
	return (
		<svg viewBox={`0 0 ${W} ${H}`} style={{width: '100%', overflow: 'visible'}}>
			{layer.kind === 'area' ? <path d={`${d} L ${W} ${H} L 0 ${H} Z`} fill={color} opacity={0.18 * p} /> : null}
			<path
				d={d}
				fill="none"
				stroke={color}
				strokeWidth={(layer.stroke ?? (layer.marker ? 22 : 10)) * (1000 / (width * 0.9)) * u * 1.6}
				strokeLinecap="round"
				strokeLinejoin="round"
				pathLength={1}
				strokeDasharray="1 1"
				strokeDashoffset={1 - p}
			/>
		</svg>
	);
};
