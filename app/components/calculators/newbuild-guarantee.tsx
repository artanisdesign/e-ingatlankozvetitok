"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

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
import { mdata } from "@/app/lib/guarantee-data"
import { Block } from "@/app/types/pages"

export default function NewbuildGuarantee({ data }: { data: Block }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [totalValue, setTotalValue] = React.useState("")

  return (
    <section className="my-12 grid rounded-xl border  p-4 dark:border-gray-800 dark:bg-gray-950 sm:p-6">
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
            className="w-full justify-between"
          >
            Kereséshez kattintson ide...
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="-mt-11 w-full p-0 sm:w-[450px] md:min-w-max">
          <Command className="max-h-56 w-fit md:max-h-[420px] md:w-[744px]">
            <CommandInput placeholder="Gépeljesen a kereséshez..." />
            <CommandEmpty>Nincs találat</CommandEmpty>
            <CommandGroup className="overflow-y-scroll">
              {mdata.map((group: any) =>
                group.items.map((item: string) => (
                  <CommandItem
                    key={item}
                    value={item}
                    className="min-h-full w-full"
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setTotalValue(group.label)
                      setOpen(false)
                    }}
                  >
                    {item}
                  </CommandItem>
                ))
              )}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {totalValue ? (
        <div className="mt-6 grid rounded-xl border bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900 ">
          <p className="my-3 text-lg font-bold first-letter:uppercase">
            {value}
          </p>
          <p className="my-3 flex items-center justify-between text-lg font-bold">
            Jótállás: {totalValue}{" "}
          </p>
        </div>
      ) : null}
    </section>
  )
}
