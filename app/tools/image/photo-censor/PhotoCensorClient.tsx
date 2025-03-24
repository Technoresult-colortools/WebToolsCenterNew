"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import NextImage from "next/image"
import { Card, CardBody, Button, RadioGroup, Radio, Slider, Divider } from "@nextui-org/react"
import { toast } from "react-hot-toast"
import {
  Upload,
  Download,
  RefreshCw,
  Info,
  Lightbulb,
  BookOpen,
  Scissors,
  Eye,
  Lock,
  SlidersHorizontal,
  Smartphone,
  Loader2,
} from "lucide-react"
import ToolLayout from "@/components/ToolLayout"

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
    } catch (error) {
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
          <h2 className="text-xl sm:text-1xl md:text-2xl font-bold text-default-700 mb-4">Upload an Image</h2>
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
                    onClick={applyCensor}
                    isDisabled={isProcessing}
                    startContent={isProcessing ? <Loader2 className="animate-spin" /> : null}
                  >
                    {isProcessing ? "Processing..." : "Apply Censoring"}
                  </Button>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button
                    color="primary"
                    onClick={handleDownload}
                    isDisabled={!image || isProcessing}
                    startContent={<Download size={18} />}
                  >
                    Download Censored Image
                  </Button>
                  <Button
                    color="danger"
                    variant="flat"
                    onClick={handleReset}
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

        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                What is the Photo Censor Tool?
              </h2>
              <p className="text-default-600 mb-4">
              Photo sensor tool is a powerful and user friendly application designed to help protect sensitive information in your images. Whether you are protecting personal data, complying with privacy rules, or adding creative effects to your photos, our equipment provides a spontaneous solution for selective image censoring.
              </p>
              <p className="text-default-600 mb-4">
              With three versatile sensoring methods - the levels of spots, pixels, and black -outs - and adjustable intensity, you have complete control over how you obscure some parts of your images. Our intuitive interface allows for the exact field selection and real -time preview, ensuring that you get the result you need.
              </p>

              <div className="my-8">
                <NextImage
                  src="/Images/InfosectionImages/PhotoCensorPreview.png?height=400&width=600"
                  alt="Screenshot of the Photo Censor Tool interface showing censoring options and a sample censored image"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>

              <h2
                id="how-to-use"
                className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center"
              >
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use the Photo Censor Tool?
              </h2>
              <ol className="list-decimal list-inside text-default-600 space-y-2 text-sm md:text-base">
                <li>Upload your image by clicking on the designated area or dragging and dropping a file.</li>
                <li>
                  Once uploaded, click and drag (or touch and drag on mobile) on the image to select the area you want
                  to censor.
                </li>
                <li>Choose your preferred censoring method: Blur, Pixelate, or Black-out.</li>
                <li>For Blur and Pixelate options, adjust the intensity using the slider.</li>
                <li>Click "Apply Censoring" to apply the effect to the selected area.</li>
                <li>Repeat steps 2-5 to censor multiple areas if needed.</li>
                <li>Once satisfied, click "Download Censored Image" to save your edited image.</li>
                <li>Use the "Reset" button to start over with a new image or adjust your settings.</li>
              </ol>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Key Features
              </h2>
              <ul className="list-disc list-inside text-default-600 space-y-2 text-sm md:text-base">
                <li>
                  <Scissors className="w-4 h-4 inline-block mr-1" /> <strong>Precise Area Selection:</strong> Click and
                  drag (or touch and drag on mobile) to select exactly what you want to censor
                </li>
                <li>
                  <Eye className="w-4 h-4 inline-block mr-1" /> <strong>Multiple Censoring Methods:</strong> Choose
                  between Blur, Pixelate, and Black-out
                </li>
                <li>
                  <SlidersHorizontal className="w-4 h-4 inline-block mr-1" /> <strong>Adjustable Intensity:</strong>{" "}
                  Fine-tune the strength of blur and pixelation effects
                </li>
                <li>
                  <RefreshCw className="w-4 h-4 inline-block mr-1" /> <strong>Real-time Preview:</strong> See the
                  censoring effect immediately as you apply it
                </li>
                <li>
                  <Lock className="w-4 h-4 inline-block mr-1" /> <strong>Privacy-Focused:</strong> All processing is
                  done locally in your browser for maximum security
                </li>
                <li>
                  <Download className="w-4 h-4 inline-block mr-1" /> <strong>Easy Download:</strong> Save your censored
                  image with a single click
                </li>
                <li>
                  <RefreshCw className="w-4 h-4 inline-block mr-1" /> <strong>Reset Functionality:</strong> Easily start
                  over or make adjustments
                </li>
                <li>
                  <Smartphone className="w-4 h-4 inline-block mr-1" /> <strong>Mobile-Friendly:</strong> Works
                  seamlessly on both desktop and mobile devices
                </li>
              </ul>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Creative Tips and Tricks
              </h2>
              <ul className="list-disc list-inside text-default-600 space-y-2 text-sm md:text-base">
                <li>Use the Blur effect at low intensity to create a soft focus effect on backgrounds.</li>
                <li>Combine different censoring methods on the same image for varied visual effects.</li>
                <li>Pixelate small areas to create an interesting, retro-style focal point in your image.</li>
                <li>Use the Black-out feature to create silhouettes or high-contrast areas in your photos.</li>
                <li>Experiment with censoring shapes to create unique, abstract designs within your images.</li>
                <li>Use the tool to highlight specific areas by censoring the surrounding parts of the image.</li>
                <li>Create a "reveal" effect by censoring most of an image and leaving key parts visible.</li>
              </ul>

              
              <p className="text-default-600 mt-6">
              Are you ready to start sensoring your images with accurate and creativity? Our photo provides sensor tool
                The correct balance of functionality and ease of use. Whether you are protecting sensitive information or
                Searching for new artistic techniques, this device provides the flexibility for you. Now try and search it
                How easy it can be to edit your images with confidence!
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </ToolLayout>
  )
}

export default PhotoCensor

