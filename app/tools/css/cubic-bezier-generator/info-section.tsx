"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Activity,
    MousePointerClick,
    Eye,
    Sliders,
    Zap,
    Code,
    Smartphone,
    RefreshCcw,
    Image as ImageIcon,
    Play,
    CheckCircle2,
    Layers,
    Target
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionCubicBezier() {
    // Image path
    const imagePath = "/Images/InfosectionImages/CSSCubicBezierPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the CSS Cubic Bezier Generator?
                </h2>
                <p className="text-default-600 mb-4">
                    Think of the <Link href="#how-to-use" className="text-primary-500 hover:underline">CSS Cubic Bezier Generator</Link> as a remote control for the laws of physics in your web browser.
                    In the world of web design, animations often feel robotic when they move at a constant speed. This tool allows you to act as a "motion architect,"
                    defining exactly how an element accelerates and decelerates over time.
                </p>
                <p className="text-default-600 mb-4">
                    By manipulating a mathematical curve, you can create animations that feel organic—like a bouncing ball, a swinging door, or a smooth sliding menu.
                    Whether you are a beginner looking for classic "ease-in-out" presets or a pro crafting high-performance UI transitions,
                    this generator provides the visual precision needed to bring your digital elements to life.
                </p>

                {/* Image Preview */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="CSS Cubic Bezier Generator Interface Preview"
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
                    How to Use the Cubic Bezier Generator?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Activity className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Shape the Curve:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Start by selecting a preset easing function or directly drag the <strong>control points</strong> on the graph to sculpt your custom motion path.
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
                                <strong className="text-default-700">Fine-Tune Details:</strong>
                            </div>
                            <div className="ml-6 space-y-2">
                                <div className="flex items-start gap-2">
                                    <Target className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                                    <div>
                                        <strong className="text-default-700">Coordinates & Duration:</strong>
                                        <span className="text-default-600 ml-1">Manually input precise X and Y values or adjust the <strong>Animation Duration</strong> slider to control the timing.</span>
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
                                <Play className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Test the Motion:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Watch the live preview box to see your curve in action. Toggle <strong>Grid Lines</strong> for accuracy or upload a <strong>Custom Image</strong> to see how your specific UI element will behave.
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
                                <strong className="text-default-700">Export & Implement:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Once the motion feels perfect, copy the generated `cubic-bezier()` CSS code and paste it directly into your `transition` or `animation` property.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features for Perfect Motion
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <MousePointerClick className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Interactive Curve Editor:</strong>
                            <span className="block mt-1">
                                Visually manipulate handles to create custom easing that goes beyond standard CSS presets.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Layers className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Preset Library:</strong>
                            <span className="block mt-1">
                                Quick access to standard functions like Ease-In, Ease-Out, and Linear for rapid prototyping.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Eye className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Real-time Preview:</strong>
                            <span className="block mt-1">
                                Instantly visualize the "feel" of your animation with a live-synced preview block.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <ImageIcon className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Image Upload:</strong>
                            <span className="block mt-1">
                                Personalize your testing by uploading your own logo or UI element to the animation preview.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Code className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">One-Click Export:</strong>
                            <span className="block mt-1">
                                Get clean, valid CSS code instantly formatted for your stylesheets.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Responsive & Lightweight:</strong>
                            <span className="block mt-1">
                                A fully responsive tool that works on any device without slowing down your workflow.
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
                            <Activity className="w-4 h-4 mr-2 text-primary-500" /> "Bouncy" Effects
                        </h3>
                        <p className="text-sm">
                            You can drag control points above 1.0 or below 0.0 to create "anticipation" or "overshoot" (bounce) effects.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <RefreshCcw className="w-4 h-4 mr-2 text-secondary-500" /> Consistency
                        </h3>
                        <p className="text-sm">
                            Use similar bezier curves across your entire site to create a cohesive brand "feeling" in your UI motion.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <CheckCircle2 className="w-4 h-4 mr-2 text-success-500" /> Duration Matters
                        </h3>
                        <p className="text-sm">
                            A great curve can feel "off" if the duration is too long. Aim for 200ms–500ms for standard UI transitions.
                        </p>
                    </div>
                </div>

                <p className="text-default-600 mt-8">
                    Ready to master the art of motion? Start experimenting with the curve, watch how the speed changes, and create animations that your users will truly enjoy interacting with!
                </p>
            </div>
        </Card>
    )
}