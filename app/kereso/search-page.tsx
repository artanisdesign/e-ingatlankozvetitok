"use client"

import { useEffect, useRef } from "react"
import Script from "next/script"
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"

import { Icons } from "@/app/components/icons"
import GoogleSVG from "@/app/components/icons/GoogleSVG"
import { Button } from "@/app/components/ui/button"
import { clientAuth, logEvent } from "@/app/lib/clientFirebaseApps"

import { useAuth } from "../dokumentum-asszisztens/context/AuthContext"

export default function SearchPage() {
  const { user, loading } = useAuth()
  const provider = new GoogleAuthProvider()
  const widgetRef = useRef<HTMLElement | null>(null) // ref for the custom element

  useEffect(() => {
    if (!loading && user) {
      logEvent("search-open")
      logEvent('screen_view', {
        firebase_screen: "search",
        firebase_screen_class: "SearchPage",
      })
      const searchWidget = widgetRef.current as any

      const trigger = document.getElementById("searchWidgetTrigger")
      //console.log("trigger", trigger)
      /*   if (trigger) {
        setTimeout(() => {
          trigger.click()
          // console.log("trigger click", widgetRef.current)
        }, 200)
      }*/
    }
  }, [user, loading])

  const login = async () => {
    try {
      await signInWithPopup(clientAuth, provider)
      //await signInWithRedirect(clientAuth, provider)
    } catch (e) {
      console.log("error", e)
    }
  }

  return (
    <div className="flex w-full flex-col items-start justify-start">
      <div className="flex flex-col items-start justify-start mb-8 gap-2 mt-4">
        <p className="text">
          Az e-ingatlanügyvédek.hu oldal speciális keresőszolgáltatása a Google
          mesterséges intelligencia technológiájára épül.
        </p>
        <p className="text">
          A kereső eléréséhez és használatához Google-felhasználói fiókkal
          történő bejelentkezés szükséges.
        </p>
        <p className="text">
          Ez a bejelentkezés biztosítja, hogy a szolgáltatás biztonságosan és a
          Google által nyújtott legjobb minőségben működjön. Kérjük,
          jelentkezzen be Google-fiókjával a keresés megkezdéséhez!
        </p>
      </div>
      {user && (
        <div className="flex flex-row items-center justify-end w-full ">
          <Button
            onClick={() => signOut(clientAuth)}
            variant={"outline"}
            size={"lg"}
            className="w-[90px]"
            disabled={loading}
            color="primary"
          >
            Kilépés
          </Button>
        </div>
      )}

      {(loading || !user) && (
        <div className="flex w-full flex-col items-center justify-center mt-12 z-20">
          <Button
            onClick={() => login()}
            variant={"outline"}
            size={"lg"}
            disabled={loading}
            color="primary"
            className="flex min-w-[240px] p-4 min-h-14 flex-row items-center justify-center gap-2 bg-background text-foreground hover:bg-teal-600 hover:text-white font-semibold"
          >
            {loading ? (
              <Icons.spinner className="mr-2 size-8 animate-spin" />
            ) : (
              <GoogleSVG className="mr-2 size-8" />
            )}
            Folytatás Google-lal
          </Button>
        </div>
      )}

      {user && (
        <div className="flex text-black md:mt-4 w-full items-center justify-center flex-col gap-4">
          <Script
            src="https://cloud.google.com/ai/gen-app-builder/client?hl=hu_HU"
            strategy="afterInteractive"
          />
          {
            //@ts-expect-error error with custom element
            <gen-search-widget
              ref={widgetRef}
              configId="909546ff-3c8a-4d48-a92f-cb2957e36423"
              location="eu"
              triggerId="searchWidgetTrigger"
              placeholder="Keresés az e-ingatlanügyvédek.hu oldalon"
            />
          }
          <Button
            id="searchWidgetTrigger"
            variant={"primary"}
            size={"lg"}
            className="self-center mt-12 p-6 w-full max-w-[300px]"
          >
            <Icons.sparkles className="mr-2 size-5" />
            Kereső indítása
          </Button>
        </div>
      )}

      {false && loading && (
        <div className="flex h-32 flex-row items-center justify-center w-full">
          <Icons.spinner className="size-6 animate-spin text-teal-500" />
        </div>
      )}
    </div>
  )
}
