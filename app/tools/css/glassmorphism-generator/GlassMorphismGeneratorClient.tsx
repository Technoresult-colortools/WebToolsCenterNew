'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button, Card, CardBody, Input, Select, SelectItem, Slider, Switch, Textarea } from "@nextui-org/react"
import { toast } from 'react-hot-toast'
import { RefreshCw, Copy, Download } from 'lucide-react'
import ToolLayout from '@/components/ToolLayout'
import InfoSectionGlassmorphism from "./info-section"

type GlassShape = 'rectangle' | 'circle' | 'custom'

const GlassmorphismGenerator = () => {
  const [glassColor, setGlassColor] = useState('#ffffff')
  const [blurIntensity, setBlurIntensity] = useState(10)
  const [transparency, setTransparency] = useState(0.25)
  const [borderWidth, setBorderWidth] = useState(1)
  const [borderColor, setBorderColor] = useState('#ffffff')
  const [borderRadius, setBorderRadius] = useState(10)
  const [shape, setShape] = useState<GlassShape>('rectangle')
  const [showContent, setShowContent] = useState(true)
  const [useCustomBackground, setUseCustomBackground] = useState(false)
  const [customBackgroundUrl, setCustomBackgroundUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('/placeholder.svg?height=400&width=600')
  const [boxShadow, setBoxShadow] = useState('0 8px 32px 0 rgba(31, 38, 135, 0.37)')
  const [showGuides, setShowGuides] = useState(true)
  const [customShape, setCustomShape] = useState('')

  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    shuffleImage()
  }, [])

  const generateCSS = () => {
    let css = `.glassmorphism {
    background: rgba(${hexToRgb(glassColor)}, ${transparency});
    backdrop-filter: blur(${blurIntensity}px);
    -webkit-backdrop-filter: blur(${blurIntensity}px);
    border: ${borderWidth}px solid rgba(${hexToRgb(borderColor)}, 0.18);
    box-shadow: ${boxShadow};
  `

    if (shape === 'circle') {
      css += '  border-radius: 50%;\n'
    } else if (shape === 'rectangle') {
      css += `  border-radius: ${borderRadius}px;\n`
    } else if (shape === 'custom') {
      css += `  clip-path: ${customShape};\n`
    }

    css += '}'

    return css.trim()
  }

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '255, 255, 255'
  }

  const handleShuffleImage = () => {
    const randomId = Math.floor(Math.random() * 1000)
    setImageUrl(`https://picsum.photos/seed/${randomId}/600/400`)
  }

  const handleCustomBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCustomBackgroundUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generateCSS())
    toast.success('CSS copied to clipboard!')
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([generateCSS()], { type: 'text/css' })
    element.href = URL.createObjectURL(file)
    element.download = 'glassmorphism.css'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast.success('CSS file downloaded!')
  }

  const handleReset = () => {
    setGlassColor('#ffffff')
    setBlurIntensity(10)
    setTransparency(0.25)
    setBorderWidth(1)
    setBorderColor('#ffffff')
    setBorderRadius(10)
    setShape('rectangle')
    setShowContent(true)
    setUseCustomBackground(false)
    setCustomBackgroundUrl('')
    setBoxShadow('0 8px 32px 0 rgba(31, 38, 135, 0.37)')
    setShowGuides(true)
    setCustomShape('')
    shuffleImage()
    toast.success('Settings reset to default!')
  }

  const shuffleImage = () => {
    const randomId = Math.floor(Math.random() * 1000)
    setImageUrl(`https://picsum.photos/seed/${randomId}/600/400`)
  }


  return (
    <ToolLayout
      title="CSS Glassmorphism Generator"
      description="Create stunning glass-like UI elements with advanced customization options"
      toolId="678f382b26f06f912191bc9b"
    >
      <div className="flex flex-col gap-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Preview Section with Controls */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left side: Preview */}
                <div className="flex-1">
                  <div
                    ref={previewRef}
                    className="relative bg-default-100 rounded-lg overflow-hidden"
                    style={{ width: '100%', paddingBottom: '66.67%' }}
                  >
                    <img
                      src={useCustomBackground && customBackgroundUrl ? customBackgroundUrl : imageUrl}
                      alt="Background"
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                    <div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 glassmorphism"
                      style={{
                        background: `rgba(${hexToRgb(glassColor)}, ${transparency})`,
                        backdropFilter: `blur(${blurIntensity}px)`,
                        WebkitBackdropFilter: `blur(${blurIntensity}px)`,
                        border: `${borderWidth}px solid rgba(${hexToRgb(borderColor)}, 0.18)`,
                        boxShadow,
                        ...(shape === 'circle' ? { borderRadius: '50%' } :
                          shape === 'rectangle' ? { borderRadius: `${borderRadius}px` } :
                            shape === 'custom' ? { clipPath: customShape } : {}),
                      }}
                    >
                      {showContent && (
                        <div className="p-4 text-white">
                          <h3 className="text-xl font-bold mb-2">Glassmorphism</h3>
                          <p>This is how your glassmorphism effect will look.</p>
                        </div>
                      )}
                    </div>
                    {showGuides && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="w-full h-full border-2 border-dashed border-white opacity-50"></div>
                        <div className="absolute top-1/2 left-0 w-full border-t-2 border-dashed border-white opacity-50"></div>
                        <div className="absolute top-0 left-1/2 h-full border-l-2 border-dashed border-white opacity-50"></div>
                      </div>
                    )}
                  </div>
                  <div className="text-default-500 text-center mt-2">
                    Preview
                  </div>
                </div>

                {/* Right side: Immediate controls */}
                <div className="flex-1 space-y-4">
                  <Select
                    label="Shape"
                    variant="bordered"
                    selectedKeys={[shape]}
                    onSelectionChange={(keys) => setShape(Array.from(keys)[0] as GlassShape)}
                    className="w-full"
                  >
                    <SelectItem key="rectangle" value="rectangle">Rectangle</SelectItem>
                    <SelectItem key="circle" value="circle">Circle</SelectItem>
                    <SelectItem key="custom" value="custom">Custom</SelectItem>
                  </Select>

                  {shape === 'custom' && (
                    <Textarea
                      label="Custom Shape (clip-path)"
                      value={customShape}
                      onChange={(e) => setCustomShape(e.target.value)}
                      placeholder="e.g., polygon(50% 0%, 0% 100%, 100% 100%)"
                      variant="bordered"
                    />
                  )}

                  <div className="flex flex-col gap-2">
                    <Switch
                      isSelected={showGuides}
                      onValueChange={setShowGuides}
                    >
                      Show Guides
                    </Switch>
                    <Switch
                      isSelected={showContent}
                      onValueChange={setShowContent}
                    >
                      Show Content
                    </Switch>
                    <Button
                      onClick={handleShuffleImage}
                      color="secondary"
                      startContent={<RefreshCw className="h-5 w-5" />}
                    >
                      Shuffle Background
                    </Button>
                  </div>
                </div>
              </div>

              {/* Color and Transparency Controls */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm mb-2 block">Glass Color</label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="text"
                        value={glassColor}
                        variant="bordered"
                        onChange={(e) => setGlassColor(e.target.value)}
                        className="flex-grow"
                      />
                      <input
                        type="color"
                        value={glassColor}
                        onChange={(e) => setGlassColor(e.target.value)}
                        className="w-8 h-8 rounded cursor-pointer"
                      />
                    </div>
                  </div>

                  <Slider
                    label={`Blur Intensity: ${blurIntensity}px`}
                    value={blurIntensity}
                    onChange={(value) => setBlurIntensity(value as number)}
                    minValue={0}
                    maxValue={20}
                    step={1}
                    className="w-full"
                  />

                  <Slider
                    label={`Transparency: ${transparency.toFixed(2)}`}
                    value={transparency}
                    onChange={(value) => setTransparency(value as number)}
                    minValue={0}
                    maxValue={1}
                    step={0.01}
                    className="w-full"
                  />
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm mb-2 block">Border Color</label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="text"
                        value={borderColor}
                        variant="bordered"
                        onChange={(e) => setBorderColor(e.target.value)}
                        className="flex-grow"
                      />
                      <input
                        type="color"
                        value={borderColor}
                        onChange={(e) => setBorderColor(e.target.value)}
                        className="w-8 h-8 rounded cursor-pointer"
                      />
                    </div>
                  </div>

                  <Slider
                    label={`Border Width: ${borderWidth}px`}
                    value={borderWidth}
                    onChange={(value) => setBorderWidth(value as number)}
                    minValue={0}
                    maxValue={10}
                    step={1}
                    className="w-full"
                  />

                  {shape !== 'circle' && shape !== 'custom' && (
                    <Slider
                      label={`Border Radius: ${borderRadius}px`}
                      value={borderRadius}
                      onChange={(value) => setBorderRadius(value as number)}
                      minValue={0}
                      maxValue={50}
                      step={1}
                      className="w-full"
                    />
                  )}
                </div>
              </div>

              <div className="w-full space-y-2">
                <span className="text-sm">Background Options</span>
                <Card className="border-1 border-default-200">
                  <CardBody className="p-6">
                    <div className="flex flex-col gap-6">
                      {/* Custom Background Toggle */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Use Custom Background</span>
                        <Switch
                          isSelected={useCustomBackground}
                          onValueChange={setUseCustomBackground}
                          className="ml-4"
                        />
                      </div>

                      {/* File Upload Section */}
                      {useCustomBackground && (
                        <div className="w-full">
                          <div className="flex flex-col gap-2">
                            <span className="text-sm text-default-600">
                              Upload Background Image
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleCustomBackgroundUpload}
                              className="block w-full text-sm
                                    file:mr-4 file:py-2 file:px-4 
                                    file:rounded-lg file:border-0 
                                    file:text-sm file:font-semibold
                                    file:bg-primary file:text-white 
                                    hover:file:bg-primary/90
                                    cursor-pointer rounded-lg
                                    border-2 border-dashed
                                    border-default-200
                                    dark:border-default-100
                                    p-2"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </div>
              {/* Generated CSS */}
              <div>
                <span className="text-sm mb-2 block">Generated CSS</span>
                <Card className="bg-content2">
                  <CardBody>
                    <Textarea
                      isReadOnly
                      value={generateCSS()}
                      variant="bordered"
                      minRows={6}
                      className="font-mono text-sm"
                    />
                  </CardBody>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                <Button
                  color="danger"
                  variant="flat"
                  onClick={handleReset}
                  startContent={<RefreshCw className="w-5 h-5" />}
                  className="w-full sm:w-auto"
                >
                  Reset
                </Button>
                <div className="flex gap-2">
                  <Button
                    color="primary"
                    onClick={handleCopy}
                    startContent={<Copy className="w-5 h-5" />}
                    className="w-full sm:w-auto"
                  >
                    Copy CSS
                  </Button>
                  <Button
                    color="success"
                    onClick={handleDownload}
                    startContent={<Download className="w-5 h-5" />}
                    className="w-full sm:w-auto"
                  >
                    Download
                  </Button>
                </div>
              </div>

            </div>
          </CardBody>
        </Card>

      </div>
      <InfoSectionGlassmorphism />
    </ToolLayout>
  );
};

export default GlassmorphismGenerator;