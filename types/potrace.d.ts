// /types/potrace.d.ts
declare module 'potrace' {
    export interface PotraceOptions {
      threshold?: number;
      turdSize?: number;
      optCurve?: boolean;
      alphaMax?: number;
      optTolerance?: number;
    }
  
    export function trace(
      input: Buffer,
      options: PotraceOptions,
      callback: (err: Error | null, svg: string) => void
    ): void;
  }