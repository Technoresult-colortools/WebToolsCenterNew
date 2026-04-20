"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    UploadCloud,
    Target,
    Palette,
    Copy,
    Layers,
    RefreshCw,
    Smartphone,
    Wand2,
    CheckCircle2,
    MousePointerClick,
    Monitor,
    Brush,
    Eye,
    ChevronDown
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionImageColorExtractor() {
    // Image path
    const imagePath = "/Images/InfosectionImages/ImageColorExtractorPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the Image Color Extractor?
                </h2>
                <p className="text-default-600 mb-4">
                    The <Link href="#how-to-use" className="text-primary-500 hover:underline">Image Color Extractor</Link> is a sophisticated analysis tool designed to decode the visual DNA of your images. It identifies the major color tones and organizes them into a comprehensive palette, transforming any photograph or graphic into a structured set of design data.
                </p>
                <p className="text-default-600 mb-4">
                    Invaluable for designers, artists, and developers, this tool removes the guesswork from color selection. Whether you're building a brand identity or trying to capture the specific mood of a landscape photo, our extractor provides the precise HEX, RGB, and HSL values required to replicate those colors in your professional projects.
                </p>

                {/* Image Preview */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="Screenshot of the Image Color Extractor interface showing image upload area and color analysis results"
                                    width={800}
                                    height={400}
                                    className="w-full h-auto object-contain"
                                    unoptimized={true}
                                />
                            </div>
                        </div>
                    </Link>
                </div>

                {/* How to Use Section */}
                <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
                    How to Use the Image Color Extractor?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <UploadCloud className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Upload Image:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Drag and drop your image into the designated area or click to browse. The tool will instantly begin analyzing the dominant color tones.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                            2
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <ChevronDown className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <strong className="text-default-700">Configure Palette Size:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use the dropdown menu to choose exactly how many dominant colors you wish to extract (up to 21) for a broader or more focused palette.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                            3
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Palette className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Analyze Formats:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Switch between <strong>HEX, RGB, and HSL</strong> tabs to see the specific technical values for each color swatch identified by the extractor.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                            4
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Copy className="w-4 h-4 text-purple-500 flex-shrink-0" />
                                <strong className="text-default-700">Copy and Export:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Click the copy icon next to any color swatch to save the value to your clipboard. Use the reset button (<RefreshCw className="w-3 h-3 inline" />) to start a fresh analysis.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Key Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features for Creators
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Layers className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Deep Extraction:</strong>
                            <span className="block mt-1">Identify up to 21 dominant colors to capture the subtle nuances of complex imagery.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <RefreshCw className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Multi-Format Support:</strong>
                            <span className="block mt-1">Instant conversion between HEX, RGB, and HSL to fit any development or design workflow.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Wand2 className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Real-Time Analysis:</strong>
                            <span className="block mt-1">Colors are extracted and updated instantly as you adjust parameters or change images.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Copy className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">One-Click Workflow:</strong>
                            <span className="block mt-1">Streamlined interface allows you to copy color codes directly to your clipboard without leaving the tool.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <MousePointerClick className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Intuitive UX:</strong>
                            <span className="block mt-1">User-friendly drag-and-drop functionality combined with a clean, visual result display.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Responsive Engine:</strong>
                            <span className="block mt-1">Perform professional color analysis seamlessly on desktop, tablet, or mobile devices.</span>
                        </div>
                    </div>
                </div>

                {/* Pro Tips Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Target className="w-6 h-6 mr-2 text-primary-500" />
                    Pro Tips for Palette Design
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Palette className="w-4 h-4 text-success-500" /> Mood Boarding
                        </h3>
                        <p className="text-sm">
                            Extract a high number of colors (15+) to find accent shades that you might have missed by just looking at the image.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Layers className="w-4 h-4 text-secondary-500" /> Minimalist Palettes
                        </h3>
                        <p className="text-sm">
                            Reduce the extraction count to 3-5 colors to quickly find a core cohesive theme for website hero sections or UI buttons.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-warning-500" /> Contrast Check
                        </h3>
                        <p className="text-sm">
                            Use the extracted HEX codes in a contrast checker to ensure your background and text choices meet accessibility standards.
                        </p>
                    </div>
                </div>

                {/* Use Cases Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Monitor className="w-6 h-6 mr-2 text-primary-500" />
                    Real-World Applications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Brush className="w-4 h-4 text-success-500" /> Web Design</h4>
                        <p className="text-xs">Extracting color palettes from client-provided imagery to create a matching website theme and CSS variables.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Eye className="w-4 h-4 text-secondary-500" /> Art Inspiration</h4>
                        <p className="text-xs">Analyzing classic paintings or nature photography to understand the color theory used in the composition.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Target className="w-4 h-4 text-warning-500" /> Brand Alignment</h4>
                        <p className="text-xs">Verifying that promotional graphics use the correct shades and primary colors dictated by brand guidelines.</p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    Ready to unlock the hidden palette within your visuals? Start using our Image Color Extractor today to streamline your design process. Whether you’re a professional designer or a creative enthusiast, our tool provides the technical insight needed to make your creative vision a reality.
                </p>
            </div>
        </Card>
    )
}