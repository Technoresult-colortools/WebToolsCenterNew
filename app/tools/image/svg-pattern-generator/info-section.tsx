"use client"

import { Card } from "@nextui-org/react"
import {
  Info,
  BookOpen,
  Lightbulb,
  Code,
  Sliders,
  RefreshCw,
  Palette,
  Eye,
  Download,
  ImageIcon,
  Sparkles,
  Layers,
  Grid,
  Maximize2,
  Zap,
  FileImage,
  Settings,
  Share2,
  SlidersHorizontal,
  Settings2,
  Filter,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionSVGPattern() {
  // Image path
  const imagePath = "/Images/InfosectionImages/SVGPatternGeneratorPreview.png"

  return (
    <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
      <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2 text-primary-500" />
          What is the SVG Pattern Generator?
        </h2>
        <p className="text-default-600 mb-4">
          The SVG pattern generator is a powerful and versatile tool designed to create unique, repeated vector patterns
          for various design purposes. Whether you are a web designer, graphic artist, or someone is looking to add
          visual interest to your projects, this device easily provides an introspection interface to craft the custom,
          scalable vector graphics.
        </p>
        <p className="text-default-600 mb-4">
          With a wide range of adjustable parameters and real-time previews, you can fix your patterns to fully fit your
          design needs. The generator offers options for different patterns, color adaptation and even custom image
          uploads, which allows for versatile applications in web design, digital art, print material and more.
        </p>

        <div className="my-8">
          <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <Image
                  src={imagePath || "/placeholder.svg?height=400&width=800"}
                  alt="SVG Pattern Generator Preview"
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
          How to Use the SVG Pattern Generator?
        </h2>

        <ol className="list-none space-y-4 text-default-600">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
              1
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Filter className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <strong className="text-default-700">Choose a pattern type:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Select a base pattern from the dropdown, upload a custom image, or click "Randomize" for new ideas.
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
                <strong className="text-default-700">Adjust pattern properties:</strong>
              </div>
              <div className="ml-6 space-y-2">
                <div className="flex items-start gap-2">
                  <Settings2 className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong className="text-default-700">Basic Adjustments:</strong>
                    <span className="text-default-600 ml-1">Control the size, spacing, rotation, and opacity.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <SlidersHorizontal className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong className="text-default-700">Advanced Details:</strong>
                    <span className="text-default-600 ml-1">Modify complexity and stroke width for finer control.</span>
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
                <strong className="text-default-700">Select your colors:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Use the color pickers to choose colors for the pattern elements and the background.
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
                Set your export dimensions, choose SVG or PNG, and download the file or copy the SVG code.
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
            <Grid className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Multiple Pattern Types:</strong>
              <span className="block mt-1">
                Choose from a variety of pattern styles including geometric shapes, lines, and complex designs.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Sliders className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Customizable Parameters:</strong>
              <span className="block mt-1">
                Fine-tune size, spacing, rotation, opacity, complexity, and stroke width for precise control.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Palette className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Color Options:</strong>
              <span className="block mt-1">
                Customize pattern color, secondary color, and background color to match your brand.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ImageIcon className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Custom Image Upload:</strong>
              <span className="block mt-1">
                Use your own images to create unique patterns with personalized visual elements.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <RefreshCw className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Randomization:</strong>
              <span className="block mt-1">
                Quickly generate new patterns with random settings for instant creative inspiration.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Download className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Multiple Export Options:</strong>
              <span className="block mt-1">
                Save as SVG or PNG in various preset sizes or custom dimensions for any use case.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Code className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">SVG Code Access:</strong>
              <span className="block mt-1">
                Copy the raw SVG code for easy integration into your projects and version control.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Eye className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Real-time Preview:</strong>
              <span className="block mt-1">
                See changes instantly as you adjust parameters for rapid iteration and experimentation.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Maximize2 className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Full-screen Preview:</strong>
              <span className="block mt-1">
                Examine your pattern in detail with an expanded view to see every intricate detail.
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
              <Layers className="w-4 h-4 mr-2 text-primary-500" /> Web Design
            </h3>
            <p className="text-sm">
              Create engaging background patterns for websites, landing pages, and web applications that add visual
              depth without overwhelming content.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <FileImage className="w-4 h-4 mr-2 text-secondary-500" /> Digital Art
            </h3>
            <p className="text-sm">
              Generate unique textures and backgrounds for digital illustrations, photo compositions, and creative
              projects that stand out.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-success-500" /> Print Material
            </h3>
            <p className="text-sm">
              Design patterns for business cards, brochures, packaging, and other print materials with scalable vector
              graphics.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Settings className="w-4 h-4 mr-2 text-warning-500" /> UI Elements
            </h3>
            <p className="text-sm">
              Create decorative backgrounds for cards, modals, sections, and other interface components that enhance
              user experience.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Zap className="w-4 h-4 mr-2 text-danger-500" /> Brand Identity
            </h3>
            <p className="text-sm">
              Develop consistent pattern systems for brand materials that can be applied across all marketing channels
              and touchpoints.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <ImageIcon className="w-4 h-4 mr-2 text-primary-500" /> Social Media
            </h3>
            <p className="text-sm">
              Generate eye-catching backgrounds for social media posts, stories, and graphics that capture attention in
              crowded feeds.
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
                <Layers className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <strong>Combine different pattern types:</strong> Use similar settings with different pattern types to
                create layered, complex designs that add depth and visual interest.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Palette className="w-4 h-4 text-secondary-500" />
              </div>
              <div>
                <strong>Experiment with opacity:</strong> Use high opacity for bold, striking patterns, or low opacity
                for subtle background textures that complement your content.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-success-100 dark:bg-success-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Sliders className="w-4 h-4 text-success-500" />
              </div>
              <div>
                <strong>Try extreme values:</strong> Experiment with extreme size and spacing values to create unique,
                abstract patterns that break conventional design rules.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-warning-100 dark:bg-warning-900/30 p-1 rounded-full mr-3 mt-0.5">
                <RefreshCw className="w-4 h-4 text-warning-500" />
              </div>
              <div>
                <strong>Rotate for variety:</strong> Try rotating your pattern at different angles to find interesting
                orientations that create dynamic visual flow.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-danger-100 dark:bg-danger-900/30 p-1 rounded-full mr-3 mt-0.5">
                <ImageIcon className="w-4 h-4 text-danger-500" />
              </div>
              <div>
                <strong>Custom image masking:</strong> Use custom image uploads with geometric patterns for creative
                masking effects that transform ordinary photos.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Sparkles className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <strong>Layer with solid colors:</strong> Combine patterns with solid color shapes in your designs for
                contrast and visual interest that guides the eye.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Code className="w-4 h-4 text-secondary-500" />
              </div>
              <div>
                <strong>Animate with code:</strong> Use the SVG code to create animated patterns in web projects using
                CSS or JavaScript for engaging user experiences.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-success-100 dark:bg-success-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Settings className="w-4 h-4 text-success-500" />
              </div>
              <div>
                <strong>Adjust complexity and stroke:</strong> Experiment with the complexity and stroke width to
                achieve different artistic styles from minimal to intricate.
              </div>
            </li>
          </ul>
        </div>

        <p className="text-default-600 mt-8">
          Ready to transform your designs with captivating patterns? Our SVG Pattern Generator offers endless
          possibilities for your creative projects. Whether you're designing for web, print, or digital media, this tool
          provides the flexibility and power you need to bring your ideas to life. Start experimenting with patterns now
          and take your designs to the next level!
        </p>
      </div>
    </Card>
  )
}
