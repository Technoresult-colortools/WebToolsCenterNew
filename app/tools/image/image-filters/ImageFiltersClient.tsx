"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Upload, X, Download, RefreshCw, Sliders, Eye, EyeOff, Info, BookOpen, Lightbulb, Save, Undo, Redo, Layers, Star } from "lucide-react"
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
  CardFooter
} from "@nextui-org/react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import NextImage from "next/image"
import { type Filter, filterCategories, AllFilters } from "./filters"

export default function EnhancedImageFilters() {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [originalImageSrc, setOriginalImageSrc] = useState<string | null>(null)
  const [selectedFilter, setSelectedFilter] = useState<Filter | null>(null)
  const [intensity, setIntensity] = useState(100)
  const [showOriginal, setShowOriginal] = useState(true)
  const [filterHistory, setFilterHistory] = useState<{filter: Filter | null, intensity: number}[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [activeCategory, setActiveCategory] = useState("basic")
  const [favorites, setFavorites] = useState<string[]>([])
  const [imageSize, setImageSize] = useState<{width: number, height: number}>({width: 0, height: 0})
  const [compareMode, setCompareMode] = useState(false)
  const [multiFilterMode, setMultiFilterMode] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState<{filter: Filter, intensity: number}[]>([])
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const compareCanvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
          height: img.naturalHeight
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
        const tempCanvas = document.createElement('canvas')
        tempCanvas.width = canvas.width
        tempCanvas.height = canvas.height
        const tempCtx = tempCanvas.getContext('2d')
        if (!tempCtx) return
        
        // Copy the original image to the temp canvas
        tempCtx.drawImage(canvas, 0, 0)
        
        // Apply each filter
        let filterString = ""
        appliedFilters.forEach(({ filter, intensity }) => {
          filterString += " " + getFilterStringForFilter(filter, intensity)
        })
        
        // Draw the filtered image back to the main canvas
        ctx.filter = filterString.trim()
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(tempCanvas, 0, 0)
      }
    } else {
      // Apply single filter
      ctx.filter = getFilterString()
      ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height)
    }
    
    // Update compare view if active
    if (compareMode && compareCanvasRef.current) {
      updateCompareView()
    }
  }
  
  const updateCompareView = () => {
    if (!compareCanvasRef.current || !imageRef.current) return
    
    const compareCanvas = compareCanvasRef.current
    const ctx = compareCanvas.getContext("2d")
    if (!ctx) return
    
    compareCanvas.width = imageRef.current.naturalWidth
    compareCanvas.height = imageRef.current.naturalHeight
    
    // Draw original image on left half
    ctx.filter = "none"
    ctx.drawImage(
      imageRef.current,
      0, 0, imageRef.current.naturalWidth, imageRef.current.naturalHeight,  // Source coordinates (full image)
      0, 0, compareCanvas.width / 2, compareCanvas.height  // Destination coordinates (left half)
    )
    
    // Draw filtered image on right half
    ctx.filter = multiFilterMode 
      ? appliedFilters.map(({filter, intensity}) => getFilterStringForFilter(filter, intensity)).join(" ") 
      : getFilterString()
    ctx.drawImage(
      imageRef.current,
      0, 0, imageRef.current.naturalWidth, imageRef.current.naturalHeight,  // Source coordinates (full image)
      compareCanvas.width / 2, 0, compareCanvas.width / 2, compareCanvas.height  // Destination coordinates (right half)
    )
    
    // Draw divider line
    ctx.filter = "none"
    ctx.beginPath()
    ctx.moveTo(compareCanvas.width / 2, 0)
    ctx.lineTo(compareCanvas.width / 2, compareCanvas.height)
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 2
    ctx.stroke()
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
  
  useEffect(() => {
    if (compareMode) {
      updateCompareView()
    }
  }, [compareMode, selectedFilter, intensity, appliedFilters])

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
      intensity: intensity
    }
    
    setFilterHistory([...filterHistory, newHistoryEntry])
    setHistoryIndex(historyIndex + 1)
    
    // Apply new filter
    setSelectedFilter(filter)
    setIntensity(
      filter.name === "Blur" || filter.name === "Drop Shadow" 
        ? 5 
        : filter.defaultIntensity || 100
    )
    setShowOriginal(false)
  }
  
  const addCurrentFilterToApplied = () => {
    if (!selectedFilter) return
    
    const newFilter = {
      filter: selectedFilter,
      intensity: intensity
    }
    
    setAppliedFilters([...appliedFilters, newFilter])
    toast.success(`Added ${selectedFilter.name} filter to stack`)
  }
  
  const removeAppliedFilter = (index: number) => {
    const newFilters = [...appliedFilters]
    newFilters.splice(index, 1)
    setAppliedFilters(newFilters)
  }
  
  const undoFilter = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      const prevState = filterHistory[historyIndex - 1]
      setSelectedFilter(prevState.filter)
      setIntensity(prevState.intensity)
    } else if (historyIndex === 0) {
      // Return to original state
      setSelectedFilter(null)
      setIntensity(100)
      setHistoryIndex(-1)
    }
  }
  
  const redoFilter = () => {
    if (historyIndex < filterHistory.length - 1) {
      const nextState = filterHistory[historyIndex + 1]
      setSelectedFilter(nextState.filter)
      setIntensity(nextState.intensity)
      setHistoryIndex(historyIndex + 1)
    }
  }
  
  const toggleFavorite = (filterName: string) => {
    if (favorites.includes(filterName)) {
      setFavorites(favorites.filter(name => name !== filterName))
    } else {
      setFavorites([...favorites, filterName])
    }
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
    return AllFilters.filter(filter => favorites.includes(filter.name))
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

  return (
    <ToolLayout
      title="Image Filters"
      description="Transform your photos with our professional image filtering tool. Apply artistic effects, adjust intensities, and create stunning visuals with our expanded filter collection."
      toolId="678f382a26f06f912191bc8c"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4 mb-2">
          <Card className="bg-default-50 dark:bg-default-100 flex-1">
            <CardBody className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl sm:text-1xl md:text-2xl font-bold text-default-700">Image Canvas</h2>
                <div className="flex space-x-2">
                  {imageSrc && (
                    <>
                      <Tooltip content="Compare Original vs. Filtered" className="text-default-700">
                        <Button
                          isIconOnly
                          color="secondary"
                          variant="flat"
                          size="sm"
                          onClick={() => setCompareMode(!compareMode)}
                          aria-label="Split view comparison"
                        >
                          <Layers size={20} />
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
                  className="flex flex-col items-center justify-center h-64 px-4 py-6 bg-default-100 text-primary rounded-lg shadow-lg tracking-wide uppercase border-2 border-primary border-dashed cursor-pointer hover:bg-primary-100 hover:text-primary-600 transition duration-300"
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
                  <span className="mt-2 text-sm sm:text-base md:text-md leading-normal text-center block">Select a file or drag and drop</span>
                  <span className="mt-1 text-xs text-gray-500">Supports JPG, PNG, WebP, GIF</span>
                  <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                </label>
              ) : (
                <div className="relative">
                  <div className="relative h-64 md:h-80 bg-default-100 rounded-lg overflow-hidden">
                    {compareMode ? (
                      // Split view comparison
                      <canvas
                        ref={compareCanvasRef}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      // Normal view
                      <>
                        <img
                          ref={imageRef}
                          src={imageSrc}
                          alt="Image"
                          className="w-full h-full object-contain"
                          style={{ display: showOriginal ? "block" : "none" }}
                        />
                        <canvas
                          ref={canvasRef}
                          className="w-full h-full object-contain"
                          style={{ display: showOriginal ? "none" : "block" }}
                        />
                      </>
                    )}
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
                  
                  {!compareMode && (
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
                  )}
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
                      <Button 
                        size="sm"
                        color="primary"
                        startContent={<Download size={16} />}
                      >
                        Export
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Download formats">
                      <DropdownItem key="png" onPress={() => downloadFilteredImage("image/png")}>
                        PNG (High Quality)
                      </DropdownItem>
                      <DropdownItem key="jpeg" onPress={() => downloadFilteredImage("image/jpeg")}>
                        JPEG (Small Size)
                      </DropdownItem>
                      <DropdownItem key="webp" onPress={() => downloadFilteredImage("image/webp")}>
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
                  <div className="flex items-center space-x-2">
                    <Tooltip content="Undo">
                      <Button
                        isIconOnly
                        color="default"
                        variant="light"
                        size="sm"
                        isDisabled={historyIndex < 0}
                        onClick={undoFilter}
                      >
                        <Undo size={18} />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Redo">
                      <Button
                        isIconOnly
                        color="default"
                        variant="light"
                        size="sm"
                        isDisabled={historyIndex >= filterHistory.length - 1}
                        onClick={redoFilter}
                      >
                        <Redo size={18} />
                      </Button>
                    </Tooltip>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <Switch
                    size="sm"
                    isSelected={multiFilterMode}
                    onValueChange={setMultiFilterMode}
                  />
                  <span className="text-sm">Multiple Filters Mode {multiFilterMode && <Badge color="primary" variant="flat">On</Badge>}</span>
                </div>
                
                {multiFilterMode && (
                  <div className="mb-4">
                    <div className="text-sm font-medium text-default-700 mb-2">Applied Filters:</div>
                    {appliedFilters.length === 0 ? (
                      <div className="text-xs text-gray-500 mb-2">No filters applied yet. Select a filter below and click "Add to Stack".</div>
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
                      <Button 
                        size="sm" 
                        color="secondary" 
                        onClick={addCurrentFilterToApplied}
                        className="w-full"
                      >
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
                    tabContent: "group-data-[selected=true]:text-white"
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
                              e.stopPropagation();
                              toggleFavorite(filter.name);
                            }}
                          >
                            <Star 
                              size={12} 
                              className={favorites.includes(filter.name) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"} 
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
                          color={favorites.includes(selectedFilter.name) ? "warning" : "default"}
                          variant="flat"
                          onPress={() => toggleFavorite(selectedFilter.name)}
                        >
                          <Star size={16} className={favorites.includes(selectedFilter.name) ? "fill-yellow-400" : ""} />
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                )}
              </CardBody>
              
              <CardFooter className="pt-0">
                {selectedFilter && (
                  <div className="w-full text-xs text-gray-500">
                    {selectedFilter.description || `Adjust the ${selectedFilter.name.toLowerCase()} effect to transform your image.`}
                  </div>
                )}
              </CardFooter>
            </Card>
          )}
        </div>

        <Card className=" bg-default-50 dark:bg-default-100 p-4 md:p-8">
      <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2" />
          What is the Image Filters Tool?
        </h2>
        <p className="text-foreground-600 mb-4">
        The enhanced image filter tool is a powerful, user -friendly application designed to replace your photos with a few clicks. Whether you are a professional photographer, social media enthusiastic, or someone who enjoys using images, our tool offers a broad array of filter and adjustment to bring your creative vision into life.
        </p>
        <p className="text-foreground-600 mb-4">
        With complete control over the selection and intensity of the filter, you can tailor your images and experience properly. From classic effects such as grancale and sepia to advanced filters such as hue rotation and custom shadow, our tool adjusts both simple adjustment and complex image manipulations.
        </p>
        <p className="text-foreground-600 mb-4">
        Perfect to edit photos for social media quickly, creating unique visual content for your blog, or experimenting with various styles for your digital art, enhanced image filter tool strengthens your workflow and helps you achieve amazing results.
        </p>

        <div className="my-8">
                <NextImage
                    src="/Images/InfosectionImages/ImageFiltersPreview.png?height=400&width=600"
                    alt="Screenshot of the Image Color Extractor interface showing image upload area and color analysis results"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg w-full h-auto"
                />
                </div>

        <h2 className="text-xl md:text-2xl font-semibold mb-4 mt-8 flex items-center">
          <BookOpen className="w-6 h-6 mr-2" />
          How to Use Image Filters?
        </h2>
        <ol className="list-decimal list-inside text-foreground-600 space-y-2 text-sm md:text-base">
          <li>Upload an image by clicking on the designated area or dragging and dropping a file.</li>
          <li>Choose a filter category and browse through different filter options.</li>
          <li>Click on any filter thumbnail to instantly apply it to your image.</li>
          <li>Use the intensity slider to fine-tune the strength of the selected filter.</li>
          <li>Toggle between the original and filtered image using the "Show Original" / "Show Filtered" button.</li>
          <li>Enable "Multiple Filters Mode" to stack multiple filters for unique effects.</li>
          <li>Use the "Compare" feature to view original and filtered versions side-by-side.</li>
          <li>Favorite frequently used filters for quick access.</li>
          <li>Use Undo/Redo to manage your editing history.</li>
          <li>Save your current filtered state as the new base image.</li>
          <li>Export the final image in PNG, JPEG, or WebP formats.</li>
        </ol>

        <h2 className="text-xl md:text-2xl font-semibold mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2" />
          Key Features
        </h2>
        <ul className="list-disc list-inside text-foreground-600 space-y-2 text-sm md:text-base">
          <li>Extensive filter collection with basic and artistic effects.</li>
          <li>Real-time preview to see changes instantly.</li>
          <li>Multiple Filters Mode to layer filters for advanced effects.</li>
          <li>Precise intensity control for each filter.</li>
          <li>Comparison tools to toggle between original and edited images.</li>
          <li>Favorites system to save and access preferred filters quickly.</li>
          <li>Edit history with undo/redo functionality.</li>
          <li>Responsive design for seamless usage across devices.</li>
          <li>No account required – start editing instantly!</li>
        </ul>

        <h2 className="text-xl md:text-2xl font-semibold mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2" />
          Creative Tips and Tricks
        </h2>
        <ul className="list-disc list-inside text-foreground-600 space-y-2 text-sm md:text-base">
          <li>Layer filters creatively for custom artistic effects.</li>
          <li>Use lower intensity settings (30-70%) for subtle and professional edits.</li>
          <li>Apply brightness and contrast adjustments before artistic filters.</li>
          <li>Use split-screen comparison to fine-tune edits with precision.</li>
          <li>Experiment with different filter combinations for unique moods and aesthetics.</li>
          <li>Save intermediate edits to preserve different versions of your image.</li>
          <li>Try different filters for portraits vs. landscapes for the best results.</li>
          <li>Use duotone effects by applying grayscale first, then layering a color filter.</li>
        </ul>

        <p className="text-foreground-600 mt-6">
        Are you ready to change your images? Dive into our enhanced image filter tool and unlock your creative ability. Whether you are working on a professional project or just want to add some nature to your personal photos, our equipment gives you the flexibility and strength required to achieve excellent results. Start experiment with filters today!
        </p>
      </div>
    </Card>
      </div>
    </ToolLayout>
  )
}

