"use client"

import { Card } from "@nextui-org/react"
import {
  Info,
  BookOpen,
  Lightbulb,
  Palette,
  Layers,
  MousePointerClick,
  Sliders,
  Zap,
  Code,
  Smartphone,
  Download,
  Maximize,
  Shuffle,
  Save,
  Bookmark,
  CheckCircle2,
  Copy,
  RefreshCw
} from "lucide-react"
import Link from "next/link"

export default function InfoSectionBackgroundPattern() {
  // CSS for the sample preview based on generateBigPlusPattern defaults
  const samplePatternStyle = {
    backgroundColor: "#47d3ff", // Base color
    backgroundImage: `
        repeating-radial-gradient(circle at 0 0, transparent 0, #b034a9c4 78px), repeating-linear-gradient(#340e24, #340e24)
        `,
  };

  return (
    <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
      <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
        {/* Intro Section */}
        <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2 text-primary-500" />
          What is the CSS Background Pattern Generator?
        </h2>
        <p className="text-default-600 mb-4">
          Think of this tool as your personal digital weaver, capable of creating intricate, tileable wallpapers for your website using nothing but pure code.
          The <Link href="#how-to-use" className="text-primary-500 hover:underline">CSS Background Pattern Generator</Link> is a versatile playground for designers and developers
          who want to add depth, texture, and personality to their projects without the weight of heavy image files.
        </p>
        <p className="text-default-600 mb-4">
          From simple grids to complex 3D geometric effects, this tool generates clean, production-ready CSS.
          It eliminates the need for external assets, ensuring your backgrounds remain crisp on high-resolution displays
          and load instantly on any device. It's like having a library of infinite textures right at your fingertips!
        </p>

        {/* Sample Pattern Preview - Replacing Image with the CSS Div */}
        <div className="my-8">
          <div className="relative w-full h-64 md:h-80 rounded-lg shadow-lg overflow-hidden border border-default-200 group transition-transform hover:scale-[1.01]">
            <div
              className="absolute inset-0"
              style={samplePatternStyle}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white/80 dark:bg-black/80 px-6 py-3 rounded-xl shadow-lg text-center backdrop-blur-sm">
                <h3 className="text-lg font-medium text-default-800">Live Pattern Preview</h3>
                <p className="text-default-600 text-sm">Generated with pure CSS</p>
              </div>
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
          How to Use the Background Pattern Generator?
        </h2>

        <ol className="list-none space-y-4 text-default-600">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
              1
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Palette className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <strong className="text-default-700">Select & Color:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Pick a <strong>Pattern Category</strong> and type. Use the <strong>Color Pickers</strong> to set your primary pattern, background, and secondary accents.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
              2
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Sliders className="w-4 h-4 text-green-500 flex-shrink-0" />
                <strong className="text-default-700">Refine Parameters:</strong>
              </div>
              <div className="ml-6 space-y-2">
                <div className="flex items-start gap-2">
                  <Maximize className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong className="text-default-700">Size & Opacity:</strong>
                    <span className="text-default-600 ml-1">Adjust the sliders to change the scale of the pattern and its visual intensity.</span>
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
                <Shuffle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <strong className="text-default-700">Discover & Save:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Use the <strong>Randomize</strong> (<Shuffle className="w-3 h-3 inline" />) button for quick inspiration. Click <strong>Save Pattern</strong> (<Save className="w-3 h-3 inline" />) to store your favorite combinations.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
              4
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Code className="w-4 h-4 text-purple-500 flex-shrink-0" />
                <strong className="text-default-700">Deploy:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Once satisfied, <strong>Copy CSS</strong> (<Copy className="w-3 h-3 inline" />) or <strong>Download</strong> (<Download className="w-3 h-3 inline" />) the code to integrate it instantly into your website.
              </p>
            </div>
          </li>
        </ol>

        {/* Features Grid */}
        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
          Powerful Pattern Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
          <div className="flex items-start gap-3">
            <Palette className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Vibrant Library:</strong>
              <span className="block mt-1">
                From Lines and Grids to Woven and 3D textures, explore hundreds of unique combinations.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MousePointerClick className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Real-time Editing:</strong>
              <span className="block mt-1">
                Every slider adjustment is reflected instantly, allowing for rapid iteration and creative flow.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Shuffle className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Randomization Engine:</strong>
              <span className="block mt-1">
                Generate surprising and beautiful patterns by randomizing colors or all settings simultaneously.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Bookmark className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Pattern Vault:</strong>
              <span className="block mt-1">
                Save your custom patterns locally to revisit and use them in future sessions.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Code className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Ready-to-Use CSS:</strong>
              <span className="block mt-1">
                Get clean, valid CSS background-image code that works perfectly across all modern browsers.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Maximize className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Fullscreen Preview:</strong>
              <span className="block mt-1">
                See how your pattern tiles across a large canvas to ensure it looks great at any scale.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Smartphone className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Lightweight & Fast:</strong>
              <span className="block mt-1">
                Generated patterns are pure CSS, meaning zero image requests and lightning-fast page loads.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Instant Integration:</strong>
              <span className="block mt-1">
                Copy code directly or download as a .css file for seamless project management.
              </span>
            </div>
          </div>
        </div>

        {/* Pro Tips Section */}
        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Zap className="w-6 h-6 mr-2 text-primary-500" />
          Pro Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Layers className="w-4 h-4 mr-2 text-primary-500" /> Contrast
            </h3>
            <p className="text-sm">
              Use subtle color differences between the background and pattern for a premium, textured look that doesn't distract from content.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <RefreshCw className="w-4 h-4 mr-2 text-secondary-500" /> Tiling
            </h3>
            <p className="text-sm">
              Always check your pattern in Fullscreen mode. Some patterns look great small but might create unwanted "lines" when repeated.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-2 text-success-500" /> Fallbacks
            </h3>
            <p className="text-sm">
              The tool provides a base background color. Ensure this color provides enough text contrast as a fallback while the gradient loads.
            </p>
          </div>
        </div>

        <p className="text-default-600 mt-8">
          Ready to elevate your UI? Dive in, start experimenting with different shapes and colors, and let your creativity run wild. Your next stunning background is just a few clicks away!
        </p>
      </div>
    </Card>
  )
}