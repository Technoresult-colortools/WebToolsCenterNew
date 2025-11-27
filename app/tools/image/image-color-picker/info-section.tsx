"use client"

import { Card } from "@nextui-org/react"
import NextImage from "next/image"
import Link from "next/link"
import {
  Info,
  BookOpen,
  Lightbulb,
  Wand2,
  Eye,
  Smartphone,
  Palette,
  UploadCloud,
  RefreshCw,
  Pipette,
  Copy,
  History,
  Layers,
  Target,
} from "lucide-react"

export default function InfoSectionImageColorPicker() {
  // Image path
  const imagePath = "/Images/InfosectionImages/ImageColorPickerPreview.png"

  return (
    <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
      <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2 text-primary-500" />
          About Image Color Picker
        </h2>
        <p className="text-default-600 mb-4">
          Image Color Picker is a powerful device designed for designers, developers and color enthusiasts. This allows
          you to upload any image and remove the exact color information from it. Whether you are choosing a personal
          color or analyzes the major color palette of an entire image, our device provides you with accurate and
          easy-to-use color data.
        </p>
        <p className="text-default-600 mb-4">
          With features such as an eyedropper tool for accurate color selection, major color extraction, and many color
          formats (hex, RGB, HSL), image color picker is an invaluable resource for anyone working with color in its
          projects. This is perfect for making united color schemes, matching colors with inspirational images, or
          simply searching for the color composition of your favorite photos.
        </p>

        <div className="my-8">
          <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <NextImage
                  src={imagePath}
                  alt="Screenshot of the Image Color Picker interface showing image upload area, color selection tools, and color analysis results"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </Link>
        </div>

        <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
          How to Use the Image Color Picker?
        </h2>

        <ol className="list-none space-y-4 text-default-600">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
              1
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <UploadCloud className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <strong className="text-default-700">Upload an image:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Upload an image by clicking the upload area or dragging and dropping a file.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
              2
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Eye className="w-4 h-4 text-green-500 flex-shrink-0" />
                <strong className="text-default-700">View uploaded image:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Once your image is uploaded, you can use the eyedropper tool to pick colors from specific areas of the
                image.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
              3
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Pipette className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <strong className="text-default-700">Activate eyedropper tool:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Click the "Pick Image Color" button to activate the eyedropper tool.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
              4
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-purple-500 flex-shrink-0" />
                <strong className="text-default-700">Select color from image:</strong>
              </div>
              <p className="text-default-600 ml-6">Select a color from the image by clicking on it.</p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-medium">
              5
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Palette className="w-4 h-4 text-red-500 flex-shrink-0" />
                <strong className="text-default-700">View color details:</strong>
              </div>
              <p className="text-default-600 ml-6">
                View the selected color's details in HEX, RGB, and HSL formats, click on the Drop down menu Hex button
                by default and then select the other formats.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium">
              6
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Copy className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                <strong className="text-default-700">Copy color value:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Copy the color value to your clipboard by clicking the "Copy" button.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm font-medium">
              7
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Layers className="w-4 h-4 text-teal-500 flex-shrink-0" />
                <strong className="text-default-700">Explore dominant colors:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Explore the automatically extracted dominant colors from your image.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-sm font-medium">
              8
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <History className="w-4 h-4 text-pink-500 flex-shrink-0" />
                <strong className="text-default-700">Access color history:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Access your recently picked colors from the color history section.
              </p>
            </div>
          </li>
        </ol>

        <h2 id="key-features" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
          Key Features of Image Color Picker
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
          <div className="flex items-start gap-3">
            <Pipette className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Precise Color Picking:</strong>
              <span className="block mt-1">
                Precise color picking with an eyedropper tool for accurate color selection from any part of your image.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Layers className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Dominant Color Extraction:</strong>
              <span className="block mt-1">
                Automatic extraction of dominant colors from the uploaded image for comprehensive color analysis.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Palette className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Multiple Color Formats:</strong>
              <span className="block mt-1">
                Support for multiple color formats: HEX, RGB, and HSL for versatile usage.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <History className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Color History Tracking:</strong>
              <span className="block mt-1">Color history tracking for easy access to previously picked colors.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Copy className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">One-Click Color Copying:</strong>
              <span className="block mt-1">
                One-click color copying to clipboard for seamless integration into your workflow.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Responsive Design:</strong>
              <span className="block mt-1">Responsive design for seamless use on desktop and mobile devices.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <RefreshCw className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Real-Time Format Switching:</strong>
              <span className="block mt-1">Real-time color format switching between HEX, RGB, and HSL values.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Eye className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Visual Color Representation:</strong>
              <span className="block mt-1">
                Visual representation of picked and dominant colors for better understanding.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <UploadCloud className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Drag-and-Drop Upload:</strong>
              <span className="block mt-1">User-friendly interface with drag-and-drop image upload functionality.</span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Wand2 className="w-6 h-6 mr-2 text-primary-500" />
          Tips and Best Practices
        </h2>
        <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
          <ul className="space-y-3 text-default-600">
            <li className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Target className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <strong>Precise Color Selection:</strong> Use the eyedropper tool carefully to select the exact color
                you need from specific areas of your image.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Palette className="w-4 h-4 text-secondary-500" />
              </div>
              <div>
                <strong>Choose the Right Format:</strong> Use HEX for web design, RGB for digital displays, and HSL for
                color theory and design work.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-success-100 dark:bg-success-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Layers className="w-4 h-4 text-success-500" />
              </div>
              <div>
                <strong>Explore Dominant Colors:</strong> Use the automatically extracted dominant colors to understand
                the overall color palette of your image.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-warning-100 dark:bg-warning-900/30 p-1 rounded-full mr-3 mt-0.5">
                <History className="w-4 h-4 text-warning-500" />
              </div>
              <div>
                <strong>Utilize Color History:</strong> Keep track of your previously picked colors using the color
                history feature for consistent color schemes.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-danger-100 dark:bg-danger-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Copy className="w-4 h-4 text-danger-500" />
              </div>
              <div>
                <strong>Quick Copy Function:</strong> Use the one-click copy feature to quickly transfer color values to
                your design software or code editor.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Eye className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <strong>Visual Verification:</strong> Always verify your selected colors visually to ensure they match
                your design requirements.
              </div>
            </li>
          </ul>
        </div>

        <p className="text-default-600 mt-8">
          Are you ready to explore the world of colors in your images? Now start using our image color picker and unlock
          the power of accurate color selection and analysis. Whether you are working on a complex project a
          professional designer or searching an enthusiastic color theory, our equipment provides the required insight
          and functionality for you. Try it today and see how it can increase your color workflow and inspire your
          creative projects!
        </p>
      </div>
    </Card>
  )
}
