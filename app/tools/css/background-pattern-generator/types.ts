export interface PatternType {
    id: string;
    name: string;
    category: string;
    description: string;
    hasSize?: boolean;
    hasDotSize?: boolean;
    hasLineWidth?: boolean;
    hasDirection?: boolean;
    hasAmplitude?: boolean;
    hasFrequency?: boolean;
    hasDepth?: boolean;
    hasRotation?: boolean;
    hasOpacity?: boolean;
    hasStagger?: boolean;
    hasSpacing?: boolean;
    hasContrast?: boolean;
    hasColorAlt?: boolean;
    hasLighting?: boolean;
    hasDensity?: boolean;
    hasWeave?: boolean;
    // **** ADD THIS LINE ****
    defaultSettings?: Partial<PatternSettings>; // Defaults specific to this pattern
  }

  // Keep your PatternSettings interface as is, or consider making fields optional:
  export interface PatternSettings {
    patternType: string;
    patternColor: string;
    backgroundColor: string;
    secondaryColor: string;
    // Consider making these optional '?' if your logic handles defaults well
    patternSize: number;
    dotSize: number;
    lineWidth: number;
    direction: string; // Or 'horizontal' | 'vertical' | 'diagonal'
    amplitude: number;
    frequency: number;
    depth: number;
    rotation: number;
    opacity: number;
    stagger: boolean;
    spacing: number;
    contrast: number;
    lighting: number;
    density: number;
    weave: number;
  }