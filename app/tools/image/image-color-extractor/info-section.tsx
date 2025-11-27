"use client"

import { Card } from "@nextui-org/react"
import {
  Info,
  BookOpen,
  Lightbulb,
  Code,
  Palette,
  Zap,
  Eye,
  Copy,
  Settings,
  Upload,
  Smartphone,
  Monitor,
  Layers,
  FileImage,
  Hash,
  Pipette,
  CloudHail as ColorWheel,
  Brush,
  ImageIcon,
  Scissors,
  RotateCcw,
  Share2,
  FileText,
  UploadCloud,
} from "lucide-react"
import Link from "next/link"

export default function InfoSectionImageColorExtractor() {
  // Image path
  const imagePath = "/Images/InfosectionImages/ImageColorExtractorPreview.png"

  return (
    <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8">
      <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2 text-primary-500" />
          What is the Image Color Extractor?
        </h2>
        <p className="text-default-600 mb-4">
          The Image Color Extractor is a sophisticated color analysis tool designed for designers, artists, developers,
          and creative professionals who need to identify and extract color palettes from images. This comprehensive
          utility analyzes uploaded images to detect dominant colors, providing detailed color information in multiple
          formats including HEX, RGB, and HSL values. Whether you're creating brand guidelines, developing color schemes
          for websites, or seeking inspiration for your next creative project, our tool delivers precise color data to
          enhance your workflow and creative process.
        </p>

        <div className="my-8">
          <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <img
                  src={imagePath || "/placeholder.svg?height=400&width=800"}
                  alt="Image Color Extractor Preview"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </Link>
        </div>

       <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
          How to Use the Image Color Extractor?
        </h2>

        <ol className="list-none space-y-4 text-default-600">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
              1
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <UploadCloud className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <strong className="text-default-700">Upload your image:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Drag and drop a file or click to browse. The analysis starts automatically.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
              2
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Settings className="w-4 h-4 text-green-500 flex-shrink-0" />
                <strong className="text-default-700">Customize your palette:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Use the dropdown menu to select the number of colors you want to extract (from 2 to 21).
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
              3
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Eye className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <strong className="text-default-700">Explore extracted colors:</strong>
              </div>
              <div className="ml-6 space-y-2">
                <div className="flex items-start gap-2">
                  <Palette className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong className="text-default-700">View Swatches:</strong>
                    <span className="text-default-600 ml-1">Colors are displayed in an organized grid for easy comparison.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FileText className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong className="text-default-700">Switch Formats:</strong>
                    <span className="text-default-600 ml-1">Use the tabs to switch between HEX, RGB, and HSL values.</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
              4
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Share2 className="w-4 h-4 text-purple-500 flex-shrink-0" />
                <strong className="text-default-700">Copy and save your palette:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Click the copy icon next to any color to copy its value, or save all values for your project.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-medium">
              5
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-red-500 flex-shrink-0" />
                <strong className="text-default-700">Analyze a new image:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Upload another file to clear the current results and start a new analysis.
              </p>
            </div>
          </li>
        </ol>

        <h2 id="key-features" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
          <div className="flex items-start gap-3">
            <Palette className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Advanced Color Detection:</strong>
              <span className="block mt-1">
                Extract 2-21 dominant colors with intelligent algorithm that analyzes color frequency and distribution.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Hash className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Multiple Color Formats:</strong>
              <span className="block mt-1">
                View colors in HEX, RGB, and HSL formats with instant switching between formats.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Copy className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">One-Click Copying:</strong>
              <span className="block mt-1">
                Instantly copy color values to clipboard with a single click for seamless workflow integration.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Eye className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Visual Color Swatches:</strong>
              <span className="block mt-1">
                Large, clear color swatches with values displayed for easy identification and comparison.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Settings className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Customizable Extraction:</strong>
              <span className="block mt-1">
                Adjust the number of extracted colors to match your project needs and complexity requirements.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Upload className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Drag & Drop Upload:</strong>
              <span className="block mt-1">
                Simple file upload with drag-and-drop support for all common image formats (JPG, PNG, WebP, GIF).
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Real-Time Analysis:</strong>
              <span className="block mt-1">
                Instant color extraction and display with fast processing for immediate results.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Smartphone className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Mobile-Responsive:</strong>
              <span className="block mt-1">
                Fully optimized for mobile devices with touch-friendly interface and responsive design.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <RotateCcw className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Easy Reset:</strong>
              <span className="block mt-1">
                Quick reset functionality to analyze multiple images in succession without page reload.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FileImage className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Universal Image Support:</strong>
              <span className="block mt-1">
                Compatible with all major image formats including JPEG, PNG, WebP, GIF, and BMP files.
              </span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-primary-500" />
          Use Cases
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Brush className="w-4 h-4 mr-2 text-primary-500" /> Brand Design
            </h3>
            <p className="text-sm">
              Extract colors from logos, brand materials, or inspiration images to create consistent brand color
              palettes and style guides for marketing materials.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Monitor className="w-4 h-4 mr-2 text-secondary-500" /> Web Development
            </h3>
            <p className="text-sm">
              Generate color schemes for websites and applications by analyzing design mockups, competitor sites, or
              inspiration images to create cohesive digital experiences.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Layers className="w-4 h-4 mr-2 text-success-500" /> Graphic Design
            </h3>
            <p className="text-sm">
              Analyze artwork, photographs, or design references to extract color palettes for posters, brochures, and
              other print or digital design projects.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <ImageIcon className="w-4 h-4 mr-2 text-warning-500" /> Photography
            </h3>
            <p className="text-sm">
              Identify dominant colors in photographs for color grading, mood analysis, or creating complementary color
              schemes for photo series and portfolios.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Pipette className="w-4 h-4 mr-2 text-danger-500" /> Interior Design
            </h3>
            <p className="text-sm">
              Extract colors from room photos, furniture, or decor inspiration to create harmonious color schemes for
              interior design projects and home decoration.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Scissors className="w-4 h-4 mr-2 text-primary-500" /> Fashion Design
            </h3>
            <p className="text-sm">
              Analyze fashion photography, fabric samples, or trend images to develop color palettes for clothing
              collections and fashion design projects.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Zap className="w-6 h-6 mr-2 text-primary-500" />
          Advanced Tips
        </h2>
        <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
          <ul className="space-y-3 text-default-600">
            <li className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Palette className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <strong>Optimal Image Quality:</strong> Use high-resolution images with good lighting for more accurate
                color extraction. Avoid heavily compressed or low-quality images that may have color distortion or
                artifacts that could affect the analysis results.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Settings className="w-4 h-4 text-secondary-500" />
              </div>
              <div>
                <strong>Adjust Color Count:</strong> Start with fewer colors (3-5) for simple palettes, then increase
                the count for more detailed analysis. More colors provide nuanced variations but may include less
                significant tones that could clutter your palette.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-success-100 dark:bg-success-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Eye className="w-4 h-4 text-success-500" />
              </div>
              <div>
                <strong>Consider Context:</strong> Remember that extracted colors may appear different when used in
                isolation versus within the original image context. Test your extracted colors in your actual design
                environment to ensure they work harmoniously.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-warning-100 dark:bg-warning-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Copy className="w-4 h-4 text-warning-500" />
              </div>
              <div>
                <strong>Organize Your Palette:</strong> Copy colors in a systematic order and save them in your design
                tools or create a reference document. Consider grouping similar tones together and noting their intended
                use (primary, accent, neutral) for future reference.
              </div>
            </li>
          </ul>
        </div>

        <p className="text-default-600 mt-8">
          Whether you're a professional designer seeking inspiration, a developer building color-consistent interfaces,
          or a creative exploring color relationships in visual content, our Image Color Extractor provides the precise
          tools you need to analyze and extract meaningful color data. Start using it today to unlock the hidden color
          stories within your images and transform your creative workflow with data-driven color decisions.
        </p>
      </div>
    </Card>
  )
}
