import React, {useLayoutEffect, useRef, useState} from 'react';

/**
 * Shrinks its content uniformly when the natural width overflows the box (never enlarges).
 * Keeps giant keywords inside the frame on any aspect ratio without hand-tuning sizes.
 */
export const FitWidth: React.FC<{children: React.ReactNode; maxPx: number}> = ({children, maxPx}) => {
	const ref = useRef<HTMLDivElement>(null);
	const [scale, setScale] = useState(1);
	useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;
		const natural = el.scrollWidth;
		if (natural > maxPx) setScale(maxPx / natural);
	}, [maxPx]);
	return (
		<div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
			<div ref={ref} style={{display: 'inline-block', whiteSpace: 'nowrap', transform: scale < 1 ? `scale(${scale})` : undefined, transformOrigin: 'center center'}}>
				{children}
			</div>
		</div>
	);
};
