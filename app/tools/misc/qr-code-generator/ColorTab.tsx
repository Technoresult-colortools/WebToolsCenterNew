// components/ColorTab.tsx
import React from "react"
import { Card, CardBody, RadioGroup, Radio, Checkbox, Slider } from "@nextui-org/react"

interface ColorTabProps {
  qrFgColor: string
  setQrFgColor: (color: string) => void
  qrBgColor: string
  setQrBgColor: (color: string) => void
  isGradient: boolean
  setIsGradient: (isGradient: boolean) => void
  gradientColors: string[]
  setGradientColors: (colors: string[]) => void
  gradientType: "linear" | "radial"
  setGradientType: (type: "linear" | "radial") => void
  gradientRotation: number
  setGradientRotation: (rotation: number) => void
  useCustomEyeColor: boolean
  setUseCustomEyeColor: (useCustom: boolean) => void
  eyeColor: string
  setEyeColor: (color: string) => void
}

export const ColorTab: React.FC<ColorTabProps> = ({
  qrFgColor,
  setQrFgColor,
  qrBgColor,
  setQrBgColor,
  isGradient,
  setIsGradient,
  gradientColors,
  setGradientColors,
  gradientType,
  setGradientType,
  gradientRotation,
  setGradientRotation,
  useCustomEyeColor,
  setUseCustomEyeColor,
  eyeColor,
  setEyeColor,
}) => {
  const handleGradientColor1Change = (color: string) => {
    setGradientColors([color, gradientColors[1]])
  }

  const handleGradientColor2Change = (color: string) => {
    setGradientColors([gradientColors[0], color])
  }

  return (
    <div className="space-y-6">
      {/* Foreground Color */}
      <div>
        <h3 className="text-md font-semibold mb-2">Foreground Color</h3>
        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm">Select QR code color</span>
                <div className="flex gap-4 mt-2">
                  <div 
                    className="w-8 h-8 rounded cursor-pointer border border-default-300"
                    style={{ backgroundColor: "#000000" }}
                    onClick={() => setQrFgColor("#000000")}
                  />
                  <div 
                    className="w-8 h-8 rounded cursor-pointer border border-default-300"
                    style={{ backgroundColor: "#3B82F6" }}
                    onClick={() => setQrFgColor("#3B82F6")}
                  />
                  <div 
                    className="w-8 h-8 rounded cursor-pointer border border-default-300"
                    style={{ backgroundColor: "#10B981" }}
                    onClick={() => setQrFgColor("#10B981")}
                  />
                  <div 
                    className="w-8 h-8 rounded cursor-pointer border border-default-300"
                    style={{ backgroundColor: "#F59E0B" }}
                    onClick={() => setQrFgColor("#F59E0B")}
                  />
                  <div 
                    className="w-8 h-8 rounded cursor-pointer border border-default-300"
                    style={{ backgroundColor: "#EF4444" }}
                    onClick={() => setQrFgColor("#EF4444")}
                  />
                </div>
              </div>
              <input
                type="color"
                value={qrFgColor}
                onChange={(e) => setQrFgColor(e.target.value)}
                className="mt-6 w-10 h-10 cursor-pointer rounded"
              />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Custom Eye Color */}
      <div>
        <h3 className="text-md font-semibold mb-2">Eye Color</h3>
        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <Checkbox
                isSelected={useCustomEyeColor}
                onValueChange={setUseCustomEyeColor}
              >
                Use Custom Eye Color
              </Checkbox>
              <div className="flex items-center gap-3">
                {useCustomEyeColor && (
                  <span className="text-sm">Select color:</span>
                )}
                <input
                  type="color"
                  value={eyeColor}
                  onChange={(e) => setEyeColor(e.target.value)}
                  disabled={!useCustomEyeColor}
                  className="w-8 h-8 cursor-pointer rounded"
                />
              </div>
            </div>
            {useCustomEyeColor && (
              <div className="flex gap-4 mt-4">
                <div 
                  className="w-8 h-8 rounded cursor-pointer border border-default-300"
                  style={{ backgroundColor: "#000000" }}
                  onClick={() => setEyeColor("#000000")}
                />
                <div 
                  className="w-8 h-8 rounded cursor-pointer border border-default-300"
                  style={{ backgroundColor: "#3B82F6" }}
                  onClick={() => setEyeColor("#3B82F6")}
                />
                <div 
                  className="w-8 h-8 rounded cursor-pointer border border-default-300"
                  style={{ backgroundColor: "#10B981" }}
                  onClick={() => setEyeColor("#10B981")}
                />
                <div 
                  className="w-8 h-8 rounded cursor-pointer border border-default-300"
                  style={{ backgroundColor: "#F59E0B" }}
                  onClick={() => setEyeColor("#F59E0B")}
                />
                <div 
                  className="w-8 h-8 rounded cursor-pointer border border-default-300"
                  style={{ backgroundColor: "#EF4444" }}
                  onClick={() => setEyeColor("#EF4444")}
                />
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Background Color */}
      <div>
        <h3 className="text-md font-semibold mb-2">Background Color</h3>
        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm">Select background color</span>
                <div className="flex gap-4 mt-2">
                  <div 
                    className="w-8 h-8 rounded cursor-pointer border border-default-300"
                    style={{ backgroundColor: "#FFFFFF" }}
                    onClick={() => setQrBgColor("#FFFFFF")}
                  />
                  <div 
                    className="w-8 h-8 rounded cursor-pointer border border-default-300"
                    style={{ backgroundColor: "#EFF6FF" }}
                    onClick={() => setQrBgColor("#EFF6FF")}
                  />
                  <div 
                    className="w-8 h-8 rounded cursor-pointer border border-default-300"
                    style={{ backgroundColor: "#ECFDF5" }}
                    onClick={() => setQrBgColor("#ECFDF5")}
                  />
                  <div 
                    className="w-8 h-8 rounded cursor-pointer border border-default-300"
                    style={{ backgroundColor: "#FEF3C7" }}
                    onClick={() => setQrBgColor("#FEF3C7")}
                  />
                  <div 
                    className="w-8 h-8 rounded cursor-pointer border border-default-300"
                    style={{ backgroundColor: "#FEE2E2" }}
                    onClick={() => setQrBgColor("#FEE2E2")}
                  />
                </div>
              </div>
              <input
                type="color"
                value={qrBgColor}
                onChange={(e) => setQrBgColor(e.target.value)}
                className="mt-6 w-10 h-10 cursor-pointer rounded"
              />
            </div>
          </CardBody>
        </Card>
      </div>
      
      {/* Gradient Options */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-md font-semibold">Gradient</h3>
          <Checkbox isSelected={isGradient} onValueChange={setIsGradient}>
            Use Gradient
          </Checkbox>
        </div>
        
        {isGradient && (
          <Card>
            <CardBody className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Color 1:</span>
                <input
                  type="color"
                  value={gradientColors[0]}
                  onChange={(e) => handleGradientColor1Change(e.target.value)}
                  className="w-8 h-8 cursor-pointer rounded"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span>Color 2:</span>
                <input
                  type="color"
                  value={gradientColors[1]}
                  onChange={(e) => handleGradientColor2Change(e.target.value)}
                  className="w-8 h-8 cursor-pointer rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm mb-2">Gradient Type</label>
                <RadioGroup
                  value={gradientType}
                  onValueChange={(value) => setGradientType(value as "linear" | "radial")}
                  orientation="horizontal"
                >
                  <Radio value="linear">Linear</Radio>
                  <Radio value="radial">Radial</Radio>
                </RadioGroup>
              </div>
              
              {gradientType === "linear" && (
                <div>
                  <label className="block text-sm mb-2">Rotation: {gradientRotation}°</label>
                  <Slider
                    step={15}
                    maxValue={360}
                    minValue={0}
                    value={gradientRotation}
                    onChange={(value) => setGradientRotation(value as number)}
                    className="max-w-md"
                  />
                </div>
              )}
              
              <div className="h-10 w-full rounded-md mt-2" style={{
                background: gradientType === "linear" 
                  ? `linear-gradient(${gradientRotation}deg, ${gradientColors[0]}, ${gradientColors[1]})`
                  : `radial-gradient(circle, ${gradientColors[0]}, ${gradientColors[1]})`
              }} />
            </CardBody>
          </Card>
        )}
      </div>
    </div>
    
  )
}