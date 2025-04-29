// src/components/tools/background-pattern-generator/patternTypes.ts
import { PatternType, PatternSettings } from './types';

export const patternCategories = [
  { id: "basic", name: "Basic Shapes" },
  { id: "lines-grids", name: "Lines & Grids" },
  { id: "geometric", name: "Geometric" },
  { id: "textures", name: "Textures & Abstract" },
  { id: "3d-effects", name: "3D Effects" },
  { id: "woven", name: "Woven & Fabric" },
];

export const patternTypes: PatternType[] = [
  // --- Basic Shapes ---
  {
    id: "dots",
    name: "Dots",
    description: "Simple circular dots arranged in a grid. Can be staggered.",
    category: "basic",
    hasSize: true, hasDotSize: true, hasOpacity: true, hasStagger: true, hasColorAlt: false,
    defaultSettings: {
      patternSize: 32,
      dotSize: 4,
      opacity: 0.8,
      stagger: false,
    }
  },
  {
    id: "pluses",
    name: "Pluses / Crosses",
    description: "Plus symbols (+) formed by intersecting lines.",
    category: "basic",
    hasSize: true, hasLineWidth: true, hasOpacity: true, hasColorAlt: false,
    defaultSettings: {
        patternSize: 64,
        lineWidth: 2,
        opacity: 1.0,
    }
  },
  {
    id: "checkerboard",
    name: "Checkerboard",
    description: "Classic alternating squares of two colors.",
    category: "basic",
    hasSize: true, hasOpacity: false, hasColorAlt: true,
    defaultSettings: {
        patternSize: 32,
    }
  },
  {
    id: "bigplus",
    name: "Big Plus",
    description: "Alternating conic gradient elements in a geometric arrangement.",
    category: "basic",
    hasSize: true, hasOpacity: true, hasColorAlt: false,
    defaultSettings: {
        patternSize: 32,
        opacity: 1.0,
    }
  },

  // --- Lines & Grids ---
  {
    id: "lines",
    name: "Lines",
    description: "Parallel lines with adjustable thickness, spacing, and direction.",
    category: "lines-grids",
    hasLineWidth: true, hasDirection: true, hasSpacing: true, hasOpacity: true, hasRotation: true,
    defaultSettings: {
        lineWidth: 1,
        direction: 'horizontal',
        spacing: 5,
        opacity: 1.0,
        rotation: 0,
    }
  },
  {
    id: "grid",
    name: "Grid",
    description: "A simple grid formed by horizontal and vertical lines.",
    category: "lines-grids",
    hasSize: true, hasLineWidth: true, hasOpacity: true, hasRotation: true,
    defaultSettings: {
        patternSize: 32,
        lineWidth: 1,
        opacity: 1.0,
        rotation: 0,
    }
  },
  {
    id: "zigzag2",
    name: "ZigZag Sharp",
    description: "Sharp-edged zigzag pattern with pointed angles.",
    category: "lines-grids",
    hasSize: true, hasOpacity: true, hasColorAlt: false, hasDirection: true, // Added direction
    defaultSettings: {
        patternSize: 32,
        opacity: 1.0,
        direction: 'horizontal',
    }
  },
  {
    id: "stripes",
    name: "Stripes",
    description: "Repeating stripes of two alternating colors.",
    category: "lines-grids",
    hasSize: true, hasLineWidth: true, hasDirection: true, hasOpacity: false, hasColorAlt: true,
    defaultSettings: {
        patternSize: 32,
        lineWidth: 16, // Default is half the size
        direction: 'horizontal',
    }
  },
  {
    id: "blueprint",
    name: "Blueprint Grid",
    description: "Grid with fine/coarse lines and dots, resembling blueprint paper.",
    category: "lines-grids",
    hasSize: true, hasLineWidth: true, hasOpacity: true, hasDensity: true,
    defaultSettings: {
        patternSize: 20,
        lineWidth: 2,
        opacity: 1.0,
        density: 0.5,
    }
  },
   {
    id: "zig-zag",
    name: "Zig Zag",
    description: "Continuous zig-zag or chevron-like lines.",
    category: "lines-grids",
    hasSize: true, hasLineWidth: true, hasDirection: true, hasOpacity: true,
    defaultSettings: {
        patternSize: 40,
        lineWidth: 2,
        direction: 'horizontal',
        opacity: 1.0,
    }
  },

  // --- Geometric ---
  {
    id: "triangles",
    name: "Triangles",
    description: "Pattern composed of interlocking triangles (formed by diagonal lines).",
    category: "geometric",
    hasSize: true, hasOpacity: true, hasColorAlt: false,
    defaultSettings: {
        patternSize: 40,
        opacity: 1.0,
    }
  },
  {
    id: "hexagons",
    name: "Hexagons",
    description: "Tiling pattern of regular hexagons outlined by lines.",
    category: "geometric",
    hasSize: true, hasLineWidth: true, hasOpacity: true, hasColorAlt: true,
    defaultSettings: {
        patternSize: 32,
        lineWidth: 2, // Example default line width
        opacity: 1.0,
    }
  },
  {
    id: "diamonds",
    name: "Diamonds (Conic)",
    description: "Alternating triangles forming a diamond pattern using conic gradients.",
    category: "geometric",
    hasSize: true, hasOpacity: true, hasColorAlt: true,
    defaultSettings: {
        patternSize: 32,
        opacity: 1.0,
    }
  },
  {
    id: "chevron",
    name: "Chevron",
    description: "Stacked V-shapes creating a classic chevron pattern.",
    category: "geometric",
    hasSize: true, hasLineWidth: true, hasDirection: true, hasOpacity: true,
    defaultSettings: {
        patternSize: 40,
        lineWidth: 2,
        direction: 'horizontal',
        opacity: 1.0,
    }
  },
  {
    id: "isometric",
    name: "Isometric Grid",
    description: "Grid lines (horizontal, 30°, 150°) suitable for isometric views.",
    category: "geometric",
    hasSize: true, hasLineWidth: true, hasOpacity: true,
    defaultSettings: {
        patternSize: 50,
        lineWidth: 11,
        opacity: 1.0,
    }
  },
   {
    id: "houndstooth",
    name: "Houndstooth",
    description: "Classic broken check pattern (CSS version may be approximate).",
    category: "geometric",
    hasSize: true, hasOpacity: false, hasColorAlt: true,
    defaultSettings: {
        patternSize: 40,
    }
  },

  // --- Textures & Abstract ---
  {
    id: "noise",
    name: "Noise / Grain",
    description: "Subtle noise or grain texture using SVG filters.",
    category: "textures",
    hasSize: true, hasOpacity: true, hasContrast: true, hasDensity: true,
    defaultSettings: {
        patternSize: 64, // Note: Doesn't change grain appearance, just SVG tile
        opacity: 0.2, // Noise is usually subtle
        contrast: 0.5,
        density: 0.5,
    }
  },
  {
    id: "waves",
    name: "Waves",
    description: "Stylized flowing wavy lines created with SVG paths.",
    category: "textures",
    hasSize: true, hasLineWidth: true, hasAmplitude: true, hasDirection: true, hasOpacity: true,
    defaultSettings: {
        patternSize: 100,
        lineWidth: 2,
        amplitude: 10,
        direction: 'horizontal',
        opacity: 1.0,
    }
  },
  {
    id: "net",
    name: "Net",
    description: "Interlocking circular segments resembling a net, created with radial gradients.",
    category: "textures",
    hasSize: true, hasOpacity: true, hasColorAlt: false,
    defaultSettings: {
        patternSize: 128,
        opacity: 1.0,
    }
  },
  {
    id: "netv2",
    name: "Net v2",
    description: "Checkered pattern with rounded connections using radial and conic gradients.",
    category: "textures",
    hasSize: true, hasOpacity: true, hasColorAlt: false,
    defaultSettings: {
        patternSize: 32,
        opacity: 1.0,
    }
  },
  {
    id: "circuit",
    name: "Circuit Board",
    description: "Abstract pattern resembling electronic circuit traces with lines and dots.",
    category: "textures",
    hasSize: true, hasLineWidth: true, hasOpacity: true, hasDensity: true,
    defaultSettings: {
        patternSize: 50,
        lineWidth: 1,
        opacity: 1.0,
        density: 0.5,
    }
  },

  // --- 3D Effects ---
  {
    id: "cubes",
    name: "Cubes (Overlapping)",
    description: "Overlapping geometric shapes forming a 3D cube-like illusion using transparency.",
    category: "3d-effects",
    hasSize: true, hasOpacity: true, hasColorAlt: false,
    defaultSettings: {
        patternSize: 64,
        opacity: 0.5,
    }
  },
  {
    id: "cubesv2",
    name: "Cubes v2",
    description: "Geometric pattern resembling isometric blocks using repeating conic gradients.",
    category: "3d-effects",
    hasSize: true, hasOpacity: true, hasColorAlt: true,
    defaultSettings: {
        patternSize: 128,
        opacity: 1.0,
    }
  },
  {
    id: "pyramids", // Keep ID as requested
    name: "Pyramids (Shaded)", // New name to reflect structure
    description: "Offset triangular shapes creating a shaded pyramid or diamond illusion.",
    category: "3d-effects", // Or "geometric"
    hasSize: true,        // Controls the base size (32px)
    hasOpacity: true,     // Opacity applies to the 3 gradient colors
    hasColorAlt: true,    // Uses secondaryColor for the darkest shade
    // hasLighting: false, // Not using a separate lighting slider
    defaultSettings: {
        patternSize: 32,  // Default size from example
        opacity: 0.6,     // Default to solid
        // Note: Defaults for patternColor, secondaryColor, backgroundColor
        // will come from BASE_INITIAL_SETTINGS or user selection
    }
    
  },
  {
    id: "steps",
    name: "Steps (Conic)", // Updated name based on function
    description: "Overlapping conic elements creating steps above a diagonal stripe background.",
    category: "3d-effects",
    hasSize: true, hasOpacity: true, hasColorAlt: true,
    defaultSettings: {
        patternSize: 32,
        opacity: 0.7, // Defaulting to solid for steps pattern
    }
  },
  {
    id: "rooms3d", // Use "weave" as the ID
    name: "3D Room (Conic)",
    description: "Interlocking segments created with multiple offset conic gradients.",
    category: "3d-effects", // Or "geometric"
    hasSize: true,        // Controls the base size (32px in example)
    hasOpacity: true,     // Opacity applies to the pattern colors
    hasColorAlt: true,    // Uses secondaryColor for one part of the weave
    // hasLighting: false, // Not applicable
    defaultSettings: {
        patternSize: 32,  // Default size based on example
        opacity: 1.0,     // Default to solid
    }
  },

  // --- Woven & Fabric ---
  {
    id: "carbon",
    name: "Carbon Fiber",
    description: "Pattern mimicking woven carbon fiber with subtle highlights.",
    category: "woven",
    hasSize: true, hasOpacity: true, hasWeave: true, hasColorAlt: false,
    defaultSettings: {
        patternSize: 24,
        opacity: 1.0,
        weave: 0.5,
    }
  },
  {
    id: "argyle",
    name: "Argyle",
    description: "Classic pattern with diamonds and crossing lines.",
    category: "woven",
    hasSize: true, hasLineWidth: true, hasOpacity: false, hasColorAlt: true,
    defaultSettings: {
        patternSize: 80,
        lineWidth: 1,
    }
  },
   {
    id: "basket-weave",
    name: "Basket Weave",
    description: "Interlacing horizontal and vertical bands of two colors.",
    category: "woven",
    hasSize: true, hasOpacity: false, hasColorAlt: true,
    defaultSettings: {
        patternSize: 20, // Represents band width
    }
  },



  {
    id: "dropwaves", // Lowercase ID as per convention
    name: "Drop Waves",
    description: "Concentric rings blended over a radial gradient, creating a ripple effect.",
    category: "woven", // Or maybe "abstract"
    hasSize: true,        // Controls the ring size (32px in example)
    hasOpacity: true,     // Controls opacity of the rings and inner gradient color
    hasColorAlt: false,    // Uses secondaryColor for the outer gradient color
    defaultSettings: {
        patternSize: 32,  // Default size for the rings
        opacity: 1.0,     // Default to solid rings
    }
  },
  {
    id: "dropwavesv2",
    name: "Drop Waves v2",
    description: "Repeating circles from corner over a solid color layer.",
    category: "woven", // Or "abstract"
    hasSize: true,        // Controls the circle radius (32px)
    hasOpacity: true,     // Controls opacity of the circles (patternColor)
    hasColorAlt: true,    // Uses secondaryColor for the solid layer
    defaultSettings: {
        patternSize: 32,  // Default radius for the circles
        opacity: 1.0,     // Default to solid circles
        // Note: Defaults for patternColor, secondaryColor, backgroundColor
        // will come from BASE_INITIAL_SETTINGS or user selection
    }
  },
];

export function getPatternsByCategory(categoryId: string): PatternType[] {
  return patternTypes.filter(pattern => pattern.category === categoryId);
}