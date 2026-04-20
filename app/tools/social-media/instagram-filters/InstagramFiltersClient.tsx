"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Button, Input, Select, SelectItem, Modal, ModalContent } from "@nextui-org/react"
import { toast, } from "react-hot-toast"
import {
  Upload, Download, RefreshCw, X, ImageIcon, ZoomIn, ZoomOut,
  Link2, Maximize2, ChevronRight, Star, SplitSquareHorizontal,
  Grid, List,
} from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import NextImage from "next/image"
import InfoSectionInstagramFilters from "./info-section"

// ─── Types ───────────────────────────────────────────────────────────────────

type FilterName = string
type AdjustTab = "basic" | "tone" | "detail" | "vignette"
type SidebarTab = "filters" | "presets" | "saved"
type ViewMode = "grid" | "list"

interface Adjustments {
  brightness: number
  contrast: number
  saturation: number
  hue: number
  blur: number
  grain: number
  vignette: number
  highlights: number
  shadows: number
  sharpness: number
}

interface Preset {
  name: string
  filter: FilterName
  adjustments: Partial<Adjustments>
  emoji: string
}

// ─── Filter Definitions ───────────────────────────────────────────────────────

const filterCategories: { label: string; icon: string; filters: FilterName[] }[] = [
  {
    label: "Vintage",
    icon: "✦",
    filters: ["Earlybird", "Toaster", "Brannan", "Walden", "Sutro", "F1977", "1977", "Reyes", "Crema"],
  },
  {
    label: "Black & White",
    icon: "◐",
    filters: ["Inkwell", "Moon", "Willow", "Stinson", "Charcoal", "Blueprint", "Noir", "Silver"],
  },
  {
    label: "Warm",
    icon: "☀",
    filters: ["Kelvin", "Valencia", "Nashville", "Juno", "Amaro", "Hefe", "Rise", "Sierra", "Perpetua"],
  },
  {
    label: "Cool & Cinematic",
    icon: "❄",
    filters: ["Hudson", "Lark", "Clarendon", "Ludwig", "Aden", "Maven", "Vesper", "Skyline", "Arctic"],
  },
  {
    label: "Moody",
    icon: "◉",
    filters: ["Slumber", "Lo-Fi", "Mayfair", "XProII", "Gingham", "Normal", "Fade", "Dim", "Phantom"],
  },
]

const allFilters = filterCategories.flatMap((c) => c.filters)

const filterStyles: Record<FilterName, string> = {
  Normal: "",
  Clarendon: "contrast(1.2) saturate(1.35)",
  Gingham: "brightness(1.05) hue-rotate(-10deg)",
  Moon: "grayscale(1) contrast(1.1) brightness(1.1)",
  Lark: "contrast(0.9) brightness(1.1) saturate(1.1)",
  Reyes: "sepia(0.22) brightness(1.1) contrast(0.85) saturate(0.75)",
  Juno: "saturate(1.4) contrast(1.1) brightness(1.2)",
  Slumber: "saturate(0.66) brightness(1.05)",
  Rise: "brightness(1.15) contrast(1.1) saturate(1.2) sepia(0.1)",
  Hudson: "brightness(1.2) contrast(0.9) saturate(1.1) hue-rotate(-10deg)",
  Earlybird: "sepia(0.4) contrast(1.1) brightness(0.9) saturate(1.2)",
  Brannan: "sepia(0.3) contrast(1.2) brightness(1.1) saturate(0.9)",
  Sutro: "sepia(0.4) contrast(1.2) brightness(0.9) saturate(1.1) hue-rotate(-10deg)",
  Toaster: "sepia(0.3) contrast(1.3) brightness(0.8) saturate(1.3)",
  Walden: "brightness(1.1) contrast(0.9) saturate(1.3) sepia(0.2)",
  Kelvin: "brightness(1.2) contrast(1.1) saturate(1.4) hue-rotate(10deg)",
  F1977: "contrast(1.4) saturate(1.2) sepia(0.3) brightness(0.9)",
  "1977": "contrast(1.1) brightness(1.1) saturate(1.3) sepia(0.15)",
  Maven: "brightness(1.1) contrast(1.2) saturate(1.1) hue-rotate(5deg)",
  Crema: "contrast(0.9) brightness(1.1) saturate(1.1) sepia(0.2)",
  Ludwig: "contrast(1.1) brightness(1.1) saturate(1.1) sepia(0.1)",
  Aden: "contrast(0.9) brightness(1.2) saturate(0.85) hue-rotate(20deg)",
  Perpetua: "contrast(1.1) brightness(1.25) saturate(1.1)",
  Amaro: "brightness(1.1) contrast(1.1) saturate(1.3) hue-rotate(15deg)",
  Mayfair: "brightness(1.1) contrast(1.2) sepia(0.2)",
  Willow: "saturate(0.8) contrast(1.1) brightness(1.1) sepia(0.3)",
  Hefe: "contrast(1.2) brightness(1.05) saturate(1.3)",
  Valencia: "brightness(1.1) contrast(1.1) sepia(0.3) saturate(1.2)",
  XProII: "contrast(1.2) brightness(1.1) saturate(1.4) sepia(0.2)",
  Sierra: "contrast(0.9) brightness(1.1) saturate(1.1) sepia(0.3)",
  Nashville: "brightness(1.2) contrast(1.1) sepia(0.2) saturate(1.3)",
  "Lo-Fi": "contrast(1.4) saturate(1.1)",
  Inkwell: "grayscale(1) brightness(1.2) contrast(1.05)",
  Stinson: "contrast(0.9) brightness(1.1) saturate(0.9)",
  Vesper: "contrast(1.1) brightness(1.1) saturate(1.2) sepia(0.1)",
  Charcoal: "grayscale(1) contrast(1.3) brightness(0.9)",
  Blueprint: "grayscale(0.8) hue-rotate(180deg) saturate(1.4) contrast(1.1)",
  Noir: "grayscale(1) contrast(1.5) brightness(0.8)",
  Silver: "grayscale(0.7) brightness(1.15) contrast(0.95)",
  Skyline: "hue-rotate(-20deg) saturate(1.2) contrast(1.1) brightness(1.05)",
  Arctic: "hue-rotate(10deg) saturate(0.8) brightness(1.2) contrast(0.9)",
  Fade: "contrast(0.85) brightness(1.1) saturate(0.75)",
  Dim: "brightness(0.85) contrast(1.2) saturate(0.9)",
  Phantom: "contrast(1.3) brightness(0.8) saturate(0.6) sepia(0.2)",
}

// ─── Presets ─────────────────────────────────────────────────────────────────

const presets: Preset[] = [
  {
    name: "Moody Portrait",
    emoji: "🎭",
    filter: "Sutro",
    adjustments: { contrast: 130, saturation: 75, brightness: 90, vignette: 40 },
  },
  {
    name: "Golden Hour",
    emoji: "🌅",
    filter: "Kelvin",
    adjustments: { brightness: 115, saturation: 130, hue: 10 },
  },
  {
    name: "Faded Film",
    emoji: "🎞",
    filter: "Fade",
    adjustments: { contrast: 85, saturation: 70, brightness: 110, grain: 30 },
  },
  {
    name: "Clean & Crisp",
    emoji: "✨",
    filter: "Normal",
    adjustments: { contrast: 110, saturation: 105, brightness: 105, sharpness: 20 },
  },
  {
    name: "Dark Drama",
    emoji: "🌑",
    filter: "Lo-Fi",
    adjustments: { brightness: 80, contrast: 140, saturation: 60, vignette: 60 },
  },
  {
    name: "Warm Vintage",
    emoji: "📷",
    filter: "Earlybird",
    adjustments: { brightness: 95, saturation: 110, grain: 20 },
  },
  {
    name: "Icy Cool",
    emoji: "🧊",
    filter: "Arctic",
    adjustments: { brightness: 115, saturation: 80, hue: -10 },
  },
  {
    name: "Summer Vibes",
    emoji: "🏖",
    filter: "Valencia",
    adjustments: { brightness: 120, saturation: 140, contrast: 105 },
  },
]

// ─── Default Adjustments ─────────────────────────────────────────────────────

const defaultAdj: Adjustments = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  hue: 0,
  blur: 0,
  grain: 0,
  vignette: 0,
  highlights: 0,
  shadows: 0,
  sharpness: 0,
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildFilter(filterName: FilterName, adj: Adjustments): string {
  const base = filterStyles[filterName] || ""
  return [
    base,
    `brightness(${adj.brightness}%)`,
    `contrast(${adj.contrast}%)`,
    `saturate(${adj.saturation}%)`,
    adj.hue !== 0 ? `hue-rotate(${adj.hue}deg)` : "",
    adj.blur > 0 ? `blur(${adj.blur * 0.05}px)` : "",
  ]
    .filter(Boolean)
    .join(" ")
}

// ─── Slider component ─────────────────────────────────────────────────────────

function AdjSlider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  unit?: string
  onChange: (v: number) => void
}) {
  const display = value > 0 && min < 0 ? `+${value}` : `${value}`
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs">
        <span className="text-default-500">{label}</span>
        <span className="font-medium text-default-700">
          {display}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-violet-500 h-[3px] cursor-pointer"
      />
    </div>
  )
}

// ─── Filter thumbnail swatch (no real image needed for sidebar) ───────────────

const swatchColors: Record<string, string> = {
  Vintage: "from-amber-300 to-orange-700",
  "Black & White": "from-gray-200 to-gray-700",
  Warm: "from-yellow-300 to-orange-500",
  "Cool & Cinematic": "from-blue-300 to-blue-700",
  Moody: "from-purple-400 to-gray-900",
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function InstagramFilters() {
  const [image, setImage] = useState<string | null>(null)
  const [filter, setFilter] = useState<FilterName>("Normal")
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [fileName, setFileName] = useState("")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [adj, setAdj] = useState<Adjustments>(defaultAdj)
  const [zoom, setZoom] = useState(100)
  const [urlInput, setUrlInput] = useState("")
  const [downloadFormat, setDownloadFormat] = useState("png")
  const [savedFilters, setSavedFilters] = useState<FilterName[]>([])
  const [sidebarTab, setSidebarTab] = useState<SidebarTab>("filters")
  const [adjustTab, setAdjustTab] = useState<AdjustTab>("basic")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [comparing, setComparing] = useState(false)
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set())

  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  // ── Load image ──────────────────────────────────────────────────────────────

  const loadFile = (file: File) => {
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = (e) => setImage(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) loadFile(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) loadFile(file)
  }

  const handleUrlUpload = async () => {
    if (!urlInput) { toast.error("Enter an image URL"); return }
    try {
      const res = await fetch(urlInput)
      const blob = await res.blob()
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
        setFileName(urlInput.split("/").pop() || "image")
        toast.success("Image loaded!")
      }
      reader.readAsDataURL(blob)
    } catch {
      toast.error("Failed to load image from URL")
    }
  }

  // ── Track dimensions ────────────────────────────────────────────────────────

  useEffect(() => {
    if (!image) return
    const img = new Image()
    img.onload = () => setDimensions({ width: img.width, height: img.height })
    img.src = image
  }, [image])

  // ── Keyboard navigation ─────────────────────────────────────────────────────

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!image) return
      if (e.key === "ArrowLeft") {
        setFilter((f) => {
          const i = allFilters.indexOf(f)
          return allFilters[(i - 1 + allFilters.length) % allFilters.length]
        })
      } else if (e.key === "ArrowRight") {
        setFilter((f) => {
          const i = allFilters.indexOf(f)
          return allFilters[(i + 1) % allFilters.length]
        })
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [image])

  // ── Adjustments helpers ─────────────────────────────────────────────────────

  const setA = (key: keyof Adjustments) => (v: number) =>
    setAdj((prev) => ({ ...prev, [key]: v }))

  const applyPreset = (p: Preset) => {
    setFilter(p.filter)
    setAdj({ ...defaultAdj, ...p.adjustments })
    toast.success(`Applied: ${p.name}`)
  }

  const resetAll = () => {
    setAdj(defaultAdj)
    setFilter("Normal")
    setZoom(100)
  }

  // ── Favorites ───────────────────────────────────────────────────────────────

  const toggleSaved = () => {
    setSavedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    )
  }

  const isSaved = savedFilters.includes(filter)

  // ── Category toggle ─────────────────────────────────────────────────────────

  const toggleCategory = (label: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev)

      if (next.has(label)) {
        next.delete(label)
      } else {
        next.add(label)
      }

      return next
    })
  }

  // ── CSS filter string ────────────────────────────────────────────────────────

  const cssFilter = buildFilter(filter, adj)

  // ── Download ────────────────────────────────────────────────────────────────

  const downloadImage = useCallback(() => {
    if (!imageRef.current) return
    const canvas = document.createElement("canvas")
    canvas.width = imageRef.current.naturalWidth
    canvas.height = imageRef.current.naturalHeight
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.filter = cssFilter
    ctx.drawImage(imageRef.current, 0, 0)

    // Grain overlay
    if (adj.grain > 0) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * adj.grain * 2
        data[i] = Math.min(255, Math.max(0, data[i] + noise))
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise))
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise))
      }
      ctx.putImageData(imageData, 0, 0)
    }

    const link = document.createElement("a")
    link.download = `filtered_${filter}.${downloadFormat}`

    if (downloadFormat === "webp") {
      canvas.toBlob((blob) => {
        if (blob) {
          link.href = URL.createObjectURL(blob)
          link.click()
          URL.revokeObjectURL(link.href)
        }
      }, "image/webp", 0.9)
    } else {
      link.href = canvas.toDataURL(`image/${downloadFormat}`, 0.9)
      link.click()
    }

    toast.success("Image downloaded!")
  }, [imageRef, cssFilter, adj.grain, filter, downloadFormat])

  // ── Copy CSS filter ──────────────────────────────────────────────────────────

  const copyCss = () => {
    navigator.clipboard.writeText(`filter: ${cssFilter};`)
    toast.success("CSS filter copied!")
  }

  // ─── Sidebar ────────────────────────────────────────────────────────────────

  const renderSidebar = () => (
    <div className="flex flex-col h-full border-r border-default-200 dark:border-default-100 bg-default-50 dark:bg-default-50" style={{ width: 260, minWidth: 260 }}>
      {/* Sidebar tabs */}
      <div className="flex border-b border-default-200 dark:border-default-100">
        {(["filters", "presets", "saved"] as SidebarTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setSidebarTab(tab)}
            className={`flex-1 py-2.5 text-xs capitalize transition-colors ${sidebarTab === tab
              ? "text-violet-600 border-b-2 border-violet-500 font-medium bg-white dark:bg-default-100"
              : "text-default-500 hover:text-default-700"
              }`}
          >
            {tab === "saved" ? `★ ${savedFilters.length}` : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Sidebar content */}
      <div className="flex-1 overflow-y-auto">
        {sidebarTab === "filters" && (
          <div>
            <div className="flex items-center justify-between px-3 pt-2 pb-1">
              <span className="text-[10px] font-semibold text-default-400 uppercase tracking-wider">Browse</span>
              <div className="flex gap-1">
                <button onClick={() => setViewMode("grid")} className={`p-1 rounded ${viewMode === "grid" ? "text-violet-500" : "text-default-400"}`}>
                  <Grid className="w-3 h-3" />
                </button>
                <button onClick={() => setViewMode("list")} className={`p-1 rounded ${viewMode === "list" ? "text-violet-500" : "text-default-400"}`}>
                  <List className="w-3 h-3" />
                </button>
              </div>
            </div>

            {filterCategories.map((cat) => (
              <div key={cat.label}>
                <button
                  onClick={() => toggleCategory(cat.label)}
                  className="flex items-center justify-between w-full px-3 py-1.5 text-left hover:bg-default-100"
                >
                  <span className="text-[10px] font-medium text-default-500">
                    {cat.icon} {cat.label}
                  </span>
                  <ChevronRight
                    className={`w-3 h-3 text-default-400 transition-transform ${openCategories.has(cat.label) ? "rotate-90" : ""}`}
                  />
                </button>

                {openCategories.has(cat.label) && (
                  viewMode === "grid" ? (
                    <div className="grid grid-cols-2 gap-1.5 px-2 pb-2">
                      {cat.filters.map((f) => (
                        <button
                          key={f}
                          onClick={() => setFilter(f)}
                          className={`rounded-lg overflow-hidden border-2 transition-all text-left ${filter === f ? "border-violet-500" : "border-transparent"
                            }`}
                        >
                          {image ? (
                            <div
                              className="w-full aspect-square bg-cover bg-center"
                              style={{
                                backgroundImage: `url(${image})`,
                                filter: filterStyles[f] || "",
                                backgroundSize: "cover",
                              }}
                            />
                          ) : (
                            <div
                              className={`w-full aspect-square bg-gradient-to-br ${swatchColors[cat.label] || "from-gray-200 to-gray-500"}`}
                              style={{ filter: filterStyles[f] || "" }}
                            />
                          )}
                          <div className={`text-[10px] text-center py-1 truncate px-1 ${filter === f ? "text-violet-600 font-medium" : "text-default-500"}`}>
                            {f}
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="pb-2">
                      {cat.filters.map((f) => (
                        <button
                          key={f}
                          onClick={() => setFilter(f)}
                          className={`flex items-center gap-2 w-full px-3 py-1.5 hover:bg-default-100 transition-colors ${filter === f ? "bg-violet-50 dark:bg-violet-900/20" : ""
                            }`}
                        >
                          <div
                            className={`w-8 h-8 rounded flex-shrink-0 bg-gradient-to-br ${swatchColors[cat.label] || "from-gray-200 to-gray-500"}`}
                            style={{ filter: filterStyles[f] || "" }}
                          />
                          <span className={`text-xs ${filter === f ? "text-violet-600 font-medium" : "text-default-600"}`}>{f}</span>
                          {savedFilters.includes(f) && <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400 ml-auto flex-shrink-0" />}
                        </button>
                      ))}
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        )}

        {sidebarTab === "presets" && (
          <div className="p-2 flex flex-col gap-2">
            <div className="text-[10px] font-semibold text-default-400 uppercase tracking-wider px-1 pt-1">Quick Presets</div>
            {presets.map((p) => (
              <button
                key={p.name}
                onClick={() => applyPreset(p)}
                className="flex items-center gap-2.5 w-full text-left px-2.5 py-2 rounded-lg border border-default-200 hover:border-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all"
              >
                <span className="text-xl leading-none">{p.emoji}</span>
                <div>
                  <div className="text-xs font-medium text-default-700">{p.name}</div>
                  <div className="text-[10px] text-default-400">{p.filter} filter</div>
                </div>
              </button>
            ))}
          </div>
        )}

        {sidebarTab === "saved" && (
          <div className="p-2">
            {savedFilters.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-default-400 gap-2">
                <Star className="w-8 h-8 opacity-30" />
                <p className="text-xs text-center">Star filters to save them here</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-1.5">
                {savedFilters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`rounded-lg overflow-hidden border-2 transition-all ${filter === f ? "border-violet-500" : "border-transparent"
                      }`}
                  >
                    {image ? (
                      <div
                        className="w-full aspect-square"
                        style={{
                          backgroundImage: `url(${image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          filter: filterStyles[f] || "",
                        }}
                      />
                    ) : (
                      <div className="w-full aspect-square bg-gradient-to-br from-violet-200 to-violet-500" style={{ filter: filterStyles[f] || "" }} />
                    )}
                    <div className="text-[10px] text-center py-1 truncate px-1 text-violet-600 font-medium">{f}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )

  // ─── Adjust Panel ────────────────────────────────────────────────────────────

  const renderAdjustPanel = () => (
    <div className="border-t border-default-200 dark:border-default-100 bg-white dark:bg-default-50 p-4">
      {/* Tabs */}
      <div className="flex gap-1 mb-4">
        {(["basic", "tone", "detail", "vignette"] as AdjustTab[]).map((t) => (
          <button
            key={t}
            onClick={() => setAdjustTab(t)}
            className={`flex-1 py-1.5 text-xs rounded-md transition-colors capitalize ${adjustTab === t
              ? "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 font-medium"
              : "text-default-500 hover:text-default-700 hover:bg-default-100"
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Sliders */}
      {adjustTab === "basic" && (
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          <AdjSlider label="Brightness" value={adj.brightness} min={0} max={200} onChange={setA("brightness")} unit="%" />
          <AdjSlider label="Contrast" value={adj.contrast} min={0} max={200} onChange={setA("contrast")} unit="%" />
          <AdjSlider label="Saturation" value={adj.saturation} min={0} max={200} onChange={setA("saturation")} unit="%" />
          <AdjSlider label="Hue Rotate" value={adj.hue} min={-180} max={180} onChange={setA("hue")} unit="°" />
        </div>
      )}

      {adjustTab === "tone" && (
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          <AdjSlider label="Highlights" value={adj.highlights} min={-100} max={100} onChange={setA("highlights")} />
          <AdjSlider label="Shadows" value={adj.shadows} min={-100} max={100} onChange={setA("shadows")} />
          <AdjSlider label="Blur" value={adj.blur} min={0} max={100} onChange={setA("blur")} />
          <AdjSlider label="Grain" value={adj.grain} min={0} max={100} onChange={setA("grain")} />
        </div>
      )}

      {adjustTab === "detail" && (
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          <AdjSlider label="Sharpness" value={adj.sharpness} min={0} max={100} onChange={setA("sharpness")} />
          <AdjSlider label="Grain" value={adj.grain} min={0} max={100} onChange={setA("grain")} />
          <AdjSlider label="Blur" value={adj.blur} min={0} max={100} onChange={setA("blur")} />
        </div>
      )}

      {adjustTab === "vignette" && (
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          <AdjSlider label="Vignette" value={adj.vignette} min={0} max={100} onChange={setA("vignette")} />
          <AdjSlider label="Intensity" value={adj.contrast} min={0} max={200} onChange={setA("contrast")} unit="%" />
        </div>
      )}
    </div>
  )

  // ─── Vignette style ──────────────────────────────────────────────────────────

  const vignetteStyle = adj.vignette > 0
    ? {
      boxShadow: `inset 0 0 ${adj.vignette * 2}px ${adj.vignette}px rgba(0,0,0,${adj.vignette / 150})`,
    }
    : {}

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <ToolLayout
      title="Instagram Filters"
      description="Apply Instagram-style filters and effects to your images with advanced editing options"
      toolId="678f383126f06f912191bcd1"
    >
      <div className="bg-default-50 dark:bg-default-100 overflow-hidden rounded-xl border border-default-200 dark:border-default-100">
        <div className="flex" style={{ minHeight: 560 }}>

          {/* ── Sidebar ── */}
          {renderSidebar()}

          {/* ── Main area ── */}
          <div className="flex flex-col flex-1 min-w-0">

            {/* Top bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-default-200 dark:border-default-100 bg-white dark:bg-default-50">
              <div className="flex items-center gap-1.5 flex-1">
                <span className="text-sm font-semibold text-default-700">{filter}</span>
                {isSaved && <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />}
                {dimensions.width > 0 && (
                  <span className="text-xs text-default-400 ml-2">{dimensions.width} × {dimensions.height}</span>
                )}
                {fileName && (
                  <span className="text-xs text-default-400 truncate max-w-[120px]">{fileName}</span>
                )}
              </div>

              <Button size="sm" variant="flat" className="text-xs h-7" onPress={() => setComparing(!comparing)} isDisabled={!image}>
                <SplitSquareHorizontal className="w-3.5 h-3.5 mr-1" />
                {comparing ? "Exit Compare" : "Compare"}
              </Button>

              <Button size="sm" variant="flat" className="text-xs h-7" onPress={copyCss} isDisabled={!image}>
                <span className="font-mono text-[10px]">CSS</span>
              </Button>

              <Button size="sm" variant="flat" isIconOnly className="h-7 w-7" onPress={() => setIsFullscreen(true)} isDisabled={!image}>
                <Maximize2 className="w-3.5 h-3.5" />
              </Button>
            </div>

            {/* Preview */}
            <div
              className="flex-1 flex items-center justify-center bg-[#f0f0f0] dark:bg-default-200 relative overflow-hidden cursor-pointer"
              style={{ minHeight: 260 }}
              onClick={() => !image && fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              {image ? (
                comparing ? (
                  // Split compare view
                  <div className="relative w-full h-full flex" style={{ minHeight: 260 }}>
                    <div className="flex-1 overflow-hidden relative">
                      <NextImage
                        src={image}
                        alt="Original"
                        width={dimensions.width || 500}
                        height={dimensions.height || 500}
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded">Original</div>
                    </div>
                    <div className="w-[1px] bg-white/80 z-10 flex-shrink-0" />
                    <div className="flex-1 overflow-hidden relative">
                      <NextImage
                        src={image}
                        alt="Filtered"
                        width={dimensions.width || 500}
                        height={dimensions.height || 500}
                        className="w-full h-full object-contain"
                        style={{ filter: cssFilter }}
                      />
                      <div className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded">{filter}</div>
                    </div>
                  </div>
                ) : (
                  // Single preview
                  <div
                    className="relative"
                    style={{
                      transform: `scale(${zoom / 100})`,
                      transformOrigin: "center center",
                      transition: "transform 0.2s ease",
                      ...vignetteStyle,
                    }}
                  >
                    <NextImage
                      ref={imageRef}
                      src={image}
                      alt="Uploaded"
                      width={dimensions.width || 500}
                      height={dimensions.height || 500}
                      className="max-h-[320px] max-w-full object-contain block"
                      style={{ filter: cssFilter }}
                    />
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center gap-3 text-default-400 py-12">
                  <ImageIcon className="w-12 h-12 opacity-30" />
                  <p className="text-sm">Drop an image or click to upload</p>
                  <Button size="sm" variant="bordered" onPress={() => fileInputRef.current?.click()} className="mt-1">
                    <Upload className="w-3.5 h-3.5 mr-1.5" />
                    Choose file
                  </Button>
                </div>
              )}

              {/* Grain overlay rendered in CSS */}
              {image && adj.grain > 0 && !comparing && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
                    opacity: adj.grain / 300,
                    mixBlendMode: "overlay",
                  }}
                />
              )}
            </div>

            {/* Adjust panel */}
            {renderAdjustPanel()}

            {/* Bottom action bar */}
            <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 border-t border-default-200 dark:border-default-100 bg-white dark:bg-default-50">
              {/* Upload */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <Button size="sm" variant="flat" color="primary" onPress={() => fileInputRef.current?.click()} className="h-7 text-xs">
                <Upload className="w-3 h-3 mr-1" />
                Upload
              </Button>

              {/* URL input */}
              <div className="flex gap-1 flex-1 min-w-[160px] max-w-xs">
                <Input
                  size="sm"
                  placeholder="Paste image URL…"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  variant="bordered"
                  classNames={{ input: "text-xs", inputWrapper: "h-7 min-h-unit-0" }}
                />
                <Button size="sm" isIconOnly variant="flat" onPress={handleUrlUpload} className="h-7 w-7 flex-shrink-0">
                  <Link2 className="w-3 h-3" />
                </Button>
              </div>

              <div className="flex-1" />

              {/* Star */}
              <Button
                size="sm"
                isIconOnly
                variant="flat"
                className={`h-7 w-7 ${isSaved ? "text-yellow-500" : "text-default-400"}`}
                onPress={toggleSaved}
                isDisabled={!image}
              >
                <Star className={`w-3.5 h-3.5 ${isSaved ? "fill-yellow-400" : ""}`} />
              </Button>

              {/* Zoom */}
              <Button size="sm" isIconOnly variant="flat" className="h-7 w-7" onPress={() => setZoom((p) => Math.min(p + 10, 200))} isDisabled={!image}>
                <ZoomIn className="w-3.5 h-3.5" />
              </Button>
              <Button size="sm" isIconOnly variant="flat" className="h-7 w-7" onPress={() => setZoom((p) => Math.max(p - 10, 50))} isDisabled={!image}>
                <ZoomOut className="w-3.5 h-3.5" />
              </Button>

              {/* Reset */}
              <Button size="sm" variant="flat" className="h-7 text-xs" onPress={resetAll} isDisabled={!image}>
                <RefreshCw className="w-3 h-3 mr-1" />
                Reset
              </Button>

              {/* Format + Download */}
              <Select
                size="sm"
                selectedKeys={[downloadFormat]}
                onChange={(e) => setDownloadFormat(e.target.value)}
                variant="bordered"
                className="w-28"
                classNames={{ trigger: "h-7 min-h-unit-0 text-xs px-3" }}
              >
                <SelectItem key="png" className="text-default-700">PNG</SelectItem>
                <SelectItem key="jpeg" className="text-default-700">JPEG</SelectItem>
                <SelectItem key="webp" className="text-default-700">WebP</SelectItem>
              </Select>
              <Button size="sm" color="primary" className="h-7 text-xs" onPress={downloadImage} isDisabled={!image}>
                <Download className="w-3 h-3 mr-1" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      <Modal
        isOpen={isFullscreen}
        onOpenChange={setIsFullscreen}
        size="full"
        classNames={{
          base: "bg-black/70 backdrop-blur-md",
          wrapper: "max-w-full h-full",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <div className="relative w-full h-full flex items-center justify-center">
              <Button
                isIconOnly
                variant="flat"
                color="danger"
                onPress={onClose}
                className="absolute top-4 right-4 z-50"
              >
                <X className="w-5 h-5" />
              </Button>
              <div className="text-white/60 text-sm absolute top-4 left-4">{filter} · {dimensions.width}×{dimensions.height}</div>
              <NextImage
                src={image || "/placeholder.svg"}
                alt="Fullscreen preview"
                width={dimensions.width || 800}
                height={dimensions.height || 800}
                className="max-w-[90vw] max-h-[90vh] object-contain"
                style={{ filter: cssFilter }}
              />
            </div>
          )}
        </ModalContent>
      </Modal>
      <InfoSectionInstagramFilters />
    </ToolLayout>
  )
}