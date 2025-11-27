"use client"

import { Card } from "@nextui-org/react"
import {
  Info,
  BookOpen,
  Lightbulb,
  Droplet,
  Palette,
  ImageIcon, // Used for Use Cases section title
  Settings2,
  Download,
  Braces,    // For Color Codes feature
  Smartphone,
  Zap,       // For Instant Analysis feature
  ImageUp,   // For Image Upload feature & Tips
  Code,      // For Use Case: Web Dev
  Brush,     // For Use Case: Art
  Camera,    // For Use Case: Photography
  FileText,  // For Use Case: Content Creation
  Shirt,     // For Use Case: Decor/Fashion
  Wand2,     // For Tips section title
  SlidersHorizontal, // For Tips
  Eye,       // For Tips
  Sparkles,   // For Tips
  Share2,
  Settings,
  UploadCloud
} from "lucide-react"
import Link from "next/link" // Added for image link

export default function InfoSection() {
  // Image path for the preview
  const imagePath = "/Images/InfosectionImages/ImageAverageColorPreview.png";

  return (
    <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 "> {/* Added mt-8 */}
      <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2 text-primary-500" />
          What is the Image Average Color Finder?
        </h2>
        <p className="text-default-600 mb-4">
          The Image Average Color Finder is a powerful tool designed to analyze images and extract their color
          information. It calculates the average color of the entire image and identifies the dominant colors present.
          This tool is invaluable for designers, artists, photographers, and anyone working with color palettes in their projects,
          helping to understand and utilize image colors effectively.
        </p>

        <div className="my-8">
          <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <img
                  src={imagePath}
                  alt="Screenshot of the Image Average Color Finder interface"
                  className="w-full h-auto object-contain" 
                />
              </div>
            </div>
          </Link>
        </div>

        <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
          How to Use the Image Average Color Finder?
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
                Drag and drop a file, or click to browse and select an image from your device.
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
                <strong className="text-default-700">Explore the results:</strong>
              </div>
              <div className="ml-6 space-y-2">
                <div className="flex items-start gap-2">
                  <FileText className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong className="text-default-700">Average Color:</strong>
                    <span className="text-default-600 ml-1">View the calculated average color in HEX, RGB, and HSL formats.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Palette className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong className="text-default-700">Dominant Colors:</strong>
                    <span className="text-default-600 ml-1">See a palette of the most prominent colors from the image.</span>
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
                <Settings className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <strong className="text-default-700">Adjust the palette:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Use the slider to change the number of dominant colors displayed (from 1 to 10).
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
                <strong className="text-default-700">Download your palette:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Click the download button to save the generated color palette as an image file.
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
                <strong className="text-default-700">Analyze another image:</strong>
              </div>
              <p className="text-default-600 ml-6">
                To process a new image, simply upload another file to reset the tool.
              </p>
            </div>
          </li>
        </ol>

        <h2 id="color-information" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Palette className="w-6 h-6 mr-2 text-primary-500" />
          Color Information Displayed
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
          <div className="flex items-start gap-3">
            <Droplet className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Average Color:</strong>
              <span className="block mt-1">The overall mean color calculated from all pixels in the image. Provided in HEX, RGB, and HSL formats for versatile application.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Palette className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Dominant Color Palette:</strong>
              <span className="block mt-1">A curated selection of the most frequently occurring and visually significant colors within the image.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Settings2 className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Adjustable Palette Size:</strong>
              <span className="block mt-1">Customize the number of dominant colors (from 1 up to 10) to tailor the complexity of the extracted palette.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Download className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Downloadable Palette Image:</strong>
              <span className="block mt-1">Export the complete color information (average and dominant colors with their values) as a convenient image file.</span>
            </div>
          </div>
        </div>

        <h2 id="key-features" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
          <div className="flex items-start gap-3">
            <Droplet className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Accurate Average Color:</strong>
              <span className="block mt-1">Precise calculation of the image's average color using efficient algorithms.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Palette className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Dominant Color Extraction:</strong>
              <span className="block mt-1">Sophisticated identification and display of the most prominent colors in the image.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Settings2 className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Customizable Palette Size:</strong>
              <span className="block mt-1">Fine-tune the number of dominant colors (1-10) for tailored color analysis.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Braces className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Versatile Color Codes:</strong>
              <span className="block mt-1">Color information provided in standard HEX, RGB, and HSL formats for easy use.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Download className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Palette Download:</strong>
              <span className="block mt-1">Easily export the generated color palette as an image for integration with design tools.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <ImageUp className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Intuitive Image Upload:</strong>
              <span className="block mt-1">Supports drag & drop and click-to-select for effortless image input.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Smartphone className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Responsive Design:</strong>
              <span className="block mt-1">Fully functional and user-friendly on desktops, tablets, and mobile devices.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Instant Analysis:</strong>
              <span className="block mt-1">Fast client-side processing for immediate color results without server uploads.</span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <ImageIcon className="w-6 h-6 mr-2 text-primary-500" />
          Use Cases for Image Color Finder
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-default-600">
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Palette className="w-4 h-4 mr-2 text-primary-500" />
              Design & Branding
            </h3>
            <p className="text-sm">
              Extract color palettes from mood boards or inspiration images to create cohesive brand identities, UI designs, and marketing materials.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Code className="w-4 h-4 mr-2 text-secondary-500" />
              Web Development
            </h3>
            <p className="text-sm">
              Match website themes, UI elements, or CSS variables to the prominent colors of a hero image or brand visuals.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Brush className="w-4 h-4 mr-2 text-success-500" />
              Art & Illustration
            </h3>
            <p className="text-sm">
              Generate color schemes from reference photos for digital painting, traditional art, or graphic illustrations.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Camera className="w-4 h-4 mr-2 text-warning-500" />
              Photography
            </h3>
            <p className="text-sm">
              Analyze the color composition of photographs to understand their mood, or to find complementary colors for editing and presentation.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-danger-500" />
              Content Creation
            </h3>
            <p className="text-sm">
              Ensure visual consistency by deriving color palettes from key visuals for social media posts, presentations, and video thumbnails.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Shirt className="w-4 h-4 mr-2 text-primary-500" /> {/* Using Shirt for broader appeal than BedDouble */}
              Decor & Fashion
            </h3>
            <p className="text-sm">
              Find inspiration for interior design schemes or fashion ensembles by extracting colors from images of textiles, scenes, or artwork.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Wand2 className="w-6 h-6 mr-2 text-primary-500" />
          Tips for Best Results
        </h2>
        <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
          <ul className="space-y-3 text-default-600">
            <li className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <ImageUp className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <strong>Optimal Image Selection:</strong> Use clear, well-lit images with distinct color areas for the most accurate and meaningful color analysis. Very noisy or blurry images might yield less predictable results.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <SlidersHorizontal className="w-4 h-4 text-secondary-500" />
              </div>
              <div>
                <strong>Experiment with Palette Size:</strong> Adjust the dominant color slider. A smaller count gives a more general overview, while a larger count can reveal subtle accent colors.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-success-100 dark:bg-success-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Eye className="w-4 h-4 text-success-500" />
              </div>
              <div>
                <strong>Average vs. Dominant:</strong> The average color provides a mathematical mean, which might not always be the most visually prominent. Refer to the dominant color palette for key thematic colors.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-warning-100 dark:bg-warning-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Sparkles className="w-4 h-4 text-warning-500" />
              </div>
              <div>
                <strong>Use as Inspiration:</strong> The generated palettes are excellent starting points. Feel free to adapt and refine them to perfectly suit your creative vision and project requirements.
              </div>
            </li>
          </ul>
        </div>

        <p className="text-default-600 mt-8"> {/* Changed from mt-6 to mt-8 to match Case Converter style */}
          Ready to explore the colors in your images? Start using our Image Average Color Finder and unlock a deeper understanding
          of color for your projects. Whether you're designing, creating art, or simply curious about the color makeup of your
          favorite photos, our tool provides the insights you need to enhance your color selection process and inspire your creative work!
        </p>
      </div>
    </Card>
  )
}