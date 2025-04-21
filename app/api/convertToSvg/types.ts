// app/api/convertToSvg/types.ts

export interface ConversionRequest {
  file: string;
  options?: {
    color?: 'black' | 'color';
    turdSize?: number;
    threshold?: number;
    optCurve?: boolean;
    optTolerance?: number;
    conversionMethod?: 'default' | 'traced' | 'pixel';
  };
}

export interface PotraceOptions {
  turnPolicy?: 'black' | 'white' | 'left' | 'right' | 'minority' | 'majority';
  turdSize?: number;
  alphaMax?: number;
  optCurve?: boolean;
  optTolerance?: number;
  threshold?: number;
  blackOnWhite?: boolean;
  color?: string;
  background?: string;
}