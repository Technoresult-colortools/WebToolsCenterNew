"use client"

import { useState, useEffect } from "react"
import { Copy,  Download, Shuffle, Eye, Palette, Droplet, Grid, ImageIcon, Wand2, Lightbulb,  Code, BookOpen, Info } from "lucide-react"
import { Button, Card, CardBody, Input, Tabs, Tab, Select, SelectItem, Textarea } from "@nextui-org/react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import NextImage from "next/image"
import { ColorGrid } from "@/components/color-grid"
import { ImageUpload } from "@/components/image-upload"
import { ColorUtils, generatePaletteFromAPI, fetchColorName } from "@/lib/color-utils"

interface ColorInfo {
  hex: string
  rgb: { r: number, g: number, b: number } | null
  hsl: { h: number, s: number, l: number } | null
  name: string | null
}

export default function ColorPaletteGenerator() {
  const [baseColor, setBaseColor] = useState('#DC143C')
  const [harmonyType, setHarmonyType] = useState('analogous')
  const [isLoading, setIsLoading] = useState(false)
  const [inputMethod, setInputMethod] = useState<'color' | 'grid' | 'image' | 'text'>('color')
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [userInput, setUserInput] = useState('')
  const [palette, setPalette] = useState<ColorInfo[]>([
    { hex: '#000000', rgb: null, hsl: null, name: 'Black' },
    { hex: '#000000', rgb: null, hsl: null, name: 'Black' },
    { hex: '#000000', rgb: null, hsl: null, name: 'Black' },
    { hex: '#000000', rgb: null, hsl: null, name: 'Black' },
    { hex: '#000000', rgb: null, hsl: null, name: 'Black' }
  ])

  useEffect(() => {
    generatePalette()
  }, [])

  const generatePalette = async () => {
    setIsLoading(true)
    try {
      let colors: string[]
      if (inputMethod === 'text') {
        // Integrate DeepSeek API here
        colors = await generatePaletteFromDeepSeek(userInput)
      } else {
        colors = await generatePaletteFromAPI(baseColor, harmonyType)
      }

      while (colors.length < 5) {
        colors.push(ColorUtils.generateRandomColor())
      }

      const colorInfoPromises = colors.slice(0, 5).map(async (color) => ({
        hex: color,
        rgb: ColorUtils.hexToRgb(color),
        hsl: ColorUtils.hexToHsl(color),
        name: await fetchColorName(color) || color
      }))

      const colorInfo = await Promise.all(colorInfoPromises)
      setPalette(colorInfo)
      toast.success('Palette generated successfully')
    } catch (error) {
      console.error('Error generating palette:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to generate palette')
    } finally {
      setIsLoading(false)
    }
  }

  const generatePaletteFromDeepSeek = async (input: string): Promise<string[]> => {
    try {
      const response = await fetch('/api/generate-palette', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: input,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate palette from description')
      }

      const data = await response.json()
      return data.colors
    } catch (error) {
      console.error('Error generating palette from DeepSeek:', error)
      throw new Error('Failed to generate palette from description')
    }
  }

  const handleCopyColor = (color: string, format: string) => {
    navigator.clipboard.writeText(color)
    toast.success(`Copied ${format} to clipboard`)
  }

  
  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(img, 0, 0)
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const data = imageData.data
          let r = 0, g = 0, b = 0
          for (let i = 0; i < data.length; i += 4) {
            r += data[i]
            g += data[i + 1]
            b += data[i + 2]
          }
          r = Math.floor(r / (data.length / 4))
          g = Math.floor(g / (data.length / 4))
          b = Math.floor(b / (data.length / 4))
          const avgColor = ColorUtils.rgbToHex(r, g, b)
          setBaseColor(avgColor)
          setUploadedImage(e.target?.result as string)
          toast.success(`Base color extracted: ${avgColor}`)
          generatePalette()
        }
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
  
  // Separate download handler functions
  const handlePngDownload = () => {
    const canvas = document.createElement('canvas')
    const scale = window.devicePixelRatio || 1
    canvas.width = 1000 * scale
    canvas.height = 600 * scale
    const ctx = canvas.getContext('2d')
    if (!ctx) return
  
    ctx.scale(scale, scale)
    
    // Set background
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, 1000, 600)
  
    // Draw title
    ctx.fillStyle = '#000000'
    ctx.font = 'bold 24px Arial'
    ctx.fillText('Color Palette', 40, 40)
  
    // Draw colors
    palette.forEach((color, index) => {
      const x = 40
      const y = 80 + (index * 100)
      
      // Color swatch
      ctx.fillStyle = color.hex
      ctx.fillRect(x, y, 200, 80)
      ctx.strokeStyle = '#000000'
      ctx.strokeRect(x, y, 200, 80)
  
      // Color information
      ctx.fillStyle = '#000000'
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

  return (
    <ToolLayout
      title="Color Palette Generator"
      description="Craft the perfect color scheme for your next project"
      toolId="678f382d26f06f912191bcb1"
    >
      <div className="flex flex-col gap-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="space-y-6">
              <Tabs
                selectedKey={inputMethod}
                onSelectionChange={(key) => setInputMethod(key as 'color' | 'grid' | 'image' | 'text')}
              >
                <Tab 
                    key="color" 
                    title={
                        <div className="flex items-center gap-2">
                        <Droplet className="w-4 h-4" />
                        <span>Color Input</span>
                        </div>
                    }
                    >
                    <div className="flex items-center gap-2">
                        <Input
                        type="color"
                        value={baseColor}
                        onChange={(e) => setBaseColor(e.target.value)}
                        className="w-16 h-12 p-1 rounded"
                        variant="bordered"
                        />
                        <Input
                        type="text"
                        value={baseColor}
                        onChange={(e) => setBaseColor(e.target.value)}
                        className="flex-grow"
                        variant="bordered"
                        />
                    </div>
                    </Tab>

                    <Tab 
                        key="grid" 
                        title={
                        <div className="flex items-center gap-2">
                            <Grid className="w-4 h-4" />
                            <span>Color Grid</span>
                        </div>
                        }
                    >
                        <ColorGrid onColorSelect={setBaseColor} selectedColor={baseColor} />
                    </Tab>

                    <Tab 
                        key="image" 
                        title={
                        <div className="flex items-center gap-2">
                            <ImageIcon className="w-4 h-4" />
                            <span>Image Upload</span>
                        </div>
                        }
                        className="border-2 rounded-lg"
                    >
                        <ImageUpload onImageUpload={handleImageUpload} uploadedImage={uploadedImage} />
                    </Tab>

                    <Tab 
                        key="text" 
                        title={
                        <div className="flex items-center gap-2">
                            <Wand2 className="w-4 h-4" />
                            <span>AI Generation</span>
                        </div>
                        }
                    >
                        <Textarea
                        label="Describe your desired color palette"
                        placeholder="E.g., A warm sunset palette with orange and purple tones"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        variant="bordered"
                        />
                    </Tab>
              </Tabs>

              {inputMethod !== 'text' && (
                <Select
                  label="Harmony Type"
                  selectedKeys={[harmonyType]}
                  onChange={(e) => setHarmonyType(e.target.value)}
                  variant="bordered"
                >
                  <SelectItem key="analogous" value="analogous" className="text-default-700">Analogous</SelectItem>
                  <SelectItem key="monochromatic" value="monochromatic" className="text-default-700">Monochromatic</SelectItem>
                  <SelectItem key="triadic" value="triadic" className="text-default-700">Triadic</SelectItem>
                  <SelectItem key="complementary" value="complementary" className="text-default-700">Complementary</SelectItem>
                  <SelectItem key="split-complementary" value="split-complementary" className="text-default-700">Split Complementary</SelectItem>
                  <SelectItem key="tetradic" value="tetradic" className="text-default-700">Tetradic</SelectItem>
                </Select>
              )}

              <Button
                onClick={generatePalette}
                color="primary"
                isLoading={isLoading}
                startContent={<Shuffle className="h-5 w-5" />}
              >
                Generate Palette
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Generated Palette Section */}
        <Card className="mt-6 bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="flex flex-wrap gap-4">
              {palette.map((color, index) => (
                <div key={index} className="flex-1 min-w-[150px]">
                  <div
                    className="w-full h-24 rounded-t-lg relative group transition-all duration-300 ease-in-out hover:scale-105"
                    style={{ backgroundColor: color.hex }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-t-lg">
                      <Button
                        onClick={() => handleCopyColor(color.hex, 'HEX')}
                        className="bg-white/10 hover:bg-white/20 text-white p-1 rounded-full"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="bg-default-100 p-3 rounded-b-lg">
                    <p className="text-default-900 font-semibold truncate">{color.name}</p>
                    <p className="text-default-500 text-sm">{color.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
      
        </Card>
        <div className="flex items-center justify-center gap-2 mt-4">
            <Button 
                onClick={handlePngDownload}
                color="primary"
                variant="flat"
                startContent={<Download className="h-4 w-4" />}
            >
                Download PNG
            </Button>
            <Button
                onClick={handleCssDownload}
                color="secondary"
                variant="flat"
                startContent={<Download className="h-4 w-4" />}
            >
                Download CSS
            </Button>
            <Button
                onClick={handleScssDownload}
                color="success"
                variant="flat"
                startContent={<Download className="h-4 w-4" />}
            >
                Download SCSS
            </Button>
            </div>
            <Card className="mt-6 bg-default-50 dark:bg-default-100 p-4 md:p-8">
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
                <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                About Color Palette Generator
                </h2>
                <p className="text-sm md:text-base text-default-600 mb-4">
                The Color Palette Generator is a versatile tool that helps you create harmonious color combinations for your projects. Whether you're starting with a specific color, choosing from a color grid, extracting colors from an image, or using AI to generate palettes from descriptions, this tool provides multiple ways to discover and create perfect color combinations.
                </p>
                
                <div className="my-8">
                <NextImage
                    src="/api/placeholder/600/400"
                    alt="Screenshot of the Color Palette Generator interface showing various input methods and generated palettes"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg w-full h-auto"
                />
                </div>

                <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use Color Palette Generator?
                </h2>
                <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>Choose your preferred input method: Color Input, Color Grid, Image Upload, or AI Generation.</li>
                <li>For direct color input, use the color picker or enter a hex code.</li>
                <li>With image upload, let the tool extract the dominant color from your image.</li>
                <li>For AI-powered generation, describe your desired palette in natural language.</li>
                <li>Select a harmony type (analogous, monochromatic, etc.) for color-based generation.</li>
                <li>Click "Generate Palette" to create your color combination.</li>
                <li>Copy individual colors or download the entire palette in various formats.</li>
                </ol>

                <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Key Features
                </h2>
                <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>Multiple input methods including direct color selection, grid, image upload, and AI generation</li>
                <li>Six different color harmony types for diverse palette creation</li>
                <li>AI-powered palette generation from text descriptions</li>
                <li>Color extraction from uploaded images</li>
                <li>Export options in PNG, CSS, and SCSS formats</li>
                <li>Color information display including HEX, RGB, and HSL values</li>
                <li>One-click copy functionality for quick color access</li>
                <li>Dark mode support for comfortable viewing</li>
                </ul>

                <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Palette className="w-6 h-6 mr-2" />
                Applications and Use Cases
                </h2>
                <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
                <li><strong>Web Development:</strong> Generate consistent color schemes for websites and applications.</li>
                <li><strong>UI/UX Design:</strong> Create harmonious color palettes for user interfaces.</li>
                <li><strong>Brand Identity:</strong> Develop color schemes from existing brand colors or images.</li>
                <li><strong>Content Creation:</strong> Extract colors from images for matching design elements.</li>
                <li><strong>AI-Assisted Design:</strong> Generate palettes from mood or theme descriptions.</li>
                <li><strong>Design Systems:</strong> Create and export color variables for systematic usage.</li>
                <li><strong>Visual Harmony:</strong> Explore color relationships through different harmony types.</li>
                </ul>

                <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Eye className="w-6 h-6 mr-2" />
                Tips for Effective Use
                </h2>
                <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>Use the color grid for quick exploration of predefined colors.</li>
                <li>Upload images related to your project for context-aware color extraction.</li>
                <li>Experiment with different harmony types to find the perfect combination.</li>
                <li>Use AI generation with specific descriptions of moods or themes.</li>
                <li>Test your palettes in both light and dark modes for versatility.</li>
                <li>Save multiple versions of your palettes in different formats.</li>
                </ul>

                <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Code className="w-6 h-6 mr-2" />
                Integration Tips
                </h2>
                <p className="text-sm md:text-base text-default-600">To effectively implement your generated palettes in your projects:</p>
                <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600 mt-2">
                <li>Download the CSS file to get ready-to-use CSS custom properties</li>
                <li>Use the SCSS version for more advanced styling workflows</li>
                <li>Save the PNG export for visual reference and documentation</li>
                <li>Copy individual color codes in your preferred format (HEX, RGB, HSL)</li>
                <li>Use the generated color classes for quick styling implementation</li>
                </ul>
            </div>
            </Card>   

      </div>
    </ToolLayout>
  )
}