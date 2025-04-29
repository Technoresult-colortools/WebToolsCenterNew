"use client"

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Card,
  CardBody,
  Button,
  Tooltip,
} from "@nextui-org/react";
import {
  Copy,
  Download,
  Shuffle,
  Maximize,
  Code,
  Save,
  Bookmark,
  AlertTriangle,
  Trash2,
  RefreshCw
} from "lucide-react";
import { toast } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import PatternPreview from "./PatternPreview";
import PatternControls from "./PatternControls";
import PatternSelector from "./PatternSelector";
import CodePanel from "./CodePanel";
import { patternTypes, patternCategories } from "./patternTypes";
import { PatternType, PatternSettings } from "./types";
import { generatePatternCSS } from "./patternGenerators";

const randomHexColor = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
const randomRange = (min: number, max: number, step: number = 1) => {
    const range = (max - min) / step;
    return min + Math.floor(Math.random() * (range + 1)) * step;
};
const randomFloatRange = (min: number, max: number, precision: number = 2) => {
    const factor = Math.pow(10, precision);
    return Math.round((min + Math.random() * (max - min)) * factor) / factor;
};

const BASE_INITIAL_SETTINGS: PatternSettings = {
    patternType: "grid",
    patternColor: "#3b82f6",
    backgroundColor: "#1f2937",
    secondaryColor: "#a855f7",
    patternSize: 32,
    dotSize: 4,
    lineWidth: 1,
    direction: "horizontal",
    amplitude: 10,
    frequency: 4,
    depth: 8,
    rotation: 0,
    opacity: 1.0,
    stagger: false,
    spacing: 5,
    contrast: 0.5,
    lighting: 0.5,
    density: 0.5,
    weave: 0.5,
};

const getInitialSettingsForPattern = (patternId: string): PatternSettings => {
    const pattern = patternTypes.find(p => p.id === patternId) || patternTypes[0];
    const patternDefaults = pattern.defaultSettings || {};
    return {
        ...BASE_INITIAL_SETTINGS,
        ...patternDefaults,
        patternType: pattern.id,
        patternColor: patternDefaults.patternColor || BASE_INITIAL_SETTINGS.patternColor,
        backgroundColor: patternDefaults.backgroundColor || BASE_INITIAL_SETTINGS.backgroundColor,
        secondaryColor: patternDefaults.secondaryColor || BASE_INITIAL_SETTINGS.secondaryColor,
    };
};

export default function PatternGenerator() {
  const [settings, setSettings] = useState<PatternSettings>(() =>
    getInitialSettingsForPattern(BASE_INITIAL_SETTINGS.patternType)
  );
  const [cssCode, setCssCode] = useState("");
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [savedPatterns, setSavedPatterns] = useState<Array<{name: string, settings: PatternSettings, css: string}>>([]);

  const currentPattern = useMemo<PatternType>(() => {
    return patternTypes.find(p => p.id === settings.patternType) ?? patternTypes[0];
  }, [settings.patternType]);

  const [selectedCategory, setSelectedCategory] = useState(currentPattern.category);
  useEffect(() => {
      setSelectedCategory(currentPattern.category);
  }, [currentPattern.category]);


  useEffect(() => {
    setGenerationError(null);
    try {
      const generatedCss = generatePatternCSS(settings);
      setCssCode(generatedCss);
       if (generatedCss.includes('/* Error')) {
           const match = generatedCss.match(/\/\* Error:?\s*(.*?)\s*\*\//);
           const errorMsg = match ? match[1] : `Failed to generate CSS for "${currentPattern.name}".`;
           setGenerationError(errorMsg);
           console.warn("CSS Generation Warning:", errorMsg);
       }
    } catch (error) {
      console.error("Critical Error generating CSS:", error);
      const errorMsg = `Failed to generate CSS for "${currentPattern.name}". Check console.`;
      setCssCode(`/* ${errorMsg} */\nbackground-color: ${settings.backgroundColor};`);
      setGenerationError(errorMsg);
      toast.error(`Error generating ${currentPattern.name} pattern.`);
    }
  }, [settings, currentPattern.name]);

  const handleSettingsChange = useCallback((newSettings: Partial<PatternSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const handlePatternTypeChange = useCallback((newPatternId: string) => {
    const newPattern = patternTypes.find(p => p.id === newPatternId);
    if (!newPattern) return;

    setSettings(prevSettings => {
        // 1. Get the FULL, correctly typed default settings object for the NEW pattern
        const newPatternDefaults = getInitialSettingsForPattern(newPatternId);

        // 2. Create the next state: Start with the new pattern's calculated defaults.
        //    Then, selectively merge *previous* settings that the user might want to preserve
        //    across pattern changes (like colors).
        const nextSettings: PatternSettings = {
            ...newPatternDefaults, // Start with new pattern's complete defaults
            // Now, overwrite with previous settings that should persist (e.g., colors)
            patternColor: prevSettings.patternColor,
            backgroundColor: prevSettings.backgroundColor,
            secondaryColor: prevSettings.secondaryColor,
            // Ensure the patternType is explicitly set to the new one, just in case
            patternType: newPatternId,
        };

        // Optional: If you absolutely MUST reset certain things even if the user changed them,
        // uncomment and apply specific defaults from newPatternDefaults here.
        // For example, to force the new pattern's default opacity:
        // if (newPatternDefaults.opacity !== undefined) {
        //     nextSettings.opacity = newPatternDefaults.opacity;
        // }

        return nextSettings;
    });
}, []);


  const handleRandomPattern = useCallback(() => {
    const randomPatternDef = patternTypes[Math.floor(Math.random() * patternTypes.length)];
    const randomPatternBaseSettings = getInitialSettingsForPattern(randomPatternDef.id);

    let randomValues: Partial<PatternSettings> = {
      patternColor: randomHexColor(),
      backgroundColor: randomHexColor(),
    };

    if (randomPatternDef.hasColorAlt || randomPatternDef.hasLighting) {
        randomValues.secondaryColor = randomHexColor();
    }

    const size = randomPatternDef.hasSize ? randomRange(10, 120, 2) : randomPatternBaseSettings.patternSize;
    if(randomPatternDef.hasSize && size !== undefined) randomValues.patternSize = size;

    if (randomPatternDef.hasDotSize && size) randomValues.dotSize = randomRange(1, Math.floor(size / 2), 1);
    if (randomPatternDef.hasLineWidth && size) randomValues.lineWidth = randomRange(1, Math.floor(size / 2), 1);
    if (randomPatternDef.hasDirection) randomValues.direction = ["horizontal", "vertical", ...(randomPatternDef.id === 'steps' ? ['diagonal'] : [])][Math.floor(Math.random() * (randomPatternDef.id === 'steps' ? 3 : 2))];
    if (randomPatternDef.hasAmplitude && size) randomValues.amplitude = randomRange(5, Math.floor(size / 3), 1);
    if (randomPatternDef.hasDepth && size) randomValues.depth = randomRange(2, Math.floor(size / 2), 1);
    if (randomPatternDef.hasRotation) randomValues.rotation = randomRange(0, 355, 5);
    if (randomPatternDef.hasOpacity) randomValues.opacity = randomFloatRange(0.3, 1.0, 2);
    if (randomPatternDef.hasStagger) randomValues.stagger = Math.random() > 0.5;
    if (randomPatternDef.hasSpacing && size) randomValues.spacing = randomRange(0, Math.floor(size / 2), 1);
    if (randomPatternDef.hasContrast) randomValues.contrast = randomFloatRange(0.1, 1.0, 2);
    if (randomPatternDef.hasLighting) randomValues.lighting = randomFloatRange(0.0, 1.0, 2);
    if (randomPatternDef.hasDensity) randomValues.density = randomFloatRange(0.1, 1.0, 2);
    if (randomPatternDef.hasWeave) randomValues.weave = randomFloatRange(0.1, 1.0, 2);

    const finalSettings = { ...randomPatternBaseSettings, ...randomValues };

    if (finalSettings.dotSize && finalSettings.patternSize && finalSettings.dotSize > finalSettings.patternSize) finalSettings.dotSize = finalSettings.patternSize;
    if (finalSettings.lineWidth && finalSettings.patternSize && finalSettings.lineWidth > finalSettings.patternSize) finalSettings.lineWidth = finalSettings.patternSize;
    if (finalSettings.amplitude && finalSettings.patternSize && finalSettings.amplitude > finalSettings.patternSize / 2) finalSettings.amplitude = Math.floor(finalSettings.patternSize / 2);
    if (finalSettings.depth && finalSettings.patternSize && finalSettings.depth > finalSettings.patternSize / 2) finalSettings.depth = Math.floor(finalSettings.patternSize / 2);
    if (finalSettings.spacing && finalSettings.patternSize && finalSettings.spacing > finalSettings.patternSize) finalSettings.spacing = finalSettings.patternSize;

    setSettings(finalSettings);
    toast.success(`Generated random ${randomPatternDef.name} pattern!`);
  }, []);

  const handleShuffleColors = useCallback(() => {
    const changes: Partial<PatternSettings> = {
        patternColor: randomHexColor(),
        backgroundColor: randomHexColor(),
    };
    if (currentPattern.hasColorAlt || currentPattern.hasLighting) {
        changes.secondaryColor = randomHexColor();
    }
    handleSettingsChange(changes);
    toast.success("Colors shuffled!");
  }, [handleSettingsChange, currentPattern]);

  const handleCopy = useCallback(() => {
    if (generationError) {
        toast.error("Cannot copy code with errors.");
        return;
    }
    navigator.clipboard.writeText(cssCode)
      .then(() => toast.success("CSS code copied!"))
      .catch(err => {
          console.error("Failed to copy:", err);
          toast.error("Failed to copy code.");
      });
  }, [cssCode, generationError]);

  const handleSavePattern = useCallback(() => {
     if (generationError) {
        toast.error("Cannot save pattern with errors.");
        return;
    }
    const patternName = prompt("Enter a name for this pattern:", `${currentPattern.name} - ${new Date().toLocaleTimeString()}`);
    if (patternName && patternName.trim()) {
      const trimmedName = patternName.trim();
      setSavedPatterns(prev => [...prev, {
        name: trimmedName,
        settings: JSON.parse(JSON.stringify(settings)),
        css: cssCode
      }]);
      toast.success(`Pattern "${trimmedName}" saved!`);
    } else if (patternName !== null) {
        toast.error("Pattern name cannot be empty.");
    }
  }, [settings, cssCode, currentPattern.name, generationError]);

  const handleLoadPattern = useCallback((index: number) => {
    const patternToLoad = savedPatterns[index];
    if (patternToLoad) {
      const loadedPatternDef = patternTypes.find(p => p.id === patternToLoad.settings.patternType);
      if (loadedPatternDef) {
        setSettings(patternToLoad.settings);
        toast.success(`Loaded pattern "${patternToLoad.name}"`);
      } else {
          toast.error(`Could not find pattern definition for saved type "${patternToLoad.settings.patternType}". Loading settings anyway.`);
          setSettings(patternToLoad.settings);
      }
    }
  }, [savedPatterns]);

  const handleDeletePattern = useCallback((index: number) => {
    const patternToDelete = savedPatterns[index];
    if (patternToDelete && window.confirm(`Are you sure you want to delete the saved pattern "${patternToDelete.name}"?`)) {
        setSavedPatterns(prev => prev.filter((_, i) => i !== index));
        toast.success(`Pattern "${patternToDelete.name}" deleted.`);
    }
  }, [savedPatterns]);

  const handleDownload = useCallback(() => {
    if (generationError) {
        toast.error("Cannot download code with errors.");
        return;
    }
    try {
        const blob = new Blob([`/* Generated - ${new Date().toISOString()} */\n\n.${settings.patternType}-pattern {\n  ${cssCode.replace(/\n/g, '\n  ')} \n}`], { type: "text/css" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const safeName = settings.patternType.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        a.download = `${safeName}-pattern-${Date.now()}.css`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success("CSS file downloaded!");
    } catch (error) {
        console.error("Download failed:", error);
        toast.error("Failed to download CSS file.");
    }
  }, [cssCode, settings.patternType, generationError]);

  const handleFullScreen = useCallback(() => {
    const previewDiv = document.getElementById("pattern-preview-div");
    if (!previewDiv) {
        toast.error("Preview element not found.");
        return;
    }
    const previewContent = previewDiv.querySelector(':first-child');
    const targetElement = previewContent instanceof HTMLElement ? previewContent : previewDiv;

    if (!document.fullscreenElement) {
       targetElement.requestFullscreen().catch(err => {
            console.error("Fullscreen request failed:", err);
            toast.error(`Fullscreen mode failed: ${err.message}`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
  }, []);

  const handleReset = useCallback(() => {
    setSettings(getInitialSettingsForPattern(BASE_INITIAL_SETTINGS.patternType));
    toast.success("Settings reset to default");
  }, []);

  // Removed handleCategoryChange as PatternSelector handles it internally based on provided props

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-default-50 dark:bg-default-100 overflow-hidden relative">
             <AnimatePresence>
            {generationError && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-0 left-0 right-0 bg-danger/90 text-white text-xs p-2 flex items-center justify-center z-20 backdrop-blur-sm shadow-md"
                >
                    <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0"/>
                    <span className="truncate" title={generationError}>{generationError}</span>
                </motion.div>
            )}
            </AnimatePresence>
            <CardBody className="p-0">
              <div
                id="pattern-preview-div"
                className="rounded-lg relative overflow-hidden group"
                style={{ minHeight: "300px", backgroundColor: settings.backgroundColor }}
              >
                 <PatternPreview cssCode={cssCode.replace(/background-color:.*?;?\s*/, '')} />
                <Button
                  size="sm"
                  variant="flat"
                  color="default"
                  onPress={handleFullScreen}
                  className="absolute bottom-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                  isIconOnly
                  aria-label="Toggle Fullscreen"
                >
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </CardBody>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            <div className="relative">
              <Button
                  color="primary"
                  variant="shadow"
                  className="w-full transition-transform hover:scale-105"
                  startContent={<Shuffle className="h-4 w-4" />}
                  onClick={handleRandomPattern}
                  size="md"
              >
                  <span className="hidden xs:inline">Randomize All</span>
                  <span className="inline xs:hidden">Random</span>
              </Button>
            </div>
            
            <div className="relative">
              <Button
                  color="secondary"
                  variant="shadow"
                  className="w-full transition-transform hover:scale-105"
                  startContent={<Shuffle className="h-4 w-4" />}
                  onClick={handleShuffleColors}
                  size="md"
              >
                  <span className="hidden xs:inline">Shuffle Colors</span>
                  <span className="inline xs:hidden">Colors</span>
              </Button>
            </div>
            
            <div className="relative">
              <Button
                  color="success"
                  variant="shadow"
                  className="w-full transition-transform hover:scale-105"
                  startContent={<Save className="h-4 w-4" />}
                  onClick={handleSavePattern}
                  isDisabled={!!generationError}
                  size="md"
              >
                  <span className="hidden xs:inline">Save Pattern</span>
                  <span className="inline xs:hidden">Save</span>
              </Button>
            </div>
            
            <div className="relative">
              <Button
                  color="danger"
                  variant="ghost"
                  className="w-full transition-transform hover:scale-105"
                  startContent={<RefreshCw className="h-4 w-4" />}
                  onClick={handleReset}
                  isDisabled={!!generationError}
                  size="md"
              >
                  <span className="hidden xs:inline">Reset Pattern</span>
                  <span className="inline xs:hidden">Reset</span>
              </Button>
            </div>
          </div>
           


          {/* Corrected props for PatternSelector */}
          <PatternSelector
              currentPattern={settings.patternType}
              onSelectPattern={handlePatternTypeChange}
          />

          <AnimatePresence mode="wait">
              <motion.div
                key={currentPattern.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-3 bg-primary-50 rounded-lg border border-primary/20">
                    <p className="text-sm text-primary-400">{currentPattern.description}</p>
                </div>
              </motion.div>
          </AnimatePresence>

          {savedPatterns.length > 0 && (
            <Card className="bg-default-50 dark:bg-default-100 text-default-600">
              <CardBody>
                <h3 className="text-base font-semibold text-default-700 flex items-center mb-3 border-b border-default-200 dark:border-default-700 pb-2">
                  <Bookmark className="w-5 h-5 mr-2 text-success-500" /> Saved Patterns ({savedPatterns.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-2 styled-scrollbar">
                  {savedPatterns.map((pattern, index) => (
                    <div key={index} className="flex gap-1 items-center">
                         <Button
                            size="sm"
                            className="w-full justify-start text-left flex-grow min-w-0"
                            variant="flat"
                            color="default"
                            onClick={() => handleLoadPattern(index)}
                            title={`Load pattern: ${pattern.name}`}
                        >
                            <span className="truncate">{pattern.name}</span>
                        </Button>
                        <Tooltip content="Delete Saved Pattern" color="danger" placement="top">
                            <Button
                                isIconOnly
                                size="sm"
                                color="danger"
                                variant="light"
                                onPress={() => handleDeletePattern(index)}
                                aria-label={`Delete pattern ${pattern.name}`}
                            >
                                <Trash2 className="h-4 w-4"/>
                            </Button>
                         </Tooltip>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}
        </div>

        <div className="relative h-full">
          <div className="sticky ">
             <Card className="bg-default-50 dark:bg-default-100 text-default-600 max-h-[calc(100vh-4rem)] overflow-y-auto styled-scrollbar">
                <CardBody className="p-4 md:p-6">
                <h3 className="text-lg font-semibold text-default-800 mb-4 pb-2 border-b border-default-200 dark:border-default-700">
                    Adjust <span className="text-primary">{currentPattern.name}</span>
                </h3>

                <AnimatePresence mode="wait">
                    <motion.div
                    key={settings.patternType}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    >
                    <PatternControls
                        settings={settings}
                        currentPattern={currentPattern}
                        onSettingsChange={handleSettingsChange}
                    />
                    </motion.div>
                </AnimatePresence>
                </CardBody>
             </Card>
          </div>
        </div>
      </div>

      <Card className="bg-default-50 dark:bg-default-100 text-default-600">
            <CardBody>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-semibold text-default-700 flex items-center">
                  <Code className="w-5 h-5 mr-2 text-primary" /> Generated CSS
                </h3>
                <div className="flex gap-2">
                  <Tooltip content="Copy CSS" placement="top">
                     <Button
                        size="sm"
                        color="primary"
                        variant="flat"
                        isIconOnly
                        onClick={handleCopy}
                        isDisabled={!!generationError}
                        aria-label="Copy CSS"
                     >
                        <Copy className="h-4 w-4" />
                     </Button>
                  </Tooltip>
                   <Tooltip content="Download CSS File" placement="top">
                     <Button
                        size="sm"
                        color="primary"
                        variant="flat"
                        isIconOnly
                        onClick={handleDownload}
                        isDisabled={!!generationError}
                        aria-label="Download CSS"
                     >
                        <Download className="h-4 w-4" />
                     </Button>
                   </Tooltip>
                </div>
              </div>
              <div className="bg-default-100 dark:bg-default-50 p-4 rounded-lg overflow-x-auto max-h-60 styled-scrollbar">
                <CodePanel code={cssCode} />
              </div>
            </CardBody>
          </Card>

    </div>
  )
}