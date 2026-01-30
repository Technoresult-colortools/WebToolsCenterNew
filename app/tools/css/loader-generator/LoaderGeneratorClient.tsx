"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { toast, Toaster } from "react-hot-toast"

// Imports from your new modular structure
import {
  loaderCategories,
  getDefaultCategory,
  getDefaultLoader,
  getLoaderData,
  isValidCategory,
} from "./data/index"
import { CustomizationOptions } from "./data/types"
import ToolLayout from "@/components/ToolLayout"
import { Button, Card, CardBody, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Slider, Tab, Tabs, Input } from "@nextui-org/react"
import { ChevronLeft, ChevronRight, Code, Copy, Settings } from "lucide-react"
import SyntaxHighlighter from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import InfoSectionLoaderGenerator from "./info-section"

// --- Interfaces & Defaults ---

interface CustomizationsState {
  [key: string]: CustomizationOptions
}

const defaultCustomization: CustomizationOptions = {
  size: 56,
  primaryColor: "#3b82f6",
  secondaryColor: "#93c5fd",
  backgroundColor: "#ffffff",
  speed: 1,
}

// --- Helper Component: LoaderPreview ---

interface LoaderPreviewProps {
  category: string
  type: string
  customization: CustomizationOptions
}

const LoaderPreview: React.FC<LoaderPreviewProps> = ({ category, type, customization }) => {
  // Create a unique ID for scoping the CSS (prevents styles from leaking)
  const idRef = useRef<string>(`loader-${category}-${type}`.replace(/\s+/g, "-").toLowerCase())

  // Fetch the data (which now contains the css() function)
  const loaderData = getLoaderData(loaderCategories, category, type)

  useEffect(() => {
    if (!loaderData) return

    const styleElement = document.createElement("style")

    // NEW LOGIC: 
    // 1. Generate the CSS string using the function
    const baseCss = loaderData.css(customization)

    // 2. Scope the class name (replace .loader with .unique-id) so it only affects this preview
    // Note: This assumes your loaders are defined with the class ".loader" in your data files
    const scopedCss = baseCss.replace(/\.loader/g, `.${idRef.current}`)

    styleElement.textContent = scopedCss
    document.head.appendChild(styleElement)

    return () => {
      document.head.removeChild(styleElement)
    }
  }, [customization, loaderData])

  if (!loaderData) {
    return <div className="w-full h-full flex items-center justify-center text-danger">Loader not found</div>
  }

  return (
    <div
      className="w-full h-full flex items-center justify-center rounded-md"
      style={{ backgroundColor: customization.backgroundColor }}
    >
      <div
        // Replace the generic class with our unique ID
        dangerouslySetInnerHTML={{
          __html: loaderData.html.replace(/class="loader"/, `class="${idRef.current}"`),
        }}
      />
    </div>
  )
}

// --- Main Component Logic ---

export default function LoaderGenerator() {
  // Initialize state using helper functions from data/index.ts
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    try {
      return getDefaultCategory(loaderCategories)
    } catch (error) {
      console.error(error)
      return ""
    }
  })

  const [selectedLoader, setSelectedLoader] = useState<string | null>(() => {
    try {
      return selectedCategory ? getDefaultLoader(loaderCategories, selectedCategory) : null
    } catch (error) {
      console.error(error)
      return null
    }
  })

  const [activeTab, setActiveTab] = useState<"customize" | "code">("customize")
  const [customizations, setCustomizations] = useState<CustomizationsState>({})
  const [dialogOpen, setDialogOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const loadersPerPage = 6

  const handleCustomize = (loaderType: string, tab: "customize" | "code") => {
    setSelectedLoader(loaderType)
    setActiveTab(tab)
    setDialogOpen(true)
  }

  const updateCustomization = (loaderType: string, updates: Partial<CustomizationOptions>) => {
    setCustomizations((prev) => ({
      ...prev,
      [loaderType]: {
        ...(prev[loaderType] || defaultCustomization),
        ...updates,
      },
    }))
  }

  const getCustomization = (loaderType: string): CustomizationOptions => {
    return customizations[loaderType] || defaultCustomization
  }

  // --- UPDATED CSS GENERATION LOGIC ---
  const generateLoaderCSS = useCallback(
    (category: string, type: string, customization: CustomizationOptions): string => {
      const loaderData = getLoaderData(loaderCategories, category, type)
      if (!loaderData) {
        return ""
      }

      try {
        // NEW LOGIC: Call the function instead of regex replacing
        const css = loaderData.css(customization)

        return `.loader-container {
        background-color: ${customization.backgroundColor};
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }

${css}`
      } catch (error) {
        console.error("Error generating CSS:", error)
        return ""
      }
    },
    [],
  )

  const copyToClipboard = (css: string): void => {
    navigator.clipboard.writeText(css)
    toast.success("CSS copied to clipboard!")
  }

  const handleCategoryChange = (category: string) => {
    if (isValidCategory(loaderCategories, category)) {
      setSelectedCategory(category)
      try {
        const defaultLoader = getDefaultLoader(loaderCategories, category)
        setSelectedLoader(defaultLoader)
      } catch (error) {
        console.error(error)
        setSelectedLoader(null)
      }
      setCurrentPage(1)
    }
  }

  // Pagination Logic
  const categoryLoaders = selectedCategory ? Object.keys(loaderCategories[selectedCategory] || {}) : []
  const totalPages = Math.ceil(categoryLoaders.length / loadersPerPage)
  const paginatedLoaders = categoryLoaders.slice((currentPage - 1) * loadersPerPage, currentPage * loadersPerPage)

  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
  }, [])


  return (
    <ToolLayout title="CSS Loader Generator" description="Create customizable CSS loaders for your web projects" toolId="678f382b26f06f912191bc98">
      <Toaster position="top-right" />

      <div className="flex flex-col gap-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-4 md:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <Select
                label="Select Category"
                placeholder="Select Category"
                variant="bordered"
                selectedKeys={[selectedCategory]}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full sm:w-48"
              >
                {Object.keys(loaderCategories).map((category) => (
                  <SelectItem key={category} value={category} className="text-default-700">
                    {category}
                  </SelectItem>
                ))}
              </Select>

              <span className="text-default-500 text-sm font-medium">{categoryLoaders.length} loaders available</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedLoaders.map((type) => (
                <Card
                  key={type}
                  className="group overflow-hidden bg-content1 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <CardBody className="p-4 relative">
                    <h3 className="text-sm text-center font-semibold mt-2 mb-2">{type}</h3>
                    <div className="w-full h-40 flex items-center justify-center bg-content3 rounded-md overflow-hidden mb-4">
                      <LoaderPreview category={selectedCategory} type={type} customization={getCustomization(type)} />
                    </div>

                    <div className="flex flex-col gap-2 absolute inset-0 bg-content2 bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 justify-center">
                      <Button
                        onPress={() => handleCustomize(type, "customize")}
                        color="primary"
                        variant="flat"
                        className="text-xs py-1"
                      >
                        <Settings className="w-4 h-4 mr-1" />
                        Customize
                      </Button>
                      <Button
                        onPress={() => handleCustomize(type, "code")}
                        color="secondary"
                        variant="flat"
                        className="text-xs py-1"
                      >
                        <Code className="w-4 h-4 mr-1" />
                        Get Code
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 gap-2">
                {/* For larger screens (default pagination) */}
                <div className="hidden md:flex items-center gap-2">
                  <Button
                    isIconOnly
                    onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    isDisabled={currentPage === 1}
                    variant="flat"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>

                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        isIconOnly
                        variant={currentPage === page ? "solid" : "flat"}
                        onPress={() => setCurrentPage(page)}
                        className={`w-8 h-8 ${currentPage === page ? "bg-primary" : "bg-content3 hover:bg-content4"}`}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  <Button
                    isIconOnly
                    onPress={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    isDisabled={currentPage === totalPages}
                    variant="flat"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* For mobile screens (1/total format) */}
                <div className="flex items-center md:hidden">
                  <Button
                    isIconOnly
                    onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    isDisabled={currentPage === 1}
                    variant="flat"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="ml-1 mr-1 text-sm">{currentPage} / {totalPages}</span>
                  <Button
                    isIconOnly
                    onPress={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    isDisabled={currentPage === totalPages}
                    variant="flat"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}


          </CardBody>
        </Card>



      </div>
      <InfoSectionLoaderGenerator />

      {selectedLoader && (
        <Modal isOpen={dialogOpen} onClose={() => setDialogOpen(false)} size="3xl" scrollBehavior="inside">
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1 text-default-700">{selectedLoader}</ModalHeader>
            <ModalBody>
              <Tabs selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(key as "customize" | "code")}>
                <Tab key="customize" title="Customize">
                  <div className="flex flex-col lg:flex-row gap-6 mt-4">
                    <div className="w-full lg:w-1/2">
                      <div className="bg-content2 shadow-md  rounded-lg p-4 h-[200px] lg:h-[300px] flex items-center justify-center">
                        <LoaderPreview
                          category={selectedCategory}
                          type={selectedLoader}
                          customization={getCustomization(selectedLoader)}

                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-1/2 space-y-4 pb-4">
                      <div className="space-y-1">
                        <label className="text-default-700 text-sm font-medium">Size</label>
                        <Slider
                          aria-label="Size"
                          size="sm"
                          step={1}
                          minValue={20}
                          maxValue={100}
                          value={getCustomization(selectedLoader).size}
                          onChange={(value) => updateCustomization(selectedLoader, { size: value as number })}
                        />
                        <span className="text-sm text-default-700">{getCustomization(selectedLoader).size}px</span>
                      </div>

                      <div className="space-y-1">
                        <label className="text-sm text-default-700 font-medium">Primary Color</label>
                        <div className="flex space-x-2">
                          <Input
                            type="color"
                            variant="bordered"
                            value={getCustomization(selectedLoader).primaryColor}
                            onChange={(e) => updateCustomization(selectedLoader, { primaryColor: e.target.value })}
                            className="w-16 h-8 "
                          />
                          <Input
                            type="text"
                            variant="bordered"
                            className="text-default-700"
                            value={getCustomization(selectedLoader).primaryColor}
                            onChange={(e) => updateCustomization(selectedLoader, { primaryColor: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-sm text-default-700 font-medium">Secondary Color</label>
                        <div className="flex space-x-2">
                          <Input
                            type="color"
                            variant="bordered"
                            value={getCustomization(selectedLoader).secondaryColor}
                            onChange={(e) => updateCustomization(selectedLoader, { secondaryColor: e.target.value })}
                            className="w-16 h-8 text-default-700"
                          />
                          <Input
                            type="text"
                            variant="bordered"
                            className="text-default-700"
                            value={getCustomization(selectedLoader).secondaryColor}
                            onChange={(e) => updateCustomization(selectedLoader, { secondaryColor: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-sm text-default-700 font-medium">Background Color</label>
                        <div className="flex space-x-2">
                          <Input
                            type="color"
                            variant="bordered"
                            value={getCustomization(selectedLoader).backgroundColor}
                            onChange={(e) => updateCustomization(selectedLoader, { backgroundColor: e.target.value })}
                            className="w-16 h-8"
                          />
                          <Input
                            type="text"
                            variant="bordered"
                            className="text-default-700"
                            value={getCustomization(selectedLoader).backgroundColor}
                            onChange={(e) => updateCustomization(selectedLoader, { backgroundColor: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-sm font-medium">Animation Speed (seconds)</label>
                        <Slider
                          aria-label="Animation Speed"
                          step={0.1}
                          size="sm"
                          minValue={0.1}
                          maxValue={3}
                          value={getCustomization(selectedLoader).speed}
                          onChange={(value) => updateCustomization(selectedLoader, { speed: value as number })}
                        />
                        <span className="text-sm text-default-400">{getCustomization(selectedLoader).speed}s</span>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab key="code" title="Get Code">
                  <div className="space-y-4 mt-4">
                    <div className="relative">
                      <div className="max-h-[400px] overflow-auto rounded-lg">
                        <SyntaxHighlighter
                          language="css"
                          style={atomDark}
                          customStyle={{
                            backgroundColor: "#1f2937",
                            padding: "1rem",
                            borderRadius: "0.5rem",
                            fontSize: "0.875rem",
                          }}
                          wrapLines={true}
                          wrapLongLines={true}
                        >
                          {`/* CSS */
${generateLoaderCSS(selectedCategory, selectedLoader, getCustomization(selectedLoader))}

/* HTML */
<div class="loader-container">
  ${loaderCategories[selectedCategory][selectedLoader].html}
</div>`}
                        </SyntaxHighlighter>
                      </div>
                      <Button
                        onClick={() =>
                          copyToClipboard(
                            `${generateLoaderCSS(selectedCategory, selectedLoader, getCustomization(selectedLoader))}

<div class="loader-container">
  ${loaderCategories[selectedCategory][selectedLoader].html}
</div>`,
                          )
                        }
                        className="absolute top-4 right-6"
                        variant="flat"
                        color="primary"
                        size="sm"
                        isIconOnly
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={() => setDialogOpen(false)}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </ToolLayout>
  )
}

