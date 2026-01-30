"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Code2,
    Palette,
    Sliders,
    Image as ImageIcon,
    Download,
    Zap,
    Type,
    Share2,
    ShieldCheck,
    Monitor,
    Smartphone,
    CheckCircle2,
    Copy,
    Sparkles
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionCodeToImage() {
    // Image path
    const imagePath = "/Images/InfosectionImages/WebToolsCenter-example.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the Code to Image Converter?
                </h2>
                <p className="text-default-600 mb-4">
                    Turn your raw source code into a polished work of art! The <Link href="#how-to-use" className="text-primary-500 hover:underline">Code to Image Converter</Link> is a premium-grade tool designed for developers who want to share their logic with style. Powered by the <strong>Shiki syntax highlighter</strong>, it provides a pixel-perfect representation of your code exactly as it appears in high-end editors.
                </p>
                <p className="text-default-600 mb-4">
                    Whether you are a creator posting to social media, a technical writer building documentation, or a student creating a presentation, this tool helps you avoid blurry screenshots. Choose from a vast library of professional themes, backgrounds, and fonts to create a visually compelling presentation that captures your audience's attention.
                </p>

                {/* Image Preview - Wrapped in Link for Accessibility/Zoom */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="Code to Image Converter Interface Preview"
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
                    How to Use the Code to Image Converter?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Code2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Input & Identify:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Paste your code in the editor and select the correct <strong>Programming Language</strong> from the dropdown to activate accurate, Shiki-powered syntax highlighting.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                            2
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Palette className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <strong className="text-default-700">Style the Window:</strong>
                            </div>
                            <div className="ml-6 space-y-2">
                                <div className="flex items-start gap-2">
                                    <ImageIcon className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                                    <div>
                                        <strong className="text-default-700">Themes & Backgrounds:</strong>
                                        <span className="text-default-600 ml-1">Pick from 16+ themes (like Dracula or GitHub Dark) and set your canvas background using gradients, solid colors, or Unsplash images.</span>
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
                                <Sliders className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Fine-Tune Layout:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Adjust <strong>Padding, Shadows, and Font Size</strong>. Toggle line numbers and window controls, or add a custom <strong>Watermark</strong> to protect your work.
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
                                <strong className="text-default-700">Export & Share:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Click <strong>Copy to Clipboard</strong> (<Copy className="w-3 h-3 inline" />) for instant posting, or <strong>Download</strong> (<Download className="w-3 h-3 inline" />) your image as a PNG, JPEG, or WebP.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Code2 className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Shiki Syntax Engine:</strong>
                            <span className="block mt-1">
                                High-fidelity highlighting for 40+ languages ensures your code looks professional and accurate.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Palette className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Premium Themes:</strong>
                            <span className="block mt-1">
                                Choose from 16+ popular themes like Night Owl, Dracula, and One Dark Pro.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <ImageIcon className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Dynamic Backgrounds:</strong>
                            <span className="block mt-1">
                                Access gradients, solid colors, or random programming-related images from Unsplash.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Type className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Developer Fonts:</strong>
                            <span className="block mt-1">
                                12 optimized coding fonts (like Fira Code and JetBrains Mono) with ligatures support.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Custom Watermarks:</strong>
                            <span className="block mt-1">
                                Personalize your snippets with custom text, icons, and logo placement.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Download className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Multi-Format Export:</strong>
                            <span className="block mt-1">
                                Export in high-resolution PNG, JPEG, or WebP with adjustable quality settings.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Monitor className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Ultra-High Quality:</strong>
                            <span className="block mt-1">
                                Generate images at 2x or 4x scale for crisp presentations and 4K monitors.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Responsive UI:</strong>
                            <span className="block mt-1">
                                A fully mobile-optimized interface allows you to create snippets from any device.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Advanced Usage Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Zap className="w-6 h-6 mr-2 text-primary-500" />
                    Pro Tips & Advanced Usage
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <Palette className="w-4 h-4 mr-2 text-primary-500" /> Branding
                        </h3>
                        <p className="text-sm">
                            Use your brand’s HEX colors for the background and add your Twitter/GitHub handle as a watermark for a consistent social presence.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <Sparkles className="w-4 h-4 mr-2 text-secondary-500" /> Contextual AI
                        </h3>
                        <p className="text-sm">
                            Use custom backgrounds related to your code (e.g., a server room for backend code) to increase engagement on posts.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <CheckCircle2 className="w-4 h-4 mr-2 text-success-500" /> Consistency
                        </h3>
                        <p className="text-sm">
                            Save your preferred padding and font settings to ensure all examples in your technical documentation look uniform.
                        </p>
                    </div>
                </div>

                <p className="text-default-600 mt-8">
                    Stop sharing boring, low-quality screenshots. Start creating high-impact, professional code visuals today and let your code stand out in a crowded digital world!
                </p>
            </div>
        </Card>
    )
}