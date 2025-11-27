"use client"

import { Card } from "@nextui-org/react"
import {
  Info,
  BookOpen,
  Lightbulb,
  ClipboardPaste,
  Zap,
  Images,
  Download,
  Upload,
  Layers,
  Eye,
  Link as LinkIcon,
  Shield,
  ArrowUpDown,
  Smartphone,
  FileWarning,
  Scissors,
  CheckCircle2,
  HardDrive,
  Maximize2
} from "lucide-react"
import Image from "next/image"

export default function InfoSectionBase64ToImage() {
  return (
    <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
      <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
        {/* Intro Section */}
        <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2 text-primary-500" />
          What is the Base64 to Image Converter?
        </h2>
        <p className="text-default-600 mb-4">
          The Base64 to Image converter is a powerful and user-friendly tool designed to decode Base64 encoded strings
          back into viewable image files. This conversion process is essential for developers, designers, and anyone
          working with encoded image data who needs to quickly visualize or extract the original image.
        </p>
        <p className="text-default-600 mb-4">
          Base64 encoding is a method of representing binary data using a set of 64 characters, commonly used to embed
          image data within text-based formats such as HTML, CSS, or JSON. Our tool reverses this process, allowing you
          to easily preview, download, or revert to your original image format for further processing.
        </p>

        {/* Image Preview Grid */}
        <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
            <Image
              src="/Images/InfosectionImages/Base64ImagePreview1.png"
              alt="Base64 to Image Converter Interface - Upload Area"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
            <Image
              src="/Images/InfosectionImages/Base64ImagePreview.png"
              alt="Base64 to Image Converter Interface - Results"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
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
                <ClipboardPaste className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <strong className="text-default-700">Input Data:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Navigate to the "Input Base64" tab and paste your Base64 encoded string into the text area provided.
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
                <strong className="text-default-700">Convert:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Click the "Convert to Image" button. The tool will automatically process your string and generate the image.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
              3
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Images className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <strong className="text-default-700">View Results:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Switch to the "Converted Images" tab to see previews, check file details, and manage your list.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
              4
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Download className="w-4 h-4 text-purple-500 flex-shrink-0" />
                <strong className="text-default-700">Export:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Copy the image URL to your clipboard or download the actual image file to your device.
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
            <Upload className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Easy Input:</strong>
              <span className="block mt-1">
                Simple and spacious text area designed specifically for pasting large Base64 strings.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Layers className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Multiple Conversions:</strong>
              <span className="block mt-1">
                Convert and manage multiple Base64 strings in a single session without losing previous results.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Eye className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Instant Preview:</strong>
              <span className="block mt-1">
                View your converted images instantly in the browser to verify they decoded correctly.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <LinkIcon className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Copy Data URL:</strong>
              <span className="block mt-1">
                Easily copy the source URL of converted images for quick embedding in other projects.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Download className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">One-Click Download:</strong>
              <span className="block mt-1">
                Save the decoded images directly to your device with a single click.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Secure Conversion:</strong>
              <span className="block mt-1">
                All processing happens client-side in your browser; your data is never sent to a server.
              </span>
            </div>
          </div>
        </div>

        {/* Tips for Optimal Use (Boxed Grid) */}
        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <CheckCircle2 className="w-6 h-6 mr-2 text-primary-500" />
          Tips for Optimal Use
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <FileWarning className="w-4 h-4 mr-2 text-primary-500" /> Clean Input
            </h3>
            <p className="text-sm">
              Ensure your Base64 string is complete and doesn't contain extra whitespace or invalid characters.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Scissors className="w-4 h-4 mr-2 text-secondary-500" /> Prefix Handling
            </h3>
            <p className="text-sm">
              Our tool handles strings with or without the "data:image/png;base64," prefix automatically.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <HardDrive className="w-4 h-4 mr-2 text-success-500" /> File Size
            </h3>
            <p className="text-sm">
              Remember that Base64 encoding increases data size by ~33%, so the resulting image will be smaller than the string.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Maximize2 className="w-4 h-4 mr-2 text-warning-500" /> Performance
            </h3>
            <p className="text-sm">
              For extremely large Base64 strings, consider splitting them into smaller chunks if browser performance slows.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-2 text-danger-500" /> Verification
            </h3>
            <p className="text-sm">
              Always inspect the preview to ensure the image decoded as expected before downloading.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <ArrowUpDown className="w-4 h-4 mr-2 text-primary-500" /> Organization
            </h3>
            <p className="text-sm">
              If you are working with multiple images, use the sorting feature to keep your workspace organized.
            </p>
          </div>
        </div>

        {/* Technical Highlights (Colored List) */}
        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Zap className="w-6 h-6 mr-2 text-primary-500" />
          Why Use This Tool?
        </h2>
        <div className="bg-default-100/50 dark:bg-default-200/20 p-5 rounded-lg">
          <ul className="space-y-3 text-default-600">
            <li className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Shield className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <strong>Privacy First:</strong> Your sensitive image data never leaves your device, making it safe for confidential projects.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Smartphone className="w-4 h-4 text-secondary-500" />
              </div>
              <div>
                <strong>Fully Responsive:</strong> Decode images on the go using your smartphone, tablet, or desktop computer.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-success-100 dark:bg-success-900/30 p-1 rounded-full mr-3 mt-0.5">
                <ArrowUpDown className="w-4 h-4 text-success-500" />
              </div>
              <div>
                <strong>Smart Sorting:</strong> Organize converted results by name, size, or type to find what you need quickly.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-warning-100 dark:bg-warning-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Zap className="w-4 h-4 text-warning-500" />
              </div>
              <div>
                <strong>Instant Feedback:</strong> See results immediately without waiting for server uploads or downloads.
              </div>
            </li>
          </ul>
        </div>

        <p className="text-default-600 mt-8">
          Ready to decode your Base64 strings and bring your images to life? Our Base64 to Image Converter offers a
          perfect balance of simplicity and powerful features. Whether you're a developer debugging encoded images, a
          designer working with data URIs, or anyone needing to quickly visualize Base64 encoded images, this tool
          provides the flexibility and ease of use you need.
        </p>
      </div>
    </Card>
  )
}