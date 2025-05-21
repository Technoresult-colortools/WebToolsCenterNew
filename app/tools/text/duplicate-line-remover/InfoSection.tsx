"use client"

import { Card } from "@nextui-org/react"
// import Link from "next/link"; // Not strictly needed here
import {
  Info,
  BookOpen,
  Lightbulb,
  Code,         // Use Case: Code Maintenance
  Zap,          // Advanced Tips section icon
  FileText,     // Use Case: Data Cleaning
  Settings,     // Key Feature: Customizable Processing Options
  Filter,       // Key Feature: Multiple Processing Modes
  Repeat,       // Key Feature: Duplicate Pattern Analysis
  BarChart,     // Key Feature: Detailed Text Statistics, Use Case: Pattern Discovery
  FileSearch,   // Use Case: Log Analysis
  FileDiff,     // Key Feature: Visual Diff Comparison
  ArrowLeftRight, // Use Case: Data Transformation
  Layers,       // Key Feature: Preset Management, Advanced Tip
  FileJson,     // Key Feature: Comprehensive Export Options
  Cpu,          // Key Feature: Advanced Filtering, Advanced Tip
  Hash,         // Processing Mode: Count Duplicates
  SlidersHorizontal, // Processing Modes Explained section icon
  Sparkles,     // Processing Mode: Mark First Occurrences
  Share2,       // Use Case: Content Management
  Save,         // Advanced Tip
  RotateCcw,    // Key Feature: Full History Tracking
  Clock,        // Advanced Tip
  Eye,          // Advanced Tip
  Trash2,       // Processing Mode: Remove Duplicates
  CheckCircle2, // Processing Mode: Keep Only Duplicates
  AlertCircle,  // Processing Mode: Highlight Duplicates
  List,         // Key Feature: Comprehensive Sorting Options
  ArrowDown,    // Sorting Options Explained section icon, Sort A-Z, Sort by Length (Shortest)
  ArrowUp,      // Sort Z-A, Sort by Length (Longest)
  ListFilter,   // Sorting Option: Natural Sort
  UploadCloud,  // For "Input your text" - file upload

  Settings2,    // For "Basic Options" in How to Use
  Regex,        // For "Advanced Options" (regex filtering) in How to Use
  ListChecks,   // For "Presets" in How to Use
  Search,       // For "Explore the results" - Duplicate Analysis

} from "lucide-react"

export default function InfoSection() {
  // Image for the preview section - REPLACE WITH YOUR ACTUAL IMAGE PATH
  const previewImageSrc = "/Images/InfosectionImages/DuplicateLineRemoverPreview.png?height=400&width=800"; // Placeholder, update this

  return (
    <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
      <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2 text-primary-500" />
          What is the Duplicate Line Remover & Analyzer?
        </h2>
        <p className="text-default-600 mb-4">
          The Duplicate Line Remover & Analyzer is a comprehensive text processing tool for developers, data analysts,
          and content editors. It goes beyond simple duplicate removal to provide advanced filtering, analysis, and
          visualization of duplicate patterns. With customizable options, intelligent pattern detection, and detailed
          statistics, it helps you clean, organize, and understand text data with precision.
        </p>

        <div className="my-8">
          <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
            <div className="aspect-w-16 aspect-h-9 w-full">
              <img
                src={previewImageSrc}
                alt="Duplicate Line Remover & Analyzer interface preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
          How to Use the Duplicate Line Remover & Analyzer
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-default-600">
          <li>
            <strong className="flex items-center">
              <UploadCloud className="w-4 h-4 mr-1.5 text-blue-500" /> Input your text:
            </strong> Enter, paste, upload a file, or use sample generators.
          </li>
          <li>
            <strong className="flex items-center">
              <Settings className="w-4 h-4 mr-1.5 text-green-500" /> Configure processing options:
            </strong>
            <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
              <li><Settings2 className="inline w-3 h-3 mr-1 text-gray-500" /><strong>Basic Options:</strong> Filter mode, sort order, case sensitivity, whitespace.</li>
              <li><Regex className="inline w-3 h-3 mr-1 text-gray-500" /><strong>Advanced Options:</strong> Regex filtering, custom separators, line numbering.</li>
              <li><ListChecks className="inline w-3 h-3 mr-1 text-gray-500" /><strong>Presets:</strong> Apply pre-configured or custom settings.</li>
            </ul>
          </li>
          <li>
            <strong className="flex items-center">
              <Filter className="w-4 h-4 mr-1.5 text-orange-500" /> Select filter mode:
            </strong> (Remove duplicates, Keep only duplicates, Highlight, Count, Mark first).
          </li>
          <li>
            <strong className="flex items-center">
              <Zap className="w-4 h-4 mr-1.5 text-purple-500" /> Process your text:
            </strong> Click "Process" or enable "Auto Process".
          </li>
          <li>
            <strong className="flex items-center">
              <Eye className="w-4 h-4 mr-1.5 text-red-500" /> Explore results:
            </strong>
            <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
              <li><FileText className="inline w-3 h-3 mr-1 text-gray-500" /><strong>Processed Output:</strong> View filtered text.</li>
              <li><FileDiff className="inline w-3 h-3 mr-1 text-gray-500" /><strong>Diff View:</strong> Compare input and output.</li>
              <li><Search className="inline w-3 h-3 mr-1 text-gray-500" /><strong>Duplicate Analysis:</strong> Details on duplicate patterns.</li>
            </ul>
          </li>
          <li>
             <strong className="flex items-center">
              <ListFilter className="w-4 h-4 mr-1.5 text-yellow-500" /> Use additional tools:
            </strong> Sorting, grouping, view statistics.
          </li>
          <li>
            <strong className="flex items-center">
              <Share2 className="w-4 h-4 mr-1.5 text-indigo-500" /> Export or share:
            </strong> Copy, download (text/JSON).
          </li>
        </ol>

        <h2 id="processing-modes" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <SlidersHorizontal className="w-6 h-6 mr-2 text-primary-500" />
          Processing Modes Explained
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-default-600 mb-6">
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Trash2 className="w-4 h-4 mr-2 text-primary-500" /> Remove Duplicates
            </h3>
            <p className="text-sm">Keeps only the first occurrence of each line, removing subsequent duplicates.</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-2 text-secondary-500" /> Keep Only Duplicates
            </h3>
            <p className="text-sm">Removes unique lines, keeping only those that appear multiple times.</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 text-success-500" /> Highlight Duplicates
            </h3>
            <p className="text-sm">Keeps all lines but visually marks duplicate occurrences.</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Hash className="w-4 h-4 mr-2 text-warning-500" /> Count Duplicates
            </h3>
            <p className="text-sm">Displays each unique line with its occurrence count, sorted by frequency.</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md md:col-span-2"> {/* Spans two columns on md+ */}
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-danger-500" /> Mark First Occurrences
            </h3>
            <p className="text-sm">Distinguishes between first occurrences and duplicates with different markers.</p>
          </div>
        </div>

        <h2 id="sorting-options" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <List className="w-6 h-6 mr-2 text-primary-500" />
          Sorting Options Explained
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-default-600 mb-6">
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <ArrowDown className="w-4 h-4 mr-2 text-primary-500" /> Sort A-Z (Ascending)
            </h3>
            <p className="text-sm">Arranges lines alphabetically from A to Z.</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <ArrowUp className="w-4 h-4 mr-2 text-secondary-500" /> Sort Z-A (Descending)
            </h3>
            <p className="text-sm">Arranges lines in reverse alphabetical order (Z to A).</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <ArrowDown className="w-4 h-4 mr-2 text-success-500" /> Length (Shortest First)
            </h3>
            <p className="text-sm">Arranges lines by character count, shortest first.</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <ArrowUp className="w-4 h-4 mr-2 text-warning-500" /> Length (Longest First)
            </h3>
            <p className="text-sm">Arranges lines by character count, longest first.</p>
          </div>
           <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md md:col-span-2"> {/* Spans two columns on md+ */}
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <ListFilter className="w-4 h-4 mr-2 text-danger-500" /> Natural Sort
            </h3>
            <p className="text-sm">Sorts text recognizing numbers, ordering them numerically (e.g., "Item 2" before "Item 10").</p>
          </div>
        </div>


        <h2 id="key-features" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm text-default-600">
          <div className="flex items-start">
            <Filter className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div><strong>Multiple Processing Modes:</strong> 5 ways to handle duplicates.</div>
          </div>
          <div className="flex items-start">
            <Settings className="w-4 h-4 mr-2 mt-0.5 text-secondary-500" />
            <div><strong>Customizable Options:</strong> Case sensitivity, whitespace, empty lines.</div>
          </div>
          <div className="flex items-start">
            <Cpu className="w-4 h-4 mr-2 mt-0.5 text-success-500" />
            <div><strong>Advanced Filtering:</strong> Regex, custom separators, precise rules.</div>
          </div>
          <div className="flex items-start">
            <List className="w-4 h-4 mr-2 mt-0.5 text-warning-500" />
            <div><strong>Comprehensive Sorting:</strong> Alphabetical, length, natural sort.</div>
          </div>
          <div className="flex items-start">
            <Repeat className="w-4 h-4 mr-2 mt-0.5 text-danger-500" />
            <div><strong>Duplicate Pattern Analysis:</strong> Visualize distribution, groups, locations.</div>
          </div>
          <div className="flex items-start">
            <BarChart className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div><strong>Detailed Text Statistics:</strong> Line counts, duplicate percentages.</div>
          </div>
          <div className="flex items-start">
            <FileDiff className="w-4 h-4 mr-2 mt-0.5 text-secondary-500" />
            <div><strong>Visual Diff Comparison:</strong> Line-by-line change view.</div>
          </div>
          <div className="flex items-start">
            <Layers className="w-4 h-4 mr-2 mt-0.5 text-success-500" />
            <div><strong>Preset Management:</strong> Save, apply, manage custom configurations.</div>
          </div>
          <div className="flex items-start">
            <FileJson className="w-4 h-4 mr-2 mt-0.5 text-warning-500" />
            <div><strong>Comprehensive Export:</strong> Plain text or structured JSON.</div>
          </div>
          <div className="flex items-start">
            <RotateCcw className="w-4 h-4 mr-2 mt-0.5 text-danger-500" />
            <div><strong>Full History Tracking:</strong> Undo/redo functionality.</div>
          </div>
        </div>

        <h2 id="use-cases" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-primary-500" />
          Use Cases
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-default-600">
          <div className="bg-default-100/50 dark:bg-default-200/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-primary-500" /> Data Cleaning
            </h3>
            <p className="text-sm">Remove duplicates from datasets, CSVs, or database exports.</p>
          </div>
          <div className="bg-default-100/50 dark:bg-default-200/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Code className="w-4 h-4 mr-2 text-secondary-500" /> Code Maintenance
            </h3>
            <p className="text-sm">Clean duplicate imports, find redundant code blocks.</p>
          </div>
          <div className="bg-default-100/50 dark:bg-default-200/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <FileSearch className="w-4 h-4 mr-2 text-success-500" /> Log File Analysis
            </h3>
            <p className="text-sm">Extract unique errors, identify recurring patterns.</p>
          </div>
          <div className="bg-default-100/50 dark:bg-default-200/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Share2 className="w-4 h-4 mr-2 text-warning-500" /> Content Management
            </h3>
            <p className="text-sm">Deduplicate email lists, remove redundant content.</p>
          </div>
          <div className="bg-default-100/50 dark:bg-default-200/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <BarChart className="w-4 h-4 mr-2 text-danger-500" /> Pattern Discovery
            </h3>
            <p className="text-sm">Analyze frequency patterns, discover common phrases.</p>
          </div>
          <div className="bg-default-100/50 dark:bg-default-200/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <ArrowLeftRight className="w-4 h-4 mr-2 text-primary-500" /> Data Transformation
            </h3>
            <p className="text-sm">Process text in ETL workflows or transformation pipelines.</p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Zap className="w-6 h-6 mr-2 text-primary-500" />
          Advanced Tips
        </h2>
        <div className="bg-default-100/50 dark:bg-default-200/20 p-5 rounded-lg">
          <ul className="space-y-3 text-default-600">
            <li className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Layers className="w-4 h-4 text-primary-500" />
              </div>
              <div><strong>Multi-Stage Processing:</strong> Chain operations (e.g., remove duplicates, then regex filter, then sort).</div>
            </li>
            <li className="flex items-start">
              <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Cpu className="w-4 h-4 text-secondary-500" />
              </div>
              <div><strong>Powerful Regex Filtering:</strong> Use regex like <code>^[A-Z].*\d+$</code> for lines starting uppercase & ending with a number.</div>
            </li>
            <li className="flex items-start">
              <div className="bg-success-100 dark:bg-success-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Save className="w-4 h-4 text-success-500" />
              </div>
              <div><strong>Specialized Presets:</strong> Create presets for specific data types (e.g., "CSV Header Check," "Code Cleanup").</div>
            </li>
            <li className="flex items-start">
              <div className="bg-warning-100 dark:bg-warning-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Eye className="w-4 h-4 text-warning-500" />
              </div>
              <div><strong>Insightful Duplicate Analysis:</strong> Use the analysis tab to find systemic issues in data collection or content creation.</div>
            </li>
            <li className="flex items-start">
              <div className="bg-danger-100 dark:bg-danger-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Clock className="w-4 h-4 text-danger-500" />
              </div>
              <div><strong>Large File Handling:</strong> For very large files, disable "Auto Process" and consider breaking them into smaller chunks.</div>
            </li>
          </ul>
        </div>

        <p className="text-default-600 mt-8">
          Whether you're cleaning code, preparing datasets, or organizing content, our Duplicate Line Remover & Analyzer
          provides comprehensive tools for effective text duplication management. Start using it today to clean,
          organize, and gain insights from your text data with precision and efficiency.
        </p>
      </div>
    </Card>
  );
}