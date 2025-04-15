import React from "react"
import { Button } from "@nextui-org/react"
import { Link, Wifi, Mail, Phone, MessageSquare, Calendar, MapPin, FileText } from "lucide-react"
import type { QRCodeType } from "./QRCodeGeneratorClient"

interface QRTypeNavigationProps {
  qrType: QRCodeType
  setQRType: (type: QRCodeType) => void
}

export const QRTypeNavigation: React.FC<QRTypeNavigationProps> = ({ qrType, setQRType }) => {
  const qrTypes = [
    {
      id: "url" as QRCodeType,
      label: "URL",
      icon: <Link size={20} />,
    },
    {
      id: "text" as QRCodeType,
      label: "Text",
      icon: <FileText size={20} />,
    },
    {
      id: "email" as QRCodeType,
      label: "Email",
      icon: <Mail size={20} />,
    },
    {
      id: "phone" as QRCodeType,
      label: "Phone",
      icon: <Phone size={20} />,
    },
    {
      id: "sms" as QRCodeType,
      label: "SMS",
      icon: <MessageSquare size={20} />,
    },
    {
      id: "wifi" as QRCodeType,
      label: "Wi-Fi",
      icon: <Wifi size={20} />,
    },
    {
      id: "vcard" as QRCodeType,
      label: "vCard",
      icon: <Phone size={20} />,
    },
    {
      id: "location" as QRCodeType,
      label: "Location",
      icon: <MapPin size={20} />,
    },
    {
      id: "event" as QRCodeType,
      label: "Event",
      icon: <Calendar size={20} />,
    },
  ]

  return (
    <div className="flex flex-wrap gap-2 justify-evenly">
      {qrTypes.map((type) => (
        <Button
          key={type.id} // Add this key prop here
          variant={qrType === type.id ? "flat" : "light"}
          className={`min-w-20 ${
            qrType === type.id
              ? "bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
              : ""
          }`}
          startContent={type.icon}
          size="sm"
          onPress={() => setQRType(type.id)}
        >
          {type.label}
        </Button>
      ))}
    </div>
  )
}