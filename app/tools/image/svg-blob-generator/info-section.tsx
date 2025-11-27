"use client"

import { Card } from "@nextui-org/react"
import {
  Info,
  BookOpen,
  Lightbulb,
  Code,
  Sliders,
  ShuffleIcon,
  Palette,
  Eye,
  Download,
  FileImage,
  Zap,
  Layers,
  ImageIcon,
  Sparkles,
  Wand2,
  Settings,
  Settings2,
  SlidersHorizontal,
  Share2,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionSVGBlob() {
  // Image path
  const imagePath = "/Images/InfosectionImages/SVGBlobGeneratorPreview.png"

  return (
    <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
      <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2 text-primary-500" />
          What is the SVG Blob Generator?
        </h2>
        <p className="text-default-600 mb-4">
          The SVG Blob generator is a powerful and intuitive device designed to create unique, organic drop shapes for
          your design projects. These smooth, flowing shapes add a modern and playful aesthetics for websites,
          presentations and graphic designs. With our generator, you can create a custom SVG blob which are fully
          scalable, light and ready to use in any digital project.
        </p>
        <p className="text-default-600 mb-4">
          Unlike static design elements, our drop generator gives you complete control over every aspect of the presence
          of your drop. Adjust parameters such as growth, edge count, complexity and lubrication to create anything from
          simple, round shapes to complex, uncontrolled forms. You can also fill your drops with images for creative
          masking effects or use solid colors for clean, minimal designs.
        </p>

        <div className="my-8">
          <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <Image
                  src={imagePath || "/placeholder.svg?height=400&width=800"}
                  alt="SVG Blob Generator Preview"
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
          How to Use the SVG Blob Generator?
        </h2>

        <ol className="list-none space-y-4 text-default-600">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
              1
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <strong className="text-default-700">Generate a blob shape:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Start with the default shape or click "Shuffle Blob" or "Randomize All" to generate new ones.
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
                <strong className="text-default-700">Customize the shape:</strong>
              </div>
              <div className="ml-6 space-y-2">
                <div className="flex items-start gap-2">
                  <Settings2 className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong className="text-default-700">Basic Properties:</strong>
                    <span className="text-default-600 ml-1">Adjust Growth, Edge Count, and Complexity sliders.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <SlidersHorizontal className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong className="text-default-700">Advanced Properties:</strong>
                    <span className="text-default-600 ml-1">Fine-tune Smoothness, Wave Frequency, and Amplitude.</span>
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
                <strong className="text-default-700">Set the appearance:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Choose a solid fill color with the color picker or toggle "Use Image Background" to fill the blob with an image.
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
                <strong className="text-default-700">Export your design:</strong>
              </div>
              <p className="text-default-600 ml-6">
                When you're happy with the result, save it as an SVG or PNG file, or copy the SVG code to your clipboard.
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
            <Sliders className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Comprehensive Controls:</strong>
              <span className="block mt-1">
                Fine-tune every aspect of your blob with intuitive sliders for growth, edge count, complexity, and
                smoothness.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShuffleIcon className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Randomization Options:</strong>
              <span className="block mt-1">
                Quickly generate new shapes with shuffle and randomize features for instant creative inspiration.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Palette className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Flexible Styling:</strong>
              <span className="block mt-1">
                Choose between solid colors or image backgrounds for versatile designs that match your brand.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Eye className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Real-time Preview:</strong>
              <span className="block mt-1">
                See changes instantly as you adjust parameters, allowing for rapid iteration and experimentation.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Download className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Multiple Export Formats:</strong>
              <span className="block mt-1">
                Save your creations as SVG or PNG files with adjustable quality and dimensions.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Code className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Code Access:</strong>
              <span className="block mt-1">
                Copy the SVG code directly for easy integration into your projects and version control systems.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FileImage className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Image Masking:</strong>
              <span className="block mt-1">
                Create unique visual effects by clipping images to your blob shape for creative compositions.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Settings className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Advanced Curve Options:</strong>
              <span className="block mt-1">
                Switch between simple and advanced curve generation methods for different aesthetic results.
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
              <ImageIcon className="w-4 h-4 mr-2 text-primary-500" /> Website Backgrounds
            </h3>
            <p className="text-sm">
              Create dynamic, organic background elements for hero sections, landing pages, and website headers that add
              visual interest without overwhelming content.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Layers className="w-4 h-4 mr-2 text-secondary-500" /> Graphic Design
            </h3>
            <p className="text-sm">
              Add modern, playful shapes to posters, social media graphics, presentations, and marketing materials for a
              contemporary aesthetic.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-success-500" /> Brand Identity
            </h3>
            <p className="text-sm">
              Develop unique brand elements and visual motifs that can be consistently applied across all brand
              touchpoints and marketing channels.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Wand2 className="w-4 h-4 mr-2 text-warning-500" /> UI Elements
            </h3>
            <p className="text-sm">
              Design custom buttons, badges, avatars, and decorative elements that break away from traditional geometric
              shapes for unique interfaces.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <FileImage className="w-4 h-4 mr-2 text-danger-500" /> Image Frames
            </h3>
            <p className="text-sm">
              Use blob shapes as creative image masks to display photos and illustrations in unique, eye-catching ways
              that stand out from standard rectangles.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Zap className="w-4 h-4 mr-2 text-primary-500" /> Animations
            </h3>
            <p className="text-sm">
              Generate multiple blob variations to create smooth morphing animations for websites and digital
              experiences that capture attention.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Zap className="w-6 h-6 mr-2 text-primary-500" />
          Creative Tips and Tricks
        </h2>
        <div className="bg-default-100/50 dark:bg-default-200/20 p-5 rounded-lg">
          <ul className="space-y-3 text-default-600">
            <li className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Sparkles className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <strong>For smooth, cloud-like blobs:</strong> Use higher edge counts (10-15) with high smoothness
                (0.7-1.0) and low complexity (0.2-0.4) to create soft, organic shapes perfect for backgrounds.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Wand2 className="w-4 h-4 text-secondary-500" />
              </div>
              <div>
                <strong>For abstract, angular shapes:</strong> Try lower edge counts (3-6) with low smoothness (0-0.3)
                and high complexity (0.7-1.0) for bold, geometric-inspired designs.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-success-100 dark:bg-success-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Layers className="w-4 h-4 text-success-500" />
              </div>
              <div>
                <strong>For subtle background elements:</strong> Create large, gentle blobs with high growth (8-10) and
                moderate smoothness (0.5-0.7) that complement without distracting from content.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-warning-100 dark:bg-warning-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Zap className="w-4 h-4 text-warning-500" />
              </div>
              <div>
                <strong>For dynamic, flowing shapes:</strong> Increase wave frequency (6-10) and amplitude (0.6-0.9)
                with moderate edge count (8-12) to create energetic, movement-filled designs.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-danger-100 dark:bg-danger-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Settings className="w-4 h-4 text-danger-500" />
              </div>
              <div>
                <strong>For consistent brand elements:</strong> Save your favorite parameter combinations to recreate
                similar blob styles across projects and maintain visual consistency.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Layers className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <strong>For layered designs:</strong> Export multiple blobs with slight variations and stack them with
                different opacities in your design software for depth and dimension.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Zap className="w-4 h-4 text-secondary-500" />
              </div>
              <div>
                <strong>For animated websites:</strong> Export several blob variations and use CSS or JavaScript to
                morph between them for engaging, dynamic user experiences.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-success-100 dark:bg-success-900/30 p-1 rounded-full mr-3 mt-0.5">
                <FileImage className="w-4 h-4 text-success-500" />
              </div>
              <div>
                <strong>For creative image displays:</strong> Use the image background feature with photos to create
                unique, organic image frames that break away from traditional rectangular layouts.
              </div>
            </li>
          </ul>
        </div>

        <p className="text-default-600 mt-8">
          Ready to add organic, fluid shapes to your design toolkit? Our SVG Blob Generator makes it easy to create
          custom, scalable vector graphics that can enhance any project. Whether you're looking for subtle background
          elements or bold, eye-catching shapes, the possibilities are endless. Start experimenting with different
          parameters to discover unique blob designs that perfectly complement your creative vision!
        </p>
      </div>
    </Card>
  )
}
