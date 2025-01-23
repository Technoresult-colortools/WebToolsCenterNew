'use client'

import { Button } from "@nextui-org/react"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "@/providers/theme-provider"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      isIconOnly
      variant="light"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </Button>
  )
}