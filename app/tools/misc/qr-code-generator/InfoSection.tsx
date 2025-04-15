import type React from "react"
import { Card, CardBody, Link, Image } from "@nextui-org/react"
import {
  Info,
  Lightbulb,
  BookOpen,
  ExternalLink,
  Smartphone,
  Palette,
  Download,
  FileText,
  Mail,
  Phone,
  MessageSquare,
  Wifi,
  MapPin,
  Calendar,
} from "lucide-react"

export const InfoSection: React.FC = () => {
  return (
    <Card className="bg-default-50 dark:bg-default-100">
      <CardBody className="p-6">
        <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
            <Info className="w-6 h-6 mr-2" />
            What is the QR Code Generator?
          </h2>
          <p className="text-sm md:text-base text-default-600 mb-4">
            Our advanced QR Code Generator is a comprehensive tool designed to create customized QR codes for various
            purposes. It provides extensive customization options for appearance, content types, and export settings,
            making it invaluable for marketers, businesses, event organizers, and anyone looking to share information
            through QR codes.
          </p>

          <div className="my-8">
            <Image
              src="/Images/InfosectionImages/QRCodeGeneratorPreview.png?height=400&width=600"
              alt="Screenshot of the QR Code Generator interface showing various customization options and a preview of a generated QR code"
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
            How to Use the QR Code Generator?
          </h2>
          <p className="text-sm md:text-base text-default-600 mb-4">
            Using our QR Code Generator is straightforward and intuitive:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
            <li>
              Select the type of QR code you want to create (URL, Text, Email, Phone, SMS, WiFi, vCard, Location, or
              Event)
            </li>
            <li>Enter the required information for your selected QR code type</li>
            <li>Customize the appearance using the tabs (Templates, Shapes, Colors, Logo)</li>
            <li>Adjust error correction level and margin settings as needed</li>
            <li>Preview your QR code in real-time as you make changes</li>
            <li>Select your preferred download size and format</li>
            <li>Download your custom QR code for use in digital or print materials</li>
          </ol>

          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
            <Lightbulb className="w-6 h-6 mr-2" />
            Features That Make Us Stand Out
          </h2>
          <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
            <li>
              <strong>Multiple QR Code Types:</strong> Create QR codes for URLs, text, email, phone numbers, SMS, WiFi
              networks, vCards, locations, and calendar events
            </li>
            <li>
              <strong>Advanced Customization:</strong> Personalize your QR codes with custom colors, shapes, gradients,
              and eye styles
            </li>
            <li>
              <strong>Logo Integration:</strong> Add your brand logo to QR codes while maintaining scannability
            </li>
            <li>
              <strong>Template System:</strong> Save your favorite designs as templates for quick reuse
            </li>
            <li>
              <strong>Error Correction Control:</strong> Adjust error correction levels to balance between data recovery
              and design flexibility
            </li>
            <li>
              <strong>Real-time Preview:</strong> See changes instantly as you customize your QR code
            </li>
            <li>
              <strong>Multiple Export Options:</strong> Download your QR codes in PNG, JPEG, or SVG formats at various
              sizes
            </li>
            <li>
              <strong>Responsive Design:</strong> Create QR codes on any device with a consistent experience
            </li>
          </ul>

          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
            <Smartphone className="w-6 h-6 mr-2" />
            QR Code Types Explained
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
            <div className="bg-default-100 p-3 rounded-lg">
              <h3 className="font-semibold flex items-center">
                <ExternalLink className="w-4 h-4 mr-1" /> URL
              </h3>
              <p>Create QR codes that open specific web addresses when scanned.</p>
            </div>
            <div className="bg-default-100 p-3 rounded-lg">
              <h3 className="font-semibold flex items-center">
                <FileText className="w-4 h-4 mr-1" /> Text
              </h3>
              <p>Generate QR codes containing plain text messages or information.</p>
            </div>
            <div className="bg-default-100 p-3 rounded-lg">
              <h3 className="font-semibold flex items-center">
                <Mail className="w-4 h-4 mr-1" /> Email
              </h3>
              <p>Create QR codes that open email clients with pre-filled recipient, subject, and body.</p>
            </div>
            <div className="bg-default-100 p-3 rounded-lg">
              <h3 className="font-semibold flex items-center">
                <Phone className="w-4 h-4 mr-1" /> Phone
              </h3>
              <p>Generate QR codes that initiate phone calls when scanned.</p>
            </div>
            <div className="bg-default-100 p-3 rounded-lg">
              <h3 className="font-semibold flex items-center">
                <MessageSquare className="w-4 h-4 mr-1" /> SMS
              </h3>
              <p>Create QR codes that open messaging apps with pre-filled recipient and message.</p>
            </div>
            <div className="bg-default-100 p-3 rounded-lg">
              <h3 className="font-semibold flex items-center">
                <Wifi className="w-4 h-4 mr-1" /> WiFi
              </h3>
              <p>Generate QR codes that automatically connect devices to WiFi networks.</p>
            </div>
            <div className="bg-default-100 p-3 rounded-lg">
              <h3 className="font-semibold flex items-center">
                <FileText className="w-4 h-4 mr-1" /> vCard
              </h3>
              <p>Create QR codes containing contact information that can be saved to address books.</p>
            </div>
            <div className="bg-default-100 p-3 rounded-lg">
              <h3 className="font-semibold flex items-center">
                <MapPin className="w-4 h-4 mr-1" /> Location
              </h3>
              <p>Generate QR codes that open map applications to specific coordinates.</p>
            </div>
            <div className="bg-default-100 p-3 rounded-lg">
              <h3 className="font-semibold flex items-center">
                <Calendar className="w-4 h-4 mr-1" /> Event
              </h3>
              <p>Create QR codes for calendar events with details like title, location, and time.</p>
            </div>
          </div>

          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
            <Palette className="w-6 h-6 mr-2" />
            Customization Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
            <div className="bg-default-100 p-3 rounded-lg">
              <h3 className="font-semibold">Colors & Gradients</h3>
              <p>
                Customize foreground and background colors, or apply gradient effects to make your QR codes visually
                appealing while maintaining functionality.
              </p>
            </div>
            <div className="bg-default-100 p-3 rounded-lg">
              <h3 className="font-semibold">Shapes & Patterns</h3>
              <p>
                Modify the shape of QR code elements including body dots, eye frames, and eye balls for a unique look.
              </p>
            </div>
            <div className="bg-default-100 p-3 rounded-lg">
              <h3 className="font-semibold">Logo Integration</h3>
              <p>Add your brand logo to the center of QR codes with adjustable size to enhance brand recognition.</p>
            </div>
            <div className="bg-default-100 p-3 rounded-lg">
              <h3 className="font-semibold">Error Correction</h3>
              <p>
                Adjust error correction levels (L, M, Q, H) to balance between data recovery capabilities and design
                flexibility.
              </p>
            </div>
          </div>

          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
            <Download className="w-6 h-6 mr-2" />
            Export Options
          </h2>
          <p className="text-sm md:text-base text-default-600 mb-4">
            Our QR Code Generator offers flexible export options to suit your needs:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>
              <strong>Multiple Formats:</strong> Download your QR codes as PNG, JPEG, or SVG files
            </li>
            <li>
              <strong>Size Options:</strong> Choose from various dimensions to get the perfect size for your use case
            </li>
            <li>
              <strong>Vector Support:</strong> SVG format ensures your QR codes remain crisp at any size
            </li>
          </ul>

          <div className="mt-8 p-4 bg-default-100 rounded-lg">
            <h3 className="font-semibold text-default-700 mb-2">Pro Tips for QR Code Success</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Use higher error correction levels (Q or H) when adding logos or using custom designs</li>
              <li>Ensure sufficient contrast between foreground and background colors for better scanning</li>
              <li>Test your QR codes on multiple devices before distributing them</li>
              <li>
                For print materials, export at a higher resolution and include adequate white space around the code
              </li>
              <li>Keep URLs short when possible to reduce QR code complexity</li>
            </ul>
          </div>

          <p className="text-sm md:text-base text-default-600 mt-8">
            Ready to create professional, customized QR codes for your business, events, or personal use? Our advanced
            QR Code Generator gives you complete control over both content and design. Whether you're linking to your
            website, sharing contact information, or helping users connect to WiFi, our tool makes it simple to generate
            QR codes that are both functional and visually appealing. Start creating your custom QR codes now!
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="https://en.wikipedia.org/wiki/QR_code"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary flex items-center gap-1"
            >
              Learn more about QR codes <ExternalLink size={14} />
            </Link>
            <Link href="#" className="text-primary flex items-center gap-1">
              View usage examples <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
