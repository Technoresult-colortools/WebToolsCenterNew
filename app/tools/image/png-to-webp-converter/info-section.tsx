"use client"

import { Card } from "@nextui-org/react"
import {
  Info,
  BookOpen,
  Lightbulb,
  Sliders,
  CheckCircle2,
  Zap,
  Globe,
  Smartphone,
  Search,
  Layers,
  Film,
  Maximize,
  FileImage,
  Settings,
  Download,
  Shield,
  Scale,
  Eye,
  AlertCircle,
  Clock,
  ArrowRightLeft,
  UploadCloud,
  BarChart3
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionPngConverter() {
  // Image path
  const imagePath = "/Images/InfosectionImages/PngToWebPConverterPreview.png"

  return (
    <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
      <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
        {/* Intro Section */}
        <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2 text-primary-500" />
          What is the PNG to WebP Converter?
        </h2>
        <p className="text-default-600 mb-4">
          The PNG to WebP converter is a powerful tool designed to convert your PNG and JPEG images into a more efficient
          WebP format. Developed by Google, WebP offers better compression and quality characteristics, resulting in
          smaller file sizes without renouncing image quality. This converter is tailored for web developers, designers,
          content creators, and anyone looking to customize the performance of their website.
        </p>
        <p className="text-default-600 mb-4">
          With support for batch conversion, quality adjustment, resizing, and detailed figures, our converter makes
          optimizing your images easier and improves the loading time of your website. WebP images are usually 25–35%
          smaller than PNG and JPEG files, making them ideal for modern web applications.
        </p>

        {/* Image Preview */}
        <div className="my-8">
          <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <Image
                  src={imagePath || "/placeholder.svg?height=400&width=800"}
                  alt="PNG to WebP Converter Interface Preview"
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
          How to Use the PNG to WebP Converter?
        </h2>

        <ol className="list-none space-y-4 text-default-600">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
              1
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <UploadCloud className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <strong className="text-default-700">Upload your images:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Click the "Select PNG, JPG files" button or simply drag and drop your images into the designated upload area.
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
                <strong className="text-default-700">Configure settings:</strong>
              </div>
              <div className="ml-6 space-y-2">
                <div className="flex items-start gap-2">
                  <Sliders className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong className="text-default-700">Adjustment:</strong>
                    <span className="text-default-600 ml-1">Set your desired quality level and advanced conversion options if needed.</span>
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
                <ArrowRightLeft className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <strong className="text-default-700">Convert files:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Click the "Convert to WebP" button and wait a moment for the optimization process to complete.
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
                <strong className="text-default-700">Download results:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Review your size savings in the statistics panel, then download individual files or use "Download All" for bulk saving.
              </p>
            </div>
          </li>
        </ol>

        {/* Benefits Section (Mapped to Grid) */}
        <h2 id="benefits" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <CheckCircle2 className="w-6 h-6 mr-2 text-primary-500" />
          Benefits of Using WebP Format
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
          <div className="flex items-start gap-3">
            <FileImage className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Smaller File Sizes:</strong>
              <span className="block mt-1">
                WebP images are typically 25-35% smaller than PNGs and JPEGs without visible quality loss.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Faster Website Loading:</strong>
              <span className="block mt-1">
                Reduced file sizes mean quicker page loads, leading to better user experience and retention.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Search className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">SEO Advantages:</strong>
              <span className="block mt-1">
                Page speed is a crucial ranking factor; faster images help improve your search engine standing.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Layers className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Transparency Support:</strong>
              <span className="block mt-1">
                WebP supports alpha channel transparency just like PNG, but with much more efficient compression.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Film className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Animation Support:</strong>
              <span className="block mt-1">
                WebP can replace animated GIFs, offering superior quality with significantly smaller file sizes.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Globe className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Broad Browser Support:</strong>
              <span className="block mt-1">
                Modern browsers universally support WebP, making it a safe standard for web deployment.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Smartphone className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Lower Bandwidth Usage:</strong>
              <span className="block mt-1">
                Ideal for mobile users and visitors with limited data plans, reducing data consumption.
              </span>
            </div>
          </div>
        </div>

        {/* Advanced Features (Mapped to Boxed Grid) */}
        <h2 id="advanced-features" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Sliders className="w-6 h-6 mr-2 text-primary-500" />
          Advanced Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Sliders className="w-4 h-4 mr-2 text-primary-500" /> Quality Control
            </h3>
            <p className="text-sm">
              Fine-tune the compression level to find the perfect balance between file size and image fidelity.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Shield className="w-4 h-4 mr-2 text-secondary-500" /> Lossless Mode
            </h3>
            <p className="text-sm">
              Maintain perfect image quality with lossless compression options for pixel-perfect requirements.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Maximize className="w-4 h-4 mr-2 text-success-500" /> Image Resizing
            </h3>
            <p className="text-sm">
              Resize your images during the conversion process with options to preserve aspect ratio.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Layers className="w-4 h-4 mr-2 text-warning-500" /> Batch Processing
            </h3>
            <p className="text-sm">
              Convert multiple files simultaneously to save time, rather than processing images one by one.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <BarChart3 className="w-4 h-4 mr-2 text-danger-500" /> Statistics
            </h3>
            <p className="text-sm">
              Get comprehensive information about file size savings to understand the impact of optimization.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Eye className="w-4 h-4 mr-2 text-primary-500" /> Live Preview
            </h3>
            <p className="text-sm">
              Compare your images before and after conversion to ensure quality standards are met.
            </p>
          </div>
        </div>

        {/* Features That Make Us Stand Out (Mapped to Colored List) */}
        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
          Features That Make Us Stand Out
        </h2>
        <div className="bg-default-100/50 dark:bg-default-200/20 p-5 rounded-lg">
          <ul className="space-y-3 text-default-600">
            <li className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Zap className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <strong>Client-Side Processing:</strong> Your images never leave your computer, ensuring enhanced privacy and security.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Scale className="w-4 h-4 text-secondary-500" />
              </div>
              <div>
                <strong>Detailed Size Comparison:</strong> See exactly how much space you're saving with clear "before and after" metrics.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-success-100 dark:bg-success-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Eye className="w-4 h-4 text-success-500" />
              </div>
              <div>
                <strong>Image Preview:</strong> Review your converted images instantly to ensure they meet your quality expectations.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-warning-100 dark:bg-warning-900/30 p-1 rounded-full mr-3 mt-0.5">
                <AlertCircle className="w-4 h-4 text-warning-500" />
              </div>
              <div>
                <strong>Format Validation:</strong> We automatically check file compatibility before processing to prevent errors.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-danger-100 dark:bg-danger-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Download className="w-4 h-4 text-danger-500" />
              </div>
              <div>
                <strong>Bulk Download Options:</strong> Save time by downloading all your converted images at once with a single click.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Clock className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <strong>Progress Tracking:</strong> Monitor the conversion status of batch jobs in real-time.
              </div>
            </li>
          </ul>
        </div>

        <p className="text-default-600 mt-8">
          Ready to optimize your images and speed up your website? Try our PNG to WebP Converter now and experience the
          benefits of smaller, faster-loading images without compromising on quality. Whether you're a web developer
          looking to improve page performance or a content creator aiming to reduce storage usage, our tool provides the
          perfect solution for modern image optimization needs.
        </p>
      </div>
    </Card>
  )
}