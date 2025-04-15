// qrCodeStyles.ts - Template definitions for QR code styles

export interface QRCodeTemplate {
    id: string
    name: string
    bodyShape: string
    frameShape: string
    eyeballShape: string
    fgColor: string
    bgColor: string
    eyeColor?: string
    isGradient?: boolean
    gradientColors?: string[]
    gradientType?: "linear" | "radial"
    gradientRotation?: number
    errorCorrectionLevel?: "L" | "M" | "Q" | "H"
    includeMargin?: boolean
    thumbnail?: string
    isOverflow?: boolean
    overflowType?: "circular" | "bubble" | "organic" | "shadow" | "glow"
    overflowColor?: string
    overflowSize?: number
  }
  
  export const qrCodeTemplates: QRCodeTemplate[] = [
    {
      id: "classic",
      name: "Classic",
      bodyShape: "square",
      frameShape: "square",
      eyeballShape: "square",
      fgColor: "#000000",
      bgColor: "#FFFFFF",
      errorCorrectionLevel: "M",
      includeMargin: true,
      thumbnail: "/images/qr-templates/classic.svg"
    },
    {
      id: "rounded",
      name: "Rounded",
      bodyShape: "rounded",
      frameShape: "rounded",
      eyeballShape: "rounded",
      fgColor: "#000000",
      bgColor: "#FFFFFF",
      errorCorrectionLevel: "M",
      includeMargin: true,
      thumbnail: "/images/qr-templates/rounded.svg"
    },
    {
      id: "dots",
      name: "Dots",
      bodyShape: "dots",
      frameShape: "square",
      eyeballShape: "dot",
      fgColor: "#000000",
      bgColor: "#FFFFFF",
      errorCorrectionLevel: "M",
      includeMargin: true,
      thumbnail: "/images/qr-templates/dots.svg"
    },
    {
      id: "classy",
      name: "Classy",
      bodyShape: "classy",
      frameShape: "square",
      eyeballShape: "square",
      fgColor: "#000000",
      bgColor: "#FFFFFF",
      errorCorrectionLevel: "M",
      includeMargin: true,
      thumbnail: "/images/qr-templates/classy.svg"
    },
    {
      id: "colorful",
      name: "Colorful",
      bodyShape: "square",
      frameShape: "square",
      eyeballShape: "square",
      fgColor: "#3B82F6",
      bgColor: "#EFF6FF",
      eyeColor: "#1E40AF",
      errorCorrectionLevel: "M",
      includeMargin: true,
      thumbnail: "/images/qr-templates/colorful.svg"
    },
    {
      id: "gradient-blue",
      name: "Gradient Blue",
      bodyShape: "square",
      frameShape: "square",
      eyeballShape: "square",
      fgColor: "#3B82F6",
      bgColor: "#FFFFFF",
      isGradient: true,
      gradientColors: ["#3B82F6", "#1E40AF"],
      gradientType: "linear",
      gradientRotation: 45,
      errorCorrectionLevel: "M",
      includeMargin: true,
      thumbnail: "/images/qr-templates/gradient-blue.svg"
    },
    {
      id: "modern",
      name: "Modern",
      bodyShape: "rounded",
      frameShape: "rounded",
      eyeballShape: "circle",
      fgColor: "#374151",
      bgColor: "#F3F4F6",
      eyeColor: "#111827",
      errorCorrectionLevel: "M",
      includeMargin: true,
      thumbnail: "/images/qr-templates/modern.svg"
    },
    {
      id: "designer",
      name: "Designer",
      bodyShape: "classy-rounded",
      frameShape: "circle",
      eyeballShape: "dot",
      fgColor: "#4C1D95",
      bgColor: "#F5F3FF",
      eyeColor: "#6D28D9",
      errorCorrectionLevel: "M",
      includeMargin: true,
      thumbnail: "/images/qr-templates/designer.svg"
    },
    // New templates with overflow effects
    {
      id: "neon-glow",
      name: "Neon Glow",
      bodyShape: "rounded",
      frameShape: "rounded",
      eyeballShape: "rounded",
      fgColor: "#10B981",
      bgColor: "#111827",
      eyeColor: "#34D399",
      errorCorrectionLevel: "Q",
      includeMargin: true,
      isOverflow: true,
      overflowType: "glow",
      overflowColor: "#34D399",
      overflowSize: 3,
      thumbnail: "/images/qr-templates/neon-glow.svg"
    },
    {
      id: "shadow-elegance",
      name: "Shadow Elegance",
      bodyShape: "square",
      frameShape: "square",
      eyeballShape: "square",
      fgColor: "#1F2937",
      bgColor: "#F9FAFB",
      errorCorrectionLevel: "M",
      includeMargin: true,
      isOverflow: true,
      overflowType: "shadow",
      overflowColor: "rgba(0,0,0,0.25)",
      overflowSize: 5,
      thumbnail: "/images/qr-templates/shadow-elegance.svg"
    },
    {
      id: "bubble-pop",
      name: "Bubble Pop",
      bodyShape: "dots",
      frameShape: "circle",
      eyeballShape: "circle",
      fgColor: "#8B5CF6",
      bgColor: "#EDE9FE",
      eyeColor: "#6D28D9",
      errorCorrectionLevel: "Q",
      includeMargin: true,
      isOverflow: true,
      overflowType: "bubble",
      overflowColor: "#C4B5FD",
      overflowSize: 4,
      thumbnail: "/images/qr-templates/bubble-pop.svg"
    },
    {
      id: "organic-flow",
      name: "Organic Flow",
      bodyShape: "classy-rounded",
      frameShape: "rounded",
      eyeballShape: "dot",
      fgColor: "#065F46",
      bgColor: "#ECFDF5",
      eyeColor: "#047857",
      errorCorrectionLevel: "M",
      includeMargin: true,
      isOverflow: true,
      overflowType: "organic",
      overflowColor: "#A7F3D0",
      overflowSize: 6,
      thumbnail: "/images/qr-templates/organic-flow.svg"
    },
    {
      id: "circular-ripple",
      name: "Circular Ripple",
      bodyShape: "dots",
      frameShape: "circle",
      eyeballShape: "circle",
      fgColor: "#1E40AF",
      bgColor: "#DBEAFE",
      eyeColor: "#3B82F6",
      errorCorrectionLevel: "H",
      includeMargin: true,
      isOverflow: true,
      overflowType: "circular",
      overflowColor: "#93C5FD",
      overflowSize: 4,
      thumbnail: "/images/qr-templates/circular-ripple.svg"
    },
    {
      id: "sunset-gradient",
      name: "Sunset Gradient",
      bodyShape: "rounded",
      frameShape: "rounded",
      eyeballShape: "rounded",
      fgColor: "#F59E0B",
      bgColor: "#FFFBEB",
      isGradient: true,
      gradientColors: ["#F59E0B", "#DC2626"],
      gradientType: "linear",
      gradientRotation: 135,
      errorCorrectionLevel: "Q",
      includeMargin: true,
      thumbnail: "/images/qr-templates/sunset-gradient.svg"
    },
    {
      id: "cyberpunk",
      name: "Cyberpunk",
      bodyShape: "square",
      frameShape: "square",
      eyeballShape: "square",
      fgColor: "#EC4899",
      bgColor: "#18181B",
      eyeColor: "#F472B6",
      isGradient: true,
      gradientColors: ["#EC4899", "#8B5CF6"],
      gradientType: "linear",
      gradientRotation: 90,
      errorCorrectionLevel: "H",
      includeMargin: true,
      isOverflow: true,
      overflowType: "glow",
      overflowColor: "#F472B6",
      overflowSize: 2,
      thumbnail: "/images/qr-templates/cyberpunk.svg"
    },
    {
      id: "minimal-dots",
      name: "Minimal Dots",
      bodyShape: "dots",
      frameShape: "dots",
      eyeballShape: "dot",
      fgColor: "#6B7280",
      bgColor: "#F9FAFB",
      eyeColor: "#4B5563",
      errorCorrectionLevel: "M",
      includeMargin: true,
      thumbnail: "/images/qr-templates/minimal-dots.svg"
    },
    {
      id: "vintage",
      name: "Vintage",
      bodyShape: "classy",
      frameShape: "square",
      eyeballShape: "square",
      fgColor: "#92400E",
      bgColor: "#FEFCE8",
      eyeColor: "#78350F",
      errorCorrectionLevel: "M",
      includeMargin: true,
      isOverflow: true,
      overflowType: "shadow",
      overflowColor: "rgba(146, 64, 14, 0.3)",
      overflowSize: 3,
      thumbnail: "/images/qr-templates/vintage.svg"
    },
    {
      id: "radial-burst",
      name: "Radial Burst",
      bodyShape: "square",
      frameShape: "square",
      eyeballShape: "square",
      fgColor: "#4F46E5",
      bgColor: "#FFFFFF",
      eyeColor: "#4338CA",
      isGradient: true,
      gradientColors: ["#4F46E5", "#8B5CF6", "#EC4899"],
      gradientType: "radial",
      errorCorrectionLevel: "Q",
      includeMargin: true,
      thumbnail: "/images/qr-templates/radial-burst.svg"
    },
    {
      id: "eco-green",
      name: "Eco Green",
      bodyShape: "rounded",
      frameShape: "rounded",
      eyeballShape: "circle",
      fgColor: "#15803D",
      bgColor: "#F0FDF4",
      eyeColor: "#166534",
      errorCorrectionLevel: "M",
      includeMargin: true,
      isOverflow: true,
      overflowType: "organic",
      overflowColor: "#BBF7D0",
      overflowSize: 4,
      thumbnail: "/images/qr-templates/eco-green.svg"
    },
    {
      id: "ocean-waves",
      name: "Ocean Waves",
      bodyShape: "dots",
      frameShape: "rounded",
      eyeballShape: "rounded",
      fgColor: "#0E7490",
      bgColor: "#ECFEFF",
      eyeColor: "#0891B2",
      isGradient: true,
      gradientColors: ["#0E7490", "#0284C7"],
      gradientType: "linear",
      gradientRotation: 45,
      errorCorrectionLevel: "H",
      includeMargin: true,
      isOverflow: true,
      overflowType: "circular",
      overflowColor: "#A5F3FC",
      overflowSize: 5,
      thumbnail: "/images/qr-templates/ocean-waves.svg"
    },
    {
      id: "monochrome",
      name: "Monochrome",
      bodyShape: "classy-rounded",
      frameShape: "rounded",
      eyeballShape: "dot",
      fgColor: "#1F2937",
      bgColor: "#F3F4F6",
      eyeColor: "#111827",
      errorCorrectionLevel: "M",
      includeMargin: true,
      thumbnail: "/images/qr-templates/monochrome.svg"
    },
    {
      id: "pixelated",
      name: "Pixelated",
      bodyShape: "square",
      frameShape: "square",
      eyeballShape: "square",
      fgColor: "#7C3AED",
      bgColor: "#F5F3FF",
      eyeColor: "#5B21B6",
      errorCorrectionLevel: "Q",
      includeMargin: false,
      thumbnail: "/images/qr-templates/pixelated.svg"
    }
  ]
  
  export const getTemplateById = (id: string): QRCodeTemplate | undefined => {
    return qrCodeTemplates.find(template => template.id === id)
  }