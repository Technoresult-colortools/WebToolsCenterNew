"use client"

import { Card } from "@nextui-org/react"
import {
  Info,
  BookOpen,
  Lightbulb,
  Pipette,
  UploadCloud,
  Target,
  Palette,
  Copy,
  Layers,
  History,
  RefreshCw,
  Smartphone,
  Wand2,
  CheckCircle2,
  MousePointerClick,
  Monitor,
  Brush,
  Eye
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionImageColorPicker() {
  // Image path
  const imagePath = "/Images/InfosectionImages/ImageColorPickerPreview.png"

  return (
    <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
      <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
        {/* Intro Section */}
        <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2 text-primary-500" />
          What is the Image Color Picker?
        </h2>
        <p className="text-default-600 mb-4">
          Think of the <Link href="#how-to-use" className="text-primary-500 hover:underline">Image Color Picker</Link> as a digital pipette for your screen. It is a powerful design instrument that allows you to upload any image and extract exact color data with surgical precision. It transforms visual inspiration into usable technical data instantly.
        </p>
        <p className="text-default-600 mb-4">
          Whether you are a developer matching a UI component to a brand asset, a designer building a cohesive palette, or a color enthusiast analyzing a sunset, this tool bridges the gap between what you see and what you code. From individual pixel selection to automatic dominant color extraction, it provides the accurate HEX, RGB, and HSL values you need.
        </p>

        {/* Image Preview */}
        <div className="my-8">
          <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <Image
                  src={imagePath || "/placeholder.svg?height=400&width=800"}
                  alt="Image Color Picker Interface Preview"
                  width={800}
                  height={400}
                  className="w-full h-auto object-contain"
                  unoptimized={true}
                />
              </div>
            </div>
          </Link>
        </div>

        {/* How to Use Section */}
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
                <strong className="text-default-700">Upload Your Image:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Click the upload area or simply <strong>drag and drop</strong> your file to load the image onto the canvas. High-resolution images are supported for maximum detail.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
              2
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Pipette className="w-4 h-4 text-green-500 flex-shrink-0" />
                <strong className="text-default-700">Pick and Extract:</strong>
              </div>
              <div className="ml-6 space-y-2">
                <div className="flex items-start gap-2">
                  <Target className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong className="text-default-700">Activate Eyedropper:</strong>
                    <span className="text-default-600 ml-1">Click the "Pick Image Color" button and hover over the image to select a specific pixel with <strong>pinpoint accuracy</strong>.</span>
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
                <Palette className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <strong className="text-default-700">Format & Analysis:</strong>
              </div>
              <p className="text-default-600 ml-6">
                View the selected color in <strong>HEX, RGB, or HSL</strong> formats. You can also explore the <strong>Dominant Colors</strong> section to see the primary palette of the entire image.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
              4
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Copy className="w-4 h-4 text-purple-500 flex-shrink-0" />
                <strong className="text-default-700">Copy and History:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Click <strong>Copy</strong> to send the value to your clipboard. Use the <strong>Color History</strong> (<History className="w-3 h-3 inline" />) section to revisit previously picked shades.
              </p>
            </div>
          </li>
        </ol>

        {/* Key Features Grid */}
        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
          Key Features for Designers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
          <div className="flex items-start gap-3">
            <Pipette className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Precise Eyedropper:</strong>
              <span className="block mt-1">Select colors from any specific area of your image with pixel-perfect accuracy.</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Layers className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Palette Extraction:</strong>
              <span className="block mt-1">Automatically analyzes the image to identify and extract the most dominant color themes.</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <RefreshCw className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Format Switching:</strong>
              <span className="block mt-1">Seamlessly toggle between HEX, RGB, and HSL values to match your project's technical needs.</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <History className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Color History Tracking:</strong>
              <span className="block mt-1">Automatically saves your recently picked colors for easy access during your design session.</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MousePointerClick className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Interactive Canvas:</strong>
              <span className="block mt-1">A smooth, hardware-accelerated preview area that handles high-resolution images with ease.</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Mobile Optimized:</strong>
              <span className="block mt-1">Fully responsive design allows you to pick and save colors on the go from any device.</span>
            </div>
          </div>
        </div>

        {/* Pro Tips / Security Style Section */}
        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Wand2 className="w-6 h-6 mr-2 text-primary-500" />
          Pro Tips & Best Practices
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
            <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
              <Target className="w-4 h-4 text-success-500" /> Precision Zoom
            </h3>
            <p className="text-sm">
              Zoom into your browser if you're struggling to pick a tiny detail; the eyedropper respects the rendered pixel coordinates perfectly.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
            <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
              <Palette className="w-4 h-4 text-secondary-500" /> Harmonize
            </h3>
            <p className="text-sm">
              Use the <strong>Dominant Colors</strong> list to create backgrounds and accents that are guaranteed to match your hero imagery.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
            <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-warning-500" /> Context Check
            </h3>
            <p className="text-sm">
              Always test your picked colors in both light and dark backgrounds to ensure text legibility and accessibility compliance.
            </p>
          </div>
        </div>

        {/* Applications / Use Cases Section */}
        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Monitor className="w-6 h-6 mr-2 text-primary-500" />
          Real-World Applications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
          <div className="border border-default-200 p-3 rounded-lg">
            <h4 className="font-medium mb-1 flex items-center gap-2"><Brush className="w-4 h-4 text-success-500" /> UI Development</h4>
            <p className="text-xs">Extracting exact color codes from design mockups or logos to implement perfectly in CSS or Tailwind themes.</p>
          </div>
          <div className="border border-default-200 p-3 rounded-lg">
            <h4 className="font-medium mb-1 flex items-center gap-2"><Eye className="w-4 h-4 text-secondary-500" /> Visual Analysis</h4>
            <p className="text-xs">Analyzing photographs to understand lighting composition or finding the average color temperature of a scene.</p>
          </div>
          <div className="border border-default-200 p-3 rounded-lg">
            <h4 className="font-medium mb-1 flex items-center gap-2"><Layers className="w-4 h-4 text-warning-500" /> Brand Consistency</h4>
            <p className="text-xs">Ensuring marketing materials match established brand guidelines by verifying color values directly from assets.</p>
          </div>
        </div>

        {/* Outro */}
        <p className="text-default-600 mt-8">
          The Image Color Picker is an essential asset for anyone working with digital visuals. By combining ease of use with professional-grade accuracy, you can build your dream palettes and ensure design consistency with absolute confidence. Start picking your colors today!
        </p>
      </div>
    </Card>
  )
}