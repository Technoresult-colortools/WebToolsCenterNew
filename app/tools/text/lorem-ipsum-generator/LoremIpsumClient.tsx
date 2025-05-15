"use client"

import { useState, useCallback, useEffect } from "react"
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Input,
  Switch,
  Textarea,
  Select,
  SelectItem,
  RadioGroup,
  Radio,
  Divider,
} from "@nextui-org/react"
import {
  Copy,
  Download,
  RefreshCw,
  Shuffle,
  AlignLeft,
  WrapText,
  Baseline,
  ListOrdered,
  HeadingIcon,
  ChevronsUpDown,
  Settings2,
  Zap,
  Type,
} from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import InfoSection from "./info-section"

const loremIpsumWords = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat",
  "duis",
  "aute",
  "irure",
  "in",
  "reprehenderit",
  "voluptate",
  "velit",
  "esse",
  "cillum",
  "fugiat",
  "nulla",
  "pariatur",
  "excepteur",
  "sint",
  "occaecat",
  "cupidatat",
  "non",
  "proident",
  "sunt",
  "culpa",
  "qui",
  "officia",
  "deserunt",
  "mollit",
  "anim",
  "id",
  "est",
  "laborum",
]

const generationTypes = [
  { key: "paragraphs", label: "Paragraphs", icon: <AlignLeft className="w-4 h-4" /> },
  { key: "sentences", label: "Sentences", icon: <WrapText className="w-4 h-4" /> },
  { key: "words", label: "Words", icon: <Baseline className="w-4 h-4" /> },
  { key: "lists", label: "Lists", icon: <ListOrdered className="w-4 h-4" /> },
  { key: "headings", label: "Headings", icon: <HeadingIcon className="w-4 h-4" /> },
]

export default function LoremIpsumGenerator() {
  // General State
  const [generatedText, setGeneratedText] = useState("")
  const [generationType, setGenerationType] = useState("paragraphs")
  const [includeHTMLTags, setIncludeHTMLTags] = useState(false)
  const [startWithLoremIpsum, setStartWithLoremIpsum] = useState(true)

  // Type-specific State
  const [numParagraphs, setNumParagraphs] = useState(3)
  const [wordsPerParagraph, setWordsPerParagraph] = useState(50)

  const [numSentences, setNumSentences] = useState(5)
  const [wordsPerSentence, setWordsPerSentence] = useState(15)

  const [numWords, setNumWords] = useState(100)

  const [numListItems, setNumListItems] = useState(5)
  const [wordsPerListItem, setWordsPerListItem] = useState(8)
  const [listType, setListType] = useState("ul") // 'ul' or 'ol'

  const [numHeadings, setNumHeadings] = useState(3)
  const [wordsPerHeading, setWordsPerHeading] = useState(6)
  const [headingLevel, setHeadingLevel] = useState("2") // Fix: Changed to string type for Select component

  // Output Stats
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)

  useEffect(() => {
    const words = generatedText.trim().split(/\s+/).filter(Boolean)
    setWordCount(generatedText.trim() === "" ? 0 : words.length)
    setCharCount(generatedText.length)
  }, [generatedText])

  type GenerateSingleSentenceFn = (targetWordCount: number, isFirstSentenceOfBlock: boolean) => string

  const generateSingleSentence: GenerateSingleSentenceFn = useCallback(
    (targetWordCount, isFirstSentenceOfBlock) => {
      if (targetWordCount <= 0) return ""
      let sentenceWords: string[] = []
      let currentWordCount = 0

      if (isFirstSentenceOfBlock && startWithLoremIpsum) {
        const prefix = "Lorem ipsum dolor sit amet"
        sentenceWords = prefix.split(" ")
        currentWordCount = sentenceWords.length
        // Add comma if it's not the only part of the sentence
        if (targetWordCount > currentWordCount) {
          sentenceWords[sentenceWords.length - 1] = sentenceWords[sentenceWords.length - 1] + ","
        }
      }

      while (currentWordCount < targetWordCount) {
        sentenceWords.push(loremIpsumWords[Math.floor(Math.random() * loremIpsumWords.length)])
        currentWordCount++
      }

      if (sentenceWords.length === 0) {
        // Should not happen if targetWordCount > 0
        sentenceWords.push(loremIpsumWords[Math.floor(Math.random() * loremIpsumWords.length)])
      }

      sentenceWords[0] = sentenceWords[0].charAt(0).toUpperCase() + sentenceWords[0].slice(1)
      return sentenceWords.join(" ").trim() + "."
    },
    [startWithLoremIpsum],
  )

  const generateLoremIpsum = useCallback(() => {
    let text = ""
    let isFirstBlockGenerated = false // Tracks if the "Lorem ipsum..." prefix has been used

    const getIsFirstSentenceOfBlock = () => {
      const result = !isFirstBlockGenerated
      if (result) isFirstBlockGenerated = true
      return result
    }

    switch (generationType) {
      case "paragraphs":
        for (let i = 0; i < numParagraphs; i++) {
          const paragraphSentences = []
          let currentWordsInParagraph = 0
          while (currentWordsInParagraph < wordsPerParagraph) {
            // Approximate sentences per paragraph. More complex logic could vary sentence length.
            const sentenceLength = Math.max(
              5,
              Math.min(20, wordsPerParagraph - currentWordsInParagraph, Math.floor(Math.random() * 10) + 8),
            )
            if (sentenceLength <= 0) break
            paragraphSentences.push(
              generateSingleSentence(
                sentenceLength,
                getIsFirstSentenceOfBlock() && i === 0 && paragraphSentences.length === 0,
              ),
            )
            currentWordsInParagraph += sentenceLength // This is an approximation
          }
          const paragraphText = paragraphSentences.join(" ")
          text += includeHTMLTags ? `<p>${paragraphText}</p>\n\n` : paragraphText + "\n\n"
        }
        break

      case "sentences":
        const sentencesArray = []
        for (let i = 0; i < numSentences; i++) {
          sentencesArray.push(generateSingleSentence(wordsPerSentence, getIsFirstSentenceOfBlock() && i === 0))
        }
        text = sentencesArray.join(includeHTMLTags ? "<br />\n" : "\n")
        break

      case "words":
        const wordsArray = []
        const firstWordCapitalized = getIsFirstSentenceOfBlock() // Use this for the first word overall
        for (let i = 0; i < numWords; i++) {
          const word = loremIpsumWords[Math.floor(Math.random() * loremIpsumWords.length)]
          if (i === 0 && firstWordCapitalized && startWithLoremIpsum) {
            wordsArray.push("Lorem", "ipsum") // Start with standard if conditions met
            i++ // account for two words added
            if (i < numWords) wordsArray.push(loremIpsumWords[Math.floor(Math.random() * loremIpsumWords.length)])
          } else if (i === 0) {
            wordsArray.push(word.charAt(0).toUpperCase() + word.slice(1))
          } else {
            wordsArray.push(word)
          }
        }
        text = wordsArray.join(" ")
        if (!text.endsWith(".") && wordsArray.length > 0) text += "." // End with a period if it's a phrase
        break

      case "lists":
        let listItems = ""
        for (let i = 0; i < numListItems; i++) {
          const itemText = generateSingleSentence(wordsPerListItem, getIsFirstSentenceOfBlock() && i === 0)
          listItems += includeHTMLTags ? `  <li>${itemText}</li>\n` : `- ${itemText}\n`
        }
        if (includeHTMLTags) {
          text = `<${listType}>\n${listItems}</${listType}>`
        } else {
          text = listItems
        }
        break

      case "headings":
        const headingsArray = []
        for (let i = 0; i < numHeadings; i++) {
          const headingText = generateSingleSentence(wordsPerHeading, getIsFirstSentenceOfBlock() && i === 0).slice(
            0,
            -1,
          ) // Remove period for headings
          headingsArray.push(includeHTMLTags ? `<h${headingLevel}>${headingText}</h${headingLevel}>` : headingText)
        }
        text = headingsArray.join("\n\n")
        break
      default:
        text = "Invalid generation type selected."
    }

    setGeneratedText(text.trim())
    toast.success("Lorem Ipsum text generated!")
  }, [
    generationType,
    includeHTMLTags,
    startWithLoremIpsum,
    numParagraphs,
    wordsPerParagraph,
    numSentences,
    wordsPerSentence,
    numWords,
    numListItems,
    wordsPerListItem,
    listType,
    numHeadings,
    wordsPerHeading,
    headingLevel,
    generateSingleSentence,
  ])

  const handleCopy = useCallback(() => {
    if (!generatedText) {
      toast.error("Nothing to copy!")
      return
    }
    navigator.clipboard.writeText(generatedText)
    toast.success("Text copied to clipboard")
  }, [generatedText])

  const handleDownload = useCallback(() => {
    if (!generatedText) {
      toast.error("Nothing to download!")
      return
    }
    const blob = new Blob([generatedText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "lorem_ipsum.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("Text downloaded successfully")
  }, [generatedText])

  const handleClear = useCallback(() => {
    setGeneratedText("")
    toast.success("Text cleared")
  }, [])

  const handleShuffleWords = useCallback(() => {
    if (!generatedText) {
      toast.error("Nothing to shuffle!")
      return
    }
    // This shuffle is basic and works best with plain text or simple HTML.
    // It shuffles words within each major block (e.g., paragraph).
    const shuffledText = generatedText
      .split(/\n\s*\n/) // Split by paragraph or double newlines
      .map((block) => {
        if (includeHTMLTags && block.match(/<[^>]+>/)) {
          // Basic attempt to preserve simple tags, shuffle content
          // This is naive for complex HTML structures.
          const tagMatch = block.match(/^(\s*<[^>]+>)(.*)(<\/[^>]+>\s*)$/s)
          if (tagMatch) {
            const [, openTag, content, closeTag] = tagMatch
            const words = content.split(/\s+/).filter(Boolean)
            const shuffledWords = words.sort(() => Math.random() - 0.5).join(" ")
            return `${openTag}${shuffledWords}${closeTag}`
          }
        }
        // For plain text or unmatchable HTML, shuffle all words in block
        return block
          .split(/\s+/)
          .filter(Boolean)
          .sort(() => Math.random() - 0.5)
          .join(" ")
      })
      .join("\n\n")
    setGeneratedText(shuffledText)
    toast.success("Text shuffled")
  }, [generatedText, includeHTMLTags])

  const renderControls = () => {
    switch (generationType) {
      case "paragraphs":
        return (
          <div className="space-y-4">
            <Input
              type="number"
              label="Number of Paragraphs"
              value={numParagraphs.toString()}
              onValueChange={(val) => setNumParagraphs(Math.max(1, Number.parseInt(val) || 1))}
              min={1}
              variant="bordered"
              size="sm"
              startContent={<AlignLeft className="w-4 h-4 text-default-400" />}
              classNames={{
                inputWrapper: "bg-default-100/50",
              }}
            />
            <Input
              type="number"
              label="Approx. Words per Paragraph"
              value={wordsPerParagraph.toString()}
              onValueChange={(val) => setWordsPerParagraph(Math.max(5, Number.parseInt(val) || 5))}
              min={5}
              variant="bordered"
              size="sm"
              startContent={<Type className="w-4 h-4 text-default-400" />}
              classNames={{
                inputWrapper: "bg-default-100/50",
              }}
            />
          </div>
        )
      case "sentences":
        return (
          <div className="space-y-4">
            <Input
              type="number"
              label="Number of Sentences"
              value={numSentences.toString()}
              onValueChange={(val) => setNumSentences(Math.max(1, Number.parseInt(val) || 1))}
              min={1}
              variant="bordered"
              size="sm"
              startContent={<WrapText className="w-4 h-4 text-default-400" />}
              classNames={{
                inputWrapper: "bg-default-100/50",
              }}
            />
            <Input
              type="number"
              label="Words per Sentence"
              value={wordsPerSentence.toString()}
              onValueChange={(val) => setWordsPerSentence(Math.max(3, Number.parseInt(val) || 3))}
              min={3}
              variant="bordered"
              size="sm"
              startContent={<Type className="w-4 h-4 text-default-400" />}
              classNames={{
                inputWrapper: "bg-default-100/50",
              }}
            />
          </div>
        )
      case "words":
        return (
          <Input
            type="number"
            label="Number of Words"
            value={numWords.toString()}
            onValueChange={(val) => setNumWords(Math.max(1, Number.parseInt(val) || 1))}
            min={1}
            variant="bordered"
            size="sm"
            startContent={<Type className="w-4 h-4 text-default-400" />}
            classNames={{
              inputWrapper: "bg-default-100/50",
            }}
          />
        )
      case "lists":
        return (
          <div className="space-y-4">
            <RadioGroup
              label="List Type"
              orientation="horizontal"
              value={listType}
              onValueChange={setListType}
              size="sm"
            >
              <Radio value="ul">Unordered (ul)</Radio>
              <Radio value="ol">Ordered (ol)</Radio>
            </RadioGroup>
            <Input
              type="number"
              label="Number of List Items"
              value={numListItems.toString()}
              onValueChange={(val) => setNumListItems(Math.max(1, Number.parseInt(val) || 1))}
              min={1}
              variant="bordered"
              size="sm"
              startContent={<ListOrdered className="w-4 h-4 text-default-400" />}
              classNames={{
                inputWrapper: "bg-default-100/50",
              }}
            />
            <Input
              type="number"
              label="Words per List Item"
              value={wordsPerListItem.toString()}
              onValueChange={(val) => setWordsPerListItem(Math.max(3, Number.parseInt(val) || 3))}
              min={3}
              variant="bordered"
              size="sm"
              startContent={<Type className="w-4 h-4 text-default-400" />}
              classNames={{
                inputWrapper: "bg-default-100/50",
              }}
            />
          </div>
        )
  
case "headings":
  return (
    <div className="space-y-4">
      <Select
        label="Heading Level"
        defaultSelectedKeys={[headingLevel]}
        value={headingLevel}
        onChange={(e) => setHeadingLevel(e.target.value)}
        onSelectionChange={(keys) => {
          if (keys && Array.from(keys).length > 0) {
            const value = Array.from(keys)[0];
            setHeadingLevel(String(value));
          }
        }}
        variant="bordered"
        size="sm"
        disallowEmptySelection={true}
        aria-label="Select heading level"
        startContent={<HeadingIcon className="w-4 h-4 text-default-400" />}
        classNames={{
          trigger: "bg-default-100/50",
          base: "w-full",
          listbox: "max-h-[300px]",
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((level) => (
          <SelectItem key={level.toString()} textValue={`H${level}`} className="text-default-700">
            H{level}
          </SelectItem>
        ))}
      </Select>

      <Input
        type="number"
        label="Number of Headings"
        value={numHeadings.toString()}
        onValueChange={(val) => setNumHeadings(Math.max(1, Number.parseInt(val) || 1))}
        min={1}
        variant="bordered"
        size="sm"
        startContent={<HeadingIcon className="w-4 h-4 text-default-400" />}
        classNames={{
          inputWrapper: "bg-default-100/50",
        }}
      />
      <Input
        type="number"
        label="Words per Heading"
        value={wordsPerHeading.toString()}
        onValueChange={(val) => setWordsPerHeading(Math.max(2, Number.parseInt(val) || 2))}
        min={2}
        variant="bordered"
        size="sm"
        startContent={<Type className="w-4 h-4 text-default-400" />}
        classNames={{
          inputWrapper: "bg-default-100/50",
        }}
      />
    </div>
  )
      
      default:
        return null
    }
  }

  return (
    <ToolLayout
      title="Lorem Ipsum Generator"
      description="Create versatile dummy text for layout design, content testing, and mockups."
      toolId="678f382826f06f912191bc7e" // Keep your toolId
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* --- Controls Panel --- */}
        <Card className="lg:col-span-4 bg-default-50 dark:bg-default-100">
          <CardHeader className="pb-0">
            <h2 className="text-xl font-semibold flex items-center text-primary-600 dark:text-primary-400">
              <Settings2 size={20} className="mr-2" /> Generator Controls
            </h2>
          </CardHeader>
          <CardBody className="py-3 px-4">
            <div className="space-y-4">
              <Select
                label="Generation Type"
                placeholder="Select type"
                selectedKeys={new Set([generationType])}
                onSelectionChange={(keys) => {
                  const value = Array.from(keys)[0];
                  setGenerationType(String(value));
                }}
                variant="bordered"
                size="sm"
                startContent={<ChevronsUpDown className="w-4 h-4 text-default-400" />}
                classNames={{
                  trigger: "bg-default-100/50",
                }}
              >
                {generationTypes.map((type) => (
                  <SelectItem key={type.key} value={type.key} startContent={type.icon} className="text-default-700">
                    {type.label}
                  </SelectItem>
                ))}
              </Select>

              <Divider className="my-2" />

              {renderControls()}

              <Divider className="my-2" />

              <div className="space-y-3 pt-1">
                <Switch
                  isSelected={startWithLoremIpsum}
                  onValueChange={setStartWithLoremIpsum}
                  size="sm"
                  isDisabled={generationType === "words"} // "Start with" makes less sense for just random words
                  classNames={{
                    label: "text-sm",
                  }}
                >
                  Start with "Lorem ipsum..."
                </Switch>

                <Switch
                  isSelected={includeHTMLTags}
                  onValueChange={setIncludeHTMLTags}
                  size="sm"
                  isDisabled={generationType === "words" || generationType === "sentences"} // HTML tags less relevant for these types directly
                  classNames={{
                    label: "text-sm",
                  }}
                >
                  Include HTML Tags
                </Switch>
              </div>

              <Button
                color="primary"
                className="w-full mt-2"
                startContent={<Zap size={18} />}
                onPress={generateLoremIpsum}
                size="md"
              >
                Generate Text
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* --- Output Panel --- */}
        <Card className="lg:col-span-8 bg-default-50 dark:bg-default-100">
          <CardHeader className="flex justify-between items-center pb-0">
            <h2 className="text-xl font-semibold text-primary-600 dark:text-primary-400 flex items-center">
              <Type size={20} className="mr-2" /> Generated Text
            </h2>
            <div className="text-sm text-default-500 bg-default-100/50 px-3 py-1 rounded-full">
              {wordCount} words / {charCount} characters
            </div>
          </CardHeader>
          <CardBody className="py-3">
            <Textarea
              value={generatedText}
              readOnly
              placeholder="Your generated text will appear here..."
              minRows={12}
              maxRows={20}
              className="w-full"
              variant="bordered"
              classNames={{
                inputWrapper: "bg-default-100/50",
              }}
            />
          </CardBody>
          <CardFooter className="flex flex-wrap gap-2 justify-start pt-0">
            <Button
              color="primary"
              variant="flat"
              onPress={handleCopy}
              startContent={<Copy size={16} />}
              isDisabled={!generatedText}
              size="sm"
            >
              Copy
            </Button>
            <Button
              color="primary"
              variant="flat"
              onPress={handleDownload}
              startContent={<Download size={16} />}
              isDisabled={!generatedText}
              size="sm"
            >
              Download
            </Button>
            <Button
              color="secondary"
              variant="flat"
              onPress={handleShuffleWords}
              startContent={<Shuffle size={16} />}
              isDisabled={!generatedText}
              size="sm"
            >
              Shuffle
            </Button>
            <Button
              color="danger"
              variant="flat"
              onPress={handleClear}
              startContent={<RefreshCw size={16} />}
              isDisabled={!generatedText}
              size="sm"
            >
              Clear
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Info Section */}
      <InfoSection />
    </ToolLayout>
  )
}
