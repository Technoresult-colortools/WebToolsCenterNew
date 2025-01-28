"use client"

import React, { useState, useEffect } from "react"
import {
  Button,
  Card,
  CardBody,
  Tabs,
  Tab,
} from "@nextui-org/react"
import { toast } from 'react-hot-toast';
import {
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  RefreshCw,
  Copy,
  Check,

  Grid,
  Info,
  BookOpen,
  Lightbulb,
  ArrowRight,
  Maximize,
  Globe,
  Eye,
} from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import Image from "next/image"
import { ShareButton } from "@/components/ShareButton"
import Link from "next/link"

interface DisplayMetrics {
  physicalWidth: number
  physicalHeight: number
  logicalWidth: number
  logicalHeight: number
  availWidth: number
  availHeight: number
  pixelRatio: number
  colorDepth: number
  colorGamut: string
  orientation: string
  deviceType: string
  aspectRatio: string
  scalingFactor: number
  refreshRate: number
  monitors: number
  currentMonitor: number
  touchPoints: number
  hdrCapable: boolean
  preferredColorScheme: string
  reducedMotion: boolean
  standardWidth: number
  standardHeight: number
  roundedAvailWidth: number
  roundedAvailHeight: number
  pixelWidth: number
  pixelHeight: number
  pixelDepth: number
}

const initialMetrics: DisplayMetrics = {
  physicalWidth: 0,
  physicalHeight: 0,
  logicalWidth: 0,
  logicalHeight: 0,
  availWidth: 0,
  availHeight: 0,
  pixelRatio: 1,
  colorDepth: 0,
  colorGamut: "",
  orientation: "",
  deviceType: "",
  aspectRatio: "",
  scalingFactor: 100,
  refreshRate: 0,
  monitors: 1,
  currentMonitor: 1,
  touchPoints: 0,
  hdrCapable: false,
  preferredColorScheme: "light",
  reducedMotion: false,
  standardWidth: 0,
  standardHeight: 0,
  roundedAvailWidth: 0,
  roundedAvailHeight: 0,
  pixelWidth: 0,
  pixelHeight: 0,
  pixelDepth: 0,
}

const calculateTotalPixels = (width: number, height: number): string => {
  const total = (width * height) / 1000000
  return total.toFixed(4)
}

export default function AdvancedScreenChecker() {
  const [metrics, setMetrics] = useState<DisplayMetrics>(initialMetrics)
  const [copied, setCopied] = useState(false)

  const detectHDRCapability = async (): Promise<boolean> => {
    if (window.matchMedia("(dynamic-range: high)").matches) return true
    try {
      const support = await (window.screen as { isHDRAvailable?: boolean }).isHDRAvailable
      return !!support
    } catch {
      return false
    }
  }

  const getStandardResolution = (width: number, height: number): { width: number; height: number } => {
    const standardResolutions = [
      { width: 7680, height: 4320 }, // 8K
      { width: 3840, height: 2160 }, // 4K UHD
      { width: 2560, height: 1440 }, // 2K QHD
      { width: 1920, height: 1080 }, // Full HD
      { width: 1680, height: 1050 }, // WSXGA+
      { width: 1600, height: 900 }, // HD+
      { width: 1440, height: 900 }, // WXGA+
      { width: 1366, height: 768 }, // HD
      { width: 1280, height: 720 }, // HD
      { width: 1024, height: 768 }, // XGA
    ]

    const closest = standardResolutions.reduce((prev, curr) => {
      const prevDiff = Math.abs(prev.width - width) + Math.abs(prev.height - height)
      const currDiff = Math.abs(curr.width - width) + Math.abs(curr.height - height)
      return currDiff < prevDiff ? curr : prev
    })

    return closest
  }

  const detectTouchPoints = (): number => {
    return navigator.maxTouchPoints || 0
  }

  const detectPreferences = () => {
    return {
      colorScheme: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    }
  }

  const calculateDisplayMetrics = async () => {
    const screen = window.screen
    const dpr = window.devicePixelRatio || 1

    const availWidth = screen.availWidth
    const availHeight = screen.availHeight

    const standardRes = getStandardResolution(availWidth, availHeight)

    const prefs = detectPreferences()
    const hdrCapable = await detectHDRCapability()

    setMetrics({
      standardWidth: standardRes.width,
      standardHeight: standardRes.height,
      physicalWidth: screen.width * dpr,
      physicalHeight: screen.height * dpr,
      logicalWidth: window.innerWidth,
      logicalHeight: window.innerHeight,
      availWidth,
      availHeight,
      roundedAvailWidth: standardRes.width,
      roundedAvailHeight: standardRes.height,
      pixelRatio: dpr,
      colorDepth: screen.colorDepth,
      colorGamut: detectColorGamut(),
      orientation: screen.orientation?.type || "unknown",
      deviceType: detectDeviceType(),
      aspectRatio: calculateAspectRatio(standardRes.width, standardRes.height),
      scalingFactor: Math.round(dpr * 100),
      refreshRate: await detectRefreshRate(),
      monitors: await detectMonitorCount(),
      currentMonitor: getCurrentMonitor(),
      touchPoints: detectTouchPoints(),
      hdrCapable,
      preferredColorScheme: prefs.colorScheme,
      reducedMotion: prefs.reducedMotion,
      pixelWidth: screen.width,
      pixelHeight: screen.height,
      pixelDepth: screen.colorDepth,
    })
  }

  const detectRefreshRate = async (): Promise<number> => {
    if ("getScreenDetails" in window) {
      try {
        const screenDetails = await (
          window as { getScreenDetails?: () => Promise<{ currentScreen: { refreshRate: number } }> }
        ).getScreenDetails?.()
        const rate = screenDetails?.currentScreen.refreshRate
        if (rate && rate > 0) return Math.round(rate)
      } catch {
        // Fallback to frame counting method
      }
    }

    return new Promise((resolve) => {
      let frames = 0
      const prevTime = performance.now()

      function count(time: number) {
        frames++
        if (time - prevTime >= 1000) {
          resolve(Math.round(frames))
        } else {
          requestAnimationFrame(count)
        }
      }

      requestAnimationFrame(count)
    })
  }

  const detectMonitorCount = async (): Promise<number> => {
    if ("getScreenDetails" in window) {
      try {
        const screenDetails = await (
          window as { getScreenDetails?: () => Promise<{ screens: unknown[] }> }
        ).getScreenDetails?.()
        return screenDetails?.screens.length ?? estimateMonitorCount()
      } catch {
        return estimateMonitorCount()
      }
    }
    return estimateMonitorCount()
  }

  const estimateMonitorCount = (): number => {
    const totalWidth = window.screen.availWidth
    const primaryWidth = window.screen.width
    return Math.max(1, Math.round(totalWidth / primaryWidth))
  }

  const getCurrentMonitor = (): number => {
    const screenLeft = typeof window.screenLeft !== "undefined" ? window.screenLeft : window.screenX
    const screenWidth = window.screen.width
    return Math.max(1, Math.floor(screenLeft / screenWidth) + 1)
  }

  const detectColorGamut = (): string => {
    if (window.matchMedia("(color-gamut: rec2020)").matches) return "Rec. 2020"
    if (window.matchMedia("(color-gamut: p3)").matches) return "Display P3"
    if (window.matchMedia("(color-gamut: srgb)").matches) return "sRGB"
    return "Standard"
  }

  const detectDeviceType = (): string => {
    const ua = navigator.userAgent
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "Tablet"
    }
    if (
      /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)
    ) {
      return "Mobile"
    }
    return "Desktop"
  }

  const calculateAspectRatio = (width: number, height: number): string => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
    const divisor = gcd(width, height)
    return `${width / divisor}:${height / divisor}`
  }

  const getDeviceIcon = () => {
    const icons = {
      Mobile: <Smartphone className="w-8 h-8 text-primary" />,
      Tablet: <Tablet className="w-8 h-8 text-primary" />,
      Desktop:
        metrics.physicalWidth > 1440 ? (
          <Monitor className="w-8 h-8 text-primary" />
        ) : (
          <Laptop className="w-8 h-8 text-primary" />
        ),
    }
    return icons[metrics.deviceType as keyof typeof icons] || icons.Desktop
  }

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    toast.success("Copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopyDetails = () => {
    const info = Object.entries(metrics)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n")
    copyToClipboard(info)
  }

  const shareToSocialMedia = (platform: "facebook" | "twitter" | "linkedin") => {
    const text = `Check out my screen information: ${metrics.roundedAvailWidth}x${metrics.roundedAvailHeight}, ${metrics.deviceType}, ${metrics.colorGamut} color gamut`
    const url = encodeURIComponent(window.location.href)
    let shareUrl = ""

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(text)}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${encodeURIComponent("My Screen Information")}&summary=${encodeURIComponent(text)}`
        break
    }

    window.open(shareUrl, "_blank")
  }

  useEffect(() => {
    const handleResize = () => {
      calculateDisplayMetrics()
    }

    calculateDisplayMetrics()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [metrics])

  return (
    <ToolLayout
      title="Screen Resolution Checker"
      description="Check and analyze your screen resolution,Browser Resolution, color depth, refresh rate, pixel density, and HDR capabilities with our Advanced Screen Resolution Checker. Perfect for display analysis."
      toolId="678f383126f06f912191bcd0"
    >
  
      <div className="flex flex-col gap-8">
        {/* Main Screen Information Card */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-6">
              {getDeviceIcon()}
              <Button
                onClick={() => calculateDisplayMetrics()}
                className=" text-white shadow-md hover:shadow-lg transition-all duration-300"
                color="primary"
              >
                <RefreshCw className="mr-2" size={16} />
                Refresh
              </Button>
            </div>

            

            <Tabs
              aria-label="Screen Information Options"
              className="bg-background dark:bg-default-100 p-4 rounded-lg shadow-lg"
            >
              <Tab
                key="display"
                title={
                  <div className="flex items-center space-x-2">
                    <Monitor className="w-4 h-4" />
                    <span>Display</span>
                  </div>
                }
              > <div className="mt-4 space-y-4">
                <div className="mb-8 text-center p-8 border-2 border-default-200 rounded-xl">
              <h2 className="text-4xl font-bold mb-6">
                {metrics.roundedAvailWidth} × {metrics.roundedAvailHeight}
              </h2>
              <div className="space-y-2 text-lg">
                <p>
                  Screen Resolution:{" "}
                  <span className="font-semibold text-primary">
                    {metrics.availWidth} × {metrics.availHeight}
                  </span>
                </p>
                <p>
                  Browser Resolution:{" "}
                  <span className="font-semibold text-primary">
                    {metrics.logicalWidth} × {metrics.logicalHeight}
                  </span>
                </p>
                <p>
                  Standard Resolution:{" "}
                  <span className="font-semibold text-default-400">
                    {metrics.standardWidth} × {metrics.standardHeight}
                  </span>
                </p>
                <Button
                  color="primary"
                  className="mt-4"
                  onClick={() => {
                    const pixels = calculateTotalPixels(metrics.availWidth, metrics.availHeight)
                    toast.success(`Total pixels on your screen: ${pixels} million`)
                  }}
                >
                  Calculate Pixels
                </Button>
              </div>
            </div>

              </div>
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Display Resolution</h3>
                      <ul className="space-y-2">
                        <li>
                          Screen: {metrics.availWidth} × {metrics.availHeight}
                        </li>
                        <li>
                          Browser: {metrics.logicalWidth} × {metrics.logicalHeight}
                        </li>
                        <li>Aspect Ratio: {metrics.aspectRatio}</li>
                        <li>Pixel Density: {metrics.pixelRatio.toFixed(2)}x</li>
                        <li>Refresh Rate: {metrics.refreshRate}Hz</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Logical Display</h3>
                      <ul className="space-y-2">
                        <li>
                          Window: {metrics.logicalWidth} × {metrics.logicalHeight}
                        </li>
                        <li>
                          Physical: {metrics.physicalWidth} × {metrics.physicalHeight}
                        </li>
                        <li>Scaling: {metrics.scalingFactor}%</li>
                        <li>Touch Points: {metrics.touchPoints}</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Color Properties</h3>
                      <ul className="space-y-2">
                        <li>Depth: {metrics.colorDepth}-bit</li>
                        <li>Gamut: {metrics.colorGamut}</li>
                        <li>Scheme: {metrics.preferredColorScheme}</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">System Info</h3>
                      <ul className="space-y-2">
                        <li>Device: {metrics.deviceType}</li>
                        <li>
                          Monitors: {metrics.currentMonitor} of {metrics.monitors}
                        </li>
                        <li>Reduced Motion: {metrics.reducedMotion ? "Yes" : "No"}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab
                key="screen-resolution"
                title={
                  <div className="flex items-center space-x-2">
                    <Maximize className="w-4 h-4" />
                    <span>Screen Resolution</span>
                  </div>
                }
              >
                <div className="mt-4 space-y-4">
                  <div className="mb-8 text-center p-8 border-2 border-default-200 rounded-xl">
                    <h2 className="text-4xl font-bold mb-6">
                      {metrics.availWidth} × {metrics.availHeight}
                    </h2>
                    <div className="space-y-2 text-lg">
                      <p>
                        Aspect Ratio: <span className="font-semibold text-primary">{metrics.aspectRatio}</span>
                      </p>
                      <p>
                        Pixel Density:{" "}
                        <span className="font-semibold text-primary">{metrics.pixelRatio.toFixed(2)}x</span>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Resolution Details</h3>
                      <ul className="space-y-2">
                        <li>Width: {metrics.availWidth}px</li>
                        <li>Height: {metrics.availHeight}px</li>
                        <li>Total Pixels: {calculateTotalPixels(metrics.availWidth, metrics.availHeight)} million</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Display Properties</h3>
                      <ul className="space-y-2">
                        <li>Aspect Ratio: {metrics.aspectRatio}</li>
                        <li>Pixel Density: {metrics.pixelRatio.toFixed(2)}x</li>
                        <li>Scaling Factor: {metrics.scalingFactor}%</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab
                key="browser-resolution"
                title={
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4" />
                    <span>Browser Resolution</span>
                  </div>
                }
              >
                <div className="mt-4 space-y-4">
                  <div className="mb-8 text-center p-8 border-2 border-default-200 rounded-xl">
                    <h2 className="text-4xl font-bold mb-6">
                      {metrics.logicalWidth} × {metrics.logicalHeight}
                    </h2>
                    <div className="space-y-2 text-lg">
                      <p>
                        Aspect Ratio:{" "}
                        <span className="font-semibold text-primary">
                          {calculateAspectRatio(metrics.logicalWidth, metrics.logicalHeight)}
                        </span>
                      </p>
                      <p>
                        Viewport Scale:{" "}
                        <span className="font-semibold text-primary">
                          {((metrics.logicalWidth / metrics.availWidth) * 100).toFixed(2)}%
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Browser Window</h3>
                      <ul className="space-y-2">
                        <li>Width: {metrics.logicalWidth}px</li>
                        <li>Height: {metrics.logicalHeight}px</li>
                        <li>
                          Total Pixels: {calculateTotalPixels(metrics.logicalWidth, metrics.logicalHeight)} million
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Comparison</h3>
                      <ul className="space-y-2">
                        <li>Aspect Ratio: {calculateAspectRatio(metrics.logicalWidth, metrics.logicalHeight)}</li>
                        <li>
                          Difference from Screen: {metrics.logicalWidth - metrics.availWidth}px ×{" "}
                          {metrics.logicalHeight - metrics.availHeight}px
                        </li>
                        <li>
                          Percentage of Screen:{" "}
                          {(
                            ((metrics.logicalWidth * metrics.logicalHeight) /
                              (metrics.availWidth * metrics.availHeight)) *
                            100
                          ).toFixed(2)}
                          %
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab
                key="pixel-details"
                title={
                  <div className="flex items-center space-x-2">
                    <Grid className="w-4 h-4" />
                    <span>Pixel Details</span>
                  </div>
                }
              >
                <div className="mt-4 space-y-4">
                  <div className="mb-8 text-center p-8 border-2 border-default-200 rounded-xl">
                    <h2 className="text-4xl font-bold mb-6">
                      {metrics.pixelWidth} × {metrics.pixelHeight}
                    </h2>
                    <div className="space-y-2 text-lg">
                      <p>
                        Color Depth: <span className="font-semibold text-primary">{metrics.pixelDepth}-bit</span>
                      </p>
                      <p>
                        Total Pixels:{" "}
                        <span className="font-semibold text-primary">
                          {calculateTotalPixels(metrics.pixelWidth, metrics.pixelHeight)} million
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Pixel Dimensions</h3>
                      <ul className="space-y-2">
                        <li>Width: {metrics.pixelWidth}px</li>
                        <li>Height: {metrics.pixelHeight}px</li>
                        <li>Aspect Ratio: {calculateAspectRatio(metrics.pixelWidth, metrics.pixelHeight)}</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Color Information</h3>
                      <ul className="space-y-2">
                        <li>Color Depth: {metrics.pixelDepth}-bit</li>
                        <li>Color Gamut: {metrics.colorGamut}</li>
                        <li>HDR Capable: {metrics.hdrCapable ? "Yes" : "No"}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab
                key="visual"
                title={
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>Visual</span>
                  </div>
                }
              >
                <div className="mt-4 space-y-4">
                  <div className="relative mb-6 border-2 border-default-200 rounded-lg overflow-hidden">
                    <div className="relative mx-auto bg-default-100 p-4 aspect-video w-full">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-3xl font-bold mb-2">
                            {metrics.roundedAvailWidth} × {metrics.roundedAvailHeight}
                          </p>
                          <div className="flex items-center justify-center gap-2 text-sm text-default-400">
                            <span>{metrics.aspectRatio} aspect ratio</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {metrics.hdrCapable && (
                      <Card>
                        <CardBody>HDR is available on this display</CardBody>
                      </Card>
                    )}

                    {metrics.pixelRatio !== 1 && (
                      <Card>
                        <CardBody>Display scaling is set to {metrics.scalingFactor}%</CardBody>
                      </Card>
                    )}

                    {metrics.touchPoints > 0 && (
                      <Card>
                        <CardBody>Touch input available with {metrics.touchPoints} touch points</CardBody>
                      </Card>
                    )}

                    {metrics.monitors > 1 && (
                      <Card>
                        <CardBody>Multi-monitor setup detected ({metrics.monitors} displays)</CardBody>
                      </Card>
                    )}
                  </div>
                </div>
              </Tab>
            </Tabs>

            <div className="flex space-x-2 mt-6">
              <Button
                onClick={handleCopyDetails}
                className=" text-white shadow-md hover:shadow-lg transition-all duration-300"
                color="primary"
              >
                {copied ? <Check size={16} className="mr-2" /> : <Copy size={16} className="mr-2" />}
                {copied ? "Copied!" : "Copy Details"}
              </Button>
              <ShareButton
                onShare={shareToSocialMedia}
                className=" text-white bg-blue-500 shadow-md hover:shadow-lg transition-all duration-300"
                
              />
            </div>
          </CardBody>
        </Card>

        {/* Info Section */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                What is the Screen Resolution Checker?
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                The Advanced Screen Checker is a comprehensive tool designed to provide detailed information about your
                display and device capabilities. It offers insights into physical and logical display properties, color
                characteristics, and system information, making it invaluable for developers, designers, and tech
                enthusiasts.
              </p>

              <div className="my-8">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Screenshot of the Advanced Screen Checker interface showing various screen information and capabilities"
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
                How to Use the Screen Resolution Checker?
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                Using our Advanced Screen Checker is straightforward:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
                <li>Open the tool on the device you want to analyze.</li>
                <li>View the comprehensive display information in the main panel.</li>
                <li>
                  Use the tabs to switch between different types of information (Display, Screen Resolution, Browser
                  Resolution, Pixel Details).
                </li>
                <li>Use the "Refresh" button to update the information if needed.</li>
                <li>Copy all screen details to your clipboard with one click.</li>
                <li>Share your screen information on social media platforms using the theme-aware share button.</li>
              </ol>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Features That Make Us Stand Out
              </h2>
              <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
                <li>
                  <strong>Comprehensive Display Information:</strong> Get detailed insights into your screen's
                  capabilities
                </li>
                <li>
                  <strong>Multi-tab Interface:</strong> Easily navigate between different aspects of your display
                </li>
                <li>
                  <strong>Device Type Detection:</strong> Automatically identify whether you're using a desktop, tablet,
                  or mobile device
                </li>
                <li>
                  <strong>Color Properties:</strong> Learn about your screen's color depth, gamut, and HDR capabilities
                </li>
                <li>
                  <strong>Responsive Design:</strong> Use on any device with a consistent experience
                </li>
                <li>
                  <strong>One-click Sharing:</strong> Easily share your screen information with others
                </li>
                <li>
                  <strong>Visual Representation:</strong> See a visual depiction of your screen's aspect ratio
                </li>
              </ul>

              <p className="text-sm md:text-base text-default-600 mt-4">
                Ready to discover the full capabilities of your display? Dive into our Advanced Screen Checker and
                uncover detailed insights about your screen. Whether you're a developer optimizing your designs, a tech
                enthusiast curious about your hardware, or someone troubleshooting display issues, our tool provides the
                comprehensive information you need. Start exploring your screen's potential now!
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </ToolLayout>
  )
}

