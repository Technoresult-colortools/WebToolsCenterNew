// src/components/tools/background-pattern-generator/patternGenerators.ts
import { PatternSettings, PatternType } from './types'; // Assuming types.ts exists
import { patternTypes } from './patternTypes'; // Import pattern definitions

/**
 * Generate CSS for background patterns based on settings and pattern type
 */
export function generatePatternCSS(settings: PatternSettings): string {
  const pattern = patternTypes.find(p => p.id === settings.patternType);

  if (!pattern) {
    console.error(`No pattern definition found for pattern type: ${settings.patternType}`);
    return `/* Error: No definition for pattern type "${settings.patternType}" */\nbackground-color: ${settings.backgroundColor};`;
  }

  const generators: Record<string, (settings: PatternSettings) => string> = {
    // Basic Shapes
    dots: generateDotsPattern,
    pluses: generatePlusesPattern,
    bigplus: generateBigPlusPattern,
    checkerboard: generateCheckerboardPattern, // New
    // Lines & Grids
    lines: generateLinesPattern,
    grid: generateGridPattern,
    stripes: generateStripesPattern,
    blueprint: generateBlueprintPattern,
    'zig-zag': generateZigZagPattern, // New
    zigzag2: generateZigZag2Pattern,
    
    // Geometric
    triangles: generateTrianglesPattern,
    hexagons: generateHexagonsPattern,
    diamonds: generateDiamondsPattern,
    chevron: generateChevronPattern,
    isometric: generateIsometricPattern,
    houndstooth: generateHoundstoothPattern, // New
    // Textures & Noise
    noise: generateNoisePattern,
    waves: generateWavesPattern, // Refined
    circuit: generateCircuitPattern,
    net: generateNetPattern,
    netv2: generateNetv2Pattern,
    // 3D Effects
    cubes: generateCubesPattern,
    cubesv2: generateCubesv2Pattern,
    pyramids: generatePyramidsPattern,
    steps: generateStepsPattern,
    rooms3d: generate3DRoomsPattern,
    // Woven & Fabric
    carbon: generateCarbonFiberPattern, // Refined
    argyle: generateArgylePattern, // New
    'basket-weave': generateBasketWeavePattern,
    dropwaves: generateDropWavesPattern,
    dropwavesv2: generateDropWavesv2Pattern,
  };

  const generator = generators[pattern.id];
  if (!generator) {
    console.error(`No pattern generator function found for pattern type: ${pattern.id}`);
    return `/* Error: No generator function for pattern type "${pattern.id}" */\nbackground-color: ${settings.backgroundColor};`;
  }



  try {
    // Generate the core pattern CSS
    // Rotation is now handled *within* generators that support it (lines, grid)
    const css = generator(settings);
    return css;
  } catch (error) {
    console.error(`Error generating pattern CSS for ${pattern.id}:`, error);
    // Provide more specific error feedback if possible
    const message = error instanceof Error ? error.message : String(error);
    return `/* Error generating pattern CSS for ${pattern.id}: ${message} */\nbackground-color: ${settings.backgroundColor};`;
  }
}

// --- Helper Functions ---

// (Keep applyOpacityToHexColor and adjustColorLightness as they are)
function applyOpacityToHexColor(color: string, opacity: number): string {
  if (opacity >= 0.99 || typeof color !== 'string' || !color.startsWith('#') || (color.length !== 7 && color.length !== 4)) {
    return color;
  }
  const alphaHex = Math.round(opacity * 255).toString(16).padStart(2, '0');
  if (color.length === 4) {
      const r = color.substring(1,2); const g = color.substring(2,3); const b = color.substring(3,4);
      return `#${r}${r}${g}${g}${b}${b}${alphaHex}`;
  }
  return `${color}${alphaHex}`;
}

function adjustColorLightness(hex: string, percent: number): string {
  try {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);
    const factor = 1 + percent / 100;
    r = Math.max(0, Math.min(255, Math.round(r * factor)));
    g = Math.max(0, Math.min(255, Math.round(g * factor)));
    b = Math.max(0, Math.min(255, Math.round(b * factor)));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  } catch (e) {
    console.error("Error adjusting color lightness:", e);
    return hex;
  }
}

// --- Revised & New Pattern Generators ---

// --- Basic Shapes ---

function generateDotsPattern(settings: PatternSettings): string {
  const { patternSize = 32, dotSize = 4, patternColor, backgroundColor, opacity = 1, stagger = false } = settings;
  const colorWithOpacity = applyOpacityToHexColor(patternColor, opacity);
  // Ensure dotSize is not larger than patternSize for visibility
  const effectiveDotSize = Math.min(dotSize, patternSize);
  const dotRadius = Math.max(1, effectiveDotSize / 2); // Ensure radius is at least 1px

  const staggerOffset = stagger ? `${patternSize / 2}px ${patternSize / 2}px` : '0 0';

  return `
background-color: ${backgroundColor};
background-image: radial-gradient(circle ${dotRadius}px at center, ${colorWithOpacity} 99%, transparent 100%);
background-size: ${patternSize}px ${patternSize}px;
background-position: ${staggerOffset};
`.trim();
}

function generatePlusesPattern(settings: PatternSettings): string {
  const {
    patternSize = 64,  // Default for the ring pattern base size
    lineWidth = 2,     // Default for the grid line width
    patternColor,      // Color for the Grid Lines
    backgroundColor,   // Will be used for both background and rings
    secondaryColor,    // Not used (hidden as requested)
    opacity = 1,       // Opacity for the Grid Lines
  } = settings;

  // Ensure minimum sizes
  const size = Math.max(8, patternSize); // Main repeat size (for rings)
  const gridSize = size / 2;             // Grid size is half the ring size
  const effectiveLineWidth = Math.max(1, lineWidth); // Ensure line width is at least 1

  // Use fallback colors if not provided
  const gridLineColor = patternColor || '#474bff'; // Default fallback
  
  // IMPORTANT: Force ring color to be exactly the same as background color
  // This ensures the rings are completely hidden/invisible
  const ringColor = backgroundColor; // No fallback, ensuring it's always the same as background

  // Apply opacity ONLY to the grid lines (patternColor)
  const gridLineColorWithOpacity = applyOpacityToHexColor(gridLineColor, opacity);

  // Define the ring gradient stops (using backgroundColor)
  // Even though we're using the same color as background, we'll keep the structure
  // but the rings should be invisible since they match the background exactly
  const ringInnerPct = 20;
  const ringOuterPct = 80;
  const radialGradient = `radial-gradient(circle, transparent ${ringInnerPct}%, ${ringColor} ${ringInnerPct}%, ${ringColor} ${ringOuterPct}%, transparent ${ringOuterPct}%, transparent)`;

  // Define the grid line gradients (using patternColor + opacity)
  const horizontalLines = `linear-gradient(${gridLineColorWithOpacity} ${effectiveLineWidth}px, transparent ${effectiveLineWidth}px)`;
  const verticalLines = `linear-gradient(90deg, ${gridLineColorWithOpacity} ${effectiveLineWidth}px, transparent ${effectiveLineWidth}px)`;

  // Calculate background positions
  const lineOffset = effectiveLineWidth / 2;
  const horizontalLinePos = `0px -${lineOffset}px`;
  const verticalLinePos = `-${lineOffset}px 0px`;

  // Force !important on background-color to ensure it overrides any other styles
  return `
/* Apply the main background color with !important to override any inherited styles */
background-color: ${backgroundColor} !important;

/* Layer the pattern elements on top */
background-image:
    /* Ring Layer 1 (top-left) - Uses exact backgroundColor */
    ${radialGradient},
    /* Ring Layer 2 (staggered center) - Uses exact backgroundColor */
    ${radialGradient},
    /* Grid Layer - Horizontal Lines - Uses patternColor + opacity */
    ${horizontalLines},
    /* Grid Layer - Vertical Lines - Uses patternColor + opacity */
    ${verticalLines};

background-position:
    /* Ring 1 */ 0% 0%,
    /* Ring 2 */ ${gridSize}px ${gridSize}px,
    /* H Lines*/ ${horizontalLinePos},
    /* V Lines*/ ${verticalLinePos};

background-size:
    /* Rings repeat on the larger size */ ${size}px ${size}px,
    /* Rings repeat on the larger size */ ${size}px ${size}px,
    /* Grid repeats on the smaller size */ ${gridSize}px ${gridSize}px,
    /* Grid repeats on the smaller size */ ${gridSize}px ${gridSize}px;
`.trim();
}

function generateBigPlusPattern(settings: PatternSettings): string {
  const {
    patternSize = 32,    // Base size for pattern elements
    patternColor,        // Color for the conic gradients
    backgroundColor,     // Background color
    secondaryColor,      // Not used in this pattern
    opacity = 1,         // Opacity for pattern elements
  } = settings;

  // Ensure minimum size
  const size = Math.max(8, patternSize);
  
  // Pattern repeats after 5 units (5*size = total background-size)
  const totalSize = size * 5;
  
  // Use fallback colors if not provided
  const conicColor = patternColor || '#474bff';  // Default fallback
  const bgColor = backgroundColor || '#47d3ff';  // Default fallback
  
  // Apply opacity to conic color if needed
  const conicColorWithOpacity = applyOpacityToHexColor(conicColor, opacity);
  
  // Define the conic gradient pattern
  // Each gradient is positioned at specific coordinates
  const conicLeft = `conic-gradient(at 10% 50%, #0000 75%, ${conicColorWithOpacity} 0)`;
  const conicTop = `conic-gradient(at 50% 10%, #0000 75%, ${conicColorWithOpacity} 0)`;
  
  // Calculate all the positions
  const positions = [
    // Left-oriented conics (at 10% 50%)
    { gradient: conicLeft, x: 0, y: 0 },
    { gradient: conicLeft, x: 1, y: 3 },
    { gradient: conicLeft, x: 2, y: 1 },
    { gradient: conicLeft, x: 3, y: 4 },
    { gradient: conicLeft, x: 4, y: 2 },
    
    // Top-oriented conics (at 50% 10%)
    { gradient: conicTop, x: 0, y: 4 },
    { gradient: conicTop, x: 1, y: 2 },
    { gradient: conicTop, x: 2, y: 0 },
    { gradient: conicTop, x: 3, y: 3 },
    { gradient: conicTop, x: 4, y: 1 }
  ];
  
  // Build the CSS
  const backgroundImages = positions.map(pos => 
    `${pos.gradient}${pos.x || pos.y ? ` calc(${pos.x}*${size}px) calc(${pos.y}*${size}px)` : ''}`
  ).join(',\n      ');
  
  return `
background:
      ${backgroundImages},
      ${bgColor};
background-size: ${totalSize}px ${totalSize}px;
`.trim();
}

function generateCheckerboardPattern(settings: PatternSettings): string { // NEW
  const { patternSize = 32, patternColor, backgroundColor, secondaryColor } = settings;
  const size = Math.max(4, patternSize); // Ensure minimum size
  const halfSize = size / 2;

  // Use conic-gradient for simplicity
  return `
background-color: ${backgroundColor}; /* Fallback or border color */
background-image: conic-gradient(
  ${patternColor} 0% 25%,
  ${secondaryColor} 25% 50%,
  ${patternColor} 50% 75%,
  ${secondaryColor} 75% 100%
);
background-size: ${size}px ${size}px;
`.trim();
}

// --- Lines & Grids ---

function generateLinesPattern(settings: PatternSettings): string {
  const { lineWidth = 1, patternColor, backgroundColor, direction = 'horizontal', spacing = 5, opacity = 1, rotation = 0 } = settings;
  const effectiveLineWidth = Math.max(1, lineWidth);
  const effectiveSpacing = Math.max(0, spacing);
  const colorWithOpacity = applyOpacityToHexColor(patternColor, opacity);
  const totalSpace = effectiveLineWidth + effectiveSpacing; // Total space for one line + gap

  // Base angle: 0 for horizontal (top to bottom gradient line), 90 for vertical (left to right gradient line)
  const baseAngle = direction === 'horizontal' ? 0 : 90;
  const finalAngle = (baseAngle + rotation) % 360;

  // Size of the repeating unit. For lines, only one dimension matters.
  const backgroundSize = direction === 'horizontal'
    ? `100% ${totalSpace}px`
    : `${totalSpace}px 100%`;

  return `
background-color: ${backgroundColor};
background-image: repeating-linear-gradient(
  ${finalAngle}deg,
  ${colorWithOpacity} 0,
  ${colorWithOpacity} ${effectiveLineWidth}px,
  transparent ${effectiveLineWidth}px,
  transparent ${totalSpace}px
);
background-size: ${backgroundSize};
/* Optional: Small offset to align lines if needed, depends on aesthetic */
/* background-position: -${effectiveLineWidth/2}px -${effectiveLineWidth/2}px; */
`.trim();
}


function generateGridPattern(settings: PatternSettings): string {
  const { patternSize = 32, lineWidth = 1, patternColor, backgroundColor, opacity = 1, rotation = 0 } = settings;
  const effectiveLineWidth = Math.max(1, lineWidth);
  const effectiveSize = Math.max(effectiveLineWidth * 2, patternSize); // Ensure cell size is feasible
  const colorWithOpacity = applyOpacityToHexColor(patternColor, opacity);
  const lineStop = `${colorWithOpacity} ${effectiveLineWidth}px, transparent ${effectiveLineWidth}px`;

  // Calculate rotated angles
  const angle1 = rotation % 360; // Horizontal lines base angle 0
  const angle2 = (90 + rotation) % 360; // Vertical lines base angle 90

  return `
background-color: ${backgroundColor};
background-image:
  linear-gradient(${angle1}deg, ${lineStop}),
  linear-gradient(${angle2}deg, ${lineStop});
background-size: ${effectiveSize}px ${effectiveSize}px;
/* Position to center lines on the grid boundaries */
background-position: -${effectiveLineWidth / 2}px -${effectiveLineWidth / 2}px;
`.trim();
}

function generateStripesPattern(settings: PatternSettings): string {
  const { patternSize = 32, lineWidth = 16, patternColor, backgroundColor, secondaryColor, direction = 'horizontal' } = settings;
  // patternSize is the total width/height of ONE pair of stripes
  // lineWidth is the width/height of the FIRST stripe (patternColor)
  const totalSize = Math.max(2, patternSize);
  const stripe1Width = Math.max(1, Math.min(lineWidth, totalSize - 1)); // Width of patternColor stripe
  const stripe2Width = totalSize - stripe1Width; // Width of secondaryColor stripe

  if (stripe1Width <= 0 || stripe2Width <= 0) {
      return `/* Error: Invalid stripe widths */ background-color: ${backgroundColor};`
  }

  const isHorizontal = direction === 'horizontal';
  const gradientDirection = isHorizontal ? 'to bottom' : 'to right';
  const backgroundSize = isHorizontal ? `100% ${totalSize}px` : `${totalSize}px 100%`;

  return `
background-color: ${backgroundColor}; /* Fallback */
background-image: repeating-linear-gradient(
  ${gradientDirection},
  ${patternColor} 0,
  ${patternColor} ${stripe1Width}px,
  ${secondaryColor} ${stripe1Width}px,
  ${secondaryColor} ${totalSize}px
);
background-size: ${backgroundSize};
`.trim();
}

function generateBlueprintPattern(settings: PatternSettings): string {
  const { patternSize = 20, lineWidth = 2, patternColor, backgroundColor, density = 0.5, opacity = 1 } = settings;
  const fineSize = Math.max(4, patternSize);
  const effectiveLineWidth = Math.max(1, lineWidth);
  // Coarser grid: Lower density means larger coarse grid spacing
  const coarseMultiplier = 4 + Math.round((1 - density) * 6);
  const coarseGridSize = fineSize * coarseMultiplier;
  // Dots: Higher density means more dots (smaller spacing)
  const dotSpacingMultiplier = Math.max(1, 2 + Math.floor(density * 5));
  const dotSpacing = Math.max(2, Math.floor(fineSize / dotSpacingMultiplier));
  const dotRadius = Math.max(1, effectiveLineWidth * 0.5); // Smaller dots

  const colorWithOpacity = applyOpacityToHexColor(patternColor, opacity * 0.6); // Fine lines more transparent
  const coarseColorWithOpacity = applyOpacityToHexColor(patternColor, opacity); // Coarse lines full opacity
  const dotColorWithOpacity = applyOpacityToHexColor(patternColor, opacity * 0.8); // Dots slightly transparent

  const fineLineWidth = Math.max(1, Math.floor(effectiveLineWidth / 2));
  const fineLine = `${colorWithOpacity} ${fineLineWidth}px, transparent ${fineLineWidth}px`;
  const coarseLine = `${coarseColorWithOpacity} ${effectiveLineWidth}px, transparent ${effectiveLineWidth}px`;

  return `
background-color: ${backgroundColor};
background-image:
  /* Fine grid (less opaque) */
  linear-gradient(${fineLine}),
  linear-gradient(90deg, ${fineLine}),
  /* Coarse grid (more opaque) */
  linear-gradient(${coarseLine}),
  linear-gradient(90deg, ${coarseLine}),
  /* Dots (slightly transparent) */
  radial-gradient(circle ${dotRadius}px at center, ${dotColorWithOpacity} 99%, transparent 100%);

background-size:
  ${fineSize}px ${fineSize}px, /* Fine H */
  ${fineSize}px ${fineSize}px, /* Fine V */
  ${coarseGridSize}px ${coarseGridSize}px, /* Coarse H */
  ${coarseGridSize}px ${coarseGridSize}px, /* Coarse V */
  ${dotSpacing}px ${dotSpacing}px; /* Dots */

/* Align grids and dots, centering lines */
background-position:
  -${fineLineWidth / 2}px -${fineLineWidth / 2}px, /* Fine H */
  -${fineLineWidth / 2}px -${fineLineWidth / 2}px, /* Fine V */
  -${effectiveLineWidth / 2}px -${effectiveLineWidth / 2}px, /* Coarse H */
  -${effectiveLineWidth / 2}px -${effectiveLineWidth / 2}px, /* Coarse V */
  0 0; /* Dots */
`.trim();
}

function generateZigZagPattern(settings: PatternSettings): string { // NEW
  const { patternSize = 40, lineWidth = 2, patternColor, backgroundColor, direction = 'horizontal', opacity = 1 } = settings;
  const size = Math.max(lineWidth * 2, patternSize); // Ensure size is adequate
  const halfSize = size / 2;
  const colorWithOpacity = applyOpacityToHexColor(patternColor, opacity);
  const effectiveLineWidth = Math.max(1, lineWidth);

  // Use repeating-linear-gradient for continuous lines
  const angle1 = direction === 'horizontal' ? 45 : 135;
  const angle2 = direction === 'horizontal' ? -45 : 45;

  // Calculate gradient stops to achieve line width
  // The diagonal length covered by the line width needs adjustment
  const lineOffset = effectiveLineWidth / Math.sqrt(2); // approx

  return `
background-color: ${backgroundColor};
background-image:
  repeating-linear-gradient(${angle1}deg,
      transparent 0, transparent ${halfSize - lineOffset}px,
      ${colorWithOpacity} ${halfSize - lineOffset}px, ${colorWithOpacity} ${halfSize + lineOffset}px,
      transparent ${halfSize + lineOffset}px, transparent ${size}px
  ),
  repeating-linear-gradient(${angle2}deg,
      transparent 0, transparent ${halfSize - lineOffset}px,
      ${colorWithOpacity} ${halfSize - lineOffset}px, ${colorWithOpacity} ${halfSize + lineOffset}px,
      transparent ${halfSize + lineOffset}px, transparent ${size}px
  );
background-size: ${size}px ${size}px;
`.trim();
}

function generateZigZag2Pattern(settings: PatternSettings): string {
  const { 
    patternSize = 32, 
    lineWidth = 8, // Not directly used but kept for API consistency
    patternColor, 
    backgroundColor,
    secondaryColor, // Not used in this pattern
    direction = 'horizontal', 
    opacity = 1 
  } = settings;
  
  // Ensure minimum size
  const size = Math.max(8, patternSize);
  const doubleSize = size * 2;
  
  // Default colors if not provided
  const zigzagColor = patternColor || '#474bff';
  const bgColor = backgroundColor || '#47d3ff';
  
  // Apply opacity to pattern color if needed
  const colorWithOpacity = applyOpacityToHexColor(zigzagColor, opacity);
  
  // Determine angles based on direction
  let angle1, angle2, angle3, angle4;
  let offset;
  
  if (direction === 'horizontal') {
    angle1 = 135;
    angle2 = 225;
    angle3 = 315;
    angle4 = 45;
    offset = `${-size}px 0`;
  } else {
    // For vertical direction, rotate all angles by 90 degrees
    angle1 = 45;
    angle2 = 135;
    angle3 = 225;
    angle4 = 315;
    offset = `0 ${-size}px`;
  }
  
  return `
background: 
  linear-gradient(${angle1}deg, ${colorWithOpacity} 25%, transparent 25%) ${offset}, 
  linear-gradient(${angle2}deg, ${colorWithOpacity} 25%, transparent 25%) ${offset}, 
  linear-gradient(${angle3}deg, ${colorWithOpacity} 25%, transparent 25%), 
  linear-gradient(${angle4}deg, ${colorWithOpacity} 25%, transparent 25%);
background-size: ${doubleSize}px ${doubleSize}px;
background-color: ${bgColor};
`.trim();
}

// --- Geometric ---

function generateTrianglesPattern(settings: PatternSettings): string {
  const { patternSize = 40, patternColor, backgroundColor, opacity = 1 } = settings;
  const colorWithOpacity = applyOpacityToHexColor(patternColor, opacity);
  const size = Math.max(4, patternSize);

  // Using a slightly different gradient setup for potentially sharper triangles
  return `
background-color: ${backgroundColor};
background-image:
  linear-gradient(45deg, ${colorWithOpacity} 50%, transparent 50%),
  linear-gradient(-45deg, ${colorWithOpacity} 50%, transparent 50%);
background-size: ${size}px ${size}px;
background-position: 0 0; /* Align centers */
`.trim();
// Original: Used 25%/75% stops and offset positions. This simpler version might be cleaner.
}

function generateHexagonsPattern(settings: PatternSettings): string {
  const {
      patternSize = 32,
      patternColor = '#47d3ff',
      secondaryColor = '#474bff',
      backgroundColor = 'transparent', // Still needed for the element's base color
      opacity = 1
  } = settings;

  const size = Math.max(8, patternSize);
  const primaryColor = applyOpacityToHexColor(patternColor, opacity);
  const secondaryColorWithOpacity = applyOpacityToHexColor(secondaryColor, opacity);
  const transparentColor = '#0000';
  const negOffsetCalc = `calc(${size}px / -5)`;

  // Define the layers including their positions
  const layer1 = `conic-gradient(from 90deg at 2px 2px, ${transparentColor} 25%, ${primaryColor} 0) -1px -1px`;
  const layer2 = `linear-gradient(-45deg, ${primaryColor} 15%, ${secondaryColorWithOpacity} 0 28%, ${transparentColor} 0 72%, ${secondaryColorWithOpacity} 0 85%, ${primaryColor} 0)`; // No explicit position
  const layer3 = `linear-gradient(45deg, ${primaryColor} 15%, ${secondaryColorWithOpacity} 0 28%, ${transparentColor} 0 72%, ${secondaryColorWithOpacity} 0 85%, ${primaryColor} 0)`; // No explicit position
  const layer4 = `conic-gradient(from 90deg at 40% 40%, ${primaryColor} 25%, ${secondaryColorWithOpacity} 0) ${negOffsetCalc} ${negOffsetCalc}`;

  // Combine layers using the 'background' shorthand
  // Keep background-color separate as it's applied to the element itself
  // Keep background-size separate as in the "Wanted" example
  return `
/* Apply background color to the element */
background-color: ${backgroundColor};

/* Define layers using the 'background' shorthand */
background:
    ${layer1},
    ${layer2},
    ${layer3},
    ${layer4};

/* Define background size separately */
background-size: ${size}px ${size}px;
`.trim().replace(/^/gm, '  '); // Optional: Indent for readability
}


function generateDiamondsPattern(settings: PatternSettings): string {
  const {
    patternSize = 32,
    patternColor,
    backgroundColor, // Use the main background color setting
    secondaryColor,  // Color for the triangles that appear "behind"
    opacity = 1,      // Use the opacity setting from controls
  } = settings;

  // Ensure minimum size for visibility
  const size = Math.max(4, patternSize);

  // Apply the opacity setting ONLY to the primary pattern color
  const patternColorWithOpacity = applyOpacityToHexColor(patternColor, opacity);

  // Define the secondary color (can be solid)
  const secondaryColorSolid = secondaryColor || 'transparent'; // Default to transparent if not set

  // We use two overlapping conic gradients:
  // Layer 1 (bottom): Draws the secondaryColor triangles where the primary ones will be transparent.
  // Layer 2 (top): Draws the primaryColor triangles (with opacity) where the secondary ones are transparent.
  return `
/* Set the main background color */
background-color: ${backgroundColor};

background-image:
    /* Layer 1: Secondary color triangles (rendered below layer 2) */
    repeating-conic-gradient(
        from 45deg,
        transparent              0% 25%, /* Transparent where primary color will be */
        ${secondaryColorSolid}  25% 50%
    ),
    /* Layer 2: Primary color triangles with opacity (rendered on top) */
    repeating-conic-gradient(
        from 45deg,
        ${patternColorWithOpacity} 0% 25%, /* Primary color with opacity */
        transparent               25% 50%  /* Transparent, revealing layer 1 or background */
    );

/* Apply the size to both layers */
background-size: ${size}px ${size}px;
`.trim();
}


function generateChevronPattern(settings: PatternSettings): string {
  const { patternSize = 40, lineWidth = 2, patternColor, backgroundColor, direction = 'horizontal', opacity = 1 } = settings;
  const size = Math.max(lineWidth * 2, patternSize);
  const halfSize = size / 2;
  const effectiveLineWidth = Math.max(1, lineWidth);
  const colorWithOpacity = applyOpacityToHexColor(patternColor, opacity);

  // Angles based on direction
  // Horizontal: V shapes point up/down
  // Vertical: < shapes point left/right
  const angle1 = direction === 'horizontal' ? -45 : 45;
  const angle2 = direction === 'horizontal' ? 45 : 135;

  // Calculate stops for line width
  const lineOffset = effectiveLineWidth / Math.sqrt(2);

  // Use repeating gradients for continuous chevron lines
  return `
background-color: ${backgroundColor};
background-image:
  repeating-linear-gradient(${angle1}deg,
      transparent 0, transparent ${halfSize - lineOffset}px,
      ${colorWithOpacity} ${halfSize - lineOffset}px, ${colorWithOpacity} ${halfSize + lineOffset}px,
      transparent ${halfSize + lineOffset}px, transparent ${size}px
  ),
  repeating-linear-gradient(${angle2}deg,
      transparent 0, transparent ${halfSize - lineOffset}px,
      ${colorWithOpacity} ${halfSize - lineOffset}px, ${colorWithOpacity} ${halfSize + lineOffset}px,
      transparent ${halfSize + lineOffset}px, transparent ${size}px
  );
background-size: ${size}px ${size}px;
`.trim();
}

function generateIsometricPattern(settings: PatternSettings): string {
  const { patternSize = 50, lineWidth = 1, patternColor, backgroundColor, opacity = 1 } = settings;
  const effectiveLineWidth = Math.max(1, lineWidth);
  const colorWithOpacity = applyOpacityToHexColor(patternColor, opacity);
  // Size relates to the distance between parallel lines along the axis
  const size = Math.max(effectiveLineWidth * 3, patternSize);
  const height = size * Math.sqrt(3); // Height of the rhombi formed

  const lineStop = `${colorWithOpacity} ${effectiveLineWidth}px, transparent ${effectiveLineWidth}px`;

  return `
background-color: ${backgroundColor};
background-image:
  linear-gradient(30deg, ${lineStop}),
  linear-gradient(150deg, ${lineStop}),
  linear-gradient(270deg, ${lineStop}); /* Or 90deg for vertical lines */
background-size: ${size}px ${height}px; /* Repeating unit size */
/* Center lines */
background-position: -${effectiveLineWidth / 2}px -${effectiveLineWidth / 2}px;
`.trim();
// Previous size was 2*size, 2*height, which might be too large. Let's try this.
}

function generateHoundstoothPattern(settings: PatternSettings): string { // NEW
    const { patternSize = 40, patternColor, backgroundColor, secondaryColor } = settings;
    const size = Math.max(8, patternSize); // Needs a minimum size
    const s = size / 4; // Unit size for squares

    return `
background-color: ${backgroundColor}; /* Fallback */
background-image: linear-gradient(45deg, ${secondaryColor} 25%, transparent 25%),
                  linear-gradient(-45deg, ${secondaryColor} 25%, transparent 25%),
                  linear-gradient(45deg, transparent 75%, ${secondaryColor} 75%),
                  linear-gradient(-45deg, transparent 75%, ${secondaryColor} 75%);
background-size: ${size}px ${size}px;
background-position: 0 0, ${s*2}px ${s*2}px, ${s*2}px ${s*2}px, 0 0;
/* Overlay the main color squares */
/* Unfortunately, true CSS houndstooth without SVG or pseudo-elements is hard. */
/* This creates a diamond pattern, which is related but not true houndstooth. */
/* A better approach might use multiple backgrounds with careful sizing and positioning */
/* Or a more complex gradient setup. For now, this is a placeholder. */

/* Alternative attempt (more complex): */
background-image:
  /* Base check */
  linear-gradient(45deg, ${patternColor} 25%, ${secondaryColor} 25%, ${secondaryColor} 75%, ${patternColor} 75%),
  linear-gradient(45deg, ${patternColor} 25%, ${secondaryColor} 25%, ${secondaryColor} 75%, ${patternColor} 75%);
background-size: ${size}px ${size}px;
background-position: 0 0, ${size/2}px ${size/2}px;

/* Need to add the "hooks" - This is very difficult with pure gradients */
/* Consider SVG for a true Houndstooth */
`.trim();
}


// --- Textures & Noise ---

function generateNoisePattern(settings: PatternSettings): string {
  const { patternSize = 64, backgroundColor, opacity = 1, contrast = 0.5, density = 0.5 } = settings;
  // Use density to control baseFrequency: Higher density = higher frequency = finer noise
  const baseFrequency = 0.1 + density * 0.9; // Range 0.1 to 1.0
  // Use contrast to control slope: Higher contrast = steeper slope
  const contrastValue = 0.5 + contrast * 2.5; // Range 0.5 to 3.0 (adjust multiplier as needed)
  const intercept = 0.5 - contrastValue * 0.5; // Center the brightness

  // Inline SVG with feTurbulence
  const svg = `<svg viewBox='0 0 ${patternSize} ${patternSize}' xmlns='http://www.w3.org/2000/svg'>
  <filter id='noiseFilter'>
    <feTurbulence type='fractalNoise' baseFrequency='${baseFrequency.toFixed(2)}' numOctaves='3' stitchTiles='stitch'/>
    {/* Desaturate */}
    <feColorMatrix type='saturate' values='0'/>
     {/* Adjust contrast */}
    <feComponentTransfer>
      <feFuncR type='linear' slope='${contrastValue.toFixed(2)}' intercept='${intercept.toFixed(2)}'/>
      <feFuncG type='linear' slope='${contrastValue.toFixed(2)}' intercept='${intercept.toFixed(2)}'/>
      <feFuncB type='linear' slope='${contrastValue.toFixed(2)}' intercept='${intercept.toFixed(2)}'/>
    </feComponentTransfer>
  </filter>
  <rect width='100%' height='100%' filter='url(%23noiseFilter)'/>
</svg>`;

  return `
background-color: ${backgroundColor};
background-image: url("data:image/svg+xml,${encodeURIComponent(svg)}");
/* background-size: auto; /* Let SVG tile naturally */
opacity: ${opacity}; /* Apply opacity to the element itself */
`.trim();
}

function generateNetPattern(settings: PatternSettings): string {
  const {
      patternSize = 128,          // Default size based on the target CSS example
      patternColor = '#474bff',   // Default net color from target CSS
      backgroundColor = '#47d3ff', // Default background color from target CSS
      opacity = 1                 // Opacity for the net color
  } = settings;

  // Apply opacity to the primary pattern color (the net lines)
  const netColor = applyOpacityToHexColor(patternColor, opacity);
  const transparentColor = '#0000'; // Use explicit transparent color

  // Ensure a minimum size for calculation stability
  const size = Math.max(10, patternSize); // e.g., minimum 10px

  // --- Define Gradient Layers ---
  // Using the fixed percentages and relative positions from the target CSS
  const gradient1 = `radial-gradient(farthest-side at -33.33% 50%, ${transparentColor} 52%, ${netColor} 54% 57%, ${transparentColor} 59%)`;
  const gradient2 = `radial-gradient(farthest-side at 50% 133.33%, ${transparentColor} 52%, ${netColor} 54% 57%, ${transparentColor} 59%)`;
  const gradient3 = `radial-gradient(farthest-side at 133.33% 50%, ${transparentColor} 52%, ${netColor} 54% 57%, ${transparentColor} 59%)`;
  const gradient4 = `radial-gradient(farthest-side at 50% -33.33%, ${transparentColor} 52%, ${netColor} 54% 57%, ${transparentColor} 59%)`;

  // --- Define Position Offsets ---
  // Using calc() with the dynamic size
  const pos1 = `0 calc(${size}px / 2)`;
  const pos2 = `calc(${size}px / 2) 0`;
  // Gradients 3 and 4 default to '0 0' position, no need to specify

  // --- Define Background Sizes ---
  // Using calc() with the dynamic size and the fixed divisor
  const size1 = `calc(${size}px / 4.667) ${size}px`;
  const size2 = `${size}px calc(${size}px / 4.667)`;

  // --- Assemble the CSS ---
  // Use the 'background' shorthand, placing the backgroundColor last.
  // Combine gradients with their respective positions.
  return `
background:
    ${gradient1} ${pos1},
    ${gradient2} ${pos2},
    ${gradient3},
    ${gradient4},
    ${backgroundColor}; /* Background color acts as the final layer */
background-size: ${size1}, ${size2}; /* Apply the two sizes cyclically */
`.trim();
}

function generateNetv2Pattern(settings: PatternSettings): string {
  const {
      patternSize = 32,          // Default size from example
      patternColor = '#474bff',   // Default dot/connection color from example
      backgroundColor = '#47d3ff', // Default checker/base color from example
      opacity = 1
  } = settings;

  // Ensure minimum size
  const size = Math.max(4, patternSize);

  // Apply opacity ONLY to the patternColor (dots/connections)
  // Keep backgroundColor solid as per the example structure
  const dotColor = applyOpacityToHexColor(patternColor, opacity);
  const bgColor = backgroundColor; // The solid color for checkers and final background
  const transparentColor = '#0000'; // Explicit transparency

  // Pre-calculate common size/position strings using dynamic size
  const halfSizeCalc = `calc(${size}px / 2)`;
  const doubleSizeCalc = `calc(2 * ${size}px)`;
  const layerSizeDouble = `${doubleSizeCalc} ${doubleSizeCalc}`; // Size for main layers
  const layerSizeSingle = `${size}px ${size}px`;          // Size for the last dot layer

  // Define each layer with its gradient, position, and size (using / shorthand)
  const layer1 = `radial-gradient(35.36% 35.36% at 100% 25%, ${transparentColor} 66%, ${dotColor} 68% 70%, ${transparentColor} 72%) ${size}px ${size}px/${layerSizeDouble}`;
  const layer2 = `radial-gradient(35.36% 35.36% at 0 75%, ${transparentColor} 66%, ${dotColor} 68% 70%, ${transparentColor} 72%) ${size}px ${size}px/${layerSizeDouble}`;
  const layer3 = `radial-gradient(35.36% 35.36% at 100% 25%, ${transparentColor} 66%, ${dotColor} 68% 70%, ${transparentColor} 72%) 0 0/${layerSizeDouble}`;
  const layer4 = `radial-gradient(35.36% 35.36% at 0 75%, ${transparentColor} 66%, ${dotColor} 68% 70%, ${transparentColor} 72%) 0 0/${layerSizeDouble}`;
  const layer5 = `repeating-conic-gradient(${bgColor} 0 25%, ${transparentColor} 0 50%) 0 0/${layerSizeDouble}`;
  const layer6 = `radial-gradient(${transparentColor} 66%, ${dotColor} 68% 70%, ${transparentColor} 72%) 0 ${halfSizeCalc}/${layerSizeSingle}`;

  // Assemble the final CSS using the 'background' shorthand
  // List all layers, comma-separated, followed by the final solid background color
  return `
background:
    ${layer1},
    ${layer2},
    ${layer3},
    ${layer4},
    ${layer5},
    ${layer6},
    ${bgColor}; /* Final background color layer */
`.trim();
  // Note: background-size is defined per-layer in this CSS structure,
  // so no separate background-size property is needed here.
}


function generateWavesPattern(settings: PatternSettings): string { // REVISED - SVG Approach
  const { patternSize = 100, lineWidth = 2, patternColor, backgroundColor, amplitude = 10, direction = 'horizontal', opacity = 1 } = settings;

  const effectiveLineWidth = Math.max(1, lineWidth);
  const effectiveAmplitude = Math.max(1, amplitude);
  const size = Math.max(20, patternSize); // Minimum size for a wave cycle
  const colorWithOpacity = applyOpacityToHexColor(patternColor, opacity);

  // SVG Path data for one wave cycle
  // M = move to, Q = quadratic bezier curve (control point, end point)
  // Control points create the crest and trough
  const halfSize = size / 2;
  const pathData = direction === 'horizontal'
    ? `M 0 ${effectiveAmplitude} Q ${halfSize/2} ${-effectiveAmplitude/2}, ${halfSize} ${effectiveAmplitude} T ${size} ${effectiveAmplitude}`
    : `M ${effectiveAmplitude} 0 Q ${-effectiveAmplitude/2} ${halfSize/2}, ${effectiveAmplitude} ${halfSize} T ${effectiveAmplitude} ${size}`;

    // Viewbox needs to match the path dimensions for tiling
    const viewBoxW = direction === 'horizontal' ? size : effectiveAmplitude * 2 + effectiveLineWidth;
    const viewBoxH = direction === 'horizontal' ? effectiveAmplitude * 2 + effectiveLineWidth: size;


  const svg = `<svg viewBox='0 0 ${viewBoxW} ${viewBoxH}' xmlns='http://www.w3.org/2000/svg'>
    <path d='${pathData}' fill='none' stroke='${colorWithOpacity}' stroke-width='${effectiveLineWidth}'/>
</svg>`;

  return `
background-color: ${backgroundColor};
background-image: url("data:image/svg+xml,${encodeURIComponent(svg)}");
background-size: ${direction === 'horizontal' ? size : effectiveAmplitude*2}px ${direction === 'horizontal' ? effectiveAmplitude*2 : size}px; /* Adjust size based on direction */
`.trim();
}

function generateCircuitPattern(settings: PatternSettings): string {
  const { patternSize = 50, lineWidth = 1, patternColor, backgroundColor, density = 0.5, opacity = 1 } = settings;
  const colorWithOpacity = applyOpacityToHexColor(patternColor, opacity * 0.8); // Make lines slightly transparent
  const dotColor = applyOpacityToHexColor(patternColor, opacity); // Dots more solid
  const size = Math.max(10, patternSize);
  const halfSize = size / 2;
  const quarterSize = size / 4;
  const effectiveLineWidth = Math.max(1, lineWidth);
  const dotSize = Math.max(1, effectiveLineWidth * 1.2); // Slightly larger dots

  // Base grid
  const baseGrid = [
    `linear-gradient(90deg, ${colorWithOpacity} ${effectiveLineWidth}px, transparent ${effectiveLineWidth}px)`, // Vertical
    `linear-gradient(0deg, ${colorWithOpacity} ${effectiveLineWidth}px, transparent ${effectiveLineWidth}px)`, // Horizontal
    // Dots at intersections (using multiple radial gradients for corners and centers)
    `radial-gradient(circle ${dotSize}px at 0 0, ${dotColor} 99%, transparent 100%)`, // Top-left
    `radial-gradient(circle ${dotSize}px at ${halfSize}px ${halfSize}px, ${dotColor} 99%, transparent 100%)`, // Center
    `radial-gradient(circle ${dotSize}px at ${size}px ${size}px, ${dotColor} 99%, transparent 100%)`, // Bottom-right (might be clipped depending on position)
    `radial-gradient(circle ${dotSize}px at 0 ${size}px, ${dotColor} 99%, transparent 100%)`, // Bottom-left
    `radial-gradient(circle ${dotSize}px at ${size}px 0, ${dotColor} 99%, transparent 100%)`, // Top-right
  ];

  // Add extra lines based on density
  let extraLines: string[] = [];
  // Density 0.0 - 0.2: No extra lines
  if (density > 0.2) { // Add 45deg segment
    extraLines.push(`linear-gradient(45deg, transparent ${quarterSize}px, ${colorWithOpacity} ${quarterSize}px, ${colorWithOpacity} ${quarterSize + effectiveLineWidth}px, transparent ${quarterSize + effectiveLineWidth}px )`);
  }
  if (density > 0.4) { // Add -45deg segment offset
     extraLines.push(`linear-gradient(-45deg, transparent ${halfSize}px, ${colorWithOpacity} ${halfSize}px, ${colorWithOpacity} ${halfSize + effectiveLineWidth}px, transparent ${halfSize + effectiveLineWidth}px )`);
  }
  if (density > 0.6) { // Add offset horizontal line
     extraLines.push(`linear-gradient(0deg, transparent ${quarterSize * 3}px, ${colorWithOpacity} ${quarterSize * 3}px, ${colorWithOpacity} ${quarterSize * 3 + effectiveLineWidth}px, transparent ${quarterSize * 3 + effectiveLineWidth}px )`);
  }
   if (density > 0.8) { // Add offset vertical line
     extraLines.push(`linear-gradient(90deg, transparent ${quarterSize}px, ${colorWithOpacity} ${quarterSize}px, ${colorWithOpacity} ${quarterSize + effectiveLineWidth}px, transparent ${quarterSize + effectiveLineWidth}px )`);
  }

  const allGradients = [...baseGrid, ...extraLines];

  return `
background-color: ${backgroundColor};
background-image: ${allGradients.join(',\n  ')};
background-size: ${size}px ${size}px;
/* Align grid lines */
background-position: -${effectiveLineWidth / 2}px -${effectiveLineWidth / 2}px;
`.trim();
}


// --- 3D Effects ---

function generateCubesPattern(settings: PatternSettings): string {
  const {
      patternSize = 64,
      patternColor = '#474bff',
      backgroundColor = '#47d3ff',
      opacity = 0.5 // Default opacity for shaded layers
  } = settings;

  const size = Math.max(10, patternSize);
  const height = size * 1.75;
  const halfSize = size / 2;
  const halfHeight = height / 2;
  const positionOffset = `${halfSize}px ${halfHeight}px`;

  const bgColor = backgroundColor;
  const primarySolidColor = patternColor; // SOLID color for layers 1-4
  // SHADED color calculation for layers 5-6
  const primaryShadedColor = applyOpacityToHexColor(patternColor, opacity);
  const transparentKeyword = 'transparent';

  // Layers 1-4 use primarySolidColor
  const grad1_4_base = `12%, ${transparentKeyword} 12.5%, ${transparentKeyword} 87%, ${primarySolidColor} 87.5%, ${primarySolidColor}`;
  const layer1 = `linear-gradient(30deg, ${primarySolidColor} ${grad1_4_base})`;
  const layer2 = `linear-gradient(150deg, ${primarySolidColor} ${grad1_4_base})`;
  const layer3 = layer1;
  const layer4 = layer2;

  // Layers 5-6 use primaryShadedColor (THIS IS THE CRUCIAL PART)
  const grad5_6_base = `25%, ${transparentKeyword} 25.5%, ${transparentKeyword} 75%, ${primaryShadedColor} 75%, ${primaryShadedColor}`;
  const layer5 = `linear-gradient(60deg, ${primaryShadedColor} ${grad5_6_base})`; // Uses shaded
  const layer6 = layer5; // Also uses shaded

  return `
background-color: ${bgColor};
background-image:
${layer1},
${layer2},
${layer3},
${layer4},
${layer5}, /* This uses primaryShadedColor */
${layer6}; /* This uses primaryShadedColor */
background-size: ${size}px ${height}px;
background-position: 0 0, 0 0, ${positionOffset}, ${positionOffset}, 0 0, ${positionOffset};
`.trim();
}

function generate3DRoomsPattern(settings: PatternSettings): string {
  const {
    patternSize = 32,
    patternColor = '#47d3ff',   // Maps to the color in the simple conic gradients
    secondaryColor = '#474bff', // Maps to the darker color in the complex conic gradient
    backgroundColor = '#adafff', // Maps to the lighter color in the complex conic gradient
    opacity = 1.0
} = settings;

// Ensure minimum size
const size = Math.max(4, patternSize);

// Calculate dynamic sizes and positions
const bgWidth = size * 2;
const bgHeight = size * 1;
const offsetX = `calc(3 * ${size}px)`;
const offsetY = `calc(${size}px / 2)`;
const positionOffset = `${offsetX} ${offsetY}`;

// Apply opacity to the pattern colors
const color1 = applyOpacityToHexColor(patternColor, opacity);
const color2 = applyOpacityToHexColor(secondaryColor, opacity);
const color3 = applyOpacityToHexColor(backgroundColor, opacity); // Opacity applied to the "lighter" color too
const transparentColor = '#0000';

// --- Define Gradient Layers (using fixed angles/percentages from example) ---
// Layers 1 & 2 (simple conic, offset)
const grad1_2 = `conic-gradient(from -116.36deg at 25% 75%, ${color1} 52.72deg, ${transparentColor} 0)`;
// Layers 3 & 4 (simple conic, different angle, offset)
const grad3_4 = `conic-gradient(from 63.43deg at 75% 75%, ${color1} 52.72deg, ${transparentColor} 0)`;
// Layer 5 (complex conic)
const grad5 = `conic-gradient(${color3} 63.43deg, ${color2} 0 116.36deg, ${color3} 0 180deg, ${color2} 0 243.43deg, ${color3} 0 296.15deg, ${color2} 0)`;

// Assemble the final CSS using the 'background' shorthand
return `
background:
  ${grad1_2},
  ${grad1_2} ${positionOffset},
  ${grad3_4},
  ${grad3_4} ${positionOffset},
  ${grad5};
background-size: ${bgWidth}px ${bgHeight}px;
`.trim();
// Note: The example CSS doesn't include a final background-color property,
// relying on the gradients to cover the area. Add one if needed.
// background-color: [some fallback];
}

function generateCubesv2Pattern(settings: PatternSettings): string {
  const {
      patternSize = 128,
      patternColor = '#474bff',
      secondaryColor = '#adafff',
      backgroundColor = '#ffffff',
      opacity = 1 // <<< Add opacity, default to 1 (fully opaque)
  } = settings;

  // Ensure minimum size
  const size = Math.max(10, patternSize); // Base width

  // Calculate height based on the fixed ratio
  const height = size * (74 / 128);

  // Calculate position offsets
  const posX = size / 2;
  const posY = height * (36.928 / 74);

  // --- Apply Opacity to Face Colors ---
  const colorDarkFace = applyOpacityToHexColor(patternColor, opacity); // Apply opacity
  const colorLightFace = applyOpacityToHexColor(secondaryColor, opacity); // Apply opacity
  const colorBase = backgroundColor; // Keep base color solid
  const transparentColor = '#0000';

  // --- Define Gradient Layers with Opacity ---
  // Layer 1: Transparent and Base Color (offset) - Base color remains solid
  const layer1Grad = `repeating-conic-gradient(from 30deg, ${transparentColor} 0 120deg, ${colorBase} 0 180deg)`;
  // Layer 2: Uses face colors with applied opacity
  const layer2Grad = `repeating-conic-gradient(from 30deg, ${colorDarkFace} 0 60deg, ${colorLightFace} 0 120deg, ${colorBase} 0 180deg)`;

  // Format position and size strings
  const layer1Pos = `${posX.toFixed(3)}px ${posY.toFixed(3)}px`;
  const bgSize = `${size}px ${height.toFixed(3)}px`;

  // Assemble the final CSS
  return `
background:
    ${layer1Grad} ${layer1Pos},
    ${layer2Grad};
background-size: ${bgSize};
/* Optional base color if needed */
/* background-color: ${colorBase}; */
`.trim();
}

function generatePyramidsPattern(settings: PatternSettings): string {
  const {
      patternSize = 32,          // Default size from example
      patternColor = '#6e5fb5',   // Maps to mid-light color
      secondaryColor = '#2f2754', // Maps to darkest color
      backgroundColor = '#8e82c5', // Maps to lightest color / background fill
      opacity = 1.0
  } = settings;

  // Ensure minimum size
  const size = Math.max(4, patternSize);
  const halfSize = size / 2;

  // Calculate positions dynamically
  const posOffsetLeft = `-${halfSize}px 0`;
  const posOffsetRight = `${halfSize}px 0`;

  // --- Derive Colors with Opacity ---
  const transparentColor = 'transparent'; // Use keyword
  // Darkest color (from secondaryColor)
  const colorDarkest = applyOpacityToHexColor(secondaryColor, opacity);
  // Mid-Dark color (derived by darkening patternColor)
  const midDarkBaseColor = adjustColorLightness(patternColor, -15); // Darken mid-light slightly. Adjust % if needed.
  const colorMidDark = applyOpacityToHexColor(midDarkBaseColor, opacity);
  // Mid-Light color (from patternColor)
  const colorMidLight = applyOpacityToHexColor(patternColor, opacity);
  // Lightest color / Background fill (keep solid)
  const colorLightest = backgroundColor;

  // --- Define Gradient Layers ---
  // Order matches the target CSS
  const layer1 = `linear-gradient(315deg, ${transparentColor} 75%, ${colorDarkest} 0)`;
  const layer2 = `linear-gradient(45deg, ${transparentColor} 75%, ${colorDarkest} 0)`;
  const layer3 = `linear-gradient(135deg, ${colorMidDark} 50%, ${transparentColor} 0)`;
  const layer4 = `linear-gradient(45deg, ${colorMidLight} 50%, ${colorLightest} 0)`;

  // Assemble the final CSS using the 'background' shorthand
  return `
background:
    ${layer1} ${posOffsetLeft},
    ${layer2} ${posOffsetRight},
    ${layer3} 0 0,
    ${layer4} 0 0,
    ${colorLightest};
background-size: ${size}px ${size}px;
`.trim();
}


function generateStepsPattern(settings: PatternSettings): string {
  const {
      patternSize = 32,          // Default size from example
      patternColor = '#47d3ff',   // Map to conic color
      secondaryColor = '#474bff', // Map to darker stripe color
      backgroundColor = 'transparent', // Element background, not used in layers
      opacity = 0.5
  } = settings;

  // Ensure minimum size
  const size = Math.max(4, patternSize);

  // Define colors with opacity
  const transparentColor = '#0000';
  const colorConic = applyOpacityToHexColor(patternColor, opacity);
  const colorStripeDark = applyOpacityToHexColor(secondaryColor, opacity);
  // Derive light stripe color by adjusting secondaryColor lightness, then apply opacity
  const lightStripeBaseColor = adjustColorLightness(secondaryColor, 25); // Adjust lightness % as needed (25% works for #474bff -> #adafff)
  const colorStripeLight = applyOpacityToHexColor(lightStripeBaseColor, opacity);

  // Calculate sizes and positions dynamically
  const totalSizeCalc = `calc(4 * ${size}px)`;
  const pos2 = `${size}px ${size}px`;
  const pos3 = `calc(2 * ${size}px) calc(2 * ${size}px)`;
  const pos4 = `calc(3 * ${size}px) calc(3 * ${size}px)`;

  // Define the gradient layers
  const gradConic = `conic-gradient(at 50% 25%, ${transparentColor} 75%, ${colorConic} 0)`;
  const gradLinear = `repeating-linear-gradient(135deg, ${colorStripeLight} 0 12.5%, ${colorStripeDark} 0 25%)`;

  // Assemble the final CSS using the 'background' shorthand for layers
  // and separate 'background-size'
  return `
/* Optional element background color */
background-color: ${backgroundColor};

background:
    /* Layer 1: Conic at 0 0 (implicit) */
    ${gradConic},
    /* Layer 2: Conic at pos2 */
    ${gradConic} ${pos2},
    /* Layer 3: Conic at pos3 */
    ${gradConic} ${pos3},
    /* Layer 4: Conic at pos4 */
    ${gradConic} ${pos4},
    /* Layer 5: Repeating linear gradient at 0 0 (implicit) */
    ${gradLinear};
background-size: ${totalSizeCalc} ${totalSizeCalc}; /* Applies to all layers */
`.trim();
}


// --- Woven & Fabric ---

function generateCarbonFiberPattern(settings: PatternSettings): string { // REVISED
  const { patternSize = 24, patternColor, backgroundColor, weave = 0.5, opacity = 1 } = settings;
  const size = Math.max(8, patternSize);
  const colorWithOpacity = applyOpacityToHexColor(patternColor, opacity * 0.6); // Base weave slightly transparent
  const highlightColor = applyOpacityToHexColor(adjustColorLightness(patternColor, 10 + weave * 15), opacity * 0.8); // Subtle highlight

  // Weave controls the size of the segments relative to patternSize
  const segmentBase = size / 4; // Base segment size
  const weaveSize = Math.max(1, segmentBase * (0.5 + weave)); // Segment size affected by weave slider

  return `
background-color: ${backgroundColor};
background-image:
  /* Base weave pattern */
  linear-gradient(45deg, ${colorWithOpacity} 25%, transparent 25%, transparent 75%, ${colorWithOpacity} 75%),
  linear-gradient(45deg, ${colorWithOpacity} 25%, transparent 25%, transparent 75%, ${colorWithOpacity} 75%),
  /* Subtle highlight overlay */
  linear-gradient(-45deg, transparent 20%, ${highlightColor} 20%, ${highlightColor} 30%, transparent 30%, transparent 70%, ${highlightColor} 70%, ${highlightColor} 80%, transparent 80%);

background-size:
  ${weaveSize * 2}px ${weaveSize * 2}px, /* Base weave layer 1 */
  ${weaveSize * 2}px ${weaveSize * 2}px, /* Base weave layer 2 (offset) */
  ${size}px ${size}px; /* Highlight layer */

background-position:
  0 0, /* Base layer 1 */
  ${weaveSize}px ${weaveSize}px, /* Base layer 2 offset */
  0 0; /* Highlight layer */
`.trim();
}

function generateArgylePattern(settings: PatternSettings): string { // NEW
    const { patternSize = 80, lineWidth = 1, patternColor, backgroundColor, secondaryColor } = settings;
    // patternColor = diamond fill, secondaryColor = crossing lines, backgroundColor = background
    const size = Math.max(lineWidth * 4, patternSize); // Size of the diamond unit
    const halfSize = size / 2;
    const effectiveLineWidth = Math.max(1, lineWidth);
    const lineOffset = effectiveLineWidth / Math.sqrt(2); // Approx width on diagonal

    // Base diamond grid (using background color and pattern color)
    const diamondGrad1 = `linear-gradient(45deg, ${backgroundColor} 25%, ${patternColor} 25%, ${patternColor} 75%, ${backgroundColor} 75%)`;
    const diamondGrad2 = `linear-gradient(45deg, ${backgroundColor} 25%, ${patternColor} 25%, ${patternColor} 75%, ${backgroundColor} 75%)`;

    // Crossing lines (using secondary color)
    const lineGrad1 = `repeating-linear-gradient(45deg,
                        transparent 0, transparent ${halfSize - lineOffset}px,
                        ${secondaryColor} ${halfSize - lineOffset}px, ${secondaryColor} ${halfSize + lineOffset}px,
                        transparent ${halfSize + lineOffset}px, transparent ${size}px)`;
    const lineGrad2 = `repeating-linear-gradient(-45deg,
                        transparent 0, transparent ${halfSize - lineOffset}px,
                        ${secondaryColor} ${halfSize - lineOffset}px, ${secondaryColor} ${halfSize + lineOffset}px,
                        transparent ${halfSize + lineOffset}px, transparent ${size}px)`;

    return `
background-color: ${backgroundColor};
background-image:
  /* Diamonds Layer */
  ${diamondGrad1},
  ${diamondGrad2},
  /* Lines Layer (on top) */
  ${lineGrad1},
  ${lineGrad2};
background-size:
  ${size}px ${size}px, /* Diamond 1 */
  ${size}px ${size}px, /* Diamond 2 */
  ${size}px ${size}px, /* Line 1 */
  ${size}px ${size}px; /* Line 2 */
background-position:
  0 0, /* Diamond 1 */
  ${halfSize}px ${halfSize}px, /* Diamond 2 (offset) */
  0 0, /* Line 1 */
  0 0; /* Line 2 */
`.trim();
}

function generateBasketWeavePattern(settings: PatternSettings): string { // NEW
    const { patternSize = 20, patternColor, backgroundColor, secondaryColor } = settings;
    // patternSize = width of each band
    const size = Math.max(4, patternSize);
    const doubleSize = size * 2;

    // Horizontal bands (patternColor over secondaryColor)
    const horizontal = `linear-gradient(to bottom,
                            ${patternColor} 0, ${patternColor} ${size}px,
                            ${secondaryColor} ${size}px, ${secondaryColor} ${doubleSize}px)`;
    // Vertical bands (secondaryColor over patternColor - creating the weave)
    const vertical = `linear-gradient(to right,
                          transparent 0, transparent ${size}px,
                          ${patternColor} ${size}px, ${patternColor} ${doubleSize}px),
                      linear-gradient(to right,
                          ${secondaryColor} 0, ${secondaryColor} ${size}px,
                          transparent ${size}px, transparent ${doubleSize}px)`;


    return `
background-color: ${backgroundColor}; /* Fallback */
background-image:
  ${horizontal},
  ${vertical};
background-size: ${doubleSize}px ${doubleSize}px; /* Repeating unit is 2x2 bands */
`.trim();
}

function generateDropWavesPattern(settings: PatternSettings): string {
  const {
      patternSize = 32,          // Default size from example's 32px
      patternColor = '#474bff',   // Maps to inner gradient & ring color
      secondaryColor = '#47d3ff', // Maps to outer gradient color
      backgroundColor = '#47d3ff', // Maps to base background color
      opacity = 1.0
  } = settings;

  // Ensure minimum size
  const size = Math.max(4, patternSize); // This is the ring thickness/inner stop

  // Apply opacity only to the primary color (rings and inner gradient)
  const color1WithOpacity = applyOpacityToHexColor(patternColor, opacity);
  // Keep secondary and background colors solid as per the example's effect
  const color2Solid = secondaryColor;
  const bgColorSolid = backgroundColor;

  // Define the gradient layers
  // Layer 1: Base radial gradient
  const layer1Grad = `radial-gradient(circle at center center, ${color1WithOpacity}, ${color2Solid})`;

  // Layer 2: Repeating radial rings
  // Ring of color1 from 0 to size px, then transparent from size px to size*2 px
  const ringStop = `${size}px`;
  const gapStop = `${size * 2}px`;
  const layer2Grad = `repeating-radial-gradient(circle at center center, ${color1WithOpacity}, ${color1WithOpacity} ${ringStop}, transparent ${gapStop}, transparent ${ringStop})`;

  // Assemble the final CSS
  // Note: background-size is not needed as the repeating gradient defines its own implicit size
  return `
background-color: ${bgColorSolid};
background-image: ${layer1Grad}, ${layer2Grad};
background-blend-mode: multiply;
`.trim();
}

function generateDropWavesv2Pattern(settings: PatternSettings): string {
  const {
      patternSize = 32,          // Default size/radius from example
      patternColor = '#fdaeb5',   // Maps to circle color & background
      secondaryColor = '#2f2754', // Maps to solid linear gradient layer
      backgroundColor = '#fdaeb5', // Maps to base background color (matches patternColor here)
      opacity = 1.0
  } = settings;

  // Ensure minimum size for radius
  const radius = Math.max(1, patternSize);

  // Apply opacity only to the primary color (the circles)
  const colorCircles = applyOpacityToHexColor(patternColor, opacity);
  // Keep secondary and background colors solid
  const colorSolidLayer = secondaryColor;
  const bgColorSolid = backgroundColor; // Use the explicit background setting

  // Define the gradient layers
  // Layer 1: Repeating circles from top-left
  const layer1Grad = `repeating-radial-gradient(circle at 0 0, transparent 0, ${colorCircles} ${radius}px)`;

  // Layer 2: Solid color layer (using repeating-linear-gradient as in example)
  const layer2Grad = `repeating-linear-gradient(${colorSolidLayer}, ${colorSolidLayer})`;

  // Assemble the final CSS - matches the example structure
  return `
background-color: ${bgColorSolid};
background-image: ${layer1Grad}, ${layer2Grad};
`.trim();
  // Note: No background-size or blend-mode needed for this specific target CSS
}