// src/components/tools/background-pattern-generator/ColorPicker.tsx
"use client"

import React from "react"
import { Input } from "@nextui-org/react"

interface ColorPickerProps {
  label: string
  color: string
  onChange: (value: string) => void
}

export default function ColorPicker({ label, color, onChange }: ColorPickerProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-default-700 mb-2">{label}:</label>
      <div className="flex items-center gap-4">
   
        <Input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          className="max-w-xs"
          variant="bordered"
        />
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="w-10 h-10 rounded cursor-pointer"
          />
          
        </div>
      </div>
    </div>
  )
}