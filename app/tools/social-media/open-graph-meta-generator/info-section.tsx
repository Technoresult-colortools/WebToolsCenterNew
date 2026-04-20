"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Share2,
    Code,
    Image as ImageIcon,
    Smartphone,
    Wand2,
    CheckCircle2,
    Monitor,
    Layers,
    Eye,
    Link2,
    Facebook,
    Globe,
    Target
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionOpenGraphGenerator() {
    // Image path
    const imagePath = "/Images/InfosectionImages/OpengraphMetaPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the Open Graph Meta Generator?
                </h2>
                <p className="text-default-600 mb-4">
                    The <Link href="#how-to-use" className="text-primary-500 hover:underline">Open Graph Meta Generator</Link> is a powerful SEO utility designed to optimize how your website is perceived by social media algorithms. Open Graph (OG) tags are the hidden data layer that tells platforms like Facebook, LinkedIn, and Twitter exactly which title, description, and preview image to display when your link is shared.
                </p>
                <p className="text-default-600 mb-4">
                    Without proper OG tags, social platforms often "scrape" random images or text from your site, resulting in messy or unprofessional previews. This generator ensures you maintain <strong>absolute creative control</strong>, transforming your raw URLs into high-conversion social assets that drive engagement and increase click-through rates (CTR).
                </p>

                {/* Image Preview */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="Open Graph Meta Generator interface showing metadata input fields and social media preview"
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
                    How to Use the Open Graph Meta Generator?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Layers className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Define Content Type:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Select your content type (Website, Article, Book, Profile, Music, or Video) from the dropdown to ensure the meta tags match the specific requirements of the platform.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                            2
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <ImageIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <strong className="text-default-700">Input Core Properties:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Fill in the <strong>Title, URL, and Image URL</strong>. These are the "Big Three" fields that define the visual core of your social share preview.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                            3
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Eye className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Preview and Refine:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use the <strong>Real-time Preview</strong> to see exactly how your card will look. Toggle "Optional Fields" to add advanced data like Site Name and Locale for better representation.
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
                                <strong className="text-default-700">Generate and Deploy:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Click <strong>"Copy Meta Tags"</strong> to save the code to your clipboard. Paste the generated strings into the <code>&lt;head&gt;</code> section of your HTML document.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Key Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features for Social Optimization
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Share2 className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Multi-Platform Support:</strong>
                            <span className="block mt-1">Generates tags compatible with Facebook, LinkedIn, Pinterest, and WhatsApp in one unified code block.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Eye className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Interactive Preview:</strong>
                            <span className="block mt-1">See your changes instantly in a visual mockup that simulates a social media feed post.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Layers className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Dynamic Content Types:</strong>
                            <span className="block mt-1">Advanced support for specialized OG schemas including articles, profiles, music, and video content.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Wand2 className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Advanced Metadata:</strong>
                            <span className="block mt-1">Includes optional support for Site Name, Locales, and specific platform-level properties.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Code className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">One-Click Clipboard:</strong>
                            <span className="block mt-1">Copy production-ready HTML code instantly, ready to be pasted directly into your web project.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Mobile Optimized:</strong>
                            <span className="block mt-1">A fully responsive interface that allows SEO specialists to generate meta tags from any device.</span>
                        </div>
                    </div>
                </div>

                {/* Pro Tips Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Wand2 className="w-6 h-6 mr-2 text-primary-500" />
                    Pro Tips for Social Success
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Target className="w-4 h-4 text-success-500" /> Image Precision
                        </h3>
                        <p className="text-sm">
                            Use high-quality images (minimum 1200x630px). Keep the most important content centered so it isn&apos;t cropped by different platform ratios.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Link2 className="w-4 h-4 text-secondary-500" /> Concise Titles
                        </h3>
                        <p className="text-sm">
                            Keep titles under 60 characters and descriptions within 2-4 sentences to prevent text truncation on mobile devices.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-warning-500" /> Debug Tools
                        </h3>
                        <p className="text-sm">
                            After deploying, use the Facebook Sharing Debugger or LinkedIn Post Inspector to force the platforms to refresh their cache of your link.
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
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Globe className="w-4 h-4 text-success-500" /> Blog Optimization</h4>
                        <p className="text-xs">Ensuring every article shared from your CMS looks professional with dynamic titles and custom-featured imagery.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Facebook className="w-4 h-4 text-secondary-500" /> Marketing Ads</h4>
                        <p className="text-xs">Tailoring landing page previews to match social media ad campaigns, providing a seamless visual experience for the user.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Link2 className="w-4 h-4 text-warning-500" /> Brand Management</h4>
                        <p className="text-xs">Setting a default Site Name and Logo for the root domain so that every generic share still carries your brand identity.</p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    The Open Graph Meta Generator is an essential tool for anyone looking to professionalize their web presence. By creating accurate and comprehensive Open Graph tags, you bridge the gap between your content and your audience. Start optimizing your links today and see your social engagement soar!
                </p>
            </div>
        </Card>
    )
}