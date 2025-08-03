"use client"

import * as React from "react"
import { useCopyToClipboard } from "@uidotdev/usehooks"
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
import { mdata } from "@/app/lib/bank-account-data"
import { cn } from "@/app/lib/utils"
import { Block } from "@/app/types/pages"

import { Icons } from "../icons"
import { useToast } from "../ui/use-toast"

export default function RegionBankPicker({ data }: { data: Block }) {
  const [copiedText, copyToClipboard] = useCopyToClipboard()
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [copied, setCopied] = React.useState(false)
  const { toast } = useToast()
  const [totalValue, setTotalValue] = React.useState<any>()

  React.useEffect(() => {
    if (copied) {
      toast({
        title: "Vágólapra másolva...",
        variant: "success",
      })
      setCopied(false)
    }
  }, [copied, toast])

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
            {value
              ? mdata.find((framework: any) => framework.value === value)?.label
              : "Válasszon vármegyét..."}
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command className="max-h-56 w-full min-w-full md:max-h-[300px] md:w-[700px]">
            <CommandInput placeholder="Kormányhivatal keresése..." />
            <CommandEmpty>Nincs találat</CommandEmpty>
            <CommandGroup className="overflow-y-scroll">
              {mdata.map((framework: any) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  className="h-10"
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setTotalValue(framework)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {totalValue ? (
        <div className="mt-6 grid rounded-xl border bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900 ">
          <p className="my-3 text-lg font-bold">{totalValue.label}</p>
          <p className="my-3 flex items-center justify-between">
            Bankszámlaszám: {totalValue.account}{" "}
            <Button
              size={"icon"}
              className="ml-3 aspect-square bg-teal-500"
              aria-label="Másolás"
              onClick={() => {
                copyToClipboard(totalValue.account)
                setCopied(true)
              }}
            >
              <Icons.copy size={16} />
            </Button>
          </p>
        </div>
      ) : null}
    </section>
  )
}
