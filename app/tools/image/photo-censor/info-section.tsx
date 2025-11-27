"use client"

import { Card, CardBody } from "@nextui-org/react"
import {
  Info,
  BookOpen,
  Lightbulb,
  Scissors,
  Eye,
  SlidersHorizontal,
  RefreshCw,
  Lock,
  Download,
  Smartphone,
  MousePointer,
  FileImage,
  Sparkles,
  Wand2,
  Layers,
  Settings2,
  Check,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionPhotoCensor() {
  // Image path
  const imagePath = "/Images/InfosectionImages/PhotoCensorPreview.png"

  return (
    <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8">
      <CardBody className="p-2 md:p-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2 text-primary-500" />
          What is the Photo Censor Tool?
        </h2>
        <p className="text-default-600 mb-4">
          The Photo Censor tool is a powerful and user-friendly application designed to help protect sensitive
          information in your images. Whether you are protecting personal data, complying with privacy rules, or adding
          creative effects to your photos, our tool provides a seamless solution for selective image censoring.
        </p>
        <p className="text-default-600 mb-4">
          With three versatile censoring methods—Blur, Pixelate, and Black-out—and adjustable intensity, you have
          complete control over how you obscure parts of your images. Our intuitive interface allows for precise area
          selection and real-time previews, ensuring that you get the exact results you need with maximum privacy and
          ease.
        </p>

        <div className="my-8">
          <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <Image
                  src={imagePath || "/placeholder.svg?height=400&width=800"}
                  alt="Screenshot of the Photo Censor Tool interface showing censoring options and a sample censored image"
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
          How to Use the Photo Censor Tool?
        </h2>

        <ol className="list-none space-y-4 text-default-600">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
              1
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <FileImage className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <strong className="text-default-700">Upload Your Image:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Click on the designated area or drag and drop a file to begin.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
              2
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <MousePointer className="w-4 h-4 text-green-500 flex-shrink-0" />
                <strong className="text-default-700">Select an Area:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Once uploaded, click and drag (or touch and drag on mobile) on the image to select the area you want to
                censor.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
              3
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Settings2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <strong className="text-default-700">Choose and Adjust:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Choose your preferred censoring method (Blur, Pixelate, or Black-out) and adjust the intensity using
                the slider for Blur and Pixelate.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
              4
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Check className="w-4 h-4 text-purple-500 flex-shrink-0" />
                <strong className="text-default-700">Apply and Download:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Click "Apply Censoring" to see the effect. Censor more areas if needed, then click "Download Censored
                Image" to save your work.
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
            <Scissors className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Precise Area Selection:</strong>
              <span className="block mt-1">
                Click and drag (or touch and drag on mobile) to select exactly what you want to censor.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Eye className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Multiple Censoring Methods:</strong>
              <span className="block mt-1">Choose between Blur, Pixelate, and Black-out for varied effects.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <SlidersHorizontal className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Adjustable Intensity:</strong>
              <span className="block mt-1">Fine-tune the strength of blur and pixelation effects with a simple slider.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <RefreshCw className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Real-time Preview:</strong>
              <span className="block mt-1">
                See the censoring effect immediately as you apply it to ensure perfect results.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Privacy-Focused:</strong>
              <span className="block mt-1">All processing is done locally in your browser for maximum security.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Download className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Easy Download:</strong>
              <span className="block mt-1">Save your censored image with a single click in its original quality.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <RefreshCw className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Reset Functionality:</strong>
              <span className="block mt-1">Easily start over with a new image or undo your changes.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Smartphone className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Mobile-Friendly:</strong>
              <span className="block mt-1">Works seamlessly on both desktop and mobile devices for censoring on the go.</span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Sparkles className="w-6 h-6 mr-2 text-primary-500" />
          Creative Tips and Tricks
        </h2>
        <div className="bg-default-100/50 dark:bg-default-200/20 p-5 rounded-lg">
          <ul className="space-y-3 text-default-600">
            <li className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Wand2 className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <strong>Create a soft focus effect:</strong> Use the Blur effect at a low intensity to artistically
                soften backgrounds and draw attention to your subject.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Layers className="w-4 h-4 text-secondary-500" />
              </div>
              <div>
                <strong>Combine different methods:</strong> Apply different censoring styles on the same image for
                varied visual effects and creative compositions.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-success-100 dark:bg-success-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Sparkles className="w-4 h-4 text-success-500" />
              </div>
              <div>
                <strong>Add a retro touch:</strong> Pixelate small areas like logos or text to create an interesting,
                retro-style focal point in your image.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-warning-100 dark:bg-warning-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Eye className="w-4 h-4 text-warning-500" />
              </div>
              <div>
                <strong>Highlight by obscuring:</strong> Use the tool to highlight a specific area by censoring the
                surrounding parts of the image, guiding the viewer's eye.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-danger-100 dark:bg-danger-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Lock className="w-4 h-4 text-danger-500" />
              </div>
              <div>
                <strong>Create a "reveal" effect:</strong> Censor most of an image while leaving key parts visible to
                build curiosity or for a creative reveal.
              </div>
            </li>
          </ul>
        </div>

        <p className="text-default-600 mt-8">
          Ready to start censoring your images with precision and creativity? Our Photo Censor tool provides the
          perfect balance of functionality and ease of use. Whether you are protecting sensitive information or
          exploring new artistic techniques, this tool provides the flexibility you need. Try it now and discover how
          easy it can be to edit your images with confidence!
        </p>
      </CardBody>
    </Card>
  )
}