import React from 'react';

/**
 * Custom cursors are implemented 100% via inline SVG data-URLs in CSS (`src/index.css`):
 * - Default: Blurred peach-orange glowing dot (32x32px, hotspot 16,16) applied to `*`
 * - Contextual: Cream crosshair plus glyph (24x24px, hotspot 12,12) applied to `.cursor-plus, .cursor-plus *`
 * Zero JS mouse listeners, zero DOM overlays, zero JS state.
 */
export const CustomCursor: React.FC = () => null;
