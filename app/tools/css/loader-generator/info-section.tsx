"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Palette,
    Sliders,
    Zap,
    Code,

    Loader2,
    MoreHorizontal,
    Circle,
    Sparkles,
    BarChartHorizontal,
    Maximize,
    Timer,

    Copy,
    Smartphone,
    Grid
} from "lucide-react"

export default function InfoSectionLoaderGenerator() {
    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the CSS Loader Generator?
                </h2>
                <p className="text-default-600 mb-4">
                    The CSS Loader Generator is your go-to tool for creating eye-catching, customizable loading animations using
                    pure CSS. Whether you're a seasoned developer or just starting out, our user-friendly interface makes it a
                    breeze to design stunning loaders that will keep your users engaged while your content loads.
                </p>
                <p className="text-default-600 mb-4">
                    With different types of loader types in different categories, you can create anything from simple spinners to
                    complex, multi-element animation. This is like a digital animation studio on your fingers, but without the complexity!
                </p>

                {/* How to Use Section */}
                <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
                    How to Use the CSS Loader Generator?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Grid className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Select & Browse:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Start by selecting a category (Spinners, Bars, Dots, etc.) and browse through the grid to find a base
                                animation that fits your style.
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
                                <strong className="text-default-700">Open Customizer:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Hover over your chosen loader and click "Customize". This opens the studio dialog where you can tweak every aspect.
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
                                <strong className="text-default-700">Tweak Properties:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use the sliders and color pickers to adjust the size, primary/secondary colors, and animation speed while watching the Real-time Preview.
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
                                <strong className="text-default-700">Get Code:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Switch to the "Get Code" tab and copy the generated CSS/HTML with a single click to paste directly into your project.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Loader Categories (Grid) */}
                <h2 id="categories" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Palette className="w-6 h-6 mr-2 text-primary-500" />
                    Loader Categories
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Loader2 className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Spinners:</strong>
                            <span className="block mt-1">
                                Classic rotating loaders, rings, and arcs suitable for most loading states.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <BarChartHorizontal className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Bars:</strong>
                            <span className="block mt-1">
                                Linear progress indicators, sliding bars, and equalizers for data-heavy loading.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <MoreHorizontal className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Dots:</strong>
                            <span className="block mt-1">
                                Subtle pulsating, bouncing, or flowing dot animations for modern UIs.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Circle className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Circular:</strong>
                            <span className="block mt-1">
                                Ring-shaped progress indicators and radar-like effects.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Custom & Creative:</strong>
                            <span className="block mt-1">
                                Unique, artistic, and experimental loader designs that stand out.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Customization Options (Boxed Grid) */}
                <h2 id="customization" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Sliders className="w-6 h-6 mr-2 text-primary-500" />
                    Customization Options
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <Maximize className="w-4 h-4 mr-2 text-primary-500" /> Size Control
                        </h3>
                        <p className="text-sm">
                            Adjust dimensions to fit your specific layout, from tiny button loaders to full-screen overlays.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <Palette className="w-4 h-4 mr-2 text-secondary-500" /> Theme Colors
                        </h3>
                        <p className="text-sm">
                            Choose primary, secondary, and background colors to perfectly match your brand's palette.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <Timer className="w-4 h-4 mr-2 text-success-500" /> Animation Speed
                        </h3>
                        <p className="text-sm">
                            Fine-tune the animation duration. Make it frantic and energetic or slow and calming.
                        </p>
                    </div>
                </div>

                {/* Features That Make Us Stand Out (Colored List) */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Features That Make Us Stand Out
                </h2>
                <div className="bg-default-100/50 dark:bg-default-200/20 p-5 rounded-lg">
                    <ul className="space-y-3 text-default-600">
                        <li className="flex items-start">
                            <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-0.5">
                                <Zap className="w-4 h-4 text-primary-500" />
                            </div>
                            <div>
                                <strong>Lightning-fast previews:</strong> See your color and speed changes instantly without any rendering lag.
                            </div>
                        </li>
                        <li className="flex items-start">
                            <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1 rounded-full mr-3 mt-0.5">
                                <Grid className="w-4 h-4 text-secondary-500" />
                            </div>
                            <div>
                                <strong>Extensive loader library:</strong> Dozens of pre-built loader types to choose from across multiple categories.
                            </div>
                        </li>
                        <li className="flex items-start">
                            <div className="bg-success-100 dark:bg-success-900/30 p-1 rounded-full mr-3 mt-0.5">
                                <Sliders className="w-4 h-4 text-success-500" />
                            </div>
                            <div>
                                <strong>Fine-grained control:</strong> Customize every aspect of your loader, including size, stroke width, and timing.
                            </div>
                        </li>
                        <li className="flex items-start">
                            <div className="bg-warning-100 dark:bg-warning-900/30 p-1 rounded-full mr-3 mt-0.5">
                                <Copy className="w-4 h-4 text-warning-500" />
                            </div>
                            <div>
                                <strong>One-click code copy:</strong> Get your optimized CSS and HTML with a single click, ready for production.
                            </div>
                        </li>
                        <li className="flex items-start">
                            <div className="bg-danger-100 dark:bg-danger-900/30 p-1 rounded-full mr-3 mt-0.5">
                                <Smartphone className="w-4 h-4 text-danger-500" />
                            </div>
                            <div>
                                <strong>Responsive design:</strong> The generated loaders (and this tool) look great on any device or screen size.
                            </div>
                        </li>
                    </ul>
                </div>

                <p className="text-default-600 mt-8">
                    Ready to revolutionize your loading experience? Dive in and start creating with our CSS Loader Generator.
                    Remember, in the world of web design, even waiting can be an art form. Let's make your loaders as captivating
                    as your content!
                </p>
            </div>
        </Card>
    )
}