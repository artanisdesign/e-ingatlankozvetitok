"use client"

import * as React from "react"

import { cn } from "@/app/lib/utils"
import { Block } from "@/app/types/pages"

import { ContractSmall } from "../header/contract-offer"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Slider } from "../ui/slider"

const multiplier = 1000000

export default function LawyerFee({ data }: { data: Block }) {
  const [price, setPrice] = React.useState(60)
  const [value, setValue] = React.useState("0.005")
  const [totalValue, setTotalValue] = React.useState(0)
  const [diff, setDiff] = React.useState(0)
  const [myPrice, setMyPrice] = React.useState(0)
  const [totalValueString, setTotalValueString] = React.useState("")

  const isCompare = data.isCompare ?? true;

  React.useEffect(() => {
    setTotalValue(Number(value) * price * multiplier)
    setTotalValueString(
      (Number(value) * price * multiplier).toLocaleString("hu-HU")
    )

    let myPrice = Math.round(Number(0.0045) * price * multiplier)

    if (myPrice < 150000) {
      myPrice = 150000
    } else if (myPrice > 600000) {
      myPrice = 600000
    }

    setMyPrice(myPrice)

    setDiff(Math.round(Number(value) * price * multiplier * 1.27 - myPrice))
  }, [price, value])

  return (
    <section className="my-12 grid rounded-xl border p-4 dark:border-gray-800 dark:bg-gray-950 sm:p-6">
      <h3 className="my-2 text-2xl font-semibold text-gray-800 dark:text-gray-200">
        {data.title}
      </h3>
      <p className="mb-6 font-light text-gray-500 dark:text-gray-400">
        {data.body}
      </p>

      <div>
        <p className="text-md mb-6" id="slider-label">
          Állítsa be az ingatlan vételárát a csúszkával
        </p>
        <Slider
          defaultValue={[price]}
          max={200}
          step={1}
          aria-label="Ár csúszka"
          aria-labelledby="slider-label"
          min={25}
          className="mb-6"
          onValueChange={(value) => {
            setPrice(value[0])
          }}
        />
        <p className="mb-6 text-lg">
          Ár: <strong>{(price * multiplier).toLocaleString("hu-HU")}</strong> Ft
        </p>
        {isCompare && (
          <>
            <p className="text-md mb-6">
              Válassza ki az ügyvédi munkadíjat (%)
            </p>
            <RadioGroup
              defaultValue={value}
              className="flex flex-row gap-5"
              onValueChange={(value) => setValue(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0.003" id="option-one" />
                <Label htmlFor="option-one">0.3%</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0.005" id="option-two" />
                <Label htmlFor="option-two">0.5%</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0.01" id="option-three" />
                <Label htmlFor="option-two">1%</Label>
              </div>
            </RadioGroup>
          </>
        )}
      </div>
      <div className={cn("mt-8 grid grid-cols-1 gap-5", isCompare ? "sm:grid-cols-2" : "sm:grid-cols-1" )}>
        {isCompare && (
          <div className="relative mb-0 h-full flex-col justify-start rounded-xl  border border-gray-500 bg-gray-50/60 p-6 text-center  dark:border-gray-800 dark:bg-gray-950 md:mx-0 md:flex">
            <p className="mb-5 mt-1">
              <span className="inline-flex items-center gap-1.5 rounded-full  border border-gray-700/80 px-3 py-1.5 text-xs font-bold  uppercase text-gray-500 shadow-sm dark:text-gray-400">
                más ügyvédi irodák
              </span>
            </p>
            <span className="mt-1 text-4xl font-extrabold text-gray-500  dark:text-gray-400 ">
              {Math.round(totalValue * 1.27).toLocaleString("HU-hu")}
              <span className="-mr-2 text-sm font-bold"> Ft áfával</span>
            </span>
            <p className="text-md mt-4 text-gray-500">
              vagy akár <strong>{totalValueString}</strong> Ft áfamentesen
            </p>
          </div>
        )}

        <div>
          <ContractSmall num={myPrice} showExtra={!isCompare} />
        </div>
      </div>
      {isCompare && diff > 0 && (
        <div className="mt-6 flex flex-row items-center  rounded-xl border border-gray-400/50 p-6">
          <p className="text-2xl font-bold text-lime-600 drop-shadow-sm dark:text-lime-400">
            Az e-ingatlanügyvédek.hu ajánlata akár{" "}
            <strong className="text-lime-800 dark:text-lime-200">
              {diff.toLocaleString("HU-hu")}
            </strong>{" "}
            Ft-tal{" "}
            <strong className="text-lime-800 dark:text-lime-200">JOBB</strong>,
            mint a versenytársaké!
          </p>
        </div>
      )}
    </section>
  )
}
