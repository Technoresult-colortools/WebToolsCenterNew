// src/components/tools/background-pattern-generator/CodePanel.tsx
"use client"

import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism"

interface CodePanelProps {
  code: string
}

export default function CodePanel({ code }: CodePanelProps) {
  return (
    <div className="rounded-md overflow-hidden bg-gray-950 border border-gray-800">
      <SyntaxHighlighter
        language="css"
        style={atomDark}
        customStyle={{
          margin: 0,
          borderRadius: "0.375rem",
          backgroundColor: "#030712",
          fontSize: "0.875rem",
          maxHeight: "300px"
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}