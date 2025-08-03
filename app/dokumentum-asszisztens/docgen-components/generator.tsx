"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
//import { httpsCallable } from "firebase/functions"
import { AlertTriangle } from "lucide-react"

import { ProductCard } from "@/app/components/product-card"
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert"
import { Button } from "@/app/components/ui/button"
import {/*clientFunctions,*/ logEvent } from "@/app/lib/clientFirebaseApps"

import DocumentTemplate from "./document-template"

export default function Generator() {
  const searchParams = useSearchParams()
  const page = searchParams.get("page") ?? ""
  const pathname = usePathname()
  const { push } = useRouter()

  return (
    <div className="">
      {(page === "main" || page === "") && (
        <>
          <Alert variant={"danger"} className="mt-6">
            <AlertTriangle className="size-6" />
            <AlertTitle className="ml-2 text-foreground">Figyelem!</AlertTitle>
            <AlertDescription className="ml-2">
              <p className="my-4">
                A dokumentum asszisztens használata nem minősül jogi
                tanácsadásnak, vagy okiratszerkesztésnek ezért a használata nem
                hoz létre ügyvéd-ügyfél jogviszonyt sem! A dokumentum
                asszisztens használatából eredő károkért felelősséget nem
                vállalunk. Személyes adatokat nem tárolunk, a generált fájlokat
                nem mentjük el.
              </p>
              <p>
                <strong>
                  Személyre szabott jogi tanácsért és okiratokért keresse az
                  e-ingatlanügyvédek.hu csapatát!
                </strong>
              </p>
            </AlertDescription>
          </Alert>

          <div className="mt-8 grid  grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {
              /* <Button
              variant="outline"
              onClick={() => {
                const queryCallable = httpsCallable(
                  clientFunctions,
                  "ext-firestore-vector-search-queryCallable"
                )

                queryCallable({ query: "jó ügyvéd kaposváron" })
                  .then((result) => {
                    // Read result
                    console.log(result.data)
                  })
                  .catch((error) => {
                    console.error("Error querying function:", error)
                  })
              }}
            >
              keresse
            </Button> */
            }
           
            <ProductCard
              title="Vételi szándéknyilatkozat generálása"
              description="Jogi kötőerő nélkül"
              color={"amber"}
              onClick={() => {
                logEvent("document-assistant-template-open", {
                  doc: "veteli-szandeknyilatkozat",
                })
                push(`${pathname}?page=veteli-szandeknyilatkozat`)
              }}
            />
            <ProductCard
              title="Előszerződés generálása"
              description="Jogi kötőerővel bír"
              color={"blue"}
              onClick={() => {
                logEvent("document-assistant-template-open", {
                  doc: "eloszerzodes",
                })
                push(`${pathname}?page=eloszerzodes`)
              }}
            />
            <ProductCard
              title="Bérleti szerződés generálása"
              disabled={true}
              description="Generálj bérleti szerződést a szükséges adatok megadásával."
              color={"stone"}
            />
          </div>
        </>
      )}
      {page !== "main" && page !== "" && (
        <div className="flex flex-row justify-start">
          <Button
            variant="outline"
            onClick={() => {
              logEvent("document-assistant-template-back", {
                from: page,
              })
              push(`${pathname}`)
            }}
            className="mb-4 "
          >
            Vissza az előző oldalra
          </Button>
        </div>
      )}
      {page === "veteli-szandeknyilatkozat" && <DocumentTemplate type="vsz" />}
      {page === "eloszerzodes" && <DocumentTemplate type="elo" />}
    </div>
  )
}
