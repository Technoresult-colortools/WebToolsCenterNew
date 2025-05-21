"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import {
  Card,
  CardBody,
  Button,
  Textarea,
  Select,
  SelectItem,
  Switch,
  Tabs,
  Tab,
  Input,
  Badge,
  Tooltip,
  Divider,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Progress,
  Chip,
} from "@nextui-org/react"
import {
  Copy,
  RefreshCw,
  Info,
  Settings,
  FileUp,
  ArrowDown,
  ArrowUp,
  Play,
  Cpu,
  Hash,
  Save,
  FileText,
  List,
  ListFilter,
  Layers,
  Trash2,
  CheckCircle2,
  AlertCircle,
  SlidersHorizontal,
  Sparkles,
  MoreVertical,
  Undo2,
  Redo2,
  Loader2,
  FileJson,
  ArrowLeftRight,
  BarChart,
  Repeat,
  Wand2,
  Filter,
  FileDown,
  Clipboard,
  FileDiff,
  ClipboardCheck,
  FileSearch,
} from "lucide-react"
import { toast } from "react-hot-toast"
import type { Key } from "@react-types/shared"
import ToolLayout from "@/components/ToolLayout"
import { useDebounce } from "@/hooks/useDebounce" // You'll need to create this hook
import InfoSection from "./InfoSection"

const filterModeOptions = [
  { value: "remove", label: "Remove duplicates", icon: <Trash2 size={16} /> },
  { value: "keep", label: "Keep only duplicates", icon: <CheckCircle2 size={16} /> },
  { value: "highlight", label: "Highlight duplicates", icon: <AlertCircle size={16} /> },
  { value: "count", label: "Count duplicates", icon: <Hash size={16} /> },
  { value: "mark", label: "Mark first occurrences", icon: <Sparkles size={16} /> },
]

const sortOptions = [
  { value: "none", label: "No sorting", icon: <List size={16} /> },
  { value: "asc", label: "Sort A-Z", icon: <ArrowDown size={16} /> },
  { value: "desc", label: "Sort Z-A", icon: <ArrowUp size={16} /> },
  { value: "length_asc", label: "Sort by length (shortest first)", icon: <ArrowDown size={16} /> },
  { value: "length_desc", label: "Sort by length (longest first)", icon: <ArrowUp size={16} /> },
  { value: "natural", label: "Natural sort", icon: <ListFilter size={16} /> },
]

const presetOptions = [
  { value: "csv_headers", label: "CSV Headers", description: "Find duplicate headers in CSV files" },
  { value: "log_errors", label: "Log Errors", description: "Extract unique error messages from logs" },
  { value: "code_imports", label: "Code Imports", description: "Clean up duplicate import statements" },
  { value: "email_list", label: "Email List", description: "Deduplicate email addresses" },
  { value: "url_list", label: "URL List", description: "Deduplicate URLs" },
]

const MAX_HISTORY_LENGTH = 20
const MAX_SAVED_PRESETS = 10

// Define TypeScript interfaces for our data structures
interface StatsType {
  inputLines: number
  outputLines: number
  duplicatesFound: number
  uniqueLines: number
  processingTime: number
  duplicateGroups: number
  longestLine: number
  shortestLine: number
  emptyLines: number
}

interface HistorySettings {
  caseSensitive: boolean
  trimWhitespace: boolean
  keepFirstOccurrence: boolean
  ignoreEmptyLines: boolean
  filterMode: string
  useRegex: boolean
  regexPattern: string
  sortOrder: string
  customSeparator: string
  addLineNumbers: boolean
  startingLineNumber: number
  groupDuplicates: boolean
  showLineStats: boolean
}

interface HistoryItem {
  input: string
  output: string
  settings: HistorySettings
  stats: StatsType
  timestamp: number
}

interface SavedPreset {
  name: string
  description: string
  settings: HistorySettings
  timestamp: number
}

export default function DuplicateLineRemover() {
  // States
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
  const [autoProcess, setAutoProcess] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [regexPattern, setRegexPattern] = useState("")
  const [useRegex, setUseRegex] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [savedPresets, setSavedPresets] = useState<SavedPreset[]>([])
  const [activePreset, setActivePreset] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState("none")
  const [groupDuplicates, setGroupDuplicates] = useState(false)
  const [showLineStats, setShowLineStats] = useState(false)
  const [presetName, setPresetName] = useState("")
  const [presetDescription, setPresetDescription] = useState("")
  const [showSavePresetDialog, setShowSavePresetDialog] = useState(false)
  const [showAdvancedStats,] = useState(false)
  const [activeTab, setActiveTab] = useState<Key>("output")
  const [duplicateMap, setDuplicateMap] = useState<Map<string, number[]>>(new Map())
  const [stats, setStats] = useState<StatsType>({
    inputLines: 0,
    outputLines: 0,
    duplicatesFound: 0,
    uniqueLines: 0,
    processingTime: 0,
    duplicateGroups: 0,
    longestLine: 0,
    shortestLine: 0,
    emptyLines: 0,
  })

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null)
  const debouncedInputText = useDebounce(inputText, 500)

  // Load saved presets from localStorage on component mount
  useEffect(() => {
    try {
      const savedPresetsJson = localStorage.getItem("duplicateLineRemoverPresets")
      if (savedPresetsJson) {
        const parsedPresets = JSON.parse(savedPresetsJson)
        if (Array.isArray(parsedPresets)) {
          setSavedPresets(parsedPresets)
        }
      }

      const historyJson = localStorage.getItem("duplicateLineRemoverHistory")
      if (historyJson) {
        const parsedHistory = JSON.parse(historyJson)
        if (Array.isArray(parsedHistory)) {
          setHistory(parsedHistory)
          setHistoryIndex(parsedHistory.length - 1)
        }
      }
    } catch (error) {
      console.error("Error loading saved data:", error)
    }
  }, [])

  // Save history to localStorage when it changes
  useEffect(() => {
    try {
      if (history.length > 0) {
        localStorage.setItem("duplicateLineRemoverHistory", JSON.stringify(history))
      }
    } catch (error) {
      console.error("Error saving history:", error)
    }
  }, [history])

  // Save presets to localStorage when they change
  useEffect(() => {
    try {
      if (savedPresets.length > 0) {
        localStorage.setItem("duplicateLineRemoverPresets", JSON.stringify(savedPresets))
      }
    } catch (error) {
      console.error("Error saving presets:", error)
    }
  }, [savedPresets])

  // Apply preset settings
  const applyPreset = useCallback(
    (presetId: string) => {
      // Built-in presets
      if (presetId === "csv_headers") {
        setCaseSensitive(false)
        setTrimWhitespace(true)
        setKeepFirstOccurrence(true)
        setIgnoreEmptyLines(true)
        setFilterMode("remove")
        setCustomSeparator(",")
        setSortOrder("asc")
        setUseRegex(false)
        setRegexPattern("")
        setActivePreset("csv_headers")
        toast.success("Applied CSV Headers preset")
        return
      }

      if (presetId === "log_errors") {
        setCaseSensitive(true)
        setTrimWhitespace(true)
        setKeepFirstOccurrence(true)
        setIgnoreEmptyLines(true)
        setFilterMode("remove")
        setCustomSeparator("")
        setSortOrder("none")
        setUseRegex(true)
        setRegexPattern("error|exception|fail|warning")
        setActivePreset("log_errors")
        toast.success("Applied Log Errors preset")
        return
      }

      if (presetId === "code_imports") {
        setCaseSensitive(true)
        setTrimWhitespace(true)
        setKeepFirstOccurrence(true)
        setIgnoreEmptyLines(true)
        setFilterMode("remove")
        setCustomSeparator("")
        setSortOrder("asc")
        setUseRegex(true)
        setRegexPattern("^(import|from|require|#include)")
        setActivePreset("code_imports")
        toast.success("Applied Code Imports preset")
        return
      }

      if (presetId === "email_list") {
        setCaseSensitive(false)
        setTrimWhitespace(true)
        setKeepFirstOccurrence(true)
        setIgnoreEmptyLines(true)
        setFilterMode("remove")
        setCustomSeparator("")
        setSortOrder("asc")
        setUseRegex(true)
        setRegexPattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}")
        setActivePreset("email_list")
        toast.success("Applied Email List preset")
        return
      }

      if (presetId === "url_list") {
        setCaseSensitive(false)
        setTrimWhitespace(true)
        setKeepFirstOccurrence(true)
        setIgnoreEmptyLines(true)
        setFilterMode("remove")
        setCustomSeparator("")
        setSortOrder("asc")
        setUseRegex(true)
        setRegexPattern("https?://[^\\s]+")
        setActivePreset("url_list")
        toast.success("Applied URL List preset")
        return
      }

      // User-saved presets
      const preset = savedPresets.find((p) => p.name === presetId)
      if (preset) {
        setCaseSensitive(preset.settings.caseSensitive)
        setTrimWhitespace(preset.settings.trimWhitespace)
        setKeepFirstOccurrence(preset.settings.keepFirstOccurrence)
        setIgnoreEmptyLines(preset.settings.ignoreEmptyLines)
        setFilterMode(preset.settings.filterMode)
        setCustomSeparator(preset.settings.customSeparator)
        setSortOrder(preset.settings.sortOrder)
        setUseRegex(preset.settings.useRegex)
        setRegexPattern(preset.settings.regexPattern)
        setAddLineNumbers(preset.settings.addLineNumbers)
        setStartingLineNumber(preset.settings.startingLineNumber)
        setGroupDuplicates(preset.settings.groupDuplicates)
        setShowLineStats(preset.settings.showLineStats)
        setActivePreset(presetId)
        toast.success(`Applied preset: ${preset.name}`)
      }
    },
    [savedPresets, setRegexPattern, setCaseSensitive, setTrimWhitespace, setKeepFirstOccurrence, setIgnoreEmptyLines, setFilterMode, setCustomSeparator, setSortOrder, setUseRegex, setAddLineNumbers, setStartingLineNumber, setGroupDuplicates, setShowLineStats, setActivePreset],
  )

  // Save current settings as a preset
  const saveCurrentPreset = useCallback(() => {
    if (!presetName.trim()) {
      toast.error("Please enter a preset name")
      return
    }

    // Check if name already exists
    const existingPresetIndex = savedPresets.findIndex((p) => p.name === presetName)

    const newPreset: SavedPreset = {
      name: presetName,
      description: presetDescription,
      settings: {
        caseSensitive,
        trimWhitespace,
        keepFirstOccurrence,
        ignoreEmptyLines,
        filterMode,
        useRegex,
        regexPattern,
        sortOrder,
        customSeparator,
        addLineNumbers,
        startingLineNumber,
        groupDuplicates,
        showLineStats,
      },
      timestamp: Date.now(),
    }

    if (existingPresetIndex >= 0) {
      // Update existing preset
      const updatedPresets = [...savedPresets]
      updatedPresets[existingPresetIndex] = newPreset
      setSavedPresets(updatedPresets)
      toast.success(`Updated preset: ${presetName}`)
    } else {
      // Add new preset, limiting to MAX_SAVED_PRESETS
      const updatedPresets = [...savedPresets, newPreset].slice(-MAX_SAVED_PRESETS)
      setSavedPresets(updatedPresets)
      toast.success(`Saved preset: ${presetName}`)
    }

    setPresetName("")
    setPresetDescription("")
    setShowSavePresetDialog(false)
  }, [
    presetName,
    presetDescription,
    savedPresets,
    caseSensitive,
    trimWhitespace,
    keepFirstOccurrence,
    ignoreEmptyLines,
    filterMode,
    useRegex,
    regexPattern,
    sortOrder,
    customSeparator,
    addLineNumbers,
    startingLineNumber,
    groupDuplicates,
    showLineStats,
  ])

  // Delete a saved preset
  const deletePreset = useCallback(
    (presetName: string) => {
      const updatedPresets = savedPresets.filter((p) => p.name !== presetName)
      setSavedPresets(updatedPresets)
      if (activePreset === presetName) {
        setActivePreset(null)
      }
      toast.success(`Deleted preset: ${presetName}`)
    },
    [savedPresets, activePreset],
  )

  // Process text with performance improvements and better logic
  const processText = useCallback(() => {
    if (!inputText.trim()) {
      setOutputText("")
      setDuplicateMap(new Map())
      setStats({
        inputLines: 0,
        outputLines: 0,
        duplicatesFound: 0,
        uniqueLines: 0,
        processingTime: 0,
        duplicateGroups: 0,
        longestLine: 0,
        shortestLine: 0,
        emptyLines: 0,
      })
      return
    }

    setIsProcessing(true)
    const startTime = performance.now()

    // Use setTimeout to prevent UI freeze for large inputs
    setTimeout(() => {
      try {
        const lines = inputText.split(customSeparator || "\n")
        const seen = new Map<string, { index: number; count: number; originalLine: string; indices: number[] }>()
        const result: string[] = []
        const duplicateIndices = new Set<number>()
        let duplicateCount = 0
        let uniqueCount = 0
        let duplicateGroups = 0
        let longestLine = 0
        let shortestLine = Number.POSITIVE_INFINITY
        let emptyLines = 0
        const newDuplicateMap = new Map<string, number[]>()

        for (let i = 0; i < lines.length; i++) {
          let line = lines[i]

          // Track empty lines
          if (line === "") {
            emptyLines++
          }

          // Track line length stats
          if (line.length > 0) {
            longestLine = Math.max(longestLine, line.length)
            shortestLine = Math.min(shortestLine, line.length)
          }

          if (trimWhitespace) {
            line = line.trim()
          }

          if (ignoreEmptyLines && line === "") {
            continue
          }

          // Apply regex filter if enabled
          if (useRegex && regexPattern) {
            try {
              const regex = new RegExp(regexPattern, caseSensitive ? "" : "i")
              if (!regex.test(line)) {
                continue
              }
            } catch (error) {
              // Skip regex on error, but continue processing
              console.error("Regex error:", error)
            }
          }

          const key = caseSensitive ? line : line.toLowerCase()

          // Improved duplicate detection logic
          if (!seen.has(key)) {
            seen.set(key, { index: i, count: 1, originalLine: lines[i], indices: [i] })
            uniqueCount++

            if (filterMode !== "keep" && filterMode !== "count") {
              if (filterMode === "mark") {
                result.push(`✓ ${lines[i]}`) // Mark first occurrences
              } else {
                result.push(lines[i])
              }
            }
          } else {
            const entry = seen.get(key)!
            entry.count++
            entry.indices.push(i)
            seen.set(key, entry)
            duplicateIndices.add(i)
            duplicateCount++

            // First time we've found a duplicate for this key
            if (entry.count === 2) {
              duplicateGroups++

              // Add to duplicate map for visualization
              newDuplicateMap.set(key, entry.indices)

              if (filterMode === "keep" || filterMode === "count") {
                if (keepFirstOccurrence) {
                  // If this is the second occurrence and we want to keep the first one,
                  // add the first occurrence to the result
                  result.push(entry.originalLine)
                }
              }
            }

            if (filterMode === "keep") {
              result.push(lines[i])
            } else if (filterMode === "highlight") {
              result.push(`>> ${lines[i]} <<`) // Highlight duplicates
            } else if (filterMode === "mark") {
              result.push(`⟳ ${lines[i]}`) // Mark duplicates
            }
          }
        }

        // Generate the output text
        let outputLines: string[] = []

        if (filterMode === "count") {
          // For count mode, show counts of each line
          const countEntries = Array.from(seen.entries())
            .filter(([, data]) => data.count > (keepFirstOccurrence ? 1 : 0))
            .sort((a, b) => b[1].count - a[1].count) // Sort by count, most frequent first

          outputLines = countEntries.map(([, data]) => `${data.count}× ${data.originalLine}`)
        } else {
          outputLines = result
        }

        // Apply sorting if requested
        if (sortOrder !== "none") {
          if (sortOrder === "asc") {
            outputLines.sort((a, b) => a.localeCompare(b))
          } else if (sortOrder === "desc") {
            outputLines.sort((a, b) => b.localeCompare(a))
          } else if (sortOrder === "length_asc") {
            outputLines.sort((a, b) => a.length - b.length)
          } else if (sortOrder === "length_desc") {
            outputLines.sort((a, b) => b.length - a.length)
          } else if (sortOrder === "natural") {
            outputLines.sort((a, b) => {
              return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
            })
          }
        }

        // Group duplicates if requested
        if (groupDuplicates && filterMode !== "count") {
          const groups = new Map<string, string[]>()

          // First pass: collect all duplicates into groups
          for (const [key, data] of seen.entries()) {
            if (data.count > 1) {
              const originalLines = data.indices.map((idx) => lines[idx])
              groups.set(key, originalLines)
            }
          }

          // Second pass: build output with groups
          const groupedOutput: string[] = []

          // First add all non-duplicates if we're not in "keep" mode
          if (filterMode !== "keep") {
            for (const [, data] of seen.entries()) {
              if (data.count === 1) {
                groupedOutput.push(data.originalLine)
              }
            }

            if (groups.size > 0) {
              groupedOutput.push("\n--- Duplicate Groups ---")
            }
          }

          // Then add all duplicate groups
          let groupNum = 1
          for (const [, lines] of groups.entries()) {
            groupedOutput.push(`\n[Group ${groupNum}] ${lines.length} occurrences:`)
            lines.forEach((line, i) => {
              groupedOutput.push(`  ${i + 1}. ${line}`)
            })
            groupNum++
          }

          outputLines = groupedOutput
        }

        // Add line numbers if requested
        if (addLineNumbers) {
          // Format line numbers with consistent padding
          const digits = (outputLines.length + startingLineNumber).toString().length
          outputLines = outputLines.map(
            (line, index) => `${(index + startingLineNumber).toString().padStart(digits, "0")}  ${line}`,
          )
        }

        setOutputText(outputLines.join("\n"))
        setDuplicateMap(newDuplicateMap)

        // Update stats
        const endTime = performance.now()
        const newStats = {
          inputLines: lines.length,
          outputLines: outputLines.length,
          duplicatesFound: duplicateCount,
          uniqueLines: uniqueCount,
          processingTime: Math.round(endTime - startTime),
          duplicateGroups,
          longestLine,
          shortestLine: shortestLine === Number.POSITIVE_INFINITY ? 0 : shortestLine,
          emptyLines,
        }
        setStats(newStats)

        // Add to history if result is different from current
        if (outputLines.join("\n") !== (history[historyIndex] || {}).output) {
          const newHistoryItem: HistoryItem = {
            input: inputText,
            output: outputLines.join("\n"),
            settings: {
              caseSensitive,
              trimWhitespace,
              keepFirstOccurrence,
              ignoreEmptyLines,
              filterMode,
              useRegex,
              regexPattern,
              sortOrder,
              customSeparator,
              addLineNumbers,
              startingLineNumber,
              groupDuplicates,
              showLineStats,
            },
            stats: newStats,
            timestamp: Date.now(),
          }

          setHistory((prev) => {
            // If we're not at the end of history, truncate
            const relevantHistory = historyIndex < prev.length - 1 ? prev.slice(0, historyIndex + 1) : prev

            // Add new item and limit history length
            const newHistory = [...relevantHistory, newHistoryItem].slice(-MAX_HISTORY_LENGTH)
            setHistoryIndex(newHistory.length - 1)
            return newHistory
          })
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error"
        toast.error(`Processing error: ${errorMessage}`)
        console.error("Text processing error:", error)
      } finally {
        setIsProcessing(false)
      }
    }, 0)
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
    useRegex,
    regexPattern,
    sortOrder,
    groupDuplicates,
    showLineStats,
    history,
    historyIndex,
  ])

  // Process text either automatically or manually
  useEffect(() => {
    if (autoProcess && debouncedInputText !== undefined) {
      processText()
    }
  }, [debouncedInputText, autoProcess, processText])

  // Clipboard operations
  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!")
  }, [])

  // Clear operations
  const handleClear = useCallback(() => {
    setInputText("")
    setOutputText("")
    setDuplicateMap(new Map())
    setStats({
      inputLines: 0,
      outputLines: 0,
      duplicatesFound: 0,
      uniqueLines: 0,
      processingTime: 0,
      duplicateGroups: 0,
      longestLine: 0,
      shortestLine: 0,
      emptyLines: 0,
    })
    toast.success("Text Cleared!")
  }, [])

  // Sorting operations
  const handleSort = useCallback(
    (sortType: string) => {
      setSortOrder(sortType)
      if (inputText.trim()) {
        processText()
      }
    },
    [inputText, processText],
  )

  // File operations
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsProcessing(true)
    toast.loading("Reading file...", { id: "fileUpload" })

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        if (content) {
          setInputText(content)
          toast.success("File uploaded successfully", { id: "fileUpload" })
        }
        // Clear the file input for future uploads
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error"
        toast.error(`File reading error: ${errorMessage}`, { id: "fileUpload" })
      } finally {
        setIsProcessing(false)
      }
    }

    reader.onerror = () => {
      toast.error("Failed to read file", { id: "fileUpload" })
      setIsProcessing(false)
    }

    reader.readAsText(file)
  }, [])

  const handleDownload = useCallback((content: string, fileType: string) => {
    try {
      const element = document.createElement("a")
      const file = new Blob([content], { type: "text/plain" })
      element.href = URL.createObjectURL(file)
      element.download = `processed_${fileType}_${new Date().toISOString().slice(0, 10)}.txt`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      URL.revokeObjectURL(element.href) // Clean up
      toast.success("File downloaded successfully")
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      toast.error(`Download error: ${errorMessage}`)
    }
  }, [])

  // History navigation
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      const historyItem = history[newIndex]
      setInputText(historyItem.input)
      setOutputText(historyItem.output)
      setStats(historyItem.stats)

      // Restore settings
      setCaseSensitive(historyItem.settings.caseSensitive)
      setTrimWhitespace(historyItem.settings.trimWhitespace)
      setKeepFirstOccurrence(historyItem.settings.keepFirstOccurrence)
      setIgnoreEmptyLines(historyItem.settings.ignoreEmptyLines)
      setFilterMode(historyItem.settings.filterMode)
      setUseRegex(historyItem.settings.useRegex)
      setRegexPattern(historyItem.settings.regexPattern)
      setSortOrder(historyItem.settings.sortOrder)
      setCustomSeparator(historyItem.settings.customSeparator)
      setAddLineNumbers(historyItem.settings.addLineNumbers)
      setStartingLineNumber(historyItem.settings.startingLineNumber)
      setGroupDuplicates(historyItem.settings.groupDuplicates)
      setShowLineStats(historyItem.settings.showLineStats)

      setHistoryIndex(newIndex)
      toast.success("Undone to previous state")
    } else {
      toast.error("No more history to undo")
    }
  }, [history, historyIndex])

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      const historyItem = history[newIndex]
      setInputText(historyItem.input)
      setOutputText(historyItem.output)
      setStats(historyItem.stats)

      // Restore settings
      setCaseSensitive(historyItem.settings.caseSensitive)
      setTrimWhitespace(historyItem.settings.trimWhitespace)
      setKeepFirstOccurrence(historyItem.settings.keepFirstOccurrence)
      setIgnoreEmptyLines(historyItem.settings.ignoreEmptyLines)
      setFilterMode(historyItem.settings.filterMode)
      setUseRegex(historyItem.settings.useRegex)
      setRegexPattern(historyItem.settings.regexPattern)
      setSortOrder(historyItem.settings.sortOrder)
      setCustomSeparator(historyItem.settings.customSeparator)
      setAddLineNumbers(historyItem.settings.addLineNumbers)
      setStartingLineNumber(historyItem.settings.startingLineNumber)
      setGroupDuplicates(historyItem.settings.groupDuplicates)
      setShowLineStats(historyItem.settings.showLineStats)

      setHistoryIndex(newIndex)
      toast.success("Redone to next state")
    } else {
      toast.error("No more history to redo")
    }
  }, [history, historyIndex])

  // Generate diff view
  const generateDiff = useCallback((): string => {
    // Early return with empty string if inputs aren't valid
    if (!inputText || !outputText) {
      return ""
    }

    // Create a simple line-by-line diff
    const inputLines = inputText.split("\n")
    const outputLines = outputText.split("\n")

    let diffText = ""
    const maxLength = Math.max(inputLines.length, outputLines.length)

    for (let i = 0; i < maxLength; i++) {
      const inputLine = i < inputLines.length ? inputLines[i] : ""
      const outputLine = i < outputLines.length ? outputLines[i] : ""

      if (inputLine === outputLine) {
        diffText += ` ${inputLine}\n`
      } else if (inputLine === "") {
        diffText += `+${outputLine}\n`
      } else if (outputLine === "") {
        diffText += `-${inputLine}\n`
      } else {
        diffText += `-${inputLine}\n+${outputLine}\n`
      }
    }

    return diffText
  }, [inputText, outputText])

  // Export settings and results as JSON
  const exportAsJson = useCallback(() => {
    try {
      const exportData = {
        timestamp: new Date().toISOString(),
        settings: {
          caseSensitive,
          trimWhitespace,
          keepFirstOccurrence,
          ignoreEmptyLines,
          filterMode,
          useRegex,
          regexPattern,
          sortOrder,
          customSeparator,
          addLineNumbers,
          startingLineNumber,
          groupDuplicates,
          showLineStats,
        },
        stats,
        input: {
          text: inputText,
          lineCount: stats.inputLines,
        },
        output: {
          text: outputText,
          lineCount: stats.outputLines,
        },
        duplicateGroups: Array.from(duplicateMap.entries()).map(([key, indices]) => ({
          text: key,
          occurrences: indices.length,
          positions: indices,
        })),
      }

      const jsonString = JSON.stringify(exportData, null, 2)
      const element = document.createElement("a")
      const file = new Blob([jsonString], { type: "application/json" })
      element.href = URL.createObjectURL(file)
      element.download = `duplicate_analysis_${new Date().toISOString().slice(0, 10)}.json`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      URL.revokeObjectURL(element.href)
      toast.success("Analysis exported as JSON")
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      toast.error(`Export error: ${errorMessage}`)
    }
  }, [
    inputText,
    outputText,
    stats,
    caseSensitive,
    trimWhitespace,
    keepFirstOccurrence,
    ignoreEmptyLines,
    filterMode,
    useRegex,
    regexPattern,
    sortOrder,
    customSeparator,
    addLineNumbers,
    startingLineNumber,
    groupDuplicates,
    showLineStats,
    duplicateMap,
  ])

  // Apply text to input from output
  const applyToInput = useCallback(() => {
    if (outputText) {
      setInputText(outputText)
      toast.success("Output applied to input")
    }
  }, [outputText])

  // Generate sample text for testing
  const generateSampleText = useCallback(() => {
    const sampleText = `Line 1
Line 2
Line 3
Line 1
Line 4
Line 2
Line 5
Line 3
Line 6
Line 1`
    setInputText(sampleText)
    toast.success("Sample text generated")
  }, [])


  return (
    <ToolLayout
      title="Duplicate Line Remover & Analyzer"
      description="Clean up your text by removing, keeping, or analyzing duplicate lines with advanced options"
      toolId="678f382926f06f912191bc86"
    >
      <div className="flex flex-col gap-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            {/* Input and Output Section with equal heights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Section */}
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-xl font-semibold text-primary-600 dark:text-primary-400 flex items-center gap-2">
                    <FileText size={18} />
                    Input Text
                  </div>
                  <div className="flex items-center gap-2">
                    {stats.inputLines > 0 && (
                      <Badge  variant="flat" className="mr-2">
                        {stats.inputLines.toLocaleString()} lines
                      </Badge>
                    )}
                    
                  </div>
                </div>

                <div className="flex-grow flex flex-col">
                  <Textarea
                    value={inputText}
                    onValueChange={setInputText}
                    placeholder="Type or paste your text here"
                    minRows={12}
                    className="w-full mb-2 flex-grow"
                    variant="bordered"
                    isDisabled={isProcessing}
                  />
                </div>

                   {/* Stats display in a collapsible section */}
                {stats.inputLines > 0 && (
                  <Card className="mb-3 bg-default-100/50 dark:bg-default-50/50">
                    <CardBody className="p-3">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-semibold flex items-center gap-1 text-default-700">
                          <BarChart size={16} />
                          Text Statistics
                        </h3>
                     
                      </div>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div>
                          <span className="text-default-500">Input:</span>{" "}
                          <span className="font-medium text-default-700">{stats.inputLines.toLocaleString()} lines</span>
                        </div>
                        <div>
                          <span className="text-default-500">Output:</span>{" "}
                          <span className="font-medium text-default-700">{stats.outputLines.toLocaleString()} lines</span>
                        </div>
                        <div>
                          <span className="text-default-500">Duplicates:</span>{" "}
                          <span className="font-medium text-default-700">{stats.duplicatesFound.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-default-500">Unique:</span>{" "}
                          <span className="font-medium text-default-700">{stats.uniqueLines.toLocaleString()}</span>
                        </div>

                    
                            <div>
                              <span className="text-default-500">Dup Groups:</span>{" "}
                              <span className="font-medium text-default-700">{stats.duplicateGroups.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-default-500">Empty Lines:</span>{" "}
                              <span className="font-medium text-default-700">{stats.emptyLines.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-default-500">Longest Line:</span>{" "}
                              <span className="font-medium text-default-700">{stats.longestLine} chars</span>
                            </div>
                            <div>
                              <span className="text-default-500">Processing:</span>{" "}
                              <span className="font-medium text-default-700">{stats.processingTime}ms</span>
                            </div>
                   
            
                      </div>

                      {showAdvancedStats && stats.duplicateGroups > 0 && stats.inputLines > 0 && (
                        <div className="mt-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Repeat size={14} className="text-primary-500" />
                            <span className="text-sm font-medium text-default-700">Duplicate Distribution</span>
                          </div>
                          <Progress
                            size="sm"
                            value={(stats.duplicatesFound / stats.inputLines) * 100}
                            color="primary"
                            className="mb-1"
                            aria-label="Duplicate percentage"
                          />
                          <div className="flex justify-between text-xs text-default-500">
                            <span>{Math.round((stats.duplicatesFound / stats.inputLines) * 100)}% duplicates</span>
                            <span>{Math.round((stats.uniqueLines / stats.inputLines) * 100)}% unique</span>
                          </div>
                        </div>
                      )}
                    </CardBody>
                  </Card>
                )}

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-2">
                  <div className="flex items-center">
                    <Switch
                      size="sm"
                      isSelected={autoProcess}
                      onValueChange={setAutoProcess}
                      className="mr-2"
                    >
                      Auto Process
                    </Switch>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      color="primary"
                      onPress={processText}
                      isDisabled={isProcessing || !inputText}
                      startContent={
                        isProcessing ? (
                          <Loader2 className="animate-spin" size={16} />
                        ) : (
                          <Play size={16} />
                        )
                      }
                    >
                      {isProcessing ? "Processing..." : "Process"}
                    </Button>

                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Button
                        as="span" // Important for label wrapping
                        size="sm"
                        color="primary"
                        variant="flat"
                        isDisabled={isProcessing}
                        startContent={<FileUp size={16} />}
                      >
                        Upload
                      </Button>
                      <input
                        id="file-upload"
                        ref={fileInputRef}
                        type="file"
                        accept=".txt,.csv,.md,.json,.log"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

             
              </div>

              {/* Output Section */}
              <div className="flex flex-col h-full">
                <Tabs
                  aria-label="Output Options"
                  selectedKey={activeTab}
                  onSelectionChange={(key) => setActiveTab(key)} // Assuming setActiveTab handles React.Key
                  color="primary"
                  size="sm"
                  classNames={{
                    base: "mb-2", // Adjusted from mb-4 to mb-2
                    tabList: "bg-default-100 dark:bg-default-50 p-1 rounded-md",
                    cursor: "bg-white dark:bg-default-200",
                    tabContent: "group-data-[selected=true]:text-primary"
                  }}
                >
                  <Tab
                    key="output"
                    title={
                      <div className="flex items-center gap-2">
                        <Filter size={16} /> {/* Icon size consistency */}
                        <span className="hidden sm:inline">Processed Output</span>
                        <span className="sm:hidden">Output</span>
                      </div>
                    }
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-xl font-semibold text-success-600 dark:text-success-400 flex items-center gap-2">
                          <FileText size={18} />
                          Result
                        </div>
                        <div className="flex items-center gap-2">
                          {stats.outputLines > 0 && (
                            <Badge color="success" variant="flat">
                              {stats.outputLines.toLocaleString()} lines
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex-grow">
                        <Textarea
                          value={outputText}
                          isReadOnly
                          minRows={12}
                          variant="bordered"
                          placeholder="Processed output will appear here"
                          className="h-full w-full" // Ensure textarea tries to fill its container
                          classNames={{ inputWrapper: "h-full" }}
                        />
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        <Button
                          size="sm"
                          color="primary"
                          onPress={() => handleCopy(outputText)}
                          isDisabled={!outputText}
                          startContent={<Clipboard size={16} />}
                        >
                          Copy Result
                        </Button>
                        <Button
                          size="sm"
                          color="primary"
                          variant="flat"
                          onPress={() => handleDownload(outputText, "result.txt")}
                          isDisabled={!outputText}
                          startContent={<FileDown size={16} />}
                        >
                          Download
                        </Button>
                        <Button
                          size="sm"
                          color="primary"
                          variant="bordered" // Changed for variety, can be flat
                          onPress={applyToInput}
                          isDisabled={!outputText}
                          startContent={<ArrowLeftRight size={16} />}
                        >
                          Apply to Input
                        </Button>
                      </div>
                    </div>
                  </Tab>

                  <Tab
                    key="diff"
                    title={
                      <div className="flex items-center gap-2">
                        <FileDiff size={16} />
                        <span className="hidden sm:inline">Diff View</span>
                        <span className="sm:hidden">Diff</span>
                      </div>
                    }
                  >
                    <div className="flex flex-col h-full">
                      <div className="mb-2">
                        <p className="text-sm text-default-600 dark:text-default-400">
                          <Info size={14} className="inline mr-1 align-middle" />
                          Lines with "-" were removed, "+" were added.
                        </p>
                      </div>
                      <div className="flex-grow">
                        <Textarea
                          value={(inputText && outputText) || (inputText && !outputText && filterMode !== "remove_duplicates" && filterMode !== "keep_duplicates") ? generateDiff() : ""}
                          isReadOnly
                          minRows={12}
                          variant="bordered"
                          placeholder="Process text to see differences"
                          classNames={{
                            input: "font-mono text-sm", // Ensure monospace for diff
                            inputWrapper: "h-full"
                          }}
                          className="h-full w-full"
                        />
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        <Button
                          size="sm"
                          color="primary"
                          onPress={() => {
                            if ((inputText && outputText) || (inputText && !outputText && filterMode !== "remove_duplicates" && filterMode !== "keep_duplicates")) {
                              handleCopy(generateDiff());
                            } else {
                              toast.error("Input and Output text (or specific filter mode) needed for diff.");
                            }
                          }}
                          isDisabled={!((inputText && outputText) || (inputText && !outputText && filterMode !== "remove_duplicates" && filterMode !== "keep_duplicates"))}
                          startContent={<ClipboardCheck size={16} />}
                        >
                          Copy Diff
                        </Button>
                        <Button
                          size="sm"
                          color="primary"
                          variant="flat"
                           onPress={() => {
                            if ((inputText && outputText) || (inputText && !outputText && filterMode !== "remove_duplicates" && filterMode !== "keep_duplicates")) {
                              handleDownload(generateDiff(), "diff.txt");
                            } else {
                              toast.error("Input and Output text (or specific filter mode) needed for diff.");
                            }
                          }}
                          isDisabled={!((inputText && outputText) || (inputText && !outputText && filterMode !== "remove_duplicates" && filterMode !== "keep_duplicates"))}
                          startContent={<FileDown size={16} />}
                        >
                          Download Diff
                        </Button>
                      </div>
                    </div>
                  </Tab>

                  <Tab
                    key="analysis"
                    title={
                      <div className="flex items-center gap-2">
                        <FileSearch size={16} />
                        <span className="hidden sm:inline">Duplicate Analysis</span>
                        <span className="sm:hidden">Analysis</span>
                      </div>
                    }
                  >
                    <div className="flex flex-col h-full">
                       <div className="mb-2">
                        <p className="text-sm text-default-600 dark:text-default-400">
                          <Info size={14} className="inline mr-1 align-middle" />
                          Detailed analysis of duplicate patterns in your text.
                        </p>
                      </div>
                      <div className="flex-grow overflow-hidden"> {/* Handles overflow for the content below */}
                        {duplicateMap.size > 0 ? (
                          <div className="flex flex-col h-full"> {/* This div takes up the height */}
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="text-md font-semibold text-default-700">Duplicate Groups ({duplicateMap.size})</h3>
                              <Chip color="primary" variant="flat" size="sm">
                                {stats.duplicatesFound} total duplicates
                              </Chip>
                            </div>
                            <div className="max-h-[360px] overflow-y-auto space-y-3 pr-2 flex-grow custom-scrollbar">
                              {Array.from(duplicateMap.entries()).map(([key, indices], idx) => (
                                <Card key={idx} shadow="sm" className="bg-default-100/70 dark:bg-default-100/50">
                                  <CardBody className="p-3">
                                    <div className="flex justify-between items-center mb-1">
                                      <div className="flex items-center gap-2">
                                        <Chip size="sm" color="warning" variant="flat">
                                          {indices.length}×
                                        </Chip>
                                        <span className="text-sm font-medium text-default-700">Group {idx + 1}</span>
                                      </div>
                                      <Button size="sm" isIconOnly variant="light" onPress={() => handleCopy(key)} aria-label={`Copy duplicate group ${idx + 1} text`}>
                                        <Copy size={14} />
                                      </Button>
                                    </div>
                                    <pre className="bg-default-200/50 dark:bg-default-200/30 p-2 rounded text-xs font-mono mb-2 overflow-x-auto custom-scrollbar whitespace-pre-wrap break-all">
                                      {key.length > 150 ? `${key.substring(0, 150)}...` : key}
                                    </pre>
                                    <div className="text-xs text-default-500">
                                      <span>Found at lines: </span>
                                      {indices.slice(0, 5).map((lineIdx, i) => (
                                        <Chip key={i} size="sm" variant="dot" color="secondary" className="mr-1 mb-1">
                                          {lineIdx + 1}
                                        </Chip>
                                      ))}
                                      {indices.length > 5 && (
                                        <Chip size="sm" variant="flat">
                                          +{indices.length - 5} more
                                        </Chip>
                                      )}
                                    </div>
                                  </CardBody>
                                </Card>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-8 text-default-500 flex-grow flex flex-col justify-center items-center h-full">
                            <FileSearch size={32} className="mx-auto mb-2 opacity-50" />
                            <p>No duplicates found or text not processed yet.</p>
                            <p className="text-xs mt-1">Process your text to see duplicate analysis.</p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        <Button
                          size="sm"
                          color="primary"
                          variant="flat"
                          onPress={exportAsJson}
                          isDisabled={duplicateMap.size === 0}
                          startContent={<FileJson size={16} />}
                        >
                          Export Analysis (JSON)
                        </Button>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>

            {/* Options Panel (moved below both input and output) */}
            <Card className="mt-6 w-full bg-default-50 dark:bg-default-100">
              <CardBody className="p-4">
                <Tabs
                  aria-label="Processing Options"
                  color="primary"
                  size="sm"
                  variant="underlined" // Or "light", "solid"
                  classNames={{
                    base: "mb-4 w-full",
                    tabList: "gap-2 w-full relative rounded-none p-0 border-b border-divider",
                    cursor: "w-full bg-primary-400/20 dark:bg-primary-600/20",
                    tab: "max-w-fit px-3 h-10",
                    tabContent: "group-data-[selected=true]:text-primary font-medium"
                  }}
                >
                  <Tab
                    key="basic"
                    title={
                      <div className="flex items-center gap-1">
                        <Settings size={16} />
                        <span className="hidden sm:inline">Basic Options</span>
                        <span className="sm:hidden">Basic</span>
                      </div>
                    }
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-3">
                        <Select
                          label="Filter Mode"
                          selectedKeys={[filterMode]}
                          onChange={(e) => setFilterMode(e.target.value)}
                          size="sm"
                          variant="bordered"
                          description="How to handle duplicate lines."
                        >
                          {filterModeOptions.map((option) => (
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
                        <Select
                          label="Sort Order (Output)"
                          selectedKeys={[sortOrder]}
                          onChange={(e) => handleSort(e.target.value)}
                          size="sm"
                          variant="bordered"
                          description="Sort the processed lines."
                        >
                          {sortOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value} startContent={option.icon} className="text-default-700">
                              {option.label}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                      <div className="flex flex-col gap-2 pt-1"> {/* Reduced gap from gap-3 */}
                        <Switch classNames={{label: "text-sm"}} isSelected={caseSensitive} onValueChange={setCaseSensitive} size="sm">
                          Case Sensitive Comparison
                        </Switch>
                        <Switch classNames={{label: "text-sm"}} isSelected={trimWhitespace} onValueChange={setTrimWhitespace} size="sm">
                          Trim Whitespace (ends of lines)
                        </Switch>
                        <Switch classNames={{label: "text-sm"}} isSelected={keepFirstOccurrence} onValueChange={setKeepFirstOccurrence} size="sm" isDisabled={filterMode !== "remove_duplicates" && filterMode !== "keep_duplicates"}>
                          Keep First Occurrence (vs. Last)
                        </Switch>
                        <Switch classNames={{label: "text-sm"}} isSelected={ignoreEmptyLines} onValueChange={setIgnoreEmptyLines} size="sm">
                          Ignore Empty Lines in Processing
                        </Switch>
                      </div>
                    </div>
                  </Tab>

                  <Tab
                    key="advanced"
                    title={
                      <div className="flex items-center gap-1">
                        <Cpu size={16} />
                        <span className="hidden sm:inline">Advanced Options</span>
                        <span className="sm:hidden">Advanced</span>
                      </div>
                    }
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                       <div className="space-y-3">
                        <Input
                          type="text"
                          label="Custom Line Separator (for input)"
                          value={customSeparator}
                          onChange={(e) => setCustomSeparator(e.target.value)}
                          variant="bordered"
                          size="sm"
                          placeholder="\n (newline)"
                          description="Split input by this separator instead of just newlines."
                        />
                        <Textarea // Changed from Input to Textarea for regex
                          label="Regex Filter (Per Line)"
                          value={regexPattern}
                          onValueChange={setRegexPattern} // Corrected from onChange
                          variant="bordered"
                          size="sm"
                          minRows={1}
                          maxRows={3}
                          isDisabled={!useRegex}
                          placeholder="e.g., ^ERROR:"
                          description={useRegex ? "Only process lines matching this regex." : "Enable 'Use Regex' to activate."}
                          classNames={{input: "text-sm"}}
                        />
                         <Switch classNames={{label: "text-sm"}} isSelected={useRegex} onValueChange={setUseRegex} size="sm">
                            Use Regular Expression Filter
                          </Switch>
                      </div>
                      <div className="space-y-3 pt-1">
                         <Switch classNames={{label: "text-sm"}} isSelected={addLineNumbers} onValueChange={setAddLineNumbers} size="sm">
                            Add Line Numbers to Output
                          </Switch>
                        {addLineNumbers && (
                          <Input
                            type="number"
                            label="Starting Line Number"
                            value={startingLineNumber.toString()}
                            variant="bordered"
                            size="sm"
                            min={0}
                            onChange={(e) => setStartingLineNumber(Math.max(0, Number(e.target.value)))}
                            className="max-w-[200px]" // Limit width
                          />
                        )}
                        <Switch classNames={{label: "text-sm"}} isSelected={groupDuplicates} onValueChange={setGroupDuplicates} size="sm" isDisabled={filterMode === "remove_duplicates" || filterMode === "keep_unique_only"}>
                          Group Duplicates Together (Output)
                        </Switch>
                        <Switch classNames={{label: "text-sm"}} isSelected={showLineStats} onValueChange={setShowLineStats} size="sm">
                          Show Line Statistics in Output (e.g., count)
                        </Switch>
                      </div>
                    </div>
                  </Tab>

                  <Tab
                    key="presets"
                    title={
                      <div className="flex items-center gap-1">
                        <Layers size={16} />
                        <span className="hidden sm:inline">Presets</span>
                        <span className="sm:hidden">Presets</span>
                      </div>
                    }
                  >
                    <div className="grid grid-cols-1 gap-4 pt-2">
                      <div>
                        <p className="text-sm text-default-600 dark:text-default-400 mb-2">
                          Apply a preset configuration for common use cases:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                          {presetOptions.map((preset) => (
                            <Button
                              key={preset.value}
                              size="sm"
                              color={activePreset === preset.value ? "primary" : "default"}
                              variant={activePreset === preset.value ? "solid" : "bordered"}
                              onPress={() => applyPreset(preset.value)}
                              className="justify-start text-left h-auto py-2"
                              fullWidth
                            >
                              <div className="flex flex-col items-start">
                                <span className="font-medium">{preset.label}</span>
                                {preset.description && <span className="text-xs text-default-500">{preset.description}</span>}
                              </div>
                            </Button>
                          ))}
                        </div>
                      </div>

                      {savedPresets.length > 0 && (
                        <div>
                          <Divider className="my-3" />
                          <p className="text-sm text-default-600 dark:text-default-400 mb-2">Your saved presets:</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                            {savedPresets.map((preset) => (
                              <div key={preset.name} className="relative group">
                                <Button
                                  size="sm"
                                  color={activePreset === preset.name ? "primary" : "default"}
                                  variant={activePreset === preset.name ? "solid" : "bordered"}
                                  onPress={() => applyPreset(preset.name)}
                                  className="justify-start text-left w-full h-auto py-2"
                                  fullWidth
                                >
                                  <div className="flex flex-col items-start">
                                    <span className="font-medium">{preset.name}</span>
                                    {preset.description && <span className="text-xs text-default-500">{preset.description}</span>}
                                  </div>
                                </Button>
                                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                   <Dropdown>
                                    <DropdownTrigger>
                                      <Button isIconOnly size="sm" variant="light" className="min-w-unit-6 w-6 h-6">
                                        <MoreVertical size={14} />
                                      </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Preset actions">
                                      <DropdownItem
                                        key="delete"
                                        startContent={<Trash2 size={14} />}
                                        onPress={() => deletePreset(preset.name)}
                                        color="danger"
                                        className="text-danger"
                                      >
                                        Delete Preset
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </Dropdown>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center mt-3">
                        <Button
                          size="sm"
                          color="primary"
                          variant="ghost" // Changed from flat
                          onPress={() => setShowSavePresetDialog(true)}
                          startContent={<Save size={16} />}
                        >
                          Save Current Settings as Preset
                        </Button>
                      </div>

                      {showSavePresetDialog && (
                        <Card className="mt-3 p-3 bg-default-100/70 dark:bg-default-100/50">
                          <CardBody className="p-1">
                            <h3 className="text-md font-semibold mb-2 text-default-700">Save New Preset</h3>
                            <Input
                              type="text"
                              label="Preset Name"
                              placeholder="e.g., Error Log Cleanup"
                              value={presetName}
                              onValueChange={setPresetName} // Use onValueChange for NextUI Input
                              variant="bordered"
                              size="sm"
                              className="w-full mb-2"
                              isRequired
                            />
                            <Textarea
                              label="Description (Optional)"
                              placeholder="Briefly describe what this preset does"
                              value={presetDescription}
                              onValueChange={setPresetDescription}
                              variant="bordered"
                              size="sm"
                              minRows={2}
                              className="w-full mb-3"
                            />
                            <div className="flex justify-end gap-2">
                              <Button size="sm" variant="flat" onPress={() => setShowSavePresetDialog(false)}>
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                color="primary"
                                onPress={saveCurrentPreset}
                                isDisabled={!presetName.trim()}
                              >
                                Save Preset
                              </Button>
                            </div>
                          </CardBody>
                        </Card>
                      )}
                    </div>
                  </Tab>
                </Tabs>

                {/* History and Action Buttons - Placed within the Options CardBody for better grouping */}
                <Divider className="my-4" />
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <div className="flex flex-wrap gap-2 items-center">
                    <Tooltip content="Undo (Ctrl+Z)" placement="top">
                      <Button
                        size="sm"
                        variant="flat"
                        isIconOnly
                        onPress={handleUndo}
                        isDisabled={historyIndex <= 0 || history.length === 0}
                        aria-label="Undo"
                      >
                        <Undo2 size={18} />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Redo (Ctrl+Y)" placement="top">
                      <Button
                        size="sm"
                        variant="flat"
                        isIconOnly
                        onPress={handleRedo}
                        isDisabled={historyIndex >= history.length - 1 || history.length === 0}
                        aria-label="Redo"
                      >
                        <Redo2 size={18} />
                      </Button>
                    </Tooltip>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button size="sm" variant="bordered" startContent={<SlidersHorizontal size={16} />}>
                          More Actions
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Additional Actions">
                        <DropdownItem
                          key="export-analysis-json"
                          startContent={<FileJson size={16} />}
                          onPress={exportAsJson}
                          isDisabled={duplicateMap.size === 0}
                          description="Export detailed duplicate analysis as a JSON file."
                          className="text-default-700"
                        >
                          Export Analysis (JSON)
                        </DropdownItem>
                         <DropdownItem
                          key="apply-output-to-input"
                          startContent={<ArrowLeftRight size={16} />}
                          onPress={applyToInput}
                          isDisabled={!outputText}
                          description="Replace input text with the current processed output."
                          className="text-default-700"
                        >
                          Apply Output to Input
                        </DropdownItem>
                        <DropdownItem
                          key="generate-sample-text"
                          startContent={<Wand2 size={16} />}
                          onPress={generateSampleText}
                          description="Populate input with sample data for testing."
                          className="text-default-700"
                        >
                          Generate Sample Text
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                     <Button
                        size="sm"
                        color="danger"
                        variant="light"
                        onPress={handleClear}
                        isDisabled={!inputText && !outputText && duplicateMap.size === 0 && stats.inputLines === 0}
                        startContent={<RefreshCw size={16} />}
                      >
                        Clear Everything
                      </Button>
                  </div>
                </div>

                {/* Processing indicator */}
                {isProcessing && (
                  <div className="mt-4">
                    <Progress
                      size="sm"
                      isIndeterminate
                      color="primary"
                      aria-label="Processing..."
                      className="w-full"
                    />
                    <p className="text-xs text-center text-default-500 mt-1">Processing your text...</p>
                  </div>
                )}
              </CardBody>
            </Card>
          </CardBody>
        </Card>

        {/* Info Section - assuming this is a separate component */}
        <InfoSection />
      </div>
    </ToolLayout>
  );
}  
