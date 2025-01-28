"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Card, CardBody, Button, Textarea, Select, SelectItem, Switch, Tabs, Tab, Input } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"
import {
  Copy,
  RefreshCw,
  Info,
  Lightbulb,
  BookOpen,
  Settings,
  FileDown,
  FileUp,
  Filter,
  Zap,
  ArrowDown,
  ArrowUp,
} from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"

const filterModeOptions = [
  { value: "remove", label: "Remove duplicates" },
  { value: "keep", label: "Keep only duplicates" },
]

export default function DuplicateLineRemover() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [trimWhitespace, setTrimWhitespace] = useState(true)
  const [keepFirstOccurrence, setKeepFirstOccurrence] = useState(true)
  const [addLineNumbers, setAddLineNumbers] = useState(false)
  const [startingLineNumber, setStartingLineNumber] = useState(1)
  const [ignoreEmptyLines, setIgnoreEmptyLines] = useState(false)
  const [customSeparator, setCustomSeparator] = useState("")
  const [filterMode, setFilterMode] = useState("remove")

  const processText = useCallback(() => {
    const lines = inputText.split(customSeparator || "\n")
    const seen = new Set()
    const result = []

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i]
      if (trimWhitespace) {
        line = line.trim()
      }
      if (ignoreEmptyLines && line === "") {
        continue
      }
      const key = caseSensitive ? line : line.toLowerCase()

      const isDuplicate = seen.has(key)
      if (filterMode === "remove" && (!isDuplicate || (keepFirstOccurrence && i === lines.indexOf(line)))) {
        seen.add(key)
        result.push(line)
      } else if (filterMode === "keep" && isDuplicate) {
        result.push(line)
      }
    }

    if (addLineNumbers) {
      const numberedLines = result.map(
        (line, index) => `${(index + startingLineNumber).toString().padStart(4, " ")}  ${line}`,
      )
      setOutputText(numberedLines.join("\n"))
    } else {
      setOutputText(result.join("\n"))
    }
  }, [
    inputText,
    caseSensitive,
    trimWhitespace,
    keepFirstOccurrence,
    addLineNumbers,
    startingLineNumber,
    ignoreEmptyLines,
    customSeparator,
    filterMode,
  ])

  useEffect(() => {
    processText()
  }, [processText])

  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!")
  }, [])

  const handleClear = useCallback(() => {
    setInputText("")
    setOutputText("")
    toast.success("Text Cleared!")
  }, [])

  const handleSort = useCallback(
    (ascending: boolean) => {
      const sortedLines = outputText.split("\n").sort((a, b) => {
        if (ascending) {
          return a.localeCompare(b)
        } else {
          return b.localeCompare(a)
        }
      })
      setOutputText(sortedLines.join("\n"))
      toast.success(`Lines sorted ${ascending ? "ascending" : "descending"}`)
    },
    [outputText],
  )

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setInputText(content)
        toast.success("File uploaded successfully")
      }
      reader.readAsText(file)
    }
  }, [])

  const handleDownload = useCallback((content: string, fileType: string) => {
    const element = document.createElement("a")
    const file = new Blob([content], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `processed_${fileType}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }, [])

  return (
    <ToolLayout
      title="Duplicate Line Remover"
      description="Clean up your text by removing or keeping duplicate lines with advanced options"
      toolId="678f382926f06f912191bc86"
    >
      <div className="flex flex-col gap-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <Textarea
              label="Enter your text:"
              value={inputText}
              onValueChange={setInputText}
              placeholder="Type or paste your text here"
              minRows={4}
              className="w-full mb-4"
              variant="bordered"
            />
            <div className="flex flex-wrap gap-4 mb-4">
              <Switch isSelected={caseSensitive} onValueChange={setCaseSensitive}>
                Case Sensitive
              </Switch>
              <Switch isSelected={trimWhitespace} onValueChange={setTrimWhitespace}>
                Trim Whitespace
              </Switch>
              <Switch isSelected={keepFirstOccurrence} onValueChange={setKeepFirstOccurrence}>
                Keep First Occurrence
              </Switch>
              <Switch isSelected={addLineNumbers} onValueChange={setAddLineNumbers}>
                Add Line Numbers
              </Switch>
              <Switch isSelected={ignoreEmptyLines} onValueChange={setIgnoreEmptyLines}>
                Ignore Empty Lines
              </Switch>
            </div>
            <div className="flex flex-wrap gap-4 mb-4">
              <Select
                label="Filter Mode"
                selectedKeys={[filterMode]}
                onChange={(e) => setFilterMode(e.target.value)}
                className="max-w-xs"
                variant="bordered"
              >
                {filterModeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-default-700">
                    {option.label}
                  </SelectItem>
                ))}
              </Select>
              <Input
                type="text"
                placeholder="Custom separator (optional)"
                value={customSeparator}
                onChange={(e) => setCustomSeparator(e.target.value)}
                variant="bordered"
                className="w-full sm:w-auto bg-default-100 text-default-700 border-default-200 rounded-md p-2"
              />
              {addLineNumbers && (
                <Input
                  type="number"
                  placeholder="Starting line number"
                  value={startingLineNumber.toString()}
                  variant="bordered"
                  onChange={(e) => setStartingLineNumber(Number(e.target.value))}
                  className="w-full sm:w-auto bg-default-100 text-default-700 border-default-200 rounded-md p-2"
                />
              )}
            </div>
            <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
              <Button color="danger" onPress={handleClear} startContent={<RefreshCw size={18} />}>
                Clear
              </Button>
              <Button color="primary" onPress={() => handleSort(true)} startContent={<ArrowDown size={18} />}>
                Sort A-Z
              </Button>
              <Button color="primary" onPress={() => handleSort(false)} startContent={<ArrowUp size={18} />}>
                Sort Z-A
              </Button>
              <label htmlFor="file-upload" className="cursor-pointer" >
                <Button as="span" color="primary" startContent={<FileUp size={18} />}>
                  Upload File
                </Button>
                <input id="file-upload" type="file" accept=".txt" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            <Tabs aria-label="Output Options">
              <Tab
                key="output"
                title={
                  <div className="flex items-center gap-2">
                    <Filter size={18} />
                    Processed Output
                  </div>
                }
              >
                <Card>
                  <CardBody>
                    <Textarea value={outputText} label="Result" isReadOnly minRows={4} variant="bordered" />
                    <div className="flex flex-wrap gap-2 mt-2 sm:flex-row sm:justify-start flex-col">
                      <Button color="primary" onPress={() => handleCopy(outputText)} startContent={<Copy size={18} />}>
                        Copy Result
                      </Button>
                      <Button
                        color="primary"
                        onPress={() => handleDownload(outputText, "result")}
                        startContent={<FileDown size={18} />}
                      >
                        Download Result
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>

        {/* Info Section */}
        <Card className="mt-8 bg-default-50 dark:bg-default-100 p-4 md:p-8">
          <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
              <Info className="w-6 h-6 mr-2" />
              What is the Duplicate Line Remover?
            </h2>
            <p className="text-sm md:text-base text-default-600 mb-4">
              The Duplicate Line Remover is an advanced text processing tool designed for writers, data analysts, and
              anyone working with large text datasets. It goes beyond simple duplicate removal, offering customizable
              options to clean, filter, and organize your text data. With its{" "}
              <Link href="#how-to-use" className="text-primary hover:underline">
                user-friendly interface
              </Link>{" "}
              and powerful features, it's the perfect companion for text cleaning, data preprocessing, and content
              organization tasks.
            </p>
            <p className="text-sm md:text-base text-default-600 mb-4">
              Whether you're cleaning up log files, organizing lists, or preparing data for analysis, our tool provides
              you with the flexibility and precision you need. It's like having a Swiss Army knife for text processing
              right in your browser!
            </p>

            <div className="my-8">
              <Image
                src="/Images/DuplicateLinePreview.png"
                alt="Screenshot of the Duplicate Line Remover interface showing text input area, processing options, and result output"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>

            <h2
              id="how-to-use"
              className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center"
            >
              <BookOpen className="w-6 h-6 mr-2" />
              How to Use the Duplicate Line Remover?
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
              <li>
                Enter or paste your text into the input area, or use the "Upload File" button for larger datasets.
              </li>
              <li>Adjust the processing options to suit your needs.</li>
              <li>Select the filter mode: remove duplicates or keep only duplicates.</li>
              <li>View the processed result in the output area.</li>
              <li>Use the "Sort A-Z" or "Sort Z-A" buttons to organize the output if needed.</li>
              <li>Copy the result to your clipboard or download it as a text file.</li>
              <li>Use the "Clear" button to reset both input and output for a new task.</li>
            </ol>

            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <Zap className="w-6 h-6 mr-2" />
              Key Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
              <li>
                <strong>Flexible Duplicate Handling:</strong> Remove duplicates or isolate them based on your needs.
              </li>
              <li>
                <strong>Case Sensitivity Option:</strong> Choose whether to treat uppercase and lowercase as distinct.
              </li>
              <li>
                <strong>Whitespace Trimming:</strong> Optionally remove leading and trailing spaces from each line.
              </li>
              <li>
                <strong>First Occurrence Retention:</strong> Keep the first instance of duplicate lines if desired.
              </li>
              <li>
                <strong>Line Numbering:</strong> Add sequential numbers to your output for easy reference.
              </li>
              <li>
                <strong>Empty Line Filtering:</strong> Option to ignore blank lines during processing.
              </li>
              <li>
                <strong>Custom Separators:</strong> Define your own line separators for specialized formats.
              </li>
              <li>
                <strong>Sorting Capabilities:</strong> Arrange your output in ascending or descending order.
              </li>
              <li>
                <strong>File Handling:</strong> Upload text files and download processed results.
              </li>
            </ul>

            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <Settings className="w-6 h-6 mr-2" />
              Advanced Options Explained
            </h2>
            <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
              <li>
                <strong>Case Sensitivity:</strong> When enabled, "Hello" and "hello" are treated as different lines.
              </li>
              <li>
                <strong>Trim Whitespace:</strong> Removes spaces at the beginning and end of each line before
                comparison.
              </li>
              <li>
                <strong>Keep First Occurrence:</strong> Retains the first instance of a duplicate line instead of
                removing all occurrences.
              </li>
              <li>
                <strong>Add Line Numbers:</strong> Prefixes each line in the output with a sequential number.
              </li>
              <li>
                <strong>Ignore Empty Lines:</strong> Skips blank lines during the duplicate removal process.
              </li>
              <li>
                <strong>Custom Separator:</strong> Allows processing of data that isn't newline-separated (e.g.,
                comma-separated values).
              </li>
              <li>
                <strong>Filter Mode:</strong> Choose between removing all duplicates or keeping only the lines that have
                duplicates.
              </li>
            </ul>

            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <Lightbulb className="w-6 h-6 mr-2" />
              Practical Applications
            </h2>
            <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
              <li>
                <strong>Data Cleaning:</strong> Remove duplicate entries from datasets or logs.
              </li>
              <li>
                <strong>List Management:</strong> Clean up mailing lists, contact information, or inventory lists.
              </li>
              <li>
                <strong>Code Optimization:</strong> Identify and remove duplicate lines in source code or configuration
                files.
              </li>
              <li>
                <strong>Content Analysis:</strong> Isolate unique or repeated phrases in large text corpora.
              </li>
              <li>
                <strong>SEO Optimization:</strong> Identify duplicate meta descriptions or titles across web pages.
              </li>
              <li>
                <strong>Log Analysis:</strong> Clean up log files by removing or isolating repeated entries.
              </li>
              <li>
                <strong>Text Comparison:</strong> Prepare texts for diff operations by removing common lines.
              </li>
            </ul>

            <p className="text-sm md:text-base text-default-600 mt-4">
              Ready to streamline your text processing tasks? Start using our Duplicate Line Remover now and experience
              the power of efficient, customizable text cleaning at your fingertips. Whether you're a data analyst, a
              content creator, or anyone dealing with large volumes of text, our tool is here to make your work easier
              and more productive. Try it out and see how it can transform your text processing workflow!
            </p>
          </div>
        </Card>
      </div>
    </ToolLayout>
  )
}

