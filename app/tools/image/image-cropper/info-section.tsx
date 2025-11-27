"use client"

import { Card } from "@nextui-org/react"
import {
  Info,
  BookOpen,
  Lightbulb,
  Code,
  Crop,
  Zap,
  RotateCw,
  ZoomIn,
  SlidersHorizontal,
  Smartphone,
  Ratio,
  Square,
  RectangleVerticalIcon as Rectangle,
  Monitor,
  Tv,
  ImageIcon,
  Upload,
  Save,
  Eye,
  History,
  Scissors,
  Layers,
  FileImage,
} from "lucide-react"
import Link from "next/link"

export default function InfoSectionImageCropper() {
  // Image path
  const imagePath = "/Images/InfosectionImages/ImageCropperPreview.png"

  return (
    <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8">
      <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2 text-primary-500" />
          What is the Image Cropper?
        </h2>
        <p className="text-default-600 mb-4">
          The Image Cropper is a versatile image editing tool designed for photographers, designers, content creators,
          and anyone who needs to precisely crop and adjust images. This comprehensive utility provides an intuitive
          interface for cropping images with various aspect ratios, rotating and flipping images, adjusting brightness
          and contrast, and more. Whether you're preparing images for social media, websites, print materials, or
          personal projects, our tool gives you precise control over your image dimensions and appearance to enhance
          your visual content.
        </p>

        <div className="my-8">
          <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <img
                  src={imagePath || "/placeholder.svg?height=400&width=800"}
                  alt="Image Cropper Preview"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </Link>
        </div>

        <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
          How to Use the Image Cropper?
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-default-600">
          <li>
            <strong>Upload an image</strong> by clicking the "Upload Image" button or dragging and dropping an image
            file.
          </li>
          <li>
            Select the appropriate tab to access different editing options:
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
              <li>
                <strong>Crop:</strong> Select an aspect ratio and adjust the crop area by dragging the corners or edges
                of the selection.
              </li>
              <li>
                <strong>Adjust:</strong> Modify brightness and contrast to enhance your image.
              </li>
              <li>
                <strong>Export:</strong> Choose file format, quality, and download your cropped image.
              </li>
              <li>
                <strong>History:</strong> Access your editing history to revert to previous versions.
              </li>
            </ul>
          </li>
          <li>
            Use the <strong>rotation controls</strong> to rotate your image in 90-degree increments or use the slider
            for precise angles.
          </li>
          <li>
            Adjust the <strong>zoom level</strong> to focus on specific areas of your image.
          </li>
          <li>
            Use the <strong>flip buttons</strong> to mirror your image horizontally or vertically.
          </li>
          <li>
            Click the <strong>Crop Image</strong> button to apply your crop selection.
          </li>
          <li>
            Switch to the <strong>Export tab</strong> to select your preferred file format (JPEG, PNG, WebP) and
            quality.
          </li>
          <li>
            <strong>Download</strong> your cropped image in your chosen format or <strong>copy the image URL</strong>{" "}
            for use in other applications.
          </li>
          <li>
            Click on the preview image to view it in <strong>fullscreen mode</strong> for a better look at the final
            result.
          </li>
        </ol>

        <h2 id="aspect-ratios" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Ratio className="w-6 h-6 mr-2 text-primary-500" />
          Supported Aspect Ratios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
          <div className="flex items-start gap-3">
            <Crop className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Free:</strong>
              <span className="block mt-1">Crop without any aspect ratio constraints, giving you complete freedom to select any dimensions.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Square className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Square (1:1):</strong>
              <span className="block mt-1">Perfect for profile pictures, Instagram posts, and other square format images.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Rectangle className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Standard (4:3):</strong>
              <span className="block mt-1">Common aspect ratio for digital cameras, tablets, and standard displays.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Tv className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Widescreen (16:9):</strong>
              <span className="block mt-1">Ideal for videos, presentations, and widescreen displays.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Smartphone className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Portrait (9:16):</strong>
              <span className="block mt-1">Perfect for mobile stories, TikTok videos, and vertical content.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Monitor className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Classic (3:2):</strong>
              <span className="block mt-1">Traditional photography aspect ratio used in 35mm film and many DSLR cameras.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Smartphone className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Portrait (2:3):</strong>
              <span className="block mt-1">Vertical version of the classic photography ratio, good for portraits.</span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <FileImage className="w-6 h-6 mr-2 text-primary-500" />
          Supported Export Formats
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-md mb-1">JPEG</h3>
            <p className="text-xs">
              Best for photographs and complex images with many colors. Supports adjustable compression for balancing
              quality and file size.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-md mb-1">PNG</h3>
            <p className="text-xs">
              Ideal for images requiring transparency or when you need lossless compression to maintain maximum quality.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-md mb-1">WebP</h3>
            <p className="text-xs">
              Modern format that provides superior compression for web images, offering smaller file sizes than JPEG or
              PNG while maintaining quality.
            </p>
          </div>
        </div>

        <h2 id="key-features" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
          <div className="flex items-start gap-3">
            <Crop className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Precise Cropping:</strong>
              <span className="block mt-1">Crop images with pixel-perfect precision using an intuitive drag-and-drop interface.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Ratio className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Multiple Aspect Ratios:</strong>
              <span className="block mt-1">Choose from common aspect ratios or use free-form cropping for custom dimensions.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <RotateCw className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Rotation & Flipping:</strong>
              <span className="block mt-1">Rotate images to any angle and flip horizontally or vertically to correct orientation.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ZoomIn className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Zoom Controls:</strong>
              <span className="block mt-1">Zoom in to focus on details or zoom out to see the entire image during editing.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <SlidersHorizontal className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Image Adjustments:</strong>
              <span className="block mt-1">Fine-tune brightness and contrast to enhance the appearance of your images.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <History className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Edit History:</strong>
              <span className="block mt-1">Track your editing steps with redo functionality for a seamless editing experience.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Eye className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Fullscreen Preview:</strong>
              <span className="block mt-1">View your edited images in an immersive fullscreen mode for detailed inspection.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Smartphone className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Mobile-Friendly:</strong>
              <span className="block mt-1">Fully responsive design works seamlessly on smartphones and tablets with touch support.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FileImage className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Multiple Export Formats:</strong>
              <span className="block mt-1">Save your images in JPEG, PNG, or WebP formats with adjustable quality settings.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Upload className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Simple Upload:</strong>
              <span className="block mt-1">Drag and drop or click to upload images from your device with support for all common formats.</span>
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
              <ImageIcon className="w-4 h-4 mr-2 text-primary-500" /> Social Media
            </h3>
            <p className="text-sm">
              Crop images to the perfect dimensions for different social media platforms, including Instagram squares,
              Facebook covers, Twitter headers, and LinkedIn profiles.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Layers className="w-4 h-4 mr-2 text-secondary-500" /> Web Design
            </h3>
            <p className="text-sm">
              Prepare images for websites, blogs, and online stores with precise dimensions to ensure consistent layout
              and fast loading times.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Smartphone className="w-4 h-4 mr-2 text-success-500" /> Mobile Apps
            </h3>
            <p className="text-sm">
              Create perfectly sized images for mobile applications, ensuring they display correctly on various device
              screens and orientations.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Scissors className="w-4 h-4 mr-2 text-warning-500" /> Photo Editing
            </h3>
            <p className="text-sm">
              Remove unwanted elements from photos, improve composition, or focus on specific subjects by cropping out
              distractions.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Monitor className="w-4 h-4 mr-2 text-danger-500" /> Presentations
            </h3>
            <p className="text-sm">
              Format images for presentations, ensuring they fit perfectly into slides while maintaining visual impact
              and clarity.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Save className="w-4 h-4 mr-2 text-primary-500" /> Print Materials
            </h3>
            <p className="text-sm">
              Prepare images for printing in brochures, business cards, posters, and other physical materials with exact
              dimensions.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Zap className="w-6 h-6 mr-2 text-primary-500" />
          Advanced Tips
        </h2>
        <div className="bg-default-100/50 dark:bg-default-200/20 p-5 rounded-lg">
          <ul className="space-y-3 text-default-600">
            <li className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Crop className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <strong>Rule of Thirds:</strong> When cropping, align key elements with the imaginary grid lines that
                divide your image into thirds both horizontally and vertically. Placing important subjects at the
                intersections of these lines creates more balanced and engaging compositions.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <ZoomIn className="w-4 h-4 text-secondary-500" />
              </div>
              <div>
                <strong>Zoom for Precision:</strong> Use the zoom feature when making fine adjustments to your crop
                selection. Zooming in allows you to see exactly where your crop boundaries are and ensures you don't
                accidentally cut off important details.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-success-100 dark:bg-success-900/30 p-1 rounded-full mr-3 mt-0.5">
                <SlidersHorizontal className="w-4 h-4 text-success-500" />
              </div>
              <div>
                <strong>Adjust Before Cropping:</strong> For best results, make brightness and contrast adjustments
                before finalizing your crop. This helps you see the full impact of your adjustments on the final
                composition.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-warning-100 dark:bg-warning-900/30 p-1 rounded-full mr-3 mt-0.5">
                <FileImage className="w-4 h-4 text-warning-500" />
              </div>
              <div>
                <strong>Choose the Right Format:</strong> Select your export format based on your needs: JPEG for photos
                and general use, PNG for images with transparency, and WebP for web optimization with smaller file
                sizes.
              </div>
            </li>
          </ul>
        </div>

        <p className="text-default-600 mt-8">
          Whether you're a professional photographer refining your images, a social media manager preparing content, or
          anyone who needs to quickly adjust images, our Image Cropper provides the comprehensive tools you need to crop
          and enhance your visuals with precision and ease. Start using it today to transform your images and create
          perfectly sized visuals for any purpose.
        </p>
      </div>
    </Card>
  )
}
