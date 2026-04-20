"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Globe,
    Map,
    Link2,
    Share2,
    History,
    Smartphone,
    CheckCircle2,
    Monitor,
    Shield,
    Globe2,
    Lock,
    Unlock,
    Zap,
    BarChart3
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionYoutubeRegionRestriction() {
    // Image path
    const imagePath = "/Images/InfosectionImages/YoutubeRegionRestrictionPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the YouTube Region Restriction Finder?
                </h2>
                <p className="text-default-600 mb-4">
                    The <Link href="#how-to-use" className="text-primary-500 hover:underline">YouTube Region Restriction Finder</Link> is a comprehensive global accessibility audit tool. Engineered for content creators, digital marketers, and researchers, it provides a transparent window into how YouTube videos are distributed across international borders, identifying exactly where a video is available or blocked.
                </p>
                <p className="text-default-600 mb-4">
                    Content licensing and regional copyright laws often create a complex web of restrictions. This tool simplifies that complexity by providing a <strong>real-time interactive world map</strong> and detailed country-by-country reports. Whether you are troubleshooting a delivery issue for a client or analyzing the global reach of a competitor, this finder offers the technical clarity you need.
                </p>

                {/* Image Preview */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="YouTube Region Restriction Finder interface showing global map and availability data"
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
                    How to Use the YouTube Region Restriction Finder?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Link2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Paste Video URL:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Copy the URL of the YouTube video you wish to analyze and paste it into the secure input field at the top of the interface.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                            2
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Globe className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <strong className="text-default-700">Audit Accessibility:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Click <strong>"Check Availability"</strong>. Our API-driven engine will instantly cross-reference regional database permissions for that specific video ID.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                            3
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Map className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Visualize Results:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Explore the <strong>Interactive World Map</strong> and detailed country list. Green markers signify open access, while red markers indicate regional blocks.
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
                                <strong className="text-default-700">Share Findings:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use the <strong>Share</strong> function to distribute your findings or revisit previous audits via the <strong>Recent Searches</strong> (<History className="w-3 h-3 inline" />) section.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Key Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features for Global Distribution
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Map className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Interactive Map Visualization:</strong>
                            <span className="block mt-1">A high-fidelity SVG world map that color-codes video accessibility for immediate visual impact.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Globe2 className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Detailed Country Reporting:</strong>
                            <span className="block mt-1">Comprehensive breakdown of every country's status, ensuring no region is left unmonitored.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <BarChart3 className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Rich Video Metadata:</strong>
                            <span className="block mt-1">View essential context alongside restrictions, including view counts, channel data, and original publish date.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <History className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Search History Tracking:</strong>
                            <span className="block mt-1">Automatically archives your recently checked URLs for fast re-access during a research session.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">API-Based Precision:</strong>
                            <span className="block mt-1">Utilizes advanced API checks to ensure the restriction data is accurate and up-to-date with current policies.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Fully Responsive:</strong>
                            <span className="block mt-1">Optimized for mobile, tablet, and desktop—perform global audits from any device, anywhere.</span>
                        </div>
                    </div>
                </div>

                {/* Pro Tips Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Shield className="w-6 h-6 mr-2 text-primary-500" />
                    Pro Tips for Global Creators
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Lock className="w-4 h-4 text-danger-500" /> Licensing Check
                        </h3>
                        <p className="text-sm">
                            If your video is restricted, check your used music or third-party clips. Specific tracks often have licenses that only cover certain geographic regions.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Monitor className="w-4 h-4 text-secondary-500" /> Ad Strategy
                        </h3>
                        <p className="text-sm">
                            Before launching global ad campaigns, use this tool to ensure your promotional video is actually visible in your target countries to avoid wasted spend.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Unlock className="w-4 h-4 text-success-500" /> Market Research
                        </h3>
                        <p className="text-sm">
                            Analyze competitor videos to see if they are missing specific markets. This could identify a "content gap" you can fill with your own unrestricted media.
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
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Globe className="w-4 h-4 text-success-500" /> Marketing Teams</h4>
                        <p className="text-xs">Verifying that global brand launches are visible to audiences across every continent as planned in the marketing brief.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Shield className="w-4 h-4 text-secondary-500" /> Copyright Research</h4>
                        <p className="text-xs">Investigating the impact of "Content ID" claims on a video's global availability and identifying which regions are affected.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-warning-500" /> User Experience</h4>
                        <p className="text-xs">Helping viewers understand why certain content is unavailable and providing technical data for support queries.</p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    The YouTube Region Restriction Finder is an essential asset for anyone operating within the international digital landscape. By providing definitive data on content reach, you can make informed decisions about distribution and growth strategy. Start exploring the global reach of YouTube content today!
                </p>
            </div>
        </Card>
    )
}