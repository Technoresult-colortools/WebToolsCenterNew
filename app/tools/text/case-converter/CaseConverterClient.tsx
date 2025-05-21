"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Textarea,
  Tabs,
  Tab,
  Chip,
  Progress,
  Switch,
  Select,
  SelectItem,
  Divider,
  Tooltip,
  Badge,
} from "@nextui-org/react"
import {
  Copy,
  Download,
  FileText,
  Trash2,
  Settings2,
  Braces,
  ArrowRightLeft,
  Type,
  Hash,
  Undo2,
  Space,
  Slice,
  SplitSquareHorizontal,
  RefreshCw,
  Globe,
  AlignJustify,
  Keyboard,
  Zap,
  Calculator,
  Clock,
  Scissors,
  Baseline,
  Heading1,
  Heading2,
  CaseSensitive,
  CaseLowerIcon,
  CaseUpperIcon,
  Indent,
  Minus,
  Maximize2,
  Minimize2,
  RotateCcw,
  Wand2,
  Layers,
  Check,
  History,
} from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import InfoSection from "./InfoSection"

const MAX_CHARS = 10000 // Increased character limit

// Language rules for case conversion
const languageRules: Record<
  string,
  {
    titleCase: (word: string) => string
    excludedWords: Set<string>
    name: string
  }
> = {
  en: {
    titleCase: (word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    excludedWords: new Set([
      "a",
      "an",
      "the",
      "and",
      "but",
      "or",
      "for",
      "nor",
      "on",
      "at",
      "to",
      "from",
      "by",
      "with",
      "in",
      "of",
    ]),
    name: "English",
  },
  es: {
    titleCase: (word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    excludedWords: new Set([
      "el",
      "la",
      "los",
      "las",
      "un",
      "una",
      "unos",
      "unas",
      "y",
      "o",
      "para",
      "por",
      "en",
      "de",
      "a",
      "con",
    ]),
    name: "Spanish",
  },
  fr: {
    titleCase: (word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    excludedWords: new Set(["le", "la", "les", "un", "une", "des", "et", "ou", "pour", "par", "en", "de", "à", "avec"]),
    name: "French",
  },
  de: {
    // German capitalizes all nouns, but we can't reliably detect nouns without NLP
    // So we just capitalize the first letter of each word for title case
    titleCase: (word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    excludedWords: new Set(["der", "die", "das", "ein", "eine", "und", "oder", "für", "von", "mit", "in", "auf", "zu"]),
    name: "German",
  },
  it: {
    titleCase: (word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    excludedWords: new Set([
      "il",
      "lo",
      "la",
      "i",
      "gli",
      "le",
      "un",
      "uno",
      "una",
      "e",
      "o",
      "per",
      "di",
      "a",
      "da",
      "in",
      "con",
    ]),
    name: "Italian",
  },
  pt: {
    titleCase: (word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    excludedWords: new Set([
      "o",
      "a",
      "os",
      "as",
      "um",
      "uma",
      "uns",
      "umas",
      "e",
      "ou",
      "para",
      "por",
      "em",
      "de",
      "com",
    ]),
    name: "Portuguese",
  },
  ru: {
    titleCase: (word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    excludedWords: new Set(["и", "или", "но", "а", "в", "на", "с", "из", "по", "о", "к", "у"]),
    name: "Russian",
  },
  zh: {
    // Chinese doesn't have case, but we keep the function for consistency
    titleCase: (word: string) => word,
    excludedWords: new Set([]),
    name: "Chinese",
  },
  ja: {
    // Japanese doesn't have case, but we keep the function for consistency
    titleCase: (word: string) => word,
    excludedWords: new Set([]),
    name: "Japanese",
  },
  ar: {
    titleCase: (word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    excludedWords: new Set(["في", "من", "إلى", "على", "و", "أو", "مع"]),
    name: "Arabic",
  },
}

// Detect language based on characters and common words
const detectLanguage = (text: string): string => {
  if (!text.trim()) return "en"

  // Check for non-latin character sets
  const charSets = {
    zh: /[\u4E00-\u9FFF]/g, // Chinese
    ja: /[\u3040-\u309F\u30A0-\u30FF]/g, // Japanese
    ru: /[\u0400-\u04FF]/g, // Cyrillic
    ar: /[\u0600-\u06FF]/g, // Arabic
  }

  for (const [lang, regex] of Object.entries(charSets)) {
    if (regex.test(text)) return lang
  }

  // Check for common words in different languages
  const commonWords = {
    en: ["the", "and", "is", "in", "to", "it", "that", "for"],
    es: ["el", "la", "los", "y", "es", "en", "que", "por"],
    fr: ["le", "la", "les", "et", "est", "dans", "que", "pour"],
    de: ["der", "die", "das", "und", "ist", "in", "zu", "für"],
    it: ["il", "la", "e", "è", "che", "per", "non", "con"],
    pt: ["o", "a", "e", "é", "que", "para", "não", "em"],
  }

  const words = text.toLowerCase().split(/\s+/)
  const langScores: Record<string, number> = {}

  for (const [lang, wordList] of Object.entries(commonWords)) {
    langScores[lang] = 0
    for (const word of words) {
      if (wordList.includes(word)) {
        langScores[lang]++
      }
    }
  }

  const maxLang = Object.entries(langScores).reduce(
    (max, [lang, score]) => (score > max[1] ? [lang, score] : max),
    ["en", 0],
  )

  return maxLang[1] > 0 ? maxLang[0] : "en"
}

// Language-aware case conversion
function convertCase(text: string, caseType: string, language = "en"): string {
  // Use language rules if available, fallback to English
  const rules = languageRules[language as keyof typeof languageRules] || languageRules.en

  switch (caseType) {
    case "lower":
      return text.toLowerCase()

    case "upper":
      return text.toUpperCase()

    case "title":
      // Language-aware title case
      return text
        .split(" ")
        .map((word, index, arr) => {
          // Always capitalize first and last word
          if (index === 0 || index === arr.length - 1) {
            return rules.titleCase(word)
          }
          // For excluded words, only capitalize if they're not in the exclusion list
          return rules.excludedWords.has(word.toLowerCase()) ? word.toLowerCase() : rules.titleCase(word)
        })
        .join(" ")

    case "sentence":
      // Language-aware sentence case
      return text
        .split(". ")
        .map((sentence) => {
          if (!sentence.trim()) return sentence
          return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase()
        })
        .join(". ")

    case "camel":
      // For languages without spaces like Chinese/Japanese, we can't really do camelCase
      if (language === "zh" || language === "ja") {
        toast(`CamelCase isn't applicable to ${rules.name}`)
        return text
      }
      return text
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase()))
        .replace(/\s+/g, "")

    case "pascal":
      if (language === "zh" || language === "ja") {
        toast(`PascalCase isn't applicable to ${rules.name}`)
        return text
      }
      return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase()).replace(/\s+/g, "")

    case "snake":
      if (language === "zh" || language === "ja") {
        toast(`snake_case isn't applicable to ${rules.name}`)
        return text
      }
      return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\u0400-\u04FF\u0600-\u06FF\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+/g, "_")

    case "kebab":
      if (language === "zh" || language === "ja") {
        toast(`kebab-case isn't applicable to ${rules.name}`)
        return text
      }
      return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\u0400-\u04FF\u0600-\u06FF\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+/g, "-")

    case "toggle":
      // Toggle case should work for most alphabets
      return text
        .split("")
        .map((char) => (char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()))
        .join("")

    case "alternate":
      // Alternate case works for languages with spaces
      if (language === "zh" || language === "ja") {
        toast(`Alternate case isn't applicable to ${rules.name}`)
        return text
      }
      return text
        .split(" ")
        .map((word, index) => (index % 2 === 0 ? word.toLowerCase() : word.toUpperCase()))
        .join(" ")

    case "dot":
      if (language === "zh" || language === "ja") {
        toast(`dot.case isn't applicable to ${rules.name}`)
        return text
      }
      return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\u0400-\u04FF\u0600-\u06FF\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+/g, ".")

    case "constant":
      if (language === "zh" || language === "ja") {
        toast(`CONSTANT_CASE isn't applicable to ${rules.name}`)
        return text
      }
      return text
        .toUpperCase()
        .replace(/[^a-zA-Z0-9\u0400-\u04FF\u0600-\u06FF\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+/g, "_")

    case "path":
      if (language === "zh" || language === "ja") {
        toast(`path/case isn't applicable to ${rules.name}`)
        return text
      }
      return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\u0400-\u04FF\u0600-\u06FF\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+/g, "/")

    case "sentence-no-period":
      // Sentence case without ending period
      return text
        .split(". ")
        .map((sentence) => {
          if (!sentence.trim()) return sentence
          return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase()
        })
        .join(". ")
        .replace(/\.$/, "")

    default:
      return text
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
  { value: "auto", label: "Auto Detect" },
]

// Helper function for case options based on language
const getCaseOptions = (language: string) => {
  const commonOptions = [
    { value: "lower", label: "lowercase", icon: <CaseLowerIcon className="w-4 h-4" /> },
    { value: "upper", label: "UPPERCASE", icon: <CaseUpperIcon className="w-4 h-4" /> },
    { value: "title", label: "Title Case", icon: <Heading1 className="w-4 h-4" /> },
    { value: "sentence", label: "Sentence case", icon: <Heading2 className="w-4 h-4" /> },
    { value: "toggle", label: "ToGgLe CaSe", icon: <CaseSensitive className="w-4 h-4" /> },
  ]

  // For languages that don't use spaces like Chinese or Japanese,
  // we don't show options that depend on word boundaries
  if (language === "zh" || language === "ja") {
    return commonOptions
  }

  return [
    ...commonOptions,
    { value: "camel", label: "camelCase", icon: <Baseline className="w-4 h-4" /> },
    { value: "pascal", label: "PascalCase", icon: <Type className="w-4 h-4" /> },
    { value: "snake", label: "snake_case", icon: <Minus className="w-4 h-4" /> },
    { value: "kebab", label: "kebab-case", icon: <Minus className="w-4 h-4" /> },
    { value: "alternate", label: "Alternate WORDS", icon: <AlignJustify className="w-4 h-4" /> },
    { value: "dot", label: "dot.case", icon: <Braces className="w-4 h-4" /> },
    { value: "constant", label: "CONSTANT_CASE", icon: <Keyboard className="w-4 h-4" /> },
    { value: "path", label: "path/case", icon: <Layers className="w-4 h-4" /> },
    { value: "sentence-no-period", label: "Sentence without period", icon: <Heading2 className="w-4 h-4" /> },
  ]
}

const countWords = (text: string, language: string): number => {
  if (language === "zh" || language === "ja") {
    // Estimate word count for character-based languages
    return Math.ceil(text.length / 2)
  }
  return text.trim().split(/\s+/).filter(Boolean).length
}

const countCharacters = (text: string, excludeSpaces = false): number => {
  return excludeSpaces ? text.replace(/\s/g, "").length : text.length
}

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
    ar: 155,
  }

  const wpm = wordsPerMinute[language] || 200
  const words = countWords(text, language)
  return Math.ceil(words / wpm)
}

const getTextStatistics = (text: string, language: string) => {
  if (!text.trim()) {
    return {
      avgWordLength: "0",
      sentenceCount: 0,
      paragraphCount: 0,
      longestWord: "",
      shortestWord: "",
      uniqueWords: 0,
    }
  }

  // Handle different language sentence patterns
  let sentenceSplitter = /[.!?]+/
  if (language === "zh") sentenceSplitter = /[。！？]+/
  if (language === "ja") sentenceSplitter = /[。！？、]+/

  // Words in character-based languages function differently
  let words: string[] = []
  let avgWordLength = 0
  let longestWord = ""
  let shortestWord = ""
  let uniqueWords = 0

  if (language === "zh" || language === "ja") {
    // Characters are closer to "words" in these languages
    words = text.split("")
    avgWordLength = 1 // Character is a unit
    longestWord = ""
    shortestWord = ""
    uniqueWords = new Set(words).size
  } else {
    words = text.trim().split(/\s+/).filter(Boolean)
    avgWordLength = words.length ? words.reduce((sum, word) => sum + word.length, 0) / words.length : 0

    // Find longest and shortest words
    if (words.length) {
      longestWord = words.reduce((longest, word) => (word.length > longest.length ? word : longest), "")
      shortestWord = words.reduce((shortest, word) => (word.length < shortest.length ? word : shortest), words[0])
      uniqueWords = new Set(words.map((w) => w.toLowerCase())).size
    }
  }

  const sentences = text.split(sentenceSplitter).filter(Boolean)
  const paragraphs = text.split(/\n\s*\n/).filter(Boolean)

  return {
    avgWordLength: avgWordLength.toFixed(2),
    sentenceCount: sentences.length,
    paragraphCount: paragraphs.length,
    longestWord,
    shortestWord,
    uniqueWords,
  }
}

export default function CaseConverter() {
  // Basic state
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [activeTab, setActiveTab] = useState("convert")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showDiff, setShowDiff] = useState(false)

  // Conversion options
  const [selectedCase, setSelectedCase] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [detectedLanguage, setDetectedLanguage] = useState("en")
  const [availableCaseOptions, setAvailableCaseOptions] = useState(getCaseOptions("en"))

  // Advanced options

  const [respectAcronyms, setRespectAcronyms] = useState(true)
  const [trimWhitespace, setTrimWhitespace] = useState(false)
  const [normalizeSpaces, setNormalizeSpaces] = useState(false)

  // History
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  // Stats
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [charCountWithSpaces, setCharCountWithSpaces] = useState(0)
  const [readingTime, setReadingTime] = useState(0)
  const [textStats, setTextStats] = useState({
    avgWordLength: "0",
    sentenceCount: 0,
    paragraphCount: 0,
    longestWord: "",
    shortestWord: "",
    uniqueWords: 0,
  })

  // Load saved data on component mount
  useEffect(() => {
    const savedInputText = localStorage.getItem("caseConverterInputText")
    const savedOutputText = localStorage.getItem("caseConverterOutputText")
    const savedCase = localStorage.getItem("caseConverterSelectedCase")
    const savedLanguage = localStorage.getItem("caseConverterSelectedLanguage")

    if (savedInputText) setInputText(savedInputText)
    if (savedOutputText) setOutputText(savedOutputText)
    if (savedCase) setSelectedCase(savedCase)
    if (savedLanguage) setSelectedLanguage(savedLanguage)
  }, [])

  // Save data when it changes
  useEffect(() => {
    if (inputText) localStorage.setItem("caseConverterInputText", inputText)
    if (outputText) localStorage.setItem("caseConverterOutputText", outputText)
    if (selectedCase) localStorage.setItem("caseConverterSelectedCase", selectedCase)
    if (selectedLanguage) localStorage.setItem("caseConverterSelectedLanguage", selectedLanguage)
  }, [inputText, outputText, selectedCase, selectedLanguage])

  // Auto-detect language when input changes
  useEffect(() => {
    if (inputText.trim() && selectedLanguage === "auto") {
      const detectedLang = detectLanguage(inputText)
      setDetectedLanguage(detectedLang)
      setAvailableCaseOptions(getCaseOptions(detectedLang))
      updateTextStats(inputText, detectedLang)
    } else {
      setDetectedLanguage(selectedLanguage)
      setAvailableCaseOptions(getCaseOptions(selectedLanguage))
      updateTextStats(inputText, selectedLanguage)
    }
  }, [inputText, selectedLanguage])

  // Update case options when language changes
  useEffect(() => {
    setAvailableCaseOptions(getCaseOptions(selectedLanguage === "auto" ? detectedLanguage : selectedLanguage))
  }, [selectedLanguage, detectedLanguage])

  const updateTextStats = (text: string, lang: string) => {
    setWordCount(countWords(text, lang))
    setCharCount(countCharacters(text, true))
    setCharCountWithSpaces(countCharacters(text, false))
    setReadingTime(estimateReadingTime(text, lang))
    setTextStats(getTextStatistics(text, lang))
  }

  const addToHistory = useCallback(
    (text: string) => {
      // Only add to history if it's different from the last entry
      if (history.length === 0 || history[history.length - 1] !== text) {
        setHistory((prev) => [...prev, text])
        setHistoryIndex((prev) => prev + 1)
      }
    },
    [history],
  )

  const handleConvert = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter some text to convert")
      return
    }

    if (!selectedCase) {
      toast.error("Please select a case conversion type")
      return
    }

    setIsProcessing(true)

    // Use setTimeout to prevent UI blocking for large texts
    setTimeout(() => {
      try {
        const langToUse = selectedLanguage === "auto" ? detectedLanguage : selectedLanguage
        let textToConvert = inputText

        // Apply pre-processing if options are enabled
        if (trimWhitespace) {
          textToConvert = textToConvert.trim()
        }

        if (normalizeSpaces) {
          textToConvert = textToConvert.replace(/\s+/g, " ")
        }

        // Handle acronyms if option is enabled
        if (respectAcronyms) {
          // Store acronyms (all caps words) to restore them later
          const acronyms: Record<string, string> = {}
          if (selectedCase !== "upper" && selectedCase !== "constant") {
            const acronymRegex = /\b[A-Z]{2,}\b/g
            const matches = textToConvert.match(acronymRegex)
            if (matches) {
              matches.forEach((acronym, index) => {
                const placeholder = `__ACRONYM_${index}__`
                acronyms[placeholder] = acronym
                textToConvert = textToConvert.replace(new RegExp(`\\b${acronym}\\b`, "g"), placeholder)
              })
            }
          }

          // Convert the text
          let converted = convertCase(textToConvert, selectedCase, langToUse)

          // Restore acronyms
          Object.entries(acronyms).forEach(([placeholder, acronym]) => {
            converted = converted.replace(new RegExp(placeholder, "g"), acronym)
          })

          setOutputText(converted)
        } else {
          // Simple conversion without acronym handling
          const converted = convertCase(textToConvert, selectedCase, langToUse)
          setOutputText(converted)
        }

        addToHistory(outputText)
        toast.success("Text converted successfully")
      } catch (error) {
        console.error("Error converting text:", error)
        toast.error("Error converting text")
      } finally {
        setIsProcessing(false)
      }
    }, 10)
  }, [
    inputText,
    selectedCase,
    selectedLanguage,
    detectedLanguage,
    trimWhitespace,
    normalizeSpaces,
    respectAcronyms,
    addToHistory,
    outputText,
  ])

  const handleCopy = useCallback(() => {
    if (!outputText) {
      toast.error("No text to copy")
      return
    }
    navigator.clipboard.writeText(outputText)
    toast.success("Copied to clipboard")
  }, [outputText])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const text = e.target.value
    if (text.length <= MAX_CHARS) {
      setInputText(text)
    } else {
      setInputText(text.slice(0, MAX_CHARS))
      toast.error(`Character limit of ${MAX_CHARS} reached`)
    }
  }, [])

  const handleDownload = useCallback(() => {
    if (!outputText) {
      toast.error("No text to download")
      return
    }
    const blob = new Blob([outputText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "converted_text.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("Text downloaded successfully")
  }, [outputText])

  const handleClear = useCallback(() => {
    setInputText("")
    setOutputText("")
    setHistory([])
    setHistoryIndex(-1)
    // Also clear localStorage
    localStorage.removeItem("caseConverterInputText")
    localStorage.removeItem("caseConverterOutputText")
    localStorage.removeItem("caseConverterSelectedCase")
    localStorage.removeItem("caseConverterSelectedLanguage")
    toast.success("Text cleared")
  }, [])

  const handleReverse = useCallback(() => {
    if (!outputText) {
      toast.error("No text to reverse")
      return
    }
    const reversed = outputText.split("").reverse().join("")
    setOutputText(reversed)
    addToHistory(reversed)
    toast.success("Text reversed")
  }, [outputText, addToHistory])

  const handleRemoveSpaces = useCallback(() => {
    if (!outputText) {
      toast.error("No text to process")
      return
    }
    const noSpaces = outputText.replace(/\s+/g, "")
    setOutputText(noSpaces)
    addToHistory(noSpaces)
    toast.success("Spaces removed")
  }, [outputText, addToHistory])

  const handleTrim = useCallback(() => {
    if (!outputText) {
      toast.error("No text to trim")
      return
    }
    const trimmed = outputText
      .replace(/^\s+/gm, "")
      .replace(/\s+$/gm, "")
      .replace(/\n\s*\n\s*\n/g, "\n\n")
    setOutputText(trimmed)
    addToHistory(trimmed)
    toast.success("Text trimmed")
  }, [outputText, addToHistory])

  const handleCapitalizeWords = useCallback(() => {
    if (!outputText) {
      toast.error("No text to capitalize")
      return
    }
    const langToUse = selectedLanguage === "auto" ? detectedLanguage : selectedLanguage
    // Handle differently for character-based languages
    let capitalized = outputText

    if (langToUse === "zh" || langToUse === "ja") {
      toast(`Word capitalization isn't applicable to ${languageRules[langToUse as keyof typeof languageRules].name}`)
    } else {
      capitalized = outputText.replace(/\b\w/g, (char) => char.toUpperCase())
      setOutputText(capitalized)
      addToHistory(capitalized)
      toast.success("Words capitalized")
    }
  }, [outputText, addToHistory, selectedLanguage, detectedLanguage])

  const handleRemoveDuplicateLines = useCallback(() => {
    if (!outputText) {
      toast.error("No text to process")
      return
    }
    const uniqueLines = Array.from(new Set(outputText.split("\n"))).join("\n")
    setOutputText(uniqueLines)
    addToHistory(uniqueLines)
    toast.success("Duplicate lines removed")
  }, [outputText, addToHistory])

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1)
      setOutputText(history[historyIndex - 1])
      toast.success("Undo successful")
    } else {
      toast.error("No more undo history")
    }
  }, [history, historyIndex])

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1)
      setOutputText(history[historyIndex + 1])
      toast.success("Redo successful")
    } else {
      toast.error("No more redo history")
    }
  }, [history, historyIndex])

  // Language auto-detection function
  const handleAutoDetect = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter some text to detect language")
      return
    }

    const detectedLang = detectLanguage(inputText)
    setDetectedLanguage(detectedLang)
    setSelectedLanguage("auto")
    const langName = languageRules[detectedLang as keyof typeof languageRules]?.name || "Unknown"
    toast.success(`Detected language: ${langName}`)
  }, [inputText])

  // Apply output back to input
  const handleApplyToInput = useCallback(() => {
    if (!outputText) {
      toast.error("No converted text to apply")
      return
    }
    setInputText(outputText)
    toast.success("Converted text applied to input")
  }, [outputText])

  // Generate a visual diff between original and converted text
  const generateDiff = useCallback(() => {
    if (!inputText || !outputText) {
      return "No text to compare"
    }

    // Simple character-by-character diff for demonstration
    const originalChars = inputText.split("")
    const convertedChars = outputText.split("")

    let diffHtml = ""
    let i = 0,
      j = 0

    while (i < originalChars.length || j < convertedChars.length) {
      if (i < originalChars.length && j < convertedChars.length && originalChars[i] === convertedChars[j]) {
        // Characters match
        diffHtml += originalChars[i]
        i++
        j++
      } else if (j < convertedChars.length && (i >= originalChars.length || originalChars[i] !== convertedChars[j])) {
        // Character added or changed in converted text
        diffHtml += `<span style="background-color: #d4edda; color: #155724;">+${convertedChars[j]}</span>`
        j++
      } else {
        // Character removed from original text
        diffHtml += `<span style="background-color: #f8d7da; color: #721c24;">-${originalChars[i]}</span>`
        i++
      }
    }

    return diffHtml
  }, [inputText, outputText])

  // Additional text manipulation functions
  const handleRemoveLineBreaks = useCallback(() => {
    if (!outputText) {
      toast.error("No text to process")
      return
    }
    const noLineBreaks = outputText.replace(/\n/g, " ")
    setOutputText(noLineBreaks)
    addToHistory(noLineBreaks)
    toast.success("Line breaks removed")
  }, [outputText, addToHistory])

  const handleRemoveExtraSpaces = useCallback(() => {
    if (!outputText) {
      toast.error("No text to process")
      return
    }
    const normalizedSpaces = outputText.replace(/\s+/g, " ")
    setOutputText(normalizedSpaces)
    addToHistory(normalizedSpaces)
    toast.success("Extra spaces removed")
  }, [outputText, addToHistory])

  const handleSortLines = useCallback(() => {
    if (!outputText) {
      toast.error("No text to sort")
      return
    }
    const lines = outputText.split("\n")
    const sortedLines = lines.sort()
    setOutputText(sortedLines.join("\n"))
    addToHistory(sortedLines.join("\n"))
    toast.success("Lines sorted alphabetically")
  }, [outputText, addToHistory])

  const handleSortLinesByLength = useCallback(() => {
    if (!outputText) {
      toast.error("No text to sort")
      return
    }
    const lines = outputText.split("\n")
    const sortedLines = lines.sort((a, b) => a.length - b.length)
    setOutputText(sortedLines.join("\n"))
    addToHistory(sortedLines.join("\n"))
    toast.success("Lines sorted by length")
  }, [outputText, addToHistory])

  const handleRemoveEmptyLines = useCallback(() => {
    if (!outputText) {
      toast.error("No text to process")
      return
    }
    const nonEmptyLines = outputText
      .split("\n")
      .filter((line) => line.trim() !== "")
      .join("\n")
    setOutputText(nonEmptyLines)
    addToHistory(nonEmptyLines)
    toast.success("Empty lines removed")
  }, [outputText, addToHistory])

  const handleAddLineNumbers = useCallback(() => {
    if (!outputText) {
      toast.error("No text to process")
      return
    }
    const lines = outputText.split("\n")
    const numberedLines = lines.map((line, index) => `${index + 1}. ${line}`)
    setOutputText(numberedLines.join("\n"))
    addToHistory(numberedLines.join("\n"))
    toast.success("Line numbers added")
  }, [outputText, addToHistory])

  return (
    <ToolLayout
      title="Case Converter & Text Transformer"
      description="Transform text into any case format with multi-language support for camelCase, PascalCase, snake_case, and more"
      toolId="678f33831fa2b06f4b7ef590"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Panel */}
        <Card className="lg:col-span-6 bg-default-50 dark:bg-default-100">
          <CardHeader className="flex justify-between items-center pb-0">
            <h2 className="text-xl font-semibold text-primary-600 dark:text-primary-400 flex items-center">
              <FileText size={20} className="mr-2" /> Input Text
            </h2>
            <div className="flex items-center gap-2">
              <Chip color="primary" variant="flat" size="sm" startContent={<Hash size={14} />}>
                {charCountWithSpaces} chars
              </Chip>
              <Chip color="secondary" variant="flat" size="sm" startContent={<Type size={14} />}>
                {wordCount} words
              </Chip>
            </div>
          </CardHeader>
          <CardBody className="py-3">
            <Textarea
              value={inputText}
              onChange={handleInputChange}
              placeholder="Enter or paste your text here to convert..."
              minRows={12}
              maxRows={20}
              className="w-full"
              variant="bordered"
              classNames={{
                inputWrapper: "bg-default-100/50",
              }}
            />
            <div className="flex justify-between items-center mt-2">
              <div className="text-xs text-default-500">
                {inputText.length}/{MAX_CHARS} characters
              </div>
              <Button
                color="danger"
                variant="light"
                onPress={handleClear}
                startContent={<Trash2 size={14} />}
                size="sm"
                isDisabled={!inputText.trim()}
              >
                Clear
              </Button>
            </div>
            <Progress
              value={(inputText.length / MAX_CHARS) * 100}
              color={inputText.length > MAX_CHARS * 0.9 ? "danger" : "primary"}
              size="sm"
              className="mt-2"
            />
          </CardBody>
        </Card>

        {/* Output Panel */}
        <Card className="lg:col-span-6 bg-default-50 dark:bg-default-100">
          <CardHeader className="flex justify-between items-center pb-0">
            <h2 className="text-xl font-semibold text-success-600 dark:text-success-400 flex items-center">
              <Type size={20} className="mr-2" /> Converted Text
            </h2>
            <div className="flex items-center gap-2">
              {selectedLanguage === "auto" && detectedLanguage !== "en" && (
                <Badge content="Auto" color="secondary" size="sm">
                  <Chip color="secondary" variant="flat" size="sm">
                    {languageRules[detectedLanguage as keyof typeof languageRules]?.name || "Unknown"}
                  </Chip>
                </Badge>
              )}
              {outputText && (
                <Chip color="success" variant="flat" size="sm" startContent={<Clock size={14} />}>
                  ~{readingTime} min read
                </Chip>
              )}
            </div>
          </CardHeader>
          <CardBody className="py-3">
            {showDiff ? (
              <div
                className="w-full min-h-[300px] p-3 border-2 border-default-200 dark:border-default-700 rounded-lg bg-default-100/50 overflow-auto"
                dangerouslySetInnerHTML={{ __html: generateDiff() }}
              />
            ) : (
              <Textarea
                value={outputText}
                readOnly
                placeholder="Converted text will appear here..."
                minRows={12}
                maxRows={20}
                className="w-full"
                variant="bordered"
                classNames={{
                  inputWrapper: "bg-default-100/50",
                }}
              />
            )}
            <div className="flex justify-between items-center mt-2">
              <Switch
                size="sm"
                isSelected={showDiff}
                onValueChange={setShowDiff}
                isDisabled={!outputText || !inputText}
                classNames={{
                  label: "text-xs",
                }}
              >
                Show diff view
              </Switch>
              <Button
                color="primary"
                variant="light"
                onPress={handleApplyToInput}
                startContent={<ArrowRightLeft size={14} />}
                size="sm"
                isDisabled={!outputText}
              >
                Apply to Input
              </Button>
            </div>
          </CardBody>
          <CardFooter className="flex flex-wrap gap-2 justify-start pt-0">
            <Button
              color="primary"
              variant="flat"
              onPress={handleCopy}
              startContent={<Copy size={16} />}
              isDisabled={!outputText}
              size="sm"
            >
              Copy
            </Button>
            <Button
              color="primary"
              variant="flat"
              onPress={handleDownload}
              startContent={<Download size={16} />}
              isDisabled={!outputText}
              size="sm"
            >
              Download
            </Button>
            <Button
              color="secondary"
              variant="flat"
              onPress={handleUndo}
              startContent={<RotateCcw size={16} />}
              isDisabled={historyIndex <= 0}
              size="sm"
            >
              Undo
            </Button>
            <Button
              color="secondary"
              variant="flat"
              onPress={handleRedo}
              startContent={<RefreshCw size={16} />}
              isDisabled={historyIndex >= history.length - 1}
              size="sm"
            >
              Redo
            </Button>
          </CardFooter>
        </Card>

        {/* Options Panel */}
        <Card className="lg:col-span-12 bg-default-50 dark:bg-default-100">
          <CardHeader className="pb-0">
            <Tabs
              selectedKey={activeTab}
              onSelectionChange={(key: React.Key) => setActiveTab(String(key))}
              color="primary"
              size="sm"
              variant="underlined"
              className="w-full"
              classNames={{
                tab: "h-8 px-2 sm:px-3",
                tabList: "w-full justify-start sm:justify-center",
                tabContent: "text-xs sm:text-sm",
              }}
            >
              <Tab
                key="convert"
                title={
                  <div className="flex items-center gap-1">
                    <Type size={14} />
                    <span className="hidden sm:inline">Case Conversion</span>
                    <span className="sm:hidden">Convert</span>
                  </div>
                }
              />

              <Tab
                key="advanced"
                title={
                  <div className="flex items-center gap-1">
                    <Settings2 size={14} />
                    <span className="hidden sm:inline">Advanced Options</span>
                    <span className="sm:hidden">Advanced</span>
                  </div>
                }
              />

              <Tab
                key="tools"
                title={
                  <div className="flex items-center gap-1">
                    <Scissors size={14} />
                    <span className="hidden sm:inline">Text Tools</span>
                    <span className="sm:hidden">Tools</span>
                  </div>
                }
              />

              <Tab
                key="stats"
                title={
                  <div className="flex items-center gap-1">
                    <Calculator size={14} />
                    <span className="hidden sm:inline">Text Statistics</span>
                    <span className="sm:hidden">Stats</span>
                  </div>
                }
              />

              <Tab
                key="history"
                title={
                  <div className="flex items-center gap-1">
                    <History size={14} />
                    <span className="hidden sm:inline">History</span>
                    <span className="sm:hidden">History</span>
                  </div>
                }
              />
            </Tabs>

          </CardHeader>
          <CardBody className="py-3 px-4">
            {activeTab === "convert" && (
              <div className="space-y-4">
                <h3 className="text-md font-semibold text-default-700">Case Conversion Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-default-100/50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-default-700 mb-2">Select Case Type</h4>
                    <Select
                      label="Choose how to convert your text"
                      selectedKeys={[selectedCase]}
                      onChange={(e) => setSelectedCase(e.target.value)}
                      className="max-w-full"
                      variant="bordered"
                      size="sm"
                      startContent={
                        availableCaseOptions.find((option) => option.value === selectedCase)?.icon || (
                          <Type className="w-4 h-4" />
                        )
                      }
                    >
                      {availableCaseOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          startContent={option.icon}
                          className="text-default-700"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </Select>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-default-700 mb-2">Language Settings</h4>
                      <Select
                        label="Select language or auto-detect"
                        selectedKeys={[selectedLanguage]}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="max-w-full"
                        variant="bordered"
                        size="sm"
                        startContent={<Globe className="w-4 h-4" />}
                      >
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value} className="text-default-700">
                            {lang.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>

                    <Button
                      color="secondary"
                      variant="flat"
                      onPress={handleAutoDetect}
                      startContent={<Globe className="w-4 h-4" />}
                      size="sm"
                      className="mt-2"
                      isDisabled={!inputText.trim()}
                    >
                      Detect Language
                    </Button>
                  </div>

                  <div className="bg-default-100/50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-default-700 mb-2">Conversion Preview</h4>
                    <div className="text-xs text-default-600 space-y-2">
                      <div className="flex items-center">
                        <Maximize2 className="w-3 h-3 mr-1 text-primary-500" />
                        <span>Original: "The Quick Brown Fox Jumps Over The Lazy Dog"</span>
                      </div>
                      <div className="flex items-center">
                        <Minimize2 className="w-3 h-3 mr-1 text-success-500" />
                        <span>
                          {selectedCase === "lower"
                            ? 'Converted: "the quick brown fox jumps over the lazy dog"'
                            : selectedCase === "upper"
                              ? 'Converted: "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG"'
                              : selectedCase === "title"
                                ? 'Converted: "The Quick Brown Fox Jumps Over The Lazy Dog"'
                                : selectedCase === "sentence"
                                  ? 'Converted: "The quick brown fox jumps over the lazy dog"'
                                  : selectedCase === "camel"
                                    ? 'Converted: "theQuickBrownFoxJumpsOverTheLazyDog"'
                                    : selectedCase === "pascal"
                                      ? 'Converted: "TheQuickBrownFoxJumpsOverTheLazyDog"'
                                      : selectedCase === "snake"
                                        ? 'Converted: "the_quick_brown_fox_jumps_over_the_lazy_dog"'
                                        : selectedCase === "kebab"
                                          ? 'Converted: "the-quick-brown-fox-jumps-over-the-lazy-dog"'
                                          : selectedCase === "toggle"
                                            ? 'Converted: "tHE qUICK bROWN fOX jUMPS oVER tHE lAZY dOG"'
                                            : selectedCase === "alternate"
                                              ? 'Converted: "the QUICK brown FOX jumps OVER the LAZY dog"'
                                              : selectedCase === "dot"
                                                ? 'Converted: "the.quick.brown.fox.jumps.over.the.lazy.dog"'
                                                : selectedCase === "constant"
                                                  ? 'Converted: "THE_QUICK_BROWN_FOX_JUMPS_OVER_THE_LAZY_DOG"'
                                                  : selectedCase === "path"
                                                    ? 'Converted: "the/quick/brown/fox/jumps/over/the/lazy/dog"'
                                                    : "Select a case type to see preview"}
                        </span>
                      </div>
                    </div>

                    <Divider className="my-3" />

                    <div className="space-y-2">
                      <Switch isSelected={respectAcronyms} onValueChange={setRespectAcronyms} size="sm">
                        Preserve acronyms (e.g., NASA, FBI)
                      </Switch>
                      <Switch isSelected={trimWhitespace} onValueChange={setTrimWhitespace} size="sm">
                        Trim leading/trailing whitespace
                      </Switch>
                      <Switch isSelected={normalizeSpaces} onValueChange={setNormalizeSpaces} size="sm">
                        Normalize multiple spaces
                      </Switch>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <Button
                    color="primary"
                    onPress={handleConvert}
                    startContent={isProcessing ? null : <Zap size={18} />}
                    isLoading={isProcessing}
                    size="md"
                    className="px-8"
                    isDisabled={!inputText.trim() || !selectedCase}
                  >
                    {isProcessing ? "Processing..." : "Convert Text"}
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "advanced" && (
              <div className="space-y-4">
                <h3 className="text-md font-semibold text-default-700">Advanced Text Transformation</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-default-100/50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-default-700 mb-2">Text Manipulation</h4>
                    <div className="space-y-2">
                      <Button
                        color="primary"
                        variant="flat"
                        onPress={handleReverse}
                        startContent={<Undo2 size={16} />}
                        isDisabled={!outputText}
                        size="sm"
                        className="w-full"
                      >
                        Reverse Text
                      </Button>
                      <Button
                        color="primary"
                        variant="flat"
                        onPress={handleRemoveSpaces}
                        startContent={<Space size={16} />}
                        isDisabled={!outputText}
                        size="sm"
                        className="w-full"
                      >
                        Remove All Spaces
                      </Button>
                      <Button
                        color="primary"
                        variant="flat"
                        onPress={handleRemoveExtraSpaces}
                        startContent={<Minus size={16} />}
                        isDisabled={!outputText}
                        size="sm"
                        className="w-full"
                      >
                        Remove Extra Spaces
                      </Button>
                      <Button
                        color="primary"
                        variant="flat"
                        onPress={handleRemoveLineBreaks}
                        startContent={<Layers size={16} />}
                        isDisabled={!outputText}
                        size="sm"
                        className="w-full"
                      >
                        Remove Line Breaks
                      </Button>
                    </div>
                  </div>

                  <div className="bg-default-100/50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-default-700 mb-2">Line Operations</h4>
                    <div className="space-y-2">
                      <Button
                        color="secondary"
                        variant="flat"
                        onPress={handleTrim}
                        startContent={<Slice size={16} />}
                        isDisabled={!outputText}
                        size="sm"
                        className="w-full"
                      >
                        Trim Whitespace
                      </Button>
                      <Button
                        color="secondary"
                        variant="flat"
                        onPress={handleRemoveDuplicateLines}
                        startContent={<SplitSquareHorizontal size={16} />}
                        isDisabled={!outputText}
                        size="sm"
                        className="w-full"
                      >
                        Remove Duplicate Lines
                      </Button>
                      <Button
                        color="secondary"
                        variant="flat"
                        onPress={handleRemoveEmptyLines}
                        startContent={<Scissors size={16} />}
                        isDisabled={!outputText}
                        size="sm"
                        className="w-full"
                      >
                        Remove Empty Lines
                      </Button>
                      <Button
                        color="secondary"
                        variant="flat"
                        onPress={handleAddLineNumbers}
                        startContent={<Hash size={16} />}
                        isDisabled={!outputText}
                        size="sm"
                        className="w-full"
                      >
                        Add Line Numbers
                      </Button>
                    </div>
                  </div>

                  <div className="bg-default-100/50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-default-700 mb-2">Sorting & Formatting</h4>
                    <div className="space-y-2">
                      <Button
                        color="success"
                        variant="flat"
                        onPress={handleSortLines}
                        startContent={<AlignJustify size={16} />}
                        isDisabled={!outputText}
                        size="sm"
                        className="w-full"
                      >
                        Sort Lines Alphabetically
                      </Button>
                      <Button
                        color="success"
                        variant="flat"
                        onPress={handleSortLinesByLength}
                        startContent={<Indent size={16} />}
                        isDisabled={!outputText}
                        size="sm"
                        className="w-full"
                      >
                        Sort Lines by Length
                      </Button>
                      <Button
                        color="success"
                        variant="flat"
                        onPress={handleCapitalizeWords}
                        startContent={<Type size={16} />}
                        isDisabled={!outputText}
                        size="sm"
                        className="w-full"
                      >
                        Capitalize Each Word
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <Button
                    color="primary"
                    onPress={handleConvert}
                    startContent={isProcessing ? null : <Wand2 size={18} />}
                    isLoading={isProcessing}
                    size="md"
                    className="px-8"
                    isDisabled={!inputText.trim() || !selectedCase}
                  >
                    {isProcessing ? "Processing..." : "Convert with Advanced Options"}
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "tools" && (
              <div className="space-y-4">
                <h3 className="text-md font-semibold text-default-700">Text Transformation Tools</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Tooltip content="Copy text to clipboard" className="text-default-700">
                    <Button
                      color="primary"
                      variant="flat"
                      onPress={handleCopy}
                      startContent={<Copy size={16} />}
                      isDisabled={!outputText}
                      size="sm"
                      className="w-full"
                    >
                      Copy
                    </Button>
                  </Tooltip>

                  <Tooltip content="Download text as file" className="text-default-700">
                    <Button
                      color="primary"
                      variant="flat"
                      onPress={handleDownload}
                      startContent={<Download size={16} />}
                      isDisabled={!outputText}
                      size="sm"
                      className="w-full"
                    >
                      Download
                    </Button>
                  </Tooltip>

                  <Tooltip content="Reverse character order" className="text-default-700">
                    <Button
                      color="primary"
                      variant="flat"
                      onPress={handleReverse}
                      startContent={<Undo2 size={16} />}
                      isDisabled={!outputText}
                      size="sm"
                      className="w-full"
                    >
                      Reverse
                    </Button>
                  </Tooltip>

                  <Tooltip content="Remove all spaces" className="text-default-700">
                    <Button
                      color="primary"
                      variant="flat"
                      onPress={handleRemoveSpaces}
                      startContent={<Space size={16} />}
                      isDisabled={!outputText}
                      size="sm"
                      className="w-full"
                    >
                      No Spaces
                    </Button>
                  </Tooltip>

                  <Tooltip content="Trim whitespace from start/end" className="text-default-700">
                    <Button
                      color="primary"
                      variant="flat"
                      onPress={handleTrim}
                      startContent={<Slice size={16} />}
                      isDisabled={!outputText}
                      size="sm"
                      className="w-full"
                    >
                      Trim
                    </Button>
                  </Tooltip>

                  <Tooltip content="Capitalize first letter of each word" className="text-default-700">
                    <Button
                      color="primary"
                      variant="flat"
                      onPress={handleCapitalizeWords}
                      startContent={<Type size={16} />}
                      isDisabled={!outputText}
                      size="sm"
                      className="w-full"
                    >
                      Capitalize
                    </Button>
                  </Tooltip>

                  <Tooltip content="Remove duplicate lines" className="text-default-700">
                    <Button
                      color="primary"
                      variant="flat"
                      onPress={handleRemoveDuplicateLines}
                      startContent={<SplitSquareHorizontal size={16} />}
                      isDisabled={!outputText}
                      size="sm"
                      className="w-full"
                    >
                      Unique Lines
                    </Button>
                  </Tooltip>

                  <Tooltip content="Clear all text" className="text-default-700">
                    <Button
                      color="danger"
                      variant="flat"
                      onPress={handleClear}
                      startContent={<Trash2 size={16} />}
                      isDisabled={!inputText && !outputText}
                      size="sm"
                      className="w-full"
                    >
                      Clear All
                    </Button>
                  </Tooltip>

                  <Tooltip content="Remove all line breaks" className="text-default-700">
                    <Button
                      color="secondary"
                      variant="flat"
                      onPress={handleRemoveLineBreaks}
                      startContent={<Layers size={16} />}
                      isDisabled={!outputText}
                      size="sm"
                      className="w-full"
                    >
                      No Breaks
                    </Button>
                  </Tooltip>

                  <Tooltip content="Remove multiple spaces" className="text-default-700">
                    <Button
                      color="secondary"
                      variant="flat"
                      onPress={handleRemoveExtraSpaces}
                      startContent={<Minus size={16} />}
                      isDisabled={!outputText}
                      size="sm"
                      className="w-full"
                    >
                      Fix Spaces
                    </Button>
                  </Tooltip>

                  <Tooltip content="Sort lines alphabetically" className="text-default-700">
                    <Button
                      color="secondary"
                      variant="flat"
                      onPress={handleSortLines}
                      startContent={<AlignJustify size={16} />}
                      isDisabled={!outputText}
                      size="sm"
                      className="w-full"
                    >
                      Sort Lines
                    </Button>
                  </Tooltip>

                  <Tooltip content="Sort lines by length" className="text-default-700">
                    <Button
                      color="secondary"
                      variant="flat"
                      onPress={handleSortLinesByLength}
                      startContent={<Indent size={16} />}
                      isDisabled={!outputText}
                      size="sm"
                      className="w-full"
                    >
                      Sort by Length
                    </Button>
                  </Tooltip>
                </div>

                <div className="flex justify-center mt-4" >
                  <Button
                    color="primary"
                    onPress={handleApplyToInput}
                    startContent={<ArrowRightLeft size={18} />}
                    size="md"
                    className="px-8"
                    isDisabled={!outputText}
                  >
                    Apply to Input for Further Processing
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "stats" && (
              <div className="space-y-4">
                <h3 className="text-md font-semibold text-default-700">Text Statistics</h3>

                {!inputText.trim() ? (
                  <div className="text-center py-8 text-default-400">
                    <FileText size={32} className="mx-auto mb-2 opacity-50" />
                    <p>Enter some text to see statistics</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-default-100/50 p-3 rounded-lg">
                        <div className="text-xs text-default-500 mb-1">Characters (with spaces)</div>
                        <div className="text-lg font-semibold">{charCountWithSpaces}</div>
                      </div>

                      <div className="bg-default-100/50 p-3 rounded-lg">
                        <div className="text-xs text-default-500 mb-1">Characters (no spaces)</div>
                        <div className="text-lg font-semibold">{charCount}</div>
                      </div>

                      <div className="bg-default-100/50 p-3 rounded-lg">
                        <div className="text-xs text-default-500 mb-1">Words</div>
                        <div className="text-lg font-semibold">{wordCount}</div>
                      </div>

                      <div className="bg-default-100/50 p-3 rounded-lg">
                        <div className="text-xs text-default-500 mb-1">Sentences</div>
                        <div className="text-lg font-semibold">{textStats.sentenceCount}</div>
                      </div>

                      <div className="bg-default-100/50 p-3 rounded-lg">
                        <div className="text-xs text-default-500 mb-1">Paragraphs</div>
                        <div className="text-lg font-semibold">{textStats.paragraphCount}</div>
                      </div>

                      <div className="bg-default-100/50 p-3 rounded-lg">
                        <div className="text-xs text-default-500 mb-1">Reading Time</div>
                        <div className="text-lg font-semibold">{readingTime} min</div>
                      </div>

                      <div className="bg-default-100/50 p-3 rounded-lg">
                        <div className="text-xs text-default-500 mb-1">Avg. Word Length</div>
                        <div className="text-lg font-semibold">{textStats.avgWordLength}</div>
                      </div>

                      <div className="bg-default-100/50 p-3 rounded-lg">
                        <div className="text-xs text-default-500 mb-1">Unique Words</div>
                        <div className="text-lg font-semibold">{textStats.uniqueWords}</div>
                        <div className="text-xs text-default-400">
                          {wordCount > 0 ? `${Math.round((textStats.uniqueWords / wordCount) * 100)}% of total` : ""}
                        </div>
                      </div>
                    </div>

                    {(textStats.longestWord || textStats.shortestWord) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {textStats.longestWord && (
                          <div className="bg-default-100/50 p-3 rounded-lg">
                            <div className="text-xs text-default-500 mb-1">Longest Word</div>
                            <div className="text-md font-medium">{textStats.longestWord}</div>
                            <div className="text-xs text-default-400 mt-1">
                              {textStats.longestWord.length} characters
                            </div>
                          </div>
                        )}

                        {textStats.shortestWord && (
                          <div className="bg-default-100/50 p-3 rounded-lg">
                            <div className="text-xs text-default-500 mb-1">Shortest Word</div>
                            <div className="text-md font-medium">{textStats.shortestWord}</div>
                            <div className="text-xs text-default-400 mt-1">
                              {textStats.shortestWord.length} characters
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {selectedLanguage === "auto" && detectedLanguage !== "en" && (
                      <div className="bg-default-100/50 p-3 rounded-lg mt-4">
                        <div className="text-xs text-default-500 mb-1">Detected Language</div>
                        <div className="text-md font-medium flex items-center">
                          <Globe className="w-4 h-4 mr-1 text-primary-500" />
                          {languageRules[detectedLanguage as keyof typeof languageRules]?.name || "Unknown"}
                        </div>
                      </div>
                    )}
                  </>
                )}

                <div className="flex justify-center mt-4">
                  <Button
                    color="primary"
                    onPress={handleAutoDetect}
                    startContent={<Globe size={18} />}
                    size="md"
                    className="px-8 mr-2"
                    isDisabled={!inputText.trim()}
                  >
                    Detect Language
                  </Button>
                  <Button
                    color="primary"
                    onPress={handleConvert}
                    startContent={<Zap size={18} />}
                    size="md"
                    className="px-8"
                    isDisabled={!inputText.trim() || !selectedCase}
                  >
                    Convert Text
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "history" && (
              <div className="space-y-4">
                <h3 className="text-md font-semibold text-default-700">Conversion History</h3>

                {history.length === 0 ? (
                  <div className="text-center py-8 text-default-400">
                    <History size={32} className="mx-auto mb-2 opacity-50" />
                    <p>No conversion history yet</p>
                    <p className="text-xs mt-2">Convert some text to see your history</p>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-default-600">
                        {history.length} conversion{history.length !== 1 ? "s" : ""} in history
                      </div>
                      <div className="flex gap-2">
                        <Button
                          color="danger"
                          variant="light"
                          size="sm"
                          startContent={<Trash2 size={14} />}
                          onPress={() => {
                            setHistory([])
                            setHistoryIndex(-1)
                            toast.success("History cleared")
                          }}
                        >
                          Clear History
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                      {history.map((item, index) => (
                        <div
                          key={index}
                          className={`p-2 rounded-lg text-sm ${
                            index === historyIndex
                              ? "bg-primary-100 dark:bg-primary-900/30 border-l-4 border-primary-500"
                              : "bg-default-100/50"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div className="font-medium flex items-center">
                              {index === historyIndex && <Check size={14} className="mr-1 text-primary-500" />}
                              Conversion #{index + 1}
                            </div>
                            <Button
                              size="sm"
                              variant="light"
                              color="primary"
                              isIconOnly
                              onPress={() => {
                                setOutputText(item)
                                setHistoryIndex(index)
                                toast.success(`Restored conversion #${index + 1}`)
                              }}
                            >
                              <RotateCcw size={14} />
                            </Button>
                          </div>
                          <div className="mt-1 text-default-600 truncate">{item.substring(0, 100)}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <div className="flex justify-center mt-4">
                  <Button
                    color="secondary"
                    onPress={handleUndo}
                    startContent={<RotateCcw size={16} />}
                    size="sm"
                    className="mr-2"
                    isDisabled={historyIndex <= 0}
                  >
                    Undo
                  </Button>
                  <Button
                    color="secondary"
                    onPress={handleRedo}
                    startContent={<RefreshCw size={16} />}
                    size="sm"
                    isDisabled={historyIndex >= history.length - 1}
                  >
                    Redo
                  </Button>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Info Section */}
      <InfoSection />
    </ToolLayout>
  )
}
