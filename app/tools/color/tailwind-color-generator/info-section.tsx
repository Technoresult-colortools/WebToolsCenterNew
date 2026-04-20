"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Search,
    Zap,
    Copy,
    Smartphone,
    Wand2,
    CheckCircle2,
    Monitor,
    Brush,
    Layers,
    RefreshCw,
    Code,
    Target,
    Layout
} from "lucide-react"
import Link from "next/link"

export default function InfoSectionTailwindColorGenerator() {
    // Image path
    const imagePath = "/Images/InfosectionImages/TailwindColorGeneratorPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the Tailwind Color Generator?
                </h2>
                <p className="text-default-600 mb-4">
                    The <Link href="#how-to-use" className="text-primary-500 hover:underline">Tailwind Color Generator</Link> is a specialized command center for web developers and UI designers. It provides a comprehensive platform to explore, manipulate, and generate custom palettes within the **Tailwind CSS ecosystem**, bridging the gap between raw hexadecimal values and utility-first class names.
                </p>
                <p className="text-default-600 mb-4">
                    Whether you are browsing the standard Tailwind palette or building a custom 50-950 shade scale for a new brand, this tool ensures absolute consistency. With real-time previews and support for complex color harmonies, it allows you to transform a single base color into a production-ready design system instantly.
                </p>



                {/* How to Use Section */}
                <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
                    How to Use the Tailwind Color Generator?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Search className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Browse or Search:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use the <strong>Search Bar</strong> to quickly locate specific Tailwind colors (e.g., "Sky" or "Emerald"). Browse the full 50-950 shade spectrum for each color family.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                            2
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Wand2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <strong className="text-default-700">Generate Custom Palettes:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Switch to the <strong>Custom Generator</strong> tab. Input any Hex code or use the color picker to automatically build a complementary Tailwind-style shade scale.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                            3
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Layers className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Explore Harmonies:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                View <strong>Complementary, Analogous, and Triadic</strong> suggestions for your chosen color to ensure your design remains harmonious and accessible.
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
                                <strong className="text-default-700">Copy to Clipboard:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Click on any swatch to instantly copy its <strong>Tailwind Class Name</strong> (e.g., bg-blue-500) or its <strong>Hex Code</strong> for use in your configuration files.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Key Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features for Developers
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Layout className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Full Palette Explorer:</strong>
                            <span className="block mt-1">Easily navigate the entire default Tailwind CSS color library in one unified, visual interface.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Dynamic Shade Generator:</strong>
                            <span className="block mt-1">Turn any brand color into a full 10-step palette ranging from ultra-light (50) to deep (950).</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Search className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Intelligent Search:</strong>
                            <span className="block mt-1">High-speed filtering allows you to locate specific hues and shade variants by name or value.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Copy className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">One-Click Implementation:</strong>
                            <span className="block mt-1">Copy both CSS class names and Hex codes instantly, reducing manual typing in your `tailwind.config.js`.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <RefreshCw className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Harmony Suggestions:</strong>
                            <span className="block mt-1">Automatically suggests complementary and triadic colors based on Tailwind’s unique color math.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Mobile Responsive:</strong>
                            <span className="block mt-1">Optimized touch-friendly design allows you to build and export palettes on any device.</span>
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
                            <Target className="w-4 h-4 text-success-500" /> Contrast Check
                        </h3>
                        <p className="text-sm">
                            Always pair light text with shades 600-900 and dark text with shades 50-300 to ensure your UI remains WCAG compliant.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Code className="w-4 h-4 text-secondary-500" /> Config Sync
                        </h3>
                        <p className="text-sm">
                            When using the Custom Generator, copy the Hex values directly into your `extend` object in your configuration file.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-warning-500" /> Palette Balance
                        </h3>
                        <p className="text-sm">
                            Stick to a single primary family for 70% of your UI, using the 500 shade for buttons and the 50 shade for subtle backgrounds.
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
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Brush className="w-4 h-4 text-success-500" /> Rapid Prototyping</h4>
                        <p className="text-xs">Quickly selecting colors during the initial wireframing phase to set the mood without leaving the browser.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Layers className="w-4 h-4 text-secondary-500" /> Design Systems</h4>
                        <p className="text-xs">Building customized color scales that extend the default Tailwind palette while maintaining the same visual weight.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Target className="w-4 h-4 text-warning-500" /> Theme Customization</h4>
                        <p className="text-xs">Ensuring consistent color application across dark and light modes by using the full shade scale effectively.</p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    Ready to elevate your color workflow? Start using our Tailwind Color Generator now to streamline your design process and spark your creativity. Whether you're a seasoned developer or a newcomer to web design, our tool provides the functionality you need to make the most of Tailwind's robust color system!
                </p>
            </div>
        </Card>
    )
}