"use client"
import { Card } from "@nextui-org/react"
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
} from "lucide-react"

export default function InfoSection() {
  // CSS for the sample preview
  const sampleImageStyle = {
    backgroundImage: `url('/Images/InfosectionImages/fused-image-sample.png?height=400&width=800')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }

  return (
    <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8">
      <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2" />
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
          <div className="relative w-full h-64 md:h-80 rounded-lg shadow-lg overflow-hidden">
            <div className="absolute inset-0" style={sampleImageStyle} />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white/80 dark:bg-black/80 p-6 rounded-xl shadow-lg text-center">
                <h3 className="text-lg font-medium text-default-800">Sample Merged Image</h3>
                <p className="text-default-600 text-sm">Created with this tool</p>
              </div>
            </div>
          </div>
        </div>

        <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <BookOpen className="w-6 h-6 mr-2" />
          How to Use the Image Merger Tool?
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-default-600">
          <li>
            Click <strong>Add Layers</strong> or drag and drop images into the upload area to add up to 5 image layers.
          </li>
          <li>Rearrange images by dragging them into your preferred order using the drag handles.</li>
          <li>
            Select your preferred <strong>Composition Axis</strong> (Vertical Stack or Horizontal Array).
          </li>
          <li>
            Choose a <strong>Layer Scaling Protocol</strong> to determine how images of different sizes are handled.
          </li>
          <li>
            Customize the <strong>Inter-Layer Separator</strong> by adjusting the thickness and color of borders between
            images.
          </li>
          <li>
            Toggle <strong>Maintain Aspect Ratio</strong> to preserve or adjust image proportions.
          </li>
          <li>
            Click <strong>Initiate Fusion</strong> to merge your images (this happens automatically when settings
            change).
          </li>
          <li>Select your preferred download format (PNG, JPEG, or WEBP).</li>
          <li>
            Click <strong>Extract Result</strong> or <strong>Download Merged Image</strong> to save your creation.
          </li>
          <li>
            Use <strong>Reverse Sequence</strong> to flip the order of your images or <strong>Reset</strong> to start
            over.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2" />
          Key Features
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-default-600">
          <li>
            <Layers className="w-4 h-4 inline-block mr-1 text-primary" /> <strong>Multi-Image Support:</strong> Combine
            up to 5 images in a single composition with flexible arrangement options.
          </li>
          <li>
            <Move className="w-4 h-4 inline-block mr-1 text-secondary" /> <strong>Intelligent Scaling:</strong> Choose
            from multiple scaling options to handle images of different dimensions.
          </li>
          <li>
            <Palette className="w-4 h-4 inline-block mr-1 text-success" /> <strong>Customizable Separators:</strong> Add
            borders between images with adjustable thickness and color.
          </li>
          <li>
            <ChevronsLeftRight className="w-4 h-4 inline-block mr-1 text-warning" />{" "}
            <strong>Drag & Drop Interface:</strong> Easily reorder images with intuitive drag and drop functionality.
          </li>
          <li>
            <Zap className="w-4 h-4 inline-block mr-1 text-danger" /> <strong>Real-time Preview:</strong> See your
            changes instantly as you adjust settings.
          </li>
          <li>
            <Download className="w-4 h-4 inline-block mr-1" /> <strong>Multiple Export Formats:</strong> Download your
            merged image in PNG, JPEG, or WEBP format.
          </li>
          <li>
            <RefreshCw className="w-4 h-4 inline-block mr-1" /> <strong>Sequence Control:</strong> Reverse image order
            or reset all settings with a single click.
          </li>
          <li>
            <AlertTriangle className="w-4 h-4 inline-block mr-1 text-danger-500" /> <strong>Error Handling:</strong>{" "}
            Helpful notifications guide you through the image merging process.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2" />
          Technical Specifications
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-default-600">
          <li>
            <strong>Supported Image Formats:</strong> All standard web formats including PNG, JPEG, GIF, and WEBP.
          </li>
          <li>
            <strong>Maximum Images:</strong> Up to 5 images can be combined in a single composition.
          </li>
          <li>
            <strong>Processing:</strong> All image processing happens client-side for privacy and speed.
          </li>
          <li>
            <strong>Canvas Technology:</strong> Uses HTML5 Canvas for high-quality image manipulation.
          </li>
          <li>
            <strong>Responsive Design:</strong> Works on desktop and mobile devices with an adaptive interface.
          </li>
          <li>
            <strong>Browser Compatibility:</strong> Compatible with all modern browsers that support HTML5 Canvas.
          </li>
        </ul>

        <p className="text-default-600 mt-6">
          Ready to create stunning image compositions? Start merging your images now and transform your visual content
          with just a few clicks. Perfect for social media posts, product comparisons, before/after demonstrations, and
          creative collages!
        </p>
      </div>
    </Card>
  )
}
