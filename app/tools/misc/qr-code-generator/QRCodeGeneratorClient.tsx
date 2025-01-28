"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import {
  Button,
  Input,
  Switch,
  Select,
  SelectItem,
  Slider,
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react"
import { toast } from "react-hot-toast"
import {
  Download,
  FileText,
  Brush,
  Sliders,
  ImageIcon,
  Info,
  BookOpen,
  Lightbulb,
  Share2,
  Settings,
} from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import NextImage from "next/image"
import type { QRCodeSVG } from "qrcode.react"

type QRCodeType = "url" | "text" | "email" | "phone" | "sms" | "wifi"
type ErrorCorrectionLevel = "L" | "M" | "Q" | "H"
type BorderStyle = "solid" | "dashed" | "dotted" | "double" | "groove" | "ridge" | "inset" | "outset"

const QRCode = dynamic<React.ComponentProps<typeof QRCodeSVG>>(
  () => import("qrcode.react").then((mod) => mod.QRCodeSVG),
  { ssr: false },
)

export default function QRCodeGenerator() {
  const [qrType, setQRType] = useState<QRCodeType>("url")
  const [qrValue, setQRValue] = useState<string>("")
  const [qrSize, setQRSize] = useState<number>(256)
  const [qrFgColor, setQrFgColor] = useState<string>("#000000")
  const [qrBgColor, setQrBgColor] = useState<string>("#ffffff")
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<ErrorCorrectionLevel>("M")
  const [includeMargin, setIncludeMargin] = useState<boolean>(true)
  const [logoUrl, setLogoUrl] = useState<string>("")
  const [logoSize, setLogoSize] = useState<number>(50)
  const [qrStyle, setQrStyle] = useState<"squares" | "dots">("squares")

  // Border state
  const [borderSize, setBorderSize] = useState<number>(0)
  const [borderColor, setBorderColor] = useState<string>("#000000")
  const [borderStyle, setBorderStyle] = useState<BorderStyle>("solid")
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff")

  const [emailSubject, setEmailSubject] = useState<string>("")
  const [emailBody, setEmailBody] = useState<string>("")
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [smsBody, setSmsBody] = useState<string>("")
  const [wifiSsid, setWifiSsid] = useState<string>("")
  const [wifiPassword, setWifiPassword] = useState<string>("")
  const [wifiEncryption, setWifiEncryption] = useState<"WEP" | "WPA" | "nopass">("WPA")

  const qrCodeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    generateQRValue()
  }, [
    qrType,
    qrValue,
    qrSize,
    qrFgColor,
    qrBgColor,
    errorCorrectionLevel,
    includeMargin,
    logoUrl,
    logoSize,
    qrStyle,
    borderSize,
    borderColor,
    borderStyle,
    backgroundColor,
    emailSubject,
    emailBody,
    phoneNumber,
    smsBody,
    wifiSsid,
    wifiPassword,
    wifiEncryption,
  ])

  const generateQRValue = () => {
    switch (qrType) {
      case "url":
      case "text":
        return qrValue
      case "email":
        return `mailto:${qrValue}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
      case "phone":
        return `tel:${phoneNumber}`
      case "sms":
        return `sms:${phoneNumber}${smsBody ? `?body=${encodeURIComponent(smsBody)}` : ""}`
      case "wifi":
        return `WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiPassword};;`
      default:
        return ""
    }
  }

  const handleDownload = () => {
    if (qrCodeRef.current) {
      const svgElement = qrCodeRef.current.querySelector("svg")
      if (!svgElement) return

      const canvas = document.createElement("canvas")
      const totalSize = qrSize + borderSize * 2
      canvas.width = totalSize
      canvas.height = totalSize
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, totalSize, totalSize)

      const svgData = new XMLSerializer().serializeToString(svgElement)
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
      const URL = window.URL || window.webkitURL || window
      const svgUrl = URL.createObjectURL(svgBlob)

      const img = new Image()
      img.onload = () => {
        ctx.drawImage(img, borderSize, borderSize, qrSize, qrSize)

        ctx.strokeStyle = borderColor
        ctx.lineWidth = borderSize

        switch (borderStyle) {
          case "dashed":
            ctx.setLineDash([5, 5])
            break
          case "dotted":
            ctx.setLineDash([2, 2])
            break
          default:
            ctx.setLineDash([])
        }

        if (borderSize > 0) {
          ctx.strokeRect(borderSize / 2, borderSize / 2, totalSize - borderSize, totalSize - borderSize)
        }

        const pngUrl = canvas.toDataURL("image/png")
        const downloadLink = document.createElement("a")
        downloadLink.href = pngUrl
        downloadLink.download = "qrcode.png"
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
        URL.revokeObjectURL(svgUrl)
        toast.success("QR Code downloaded successfully!")
      }
      img.src = svgUrl
    }
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <ToolLayout
      title="Advanced QR Code Generator"
      description="Create Customized QR Code for various purposes"
      toolId="678f383026f06f912191bccd"
    >
      <div className="flex flex-col gap-8">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">QR Code Preview</h2>
          </CardHeader>
          <CardBody className="flex justify-center items-center p-8">
            <div
              ref={qrCodeRef}
              className="p-4 rounded-lg"
              style={{
                backgroundColor: backgroundColor,
                border: `${borderSize}px ${borderStyle} ${borderColor}`,
              }}
            >
              <QRCode
                value={generateQRValue()}
                size={qrSize}
                fgColor={qrFgColor}
                bgColor={qrBgColor}
                level={errorCorrectionLevel}
                includeMargin={includeMargin}
                imageSettings={
                    logoUrl
                    ? {
                        src: logoUrl,
                        height: logoSize,
                        width: logoSize,
                        excavate: true,
                        }
                    : undefined
                }
                style={{
                    width: "100%",
                    height: "100%",
                    maxWidth: `${qrSize}px`,
                    maxHeight: `${qrSize}px`,
                }}
                {...(qrStyle === "dots" ? { 
                    renderas: "svg", 
                    dotsoptions: { 
                    type: "rounded", 
                    color: qrFgColor 
                    } 
                } : {})}
                />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">QR Code Settings</h2>
          </CardHeader>
          <CardBody>
            <Tabs aria-label="QR Code Options">
              <Tab
                key="content"
                title={
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Content</span>
                  </div>
                }
              >
                <div className="mt-4 space-y-4">
                  <Select
                    label="QR Code Type"
                    placeholder="Select QR code type"
                    selectedKeys={[qrType]}
                    variant="bordered"
                    onChange={(e) => setQRType(e.target.value as QRCodeType)}
                    classNames={{
                        trigger: "bg-default-100 data-[hover=true]:bg-default-200",
                      }}
                  >
                    <SelectItem key="url" value="url" className="text-default-700">
                      URL
                    </SelectItem>
                    <SelectItem key="text" value="text" className="text-default-700">
                      Text
                    </SelectItem>
                    <SelectItem key="email" value="email" className="text-default-700">
                      Email
                    </SelectItem>
                    <SelectItem key="phone" value="phone" className="text-default-700">
                      Phone
                    </SelectItem>
                    <SelectItem key="sms" value="sms" className="text-default-700">
                      SMS
                    </SelectItem>
                    <SelectItem key="wifi" value="wifi" className="text-default-700">
                      Wi-Fi
                    </SelectItem>
                  </Select>

                  {qrType === "url" && (
                    <Input
                      type="url"
                      label="URL"
                      variant="bordered"
                      placeholder="https://example.com"
                      value={qrValue}
                      onChange={(e) => setQRValue(e.target.value)}
                    />
                  )}

                  {qrType === "text" && (
                    <Input
                      type="text"
                      label="Text"
                      variant="bordered"
                      placeholder="Enter your text here"
                      value={qrValue}
                      onChange={(e) => setQRValue(e.target.value)}
                    />
                  )}

                  {qrType === "email" && (
                    <>
                      <Input
                        type="email"
                        label="Email Address"
                        variant="bordered"
                        placeholder="example@example.com"
                        value={qrValue}
                        onChange={(e) => setQRValue(e.target.value)}
                      />
                      <Input
                        type="text"
                        label="Subject"
                        placeholder="Email subject"
                        variant="bordered"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                      />
                      <Input
                        type="text"
                        label="Body"
                        placeholder="Email body"
                        variant="bordered"
                        value={emailBody}
                        onChange={(e) => setEmailBody(e.target.value)}
                      />
                    </>
                  )}

                  {qrType === "phone" && (
                    <Input
                      type="tel"
                      label="Phone Number"
                      variant="bordered"
                      placeholder="+1234567890"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  )}

                  {qrType === "sms" && (
                    <>
                      <Input
                        type="tel"
                        label="Phone Number"
                        variant="bordered"
                        placeholder="+1234567890"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                      <Input
                        type="text"
                        label="Message"
                        variant="bordered"
                        placeholder="SMS message"
                        value={smsBody}
                        onChange={(e) => setSmsBody(e.target.value)}
                      />
                    </>
                  )}

                  {qrType === "wifi" && (
                    <>
                      <Input
                        type="text"
                        label="Network Name (SSID)"
                        variant="bordered"
                        placeholder="Wi-Fi network name"
                        value={wifiSsid}
                        onChange={(e) => setWifiSsid(e.target.value)}
                      />
                      <Input
                        type="password"
                        label="Password"
                        variant="bordered"
                        placeholder="Wi-Fi password"
                        value={wifiPassword}
                        onChange={(e) => setWifiPassword(e.target.value)}
                      />
                      <Select
                        label="Encryption"
                        placeholder="Select encryption type"
                        variant="bordered"
                        selectedKeys={[wifiEncryption]}
                        onChange={(e) => setWifiEncryption(e.target.value as "WEP" | "WPA" | "nopass")}
                        classNames={{
                            trigger: "bg-default-100 data-[hover=true]:bg-default-200",
                          }}
                      >
                        <SelectItem key="WEP" value="WEP" className="text-default-700">
                          WEP
                        </SelectItem>
                        <SelectItem key="WPA" value="WPA" className="text-default-700">
                          WPA/WPA2
                        </SelectItem>
                        <SelectItem key="nopass" value="nopass" className="text-default-700">
                          No encryption
                        </SelectItem>
                      </Select>
                    </>
                  )}
                </div>
              </Tab>
              <Tab
                key="appearance"
                title={
                  <div className="flex items-center space-x-2">
                    <Brush className="w-4 h-4" />
                    <span>Appearance</span>
                  </div>
                }
              >
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-small text-default-500 mb-2">
                      QR Code Size: {qrSize}x{qrSize}
                    </p>
                    <Slider
                      size="sm"
                      step={8}
                      maxValue={512}
                      minValue={128}
                      value={qrSize}
                      onChange={(value) => setQRSize(value as number)}
                      className="max-w-md"
                    />
                  </div>
                  <Select
                    label="QR Code Style"
                    placeholder="Select QR code style"
                    selectedKeys={[qrStyle]}
                    variant="bordered"
                    onChange={(e) => setQrStyle(e.target.value as "squares" | "dots")}
                    classNames={{
                        trigger: "bg-default-100 data-[hover=true]:bg-default-200",
                      }}
                  >
                    <SelectItem key="squares" value="squares" className="text-default-700">
                      Squares
                    </SelectItem>
                    <SelectItem key="dots" value="dots" className="text-default-700">
                      Dots
                    </SelectItem>
                  </Select>
                  <div>
                    <p className="text-small text-default-500 mb-2">Foreground Color</p>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="color"
                        value={qrFgColor}
                        onChange={(e) => setQrFgColor(e.target.value)}
                        className="w-14 h-14 p-1"
                        variant="bordered"
                      />
                      <Input
                        type="text"
                        value={qrFgColor}
                        onChange={(e) => setQrFgColor(e.target.value)}
                        className="flex-grow"
                        variant="bordered"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-small text-default-500 mb-2">Background Color</p>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="color"
                        value={qrBgColor}
                        onChange={(e) => setQrBgColor(e.target.value)}
                        className="w-14 h-14 p-1"
                        variant="bordered"
                      />
                      <Input
                        type="text"
                        value={qrBgColor}
                        onChange={(e) => setQrBgColor(e.target.value)}
                        className="flex-grow"
                        variant="bordered"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-small text-default-500 mb-2">Border Size: {borderSize}px</p>
                    <Slider
                      size="sm"
                      step={1}
                      maxValue={20}
                      minValue={0}
                      value={borderSize}
                      onChange={(value) => setBorderSize(value as number)}
                      className="max-w-md"
                    />
                  </div>
                  <div>
                    <p className="text-small text-default-500 mb-2">Border Color</p>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="color"
                        value={borderColor}
                        variant="bordered"
                        onChange={(e) => setBorderColor(e.target.value)}
                        className="w-14 h-14 p-1"
                      />
                      <Input
                        type="text"
                        value={borderColor}
                        onChange={(e) => setBorderColor(e.target.value)}
                        className="flex-grow"
                      />
                    </div>
                  </div>
                  <Select
                    label="Border Style"
                    placeholder="Select border style"
                    variant="bordered"
                    selectedKeys={[borderStyle]}
                    onChange={(e) => setBorderStyle(e.target.value as BorderStyle)}
                    classNames={{
                        trigger: "bg-default-100 data-[hover=true]:bg-default-200",
                      }}
                  >
                    <SelectItem key="solid" value="solid" className="text-default-700">
                      Solid
                    </SelectItem>
                    <SelectItem key="dashed" value="dashed" className="text-default-700">
                      Dashed
                    </SelectItem>
                    <SelectItem key="dotted" value="dotted" className="text-default-700">
                      Dotted
                    </SelectItem>
                    <SelectItem key="double" value="double" className="text-default-700">
                      Double
                    </SelectItem>
                    <SelectItem key="groove" value="groove" className="text-default-700">
                      Groove
                    </SelectItem>
                    <SelectItem key="ridge" value="ridge" className="text-default-700">
                      Ridge
                    </SelectItem>
                    <SelectItem key="inset" value="inset" className="text-default-700">
                      Inset
                    </SelectItem>
                    <SelectItem key="outset" value="outset" className="text-default-700">
                      Outset
                    </SelectItem>
                  </Select>
                  <div>
                    <p className="text-small text-default-500 mb-2">Background Color</p>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="color"
                        value={backgroundColor}
                        variant="bordered"
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="w-14 h-14 p-1"
                      />
                      <Input
                        type="text"
                        value={backgroundColor}
                        variant="bordered"
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="flex-grow"
                      />
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab
                key="advanced"
                title={
                  <div className="flex items-center space-x-2">
                    <Sliders className="w-4 h-4" />
                    <span>Advanced</span>
                  </div>
                }
              >
                <div className="mt-4 space-y-4">
                  <Select
                    label="Error Correction Level"
                    placeholder="Select error correction level"
                    selectedKeys={[errorCorrectionLevel]}
                    variant="bordered"
                    onChange={(e) => setErrorCorrectionLevel(e.target.value as ErrorCorrectionLevel)}
                    classNames={{
                        trigger: "bg-default-100 data-[hover=true]:bg-default-200",
                      }}
                  >
                    <SelectItem key="L" value="L" className="text-default-700">
                      Low (7%)
                    </SelectItem>
                    <SelectItem key="M" value="M" className="text-default-700">
                      Medium (15%)
                    </SelectItem>
                    <SelectItem key="Q" value="Q" className="text-default-700">
                      Quartile (25%)
                    </SelectItem>
                    <SelectItem key="H" value="H" className="text-default-700">
                      High (30%)
                    </SelectItem>
                  </Select>
                  <div className="flex justify-between items-center">
                    <span>Include Margin</span>
                    <Switch checked={includeMargin} onChange={(e) => setIncludeMargin(e.target.checked)} />
                  </div>
                </div>
              </Tab>
              <Tab
                key="logo"
                title={
                  <div className="flex items-center space-x-2">
                    <ImageIcon className="w-4 h-4" />
                    <span>Logo</span>
                  </div>
                }
              >
                <div className="mt-4 space-y-4">
                    <Input 
                        type="file" 
                        label="Upload Logo (optional)" 
                        accept="image/*" 
                        onChange={handleLogoUpload} 
                        variant="bordered"
                    />
                    {logoUrl && (
                        <div className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-24 h-24 border rounded flex items-center justify-center">
                            <img 
                                src={logoUrl} 
                                alt="Logo Preview" 
                                className="max-w-full max-h-full object-contain"
                            />
                            </div>
                            <div className="flex-grow">
                            <p className="text-small text-default-500 mb-2">
                                Logo Size: {logoSize}x{logoSize}
                            </p>
                            <Slider
                                size="sm"
                                step={5}
                                maxValue={150}
                                minValue={20}
                                value={logoSize}
                                onChange={(value) => setLogoSize(value as number)}
                                className="max-w-md"
                            />
                            </div>
                        </div>
                        <Button 
                            color="danger" 
                            variant="light" 
                            onClick={() => {
                            setLogoUrl('');
                            setLogoSize(50);
                            }}
                        >
                            Remove Logo
                        </Button>
                        </div>
                    )}
                    </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>

        <div className="flex justify-center">
          <Button color="primary" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download QR Code
          </Button>
        </div>

       {/* Info Section */}
        <Card className="bg-default-50 dark:bg-default-100">
        <CardBody className="p-6">
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                About QR Code Generator
            </h2>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4">
                The QR Code Generator is a powerful and versatile tool that allows you to create customized QR codes for various purposes. Whether you need to share a website URL, contact information, Wi-Fi credentials, or any other type of data, this generator provides an easy-to-use interface to create QR codes tailored to your needs.
            </p>

            <div className="my-8">
                <NextImage
                src="/Images/QRCodeGeneratorPreview.png"
                alt="Screenshot of the QR Code Generator interface showing customization options and generated QR code"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto"
                />
            </div>

            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                How to Use QR Code Generator?
            </h2>
            <ol className="list-decimal pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Select the QR code type (URL, text, email, phone, SMS, or Wi-Fi) from the dropdown menu.</li>
                <li>Enter the required information for the selected type in the provided fields.</li>
                <li>Customize the appearance of your QR code using the options in the "Appearance" tab.</li>
                <li>Adjust advanced settings like error correction level in the "Advanced" tab.</li>
                <li>Optionally, add a logo to your QR code using the "Logo" tab.</li>
                <li>Preview your QR code in real-time as you make changes.</li>
                <li>Once satisfied, click the "Download QR Code" button to save your generated QR code.</li>
            </ol>

            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                Key Features
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Multiple QR Code Types: Create QR codes for URLs, plain text, email addresses, phone numbers, SMS messages, and Wi-Fi networks.</li>
                <li>Customizable Appearance: Adjust the size, colors, and style (squares or dots) of your QR code to match your branding or preferences.</li>
                <li>Error Correction Levels: Choose from four levels of error correction to balance between code size and scanning reliability.</li>
                <li>Logo Integration: Add your own logo to the center of the QR code for brand recognition.</li>
                <li>Real-time Preview: See your QR code update in real-time as you modify settings.</li>
                <li>Responsive Design: The tool works well on both desktop and mobile devices.</li>
                <li>Easy Download: Download your QR code as a PNG image with a single click.</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3 flex items-center">
                <Share2 className="w-5 h-5 mr-2" />
                Applications and Use Cases
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Marketing: Create QR codes for promotional materials, business cards, and product packaging.</li>
                <li>Education: Share educational resources, course materials, or campus information via QR codes.</li>
                <li>Events: Use QR codes for ticketing, attendee registration, or sharing event details.</li>
                <li>Retail: Implement QR codes for contactless payments, product information, or loyalty programs.</li>
                <li>Hospitality: Provide easy access to menus, Wi-Fi credentials, or hotel information through QR codes.</li>
                <li>Healthcare: Use QR codes for patient identification, medical record access, or prescription information.</li>
                <li>Real Estate: Share property listings, virtual tours, or contact information via QR codes.</li>
                <li>Museums and Galleries: Offer additional information about exhibits or artworks through QR codes.</li>
                <li>Transportation: Implement QR codes for ticketing, schedules, or route information.</li>
                <li>Personal Use: Create QR codes for sharing contact information, social media profiles, or personal websites.</li>
            </ul>
            </div>
        </CardBody>
        </Card>

      </div>
    </ToolLayout>
  )
}

