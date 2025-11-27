"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import {
  Upload,
  X,
  Copy,
  Download,
  ImageIcon,
  AlertCircle,
  Info,
  FileText,
  Trash2,
  Lock,
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
} from "@nextui-org/react"
import NextImage from "next/image"
import InfoSectionBase64Converter from "./info-section";

interface ConvertedImage {
  name: string
  size: number
  type: string
  base64: string
}

export default function ImageToBase64Converter() {
  const [convertedImages, setConvertedImages] = useState<ConvertedImage[]>([])
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>("upload")
  const [sortOrder, setSortOrder] = useState<"name" | "size" | "type">("name")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
      let files: FileList | null = null
      if ("target" in event) {
        files = (event as React.ChangeEvent<HTMLInputElement>).target.files
      } else if ("dataTransfer" in event) {
        files = (event as React.DragEvent<HTMLDivElement>).dataTransfer.files
      }

      if (!files) return

      setError(null)

      const maxSizeInBytes = 10 * 1024 * 1024 // 10MB

      const validFiles = Array.from(files).filter((file) => {
        if (file.size > maxSizeInBytes) {
          setError(`File "${file.name}" exceeds the 10MB size limit.`)
          toast.error(`File "${file.name}" exceeds the 10MB size limit.`)
          return false
        }
        return true
      })

      validFiles.forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const base64 = e.target?.result as string
          setConvertedImages((prev) => [
            ...prev,
            {
              name: file.name,
              size: file.size,
              type: file.type,
              base64: base64,
            },
          ])
          toast.success(`${file.name} converted successfully!`)
        }
        reader.readAsDataURL(file)
      })

      setActiveTab("converted")
    },
    [],
  )

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault()
      const files = e.dataTransfer.files
      if (!files) return

      setError(null)

      const maxSizeInBytes = 10 * 1024 * 1024 // 10MB

      const validFiles = Array.from(files).filter((file) => {
        if (file.size > maxSizeInBytes) {
          setError(`File "${file.name}" exceeds the 10MB size limit.`)
          toast.error(`File "${file.name}" exceeds the 10MB size limit.`)
          return false
        }
        return true
      })

      validFiles.forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const base64 = e.target?.result as string
          setConvertedImages((prev) => [
            ...prev,
            {
              name: file.name,
              size: file.size,
              type: file.type,
              base64: base64,
            },
          ])
          toast.success(`${file.name} converted successfully!`)
        }
        reader.readAsDataURL(file)
      })

      setActiveTab("converted")
    },
    [],
  )

  const copyToClipboard = useCallback((base64: string) => {
    navigator.clipboard.writeText(base64).then(() => {
      toast.success("Base64 string copied to clipboard!")
    })
  }, [])

  const downloadBase64 = useCallback((base64: string, fileName: string) => {
    const link = document.createElement("a")
    link.href = base64
    link.download = `${fileName.split(".")[0]}_base64.txt`
    link.click()
    toast.success(`Base64 string for ${fileName} downloaded!`)
  }, [])

  const removeImage = useCallback((index: number) => {
    setConvertedImages((prev) => prev.filter((_, i) => i !== index))
    toast.success("Image removed from the list.")
  }, [])

  const clearAll = useCallback(() => {
    setConvertedImages([])
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    toast.success("All images cleared.")
  }, [])

  const sortedImages = [...convertedImages].sort((a, b) => {
    switch (sortOrder) {
      case "name":
        return a.name.localeCompare(b.name)
      case "size":
        return a.size - b.size
      case "type":
        return a.type.localeCompare(b.type)
      default:
        return 0
    }
  })

  const downloadAllBase64 = useCallback(async () => {
    try {
      const JSZip = (await import("jszip")).default
      const zip = new JSZip()

      convertedImages.forEach((img) => {
        zip.file(`${img.name.split(".")[0]}_base64.txt`, img.base64)
      })

      const content = await zip.generateAsync({ type: "blob" })
      const link = document.createElement("a")
      link.href = URL.createObjectURL(content)
      link.download = "base64_images.zip"
      link.click()
      toast.success("All Base64 strings downloaded as ZIP!")
    } catch (error) {
      console.error("Error creating zip file:", error)
      toast.error("Failed to create ZIP file. Please try again.")
    }
  }, [convertedImages])

  return (
    <ToolLayout
      title="Image to Base64 Converter"
      description="Effortlessly convert your images to Base64 encoded strings for easy embedding in HTML, CSS, or JavaScript"
      toolId="678f382b26f06f912191bc96"
    >
      <div className="flex flex-col gap-6">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <Tabs selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(key as string)}>
              <Tab key="upload" title="Upload">
                <Card className="bg-default-50 dark:bg-default-100">
                  <CardBody className="p-6">
                    <div className="flex items-center mb-2">
                                    <Lock className="w-4 h-4 inline-block mr-1 text-primary" />
                                    <strong className="text-primary text-sm">Secure Conversion:</strong>
                                    <span className="text-primary text-sm ml-1">All processing is done locally</span>
                                  </div>
                    <label
                      className="flex flex-col items-center justify-center h-64 px-4 py-6 bg-default-100 text-primary rounded-lg shadow-lg tracking-wide uppercase border-2 border-primary border-dashed cursor-pointer hover:bg-primary-100 hover:text-primary-600 transition duration-300"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <Upload size={48} />
                      <span className="mt-2 text-sm sm:text-base md:text-md leading-normal text-center block">
                        Select files or drag and drop
                      </span>
                      <span className="mt-1 text-xs text-gray-500">Supports JPG, PNG, WebP, GIF, SVG</span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept="image/*"
                        multiple
                      />
                    </label>
                    {error && (
                      <div className="mt-4 p-4 bg-danger-100 text-danger-600 rounded-lg flex items-center">
                        <AlertCircle className="mr-2" />
                        {error}
                      </div>
                    )}
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="converted" title="Converted Images">
                {convertedImages.length > 0 ? (
                  <Card className="bg-default-50 dark:bg-default-200">
                    <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <h2 className="text-xl font-bold">Converted Images</h2>
                      <div className="flex flex-wrap gap-2">
                        <Dropdown>
                          <DropdownTrigger>
                            <Button size="sm" variant="flat">Sort By</Button>
                          </DropdownTrigger>
                          <DropdownMenu
                            aria-label="Sort options"
                            onAction={(key) => setSortOrder(key as "name" | "size" | "type")}
                          >
                            <DropdownItem key="name">Name</DropdownItem>
                            <DropdownItem key="size">Size</DropdownItem>
                            <DropdownItem key="type">Type</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                        <Button size="sm" color="success" onClick={downloadAllBase64}>
                          <Download size={14} className="mr-2" />
                          Download All
                        </Button>
                        <Button size="sm" color="danger" onClick={clearAll}>
                          <Trash2 size={14} className="mr-2" />
                          Clear All
                        </Button>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sortedImages.map((img, index) => (
                          <Card className="bg-default-50 dark:bg-default-100" key={index}>
                            <CardBody>
                              <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-semibold truncate" title={img.name}>
                                  {img.name.length > 20 ? `${img.name.substring(0, 20)}...` : img.name}
                                </h3>
                                <Button isIconOnly size="sm" color="danger" variant="light" onClick={() => removeImage(index)}>
                                  <X size={20} />
                                </Button>
                              </div>
                              <div className="flex flex-wrap items-center mb-2 gap-2">
                                <div className="flex items-center">
                                  <ImageIcon className="w-4 h-4 mr-1" />
                                  <span className="text-xs">{(img.size / 1024).toFixed(2)} KB</span>
                                </div>
                                <div className="flex items-center">
                                  <FileText className="w-4 h-4 mr-1" />
                                  <span className="text-xs">{img.type.split('/')[1]?.toUpperCase() || img.type}</span>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <Button size="sm" color="primary" onClick={() => copyToClipboard(img.base64)}>
                                  <Copy size={12} className="mr-1" />
                                  Copy Base64
                                </Button>
                                <Button size="sm" color="secondary" onClick={() => downloadBase64(img.base64, img.name)}>
                                  <Download size={12} className="mr-1" />
                                  Download
                                </Button>
                              </div>
                              <div className="relative h-32 bg-default-100 rounded-lg overflow-hidden">
                                <NextImage src={img.base64} alt={img.name} layout="fill" objectFit="contain" />
                              </div>
                              <div className="mt-2">
                                <h4 className="text-xs font-semibold mb-1">Base64 Preview:</h4>
                                <p className="text-xs break-all overflow-hidden" style={{ maxHeight: "2.5rem" }}>
                                  {img.base64.substring(0, 80)}...
                                </p>
                              </div>
                            </CardBody>
                          </Card>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <Info size={48} className="text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Images Converted Yet</h3>
                    <p className="text-sm text-gray-500 mb-4">Upload some images to see them converted to Base64 format</p>
                    <Button color="primary" onClick={() => setActiveTab("upload")}>
                      Go to Upload
                    </Button>
                  </div>
                )}
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
    </div> 
    <InfoSectionBase64Converter /> 
    </ToolLayout> 
  )
}

