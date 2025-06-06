"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  Upload,
  X,
  Download,
  RefreshCw,
  Sliders,
  Eye,
  EyeOff,
  Save,
  Star,
  Maximize2,
  Minimize2,
} from "lucide-react"
import {
  Card,
  CardBody,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Slider,
  Tabs,
  Tab,
  Tooltip,
  Badge,
  Switch,
  Chip,
  Divider,
  CardFooter,
  Modal,
  ModalContent,
} from "@nextui-org/react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import { type Filter, filterCategories, AllFilters } from "./filters"
import InfoSectionImageFilters from "./info-section"
import { toggleFavorite, initializeFavorites, isFavorite } from "./utils"

export default function ImageFilters() {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [originalImageSrc, setOriginalImageSrc] = useState<string | null>(null)
  const [selectedFilter, setSelectedFilter] = useState<Filter | null>(null)
  const [intensity, setIntensity] = useState(100)
  const [showOriginal, setShowOriginal] = useState(true)
  const [filterHistory, setFilterHistory] = useState<{ filter: Filter | null; intensity: number }[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [activeCategory, setActiveCategory] = useState("basic")
  const [favorites, setFavorites] = useState<string[]>([])
  const [imageSize, setImageSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
  const [multiFilterMode, setMultiFilterMode] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState<{ filter: Filter; intensity: number }[]>([])
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [cssCode, setCssCode] = useState<string>("")

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Initialize favorites when component mounts
  useEffect(() => {
    const initialFavorites = initializeFavorites()
    setFavorites(initialFavorites)
  }, [])

  const handleFileUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const imgSrc = e.target?.result as string
      setImageSrc(imgSrc)
      setOriginalImageSrc(imgSrc)
      setSelectedFilter(null)
      setIntensity(100)
      setShowOriginal(true)
      setFilterHistory([])
      setHistoryIndex(-1)
      setAppliedFilters([])

      // Get image dimensions
      const img = new Image()
      img.onload = () => {
        setImageSize({
          width: img.naturalWidth,
          height: img.naturalHeight,
        })
      }
      img.src = imgSrc
    }
    reader.readAsDataURL(file)
    toast.success("Image uploaded successfully!")
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const applyFilter = () => {
    if (!imageSrc || !canvasRef.current || !imageRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Make sure the image is loaded
    if (!imageRef.current.complete) {
      imageRef.current.onload = applyFilter
      return
    }

    canvas.width = imageRef.current.naturalWidth
    canvas.height = imageRef.current.naturalHeight

    // Apply either the current filter or multiple filters
    if (multiFilterMode) {
      // First draw the original image
      ctx.filter = "none"
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height)

      // Apply each filter using a temporary canvas
      if (appliedFilters.length > 0) {
        const tempCanvas = document.createElement("canvas")
        tempCanvas.width = canvas.width
        tempCanvas.height = canvas.height
        const tempCtx = tempCanvas.getContext("2d")
        if (!tempCtx) return

        // Copy the original image to the temp canvas
        tempCtx.drawImage(canvas, 0, 0)

        // Apply each filter
        let filterString = ""
        appliedFilters.forEach(({ filter, intensity }) => {
          filterString += " " + getFilterStringForFilter(filter, intensity)
        })

        // Store the CSS filter string for the modal
        setCssCode(`filter: ${filterString.trim()}`)

        // Draw the filtered image back to the main canvas
        ctx.filter = filterString.trim()
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(tempCanvas, 0, 0)
      }
    } else {
      // Apply single filter
      const filterString = getFilterString()
      setCssCode(`filter: ${filterString}`)
      ctx.filter = filterString
      ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height)
    }
  }

  useEffect(() => {
    if (imageSrc && imageRef.current) {
      imageRef.current.onload = applyFilter
    }
  }, [imageSrc])

  useEffect(() => {
    if (imageSrc && selectedFilter && canvasRef.current && imageRef.current) {
      applyFilter()
    }
  }, [selectedFilter, intensity, imageSrc, appliedFilters, multiFilterMode])

  const getFilterStringForFilter = (filter: Filter, intensityValue: number) => {
    const intensityWithUnit = `${intensityValue}${filter.unit || ""}`

    switch (filter.name) {
      case "Drop Shadow":
        return `drop-shadow(0 0 ${intensityWithUnit} rgba(0,0,0,0.5))`
      case "Vintage":
        return `sepia(${intensityValue}%) saturate(150%) hue-rotate(-15deg)`
      case "Cold":
        return `saturate(${intensityValue}%) hue-rotate(180deg)`
      case "Warm":
        return `sepia(${intensityValue * 0.5}%) saturate(${100 + intensityValue * 0.5}%) hue-rotate(${intensityValue * 0.1}deg)`
      case "Sunset":
        return `contrast(${100 + intensityValue * 0.3}%) sepia(${intensityValue * 0.4}%) saturate(${100 + intensityValue * 0.5}%) hue-rotate(${-5 - intensityValue * 0.1}deg)`
      case "Film":
        return `contrast(${100 + intensityValue * 0.1}%) sepia(${intensityValue * 0.3}%) saturate(${80 + intensityValue * 0.2}%)`
      case "Duotone":
        return `grayscale(100%) sepia(${intensityValue}%) hue-rotate(${180 * (intensityValue / 100)}deg)`
      case "Dramatic":
        return `contrast(${100 + intensityValue}%) brightness(${90 - intensityValue * 0.2}%) saturate(${100 + intensityValue * 0.5}%)`
      case "Noir":
        return `grayscale(100%) contrast(${100 + intensityValue * 0.5}%) brightness(${80 - intensityValue * 0.3}%)`
      case "Polaroid":
        return `sepia(${intensityValue * 0.2}%) saturate(${80 + intensityValue * 0.2}%) brightness(${105 + intensityValue * 0.1}%) contrast(${90 + intensityValue * 0.1}%)`
      case "Vignette":
        // CSS filters can't create vignettes, but we're including this as a placeholder
        return `brightness(${100 - intensityValue * 0.1}%)`
      case "Retrowave":
        return `saturate(${120 + intensityValue * 0.8}%) hue-rotate(${-30 + intensityValue * 0.3}deg) contrast(${110 + intensityValue * 0.2}%)`
      case "Pop Art":
        return `saturate(${200 + intensityValue * 2}%) contrast(${120 + intensityValue * 0.8}%) brightness(${110 + intensityValue * 0.2}%)`
      default:
        return `${filter.cssFilter}(${intensityWithUnit})`
    }
  }

  const getFilterString = () => {
    if (!selectedFilter) return "none"
    return getFilterStringForFilter(selectedFilter, intensity)
  }

  const downloadFilteredImage = (format: string) => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    let imageDataUrl: string

    switch (format) {
      case "image/jpeg":
        imageDataUrl = canvas.toDataURL("image/jpeg", 1.0)
        break
      case "image/webp":
        imageDataUrl = canvas.toDataURL("image/webp", 1.0)
        break
      default:
        imageDataUrl = canvas.toDataURL("image/png")
    }

    const link = document.createElement("a")
    link.download = `filtered-image.${format.split("/")[1]}`
    link.href = imageDataUrl
    link.click()
    toast.success(`Image downloaded successfully as ${format.split("/")[1].toUpperCase()}!`)
  }

  const resetImage = () => {
    setImageSrc(null)
    setOriginalImageSrc(null)
    setSelectedFilter(null)
    setIntensity(100)
    setShowOriginal(true)
    setFilterHistory([])
    setHistoryIndex(-1)
    setAppliedFilters([])
  }

  const toggleOriginal = () => {
    setShowOriginal(!showOriginal)
  }

  const applyFilterAndSaveHistory = (filter: Filter) => {
    // Save current state to history
    if (historyIndex < filterHistory.length - 1) {
      // If we're in the middle of the history, truncate it
      setFilterHistory(filterHistory.slice(0, historyIndex + 1))
    }

    const newHistoryEntry = {
      filter: selectedFilter,
      intensity: intensity,
    }

    setFilterHistory([...filterHistory, newHistoryEntry])
    setHistoryIndex(historyIndex + 1)

    // Apply new filter
    setSelectedFilter(filter)
    setIntensity(filter.name === "Blur" || filter.name === "Drop Shadow" ? 5 : filter.defaultIntensity || 100)
    setShowOriginal(false)
  }

  const addCurrentFilterToApplied = () => {
    if (!selectedFilter) return

    const newFilter = {
      filter: selectedFilter,
      intensity: intensity,
    }

    setAppliedFilters([...appliedFilters, newFilter])
    toast.success(`Added ${selectedFilter.name} filter to stack`)
  }

  const removeAppliedFilter = (index: number) => {
    const newFilters = [...appliedFilters]
    newFilters.splice(index, 1)
    setAppliedFilters(newFilters)
  }

  const resetToOriginal = () => {
    setImageSrc(originalImageSrc)
    setSelectedFilter(null)
    setIntensity(100)
    setFilterHistory([])
    setHistoryIndex(-1)
    setAppliedFilters([])
    setShowOriginal(true)
  }

  const getFavoriteFilters = () => {
    return AllFilters.filter((filter) => favorites.includes(filter.name))
  }

  const saveCurrentState = () => {
    if (!canvasRef.current) return

    const currentImageData = canvasRef.current.toDataURL("image/png")
    setImageSrc(currentImageData)
    setSelectedFilter(null)
    setIntensity(100)
    setFilterHistory([])
    setHistoryIndex(-1)
    setAppliedFilters([])

    toast.success("Current filter state saved as new base image")
  }

  // Fullscreen preview modal
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
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={imageSrc || ""}
                  alt="Original Image"
                  className="max-w-full max-h-full object-contain"
                  style={{ display: showOriginal ? "block" : "none" }}
                />
                {!showOriginal && (
                  <div
                    className="max-w-full max-h-full object-contain"
                    style={{
                      backgroundImage: `url(${imageSrc})`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      width: "100%",
                      height: "100%",
                      filter: cssCode ? cssCode.split(": ")[1] || "" : "",
                    }}
                  />
                )}
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                <Dropdown>
                  <DropdownTrigger>
                    <Button color="primary" startContent={<Download size={16} />}>
                      Download
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Download formats">
                    <DropdownItem key="png" onPress={() => downloadFilteredImage("image/png")} className="text-default-700">
                      PNG (High Quality)
                    </DropdownItem>
                    <DropdownItem key="jpeg" onPress={() => downloadFilteredImage("image/jpeg")} className="text-default-700">
                      JPEG (Small Size)
                    </DropdownItem>
                    <DropdownItem key="webp" onPress={() => downloadFilteredImage("image/webp")} className="text-default-700">
                      WebP (Best Balance)
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Button
                  color="default"
                  variant="flat"
                  onPress={toggleOriginal}
                  startContent={showOriginal ? <Eye size={16} /> : <EyeOff size={16} />}
                >
                  {showOriginal ? "Show Filtered" : "Show Original"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  )

  return (
    <ToolLayout
      title="Image Filters"
      description="Transform your photos with our professional image filtering tool. Apply artistic effects, adjust intensities, and create stunning visuals with our expanded filter collection."
      toolId="image-filters"
    >
      <div
        className={`flex flex-col gap-6 ${isFullscreen ? "fixed inset-0 z-50 bg-background p-4 overflow-auto" : ""}`}
      >
        {isFullscreen && (
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Image Filters</h2>
            <Button isIconOnly variant="light" onPress={() => setIsFullscreen(false)}>
              <Minimize2 size={20} />
            </Button>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 mb-2">
          <Card className="bg-default-50 dark:bg-default-100 flex-1">
            <CardBody className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl sm:text-1xl md:text-2xl font-bold text-primary-500">Image Canvas</h2>
                <div className="flex space-x-2">
                  {imageSrc && (
                    <>
                      <Tooltip content="Fullscreen Preview" className="text-default-700">
                        <Button
                          isIconOnly
                          color="primary"
                          variant="flat"
                          size="sm"
                          onClick={() => setIsFullscreen(true)}
                          aria-label="Fullscreen preview"
                        >
                          <Maximize2 size={20} />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Save Current State" className="text-default-700">
                        <Button
                          isIconOnly
                          color="success"
                          variant="flat"
                          size="sm"
                          onClick={saveCurrentState}
                          aria-label="Save current state"
                        >
                          <Save size={20} />
                        </Button>
                      </Tooltip>
                    </>
                  )}
                </div>
              </div>
              {!imageSrc ? (
                <label
                  className="flex flex-col items-center justify-center h-64 px-4 py-6 bg-default-100 text-primary rounded-lg overflow-hidden shadow-lg tracking-wide uppercase border-2 border-primary border-dashed cursor-pointer hover:bg-primary-100 hover:text-primary-600 transition duration-300"
                  onDragOver={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onDrop={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    const file = e.dataTransfer.files[0]
                    if (file && file.type.startsWith("image/")) {
                      handleFileUpload(file)
                    } else {
                      toast.error("Please drop a valid image file.")
                    }
                  }}
                >
                  <Upload size={48} />
                  <span className="mt-2 text-sm sm:text-base md:text-md leading-normal text-center block">
                    Select a file or drag and drop
                  </span>
                  <span className="mt-1 text-xs text-gray-500">Supports JPG, PNG, WebP, GIF</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </label>
              ) : (
                <div className="relative">
                  <div className="relative h-64 md:h-80 bg-default-100 rounded-lg overflow-hidden">
                    <img
                      ref={imageRef}
                      src={imageSrc || "/placeholder.svg"}
                      alt="Image"
                      className="w-full h-full object-contain"
                      style={{ display: showOriginal ? "block" : "none" }}
                    />
                    <canvas
                      ref={canvasRef}
                      className="w-full h-full object-contain"
                      style={{ display: showOriginal ? "none" : "block" }}
                    />
                  </div>
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <Button
                      isIconOnly
                      color="danger"
                      variant="light"
                      aria-label="Reset image"
                      onClick={resetImage}
                      size="sm"
                    >
                      <X size={18} />
                    </Button>
                  </div>

                  {imageSize.width > 0 && (
                    <div className="absolute bottom-2 left-2 bg-black/40 text-white text-xs px-2 py-1 rounded">
                      {imageSize.width} × {imageSize.height}
                    </div>
                  )}

                  <div className="absolute bottom-2 right-2">
                    <Button
                      size="sm"
                      color="primary"
                      variant="flat"
                      onPress={toggleOriginal}
                      startContent={showOriginal ? <Eye size={16} /> : <EyeOff size={16} />}
                    >
                      {showOriginal ? "Show Filtered" : "Show Original"}
                    </Button>
                  </div>
                </div>
              )}

              {imageSrc && (
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  <Button
                    size="sm"
                    color="primary"
                    variant="flat"
                    onClick={() => fileInputRef.current?.click()}
                    startContent={<Upload size={16} />}
                  >
                    New Image
                  </Button>

                  <Button
                    size="sm"
                    color="danger"
                    variant="flat"
                    onClick={resetToOriginal}
                    startContent={<RefreshCw size={16} />}
                  >
                    Reset
                  </Button>

                  <Dropdown>
                    <DropdownTrigger>
                      <Button size="sm" color="primary" startContent={<Download size={16} />}>
                        Export
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Download formats">
                      <DropdownItem key="png" onPress={() => downloadFilteredImage("image/png")} className="text-default-700">
                        PNG (High Quality)
                      </DropdownItem>
                      <DropdownItem key="jpeg" onPress={() => downloadFilteredImage("image/jpeg")} className="text-default-700">
                        JPEG (Small Size)
                      </DropdownItem>
                      <DropdownItem key="webp" onPress={() => downloadFilteredImage("image/webp")} className="text-default-700">
                        WebP (Best Balance)
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              )}
            </CardBody>
          </Card>

          {imageSrc && (
            <Card className="bg-default-50 dark:bg-default-100 flex-1 md:max-w-md">
              <CardBody className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-default-700">Filter Settings</h3>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Switch size="sm" isSelected={multiFilterMode} onValueChange={setMultiFilterMode} />
                  <span className="text-sm">
                    Multiple Filters Mode{" "}
                    {multiFilterMode && (
                      <Badge color="primary" variant="flat">
                        On
                      </Badge>
                    )}
                  </span>
                </div>

                {multiFilterMode && (
                  <div className="mb-4">
                    <div className="text-sm font-medium text-default-700 mb-2">Applied Filters:</div>
                    {appliedFilters.length === 0 ? (
                      <div className="text-xs text-gray-500 mb-2">
                        No filters applied yet. Select a filter below and click "Add to Stack".
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {appliedFilters.map((item, index) => (
                          <Chip
                            key={`${item.filter.name}-${index}`}
                            onClose={() => removeAppliedFilter(index)}
                            variant="flat"
                            color="primary"
                            size="sm"
                          >
                            {item.filter.name} ({item.intensity}%)
                          </Chip>
                        ))}
                      </div>
                    )}
                    {selectedFilter && (
                      <Button size="sm" color="secondary" onClick={addCurrentFilterToApplied} className="w-full">
                        Add {selectedFilter.name} to Filter Stack
                      </Button>
                    )}
                    <Divider className="my-2" />
                  </div>
                )}

                <Tabs
                  selectedKey={activeCategory}
                  onSelectionChange={(key) => setActiveCategory(key as string)}
                  classNames={{
                    base: "w-full",
                    tabList: "gap-2 w-full relative rounded-lg p-0 overflow-x-auto",
                    cursor: "w-full bg-primary",
                    tab: "max-w-fit px-2 h-8 text-xs",
                    tabContent: "group-data-[selected=true]:text-white",
                  }}
                >
                  <Tab key="favorites" title="Favorites" isDisabled={getFavoriteFilters().length === 0}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                      {getFavoriteFilters().map((filter) => (
                        <Button
                          key={filter.name}
                          size="sm"
                          color={selectedFilter?.name === filter.name ? "primary" : "default"}
                          variant={selectedFilter?.name === filter.name ? "solid" : "bordered"}
                          onPress={() => {
                            applyFilterAndSaveHistory(filter)
                            setShowOriginal(false)
                          }}
                          className="min-w-0 h-auto py-1"
                        >
                          <div className="flex flex-col items-center">
                            <span className="text-xs truncate w-full text-center">{filter.name}</span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </Tab>

                  {Object.keys(filterCategories).map((category) => (
                    <Tab key={category} title={category.charAt(0).toUpperCase() + category.slice(1)}>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                        {filterCategories[category].map((filter) => (
                          <Button
                            key={filter.name}
                            size="sm"
                            color={selectedFilter?.name === filter.name ? "primary" : "default"}
                            variant={selectedFilter?.name === filter.name ? "solid" : "bordered"}
                            onPress={() => {
                              applyFilterAndSaveHistory(filter)
                              setShowOriginal(false)
                            }}
                            className="min-w-0 h-auto py-1 relative"
                          >
                            <div className="flex flex-col items-center">
                              <span className="text-xs truncate w-full text-center">{filter.name}</span>
                            </div>
                            <div
                              className="absolute top-0 right-0 p-1 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleFavorite(filter.name, favorites, setFavorites)
                              }}
                            >
                              <Star
                                size={12}
                                className={
                                  isFavorite(filter.name, favorites) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
                                }
                              />
                            </div>
                          </Button>
                        ))}
                      </div>
                    </Tab>
                  ))}
                </Tabs>

                {selectedFilter && (
                  <div className="mt-4">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-default-700">Intensity</p>
                      <span className="min-w-[2.5rem] text-right text-default-700 whitespace-nowrap text-sm">
                        {intensity}
                        {selectedFilter.unit}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Sliders size={16} className="text-default-700" />
                      <Slider
                        aria-label="Filter intensity"
                        size="sm"
                        step={1}
                        maxValue={selectedFilter.intensity}
                        minValue={0}
                        value={intensity}
                        onChange={(value) => {
                          setIntensity(value as number)
                          setShowOriginal(false)
                        }}
                        className="flex-grow"
                        color="primary"
                      />
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        color="danger"
                        variant="flat"
                        className="flex-1"
                        onPress={() => {
                          setSelectedFilter(null)
                          applyFilter()
                          setShowOriginal(true)
                        }}
                        startContent={<RefreshCw size={16} />}
                      >
                        Reset Filter
                      </Button>

                      <Tooltip content="Add to Favorites">
                        <Button
                          isIconOnly
                          size="sm"
                          color={isFavorite(selectedFilter.name, favorites) ? "warning" : "default"}
                          variant="flat"
                          onPress={() => toggleFavorite(selectedFilter.name, favorites, setFavorites)}
                        >
                          <Star
                            size={16}
                            className={isFavorite(selectedFilter.name, favorites) ? "fill-yellow-400" : ""}
                          />
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                )}
              </CardBody>

              <CardFooter className="pt-0">
                {selectedFilter && (
                  <div className="w-full text-xs text-gray-500">
                    {selectedFilter.description ||
                      `Adjust the ${selectedFilter.name.toLowerCase()} effect to transform your image.`}
                  </div>
                )}
              </CardFooter>
            </Card>
          )}
        </div>

        {/* Info Section */}
        <InfoSectionImageFilters />

        {/* Fullscreen Preview Modal */}
        {renderFullscreenPreview()}
      </div>
    </ToolLayout>
  )
}