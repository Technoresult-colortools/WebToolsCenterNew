// /types/svg-builder.d.ts
declare module 'svg-builder' {
    export class SVGBuilder {
      constructor();
      width(value: number): this;
      height(value: number): this;
      viewBox(value: string): this;
      element(name: string, attributes: Record<string, string>): this;
      render(): string;
    }
  }