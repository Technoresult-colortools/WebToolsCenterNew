"use client"

import type React from "react"
import { useState, useEffect, useRef, } from "react"
import { Button, Card, CardBody, Input, Switch, Slider, Tabs, Tab, Select, SelectItem, } from "@nextui-org/react"
import { toast } from "react-hot-toast"
import {
  Copy,
  RefreshCw,
  Info,
  EyeIcon,
  ImageIcon,
  Plus,
  X,
  Shapes,
  Code,
  RotateCcw,
} from "lucide-react"
import ToolLayout from "@/components/ToolLayout"

import InfoSectionClipPath from "./info-section"

type Shape =
  | "triangle"
  | "rectangle"
  | "pentagon"
  | "hexagon"
  | "octagon"
  | "circle"
  | "ellipse"
  | "custom"
  | "invertedTriangle"
  | "trapezoid"
  | "invertedTrapezoid"
  | "parallelogram"
  | "rhombus"
  | "bevel"
  | "chevronLeft"
  | "chevronRight"
  | "arrowheadLeft"
  | "arrowheadRight"
  | "arrowLeft"
  | "arrowRight"
  | "plus"
  | "cross"
  | "star"
  | "messageBox"
  | "heart"
  | "diamond"

const initialShapes: Record<Shape, number[][]> = {
  triangle: [
    [50, 0],
    [100, 100],
    [0, 100],
  ],
  rectangle: [
    [0, 0],
    [100, 0],
    [100, 100],
    [0, 100],
  ],
  pentagon: [
    [50, 0],
    [100, 38],
    [82, 100],
    [18, 100],
    [0, 38],
  ],
  hexagon: [
    [25, 0],
    [75, 0],
    [100, 50],
    [75, 100],
    [25, 100],
    [0, 50],
  ],
  octagon: [
    [30, 0],
    [70, 0],
    [100, 30],
    [100, 70],
    [70, 100],
    [30, 100],
    [0, 70],
    [0, 30],
  ],
  circle: [
    [50, 0],
    [100, 50],
    [50, 100],
    [0, 50],
  ],
  ellipse: [
    [50, 0],
    [100, 50],
    [50, 100],
    [0, 50],
  ],
  custom: [
    [50, 0],
    [100, 50],
    [50, 100],
    [0, 50],
  ],
  invertedTriangle: [
    [0, 0],
    [100, 0],
    [50, 100],
  ],
  trapezoid: [
    [20, 0],
    [80, 0],
    [100, 100],
    [0, 100],
  ],
  invertedTrapezoid: [
    [0, 0],
    [100, 0],
    [80, 100],
    [20, 100],
  ],
  parallelogram: [
    [25, 0],
    [100, 0],
    [75, 100],
    [0, 100],
  ],
  rhombus: [
    [50, 0],
    [100, 50],
    [50, 100],
    [0, 50],
  ],
  bevel: [
    [20, 0],
    [80, 0],
    [100, 20],
    [100, 80],
    [80, 100],
    [20, 100],
    [0, 80],
    [0, 20],
  ],
  chevronLeft: [
    [0, 50],
    [50, 0],
    [100, 0],
    [50, 50],
    [100, 100],
    [50, 100],
  ],
  chevronRight: [
    [0, 0],
    [50, 0],
    [100, 50],
    [50, 100],
    [0, 100],
    [50, 50],
  ],
  arrowheadLeft: [
    [100, 0],
    [75, 50],
    [100, 100],
    [0, 50],
  ],
  arrowheadRight: [
    [0, 0],
    [100, 50],
    [0, 100],
    [25, 50],
  ],
  arrowLeft: [
    [0, 50],
    [50, 0],
    [50, 30],
    [100, 30],
    [100, 70],
    [50, 70],
    [50, 100],
  ],
  arrowRight: [
    [100, 50],
    [50, 0],
    [50, 30],
    [0, 30],
    [0, 70],
    [50, 70],
    [50, 100],
  ],
  plus: [
    [40, 0],
    [60, 0],
    [60, 40],
    [100, 40],
    [100, 60],
    [60, 60],
    [60, 100],
    [40, 100],
    [40, 60],
    [0, 60],
    [0, 40],
    [40, 40],
  ],
  cross: [
    [20, 0],
    [40, 0],
    [40, 20],
    [60, 20],
    [60, 0],
    [80, 0],
    [80, 20],
    [100, 20],
    [100, 40],
    [80, 40],
    [80, 60],
    [100, 60],
    [100, 80],
    [80, 80],
    [80, 100],
    [60, 100],
    [60, 80],
    [40, 80],
    [40, 100],
    [20, 100],
    [20, 80],
    [0, 80],
    [0, 60],
    [20, 60],
    [20, 40],
    [0, 40],
    [0, 20],
    [20, 20],
  ],
  star: [
    [50, 0],
    [61, 35],
    [98, 35],
    [68, 57],
    [79, 91],
    [50, 70],
    [21, 91],
    [32, 57],
    [2, 35],
    [39, 35],
  ],
  messageBox: [
    [0, 0],
    [100, 0],
    [100, 75],
    [30, 75],
    [10, 100],
    [10, 75],
    [0, 75],
  ],
  heart: [
    [30, 0],
    [50, 15],
    [70, 0],
    [90, 10],
    [100, 35],
    [80, 70],
    [50, 100],
    [20, 70],
    [0, 35],
    [10, 10],
  ],
  diamond: [
    [25, 0],
    [75, 0],
    [100, 25],
    [50, 100],
    [0, 25],
  ],
}

const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY

// Add type checking for the environment variable
if (!UNSPLASH_ACCESS_KEY) {
  throw new Error('Missing NEXT_PUBLIC_UNSPLASH_ACCESS_KEY environment variable')
}

export default function ClipPathGenerator() {
  const [shape, setShape] = useState<Shape>('triangle')
  const [points, setPoints] = useState(initialShapes.triangle)
  const [clipPath, setClipPath] = useState('')
  const [imageUrl, setImageUrl] = useState('https://api.unsplash.com/photos/random?orientation=landscape&w=600&h=400')
  const [, setIsLoadingImage] = useState(false)
  const [showOutside, setShowOutside] = useState(false)
  const [hideGuides, setHideGuides] = useState(false)
  const [useCustomBackground, setUseCustomBackground] = useState(false)
  const [customBackgroundUrl, setCustomBackgroundUrl] = useState('')
  const [opacity, setOpacity] = useState(100)
  const [, setOutsidecolor] = useState('#ffffff')
  const [width, setWidth] = useState(100)
  const [height, setHeight] = useState(100)
  const previewRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const activePointIndex = useRef(-1)

  // Function to fetch random image from Unsplash
  const handleShuffleImage = async () => {
    try {
      setIsLoadingImage(true)
      const response = await fetch(
        `https://api.unsplash.com/photos/random?orientation=landscape&w=600&h=400`,
        {
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
          }
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch image')
      }

      const data = await response.json()
      setImageUrl(data.urls.regular)
    } catch (error) {
      console.error('Error fetching Unsplash image:', error)
      toast.error('Failed to load image')
      // Fallback to a default image or show an error state
      setImageUrl('/default-image.jpg') // Make sure to have a default image in your public folder
    } finally {
      setIsLoadingImage(false)
    }
  }

  // Load initial image when component mounts
  useEffect(() => {
    handleShuffleImage()
  }, [])

  useEffect(() => {
    updateClipPath()
  }, [points, width, height])

  useEffect(() => {
    setPoints(initialShapes[shape])
  }, [shape])

  const updateClipPath = () => {
    const offsetX = (100 - width) / 2
    const offsetY = (100 - height) / 2
    if (shape === 'circle') {
      setClipPath(`circle(${width / 2}% at 50% 50%)`)
    } else if (shape === 'ellipse') {
      setClipPath(`ellipse(${width / 2}% ${height / 2}% at 50% 50%)`)
    } else {
      const clipPathString = `polygon(${points.map(([x, y]) => `${offsetX + (x * width) / 100}% ${offsetY + (y * height) / 100}%`).join(', ')})`
      setClipPath(clipPathString)
    }
  }




  const handleCopy = () => {
    navigator.clipboard.writeText(`clip-path: ${clipPath};`)
    toast.success('CSS copied to clipboard!')
  }

  // Modified reset function
  const handleReset = () => {
    setShape('triangle')
    setPoints(initialShapes.triangle)
    handleShuffleImage()
    setShowOutside(true)
    setHideGuides(false)
    setUseCustomBackground(false)
    setCustomBackgroundUrl('')
    setOpacity(100)
    setOutsidecolor('#ffffff')
    setWidth(100)
    setHeight(100)
  }

  const handleCustomBackgroundUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCustomBackgroundUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePointerDown = (index: number) => (e: React.PointerEvent) => {
    e.preventDefault()
    isDragging.current = true
    activePointIndex.current = index
    if (previewRef.current) {
      previewRef.current.setPointerCapture(e.pointerId)
    }
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !previewRef.current) return

    const rect = previewRef.current.getBoundingClientRect()
    const x = Math.min(Math.max(0, ((e.clientX - rect.left) / rect.width) * 100), 100)
    const y = Math.min(Math.max(0, ((e.clientY - rect.top) / rect.height) * 100), 100)

    setPoints(prevPoints => {
      const newPoints = [...prevPoints]
      newPoints[activePointIndex.current] = [Math.round(x), Math.round(y)]
      return newPoints
    })
  }



  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false
    activePointIndex.current = -1
    if (previewRef.current) {
      previewRef.current.releasePointerCapture(e.pointerId)
    }
  }

  const handlePointChange = (index: number, axis: "x" | "y", value: number) => {
    setPoints((prevPoints) => {
      const newPoints = [...prevPoints]
      newPoints[index][axis === "x" ? 0 : 1] = value
      return newPoints
    })
  }

  const addPoint = () => {
    if (points.length < 20) {
      setPoints([...points, [50, 50]])
    } else {
      toast.error("Maximum number of points reached (20)")
    }
  }

  const removePoint = (index: number) => {
    if (points.length > 3) {
      setPoints(points.filter((_, i) => i !== index))
    } else {
      toast.error("Minimum number of points reached (3)")
    }
  }

  return (
    <ToolLayout
      title="CSS Clip Path Generator"
      description="Create custom CSS shapes instantly with our free visual Clip Path Generator."
      toolId="678f382b26f06f912191bc97"
    >
      <div className="flex flex-col gap-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            {/* Controls section - responsive layout */}
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-4">
              {/* Shape selector */}
              <div className="w-full md:w-1/4">
                <Select
                  label="Select Shape"
                  selectedKeys={new Set([shape])}
                  onSelectionChange={(keys) => setShape(Array.from(keys)[0] as Shape)}
                  variant="bordered"
                >
                  {Object.keys(initialShapes).map((shapeKey) => (
                    <SelectItem key={shapeKey} value={shapeKey} className="text-default-700">
                      {shapeKey.charAt(0).toUpperCase() + shapeKey.slice(1)}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              {/* Sliders container - side by side on all screens */}
              <div className="w-full md:flex-1 flex flex-col md:flex-row gap-4">
                {/* Width slider */}
                <div className="flex-1">
                  <p className="text-small text-default-500 mb-2">Width: {width}%</p>
                  <Slider
                    aria-label="Width"
                    size="sm"
                    step={1}
                    maxValue={100}
                    minValue={0}
                    value={width}
                    onChange={(value: number | number[]) => setWidth(Array.isArray(value) ? value[0] : value)}
                  />
                </div>

                {/* Height slider */}
                <div className="flex-1">
                  <p className="text-small text-default-500 mb-2">Height: {height}%</p>
                  <Slider
                    aria-label="Height"
                    size="sm"
                    step={1}
                    maxValue={100}
                    minValue={0}
                    value={height}
                    onChange={(value: number | number[]) => setHeight(Array.isArray(value) ? value[0] : value)}
                  />
                </div>
              </div>

              {/* Reset button */}
              <div className="self-end md:self-center">
                <Button
                  color="danger"
                  variant="flat"
                  isIconOnly
                  onPress={handleReset}
                  aria-label="Reset All"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Preview section - unchanged */}
            <div
              ref={previewRef}
              className="relative rounded-lg overflow-hidden touch-none border-2 border-gray-400"
              style={{ width: '100%', paddingBottom: '50.00%' }}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              <div className="absolute inset-0">
                <img
                  src={useCustomBackground && customBackgroundUrl ? customBackgroundUrl : imageUrl}
                  alt="Clipped image"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  style={{
                    clipPath: clipPath,
                    WebkitClipPath: clipPath,
                    opacity: opacity / 100,
                  }}
                />
                {!hideGuides && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-0 w-full border-t-2 border-dashed border-blue-500 opacity-50"></div>
                    <div className="absolute top-0 left-1/2 h-full border-l-2 border-dashed border-blue-500 opacity-50"></div>
                  </div>
                )}
                {showOutside && (
                  <img
                    src={useCustomBackground && customBackgroundUrl ? customBackgroundUrl : imageUrl}
                    alt="Outside image"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    style={{
                      opacity: 0.2,
                      filter: 'blur(1px)',
                      transform: 'scale(1.01)',
                    }}
                  />
                )}
                {!hideGuides && shape !== 'circle' && shape !== 'ellipse' && points && points.length > 0 && points.map(([x, y], index) => (
                  <div
                    key={index}
                    className="absolute w-6 h-6 bg-blue-500 rounded-full cursor-move touch-none"
                    style={{
                      left: `${((100 - width) / 2) + (x * width) / 100}%`,
                      top: `${((100 - height) / 2) + (y * height) / 100}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onPointerDown={handlePointerDown(index)}
                  />
                ))}
              </div>
            </div>

            {/* Shuffle button - unchanged */}
            <div className="mt-4">
              <Button onPress={handleShuffleImage} variant="shadow" color="primary" className="w-full">
                <RefreshCw className="h-5 w-5 mr-2" />
                Shuffle Image
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <Tabs aria-label="Clip Path Generator options">

              <Tab
                key="points"
                title={
                  <div className="flex items-center">
                    <Shapes className="w-4 h-4 mr-2" />
                    Points
                  </div>
                }
              >
                <div className="space-y-4 mt-4">
                  {points.map((point, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <span className="w-6 text-small text-default-500">#{index + 1}</span>
                      <Input
                        type="number"
                        label="X"
                        value={point[0].toString()}
                        onChange={(e) => handlePointChange(index, "x", Number(e.target.value))}
                        min={0}
                        max={100}
                        className="w-24"
                        variant="bordered"
                      />
                      <Input
                        type="number"
                        label="Y"
                        value={point[1].toString()}
                        onChange={(e) => handlePointChange(index, "y", Number(e.target.value))}
                        min={0}
                        max={100}
                        className="w-24"
                        variant="bordered"
                      />
                      <Button isIconOnly variant="flat" color="danger" onPress={() => removePoint(index)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    color="primary"
                    variant="flat"
                    onPress={addPoint}
                    startContent={<Plus className="w-4 h-4" />}
                  >
                    Add Point
                  </Button>
                </div>
              </Tab>

              <Tab
                key="appearance"
                title={
                  <div className="flex items-center">
                    <EyeIcon className="w-4 h-4 mr-2" />
                    Appearance
                  </div>
                }
              >
                <div className="space-y-4 mt-4">
                  <div>
                    <p className="text-small text-default-500 mb-2">Opacity: {opacity}%</p>
                    <Slider
                      aria-label="Opacity"
                      size="sm"
                      step={1}
                      maxValue={100}
                      minValue={0}
                      value={opacity}
                      onChange={(value: number | number[]) => setOpacity(Array.isArray(value) ? value[0] : value)}

                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-small text-default-500">Show Outside</span>
                    <Switch checked={showOutside} onValueChange={setShowOutside} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-small text-default-500">Hide Guides and Points</span>
                    <Switch checked={hideGuides} onValueChange={setHideGuides} />
                  </div>
                </div>
              </Tab>
              <Tab
                key="background"
                title={
                  <div className="flex items-center">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Background
                  </div>
                }
              >
                <div className="space-y-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-small text-default-500">Use Custom Background</span>
                    <Switch checked={useCustomBackground} onValueChange={setUseCustomBackground} />
                  </div>
                  {useCustomBackground && (
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleCustomBackgroundUpload}
                      label="Custom Background Image"
                      variant="bordered"
                    />
                  )}
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold flex items-center">
                <Code className="w-6 h-6 mr-2" />
                Generated CSS
              </h2>
              <Button color="primary" variant="flat" onPress={handleCopy} startContent={<Copy className="w-4 h-4" />}>
                Copy CSS
              </Button>
            </div>
            <div className="bg-default-200 dark:bg-default-100 rounded-lg p-4 font-mono text-sm">
              <div className="flex flex-col gap-2">
                <div className="text-primary">{/* Generated Clip Path CSS */}</div>
                <div>.element {"{"}</div>
                <div className="ml-4 text-success">clip-path: {clipPath};</div>
                <div className="ml-4 text-success">-webkit-clip-path: {clipPath};</div>
                <div>{"}"}</div>
              </div>
            </div>
            <div className="mt-4 flex items-start gap-2 text-sm text-default-500">
              <Info className="w-4 h-4 mt-1 flex-shrink-0" />
              <p>
                Copy this CSS and apply it to any element you want to clip. The clip-path property is supported in all
                modern browsers. The -webkit- prefix is included for maximum compatibility.
              </p>
            </div>
          </CardBody>
        </Card>

      </div>
      <InfoSectionClipPath />
    </ToolLayout>
  )
}

