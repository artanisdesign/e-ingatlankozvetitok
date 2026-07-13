import Link from "next/link"

import { siteConfig } from "@/config/site"

import { Icons } from "../icons"
import GoogleSVG from "../icons/GoogleSVG"

const GOOGLE_PREF_URL = `https://www.google.com/preferences/source?q=${siteConfig.url}`

export function GoogleNewsCTA() {
  return (
    <Link
      href={GOOGLE_PREF_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="outline-blue-teal/50 group my-10 flex items-center gap-4 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600  p-4 outline-dashed outline-teal-700 outline-2 outline-offset-2 transition hover:bg-teal-700 sm:gap-4 sm:p-4"
    >
      <div className="shrink-0 rounded-full bg-white p-1">
        <GoogleSVG className="size-6 transition-all sm:size-8 sm:group-hover:size-9 " />
      </div>
      <p className="flex-1 text-sm font-semibold leading-snug text-white sm:text-base">
        Kövesse oldalunkat a Google keresőben – így mindig elsők között látja a
        cikkeinket
      </p>
    </Link>
  )
}
