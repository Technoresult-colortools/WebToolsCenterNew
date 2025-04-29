// src/components/tools/background-pattern-generator/PatternControls.tsx
// src/components/tools/background-pattern-generator/PatternControls.tsx
"use client"

import React from "react"
import { Slider, Radio, RadioGroup, Divider, Switch, Accordion, AccordionItem } from "@nextui-org/react"
// *** IMPORTANT: Make sure types.ts is correctly defined and imported ***
// import { PatternSettings } from "./types";
// *** IMPORT the specific PatternType interface ***
import { PatternType} from "./types";
import ColorPicker from "./ColorPicker";

// Assuming PatternSettings is defined elsewhere like this:
interface PatternSettings {
  patternType: string;
  patternColor: string;
  backgroundColor: string;
  secondaryColor: string;
  patternSize: number;
  dotSize: number;
  lineWidth: number;
  direction: string;
  amplitude: number;
  frequency: number; // Note: Frequency might be implicitly controlled now for waves
  depth: number;
  rotation: number;
  opacity: number;
  stagger: boolean;
  spacing: number;
  contrast: number;
  lighting: number;
  density: number;
  weave: number;
}


interface PatternControlsProps {
  settings: PatternSettings
  currentPattern: PatternType // Use the imported detailed type
  onSettingsChange: (newSettings: Partial<PatternSettings>) => void
}

export default function PatternControls({
  settings,
  currentPattern,
  onSettingsChange
}: PatternControlsProps) {
  // Helper to safely get number value from Slider onChange
  const handleSliderChange = (key: keyof PatternSettings) => (value: number | number[]) => {
      if (typeof value === 'number') {
          // Clamp values based on context before setting state
          let clampedValue = value;
          if (key === 'dotSize') {
              clampedValue = Math.min(value, settings.patternSize); // Dot size <= pattern size
          } else if (key === 'lineWidth') {
               // Allow line width up to pattern size for thick lines/stripes, but not more
              clampedValue = Math.min(value, settings.patternSize);
          } else if (key === 'spacing') {
              clampedValue = Math.max(0, value); // Spacing cannot be negative
          } else if (key === 'amplitude') {
              // Amplitude relative to pattern size makes sense for waves
              clampedValue = Math.min(value, Math.floor(settings.patternSize / 2));
          } else if (key === 'depth') {
               clampedValue = Math.min(value, Math.floor(settings.patternSize / 2)); // Depth shouldn't exceed half size for steps
          }
          // Add more clamps if needed for other controls

          onSettingsChange({ [key]: clampedValue });
      }
  };

  // Create arrays to track which sections to display based on available controls
  // Use optional chaining just in case a property is unexpectedly missing
  const showLineDot = currentPattern?.hasLineWidth || currentPattern?.hasDotSize;
  const showLayout = currentPattern?.hasDirection || currentPattern?.hasStagger || currentPattern?.hasSpacing;
  // Frequency might be removed or repurposed depending on wave implementation
  const showWave3D = currentPattern?.hasAmplitude || currentPattern?.hasFrequency || currentPattern?.hasDepth || currentPattern?.hasLighting;
  const showTexture = currentPattern?.hasContrast || currentPattern?.hasDensity || currentPattern?.hasWeave;

  // Set default open keys - these are the sections that will be open by default
  const defaultOpenKeys = ["colors", "size-rotation"];

  // Create accordion items array and filter out any falsy values
  const accordionItems = React.useMemo(() => {
    return [
      // Colors Section - Always Shown
      <AccordionItem
        key="colors"
        aria-label="Colors"
        title={
          <h3 className="text-base font-semibold text-default-700">Colors</h3>
        }
        className="border-b border-default-200 dark:border-default-700"
      >
        <div className="space-y-4 px-1 pt-2">
          <ColorPicker
            label="Pattern Color"
            color={settings.patternColor}
            onChange={(color) => onSettingsChange({ patternColor: color })}
          />

          <ColorPicker
            label="Background Color"
            color={settings.backgroundColor}
            onChange={(color) => onSettingsChange({ backgroundColor: color })}
          />

          {/* Show Secondary Color if pattern uses it (hasColorAlt) OR if it uses lighting (which implies a secondary highlight/shadow source) */}
          {(currentPattern?.hasColorAlt || currentPattern?.hasLighting) && (
            <ColorPicker
              label={currentPattern.hasLighting ? "Highlight / Line Color" : "Secondary Color"}
              color={settings.secondaryColor}
              onChange={(color) => onSettingsChange({ secondaryColor: color })}
            />
          )}
        </div>
      </AccordionItem>,

      // Size & Rotation - Always Shown (but controls inside are conditional)
      <AccordionItem
        key="size-rotation"
        aria-label="Size & Rotation"
        title={
          <h3 className="text-base font-semibold text-default-700">Size & Rotation</h3>
        }
        className="border-b border-default-200 dark:border-default-700"
      >
        <div className="space-y-4 px-1 pt-2">
          {/* Size Control */}
          {currentPattern?.hasSize && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-small text-default-500 mb-2">{currentPattern.name === 'Stripes' ? 'Stripe Pair Width' : 'Pattern Size'}</label>
                <span className="text-xs text-gray-400">{settings.patternSize}px</span>
              </div>
              <Slider
                aria-label="Pattern Size"
                size="sm"
                step={1}
                minValue={4} // Minimum practical size
                maxValue={200} // Increased max size
                value={settings.patternSize}
                onChange={handleSliderChange('patternSize')}
                onChangeEnd={(value) => { // Ensure related values are clamped on size change end
                    if (typeof value === 'number') {
                       const newSettings: Partial<PatternSettings> = {};
                       if (settings.dotSize > value) newSettings.dotSize = value;
                       if (settings.lineWidth > value) newSettings.lineWidth = value; // Allow up to size now
                       if (settings.amplitude > Math.floor(value / 2)) newSettings.amplitude = Math.floor(value / 2);
                       if (settings.depth > Math.floor(value / 2)) newSettings.depth = Math.floor(value / 2);
                       if (Object.keys(newSettings).length > 0) onSettingsChange(newSettings);
                    }
                }}
              />
            </div>
          )}

          {/* Rotation Control - Only if pattern supports it */}
          {currentPattern?.hasRotation && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-small text-default-500 mb-2">Pattern Rotation</label>
                <span className="text-xs text-gray-400">{settings.rotation}°</span>
              </div>
              <Slider
                aria-label="Pattern Rotation"
                size="sm"
                step={5}
                minValue={0}
                maxValue={360}
                value={settings.rotation}
                onChange={handleSliderChange('rotation')}
              />
            </div>
          )}

          {/* Opacity Control */}
          {currentPattern?.hasOpacity && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-small text-default-500 mb-2">Pattern Opacity</label>
                <span className="text-xs text-gray-400">{Math.round(settings.opacity * 100)}%</span>
              </div>
              <Slider
                aria-label="Pattern Opacity"
                size="sm"
                step={0.05}
                minValue={0}
                maxValue={1}
                value={settings.opacity}
                onChange={handleSliderChange('opacity')}
              />
            </div>
          )}
        </div>
      </AccordionItem>,

      // Line & Dot Properties - Conditionally Shown
      showLineDot ? (
        <AccordionItem
          key="line-dot"
          aria-label="Line & Dot Properties"
          title={
            <h3 className="text-base font-semibold text-default-700">Line & Dot Properties</h3>
          }
          className="border-b border-default-200 dark:border-default-700"
        >
          <div className="space-y-4 px-1 pt-2">
            {/* Dot Size Control */}
            {currentPattern?.hasDotSize && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-small text-default-500 mb-2">Dot Size</label>
                  <span className="text-xs text-gray-400">{settings.dotSize}px</span>
                </div>
                <Slider
                  aria-label="Dot Size"
                  size="sm"
                  step={1}
                  minValue={1}
                  maxValue={Math.max(1, settings.patternSize)} // Dot can be up to pattern size
                  value={settings.dotSize}
                  onChange={handleSliderChange('dotSize')}
                />
              </div>
            )}

            {/* Line Width Control */}
            {currentPattern?.hasLineWidth && (
              <div>
                <div className="flex justify-between items-center mb-1">
                   <label className="text-small text-default-500 mb-2">{currentPattern.name === 'Stripes' ? 'Stripe 1 Width' : 'Line Width'}</label>
                  <span className="text-xs text-gray-400">{settings.lineWidth}px</span>
                </div>
                <Slider
                  aria-label="Line Width"
                  size="sm"
                  step={1}
                  minValue={1}
                   // Allow line width up to pattern size (e.g., for full-width stripes)
                  maxValue={Math.max(1, settings.patternSize)}
                  value={settings.lineWidth}
                  onChange={handleSliderChange('lineWidth')}
                />
              </div>
            )}
          </div>
        </AccordionItem>
      ) : null,

      // Layout & Direction - Conditionally Shown
      showLayout ? (
        <AccordionItem
          key="layout"
          aria-label="Layout & Direction"
          title={
            <h3 className="text-base font-semibold text-default-700">Layout & Direction</h3>
          }
          className="border-b border-default-200 dark:border-default-700"
        >
          <div className="space-y-4 px-1 pt-2">
            {/* Direction Control */}
            {currentPattern?.hasDirection && (
              <div>
                <label className="text-sm font-medium text-default-500 block mb-2">Direction</label>
                <RadioGroup
                  aria-label="Pattern Direction"
                  orientation="horizontal"
                  value={settings.direction}
                  onValueChange={(value) => onSettingsChange({ direction: value })}
                  size="sm"
                >
                  <Radio value="horizontal">Horizontal</Radio>
                  <Radio value="vertical">Vertical</Radio>
                  {/* Only show Diagonal for patterns that explicitly support it (like Steps) */}
                  {currentPattern.id === "steps" && <Radio value="diagonal">Diagonal</Radio>}
                </RadioGroup>
              </div>
            )}

            {/* Stagger Control */}
            {currentPattern?.hasStagger && (
              <div className="flex justify-between items-center">
                <label className="text-small text-default-500">Staggered Pattern</label>
                <Switch
                  aria-label="Stagger Pattern"
                  isSelected={settings.stagger}
                  onValueChange={(value) => onSettingsChange({ stagger: value })}
                  size="sm"
                  color="primary"
                />
              </div>
            )}

            {/* Spacing Control */}
            {currentPattern?.hasSpacing && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-small text-default-500 mb-2">Spacing (Lines)</label>
                  <span className="text-xs text-gray-400">{settings.spacing}px</span>
                </div>
                <Slider
                  aria-label="Line Spacing"
                  size="sm"
                  step={1}
                  minValue={0} // Allow zero spacing
                  maxValue={Math.max(1, settings.patternSize)} // Spacing up to pattern size
                  value={settings.spacing}
                  onChange={handleSliderChange('spacing')}
                />
              </div>
            )}
          </div>
        </AccordionItem>
      ) : null,

      // Wave & 3D Properties - Conditionally Shown
      showWave3D ? (
        <AccordionItem
          key="wave-3d"
          aria-label="Wave & 3D Properties"
          title={
            <h3 className="text-base font-semibold text-default-700">Wave & 3D Effects</h3>
          }
          className="border-b border-default-200 dark:border-default-700"
        >
          <div className="space-y-4 px-1 pt-2">
            {/* Amplitude Control */}
            {currentPattern?.hasAmplitude && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-small text-default-500 mb-2">Amplitude (Waves)</label>
                  <span className="text-xs text-gray-400">{settings.amplitude}px</span>
                </div>
                <Slider
                  aria-label="Wave Amplitude"
                  size="sm"
                  step={1}
                  minValue={1}
                  // Amplitude relative to pattern size
                  maxValue={Math.max(1, Math.floor(settings.patternSize / 2))}
                  value={settings.amplitude}
                  onChange={handleSliderChange('amplitude')}
                />
              </div>
            )}

            {/* Frequency Control - Removed as Wave pattern now uses size */}
            {/* {currentPattern?.hasFrequency && ( ... )} */}

            {/* Depth Control */}
            {currentPattern?.hasDepth && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-small text-default-500 mb-2">Depth (Steps)</label>
                  <span className="text-xs text-gray-400">{settings.depth}px</span>
                </div>
                <Slider
                  aria-label="3D Depth"
                  size="sm"
                  step={1}
                  minValue={1}
                   // Depth constrained by pattern size (e.g., half for steps)
                  maxValue={Math.max(1, Math.floor(settings.patternSize / 2))}
                  value={settings.depth}
                  onChange={handleSliderChange('depth')}
                />
              </div>
            )}

            {/* Lighting Control */}
            {currentPattern?.hasLighting && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-small text-default-500 mb-2">Lighting Contrast</label>
                  <span className="text-xs text-gray-400">{Math.round((1-settings.lighting) * 100)}%</span>
                </div>
                <Slider
                  aria-label="3D Lighting Contrast"
                  size="sm"
                  step={0.05}
                  minValue={0} // More contrast
                  maxValue={1} // Less contrast
                  value={settings.lighting}
                  onChange={handleSliderChange('lighting')}
                />
              </div>
            )}
          </div>
        </AccordionItem>
      ) : null,

      // Texture & Density - Conditionally Shown
      showTexture ? (
        <AccordionItem
          key="texture"
          aria-label="Texture & Density"
          title={
            <h3 className="text-base font-semibold text-default-700">Texture & Density</h3>
          }
          className="border-b border-default-200 dark:border-default-700"
        >
          <div className="space-y-4 px-1 pt-2">
            {/* Contrast Control (Noise) */}
            {currentPattern?.hasContrast && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-small text-default-500 mb-2">Contrast (Noise)</label>
                  <span className="text-xs text-gray-400">{Math.round(settings.contrast * 100)}%</span>
                </div>
                <Slider
                  aria-label="Noise Contrast"
                  size="sm"
                  step={0.05}
                  minValue={0}
                  maxValue={1}
                  value={settings.contrast}
                  onChange={handleSliderChange('contrast')}
                />
              </div>
            )}

            {/* Density Control (Noise, Circuit, Blueprint) */}
            {currentPattern?.hasDensity && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-small text-default-500 mb-2">Density / Complexity</label>
                  <span className="text-xs text-gray-400">{Math.round(settings.density * 100)}%</span>
                </div>
                <Slider
                  aria-label="Pattern Density"
                  size="sm"
                  step={0.05}
                  minValue={0.0} // Allow zero density for min effect
                  maxValue={1.0}
                  value={settings.density}
                  onChange={handleSliderChange('density')}
                />
              </div>
            )}

            {/* Weave Control (Carbon Fiber) */}
            {currentPattern?.hasWeave && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-small text-default-500 mb-2">Weave Tightness</label>
                  <span className="text-xs text-gray-400">{Math.round(settings.weave * 100)}%</span>
                </div>
                <Slider
                  aria-label="Carbon Fiber Weave"
                  size="sm"
                  step={0.05}
                  minValue={0.1} // Min weave looks better > 0
                  maxValue={1}
                  value={settings.weave}
                  onChange={handleSliderChange('weave')}
                />
              </div>
            )}
          </div>
        </AccordionItem>
      ) : null,
    ].filter(Boolean); // Filter out any null values (important!)
  }, [
    settings,
    currentPattern,
    onSettingsChange,
    showLineDot,
    showLayout,
    showWave3D,
    showTexture,
    handleSliderChange // Add handleSliderChange dependency
  ]);

  return (
    <div className="space-y-4">
      <Accordion
        variant="light" // Changed from "bordered" to "light"
        className="px-0" // Removed padding
        defaultExpandedKeys={new Set(defaultOpenKeys)}
        // Consider keeping only one item expanded at a time for very long lists
        // selectionMode="multiple" (default) or selectionMode="single"
      >
        {accordionItems}
      </Accordion>
    </div>
  )
}