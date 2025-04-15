import React from "react"
import { Input, Textarea, Select, SelectItem, Switch, } from "@nextui-org/react"
import type { QRCodeType } from "./QRCodeGeneratorClient"

interface ContentTabProps {
  qrType: QRCodeType
  qrName: string
  setQrName: (name: string) => void
  qrValue: string
  setQRValue: (value: string) => void
  
  // Email fields
  emailAddress: string
  setEmailAddress: (value: string) => void
  emailSubject: string
  setEmailSubject: (value: string) => void
  emailBody: string
  setEmailBody: (value: string) => void
  
  // Phone fields
  phoneNumber: string
  setPhoneNumber: (value: string) => void
  
  // SMS fields
  smsNumber: string
  setSmsNumber: (value: string) => void
  smsBody: string
  setSmsBody: (value: string) => void
  
  // WiFi fields
  wifiSsid: string
  setWifiSsid: (value: string) => void
  wifiPassword: string
  setWifiPassword: (value: string) => void
  wifiEncryption: "WEP" | "WPA" | "nopass"
  setWifiEncryption: (value: "WEP" | "WPA" | "nopass") => void
  wifiHidden: boolean
  setWifiHidden: (value: boolean) => void
  
  // vCard fields
  vCardFields: {
    firstName: string
    lastName: string
    organization: string
    email: string
    phone: string
    website: string
    address: string
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setVCardFields: (fields: any) => void
  
  // Location fields
  locationData: {
    latitude: string
    longitude: string
    name: string
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setLocationData: (data: any) => void
  
  // Event fields
  eventData: {
    name: string
    organizer: string
    title: string
    location: string
    startTime: string
    endTime: string
    summary: string
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setEventData: (data: any) => void
}

export const ContentTab: React.FC<ContentTabProps> = ({
  qrType,
  qrName,
  setQrName,
  qrValue,
  setQRValue,
  emailAddress,
  setEmailAddress,
  emailSubject,
  setEmailSubject,
  emailBody,
  setEmailBody,
  phoneNumber,
  setPhoneNumber,
  smsNumber,
  setSmsNumber,
  smsBody,
  setSmsBody,
  wifiSsid,
  setWifiSsid,
  wifiPassword,
  setWifiPassword,
  wifiEncryption,
  setWifiEncryption,
  wifiHidden,
  setWifiHidden,
  vCardFields,
  setVCardFields,
  locationData,
  setLocationData,
  eventData,
  setEventData,
}) => {
  const updateVCardField = (field: string, value: string) => {
    setVCardFields({
      ...vCardFields,
      [field]: value,
    })
  }

  const updateLocationField = (field: string, value: string) => {
    setLocationData({
      ...locationData,
      [field]: value,
    })
  }

  const updateEventField = (field: string, value: string) => {
    setEventData({
      ...eventData,
      [field]: value,
    })
  }

  return (
    <div className="space-y-4">
      {/* QR Name field - common to all types */}
      <Input
        label="QR Code Name"
        placeholder="Enter a name for your QR code"
        value={qrName}
        onChange={(e) => setQrName(e.target.value)}
        variant="bordered"
      />

      {/* URL & Text specific fields */}
      {(qrType === "url" || qrType === "text") && (
        <Textarea
          label={qrType === "url" ? "URL" : "Text"}
          placeholder={qrType === "url" ? "https://example.com" : "Enter text content"}
          value={qrValue}
          onChange={(e) => setQRValue(e.target.value)}
          minRows={3}
          variant="bordered"
        />
      )}

      {/* Email specific fields */}
      {qrType === "email" && (
        <div className="space-y-4">
          <Input
            label="Email Address"
            placeholder="recipient@example.com"
            value={emailAddress}
            variant="bordered"
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          <Input
            label="Subject"
            placeholder="Email subject"
            value={emailSubject}
            variant="bordered"
            onChange={(e) => setEmailSubject(e.target.value)}
          />
          <Textarea
            label="Email Body"
            placeholder="Enter email content"
            value={emailBody}
            variant="bordered"
            onChange={(e) => setEmailBody(e.target.value)}
            minRows={3}
          />
        </div>
      )}

      {/* Phone specific fields */}
      {qrType === "phone" && (
        <Input
          label="Phone Number"
          placeholder="+1234567890"
          value={phoneNumber}
          variant="bordered"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      )}

      {/* SMS specific fields */}
      {qrType === "sms" && (
        <div className="space-y-4">
          <Input
            label="Phone Number"
            placeholder="+1234567890"
            value={smsNumber}
            variant="bordered"
            onChange={(e) => setSmsNumber(e.target.value)}
          />
          <Textarea
            label="Message"
            placeholder="Enter SMS message"
            value={smsBody}
            variant="bordered"
            onChange={(e) => setSmsBody(e.target.value)}
            minRows={3}
          />
        </div>
      )}

      {/* WiFi specific fields */}
      {qrType === "wifi" && (
        <div className="space-y-4">
          <Input
            label="Network Name (SSID)"
            placeholder="WiFi Network Name"
            value={wifiSsid}
            variant="bordered"
            onChange={(e) => setWifiSsid(e.target.value)}
          />
          <Input
            label="Password"
            placeholder="WiFi Password"
            value={wifiPassword}
            variant="bordered"
            onChange={(e) => setWifiPassword(e.target.value)}
            type="password"
          />
          <Select
            label="Encryption"
            placeholder="Select encryption type"
            selectedKeys={[wifiEncryption]}
            variant="bordered"
            onChange={(e) => setWifiEncryption(e.target.value as "WEP" | "WPA" | "nopass")}
          >
            <SelectItem key="WPA" value="WPA" className="text-default-700">WPA/WPA2/WPA3</SelectItem>
            <SelectItem key="WEP" value="WEP" className="text-default-700">WEP</SelectItem>
            <SelectItem key="nopass" value="nopass" className="text-default-700">No Password</SelectItem>
          </Select>
          <div className="flex items-center justify-between">
            <span>Hidden Network</span>
            <Switch
              checked={wifiHidden}
              onChange={(e) => setWifiHidden(e.target.checked)}
            />
          </div>
        </div>
      )}

      {/* vCard specific fields */}
      {qrType === "vcard" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              placeholder="John"
              value={vCardFields.firstName}
              variant="bordered"
              onChange={(e) => updateVCardField("firstName", e.target.value)}
            />
            <Input
              label="Last Name"
              placeholder="Doe"
              value={vCardFields.lastName}
              variant="bordered"
              onChange={(e) => updateVCardField("lastName", e.target.value)}
            />
          </div>
          <Input
            label="Organization"
            placeholder="Company Name"
            value={vCardFields.organization}
            variant="bordered"
            onChange={(e) => updateVCardField("organization", e.target.value)}
          />
          <Input
            label="Email"
            placeholder="email@example.com"
            value={vCardFields.email}
            variant="bordered"
            onChange={(e) => updateVCardField("email", e.target.value)}
          />
          <Input
            label="Phone"
            placeholder="+1234567890"
            value={vCardFields.phone}
            variant="bordered"
            onChange={(e) => updateVCardField("phone", e.target.value)}
          />
          <Input
            label="Website"
            placeholder="https://example.com"
            value={vCardFields.website}
            variant="bordered"
            onChange={(e) => updateVCardField("website", e.target.value)}
          />
          <Textarea
            label="Address"
            placeholder="123 Street Name, City, Country"
            value={vCardFields.address}
            variant="bordered"
            onChange={(e) => updateVCardField("address", e.target.value)}
            minRows={2}
          />
        </div>
      )}

      {/* Location specific fields */}
      {qrType === "location" && (
        <div className="space-y-4">
          <Input
            label="Location Name"
            placeholder="My Favorite Place"
            value={locationData.name}
            variant="bordered"
            onChange={(e) => updateLocationField("name", e.target.value)}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Latitude"
              placeholder="37.7749"
              variant="bordered"
              value={locationData.latitude}
              onChange={(e) => updateLocationField("latitude", e.target.value)}
            />
            <Input
              label="Longitude"
              placeholder="-122.4194"
              variant="bordered"
              value={locationData.longitude}
              onChange={(e) => updateLocationField("longitude", e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Event specific fields */}
      {qrType === "event" && (
        <div className="space-y-4">
          <Input
            label="Event Title"
            placeholder="My Event"
            variant="bordered"
            value={eventData.title}
            onChange={(e) => updateEventField("title", e.target.value)}
          />
          <Input
            label="Organizer"
            placeholder="Event Organizer"
            value={eventData.organizer}
            variant="bordered"
            onChange={(e) => updateEventField("organizer", e.target.value)}
          />
          <Input
            label="Location"
            placeholder="Event Location"
            value={eventData.location}
            variant="bordered"
            onChange={(e) => updateEventField("location", e.target.value)}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Start Date & Time"
              placeholder="YYYY-MM-DDTHH:MM"
              type="datetime-local"
              variant="bordered"
              value={eventData.startTime}
              onChange={(e) => updateEventField("startTime", e.target.value)}
            />
            <Input
              label="End Date & Time"
              placeholder="YYYY-MM-DDTHH:MM"
              type="datetime-local"
              variant="bordered"
              value={eventData.endTime}
              onChange={(e) => updateEventField("endTime", e.target.value)}
            />
          </div>
          <Textarea
            label="Summary"
            placeholder="Event details"
            value={eventData.summary}
            variant="bordered"
            onChange={(e) => updateEventField("summary", e.target.value)}
            minRows={3}
          />
        </div>
      )}
    </div>
  )
}