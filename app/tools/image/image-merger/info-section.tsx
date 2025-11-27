"use client"

import { Card, CardBody } from "@nextui-org/react"
import {
  Info,
  BookOpen,
  Lightbulb,
  Code,
  Palette,
  Zap,
  Download,
  RefreshCw,
  AlertTriangle,
  Layers,
  Move,
  ChevronsLeftRight,
  Settings2,
  Check,
  FileUp,
  Shuffle,
  FileImage,
  Shield,
  Smartphone,
  ListPlus,
  Cpu,
  MonitorSmartphone,
  Globe,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionImageMerger() {
  // Image path
  const imagePath = "/Images/InfosectionImages/fused-image-sample.png"

  return (
    <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
      <CardBody className="p-2 md:p-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2 text-primary-500" />
          What is the Image Merger Tool?
        </h2>
        <p className="text-default-600 mb-4">
          The Image Merger Tool is a powerful web application designed for designers, photographers, and content
          creators who need to combine multiple images into a single composition. This versatile tool allows you to
          upload up to 5 images, arrange them in horizontal or vertical layouts, customize borders between images, and
          download the result in various formats. Whether you're creating collages, comparison images, or multi-panel
          graphics, this tool streamlines the process with an intuitive drag-and-drop interface and real-time preview.
        </p>

        <div className="my-8">
          <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <Image
                  src={imagePath || "/placeholder.svg?height=400&width=800"}
                  alt="A sample merged image showing a collage created with the tool"
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
          How to Use the Image Merger Tool?
        </h2>
        <ol className="list-none space-y-4 text-default-600">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
              1
            </span>
            <p className="flex-1">
              Click <strong>Add Layers</strong> or drag and drop images into the upload area to add up to 5 image
              layers.
            </p>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
              2
            </span>
            <p className="flex-1">Rearrange images by dragging them into your preferred order using the drag handles.</p>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
              3
            </span>
            <p className="flex-1">
              Select your preferred <strong>Composition Axis</strong> (Vertical Stack or Horizontal Array).
            </p>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
              4
            </span>
            <p className="flex-1">
              Choose a <strong>Layer Scaling Protocol</strong> to determine how images of different sizes are handled.
            </p>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
              5
            </span>
            <p className="flex-1">
              Customize the <strong>Inter-Layer Separator</strong> by adjusting the thickness and color of borders
              between images.
            </p>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
              6
            </span>
            <p className="flex-1">
              Toggle <strong>Maintain Aspect Ratio</strong> to preserve or adjust image proportions.
            </p>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
              7
            </span>
            <p className="flex-1">
              Click <strong>Initiate Fusion</strong> to merge your images (this happens automatically when settings
              change).
            </p>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
              8
            </span>
            <p className="flex-1">Select your preferred download format (PNG, JPEG, or WEBP).</p>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-medium">
              9
            </span>
            <p className="flex-1">
              Click <strong>Extract Result</strong> or <strong>Download Merged Image</strong> to save your creation.
            </p>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
              10
            </span>
            <p className="flex-1">
              Use <strong>Reverse Sequence</strong> to flip the order of your images or <strong>Reset</strong> to start
              over.
            </p>
          </li>
        </ol>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
          <div className="flex items-start gap-3">
            <Layers className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Multi-Image Support:</strong>
              <span className="block mt-1">
                Combine up to 5 images in a single composition with flexible arrangement options.
              </span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Move className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Intelligent Scaling:</strong>
              <span className="block mt-1">
                Choose from multiple scaling options to handle images of different dimensions.
              </span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Palette className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Customizable Separators:</strong>
              <span className="block mt-1">
                Add borders between images with adjustable thickness and color.
              </span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ChevronsLeftRight className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Drag & Drop Interface:</strong>
              <span className="block mt-1">
                Easily reorder images with intuitive drag and drop functionality.
              </span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Real-time Preview:</strong>
              <span className="block mt-1">See your changes instantly as you adjust settings.</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Download className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Multiple Export Formats:</strong>
              <span className="block mt-1">Download your merged image in PNG, JPEG, or WEBP format.</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <RefreshCw className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Sequence Control:</strong>
              <span className="block mt-1">Reverse image order or reset all settings with a single click.</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Error Handling:</strong>
              <span className="block mt-1">Helpful notifications guide you through the image merging process.</span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-primary-500" />
          Technical Specifications
        </h2>
        <div className="bg-default-100/50 dark:bg-default-200/20 p-5 rounded-lg">
          <ul className="space-y-3 text-default-600">
            <li className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <FileImage className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <strong>Supported Image Formats:</strong> All standard web formats including PNG, JPEG, GIF, and WEBP.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <ListPlus className="w-4 h-4 text-secondary-500" />
              </div>
              <div>
                <strong>Maximum Images:</strong> Up to 5 images can be combined in a single composition.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-success-100 dark:bg-success-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Shield className="w-4 h-4 text-success-500" />
              </div>
              <div>
                <strong>Processing:</strong> All image processing happens client-side for privacy and speed.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-warning-100 dark:bg-warning-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Cpu className="w-4 h-4 text-warning-500" />
              </div>
              <div>
                <strong>Canvas Technology:</strong> Uses HTML5 Canvas for high-quality image manipulation.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-danger-100 dark:bg-danger-900/30 p-1 rounded-full mr-3 mt-0.5">
                <MonitorSmartphone className="w-4 h-4 text-danger-500" />
              </div>
              <div>
                <strong>Responsive Design:</strong> Works on desktop and mobile devices with an adaptive interface.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Globe className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <strong>Browser Compatibility:</strong> Compatible with all modern browsers that support HTML5 Canvas.
              </div>
            </li>
          </ul>
        </div>

        <p className="text-default-600 mt-8">
          Ready to create stunning image compositions? Start merging your images now and transform your visual content
          with just a few clicks. Perfect for social media posts, product comparisons, before/after demonstrations, and
          creative collages!
        </p>
      </CardBody>
    </Card>
  )
}