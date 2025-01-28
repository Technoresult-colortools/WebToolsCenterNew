"use client"

import React, { useState, useCallback } from "react"
import { Card, CardBody, Button, Checkbox, Textarea, Slider, Input } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"
import {
  Copy,
  Download,
  RefreshCw,
  WrapText,
  Info,
  Lightbulb,
  BookOpen,
  Scissors,
  ZapIcon,
  Settings,
  Type,
} from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"

const MAX_CHARS = 5000

const scrambleWord = (word: string, preserveEnds: boolean, intensity: number): string => {
  if (word.length <= 3) return word

  const start = preserveEnds ? 1 : 0
  const end = preserveEnds ? word.length - 1 : word.length

  const middleChars = word.slice(start, end).split("")
  const shuffleCount = Math.floor(middleChars.length * intensity)

  for (let i = 0; i < shuffleCount; i++) {
    const j = start + Math.floor(Math.random() * middleChars.length)
    const k = start + Math.floor(Math.random() * middleChars.length)
    ;[middleChars[j], middleChars[k]] = [middleChars[k], middleChars[j]]
  }

  return (preserveEnds ? word[0] : "") + middleChars.join("") + (preserveEnds ? word[word.length - 1] : "")
}

export default function WordScrambler() {
  const [text, setText] = useState("")
  const [scrambledText, setScrambledText] = useState("")
  const [preserveEnds, setPreserveEnds] = useState(false)
  const [intensity, setIntensity] = useState(0.5)
  const [minWordLength, setMinWordLength] = useState(0)

  const handleScramble = useCallback(() => {
    const words = text.split(" ")
    const scrambledWords = words
      .map((word) => (word.length >= minWordLength ? scrambleWord(word, preserveEnds, intensity) : word))
      .join(" ")
    setScrambledText(scrambledWords)
    toast.success("Words scrambled successfully!")
  }, [text, preserveEnds, intensity, minWordLength])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(scrambledText)
    toast.success("Scrambled text copied to clipboard")
  }, [scrambledText])

  const handleDownload = useCallback(() => {
    const blob = new Blob([scrambledText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "scrambled_text.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("Scrambled text downloaded successfully")
  }, [scrambledText])

  const handleClear = useCallback(() => {
    setText("")
    setScrambledText("")
    toast.success("Text cleared")
  }, [])

  return (
    <ToolLayout
      title="Word Scrambler"
      description="Shuffle the letters of each word in your input text with advanced options"
      toolId="678f382926f06f912191bc89"
    >
      <div className="flex flex-col gap-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <Textarea
              value={text}
              onValueChange={setText}
              placeholder="Enter your text here..."
              minRows={8}
              className="w-full mb-4"
              variant="bordered"
            />
            <p className="text-sm text-default-500 mb-4">
              {text.length}/{MAX_CHARS} characters
            </p>
            <div className="flex flex-col gap-4 mb-4">
              <Checkbox isSelected={preserveEnds} onValueChange={setPreserveEnds}>
                Preserve first and last letter
              </Checkbox>
              <div>
                <p className="text-sm mb-2">Scramble Intensity: {intensity.toFixed(2)}</p>
                <Slider
                  step={0.01}
                  maxValue={1}
                  minValue={0}
                  value={intensity}
                  onChange={(value) => setIntensity(Number(value))}
                  className="max-w-md"
                />
              </div>
              <Input
                type="number"
                label="Minimum Word Length to Scramble"
                value={minWordLength.toString()}
                onChange={(e) => setMinWordLength(Number(e.target.value))}
                min={0}
                className="max-w-xs"
              />
            </div>
            <Button
              color="primary"
              onPress={handleScramble}
              startContent={<WrapText size={18} />}
              className="w-full mb-4"
            >
              Scramble Words
            </Button>
            <Textarea
              label="Scrambled Text"
              value={scrambledText}
              readOnly
              minRows={8}
              className="w-full"
              variant="bordered"
            />
          </CardBody>
        </Card>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          <Button color="primary" onPress={handleCopy} startContent={<Copy size={18} />}>
            Copy
          </Button>
          <Button color="primary" onPress={handleDownload} startContent={<Download size={18} />}>
            Download
          </Button>
          <Button color="danger" onPress={handleClear} startContent={<RefreshCw size={18} />}>
            Clear
          </Button>
        </div>

        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                What is the Word Scrambler?
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                The Word Scrambler is an advanced text manipulation tool designed for educators, puzzle enthusiasts, and
                language lovers. It goes beyond simple letter shuffling, offering customizable options to create
                engaging word puzzles and unique text transformations. With its{" "}
                <Link href="#how-to-use" className="text-primary hover:underline">
                  user-friendly interface
                </Link>{" "}
                and powerful features, it's the perfect companion for creating educational materials, word games, and
                creative writing exercises.
              </p>
              <p className="text-sm md:text-base text-default-600 mb-4">
                Whether you're designing a challenging word puzzle, developing language learning exercises, or simply
                exploring the flexibility of language, our Word Scrambler provides you with the control and precision
                you need. It's like having a personal word puzzle generator right in your browser!
              </p>

              <div className="my-8">
                <Image
                  src="/Images/WordScramblerPreview.png"
                  alt="Screenshot of the Word Scrambler interface showing input area, scrambling options, and scrambled text output"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>

              <h2
                id="how-to-use"
                className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center"
              >
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use the Word Scrambler?
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>Enter or paste your text into the input area.</li>
                <li>
                  Adjust the scrambling options:
                  <ul className="list-disc list-inside ml-6 mt-2">
                    <li>Toggle "Preserve first and last letter" to keep word endings intact.</li>
                    <li>Set the "Scramble Intensity" to control how much the words are shuffled.</li>
                    <li>Specify a "Minimum Word Length" to scramble only longer words.</li>
                  </ul>
                </li>
                <li>Click the "Scramble Words" button to shuffle the letters in each word.</li>
                <li>View the scrambled result in the output area.</li>
                <li>Use the "Copy" button to copy the scrambled text to your clipboard.</li>
                <li>Click "Download" to save the scrambled text as a .txt file.</li>
                <li>Use "Clear" to reset both input and output areas for a new scrambling task.</li>
              </ol>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Scissors className="w-6 h-6 mr-2" />
                Key Features
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>
                  <strong>Customizable Scrambling:</strong> Control the intensity and specifics of word scrambling.
                </li>
                <li>
                  <strong>Preserve Word Ends:</strong> Option to keep the first and last letters of words intact.
                </li>
                <li>
                  <strong>Adjustable Intensity:</strong> Fine-tune the level of letter shuffling within words.
                </li>
                <li>
                  <strong>Minimum Word Length:</strong> Set a threshold for which words get scrambled.
                </li>
                <li>
                  <strong>Real-time Preview:</strong> See the scrambled text update as you adjust settings.
                </li>
                <li>
                  <strong>Copy and Download:</strong> Easily save or share your scrambled text.
                </li>
                <li>
                  <strong>Clear Function:</strong> Quickly reset the tool for new scrambling tasks.
                </li>
              </ul>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Practical Applications
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>
                  <strong>Educational Tools:</strong> Create word puzzles for language learning and vocabulary building.
                </li>
                <li>
                  <strong>Puzzle Design:</strong> Generate content for word search puzzles, crosswords, and other word
                  games.
                </li>
                <li>
                  <strong>Creative Writing:</strong> Inspire new ideas by scrambling existing text.
                </li>
                <li>
                  <strong>Cognitive Exercises:</strong> Develop brain training activities focusing on word recognition
                  and unscrambling.
                </li>
                <li>
                  <strong>Cryptography Introduction:</strong> Teach basic concepts of text transformation and decoding.
                </li>
                <li>
                  <strong>Social Media Content:</strong> Create engaging word-based challenges for followers.
                </li>
                <li>
                  <strong>Accessibility Testing:</strong> Generate scrambled text to test readability tools and screen
                  readers.
                </li>
              </ul>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <ZapIcon className="w-6 h-6 mr-2" />
                Why Choose Our Word Scrambler?
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>
                  <Settings className="w-4 h-4 inline-block mr-1" /> <strong>Advanced Customization:</strong> Fine-tune
                  your scrambling with multiple options
                </li>
                <li>
                  <WrapText className="w-4 h-4 inline-block mr-1" /> <strong>Intelligent Scrambling:</strong> Preserves
                  word structure while ensuring thorough mixing
                </li>
                <li>
                  <Copy className="w-4 h-4 inline-block mr-1" /> <strong>Easy Export:</strong> Copy or download your
                  scrambled text with one click
                </li>
                <li>
                  <RefreshCw className="w-4 h-4 inline-block mr-1" /> <strong>Quick Reset:</strong> Clear function for
                  easy start-over
                </li>
                <li>
                  <Type className="w-4 h-4 inline-block mr-1" /> <strong>User-Friendly Interface:</strong> Intuitive
                  design for effortless use
                </li>
              </ul>

              <p className="text-sm md:text-base text-default-600 mt-4">
                Ready to dive into the world of word scrambling? Start using our Word Scrambler now and unlock new
                possibilities in word play, education, and creative writing. Whether you're a teacher looking to create
                engaging language exercises, a puzzle designer seeking to challenge your audience, or simply someone who
                loves playing with words, our tool provides the flexibility and features you need. Try it out and see
                how it can enhance your word-based projects and activities!
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </ToolLayout>
  )
}

