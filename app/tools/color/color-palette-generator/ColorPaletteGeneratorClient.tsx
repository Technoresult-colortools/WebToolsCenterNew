"use client"

import { useState, useEffect } from "react"
import { Copy, Download, Shuffle, Wand2, Sun, Moon, Info, BookOpen, Lightbulb, Eye, Code, Palette, Droplet, Zap } from "lucide-react"
import { Button, Card, CardBody, Textarea, Switch, Tooltip } from "@nextui-org/react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import InfoSectionAIColorPalette from "./info-section"
import { ColorUtils, fetchColorName } from "@/lib/color-utils"
import NextImage from "next/image"

interface ColorInfo {
  hex: string
  rgb: { r: number, g: number, b: number } | null
  hsl: { h: number, s: number, l: number } | null
  name: string | null
}

// Function to determine if text should be white or black based on background color
const getContrastTextColor = (hexColor: string): string => {
  // Convert hex to rgb
  const rgb = ColorUtils.hexToRgb(hexColor)
  if (!rgb) return '#000000'

  // Calculate luminance
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255

  // Return white for dark backgrounds, black for light backgrounds
  return luminance > 0.5 ? '#000000' : '#FFFFFF'
}

interface PreviewProps {
  palette: ColorInfo[]
  isDarkMode: boolean
}

const PalettePreview = ({ palette, isDarkMode }: PreviewProps) => {
  // For more consistent contrast, we'll calculate text colors
  const primaryBgColor = palette[0].hex
  const secondaryBgColor = palette[1].hex
  const accentColor = palette[2].hex
  const primaryTextColor = getContrastTextColor(primaryBgColor)
  const secondaryTextColor = getContrastTextColor(secondaryBgColor)
  const accentTextColor = getContrastTextColor(accentColor)

  const baseBgColor = isDarkMode ? '#1A1A1A' : '#FFFFFF'
  const baseTextColor = isDarkMode ? '#FFFFFF' : '#000000'
  const subtleTextColor = isDarkMode ? '#D4D4D4' : '#6B7280'

  return (
    <div className="w-full p-6 rounded-lg shadow-lg transition-all" style={{ backgroundColor: baseBgColor, color: baseTextColor }}>
      <div className="mb-4">
        <h3 className="text-xl font-semibold" style={{ color: baseTextColor }}>Color Palette Preview</h3>
        <p className="text-sm" style={{ color: subtleTextColor }}>See how your colors would look in a futuristic UI design</p>
      </div>

      {/* Futuristic UI Components */}
      <div className="space-y-6">
        {/* Header with glassmorphism effect */}
        <div className="relative p-4 rounded-lg overflow-hidden backdrop-blur-sm"
          style={{
            backgroundColor: `${primaryBgColor}CC`,
            boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.2)`,
            borderLeft: `3px solid ${accentColor}`
          }}>
          <div className="absolute top-0 right-0 h-full w-1/3 opacity-20 rounded-l-full"
            style={{ backgroundColor: palette[4].hex }}></div>
          <div className="relative z-10 flex justify-between items-center">
            <span className="font-bold tracking-wider" style={{ color: primaryTextColor }}>NEBULA UI</span>
            <div className="flex gap-3">
              {[3, 2, 1].map((i) => (
                <div key={i} className="w-2 h-8 rounded-full"
                  style={{
                    backgroundColor: palette[i].hex,
                    transform: 'skewX(-15deg)',
                    boxShadow: `0 0 8px ${palette[i].hex}`
                  }}></div>
              ))}
            </div>
          </div>
        </div>

        {/* Main content area with sidebar */}
        <div className="flex gap-4">
          {/* Navigation sidebar */}
          <div className="hidden md:flex flex-col gap-3 p-3 rounded-lg"
            style={{
              backgroundColor: palette[4].hex,
              color: getContrastTextColor(palette[4].hex),
              width: '80px'
            }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="aspect-square rounded-lg flex items-center justify-center transition-all hover:scale-105"
                style={{
                  backgroundColor: i === 0 ? accentColor : 'transparent',
                  color: i === 0 ? accentTextColor : getContrastTextColor(palette[4].hex),
                  border: i !== 0 ? `1px solid ${getContrastTextColor(palette[4].hex)}40` : 'none'
                }}>
                <div className="w-5 h-5 rounded-sm" style={{
                  backgroundColor: i !== 0 ? palette[i].hex : 'transparent'
                }}></div>
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 p-4 rounded-lg relative overflow-hidden"
            style={{
              backgroundColor: secondaryBgColor,
              borderRadius: '12px',
              boxShadow: `0 4px 20px 0 rgba(0, 0, 0, 0.1)`
            }}>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
              style={{
                backgroundColor: palette[3].hex,
                filter: 'blur(40px)',
                transform: 'translate(20%, -30%)'
              }}></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-10"
              style={{
                backgroundColor: palette[0].hex,
                filter: 'blur(30px)',
                transform: 'translate(-20%, 30%)'
              }}></div>

            <div className="relative z-10">
              {/* Header and stats section */}
              <div className="mb-4">
                <h4 className="font-medium text-lg tracking-wide" style={{ color: secondaryTextColor }}>
                  Dashboard Overview
                </h4>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="p-3 rounded-lg"
                      style={{
                        backgroundColor: `${palette[i].hex}22`,
                        borderLeft: `2px solid ${palette[i].hex}`
                      }}>
                      <div className="text-xs opacity-70" style={{ color: secondaryTextColor }}>
                        Metric {i + 1}
                      </div>
                      <div className="text-lg font-semibold" style={{ color: secondaryTextColor }}>
                        {(i + 1) * 28}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-lg"
                  style={{
                    background: `linear-gradient(135deg, ${palette[0].hex}22, ${palette[1].hex}33)`,
                    borderBottom: `2px solid ${palette[0].hex}`
                  }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-medium" style={{ color: secondaryTextColor }}>Primary Data</div>
                      <p className="text-xs mt-1 max-w-xs" style={{ color: `${secondaryTextColor}99` }}>
                        Visualize how your palette creates depth and emphasis in interfaces
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: accentColor }}>
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: accentTextColor }}></div>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg"
                  style={{
                    background: `linear-gradient(135deg, ${palette[2].hex}22, ${palette[3].hex}33)`,
                    borderBottom: `2px solid ${palette[2].hex}`
                  }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-medium" style={{ color: secondaryTextColor }}>Secondary Data</div>
                      <p className="text-xs mt-1 max-w-xs" style={{ color: `${secondaryTextColor}99` }}>
                        See how accent colors provide visual hierarchy and flow
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: palette[3].hex }}>
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: getContrastTextColor(palette[3].hex) }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 justify-end">
                <button className="text-xs px-6 py-2 rounded-full transition-transform hover:scale-105"
                  style={{
                    backgroundColor: 'transparent',
                    border: `1px solid ${accentColor}`,
                    color: secondaryTextColor
                  }}>
                  Cancel
                </button>
                <button className="text-xs px-6 py-2 rounded-full transition-transform hover:scale-105"
                  style={{
                    backgroundColor: accentColor,
                    color: accentTextColor,
                    boxShadow: `0 2px 10px ${accentColor}80`
                  }}>
                  Apply Palette
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Progress tracker */}
        <div className="rounded-lg p-4 flex flex-col gap-3"
          style={{
            backgroundColor: palette[1].hex,
            color: getContrastTextColor(palette[1].hex),
          }}>
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium">Color Harmony Analysis</h4>
            <span className="text-xs px-2 py-1 rounded-full"
              style={{
                backgroundColor: palette[0].hex,
                color: getContrastTextColor(palette[0].hex)
              }}>
              AI Generated
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1 mt-2">
            {palette.map((color, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="h-2 w-full rounded-full overflow-hidden">
                  <div className="h-full" style={{
                    width: `${100 - i * 15}%`,
                    backgroundColor: color.hex,
                    boxShadow: `0 0 5px ${color.hex}80`
                  }}></div>
                </div>
                <span className="text-[10px] truncate" style={{ color: getContrastTextColor(palette[1].hex) }}>
                  {color.hex}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer with mode toggle */}
        <div className="flex justify-between items-center pt-2">
          <div className="flex">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i}
                className="w-6 h-6 rounded-full border-2 transition-transform hover:scale-110"
                style={{
                  backgroundColor: palette[i].hex,
                  borderColor: baseBgColor,
                  marginLeft: i > 0 ? '-8px' : '0',
                  zIndex: 5 - i,
                  boxShadow: `0 0 5px ${palette[i].hex}80`
                }}
              ></div>
            ))}
          </div>
          <div className="text-xs px-3 py-1 rounded-full" style={{
            backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
            color: isDarkMode ? '#FFFFFF' : '#000000',
            border: `1px solid ${isDarkMode ? '#333333' : '#EEEEEE'}`
          }}>
            Preview Mode: {isDarkMode ? 'Dark' : 'Light'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ColorPaletteGenerator() {
  const [isLoading, setIsLoading] = useState(false)
  const [userInput, setUserInput] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [activeTheme, setActiveTheme] = useState<string>('')
  const [palette, setPalette] = useState<ColorInfo[]>([
    { hex: '#4A6FA5', rgb: null, hsl: null, name: 'Steel Blue' },
    { hex: '#DDF0FF', rgb: null, hsl: null, name: 'Light Blue' },
    { hex: '#166088', rgb: null, hsl: null, name: 'Deep Blue' },
    { hex: '#F2F8FC', rgb: null, hsl: null, name: 'Pale Blue' },
    { hex: '#071330', rgb: null, hsl: null, name: 'Navy Blue' }
  ])

  // Theme presets with color harmony types
  const themePresets = [
    {
      name: 'Monochromatic',
      icon: Droplet,
      colors: ['#1a1a1a', '#404040', '#666666', '#999999', '#cccccc'],
      description: 'Single hue with varying shades'
    },
    {
      name: 'Analogous',
      icon: Palette,
      colors: ['#FF6B6B', '#FF8E53', '#FFA94D', '#FFD93D', '#F9E784'],
      description: 'Adjacent colors on color wheel'
    },
    {
      name: 'Complementary',
      icon: Zap,
      colors: ['#3B82F6', '#60A5FA', '#93C5FD', '#FB923C', '#FDBA74'],
      description: 'Opposite colors on color wheel'
    },
    {
      name: 'Triadic',
      icon: Shuffle,
      colors: ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6'],
      description: 'Three evenly spaced colors'
    },
    {
      name: 'Warm',
      icon: Sun,
      colors: ['#D00000', '#DC2F02', '#E85D04', '#F48C06', '#FAA307'],
      description: 'Energetic warm tones'
    },
    {
      name: 'Cool',
      icon: Moon,
      colors: ['#03045E', '#023E8A', '#0077B6', '#0096C7', '#00B4D8'],
      description: 'Calm cool tones'
    }
  ]

  useEffect(() => {
    // Update color information on initial load
    updateColorInfo(palette)
  }, [])

  const updateColorInfo = async (colors: ColorInfo[]) => {
    const updatedColors = await Promise.all(colors.map(async (color) => ({
      ...color,
      rgb: ColorUtils.hexToRgb(color.hex),
      hsl: ColorUtils.hexToHsl(color.hex),
      name: await fetchColorName(color.hex) || color.hex
    })))

    setPalette(updatedColors)
  }

  // Apply theme preset
  const applyThemePreset = async (themeName: string, colors: string[]) => {
    setActiveTheme(themeName)
    const newPalette = colors.map((hex) => ({
      hex,
      rgb: null,
      hsl: null,
      name: null
    }))
    await updateColorInfo(newPalette)
    toast.success(`${themeName} palette applied!`)
    if (!showPreview) setShowPreview(true)
  }

  // Mock AI generation function (fallback if API fails)
  const generateMockPalette = (description: string) => {
    // Simple color sets for common themes - in a real app you'd use more sophisticated logic
    const palettes = {
      'sunset': ['#FF7B00', '#FFB700', '#FF006E', '#8338EC', '#3A86FF'],
      'ocean': ['#05668D', '#028090', '#00A896', '#02C39A', '#F0F3BD'],
      'forest': ['#2D6A4F', '#40916C', '#52B788', '#74C69D', '#B7E4C7'],
      'corporate': ['#0353A4', '#023E7D', '#002855', '#001845', '#001233'],
      'pastel': ['#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF'],
      'vibrant': ['#F72585', '#7209B7', '#3A0CA3', '#4361EE', '#4CC9F0'],
      'monochrome': ['#000000', '#404040', '#737373', '#A6A6A6', '#D9D9D9'],
      'earthy': ['#582F0E', '#7F4F24', '#936639', '#A68A64', '#B6AD90'],
      'warm': ['#D00000', '#DC2F02', '#E85D04', '#F48C06', '#FAA307'],
      'cool': ['#03045E', '#023E8A', '#0077B6', '#0096C7', '#00B4D8']
    }

    // Default palette if no match
    let selectedPalette = ['#4A6FA5', '#DDF0FF', '#166088', '#F2F8FC', '#071330']

    // Check for keyword matches
    const desc = description.toLowerCase()
    Object.entries(palettes).forEach(([key, colors]) => {
      if (desc.includes(key)) {
        selectedPalette = colors
      }
    })

    return selectedPalette
  }

  // Inside ColorPaletteGenerator component
  const generatePalette = async () => {
    if (!userInput.trim()) {
      toast.error('Please enter a description for your palette')
      return
    }

    setIsLoading(true)
    setActiveTheme('') // Clear active theme when generating custom palette

    try {
      const response = await fetch('/api/generate-palette', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userInput }),
      })

      const data = await response.json()

      if (data.success && data.colors) {
        // Create color info objects from the API response
        const newPalette = data.colors.map((hex: string) => ({
          hex: hex.startsWith('#') ? hex : `#${hex}`,
          rgb: null,
          hsl: null,
          name: null
        }))

        await updateColorInfo(newPalette)
        toast.success('Awesome palette generated!')
        if (!showPreview) setShowPreview(true) // Auto-show preview on success
      } else {
        throw new Error(data.error || 'Failed to generate')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('AI is busy, using fallback colors...')

      // Fallback logic
      const mockColors = generateMockPalette(userInput)
      const fallbackPalette = mockColors.map((hex) => ({
        hex, rgb: null, hsl: null, name: null
      }))
      await updateColorInfo(fallbackPalette)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyColor = (color: string, format: string) => {
    navigator.clipboard.writeText(color)
    toast.success(`Copied ${format} to clipboard`)
  }

  // Download handlers
  const handlePngDownload = () => {
    const canvas = document.createElement('canvas')
    const scale = window.devicePixelRatio || 1
    canvas.width = 1000 * scale
    canvas.height = 600 * scale
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.scale(scale, scale)

    // Set background based on mode
    ctx.fillStyle = isDarkMode ? '#1A1A1A' : '#FFFFFF'
    ctx.fillRect(0, 0, 1000, 600)

    // Draw title
    ctx.fillStyle = isDarkMode ? '#FFFFFF' : '#000000'
    ctx.font = 'bold 24px Arial'
    ctx.fillText('Color Palette', 40, 40)

    // Draw colors
    palette.forEach((color, index) => {
      const x = 40
      const y = 80 + (index * 100)

      // Color swatch
      ctx.fillStyle = color.hex
      ctx.fillRect(x, y, 200, 80)
      ctx.strokeStyle = isDarkMode ? '#FFFFFF' : '#000000'
      ctx.strokeRect(x, y, 200, 80)

      // Color information
      ctx.fillStyle = isDarkMode ? '#FFFFFF' : '#000000'
      ctx.font = '16px Arial'
      ctx.fillText(`Name: ${color.name}`, x + 220, y + 20)
      ctx.fillText(`HEX: ${color.hex}`, x + 220, y + 40)
      if (color.rgb) {
        ctx.fillText(
          `RGB: ${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}`,
          x + 220,
          y + 60
        )
      }
    })

    const link = document.createElement('a')
    link.download = 'color_palette.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const handleCssDownload = () => {
    const css = `:root {
  ${palette.map((color, index) => `  --color-${index + 1}: ${color.hex};`).join('\n')}
  }
  
  /* Color Classes */
  ${palette.map((color, index) => `.color-${index + 1} {
    color: ${color.hex};
  }
  
  .bg-color-${index + 1} {
    background-color: ${color.hex};
  }`).join('\n\n')}
  `

    const blob = new Blob([css], { type: 'text/css' })
    const link = document.createElement('a')
    link.download = 'palette.css'
    link.href = URL.createObjectURL(blob)
    link.click()
    URL.revokeObjectURL(link.href)
  }

  const handleScssDownload = () => {
    const scss = `// Color Variables
${palette.map((color, index) => `$color-${index + 1}: ${color.hex};`).join('\n')}
  
// Color Map
$colors: (
${palette.map((color, index) => `  'color-${index + 1}': $color-${index + 1},`).join('\n')}
);
  
// Mixins
@mixin color-classes {
  @each $name, $color in $colors {
    .#{$name} {
      color: $color;
    }
  
    .bg-#{$name} {
      background-color: $color;
    }
  }
}
  
// Generate Classes
@include color-classes;`

    const blob = new Blob([scss], { type: 'text/scss' })
    const link = document.createElement('a')
    link.download = 'palette.scss'
    link.href = URL.createObjectURL(blob)
    link.click()
    URL.revokeObjectURL(link.href)
  }

  const togglePreview = () => {
    setShowPreview(!showPreview)
  }

  return (
    <ToolLayout
      title="AI Color Palette Generator"
      description="Create the perfect color scheme with AI assistance"
      toolId="678f382d26f06f912191bcb1"
    >
      <div className="flex flex-col gap-8">
        {/* Theme Format Selection - NEW SECTION */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Palette className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-medium">Choose a Color Harmony Theme</h3>
              </div>
              <p className="text-sm text-default-600">
                Quick start with professional color harmony patterns
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {themePresets.map((theme) => {
                  const Icon = theme.icon
                  const isActive = activeTheme === theme.name
                  return (
                    <Tooltip className="text-default-700" key={theme.name} content={theme.description} >
                      <button
                        onClick={() => applyThemePreset(theme.name, theme.colors)}
                        className={`p-4 rounded-xl transition-all ${isActive
                          ? 'bg-primary text-primary-foreground shadow-lg scale-105 ring-2 ring-primary'
                          : 'bg-default-200 dark:bg-default-200 hover:bg-default-200 dark:hover:bg-default-300'
                          }`}
                      >
                        <Icon className="w-6 h-6 mx-auto mb-2" />
                        <div className="text-xs font-medium mb-2">{theme.name}</div>
                        <div className="flex gap-1 justify-center">
                          {theme.colors.slice(0, 3).map((color, i) => (
                            <div
                              key={i}
                              className="w-4 h-4 rounded-full border-2 border-white dark:border-black"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </button>
                    </Tooltip>
                  )
                })}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Input Section */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Wand2 className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-medium">Or Generate Custom Palette with AI</h3>
              </div>

              <Textarea
                label="Palette Description"
                placeholder="E.g., A warm sunset palette with orange and purple tones, or corporate blues for a finance website"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                variant="bordered"
                minRows={3}
                className="w-full"
              />

              <div className="flex flex-wrap justify-between gap-2">
                <Button
                  onClick={generatePalette}
                  color="primary"
                  isLoading={isLoading}
                  className="px-6"
                  startContent={!isLoading && <Shuffle className="h-4 w-4" />}
                >
                  Generate Palette
                </Button>
                <Button
                  onClick={togglePreview}
                  variant="flat"
                  color="secondary"
                  startContent={<Eye className="h-4 w-4" />}
                >
                  {showPreview ? "Hide Preview" : "Show Preview"}
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Color Display Section */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Your Color Palette</h3>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {palette.map((color, index) => (
                  <div key={index} className="space-y-3">
                    <div
                      className="h-32 rounded-xl shadow-md cursor-pointer hover:scale-105 transition-transform"
                      style={{ backgroundColor: color.hex }}
                      onClick={() => handleCopyColor(color.hex, 'HEX')}
                    />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm font-semibold">{color.hex}</span>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          onClick={() => handleCopyColor(color.hex, 'HEX')}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      {color.name && (
                        <p className="text-xs text-default-600 truncate">{color.name}</p>
                      )}
                      {color.rgb && (
                        <button
                          onClick={() => handleCopyColor(`rgb(${color.rgb!.r}, ${color.rgb!.g}, ${color.rgb!.b})`, 'RGB')}
                          className="text-xs text-default-500 hover:text-primary transition-colors text-left w-full"
                        >
                          RGB: {color.rgb.r}, {color.rgb.g}, {color.rgb.b}
                        </button>
                      )}
                      {color.hsl && (
                        <button
                          onClick={() => handleCopyColor(`hsl(${color.hsl!.h}, ${color.hsl!.s}%, ${color.hsl!.l}%)`, 'HSL')}
                          className="text-xs text-default-500 hover:text-primary transition-colors text-left w-full"
                        >
                          HSL: {color.hsl.h}°, {color.hsl.s}%, {color.hsl.l}%
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handlePngDownload}
                  variant="shadow"
                  color="primary"
                  startContent={<Download className="h-4 w-4" />}
                >
                  Download PNG
                </Button>
                <Button
                  onClick={handleCssDownload}
                  variant="shadow"
                  color="secondary"
                  startContent={<Code className="h-4 w-4" />}
                >
                  Download CSS
                </Button>
                <Button
                  onClick={handleScssDownload}
                  variant="shadow"
                  color="success"
                  startContent={<Code className="h-4 w-4" />}
                >
                  Download SCSS
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Preview Dialog */}
        {showPreview && (
          <Card className="bg-default-50 dark:bg-default-100">
            <CardBody className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">UI Preview</h3>
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4" />
                  <Switch
                    size="sm"
                    isSelected={isDarkMode}
                    onChange={() => setIsDarkMode(!isDarkMode)}
                    aria-label="Toggle dark mode"
                  />
                  <Moon className="w-4 h-4" />
                </div>
              </div>
              <PalettePreview palette={palette} isDarkMode={isDarkMode} />
            </CardBody>
          </Card>
        )}


      </div>
      <InfoSectionAIColorPalette />
    </ToolLayout>
  )
}