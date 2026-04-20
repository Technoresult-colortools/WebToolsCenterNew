"use client"

import { Card, Chip } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Clock,
    Zap,
    Copy,
    Share2,
    Save,
    Smartphone,
    CheckCircle2,
    Monitor,
    AlertTriangle,
    ShieldCheck,
    MousePointerClick,
    Link2,
    ListTree,
    GraduationCap,
    Gamepad2,
    Mic2,
    Wand2
} from "lucide-react"
import Link from "next/link"

export default function InfoSectionYoutubeTimestampGenerator() {
    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the YouTube Timestamp Link Generator?
                </h2>
                <p className="text-default-600 mb-4">
                    The <Link href="#how-to-use" className="text-primary-500 hover:underline">YouTube Timestamp Link Generator</Link> is a high-performance productivity tool engineered for content creators, educators, and researchers. It simplifies the process of referencing specific moments within long-form video content, allowing you to create precise, labeled anchors that jump directly to any second of a video.
                </p>
                <p className="text-default-600 mb-4">
                    Equipped with an <strong>Interactive Time Picker</strong>, this tool synchronizes with the video player in real-time. Whether you are creating a table of contents for a three-hour podcast or marking key steps in a technical tutorial, it transforms a standard YouTube URL into a structured, shareable navigation menu instantly.
                </p>

                {/* How to Use Section */}
                <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
                    How to Use the YouTube Timestamp Link Generator?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Link2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Load Your Video:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Paste your YouTube URL into the input field and click <strong>"Load Video"</strong> to initialize the interactive player.
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
                                <strong className="text-default-700">Capture Key Moments:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Play the video and click <Chip color="warning" size="sm" className="h-5">Pick Current Time</Chip> to instantly grab the exact second, or enter time manually (HH:MM:SS) using the <Chip color="primary" size="sm" className="h-5">Add Manual Timestamp</Chip> option.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                            3
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <ListTree className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Label and Organize:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Add descriptive titles to each captured moment. You can use the <strong>Play</strong> button next to any entry to verify the timing within the tool.
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
                                <strong className="text-default-700">Generate & Share:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Click <strong>"Generate Link & Description"</strong>. Copy the formatted list to use in video comments, social media, or project documentation.
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
                        <MousePointerClick className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Interactive Time Picking:</strong>
                            <span className="block mt-1">Add timestamps perfectly synced to the video playback with zero manual typing required.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Save className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Auto-Save Functionality:</strong>
                            <span className="block mt-1">Leverages browser local storage to save your timestamps per video, preventing data loss.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <ListTree className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Formatted Export:</strong>
                            <span className="block mt-1">Generates clean, clickable lists perfect for YouTube descriptions, comments, or blogs.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Monitor className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Integrated Player:</strong>
                            <span className="block mt-1">Test your links instantly within the tool to ensure every timestamp jumps to the correct frame.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Copy className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">One-Click Clipboard:</strong>
                            <span className="block mt-1">Copy individual links or the entire timestamped description with optimized copy controls.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Mobile Responsive:</strong>
                            <span className="block mt-1">Fully optimized for managing video chapters and references on any device or screen size.</span>
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
                            <Clock className="w-4 h-4 text-success-500" /> Precision Tuning
                        </h3>
                        <p className="text-sm">
                            Use "Pick Current Time" for the general moment, then manually edit the seconds to fine-tune the exact starting frame.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <ListTree className="w-4 h-4 text-secondary-500" /> Topic Labeling
                        </h3>
                        <p className="text-sm">
                            Keep labels concise but descriptive. For interviews, use the specific question asked as the timestamp label.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-warning-500" /> Verification
                        </h3>
                        <p className="text-sm">
                            Always click the <strong>Play</strong> button in the timestamp list before exporting to verify that the context is captured correctly.
                        </p>
                    </div>
                </div>

                {/* Popular Use Cases Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Monitor className="w-6 h-6 mr-2 text-primary-500" />
                    Real-World Applications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><GraduationCap className="w-4 h-4 text-success-500" /> Education</h4>
                        <p className="text-xs">Creating clickable chapters for lectures and tutorials to help students find specific topics instantly.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Gamepad2 className="w-4 h-4 text-secondary-500" /> Gaming</h4>
                        <p className="text-xs">Marking boss fights, collectible locations, or specific strategy segments in long walkthrough videos.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Mic2 className="w-4 h-4 text-warning-500" /> Podcasts</h4>
                        <p className="text-xs">Providing a table of contents for long-form interviews and sponsor sections for better audience retention.</p>
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
                            <AlertTriangle className="w-4 h-4 text-warning-500" /> Fair Sharing
                        </h4>
                        <p className="text-xs">
                            Timestamps should enhance user experience. Avoid using them to circumvent the creator's intentions or misrepresent the video context.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg border-l-4 border-primary-500">
                        <h4 className="font-medium mb-1 flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-primary-500" /> Proper Attribution
                        </h4>
                        <p className="text-xs">
                            Always respect copyright laws and provide proper attribution to the original content creator when sharing generated timestamp lists publicly.
                        </p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    Make your long-form content more accessible and user-friendly today. With our YouTube Timestamp Link Generator, professional-grade navigation and video organization are just a click away. Experience the most efficient way to reference digital video content!
                </p>
            </div>
        </Card>
    )
}