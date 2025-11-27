"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import { Card, CardBody, Button, RadioGroup, Radio, Slider, Divider } from "@nextui-org/react"
import { toast } from "react-hot-toast"
import {
  Upload,
  Download,
  RefreshCw,
  Loader2,
} from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import InfoSectionPhotoCensor from "./info-section"

type CensorType = "blur" | "pixelate" | "black"

const PhotoCensor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null)
  const [censorType, setCensorType] = useState<CensorType>("blur")
  const [intensity, setIntensity] = useState<number>(10)
  const [selection, setSelection] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const [isSelecting, setIsSelecting] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const startPointRef = useRef<{ x: number; y: number } | null>(null)

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    if (!imageRef.current) return { x: 0, y: 0 }

    const rect = imageRef.current.getBoundingClientRect()
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX
    const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    }
  }

  const handleStart = (e: React.MouseEvent<HTMLImageElement> | React.TouchEvent<HTMLImageElement>) => {
    if (!imageRef.current) return

    const { x, y } = getCoordinates(e)
    startPointRef.current = { x, y }

    setSelection({ x, y, width: 0, height: 0 })
    setIsSelecting(true)
  }

  const handleMove = (e: React.MouseEvent<HTMLImageElement> | React.TouchEvent<HTMLImageElement>) => {
    if (!isSelecting || !startPointRef.current) return

    const { x, y } = getCoordinates(e)
    setSelection({
      x: Math.min(startPointRef.current.x, x),
      y: Math.min(startPointRef.current.y, y),
      width: Math.abs(x - startPointRef.current.x),
      height: Math.abs(y - startPointRef.current.y),
    })
  }

  const handleEnd = () => {
    if (isSelecting) {
      setIsSelecting(false)
      applyCensor()
    }
    startPointRef.current = null
  }

  useEffect(() => {
    const container = containerRef.current
    const image = imageRef.current

    if (!container || !image) return

    const handleTouchStart = (e: TouchEvent) => {
      const touchedElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
      if (touchedElement === image) {
        e.preventDefault()
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      const touchedElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
      if (touchedElement === image) {
        e.preventDefault()
      }
    }

    container.addEventListener("touchstart", handleTouchStart, { passive: false })
    container.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      toast.success("Image uploaded successfully!")
    }
  }

  const pixelateArea = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    pixelSize: number,
  ) => {
    // Get the selected area's image data
    const imageData = ctx.getImageData(x, y, width, height)
    const data = imageData.data

    // Loop through each pixel block
    for (let offsetY = 0; offsetY < height; offsetY += pixelSize) {
      for (let offsetX = 0; offsetX < width; offsetX += pixelSize) {
        // Get the color of the first pixel in the block
        const pixelIndex = (offsetY * width + offsetX) * 4
        const r = data[pixelIndex]
        const g = data[pixelIndex + 1]
        const b = data[pixelIndex + 2]
        const a = data[pixelIndex + 3]

        // Fill the entire block with this color
        for (let blockY = 0; blockY < pixelSize && blockY + offsetY < height; blockY++) {
          for (let blockX = 0; blockX < pixelSize && blockX + offsetX < width; blockX++) {
            const index = ((offsetY + blockY) * width + (offsetX + blockX)) * 4
            data[index] = r
            data[index + 1] = g
            data[index + 2] = b
            data[index + 3] = a
          }
        }
      }
    }

    // Put the modified image data back
    ctx.putImageData(imageData, x, y)
  }

  const applyCensor = useCallback(async () => {
    if (!image || !imageRef.current || !canvasRef.current) return

    setIsProcessing(true)

    try {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          const img = imageRef.current
          const canvas = canvasRef.current
          if (!canvas || !img) {
            resolve()
            return
          }

          const ctx = canvas.getContext("2d")
          if (!ctx) {
            resolve()
            return
          }

          canvas.width = img.naturalWidth
          canvas.height = img.naturalHeight

          // Rest of the censoring logic remains the same
          ctx.drawImage(img, 0, 0)

          const scaleX = img.naturalWidth / img.width
          const scaleY = img.naturalHeight / img.height

          const scaledSelection = {
            x: Math.floor(selection.x * scaleX),
            y: Math.floor(selection.y * scaleY),
            width: Math.floor(selection.width * scaleX),
            height: Math.floor(selection.height * scaleY),
          }

          if (censorType === "blur") {
            ctx.filter = `blur(${intensity}px)`
            ctx.drawImage(
              img,
              scaledSelection.x,
              scaledSelection.y,
              scaledSelection.width,
              scaledSelection.height,
              scaledSelection.x,
              scaledSelection.y,
              scaledSelection.width,
              scaledSelection.height,
            )
          } else if (censorType === "pixelate") {
            pixelateArea(
              ctx,
              scaledSelection.x,
              scaledSelection.y,
              scaledSelection.width,
              scaledSelection.height,
              Math.max(1, Math.floor(intensity * 2)),
            )
          } else if (censorType === "black") {
            ctx.fillStyle = "black"
            ctx.fillRect(scaledSelection.x, scaledSelection.y, scaledSelection.width, scaledSelection.height)
          }

          ctx.filter = "none"
          setImage(canvas.toDataURL())
          resolve()
        }, 0)
      })
    } catch {
      toast.error("Failed to apply censoring effect")
    } finally {
      setIsProcessing(false)
    }
  }, [image, censorType, intensity, selection])

  const handleDownload = () => {
    if (!image) return

    // Create a temporary canvas for resizing
    const tempCanvas = document.createElement("canvas")
    const tempCtx = tempCanvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
      // Calculate new dimensions (max 1920px width/height while maintaining aspect ratio)
      let newWidth = img.width
      let newHeight = img.height
      const maxDimension = 1920

      if (newWidth > maxDimension || newHeight > maxDimension) {
        if (newWidth > newHeight) {
          newHeight = (newHeight * maxDimension) / newWidth
          newWidth = maxDimension
        } else {
          newWidth = (newWidth * maxDimension) / newHeight
          newHeight = maxDimension
        }
      }

      tempCanvas.width = newWidth
      tempCanvas.height = newHeight

      // Draw and compress the image
      tempCtx?.drawImage(img, 0, 0, newWidth, newHeight)
      const compressedImage = tempCanvas.toDataURL("image/jpeg", 0.8) // Use JPEG with 80% quality

      // Create download link
      const link = document.createElement("a")
      link.href = compressedImage
      link.download = "censored-image.jpg"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      toast.success("Censored image downloaded successfully!")
    }

    img.src = image
  }

  const handleReset = () => {
    setImage(null)
    setSelection({ x: 0, y: 0, width: 0, height: 0 })
    setCensorType("blur")
    setIntensity(10)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    toast.success("All settings reset!")
  }

  return (
    <ToolLayout
      title="Photo Censor"
      description="Protect your privacy and enhance your visuals effortlessly with our intuitive Photo Censor tool, designed for seamless image editing and creative expression"
      toolId="photo-censor-tool"
    >
      <div className="flex flex-col gap-6">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <h2 className="text-xl sm:text-1xl md:text-2xl font-bold text-primary mb-4">Upload an Image</h2>
            <label className="flex flex-col items-center justify-center h-32 px-4 py-6 bg-default-100 text-primary rounded-lg shadow-md tracking-wide uppercase border-2 border-primary border-dashed cursor-pointer hover:bg-primary-100 hover:text-primary-600 transition duration-300">
              <Upload size={32} />
              <span className="mt-2 text-sm sm:text-base md:text-md leading-normal text-center block">Select a file or drag and drop</span>
              <span className="mt-1 text-xs text-gray-500">Supports JPG, PNG, WebP, GIF</span>
              <input ref={fileInputRef} type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
            </label>
          </CardBody>
        </Card>

        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div
              ref={containerRef}
              className="mb-4 p-4 bg-default-100 rounded-lg min-h-[300px] flex items-center justify-center overflow-auto relative"
            >
              {image ? (
                <div className="relative max-w-full max-h-[500px] flex items-center justify-center">
                  {isProcessing && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 rounded-lg">
                      <div className="text-white text-center">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                        <p>Processing...</p>
                      </div>
                    </div>
                  )}
                  <img
                    ref={imageRef}
                    src={image || "/placeholder.svg"}
                    alt="Uploaded image"
                    className="max-w-full max-h-[500px] object-contain cursor-crosshair select-none"
                    onMouseDown={handleStart}
                    onMouseMove={handleMove}
                    onMouseUp={handleEnd}
                    onTouchStart={handleStart}
                    onTouchMove={handleMove}
                    onTouchEnd={handleEnd}
                    draggable={false}
                  />
                  {isSelecting && (
                    <div
                      style={{
                        position: "absolute",
                        border: "2px solid red",
                        backgroundColor: "rgba(255, 0, 0, 0.1)",
                        left: `${Math.min(selection.x, selection.x + selection.width)}px`,
                        top: `${Math.min(selection.y, selection.y + selection.height)}px`,
                        width: `${Math.abs(selection.width)}px`,
                        height: `${Math.abs(selection.height)}px`,
                        pointerEvents: "none",
                      }}
                    />
                  )}
                </div>
              ) : (
                <div className="text-default-500 text-center">
                  <p>No image uploaded</p>
                  <p className="text-sm">Upload an image to get started</p>
                </div>
              )}
            </div>

            {image && (
              <>
                <Divider className="my-4" />

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-default-700 mb-4">Censoring Options</h3>
                  <RadioGroup
                    value={censorType}
                    onValueChange={(value) => setCensorType(value as CensorType)}
                    orientation="horizontal"
                    className="mb-4"
                  >
                    <Radio value="blur" isDisabled={isProcessing}>
                      Blur
                    </Radio>
                    <Radio value="pixelate" isDisabled={isProcessing}>
                      Pixelate
                    </Radio>
                    <Radio value="black" isDisabled={isProcessing}>
                      Black-out
                    </Radio>
                  </RadioGroup>

                  {censorType !== "black" && (
                    <div className="mb-4">
                      <p className="text-default-700 mb-2">Intensity: {intensity}</p>
                      <Slider
                        aria-label="Intensity"
                        size="lg"
                        step={1}
                        minValue={1}
                        maxValue={20}
                        value={intensity}
                        onChange={(value) => setIntensity(value as number)}
                        isDisabled={isProcessing}
                        className="max-w-md"
                        showSteps={true}
                        marks={[
                          { value: 1, label: "1" },
                          { value: 10, label: "10" },
                          { value: 20, label: "20" },
                        ]}
                      />
                    </div>
                  )}

                  <Button
                    color="success"
                    onPress={applyCensor}
                    isDisabled={isProcessing}
                    startContent={isProcessing ? <Loader2 className="animate-spin" /> : null}
                  >
                    {isProcessing ? "Processing..." : "Apply Censoring"}
                  </Button>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button
                    color="primary"
                    onPress={handleDownload}
                    isDisabled={!image || isProcessing}
                    startContent={<Download size={18} />}
                  >
                    Download Censored Image
                  </Button>
                  <Button
                    color="danger"
                    variant="flat"
                    onPress={handleReset}
                    isDisabled={isProcessing}
                    startContent={<RefreshCw size={18} />}
                  >
                    Reset
                  </Button>
                </div>
              </>
            )}
          </CardBody>
        </Card>

        <canvas ref={canvasRef} style={{ display: "none" }} />

        <InfoSectionPhotoCensor />
      </div>
    </ToolLayout>
  )
}

export default PhotoCensor

