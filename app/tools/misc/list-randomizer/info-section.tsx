"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Shuffle,
    ListChecks,
    Zap,
    FileText,
    LayoutGrid,
    Target,
    Smartphone,
    Monitor,
    Wand2,
    CheckCircle2,
    Settings,
    Download,
    Users,
    Dice5
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionListRandomizer() {
    // Image path
    const imagePath = "/Images/InfosectionImages/ListRandomizerPreview.webp"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the List Randomizer?
                </h2>
                <p className="text-default-600 mb-4">
                    The <Link href="#how-to-use" className="text-primary-500 hover:underline">List Randomizer</Link> is a precision utility designed to eliminate bias and introduce true chance into your data management. It serves as a sophisticated engine for researchers, educators, and project managers who need to shuffle items, assign groups, or perform random sampling with mathematical accuracy.
                </p>
                <p className="text-default-600 mb-4">
                    Whether you are a teacher assigning student groups, a researcher selecting a random sample, or a developer testing edge cases, this tool offers a robust suite of features. From the high-performance **Fisher-Yates shuffle algorithm** to advanced pre-processing like duplicate removal and weighted randomization, it transforms static lists into randomized assets instantly.
                </p>

                {/* Image Preview */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="List Randomizer interface showing input area, randomization options, and output"
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
                    How to Use the List Randomizer?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <FileText className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Import Your Data:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Enter your items directly into the text area or use the <strong>Upload</strong> function to import a text file. Each item should be separated by a specific character or a new line.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                            2
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Settings className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <strong className="text-default-700">Configure Logic:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Choose your <strong>Item Divider</strong> (comma, tab, newline, etc.). You can also enable pre-processing filters to trim whitespace, remove duplicates, or sort items before the shuffle begins.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                            3
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Shuffle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Randomize & Group:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Click <strong>"Randomize List"</strong> to apply the shuffle. Use the advanced settings to extract a smaller subset or organize the results into groups of a specific size.
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
                                <strong className="text-default-700">Export Results:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                View the randomized output instantly. Click <strong>Copy</strong> to save it to your clipboard or <strong>Download</strong> to export the new list as a structured text file.
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
                        <Zap className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Advanced Algorithms:</strong>
                            <span className="block mt-1">Utilizes the Fisher-Yates shuffle for true, unbiased randomization across any list size.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <ListChecks className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Data Pre-processing:</strong>
                            <span className="block mt-1">Automatically clean your data by trimming whitespace and removing identical entries before shuffling.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <LayoutGrid className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Smart Grouping:</strong>
                            <span className="block mt-1">Effortlessly split your randomized items into equal-sized teams or categories for project allocation.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Target className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Subset Selection:</strong>
                            <span className="block mt-1">Need to pick 5 winners from 100 entries? Use the subset tool to extract a specific count from your list.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Dice5 className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Seed-Based Reproducibility:</strong>
                            <span className="block mt-1">Use a specific "seed" to generate the same random sequence across different sessions—perfect for scientific consistency.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Fully Responsive:</strong>
                            <span className="block mt-1">Manage, shuffle, and export lists seamlessly on any device, from high-end monitors to mobile phones.</span>
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
                            <Dice5 className="w-4 h-4 text-success-500" /> Use Seeds
                        </h3>
                        <p className="text-sm">
                            If you need to verify a random selection later, record the <strong>Seed</strong> value. Entering the same seed with the same list will always yield the same "random" order.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <ListChecks className="w-4 h-4 text-secondary-500" /> Clean First
                        </h3>
                        <p className="text-sm">
                            Enable the "Remove Duplicates" filter if you are running a giveaway to ensure that every participant has an equal, single chance of winning.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-warning-500" /> Custom Dividers
                        </h3>
                        <p className="text-sm">
                            Use the "Custom" divider option if your data is structured with unique symbols (like | or /) to ensure the randomizer identifies items correctly.
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
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Users className="w-4 h-4 text-success-500" /> Education</h4>
                        <p className="text-xs">Randomly assigning students into breakout rooms or creating fair speaking orders for classroom presentations.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Target className="w-4 h-4 text-secondary-500" /> Market Research</h4>
                        <p className="text-xs">Selecting a random subset of survey participants from a large database to ensure unbiased statistical sampling.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><LayoutGrid className="w-4 h-4 text-warning-500" /> Project Mgmt</h4>
                        <p className="text-xs">Randomly distributing a backlog of tasks among team members or deciding the order of items in a design review.</p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    The List Randomizer is more than just a tool—it is a gateway to fair and efficient data manipulation. Whether you are conducting scientific research or making a daily decision, our platform provides the precision and flexibility you need. Start introducing true chance into your workflow today!
                </p>
            </div>
        </Card>
    )
}