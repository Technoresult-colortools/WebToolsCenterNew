export interface Filter {
  name: string
  cssFilter: string
  intensity: number
  unit?: string
  defaultIntensity?: number
  description?: string
  category?: string
}

export const AllFilters: Filter[] = [
  { name: "Grayscale", cssFilter: "grayscale", intensity: 100, unit: "%", defaultIntensity: 100, category: "basic" },
  { name: "Sepia", cssFilter: "sepia", intensity: 100, unit: "%", defaultIntensity: 100, category: "basic" },
  { name: "Blur", cssFilter: "blur", intensity: 10, unit: "px", defaultIntensity: 5, category: "basic" },
  { name: "Brightness", cssFilter: "brightness", intensity: 200, unit: "%", defaultIntensity: 100, category: "basic" },
  { name: "Contrast", cssFilter: "contrast", intensity: 200, unit: "%", defaultIntensity: 100, category: "basic" },
  {
    name: "Hue Rotate",
    cssFilter: "hue-rotate",
    intensity: 360,
    unit: "deg",
    defaultIntensity: 180,
    category: "basic",
  },
  { name: "Invert", cssFilter: "invert", intensity: 100, unit: "%", defaultIntensity: 100, category: "basic" },
  { name: "Saturate", cssFilter: "saturate", intensity: 200, unit: "%", defaultIntensity: 150, category: "basic" },
  { name: "Opacity", cssFilter: "opacity", intensity: 100, unit: "%", defaultIntensity: 80, category: "basic" },
  {
    name: "Drop Shadow",
    cssFilter: "drop-shadow",
    intensity: 20,
    unit: "px",
    defaultIntensity: 5,
    category: "effects",
  },
  {
    name: "Vintage",
    cssFilter: "custom",
    intensity: 100,
    unit: "%",
    defaultIntensity: 100,
    category: "effects",
    description: "A warm, nostalgic filter with sepia tones",
  },
  {
    name: "Cold",
    cssFilter: "custom",
    intensity: 100,
    unit: "%",
    defaultIntensity: 100,
    category: "effects",
    description: "A cool blue tone filter",
  },
  {
    name: "Warm",
    cssFilter: "custom",
    intensity: 100,
    unit: "%",
    defaultIntensity: 100,
    category: "effects",
    description: "A warm, golden tone filter",
  },
  {
    name: "Sunset",
    cssFilter: "custom",
    intensity: 100,
    unit: "%",
    defaultIntensity: 100,
    category: "artistic",
    description: "Orange and pink tones reminiscent of sunset",
  },
  {
    name: "Film",
    cssFilter: "custom",
    intensity: 100,
    unit: "%",
    defaultIntensity: 100,
    category: "artistic",
    description: "Classic film look with subtle contrast and saturation",
  },
  {
    name: "Duotone",
    cssFilter: "custom",
    intensity: 100,
    unit: "%",
    defaultIntensity: 100,
    category: "artistic",
    description: "Two-tone color effect for dramatic images",
  },
  {
    name: "Dramatic",
    cssFilter: "custom",
    intensity: 100,
    unit: "%",
    defaultIntensity: 100,
    category: "artistic",
    description: "High contrast, deep shadows for dramatic effect",
  },
  {
    name: "Noir",
    cssFilter: "custom",
    intensity: 100,
    unit: "%",
    defaultIntensity: 100,
    category: "artistic",
    description: "Black and white with high contrast for film noir effect",
  },
  {
    name: "Polaroid",
    cssFilter: "custom",
    intensity: 100,
    unit: "%",
    defaultIntensity: 100,
    category: "artistic",
    description: "Soft, slightly faded look similar to polaroid photos",
  },
  {
    name: "Vignette",
    cssFilter: "custom",
    intensity: 100,
    unit: "%",
    defaultIntensity: 100,
    category: "effects",
    description: "Darkened edges to focus attention on the center",
  },
  {
    name: "Retrowave",
    cssFilter: "custom",
    intensity: 100,
    unit: "%",
    defaultIntensity: 100,
    category: "artistic",
    description: "Vibrant pink and blue tones inspired by 80s aesthetics",
  },
  {
    name: "Pop Art",
    cssFilter: "custom",
    intensity: 100,
    unit: "%",
    defaultIntensity: 100,
    category: "artistic",
    description: "Bright, high-contrast colors in pop art style",
  },
]

// Create filter categories object
export const filterCategories: { [key: string]: Filter[] } = AllFilters.reduce(
  (acc, filter) => {
    const category = filter.category || "basic"
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(filter)
    return acc
  },
  {} as { [key: string]: Filter[] },
)
