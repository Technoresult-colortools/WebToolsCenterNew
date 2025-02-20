"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import { Button, Card, CardBody, CardHeader, Input, Radio, RadioGroup, Select, SelectItem, Slider } from "@nextui-org/react"
import NextImage from "next/image"
import { Toaster, toast } from "react-hot-toast"
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
type ImageFormat = "image/jpeg" | "image/png" | "image/webp"

const PhotoCensor: React.FC = () => {
    const [image, setImage] = useState<string | null>(null)
    const [fileName, setFileName] = useState<string>("")
    const [censorType, setCensorType] = useState<CensorType>("blur")
    const [intensity, setIntensity] = useState<number>(10)
    const [selection, setSelection] = useState({ x: 0, y: 0, width: 0, height: 0 })
    const [isSelecting, setIsSelecting] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [downloadFormat, setDownloadFormat] = useState<ImageFormat>("image/jpeg")
    const imageRef = useRef<HTMLImageElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const startPointRef = useRef<{ x: number; y: number } | null>(null)
    const dropZoneRef = useRef<HTMLDivElement>(null)

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

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      toast.success(`Uploaded: ${file.name}`)
    } else {
      toast.error("Please upload a valid image file.")
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.add("border-primary")
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.remove("border-primary")
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.remove("border-primary")
    const file = e.dataTransfer.files[0]
    handleImageUpload(file)
  }


  const pixelateArea = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    pixelSize: number,
  ) => {
    const imageData = ctx.getImageData(x, y, width, height)
    const data = imageData.data

    for (let offsetY = 0; offsetY < height; offsetY += pixelSize) {
      for (let offsetX = 0; offsetX < width; offsetX += pixelSize) {
        const pixelIndex = (offsetY * width + offsetX) * 4
        const r = data[pixelIndex]
        const g = data[pixelIndex + 1]
        const b = data[pixelIndex + 2]
        const a = data[pixelIndex + 3]

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

    const tempCanvas = document.createElement("canvas")
    const tempCtx = tempCanvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
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

      tempCtx?.drawImage(img, 0, 0, newWidth, newHeight)
      
      const quality = downloadFormat === 'image/jpeg' ? 0.8 : 1
      const compressedImage = tempCanvas.toDataURL(downloadFormat, quality)

      const link = document.createElement("a")
      link.href = compressedImage
      link.download = `censored-image.${downloadFormat.split('/')[1]}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      toast.success("Censored image downloaded successfully!")
    }

    img.src = image
  }

  const resetImage = () => {
    setImage(null)
    setFileName("")
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
      toolId="678f382a26f06f912191bc93"
    >

     <div className="flex flex-col gap-8">
     <Card className="bg-default-50 dark:bg-default-100">
        <CardBody className="p-6">
            <CardHeader className="pb-4">
            <h2 className="text-2xl font-bold">Upload Image</h2>
            </CardHeader>
            
            {/* Hidden file input */}
            <Input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleImageUpload(e.target.files?.[0] as File)}
            accept="image/*"
            className="hidden"
            id="image-upload"
            />

            {/* Clickable Drop Zone */}
            <div
            ref={dropZoneRef}
            onClick={() => fileInputRef.current?.click()} // Trigger file input on click
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="flex flex-col items-center justify-center h-64 px-4 py-6 bg-default-100 text-primary rounded-lg shadow-lg tracking-wide uppercase border-2 border-primary border-dashed cursor-pointer hover:bg-primary-100 hover:text-primary-600 transition duration-300"
            >
            <Upload size={32} />
            <span className="mt-2 text-base leading-normal">Drag & drop or click to select</span>
            </div>
        </CardBody>
        </Card>


        {image && (
          <Card className="bg-default-50 dark:bg-default-100">
            <CardBody className="p-6">
            {fileName && <p className="p-2 text-small text-default-500">Current file: {fileName}</p>}    

        <div
          ref={containerRef}
          className="p-4 bg-default-200 dark:bg-default-50 rounded-lg min-h-[300px] flex items-center justify-center overflow-auto relative"
          
        >
          {image ? (
                
                <div className="relative max-w-full max-h-[500px] flex items-center justify-center ">
                     
                  {isProcessing && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                     
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
            <div className="text-default-400 dark:text-default-500 text-center">
                
              <p>No image uploaded</p>
              <p className="text-sm">Drag & drop an image or click to select</p>
            </div>
          )}
        </div>
        </CardBody>
          </Card>
        )}

        

      {image && (
          <Card className="bg-default-50 dark:bg-default-100">
            <CardBody className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Censoring Options</h3>
                  <RadioGroup
                    value={censorType}
                    onValueChange={(value) => setCensorType(value as CensorType)}
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
                      <p className="mb-2">Intensity: {intensity}</p>
                      <Slider
                        aria-label="Intensity"
                        step={1}
                        maxValue={20}
                        minValue={1}
                        value={intensity}
                        onChange={(value) => setIntensity(value as number)}
                        className="max-w-md"
                        isDisabled={isProcessing}
                      />
                    </div>
                  )}

                  <Button color="success" onPress={applyCensor} isDisabled={isProcessing} className="w-full md:w-auto">
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Apply Censoring"
                    )}
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Export Options</h3>
                  <Select
                    label="Download Format"
                    value={downloadFormat}
                    onChange={(e) => setDownloadFormat(e.target.value as ImageFormat)}
                    className="max-w-md"
                    variant="bordered"
                  >
                    <SelectItem key="image/jpeg" value="image/jpeg" className="text-default-700">
                      JPEG
                    </SelectItem>
                    <SelectItem key="image/png" value="image/png" className="text-default-700">
                      PNG
                    </SelectItem>
                    <SelectItem key="image/webp" value="image/webp" className="text-default-700">
                      WebP
                    </SelectItem>
                  </Select>

                  <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <Button
                        color="primary"
                        onPress={handleDownload}
                        isDisabled={!image || isProcessing}
                        className="w-full sm:flex-1"
                    >
                        <Download className="h-5 w-5 mr-2" />
                        Download
                    </Button>
                    <Button
                        color="danger"
                        onPress={resetImage}
                        isDisabled={isProcessing}
                        className="w-full sm:flex-1"
                    >
                        <RefreshCw className="h-5 w-5 mr-2" />
                        Reset
                    </Button>
                    </div>

                </div>
              </div>
            </CardBody>
          </Card>
        )}

        <canvas ref={canvasRef} style={{ display: "none" }} />

      

        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                What is the Photo Censor Tool?
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                The Photo Censor Tool is a powerful and user-friendly application designed to help you protect sensitive
                information in your images. Whether you're safeguarding personal data, complying with privacy
                regulations, or adding creative effects to your photos, our tool provides a seamless solution for
                selective image censoring.
              </p>
              <p className="text-sm md:text-base text-default-600 mb-4">
                With three versatile censoring methods - blur, pixelate, and black-out - and adjustable intensity
                levels, you have complete control over how you obscure parts of your images. Our intuitive interface
                allows for precise area selection and real-time previews, ensuring you achieve exactly the result you
                need.
              </p>

              <div className="my-8">
                <NextImage
                  src="/Images/PhotoCensorPreview.png?height=400&width=600"
                  alt="Screenshot of the Photo Censor Tool interface showing censoring options and a sample censored image"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>

              <h2
                id="how-to-use"
                className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center"
              >
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use the Photo Censor Tool?
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
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

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Key Features
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
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

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Creative Tips and Tricks
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>Use the Blur effect at low intensity to create a soft focus effect on backgrounds.</li>
                <li>Combine different censoring methods on the same image for varied visual effects.</li>
                <li>Pixelate small areas to create an interesting, retro-style focal point in your image.</li>
                <li>Use the Black-out feature to create silhouettes or high-contrast areas in your photos.</li>
                <li>Experiment with censoring shapes to create unique, abstract designs within your images.</li>
                <li>Use the tool to highlight specific areas by censoring the surrounding parts of the image.</li>
                <li>Create a "reveal" effect by censoring most of an image and leaving key parts visible.</li>
              </ul>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                Applications and Use Cases
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>
                  <strong>Privacy Protection:</strong> Obscure sensitive information in documents or personal photos.
                </li>
                <li>
                  <strong>Social Media:</strong> Protect identities or hide sensitive details before posting images
                  online.
                </li>
                <li>
                  <strong>Business:</strong> Redact confidential information from screenshots or business documents.
                </li>
                <li>
                  <strong>Education:</strong> Create engaging visual puzzles or "guess the image" games for students.
                </li>
                <li>
                  <strong>Real Estate:</strong> Blur or pixelate house numbers or car license plates in property photos.
                </li>
                <li>
                  <strong>Graphic Design:</strong> Create interesting visual effects for posters, album covers, or
                  digital art.
                </li>
                <li>
                  <strong>User Interface Design:</strong> Generate placeholder images or mockups with censored content
                  areas.
                </li>
                <li>
                  <strong>Photography:</strong> Experiment with partial image censoring for artistic effect in portraits
                  or landscapes.
                </li>
              </ul>

              <p className="text-sm md:text-base text-default-600 mt-6">
                Ready to start censoring your images with precision and creativity? Our Photo Censor Tool offers the
                perfect balance of functionality and ease of use. Whether you're protecting sensitive information or
                exploring new artistic techniques, this tool provides the flexibility you need. Try it now and discover
                how easy it can be to edit your images with confidence!
              </p>
            </div>
          </CardBody>
        </Card>
     </div>
    </ToolLayout>
  )
}

export default PhotoCensor

