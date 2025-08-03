"use client"

import { useState } from "react"

import { AuthProvider } from "@/app/dokumentum-asszisztens/context/AuthContext"
import SearchPage from "@/app/kereso/search-page"

import AISVG from "../icons/AISVG"
import BgSvg from "../ui/bg-svg"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"

export default function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogContent className="sm:w-[90%] max-w-5xl sm:max-h-[90vh] sm:rounded-xl overflow-hidden flex flex-col items-start justify-start h-full w-full p-8 overflow-y-auto">
        <div className="z-10 absolute top-24 left-0 w-full pointer-events-none opacity-50 ">
          <BgSvg />
        </div>
        <AISVG className="absolute size-96 top-32 -left-32 opacity-25 z-0" />
        <DialogHeader>
          <DialogTitle className="flex flex-row items-start text-left">
            Keresés az e-ingatlanügyvédek.hu oldalon
          </DialogTitle>
          <DialogDescription className="text-left">
            A kereső használatához be kell jelentkezni.
          </DialogDescription>
        </DialogHeader>
        <AuthProvider>
          <SearchPage></SearchPage>
        </AuthProvider>
      </DialogContent>
      <div className="fixed inset-0 bg-black/50 z-50 animate-fade-in backdrop-blur-sm" />
    </Dialog>
  )
}
