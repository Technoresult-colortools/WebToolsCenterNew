"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Layout,
    Rows,
    Columns,
    Move,
    Sliders,
    Zap,
    Code,
    Smartphone,
    RotateCcw,
    CheckCircle2,
    Plus,
    Palette,
    Layers,
    MousePointerClick
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionFlexbox() {
    // Image path
    const imagePath = "/Images/InfosectionImages/CSSFlexboxPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the CSS Flexbox Generator?
                </h2>
                <p className="text-default-600 mb-4">
                    Think of the <Link href="#how-to-use" className="text-primary-500 hover:underline">CSS Flexbox Generator</Link> as the Swiss Army Knife for modern web layouts. In the past, aligning elements in the center or creating equal-height columns was a nightmare for developers. Flexbox solved this, and our generator makes that power visual and intuitive.
                </p>
                <p className="text-default-600 mb-4">
                    This tool allows you to act as a layout architect, arranging "flex items" within a container with absolute precision. Whether you are building a responsive navigation bar, a centered landing page hero, or a complex grid of cards, you can experiment with alignment and spacing properties in real-time and see the code update instantly.
                </p>

                {/* Image Preview - Wrapped in Link for Accessibility/Zoom */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="CSS Flexbox Generator Interface Preview"
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
                    How to Use the CSS Flexbox Generator?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Layout className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Configure the Container:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Start by adjusting the <strong>Flex Direction</strong> (Rows/Columns), <strong>Justify Content</strong>, and <strong>Align Items</strong>. This determines how all items behave collectively inside the parent box.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                            2
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Plus className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <strong className="text-default-700">Manage Flex Items:</strong>
                            </div>
                            <div className="ml-6 space-y-2">
                                <div className="flex items-start gap-2">
                                    <Sliders className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                                    <div>
                                        <strong className="text-default-700">Add & Individualize:</strong>
                                        <span className="text-default-600 ml-1">Add or remove items using the controls. Click on an individual item to adjust its <strong>Flex Grow, Shrink, or Align Self</strong> properties for unique positioning.</span>
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
                                <Palette className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Visualize Dimensions:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Customize container width, height, and background colors. Toggle <strong>Gap</strong> sliders to see how spacing works between items without using margins.
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
                                <strong className="text-default-700">Copy the Code:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Switch to the <strong>Generated CSS</strong> tab to inspect the clean code. Copy it with one click and paste it directly into your project's stylesheet.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Flexbox Features Explained
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Rows className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Flex Direction:</strong>
                            <span className="block mt-1">
                                Defines the main axis (Row/Column) along which items are laid out.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Move className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Justify Content:</strong>
                            <span className="block mt-1">
                                Controls alignment on the main axis (e.g., Space-Between, Center, Flex-End).
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <MousePointerClick className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Align Items:</strong>
                            <span className="block mt-1">
                                Defines the default behavior for how flex items are laid out along the cross axis.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Layers className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Flex Wrap:</strong>
                            <span className="block mt-1">
                                Determines if items should stay on one line or wrap onto multiple lines if space runs out.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Code className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Real-time CSS:</strong>
                            <span className="block mt-1">
                                Generates clean HTML and CSS structure instantly with syntax highlighting for developers.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Responsive Ready:</strong>
                            <span className="block mt-1">
                                Test how your layout handles different container sizes and wrapping behaviors for mobile devices.
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
                            <Columns className="w-4 h-4 mr-2 text-primary-500" /> Main vs Cross
                        </h3>
                        <p className="text-sm">
                            If your direction is <code>row</code>, the main axis is horizontal. If it's <code>column</code>, the main axis is vertical.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <RotateCcw className="w-4 h-4 mr-2 text-secondary-500" /> Flex-Basis
                        </h3>
                        <p className="text-sm">
                            Think of <code>flex-basis</code> as the "ideal" size of an item before the remaining space is distributed.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <CheckCircle2 className="w-4 h-4 mr-2 text-success-500" /> Flex-Grow
                        </h3>
                        <p className="text-sm">
                            An item with <code>flex-grow: 2</code> will take up twice as much available space as an item with <code>flex-grow: 1</code>.
                        </p>
                    </div>
                </div>

                <p className="text-default-600 mt-8">
                    Ready to build pixel-perfect layouts? Start adjusting the properties above, watch how the items react, and master the art of Flexbox in minutes!
                </p>
            </div>
        </Card>
    )
}