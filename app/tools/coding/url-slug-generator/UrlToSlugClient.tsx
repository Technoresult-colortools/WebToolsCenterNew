"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Button,
  Card,
  CardBody,
  Input,
  Switch,
  Select,
  SelectItem,
  Slider,
  Tooltip,
  Chip,
  Tabs,
  Tab,
  Textarea,
  Progress,
} from "@nextui-org/react"
import { Toaster, toast } from "react-hot-toast"
import {
  Info,
  Download,
  Eye,
  EyeOff,
  Settings,
  RefreshCcw,
  Upload,
  Clipboard,
  History,
  Sparkles,
  Check,
  X,
  TrendingUp,
} from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import InfoSectionURLSlug from "./info-section"
import { FaMagic } from "react-icons/fa"

const separators = [
  { value: "hyphen", label: "Hyphen (-)", char: "-" },
  { value: "underscore", label: "Underscore (_)", char: "_" },
  { value: "dot", label: "Dot (.)", char: "." },
  { value: "none", label: "None", char: "" },
  { value: "custom", label: "Custom", char: "" },
]

const casings = [
  { value: "lowercase", label: "Lowercase" },
  { value: "uppercase", label: "Uppercase" },
  { value: "capitalize", label: "Capitalize" },
  { value: "camelCase", label: "camelCase" },
]

const transliterationOptions = [
  { value: "none", label: "None" },
  { value: "latin", label: "Latin" },
  { value: "cyrillic", label: "Cyrillic" },
  { value: "greek", label: "Greek" },
]

const presets = [
  {
    name: "SEO Optimized",
    icon: "🎯",
    config: { separator: "hyphen", casing: "lowercase", removeStopWords: true, maxLength: 60 },
  },
  {
    name: "Developer Friendly",
    icon: "💻",
    config: { separator: "underscore", casing: "lowercase", removeStopWords: false, maxLength: 50 },
  },
  {
    name: "Clean & Short",
    icon: "✨",
    config: { separator: "hyphen", casing: "lowercase", removeStopWords: true, maxLength: 30 },
  },
  {
    name: "Camel Case",
    icon: "🐪",
    config: { separator: "none", casing: "camelCase", removeStopWords: false, maxLength: 50 },
  },
]

export default function URLSlugCreator() {
  const [input, setInput] = useState("")
  const [slug, setSlug] = useState("")
  const [separator, setSeparator] = useState("hyphen")
  const [customSeparator, setCustomSeparator] = useState("")
  const [casing, setCasing] = useState("lowercase")
  const [maxLength, setMaxLength] = useState(50)
  const [removeStopWords, setRemoveStopWords] = useState(true)
  const [customReplacements, setCustomReplacements] = useState("")
  const [preserveNumbers, setPreserveNumbers] = useState(true)
  const [transliteration, setTransliteration] = useState("none")
  const [showPassword, setShowPassword] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [selectedTab, setSelectedTab] = useState("basic")
  const [slugStats, setSlugStats] = useState({ length: 0, words: 0, valid: true, seoScore: 0 })

  const stopWords = ["a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "by"]

  useEffect(() => {
    generateSlug()
  }, [
    input,
    separator,
    customSeparator,
    casing,
    maxLength,
    removeStopWords,
    customReplacements,
    preserveNumbers,
    transliteration,
  ])

  const calculateSEOScore = (slugText: string, length: number) => {
    let score = 0

    // Length is optimal (between 30-60 chars)
    if (length >= 30 && length <= 60) score += 30
    else if (length > 0 && length < 30) score += 15

    // Contains hyphens (SEO friendly)
    if (slugText.includes("-")) score += 20

    // Lowercase (standard practice)
    if (slugText === slugText.toLowerCase()) score += 20

    // No special characters
    if (!/[^a-z0-9-_.]/.test(slugText)) score += 15

    // Readable word count (3-6 words)
    const words = slugText.split(/[-_.]/).filter((w) => w.length > 0).length
    if (words >= 3 && words <= 6) score += 15

    return score
  }

  const generateSlug = () => {
    let result = input.toLowerCase()
    const separatorChar =
      separator === "custom" ? customSeparator : separators.find((sep) => sep.value === separator)?.char || ""

    result = result.replace(/<[^>]*>/g, "")

    const replacements = customReplacements.split("\n").filter((line) => line.includes(":"))
    replacements.forEach((replacement) => {
      const [from, to] = replacement.split(":").map((s) => s.trim())
      result = result.replace(new RegExp(from, "g"), to)
    })

    if (removeStopWords) {
      result = result
        .split(" ")
        .filter((word) => !stopWords.includes(word))
        .join(" ")
    }

    if (transliteration !== "none") {
      result = transliterateText(result, transliteration)
    }

    const regex = preserveNumbers ? /[^a-z0-9]+/g : /[^a-z]+/g
    result = result.replace(regex, separatorChar)

    if (separatorChar) {
      result = result.replace(new RegExp(`^${escapeRegExp(separatorChar)}+|${escapeRegExp(separatorChar)}+$`, "g"), "")
    }

    if (casing === "uppercase") {
      result = result.toUpperCase()
    } else if (casing === "capitalize") {
      result = result
        .split(separatorChar)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(separatorChar)
    } else if (casing === "camelCase") {
      result = result
        .split(separatorChar)
        .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
        .join("")
    }

    if (result.length > maxLength) {
      result = result.slice(0, maxLength)
      if (separatorChar) {
        result = result.replace(new RegExp(`${escapeRegExp(separatorChar)}+$`), "")
      }
    }

    setSlug(result)

    // Update stats
    const words = result.split(separatorChar).filter((w) => w.length > 0).length
    const valid = result.length > 0 && result.length <= maxLength
    const seoScore = calculateSEOScore(result, result.length)
    setSlugStats({ length: result.length, words, valid, seoScore })

    // Add to history
    if (result && result.length > 0 && !history.includes(result)) {
      setHistory((prev) => [result, ...prev].slice(0, 10))
    }
  }

  const escapeRegExp = (string: string): string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  }

  const transliterateText = (text: string, type: string): string => {
    const latinMap: { [key: string]: string } = { á: "a", é: "e", í: "i", ó: "o", ú: "u", ñ: "n" }
    const cyrillicMap: { [key: string]: string } = {
      а: "a",
      б: "b",
      в: "v",
      г: "g",
      д: "d",
      е: "e",
      ё: "yo",
      ж: "zh",
      з: "z",
      и: "i",
      й: "y",
      к: "k",
      л: "l",
      м: "m",
      н: "n",
      о: "o",
      п: "p",
      р: "r",
      с: "s",
      т: "t",
      у: "u",
      ф: "f",
      х: "h",
      ц: "ts",
      ч: "ch",
      ш: "sh",
      щ: "sch",
      ъ: "",
      ы: "y",
      ь: "",
      э: "e",
      ю: "yu",
      я: "ya",
    }
    const greekMap: { [key: string]: string } = {
      α: "a",
      β: "b",
      γ: "g",
      δ: "d",
      ε: "e",
      ζ: "z",
      η: "i",
      θ: "th",
      ι: "i",
      κ: "k",
      λ: "l",
      μ: "m",
      ν: "n",
      ξ: "ks",
      ο: "o",
      π: "p",
      ρ: "r",
      σ: "s",
      τ: "t",
      υ: "y",
      φ: "f",
      χ: "x",
      ψ: "ps",
      ω: "o",
    }

    let map: { [key: string]: string }
    switch (type) {
      case "latin":
        map = latinMap
        break
      case "cyrillic":
        map = cyrillicMap
        break
      case "greek":
        map = greekMap
        break
      default:
        return text
    }

    return text.replace(/[^A-Za-z0-9\s]/g, (a) => map[a] || a)
  }

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(slug)
      .then(() => {
        toast.success("Slug copied to clipboard!")
      })
      .catch(() => {
        toast.error("Failed to copy slug. Please try again.")
      })
  }

  const handleRandomize = () => {
    const randomWords = [
      "quick",
      "brown",
      "fox",
      "jumps",
      "over",
      "lazy",
      "dog",
      "lorem",
      "ipsum",
      "dolor",
      "sit",
      "amet",
      "ultimate",
      "guide",
      "tutorial",
      "best",
      "practices",
    ]
    const randomInput = Array.from(
      { length: Math.floor(Math.random() * 3) + 4 },
      () => randomWords[Math.floor(Math.random() * randomWords.length)],
    ).join(" ")
    setInput(randomInput)
    toast.success("Random text generated!")
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([slug], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "url_slug.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast.success("Slug downloaded successfully!")
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const content = e.target?.result as string
        setInput(content)
        toast.success("File uploaded successfully!")
      }
      reader.readAsText(file)
    }
  }

  const applyPreset = (preset: (typeof presets)[0]) => {
    setSeparator(preset.config.separator)
    setCasing(preset.config.casing)
    setRemoveStopWords(preset.config.removeStopWords)
    setMaxLength(preset.config.maxLength)
    toast.success(`${preset.name} preset applied!`)
  }

  const clearAll = () => {
    setInput("")
    setSlug("")
    setHistory([])
    toast.success("All fields cleared!")
  }

  const getSEOColor = (score: number) => {
    if (score >= 80) return "success"
    if (score >= 50) return "warning"
    return "danger"
  }

  return (
    <ToolLayout
      title="URL Slug Creator"
      description="Convert any text into a clean, SEO-friendly URL slug with advanced customization options"
      toolId="678f382e26f06f912191bcb7"
    >
      <Toaster position="top-right" />
      <div className="flex flex-col gap-6">
        {/* Quick Presets Card */}
        <Card className="w-full bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 backdrop-blur-sm border border-primary/20">
          <CardBody className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-default-700">Quick Presets</h3>
              <Chip size="sm" variant="flat" color="primary">
                New
              </Chip>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {presets.map((preset) => (
                <Button
                  key={preset.name}
                  onPress={() => applyPreset(preset)}
                  color="primary"
                  variant="flat"
                  className="h-auto py-3 flex flex-col items-center gap-1"
                >
                  <span className="text-2xl">{preset.icon}</span>
                  <span className="text-xs font-semibold">{preset.name}</span>
                </Button>
              ))}
            </div>
          </CardBody>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Input and Output */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input Section */}
            <Card className="w-full bg-default-50/70 dark:bg-default-100/70 backdrop-blur-sm border border-default-200/50">
              <CardBody className="space-y-4 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-default-700 flex items-center gap-2">
                    <FaMagic className="w-5 h-5 text-primary" />
                    Input Text
                  </h2>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      color="success"
                      variant="flat"
                      onPress={handleRandomize}
                      startContent={<RefreshCcw className="w-4 h-4" />}
                    >
                      Random
                    </Button>
                    <Button
                      size="sm"
                      color="danger"
                      variant="flat"
                      onPress={clearAll}
                      startContent={<X className="w-4 h-4" />}
                    >
                      Clear
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    variant="bordered"
                    placeholder="Enter your text here... (e.g., 'How to Create Amazing URL Slugs in 2024')"
                    minRows={4}
                    className="w-full"
                    classNames={{
                      input: "placeholder:text-default-400/70 text-base",
                    }}
                  />
                  <div className="absolute bottom-3 right-3">
                    <Chip size="sm" variant="flat" color={input.length > 0 ? "primary" : "default"}>
                      {input.length} chars
                    </Chip>
                  </div>
                </div>

                {/* File Upload */}
                <div className="relative">
                  <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-default-300 rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-200">
                    <input type="file" className="hidden" onChange={handleFileUpload} accept=".txt" />
                    <Upload className="h-6 w-6 text-default-400 mb-2" />
                    <span className="text-default-600 text-sm font-medium">Upload text file</span>
                    <span className="text-default-400 text-xs mt-1">Click or drag and drop</span>
                  </label>
                </div>
              </CardBody>
            </Card>

            {/* Output Section */}
            <Card className="w-full bg-gradient-to-br from-success/10 to-primary/10 dark:from-success/20 dark:to-primary/20 backdrop-blur-sm border border-success/30">
              <CardBody className="space-y-4 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-default-700 flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    Generated Slug
                  </h2>
                  <Chip
                    color={slugStats.valid ? "success" : "warning"}
                    variant="flat"
                    size="sm"
                    startContent={slugStats.valid ? <Check className="w-3 h-3" /> : <Info className="w-3 h-3" />}
                  >
                    {slugStats.valid ? "Valid" : "Check Settings"}
                  </Chip>
                </div>

                <div className="flex gap-2">
                  <Input
                    value={slug}
                    variant="bordered"
                    readOnly
                    size="lg"
                    className="flex-grow"
                    classNames={{
                      input: "text-primary font-mono text-lg font-semibold",
                      inputWrapper: "bg-white/70 dark:bg-gray-900/50 border-2",
                    }}
                    placeholder="Your slug will appear here..."
                  />
                  <Tooltip content="Copy to clipboard">
                    <Button
                      color="primary"
                      variant="shadow"
                      isIconOnly
                      size="lg"
                      onPress={copyToClipboard}
                      isDisabled={!slug}
                    >
                      <Clipboard className="w-5 h-5" />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Download as file">
                    <Button
                      color="secondary"
                      variant="shadow"
                      isIconOnly
                      size="lg"
                      onPress={handleDownload}
                      isDisabled={!slug}
                    >
                      <Download className="w-5 h-5" />
                    </Button>
                  </Tooltip>
                </div>

                {/* Live Preview */}
                {slug && (
                  <div className="p-4 bg-white/50 dark:bg-gray-900/30 rounded-lg border border-default-200">
                    <p className="text-xs text-default-500 mb-1">Live Preview:</p>
                    <p className="text-sm text-default-600 break-all">
                      https://example.com/<span className="text-primary font-semibold">{slug}</span>
                    </p>
                  </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 bg-white/50 dark:bg-gray-900/30 rounded-lg text-center">
                    <p className="text-xs text-default-500">Length</p>
                    <p className="text-lg font-bold text-primary">
                      {slugStats.length}/{maxLength}
                    </p>
                  </div>
                  <div className="p-3 bg-white/50 dark:bg-gray-900/30 rounded-lg text-center">
                    <p className="text-xs text-default-500">Words</p>
                    <p className="text-lg font-bold text-secondary">{slugStats.words}</p>
                  </div>
                  <div className="p-3 bg-white/50 dark:bg-gray-900/30 rounded-lg text-center">
                    <p className="text-xs text-default-500">SEO Score</p>
                    <p className={`text-lg font-bold text-${getSEOColor(slugStats.seoScore)}`}>
                      {slugStats.seoScore}/100
                    </p>
                  </div>
                  <div className="p-3 bg-white/50 dark:bg-gray-900/30 rounded-lg text-center">
                    <p className="text-xs text-default-500">Status</p>
                    <p className="text-lg font-bold text-success">{slugStats.valid ? "✓" : "⚠"}</p>
                  </div>
                </div>

                {/* SEO Score Bar */}
                {slug && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-default-600 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        SEO Optimization
                      </span>
                      <span className="text-sm font-semibold text-default-700">{slugStats.seoScore}%</span>
                    </div>
                    <Progress value={slugStats.seoScore} color={getSEOColor(slugStats.seoScore)} className="h-2" />
                  </div>
                )}
              </CardBody>
            </Card>
          </div>

          {/* Right Column - Settings and History */}
          <div className="space-y-6">
            {/* Configuration Section with Tabs */}
            <Card className="w-full bg-default-50/70 dark:bg-default-100/70 backdrop-blur-sm border border-default-200/50">
              <CardBody className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-default-700">Configuration</h2>
                </div>

                <Tabs
                  selectedKey={selectedTab}
                  onSelectionChange={(key) => setSelectedTab(key as string)}
                  variant="underlined"
                  color="primary"
                  className="mb-4"
                >
                  <Tab key="basic" title="Basic" />
                  <Tab key="advanced" title="Advanced" />
                </Tabs>

                {selectedTab === "basic" && (
                  <div className="space-y-4">
                    {/* Separator */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-default-700">Separator</label>
                      <Select
                        selectedKeys={[separator]}
                        variant="bordered"
                        onChange={(e) => setSeparator(e.target.value)}
                        size="sm"
                      >
                        {separators.map((sep) => (
                          <SelectItem key={sep.value} value={sep.value}>
                            {sep.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>

                    {/* Custom Separator */}
                    {separator === "custom" && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-default-700">Custom Character</label>
                        <Input
                          value={customSeparator}
                          variant="bordered"
                          onChange={(e) => setCustomSeparator(e.target.value)}
                          placeholder="e.g., ~"
                          size="sm"
                          maxLength={1}
                        />
                      </div>
                    )}

                    {/* Casing */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-default-700">Text Casing</label>
                      <Select
                        selectedKeys={[casing]}
                        variant="bordered"
                        onChange={(e) => setCasing(e.target.value)}
                        size="sm"
                      >
                        {casings.map((c) => (
                          <SelectItem key={c.value} value={c.value}>
                            {c.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>

                    {/* Max Length Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-default-700">Max Length</label>
                        <Chip size="sm" variant="flat">
                          {maxLength}
                        </Chip>
                      </div>
                      <Slider
                        step={5}
                        maxValue={100}
                        minValue={10}
                        value={maxLength}
                        onChange={(value) => setMaxLength(value as number)}
                        className="max-w-full"
                        color="primary"
                      />
                      <p className="text-xs text-default-500">Recommended: 30-60 for SEO</p>
                    </div>

                    {/* Toggle Switches */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between p-3 bg-default-100 dark:bg-default-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Switch
                            isSelected={removeStopWords}
                            onValueChange={setRemoveStopWords}
                            color="primary"
                            size="sm"
                          />
                          <label className="text-sm font-medium text-default-700">Remove Stop Words</label>
                        </div>
                        <Tooltip content="Removes common words like 'and', 'the', 'is'" placement="left">
                          <Info className="w-4 h-4 text-default-400 cursor-help" />
                        </Tooltip>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-default-100 dark:bg-default-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Switch
                            isSelected={preserveNumbers}
                            onValueChange={setPreserveNumbers}
                            color="primary"
                            size="sm"
                          />
                          <label className="text-sm font-medium text-default-700">Preserve Numbers</label>
                        </div>
                        <Tooltip content="Keeps numbers in the slug" placement="left">
                          <Info className="w-4 h-4 text-default-400 cursor-help" />
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === "advanced" && (
                  <div className="space-y-4">
                    {/* Transliteration */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-default-700">Transliteration</label>
                      <Select
                        selectedKeys={[transliteration]}
                        variant="bordered"
                        onChange={(e) => setTransliteration(e.target.value)}
                        size="sm"
                      >
                        {transliterationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </Select>
                      <p className="text-xs text-default-500">Convert special characters to ASCII</p>
                    </div>

                    {/* Custom Replacements */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-default-700">Custom Replacements</label>
                      <Textarea
                        value={customReplacements}
                        onChange={(e) => setCustomReplacements(e.target.value)}
                        variant="bordered"
                        placeholder="old:new (one per line)&#10;e.g., &:and"
                        minRows={3}
                        size="sm"
                        classNames={{
                          input: "text-xs font-mono",
                        }}
                      />
                      <p className="text-xs text-default-500">Format: find:replace (one per line)</p>
                    </div>

                    {/* Show/Hide Input */}
                    <div className="flex items-center justify-between p-3 bg-default-100 dark:bg-default-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Switch isSelected={showPassword} onValueChange={setShowPassword} color="primary" size="sm" />
                        <label className="text-sm font-medium text-default-700">Show Input Text</label>
                      </div>
                      <Tooltip content="Toggle input visibility" placement="left">
                        {showPassword ? (
                          <Eye className="w-4 h-4 text-primary" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-default-400" />
                        )}
                      </Tooltip>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>

            {/* History Section */}
            {history.length > 0 && (
              <Card className="w-full bg-default-50/70 dark:bg-default-100/70 backdrop-blur-sm border border-default-200/50">
                <CardBody className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <History className="w-5 h-5 text-primary" />
                      <h2 className="text-lg font-semibold text-default-700">Recent Slugs</h2>
                    </div>
                    <Button size="sm" variant="flat" color="danger" onPress={() => setHistory([])}>
                      Clear
                    </Button>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {history.map((item, index) => (
                      <div
                        key={index}
                        className="p-2 bg-white/50 dark:bg-gray-900/30 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors cursor-pointer group"
                        onClick={() => {
                          navigator.clipboard.writeText(item)
                          toast.success("Slug copied to clipboard!")
                        }}
                      >
                        <p className="text-sm font-mono text-default-600 truncate group-hover:text-primary">{item}</p>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            )}


          </div>
        </div>
      </div>
      {/* Info Section */}
      <InfoSectionURLSlug />
    </ToolLayout>
  )
}
