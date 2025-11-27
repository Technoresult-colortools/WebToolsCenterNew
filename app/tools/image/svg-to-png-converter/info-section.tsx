"use client"

import { Card, CardBody } from "@nextui-org/react"
import {
  Info,
  BookOpen,
  Lightbulb,
  Sliders,
  Upload,
  Eye,
  Palette,
  Maximize2,
  Download,
  RefreshCw,
  Shield,
  HelpCircle,
  Settings2,
  Sparkles,
  Wand2,
  Layers,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionSvgToPng() {
  // Image path
  const imagePath = "/Images/InfosectionImages/SvgToPngConverterPreview.png"

  return (
    <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
      <CardBody className="p-2 md:p-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2 text-primary-500" />
          What is the SVG to PNG Converter?
        </h2>
        <p className="text-default-600 mb-4">
          The SVG to PNG converter is a powerful and user -friendly device designed to convert scalable vector graphics
          (SVG) into high quality portable network graphics (PNG) images. It is an essential utility for designers,
          developers and digital material creators, which need to convert their scalable vector designs into
          registration format for various applications. With our{" "}
          <Link href="#how-to-use" className="text-primary hover:underline">
            easy-to-use interface
          </Link>
          , you can quickly convert your SVG files while maintaining image quality and customizing output settings.
        </p>
        <p className="text-default-600 mb-4">
          Whether you are preparing graphics for web use, making app icons, or requiring the bitmap versions of your
          vector picture, streamlines our SVG to PNG converter process, saves you time and ensures frequent
          consequences in various platforms and equipment.
        </p>

        <div className="my-8">
          <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <Image
                  src={imagePath || "/placeholder.svg?height=400&width=800"}
                  alt="Screenshot of the SVG to PNG Converter interface showing conversion options and a sample converted image"
                  width={800}
                  height={400}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </Link>
        </div>

        <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
          How to Use the SVG to PNG Converter?
        </h2>
        <p className="text-default-600 mb-4">
          Converting your SVG files to PNG is a straightforward process with our tool. Here's a step-by-step guide:
        </p>
        <ol className="list-none space-y-4 text-default-600">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
              1
            </span>
            <div className="flex-1">
              <strong className="text-default-700">Upload SVG:</strong>
              <p className="text-default-600">Upload your SVG file using the file input or enter a valid SVG URL.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
              2
            </span>
            <div className="flex-1">
              <strong className="text-default-700">Adjust Settings:</strong>
              <p className="text-default-600">
                Preview your SVG and adjust the{" "}
                <Link href="#conversion-settings" className="text-primary hover:underline">
                  conversion settings
                </Link>{" "}
                as needed.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
              3
            </span>
            <div className="flex-1">
              <strong className="text-default-700">Convert:</strong>
              <p className="text-default-600">Click the "Convert" button to generate the PNG image.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
              4
            </span>
            <div className="flex-1">
              <strong className="text-default-700">Preview:</strong>
              <p className="text-default-600">Preview the converted PNG image to ensure it meets your requirements.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-medium">
              5
            </span>
            <div className="flex-1">
              <strong className="text-default-700">Download or Copy:</strong>
              <p className="text-default-600">Download the PNG file or copy the original SVG code if needed.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
              6
            </span>
            <div className="flex-1">
              <strong className="text-default-700">Reset:</strong>
              <p className="text-default-600">
                Use the "Reset" button to start a new conversion with different settings or a new file.
              </p>
            </div>
          </li>
        </ol>

        <h2
          id="conversion-settings"
          className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center"
        >
          <Sliders className="w-6 h-6 mr-2 text-primary-500" />
          Conversion Settings
        </h2>
        <p className="text-default-600 mb-4">
          Our SVG to PNG Converter offers several customization options to ensure your output matches your needs:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-default-600">
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg">
            <strong>Scale:</strong> Adjust the size of the output PNG relative to the original SVG.
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg">
            <strong>Background Color:</strong> Choose a custom background color or make it transparent.
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg">
            <strong>Export Size:</strong> Select from preset sizes or specify custom dimensions.
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg">
            <strong>Custom Dimensions:</strong> Set exact pixel dimensions for your PNG output.
          </div>
        </div>

        <h2 id="key-features" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
          <div className="flex items-start gap-3">
            <Upload className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Flexible Input:</strong>
              <span className="block mt-1">Upload SVG files or use URL input.</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Eye className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Live Preview:</strong>
              <span className="block mt-1">See your SVG and converted PNG before downloading.</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Palette className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Background Options:</strong>
              <span className="block mt-1">Choose custom colors or create transparent PNGs.</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Maximize2 className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Flexible Sizing:</strong>
              <span className="block mt-1">Use preset export sizes or specify custom dimensions.</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Download className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Easy Export:</strong>
              <span className="block mt-1">Download PNG or copy original SVG code.</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <RefreshCw className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Quick Reset:</strong>
              <span className="block mt-1">Start over with new settings or files easily.</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Secure Conversion:</strong>
              <span className="block mt-1">All processing done client-side for data privacy.</span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <HelpCircle className="w-6 h-6 mr-2 text-primary-500" />
          Tips for Optimal Conversion
        </h2>
        <div className="bg-default-100/50 dark:bg-default-200/20 p-5 rounded-lg">
          <ul className="space-y-3 text-default-600">
            <li className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Sparkles className="w-4 h-4 text-primary-500" />
              </div>
              <div>Use high-quality SVG files for the best PNG output.</div>
            </li>
            <li className="flex items-start">
              <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Wand2 className="w-4 h-4 text-secondary-500" />
              </div>
              <div>Adjust the scale to find the right balance between file size and image quality.</div>
            </li>
            <li className="flex items-start">
              <div className="bg-success-100 dark:bg-success-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Layers className="w-4 h-4 text-success-500" />
              </div>
              <div>
                Consider using transparent backgrounds for logos or icons that need to be placed on various colored
                backgrounds.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-warning-100 dark:bg-warning-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Maximize2 className="w-4 h-4 text-warning-500" />
              </div>
              <div>Use preset sizes for quick conversions tailored to specific platforms.</div>
            </li>
            <li className="flex items-start">
              <div className="bg-danger-100 dark:bg-danger-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Settings2 className="w-4 h-4 text-danger-500" />
              </div>
              <div>For precise control, use custom dimensions to fit your exact requirements.</div>
            </li>
            <li className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Eye className="w-4 h-4 text-primary-500" />
              </div>
              <div>Always preview your PNG before downloading to ensure it meets your expectations.</div>
            </li>
          </ul>
        </div>

        <p className="text-default-600 mt-8">
          Are you ready to convert your SVG files into high quality PNG images? Our SVG to PNG converter offers an ideal
          A mix of simplicity and powerful features to meet all your conversion needs. Whether you are a web Developer
          ensures cross-browsers compatibility, a graphic designer prepares property for various mediums, Or a digital
          market is making a view for many platforms, our tool is here to streamline you Workflow. Now start changing
          and experience the ease of professional-grade SVG for PNG conversion!
        </p>
      </CardBody>
    </Card>
  )
}