'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardBody, Button, Select, SelectItem, Textarea } from "@nextui-org/react";
import { Copy, Download, Info, Lightbulb, BookOpen, RefreshCw, Undo2, Space, Slice, RefreshCcw, Type, Trash2, AlignJustify, SplitSquareHorizontal, Scissors, ZapIcon, Calculator, Clock, Globe } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ToolLayout from '@/components/ToolLayout';
import Image from 'next/image';
import Link from 'next/link';

const MAX_CHARS = 5000;

const languageRules: Record<string, {
  titleCase: (word: string) => string;
  excludedWords: Set<string>;
  name: string;
}> = {
  en: {
    titleCase: (word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    excludedWords: new Set(['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'from', 'by', 'with', 'in', 'of']),
    name: "English"
  },
  es: {
    titleCase: (word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    excludedWords: new Set(['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'y', 'o', 'para', 'por', 'en', 'de', 'a', 'con']),
    name: "Spanish"
  },
  fr: {
    titleCase: (word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    excludedWords: new Set(['le', 'la', 'les', 'un', 'une', 'des', 'et', 'ou', 'pour', 'par', 'en', 'de', 'à', 'avec']),
    name: "French"
  },
  de: {
    // German capitalizes all nouns, but we can't reliably detect nouns without NLP
    // So we just capitalize the first letter of each word for title case
    titleCase: (word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    excludedWords: new Set(['der', 'die', 'das', 'ein', 'eine', 'und', 'oder', 'für', 'von', 'mit', 'in', 'auf', 'zu']),
    name: "German"
  },
  it: {
    titleCase: (word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    excludedWords: new Set(['il', 'lo', 'la', 'i', 'gli', 'le', 'un', 'uno', 'una', 'e', 'o', 'per', 'di', 'a', 'da', 'in', 'con']),
    name: "Italian"
  },
  pt: {
    titleCase: (word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    excludedWords: new Set(['o', 'a', 'os', 'as', 'um', 'uma', 'uns', 'umas', 'e', 'ou', 'para', 'por', 'em', 'de', 'com']),
    name: "Portuguese"
  },
  ru: {
    titleCase: (word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    excludedWords: new Set(['и', 'или', 'но', 'а', 'в', 'на', 'с', 'из', 'по', 'о', 'к', 'у']),
    name: "Russian"
  },
  zh: {
    // Chinese doesn't have case, but we keep the function for consistency
    titleCase: (word: string) => word,
    excludedWords: new Set([]),
    name: "Chinese"
  },
  ja: {
    // Japanese doesn't have case, but we keep the function for consistency
    titleCase: (word: string) => word,
    excludedWords: new Set([]),
    name: "Japanese"
  },
  ar: {
    titleCase: (word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    excludedWords: new Set(['في', 'من', 'إلى', 'على', 'و', 'أو', 'مع']),
    name: "Arabic"
  }
};

// Detect language based on characters and common words
const detectLanguage = (text: string): string => {
  if (!text.trim()) return 'en';
  
  // Check for non-latin character sets
  const charSets = {
    zh: /[\u4E00-\u9FFF]/g, // Chinese
    ja: /[\u3040-\u309F\u30A0-\u30FF]/g, // Japanese
    ru: /[\u0400-\u04FF]/g, // Cyrillic
    ar: /[\u0600-\u06FF]/g, // Arabic
  };
  
  for (const [lang, regex] of Object.entries(charSets)) {
    if (regex.test(text)) return lang;
  }
  
  // Check for common words in different languages
  const commonWords = {
    en: ['the', 'and', 'is', 'in', 'to', 'it', 'that', 'for'],
    es: ['el', 'la', 'los', 'y', 'es', 'en', 'que', 'por'],
    fr: ['le', 'la', 'les', 'et', 'est', 'dans', 'que', 'pour'],
    de: ['der', 'die', 'das', 'und', 'ist', 'in', 'zu', 'für'],
    it: ['il', 'la', 'e', 'è', 'che', 'per', 'non', 'con'],
    pt: ['o', 'a', 'e', 'é', 'que', 'para', 'não', 'em'],
  };
  
  const words = text.toLowerCase().split(/\s+/);
  const langScores = {} as {[key: string]: number};
  
  for (const [lang, wordList] of Object.entries(commonWords)) {
    langScores[lang] = 0;
    for (const word of words) {
      if (wordList.includes(word)) {
        langScores[lang]++;
      }
    }
  }
  
  const maxLang = Object.entries(langScores).reduce((max, [lang, score]) => 
    score > max[1] ? [lang, score] : max, ['en', 0]);
  
  return maxLang[1] > 0 ? maxLang[0] : 'en';
};

// Language-aware case conversion
function convertCase(text: string, caseType: string, language: string = 'en'): string {
  // Use language rules if available, fallback to English
  const rules = languageRules[language as keyof typeof languageRules] || languageRules.en;
  
  switch (caseType) {
    case 'lower':
      return text.toLowerCase();
      
    case 'upper':
      return text.toUpperCase();
      
    case 'title':
      // Language-aware title case
      return text.split(' ').map((word, index, arr) => {
        // Always capitalize first and last word
        if (index === 0 || index === arr.length - 1) {
          return rules.titleCase(word);
        }
        // For excluded words, only capitalize if they're not in the exclusion list
        return rules.excludedWords.has(word.toLowerCase()) ? word.toLowerCase() : rules.titleCase(word);
      }).join(' ');
      
    case 'sentence':
      // Language-aware sentence case
      return text.split('. ').map(sentence => {
        if (!sentence.trim()) return sentence;
        return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();
      }).join('. ');
      
    case 'camel':
      // For languages without spaces like Chinese/Japanese, we can't really do camelCase
      if (language === 'zh' || language === 'ja') {
        toast(`CamelCase isn't applicable to ${rules.name}`);
        return text;
      }
      return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      ).replace(/\s+/g, '');
      
    case 'pascal':
      if (language === 'zh' || language === 'ja') {
        toast(`PascalCase isn't applicable to ${rules.name}`);
        return text;
      }
      return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase()).replace(/\s+/g, '');
      
    case 'snake':
      if (language === 'zh' || language === 'ja') {
        toast(`snake_case isn't applicable to ${rules.name}`);
        return text;
      }
      return text.toLowerCase().replace(/[^a-zA-Z0-9\u0400-\u04FF\u0600-\u06FF\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+/g, '_');
      
    case 'kebab':
      if (language === 'zh' || language === 'ja') {
        toast(`kebab-case isn't applicable to ${rules.name}`);
        return text;
      }
      return text.toLowerCase().replace(/[^a-zA-Z0-9\u0400-\u04FF\u0600-\u06FF\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+/g, '-');
      
    case 'toggle':
      // Toggle case should work for most alphabets
      return text.split('').map(char => 
        char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
      ).join('');
      
    case 'alternate':
      // Alternate case works for languages with spaces
      if (language === 'zh' || language === 'ja') {
        toast(`Alternate case isn't applicable to ${rules.name}`);
        return text;
      }
      return text.split(' ').map((word, index) => 
        index % 2 === 0 ? word.toLowerCase() : word.toUpperCase()
      ).join(' ');
      
    case 'dot':
      if (language === 'zh' || language === 'ja') {
        toast(`dot.case isn't applicable to ${rules.name}`);
        return text;
      }
      return text.toLowerCase().replace(/[^a-zA-Z0-9\u0400-\u04FF\u0600-\u06FF\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+/g, '.');
      
    default:
      return text;
  }
}

// Expanded language options
const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "it", label: "Italiano" },
  { value: "pt", label: "Português" },
  { value: "ru", label: "Русский" },
  { value: "zh", label: "中文" },
  { value: "ja", label: "日本語" },
  { value: "ar", label: "العربية" },
  { value: "auto", label: "Auto Detect" }
];

// Helper function for case options based on language
const getCaseOptions = (language: string) => {
  const commonOptions = [
    { value: "lower", label: "lowercase" },
    { value: "upper", label: "UPPERCASE" },
    { value: "title", label: "Title Case" },
    { value: "sentence", label: "Sentence case" },
    { value: "toggle", label: "ToGgLe CaSe" },
  ];
  
  // For languages that don't use spaces like Chinese or Japanese,
  // we don't show options that depend on word boundaries
  if (language === 'zh' || language === 'ja') {
    return commonOptions;
  }
  
  return [
    ...commonOptions,
    { value: "camel", label: "camelCase" },
    { value: "pascal", label: "PascalCase" },
    { value: "snake", label: "snake_case" },
    { value: "kebab", label: "kebab-case" },
    { value: "alternate", label: "Alternate WORDS" },
    { value: "dot", label: "dot.case" }
  ];
};

const countWords = (text: string, language: string): number => {
  if (language === 'zh' || language === 'ja') {
    // Estimate word count for character-based languages
    return Math.ceil(text.length / 2);
  }
  return text.trim().split(/\s+/).filter(Boolean).length;
};

const countCharacters = (text: string, excludeSpaces: boolean = false): number => {
  return excludeSpaces ? text.replace(/\s/g, '').length : text.length;
};

// Update estimateReadingTime function
const estimateReadingTime = (text: string, language: string): number => {
  const wordsPerMinute: Record<string, number> = {
    en: 200,
    es: 180,
    fr: 190,
    de: 170,
    it: 185,
    pt: 190,
    ru: 160,
    zh: 140, // Character-based languages are read differently
    ja: 150,
    ar: 155
  };
  
  const wpm = wordsPerMinute[language] || 200;
  const words = countWords(text, language);
  return Math.ceil(words / wpm);
};

const getTextStatistics = (text: string, language: string) => {
  if (!text.trim()) {
    return {
      avgWordLength: '0',
      sentenceCount: 0
    };
  }
  
  // Handle different language sentence patterns
  let sentenceSplitter = /[.!?]+/;
  if (language === 'zh') sentenceSplitter = /[。！？]+/;
  if (language === 'ja') sentenceSplitter = /[。！？、]+/;
  
  // Words in character-based languages function differently
  let words = [];
  let avgWordLength = 0;
  
  if (language === 'zh' || language === 'ja') {
    // Characters are closer to "words" in these languages
    words = text.split('');
    avgWordLength = 1; // Character is a unit
  } else {
    words = text.trim().split(/\s+/).filter(Boolean);
    avgWordLength = words.length ? words.reduce((sum, word) => sum + word.length, 0) / words.length : 0;
  }
  
  const sentences = text.split(sentenceSplitter).filter(Boolean);
  
  return {
    avgWordLength: avgWordLength.toFixed(2),
    sentenceCount: sentences.length
  };
};

export default function CaseConverter() {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [selectedCase, setSelectedCase] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("en");
    const [detectedLanguage, setDetectedLanguage] = useState("en");
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const [readingTime, setReadingTime] = useState(0);
    const [textStats, setTextStats] = useState({ avgWordLength: '0', sentenceCount: 0 });
    const [availableCaseOptions, setAvailableCaseOptions] = useState(getCaseOptions('en'));
  
    // Auto-detect language when input changes
    useEffect(() => {
      if (inputText.trim() && selectedLanguage === 'auto') {
        const detectedLang = detectLanguage(inputText);
        setDetectedLanguage(detectedLang);
        setAvailableCaseOptions(getCaseOptions(detectedLang));
        updateTextStats(inputText, detectedLang);
      } else {
        setDetectedLanguage(selectedLanguage);
        setAvailableCaseOptions(getCaseOptions(selectedLanguage));
        updateTextStats(inputText, selectedLanguage);
      }
    }, [inputText, selectedLanguage]);
    
    // Update case options when language changes
    useEffect(() => {
      setAvailableCaseOptions(getCaseOptions(selectedLanguage === 'auto' ? detectedLanguage : selectedLanguage));
    }, [selectedLanguage, detectedLanguage]);
    
    const updateTextStats = (text: string, lang: string) => {
      setWordCount(countWords(text, lang));
      setCharCount(countCharacters(text, true));
      setReadingTime(estimateReadingTime(text, lang));
      setTextStats(getTextStatistics(text, lang));
    };
  
    const addToHistory = useCallback((text: string) => {
      setHistory(prev => [...prev, text]);
      setHistoryIndex(prev => prev + 1);
    }, []);
  
    const handleConvert = useCallback(() => {
      const langToUse = selectedLanguage === 'auto' ? detectedLanguage : selectedLanguage;
      const converted = convertCase(inputText, selectedCase, langToUse);
      setOutputText(converted);
      addToHistory(converted);
      toast.success('Text converted successfully');
    }, [inputText, selectedCase, selectedLanguage, detectedLanguage, addToHistory]);
  
    const handleCopy = useCallback(() => {
      navigator.clipboard.writeText(outputText);
      toast.success('Copied to clipboard');
    }, [outputText]);
  
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const text = e.target.value;
      if (text.length <= MAX_CHARS) {
        setInputText(text);
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
      const langToUse = selectedLanguage === 'auto' ? detectedLanguage : selectedLanguage;
      // Handle differently for character-based languages
      let capitalized = outputText;
      
      if (langToUse === 'zh' || langToUse === 'ja') {
        toast(`Word capitalization isn't applicable to ${languageRules[langToUse as keyof typeof languageRules].name}`);
      } else {
        capitalized = outputText.replace(/\b\w/g, char => char.toUpperCase());
        setOutputText(capitalized);
        addToHistory(capitalized);
        toast.success('Words capitalized');
      }
    }, [outputText, addToHistory, selectedLanguage, detectedLanguage]);
  
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
    
    // Language auto-detection function
    const handleAutoDetect = useCallback(() => {
      if (!inputText.trim()) {
        toast.error('Please enter some text to detect language');
        return;
      }
      
      const detectedLang = detectLanguage(inputText);
      setDetectedLanguage(detectedLang);
      setSelectedLanguage('auto');
      const langName = languageRules[detectedLang as keyof typeof languageRules]?.name || 'Unknown';
      toast.success(`Detected language: ${langName}`);
    }, [inputText]);

    return (
      <ToolLayout
        title="Case Converter"
        description="Transform your text into any case format with our powerful multi-language case converter tool. Support for camelCase, PascalCase, snake_case, and more across 10+ languages!"
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
                {selectedLanguage === 'auto' && detectedLanguage !== 'en' && (
                  <div>Detected: {languageRules[detectedLanguage as keyof typeof languageRules]?.name || 'Unknown'}</div>
                )}
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
                  {availableCaseOptions.map((option) => (
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
                  startContent={<Globe className="h-4 w-4" />}
                >
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value} className="text-default-700">
                      {lang.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
  
              <div className="flex gap-4 mt-4">
                <Button
                  onClick={handleAutoDetect}
                  className="flex-1"
                  color="secondary"
                  startContent={<Globe className="h-5 w-5" />}
                >
                  Detect Language
                </Button>
              
                <Button
                  onClick={handleConvert}
                  className="flex-1"
                  color="primary"
                  startContent={<RefreshCcw className="h-5 w-5" />}
                  isDisabled={!inputText.trim() || !selectedCase}
                >
                  Convert
                </Button>
              </div>
            </CardBody>
          </Card>
  
          {/* Action Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            <Button color="primary" onClick={handleCopy} startContent={<Copy className="h-4 w-4" />} isDisabled={!outputText}>
              Copy
            </Button>
            <Button color="primary" onClick={handleDownload} startContent={<Download className="h-4 w-4" />} isDisabled={!outputText}>
              Download
            </Button>
            <Button color="primary" onClick={handleReverse} startContent={<Undo2 className="h-4 w-4" />} isDisabled={!outputText}>
              Reverse
            </Button>
            <Button color="primary" onClick={handleRemoveSpaces} startContent={<Space className="h-4 w-4" />} isDisabled={!outputText}>
              No Spaces
            </Button>
            <Button color="primary" onClick={handleTrim} startContent={<Slice className="h-4 w-4" />} isDisabled={!outputText}>
              Trim
            </Button>
            <Button color="primary" onClick={handleCapitalizeWords} startContent={<Type className="h-4 w-4" />} isDisabled={!outputText}>
              Capitalize
            </Button>
            <Button
              color="primary"
              onClick={handleRemoveDuplicateLines}
              startContent={<SplitSquareHorizontal className="h-4 w-4" />}
              isDisabled={!outputText}
            >
              Unique Lines
            </Button>
            <Button color="danger" onClick={handleClear} startContent={<Trash2 className="h-4 w-4" />} isDisabled={!inputText && !outputText}>
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
              The Case Converter is an adaptable text transformation utility made especially for writers, developers, and all other content creators. The Case Converter is packed with a large variety of text case conversions and manipulation functionalities in one easy to use web application. Whether you're changing text case quickly for coding conventions, to format content or for creative writing, the Case Converter has your needs covered.
              </p>
              <p className="text-sm md:text-base text-default-600 mb-4">
              With multiple case options and some other text manipulation functionality, it's a bit like having a Swiss Army knife for text editing in your hands. End text re-formatting manually, and say hello to an efficient process.
              </p>

              <div className="my-8">
                <Image 
                  src="/Images/InfosectionImages/CaseconverterPreview.png?height=400&width=600" 
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

