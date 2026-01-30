"use client"

import { type ReactElement } from "react"
import { useState, useEffect, useRef } from "react"
import { Card, CardBody, Button, Select, SelectItem, Input, Switch, Slider } from "@nextui-org/react"
import Image from "next/image"
import { Copy, RefreshCw, PlayCircle, PauseCircle, Upload } from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import InfoSectionCubicBezier from "./info-section"



type Presets = {
  [key: string]: [number, number, number, number]
}

const presets: Presets = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  "ease-in": [0.42, 0, 1, 1],
  "ease-out": [0, 0, 0.58, 1],
  "ease-in-out": [0.42, 0, 0.58, 1],
  drop: [0.215, 0.61, 0.355, 1],
  down: [0.175, 0.885, 0.32, 1.275],
}

export default function CSSCubicBezierGenerator(): ReactElement {
  const [points, setPoints] = useState<[number, number, number, number]>([0.25, 0.1, 0.25, 1])
  const [duration, setDuration] = useState<number>(1)
  const [presetName, setPresetName] = useState<string>("custom")
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [showGrid, setShowGrid] = useState<boolean>(true)
  const [showControlLines, setShowControlLines] = useState<boolean>(true)
  const [animationKey, setAnimationKey] = useState<number>(0)
  const [animeImage, setAnimeImage] = useState<string>("/Images/victini.png?height=48&width=48")
  const animatedElementRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    drawCurve()
  }, [points, showGrid, showControlLines])

  const drawCurve = (): void => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    ctx.clearRect(0, 0, width, height)

    if (showGrid) {
      // Draw grid with different colors for light/dark mode
      const isDarkMode = document.documentElement.classList.contains('dark')
      ctx.strokeStyle = isDarkMode ? "#404040" : "#d1d1d1" // Darker for dark mode, lighter for light mode
      ctx.lineWidth = 0.5

      // Draw vertical grid lines
      for (let i = 0; i <= 10; i++) {
        const x = (i * width) / 10
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      // Draw horizontal grid lines
      for (let i = 0; i <= 10; i++) {
        const y = (i * height) / 10
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }
    }

    // Add labels with dynamic color
    const isDarkMode = document.documentElement.classList.contains('dark')
    ctx.fillStyle = isDarkMode ? "#fff" : "#000"
    ctx.font = "14px Arial"
    ctx.textAlign = "center"
    ctx.fillText("Time", width / 2, height - 10)
    ctx.save()
    ctx.rotate(-Math.PI / 2)
    ctx.fillText("Progress", -height / 2, 20)
    ctx.restore()

    // Rest of the drawing code remains the same...
    // Draw curve
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, height)
    for (let t = 0; t <= 1; t += 0.01) {
      const x = cubicBezier(t, 0, points[0], points[2], 1) * width
      const y = (1 - cubicBezier(t, 0, points[1], points[3], 1)) * height
      ctx.lineTo(x, y)
    }
    ctx.stroke()

    if (showControlLines) {
      // Draw control lines
      ctx.strokeStyle = "#22c55e"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(0, height)
      ctx.lineTo(points[0] * width, (1 - points[1]) * height)
      ctx.stroke()

      ctx.strokeStyle = "#ef4444"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(width, 0)
      ctx.lineTo(points[2] * width, (1 - points[3]) * height)
      ctx.stroke()
    }

    // Draw control points
    ctx.fillStyle = "#22c55e"
    ctx.beginPath()
    ctx.arc(points[0] * width, (1 - points[1]) * height, 5, 0, 2 * Math.PI)
    ctx.fill()

    ctx.fillStyle = "#ef4444"
    ctx.beginPath()
    ctx.arc(points[2] * width, (1 - points[3]) * height, 5, 0, 2 * Math.PI)
    ctx.fill()
  }


  useEffect(() => {
    const element = animatedElementRef.current
    if (!element) return

    const handleAnimationEnd = () => {
      setIsPlaying(false)
    }

    element.addEventListener("animationend", handleAnimationEnd)
    return () => {
      element.removeEventListener("animationend", handleAnimationEnd)
    }
  }, [])
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          drawCurve()
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  const handlePlayClick = (): void => {
    if (!isPlaying) {
      setAnimationKey((prev) => prev + 1)
      setIsPlaying(true)
    } else {
      setIsPlaying(false)
    }
  }

  const cubicBezier = (t: number, p0: number, p1: number, p2: number, p3: number): number => {
    const u = 1 - t
    return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3
  }

  const handlePointChange = (index: number, value: string): void => {
    const newPoints = [...points] as [number, number, number, number]
    newPoints[index] = Math.max(0, Math.min(1, Number(value)))
    setPoints(newPoints)
    setPresetName("custom")
  }

  const handlePresetChange = (value: string): void => {
    setPresetName(value)
    if (value in presets) {
      setPoints(presets[value])
    }
  }

  const copyCSS = (): void => {
    const css = `animation-timing-function: cubic-bezier(${points.join(", ")});\nanimation-duration: ${duration}s;`
    navigator.clipboard.writeText(css)
    toast.success("The CSS has been copied to your clipboard.")
  }

  const resetCurve = (): void => {
    setPoints([0.25, 0.1, 0.25, 1])
    setPresetName("custom")
    setDuration(1)
    setAnimeImage("/Images/victini.png?height=48&width=48")
    toast.success("The curve has been reset to default values.")
  }
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0]
    if (!file) return

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file')
      return
    }

    // Check file size (e.g., limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB')
      return
    }

    try {
      const reader = new FileReader()

      reader.onload = (e) => {
        const result = e.target?.result
        if (typeof result === 'string') {
          setAnimeImage(result)
          toast.success('Image uploaded successfully')
        }
      }

      reader.onerror = () => {
        toast.error('Error reading file')
      }

      reader.readAsDataURL(file)
    } catch (error) {
      toast.error('Error uploading image')
      console.error('Image upload error:', error)
    }
  }
  return (
    <ToolLayout
      title="CSS Cubic Bezier Generator"
      description="Create smooth, custom easing functions for your CSS animations with precision and ease"
      toolId="678f382b26f06f912191bc9a"
    >
      <div className="flex flex-col gap-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Canvas Section with Controls */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left side: Canvas */}
                <div className="flex-1">
                  <canvas
                    ref={canvasRef}
                    width={400}
                    height={400}
                    className="w-full h-64 bg-content2 rounded-lg mb-4 border-1"
                  />
                  <div className="text-default-500 text-center">
                    ({points.map(p => p.toFixed(2)).join(', ')})
                  </div>
                </div>

                {/* Right side: Immediate controls */}
                <div className="flex-1 space-y-4">
                  {/* Presets */}
                  <div>
                    <span className="text-sm mb-2 block">Predefined Easing Functions</span>
                    <Select
                      label="Select Easing Function"
                      selectedKeys={new Set([presetName])}
                      onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0];
                        if (typeof selectedKey === "string") {
                          handlePresetChange(selectedKey);
                        }
                      }}
                      className="w-full "
                      variant="bordered"
                    >
                      {Array.from([
                        <SelectItem key="custom" className="text-default-700">Custom</SelectItem>,
                        ...Object.keys(presets).map((preset) => (
                          <SelectItem key={preset} className="text-default-700">{preset}</SelectItem>
                        )),
                      ])}
                    </Select>


                  </div>

                  {/* Duration */}
                  <div>
                    <span className="text-sm mb-2 block">Animation Duration: {duration}s</span>
                    <Slider
                      aria-label="Animation Duration"
                      value={duration}
                      onChange={(value) => setDuration(Array.isArray(value) ? value[0] : value)} // Ensures a single number is used
                      minValue={0.1}
                      maxValue={5}
                      step={0.1}
                      className="w-full"
                    />

                  </div>

                  {/* Switches */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Switch
                        isSelected={showGrid}
                        onValueChange={setShowGrid}
                      />
                      <span className="text-sm">Show Grid</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        isSelected={showControlLines}
                        onValueChange={setShowControlLines}
                      />
                      <span className="text-sm">Show Control Lines</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Control Points Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  {['X1', 'Y1'].map((label, index) => (
                    <div key={label}>
                      <span className="text-sm mb-1 block">
                        {label} ({index % 2 === 0 ? 'Green' : 'Red'} Point)
                      </span>
                      <Slider
                        aria-label={label}
                        value={points[index]}
                        onChange={(value) => handlePointChange(index, value.toString())}
                        minValue={index % 2 === 0 ? 0 : -1}
                        maxValue={index % 2 === 0 ? 1 : 2}
                        step={0.01}
                        className="w-full"
                      />
                      <Input
                        type="number"
                        variant="bordered"
                        value={points[index].toFixed(2)}
                        onChange={(e) => handlePointChange(index, e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  ))}
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {['X2', 'Y2'].map((label, index) => (
                    <div key={label}>
                      <span className="text-sm mb-1 block">
                        {label} ({(index + 2) % 2 === 0 ? 'Green' : 'Red'} Point)
                      </span>
                      <Slider
                        aria-label={label}
                        value={points[index + 2]}
                        onChange={(value) => handlePointChange(index + 2, value.toString())}
                        minValue={(index + 2) % 2 === 0 ? 0 : -1}
                        maxValue={(index + 2) % 2 === 0 ? 1 : 2}
                        step={0.01}
                        className="w-full"
                      />
                      <Input
                        type="number"
                        variant="bordered"
                        value={points[index + 2].toFixed(2)}
                        onChange={(e) => handlePointChange(index + 2, e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Animation Preview */}
              <div className="space-y-2">
                <span className="text-sm">Animation Preview</span>
                <Card className="border-1 border-default-200">
                  <CardBody className="p-4 ">
                    <div className="flex items-center justify-between gap-4">
                      <Card
                        className="flex-grow"

                      >
                        <CardBody className="h-16 relative p-4 bg-default-50 dark:bg-default-100">
                          <div
                            ref={animatedElementRef}
                            key={animationKey}
                            className="w-12 h-12 absolute left-[4%]"
                            style={{
                              animation: isPlaying
                                ? `${duration}s cubic-bezier(${points.join(', ')}) forwards moveBall`
                                : 'none',
                              transform: 'translateZ(0)',
                              willChange: 'left'
                            }}
                          >
                            <Image
                              src={animeImage}
                              alt="Animated element"
                              width={42}
                              height={42}
                              className="rounded-full"
                              priority
                              onError={() => {
                                setAnimeImage("/Images/victini.png?height=48&width=48")
                                toast.error("Error loading image, reverting to default")
                              }}
                            />
                          </div>
                        </CardBody>
                      </Card>

                      <div className="flex gap-2">
                        <Button
                          isIconOnly
                          color="primary"
                          variant="bordered"
                          onClick={handlePlayClick}
                          aria-label={isPlaying ? "Pause animation" : "Play animation"}
                        >
                          {isPlaying ? (
                            <PauseCircle className="w-5 h-5" />
                          ) : (
                            <PlayCircle className="w-5 h-5" />
                          )}
                        </Button>
                        <Button
                          isIconOnly
                          color="primary"
                          variant="bordered"
                          aria-label="Upload custom image"
                          as="label"
                          className="cursor-pointer"
                        >
                          <Upload className="w-5 h-5" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            aria-hidden="true"
                          />
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>

              {/* CSS Output */}
              <div>
                <span className="text-sm mb-2 block">CSS</span>
                <Card className="bg-content2">
                  <CardBody>
                    <pre className="overflow-x-auto text-sm">{`animation-timing-function: cubic-bezier(${points.join(', ')});
    animation-duration: ${duration}s;`}</pre>
                  </CardBody>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between">
                <Button
                  color="danger"
                  variant="flat"
                  onClick={resetCurve}
                  startContent={<RefreshCw className="w-5 h-5" />}
                >
                  Reset
                </Button>
                <Button
                  color="primary"
                  onClick={copyCSS}
                  startContent={<Copy className="w-5 h-5" />}
                >
                  Copy CSS
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>




        <style jsx global>{`
              @keyframes moveBall {
                from {
                  left: 4%;
                }
                to {
                  left: calc(100% - 48px - 4%);
                }
              }
            `}</style>
      </div>
      <InfoSectionCubicBezier />
    </ToolLayout>
  )
}