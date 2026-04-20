"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Barcode,
    Download,
    Settings,
    Zap,
    RefreshCw,
    Monitor,
    Smartphone,
    Wand2,
    CheckCircle2,
    Layers,
    Palette,
    Eye,
    Type,
    Package,
    ShoppingCart,
    Tags
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionBarcodeGenerator() {
    // Image path
    const imagePath = "/Images/InfosectionImages/BarcodeGeneratorPreview.webp"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    About the Barcode Generator
                </h2>
                <p className="text-default-600 mb-4">
                    The <Link href="#how-to-use" className="text-primary-500 hover:underline">Barcode Generator</Link> is a precision-engineered utility designed for retail, logistics, and inventory management. It allows you to transform alphanumeric data into standardized machine-readable symbols, ensuring seamless integration with scanning hardware and software worldwide.
                </p>
                <p className="text-default-600 mb-4">
                    Moving beyond generic creators, this tool supports industry-standard formats including <strong>CODE128, EAN13, UPC, and CODE39</strong>. Whether you are labeling warehouse assets, creating product tags for a storefront, or managing event ticketing, our generator provides the granular control over dimensions, colors, and text visibility needed for reliable scannability.
                </p>

                {/* Image Preview */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="Barcode Generator interface showing barcode options and live generated preview"
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
                    How to Use the Barcode Generator?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Type className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Enter Your Data:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Input the numeric or alphanumeric string you wish to encode into the <strong>"Barcode Data"</strong> field.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                            2
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Settings className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <strong className="text-default-700">Select Format & Style:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Choose a barcode type (e.g., <strong>CODE128</strong>) and use the sliders to adjust the <strong>Width, Height, and Font Size</strong> to fit your label requirements.
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
                                <strong className="text-default-700">Customize Appearance:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use the color pickers to define the background and line colors. Toggle the <strong>"Show Text"</strong> switch to display the human-readable value below the bars.
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
                                <strong className="text-default-700">Export Asset:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Click <strong>Download</strong> to save a PNG image, or <strong>Copy SVG</strong> to get a high-quality vector for your digital design software.
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
                        <Barcode className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Multi-Format Library:</strong>
                            <span className="block mt-1">Full support for industrial standards including CODE128, EAN13, UPC, CODE39, and more.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Layers className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Vector SVG Output:</strong>
                            <span className="block mt-1">Copy code as SVG for pixel-perfect scaling in design tools like Figma or Adobe Illustrator.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Real-Time Generation:</strong>
                            <span className="block mt-1">The barcode updates instantly as you type or adjust sliders, providing immediate visual confirmation.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Palette className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Visual Branding:</strong>
                            <span className="block mt-1">Adjust line and background colors to match your brand aesthetics while maintaining scanner compliance.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <RefreshCw className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Instant Regeneration:</strong>
                            <span className="block mt-1">Quickly refresh and test multiple data sets without reloading the interface or losing your settings.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Mobile Optimized:</strong>
                            <span className="block mt-1">A fully responsive design that allows you to generate and share barcodes directly from any device.</span>
                        </div>
                    </div>
                </div>

                {/* Pro Tips Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Wand2 className="w-6 h-6 mr-2 text-primary-500" />
                    Pro Tips for Scannability
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Eye className="w-4 h-4 text-success-500" /> High Contrast
                        </h3>
                        <p className="text-sm">
                            Always keep a high contrast between lines and background. Dark lines on a white background are the gold standard for laser scanners.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Layers className="w-4 h-4 text-secondary-500" /> Use SVG for Print
                        </h3>
                        <p className="text-sm">
                            When printing labels, use the <strong>Copy SVG</strong> option. Vector graphics won&apos;t blur or pixelate, ensuring the bars remain sharp.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-warning-500" /> Quiet Zones
                        </h3>
                        <p className="text-sm">
                            Leave some empty white space around your barcode. These "quiet zones" help scanners identify where the barcode begins and ends.
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
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Package className="w-4 h-4 text-success-500" /> Inventory Tracking</h4>
                        <p className="text-xs">Generating unique CODE128 labels for warehouse assets to streamline stock movement and management.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><ShoppingCart className="w-4 h-4 text-secondary-500" /> Retail Labeling</h4>
                        <p className="text-xs">Creating EAN13 or UPC barcodes for consumer products to be used in point-of-sale (POS) systems.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Tags className="w-4 h-4 text-warning-500" /> Event Ticketing</h4>
                        <p className="text-xs">Producing scan-ready barcodes for digital or printed event tickets to ensure fast and secure entry processing.</p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    The Barcode Generator is more than just a tool—it is an essential asset for modern logistics and retail. By combining ease of use with professional standards, you can create scannable assets that work perfectly every time. Start generating your professional barcodes today!
                </p>
            </div>
        </Card>
    )
}