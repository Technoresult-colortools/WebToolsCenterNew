"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Search,
    Zap,
    FileJson,
    History,
    BarChart3,
    Smartphone,
    Monitor,
    Wand2,
    Target,
    ShieldCheck,
    Layers,
    Settings,
    Download,
    Brush
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionYoutubeMetadataExtractor() {
    // Image path
    const imagePath = "/Images/InfosectionImages/YoutubeMetadataPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the YouTube Metadata Extractor?
                </h2>
                <p className="text-default-600 mb-4">
                    The <Link href="#how-to-use" className="text-primary-500 hover:underline">YouTube Metadata Extractor</Link> is a powerful forensic tool engineered for creators, SEO specialists, and market researchers. It serves as a comprehensive intelligence platform that allows you to pull and analyze hidden data from any YouTube video, providing the raw insights needed to refine your content strategy and outpace the competition.
                </p>
                <p className="text-default-600 mb-4">
                    Whether you are conducting a technical audit of your own library or reverse-engineering a competitor's viral success, this tool offers a deep dive into the underlying data structures. From SEO tags and full descriptions to technical specifications like video definition and privacy status, it transforms a single URL into a complete data report for informed decision-making.
                </p>

                {/* Image Preview */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="YouTube Metadata Extractor interface showing comprehensive data extraction results"
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
                    How to Use the YouTube Metadata Extractor?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Search className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Enter Video URL:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Paste the URL of the YouTube video you wish to analyze into the input field and click <strong>"Extract"</strong>.
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
                                <strong className="text-default-700">Explore Data Tabs:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Navigate through the <strong>Tags, Description, and Details</strong> tabs to view SEO keywords, full text descriptions, and technical video specs.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                            3
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <BarChart3 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Analyze Statistics:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Review the performance metrics, including <strong>view counts, likes, and comment ratios</strong> to gauge the video&apos;s overall audience engagement.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                            4
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <FileJson className="w-4 h-4 text-purple-500 flex-shrink-0" />
                                <strong className="text-default-700">Download & Record:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Click the <strong>JSON download</strong> button to save the entire metadata set locally for offline research or documentation.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Key Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features for Data Analysis
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Full Spectrum Extraction:</strong>
                            <span className="block mt-1">Retrieve every available data point, from public engagement stats to backend technical details.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Target className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">SEO Tag Discovery:</strong>
                            <span className="block mt-1">Isolate the exact keywords a creator used to optimize the video for the YouTube algorithm.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Settings className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Technical Specs Audit:</strong>
                            <span className="block mt-1">Access duration, video definition, caption availability, and privacy settings in one report.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <History className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Search History Tracking:</strong>
                            <span className="block mt-1">Automatically save a record of analyzed videos for quick comparison and future reference.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Download className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">JSON Export:</strong>
                            <span className="block mt-1">Convert raw metadata into a structured JSON file for advanced research or custom database integration.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Fully Responsive:</strong>
                            <span className="block mt-1">Perform deep-dive metadata research across desktop, tablet, or mobile devices seamlessly.</span>
                        </div>
                    </div>
                </div>

                {/* Pro Tips Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Wand2 className="w-6 h-6 mr-2 text-primary-500" />
                    Pro Tips for Strategy Success
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-success-500" /> Competitor Pulse
                        </h3>
                        <p className="text-sm">
                            Analyze the top 5 videos in your niche to identify patterns in tag selection and description structure that correlate with high view counts.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Target className="w-4 h-4 text-secondary-500" /> Tag Optimization
                        </h3>
                        <p className="text-sm">
                            Don&apos;t just copy tags; look at the relationship between the video&apos;s title and the extracted metadata to find high-value keyword opportunities.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <History className="w-4 h-4 text-warning-500" /> Historical Audit
                        </h3>
                        <p className="text-sm">
                            Use the history feature to track if a viral video has updated its metadata over time—a common strategy for maintaining long-term relevance.
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
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Brush className="w-4 h-4 text-success-500" /> Content Creation</h4>
                        <p className="text-xs">Ensuring your video settings match best practices by verifying technical specs and SEO data before final release.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-secondary-500" /> Brand Consistency</h4>
                        <p className="text-xs">Documenting channel-wide metadata patterns to ensure consistent naming conventions and tag sets across marketing teams.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Layers className="w-4 h-4 text-warning-500" /> Academic Research</h4>
                        <p className="text-xs">Extracting large datasets of video information for cultural studies, trend analysis, or platform behavioral research.</p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    The YouTube Metadata Extractor is your gateway to a deeper understanding of the world&apos;s largest video platform. Whether you are a creator, marketer, or researcher, the insights provided by this tool give you a data-driven edge. Start exploring the hidden intelligence behind YouTube videos today!
                </p>
            </div>
        </Card>
    )
}