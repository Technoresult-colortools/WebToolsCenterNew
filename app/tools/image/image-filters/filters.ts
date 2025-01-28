export interface Filter {
    name: string
    cssFilter: string
    intensity: number
    unit?: string
  }
  
  export const filters: Filter[] = [
    { name: "Grayscale", cssFilter: "grayscale", intensity: 100, unit: "%" },
    { name: "Sepia", cssFilter: "sepia", intensity: 100, unit: "%" },
    { name: "Blur", cssFilter: "blur", intensity: 10, unit: "px" },
    { name: "Brightness", cssFilter: "brightness", intensity: 200, unit: "%" },
    { name: "Contrast", cssFilter: "contrast", intensity: 200, unit: "%" },
    { name: "Hue Rotate", cssFilter: "hue-rotate", intensity: 360, unit: "deg" },
    { name: "Invert", cssFilter: "invert", intensity: 100, unit: "%" },
    { name: "Saturate", cssFilter: "saturate", intensity: 200, unit: "%" },
    { name: "Opacity", cssFilter: "opacity", intensity: 100, unit: "%" },
    { name: "Drop Shadow", cssFilter: "drop-shadow", intensity: 20, unit: "px" },
    { name: "Vintage", cssFilter: "custom", intensity: 100, unit: "%" },
    { name: "Cold", cssFilter: "custom", intensity: 100, unit: "%" },
  ]
  