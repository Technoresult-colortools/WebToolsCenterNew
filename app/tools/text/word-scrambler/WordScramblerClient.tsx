
"use client"

import React, { useState, useCallback } from "react"
import { Card, CardBody, Button, Checkbox, Textarea, Slider, Input, Select, SelectItem, Tooltip, Tabs, Tab } from "@nextui-org/react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import {
  Copy,
  Download,
  RefreshCw,
  WrapText,
  Settings,
  Type,
  History,
  BookIcon,
  Info,
  BookOpen,
  Zap
} from "lucide-react"
import Image from "next/image"

const MAX_CHARS = 10000

// Different scrambling algorithms
const SCRAMBLE_METHODS = {
  RANDOM: "random",
  REVERSE: "reverse",
  SORTED: "sorted",
  VOWEL_SWAP: "vowelSwap"
} as const

type ScrambleMethod = typeof SCRAMBLE_METHODS[keyof typeof SCRAMBLE_METHODS]
type DelimiterType = "space" | "newline" | "sentence"

// Words to preserve from scrambling
const COMMON_WORDS = new Set([
  "the", "and", "for", "with", "but", "or", "as", "if", "when", "than", 
  "because", "while", "where", "how", "that", "this", "these", "those"
])

interface ScrambleOptions {
  preserveEnds: boolean
  intensity: number
  minWordLength: number
  preserveCommonWords: boolean
  preserveCapitalization: boolean
}

const scrambleWord = (word: string, method: ScrambleMethod, options: ScrambleOptions): string => {
  // Skip punctuation-only strings
  if (/^[^\w]+$/.test(word)) return word
  
  // Extract punctuation
  const leadingPunct = word.match(/^[^\w]+/) || [""]
  const trailingPunct = word.match(/[^\w]+$/) || [""]
  
  // Get the actual word without punctuation
  const cleanWord = word.replace(/^[^\w]+/, "").replace(/[^\w]+$/, "")
  
  // Skip short words or common words if specified
  if (cleanWord.length < options.minWordLength || 
     (options.preserveCommonWords && COMMON_WORDS.has(cleanWord.toLowerCase()))) {
    return word
  }
  
  let scrambled = cleanWord
  const start = options.preserveEnds ? 1 : 0
  const end = options.preserveEnds ? cleanWord.length - 1 : cleanWord.length
  
  if (start >= end) return word // Word too short to scramble with preserved ends
  
  // Middle part to scramble
  const middleChars = cleanWord.slice(start, end).split("")
  
  switch (method) {
    case SCRAMBLE_METHODS.RANDOM:
      const shuffleCount = Math.floor(middleChars.length * options.intensity)
        for (let i = 0; i < shuffleCount; i++) {
          const j = Math.floor(Math.random() * middleChars.length)
          const k = Math.floor(Math.random() * middleChars.length)
          // Fix the destructuring assignment:
          const temp = middleChars[j]
          middleChars[j] = middleChars[k]
          middleChars[k] = temp
        }
      scrambled = (options.preserveEnds ? cleanWord[0] : "") + 
                  middleChars.join("") + 
                  (options.preserveEnds ? cleanWord[cleanWord.length - 1] : "")
      break
      
    case SCRAMBLE_METHODS.REVERSE:
      scrambled = (options.preserveEnds ? cleanWord[0] : "") + 
                  middleChars.reverse().join("") + 
                  (options.preserveEnds ? cleanWord[cleanWord.length - 1] : "")
      break
      
    case SCRAMBLE_METHODS.SORTED:
      scrambled = (options.preserveEnds ? cleanWord[0] : "") + 
                  [...middleChars].sort().join("") + 
                  (options.preserveEnds ? cleanWord[cleanWord.length - 1] : "")
      break
      
    case SCRAMBLE_METHODS.VOWEL_SWAP:
      // Swap vowels with each other, keep consonants
      const vowels = middleChars.filter(c => /[aeiou]/i.test(c))
      const shuffledVowels = [...vowels]
        for (let i = 0; i < shuffledVowels.length; i++) {
          const j = Math.floor(Math.random() * shuffledVowels.length)
          const k = Math.floor(Math.random() * shuffledVowels.length)
          // Fix the destructuring assignment:
          const temp = shuffledVowels[j]
          shuffledVowels[j] = shuffledVowels[k]
          shuffledVowels[k] = temp
        }
      
      let vowelIndex = 0
      const newMiddle = middleChars.map(c => {
        if (/[aeiou]/i.test(c)) {
          return shuffledVowels[vowelIndex++]
        }
        return c
      })
      
      scrambled = (options.preserveEnds ? cleanWord[0] : "") + 
                  newMiddle.join("") + 
                  (options.preserveEnds ? cleanWord[cleanWord.length - 1] : "")
      break
  }
  
  // Reattach punctuation
  return leadingPunct[0] + scrambled + trailingPunct[0]
}

const separateByDelimiter = (text: string, delimiter: DelimiterType): string[] => {
  if (delimiter === "space") return text.split(" ")
  if (delimiter === "newline") return text.split(/\n/)
  if (delimiter === "sentence") return text.split(/(?<=[.!?])\s+/)
  return text.split(" ") // Default
}

interface HistoryItem {
  original: string
  scrambled: string
}

export default function WordScrambler() {
  // State for text and options
  const [text, setText] = useState("")
  const [scrambledText, setScrambledText] = useState("")
  const [history, setHistory] = useState<HistoryItem[]>([])
  
  // Scramble options
  const [scrambleMethod, setScrambleMethod] = useState<ScrambleMethod>(SCRAMBLE_METHODS.RANDOM)
  const [delimiter, setDelimiter] = useState<DelimiterType>("space")
  const [preserveEnds, setPreserveEnds] = useState(true)
  const [preserveCommonWords, setPreserveCommonWords] = useState(true)
  const [preserveCapitalization, setPreserveCapitalization] = useState(true)
  const [intensity, setIntensity] = useState(0.7)
  const [minWordLength, setMinWordLength] = useState(4)
  
  // UI state
  const [activeTab, setActiveTab] = useState("main")

  const handleScramble = useCallback(() => {
    if (!text.trim()) {
      toast.error("Please enter some text to scramble")
      return
    }
    
    try {
      const units = separateByDelimiter(text, delimiter)
      const options: ScrambleOptions = { 
        preserveEnds, 
        intensity, 
        minWordLength,
        preserveCommonWords,
        preserveCapitalization
      }
      
      const scrambledUnits = units.map(unit => {
        if (delimiter === "space") {
          // For word-level scrambling
          return scrambleWord(unit, scrambleMethod, options)
        } else {
          // For multi-word units (lines, sentences, etc)
          const words = unit.split(" ")
          return words.map(word => scrambleWord(word, scrambleMethod, options)).join(" ")
        }
      })
      
      const result = scrambledUnits.join(delimiter === "space" ? " " : 
                                         delimiter === "newline" ? "\n" : 
                                         delimiter === "sentence" ? " " : " ")
      
      setScrambledText(result)
      
      // Add to history if different from previous
      if (result !== scrambledText) {
        setHistory(prev => [{ original: text, scrambled: result }, ...prev].slice(0, 10))
      }
      
      toast.success("Text scrambled successfully!")
    } catch (error) {
      console.error("Scrambling error:", error)
      toast.error("Something went wrong while scrambling")
    }
  }, [text, scrambleMethod, delimiter, preserveEnds, preserveCommonWords, 
      preserveCapitalization, intensity, minWordLength, scrambledText])

  const handleCopy = useCallback(() => {
    if (!scrambledText) {
      toast.error("No scrambled text to copy")
      return
    }
    navigator.clipboard.writeText(scrambledText)
    toast.success("Scrambled text copied to clipboard")
  }, [scrambledText])

  const handleDownload = useCallback(() => {
    if (!scrambledText) {
      toast.error("No scrambled text to download")
      return
    }
    const blob = new Blob([scrambledText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "scrambled_text.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("Scrambled text downloaded")
  }, [scrambledText])

  const handleClear = useCallback(() => {
    setText("")
    setScrambledText("")
    toast.success("Text cleared")
  }, [])
  
  const loadFromHistory = useCallback((index: number) => {
    if (history[index]) {
      setText(history[index].original)
      setScrambledText(history[index].scrambled)
      toast.success("Loaded from history")
    }
  }, [history])

  // Random text examples
  const examples = [
    "The quick brown fox jumps over the lazy dog.",
    "According to research at Cambridge University, it doesn't matter in what order the letters in a word are, the only important thing is that the first and last letter be at the right place.",
    "This sentence demonstrates how scrambled text can still be readable when first and last letters are preserved.",
  ]
  
  const loadExample = useCallback((index: number) => {
    setText(examples[index])
    setActiveTab("main")
  }, [])

  return (
    <ToolLayout
      title="Word Scrambler"
      description="Shuffle the letters in your text with multiple algorithms and customization options"
      toolId="678f382926f06f912191bc89"
    >
      <div className="flex flex-col gap-6">
        <Tabs 
          selectedKey={activeTab} 
          onSelectionChange={(key) => setActiveTab(key as string)}
          color="primary"
          variant="bordered"
          classNames={{
            tabList: "bg-default-200 p-0 rounded-lg",
            cursor: "bg-primary/40",
            tab: "py-3",
          }}
        >
          <Tab 
            key="main" 
            title={
              <div className="flex items-center gap-2">
                <Type size={18} />
                <span>Text</span>
              </div>
            }
          >
            <Card className="bg-default-50 dark:bg-default-100">
              <CardBody className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Input Section */}
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-md font-medium">Input Text</h3>
                      <div className="flex gap-2">
                        <Tooltip content="Load an example" className="text-default-700">
                          <Button 
                            isIconOnly 
                            variant="light" 
                            size="sm"
                            onPress={() => loadExample(Math.floor(Math.random() * examples.length))}
                          >
                            <BookIcon size={18} />
                          </Button>
                        </Tooltip>
                        <Tooltip content="Clear text" className="text-default-700">
                          <Button 
                            isIconOnly 
                            variant="light" 
                            size="sm"
                            color="danger"
                            onPress={handleClear}
                          >
                            <RefreshCw size={18} />
                          </Button>
                        </Tooltip>
                      </div>
                    </div>
                    <Textarea
                      value={text}
                      onValueChange={setText}
                      placeholder="Enter your text here..."
                      minRows={10}
                      className="w-full"
                      variant="bordered"
                      maxLength={MAX_CHARS}
                    />
                    <p className="text-xs text-default-500">
                      {text.length}/{MAX_CHARS} characters
                    </p>
                  </div>
                  
                  {/* Output Section */}
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-md font-medium">Scrambled Text</h3>
                      <div className="flex gap-2">
                        <Tooltip content="Copy to clipboard" className="text-default-700">
                          <Button 
                            isIconOnly 
                            variant="light" 
                            size="sm"
                            isDisabled={!scrambledText}
                            onPress={handleCopy}
                          >
                            <Copy size={18} />
                          </Button>
                        </Tooltip>
                        <Tooltip content="Download as text file" className="text-default-700">
                          <Button 
                            isIconOnly 
                            variant="light" 
                            size="sm"
                            isDisabled={!scrambledText}
                            onPress={handleDownload}
                          >
                            <Download size={18} />
                          </Button>
                        </Tooltip>
                      </div>
                    </div>
                    <Textarea
                      value={scrambledText}
                      readOnly
                      placeholder="Scrambled text will appear here..."
                      minRows={10}
                      className="w-full"
                      variant="bordered"
                    />
                    
                  </div>
                </div>
              </CardBody>
            </Card>
          </Tab>
          
          <Tab 
            key="settings" 
            title={
              <div className="flex items-center gap-2">
                <Settings size={18} />
                <span>Options</span>
              </div>
            }
          >
            <Card className="bg-default-50 dark:bg-default-100">
              <CardBody className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Scrambling Method</h3>
                    
                    <Select
                      label="Algorithm"
                      selectedKeys={[scrambleMethod]}
                      onChange={(e) => setScrambleMethod(e.target.value as ScrambleMethod)}
                      className="max-w-xs"
                      variant="bordered"
                    >
                      <SelectItem key={SCRAMBLE_METHODS.RANDOM} value={SCRAMBLE_METHODS.RANDOM} className="text-default-700">
                        Random Shuffle
                      </SelectItem>
                      <SelectItem key={SCRAMBLE_METHODS.REVERSE} value={SCRAMBLE_METHODS.REVERSE} className="text-default-700">
                        Reverse Letters
                      </SelectItem>
                      <SelectItem key={SCRAMBLE_METHODS.SORTED} value={SCRAMBLE_METHODS.SORTED} className="text-default-700">
                        Alphabetical Sort
                      </SelectItem>
                      <SelectItem key={SCRAMBLE_METHODS.VOWEL_SWAP} value={SCRAMBLE_METHODS.VOWEL_SWAP} className="text-default-700">
                        Vowel Swap
                      </SelectItem>
                    </Select>
                    
                    <Select
                      label="Scramble Unit"
                      selectedKeys={[delimiter]}
                      onChange={(e) => setDelimiter(e.target.value as DelimiterType)}
                      className="max-w-xs"
                      variant="bordered"
                    >
                      <SelectItem key="space" value="space" className="text-default-700">Words (Space Separated)</SelectItem>
                      <SelectItem key="newline" value="newline" className="text-default-700">Lines</SelectItem>
                      <SelectItem key="sentence" value="sentence" className="text-default-700">Sentences</SelectItem>
                    </Select>
                    
                    <div>
                      <p className="text-sm mb-2">Scramble Intensity: {intensity.toFixed(2)}</p>
                      <Slider
                        step={0.01}
                        maxValue={1}
                        minValue={0}
                        value={intensity}
                        onChange={(value) => setIntensity(Number(value))}
                        className="max-w-md"
                        showSteps={true}
                        marks={[
                          { value: 0, label: "Low" },
                          { value: 0.5, label: "Medium" },
                          { value: 1, label: "High" }
                        ]}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Word Options</h3>
                    
                    <Input
                      type="number"
                      label="Minimum Word Length to Scramble"
                      value={minWordLength.toString()}
                      onChange={(e) => setMinWordLength(Number(e.target.value))}
                      min={0}
                      max={20}
                      className="max-w-xs"
                    />
                    
                    <div className="space-y-2">
                      <Checkbox 
                        isSelected={preserveEnds} 
                        onValueChange={setPreserveEnds}
                      >
                        Preserve first and last letter
                      </Checkbox>
                      
                      <Checkbox 
                        isSelected={preserveCommonWords} 
                        onValueChange={setPreserveCommonWords}
                      >
                        Don't scramble common words (the, and, for, etc.)
                      </Checkbox>
                      
                      <Checkbox 
                        isSelected={preserveCapitalization} 
                        onValueChange={setPreserveCapitalization}
                      >
                        Preserve capitalization
                      </Checkbox>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Tab>
          
          <Tab 
            key="history" 
            title={
              <div className="flex items-center gap-2">
                <History size={18} />
                <span>History</span>
              </div>
            }
          >
            <Card className="bg-default-50 dark:bg-default-100">
              <CardBody className="p-6">
                {history.length > 0 ? (
                  <div className="space-y-4">
                    {history.map((item, index) => (
                      <Card key={index} className="bg-content1 shadow-none">
                        <CardBody className="p-4">
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <h4 className="text-sm font-medium mb-1">Original</h4>
                              <p className="text-sm text-default-600 line-clamp-1">{item.original}</p>
                              <h4 className="text-sm font-medium mt-3 mb-1">Scrambled</h4>
                              <p className="text-sm text-default-600 line-clamp-1">{item.scrambled}</p>
                            </div>
                            <Button 
                              size="sm" 
                              variant="flat" 
                              color="primary"
                              onPress={() => loadFromHistory(index)}
                            >
                              Load
                            </Button>
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <History size={24} className="mx-auto mb-2 text-default-400" />
                    <p className="text-default-500">No history yet. Scramble some text to see it here.</p>
                  </div>
                )}
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Button 
            color="primary" 
            variant="flat"
            fullWidth
            onPress={handleScramble}
            startContent={<WrapText size={18} />}
          >
            Scramble
          </Button>
          <Button 
            color="success" 
            variant="flat"
            fullWidth
            isDisabled={!scrambledText}
            onPress={handleCopy}
            startContent={<Copy size={18} />}
          >
            Copy
          </Button>
          <Button 
            color="primary" 
            variant="flat"
            fullWidth
            isDisabled={!scrambledText}
            onPress={handleDownload}
            startContent={<Download size={18} />}
          >
            Download
          </Button>
          <Button 
            color="danger" 
            variant="flat"
            fullWidth
            isDisabled={!text && !scrambledText}
            onPress={handleClear}
            startContent={<RefreshCw size={18} />}
          >
            Clear
          </Button>
        </div>

        <Card className=" bg-default-50 dark:bg-default-100 p-4 md:p-8">
      <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2" />
          What is the Word Scrambler?
        </h2>
        <p className="text-sm md:text-base text-default-600 mb-4">
          The Word Scrambler is a versatile text transformation tool that shuffles letters within words or larger text
          units using various algorithms. It allows you to create readable yet scrambled text by preserving key elements
          like first and last letters while rearranging the letters in between.
        </p>
        <p className="text-sm md:text-base text-default-600 mb-4">
          This tool is perfect for creating puzzles, demonstrating reading comprehension phenomena, testing cognitive
          abilities, or simply having fun with text transformation. With multiple algorithms and customization options,
          you can control exactly how your text gets scrambled.
        </p>

        <div className="my-8">
          <Image
            src="/Images/InfosectionImages/WordScramblerPreview1.png?height=400&width=600"
            alt="Screenshot of the Word Scrambler tool showing the interface with input text and scrambled output"
            width={600}
            height={400}
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>
        <div className="my-8">
          <Image
            src="/Images/InfosectionImages/WordScramblerPreview2.png?height=400&width=600"
            alt="Screenshot of the Word Scrambler tool showing the interface with input text and scrambled output"
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
          How to Use the Word Scrambler?
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
          <li>
            <strong>Enter your text</strong> - Type or paste text into the input area, or click the book icon to load a
            random example.
          </li>
          <li>
            <strong>Configure scrambling options</strong> - Go to the Options tab to select your preferred scrambling
            method, unit size, and other settings:
            <ul className="list-disc list-inside ml-6 mt-1 text-sm text-default-600">
              <li>Choose a scrambling algorithm (Random Shuffle, Reverse Letters, Alphabetical Sort, or Vowel Swap)</li>
              <li>Select the scrambling unit (Words, Lines, or Sentences)</li>
              <li>Adjust the scrambling intensity using the slider</li>
              <li>Set the minimum word length to scramble</li>
              <li>Toggle options like preserving first and last letters</li>
            </ul>
          </li>
          <li>
            <strong>Click the Scramble button</strong> - Process your text using the current settings to generate
            scrambled output.
          </li>
          <li>
            <strong>View the result</strong> - See your scrambled text in the output area on the right side.
          </li>
          <li>
            <strong>Save or share your work</strong> - Use the Copy button to copy the scrambled text to your clipboard
            or Download to save it as a text file.
          </li>
          <li>
            <strong>Access your history</strong> - Switch to the History tab to view and reload previous scrambling
            operations.
          </li>
        </ol>

        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Zap className="w-6 h-6 mr-2" />
          Key Features
        </h2>
        <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
          <li>
            <strong>Multiple Scrambling Algorithms:</strong> Choose from Random Shuffle, Reverse Letters, Alphabetical
            Sort, or Vowel Swap to create different scrambling effects.
          </li>
          <li>
            <strong>Flexible Unit Selection:</strong> Scramble at the word, line, or sentence level depending on your
            needs.
          </li>
          <li>
            <strong>Adjustable Intensity:</strong> Control how thoroughly the text is scrambled with a simple slider.
          </li>
          <li>
            <strong>Preservation Options:</strong> Keep first and last letters intact to maintain readability, preserve
            common words, and maintain original capitalization.
          </li>
          <li>
            <strong>Minimum Word Length:</strong> Specify the minimum length of words to be scrambled, leaving shorter
            words untouched.
          </li>
          <li>
            <strong>History Tracking:</strong> Access your previous scrambling operations to compare different
            approaches or recover earlier versions.
          </li>
          <li>
            <strong>Example Texts:</strong> Load pre-written examples to quickly see how the scrambler works with
            different types of content.
          </li>
          <li>
            <strong>Export Options:</strong> Copy scrambled text to clipboard or download as a text file for easy
            sharing and use in other applications.
          </li>
        </ul>

        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Settings className="w-6 h-6 mr-2" />
          Scrambling Methods Explained
        </h2>
        <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
          <li>
            <strong>Random Shuffle:</strong> Randomly rearranges the letters within each word (or unit), creating a
            jumbled effect while optionally preserving the first and last letters.
          </li>
          <li>
            <strong>Reverse Letters:</strong> Flips the order of letters within each word (or unit), turning "scramble"
            into "elbmarcs" (or "slbmrace" if preserving ends).
          </li>
          <li>
            <strong>Alphabetical Sort:</strong> Rearranges the letters in alphabetical order within each word (or unit),
            turning "scramble" into "abcelmrs" (or "sacblmre" if preserving ends).
          </li>
          <li>
            <strong>Vowel Swap:</strong> Keeps consonants in place but shuffles the positions of vowels within each word
            (or unit), creating text that maintains some readability while still being scrambled.
          </li>
          <li>
            <strong>Scramble Intensity:</strong> Controls how thoroughly the letters are shuffled. Lower intensity means
            fewer letter positions are changed, while higher intensity creates more randomization.
          </li>
          <li>
            <strong>Preserve First and Last Letters:</strong> When enabled, keeps the first and last letters of each
            word in their original positions, which significantly improves the readability of scrambled text.
          </li>
          <li>
            <strong>Common Word Preservation:</strong> When enabled, common words like "the," "and," "for," etc. are
            left unscrambled to maintain better readability of the overall text.
          </li>
        </ul>

        <p className="text-sm md:text-base text-default-600 mt-4">
          Ready to transform your text in creative and interesting ways? Start using our Word Scrambler now and discover
          how scrambled text can still be surprisingly readable or deliberately challenging. Whether you're creating
          educational materials, conducting reading experiments, or just having fun with language, our tool gives you
          complete control over how your text gets scrambled.
        </p>
      </div>
    </Card>
      </div>
    </ToolLayout>
  )
}

