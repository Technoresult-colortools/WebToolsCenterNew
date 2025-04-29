// src/components/tools/background-pattern-generator/InfoSection.tsx
"use client"

import React from "react";
import { Card } from "@nextui-org/react";
import { Info, BookOpen, Lightbulb, Code, Palette, Zap, Download, Maximize, Bookmark, RefreshCw, Shuffle, Copy, AlertTriangle, Save } from "lucide-react";

export default function InfoSection() {
  // CSS for the sample preview based on generateBigPlusPattern defaults
  const samplePatternStyle = {
      backgroundColor: "#47d3ff", // Base color
      backgroundImage: `
      repeating-radial-gradient(circle at 0 0, transparent 0, #b034a9c4 78px), repeating-linear-gradient(#340e24, #340e24)
      `,
      
  };


  return (
    <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8">
      <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2" />
          What is the CSS Background Pattern Generator?
        </h2>
        <p className="text-default-600 mb-4">
          The CSS Background Pattern Generator is a versatile tool for web developers, designers, and content creators looking to generate unique, tileable background patterns. Explore a diverse library of pattern types, from simple shapes and lines to complex geometric, 3D, and woven effects. Customize colors, sizes, opacity, and many other pattern-specific parameters with live preview updates. The tool generates clean, production-ready CSS that you can directly copy or download for your projects.
        </p>

        <div className="my-8">
          <div className="relative w-full h-64 md:h-80 rounded-lg shadow-lg overflow-hidden">
            <div
              className="absolute inset-0"
              style={samplePatternStyle} // Use the generated style
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white/80 dark:bg-black/80 p-6 rounded-xl shadow-lg text-center">
                <h3 className="text-lg font-medium text-default-800">Sample Pattern Preview</h3>
                <p className="text-default-600 text-sm">Generated with this tool</p>
              </div>
            </div>
          </div>
        </div>

        <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <BookOpen className="w-6 h-6 mr-2" />
          How to Use the CSS Background Pattern Generator?
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-default-600">
          <li>Use the dropdown to select a <strong>Pattern Category</strong> (e.g., Geometric, 3D Effects).</li>
          <li>Click on a <strong>Pattern Type</strong> card within that category.</li>
          <li>Use the <strong>Color Pickers</strong> to set the primary Pattern Color, Background Color, and Secondary Color (if applicable).</li>
          <li>Adjust pattern-specific parameters like <strong>Size, Opacity, Line Width,</strong> etc., using the sliders and controls in the "Adjust" panel.</li>
          <li>See your changes reflected instantly in the <strong>Preview Box</strong>.</li>
          <li>Use the <strong>Randomize</strong> buttons (<Shuffle className="w-3 h-3 inline-block"/>) to explore different looks quickly.</li>
          <li>Click <strong>Save Pattern</strong> (<Save className="w-3 h-3 inline-block"/>) to store your current settings for later use.</li>
          <li>Load previously saved patterns from the <strong>Saved Patterns</strong> section (<Bookmark className="w-3 h-3 inline-block"/>).</li>
          <li>Click <strong>Copy CSS</strong> (<Copy className="w-3 h-3 inline-block"/>) to get the code for your project.</li>
          <li>Click <strong>Download CSS</strong> (<Download className="w-3 h-3 inline-block"/>) to save the code as a `.css` file.</li>
          <li>Use the <strong>Fullscreen</strong> button (<Maximize className="w-3 h-3 inline-block"/>) on the preview for a larger view.</li>
          <li>Click <strong>Reset All</strong> (<RefreshCw className="w-3 h-3 inline-block"/>) to return to the default settings.</li>
        </ol>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2" />
          Key Features
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-default-600">
          <li>
            <Palette className="w-4 h-4 inline-block mr-1 text-primary" /> <strong>Extensive Pattern Library:</strong> Choose from categories like Basic Shapes, Lines & Grids, Geometric, Textures, 3D Effects, and Woven patterns.
          </li>
          <li>
            <Zap className="w-4 h-4 inline-block mr-1 text-secondary" /> <strong>Real-time Preview:</strong> Instantly visualize your customizations as you adjust settings.
          </li>
           <li>
            <Shuffle className="w-4 h-4 inline-block mr-1 text-success" /> <strong>Randomization:</strong> Quickly discover new styles by randomizing all settings or just colors.
          </li>
           <li>
            <Bookmark className="w-4 h-4 inline-block mr-1 text-warning" /> <strong>Save & Load:</strong> Store your favorite patterns and recall their settings anytime.
          </li>
          <li>
            <Code className="w-4 h-4 inline-block mr-1 text-danger" /> <strong>Clean CSS Output:</strong> Generates efficient and ready-to-use CSS code.
          </li>
          <li>
            <Copy className="w-4 h-4 inline-block mr-1" />/<Download className="w-4 h-4 inline-block mr-1" /> <strong>Easy Export:</strong> Copy the CSS directly or download it as a file.
          </li>
          <li>
            <Maximize className="w-4 h-4 inline-block mr-1" /> <strong>Fullscreen View:</strong> Inspect your pattern design without distractions.
          </li>
           <li>
            <AlertTriangle className="w-4 h-4 inline-block mr-1 text-danger-500" /> <strong>Error Handling:</strong> Provides feedback if CSS generation encounters issues.
          </li>
        </ul>

        <p className="text-default-600 mt-6">
          Ready to elevate your designs? Dive in and start creating stunning, unique CSS background patterns effortlessly. Experiment with the controls, save your best creations, and easily integrate them into your next web project!
        </p>
      </div>
    </Card>
  )
}