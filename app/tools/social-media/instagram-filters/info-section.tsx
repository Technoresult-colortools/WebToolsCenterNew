"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    ImagePlus,
    Maximize2,
    Download,
    CheckCircle2,
    Monitor,
    Brush,
    Layers,
    Camera,
    Eye,
    Sliders,
    Keyboard,
    Settings,
    FileImage,
    Star,
    SplitSquareHorizontal,
    Sparkles,
    Palette,
    Film,
    Sun,
    Moon,
    Zap,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionInstagramFilters() {
    const imagePath = "/Images/InfosectionImages/InstagramFiltersPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">

                {/* Intro */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    About Instagram Filters
                </h2>
                <p className="text-default-600 mb-4">
                    Ever taken a great photo and thought — it just needs <em>something</em>? That's exactly what this tool is for. The <Link href="#how-to-use" className="text-primary-500 hover:underline">Instagram Filters</Link> tool gives you <strong>45+ hand-picked filters</strong> organized by mood — Vintage, Black & White, Warm, Cool, and Moody — so finding the right look takes seconds, not minutes.
                </p>
                <p className="text-default-600 mb-4">
                    Beyond filters, you get a full set of manual adjustment tools — brightness, contrast, saturation, hue, grain, vignette, and more — so you're never stuck with a "close enough" result. Apply a preset with one click, tweak it to taste, compare before and after side by side, then download in PNG, JPEG, or WebP. No account needed, no watermark, no fuss.
                </p>

                {/* Image Preview */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <Image
                                src={imagePath || "/placeholder.svg?height=400&width=800"}
                                alt="Instagram Filters tool interface showing sidebar filter categories and adjustment panel"
                                width={800}
                                height={400}
                                className="w-full h-auto object-contain"
                                unoptimized={true}
                            />
                        </div>
                    </Link>
                </div>

                {/* How to Use */}
                <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
                    How to Use It
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">1</span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <ImagePlus className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Drop in your photo</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Drag and drop an image onto the canvas, click to browse your files, or paste a direct image URL into the URL field. It loads instantly.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-sm font-medium">2</span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Palette className="w-4 h-4 text-violet-500 flex-shrink-0" />
                                <strong className="text-default-700">Pick a filter category</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Open the sidebar and browse filters by mood — <strong>Vintage, Black & White, Warm, Cool & Cinematic,</strong> or <strong>Moody</strong>. Tap any category to expand it, then click a filter to apply it live. You can also use your <strong>keyboard arrow keys</strong> to cycle through filters quickly.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">3</span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Zap className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Try a preset for instant results</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Head to the <strong>Presets tab</strong> for curated one-click looks like Moody Portrait, Golden Hour, Faded Film, and Dark Drama — each one combines a filter with pre-dialed adjustment values so you can get a polished result immediately.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">4</span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Sliders className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <strong className="text-default-700">Fine-tune with the adjustment panel</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use the four adjustment tabs — <strong>Basic</strong> (brightness, contrast, saturation, hue), <strong>Tone</strong> (highlights, shadows, grain, blur), <strong>Detail</strong> (sharpness, grain), and <strong>Vignette</strong> — to dial in exactly the look you want. Every slider updates the preview in real time.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-sm font-medium">5</span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <SplitSquareHorizontal className="w-4 h-4 text-pink-500 flex-shrink-0" />
                                <strong className="text-default-700">Compare before & after</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Hit the <strong>Compare</strong> button in the top bar to see your original and edited photo side by side. It's a great way to sanity-check your edits before you export.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">6</span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Download className="w-4 h-4 text-purple-500 flex-shrink-0" />
                                <strong className="text-default-700">Download your edit</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Choose <strong>PNG, JPEG, or WebP</strong> from the format picker and hit Download. The exported file includes all your filter and adjustment settings baked in — ready to post or share.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Key Features */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Settings className="w-6 h-6 mr-2 text-primary-500" />
                    What's Inside
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Film className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">45+ Filters in 5 Mood Categories:</strong>
                            <span className="block mt-1">Vintage, B&W, Warm, Cool & Cinematic, and Moody — all organized so you're not hunting through a flat endless list.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">8 One-Click Presets:</strong>
                            <span className="block mt-1">Curated looks like Golden Hour, Faded Film, and Dark Drama that combine a filter + adjustments in one tap.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Star className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Save Your Favourites:</strong>
                            <span className="block mt-1">Star any filter to bookmark it. Your saved filters live in their own tab so you can get back to them instantly.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <SplitSquareHorizontal className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Before & After Compare Mode:</strong>
                            <span className="block mt-1">Split-screen view so you can see exactly how much the filter and adjustments changed your original photo.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Sliders className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Full Manual Controls:</strong>
                            <span className="block mt-1">Brightness, contrast, saturation, hue, grain, blur, vignette, highlights and shadows — all adjustable in real time.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <FileImage className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">PNG, JPEG & WebP Export:</strong>
                            <span className="block mt-1">Pick the right format for where the image is going — social media, web, or archival — and download at full quality.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Maximize2 className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Fullscreen Preview:</strong>
                            <span className="block mt-1">Zoom into a distraction-free full-screen view to inspect your edits up close before you commit to downloading.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Keyboard className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Keyboard Navigation:</strong>
                            <span className="block mt-1">Arrow keys cycle through filters so you can audition looks rapidly without reaching for the mouse.</span>
                        </div>
                    </div>
                </div>

                {/* Pro Tips */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Brush className="w-6 h-6 mr-2 text-primary-500" />
                    A Few Tips That Actually Help
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg border border-default-200">
                        <h3 className="font-semibold text-base mb-1 flex items-center gap-2">
                            <Eye className="w-4 h-4 text-success-500" /> Start with a preset
                        </h3>
                        <p className="text-sm">
                            Presets are a great starting point — pick the closest vibe, then nudge the sliders to make it yours. It's faster than building from scratch.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg border border-default-200">
                        <h3 className="font-semibold text-base mb-1 flex items-center gap-2">
                            <Sun className="w-4 h-4 text-warning-500" /> Heavy filter? Ease it back
                        </h3>
                        <p className="text-sm">
                            If a filter feels too strong, bump brightness up a little and pull contrast down slightly. It softens the effect without losing the mood.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg border border-default-200">
                        <h3 className="font-semibold text-base mb-1 flex items-center gap-2">
                            <Moon className="w-4 h-4 text-secondary-500" /> Grain adds character
                        </h3>
                        <p className="text-sm">
                            A small amount of grain (10–20) paired with a vintage filter can make a digital photo feel genuinely film-like. Don't overlook it.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg border border-default-200">
                        <h3 className="font-semibold text-base mb-1 flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500" /> Star your go-tos
                        </h3>
                        <p className="text-sm">
                            If you find yourself reaching for the same 3–4 filters, star them. Your Saved tab becomes your personal shortlist for future edits.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg border border-default-200">
                        <h3 className="font-semibold text-base mb-1 flex items-center gap-2">
                            <SplitSquareHorizontal className="w-4 h-4 text-primary-500" /> Always compare
                        </h3>
                        <p className="text-sm">
                            It's easy to over-edit when you're only looking at the filtered version. Use Compare mode to keep yourself honest about how much you've changed.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg border border-default-200">
                        <h3 className="font-semibold text-base mb-1 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-success-500" /> Choose the right format
                        </h3>
                        <p className="text-sm">
                            Use <strong>JPEG</strong> for Instagram or social posts, <strong>WebP</strong> for your website, and <strong>PNG</strong> if you need a transparent background or want maximum quality.
                        </p>
                    </div>
                </div>

                {/* Use Cases */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Monitor className="w-6 h-6 mr-2 text-primary-500" />
                    Who Uses This Tool
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Camera className="w-4 h-4 text-primary-500" /> Content Creators</h4>
                        <p className="text-xs">Quickly apply a consistent aesthetic to photos before posting — without needing Lightroom or a preset subscription.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Layers className="w-4 h-4 text-secondary-500" /> Small Businesses</h4>
                        <p className="text-xs">Keep product photos and marketing visuals looking cohesive across Instagram, websites, and email campaigns.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Brush className="w-4 h-4 text-success-500" /> Everyday Photographers</h4>
                        <p className="text-xs">Give travel shots, portraits, or event photos a polished look without learning complex editing software.</p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    Good editing shouldn't require a tutorial, a subscription, or a powerful laptop. This tool keeps it simple — upload, filter, adjust, download. Whether you're touching up a single photo or building a consistent visual style across your whole feed, it's all here and ready to use.
                </p>
            </div>
        </Card>
    )
}