"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Wand2,
    Palette,
    Eye,
    Sun,
    Copy,
    Download,
    Code,
    Sparkles,
    CheckCircle2,
    Monitor,
    FileJson,
    MousePointerClick,
    Layers
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionAIColorPalette() {
    // Image path
    const imagePath = "/Images/InfosectionImages/AIColorPaletteGeneratorPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the AI Color Palette Generator?
                </h2>
                <p className="text-default-600 mb-4">
                    Imagine describing a feeling, a place, or a brand to a professional designer and getting a perfect color scheme instantly.
                    That is exactly what our <Link href="#how-to-use" className="text-primary-500 hover:underline">AI Color Palette Generator</Link> does!
                    It uses advanced artificial intelligence to translate your natural language descriptions into harmonious, production-ready color palettes.
                </p>
                <p className="text-default-600 mb-4">
                    Beyond just picking colors, this tool bridges the gap between imagination and implementation.
                    With an interactive preview feature, you can see your generated colors applied to a real-world UI design.
                    No more guessing if your "midnight forest" theme works on a mobile app—visualize it, test it in dark mode, and export it in seconds.
                </p>

                {/* Image Preview */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="AI Color Palette Generator Interface Preview"
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
                    How to Use the AI Color Palette Generator?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Wand2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Describe Your Vision:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Enter a description like <em>"A warm sunset over the Mediterranean"</em> or <em>"Minimalist corporate fintech blues"</em> in the prompt box and hit generate.
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
                                <strong className="text-default-700">Visualize in Context:</strong>
                            </div>
                            <div className="ml-6 space-y-2">
                                <div className="flex items-start gap-2">
                                    <Monitor className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                                    <div>
                                        <strong className="text-default-700">Live UI Preview:</strong>
                                        <span className="text-default-600 ml-1">Click "Show Preview" to see your palette applied to a futuristic interface, and toggle between Light and Dark modes.</span>
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
                                <MousePointerClick className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Inspect Colors:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Hover over individual swatches to see detailed HEX and RGB values. Click the copy icon to grab any specific color code instantly.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                            4
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Download className="w-4 h-4 text-purple-500 flex-shrink-0" />
                                <strong className="text-default-700">Export for Dev:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Download your palette as a PNG for documentation, or as ready-to-use CSS/SCSS files containing variables and utility classes.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Intelligent Color Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">AI Prompting:</strong>
                            <span className="block mt-1">
                                Uses natural language processing to understand moods, themes, and complex aesthetic descriptions.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Palette className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Harmonious Generation:</strong>
                            <span className="block mt-1">
                                Ensures every generated palette follows color theory principles for maximum visual appeal.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Sun className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Light & Dark Modes:</strong>
                            <span className="block mt-1">
                                Instantly test your colors in both environments to ensure accessibility and readability.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Copy className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">One-Click Copy:</strong>
                            <span className="block mt-1">
                                Rapidly copy HEX codes to your clipboard without leaving the interface.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Code className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Developer Handoff:</strong>
                            <span className="block mt-1">
                                Export as clean CSS variables or SCSS maps to keep your stylesheets organized and consistent.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <FileJson className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Rich Metadata:</strong>
                            <span className="block mt-1">
                                Every palette includes color names, RGB values, and HEX codes for comprehensive documentation.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Implementation / Pro Tips Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <CheckCircle2 className="w-6 h-6 mr-2 text-primary-500" />
                    Implementation Guide
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <Code className="w-4 h-4 mr-2 text-primary-500" /> CSS Variables
                        </h3>
                        <p className="text-sm">
                            The CSS export includes <code>--color-1</code> through <code>--color-5</code> for easy theme switching and global updates.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <Layers className="w-4 h-4 mr-2 text-secondary-500" /> Utility Classes
                        </h3>
                        <p className="text-sm">
                            Get pre-written classes like <code>.bg-color-1</code> and <code>.text-color-2</code> to style your components instantly.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <Sparkles className="w-4 h-4 mr-2 text-success-500" /> Pro Tip
                        </h3>
                        <p className="text-sm">
                            Be specific! Instead of "blue," try "deep oceanic blues with vibrant coral accents" for more unique and high-quality results.
                        </p>
                    </div>
                </div>

                <p className="text-default-600 mt-8">
                    Ready to transform your design workflow? Start describing your dream palette and let our AI handle the color theory.
                    Your perfect color combination is just a prompt away!
                </p>
            </div>
        </Card>
    )
}