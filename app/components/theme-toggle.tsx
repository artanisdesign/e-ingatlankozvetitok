"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { Button } from "@/app/components/ui/button"
import { cn } from "@/app/lib/utils"

export function ThemeToggle({ isDarkBg = false }: { isDarkBg?: boolean }) {
  const { setTheme, theme } = useTheme()
  return (
    <Button
      variant={"ghost"}
      size="icon"
      className={cn("flex size-8 shrink-0 rounded-full", isDarkBg ? "text-white" : null)}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <SunIcon aria-label="Light mode" className="size-[1.2rem] rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100" />
      <MoonIcon aria-label="Dark mode" className="absolute size-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
    </Button>
  )
}
