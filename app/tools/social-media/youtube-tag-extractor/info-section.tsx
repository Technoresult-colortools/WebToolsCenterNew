"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Search,
    Zap,
    BarChart3,
    Cloud,
    FileText,
    Download,
    History,
    Smartphone,
    Monitor,
    Wand2,
    CheckCircle2,
    Target,
    Copy,
    TrendingUp,
    ShieldCheck,
    Globe
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionYoutubeTagExtractor() {
    // Image path
    const imagePath = "/Images/InfosectionImages/YoutubeKewordTagPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the YouTube Keyword Tag Extractor?
                </h2>
                <p className="text-default-600 mb-4">
                    The <Link href="#how-to-use" className="text-primary-500 hover:underline">YouTube Keyword Tag Extractor</Link> is a powerful digital forensics tool designed for creators, SEO specialists, and market researchers. It goes beyond simple data retrieval, uncovering the hidden metadata and keyword strategies that power the most successful videos on the platform.
                </p>
                <p className="text-default-600 mb-4">
                    Think of this tool as your backstage pass to competitor analysis. By entering a single URL, you gain access to a comprehensive suite of insights—from raw keyword tags and interactive tag clouds to deep-dive performance metrics like engagement ratios and publishing timelines. It transforms abstract video data into actionable growth strategies.
                </p>

                {/* Image Preview */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="YouTube Keyword Tag Extractor interface showing metadata and tag analysis"
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
                    How to Use the YouTube Keyword Tag Extractor?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Search className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Paste and Extract:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Copy the URL of the YouTube video you want to analyze and paste it into the search field. Click <strong>"Extract Tags"</strong> to trigger the metadata analysis.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                            2
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <BarChart3 className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <strong className="text-default-700">Analyze Performance:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Review the <strong>Video Metadata Analysis</strong> section to gauge the video's success through metrics like view count, engagement (likes/comments), and age.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                            3
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Cloud className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Explore Tag Intelligence:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use the tabbed interface to view the raw tags or visualize them in the <strong>Interactive Tag Cloud</strong> to identify the most prominent keywords at a glance.
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
                                <strong className="text-default-700">Export and Revisit:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Copy the tags to your clipboard or download them as a text file. Access your <strong>Search History</strong> (<History className="w-3 h-3 inline" />) to re-analyze previous videos instantly.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Key Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features for Digital Marketers
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Instant Tag Extraction:</strong>
                            <span className="block mt-1">Fetch all hidden keyword tags associated with any video in milliseconds via our high-speed API.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Cloud className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Visual Tag Clouds:</strong>
                            <span className="block mt-1">Transform lists of keywords into interactive visual clusters to better understand content weight and hierarchy.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <History className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Session Search History:</strong>
                            <span className="block mt-1">Keep track of your research path with a built-in history of analyzed videos for easy benchmarking.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Metadata Deep-Dive:</strong>
                            <span className="block mt-1">Analyze full video descriptions and engagement data to understand the context behind the keywords.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Download className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">One-Click Export:</strong>
                            <span className="block mt-1">Download entire keyword sets as optimized text files to import directly into your own video settings.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Mobile Responsive:</strong>
                            <span className="block mt-1">Perform SEO audits and competitor research effortlessly on desktop, tablet, or mobile devices.</span>
                        </div>
                    </div>
                </div>

                {/* Pro Tips Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Wand2 className="w-6 h-6 mr-2 text-primary-500" />
                    SEO Insights & Pro Tips
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-success-500" /> Trend Analysis
                        </h3>
                        <p className="text-sm">
                            Compare tags from "Trending" videos in your niche to see if there are specific long-tail keywords that high-traffic videos share.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Target className="w-4 h-4 text-secondary-500" /> Tag Selection
                        </h3>
                        <p className="text-sm">
                            Don't just copy tags; look at the <strong>Tag Cloud</strong> to identify the primary focus and adapt the top 5-10 keywords for your content.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-warning-500" /> Description SEO
                        </h3>
                        <p className="text-sm">
                            Analyze how competitors place keywords in the first 200 characters of the description for maximum search engine impact.
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
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Globe className="w-4 h-4 text-success-500" /> Competitor Audits</h4>
                        <p className="text-xs">Systematically extracting tags from top-ranking videos to build a master list of high-value keywords for your channel.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-secondary-500" /> Market Research</h4>
                        <p className="text-xs">Analyzing metadata to understand the correlation between specific keyword themes and engagement rates.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-warning-500" /> Content Strategy</h4>
                        <p className="text-xs">Using search history to track how tag strategies evolve across a series of viral videos over time.</p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    Elevate your YouTube growth and SEO strategy today. With the YouTube Keyword Tag Extractor, you have the data-driven insights needed to optimize your content for maximum reach. Unlock the potential of your video metadata and start outranking the competition!
                </p>
            </div>
        </Card>
    )
}