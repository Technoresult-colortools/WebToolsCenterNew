'use client';

import React, { useState, useCallback } from 'react';
import { Card, CardBody, Button, Select, SelectItem, Textarea } from "@nextui-org/react";
import Image from 'next/image'
import Link from 'next/link'
import { Copy, Download, Info, Lightbulb, BookOpen, RefreshCw, Undo2, Space, Slice, RefreshCcw, Type, Trash2, AlignJustify, SplitSquareHorizontal, Scissors, ZapIcon, Calculator, Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ToolLayout from '@/components/ToolLayout';


const MAX_CHARS = 5000;

function convertCase(text: string, caseType: string): string {
  switch (caseType) {
    case 'lower':
      return text.toLowerCase();
    case 'upper':
      return text.toUpperCase();
    case 'title':
      return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    case 'sentence':
      return text.split('. ').map(sentence => 
        sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase()
      ).join('. ');
    case 'camel':
      return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      ).replace(/\s+/g, '');
    case 'pascal':
      return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase()).replace(/\s+/g, '');
    case 'snake':
      return text.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '_');
    case 'kebab':
      return text.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-');
    case 'toggle':
      return text.split('').map(char => 
        char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
      ).join('');
    case 'alternate':
      return text.split(' ').map((word, index) => 
        index % 2 === 0 ? word.toLowerCase() : word.toUpperCase()
      ).join(' ');
    case 'dot':
      return text.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '.');
    default:
      return text;
  }
}

const caseOptions = [
  { value: "lower", label: "lowercase" },
  { value: "upper", label: "UPPERCASE" },
  { value: "title", label: "Title Case" },
  { value: "sentence", label: "Sentence case" },
  { value: "camel", label: "camelCase" },
  { value: "pascal", label: "PascalCase" },
  { value: "snake", label: "snake_case" },
  { value: "kebab", label: "kebab-case" },
  { value: "toggle", label: "ToGgLe CaSe" },
  { value: "alternate", label: "Alternate WORDS" },
  { value: "dot", label: "dot.case" }
];

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  // Add more languages as needed
]

const countWords = (text: string): number => {
  return text.trim().split(/\s+/).length;
};

const countCharacters = (text: string, excludeSpaces: boolean = false): number => {
  return excludeSpaces ? text.replace(/\s/g, '').length : text.length;
};

const estimateReadingTime = (text: string): number => {
  const wordsPerMinute = 200;
  const words = countWords(text);
  return Math.ceil(words / wordsPerMinute);
};

const getTextStatistics = (text: string) => {
  const words = text.trim().split(/\s+/);
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length;
  
  return {
    avgWordLength: avgWordLength.toFixed(2),
    sentenceCount: sentences.length
  };
};

export default function CaseConverter() {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [selectedCase, setSelectedCase] = React.useState("");
    const [selectedLanguage, setSelectedLanguage] = React.useState("en");
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const [readingTime, setReadingTime] = useState(0);
    const [textStats, setTextStats] = useState({ avgWordLength: '0', sentenceCount: 0 });
  
    const addToHistory = useCallback((text: string) => {
      setHistory(prev => [...prev, text]);
      setHistoryIndex(prev => prev + 1);
    }, []);
  
    const handleConvert = useCallback(() => {
      const converted = convertCase(inputText, selectedCase);
      setOutputText(converted);
      addToHistory(converted);
      toast.success('Text converted successfully');
    }, [inputText, selectedCase, addToHistory]);
  
    const handleCopy = useCallback(() => {
      navigator.clipboard.writeText(outputText);
      toast.success('Copied to clipboard');
    }, [outputText]);
  
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const text = e.target.value;
      if (text.length <= MAX_CHARS) {
        setInputText(text);
        setWordCount(countWords(text));
        setCharCount(countCharacters(text, true));
        setReadingTime(estimateReadingTime(text));
        setTextStats(getTextStatistics(text));
      } else {
        setInputText(text.slice(0, MAX_CHARS));
        toast.error(`Character limit of ${MAX_CHARS} reached`);
      }
    }, []);
  
    const handleDownload = useCallback(() => {
      const blob = new Blob([outputText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'converted_text.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Text downloaded successfully');
    }, [outputText]);
  
    const handleClear = useCallback(() => {
      setInputText('');
      setOutputText('');
      setHistory([]);
      setHistoryIndex(-1);
      toast.success('Text cleared');
    }, []);
  
    const handleReverse = useCallback(() => {
      const reversed = outputText.split('').reverse().join('');
      setOutputText(reversed);
      addToHistory(reversed);
      toast.success('Text reversed');
    }, [outputText, addToHistory]);
  
    const handleRemoveSpaces = useCallback(() => {
      const noSpaces = outputText.replace(/\s+/g, '');
      setOutputText(noSpaces);
      addToHistory(noSpaces);
      toast.success('Spaces removed');
    }, [outputText, addToHistory]);
  
    const handleTrim = useCallback(() => {
      const trimmed = outputText
        .replace(/^\s+/gm, '')
        .replace(/\s+$/gm, '')
        .replace(/\n\s*\n\s*\n/g, '\n\n');
      setOutputText(trimmed);
      addToHistory(trimmed);
      toast.success('Text trimmed');
    }, [outputText, addToHistory]);
  
    const handleCapitalizeWords = useCallback(() => {
      const capitalized = outputText.replace(/\b\w/g, char => char.toUpperCase());
      setOutputText(capitalized);
      addToHistory(capitalized);
      toast.success('Words capitalized');
    }, [outputText, addToHistory]);
  
    const handleRemoveDuplicateLines = useCallback(() => {
      const uniqueLines = Array.from(new Set(outputText.split('\n'))).join('\n');
      setOutputText(uniqueLines);
      addToHistory(uniqueLines);
      toast.success('Duplicate lines removed');
    }, [outputText, addToHistory]);
  
    const handleUndo = useCallback(() => {
      if (historyIndex > 0) {
        setHistoryIndex(prev => prev - 1);
        setOutputText(history[historyIndex - 1]);
        toast.success('Undo successful');
      } else {
        toast.error('No more undo history');
      }
    }, [history, historyIndex]);

    return (
      <ToolLayout
        title="Case Converter"
        description="Transform your text into any case format with our powerful case converter tool. Support for camelCase, PascalCase, snake_case, and more!"
        toolId="678f33831fa2b06f4b7ef590"
      >
        <div className="flex flex-col gap-8">
          {/* Input Section */}
          <Card className="bg-default-50 dark:bg-default-100">
            <CardBody className="p-6">
              <label className="block text-lg font-medium text-default-700 mb-2">Input Text:</label>
              <Textarea
                value={inputText}
                onChange={handleInputChange}
                placeholder="Enter your text here..."
                minRows={4}
                size="lg"
                className="mb-2"
                variant="bordered"
              />
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-default-600">
                <div>Words: {wordCount}</div>
                <div>Characters (no spaces): {charCount}</div>
                <div>Reading time: {readingTime} min</div>
                <div>Sentences: {textStats.sentenceCount}</div>
                <div>Avg. word length: {textStats.avgWordLength}</div>
              </div>
              <p className="text-sm text-default-500 mt-2">
                {inputText.length}/{MAX_CHARS} characters
              </p>
  
              <div className="flex gap-4 mt-4">
                <Select
                  label="Select a case"
                  className="flex-1"
                  variant="bordered"
                  selectedKeys={[selectedCase]}
                  onChange={(e) => setSelectedCase(e.target.value)}
                  classNames={{
                    trigger: "bg-default-100 data-[hover=true]:bg-default-200",
                  }}
                >
                  {caseOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-default-700">
                      {option.label}
                    </SelectItem>
                  ))}
                </Select>
  
                <Select
                  label="Select language"
                  className="flex-1"
                  variant="bordered"
                  selectedKeys={[selectedLanguage]}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  classNames={{
                    trigger: "bg-default-100 data-[hover=true]:bg-default-200",
                  }}
                >
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value} className="text-default-700">
                      {lang.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
  
              <Button
                onClick={handleConvert}
                className="w-full mt-4"
                color="primary"
                startContent={<RefreshCcw className="h-5 w-5" />}
              >
                Convert
              </Button>
            </CardBody>
          </Card>
  
          {/* Action Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            <Button color="primary" onClick={handleCopy} startContent={<Copy className="h-4 w-4" />}>
              Copy
            </Button>
            <Button color="primary" onClick={handleDownload} startContent={<Download className="h-4 w-4" />}>
              Download
            </Button>
            <Button color="primary" onClick={handleReverse} startContent={<Undo2 className="h-4 w-4" />}>
              Reverse
            </Button>
            <Button color="primary" onClick={handleRemoveSpaces} startContent={<Space className="h-4 w-4" />}>
              No Spaces
            </Button>
            <Button color="primary" onClick={handleTrim} startContent={<Slice className="h-4 w-4" />}>
              Trim
            </Button>
            <Button color="primary" onClick={handleCapitalizeWords} startContent={<Type className="h-4 w-4" />}>
              Capitalize
            </Button>
            <Button
              color="primary"
              onClick={handleRemoveDuplicateLines}
              startContent={<SplitSquareHorizontal className="h-4 w-4" />}
            >
              Unique Lines
            </Button>
            <Button color="danger" onClick={handleClear} startContent={<Trash2 className="h-4 w-4" />}>
              Clear
            </Button>
            <Button
              color="default"
              onClick={handleUndo}
              isDisabled={historyIndex <= 0}
              startContent={<RefreshCw className="h-4 w-4" />}
            >
              Undo
            </Button>
          </div>
  
          {/* Output Section */}
          <Card className="bg-default-50 dark:bg-default-100">
            <CardBody className="p-6">
              <label className="block text-lg font-medium text-default-700 mb-2">Output Text:</label>
              <Textarea value={outputText} isReadOnly minRows={4} size="lg" className="mb-4" variant="bordered" />
            </CardBody>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="mt-8 bg-default-50 dark:bg-default-100 p-4 md:p-8">
       
            <div className="rounded-xl  p-2 md:p-4 max-w-6xl mx-auto">
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                What is the Case Converter?
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                The Case Converter is a versatile text transformation tool designed for writers, developers, and content creators. It offers a wide range of text case conversions and manipulation features, all wrapped up in a <Link href="#how-to-use" className="text-primary hover:underline">user-friendly interface</Link>. Whether you need to quickly change text case for coding conventions, content formatting, or creative writing, our Case Converter has got you covered.
              </p>
              <p className="text-sm md:text-base text-default-600 mb-4">
                With support for multiple case types and additional text manipulation features, it's like having a Swiss Army knife for text editing right at your fingertips. Say goodbye to manual text reformatting and hello to efficiency!
              </p>

              <div className="my-8">
                <Image 
                  src="/Images/CaseConverterPreview.png?height=400&width=600" 
                  alt="Screenshot of the Case Converter interface showing various case conversion options and text manipulation tools" 
                  width={600} 
                  height={400} 
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>

              <h2 id="how-to-use" className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use the Case Converter?
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                Using our Case Converter is as easy as 1-2-3. Here's a quick guide to get you started:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
                <li>Enter or paste your text into the input box. Don't worry about the current formatting - we'll take care of that!</li>
                <li>Choose your desired case conversion from the <Link href="#case-types" className="text-primary hover:underline">dropdown menu</Link>. We offer everything from lowercase to camelCase and beyond.</li>
                <li>Click the "Convert" button and watch as your text is instantly transformed.</li>
                <li>Need more tweaks? Use our additional <Link href="#text-tools" className="text-primary hover:underline">text manipulation tools</Link> to further refine your text.</li>
                <li>Copy your converted text to the clipboard with a single click, or download it as a text file.</li>
                <li>Experiment freely! Our undo/redo feature lets you try different options without losing your work.</li>
              </ol>

              <h2 id="case-types" className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Type className="w-6 h-6 mr-2" />
                Supported Case Types
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                Our Case Converter supports a wide range of text case transformations to suit every need:
              </p>
              <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
                <li><strong>lowercase</strong>: Convert all characters to lowercase</li>
                <li><strong>UPPERCASE</strong>: Transform all characters to uppercase</li>
                <li><strong>Title Case</strong>: Capitalize the first letter of each word</li>
                <li><strong>Sentence case</strong>: Capitalize the first letter of each sentence</li>
                <li><strong>camelCase</strong>: Join words and capitalize each word after the first</li>
                <li><strong>PascalCase</strong>: Similar to camelCase, but capitalize the first word too</li>
                <li><strong>snake_case</strong>: Replace spaces with underscores and use all lowercase</li>
                <li><strong>kebab-case</strong>: Replace spaces with hyphens and use all lowercase</li>
                <li><strong>ToGgLe CaSe</strong>: Alternate between uppercase and lowercase for each character</li>
                <li><strong>Alternate CASE</strong>: Alternate between lowercase and uppercase for each word</li>
                <li><strong>dot.case</strong>: Replace spaces with dots and use all lowercase</li>
              </ul>

              <h2 id="text-tools" className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Scissors className="w-6 h-6 mr-2" />
                Additional Text Manipulation Tools
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                Beyond case conversion, our tool offers several handy text manipulation features:
              </p>
              <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
                <li><strong>Reverse Text</strong>: Flip your text backwards</li>
                <li><strong>Remove Spaces</strong>: Eliminate all spaces from your text</li>
                <li><strong>Trim</strong>: Remove leading and trailing whitespace, and reduce multiple line breaks</li>
                <li><strong>Capitalize Words</strong>: Capitalize the first letter of every word</li>
                <li><strong>Remove Duplicate Lines</strong>: Keep only unique lines in your text</li>
              </ul>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Features That Make Us Stand Out
              </h2>
              <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
                <li><ZapIcon className="w-4 h-4 inline-block mr-1" /> <strong>Lightning-fast conversions</strong>: Transform your text instantly</li>
                <li><RefreshCw className="w-4 h-4 inline-block mr-1" /> <strong>Undo/Redo functionality</strong>: Experiment without fear</li>
                <li><AlignJustify className="w-4 h-4 inline-block mr-1" /> <strong>Multiple case types</strong>: 11 different case conversions to choose from</li>
                <li><Scissors className="w-4 h-4 inline-block mr-1" /> <strong>Additional text tools</strong>: Go beyond simple case conversion</li>
                <li><Type className="w-4 h-4 inline-block mr-1" /> <strong>Character count</strong>: Keep track of your text length</li>
                <li><Calculator className="w-4 h-4 inline-block mr-1" /> <strong>Text statistics</strong>: Get word count, character count, and more</li>
                <li><Clock className="w-4 h-4 inline-block mr-1" /> <strong>Reading time estimation</strong>: Know how long it takes to read your text</li>
              </ul>

              <p className="text-sm md:text-base text-default-600 mt-4">
                Ready to transform your text with ease? Dive into our Case Converter and experience the power of efficient text manipulation. Whether you're a coder adhering to naming conventions, a writer perfecting your prose, or just someone who loves playing with text, our tool is here to make your life easier. Start converting and see the difference for yourself!
              </p>
            </div>

        </Card>

     </ToolLayout>
  );
}

