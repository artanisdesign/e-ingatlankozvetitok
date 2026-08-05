"use client"

import { siteConfig } from "@/config/site"
import { useEffect } from "react"

const DELAY_MS = 2000
 
export default function AdSenseLoader() {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (document.querySelector('script[src*="adsbygoogle"]')) return

      const script = document.createElement("script")
      script.async = true
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.ADSENSE_CLIENT}`
      script.crossOrigin = "anonymous"
      script.onload = () => {
        window.__adsenseLoaded = true


        ;(window.adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 1

        window.googlefc = window.googlefc || {}
        window.googlefc.callbackQueue = window.googlefc.callbackQueue || []
        window.googlefc.callbackQueue.push({
          CONSENT_MODE_DATA_READY: () => {
            ;(window.adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 0
          },
        })
      }
      document.head.appendChild(script)
    }, DELAY_MS)

    return () => clearTimeout(timer)
  }, [])

  return null
}
