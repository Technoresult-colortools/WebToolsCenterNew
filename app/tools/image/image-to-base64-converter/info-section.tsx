"use client"

import { Card } from "@nextui-org/react"
import {
  Info,
  BookOpen,
  Lightbulb,
  Code,
  Layers,
  Zap,
  FileImage,
  Settings,
  Share2,
  UploadCloud,
  Copy,
  Download,
  Trash2,
  Eye,
  Archive,
  ArrowUpDown,
  FileText,
  Database,
  Smartphone,
  WifiOff,
  ShieldCheck,
  MousePointerClick
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionBase64Converter() {
  // Image path
  const imagePath = "/Images/InfosectionImages/ImageToBase64Preview.png"

  return (
    <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
      <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
        {/* Intro Section */}
        <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2 text-primary-500" />
          What is the Image to Base64 Converter?
        </h2>
        <p className="text-default-600 mb-4">
          The Image to Base64 Converter is a powerful tool designed to convert image files into Base64 encoded strings.
          This conversion process allows developers and designers to embed image data directly into their HTML, CSS, or
          JavaScript files, avoiding the need for external file requests.
        </p>
        <p className="text-default-600 mb-4">
          Base64 encoding represents binary data using a set of 64 characters. This makes it possible to include image
          data within text-based formats, which is particularly useful in web development, API data transmission, and
          scenarios where handling binary files directly is complex or restricted.
        </p>

        {/* Image Preview */}
        <div className="my-8">
          <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <Image
                  src={imagePath || "/placeholder.svg?height=400&width=800"}
                  alt="Image to Base64 Converter Interface Preview"
                  width={800}
                  height={400}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </Link>
        </div>

        {/* How to Use Section */}
        <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
          How to Use the Converter?
        </h2>

        <ol className="list-none space-y-4 text-default-600">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
              1
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <UploadCloud className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <strong className="text-default-700">Upload Images:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Navigate to the "Upload" tab and drag & drop your files or click to select them. The tool supports multiple file uploads.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
              2
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-green-500 flex-shrink-0" />
                <strong className="text-default-700">Automatic Conversion:</strong>
              </div>
              <div className="ml-6 space-y-2">
                <div className="flex items-start gap-2">
                  <Settings className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong className="text-default-700">Instant Processing:</strong>
                    <span className="text-default-600 ml-1">The tool automatically converts your images to Base64 format immediately upon upload.</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
              3
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Layers className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <strong className="text-default-700">Manage Results:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Switch to the "Converted Images" tab. Use the "Sort By" dropdown to organize files by name, size, or type, or view previews.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
              4
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Share2 className="w-4 h-4 text-purple-500 flex-shrink-0" />
                <strong className="text-default-700">Export Data:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Copy strings to clipboard, download individual text files, or use the "Download All" button to get a ZIP of all data.
              </p>
            </div>
          </li>
        </ol>

        {/* Key Features (Grid) */}
        <h2 id="key-features" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
          <div className="flex items-start gap-3">
            <FileImage className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Multiple Uploads:</strong>
              <span className="block mt-1">
                Process multiple images simultaneously to save time on bulk conversion tasks.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Copy className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">One-Click Copy:</strong>
              <span className="block mt-1">
                Instantly copy the long Base64 strings to your clipboard for immediate use in your code.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Eye className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Live Preview:</strong>
              <span className="block mt-1">
                Verify your images before copying to ensure you are selecting the correct data.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Text File Download:</strong>
              <span className="block mt-1">
                Download individual Base64 strings as text files for easier storage and handling.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Archive className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Batch ZIP Export:</strong>
              <span className="block mt-1">
                Download all converted strings in a single organized ZIP file.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ArrowUpDown className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Smart Sorting:</strong>
              <span className="block mt-1">
                Organize your converted list by file name, size, or type to find what you need quickly.
              </span>
            </div>
          </div>
        </div>

        {/* Use Cases (Boxed Grid) */}
        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-primary-500" />
          Common Use Cases
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Code className="w-4 h-4 mr-2 text-primary-500" /> Web Development
            </h3>
            <p className="text-sm">
              Embed small icons and logos directly into HTML or CSS files to reduce HTTP requests and speed up page load times.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Database className="w-4 h-4 mr-2 text-secondary-500" /> Data Storage
            </h3>
            <p className="text-sm">
              Store images in JSON documents or databases (like MongoDB) that prefer text-based data over binary blobs.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Share2 className="w-4 h-4 mr-2 text-success-500" /> Email Templates
            </h3>
            <p className="text-sm">
              Include images in email signatures or newsletters where external image hosting might be blocked or unreliable.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <WifiOff className="w-4 h-4 mr-2 text-warning-500" /> Offline Apps
            </h3>
            <p className="text-sm">
              Ensure images display in offline-capable web applications (PWAs) by embedding the data directly in the code.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <ShieldCheck className="w-4 h-4 mr-2 text-danger-500" /> Security
            </h3>
            <p className="text-sm">
              Transmit image data securely via JSON APIs without worrying about multipart form data or file upload vulnerabilities.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Settings className="w-4 h-4 mr-2 text-primary-500" /> CSS Backgrounds
            </h3>
            <p className="text-sm">
              Use Base64 strings in CSS `background-image: url(...)` properties to create self-contained stylesheets.
            </p>
          </div>
        </div>

        {/* Technical Highlights (Colored List) */}
        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Zap className="w-6 h-6 mr-2 text-primary-500" />
          Technical Highlights
        </h2>
        <div className="bg-default-100/50 dark:bg-default-200/20 p-5 rounded-lg">
          <ul className="space-y-3 text-default-600">
            <li className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <MousePointerClick className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <strong>Drag and Drop Support:</strong> Intuitive interface allows you to easily drop files anywhere in the upload zone.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Settings className="w-4 h-4 text-secondary-500" />
              </div>
              <div>
                <strong>Performance Optimized:</strong> Enforces a 10MB file size limit per image to ensure browser performance and stability.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-success-100 dark:bg-success-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Smartphone className="w-4 h-4 text-success-500" />
              </div>
              <div>
                <strong>Fully Responsive:</strong> Works seamlessly on desktop computers, tablets, and mobile devices.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-warning-100 dark:bg-warning-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Trash2 className="w-4 h-4 text-warning-500" />
              </div>
              <div>
                <strong>Easy Cleanup:</strong> Remove individual images or use the clear button to reset the tool instantly.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-danger-100 dark:bg-danger-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Download className="w-4 h-4 text-danger-500" />
              </div>
              <div>
                <strong>Flexible Export:</strong> Whether you need a simple copy-paste or a file download, we support all export methods.
              </div>
            </li>
          </ul>
        </div>

        <p className="text-default-600 mt-8">
          Ready to streamline your web development workflow? Use our Image to Base64 Converter to quickly generate
          embeddable code for your projects. Simplify your asset management and reduce external dependencies today!
        </p>
      </div>
    </Card>
  )
}