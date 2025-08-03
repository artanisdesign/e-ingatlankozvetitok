"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"
import { Country } from "world_countries_lists"
import countries from "world_countries_lists/data/countries/hu/countries.json"
import flags from "world_countries_lists/data/flags/16x16/flags-16x16.json"
import flags64 from "world_countries_lists/data/flags/64x64/flags-64x64.json"

import { Button } from "@/app/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/app/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover"
import { Block } from "@/app/types/pages"

const needPerm = [
  "Svájc",
  "Ausztria",
  "Belgium",
  "Bulgária",
  "Ciprus",
  "Csehország",
  "Dánia",
  "Észtország",
  "Finnország",
  "Franciaország",
  "Görögország",
  "Hollandia",
  "Írország",
  "Lengyelország",
  "Lettország",
  "Litvánia",
  "Luxemburg",
  "Magyarország",
  "Málta",
  "Németország",
  "Olaszország",
  "Portugália",
  "Románia",
  "Spanyolország",
  "Szlovákia",
  "Szlovénia",
  "Svédország",
  "Izland",
  "Norvégia",
  "Liechtenstein",
]

export default function CountrySelect1({ data }: { data: Block }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [code, setCode] = React.useState("")
  const [name, setName] = React.useState("")
  return (
    <section className="my-12 grid rounded-xl border p-4 dark:border-gray-800 dark:bg-gray-950 sm:p-6">
      <h3 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-gray-200">
        {data.title}
      </h3>
      <p className="mb-6 font-light text-gray-500 dark:text-gray-400">
        {data.body}
      </p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            size={"lg"}
            aria-expanded={open}
            className="flex w-full items-center justify-between "
          >
            <span className="flex items-center justify-start">
              {value && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={flags[code as keyof typeof flags]}
                  alt={value}
                  className="mr-4 size-4 shrink-0 "
                />
              )}
              {value
                ? countries.find(
                    (item: Country) => item.name.toLowerCase() === value
                  )?.name
                : "Kereséshez kattintson ide..."}
            </span>
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="-mt-11 w-full p-0 sm:w-[450px] md:min-w-max">
          <Command className="max-h-56 w-fit md:max-h-[420px] md:w-[744px]">
            <CommandInput placeholder="Gépeljesen a kereséshez..." />
            <CommandEmpty>Nincs találat</CommandEmpty>
            <CommandGroup className="overflow-y-scroll">
              {countries.map((item: Country) => (
                <CommandItem
                  key={item.alpha2}
                  value={item.name}
                  className="min-h-full w-full"
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setCode(item.alpha2)
                    setName(item.name)
                    setOpen(false)
                  }}
                >
                  {
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={flags[item.alpha2 as keyof typeof flags]}
                      alt={item.name}
                      className="mr-4 size-4 shrink-0 "
                    />
                  }

                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {value ? (
        <div className="mt-6 grid rounded-xl border bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900 ">
          <p className="my-3 text-lg font-bold first-letter:uppercase">
            <span className="flex items-center justify-start">
              {value && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={flags64[code as keyof typeof flags]}
                  alt={value}
                  className="m-0 mr-4 size-8 shrink-0 "
                />
              )}
              {name}
            </span>
          </p>
          <p className="my-3 flex items-center justify-between text-lg font-bold">
            Szükség van-e tulajdonszerzési engedélyre?{" "}
            {needPerm.includes(name) ? "Nem." : "Igen."}
          </p>
        </div>
      ) : null}
    </section>
  )
}
