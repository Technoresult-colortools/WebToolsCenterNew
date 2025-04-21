declare module 'imagetracerjs' {
    interface ImagetracerOptions {
      colorsampling?: number;
      numberofcolors?: number;
      mincolorratio?: number;
      colorquantcycles?: number;
      scale?: number;
      simplifytolerance?: number;
      pathomit?: number;
      [key: string]: any;
    }
  
    export function imageToSVG(
      image: string | Buffer,
      callback: (svg: string) => void,
      options?: ImagetracerOptions
    ): void;
  
    export function imagedataToSVG(
      imagedata: any,
      options?: ImagetracerOptions
    ): string;
  
    export function loadImage(
      url: string,
      callback: (imageData: any) => void
    ): void;
  
    // Add other functions as needed
  }