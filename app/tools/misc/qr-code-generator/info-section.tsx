"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    QrCode,
    Palette,
    Download,
    ExternalLink,
    Smartphone,
    Mail,
    Wifi,
    MapPin,
    Calendar,
    FileText,
    Zap,
    Image as ImageIcon,
    ShieldCheck,
    Eye,
    Wand2,
    CheckCircle2,
    Link2,
    Maximize2
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionQrCodeGenerator() {
    // Image path
    const imagePath = "/Images/InfosectionImages/QRCodeGeneratorPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the QR Code Generator?
                </h2>
                <p className="text-default-600 mb-4">
                    Think of the <Link href="#how-to-use" className="text-primary-500 hover:underline">QR Code Generator</Link> as a digital bridge between the physical and virtual worlds. It is a comprehensive design utility engineered to transform URLs, contact information, and complex data into high-fidelity scannable matrices, allowing users to access your content instantly with a single smartphone scan.
                </p>
                <p className="text-default-600 mb-4">
                    Moving beyond generic black-and-white squares, this advanced generator offers extensive customization for branding and aesthetics. Whether you are a marketer building a campaign, a business owner sharing WiFi access, or an event organizer distributing digital vCards, this tool provides the technical flexibility and artistic control needed to create codes that are both functional and visually striking.
                </p>

                {/* Image Preview */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="QR Code Generator interface showing design controls and live code preview"
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
                    How to Use the QR Code Generator?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <QrCode className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Select Content Type:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Choose the type of data you wish to encode, such as a <strong>URL, Text, WiFi credentials, vCard, or Calendar Event</strong>.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                            2
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <FileText className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <strong className="text-default-700">Input Your Information:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Enter the required details into the fields provided. The QR code generator will begin forming the matrix in <strong>real-time</strong> as you type.
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
                                <strong className="text-default-700">Customize Design:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Navigate through the tabs to adjust <strong>Colors, Shapes, and Patterns</strong>. You can even upload a <strong>Logo</strong> to place in the center of the code for brand recognition.
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
                                <strong className="text-default-700">Export and Deploy:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Select your desired format (<strong>PNG, JPEG, or SVG</strong>) and size. Download the file and test it with your camera before including it in your print or digital assets.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* QR Code Types Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Smartphone className="w-6 h-6 mr-2 text-primary-500" />
                    Supported QR Code Types
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-default-600">
                    <div className="border border-default-200 p-3 rounded-lg flex gap-3">
                        <Link2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-1" />
                        <div><strong className="text-default-700 block">URL / Website</strong>Direct users to any landing page, portfolio, or social media profile.</div>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg flex gap-3">
                        <Wifi className="w-5 h-5 text-success-500 flex-shrink-0 mt-1" />
                        <div><strong className="text-default-700 block">WiFi Access</strong>Allow guests to join your network without manually typing long passwords.</div>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg flex gap-3">
                        <FileText className="w-5 h-5 text-secondary-500 flex-shrink-0 mt-1" />
                        <div><strong className="text-default-700 block">vCard / Contact</strong>Share your phone, email, and website directly into a user&apos;s address book.</div>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg flex gap-3">
                        <Mail className="w-5 h-5 text-danger-500 flex-shrink-0 mt-1" />
                        <div><strong className="text-default-700 block">Email & SMS</strong>Pre-fill messages and recipients to streamline customer communication.</div>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg flex gap-3">
                        <MapPin className="w-5 h-5 text-warning-500 flex-shrink-0 mt-1" />
                        <div><strong className="text-default-700 block">Location</strong>Open map applications directly to specific coordinates or store addresses.</div>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg flex gap-3">
                        <Calendar className="w-5 h-5 text-purple-500 flex-shrink-0 mt-1" />
                        <div><strong className="text-default-700 block">Event</strong>Add dates, times, and locations directly into a user&apos;s digital calendar.</div>
                    </div>
                </div>

                {/* Key Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Features That Make Us Stand Out
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Wand2 className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Advanced Customization:</strong>
                            <span className="block mt-1">Personalize colors, gradients, eye styles, and body patterns to match your brand identity.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <ImageIcon className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Logo Integration:</strong>
                            <span className="block mt-1">Embed your brand logo into the center of the QR code without sacrificing data integrity.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Error Correction Control:</strong>
                            <span className="block mt-1">Adjust L, M, Q, or H levels to ensure scannability even if the code is partially obscured or damaged.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">SVG Vector Support:</strong>
                            <span className="block mt-1">Export in SVG format to ensure your codes remain razor-sharp on everything from business cards to billboards.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Eye className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Real-time Visual Feedback:</strong>
                            <span className="block mt-1">Watch your QR code update dynamically as you change data or design parameters.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Responsive Engine:</strong>
                            <span className="block mt-1">Create, design, and download professional QR codes from any mobile device, tablet, or desktop.</span>
                        </div>
                    </div>
                </div>

                {/* Pro Tips Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <CheckCircle2 className="w-6 h-6 mr-2 text-primary-500" />
                    Pro Tips for QR Code Success
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-success-500" /> High Correction
                        </h3>
                        <p className="text-sm">
                            Always set error correction to <strong>Q or H</strong> if you are adding a logo or using complex gradients to ensure maximum scannability.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Palette className="w-4 h-4 text-secondary-500" /> Contrast Check
                        </h3>
                        <p className="text-sm">
                            Maintain a high contrast between the code and the background. Light codes on dark backgrounds can sometimes fail on older scanners.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Maximize2 className="w-4 h-4 text-warning-500" /> Print Ready
                        </h3>
                        <p className="text-sm">
                            For print materials, use <strong>SVG</strong> format and include "quiet zone" white space around the code to help cameras focus quickly.
                        </p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    Ready to elevate your marketing and simplify information sharing? Our advanced QR Code Generator gives you complete control over both content and design. Whether you&apos;re building a professional business presence or just helping guests connect to your home network, we provide the tools to make your codes functional and beautiful. Start generating your custom QR codes now!
                </p>

                <div className="mt-6 flex flex-wrap gap-4">
                    <Link
                        href="https://en.wikipedia.org/wiki/QR_code"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-500 hover:underline flex items-center gap-1 text-sm font-medium"
                    >
                        Learn more about QR technology <ExternalLink size={14} />
                    </Link>
                </div>
            </div>
        </Card>
    )
}