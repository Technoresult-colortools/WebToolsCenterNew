"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Youtube,
    Download,
    History,
    Smartphone,
    CheckCircle2,
    AlertTriangle,
    Copy,
    Zap,
    Maximize2,
    Eye,
    ShieldCheck,
    Link2,
    Wand2
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionYoutubeThumbnailDownloader() {
    // Image path
    const imagePath = "/Images/InfosectionImages/YoutubeThumbnailPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the YouTube Thumbnail Downloader?
                </h2>
                <p className="text-default-600 mb-4">
                    The <Link href="#how-to-use" className="text-primary-500 hover:underline">YouTube Thumbnail Downloader</Link> is a powerful digital asset extractor designed for creators, marketers, and researchers. It provides a direct gateway to access and save high-fidelity visual assets from any YouTube video, transforming a simple URL into a library of high-resolution image data instantly.
                </p>
                <p className="text-default-600 mb-4">
                    Beyond simple extraction, this tool serves as a vital component in the modern content workflow. Whether you are conducting competitive niche analysis, building a marketing mood board, or simply archiving visual references, it delivers every available resolution—from standard definition to **Maximum Resolution (HD)**—without requiring a login or complex software.
                </p>

                {/* Image Preview */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="YouTube Thumbnail Downloader interface showing URL input and resolution options"
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
                    How to Use the YouTube Thumbnail Downloader?
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
                                Copy the URL of any YouTube video from your browser or app and paste it into the secure input field at the top of the tool.
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
                                <strong className="text-default-700">Fetch and Analyze:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Click <strong>"Fetch Thumbnails"</strong>. Our API-based engine will immediately retrieve all available quality tiers for that specific video.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                            3
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Maximize2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Browse Resolutions:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Browse the gallery of generated thumbnails, ranging from small previews to <strong>Full HD (1280x720)</strong> or higher if the creator uploaded it.
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
                                <strong className="text-default-700">Save or Share:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Click <strong>"Download"</strong> to save the image to your local device, or use <strong>"Copy URL"</strong> to share the direct asset link with your team.
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
                        <Youtube className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Universal Extraction:</strong>
                            <span className="block mt-1">Supports all public YouTube video URLs for instant, high-speed thumbnail retrieval.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">HD Resolution Tiers:</strong>
                            <span className="block mt-1">Access HD and Maximum Resolution files—perfect for high-quality design and marketing assets.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <History className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Recent Search History:</strong>
                            <span className="block mt-1">Automatically tracks your recently fetched videos for convenient re-access during a session.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Copy className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">One-Click Sharing:</strong>
                            <span className="block mt-1">Directly copy the source thumbnail URL for immediate embedding or social sharing.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Secure & Anonymous:</strong>
                            <span className="block mt-1">No login, account, or tracking cookies required—perform your analysis with total privacy.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Mobile Optimized:</strong>
                            <span className="block mt-1">Fully responsive touch-friendly interface for extracting visual assets on the go.</span>
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
                            <Eye className="w-4 h-4 text-success-500" /> Niche Analysis
                        </h3>
                        <p className="text-sm">
                            Analyze thumbnails of high-performing videos in your niche to identify trends in color usage, typography, and composition.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <History className="w-4 h-4 text-secondary-500" /> Track Trends
                        </h3>
                        <p className="text-sm">
                            Use the history feature to track if a creator updates their thumbnail, which is a common strategy to boost click-through rates.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-warning-500" /> Quality First
                        </h3>
                        <p className="text-sm">
                            Always download the "Max Resolution" file when available to ensure your design work remains crisp on high-PPI displays.
                        </p>
                    </div>
                </div>

                {/* Legal & Ethical Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <ShieldCheck className="w-6 h-6 mr-2 text-primary-500" />
                    Legal & Ethical Considerations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg border-l-4 border-warning-500">
                        <h4 className="font-medium mb-1 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-warning-500" /> Copyright Ownership
                        </h4>
                        <p className="text-xs">
                            Downloaded thumbnails remain the intellectual property of the original content creator. Respect copyright laws and seek permission for commercial use.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg border-l-4 border-primary-500">
                        <h4 className="font-medium mb-1 flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-primary-500" /> Fair Use & Credit
                        </h4>
                        <p className="text-xs">
                            If using thumbnails for reference or analysis in your own content, always provide clear credit to the original video creator and YouTube platform.
                        </p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    Elevate your video marketing and content strategy today. With our YouTube Thumbnail Downloader, professional-grade visual analysis and asset management are just a click away. Start exploring the visual landscape of YouTube with absolute precision and ease!
                </p>
            </div>
        </Card>
    )
}