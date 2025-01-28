"use client"

import React, { useState, useCallback} from "react"
import { Card, CardBody, Button, Input, Checkbox, Textarea, } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"
import { Copy, Download, RefreshCw, Settings, Shuffle, Info, Lightbulb, BookOpen, ZapIcon, Type } from "lucide-react"
import { toast } from 'react-hot-toast';
import ToolLayout from "@/components/ToolLayout"

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
  "ut",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat",
  "duis",
  "aute",
  "irure",
  "dolor",
  "in",
  "reprehenderit",
  "in",
  "voluptate",
  "velit",
  "esse",
  "cillum",
  "dolore",
  "eu",
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
  "in",
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

export default function LoremIpsumGenerator() {
  const [generatedText, setGeneratedText] = useState("")
  const [paragraphs, setParagraphs] = useState(3)
  const [wordsPerParagraph, setWordsPerParagraph] = useState(50)
  const [startWithLoremIpsum, setStartWithLoremIpsum] = useState(true)
  const [includeHTMLTags, setIncludeHTMLTags] = useState(false)


  const generateLoremIpsum = useCallback(() => {
    let text = ""
    for (let i = 0; i < paragraphs; i++) {
      let paragraph = ""
      for (let j = 0; j < wordsPerParagraph; j++) {
        if (i === 0 && j === 0 && startWithLoremIpsum) {
          paragraph += "Lorem ipsum dolor sit amet, "
          j += 4
        } else {
          paragraph += loremIpsumWords[Math.floor(Math.random() * loremIpsumWords.length)] + " "
        }
      }
      text += includeHTMLTags ? `<p>${paragraph.trim()}</p>\n\n` : paragraph.trim() + "\n\n"
    }
    setGeneratedText(text.trim())
    toast.success("Lorem Ipsum text generated!");
  }, [paragraphs, wordsPerParagraph, startWithLoremIpsum, includeHTMLTags,])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(generatedText)
    toast.success("Text copied to clipboard",);
  }, [generatedText])


  const handleDownload = useCallback(() => {
    const blob = new Blob([generatedText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "lorem_ipsum.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("Text downloaded successfully");
  }, [generatedText])

  const handleClear = useCallback(() => {
    setGeneratedText("");
    toast.success("Text cleared");
  }, []);

  const handleShuffleWords = useCallback(() => {
    const shuffledText = generatedText
      .split("\n\n")
      .map((paragraph) =>
        paragraph
          .split(" ")
          .sort(() => Math.random() - 0.5)
          .join(" ")
      )
      .join("\n\n")
    setGeneratedText(shuffledText)
    toast.success("Text shuffled");
  }, [generatedText])

  return (
    <ToolLayout
      title="Lorem Ipsum Generator"
      description="Create dummy text for layout design or content testing"
      toolId="678f382826f06f912191bc7e"
    >
      <div className="flex flex-col gap-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                type="number"
                label="Number of Paragraphs"
                value={paragraphs.toString()}
                onChange={(e) => setParagraphs(Math.max(1, Number.parseInt(e.target.value)))}
                className="w-full"
                variant="bordered"
              />
              <Input
                type="number"
                label="Words per Paragraph"
                value={wordsPerParagraph.toString()}
                onChange={(e) => setWordsPerParagraph(Math.max(1, Number.parseInt(e.target.value)))}
                className="w-full"
                variant="bordered"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
              <Checkbox isSelected={startWithLoremIpsum} onValueChange={setStartWithLoremIpsum}>
                Start with "Lorem ipsum"
              </Checkbox>
              <Checkbox isSelected={includeHTMLTags} onValueChange={setIncludeHTMLTags}>
                Include HTML tags
              </Checkbox>
            </div>

            <Button
              color="primary"
              className="w-full"
              startContent={<Settings size={18} />}
              onPress={generateLoremIpsum}
            >
              Generate
            </Button>
            <Textarea
              value={generatedText}
              readOnly
              label="Generated Lorem Ipsum"
              placeholder="Your generated text will appear here..."
              minRows={8}
              className="w-full mt-8"
              variant="bordered"
            />
          </CardBody>
        </Card>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          
            <Button color="primary" onPress={handleCopy} startContent={<Copy size={18} />}>
              Copy
            </Button>
       
         
            <Button color="primary" onPress={handleDownload} startContent={<Download size={18} />}>
              Download
            </Button>
        
     
            <Button color="danger" onPress={handleClear} startContent={<RefreshCw size={18} />}>
              Clear
            </Button>
  
      
            <Button color="primary" onPress={handleShuffleWords} startContent={<Shuffle size={18} />}>
              Shuffle Words
            </Button>
    
        </div>
        {/* Info Section */}
          <Card className="mt-8 bg-default-50 dark:bg-default-100 p-4 md:p-8">
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                What is the Lorem Ipsum Generator?
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                The Lorem Ipsum Generator is a powerful tool designed for designers, developers, and content creators who need placeholder text for their projects. It goes beyond simple text generation, offering customizable options and additional features to make your workflow smoother. With its{" "}
                <Link href="#how-to-use" className="text-primary hover:underline">
                  user-friendly interface
                </Link>{" "}
                and advanced functionality, it's the perfect companion for layout design, content testing, and mockup creation.
              </p>
              <p className="text-sm md:text-base text-default-600 mb-4">
                Whether you're working on a website prototype, designing a brochure, or testing a new font, our Lorem Ipsum Generator provides you with the flexibility and control you need. It's like having a personal content filler right in your browser, tailored to your specific requirements!
              </p>

              <div className="my-8">
                <Image
                  src="/Images/LoremIpsumPreview.png"
                  alt="Screenshot of the Lorem Ipsum Generator interface showing text generation options and generated Lorem Ipsum text"
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
                How to Use the Lorem Ipsum Generator?
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>Set the number of paragraphs you want to generate using the "Number of Paragraphs" input.</li>
                <li>Adjust the "Words per Paragraph" to control the length of each paragraph.</li>
                <li>Choose whether to start with the classic "Lorem ipsum" phrase by toggling the checkbox.</li>
                <li>Decide if you want to include HTML paragraph tags in the output.</li>
                <li>Click the "Generate" button to create your Lorem Ipsum text.</li>
                <li>Use the "Copy" button to copy the generated text to your clipboard.</li>
                <li>Click "Download" to save the text as a .txt file for offline use.</li>
                <li>Use "Shuffle Words" to randomize the word order for more variety.</li>
                <li>Click "Clear" to reset the generator and start over.</li>
              </ol>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Features That Make Us Stand Out
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>
                  <ZapIcon className="w-4 h-4 inline-block mr-1" /> <strong>Instant Generation:</strong> Create Lorem Ipsum text with a single click
                </li>
                <li>
                  <Shuffle className="w-4 h-4 inline-block mr-1" /> <strong>Word Shuffling:</strong> Randomize word order for unique outputs
                </li>
                <li>
                  <Copy className="w-4 h-4 inline-block mr-1" /> <strong>One-Click Copying:</strong> Easily copy generated text to clipboard
                </li>
                <li>
                  <Download className="w-4 h-4 inline-block mr-1" /> <strong>Download Option:</strong> Save your Lorem Ipsum text as a file
                </li>
                <li>
                  <RefreshCw className="w-4 h-4 inline-block mr-1" /> <strong>Quick Reset:</strong> Clear function for easy start-over
                </li>
                <li>
                  <Type className="w-4 h-4 inline-block mr-1" /> <strong>HTML Tag Integration:</strong> Option to include HTML paragraph tags
                </li>
              </ul>
            </div>
          </Card>

      </div>
    </ToolLayout>
  );
  } 
