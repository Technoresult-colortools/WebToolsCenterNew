"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Zap,
    Sliders,
    Monitor,
    Code,
    Smartphone,

    RotateCcw,

    Copy,
    Eye,
    Apple,
    Layers,
    History,
    Save,
    Heart,
    FileJson
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionReactNativeShadow() {
    // Image path
    const imagePath = "/Images/InfosectionImages/ReactNativeShadowPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the React Native Shadow Generator?
                </h2>
                <p className="text-default-600 mb-4">
                    Think of the <Link href="#how-to-use" className="text-primary-500 hover:underline">React Native Shadow Generator</Link> as your cross-platform bridge for UI depth. In the React Native ecosystem, shadows are handled differently across iOS and Android. This tool provides a unified, visual interface to craft consistent component elevation and shadows without the trial-and-error of manual coding.
                </p>
                <p className="text-default-600 mb-4">
                    Whether you are building a soft "Neumorphic" interface for iOS or following Material Design’s "Elevation" system for Android, this generator handles the platform-specific syntax for you. It allows you to visualize your design on various shapes—including hearts and circles—ensuring your mobile app feels tactile and premium on every device.
                </p>

                {/* Image Preview */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="React Native Shadow Generator Interface Preview"
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
                    How to Use the React Native Shadow Generator?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Monitor className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Choose Your Platform:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Select between <strong>iOS</strong> or <strong>Android</strong>. The tool will automatically switch between shadow properties like <code>shadowRadius</code> and <code>elevation</code>.
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
                                <strong className="text-default-700">Style & Shape:</strong>
                            </div>
                            <div className="ml-6 space-y-2">
                                <div className="flex items-start gap-2">
                                    <Heart className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                                    <div>
                                        <strong className="text-default-700">Custom Context:</strong>
                                        <span className="text-default-600 ml-1">Change the preview shape to a Square, Circle, or Heart to see how the shadow wraps around different component geometries.</span>
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
                                <History className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Save & Organize:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use <strong>Quick Presets</strong> for instant results, or name and <strong>Save to History</strong> (<Save className="w-3 h-3 inline" />) your favorite custom shades for future sessions.
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
                                Once satisfied, <strong>Copy Code</strong> (<Copy className="w-3 h-3 inline" />) and paste it directly into your <code>StyleSheet.create</code> object in your React Native project.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features for Mobile Design
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Platform-Specific Generation:</strong>
                            <span className="block mt-1">
                                Handles iOS shadow props and Android elevation simultaneously for truly native-feeling components.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Quick Presets:</strong>
                            <span className="block mt-1">
                                Instant access to Subtle, Medium, Elevated, and Floating styles for rapid prototyping.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Eye className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Multi-Shape Preview:</strong>
                            <span className="block mt-1">
                                Test your shadows on squares, circles, and hearts to ensure visual consistency across all UI elements.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <History className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Named History:</strong>
                            <span className="block mt-1">
                                Save, name, and manage your shadow library to maintain a consistent design system throughout your app.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <FileJson className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Export & Import:</strong>
                            <span className="block mt-1">
                                Backup your shadow collections as JSON files to share with team members or restore them later.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Code className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Optimized Code:</strong>
                            <span className="block mt-1">
                                Generates clean, ready-to-use StyleSheet objects with a single-click copy functionality.
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
                            <Apple className="w-4 h-4 mr-2 text-primary-500" /> iOS vs Android
                        </h3>
                        <p className="text-sm">
                            iOS allows for colored shadows and fine blur control. Android primarily uses <code>elevation</code> which is system-locked to specific light sources.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <Layers className="w-4 h-4 mr-2 text-secondary-500" /> Hierarchy
                        </h3>
                        <p className="text-sm">
                            Use higher elevation/shadow values for components that sit on top, like modals or fab buttons, to guide user focus.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <RotateCcw className="w-4 h-4 mr-2 text-success-500" /> Reset & Refine
                        </h3>
                        <p className="text-sm">
                            Stuck on a design? Use the <strong>Reset</strong> (<RotateCcw className="w-3 h-3 inline" />) button to return to the baseline and start fresh with a new platform.
                        </p>
                    </div>
                </div>

                <p className="text-default-600 mt-8">
                    Ready to elevate your mobile UI? Start experimenting with cross-platform elevation, save your best work to history, and bring a professional sense of depth to your next React Native project today!
                </p>
            </div>
        </Card>
    )
}