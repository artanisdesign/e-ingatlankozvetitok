"use client"

import { useEffect, useState } from "react"

import { getLocalStorage, setLocalStorage } from "@/app/lib/storageHelper"

import { cn } from "../lib/utils"

export default function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState(false)

  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    if (cookieConsent === null) {
      setTimeout(() => {
        setShowBanner(true)
      }, 10000)
    } else setShowBanner(false)
  }, [cookieConsent])

  useEffect(() => {
    const storedCookieConsent = getLocalStorage("cookie_consent", null)

    setCookieConsent(storedCookieConsent)
  }, [setCookieConsent])

  useEffect(() => {
    const newValue = cookieConsent ? "granted" : "granted" /*"denied"*/

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: newValue,
        ad_storage: newValue,
        //@ts-expect-error
        ad_user_data: newValue,
        ad_personalization: newValue,
      })
      setLocalStorage("cookie_consent", cookieConsent)
    }
  }, [cookieConsent])

  return showBanner ? null : (
    <div
      className={cn(
        "fixed bottom-0 right-0 z-[60] mx-auto w-full p-6 sm:max-w-xl",
        showBanner ? "" : "hidden"
      )}
    >
      <div className="rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur-md dark:border-gray-700 dark:bg-gray-800/70">
        <div className="grid gap-y-3 sm:flex sm:items-center sm:gap-x-5 sm:gap-y-0">
          <div className="sm:max-w-sm">
            <p className="text-gray-500">
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                Weboldalunk cookiekat 🍪
              </span>{" "}
              használ a jobb böngészési élmény érdekében.
            </p>
          </div>
          <div className="inline-flex gap-x-2">
            <div>
              <button
                type="button"
                onClick={() => setCookieConsent(false)}
                className="inline-flex items-center justify-center gap-2 rounded-md border bg-white px-3 py-2 align-middle text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-gray-800"
              >
                Elutasít
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={() => setCookieConsent(true)}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-teal-600 px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Rendben
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
