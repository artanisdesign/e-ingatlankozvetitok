"use client"

import { useState } from "react"
import dynamic from "next/dynamic"

import { cn } from "@/app/lib/utils"

import { Icons } from "../icons"
import { Button } from "../ui/button"

// Dynamically load the dialog component
const SearchDialog = dynamic(() => import("./search-dialog"), {
  ssr: false, // only render on client side
  loading: () => (
    <Icons.spinner className="absolute size-6 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-1" />
  ),
})

export default function SearchButton({
  isSmall = false,
}: {
  isSmall?: boolean
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant={"outline"}
        size={"lg"}
        className="w-full rounded-lg sm:w-fit border-teal-200 dark:border-teal-900 "
        onClick={() => {
          setOpen(true)
          // Log the event for analytics
        }}
      >
        <Icons.sparkles className="mr-2 size-4 animate-pulse text-teal-600" />
        Keresés
      </Button>
      {open && <SearchDialog open={open} onOpenChange={setOpen} />}
    </>
  )
}
