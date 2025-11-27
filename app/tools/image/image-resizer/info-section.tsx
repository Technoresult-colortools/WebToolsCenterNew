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
  SlidersHorizontal,
  Smartphone,
  Share2,
  Palette,
  Sparkles,
  Mountain,
  ImageUp,
  Download,
  Settings2,
  Settings,
  UploadCloud,
  Maximize2,
  LucideRatio as AspectRatio,
  Repeat,
  FileImage,
  Zap,
  RefreshCw,
} from "lucide-react"

export default function InfoSectionImageResizer() {
  // Image path
  const imagePath = "/Images/InfosectionImages/ImageResizerPreview.png"

  return (
    <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8">
      <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2 text-primary-500" />
          About Image Resizer
        </h2>
        <p className="text-default-600 mb-4">
          The Image Resizer is a powerful tool designed to help you resize your images with quick and easy accuracy and
          flexibility. Whether you are preparing images for web usage, social media, or any other purpose requiring
          specific dimensions, this tool provides you with many features to get accurate results.
        </p>
        <p className="text-default-600 mb-4">
          With support for multiple image formats, adjustable quality settings, social media presets, and aspect ratio
          preservation, our image resizer meets both casual users and professionals who demand control over their image
          output.
        </p>

        <div className="my-8">
          <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <NextImage
                  src={imagePath}
                  alt="Screenshot of the Enhanced Image Resizer interface showing various resizing options and a sample resized image"
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
          How to Use Enhanced Image Resizer?
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
                Click the "Select an image file" button or drag and drop an image onto the designated area.
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
                <strong className="text-default-700">Preview your image:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Once uploaded, you'll see a preview of the original image in the "Preview & Info" tab.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
              3
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Settings className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <strong className="text-default-700">Configure resize settings:</strong>
              </div>
              <div className="ml-6 space-y-2">
                <div className="flex items-start gap-2">
                  <Share2 className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong className="text-default-700">Social Media Presets:</strong>
                    <span className="text-default-600 ml-1">
                      Choose from platform-specific presets for Instagram, Facebook, Twitter, LinkedIn, and YouTube.
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Maximize2 className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong className="text-default-700">Custom Dimensions:</strong>
                    <span className="text-default-600 ml-1">
                      Use the width and height inputs to set your desired dimensions manually.
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <AspectRatio className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong className="text-default-700">Aspect Ratio:</strong>
                    <span className="text-default-600 ml-1">
                      Toggle "Preserve aspect ratio" to maintain image proportions.
                    </span>
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
                <FileImage className="w-4 h-4 text-purple-500 flex-shrink-0" />
                <strong className="text-default-700">Choose output format:</strong>
              </div>
              <div className="ml-6 space-y-2">
                <div className="flex items-start gap-2">
                  <Palette className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong className="text-default-700">Format Selection:</strong>
                    <span className="text-default-600 ml-1">
                      Select your preferred output format (PNG, JPEG, or WebP).
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <SlidersHorizontal className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong className="text-default-700">Quality Settings:</strong>
                    <span className="text-default-600 ml-1">
                      Adjust quality as needed for optimal file size and image clarity.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-medium">
              5
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-red-500 flex-shrink-0" />
                <strong className="text-default-700">Resize and download:</strong>
              </div>
              <div className="ml-6 space-y-2">
                <div className="flex items-start gap-2">
                  <ImageUp className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong className="text-default-700">Process Image:</strong>
                    <span className="text-default-600 ml-1">Click "Resize Image" to generate your resized image.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Download className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong className="text-default-700">Save Result:</strong>
                    <span className="text-default-600 ml-1">
                      The app will switch to the "Result" tab - click "Download Image" to save.
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <RefreshCw className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong className="text-default-700">Reset if Needed:</strong>
                    <span className="text-default-600 ml-1">
                      Use "Reset Settings" to revert all settings and start over.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ol>

        <h2 id="key-features" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
          Key Features of Image Resizer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
          <div className="flex items-start gap-3">
            <Share2 className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Social Media Presets:</strong>
              <span className="block mt-1">
                Pre-configured dimensions for Instagram, Facebook, Twitter, LinkedIn, and YouTube platforms.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FileImage className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Multiple Format Support:</strong>
              <span className="block mt-1">
                Support for various image formats including PNG, JPEG, and WebP for input and output.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Maximize2 className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Precise Dimension Control:</strong>
              <span className="block mt-1">Accurate width and height adjustments with pixel-perfect precision.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <AspectRatio className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Aspect Ratio Preservation:</strong>
              <span className="block mt-1">Option to maintain original proportions for distortion-free resizing.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Repeat className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Quick Dimension Swapping:</strong>
              <span className="block mt-1">
                Easy one-click orientation changes for landscape to portrait conversion.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <SlidersHorizontal className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Adjustable Quality Settings:</strong>
              <span className="block mt-1">
                Fine-tune compression levels for optimized file sizes without sacrificing quality.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Eye className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Real-Time Preview:</strong>
              <span className="block mt-1">Instant preview of resized images before processing and downloading.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">High-Quality Algorithm:</strong>
              <span className="block mt-1">
                Advanced resizing technology ensures crisp, clear results at any dimension.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Download className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">One-Click Download:</strong>
              <span className="block mt-1">Simple, fast download process for immediate access to resized images.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <RefreshCw className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Reset Functionality:</strong>
              <span className="block mt-1">
                Quick reset option to clear all settings and start fresh with new parameters.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Responsive Design:</strong>
              <span className="block mt-1">Seamless functionality across desktop, tablet, and mobile devices.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Settings2 className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Tabbed Interface:</strong>
              <span className="block mt-1">
                Organized workflow with separate tabs for preview, settings, and results.
              </span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Wand2 className="w-6 h-6 mr-2 text-primary-500" />
          Tips and Best Practices
        </h2>
        <div className="bg-default-100/50 dark:bg-default-200/20 p-5 rounded-lg">
          <ul className="space-y-3 text-default-600">
            <li className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <AspectRatio className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <strong>Preserve Aspect Ratio:</strong> Use the "Preserve aspect ratio" option to avoid image distortion
                when resizing for most applications.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <FileImage className="w-4 h-4 text-secondary-500" />
              </div>
              <div>
                <strong>Choose the Right Format:</strong> PNG for images with text or sharp edges, JPEG for photographs,
                WebP for optimal web compression.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-success-100 dark:bg-success-900/30 p-1 rounded-full mr-3 mt-0.5">
                <SlidersHorizontal className="w-4 h-4 text-success-500" />
              </div>
              <div>
                <strong>Balance Quality and Size:</strong> Experiment with the quality slider to find the optimal
                balance between image quality and file size.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-warning-100 dark:bg-warning-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Mountain className="w-4 h-4 text-warning-500" />
              </div>
              <div>
                <strong>Enlargement Considerations:</strong> Be aware that enlarging images may result in some quality
                loss or pixelation depending on the original resolution.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-danger-100 dark:bg-danger-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Share2 className="w-4 h-4 text-danger-500" />
              </div>
              <div>
                <strong>Research Platform Requirements:</strong> For social media platforms, research the recommended
                image sizes for optimal display and engagement.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Repeat className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <strong>Use Dimension Swapping:</strong> Utilize the "Swap Dimensions" button to quickly create both
                landscape and portrait versions of your image.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Eye className="w-4 h-4 text-secondary-500" />
              </div>
              <div>
                <strong>Always Preview First:</strong> Review your resized image in the preview before downloading to
                ensure it meets your requirements.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-success-100 dark:bg-success-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Settings className="w-4 h-4 text-success-500" />
              </div>
              <div>
                <strong>Consider Intended Use:</strong> Think about the final application of your image when choosing
                between quality and file size optimization.
              </div>
            </li>
          </ul>
        </div>

        <p className="text-default-600 mt-8">
          Image resizing is a versatile tool that handles a wide range of image sizing needs. Whether you're a
          professional designer, a social media manager, or just someone who needs to resize images occasionally, this
          tool provides the flexibility and accuracy you need to achieve perfect results every time. Start resizing your
          images with confidence and ease!
        </p>
      </div>
    </Card>
  )
}
