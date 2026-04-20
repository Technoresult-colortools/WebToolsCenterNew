"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Palette,
    Sliders,
    Eye,
    Copy,
    Zap,
    MoveRight,
    Smartphone,
    Wand2,
    CheckCircle2,
    Monitor,
    Brush,
    Layers,
    RefreshCw,
    Droplets
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionRgbaToHex() {
    // Image path
    const imagePath = "/Images/InfosectionImages/RGBAToHexPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the RGBA to Hex Converter?
                </h2>
                <p className="text-default-600 mb-4">
                    The <Link href="#how-to-use" className="text-primary-500 hover:underline">RGBA to Hex Converter</Link> is an essential bridge between different color languages. While RGBA (Red, Green, Blue, Alpha) is the preferred format for manipulating transparency in development, Hexadecimal is the industry standard for concise, shareable color codes in web design and branding.
                </p>
                <p className="text-default-600 mb-4">
                    This tool empowers designers and developers to translate complex color compositions into streamlined Hex strings. It handles both traditional 6-digit Hex codes and <strong>modern 8-digit Hex codes</strong> (which include Alpha transparency), ensuring that your exact opacity levels are preserved across different design environments and CSS files.
                </p>

                {/* Image Preview */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="RGBA to Hex Converter Interface Preview showing color sliders and hex output"
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
                    How to Use the RGBA to Hex Converter?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Sliders className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Mix Your RGB Channels:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Adjust the <strong>Red, Green, and Blue</strong> sliders (ranging from 0 to 255) to mix your desired color. You can also type exact numeric values into the input boxes.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                            2
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Droplets className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <strong className="text-default-700">Set Transparency (Alpha):</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use the <strong>Alpha slider</strong> (0 to 1) to define the opacity. The tool will automatically calculate the extra two characters needed for an 8-digit Hex code.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                            3
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Eye className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Live Preview:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Observe the <strong>Real-time Preview</strong> as it shifts. The checkered background behind the preview helps you visualize exactly how transparent your color will appear.
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
                                <strong className="text-default-700">Export Hex Code:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Once satisfied, click the <strong>Copy icon</strong> to grab the Hex value. Use the Reset button (<RefreshCw className="w-3 h-3 inline" />) to quickly clear all channels.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Key Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Real-Time Sync:</strong>
                            <span className="block mt-1">Every slider movement instantly recalculates the Hex value, providing zero-latency color conversion.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Layers className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">8-Digit Hex Support:</strong>
                            <span className="block mt-1">Full support for the modern Hex notation that includes alpha channel information (RRGGBBAA).</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Palette className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Interactive Mixing:</strong>
                            <span className="block mt-1">Granular control over color channels allows for precise matching of brand assets or logos.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Copy className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Dual Copying:</strong>
                            <span className="block mt-1">Quickly copy either the resulting Hex code or the original RGBA values for use in different software.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <MoveRight className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Bi-directional Context:</strong>
                            <span className="block mt-1">Provides clear easy-to-read information helpful for understanding the relationship between RGB and Hex.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Responsive UI:</strong>
                            <span className="block mt-1">Slider controls are optimized for both desktop mouse precision and mobile touch interactions.</span>
                        </div>
                    </div>
                </div>

                {/* Pro Tips Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Wand2 className="w-6 h-6 mr-2 text-primary-500" />
                    Pro Tips & Design Advice
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-success-500" /> Hex Opacity
                        </h3>
                        <p className="text-sm">
                            If you need a 6-digit hex but have transparency, set Alpha to 1.0 before copying to ensure a solid color output.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Layers className="w-4 h-4 text-secondary-500" /> 8-Digit Usage
                        </h3>
                        <p className="text-sm">
                            Modern browsers support 8-digit hex codes in CSS. Use them to keep your styles cleaner than long `rgba()` strings.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Droplets className="w-4 h-4 text-warning-500" /> Mixing Neutrals
                        </h3>
                        <p className="text-sm">
                            Keep R, G, and B values identical to create perfect grays. Adjust all three together to change the gray's lightness.
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
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Brush className="w-4 h-4 text-success-500" /> UI Prototyping</h4>
                        <p className="text-xs">Converting color values from design tools like Figma or Sketch into dev-ready Hex codes for CSS/Tailwind.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Layers className="w-4 h-4 text-secondary-500" /> Style Guides</h4>
                        <p className="text-xs">Standardizing brand colors into Hex format for easier distribution in brand identity documentation.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Zap className="w-4 h-4 text-warning-500" /> Development</h4>
                        <p className="text-xs">Quickly checking the Hex equivalent of an existing RGBA variable to simplify styling logic in React or Vue.</p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    Stop manually calculating color codes. Whether you are building a professional design system or fine-tuning the opacity of a single button, our RGBA to Hex Converter provides the accuracy and speed you need. Experience the most intuitive way to manage color spaces and opacity today!
                </p>
            </div>
        </Card>
    )
}