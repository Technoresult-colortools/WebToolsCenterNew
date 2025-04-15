// components/QRCodePreview.tsx
import { useState } from "react"
import { Button, Select, SelectItem } from "@nextui-org/react"
import { Download } from "lucide-react"
import { toast } from "react-hot-toast"
import dynamic from "next/dynamic"
import QRCodeStyling from "qr-code-styling"

import type { ErrorCorrectionLevel, ExportFormat, BorderStyle, GradientType } from "./QRCodeGeneratorClient"

// Dynamically import the custom QR code component to avoid SSR issues
const CustomQRCode = dynamic(() => import("./CustomQRCode"), { ssr: false })

interface QRCodePreviewProps {
  qrValue: string
  size: number
  downloadSize: string
  setDownloadSize: (size: string) => void
  exportFormat: ExportFormat
  setExportFormat: (format: ExportFormat) => void
  fgColor: string
  bgColor: string
  eyeColor?: string
  bodyShape: string
  eyeFrameShape: string
  eyeBallShape: string
  errorCorrectionLevel: ErrorCorrectionLevel
  setErrorCorrectionLevel: (level: ErrorCorrectionLevel) => void
  includeMargin: boolean
  logoUrl?: string
  logoSize?: number
  borderSize?: number
  borderColor?: string
  backgroundColor?: string
  borderStyle?: BorderStyle
  isGradient?: boolean
  gradientColors?: string[]
  gradientType?: GradientType
  gradientRotation?: number
}

export const QRCodePreview: React.FC<QRCodePreviewProps> = ({
  qrValue,
  size,
  downloadSize,
  setDownloadSize,
  exportFormat,
  setExportFormat,
  fgColor,
  bgColor,
  eyeColor,
  bodyShape,
  eyeFrameShape,
  eyeBallShape,
  errorCorrectionLevel,
  setErrorCorrectionLevel,
  includeMargin,
  logoUrl,
  logoSize,
  borderSize,
  borderColor,
  backgroundColor,
  borderStyle,
  isGradient,
  gradientColors,
  gradientType,
  gradientRotation,
}) => {
  // Local ref to QR code for download functionality
  const [qrRef, setQrRef] = useState<any>(null)

  const handleDownload = () => {
    if (!qrRef) {
      toast.error("QR code reference not available")
      return
    }
  
    try {
      // Parse the size from string like "300x300px" to a number
      const sizeMatch = downloadSize.match(/(\d+)x(\d+)px/)
      const downloadWidth = sizeMatch ? parseInt(sizeMatch[1]) : 300
      
      // Create a temporary canvas at the requested size
      const canvas = document.createElement('canvas')
      canvas.width = downloadWidth
      canvas.height = downloadWidth
      
      // Create a temporary QR code at the requested size
      const tempQR = new QRCodeStyling({
        ...qrRef._options,  // Copy all current options
        width: downloadWidth,
        height: downloadWidth
      })
      
      // Render to canvas and download
      tempQR.append(document.createElement('div'))
      
      // Use a timeout to ensure the QR code is rendered before downloading
      setTimeout(() => {
        tempQR.download({
          name: "custom-qrcode",
          extension: exportFormat
        })
        toast.success(`QR code downloaded as ${exportFormat.toUpperCase()} at ${downloadSize}!`)
      }, 100)
    } catch (error) {
      console.error("Download error:", error)
      toast.error("Failed to download QR code")
    }
  }

  return (
    <div className="w-full md:w-[350px] bg-white dark:bg-default-200 p-4 rounded-lg shadow-md">
      <div className="flex justify-center items-center mb-4">
        <CustomQRCode
          value={qrValue}
          size={size}
          fgColor={fgColor}
          bgColor={bgColor}
          eyeColor={eyeColor}
          bodyShape={bodyShape}
          eyeFrameShape={eyeFrameShape}
          eyeBallShape={eyeBallShape}
          errorCorrectionLevel={errorCorrectionLevel}
          includeMargin={includeMargin}
          logoUrl={logoUrl}
          logoSize={logoSize}
          borderSize={borderSize}
          borderColor={borderColor}
          backgroundColor={backgroundColor}
          borderStyle={borderStyle}
          isGradient={isGradient}
          gradientColors={gradientColors}
          gradientType={gradientType}
          gradientRotation={gradientRotation}
          setQrRef={setQrRef}
        />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-default-700 mb-2">Error Level</label>
          <Select
            selectedKeys={[errorCorrectionLevel]}
            onChange={(e) => setErrorCorrectionLevel(e.target.value as ErrorCorrectionLevel)}
            variant="faded"
          >
            <SelectItem key="L" value="L" className="text-default-700">
              L - Low (7%)
            </SelectItem>
            <SelectItem key="M" value="M" className="text-default-700">
              M - Medium (15%)
            </SelectItem>
            <SelectItem key="Q" value="Q" className="text-default-700">
              Q - Optimally Damage Resistant (25%)
            </SelectItem>
            <SelectItem key="H" value="H" className="text-default-700">
              H - High (30%)
            </SelectItem>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-default-700 mb-2">Format</label>
            <Select
              selectedKeys={[exportFormat]}
              onChange={(e) => setExportFormat(e.target.value as ExportFormat)}
              variant="faded"
            >
              <SelectItem key="png" value="png" className="text-default-700">
                PNG
              </SelectItem>
              <SelectItem key="jpeg" value="jpeg" className="text-default-700">
                JPEG
              </SelectItem>
              <SelectItem key="svg" value="svg" className="text-default-700">
                SVG
              </SelectItem>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-default-700 mb-2">Size</label>
            <Select
              selectedKeys={[downloadSize]}
              onChange={(e) => setDownloadSize(e.target.value)}
              variant="faded"
            >
              <SelectItem key="200x200px" value="200x200px" className="text-default-700">
                200x200px
              </SelectItem>
              <SelectItem key="300x300px" value="300x300px" className="text-default-700">
                300x300px
              </SelectItem>
              <SelectItem key="500x500px" value="500x500px" className="text-default-700">
                500x500px
              </SelectItem>
              <SelectItem key="750x750px" value="750x750px" className="text-default-700">
                750x750px
              </SelectItem>
              <SelectItem key="1000x1000px" value="1000x1000px" className="text-default-700">
                1000x1000px
              </SelectItem>
            </Select>
          </div>
        </div>

        <Button color="primary" className="w-full" startContent={<Download />} onClick={handleDownload}>
          Download
        </Button>
      </div>
    </div>
  )
}