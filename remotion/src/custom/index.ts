import type React from 'react';

/**
 * Register bespoke scene components here when a video needs something the spec layers can't express
 * (a 3D object, a particle system, an intricate infographic). Reference them from a scene with
 * `"custom": "<name>"` and pass `"customProps"`. They render above the scene background and below layers,
 * and inherit the scene's camera, grade, stepping and transitions.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const custom: Record<string, React.FC<any>> = {};
