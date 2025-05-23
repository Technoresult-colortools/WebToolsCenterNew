"use client"

import type React from "react"
import { useState, useCallback, useRef, useEffect } from "react"
import {
  Card,
  CardBody,
  Button,
  Slider,
  Tabs,
  Tab,
  Badge,
  Tooltip,
  Modal,
  ModalContent,
  Select,
  SelectItem,
  Progress,
} from "@nextui-org/react"
import {
  Download,
  Upload,
  RotateCw,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  FlipHorizontal,
  FlipVertical,
  Crop,
  History,
  Redo,
  ImageIcon,
  RefreshCw,
  Trash2,
  Square,
  RectangleVerticalIcon as Rectangle,
  Monitor,
  Smartphone,
  Tv,
  SlidersHorizontal,
  Save,
  Eye,
  X,
  FileImage,
  Camera,
  LinkIcon,
  AlertCircle,
} from "lucide-react"
import { toast } from "react-hot-toast"
import ReactCrop, { type Crop as CropType, centerCrop, makeAspectCrop } from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import ToolLayout from "@/components/ToolLayout"
import InfoSectionImageCropper from "./info-section"

// Predefined aspect ratios
const aspectRatios = [
  { value: "free", label: "Free", icon: <Crop size={16} /> },
  { value: "1:1", label: "Square (1:1)", icon: <Square size={16} /> },
  { value: "4:3", label: "Standard (4:3)", icon: <Rectangle size={16} /> },
  { value: "16:9", label: "Widescreen (16:9)", icon: <Tv size={16} /> },
  { value: "9:16", label: "Portrait (9:16)", icon: <Smartphone size={16} /> },
  { value: "3:2", label: "Classic (3:2)", icon: <Monitor size={16} /> },
  { value: "2:3", label: "Portrait (2:3)", icon: <Smartphone size={16} /> },
]

// Image export formats
const exportFormats = [
  { value: "image/jpeg", label: "JPEG", extension: "jpg" },
  { value: "image/png", label: "PNG", extension: "png" },
  { value: "image/webp", label: "WebP", extension: "webp" },
]

// Function to get numeric aspect ratio from string
const getNumericAspectRatio = (ratio: string): number | undefined => {
  if (ratio === "free") return undefined
  const [width, height] = ratio.split(":").map(Number)
  return width / height
}

// Function to center and create a crop with the specified aspect ratio
function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number | undefined) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect || 1,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export default function ImageCropper() {
  // Image and crop state
  const [imgSrc, setImgSrc] = useState<string>("")
  const [originalImgSrc, setOriginalImgSrc] = useState<string>("")
  const [crop, setCrop] = useState<CropType>()
  const [completedCrop, setCompletedCrop] = useState<CropType | null>(null)
  const [aspect, setAspect] = useState<number | undefined>(undefined)
  const [selectedRatio, setSelectedRatio] = useState("free")
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(1)
  const [flipHorizontal, setFlipHorizontal] = useState(false)
  const [flipVertical, setFlipVertical] = useState(false)
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [selectedTab, setSelectedTab] = useState("crop")
  const [exportFormat, setExportFormat] = useState("image/jpeg")
  const [exportQuality, setExportQuality] = useState(90)
  const [history, setHistory] = useState<
    Array<{
      crop: CropType | undefined
      rotation: number
      scale: number
      flipH: boolean
      flipV: boolean
      brightness: number
      contrast: number
    }>
  >([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [fileName, setFileName] = useState("cropped-image")
  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false)
  const [uploadMethod, setUploadMethod] = useState<"device" | "url" | "camera">("device")
  const [imageUrl, setImageUrl] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)

  // Refs
  const imgRef = useRef<HTMLImageElement>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  // Handle image upload from device
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      processFile(file)
    }
  }

  // Process the selected file
  const processFile = (file: File) => {
    // Simulate upload progress
    setIsUploading(true)
    setUploadProgress(0)

    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 10
      })
    }, 100)

    const reader = new FileReader()
    reader.addEventListener("load", () => {
      const imageUrl = reader.result?.toString() || ""

      // Clear the interval when the file is loaded
      clearInterval(progressInterval)
      setUploadProgress(100)

      setTimeout(() => {
        setIsUploading(false)
        setImgSrc(imageUrl)
        setOriginalImgSrc(imageUrl)

        // Set filename from uploaded file (without extension)
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "")
        setFileName(nameWithoutExt || "cropped-image")

        // Reset crop and adjustments
        setCrop(undefined)
        setRotation(0)
        setScale(1)
        setFlipHorizontal(false)
        setFlipVertical(false)
        setBrightness(100)
        setContrast(100)

        // Clear history
        setHistory([])
        setHistoryIndex(-1)

        // Clear preview
        setPreviewUrl("")
      }, 500)
    })
    reader.readAsDataURL(file)
  }

  // Handle image upload from URL
  const handleUrlUpload = () => {
    if (!imageUrl) {
      toast.error("Please enter an image URL")
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 100)

    // Create a new image to test if the URL is valid
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      clearInterval(progressInterval)
      setUploadProgress(100)

      setTimeout(() => {
        setIsUploading(false)
        setImgSrc(imageUrl)
        setOriginalImgSrc(imageUrl)

        // Set filename from URL
        const urlParts = imageUrl.split("/")
        const nameWithExt = urlParts[urlParts.length - 1]
        const nameWithoutExt = nameWithExt.split("?")[0].replace(/\.[^/.]+$/, "")
        setFileName(nameWithoutExt || "cropped-image")

        // Reset crop and adjustments
        setCrop(undefined)
        setRotation(0)
        setScale(1)
        setFlipHorizontal(false)
        setFlipVertical(false)
        setBrightness(100)
        setContrast(100)

        // Clear history
        setHistory([])
        setHistoryIndex(-1)

        // Clear preview
        setPreviewUrl("")

        // Clear URL input
        setImageUrl("")
      }, 500)
    }

    img.onerror = () => {
      clearInterval(progressInterval)
      setIsUploading(false)
      setUploadProgress(0)
      toast.error("Failed to load image from URL. Make sure the URL is correct and the image is accessible.")
    }

    img.src = imageUrl
  }

  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  // Handle drop event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith("image/")) {
        processFile(file)
      } else {
        toast.error("Please drop an image file")
      }
    }
  }

  // Handle camera capture
  const handleCameraCapture = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click()
    }
  }

  // Handle image load
  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget

      // If aspect ratio is set, create a centered crop
      if (aspect) {
        const newCrop = centerAspectCrop(width, height, aspect)
        setCrop(newCrop)

        // Add to history
        addToHistory(newCrop, rotation, scale, flipHorizontal, flipVertical, brightness, contrast)
      }
    },
    [aspect, rotation, scale, flipHorizontal, flipVertical, brightness, contrast],
  )

  // Handle aspect ratio change
  const onAspectRatioChange = (ratio: string) => {
    setSelectedRatio(ratio)
    const newAspect = getNumericAspectRatio(ratio)
    setAspect(newAspect)

    if (imgRef.current) {
      const { width, height } = imgRef.current
      const newCrop = centerAspectCrop(width, height, newAspect)
      setCrop(newCrop)

      // Add to history
      addToHistory(newCrop, rotation, scale, flipHorizontal, flipVertical, brightness, contrast)
    }
  }

  // Add current state to history
  const addToHistory = (
    newCrop: CropType | undefined,
    newRotation: number,
    newScale: number,
    newFlipH: boolean,
    newFlipV: boolean,
    newBrightness: number,
    newContrast: number,
  ) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push({
      crop: newCrop,
      rotation: newRotation,
      scale: newScale,
      flipH: newFlipH,
      flipV: newFlipV,
      brightness: newBrightness,
      contrast: newContrast,
    })
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  // Generate preview when crop changes
  useEffect(() => {
    if (completedCrop && imgRef.current && previewCanvasRef.current) {
      const image = imgRef.current
      const canvas = previewCanvasRef.current
      const ctx = canvas.getContext("2d")

      if (!ctx) return

      // Set canvas dimensions
      const scaleX = image.naturalWidth / image.width
      const scaleY = image.naturalHeight / image.height
      canvas.width = completedCrop.width * scaleX
      canvas.height = completedCrop.height * scaleY

      // Apply transformations
      ctx.save()

      // Translate to center for rotation
      ctx.translate(canvas.width / 2, canvas.height / 2)

      // Apply rotation
      ctx.rotate((rotation * Math.PI) / 180)

      // Apply flips
      ctx.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1)

      // Apply scale
      ctx.scale(scale, scale)

      // Draw the image
      ctx.translate(-canvas.width / 2, -canvas.height / 2)
      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
      )

      // Apply brightness and contrast
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      // Brightness and contrast adjustments
      const brightnessAdjust = ((brightness - 100) / 100) * 255
      const contrastFactor = (contrast / 100) ** 2

      for (let i = 0; i < data.length; i += 4) {
        // Brightness
        data[i] = Math.min(255, Math.max(0, data[i] + brightnessAdjust))
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + brightnessAdjust))
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + brightnessAdjust))

        // Contrast
        data[i] = Math.min(255, Math.max(0, ((data[i] / 255 - 0.5) * contrastFactor + 0.5) * 255))
        data[i + 1] = Math.min(255, Math.max(0, ((data[i + 1] / 255 - 0.5) * contrastFactor + 0.5) * 255))
        data[i + 2] = Math.min(255, Math.max(0, ((data[i + 2] / 255 - 0.5) * contrastFactor + 0.5) * 255))
      }

      ctx.putImageData(imageData, 0, 0)
      ctx.restore()

      // Convert canvas to data URL for preview
      const dataUrl = canvas.toDataURL(exportFormat, exportQuality / 100)
      setPreviewUrl(dataUrl)
    }
  }, [completedCrop, rotation, scale, flipHorizontal, flipVertical, brightness, contrast, exportFormat, exportQuality])

  // Handle crop button click
  const handleCrop = useCallback(() => {
    if (!completedCrop || !imgRef.current) {
      toast.error("Please make a crop selection first")
      return
    }

    // Generate the cropped image immediately when crop button is clicked
    const image = imgRef.current
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) {
      toast.error("Canvas not supported")
      return
    }

    // Set canvas dimensions
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = completedCrop.width * scaleX
    canvas.height = completedCrop.height * scaleY

    // Apply transformations
    ctx.save()

    // Translate to center for rotation
    ctx.translate(canvas.width / 2, canvas.height / 2)

    // Apply rotation
    ctx.rotate((rotation * Math.PI) / 180)

    // Apply flips
    ctx.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1)

    // Apply scale
    ctx.scale(scale, scale)

    // Draw the image
    ctx.translate(-canvas.width / 2, -canvas.height / 2)
    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
    )

    // Apply brightness and contrast
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    // Brightness and contrast adjustments
    const brightnessAdjust = ((brightness - 100) / 100) * 255
    const contrastFactor = (contrast / 100) ** 2

    for (let i = 0; i < data.length; i += 4) {
      // Brightness
      data[i] = Math.min(255, Math.max(0, data[i] + brightnessAdjust))
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + brightnessAdjust))
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + brightnessAdjust))

      // Contrast
      data[i] = Math.min(255, Math.max(0, ((data[i] / 255 - 0.5) * contrastFactor + 0.5) * 255))
      data[i + 1] = Math.min(255, Math.max(0, ((data[i + 1] / 255 - 0.5) * contrastFactor + 0.5) * 255))
      data[i + 2] = Math.min(255, Math.max(0, ((data[i + 2] / 255 - 0.5) * contrastFactor + 0.5) * 255))
    }

    ctx.putImageData(imageData, 0, 0)
    ctx.restore()

    // Convert canvas to data URL
    const dataUrl = canvas.toDataURL(exportFormat, exportQuality / 100)

    // Replace the main image with the cropped version
    setImgSrc(dataUrl)
    setPreviewUrl(dataUrl)

    // Reset crop, transformations, and adjustments after cropping
    setCrop(undefined)
    setCompletedCrop(null)
    setRotation(0)
    setScale(1)
    setFlipHorizontal(false)
    setFlipVertical(false)
    setBrightness(100)
    setContrast(100)

    // Add to history
    addToHistory(undefined, 0, 1, false, false, 100, 100)

    toast.success("Image cropped successfully")
  }, [
    crop,
    completedCrop,
    rotation,
    scale,
    flipHorizontal,
    flipVertical,
    brightness,
    contrast,
    exportFormat,
    exportQuality,
  ])

  // Handle download
  const handleDownload = useCallback(() => {
    if (!previewUrl) {
      toast.error("Please crop the image first")
      return
    }

    // Get the file extension based on the selected format
    const formatInfo = exportFormats.find((format) => format.value === exportFormat)
    const extension = formatInfo ? formatInfo.extension : "jpg"

    const link = document.createElement("a")
    link.download = `${fileName}.${extension}`
    link.href = previewUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast.success(`Image downloaded as ${extension.toUpperCase()}`)
  }, [previewUrl, fileName, exportFormat])

  // Handle reset
  const handleReset = useCallback(() => {
    if (originalImgSrc) {
      setImgSrc(originalImgSrc)
      setCrop(undefined)
      setRotation(0)
      setScale(1)
      setFlipHorizontal(false)
      setFlipVertical(false)
      setBrightness(100)
      setContrast(100)
      setPreviewUrl("")

      toast.success("Image reset to original")
    }
  }, [originalImgSrc])

  // Handle clear
  const handleClear = useCallback(() => {
    setImgSrc("")
    setOriginalImgSrc("")
    setCrop(undefined)
    setRotation(0)
    setScale(1)
    setFlipHorizontal(false)
    setFlipVertical(false)
    setBrightness(100)
    setContrast(100)
    setPreviewUrl("")
    setHistory([])
    setHistoryIndex(-1)
    setFileName("cropped-image")

    toast.success("All cleared")
  }, [])

  // Handle redo
  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1
      const nextState = history[nextIndex]

      setCrop(nextState.crop)
      setRotation(nextState.rotation)
      setScale(nextState.scale)
      setFlipHorizontal(nextState.flipH)
      setFlipVertical(nextState.flipV)
      setBrightness(nextState.brightness)
      setContrast(nextState.contrast)

      setHistoryIndex(nextIndex)
    }
  }, [history, historyIndex])

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Open fullscreen preview modal
  const openFullscreenPreview = () => {
    setIsPreviewFullscreen(true)
  }

  // Render fullscreen preview modal
  const renderFullscreenPreview = () => (
    <Modal
      isOpen={isPreviewFullscreen}
      onOpenChange={setIsPreviewFullscreen}
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
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={previewUrl || "/placeholder.svg"}
                  alt="Preview"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              {/* Download options in fullscreen view */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <Select
                  label="Format"
                  variant="bordered"
                  selectedKeys={[exportFormat]}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="w-32"
                >
                  {exportFormats.map((format) => (
                    <SelectItem key={format.value} value={format.value} className="text-default-700">
                      {format.label}
                    </SelectItem>
                  ))}
                </Select>
                <Button
                  color="primary"
                  size="md"
                  variant="light"
                  onPress={handleDownload}
                  startContent={<Download size={18} />}
                >
                  Download
                </Button>
              </div>
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  )

  // Render upload section
  const renderUploadSection = () => (
    <div
      className={`flex flex-col items-center justify-center p-4 sm:p-8 border-2 border-dashed rounded-lg min-h-[300px] transition-all duration-200 ${
        dragActive
          ? "border-primary-500 bg-primary-100/30 dark:bg-primary-900/20"
          : "border-default-300 hover:border-primary-300 hover:bg-default-100/50"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {isUploading ? (
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-4">
            <div className="relative w-16 h-16 mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-primary-200 dark:border-primary-800"></div>
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-primary-500"
                  strokeWidth="8"
                  strokeDasharray={`${uploadProgress}, 100`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="46"
                  cx="50"
                  cy="50"
                  transform="rotate(-90, 50, 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-primary-500">
                {uploadProgress}%
              </div>
            </div>
            <p className="text-default-600 text-center">Uploading image...</p>
          </div>
          <Progress
            value={uploadProgress}
            color="primary"
            size="md"
            radius="sm"
            classNames={{
              track: "h-3",
              indicator: "h-3",
            }}
          />
        </div>
      ) : (
        <>
          <div className="mb-6 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
              <ImageIcon size={36} className="text-primary-500" />
            </div>
            <h3 className="text-lg font-medium text-default-700 mb-1">Upload an Image</h3>
            <p className="text-sm text-default-500 text-center max-w-md">
              Drag & drop an image here, or choose one of the options below
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <Button
              color={uploadMethod === "device" ? "primary" : "default"}
              variant={uploadMethod === "device" ? "solid" : "flat"}
              onPress={() => setUploadMethod("device")}
              startContent={<Upload size={18} />}
              className="min-w-[120px]"
            >
              Device
            </Button>
            <Button
              color={uploadMethod === "url" ? "primary" : "default"}
              variant={uploadMethod === "url" ? "solid" : "flat"}
              onPress={() => setUploadMethod("url")}
              startContent={<LinkIcon size={18} />}
              className="min-w-[120px]"
            >
              URL
            </Button>
            <Button
              color={uploadMethod === "camera" ? "primary" : "default"}
              variant={uploadMethod === "camera" ? "solid" : "flat"}
              onPress={() => setUploadMethod("camera")}
              startContent={<Camera size={18} />}
              className="min-w-[120px]"
            >
              Camera
            </Button>
          </div>

          {uploadMethod === "device" && (
            <div className="w-full max-w-md">
              <Button
                color="primary"
                variant="flat"
                onPress={() => fileInputRef.current?.click()}
                startContent={<Upload size={18} />}
                className="w-full"
              >
                Choose File
              </Button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={onSelectFile} className="hidden" />
              <p className="text-xs text-default-500 text-center mt-2">Supported formats: JPG, PNG, WebP, GIF</p>
            </div>
          )}

          {uploadMethod === "url" && (
            <div className="w-full max-w-md">
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1 p-2 rounded-md border border-default-300 bg-default-100 dark:bg-default-200/50"
                />
                <Button color="primary" onPress={handleUrlUpload}>
                  Load
                </Button>
              </div>
              <div className="flex items-start gap-2 text-xs text-default-500">
                <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                <p>Make sure the URL is publicly accessible and points directly to an image file</p>
              </div>
            </div>
          )}

          {uploadMethod === "camera" && (
            <div className="w-full max-w-md">
              <Button
                color="primary"
                variant="flat"
                onPress={handleCameraCapture}
                startContent={<Camera size={18} />}
                className="w-full"
              >
                Take Photo
              </Button>
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={onSelectFile}
                className="hidden"
              />
              <p className="text-xs text-default-500 text-center mt-2">This will open your device camera</p>
            </div>
          )}
        </>
      )}
    </div>
  )

  return (
    <ToolLayout
      title="Image Cropper"
      description="Crop, rotate, and adjust your images with precision for web and mobile"
      toolId="image-cropper"
    >
      <div
        className={`flex flex-col gap-6 ${isFullscreen ? "fixed inset-0 z-50 bg-background p-4 overflow-auto" : ""}`}
      >
        {isFullscreen && (
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Image Cropper</h2>
            <Button isIconOnly variant="light" onPress={toggleFullscreen}>
              <Minimize2 size={20} />
            </Button>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Image Editor */}
          <div className="lg:col-span-2">
            <Card className="bg-default-50 dark:bg-default-100 h-full">
              <CardBody className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-md font-medium text-primary-500">Image Editor</h3>
                  <div className="flex gap-1">
                    <Button
                      isIconOnly
                      size="sm"
                      color="primary"
                      variant="light"
                      onPress={openFullscreenPreview}
                      aria-label="Toggle fullscreen"
                      isDisabled={!previewUrl}
                    >
                      <Maximize2 size={18} />
                    </Button>
                  </div>
                </div>

                {!imgSrc ? (
                  renderUploadSection()
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="relative max-w-full overflow-hidden mb-4 border border-default-200 rounded-lg">
                      <ReactCrop
                        crop={crop}
                        onChange={(c) => setCrop(c)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={aspect}
                        className="max-h-[500px] max-w-full"
                      >
                        <img
                          ref={imgRef}
                          alt="Crop me"
                          src={imgSrc || "/placeholder.svg"}
                          style={{
                            transform: `scale(${scale}) rotate(${rotation}deg) scaleX(${
                              flipHorizontal ? -1 : 1
                            }) scaleY(${flipVertical ? -1 : 1})`,
                            filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                            maxHeight: "500px",
                            maxWidth: "100%",
                          }}
                          onLoad={onImageLoad}
                        />
                      </ReactCrop>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2 justify-center">
                      <Button
                        color="primary"
                        variant="flat"
                        onPress={handleCrop}
                        startContent={<Crop size={18} />}
                        isDisabled={!crop}
                      >
                        Crop Image
                      </Button>
                      <Button
                        color="primary"
                        variant="flat"
                        onPress={handleReset}
                        startContent={<RefreshCw size={18} />}
                        isDisabled={!originalImgSrc}
                      >
                        Reset
                      </Button>
                      <Button color="danger" variant="flat" onPress={handleClear} startContent={<Trash2 size={18} />}>
                        Clear
                      </Button>
                      <div className="relative">
                        <Button
                          color="primary"
                          variant="flat"
                          startContent={<Upload size={18} />}
                          onPress={() => fileInputRef.current?.click()}
                        >
                          New Image
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={onSelectFile}
                          className="hidden"
                        />
                      </div>
                      <div className="ml-auto">
                        <Tooltip content="Redo">
                          <Button
                            isIconOnly
                            variant="flat"
                            onPress={handleRedo}
                            isDisabled={historyIndex >= history.length - 1}
                            aria-label="Redo"
                          >
                            <Redo size={18} />
                          </Button>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>

          {/* Controls Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-default-50 dark:bg-default-100 h-full">
              <CardBody className="p-4">
                <Tabs
                  selectedKey={selectedTab}
                  onSelectionChange={(key: React.Key) => setSelectedTab(key as string)}
                  aria-label="Options"
                  classNames={{
                    tabList: "gap-2",
                    tab: "px-3 py-2",
                    tabContent: "group-data-[selected=true]:text-primary-500",
                  }}
                >
                  <Tab
                    key="crop"
                    title={
                      <div className="flex items-center gap-2">
                        <Crop size={18} />
                        <span>Crop</span>
                      </div>
                    }
                  >
                    <div className="mt-4">
                      <div className="mb-4">
                        <h3 className="text-sm font-medium mb-2">Aspect Ratio</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {aspectRatios.map((ratio) => (
                            <Button
                              key={ratio.value}
                              size="sm"
                              variant={selectedRatio === ratio.value ? "solid" : "flat"}
                              color={selectedRatio === ratio.value ? "primary" : "default"}
                              onPress={() => onAspectRatioChange(ratio.value)}
                              startContent={ratio.icon}
                              className="justify-start"
                              isDisabled={!imgSrc}
                            >
                              {ratio.label}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h3 className="text-sm font-medium mb-2">Rotation</h3>
                        <div className="flex gap-2 mb-2">
                          <Button
                            size="sm"
                            isIconOnly
                            variant="flat"
                            onPress={() => {
                              setRotation((prev) => prev - 90)
                              addToHistory(
                                crop,
                                rotation - 90,
                                scale,
                                flipHorizontal,
                                flipVertical,
                                brightness,
                                contrast,
                              )
                            }}
                            isDisabled={!imgSrc}
                          >
                            <RotateCcw size={16} />
                          </Button>
                          <Slider
                            size="sm"
                            step={1}
                            minValue={-180}
                            maxValue={180}
                            value={rotation}
                            onChange={(value) => {
                              setRotation(Number(value))
                              addToHistory(
                                crop,
                                Number(value),
                                scale,
                                flipHorizontal,
                                flipVertical,
                                brightness,
                                contrast,
                              )
                            }}
                            className="flex-1"
                            aria-label="Rotation"
                            isDisabled={!imgSrc}
                          />
                          <Button
                            size="sm"
                            isIconOnly
                            variant="flat"
                            onPress={() => {
                              setRotation((prev) => prev + 90)
                              addToHistory(
                                crop,
                                rotation + 90,
                                scale,
                                flipHorizontal,
                                flipVertical,
                                brightness,
                                contrast,
                              )
                            }}
                            isDisabled={!imgSrc}
                          >
                            <RotateCw size={16} />
                          </Button>
                        </div>
                        <div className="flex justify-between text-xs text-default-500">
                          <span>-180°</span>
                          <span>{rotation}°</span>
                          <span>180°</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h3 className="text-sm font-medium mb-2">Zoom</h3>
                        <div className="flex gap-2 mb-2">
                          <Button
                            size="sm"
                            isIconOnly
                            variant="flat"
                            onPress={() => {
                              setScale((prev) => Math.max(0.5, prev - 0.1))
                              addToHistory(
                                crop,
                                rotation,
                                Math.max(0.5, scale - 0.1),
                                flipHorizontal,
                                flipVertical,
                                brightness,
                                contrast,
                              )
                            }}
                            isDisabled={!imgSrc}
                          >
                            <ZoomOut size={16} />
                          </Button>
                          <Slider
                            size="sm"
                            step={0.1}
                            minValue={0.5}
                            maxValue={3}
                            value={scale}
                            onChange={(value) => {
                              setScale(Number(value))
                              addToHistory(
                                crop,
                                rotation,
                                Number(value),
                                flipHorizontal,
                                flipVertical,
                                brightness,
                                contrast,
                              )
                            }}
                            className="flex-1"
                            aria-label="Zoom"
                            isDisabled={!imgSrc}
                          />
                          <Button
                            size="sm"
                            isIconOnly
                            variant="flat"
                            onPress={() => {
                              setScale((prev) => Math.min(3, prev + 0.1))
                              addToHistory(
                                crop,
                                rotation,
                                Math.min(3, scale + 0.1),
                                flipHorizontal,
                                flipVertical,
                                brightness,
                                contrast,
                              )
                            }}
                            isDisabled={!imgSrc}
                          >
                            <ZoomIn size={16} />
                          </Button>
                        </div>
                        <div className="flex justify-between text-xs text-default-500">
                          <span>50%</span>
                          <span>{Math.round(scale * 100)}%</span>
                          <span>300%</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h3 className="text-sm font-medium mb-2">Flip</h3>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant={flipHorizontal ? "solid" : "flat"}
                            color={flipHorizontal ? "primary" : "default"}
                            onPress={() => {
                              setFlipHorizontal((prev) => !prev)
                              addToHistory(crop, rotation, scale, !flipHorizontal, flipVertical, brightness, contrast)
                            }}
                            startContent={<FlipHorizontal size={16} />}
                            isDisabled={!imgSrc}
                          >
                            Horizontal
                          </Button>
                          <Button
                            size="sm"
                            variant={flipVertical ? "solid" : "flat"}
                            color={flipVertical ? "primary" : "default"}
                            onPress={() => {
                              setFlipVertical((prev) => !prev)
                              addToHistory(crop, rotation, scale, flipHorizontal, !flipVertical, brightness, contrast)
                            }}
                            startContent={<FlipVertical size={16} />}
                            isDisabled={!imgSrc}
                          >
                            Vertical
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab
                    key="adjust"
                    title={
                      <div className="flex items-center gap-2">
                        <SlidersHorizontal size={18} />
                        <span>Adjust</span>
                      </div>
                    }
                  >
                    <div className="mt-4">
                      <div className="mb-4">
                        <h3 className="text-sm font-medium mb-2">Brightness</h3>
                        <div className="flex gap-2 mb-2">
                          <Slider
                            size="sm"
                            step={1}
                            minValue={50}
                            maxValue={150}
                            value={brightness}
                            onChange={(value) => {
                              setBrightness(Number(value))
                              addToHistory(crop, rotation, scale, flipHorizontal, flipVertical, Number(value), contrast)
                            }}
                            className="flex-1"
                            aria-label="Brightness"
                            isDisabled={!imgSrc}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-default-500">
                          <span>50%</span>
                          <span>{brightness}%</span>
                          <span>150%</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h3 className="text-sm font-medium mb-2">Contrast</h3>
                        <div className="flex gap-2 mb-2">
                          <Slider
                            size="sm"
                            step={1}
                            minValue={50}
                            maxValue={150}
                            value={contrast}
                            onChange={(value) => {
                              setContrast(Number(value))
                              addToHistory(
                                crop,
                                rotation,
                                scale,
                                flipHorizontal,
                                flipVertical,
                                brightness,
                                Number(value),
                              )
                            }}
                            className="flex-1"
                            aria-label="Contrast"
                            isDisabled={!imgSrc}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-default-500">
                          <span>50%</span>
                          <span>{contrast}%</span>
                          <span>150%</span>
                        </div>
                      </div>

                      <div className="mt-6">
                        <Button
                          size="sm"
                          color="primary"
                          variant="flat"
                          onPress={() => {
                            setBrightness(100)
                            setContrast(100)
                            addToHistory(crop, rotation, scale, flipHorizontal, flipVertical, 100, 100)
                          }}
                          startContent={<RefreshCw size={16} />}
                          isDisabled={!imgSrc}
                          className="w-full"
                        >
                          Reset Adjustments
                        </Button>
                      </div>
                    </div>
                  </Tab>
                  <Tab
                    key="export"
                    title={
                      <div className="flex items-center gap-2">
                        <FileImage size={18} />
                        <span>Export</span>
                      </div>
                    }
                  >
                    <div className="mt-4">
                      {previewUrl ? (
                        <div className="flex flex-col items-center">
                          <div
                            className="border border-default-200 rounded-lg overflow-hidden mb-4 cursor-pointer"
                            onClick={openFullscreenPreview}
                          >
                            <img
                              src={previewUrl || "/placeholder.svg"}
                              alt="Preview"
                              className="max-w-full max-h-[200px]"
                            />
                            <div className="bg-black/50 text-white text-xs p-1 text-center">
                              Click to view fullscreen
                            </div>
                          </div>

                          <div className="w-full space-y-4">
                            <div>
                              <h3 className="text-sm font-medium mb-2">File Name</h3>
                              <input
                                type="text"
                                value={fileName}
                                onChange={(e) => setFileName(e.target.value)}
                                className="w-full p-2 rounded-md border border-default-200 bg-default-100"
                                placeholder="Enter file name"
                              />
                            </div>

                            <div>
                              <h3 className="text-sm font-medium mb-2">Format</h3>
                              <Select
                                label="Select format"
                                variant="bordered"
                                selectedKeys={[exportFormat]}
                                onChange={(e) => setExportFormat(e.target.value)}
                                className="w-full"
                              >
                                {exportFormats.map((format) => (
                                  <SelectItem key={format.value} value={format.value} className="text-default-700">
                                    {format.label}
                                  </SelectItem>
                                ))}
                              </Select>
                            </div>

                            <div>
                              <h3 className="text-sm font-medium mb-2">Quality ({exportQuality}%)</h3>
                              <Slider
                                size="sm"
                                step={5}
                                minValue={10}
                                maxValue={100}
                                value={exportQuality}
                                onChange={(value) => setExportQuality(Number(value))}
                                className="w-full"
                                aria-label="Quality"
                              />
                            </div>

                            <div className="flex gap-2">
                              <Button
                                color="primary"
                                className="w-full"
                                onPress={handleDownload}
                                startContent={<Download size={18} />}
                              >
                                Download
                              </Button>
                              <Button
                                color="secondary"
                                variant="flat"
                                onPress={() => {
                                  navigator.clipboard.writeText(previewUrl)
                                  toast.success("Image URL copied to clipboard")
                                }}
                                startContent={<Save size={18} />}
                              >
                                Copy URL
                              </Button>
                            </div>
                          </div>

                          {/* Hidden canvas for generating the preview */}
                          <canvas
                            ref={previewCanvasRef}
                            style={{
                              display: "none",
                            }}
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-default-300 rounded-lg min-h-[300px]">
                          <Eye size={48} className="text-default-400 mb-4" />
                          <p className="text-default-600 mb-4 text-center">Crop the image to see a preview</p>
                          <Button
                            color="primary"
                            variant="flat"
                            onPress={() => setSelectedTab("crop")}
                            startContent={<Crop size={18} />}
                            isDisabled={!imgSrc}
                          >
                            Go to Crop
                          </Button>
                        </div>
                      )}
                    </div>
                  </Tab>
                  <Tab
                    key="history"
                    title={
                      <div className="flex items-center gap-2">
                        <History size={18} />
                        <span>History</span>
                      </div>
                    }
                  >
                    <div className="mt-4">
                      {history.length > 0 ? (
                        <div className="flex flex-col gap-2">
                          <p className="text-sm text-default-500">Edit history ({history.length})</p>
                          <div className="max-h-[300px] overflow-y-auto">
                            {history.map((item, index) => (
                              <div
                                key={index}
                                className={`p-2 text-xs border rounded-md mb-2 cursor-pointer hover:bg-default-100 ${
                                  index === historyIndex
                                    ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                                    : "border-default-200"
                                }`}
                                onClick={() => {
                                  setCrop(item.crop)
                                  setRotation(item.rotation)
                                  setScale(item.scale)
                                  setFlipHorizontal(item.flipH)
                                  setFlipVertical(item.flipV)
                                  setBrightness(item.brightness)
                                  setContrast(item.contrast)
                                  setHistoryIndex(index)
                                }}
                              >
                                <div className="flex justify-between items-center mb-1">
                                  <span className="font-medium">Edit {index + 1}</span>
                                  <Badge color="primary" variant="flat" size="sm">
                                    {item.rotation}° {item.scale.toFixed(1)}x
                                  </Badge>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {item.crop && <span className="text-xs bg-default-100 px-1 rounded">Crop</span>}
                                  {item.rotation !== 0 && (
                                    <span className="text-xs bg-default-100 px-1 rounded">Rotate</span>
                                  )}
                                  {item.scale !== 1 && (
                                    <span className="text-xs bg-default-100 px-1 rounded">Zoom</span>
                                  )}
                                  {item.flipH && <span className="text-xs bg-default-100 px-1 rounded">Flip-H</span>}
                                  {item.flipV && <span className="text-xs bg-default-100 px-1 rounded">Flip-V</span>}
                                  {item.brightness !== 100 && (
                                    <span className="text-xs bg-default-100 px-1 rounded">Brightness</span>
                                  )}
                                  {item.contrast !== 100 && (
                                    <span className="text-xs bg-default-100 px-1 rounded">Contrast</span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-default-400">
                          <History className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p>No history available</p>
                          <p className="text-xs mt-1">Make edits to see history</p>
                        </div>
                      )}
                    </div>
                  </Tab>
                </Tabs>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Fullscreen Preview Modal */}
        {renderFullscreenPreview()}

        {/* Info Section */}
        <InfoSectionImageCropper />
      </div>
    </ToolLayout>
  )
}
