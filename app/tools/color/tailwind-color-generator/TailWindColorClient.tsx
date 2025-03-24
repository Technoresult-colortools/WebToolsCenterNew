"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { Search, X, Info, BookOpen, Lightbulb } from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import { toast } from "react-hot-toast"
import { Button, Card, CardBody, Input, Tabs, Tab } from "@nextui-org/react"
import { defaultColors, type ColorShade, type ColorPalette } from "./color-data"
import { generateComplementaryColors, generateAnalogousColors, generateTriadicColors } from "./color-utils"

export default function TailwindColorGenerator() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredColors, setFilteredColors] = useState<ColorPalette>(defaultColors)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [customColor, setCustomColor] = useState("#000000")
  const [generatedPalette, setGeneratedPalette] = useState<ColorShade[]>([])

  const colorSchemes = useMemo(() => {
    if (!selectedColor) return null
    const [colorName, shade] = selectedColor.split("-")
    const hexColor = defaultColors[colorName].find((s) => s.shade === shade)?.hex || "#000000"
    return {
      complementary: generateComplementaryColors(hexColor),
      analogous: generateAnalogousColors(hexColor),
      triadic: generateTriadicColors(hexColor),
    }
  }, [selectedColor])

  useEffect(() => {
    const filtered = Object.entries(defaultColors).reduce((acc, [colorName, shades]) => {
      const filteredShades = shades.filter(
        (shade) =>
          colorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shade.shade.includes(searchTerm) ||
          shade.hex.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      if (filteredShades.length > 0) {
        acc[colorName] = filteredShades
      }
      return acc
    }, {} as ColorPalette)
    setFilteredColors(filtered)
  }, [searchTerm])

  const copyToClipboard = (text: string, isClass = false) => {
    const copyText = isClass ? `bg-${text}` : text
    navigator.clipboard.writeText(copyText)
    toast.success("Copied to clipboard!")
  }

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomColor(e.target.value)
    setGeneratedPalette(generateCustomPalette(e.target.value))
  }

  const generateCustomPalette = (baseColor: string): ColorShade[] => {
    // This is a simplified version. You might want to use a more sophisticated algorithm
    const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
    return shades.map((shade) => ({
      shade: shade.toString(),
      hex: adjustBrightness(baseColor, (shade - 500) / 400),
    }))
  }

  const adjustBrightness = (hex: string, factor: number): string => {
    // Convert hex to RGB
    let r = Number.parseInt(hex.slice(1, 3), 16)
    let g = Number.parseInt(hex.slice(3, 5), 16)
    let b = Number.parseInt(hex.slice(5, 7), 16)

    // Adjust brightness
    r = Math.round(r * (1 + factor))
    g = Math.round(g * (1 + factor))
    b = Math.round(b * (1 + factor))

    // Ensure values are within 0-255 range
    r = Math.min(255, Math.max(0, r))
    g = Math.min(255, Math.max(0, g))
    b = Math.min(255, Math.max(0, b))

    // Convert back to hex
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
  }

  return (
    <ToolLayout
      title="Tailwind CSS Color Generator"
      description="Discover, generate, and experiment with Tailwind CSS colors in a sleek, futuristic interface"
      toolId="678f382e26f06f912191bcb4"
    >
      <div className="max-w-7xl mx-auto">
        <Card className="bg-default-50 dark:bg-default-100 shadow-md mb-8">
          <CardBody className="gap-6 p-6">
            <div className="relative w-full max-w-md mx-auto mb-8">
              <Input
                type="text"
                placeholder="Search colors..."
                variant="bordered"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10"
                endContent={
                  searchTerm ? (
                    <Button
                      isIconOnly
                      variant="light"
                      onClick={() => setSearchTerm("")}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2"
                    >
                      <X size={18} />
                    </Button>
                  ) : (
                    <Search className="text-default-400" />
                  )
                }
              />
            </div>

            <Tabs aria-label="Color options">
              <Tab key="tailwind" title="Tailwind Colors">
                <div className="space-y-8">
                  {Object.entries(filteredColors).map(([colorName, shades]) => (
                    <Card key={colorName} className="bg-default-100 dark:bg-default-50">
                      <CardBody>
                        <h3 className="text-xl font-semibold capitalize mb-4">{colorName}</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                          {shades.map((shade) => (
                            <div
                              key={shade.shade}
                              className="flex flex-col items-center p-4 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg cursor-pointer"
                              onClick={() => setSelectedColor(`${colorName}-${shade.shade}`)}
                            >
                              <div
                                className="w-16 h-16 rounded-lg mb-2 border shadow-inner"
                                style={{ backgroundColor: shade.hex }}
                              ></div>
                              <span className="font-medium mb-1">{shade.shade}</span>
                              <span className="text-small text-default-500 mb-2">{shade.hex}</span>
                              <div className="flex flex-wrap justify-center gap-2 mt-2">
                                <Button
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    copyToClipboard(`${colorName}-${shade.shade}`, true)
                                  }}
                                >
                                  Class
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    copyToClipboard(shade.hex)
                                  }}
                                >
                                  Hex
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </Tab>
              <Tab key="custom" title="Custom Generator">
                <Card className="bg-default-100 dark:bg-default-50">
                  <CardBody>
                    <h3 className="text-xl font-semibold mb-4">Custom Color Generator</h3>
                    <div className="flex items-center space-x-4 mb-6">
                      <Input
                        type="color"
                        value={customColor}
                        onChange={handleCustomColorChange}
                        className="w-12 h-12 p-1 rounded-lg"
                      />
                      <Input type="text" value={customColor} onChange={handleCustomColorChange} />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {generatedPalette.map((shade) => (
                        <div
                          key={shade.shade}
                          className="flex flex-col items-center p-4 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg cursor-pointer"
                        >
                          <div
                            className="w-16 h-16 rounded-lg mb-2 border shadow-inner"
                            style={{ backgroundColor: shade.hex }}
                          ></div>
                          <span className="font-medium mb-1">{shade.shade}</span>
                          <span className="text-small text-default-500 mb-2">{shade.hex}</span>
                          <div className="flex flex-wrap justify-center gap-2 mt-2">
                            <Button size="sm" onClick={() => copyToClipboard(`custom-${shade.shade}`, true)}>
                              Class
                            </Button>
                            <Button size="sm" onClick={() => copyToClipboard(shade.hex)}>
                              Hex
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>

            {selectedColor && colorSchemes && (
              <Card className="bg-default-100 dark:bg-default-50 mt-8">
                <CardBody>
                  <h3 className="text-xl font-semibold mb-4">Color Schemes for {selectedColor}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-lg font-medium mb-2">Complementary</h4>
                      <div className="flex space-x-2">
                        {colorSchemes.complementary.map((color, index) => (
                          <div
                            key={index}
                            className="w-12 h-12 rounded-lg border shadow-inner cursor-pointer"
                            style={{ backgroundColor: color }}
                            onClick={() => copyToClipboard(color)}
                            title={`Copy ${color}`}
                          ></div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">Analogous</h4>
                      <div className="flex space-x-2">
                        {colorSchemes.analogous.map((color, index) => (
                          <div
                            key={index}
                            className="w-12 h-12 rounded-lg border shadow-inner cursor-pointer"
                            style={{ backgroundColor: color }}
                            onClick={() => copyToClipboard(color)}
                            title={`Copy ${color}`}
                          ></div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">Triadic</h4>
                      <div className="flex space-x-2">
                        {colorSchemes.triadic.map((color, index) => (
                          <div
                            key={index}
                            className="w-12 h-12 rounded-lg border shadow-inner cursor-pointer"
                            style={{ backgroundColor: color }}
                            onClick={() => copyToClipboard(color)}
                            title={`Copy ${color}`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            )}
          </CardBody>
        </Card>

        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                About Tailwind Color Generator
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
              The tailwind color generator is an advanced tool designed for web developers, designers and digital artists. It provides a comprehensive exploration and manipulation platform for tailwind CSS colors, allowing users to easily browse, find and generate custom color palettes. This tool is particularly useful when working with web design, CSS styling, or any project, which requires accurate color management and stability in various color representations.
              </p>
              <p className="text-sm md:text-base text-default-600 mb-4">
              With features such as real-time color preview, interactive color selection, custom palette generation, and support for various color formats, the telvind color generator streamlines your workflow and ensures accurate color representation in your projects. This is perfect for making persistent color schemes, searching color relationships, or simply diving deep into the wide world of tailwind CSS colors.
              </p>

              <h2
                id="how-to-use"
                className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center"
              >
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use the Tailwind Color Generator?
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>Use the search bar to quickly find specific colors or shades within the Tailwind palette.</li>
                <li>Click on any color swatch to view more details and copy its class name or hex code.</li>
                <li>Explore different shades of each color family to find the perfect hue for your project.</li>
                <li>
                  Switch to the Custom Generator tab to create your own color palette based on a chosen base color.
                </li>
                <li>Adjust the base color using the color picker or by entering a hex code.</li>
                <li>View and copy generated custom shades that complement your base color.</li>
                <li>Explore complementary, analogous, and triadic color schemes for selected colors.</li>
                <li>Use the copy buttons to quickly add color values to your clipboard for use in your projects.</li>
                <li>Experiment with different color combinations to create unique and harmonious designs.</li>
              </ol>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Key Features
              </h2>
              <ul className="list-disc list-inside text-default-600 space-y-2 text-sm md:text-base">
                <li>Comprehensive Tailwind CSS color palette browser</li>
                <li>Powerful search functionality for quick color location</li>
                <li>Custom color palette generator</li>
                <li>Real-time color preview and interaction</li>
                <li>Support for both class names and hex code formats</li>
                <li>One-click copying of color values to clipboard</li>
                <li>Color scheme suggestions (complementary, analogous, triadic)</li>
                <li>Responsive design for seamless use on desktop and mobile devices</li>
                <li>Intuitive and user-friendly interface</li>
                <li>Detailed information and usage tips for each color</li>
              </ul>

              <p className="text-sm md:text-base text-default-600 mt-6">
                Ready to elevate your color workflow? Start using our Tailwind Color Generator now and experience the
                power of efficient color management and exploration. Whether you're a seasoned web developer working on
                complex projects, a designer crafting the perfect user interface, or a newcomer to the world of web
                design, our tool provides the functionality and inspiration you need. Try it out today and see how it
                can streamline your design process, spark your creativity, and help you make the most of Tailwind CSS's
                robust color system!
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </ToolLayout>
  )
}

