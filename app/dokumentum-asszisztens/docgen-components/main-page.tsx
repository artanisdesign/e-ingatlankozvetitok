"use client"

import { useEffect } from "react"
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"

import { Icons } from "@/app/components/icons"
import GoogleSVG from "@/app/components/icons/GoogleSVG"
import { Button } from "@/app/components/ui/button"
import { clientAuth, logEvent } from "@/app/lib/clientFirebaseApps"
import { StaticPage } from "@/app/types/pages"

import { useAuth } from "../context/AuthContext"
import Feature from "./feature"
import Generator from "./generator"

export default function MainPage({ data }: { data: StaticPage }) {
  const { user, loading } = useAuth()
  const provider = new GoogleAuthProvider()

  useEffect(() => {
    if (loading) {
      return
    }
    if (user) {
      logEvent("document-assistant-open", { email: user.email })
    } else {
      logEvent("document-assistant-open", { email: "anonymous" })
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
    <div className="mx-auto mb-12 flex w-full flex-col justify-start">
      <div className="flex w-full flex-row items-center justify-end ">
        <div className="mb-4 flex w-full flex-row flex-wrap items-center justify-evenly gap-y-2 rounded-md p-2 backdrop-blur-sm dark:border-none md:flex-nowrap md:justify-between md:border md:border-slate-200 md:bg-white/60 md:p-4 md:shadow-sm md:dark:bg-slate-800/60">
          <h1 className="w-full text-center text-2xl font-extrabold md:text-start md:text-3xl">
            {data.title}
          </h1>
          {user && (
            <div className="flex min-w-[250px]  flex-row items-center justify-end gap-4 md:min-w-[340px]">
              <p className="flex-nowrap text-sm">
                Üdvözlünk:{" "}
                <strong>
                  {user.displayName ? user.displayName : user.email}
                </strong>
              </p>
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
            <Button
              onClick={() => login()}
              variant={"outline"}
              size={"lg"}
              disabled={loading}
              color="primary"
              className="flex min-w-[240px] flex-row items-center justify-center gap-2 bg-background text-foreground hover:bg-teal-600 hover:text-white"
            >
              {loading ? (
                <Icons.spinner className="mr-2 size-5 animate-spin" />
              ) : (
                <GoogleSVG className="mr-2 size-5" />
              )}
              Folytatás a Google-lal
            </Button>
          )}
        </div>
      </div>

      {user && (
        <div className="mt-0 flex flex-col md:mt-4">
          <Generator />
        </div>
      )}
      {/* not logged in */}
      {!user && !loading && <Feature data={data} />}

      {loading && (
        <div className="flex h-32 flex-row items-center justify-center">
          <Icons.spinner className="size-6 animate-spin text-teal-500" />
        </div>
      )}
    </div>
  )
}
