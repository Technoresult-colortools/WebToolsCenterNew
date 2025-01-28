"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import {
  Card,
  CardBody,
  Button,
  Input,
  Textarea,
  Switch,
  Select,
  SelectItem,
  Slider,
  Tabs,
  Tab,
} from "@nextui-org/react"
import { Shuffle, Copy, Upload, Download, Info, BookOpen, Lightbulb, Share2, Settings,  RefreshCcw } from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import Image from "next/image"
import seedrandom from "seedrandom"

export default function ListRandomizer() {
  const [inputList, setInputList] = useState<string>("")
  const [outputList, setOutputList] = useState<string>("")
  const [separator, setSeparator] = useState<string>("\n")
  const [customSeparator, setCustomSeparator] = useState<string>("")
  const [trimItems, setTrimItems] = useState<boolean>(true)
  const [removeDuplicates, setRemoveDuplicates] = useState<boolean>(false)
  const [sortBeforeRandomize, setSortBeforeRandomize] = useState<boolean>(false)
  const [caseInsensitive, setCaseInsensitive] = useState<boolean>(false)
  const [randomizationMethod, setRandomizationMethod] = useState<string>("fisher-yates")
  const [subsetSize, setSubsetSize] = useState<number>(0)
  const [weightedRandomization, setWeightedRandomization] = useState<boolean>(false)
  const [seed, setSeed] = useState<string>("")
  const [groupSize, setGroupSize] = useState<number>(1)
  const [reverseOutput, setReverseOutput] = useState<boolean>(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputList(e.target.value)
  }

  const handleSeparatorChange = (value: string) => {
    setSeparator(value)
    if (value === "custom") {
      setCustomSeparator("")
    }
  }

  const handleCustomSeparatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomSeparator(e.target.value)
  }

  const randomizeList = useCallback(() => {
    try {
      let items = inputList.split(separator === "custom" ? customSeparator : separator)

      if (trimItems) {
        items = items.map((item) => item.trim())
      }

      if (removeDuplicates) {
        items = [...new Set(items)]
      }

      if (sortBeforeRandomize) {
        items.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: caseInsensitive ? "base" : "variant" }))
      }

      let randomizedItems: string[]

      if (randomizationMethod === "fisher-yates") {
        randomizedItems = fisherYatesShuffle([...items])
      } else if (randomizationMethod === "sort") {
        randomizedItems = [...items].sort(() => Math.random() - 0.5)
      } else {
        randomizedItems = items
      }

      if (subsetSize > 0 && subsetSize < randomizedItems.length) {
        randomizedItems = randomizedItems.slice(0, subsetSize)
      }

      if (weightedRandomization) {
        randomizedItems = weightedRandomize(randomizedItems)
      }

      if (groupSize > 1) {
        randomizedItems = groupItems(randomizedItems, groupSize)
      }

      if (reverseOutput) {
        randomizedItems.reverse()
      }

      const result = randomizedItems.join("\n")
      setOutputList(result)
    } catch (error) {
      console.error("Randomization error:", error)
      toast.error("An error occurred while randomizing the list")
    }
  }, [
    inputList,
    separator,
    customSeparator,
    trimItems,
    removeDuplicates,
    sortBeforeRandomize,
    caseInsensitive,
    randomizationMethod,
    subsetSize,
    weightedRandomization,
    groupSize,
    reverseOutput,
  ])

  const fisherYatesShuffle = (array: string[]): string[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  const weightedRandomize = (items: string[]): string[] => {
    const weightedItems = items.map((item, index) => ({
      item,
      weight: items.length - index,
    }))

    return weightedItems.sort((a, b) => Math.random() * b.weight - Math.random() * a.weight).map(({ item }) => item)
  }

  const groupItems = (items: string[], size: number): string[] => {
    return items
      .reduce((acc, item, index) => {
        const groupIndex = Math.floor(index / size)
        if (!acc[groupIndex]) {
          acc[groupIndex] = []
        }
        acc[groupIndex].push(item)
        return acc
      }, [] as string[][])
      .map((group) => group.join(", "))
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(outputList).then(
      () => {
        toast.success("Randomized list copied to clipboard!")
      },
      () => {
        toast.error("Failed to copy randomized list.")
      },
    )
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setInputList(e.target?.result as string)
      }
      reader.readAsText(file)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([outputList], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "randomized_list.txt"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const resetSettings = () => {
    setSeparator("\n")
    setCustomSeparator("")
    setTrimItems(true)
    setRemoveDuplicates(false)
    setSortBeforeRandomize(false)
    setCaseInsensitive(false)
    setRandomizationMethod("fisher-yates")
    setSubsetSize(0)
    setWeightedRandomization(false)
    setSeed("")
    setGroupSize(1)
    setReverseOutput(false)
    toast.success("Settings reset to default values")
  }

  useEffect(() => {
    if (seed) {
      seedrandom(seed, { global: true })
    } else {
      seedrandom()
    }
  }, [seed])

  return (
    <ToolLayout
      title="List Randomizer"
      description="Powerful tool designed to shuffle and manipulate lists of items"
      toolId="678f383026f06f912191bccc"
    >
      <div className="flex flex-col gap-8">
        {/* Input and Settings Section */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Input List</h2>
                <Textarea
                  value={inputList}
                  onChange={handleInputChange}
                  placeholder="Enter your list items here, one per line"
                  minRows={7}
                  variant="bordered"
                  classNames={{
                    inputWrapper: [
                      "h-64,",
                      "border-2",
                      "border-default-300",
                      "dark:border-default-600",
                      "bg-default-100",
                      "dark:bg-default-200/50",
                      "hover:border-primary-500",
                      "dark:hover:border-primary-400",
                      "overflow-y-auto border",
                    ],
                    input: "overflow-y-auto",
                  }}
                />
                <div className="mt-4">
                  <Select
                    label="Separator"
                    value={separator}
                    onChange={(e) => handleSeparatorChange(e.target.value)}
                    className="max-w-xs"
                    variant="bordered"
                    classNames={{
                      trigger: "bg-default-100 data-[hover=true]:bg-default-200",
                    }}
                  >
                    <SelectItem key="\n" value="\n" className="text-default-700">
                      New line
                    </SelectItem>
                    <SelectItem key="," value="," className="text-default-700">
                      Comma
                    </SelectItem>
                    <SelectItem key=";" value=";" className="text-default-700">
                      Semicolon
                    </SelectItem>
                    <SelectItem key="\t" value="\t" className="text-default-700">
                      Tab
                    </SelectItem>
                    <SelectItem key="custom" value="custom" className="text-default-700">
                      Custom
                    </SelectItem>
                  </Select>
                  {separator === "custom" && (
                    <Input
                      value={customSeparator}
                      onChange={handleCustomSeparatorChange}
                      placeholder="Enter custom separator"
                      className="mt-2 text-default-700"
                      variant="bordered"
                    />
                  )}
                </div>
                <div className="mt-4">
                  <Button onClick={() => document.getElementById("file-upload")?.click()} color="primary">
                    <Upload className="h-5 w-5 mr-2" />
                    Upload List
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".txt,.csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Randomization Settings</h2>
                <Tabs aria-label="Randomization options">
                  <Tab
                    key="basic"
                    title={
                      <div className="flex items-center space-x-2">
                        <Shuffle className="h-4 w-4" />
                        <span>Basic</span>
                      </div>
                    }
                  >
                    <div className="mt-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Trim items</span>
                        <Switch isSelected={trimItems} onValueChange={setTrimItems} />
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Remove duplicates</span>
                        <Switch isSelected={removeDuplicates} onValueChange={setRemoveDuplicates} />
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Sort before randomize</span>
                        <Switch isSelected={sortBeforeRandomize} onValueChange={setSortBeforeRandomize} />
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Case-insensitive</span>
                        <Switch isSelected={caseInsensitive} onValueChange={setCaseInsensitive} />
                      </div>
                    </div>
                  </Tab>
                  <Tab
                    key="advanced"
                    title={
                      <div className="flex items-center space-x-2">
                        <Settings className="h-4 w-4" />
                        <span>Advanced</span>
                      </div>
                    }
                  >
                    <div className="mt-4 space-y-4">
                      <Select
                        label="Randomization Method"
                        value={randomizationMethod}
                        onChange={(e) => setRandomizationMethod(e.target.value)}
                        variant="bordered"
                        classNames={{
                          trigger: "bg-default-100 data-[hover=true]:bg-default-200",
                        }}
                      >
                        <SelectItem key="fisher-yates" value="fisher-yates" className="text-default-700">
                          Fisher-Yates Shuffle
                        </SelectItem>
                        <SelectItem key="sort" value="sort" className="text-default-700">
                          JavaScript Sort
                        </SelectItem>
                      </Select>
                      <div>
                        <span className="block mb-2">Subset Size: {subsetSize}</span>
                        <Slider
                          aria-label="Subset size"
                          step={1}
                          maxValue={100}
                          minValue={0}
                          value={subsetSize}
                          onChange={(value) => setSubsetSize(value as number)}
                          className="max-w-md"
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Weighted Randomization</span>
                        <Switch isSelected={weightedRandomization} onValueChange={setWeightedRandomization} />
                      </div>
                      <Input
                        label="Random Seed (optional)"
                        value={seed}
                        variant="bordered"
                        onChange={(e) => setSeed(e.target.value)}
                        placeholder="Enter a seed for reproducible results"
                      />
                      <div>
                        <span className="block mb-2">Group Size: {groupSize}</span>
                        <Slider
                          aria-label="Group size"
                          step={1}
                          maxValue={10}
                          minValue={1}
                          value={groupSize}
                          onChange={(value) => setGroupSize(value as number)}
                          className="max-w-md"
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Reverse Output</span>
                        <Switch isSelected={reverseOutput} onValueChange={setReverseOutput} />
                      </div>
                    </div>
                  </Tab>
                </Tabs>
                <div className="flex justify-between mt-4 gap-4">
                  <Button onClick={randomizeList} color="success" className="w-1/2">
                    <Shuffle className="h-5 w-5 mr-2" />
                    Randomize List
                  </Button>
                  <Button onClick={resetSettings} color="danger" className="w-1/2">
                    <RefreshCcw className="h-5 w-5 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Output Section */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Randomized Output</h2>
            <Textarea value={outputList} readOnly className="w-full" minRows={6} variant="bordered" />
            <div className="mt-4 flex flex-wrap justify-between gap-2">
              <Button onClick={handleCopyToClipboard} color="primary">
                <Copy className="h-5 w-5 mr-2" />
                Copy to Clipboard
              </Button>
              <Button onClick={handleDownload} color="primary">
                <Download className="h-5 w-5 mr-2" />
                Download Result
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Info Section */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                About List Randomizer
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4">
                The List Randomizer is a powerful and versatile tool designed to shuffle and manipulate lists of items
                with precision and flexibility. Whether you're a researcher conducting a random sampling, a teacher
                assigning random groups, a project manager allocating tasks, or simply someone looking to introduce an
                element of chance into your decision-making, this tool offers a comprehensive suite of features to meet
                your randomization needs.
              </p>

              <div className="my-8">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Screenshot of the List Randomizer interface showing input area, randomization options, and output"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>

              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                How to Use List Randomizer?
              </h2>
              <ol className="list-decimal pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Enter your list items in the input textarea or upload a text file.</li>
                <li>
                  Choose the appropriate separator for your list items (newline, comma, semicolon, tab, or custom).
                </li>
                <li>
                  Adjust the randomization settings according to your needs:
                  <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600 dark:text-gray-300">
                    <li>Set trimming, duplicate removal, and sorting options</li>
                    <li>Choose the randomization method (Fisher-Yates or JavaScript Sort)</li>
                    <li>Adjust subset size, grouping, and other advanced options</li>
                  </ul>
                </li>
                <li>Click the "Randomize List" button to generate a randomized version of your list.</li>
                <li>View the randomized output in the result textarea.</li>
                <li>Copy the result to your clipboard or download it as a text file.</li>
                <li>Use the "Reset" button to return all settings to their default values.</li>
              </ol>

              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                Key Features
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Multiple input methods: Enter text directly or upload files</li>
                <li>Flexible separators: Choose from common separators or use a custom one</li>
                <li>Advanced randomization options: Fisher-Yates shuffle or JavaScript sort</li>
                <li>List preprocessing: Trim items, remove duplicates, and sort before randomization</li>
                <li>Subset selection: Choose a specific number of items from the randomized list</li>
                <li>Weighted randomization: Prioritize items based on their original position</li>
                <li>Grouping: Organize randomized items into groups of a specified size</li>
                <li>Reversible output: Option to reverse the final randomized list</li>
                <li>Reproducible results: Use a seed for consistent randomization across sessions</li>
                <li>Easy reset: Quickly return all settings to their default values</li>
                <li>Export options: Copy to clipboard or download as a text file</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3 flex items-center">
                <Share2 className="w-5 h-5 mr-2" />
                Applications and Use Cases
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Research: Randomize participant lists or create random samples for studies</li>
                <li>Education: Assign random groups for projects or create randomized test question orders</li>
                <li>Project Management: Randomly assign tasks to team members or prioritize project backlogs</li>
                <li>Game Development: Generate random events, loot drops, or NPC behaviors</li>
                <li>Music and Media: Create shuffled playlists or randomize content order</li>
                <li>Decision Making: Use randomization to make unbiased choices or break ties</li>
                <li>Data Analysis: Perform random sampling or create control groups for experiments</li>
                <li>Event Planning: Randomize seating arrangements or determine presentation orders</li>
                <li>Sports and Competitions: Create random tournament brackets or team matchups</li>
                <li>Software Testing: Generate random input data for thorough application testing</li>
              </ul>
            </div>
          </CardBody>
        </Card>
      </div>
    </ToolLayout>
  )
}

