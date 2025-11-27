"use client"
import { useState, useCallback, useRef } from "react"
import {
  Upload,
  X,
  Copy,
  Download,
  ImageIcon,
  AlertCircle,
  FileText,
  Trash2,
  Grid,
  List,
  Upload as UploadIcon,
  Image as ImagePlus,
  SlidersHorizontal,
} from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import { toast } from "react-hot-toast"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tabs,
  Tab,
  Textarea,
  Chip,
  ButtonGroup,
  Divider
} from "@nextui-org/react"
import NextImage from "next/image"
import InfoSectionBase64ToImage from "./info-section";

interface ConvertedImage {
  name: string
  size: number
  type: string
  url: string
  timestamp: number
}

export default function Base64ToImageConverter() {
  const [convertedImages, setConvertedImages] = useState<ConvertedImage[]>([])
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>("input")
  const [sortOrder, setSortOrder] = useState<"name" | "size" | "type" | "date">("date")
  const [base64Input, setBase64Input] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64String = e.target?.result as string
        setBase64Input(base64String.split(',')[1])
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64String = e.target?.result as string
        setBase64Input(base64String.split(',')[1])
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleBase64Input = useCallback((value: string) => {
    setBase64Input(value)
    setError(null)
  }, [])

  const convertBase64ToImage = useCallback(async () => {
    if (!base64Input) {
      setError("Please enter a Base64 string or upload an image.")
      toast.error("Please enter a Base64 string or upload an image.")
      return
    }

    setIsLoading(true)
    try {
      const base64Data = base64Input.replace(/^data:image\/\w+;base64,/, "")
      const imageUrl = `data:image/png;base64,${base64Data}`

      const img = new Image()
      img.onload = () => {
        const newImage: ConvertedImage = {
          name: `image_${Date.now()}.png`,
          size: Math.round((base64Data.length * 3) / 4),
          type: "image/png",
          url: imageUrl,
          timestamp: Date.now()
        }
        setConvertedImages(prev => [...prev, newImage])
        setBase64Input("")
        setActiveTab("converted")
        toast.success("Image converted successfully!")
      }
      img.onerror = () => {
        setError("Invalid Base64 string. Please check your input.")
        toast.error("Invalid Base64 string. Please check your input.")
      }
      img.src = imageUrl
    } catch (error) {
      console.error("Conversion error:", error)
      setError("Error converting Base64 to image. Please try again.")
      toast.error("Error converting Base64 to image. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }, [base64Input])

  const copyToClipboard = useCallback((base64: string) => {
    navigator.clipboard.writeText(base64).then(() => {
      toast.success("Image URL copied to clipboard!")
    })
  }, [])

  const downloadImage = useCallback((url: string, fileName: string) => {
    const link = document.createElement("a")
    link.href = url
    link.download = fileName
    link.click()
    toast.success(`Image ${fileName} downloaded!`)
  }, [])

  const removeImage = useCallback((index: number) => {
    setConvertedImages(prev => prev.filter((_, i) => i !== index))
    toast.success("Image removed from the list.")
  }, [])

  const clearAll = useCallback(() => {
    setConvertedImages([])
    setError(null)
    setBase64Input("")
    toast.success("All images cleared.")
  }, [])

  const sortedImages = [...convertedImages].sort((a, b) => {
    switch (sortOrder) {
      case "date":
        return b.timestamp - a.timestamp
      case "name":
        return a.name.localeCompare(b.name)
      case "size":
        return b.size - a.size
      case "type":
        return a.type.localeCompare(b.type)
      default:
        return 0
    }
  })

  return (
    <ToolLayout
      title="Base64 to Image Converter"
      description="Effortlessly convert Base64 encoded strings back to images for easy viewing and downloading"
      toolId="base64-to-image-converter"
    >
      <Card className="bg-default-50 dark:bg-default-100">
        <CardBody className="p-6">
          <Tabs 
            selectedKey={activeTab} 
            onSelectionChange={(key) => setActiveTab(key as string)}
            variant="bordered"
            aria-label="Converter tabs"
            className="w-full max-w-full overflow-hidden"
          >
            <Tab
              key="input"
              title={
                <div className="flex items-center space-x-2">
                  <Upload size={16} />
                  <span>Input Base64</span>
                </div>
              }
            >
              <Card className="mt-4">
                <CardBody>
                  <div
                    className={`relative  rounded-lg p-6 transition-all ${
                      isDragging 
                        ? "border-primary bg-primary-50/20" 
                        : "border-default-200"
                    }`}
                    onDragOver={(e) => {
                      e.preventDefault()
                      setIsDragging(true)
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                  >
                    <Textarea
                      placeholder="Paste your Base64 encoded string here..."
                      value={base64Input}
                      onChange={(e) => handleBase64Input(e.target.value)}
                      minRows={5}
                      className="w-full mb-4"
                      variant="bordered"
                    />
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            color="primary"
                            onPress={convertBase64ToImage}
                            isLoading={isLoading}
                            startContent={!isLoading && <ImagePlus size={18} />}
                            className="w-full sm:w-auto"
                        >
                            Convert to Image
                        </Button>

                        <Button
                            color="primary"
                            onPress={() => fileInputRef.current?.click()}
                            startContent={<UploadIcon size={18} />}
                            className="w-full sm:w-auto"
                        >
                            Upload Image
                        </Button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept="image/*"
                            className="hidden"
                        />
                        </div>


                    {isDragging && (
                      <div className="absolute inset-0 bg-primary/10 rounded-lg flex items-center justify-center">
                        <div className="text-primary font-medium">Drop image here</div>
                      </div>
                    )}
                  </div>

                  {error && (
                    <div className="mt-4 p-4 bg-danger-50 text-danger rounded-lg flex items-center gap-2">
                      <AlertCircle size={18} />
                      {error}
                    </div>
                  )}
                </CardBody>
              </Card>
            </Tab>

            <Tab
                key="converted"
                title={
                    <div className="flex items-center space-x-2">
                    <ImageIcon size={16} />
                    <span>Converted Images</span>
                    {convertedImages.length > 0 && (
                        <Chip size="sm" variant="flat">{convertedImages.length}</Chip>
                    )}
                    </div>
                }
                >
                {convertedImages.length > 0 ? (
                    <Card className="mt-4">
                    <CardHeader className="flex flex-col sm:flex-row gap-4 px-4 sm:px-6">
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Dropdown>
                            <DropdownTrigger>
                            <Button 
                                variant="bordered" 
                                startContent={<SlidersHorizontal size={18} />}
                                className="w-full sm:w-auto"
                            >
                                Sort By
                            </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                            aria-label="Sort options"
                            onAction={(key) => setSortOrder(key as "name" | "size" | "type" | "date")}
                            selectedKeys={new Set([sortOrder])}
                            selectionMode="single"
                            >
                            <DropdownItem key="date" className="text-default-700">Date Added</DropdownItem>
                            <DropdownItem key="name" className="text-default-700">Name</DropdownItem>
                            <DropdownItem key="size" className="text-default-700">Size</DropdownItem>
                            <DropdownItem key="type" className="text-default-700">Type</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

                        <ButtonGroup className="w-full sm:w-auto">
                            <Button
                            isIconOnly
                            variant={viewMode === "grid" ? "solid" : "bordered"}
                            onPress={() => setViewMode("grid")}
                            className="flex-1 sm:flex-none"
                            >
                            <Grid size={18} />
                            </Button>
                            <Button
                            isIconOnly
                            variant={viewMode === "list" ? "solid" : "bordered"}
                            onPress={() => setViewMode("list")}
                            className="flex-1 sm:flex-none"
                            >
                            <List size={18} />
                            </Button>
                        </ButtonGroup>
                        </div>

                        <Button
                        color="danger"
                        variant="flat"
                        startContent={<Trash2 size={18} />}
                        onPress={clearAll}
                        className="w-full sm:w-auto"
                        >
                        Clear All
                        </Button>
                    </CardHeader>

                    <Divider />

                    <CardBody className="p-2 sm:p-6">
                        <div className={`grid gap-3 sm:gap-6 ${
                        viewMode === "grid" 
                            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                            : "grid-cols-1"
                        }`}>
                        {sortedImages.map((img, index) => (
                            <Card key={index} className="border-1 border-default-200">
                            <CardBody className="p-0">
                                <div className="relative aspect-video">
                                <NextImage
                                    src={img.url}
                                    alt={img.name}
                                    layout="fill"
                                    objectFit="contain"
                                    className="bg-default-100"
                                />
                                </div>
                                
                                <div className="p-2 sm:p-4">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-2 sm:mb-4">
                                    <h3 className="text-default-900 font-medium text-sm sm:text-base break-all">{img.name}</h3>
                                    <Button
                                    isIconOnly
                                    variant="light"
                                    onPress={() => removeImage(index)}
                                    className="self-end sm:self-auto"
                                    >
                                    <X size={18} />
                                    </Button>
                                </div>

                                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-default-600 mb-2 sm:mb-4">
                                    <span className="flex items-center gap-1">
                                    <ImageIcon size={16} />
                                    {(img.size / 1024).toFixed(2)} KB
                                    </span>
                                    <span className="flex items-center gap-1">
                                    <FileText size={16} />
                                    {img.type}
                                    </span>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-2">
                                    <Button
                                    className="w-full sm:flex-1"
                                    size="md"
                                    variant="bordered"
                                    onPress={() => copyToClipboard(img.url)}
                                    startContent={<Copy size={16} />}
                                    >
                                    Copy URL
                                    </Button>
                                    <Button
                                    className="w-full sm:flex-1"
                                    size="md"
                                    color="primary"
                                    onPress={() => downloadImage(img.url, img.name)}
                                    startContent={<Download size={16} />}
                                    >
                                    Download
                                    </Button>
                                </div>
                                </div>
                            </CardBody>
                            </Card>
                        ))}
                        </div>
                    </CardBody>
                    </Card>
                ) : (
                    <Card className="mt-4">
                    <CardBody className="py-6 sm:py-8">
                        <div className="text-center text-default-600">
                        <ImageIcon className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-4 opacity-50" />
                        <p className="text-sm sm:text-base">No converted images yet</p>
                        </div>
                    </CardBody>
                    </Card>
                )}
            </Tab>
          </Tabs>
        </CardBody>
      </Card>

      <InfoSectionBase64ToImage />
    </ToolLayout>
  )
}

