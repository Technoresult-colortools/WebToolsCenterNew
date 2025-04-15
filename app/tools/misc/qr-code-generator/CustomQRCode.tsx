import React, { useEffect, useRef } from "react"
import QRCodeStyling from "qr-code-styling"
import type { BorderStyle, GradientType } from "./QRCodeGeneratorClient"

interface CustomQRCodeProps {
  value: string
  size: number
  fgColor: string
  bgColor: string
  eyeColor?: string
  bodyShape: string
  eyeFrameShape: string
  eyeBallShape: string
  errorCorrectionLevel: "L" | "M" | "Q" | "H"
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
  setQrRef?: (ref: any) => void
}

const CustomQRCode: React.FC<CustomQRCodeProps> = ({
  value,
  size,
  fgColor,
  bgColor,
  eyeColor,
  bodyShape,
  eyeFrameShape,
  eyeBallShape,
  errorCorrectionLevel,
  includeMargin,
  logoUrl,
  logoSize = 25, // Default to 25% of QR code size
  borderSize = 0,
  borderColor = "#000000",
  backgroundColor = "#FFFFFF",
  borderStyle = "solid",
  isGradient = false,
  gradientColors = ["#000000", "#000000"],
  gradientType = "linear",
  gradientRotation = 0,
  setQrRef,
}) => {
  const qrCodeRef = useRef<HTMLDivElement>(null)
  const qrCode = useRef<any>(null)

  // Convert our shape types to the library's expected format
  const getDotsType = (shape: string) => {
    switch (shape) {
      case "rounded":
        return "rounded"
      case "dots":
        return "dots"
      case "classy":
        return "classy"
      case "classy-rounded":
        return "classy-rounded"
      default:
        return "square"
    }
  }

  // Ensure we only return valid types for the library
  const getCornerSquareType = (shape: string) => {
    switch (shape) {
      case "rounded":
        return "rounded"
      case "circle":
        return "dot"
      case "leaf":
        return "extra-rounded"
      case "shield":
        return "extra-rounded"
      default:
        return "square"
    }
  }

  // Ensure we only return valid types for the library
  const getCornerDotType = (shape: string) => {
    switch (shape) {
      case "rounded":
        return "rounded"
      case "circle":
        return "dot"
      case "diamond":
        return "square"
      case "dot":
        return "dot"
      default:
        return "square"
    }
  }

  useEffect(() => {
    if (!qrCodeRef.current) return

    // Configure dots options with proper gradient handling
    let dotsOptions: any = {
      type: getDotsType(bodyShape),
    }

    // This is the key change: Use proper gradient structure
    if (isGradient && gradientColors && gradientColors.length >= 2) {
      dotsOptions.gradient = {
        type: gradientType,
        rotation: gradientRotation,
        colorStops: [
          { offset: 0, color: gradientColors[0] },
          { offset: 1, color: gradientColors[1] },
        ],
      }
    } else {
      dotsOptions.color = fgColor;
    }

    // Configure eye options with proper gradient/color handling
    let cornersSquareOptions: any = {
      type: getCornerSquareType(eyeFrameShape),
    }
    
    let cornersDotOptions: any = {
      type: getCornerDotType(eyeBallShape),
    }
    
    // Use eyeColor if provided, otherwise use the same color/gradient as dots
    if (eyeColor) {
      cornersSquareOptions.color = eyeColor;
      cornersDotOptions.color = eyeColor;
    } else if (isGradient && gradientColors && gradientColors.length >= 2) {
      cornersSquareOptions.gradient = {
        type: gradientType,
        rotation: gradientRotation,
        colorStops: [
          { offset: 0, color: gradientColors[0] },
          { offset: 1, color: gradientColors[1] },
        ],
      };
      cornersDotOptions.gradient = {
        type: gradientType,
        rotation: gradientRotation,
        colorStops: [
          { offset: 0, color: gradientColors[0] },
          { offset: 1, color: gradientColors[1] },
        ],
      };
    } else {
      cornersSquareOptions.color = fgColor;
      cornersDotOptions.color = fgColor;
    }

    // Create the QR code configuration object
    const qrCodeConfig: any = {
      width: size,
      height: size,
      type: "svg",
      data: value || "https://example.com", // Provide a default value to prevent errors
      margin: includeMargin ? 10 : 0,
      qrOptions: {
        errorCorrectionLevel,
      },
      dotsOptions,
      cornersSquareOptions,
      cornersDotOptions,
      backgroundOptions: {
        color: bgColor,
      },
    }

    // Only add image options if a logo URL is provided
    if (logoUrl) {
      // FIX 1: Use image property correctly
      qrCodeConfig.image = logoUrl;
      
      // FIX 2: Use imageOptions property correctly
      qrCodeConfig.imageOptions = {
        crossOrigin: "anonymous",
        margin: 5,
        hideBackgroundDots: true,
        imageSize: logoSize / 100, // Convert percentage to ratio (0-1)
      }
      
      // Ensure higher error correction level when using logo
      if (errorCorrectionLevel === "L" || errorCorrectionLevel === "M") {
        console.warn("Using a logo with low error correction may reduce scanability. Consider using 'Q' or 'H' level.");
      }
    }

    try {
      // Initialize QR code with styling
      qrCode.current = new QRCodeStyling(qrCodeConfig)

      // Pass the qrCode reference to parent if needed
      if (setQrRef) {
        setQrRef(qrCode.current)
      }

      // Clear previous QR code and append the new one
      if (qrCodeRef.current) {
        qrCodeRef.current.innerHTML = ""
        qrCode.current.append(qrCodeRef.current)
      }
    } catch (error) {
        console.error("Error creating QR code:", error)
    }
  }, [
    value,
    size,
    fgColor,
    bgColor,
    eyeColor,
    bodyShape,
    eyeFrameShape,
    eyeBallShape,
    errorCorrectionLevel,
    includeMargin,
    logoUrl,
    logoSize,
    isGradient,
    gradientColors,
    gradientType,
    gradientRotation,
  ])

  // Apply container styles with border, background, etc.
  const containerStyle = {
    padding: `${borderSize}px`,
    backgroundColor: backgroundColor,
    borderRadius: `${borderSize > 0 ? 8 : 0}px`,
    border: borderSize > 0 ? `${borderSize}px ${borderStyle} ${borderColor}` : "none",
    display: "inline-block",
    boxSizing: "border-box" as const,
    maxWidth: "100%",
  }

  const qrContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: bgColor,
  }

  return (
    <div style={containerStyle}>
      <div style={qrContainerStyle}>
        <div ref={qrCodeRef} />
      </div>
    </div>
  )
}

export default CustomQRCode