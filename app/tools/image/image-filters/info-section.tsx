"use client"

import { Card } from "@nextui-org/react"
import NextImage from "next/image" // Keep NextImage if you are actually using it, otherwise replace with <img>
import Link from "next/link"
import {
  Info,
  BookOpen,
  Lightbulb,  // For Key Features title
  Wand2,      // For Filter Types title & Advanced Tips title
  Eye,        // Real-time preview, Tips
  Layers,     // Multiple Filters, Layering filters
  SlidersHorizontal, // Intensity control, Tips
  GitCompareArrows, // Comparison tools
  Star,       // Favorites system
  History,    // Edit history
  Smartphone, // Responsive design
  LogIn,      // No account (can be used with a "not" implication or UserCheck)
  ImageIcon,  // Use Cases title
  Share2,     // Use Case: Social Media, Tips
  Camera,     // Use Case: Photography
  Brush,      // Use Case: Digital Art
  FileText,   // Use Case: Content Creation
  User,       // Use Case: Personal Photos
  Sun,        // Filter Type: Brightness
  Contrast,   // Filter Type: Contrast
  Droplets,   // Filter Type: Saturation, Duotone
  Palette,    // Filter Type: Artistic/Color
  Aperture,   // Filter Type: Blur
  Sparkles,   // Filter Type: Effects, Tips
  Mountain,   // Tip: Landscapes
  ImageUp,    // How to use: Upload
  Download,   // How to use: Export
  RotateCcw,  // How to use: Undo
  RotateCw,   // How to use: Redo
  CheckSquare, // How to use: Multiple Filters Mode toggle
  Heart,       // How to use: Favorite
  Copy,        // How to use: Save as base
  Settings2,    // Could also be used for filter types or key features sections
  FileDiff,
  Settings,
  Filter,
  UploadCloud
} from "lucide-react"

export default function InfoSectionImageFilters() {
  // Image path
  const imagePath = '/Images/InfosectionImages/ImageFiltersPreview.png';

  return (
    <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8">
      <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2 text-primary-500" />
          What is the Image Filters Tool?
        </h2>
        <p className="text-default-600 mb-4">
          The Enhanced Image Filters Tool is a powerful, user-friendly application designed to transform your photos with just a few clicks. Whether you are a professional photographer, a social media enthusiast, or someone who enjoys personalizing images, our tool offers a broad array of filters and adjustments to bring your creative vision to life.
        </p>
        <p className="text-default-600 mb-4">
          With complete control over filter selection and intensity, you can tailor your images precisely. From classic effects like grayscale and sepia to advanced adjustments such as hue rotation and custom shadows, our tool caters to both simple enhancements and complex image manipulations.
        </p>
        <p className="text-default-600 mb-4">
          Perfect for quickly editing photos for social media, creating unique visual content for your blog, or experimenting with various styles for your digital art, the Enhanced Image Filters Tool streamlines your workflow and helps you achieve stunning results.
        </p>

        <div className="my-8">
          <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
              <div className="aspect-w-16 aspect-h-9 w-full">
                {/* If you are using Next.js Image component and it's configured correctly */}
                <NextImage
                  src={imagePath}
                  alt="Screenshot of the Image Filters Tool interface showing various filters applied to an image"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain" // Ensure this style makes it responsive
                />
                {/* Or, if you prefer a standard img tag for consistency with other examples:
                <img
                  src={imagePath}
                  alt="Screenshot of the Image Filters Tool interface showing various filters applied to an image"
                  className="w-full h-auto object-contain"
                />
                */}
              </div>
            </div>
          </Link>
        </div>

        <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
          How to Use the Image Filters Tool?
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
                Click on the designated area or drag and drop an image file to begin.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
              2
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Filter className="w-4 h-4 text-green-500 flex-shrink-0" />
                <strong className="text-default-700">Apply and adjust filters:</strong>
              </div>
              <div className="ml-6 space-y-2">
                <div className="flex items-start gap-2">
                  <Palette className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong className="text-default-700">Choose a Filter:</strong>
                    <span className="text-default-600 ml-1">Browse categories and select a thumbnail to apply it.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <SlidersHorizontal className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong className="text-default-700">Adjust Intensity:</strong>
                    <span className="text-default-600 ml-1">Use the slider to fine-tune the strength of the filter.</span>
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
                <strong className="text-default-700">Use advanced features:</strong>
              </div>
              <div className="ml-6 space-y-2">
                 <div className="flex items-start gap-2">
                  <CheckSquare className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong className="text-default-700">Stack Filters:</strong>
                    <span className="text-default-600 ml-1">Enable Multiple Filters Mode to combine effects.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Heart className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong className="text-default-700">Favorite Filters:</strong>
                    <span className="text-default-600 ml-1">Mark filters for quick access in a "Favorites" category.</span>
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
                <Eye className="w-4 h-4 text-purple-500 flex-shrink-0" />
                <strong className="text-default-700">Review and manage edits:</strong>
              </div>
               <div className="ml-6 space-y-2">
                <div className="flex items-start gap-2">
                  <FileDiff className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong className="text-default-700">Compare View:</strong>
                    <span className="text-default-600 ml-1">Toggle between the original and filtered image.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <RotateCcw className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong className="text-default-700">Manage History:</strong>
                    <span className="text-default-600 ml-1">Use Undo/Redo to navigate your editing history.</span>
                  </div>
                </div>
                 <div className="flex items-start gap-2">
                  <Copy className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong className="text-default-700">Set New Base:</strong>
                    <span className="text-default-600 ml-1">Save the current state as the new "original" for further edits.</span>
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
                <Share2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                <strong className="text-default-700">Export your image:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Save the final edited image in your desired format (e.g., PNG, JPEG, WebP).
              </p>
            </div>
          </li>
        </ol>

        <h2 id="filter-types" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Wand2 className="w-6 h-6 mr-2 text-primary-500" />
          Supported Filter Types & Adjustments
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
          <div className="flex items-start gap-3">
            <Sun className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Basic Adjustments:</strong>
              <span className="block mt-1">Control fundamental aspects like Brightness, Contrast, Saturation, and Exposure.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Palette className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Artistic & Classic Filters:</strong>
              <span className="block mt-1">Apply popular styles such as Grayscale, Sepia, Vintage, Invert, and Posterize.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Droplets className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Color Manipulation:</strong>
              <span className="block mt-1">Adjust Hue, apply Duotone effects, Color Tint, or manipulate specific color channels.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Aperture className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Blur & Sharpen Effects:</strong>
              <span className="block mt-1">Add Gaussian Blur, Box Blur, or sharpen details to enhance focus or create depth.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Creative Effects:</strong>
              <span className="block mt-1">Experiment with Pixelate, Vignette, Noise, Glitch, Custom Drop Shadows, and more unique transformations.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Settings2 className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Distortion & Texture:</strong>
              <span className="block mt-1">Apply filters like Swirl, Bulge, or add texture overlays for artistic flair.</span>
            </div>
          </div>
        </div>

        <h2 id="key-features" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
          <div className="flex items-start gap-3">
            <Layers className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Extensive Filter Library:</strong>
              <span className="block mt-1">A diverse collection of basic, artistic, and advanced effects to suit any style.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Eye className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Real-Time Instant Preview:</strong>
              <span className="block mt-1">See changes applied to your image immediately as you select filters or adjust settings.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Layers className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Multiple Filters Mode:</strong>
              <span className="block mt-1">Layer and combine multiple filters to create unique and sophisticated visual effects.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <SlidersHorizontal className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Precise Intensity Control:</strong>
              <span className="block mt-1">Fine-tune the strength of each applied filter for subtle or dramatic results.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <GitCompareArrows className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Comparison Tools:</strong>
              <span className="block mt-1">Easily toggle between original and edited versions, or use side-by-side views for detailed comparison.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Favorites System:</strong>
              <span className="block mt-1">Save your most-used filters for quick and easy access in future editing sessions.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <History className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Non-Destructive Editing History:</strong>
              <span className="block mt-1">Full undo/redo functionality allows you to experiment freely and revert changes.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Smartphone className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Responsive & Accessible Design:</strong>
              <span className="block mt-1">Seamlessly use the tool on desktops, tablets, and mobile devices.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <LogIn className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">No Account Required:</strong>
              <span className="block mt-1">Start editing instantly without the need for registration or login.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Download className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Multiple Export Formats:</strong>
              <span className="block mt-1">Save your final creations in popular image formats like PNG, JPEG, or WebP.</span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <ImageIcon className="w-6 h-6 mr-2 text-primary-500" />
          Use Cases for Image Filters
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-default-600">
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Share2 className="w-4 h-4 mr-2 text-primary-500" />
              Social Media Content
            </h3>
            <p className="text-sm">
              Quickly enhance photos for Instagram, Facebook, Pinterest, and other platforms to create eye-catching posts and stories.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Camera className="w-4 h-4 mr-2 text-secondary-500" />
              Photography Enhancement
            </h3>
            <p className="text-sm">
              Improve portraits, landscapes, and everyday photos by adjusting colors, tones, and applying artistic effects for a professional touch.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Brush className="w-4 h-4 mr-2 text-success-500" />
              Digital Art & Design
            </h3>
            <p className="text-sm">
              Experiment with filters to create unique textures, moods, and styles for digital paintings, illustrations, and graphic design projects.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-warning-500" />
              Blog & Website Visuals
            </h3>
            <p className="text-sm">
              Create consistent and visually appealing images for blog posts, articles, and website banners to engage your audience.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <User className="w-4 h-4 mr-2 text-danger-500" />
              Personal Photo Editing
            </h3>
            <p className="text-sm">
              Add flair to personal photos, create memorable collages, or simply have fun experimenting with different looks for your images.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Palette className="w-4 h-4 mr-2 text-primary-500" />
              Marketing & Branding
            </h3>
            <p className="text-sm">
              Develop a unique visual style for marketing materials, advertisements, and brand imagery by consistently applying specific filters.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Wand2 className="w-6 h-6 mr-2 text-primary-500" />
          Creative Tips & Tricks
        </h2>
        <div className="bg-default-100/50 dark:bg-default-200/20 p-5 rounded-lg">
          <ul className="space-y-3 text-default-600">
            <li className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Layers className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <strong>Layer Creatively:</strong> Don't be afraid to stack multiple filters in "Multiple Filters Mode." Start with basic adjustments, then add artistic effects.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <SlidersHorizontal className="w-4 h-4 text-secondary-500" />
              </div>
              <div>
                <strong>Subtlety is Key:</strong> Often, lower intensity settings (e.g., 30-70%) for filters yield more professional and pleasing results than full strength.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-success-100 dark:bg-success-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Sun className="w-4 h-4 mr-1 text-success-500" /><Contrast className="w-4 h-4 text-success-500" />
              </div>
              <div>
                <strong>Adjust Basics First:</strong> Apply brightness, contrast, and saturation adjustments before diving into more stylistic or artistic filters for a better foundation.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-warning-100 dark:bg-warning-900/30 p-1 rounded-full mr-3 mt-0.5">
                <GitCompareArrows className="w-4 h-4 text-warning-500" />
              </div>
              <div>
                <strong>Use Comparison Views:</strong> Utilize split-screen or toggle comparison to fine-tune your edits with precision against the original image.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-danger-100 dark:bg-danger-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Sparkles className="w-4 h-4 text-danger-500" />
              </div>
              <div>
                <strong>Experiment for Mood:</strong> Different filter combinations can evoke various moods (e.g., warm vintage, cool modern, dramatic monochrome). Explore to find what fits your vision.
              </div>
            </li>
             <li className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <User className="w-4 h-4 mr-1 text-primary-500" /> <Mountain className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <strong>Tailor to Subject:</strong> Some filters work better for portraits (e.g., skin smoothing, soft focus) while others excel for landscapes (e.g., HDR effects, vibrant saturation).
              </div>
            </li>
             <li className="flex items-start">
              <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Droplets className="w-4 h-4 text-secondary-500" />
              </div>
              <div>
                <strong>Create Duotone Effects:</strong> Apply a grayscale filter first, then layer a color filter (like a color tint or gradient map if available) with adjusted intensity for striking duotones.
              </div>
            </li>
          </ul>
        </div>

        <p className="text-default-600 mt-8">
          Ready to transform your images? Dive into our Enhanced Image Filters Tool and unlock your creative potential. Whether you're working on a professional project or just want to add some flair to your personal photos, our tool provides the flexibility and power needed to achieve excellent results. Start experimenting with filters today and see your vision come to life!
        </p>
      </div>
    </Card>
  )
}