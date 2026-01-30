"use client"

import { useState, useEffect } from "react"
import {
  Button,
  Input,
  Slider,
  Switch,
  Select,
  SelectItem,
  Tabs,
  Tab,
  Card,
  CardBody,
  Modal,
  ModalContent,

} from "@nextui-org/react"
import { toast, } from "react-hot-toast"
import {
  Copy,
  RefreshCw,
  Download,
  Palette,
  Eye,
  EyeOff,
  Maximize2,
  Sliders,
  X,
} from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import InfoSectionTextGlitch from "./info-section"
import { glitchEffects, type GlitchEffect } from "./glitcheffects"

export default function TextGlitchEffectGenerator() {
  const [text, setText] = useState("WebTools")
  const [fontSize, setFontSize] = useState(94)
  const [backgroundColor, setBackgroundColor] = useState("#222222")
  const [textColor, setTextColor] = useState("#ffffff")
  const [glitchColor1, setGlitchColor1] = useState("#00ffff")
  const [glitchColor2, setGlitchColor2] = useState("#ff00ff")
  const [glitchEffect, setGlitchEffect] = useState<GlitchEffect>("rgb-split")
  const [glitchIntensity, setGlitchIntensity] = useState(5)
  const [animationSpeed, setAnimationSpeed] = useState(0.5)
  const [showScanLines, setShowScanLines] = useState(true)
  const [customCSS, setCustomCSS] = useState("")
  const [generatedCSS, setGeneratedCSS] = useState("")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fontWeight, setFontWeight] = useState(700)
  const [letterSpacing, setLetterSpacing] = useState(3)

  const generateCSS = () => {
    const effectFunction = glitchEffects[glitchEffect];
    if (typeof effectFunction !== 'function') {
      console.error(`Effect function not found for effect: ${glitchEffect}`);
      return '';
    }
    let css = `
  .glitch-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: ${backgroundColor};
  }
  
  .glitch {
    position: relative;
    font-size: ${fontSize}px;
    font-weight: ${fontWeight};
    color: ${textColor};
    letter-spacing: ${letterSpacing}px;
    z-index: 1;
  }
  
  ${glitchEffects[glitchEffect](text, glitchColor1, glitchColor2, glitchIntensity, animationSpeed)}
  `

    if (showScanLines) {
      css += `
  .scan-lines {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.05) 0px,
      rgba(0, 0, 0, 0.05) 1px,
      rgba(0, 0, 0, 0) 1px,
      rgba(0, 0, 0, 0) 2px
    );
    pointer-events: none;
  }
  `
    }

    if (glitchEffect === "custom") {
      css += customCSS
    }

    return css.trim()
  }

  useEffect(() => {
    const css = generateCSS()
    setGeneratedCSS(css)

    const styleTag = document.createElement("style")
    styleTag.innerHTML = css
    document.head.appendChild(styleTag)

    return () => {
      document.head.removeChild(styleTag)
    }
  }, [
    backgroundColor,
    glitchColor1,
    glitchColor2,
    glitchEffect,
    glitchIntensity,
    animationSpeed,
    showScanLines,
    customCSS,
    fontSize,
    fontWeight,
    letterSpacing,
    text,
    textColor,
  ])

  const handleCopy = () => {
    const html = `
  <div class="glitch-wrapper">
    <div class="glitch" data-text="${text}">${text}</div>
    ${showScanLines ? '<div class="scan-lines"></div>' : ""}
  </div>
  `.trim()

    const fullCode = `${html}\n\n<style>\n${generatedCSS}\n</style>`
    navigator.clipboard.writeText(fullCode)
    toast.success("HTML & CSS copied to clipboard!")
  }

  const handleDownload = () => {
    const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Glitch Text Effect</title>
    <style>
  ${generatedCSS}
    </style>
  </head>
  <body>
    <div class="glitch-wrapper">
      <div class="glitch" data-text="${text}">${text}</div>
      ${showScanLines ? '<div class="scan-lines"></div>' : ""}
    </div>
  </body>
  </html>
  `.trim()

    const blob = new Blob([html], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "glitch-text-effect.html"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("HTML file downloaded!")
  }

  const handleReset = () => {
    setText("WebTools")
    setFontSize(94)
    setBackgroundColor("#222222")
    setTextColor("#ffffff")
    setGlitchColor1("#00ffff")
    setGlitchColor2("#ff00ff")
    setGlitchEffect("rgb-split")
    setGlitchIntensity(5)
    setAnimationSpeed(0.5)
    setShowScanLines(true)
    setCustomCSS("")
    setFontWeight(700)
    setLetterSpacing(3)
    toast.success("Settings reset to default!")
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const renderGlitchPreview = () => (
    <div
      className="glitch-wrapper"
      style={{
        backgroundColor,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="glitch"
        data-text={text}
        style={{
          fontSize: `${fontSize}px`,
          fontWeight: fontWeight,
          color: textColor,
          letterSpacing: `${letterSpacing}px`,
        }}
      >
        {text}
      </div>
      {showScanLines && <div className="scan-lines"></div>}
    </div>
  )

  const renderFullscreenPreview = () => (
    <Modal
      isOpen={isFullscreen}
      onOpenChange={setIsFullscreen}
      size="full"
      classNames={{
        base: "bg-black/50 backdrop-blur-md",
        wrapper: "max-w-full h-full",
      }}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-[90%] h-[90%] bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl relative">
              <Button
                isIconOnly
                variant="flat"
                color="danger"
                onPress={onClose}
                className="absolute top-4 right-4 z-50"
              >
                <X className="w-6 h-6" />
              </Button>
              <div className="w-full h-full overflow-hidden rounded-lg">
                {renderGlitchPreview()}
              </div>
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  );



  return (
    <ToolLayout
      title="CSS Text Glitch Effect Generator"
      description="Create eye-catching, customizable glitchy text effects using CSS with advanced options and features"
      toolId="678f382b26f06f912191bc9c"
    >
      <div className="flex flex-col gap-8">

        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="space-y-8">
              <div>
                <div className="relative">
                  <div className="w-full h-64 rounded-lg overflow-hidden">{renderGlitchPreview()}</div>
                  <div className="absolute bottom-2 right-2 flex space-x-2">
                    <Button size="sm" variant="flat" onClick={() => setShowScanLines(!showScanLines)}>
                      {showScanLines ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Button>
                    <Button size="sm" variant="flat" onClick={toggleFullscreen}>
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <Tabs aria-label="Glitch Effect Options">
                <Tab
                  key="text"
                  title={
                    <div className="flex items-center space-x-2">
                      <Sliders className="h-4 w-4" />
                      <span>Text Settings</span>
                    </div>
                  }
                >
                  <div className="space-y-4 ">
                    <div>
                      <label htmlFor="text" className="block text-sm font-medium mb-2">
                        Text
                      </label>
                      <Input id="text" variant="bordered" value={text} onChange={(e) => setText(e.target.value)} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Left Column */}
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Font Size: {fontSize}px
                          </label>
                          <Slider
                            aria-label="Font Size"
                            size="md"
                            step={1}
                            minValue={10}
                            maxValue={200}
                            value={fontSize}
                            onChange={(value) => setFontSize(value as number)}
                            className="w-full"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Font Weight: {fontWeight}
                          </label>
                          <Slider
                            aria-label="Font Weight"
                            size="md"
                            step={100}
                            minValue={100}
                            maxValue={900}
                            value={fontWeight}
                            onChange={(value) => setFontWeight(value as number)}
                            className="w-full"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Letter Spacing: {letterSpacing}px
                          </label>
                          <Slider
                            aria-label="Letter Spacing"
                            size="md"
                            step={0.5}
                            minValue={0}
                            maxValue={10}
                            value={letterSpacing}
                            onChange={(value) => setLetterSpacing(value as number)}
                            className="w-full"
                          />
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Text Color
                          </label>
                          <div className="flex items-center gap-2">
                            <Input
                              type="color"
                              id="textColor"
                              variant="bordered"
                              value={textColor}
                              onChange={(e) => setTextColor(e.target.value)}
                              className="w-16 h-10 p-1 bg-transparent"
                            />
                            <Input
                              type="text"
                              variant="bordered"
                              value={textColor}
                              onChange={(e) => setTextColor(e.target.value)}
                              className="flex-1"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Background Color
                          </label>
                          <div className="flex items-center gap-2">
                            <Input
                              type="color"
                              id="backgroundColor"
                              variant="bordered"
                              value={backgroundColor}
                              onChange={(e) => setBackgroundColor(e.target.value)}
                              className="w-16 h-10 p-1 bg-transparent"
                            />
                            <Input
                              type="text"
                              variant="bordered"
                              value={backgroundColor}
                              onChange={(e) => setBackgroundColor(e.target.value)}
                              className="flex-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab
                  key="glitch"
                  title={
                    <div className="flex items-center space-x-2">
                      <Palette className="h-4 w-4" />
                      <span>Glitch Settings</span>
                    </div>
                  }
                >
                  <div className="space-y-4 mt-4">
                    <div>
                      <label htmlFor="glitchEffect" className="block text-sm font-medium mb-2">
                        Glitch Effect
                      </label>
                      <Select
                        id="glitchEffect"
                        variant="bordered"
                        selectedKeys={[glitchEffect]}
                        onChange={(e) => {
                          // Cast the value to GlitchEffect type
                          const newEffect = e.target.value as GlitchEffect;
                          setGlitchEffect(newEffect);
                        }}
                      >
                        <SelectItem key="rgb-split" value="rgb-split" className="text-default-700">RGB Split</SelectItem>
                        <SelectItem key="color" value="color" className="text-default-700">Color</SelectItem>
                        <SelectItem key="noise" value="noise" className="text-default-700">Noise</SelectItem>
                        <SelectItem key="transformation" value="transformation" className="text-default-700">Transformation</SelectItem>
                        <SelectItem key="glitch-clip" value="glitch-clip" className="text-default-700">Glitch Clip</SelectItem>
                        <SelectItem key="distortion" value="distortion" className="text-default-700">Distortion</SelectItem>
                        <SelectItem key="pixelate" value="pixelate" className="text-default-700">Pixelate</SelectItem>
                        <SelectItem key="wave" value="wave" className="text-default-700">Wave</SelectItem>

                        {/* New glitch effects */}
                        <SelectItem key="scan-line" value="scan-line" className="text-default-700">Scan Line</SelectItem>
                        <SelectItem key="vhs-tracking" value="vhs-tracking" className="text-default-700">VHS Tracking</SelectItem>
                        <SelectItem key="data-corruption" value="data-corruption" className="text-default-700">Data Corruption</SelectItem>
                        <SelectItem key="digital-decay" value="digital-decay" className="text-default-700">Digital Decay</SelectItem>
                        <SelectItem key="terminal-error" value="terminal-error" className="text-default-700">Terminal Error</SelectItem>
                        <SelectItem key="hologram" value="hologram" className="text-default-700">Hologram</SelectItem>
                        <SelectItem key="glitch-blur" value="glitch-blur" className="text-default-700">Glitch Blur</SelectItem>
                        <SelectItem key="crt-shutdown" value="crt-shutdown" className="text-default-700">CRT Shutdown</SelectItem>
                        <SelectItem key="magnetic-interference" value="magnetic-interference" className="text-default-700">Magnetic Interference</SelectItem>

                        <SelectItem key="custom" value="custom" className="text-default-700">Custom</SelectItem>
                      </Select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                      <div className="flex flex-col space-y-4">
                        <div>
                          <label htmlFor="glitchColor1" className="block text-sm font-medium mb-2">
                            Glitch Color #1
                          </label>
                          <div className="flex space-x-2">
                            <Input
                              type="color"
                              id="glitchColor1"
                              variant="bordered"
                              value={glitchColor1}
                              onChange={(e) => setGlitchColor1(e.target.value)}
                              className="w-16 h-10 p-1 bg-transparent"
                            />
                            <Input type="text" variant="bordered" value={glitchColor1} onChange={(e) => setGlitchColor1(e.target.value)} />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="glitchColor2" className="block text-sm font-medium mb-2">
                            Glitch Color #2
                          </label>
                          <div className="flex space-x-2">
                            <Input
                              type="color"
                              id="glitchColor2"
                              value={glitchColor2}
                              onChange={(e) => setGlitchColor2(e.target.value)}
                              className="w-16 h-10 p-1 bg-transparent"
                            />
                            <Input type="text" variant="bordered" value={glitchColor2} onChange={(e) => setGlitchColor2(e.target.value)} />
                          </div>
                        </div>
                      </div>

                      <div className="border-l border-gray-300 pl-4 flex flex-col space-y-4">
                        <div>
                          <label htmlFor="glitchIntensity" className="block text-sm font-medium mb-2">
                            Glitch Intensity: {glitchIntensity}
                          </label>
                          <Slider
                            aria-label="Glitch Intensity"
                            size="md"
                            step={1}
                            minValue={1}
                            maxValue={20}
                            value={glitchIntensity}
                            onChange={(value) => setGlitchIntensity(value as number)}
                            className="max-w-md"
                          />
                        </div>

                        <div>
                          <label htmlFor="animationSpeed" className="block text-sm font-medium mb-2">
                            Animation Speed: {animationSpeed.toFixed(2)}s
                          </label>
                          <Slider
                            aria-label="Animation Speed"
                            size="md"
                            step={0.1}
                            minValue={0.1}
                            maxValue={2}
                            value={animationSpeed}
                            onChange={(value) => setAnimationSpeed(value as number)}
                            className="max-w-md"
                          />
                        </div>
                      </div>
                    </div>


                    <div className="flex items-center justify-between">
                      <label htmlFor="showScanLines" className="text-sm font-medium">
                        Show Scan Lines
                      </label>
                      <Switch id="showScanLines" isSelected={showScanLines} onValueChange={setShowScanLines} />
                    </div>

                    {glitchEffect === "custom" && (
                      <div>
                        <label htmlFor="customCSS" className="block text-sm font-medium mb-2">
                          Custom CSS
                        </label>
                        <textarea
                          id="customCSS"
                          value={customCSS}
                          onChange={(e) => setCustomCSS(e.target.value)}
                          className="w-full h-40 bg-content2 rounded-md p-2"
                          placeholder="Enter your custom CSS here..."
                        />
                      </div>
                    )}
                  </div>
                </Tab>
              </Tabs>

              <div className="mt-8">


                {/* Generated HTML & CSS Section */}
                <Card className="bg-default-50 dark:bg-default-100 mt-6">
                  <CardBody className="p-6">
                    <h2 className="text-xl md:text-2xl font-bold text-default-700 mb-4">Generated HTML & CSS</h2>
                    <div className="bg-default-200 p-4 rounded-lg overflow-x-auto max-h-60 overflow-y-auto">
                      <pre className="text-default-700 whitespace-pre-wrap break-all text-xs md:text-sm">
                        {`<div class="glitch-wrapper">
  <div class="glitch" data-text="${text}">${text}</div>
  ${showScanLines ? '<div class="scan-lines"></div>' : ""}
</div>

<style>
${generatedCSS}
</style>`}
                      </pre>
                    </div>
                  </CardBody>
                </Card>

                {/* Buttons Container */}
                <div className="mt-4 flex flex-col space-y-2 md:flex-row md:justify-end md:space-y-0 md:space-x-2">
                  <Button onClick={handleReset} color="danger">
                    <RefreshCw className="h-5 w-5 mr-2" />
                    Reset
                  </Button>
                  <Button onClick={handleCopy} color="primary">
                    <Copy className="h-5 w-5 mr-2" />
                    Copy HTML & CSS
                  </Button>
                  <Button onClick={handleDownload} color="success">
                    <Download className="h-5 w-5 mr-2" />
                    Download HTML
                  </Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Fullscreen Preview Modal */}
        {renderFullscreenPreview()}




      </div>
      <InfoSectionTextGlitch />
    </ToolLayout>
  )
}

