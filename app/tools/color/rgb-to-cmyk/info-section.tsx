"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Printer,
    Monitor,
    Sliders,
    Eye,
    Copy,
    Zap,
    MoveRight,
    Smartphone,
    Wand2,
    CheckCircle2,
    Brush,
    Layers,
    RefreshCw,
    AlertTriangle,
    Code,
    FileText
} from "lucide-react"
import Link from "next/link"

export default function InfoSectionRgbToCmyk() {
    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the RGB to CMYK Converter?
                </h2>
                <p className="text-default-600 mb-4">
                    The <Link href="#how-to-use" className="text-primary-500 hover:underline">RGB to CMYK Converter</Link> is an essential bridge for designers moving from digital creation to physical production. While digital screens use **RGB** (additive light), the printing world operates on **CMYK** (subtractive ink). This tool ensures your digital visions translate accurately into the world of Cyan, Magenta, Yellow, and Key (Black).
                </p>
                <p className="text-default-600 mb-4">
                    Preparing artwork for professional printing requires precise color management. Our converter takes your screen-based Red, Green, and Blue values and calculates the exact ink percentages needed for offset or digital printing. This minimizes "color shock" where vibrant digital colors appear dull when printed, helping you maintain brand integrity across all media.
                </p>

                {/* How to Use Section */}
                <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
                    How to Use the RGB to CMYK Converter?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Sliders className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Set Digital RGB Values:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Adjust the <strong>Red, Green, and Blue sliders</strong> (0-255) to match your digital asset's color. You can also type exact values into the numeric fields for pixel-perfect matching.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                            2
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Zap className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <strong className="text-default-700">Real-Time Ink Mapping:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                As you move the sliders, the tool instantly calculates the <strong>CMYK percentages</strong>. This allows you to see how digital light translates into physical ink density.
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
                                <strong className="text-default-700">Visual Verification:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use the <strong>Live Preview</strong> box to confirm the color visually. Since the RGB gamut is wider than CMYK, this helps you identify potential shifts before sending files to the printer.
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
                                <strong className="text-default-700">Copy & Implement:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use the <strong>Copy buttons</strong> to grab the CMYK string or individual values. Use the Reset button (<RefreshCw className="w-3 h-3 inline" />) to start a new color exploration.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Key Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features for Professionals
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Printer className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Print-Ready Accuracy:</strong>
                            <span className="block mt-1">Calculates precise cyan, magenta, yellow, and black percentages for professional output.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <RefreshCw className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Zero-Latency Conversion:</strong>
                            <span className="block mt-1">Every slider adjustment re-calculates the entire color model instantly for rapid workflow.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Sliders className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Dual Control Logic:</strong>
                            <span className="block mt-1">Choose between tactile sliders for exploration or numeric inputs for specific technical matching.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Copy className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Clipboard Optimized:</strong>
                            <span className="block mt-1">Quickly transfer values to design software like Illustrator, InDesign, or Photoshop.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <MoveRight className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Gamut Insight:</strong>
                            <span className="block mt-1">Helps identify colors that might fall outside the printable CMYK range before production starts.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Mobile Optimized:</strong>
                            <span className="block mt-1">A fully responsive design that allows for color verification on any device or screen.</span>
                        </div>
                    </div>
                </div>

                {/* Pro Tips Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Wand2 className="w-6 h-6 mr-2 text-primary-500" />
                    Pro Tips for Print Perfection
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-warning-500" /> Gamut Check
                        </h3>
                        <p className="text-sm">
                            Vibrant digital neons and deep blues often look "dull" in print. Use this tool to see the closest printable version of your digital color.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Layers className="w-4 h-4 text-secondary-500" /> Black Depth
                        </h3>
                        <p className="text-sm">
                            For deep black areas, use the converter to find a "Rich Black" mix rather than just 100% K to ensure a deeper, more professional print finish.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-success-500" /> Paper Type
                        </h3>
                        <p className="text-sm">
                            Colors look different on glossy vs. matte paper. Use these CMYK values as a baseline and always request a physical proof for critical projects.
                        </p>
                    </div>
                </div>

                {/* Integration & Workflow */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Monitor className="w-6 h-6 mr-2 text-primary-500" />
                    Workflow Integration Tips
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Code className="w-4 h-4 text-success-500" /> Web-to-Print</h4>
                        <p className="text-xs">Store your CMYK values in a dedicated style guide alongside CSS variables to ensure your digital and physical assets match.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><FileText className="w-4 h-4 text-secondary-500" /> Asset Management</h4>
                        <p className="text-xs">Include both RGB and CMYK breakdowns in your project documentation for handoff to printers and marketing teams.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Brush className="w-4 h-4 text-warning-500" /> Design Prep</h4>
                        <p className="text-xs">Use the converter values when setting up document color swatches in Illustrator or InDesign for a consistent build.</p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    Stop guessing how your screen colors will look on paper. Whether you are a professional preparing a high-volume print run or a hobbyist exploring color theory, our RGB to CMYK Converter provides the technical accuracy you need. Start translating your digital creations into physical realities with total confidence!
                </p>
            </div>
        </Card>
    )
}