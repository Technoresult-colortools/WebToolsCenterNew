"use client"

import { useState, useEffect, useMemo } from "react"
import { AlertCircle, Copy, RefreshCw } from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import { toast } from "react-hot-toast"
import InfoSectionCmykToRgb from "./info-section"
import { Button, Card, CardBody, Input, Slider, Divider } from "@nextui-org/react"

// CMYK to RGB conversion function
const cmykToRgb = (c: number, m: number, y: number, k: number) => {
  const r = Math.round(255 * (1 - c / 100) * (1 - k / 100))
  const g = Math.round(255 * (1 - m / 100) * (1 - k / 100))
  const b = Math.round(255 * (1 - y / 100) * (1 - k / 100))
  return { r, g, b }
}

export default function CMYKToRGB() {
  const [cmyk, setCMYK] = useState({ c: 0, m: 0, y: 0, k: 0 })
  const [rgb, setRGB] = useState({ r: 255, g: 255, b: 255 })
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const { c, m, y, k } = cmyk
    if ([c, m, y, k].some((v) => v < 0 || v > 100)) {
      setError("Please enter valid CMYK values (0-100).")
    } else {
      setError("")
      setRGB(cmykToRgb(c, m, y, k))
    }
  }, [cmyk])

  const rgbString = useMemo(() => `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, [rgb])
  const hexString = useMemo(
    () =>
      `#${rgb.r.toString(16).padStart(2, "0")}${rgb.g.toString(16).padStart(2, "0")}${rgb.b.toString(16).padStart(2, "0")}`,
    [rgb],
  )
  const cmykString = useMemo(() => `${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%`, [cmyk])

  const handleCMYKChange = (color: keyof typeof cmyk, value: number) => {
    setCMYK((prev) => ({ ...prev, [color]: Math.max(0, Math.min(100, value)) }))
  }

  const handleReset = () => {
    setCMYK({ c: 0, m: 0, y: 0, k: 0 })
    setRGB({ r: 255, g: 255, b: 255 })
    setError("")
    toast.success("Values reset successfully")
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  return (
    <ToolLayout
      title="CMYK to RGB Converter"
      description="Convert CMYK Color Codes to RGB with Real-time Preview"
      toolId="678f382d26f06f912191bca8"
    >
      <div className="max-w-6xl mx-auto">
        <Card className="mb-8 bg-default-50 dark:bg-default-100">
          <CardBody className="gap-6 p-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Input Section */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">CMYK Input</h2>
                  <div className="space-y-4">
                    {["c", "m", "y", "k"].map((color) => (
                      <div key={color}>
                        <label className="text-sm font-medium block mb-2">{color.toUpperCase()} (0-100)</label>
                        <div className="flex items-center gap-4">
                          <Input
                            type="number"
                            value={cmyk[color as keyof typeof cmyk].toString()}
                            onChange={(e) => handleCMYKChange(color as keyof typeof cmyk, Number(e.target.value))}
                            className="w-20"
                            size="sm"
                            variant="bordered"
                            min={0}
                            max={100}
                          />
                          <Slider
                            aria-label={`${color.toUpperCase()} value`}
                            step={1}
                            maxValue={100}
                            minValue={0}
                            value={cmyk[color as keyof typeof cmyk]}
                            onChange={(value) =>
                              handleCMYKChange(color as keyof typeof cmyk, Array.isArray(value) ? value[0] : value)
                            }
                            className="flex-grow"
                          />
                        </div>
                      </div>
                    ))}
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
                  <div
                    className="w-full h-40 rounded-xl shadow-inner overflow-hidden"
                    style={{ backgroundColor: rgbString }}
                  />
                  <Divider className="my-4" />
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium block mb-2">CMYK Value</label>
                      <div className="flex items-center gap-2">
                        <Input value={cmykString} readOnly variant="bordered" size="lg" />
                        <Button isIconOnly variant="flat" size="lg" onClick={() => handleCopy(cmykString)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">RGB Value</label>
                      <div className="flex items-center gap-2">
                        <Input value={rgbString} readOnly variant="bordered" size="lg" />
                        <Button isIconOnly variant="flat" size="lg" onClick={() => handleCopy(rgbString)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">Hex Value</label>
                      <div className="flex items-center gap-2">
                        <Input value={hexString} readOnly variant="bordered" size="lg" />
                        <Button isIconOnly variant="flat" size="lg" onClick={() => handleCopy(hexString)}>
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
      <InfoSectionCmykToRgb />
    </ToolLayout>
  )
}

