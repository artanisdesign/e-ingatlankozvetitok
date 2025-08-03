"use client"

import { useState } from "react"
import dynamic from "next/dynamic"

import { cn } from "@/app/lib/utils"

import { Icons } from "../icons"
import AISVG from "../icons/AISVG"

// Dynamically load the dialog component
const SearchDialog = dynamic(() => import("./search-dialog"), {
  ssr: false, // only render on client side
  loading: () => (
    <Icons.spinner className="absolute size-6 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-1" />
  ),
})

export default function SearchBlock({
  isSmall = false,
}: {
  isSmall?: boolean
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        className={cn(
          "relative group mb-8 flex w-full max-w-full flex-col self-center rounded-xl outline-2 outline-offset-2 outline-dashed outline-teal-500/50 bg-teal-100 dark:bg-blue-950 p-4 lg:mx-0 overflow-hidden",
          isSmall ? "p-3 mt-8" : ""
        )}
        onClick={() => {
          setOpen(true)
          // Log the event for analytics
        }}
      >
        <AISVG className="absolute size-44 -top-10 left-32 text-white transition-all duration-200 delay-200 ease-in-out group-hover:scale-150" />
        <AISVG className="absolute size-[440px] -top-32 -left-40 text-white transition-all duration-200 delay-100 ease-in-out scale-125 group-hover:scale-150" />
        <AISVG className="absolute size-[440px] -top-20 left-40 text-white transition-all duration-200 delay-0 ease-in-out group-hover:scale-150" />
        <p className="flex w-full flex-row items-center text-xl font-bold text-white z-10">
          <Icons.sparkles className="mr-2 size-6" />
          Keresés
        </p>
      </button>
      {open && <SearchDialog open={open} onOpenChange={setOpen} />}
    </div>
  )
}
