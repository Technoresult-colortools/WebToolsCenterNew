"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Zap,
    Type,
    Sliders,
    Monitor,
    Code,
    Smartphone,
    Maximize,
    RotateCcw,
    MousePointerClick,
    Terminal,
    Cpu,
    CheckCircle2,
    Layers,
    Scan
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionTextGlitch() {
    // Image path
    const imagePath = "/Images/InfosectionImages/TextGlitchPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the CSS Text Glitch Effect Generator?
                </h2>
                <p className="text-default-600 mb-4">
                    Step into the world of cyberpunk and futuristic aesthetics! The <Link href="#how-to-use" className="text-primary-500 hover:underline">CSS Text Glitch Effect Generator</Link> is a creative powerhouse designed to turn static, boring text into dynamic, distorted digital art. Whether you are building a gaming site, a tech portfolio, or an experimental landing page, this tool helps you create that "system error" look perfectly.
                </p>
                <p className="text-default-600 mb-4">
                    Under the hood, it utilizes complex CSS keyframe animations and pseudo-elements to simulate digital interference. You don't need to be a coding wizard to create professional-grade effects; our intuitive sliders and presets handle the math, giving you high-performance animations that are lightweight and screen-reader friendly.
                </p>

                {/* Image Preview - Wrapped in Link for Accessibility/Zoom */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="CSS Text Glitch Effect Generator Interface Preview"
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
                    How to Use the Text Glitch Generator?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Type className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Enter & Style Text:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Type your message in the "Text" field and use the sliders to set your <strong>Font Size, Weight, and Spacing</strong>. Choose a base color that matches your brand.
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
                                <strong className="text-default-700">Choose Your Glitch:</strong>
                            </div>
                            <div className="ml-6 space-y-2">
                                <div className="flex items-start gap-2">
                                    <Cpu className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                                    <div>
                                        <strong className="text-default-700">Effect Type & Intensity:</strong>
                                        <span className="text-default-600 ml-1">Select from presets like RGB Split, Noise, or Wave. Adjust <strong>Intensity</strong> and <strong>Speed</strong> to find the right balance between subtle and chaotic.</span>
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
                                <Scan className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Add Finishing Touches:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Toggle <strong>Scan Lines</strong> for an old-school CRT monitor effect. If you're an advanced user, switch to <strong>Custom Mode</strong> to inject your own CSS snippets.
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
                                <strong className="text-default-700">Export Code:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Instantly copy the <strong>HTML & CSS</strong> or download a complete file. Use the <strong>Fullscreen</strong> (<Maximize className="w-3 h-3 inline" />) button to verify the effect at large scale.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features for Digital Chaos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Terminal className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Multiple Glitch Styles:</strong>
                            <span className="block mt-1">
                                Choose from RGB Split, Distortion, Pixelate, and Wave effects to match your specific theme.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Monitor className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Real-time Preview:</strong>
                            <span className="block mt-1">
                                Every adjustment to speed or intensity is shown instantly, making design iteration lightning fast.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Scan className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Scan Line Overlay:</strong>
                            <span className="block mt-1">
                                Add a retro CRT-style overlay to enhance the digital interference aesthetic.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <MousePointerClick className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Custom CSS Input:</strong>
                            <span className="block mt-1">
                                Take total control with the Custom mode, allowing you to bridge the gap with your own animation logic.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Code className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Clean Handoff:</strong>
                            <span className="block mt-1">
                                Get highly optimized CSS that doesn't rely on external libraries or heavy JavaScript.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Responsive Ready:</strong>
                            <span className="block mt-1">
                                The generated effects are built with CSS, ensuring they scale perfectly across mobile and desktop.
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
                            <Layers className="w-4 h-4 mr-2 text-primary-500" /> Less is More
                        </h3>
                        <p className="text-sm">
                            High intensity can make text unreadable. For body text, keep intensity low; for headings, you can go wild.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <RotateCcw className="w-4 h-4 mr-2 text-secondary-500" /> Contrast
                        </h3>
                        <p className="text-sm">
                            Use contrasting glitch colors (like Cyan and Magenta) to make the RGB split effect truly pop against dark backgrounds.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <CheckCircle2 className="w-4 h-4 mr-2 text-success-500" /> Performance
                        </h3>
                        <p className="text-sm">
                            Because these effects are pure CSS, they are much faster than JS-based distortions. Use them freely for modern UI.
                        </p>
                    </div>
                </div>

                <p className="text-default-600 mt-8">
                    Ready to distort reality? Start typing your message, experiment with the glitch styles, and create an eye-catching effect that will leave your visitors impressed!
                </p>
            </div>
        </Card>
    )
}