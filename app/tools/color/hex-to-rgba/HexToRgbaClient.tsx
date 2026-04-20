"use client"

import { useState, useEffect, useMemo } from "react"
import { AlertCircle, Copy, RefreshCw } from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import { toast } from "react-hot-toast"
import InfoSectionHexToRgba from "./info-section"
import { Button, Card, CardBody, Input, Slider, Divider } from "@nextui-org/react"

// Move hexToRgba function outside of the component
const hexToRgba = (hex: string, alpha: number) => {
  hex = hex.replace(/^#/, "")

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }

  const r = Number.parseInt(hex.slice(0, 2), 16)
  const g = Number.parseInt(hex.slice(2, 4), 16)
  const b = Number.parseInt(hex.slice(4, 6), 16)

  return { r, g, b, a: alpha }
}

export default function HexToRgba() {
  const [hex, setHex] = useState<string>("#000000")
  const [alpha, setAlpha] = useState<number>(1)
  const [error, setError] = useState<string>("")
  const [rgba, setRGBA] = useState({ r: 0, g: 0, b: 0, a: 1 })

  useEffect(() => {
    const isValidHex = /^#?([0-9A-F]{3}){1,2}$/i.test(hex)
    if (!isValidHex) {
      setError("Please enter a valid Hex color code")
      return
    }
    setError("")
    const newRgba = hexToRgba(hex, alpha)
    setRGBA(newRgba)
  }, [hex, alpha]) // Remove hexToRgba from dependencies

  const rgbaString = useMemo(() => {
    return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a.toFixed(2)})`
  }, [rgba])

  const hexString = useMemo(() => {
    return hex.startsWith("#") ? hex : `#${hex}`
  }, [hex])

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHex(e.target.value)
  }

  const handleAlphaChange = (value: number) => {
    setAlpha(value)
  }

  const handleAlphaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value)
    if (!isNaN(value) && value >= 0 && value <= 1) {
      setAlpha(value)
    }
  }

  const handleReset = () => {
    setHex("#000000")
    setAlpha(1)
    setError("")
    toast.success("Values reset successfully")
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  return (
    <ToolLayout
      title="Hex to RGBA Converter"
      description="Convert Hex Color Codes to RGBA with Real-time Preview"
      toolId="678f382c26f06f912191bca4"
    >
      <div className="space-y-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="gap-6 p-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Input Section */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Color Input</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium block mb-2">Hex Color Code</label>
                      <Input
                        value={hex}
                        onChange={handleHexChange}
                        placeholder="#000000"
                        variant="bordered"
                        size="lg"
                        startContent={<div className="w-4 h-4 rounded-full" style={{ backgroundColor: hexString }} />}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">Alpha Value</label>
                      <div className="flex items-center gap-4">
                        <Input
                          type="number"
                          value={alpha.toString()}
                          onChange={handleAlphaInputChange}
                          className="w-26"
                          size="lg"
                          variant="bordered"
                          min={0}
                          max={1}
                          step={0.01}
                        />
                        <Slider
                          aria-label="Alpha"
                          step={0.01}
                          maxValue={1}
                          minValue={0}
                          value={alpha}
                          onChange={(value) => handleAlphaChange(Array.isArray(value) ? value[0] : value)}
                          className="flex-grow"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleReset}
                  color="danger"

                  startContent={<RefreshCw className="w-4 h-4" />}
                  className="w-full"
                >
                  Reset Values
                </Button>
              </div>

              {/* Preview Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Color Preview</h2>
                <div className="space-y-4">
                  <div className="relative w-full h-40 rounded-xl shadow-inner overflow-hidden">
                    <div
                      className="absolute inset-0 z-10"
                      style={{
                        backgroundColor: rgbaString,
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                        backgroundSize: "20px 20px",
                        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                      }}
                    />
                  </div>
                  <Divider className="my-4" />
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium block mb-2">Hex Value</label>
                      <div className="flex items-center gap-2">
                        <Input value={hexString} readOnly variant="bordered" size="lg" />
                        <Button isIconOnly variant="flat" size="lg" onClick={() => handleCopy(hexString)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">RGBA Value</label>
                      <div className="flex items-center gap-2">
                        <Input value={rgbaString} readOnly variant="bordered" size="lg" />
                        <Button isIconOnly variant="flat" size="lg" onClick={() => handleCopy(rgbaString)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-danger-50 text-danger-foreground rounded-lg flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                {error}
              </div>
            )}
          </CardBody>
        </Card>


      </div>
      <InfoSectionHexToRgba />
    </ToolLayout>
  )
}

