"use client"

import React, { useState, useEffect, useCallback } from "react"
import {
  Card,
  CardBody,
  Button,
  Checkbox,
  Select,
  SelectItem,
  Tabs,
  Tab,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"
import { Copy, Download, RefreshCw, Shuffle, Info, Lightbulb, BookOpen, Type, Filter, Settings } from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"

type FontSettings = {
  family: string
  size: number
  weight: string
  lineHeight: number
  letterSpacing: number
  style: "normal" | "italic"
}

type Font = {
  family: string
  category: string
  variants: string[]
  popularity: number
  lastModified: string
  subsets: string[]
}

type FontCategory = "serif" | "sans-serif" | "display" | "handwriting" | "monospace"

const initialHeadingFont: FontSettings = {
  family: "Roboto",
  size: 32,
  weight: "700",
  lineHeight: 1.2,
  letterSpacing: 0,
  style: "normal",
}

const initialBodyFont: FontSettings = {
  family: "Open Sans",
  size: 16,
  weight: "400",
  lineHeight: 1.5,
  letterSpacing: 0,
  style: "normal",
}

const fontSizeOptions = [
  { value: 12, label: "12px" },
  { value: 14, label: "14px" },
  { value: 16, label: "16px" },
  { value: 18, label: "18px" },
  { value: 20, label: "20px" },
  { value: 24, label: "24px" },
  { value: 28, label: "28px" },
  { value: 32, label: "32px" },
  { value: 36, label: "36px" },
  { value: 48, label: "48px" },
  { value: 64, label: "64px" },
]

const popularityOptions = [
  { value: "all", label: "Use All" },
  { value: "top100", label: "Top 100" },
  { value: "top250", label: "Top 250" },
  { value: "top500", label: "Top 500" },
]

const GoogleFontsPairFinder: React.FC = () => {
  const [headingFont, setHeadingFont] = useState<FontSettings>(initialHeadingFont)
  const [bodyFont, setBodyFont] = useState<FontSettings>(initialBodyFont)
  const [activeTab, setActiveTab] = useState<"profile" | "article" | "card">("profile")
  const [fonts, setFonts] = useState<Font[]>([])
  const [loadingFonts, setLoadingFonts] = useState(false)
  const [headingCategories, setHeadingCategories] = useState<FontCategory[]>(["serif", "sans-serif"])
  const [bodyCategories, setBodyCategories] = useState<FontCategory[]>(["serif", "sans-serif"])
  const [headingPopularity, setHeadingPopularity] = useState("all")
  const [bodyPopularity, setBodyPopularity] = useState("all")
  const [showFontsPair, setShowFontsPair] = useState(false)

  useEffect(() => {
    const preloadFonts = () => {
      const link = document.createElement("link")
      link.href = `https://fonts.googleapis.com/css2?family=${initialHeadingFont.family.replace(" ", "+")}:wght@${initialHeadingFont.weight}&family=${initialBodyFont.family.replace(" ", "+")}:wght@${initialBodyFont.weight}&display=swap`
      link.rel = "preload"
      link.as = "style"
      document.head.appendChild(link)
    }

    preloadFonts()
  }, [])

  useEffect(() => {
    const fetchFonts = async () => {
      setLoadingFonts(true)
      try {
        const response = await fetch(
          "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBuElNJbNr3TBhSrnSbrtt6ro_8gmSjBDM&sort=popularity"
        )
        if (!response.ok) {
          throw new Error('Failed to fetch fonts')
        }
        const data = await response.json()
        if (data.items && Array.isArray(data.items)) {
          // Add popularity index if it's not already present
          const fontsWithPopularity = data.items.map((font:Font, index:number) => ({
            ...font,
            popularity: index + 1  // Add 1-based popularity ranking
          }))
          setFonts(fontsWithPopularity)
        }
      } catch (error) {
        console.error("Error fetching fonts:", error)
        toast.error("Failed to load fonts. Please try again later.")
      } finally {
        setLoadingFonts(false)
      }
    }
  
    fetchFonts()
  }, [])

  useEffect(() => {
    const updateFontStyles = () => {
      const link = document.createElement("link")
      link.href = `https://fonts.googleapis.com/css2?family=${headingFont.family.replace(" ", "+")}:wght@${headingFont.weight}&family=${bodyFont.family.replace(" ", "+")}:wght@${bodyFont.weight}&display=swap`
      link.rel = "stylesheet"
      document.head.appendChild(link)

      return () => {
        document.head.removeChild(link)
      }
    }

    updateFontStyles()
  }, [headingFont.family, headingFont.weight, bodyFont.family, bodyFont.weight])

  const filteredHeadingFonts =
    fonts?.filter(
      (font) =>
        headingCategories.includes(font.category as FontCategory) &&
        (headingPopularity === "all" ||
          (headingPopularity === "top100" && font.popularity <= 100) ||
          (headingPopularity === "top250" && font.popularity <= 250) ||
          (headingPopularity === "top500" && font.popularity <= 500)),
    ) || []

  const filteredBodyFonts =
    fonts?.filter(
      (font) =>
        bodyCategories.includes(font.category as FontCategory) &&
        (bodyPopularity === "all" ||
          (bodyPopularity === "top100" && font.popularity <= 100) ||
          (bodyPopularity === "top250" && font.popularity <= 250) ||
          (bodyPopularity === "top500" && font.popularity <= 500)),
    ) || []

  const handleRandomPair = () => {
    const newHeadingFont = {
      ...headingFont,
      family: filteredHeadingFonts[Math.floor(Math.random() * filteredHeadingFonts.length)].family,
    }
    let newBodyFont
    do {
      newBodyFont = {
        ...bodyFont,
        family: filteredBodyFonts[Math.floor(Math.random() * filteredBodyFonts.length)].family,
      }
    } while (newBodyFont.family === newHeadingFont.family)
    setHeadingFont(newHeadingFont)
    setBodyFont(newBodyFont)
    toast.success("A new font pair has been generated!")
  }

  const handleShuffleHeading = () => {
    const newHeadingFont = {
      ...headingFont,
      family: filteredHeadingFonts[Math.floor(Math.random() * filteredHeadingFonts.length)].family,
    }
    setHeadingFont(newHeadingFont)
    toast.success("A new heading font has been selected!")
  }

  const handleShuffleBody = () => {
    const newBodyFont = {
      ...bodyFont,
      family: filteredBodyFonts[Math.floor(Math.random() * filteredBodyFonts.length)].family,
    }
    setBodyFont(newBodyFont)
    toast.success("A new body font has been selected!")
  }

  const handleCopyCSS = () => {
    const css = `
      @import url('https://fonts.googleapis.com/css2?family=${headingFont.family.replace(" ", "+")}:wght@${headingFont.weight}&family=${bodyFont.family.replace(" ", "+")}:wght@${bodyFont.weight}&display=swap');

      h1, h2, h3, h4, h5, h6 {
        font-family: '${headingFont.family}', ${fonts.find((f) => f.family === headingFont.family)?.category};
        font-size: ${headingFont.size}px;
        font-weight: ${headingFont.weight};
        line-height: ${headingFont.lineHeight};
        letter-spacing: ${headingFont.letterSpacing}px;
      }

      body, p {
        font-family: '${bodyFont.family}', ${fonts.find((f) => f.family === bodyFont.family)?.category};
        font-size: ${bodyFont.size}px;
        font-weight: ${bodyFont.weight};
        line-height: ${bodyFont.lineHeight};
        letter-spacing: ${bodyFont.letterSpacing}px;
      }
    `
    navigator.clipboard.writeText(css)
    toast.success("The CSS has been copied to your clipboard.")
  }

  const FontControls: React.FC<{ isHeading: boolean }> = useCallback(
    ({ isHeading }) => {
      const font = isHeading ? headingFont : bodyFont
      const setFont = isHeading ? setHeadingFont : setBodyFont
      const handleShuffle = isHeading ? handleShuffleHeading : handleShuffleBody
      const filteredFonts = isHeading ? filteredHeadingFonts : filteredBodyFonts
      const [isDetailsOpen, setIsDetailsOpen] = useState(false)

      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-default-700">{isHeading ? "Heading" : "Body"} Font Family</label>
            <div className="flex space-x-2">
              <Button onClick={handleShuffle} size="sm" color="primary" startContent={<Shuffle size={18} />}>
                Shuffle
              </Button>
              <Button
                onClick={() => setIsDetailsOpen(true)}
                size="sm"
                color="secondary"
                startContent={<Settings size={18} />}
              >
                Details
              </Button>
            </div>
          </div>
          <Autocomplete
            label="Font Family"
            defaultSelectedKey={font.family}
            onSelectionChange={(key) => {
              if (key) {
                setFont({ ...font, family: key as string })
              }
            }}
            className="max-w-xs"
            variant="bordered"
          >
            {filteredFonts.map((font) => (
              <AutocompleteItem key={font.family} value={font.family} className="text-default-700" >
                {font.family}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <div>
            <label className="text-default-700">Font Size</label>
            <Select
              label="Font Size"
              selectedKeys={[font.size.toString()]}
              onSelectionChange={(keys) => setFont({ ...font, size: Number.parseInt(Array.from(keys)[0] as string) })}
              variant="bordered"
            >
              {fontSizeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()} className="text-default-700">
                  {option.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div>
            <label className="text-default-700">Font Weight</label>
            <Select
              label="Font Weight"
              selectedKeys={[font.weight]}
              onSelectionChange={(keys) => setFont({ ...font, weight: Array.from(keys)[0] as string })}
              variant="bordered"
            >
              {fonts
                .find((f) => f.family === font.family)
                ?.variants?.map((variant) => (
                  <SelectItem key={variant} value={variant} className="text-default-700">
                    {variant}
                  </SelectItem>
                )) || []}
            </Select>
          </div>
          <div>
            <label className="text-default-700">Line Height</label>
            <Select
              label="Line Height"
              selectedKeys={[font.lineHeight.toString()]}
              onSelectionChange={(keys) =>
                setFont({ ...font, lineHeight: Number.parseFloat(Array.from(keys)[0] as string) })
              }
              variant="bordered"
            >
              {[1, 1.2, 1.4, 1.6, 1.8, 2].map((value) => (
                <SelectItem key={value} value={value.toString()} className="text-default-700">
                  {value.toFixed(1)}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div>
            <label className="text-default-700">Letter Spacing</label>
            <Select
                label="Letter Spacing"
                selectedKeys={[font.letterSpacing.toString()]}
                defaultSelectedKeys={["0"]}
                onSelectionChange={(keys) => {
                const value = Array.from(keys)[0] as string;
                setFont({ ...font, letterSpacing: Number.parseFloat(value) });
                }}
                variant="bordered"
            >
                {[-2, -1, -0.5, 0, 0.5, 1, 2].map((value) => (
                <SelectItem 
                    key={value.toString()}
                    value={value.toString()}
                    className="text-default-700"
                >
                    {value.toFixed(1)}
                </SelectItem>
                ))}
            </Select>
            </div>
          <FontDetails
            isOpen={isDetailsOpen}
            onClose={() => setIsDetailsOpen(false)}
            font={font}
            setFont={setFont}
            isHeading={isHeading}
            fonts={fonts}
          />
        </div>
      )
    },
    [
      fonts,
      headingFont,
      bodyFont,
      loadingFonts,
      filteredHeadingFonts,
      filteredBodyFonts,
      handleShuffleHeading,
      handleShuffleBody,
    ],
  )

  FontControls.displayName = "FontControls"

  const FontDetails: React.FC<{
    isOpen: boolean
    onClose: () => void
    font: FontSettings
    setFont: React.Dispatch<React.SetStateAction<FontSettings>>
    isHeading: boolean
    fonts: Font[]
  }> = React.memo(({ isOpen, onClose, font, setFont, isHeading, fonts }) => {
    const currentFont = fonts.find((f) => f.family === font.family)
    const [previewSettings, setPreviewSettings] = useState(font)

    // Calculate popularity percentage and ranking
    const popularityRank = currentFont ? currentFont.popularity : 0  // Add null check
    const totalFonts = fonts.length
    const popularityPercentage = totalFonts > 0 && currentFont ? 
      (((totalFonts - popularityRank + 1) / totalFonts) * 100).toFixed(1) : 
      "0"

    const allVariants = currentFont?.variants || []
    const regularVariants = allVariants.filter((v) => !v.includes("italic"))
    const italicVariants = allVariants.filter((v) => v.includes("italic"))

    const handleVariantChange = useCallback((variant: string) => {
      setPreviewSettings((prev) => ({
        ...prev,
        weight: variant.replace("italic", ""),
        style: variant.includes("italic") ? "italic" : "normal",
      }))
    }, [])

    const handleApplyChanges = useCallback(() => {
      setFont(previewSettings)
      onClose()
    }, [previewSettings, setFont, onClose])

    return (
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Type className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">
                    {isHeading ? "Heading" : "Body"} Font Details
                  </h3>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col items-center text-center px-2">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <Type className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-default-600 font-medium mb-2">{currentFont?.family}</p>
                  <div className="w-full p-4 bg-default-100 dark:bg-default-50 rounded-lg mb-4">
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-default-700 dark:text-default-400 mb-2">Font Details</h4>
                      <p className="text-default-600">Category: {currentFont?.category}</p>
                      <p className="text-default-600">
                      Popularity Rank: {popularityRank || 'N/A'} of {totalFonts}  {/* Added fallback */}
                    </p>
                    <p className="text-default-600">Percentile: Top {popularityPercentage}%</p>
                      <p className="text-default-600">Subsets: {currentFont?.subsets.join(", ")}</p>
                      <p className="text-default-600">
                        Last Modified: {new Date(currentFont?.lastModified || "").toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="w-full">
                    <h4 className="text-sm font-medium text-default-700 dark:text-default-400 mb-2">
                      Available Variants
                    </h4>
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                      {regularVariants.map((variant) => (
                        <Button
                          key={variant}
                          size="sm"
                          color={
                            variant === previewSettings.weight && previewSettings.style === "normal"
                              ? "primary"
                              : "default"
                          }
                          onClick={() => handleVariantChange(variant)}
                          className="text-xs"
                        >
                          {variant}
                        </Button>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {italicVariants.map((variant) => (
                        <Button
                          key={variant}
                          size="sm"
                          color={
                            variant.replace("italic", "") === previewSettings.weight &&
                            previewSettings.style === "italic"
                              ? "primary"
                              : "default"
                          }
                          onClick={() => handleVariantChange(variant)}
                          className="text-xs italic"
                        >
                          {variant}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="w-full mt-4">
                    <h4 className="text-sm font-medium text-default-700 dark:text-default-400 mb-2">Font Preview</h4>
                    <div className="bg-slate-200 text-black dark:text-white p-4 rounded-lg">
                      {[12, 16, 20, 24, 32, 48].map((size) => (
                        <p
                          key={size}
                          style={{
                            fontFamily: `'${currentFont?.family}', ${currentFont?.category}`,
                            fontSize: `${size}px`,
                            fontWeight: previewSettings.weight,
                            fontStyle: previewSettings.style,
                            lineHeight: previewSettings.lineHeight,
                            letterSpacing: `${previewSettings.letterSpacing}px`,
                          }}
                          className="text-default-900 dark:text-default-100"
                        >
                          The quick brown fox jumps over the lazy dog ({size}px)
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleApplyChanges}>
                  Apply Changes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    )
  })

  FontDetails.displayName = "FontDetails"

  const FontFilters: React.FC<{ isHeading: boolean }> = ({ isHeading }) => {
    const categories = isHeading ? headingCategories : bodyCategories
    const setCategories = isHeading ? setHeadingCategories : setBodyCategories
    const popularity = isHeading ? headingPopularity : bodyPopularity
    const setPopularity = isHeading ? setHeadingPopularity : setBodyPopularity

    const handleCategoryChange = (category: FontCategory) => {
      setCategories((prev) => (prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]))
    }

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-default-700">{isHeading ? "Heading" : "Body"} Font Filters</h3>
        <div className="space-y-2">
          <p className="text-default-700">Categories:</p>
          {(["serif", "sans-serif", "display", "handwriting", "monospace"] as FontCategory[]).map((category) => (
            <div key={category} className="flex items-center">
              <Checkbox
                isSelected={categories.includes(category)}
                onValueChange={() => handleCategoryChange(category)}
                className="mr-2"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Checkbox>
            </div>
          ))}
        </div>
        <div>
          <label className="text-default-700">Limit Fonts by Popularity</label>
          <Select
            label="Popularity"
            selectedKeys={[popularity]}
            onSelectionChange={(keys) => setPopularity(Array.from(keys)[0] as string)}
            variant="bordered"
          >
            {popularityOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-default-700">
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    )
  }

  FontFilters.displayName = "FontFilters"

  const ShowFontsPair: React.FC = () => {
    const headingWeights = fonts.find((f) => f.family === headingFont.family)?.variants || []
    const bodyWeights = fonts.find((f) => f.family === bodyFont.family)?.variants || []

    const [selectedHeadingWeights, setSelectedHeadingWeights] = useState<string[]>([headingFont.weight])
    const [selectedBodyWeights, setSelectedBodyWeights] = useState<string[]>([bodyFont.weight])
    const [embedType, setEmbedType] = useState<"link" | "import">("link")

    const toggleWeight = (weight: string, isHeading: boolean) => {
      if (isHeading) {
        setSelectedHeadingWeights((prev) =>
          prev.includes(weight) ? prev.filter((w) => w !== weight) : [...prev, weight],
        )
      } else {
        setSelectedBodyWeights((prev) => (prev.includes(weight) ? prev.filter((w) => w !== weight) : [...prev, weight]))
      }
    }

    const generateCode = () => {
      const headingFontString = `${headingFont.family.replace(" ", "+")}:wght@${selectedHeadingWeights.join(";")}`
      const bodyFontString = `${bodyFont.family.replace(" ", "+")}:wght@${selectedBodyWeights.join(";")}`

      const linkCode = `<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=${headingFontString}&family=${bodyFontString}&display=swap" rel="stylesheet">`

      const importCode = `<style>
@import url('https://fonts.googleapis.com/css2?family=${headingFontString}&family=${bodyFontString}&display=swap');
</style>`

      return embedType === "link" ? linkCode : importCode
    }

    return (
      <Modal isOpen={showFontsPair} onClose={() => setShowFontsPair(false)} scrollBehavior="inside" size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Type className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Use Fonts in Web</h3>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col items-center text-center px-2">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <Type className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-default-600 font-medium mb-2">Selected Font Pair</p>
                  <div className="w-full p-4 bg-default-100 dark:bg-default-50 rounded-lg mb-4">
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-default-700 dark:text-default-400 mb-2">Heading Font</h4>
                      <p className="text-default-600">
                        {headingFont.family}, {fonts.find((f) => f.family === headingFont.family)?.category}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-default-700 dark:text-default-400 mb-2">Body Font</h4>
                      <p className="text-default-600">
                        {bodyFont.family}, {fonts.find((f) => f.family === bodyFont.family)?.category}
                      </p>
                    </div>
                  </div>
                  <div className="w-full">
                    <h4 className="text-sm font-medium text-default-700 dark:text-default-400 mb-2">Font Weights</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-medium text-default-600 mb-2">Heading</h5>
                        <div className="flex flex-wrap gap-2">
                          {fonts
                            .find((f) => f.family === headingFont.family)
                            ?.variants.map((weight) => (
                              <Button
                                key={weight}
                                size="sm"
                                color={selectedHeadingWeights.includes(weight) ? "primary" : "default"}
                                onClick={() => toggleWeight(weight, true)}
                                className="text-xs"
                              >
                                {weight}
                              </Button>
                            ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-default-600 mb-2">Body</h5>
                        <div className="flex flex-wrap gap-2">
                          {fonts
                            .find((f) => f.family === bodyFont.family)
                            ?.variants.map((weight) => (
                              <Button
                                key={weight}
                                size="sm"
                                color={selectedBodyWeights.includes(weight) ? "primary" : "default"}
                                onClick={() => toggleWeight(weight, false)}
                                className="text-xs"
                              >
                                {weight}
                              </Button>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full mt-4">
                    <h4 className="text-sm font-medium text-default-700 dark:text-default-400 mb-2">Embed Code Type</h4>
                    <div className="flex justify-center space-x-4">
                      <label className="flex items-center text-default-700">
                        <input
                          type="radio"
                          value="link"
                          checked={embedType === "link"}
                          onChange={() => setEmbedType("link")}
                          className="mr-2 "
                        />
                        Link
                      </label>
                      <label className="flex items-center text-default-700">
                        <input
                          type="radio"
                          value="import"
                          checked={embedType === "import"}
                          onChange={() => setEmbedType("import")}
                          className="mr-2"
                        />
                        CSS Import
                      </label>
                    </div>
                  </div>
                  <div className="w-full mt-4">
                    <h4 className="text-sm font-medium text-default-700 dark:text-default-400 mb-2">Embed Code</h4>
                    <pre className="bg-slate-200 p-4 rounded-lg text-sm text-default-700 dark:text-default-400 overflow-x-auto whitespace-pre-wrap text-left">
                      {generateCode()}
                    </pre>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    navigator.clipboard.writeText(generateCode())
                    toast.success("Embed code copied to clipboard!")
                  }}
                >
                  Copy Code
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    )
  }

  ShowFontsPair.displayName = "ShowFontsPair"

  return (
    <ToolLayout
      title="Google Fonts Pair Finder"
      description="Discover the perfect font combinations for your design projects"
      toolId="678f382926f06f912191bc81"
    >
      <div className="flex flex-col gap-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button onClick={handleRandomPair} color="primary" startContent={<RefreshCw size={18} />}>
                Random Pair
              </Button>
              <Button onClick={handleCopyCSS} color="primary" startContent={<Copy size={18} />}>
                Copy CSS
              </Button>
              <Button onClick={() => setShowFontsPair(true)} color="primary" startContent={<Download size={18} />}>
                Use Fonts in Web
              </Button>
            </div>

            <Tabs>
              <Tab key="preview" title="Preview">
                <div className="flex flex-col gap-8">
                  <Tabs
                    selectedKey={activeTab}
                    onSelectionChange={(key) => setActiveTab(key as "profile" | "article" | "card")}
                  >
                    <Tab key="profile" title="Profile">
                      <div className="bg-slate-200 text-default-900 dark:text-default-100 rounded-lg p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <img
                            src="/Images/prem.jpg?height=100&width=100"
                            alt="Profile"
                            className="w-24 h-24 rounded-full"
                          />
                          <div>
                            <h2
                              style={{
                                fontFamily: `'${headingFont.family}', ${fonts.find((f) => f.family === headingFont.family)?.category || "sans-serif"}`,
                                fontSize: `${headingFont.size}px`,
                                fontWeight: headingFont.weight,
                                lineHeight: headingFont.lineHeight,
                                letterSpacing: `${headingFont.letterSpacing}px`,
                              }}
                            >
                              Premnash
                            </h2>
                            <p
                              style={{
                                fontFamily: `'${bodyFont.family}', ${fonts.find((f) => f.family === bodyFont.family)?.category || "sans-serif"}`,
                                fontSize: `${bodyFont.size}px`,
                                fontWeight: bodyFont.weight,
                                lineHeight: bodyFont.lineHeight,
                                letterSpacing: `${bodyFont.letterSpacing}px`,
                              }}
                            >
                              Software Engineer - Microsoft
                            </p>
                          </div>
                        </div>
                        <div
                          style={{
                            fontFamily: `'${bodyFont.family}', ${fonts.find((f) => f.family === bodyFont.family)?.category || "sans-serif"}`,
                            fontSize: `${bodyFont.size}px`,
                            fontWeight: bodyFont.weight,
                            lineHeight: bodyFont.lineHeight,
                            letterSpacing: `${bodyFont.letterSpacing}px`,
                          }}
                        >
                          <p className="mb-2">premnash@mario.com</p>
                          <p className="mb-2">+13 345 325 123</p>
                          <p className="mb-4">Las Vegas, USA</p>
                          <h3
                            style={{
                              fontFamily: `'${headingFont.family}', ${fonts.find((f) => f.family === headingFont.family)?.category || "sans-serif"}`,
                              fontSize: `${headingFont.size * 0.8}px`,
                              fontWeight: headingFont.weight,
                              lineHeight: headingFont.lineHeight,
                              letterSpacing: `${headingFont.letterSpacing}px`,
                            }}
                            className="mb-2"
                          >
                            Biography
                          </h3>
                          <p className="mb-4">
                            I'm Premnash, a software engineer at Innovative Tech Solutions in San Francisco. I
                            specialize in developing robust applications that deliver seamless functionality and enhance
                            user engagement.
                          </p>
                          <h3
                            style={{
                              fontFamily: `'${headingFont.family}', ${fonts.find((f) => f.family === headingFont.family)?.category || "sans-serif"}`,
                              fontSize: `${headingFont.size * 0.8}px`,
                              fontWeight: headingFont.weight,
                              lineHeight: headingFont.lineHeight,
                              letterSpacing: `${headingFont.letterSpacing}px`,
                            }}
                            className="mb-2"
                          >
                            Hobbies
                          </h3>
                          <p>
                            In my spare time, In my spare time, I love hiking in nature, trying out new recipes in the
                            kitchen, and practicing photography to capturethe beauty around me.
                          </p>
                        </div>
                      </div>
                    </Tab>
                    <Tab key="article" title="Article">
                      <div className="bg-slate-200 text-default-900 dark:text-default-100 rounded-lg p-6">
                        <h2
                          style={{
                            fontFamily: `'${headingFont.family}', ${fonts.find((f) => f.family === headingFont.family)?.category || "sans-serif"}`,
                            fontSize: `${headingFont.size}px`,
                            fontWeight: headingFont.weight,
                            lineHeight: headingFont.lineHeight,
                            letterSpacing: `${headingFont.letterSpacing}px`,
                          }}
                          className="mb-4"
                        >
                          The Art of Web Design: Crafting Engaging Digital Experiences
                        </h2>
                        <p
                          style={{
                            fontFamily: `'${bodyFont.family}', ${fonts.find((f) => f.family === bodyFont.family)?.category || "sans-serif"}`,
                            fontSize: `${bodyFont.size}px`,
                            fontWeight: bodyFont.weight,
                            lineHeight: bodyFont.lineHeight,
                            letterSpacing: `${bodyFont.letterSpacing}px`,
                          }}
                        >
                          Web design is the creative process of planning and building websites, focusing on aesthetics,
                          usability, and user experience. It involves a blend of graphic design, interface design, and
                          interaction design to create visually appealing and functional websites. Effective web design
                          enhances user engagement by ensuring that content is organized, easy to navigate, and
                          responsive across devices. Key elements include color schemes, typography, imagery, and
                          layout, all harmonizing to convey a brand's message. As technology evolves, trends in web
                          design continue to shift, emphasizing minimalism, accessibility, and interactivity. A
                          well-designedwebsite not only attracts visitors but also fosters trust and encourages
                          conversions, making it a crucial aspect of any online presence.
                        </p>
                      </div>
                    </Tab>
                    <Tab key="card" title="Card">
                      <div className="bg-slate-200 text-default-900 dark:text-default-100 rounded-lg overflow-hidden">
                        <img
                          src="/Images/Typography.png?height=200&width=400"
                          alt="Card"
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                          <h3
                            style={{
                              fontFamily: `'${headingFont.family}', ${fonts.find((f) => f.family === headingFont.family)?.category || "sans-serif"}`,
                              fontSize: `${headingFont.size * 0.8}px`,
                              fontWeight: headingFont.weight,
                              lineHeight: headingFont.lineHeight,
                              letterSpacing: `${headingFont.letterSpacing}px`,
                            }}
                            className="mb-2"
                          >
                            Exploring Typography
                          </h3>
                          <p
                            style={{
                              fontFamily: `'${bodyFont.family}', ${fonts.find((f) => f.family === bodyFont.family)?.category || "sans-serif"}`,
                              fontSize: `${bodyFont.size}px`,
                              fontWeight: bodyFont.weight,
                              lineHeight: bodyFont.lineHeight,
                              letterSpacing: `${bodyFont.letterSpacing}px`,
                            }}
                          >
                            Discover the world of fonts and how they can transform your designs. Learn about serif,
                            sans-serif, and display typefaces.
                          </p>
                        </div>
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </Tab>
              <Tab key="controls" title="Font Controls">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Heading Font</h3>
                    <FontControls isHeading={true} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Body Font</h3>
                    <FontControls isHeading={false} />
                  </div>
                </div>
              </Tab>
              <Tab key="filters" title="Filters">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                  <FontFilters isHeading={true} />
                  <FontFilters isHeading={false} />
                </div>
              </Tab>
            </Tabs>
            <ShowFontsPair />
          </CardBody>
        </Card>

        <Card className="bg-default-50 dark:bg-default-100">
      <CardBody className="p-6">
        <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 flex items-center">
            <Info className="w-6 h-6 mr-2" />
            What is the Google Fonts Pair Finder?
          </h2>
          <p className="text-sm md:text-base text-default-600 mb-4">
            The Google Fonts Pair Finder is an innovative tool designed for designers, developers, and typography
            enthusiasts. It simplifies the process of finding harmonious font combinations from Google's extensive font
            library. With customizable options and{" "}
            <Link href="#features" className="text-primary hover:underline">
              powerful features
            </Link>
            , our tool helps you create visually appealing and readable designs for your web projects, print materials,
            or any typographic needs.
          </p>
          <p className="text-sm md:text-base text-default-600 mb-4">
            Whether you're working on a website, creating a brand identity, or just exploring typography, this tool
            offers a comprehensive way to experiment with font pairings. It's like having a typographic playground at
            your fingertips, revealing beautiful combinations you might never have considered!
          </p>

          <div className="my-8">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Screenshot of the Google Fonts Pair Finder interface showing font selection, preview area, and pairing options"
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
            How to Use the Google Fonts Pair Finder?
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
            <li>Choose a heading font from the extensive Google Fonts library.</li>
            <li>Select a complementary body font to pair with your heading.</li>
            <li>Adjust font sizes, weights, and styles to fine-tune your combination.</li>
            <li>Use the preview area to see your font pair in action with different content types.</li>
            <li>Experiment with the "Random Pair" feature for inspiration.</li>
            <li>Filter fonts by category or popularity to narrow down your choices.</li>
            <li>Copy the CSS for your chosen font pair to use in your projects.</li>
            <li>Use the "Font Details" option to learn more about each selected font.</li>
          </ol>

          <h2 id="features" className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
            <Lightbulb className="w-6 h-6 mr-2" />
            Key Features
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
            <li>
              <strong>Extensive Font Library:</strong> Access to the complete Google Fonts collection.
            </li>
            <li>
              <strong>Intelligent Pairing:</strong> Suggestions for complementary heading and body font combinations.
            </li>
            <li>
              <strong>Real-time Preview:</strong> See your font choices instantly in various content layouts.
            </li>
            <li>
              <strong>Customization Options:</strong> Adjust font size, weight, line height, and letter spacing.
            </li>
            <li>
              <strong>Random Pair Generator:</strong> Discover unexpected and inspiring font combinations.
            </li>
            <li>
              <strong>Font Filtering:</strong> Narrow down choices by category, popularity, or specific attributes.
            </li>
            <li>
              <strong>CSS Export:</strong> Easily copy the CSS for your chosen font pair.
            </li>
            <li>
              <strong>Font Details:</strong> Access comprehensive information about each font.
            </li>
          </ul>

          <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
            <Filter className="w-6 h-6 mr-2" />
            Advanced Options Explained
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
            <li>
              <strong>Font Categories:</strong> Filter fonts by serif, sans-serif, display, handwriting, or monospace.
            </li>
            <li>
              <strong>Popularity Filter:</strong> Focus on widely-used fonts or explore less common options.
            </li>
            <li>
              <strong>Weight and Style:</strong> Experiment with different font weights and italic styles.
            </li>
            <li>
              <strong>Line Height and Letter Spacing:</strong> Fine-tune the spacing for optimal readability.
            </li>
            <li>
              <strong>Preview Modes:</strong> Test your fonts in profile, article, and card layouts.
            </li>
          </ul>

          <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
            <Lightbulb className="w-6 h-6 mr-2" />
            Practical Applications
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
            <li>
              <strong>Web Design:</strong> Create visually appealing and readable websites.
            </li>
            <li>
              <strong>Branding:</strong> Develop consistent typography for brand identities.
            </li>
            <li>
              <strong>Print Design:</strong> Find perfect font pairs for posters, flyers, and other print materials.
            </li>
            <li>
              <strong>UI/UX Design:</strong> Enhance user interfaces with harmonious typography.
            </li>
            <li>
              <strong>Content Creation:</strong> Improve readability and visual appeal of digital content.
            </li>
            <li>
              <strong>Typography Education:</strong> Learn about font pairing principles and best practices.
            </li>
          </ul>

          <p className="text-sm md:text-base text-default-600 mt-4">
            Ready to elevate your typography game? Start using our Google Fonts Pair Finder now and discover the perfect
            font combinations for your projects. Whether you're a professional designer, a hobbyist, or just someone who
            appreciates good typography, our tool provides the inspiration and functionality you need to create visually
            stunning designs. Try it out and see how the right font pairing can transform your work!
          </p>
        </div>
      </CardBody>
    </Card>
      </div>
    </ToolLayout>
  );
};

GoogleFontsPairFinder.displayName = 'GoogleFontsPairFinder';

export default GoogleFontsPairFinder