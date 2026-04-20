"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Monitor,
    Maximize,
    Smartphone,
    Palette,
    Zap,
    RefreshCw,
    Share2,
    CheckCircle2,
    Wand2,
    Layers,
    Grid3X3,
    Laptop,
    Tv,
    Layout,
    Eye,
    Settings2
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionScreenResolutionChecker() {
    // Image path
    const imagePath = "/Images/InfosectionImages/ScreenResolutionCheckerPreview.webp"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the Screen Resolution Checker?
                </h2>
                <p className="text-default-600 mb-4">
                    The <Link href="#how-to-use" className="text-primary-500 hover:underline">Screen Resolution Checker</Link> is a sophisticated diagnostic utility designed to provide a comprehensive profile of your display hardware and software environment. It acts as a digital magnifying glass, uncovering the precise technical specifications of your screen that govern how content is rendered and displayed.
                </p>
                <p className="text-default-600 mb-4">
                    Invaluable for web developers, UI/UX designers, and hardware enthusiasts, this tool bridges the gap between raw hardware capabilities and software interpretation. From identifying physical pixel density and logical resolutions to analyzing color gamut and HDR support, it provides the detailed data required to optimize digital experiences for every possible viewport.
                </p>

                {/* Image Preview */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="Screen Resolution Checker interface showing display capabilities and technical specs"
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
                    How to Use the Screen Resolution Checker?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Zap className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Automatic Detection:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Simply open the tool. Our diagnostic engine automatically analyzes your device and browser environment to fetch real-time display data without any manual input.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                            2
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Layers className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <strong className="text-default-700">Navigate the Data Tabs:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use the tabbed interface to toggle between <strong>Display Specs, Screen Resolution, Browser Viewport, and Pixel Details</strong> for organized technical viewing.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                            3
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Maximize className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Analyze Visual Ratios:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Observe the visual representation of your aspect ratio and monitor properties. Use the <strong>Refresh</strong> (<RefreshCw className="w-3 h-3 inline" />) button if you resize your window or connect an external display.
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
                                <strong className="text-default-700">Copy or Share:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Click the <strong>Copy</strong> button to grab the full technical report for your clipboard, or use the <strong>Share</strong> button to send your specs to social media or support teams.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Key Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features for Tech Enthusiasts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Grid3X3 className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Pixel Geometry Analysis:</strong>
                            <span className="block mt-1">Deep dive into physical vs. logical pixels, including Device Pixel Ratio (DPR) and orientation data.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Palette className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Color Spectrum Metrics:</strong>
                            <span className="block mt-1">Detect color depth (bits), gamut support (sRGB, P3), and dynamic range (HDR) capabilities.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Layout className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Viewport Monitoring:</strong>
                            <span className="block mt-1">Real-time tracking of browser window dimensions and usable taskbar-aware screen areas.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Tv className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Aspect Ratio Mapping:</strong>
                            <span className="block mt-1">Visual depiction and mathematical calculation of your monitor&apos;s physical aspect ratio (e.g., 16:9, 21:9).</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Laptop className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Device Type Fingerprinting:</strong>
                            <span className="block mt-1">Intelligent identification of hardware categories—instantly detecting Desktop, Tablet, or Mobile.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Touch & Input Discovery:</strong>
                            <span className="block mt-1">Verify maximum touch points and input capabilities for high-performance interactive testing.</span>
                        </div>
                    </div>
                </div>

                {/* Pro Tips Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Wand2 className="w-6 h-6 mr-2 text-primary-500" />
                    Pro Tips for Display Optimization
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Maximize className="w-4 h-4 text-success-500" /> Logical Scaling
                        </h3>
                        <p className="text-sm">
                            If your high-res 4K screen shows a smaller resolution, check the <strong>Pixel Ratio</strong>. OS scaling (like 200%) changes the logical width for better readability.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Eye className="w-4 h-4 text-secondary-500" /> Gamut Check
                        </h3>
                        <p className="text-sm">
                            Designers should check the <strong>Color Depth</strong>. High-end displays support 10-bit color, allowing for smoother gradients without banding issues.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-warning-500" /> Responsive Test
                        </h3>
                        <p className="text-sm">
                            Use the <strong>Browser Resolution</strong> tab while resizing your window to find the exact breakpoints needed for your CSS media queries.
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
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Settings2 className="w-4 h-4 text-success-500" /> Web Development</h4>
                        <p className="text-xs">Finding exact device pixel ratios to ensure high-resolution "Retina" images are served correctly to the user.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Layers className="w-4 h-4 text-secondary-500" /> UX Audits</h4>
                        <p className="text-xs">Identifying specific screen constraints to ensure critical UI elements aren&apos;t hidden by OS taskbars or notches.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Zap className="w-4 h-4 text-warning-500" /> Tech Support</h4>
                        <p className="text-xs">Providing a complete display technical profile when reporting bugs or hardware performance issues to IT teams.</p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    Discover the full potential of your hardware today. Whether you are a designer perfecting your media queries, a developer troubleshooting performance, or a tech enthusiast curious about your display metrics, our Screen Resolution Checker provides the clarity you need. Start exploring your screen&apos;s hidden capabilities now!
                </p>
            </div>
        </Card>
    )
}