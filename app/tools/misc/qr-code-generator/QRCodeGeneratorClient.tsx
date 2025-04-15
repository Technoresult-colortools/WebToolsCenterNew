// QRCodeGenerator.tsx - Main component
"use client"

import { useState, useEffect } from "react"
import { Card, CardBody } from "@nextui-org/react"

import ToolLayout from "@/components/ToolLayout"
import { qrCodeTemplates, getTemplateById } from "./qrCodeStyles"
import { SidebarNavigation } from "./SidebarNavigation"
import { QRTypeNavigation } from "./QRTypeNavigation"
import { ContentTab } from "./ContentTab"
import { TemplatesTab } from "./TemplatesTab"
import { ShapeTab } from "./ShapeTab"
import { ColorTab } from "./ColorTab"
import { LogoTab } from "./LogoTab"
import { QRCodePreview } from "./QRCodePreview"
import { InfoSection } from "./InfoSection"

// Define types
export type QRCodeType = "url" | "text" | "email" | "phone" | "sms" | "wifi" | "vcard" | "location" | "event"
export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H"
export type BorderStyle = "solid" | "dashed" | "dotted" | "double" | "groove" | "ridge" | "inset" | "outset"
export type GradientType = "linear" | "radial"
export type ExportFormat = "png" | "jpeg" | "svg"

export default function QRCodeGenerator() {
  // === Basic QR Options ===
  const [qrType, setQRType] = useState<QRCodeType>("url")
  const [qrValue, setQRValue] = useState<string>("")

  // Fixed QR Size for preview (300px)
  const FIXED_QR_SIZE = 300
  // Download size options
  const [downloadSize, setDownloadSize] = useState<string>("300x300px")
  const [exportFormat, setExportFormat] = useState<ExportFormat>("png")

  // === Appearance ===
  const [qrFgColor, setQrFgColor] = useState<string>("#000000")
  const [qrBgColor, setQrBgColor] = useState<string>("#ffffff")
  const [isGradient, setIsGradient] = useState<boolean>(false)
  const [gradientColors, setGradientColors] = useState<string[]>(["#000000", "#000000"])
  const [gradientType, setGradientType] = useState<GradientType>("linear")
  const [gradientRotation, setGradientRotation] = useState<number>(0)

  // === QR Shape Options ===
  const [bodyShape, setBodyShape] = useState<string>("square")
  const [eyeFrameShape, setEyeFrameShape] = useState<string>("square")
  const [eyeBallShape, setEyeBallShape] = useState<string>("square")
  const [eyeColor, setEyeColor] = useState<string>("")
  const [useCustomEyeColor, setUseCustomEyeColor] = useState<boolean>(false)

  // === Advanced Options ===
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<ErrorCorrectionLevel>("M")
  const [includeMargin,] = useState<boolean>(true)

  // === Logo Options ===
  const [logoUrl, setLogoUrl] = useState<string>("")
  const [logoSize, setLogoSize] = useState(40);

  // === Container/Border Options ===
  const [borderSize, ] = useState<number>(0)
  const [borderColor, ] = useState<string>("#000000")
  const [borderStyle, ] = useState<BorderStyle>("solid")
  const [backgroundColor, ] = useState<string>("#ffffff")


  // === Content Type Specific Fields ===
  // URL & Text
  const [qrName, setQrName] = useState<string>("")

  // Email
  const [emailAddress, setEmailAddress] = useState<string>("")
  const [emailSubject, setEmailSubject] = useState<string>("")
  const [emailBody, setEmailBody] = useState<string>("")

  // Phone
  const [phoneNumber, setPhoneNumber] = useState<string>("")

  // SMS
  const [smsNumber, setSmsNumber] = useState<string>("")
  const [smsBody, setSmsBody] = useState<string>("")

  // WiFi
  const [wifiSsid, setWifiSsid] = useState<string>("")
  const [wifiPassword, setWifiPassword] = useState<string>("")
  const [wifiEncryption, setWifiEncryption] = useState<"WEP" | "WPA" | "nopass">("WPA")
  const [wifiHidden, setWifiHidden] = useState<boolean>(false)

  // vCard
  const [vCardFields, setVCardFields] = useState({
    firstName: "",
    lastName: "",
    organization: "",
    email: "",
    phone: "",
    website: "",
    address: "",
  })

  // Location
  const [locationData, setLocationData] = useState({
    latitude: "",
    longitude: "",
    name: "",
  })

  // Event
  const [eventData, setEventData] = useState({
    name: "",
    organizer: "",
    title: "",
    location: "",
    startTime: "",
    endTime: "",
    summary: "",
  })

  // === Templates ===
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [savedTemplates, setSavedTemplates] = useState<any[]>([])

  // Sidebar tab state
  const [activeTab, setActiveTab] = useState<string>("content")

  useEffect(() => {
    // Initialize with a default URL value
    setQRValue("https://")
  }, [])

  // Apply template when selected
  useEffect(() => {
    if (selectedTemplate) {
      const template = getTemplateById(selectedTemplate)
      if (template) {
        setBodyShape(template.bodyShape)
        setEyeFrameShape(template.frameShape)
        setEyeBallShape(template.eyeballShape)
        setQrFgColor(template.fgColor)
        setQrBgColor(template.bgColor)

        if (template.eyeColor) {
          setUseCustomEyeColor(true)
          setEyeColor(template.eyeColor)
        } else {
          setUseCustomEyeColor(false)
          setEyeColor(template.fgColor)
        }

        if (template.isGradient && template.gradientColors) {
          setIsGradient(true)
          setGradientColors(template.gradientColors)
          if (template.gradientType) setGradientType(template.gradientType)
          if (template.gradientRotation !== undefined) setGradientRotation(template.gradientRotation)
        } else {
          setIsGradient(false)
        }
      }
    }
  }, [selectedTemplate])

  const generateQRValue = () => {
    switch (qrType) {
      case "url":
        return qrValue
      case "text":
        return qrValue
      case "email":
        return `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
      case "phone":
        return `tel:${phoneNumber}`
      case "sms":
        return `sms:${smsNumber}${smsBody ? `?body=${encodeURIComponent(smsBody)}` : ""}`
      case "wifi":
        return `WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiPassword};H:${wifiHidden ? "true" : "false"};;`
      case "vcard":
        return `BEGIN:VCARD
VERSION:3.0
N:${vCardFields.lastName};${vCardFields.firstName};;;
FN:${vCardFields.firstName} ${vCardFields.lastName}
ORG:${vCardFields.organization}
EMAIL:${vCardFields.email}
TEL:${vCardFields.phone}
URL:${vCardFields.website}
ADR:;;${vCardFields.address};;;
END:VCARD`
      case "location":
        return `geo:${locationData.latitude},${locationData.longitude}?q=${encodeURIComponent(locationData.name || `${locationData.latitude},${locationData.longitude}`)}`
      case "event":
        return `BEGIN:VEVENT
SUMMARY:${eventData.title}
LOCATION:${eventData.location}
DESCRIPTION:${eventData.summary}
DTSTART:${eventData.startTime.replace(/[-:]/g, "").replace("T", "")}
DTEND:${eventData.endTime.replace(/[-:]/g, "").replace("T", "")}
ORGANIZER:${eventData.organizer}
END:VEVENT`
      default:
        return ""
    }
  }

  const handleSaveTemplate = (templateName: string) => {
    if (templateName) {
      const newTemplate = {
        id: Date.now().toString(),
        name: templateName,
        bodyShape,
        frameShape: eyeFrameShape,
        eyeballShape: eyeBallShape,
        fgColor: qrFgColor,
        bgColor: qrBgColor,
        eyeColor: useCustomEyeColor ? eyeColor : qrFgColor,
        isGradient,
        gradientColors: isGradient ? gradientColors : undefined,
        gradientType,
        gradientRotation,
        errorCorrectionLevel,
        includeMargin,
      }

      setSavedTemplates([...savedTemplates, newTemplate])
      return true
    }
    return false
  }

  const renderTabContent = () => {
    const commonProps = {
      qrType,
      qrName,
      setQrName,
      qrValue,
      setQRValue,
    }

    switch (activeTab) {
      case "content":
        return (
          <ContentTab
            {...commonProps}
            emailAddress={emailAddress}
            setEmailAddress={setEmailAddress}
            emailSubject={emailSubject}
            setEmailSubject={setEmailSubject}
            emailBody={emailBody}
            setEmailBody={setEmailBody}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            smsNumber={smsNumber}
            setSmsNumber={setSmsNumber}
            smsBody={smsBody}
            setSmsBody={setSmsBody}
            wifiSsid={wifiSsid}
            setWifiSsid={setWifiSsid}
            wifiPassword={wifiPassword}
            setWifiPassword={setWifiPassword}
            wifiEncryption={wifiEncryption}
            setWifiEncryption={setWifiEncryption}
            wifiHidden={wifiHidden}
            setWifiHidden={setWifiHidden}
            vCardFields={vCardFields}
            setVCardFields={setVCardFields}
            locationData={locationData}
            setLocationData={setLocationData}
            eventData={eventData}
            setEventData={setEventData}
          />
        )
      case "templates":
        return (
          <TemplatesTab
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            qrCodeTemplates={qrCodeTemplates}
            savedTemplates={savedTemplates}
            handleSaveTemplate={handleSaveTemplate}
          />
        )
        case "shape":
          return (
            <ShapeTab
              bodyShape={bodyShape}
              setBodyShape={setBodyShape}
              eyeFrameShape={eyeFrameShape}
              setEyeFrameShape={setEyeFrameShape}
              eyeBallShape={eyeBallShape}
              setEyeBallShape={setEyeBallShape}
            />
          )
        case "color":
          return (
            <ColorTab
              qrFgColor={qrFgColor}
              setQrFgColor={setQrFgColor}
              qrBgColor={qrBgColor}
              setQrBgColor={setQrBgColor}
              isGradient={isGradient}
              setIsGradient={setIsGradient}
              gradientColors={gradientColors}
              setGradientColors={setGradientColors}
              gradientType={gradientType}
              setGradientType={setGradientType}
              gradientRotation={gradientRotation}
              setGradientRotation={setGradientRotation}
              useCustomEyeColor={useCustomEyeColor}
              setUseCustomEyeColor={setUseCustomEyeColor}
              eyeColor={eyeColor}
              setEyeColor={setEyeColor}
            />
        )
      case "logo":
        return <LogoTab logoUrl={logoUrl} setLogoUrl={setLogoUrl} logoSize={logoSize} setLogoSize={setLogoSize} />
      default:
        return null
    }
  }

  return (
    <ToolLayout
      title="QR Code Generator"
      description="Create customized QR codes with advanced styling options"
      toolId="678f383026f06f912191bccd"
    >
      <div className="flex flex-col space-y-4">
        {/* QR Type Navigation */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-2 md:p-3">
            <QRTypeNavigation qrType={qrType} setQRType={setQRType} />
          </CardBody>
        </Card>

        {/* Main Content Area */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Sidebar */}
              <div className="w-full md:w-[200px] flex flex-col md:flex-row">
                {/* Sidebar Tabs */}
                <SidebarNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Sidebar Content (Mobile) */}
                <div className="md:hidden mt-4 bg-white dark:bg-default-200 p-4 rounded-lg">{renderTabContent()}</div>
              </div>
              {/* Main Content and Preview */}
              <div className="flex-1 flex flex-col md:flex-row gap-3">
                {/* Content Form (Desktop) */}
                <div className="hidden md:block flex-1 w-[450px] bg-white dark:bg-default-100 p-4 rounded-lg shadow-md">
                  <h2 className="text-xl font-bold mb-4 text-default-700">
                    {qrType === "url"
                      ? "URL QR Code"
                      : qrType === "text"
                        ? "Text QR Code"
                        : qrType === "email"
                          ? "Email QR Code"
                          : qrType === "phone"
                            ? "Phone QR Code"
                            : qrType === "sms"
                              ? "SMS QR Code"
                              : qrType === "wifi"
                                ? "Wi-Fi QR Code"
                                : qrType === "vcard"
                                  ? "vCard QR Code"
                                  : qrType === "location"
                                    ? "Location QR Code"
                                    : qrType === "event"
                                      ? "Event QR Code"
                                      : "QR Code Generator"}
                  </h2>
                  {renderTabContent()}
                </div>

                {/* QR Code Preview */}
                <QRCodePreview
                  qrValue={generateQRValue()}
                  size={FIXED_QR_SIZE}
                  downloadSize={downloadSize}
                  setDownloadSize={setDownloadSize}
                  exportFormat={exportFormat}
                  setExportFormat={setExportFormat}
                  fgColor={qrFgColor}
                  bgColor={qrBgColor}
                  eyeColor={useCustomEyeColor ? eyeColor : qrFgColor}
                  bodyShape={bodyShape}
                  eyeFrameShape={eyeFrameShape}
                  eyeBallShape={eyeBallShape}
                  errorCorrectionLevel={errorCorrectionLevel}
                  setErrorCorrectionLevel={setErrorCorrectionLevel}
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
                />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Info Section */}
        <InfoSection />
      </div>
    </ToolLayout>
  )
}