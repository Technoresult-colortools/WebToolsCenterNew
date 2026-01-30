"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button, Card, CardBody, Input, Slider, Tabs, Tab, Tooltip, Chip, Progress } from "@nextui-org/react"
import { toast, Toaster } from "react-hot-toast"
import {
  Smartphone,
  Copy,
  TabletSmartphone,
  Info,
  RefreshCw,
  Zap,
  Clock,
  Save,
  Trash2,
  Square,
  Circle,
  Heart,
  Eye,
  EyeOff,
  Download,
  Upload,
  Plus,
  X,
  Settings,
  Check,
  Sparkles,
} from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import InfoSectionReactNativeShado from "./info-section"

interface Shadow {
  id: string
  name: string
  ios: {
    shadowColor: string
    shadowOffsetWidth: number
    shadowOffsetHeight: number
    shadowOpacity: number
    shadowRadius: number
  }
  android: {
    elevation: number
    shadowColor: string
    backgroundColor: string
  }
  timestamp: number
}

const PRESET_SHADOWS: Shadow[] = [
  {
    id: "subtle",
    name: "Subtle",
    ios: {
      shadowColor: "#000000",
      shadowOffsetWidth: 0,
      shadowOffsetHeight: 2,
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
    },
    android: { elevation: 2, shadowColor: "#000000", backgroundColor: "#FFFFFF" },
    timestamp: 0,
  },
  {
    id: "medium",
    name: "Medium",
    ios: {
      shadowColor: "#000000",
      shadowOffsetWidth: 0,
      shadowOffsetHeight: 4,
      shadowOpacity: 0.25,
      shadowRadius: 8.84,
    },
    android: { elevation: 5, shadowColor: "#000000", backgroundColor: "#FFFFFF" },
    timestamp: 0,
  },
  {
    id: "elevated",
    name: "Elevated",
    ios: {
      shadowColor: "#000000",
      shadowOffsetWidth: 0,
      shadowOffsetHeight: 8,
      shadowOpacity: 0.35,
      shadowRadius: 16.84,
    },
    android: { elevation: 12, shadowColor: "#000000", backgroundColor: "#FFFFFF" },
    timestamp: 0,
  },
  {
    id: "floating",
    name: "Floating",
    ios: {
      shadowColor: "#000000",
      shadowOffsetWidth: 0,
      shadowOffsetHeight: 12,
      shadowOpacity: 0.4,
      shadowRadius: 24.84,
    },
    android: { elevation: 24, shadowColor: "#000000", backgroundColor: "#FFFFFF" },
    timestamp: 0,
  },
]

export default function ReactNativeShadowGenerator() {
  const [shadowColor, setShadowColor] = useState("#000000")
  const [shadowOffsetWidth, setShadowOffsetWidth] = useState(0)
  const [shadowOffsetHeight, setShadowOffsetHeight] = useState(2)
  const [shadowOpacity, setShadowOpacity] = useState(0.25)
  const [shadowRadius, setShadowRadius] = useState(3.84)
  const [elevation, setElevation] = useState(5)
  const [androidColor, setAndroidColor] = useState("#000000")
  const [androidBackgroundColor, setAndroidBackgroundColor] = useState("#FFFFFF")
  const [activeTab, setActiveTab] = useState("ios")
  const [previewBackground, setPreviewBackground] = useState("#F0F0F0")
  const [previewShape, setPreviewShape] = useState("square")
  const [history, setHistory] = useState<Shadow[]>([])
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [showHistory, setShowHistory] = useState(true)
  const [copiedCode, setCopiedCode] = useState(false)
  const [customShadowName, setCustomShadowName] = useState("")
  const [showNameInput, setShowNameInput] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem("shadowHistory")
      if (saved) setHistory(JSON.parse(saved))
    } catch (e) {
      console.error("Failed to load history", e)
    }
  }, [])

  const getShadowStyle = () => {
    if (activeTab === "android") {
      return {
        boxShadow: `0px ${elevation * 0.5}px ${elevation * 1.5}px ${androidColor}${Math.round(0.3 * 255)
          .toString(16)
          .padStart(2, "0")}`,
        backgroundColor: androidBackgroundColor,
      }
    } else {
      const colorHex = `${Math.round(shadowOpacity * 255)
        .toString(16)
        .padStart(2, "0")}`
      return {
        boxShadow: `${shadowOffsetWidth}px ${shadowOffsetHeight}px ${shadowRadius}px ${shadowColor}${colorHex}`,
        backgroundColor: "#FFFFFF",
      }
    }
  }

  const copyToClipboard = () => {
    const code = `import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  shadowBox: {
    backgroundColor: "${androidBackgroundColor}",
    ...Platform.select({
      ios: {
        shadowColor: "${shadowColor}",
        shadowOffset: { width: ${shadowOffsetWidth}, height: ${shadowOffsetHeight} },
        shadowOpacity: ${shadowOpacity.toFixed(2)},
        shadowRadius: ${shadowRadius.toFixed(2)}
      },
      android: {
        elevation: ${elevation},
        shadowColor: "${androidColor}",
        overflow: "hidden"
      }
    })
  }
});`

    navigator.clipboard.writeText(code)
    setCopiedCode(true)
    toast.success("Shadow style copied!")
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const saveShadow = () => {
    const name = customShadowName.trim() || `Shadow ${history.length + 1}`
    const newShadow: Shadow = {
      id: Date.now().toString(),
      name,
      ios: { shadowColor, shadowOffsetWidth, shadowOffsetHeight, shadowOpacity, shadowRadius },
      android: { elevation, shadowColor: androidColor, backgroundColor: androidBackgroundColor },
      timestamp: Date.now(),
    }
    const updated = [newShadow, ...history]
    setHistory(updated)
    localStorage.setItem("shadowHistory", JSON.stringify(updated))
    setCustomShadowName("")
    setShowNameInput(false)
    toast.success("Shadow saved!")
  }

  const applyShadow = (shadow: Shadow) => {
    if (activeTab === "ios") {
      setShadowColor(shadow.ios.shadowColor)
      setShadowOffsetWidth(shadow.ios.shadowOffsetWidth)
      setShadowOffsetHeight(shadow.ios.shadowOffsetHeight)
      setShadowOpacity(shadow.ios.shadowOpacity)
      setShadowRadius(shadow.ios.shadowRadius)
    } else {
      setElevation(shadow.android.elevation)
      setAndroidColor(shadow.android.shadowColor)
      setAndroidBackgroundColor(shadow.android.backgroundColor)
    }
    toast.success("Shadow applied!")
  }

  const deleteFromHistory = (id: string) => {
    const updated = history.filter((s) => s.id !== id)
    setHistory(updated)
    localStorage.setItem("shadowHistory", JSON.stringify(updated))
    toast.success("Shadow removed")
  }

  const resetToDefaults = () => {
    if (activeTab === "ios") {
      setShadowColor("#000000")
      setShadowOffsetWidth(0)
      setShadowOffsetHeight(2)
      setShadowOpacity(0.25)
      setShadowRadius(3.84)
    } else {
      setElevation(5)
      setAndroidColor("#000000")
      setAndroidBackgroundColor("#FFFFFF")
    }
    setPreviewBackground("#F0F0F0")
    toast.success("Reset complete")
  }

  const exportHistory = () => {
    const data = JSON.stringify(history, null, 2)
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "shadow-history.json"
    a.click()
    URL.revokeObjectURL(url)
    toast.success("History exported!")
  }

  const importHistory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target?.result as string)
          setHistory(imported)
          localStorage.setItem("shadowHistory", JSON.stringify(imported))
          toast.success("History imported!")
        } catch (error) {
          toast.error("Invalid file format")
        }
      }
      reader.readAsText(file)
    }
  }

  const PreviewShape = ({ style }: { style: any }) => {
    const baseClasses = "w-24 h-24 sm:w-28 sm:h-28 transition-all duration-300"
    if (previewShape === "circle") {
      return <div className={`${baseClasses} rounded-full`} style={style} />
    } else if (previewShape === "heart") {
      return (
        <div className={baseClasses} style={style}>
          <Heart className="w-full h-full text-primary" fill="currentColor" />
        </div>
      )
    }
    return <div className={`${baseClasses} rounded-xl`} style={style} />
  }

  return (
    <ToolLayout
      title="React Native Shadow Generator"
      description="Create perfect shadows for iOS & Android with advanced customization"
      toolId="678f382e26f06f912191bcb8"
    >
      <Toaster position="top-right" />

      <div className="flex flex-col gap-6">
        {/* Quick Presets Card */}
        <Card className="w-full bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 backdrop-blur-sm border border-primary/20">
          <CardBody className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-default-700">Quick Presets</h3>
              <Chip size="sm" variant="flat" color="primary">
                Popular
              </Chip>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {PRESET_SHADOWS.map((preset) => (
                <Button
                  key={preset.id}
                  onPress={() => applyShadow(preset)}
                  color="primary"
                  variant="flat"
                  className="h-auto py-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform"
                >
                  <Zap className="w-5 h-5" />
                  <span className="text-sm font-semibold">{preset.name}</span>
                </Button>
              ))}
            </div>
          </CardBody>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Preview and Output */}
          <div className="lg:col-span-2 space-y-6">
            {/* Preview Section */}
            <Card className="w-full bg-default-50/70 dark:bg-default-100/70 backdrop-blur-sm border border-default-200/50">
              <CardBody className="space-y-4 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-default-700 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-primary" />
                    Shadow Preview
                  </h2>
                  <div className="flex gap-2">
                    {[
                      { shape: "square", icon: Square },
                      { shape: "circle", icon: Circle },
                      { shape: "heart", icon: Heart },
                    ].map(({ shape, icon: Icon }) => (
                      <Tooltip key={shape} content={`${shape} shape`}>
                        <Button
                          isIconOnly
                          size="sm"
                          variant={previewShape === shape ? "solid" : "bordered"}
                          color={previewShape === shape ? "primary" : "default"}
                          onClick={() => setPreviewShape(shape)}
                        >
                          <Icon className="w-4 h-4" />
                        </Button>
                      </Tooltip>
                    ))}
                  </div>
                </div>

                <Tabs
                  selectedKey={activeTab}
                  onSelectionChange={(key) => setActiveTab(key as string)}
                  variant="underlined"
                  color="primary"
                  className="mb-2"
                >
                  <Tab
                    key="ios"
                    title={
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4" />
                        <span className="font-medium">iOS</span>
                      </div>
                    }
                  />
                  <Tab
                    key="android"
                    title={
                      <div className="flex items-center gap-2">
                        <TabletSmartphone className="w-4 h-4" />
                        <span className="font-medium">Android</span>
                      </div>
                    }
                  />
                </Tabs>

                <div
                  className="p-12 rounded-2xl flex justify-center items-center min-h-[280px] transition-colors duration-300"
                  style={{ backgroundColor: previewBackground }}
                >
                  <PreviewShape style={getShadowStyle()} />
                </div>
              </CardBody>
            </Card>

            {/* Generated Code Section */}
            <Card className="w-full bg-gradient-to-br from-success/10 to-primary/10 dark:from-success/20 dark:to-primary/20 backdrop-blur-sm border border-success/30">
              <CardBody className="space-y-4 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-default-700 flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    Generated Code
                  </h2>
                  <Chip color="success" variant="flat" size="sm" startContent={<Check className="w-3 h-3" />}>
                    Ready
                  </Chip>
                </div>

                <div className="relative">
                  <pre className="bg-gray-900 dark:bg-gray-950 p-4 rounded-xl text-xs overflow-x-auto text-gray-100 font-mono leading-relaxed max-h-[320px] border border-gray-700">
                    {`import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  shadowBox: {
    backgroundColor: "${androidBackgroundColor}",
    ...Platform.select({
      ios: {
        shadowColor: "${shadowColor}",
        shadowOffset: {
          width: ${shadowOffsetWidth},
          height: ${shadowOffsetHeight}
        },
        shadowOpacity: ${shadowOpacity.toFixed(2)},
        shadowRadius: ${shadowRadius.toFixed(2)}
      },
      android: {
        elevation: ${elevation},
        shadowColor: "${androidColor}",
        overflow: "hidden"
      }
    })
  }
});`}
                  </pre>
                </div>

                <div className="flex gap-3 flex-wrap">
                  <Button
                    color="primary"
                    variant="shadow"
                    onPress={copyToClipboard}
                    startContent={<Copy className="w-4 h-4" />}
                    className="flex-1 min-w-[140px]"
                  >
                    {copiedCode ? "Copied!" : "Copy Code"}
                  </Button>
                  <Button
                    color="secondary"
                    variant="flat"
                    onPress={() => setShowNameInput(!showNameInput)}
                    startContent={<Save className="w-4 h-4" />}
                    className="flex-1 min-w-[140px]"
                  >
                    Save to History
                  </Button>
                  <Button
                    color="danger"
                    variant="bordered"
                    onPress={resetToDefaults}
                    startContent={<RefreshCw className="w-4 h-4" />}
                  >
                    Reset
                  </Button>
                </div>

                {showNameInput && (
                  <div className="flex gap-2 items-center p-4 bg-white/50 dark:bg-gray-900/30 rounded-lg border border-default-200">
                    <Input
                      value={customShadowName}
                      onChange={(e) => setCustomShadowName(e.target.value)}
                      placeholder="Enter shadow name (optional)"
                      variant="bordered"
                      size="sm"
                      className="flex-1"
                    />
                    <Button color="success" onPress={saveShadow} isIconOnly size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button color="default" variant="flat" onPress={() => setShowNameInput(false)} isIconOnly size="sm">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                {/* Shadow Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white/50 dark:bg-gray-900/30 rounded-lg text-center">
                    <p className="text-xs text-default-500">Platform</p>
                    <p className="text-base font-bold text-primary capitalize">{activeTab}</p>
                  </div>
                  <div className="p-3 bg-white/50 dark:bg-gray-900/30 rounded-lg text-center">
                    <p className="text-xs text-default-500">
                      {activeTab === "ios" ? "Blur Radius" : "Elevation"}
                    </p>
                    <p className="text-base font-bold text-secondary">
                      {activeTab === "ios" ? shadowRadius.toFixed(1) : elevation}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Right Column - Configuration and History */}
          <div className="space-y-6">
            {/* Configuration Section */}
            <Card className="w-full bg-default-50/70 dark:bg-default-100/70 backdrop-blur-sm border border-default-200/50">
              <CardBody className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-default-700">Configuration</h2>
                </div>

                <div className="space-y-4">
                  {activeTab === "ios" ? (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-default-700">Shadow Color</label>
                        <div className="flex gap-2">
                          <Input
                            value={shadowColor}
                            onChange={(e) => setShadowColor(e.target.value)}
                            size="sm"
                            variant="bordered"
                            classNames={{ input: "text-xs font-mono" }}
                          />
                          <input
                            type="color"
                            value={shadowColor}
                            onChange={(e) => setShadowColor(e.target.value)}
                            className="w-12 h-9 rounded-lg cursor-pointer border-2 border-default-300"
                          />
                        </div>
                      </div>

                      {[
                        { label: "Offset Width", value: shadowOffsetWidth, min: -20, max: 20, onChange: setShadowOffsetWidth },
                        { label: "Offset Height", value: shadowOffsetHeight, min: -20, max: 20, onChange: setShadowOffsetHeight },
                        { label: "Opacity", value: shadowOpacity, min: 0, max: 1, step: 0.01, onChange: setShadowOpacity },
                        { label: "Blur Radius", value: shadowRadius, min: 0, max: 20, step: 0.1, onChange: setShadowRadius },
                      ].map((slider) => (
                        <div key={slider.label} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-default-700">{slider.label}</label>
                            <Chip size="sm" variant="flat" color="primary">
                              {slider.value.toFixed(2)}
                            </Chip>
                          </div>
                          <Slider
                            aria-label={slider.label}
                            value={slider.value}
                            onChange={(value) => slider.onChange(value as number)}
                            step={slider.step || 1}
                            maxValue={slider.max}
                            minValue={slider.min}
                            size="sm"
                            color="primary"
                            className="max-w-full"
                          />
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-sm font-medium text-default-700">Elevation</label>
                          <Chip size="sm" variant="flat" color="success">
                            {elevation}
                          </Chip>
                        </div>
                        <Slider
                          aria-label="Elevation"
                          value={elevation}
                          onChange={(value) => setElevation(value as number)}
                          maxValue={24}
                          size="sm"
                          color="success"
                          className="max-w-full"
                        />
                        <p className="text-xs text-default-500 flex items-center gap-1">
                          <Info className="w-3 h-3" />
                          Recommended: 0-24dp
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-default-700">Shadow Color</label>
                        <div className="flex gap-2">
                          <Input
                            value={androidColor}
                            onChange={(e) => setAndroidColor(e.target.value)}
                            size="sm"
                            variant="bordered"
                            classNames={{ input: "text-xs font-mono" }}
                          />
                          <input
                            type="color"
                            value={androidColor}
                            onChange={(e) => setAndroidColor(e.target.value)}
                            className="w-12 h-9 rounded-lg cursor-pointer border-2 border-default-300"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-default-700">Background Color</label>
                        <div className="flex gap-2">
                          <Input
                            value={androidBackgroundColor}
                            onChange={(e) => setAndroidBackgroundColor(e.target.value)}
                            size="sm"
                            variant="bordered"
                            classNames={{ input: "text-xs font-mono" }}
                          />
                          <input
                            type="color"
                            value={androidBackgroundColor}
                            onChange={(e) => setAndroidBackgroundColor(e.target.value)}
                            className="w-12 h-9 rounded-lg cursor-pointer border-2 border-default-300"
                          />
                        </div>
                        <p className="text-xs text-default-500 flex items-center gap-1">
                          <Info className="w-3 h-3" />
                          Required for Android shadows
                        </p>
                      </div>
                    </>
                  )}

                  {/* Advanced Settings Toggle */}
                  <div className="pt-4 border-t border-default-200">
                    <div className="flex items-center justify-between p-3 bg-default-100 dark:bg-default-50 rounded-lg cursor-pointer" onClick={() => setShowAdvanced(!showAdvanced)}>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-default-700">Advanced Settings</span>
                      </div>
                      {showAdvanced ? <EyeOff className="w-4 h-4 text-default-400" /> : <Eye className="w-4 h-4 text-primary" />}
                    </div>
                  </div>

                  {showAdvanced && (
                    <div className="space-y-2 pt-2">
                      <label className="text-sm font-medium text-default-700">Preview Background</label>
                      <div className="flex gap-2">
                        <Input
                          value={previewBackground}
                          onChange={(e) => setPreviewBackground(e.target.value)}
                          size="sm"
                          variant="bordered"
                          classNames={{ input: "text-xs font-mono" }}
                        />
                        <input
                          type="color"
                          value={previewBackground}
                          onChange={(e) => setPreviewBackground(e.target.value)}
                          className="w-12 h-9 rounded-lg cursor-pointer border-2 border-default-300"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>

            {/* History Section */}
            {history.length > 0 && (
              <Card className="w-full bg-default-50/70 dark:bg-default-100/70 backdrop-blur-sm border border-default-200/50">
                <CardBody className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <h2 className="text-lg font-semibold text-default-700">Recent Shadows</h2>
                    </div>
                    <div className="flex gap-2">
                      <Tooltip content="Export">
                        <Button isIconOnly size="sm" variant="flat" onPress={exportHistory}>
                          <Download className="w-4 h-4" />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Import">
                        <Button isIconOnly size="sm" variant="flat" as="label">
                          <Upload className="w-4 h-4" />
                          <input type="file" accept=".json" onChange={importHistory} className="hidden" />
                        </Button>
                      </Tooltip>
                      <Button size="sm" variant="flat" color="danger" onPress={() => setHistory([])}>
                        Clear
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {history.map((shadow) => (
                      <div
                        key={shadow.id}
                        className="p-3 bg-white/50 dark:bg-gray-900/30 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-default-700 truncate">{shadow.name}</p>
                            <p className="text-xs text-default-500">{new Date(shadow.timestamp).toLocaleDateString()}</p>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              color="primary"
                              variant="flat"
                              onPress={() => applyShadow(shadow)}
                              className="text-xs"
                            >
                              Apply
                            </Button>
                            <Button
                              size="sm"
                              color="danger"
                              variant="flat"
                              isIconOnly
                              onPress={() => deleteFromHistory(shadow.id)}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </div>

      <InfoSectionReactNativeShado />
    </ToolLayout>
  )
}