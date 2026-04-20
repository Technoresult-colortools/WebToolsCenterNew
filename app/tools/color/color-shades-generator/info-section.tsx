"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Palette,
    Sliders,
    Zap,
    Download,
    Smartphone,
    Wand2,
    Monitor,
    Brush,
    Layers,
    RefreshCw,
    Sun,
    Moon,
    Code,
    Eye,
    Target
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionColorShadesGenerator() {
    // Image path
    const imagePath = "/Images/InfosectionImages/ColorShadesGeneratorPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the Color Shades Generator?
                </h2>
                <p className="text-default-600 mb-4">
                    The <Link href="#how-to-use" className="text-primary-500 hover:underline">Color Shades Generator</Link> is a sophisticated design engine built to expand a single point of inspiration into a full monochromatic system. It allows designers and developers to generate a series of harmonious tints and shades based on a single anchor color, ensuring visual rhythm and mathematical consistency across any project.
                </p>
                <p className="text-default-600 mb-4">
                    Whether you are building a complex UI with multiple depth layers or creating a brand style guide, this tool removes the manual labor of color mixing. By adjusting luminosity and saturation values programmatically, it provides the exact HEX, RGB, HSL, and CMYK codes needed for both digital interfaces and high-quality print production.
                </p>

                {/* Image Preview */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="Color Shades Generator interface showing color inputs and preview"
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
                    How to Use the Color Shades Generator?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Palette className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Define Your Base:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Enter a <strong>HEX code</strong> or use the <strong>Color Picker</strong> to select your starting point. This color will act as the anchor for your generated palette.
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
                                <strong className="text-default-700">Adjust Granularity & Type:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use the slider to set your <strong>step count</strong> (2 to 20 shades). Select your <strong>Variation Type</strong>: Tints (lighter), Shades (darker), or Both for a full spectrum.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                            3
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Zap className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Analyze and Copy:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Click any generated swatch to view details in <strong>HEX, RGB, HSL, HSV, or CMYK</strong>. Click the Copy icon next to any value to grab it instantly.
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
                                <strong className="text-default-700">Export Palette:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Download the entire palette as a <strong>PNG image</strong> for easy sharing or to import your new color system into design tools like Figma or Photoshop.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Key Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features for Designers
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Layers className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">High-Step Generation:</strong>
                            <span className="block mt-1">Generate up to 20 distinct variations, allowing for incredibly smooth transitions and deep UI hierarchy.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <RefreshCw className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Real-Time Sync:</strong>
                            <span className="block mt-1">Adjust sliders and see the entire palette re-calculate instantly—perfect for rapid prototyping.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Wand2 className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Randomized Inspiration:</strong>
                            <span className="block mt-1">Use the "Random" button to discover unique base colors you might not have considered.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Mobile Responsive:</strong>
                            <span className="block mt-1">A touch-optimized interface that allows you to build professional palettes on any device.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Download className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">PNG Export:</strong>
                            <span className="block mt-1">Instantly generate an image of your palette for documentation or client presentations.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Eye className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Full Format Insights:</strong>
                            <span className="block mt-1">Detailed technical data for HEX, RGB, HSL, HSV, and CMYK ensures cross-platform compatibility.</span>
                        </div>
                    </div>
                </div>

                {/* Pro Tips Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Wand2 className="w-6 h-6 mr-2 text-primary-500" />
                    Pro Tips & Best Practices
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Sun className="w-4 h-4 text-success-500" /> Tint Strategy
                        </h3>
                        <p className="text-sm">
                            Use lighter tints (the 10-30% range) for background hover states to keep the interface feeling responsive and modern.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Moon className="w-4 h-4 text-secondary-500" /> Shade Depth
                        </h3>
                        <p className="text-sm">
                            Combine deep shades with the base color to create high-contrast text combinations that pass WCAG accessibility standards.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Target className="w-4 h-4 text-warning-500" /> Print Accuracy
                        </h3>
                        <p className="text-sm">
                            Always verify <strong>CMYK values</strong> when moving from screen to print to ensure vibrant tints don't appear muddy in physical ink.
                        </p>
                    </div>
                </div>

                {/* Integration & Applications */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Monitor className="w-6 h-6 mr-2 text-primary-500" />
                    Integration & Workflow
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Code className="w-4 h-4 text-success-500" /> CSS Variables</h4>
                        <p className="text-xs">Build a robust `--color-primary-100` to `--color-primary-900` scale for Tailwind or Vanilla CSS effortlessly.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Brush className="w-4 h-4 text-secondary-500" /> Design Systems</h4>
                        <p className="text-xs">Create monochromatic style guides that ensure brand consistency across web, mobile, and marketing assets.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Layers className="w-4 h-4 text-warning-500" /> UI Hierarchy</h4>
                        <p className="text-xs">Use different shades of a single hue to define borders, shadows, and secondary actions without cluttering the palette.</p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    The Color Shades Generator is your shortcut to professional palette design. By combining mathematical precision with creative freedom, you can build cohesive color systems that elevate your visual projects. Start generating your perfect shades today!
                </p>
            </div>
        </Card>
    )
}