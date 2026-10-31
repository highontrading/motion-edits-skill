import {loadFont as anton} from '@remotion/google-fonts/Anton';
import {loadFont as archivoBlack} from '@remotion/google-fonts/ArchivoBlack';
import {loadFont as caveat} from '@remotion/google-fonts/Caveat';
import {loadFont as inter} from '@remotion/google-fonts/Inter';
import {loadFont as instrumentSerif} from '@remotion/google-fonts/InstrumentSerif';
import {loadFont as jetbrains} from '@remotion/google-fonts/JetBrainsMono';
import {loadFont as oswald} from '@remotion/google-fonts/Oswald';
import {loadFont as permanentMarker} from '@remotion/google-fonts/PermanentMarker';
import {loadFont as playfair} from '@remotion/google-fonts/PlayfairDisplay';
import {loadFont as poppins} from '@remotion/google-fonts/Poppins';
import {loadFont as vt323} from '@remotion/google-fonts/VT323';
import {loadFont as nunito} from '@remotion/google-fonts/Nunito';
import {loadFont as robotoSlab} from '@remotion/google-fonts/RobotoSlab';
import {loadFont as specialElite} from '@remotion/google-fonts/SpecialElite';
import {loadFont as mrsSaint} from '@remotion/google-fonts/MrsSaintDelafield';
import {loadFont as bebas} from '@remotion/google-fonts/BebasNeue';
import {loadFont as dmSerif} from '@remotion/google-fonts/DMSerifDisplay';
import {loadFont as spaceGrotesk} from '@remotion/google-fonts/SpaceGrotesk';
import type {TypeStyleName} from '../types';

const latin = {subsets: ['latin' as const]};

const F = {
	anton: anton('normal', {...latin, weights: ['400']}).fontFamily,
	archivo: archivoBlack('normal', {...latin, weights: ['400']}).fontFamily,
	poppins: poppins('normal', {...latin, weights: ['600', '800', '900']}).fontFamily,
	inter: inter('normal', {...latin, weights: ['400', '600', '800']}).fontFamily,
	playfair: playfair('normal', {...latin, weights: ['700', '900']}).fontFamily,
	playfairItalic: playfair('italic', {...latin, weights: ['400', '700']}).fontFamily,
	instrument: instrumentSerif('italic', {...latin, weights: ['400']}).fontFamily,
	caveat: caveat('normal', {...latin, weights: ['700']}).fontFamily,
	marker: permanentMarker('normal', {...latin, weights: ['400']}).fontFamily,
	mono: jetbrains('normal', {...latin, weights: ['500', '700']}).fontFamily,
	oswald: oswald('normal', {...latin, weights: ['500', '700']}).fontFamily,
	pixel: vt323('normal', {...latin, weights: ['400']}).fontFamily,
	nunito: nunito('normal', {...latin, weights: ['300', '800', '900']}).fontFamily,
	slab: robotoSlab('normal', {...latin, weights: ['400', '800']}).fontFamily,
	typewriter: specialElite('normal', {...latin, weights: ['400']}).fontFamily,
	signature: mrsSaint('normal', {...latin, weights: ['400']}).fontFamily,
	bebas: bebas('normal', {...latin, weights: ['400']}).fontFamily,
	dmSerif: dmSerif('normal', {...latin, weights: ['400']}).fontFamily,
	spaceGrotesk: spaceGrotesk('normal', {...latin, weights: ['400', '700']}).fontFamily,
};

export type TypeStyle = {
	fontFamily: string;
	fontWeight: number;
	fontStyle?: 'normal' | 'italic';
	caps: boolean;
	/** em */
	tracking: number;
	lineHeight: number;
	/** default size as % of frame width */
	size: number;
};

export const typeStyles: Record<TypeStyleName, TypeStyle> = {
	impact: {fontFamily: F.anton, fontWeight: 400, caps: true, tracking: -0.01, lineHeight: 0.92, size: 14},
	grotesk: {fontFamily: F.archivo, fontWeight: 400, caps: true, tracking: -0.02, lineHeight: 0.98, size: 9},
	clean: {fontFamily: F.inter, fontWeight: 600, caps: false, tracking: -0.03, lineHeight: 1.08, size: 7.5},
	serif: {fontFamily: F.playfair, fontWeight: 700, caps: false, tracking: -0.02, lineHeight: 1.02, size: 9},
	'serif-italic': {fontFamily: F.instrument, fontWeight: 400, fontStyle: 'italic', caps: false, tracking: -0.02, lineHeight: 1, size: 11},
	script: {fontFamily: F.caveat, fontWeight: 700, caps: false, tracking: 0, lineHeight: 1, size: 8},
	marker: {fontFamily: F.marker, fontWeight: 400, caps: true, tracking: 0, lineHeight: 1.05, size: 8},
	mono: {fontFamily: F.mono, fontWeight: 500, caps: false, tracking: 0, lineHeight: 1.3, size: 4.4},
	condensed: {fontFamily: F.oswald, fontWeight: 700, caps: true, tracking: 0.01, lineHeight: 1.05, size: 5},
	pixel: {fontFamily: F.pixel, fontWeight: 400, caps: true, tracking: 0.02, lineHeight: 0.95, size: 12},
	geometric: {fontFamily: F.poppins, fontWeight: 900, caps: true, tracking: -0.02, lineHeight: 1, size: 9},
	rounded: {fontFamily: F.nunito, fontWeight: 900, caps: false, tracking: -0.01, lineHeight: 1.02, size: 9},
	slab: {fontFamily: F.slab, fontWeight: 800, caps: true, tracking: -0.01, lineHeight: 1, size: 9},
	typewriter: {fontFamily: F.typewriter, fontWeight: 400, caps: false, tracking: 0, lineHeight: 1.25, size: 5},
	signature: {fontFamily: F.signature, fontWeight: 400, caps: false, tracking: 0, lineHeight: 1, size: 12},
	bebas: {fontFamily: F.bebas, fontWeight: 400, caps: true, tracking: 0.01, lineHeight: 0.9, size: 15},
	didone: {fontFamily: F.dmSerif, fontWeight: 400, caps: false, tracking: -0.02, lineHeight: 0.98, size: 11},
	tech: {fontFamily: F.spaceGrotesk, fontWeight: 700, caps: false, tracking: -0.03, lineHeight: 1.05, size: 7},
};

export const fonts = F;
