// src/components/tools/background-pattern-generator/PatternSelector.tsx
"use client"

import React, { useState, useMemo } from "react"
// *** Import Select and SelectItem ***
import { Card, Selection, Select, SelectItem } from "@nextui-org/react"
import { patternTypes, patternCategories, getPatternsByCategory } from "./patternTypes"
// Import PatternType if needed for type safety, optional otherwise
// import { PatternType } from "./types";

interface PatternSelectorProps {
  currentPattern: string // ID of the currently selected pattern
  onSelectPattern: (patternId: string) => void
}

export default function PatternSelector({ currentPattern, onSelectPattern }: PatternSelectorProps) {
  // Find the category of the initially selected pattern, or default to 'basic'
  const initialCategory = patternTypes.find(p => p.id === currentPattern)?.category || "basic";
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  // Update activeCategory if the currentPattern prop changes and its category differs
  React.useEffect(() => {
    const currentPatternCategory = patternTypes.find(p => p.id === currentPattern)?.category;
    if (currentPatternCategory && currentPatternCategory !== activeCategory) {
      setActiveCategory(currentPatternCategory);
    }
  }, [currentPattern, activeCategory]);

  // Handler for the Category Select dropdown
  const handleCategoryChange = (keys: Selection) => { // Select uses Selection (Set)
    let categoryId: string | null = null;

    if (keys instanceof Set) {
        const selectedKey = Array.from(keys)[0];
        if (selectedKey !== undefined) {
            categoryId = String(selectedKey);
        }
    } else {
        // Handle 'all' or other unexpected types if necessary
        console.warn("Unexpected Selection type in handleCategoryChange:", keys);
        return;
    }


    if (categoryId && categoryId !== activeCategory) {
        setActiveCategory(categoryId);

        // --- Auto-selection logic when changing category ---
        // Check if the currently selected pattern is within the newly selected category
        const patternsInNewCategory = getPatternsByCategory(categoryId);
        const isCurrentInNewCategory = patternsInNewCategory.some(p => p.id === currentPattern);

        // If the current pattern is NOT in the new category, auto-select the first pattern
        if (!isCurrentInNewCategory && patternsInNewCategory.length > 0) {
            onSelectPattern(patternsInNewCategory[0].id);
        }
        // If the current pattern IS in the new category, do nothing - keep the current selection.
    }
  }

  // Get the patterns for the currently selected category
  const patternsToDisplay = useMemo(() => {
    return getPatternsByCategory(activeCategory);
  }, [activeCategory]);

  return (
    <div className="mb-6 space-y-4"> {/* Added space-y */}
      <h3 className="text-base font-semibold text-default-700 pb-2 border-b border-default-200 dark:border-default-700">
        Select Pattern Type
      </h3>

      {/* Category Select Dropdown */}
      <div>
        <Select
          label="Pattern Category"
          aria-label="Select Pattern Category" // More specific aria-label
          placeholder="Select a category"
          variant="bordered"
          selectedKeys={[activeCategory]} // selection is an array of keys
          onSelectionChange={handleCategoryChange}
          size="sm"
          className="w-full " // Make dropdown full width
        >
          {patternCategories.map((category) => (
            <SelectItem key={category.id} value={category.id} textValue={category.name} className="text-default-700">
              {category.name}
            </SelectItem>
          ))}
        </Select>
      </div>


      {/* Pattern Selection Grid (conditional rendering based on patternsToDisplay) */}
      <div className="pt-2"> {/* Added padding-top */}
        {patternsToDisplay.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {patternsToDisplay.map((pattern) => (
              <Card
                key={pattern.id}
                isPressable
                isHoverable
                className={`border-2 transition-colors duration-150 ease-in-out ${
                  pattern.id === currentPattern
                    ? "border-primary bg-primary-50 dark:bg-primary-900/30"
                    : "border-default-200 dark:border-default-700 bg-default-50 dark:bg-default-100 hover:border-default-400 dark:hover:border-default-500 hover:bg-default-100 dark:hover:bg-default-200"
                }`}
                onPress={() => onSelectPattern(pattern.id)}
              >
                <div className="p-3">
                  <p className="text-sm font-medium text-default-700">{pattern.name}</p>
                  <p className="text-xs text-default-600 mt-1 line-clamp-2">{pattern.description}</p>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-sm text-default-500 text-center py-4">
            No patterns found in the "{patternCategories.find(c=>c.id===activeCategory)?.name || activeCategory}" category.
          </p> // More specific empty message
        )}
      </div>
    </div>
  )
}