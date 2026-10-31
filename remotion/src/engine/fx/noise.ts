/**
 * Cached noise tiles. Full-frame feTurbulence filters are re-rasterised every frame and make renders
 * crawl; an SVG data-URI used as a repeating background-image is rasterised once and reused, so
 * grain/paper/fabric textures cost almost nothing per frame.
 */
const svgTile = (size: number, freq: string, octaves: number, seed: number, matrix: string) =>
	`url("data:image/svg+xml;utf8,${encodeURIComponent(
		`<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'><filter id='n' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='${freq}' numOctaves='${octaves}' seed='${seed}' stitchTiles='stitch'/><feColorMatrix type='matrix' values='${matrix}'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`,
	)}")`;

/** grey noise with alpha = strength (good for multiply / overlay) */
export const greyMatrix = (strength: number) => `0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${-strength} ${strength}`;

/** neutral mid-grey film grain for overlay blending */
const grainMatrix = '0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0.9 0.9 0.9 0 -1.1';

const cache = new Map<string, string>();
export const noiseTile = (key: string, size: number, freq: string, octaves: number, seed: number, matrix: string) => {
	const k = `${key}|${size}|${freq}|${octaves}|${seed}|${matrix}`;
	if (!cache.has(k)) cache.set(k, svgTile(size, freq, octaves, seed, matrix));
	return cache.get(k)!;
};

export const grainTile = (seed: number) => noiseTile('grain', 256, '0.9', 2, seed, grainMatrix);
