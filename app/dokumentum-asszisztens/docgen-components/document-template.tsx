"use client"

import { useCallback, useState } from "react"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns/format"
import { hu } from "date-fns/locale"
import Docxtemplater from "docxtemplater"
import { saveAs } from "file-saver"
import { CalendarIcon } from "lucide-react"
import PizZip from "pizzip"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/app/components/ui/button"
import { Calendar } from "@/app/components/ui/calendar"
import { Card } from "@/app/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import { logEvent } from "@/app/lib/clientFirebaseApps"
import { cn } from "@/app/lib/utils"

import logo from "../../../public/logo.svg"
import { useAuth } from "../context/AuthContext"
import FormFieldInput from "../form-components/form-field-input"
import { formSchema as eloFormSchema } from "./eloszerzodes-formschema"
import { formSchema as vszFormSchema } from "./vsz-formschema"

let PizZipUtils: { getBinaryContent?: any; default?: any } | null = null
if (typeof window !== "undefined") {
  import("pizzip/utils/index.js").then(function (r) {
    PizZipUtils = r
  })
}

export default function DocumentTemplate({
  type = "vsz",
}: {
  type: "vsz" | "elo"
}) {
  const formSchema = type === "vsz" ? vszFormSchema : eloFormSchema
  const longType = type === "vsz" ? "veteli-szandeknyilatkozat" : "eloszerzodes"
  const name = type === "vsz" ? "Vételi szándéknyilatkozat" : "Előszerződés"
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [values, setValues] =
    useState<z.infer<typeof vszFormSchema | typeof eloFormSchema>>()

  const form = useForm<z.infer<typeof vszFormSchema | typeof eloFormSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      BuyerName: "",
      BuyerBirthName: "",
      BuyerBirthPlaceAndDate: "",
      BuyerMothersName: "",
      BuyerAddress: "",
      BuyerPhone: "",
      BuyerEmail: "",
      SellerName: "",
      REAddress: "",
      ReKnowsToplotNR: false,
      REAdditionalProp: false,
      PurchasePrice: undefined,
      REType: undefined,
      REToplotNR: "",
      AdditionalREType: undefined,
      ConclusionDate: undefined,
      PurchasePriceDueDate: undefined,
      WouldGiveBidSecAmount: false,
      BidSecAmount: 0,
      SellerAddress: "",
      SellerPhone: "",
      SellerEmail: "",
      SellerBirthName: "",
      SellerBirthPlaceAndDate: "",
      SellerMothersName: "",

    },
  })
  const { watch, formState } = form

  const watchFields = watch([
    "ReKnowsToplotNR",
    "REAdditionalProp",
    "WouldGiveBidSecAmount",
  ])

  //console.log(formState.errors)

  function loadFile(
    url: string,
    callback: {
      (error: any, content: any): void
      (err: Error, data: string): void
    }
  ) {
    PizZipUtils?.getBinaryContent(url, callback)
  }

  function onSubmit(
    values: z.infer<typeof vszFormSchema | typeof eloFormSchema>
  ) {
    // Do something with the form values.
    setOpen(true)
    setValues(values)

    logEvent("document-assistant-onsubmit", {
      doc: longType,
      email: user?.email,
    })
  }

  const startGen = useCallback(() => {
    try {
      if (values) {
        generateDocument({
          ...values,
          ConclusionDate: format(values.ConclusionDate, "PPP", {
            locale: hu,
          }) as unknown as Date,
          PurchasePriceDueDate: format(values.PurchasePriceDueDate, "PPP", {
            locale: hu,
          }) as unknown as Date,
        })
      }
    } catch (error) {
      console.error(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

  const generateDocument = (
    values: z.infer<typeof vszFormSchema | typeof eloFormSchema>
  ) => {
    logEvent("document-assistant-generate-document", {
      doc: longType,
      email: user?.email,
    })
    //path
    const p = type === "vsz" ? "tm/vsz" : "tm/elo"

    loadFile(p, function (error: Error, content: PizZip.LoadData) {
      if (error) {
        throw error
      }
      const zip = new PizZip(content)
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      })

      doc.render(values)
      const outputName =
        values.BuyerName.toLowerCase().replaceAll(" ", "_") +
        "_" +
        longType +
        ".docx"
      const blob = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      }) //Output the document using Data-URI
      saveAs(blob, outputName)
      form.reset()
      setIsSuccess(true)
    })
  }

  return (
    <>
      <div className="">
        <h2 className="my-4 text-3xl font-bold leading-tight tracking-tight">
          {name} generátor
        </h2>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex flex-row items-center">
              <Image
                src={logo}
                className="mr-2 h-auto w-9 sm:mr-4 sm:w-9"
                alt={"Logó"}
                unoptimized
              />
              {isSuccess
                ? "Köszönjük hogy a dokumentum asszisztensünket használta!"
                : "Kérjük ellenőrizze az adatokat"}
            </DialogTitle>
            <DialogDescription>
              {isSuccess && (
                <span className="my-4 block">
                  A dokumentum letöltése elkezdődött.
                </span>
              )}
              {!isSuccess && (
                <>
                  <span className="my-4 block">
                    Kérjük ellenőrizze, hogy minden adatot helyesen adott meg.
                    <strong> Hetente csak 2 db dokumentumot generálhat</strong>.
                  </span>
                  <span className="mb-4 block">
                    Ha mindent rendben talál, akkor kattintson a Dokumentum
                    elkészítése gombra.
                  </span>
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button onClick={() => setOpen(false)} variant={"outline"}>
              {isSuccess ? "Bezárás" : "Mégsem"}
            </Button>
            {!isSuccess && (
              <Button onClick={() => startGen()} variant={"primary"}>
                Dokumentum elkészítése
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="flex flex-col space-y-1.5 p-4 drop-shadow transition-shadow ease-in-out hover:shadow-md">
            <h3 className="border-l-4 border-teal-500 pl-2 text-lg font-semibold leading-none tracking-tight ">
              Vevő adatai
            </h3>
            <p className="pb-4 text-sm text-muted-foreground">
              Kérjük töltse ki a vevő adatait.
            </p>
            <div className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2">
              <FormField
                control={form.control}
                name="BuyerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Név</FormLabel>
                    <FormControl>
                      <Input placeholder="Név" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormFieldInput
                control={form.control}
                name="BuyerBirthName"
                label="Születési neve"
                placeholder="Születési név"
                description="Kérjük akkor is töltse ki, ha ugyanaz, mint a név."
              />

              <FormFieldInput
                control={form.control}
                name="BuyerBirthPlaceAndDate"
                label="Születési helye és ideje"
                placeholder="Budapest, 1982. 02. 12."
              />

              <FormFieldInput
                control={form.control}
                name="BuyerMothersName"
                label="Édesanyja születési neve"
                placeholder="Kovács Sarolta"
              />

              <FormFieldInput
                control={form.control}
                name="BuyerAddress"
                label="Lakcíme"
                placeholder="1117, Budapest, Bartók Béla u. 12."
              />

              <FormFieldInput
                control={form.control}
                name="BuyerPhone"
                label="Telefonszáma"
                placeholder="+36301234567"
              />
              <FormFieldInput
                control={form.control}
                name="BuyerEmail"
                label="E-mail címe"
                placeholder="vevo@email.hu"
              />
            </div>
          </Card>

          <Card className="flex flex-col space-y-1.5 p-4 drop-shadow transition-shadow ease-in-out hover:shadow-md">
            <h3 className="border-l-4 border-teal-500 pl-2 text-lg font-semibold leading-none tracking-tight ">
              Eladó adatai
            </h3>
            <p className="pb-4 text-sm text-muted-foreground">
              Kérjük töltse ki az eladó adatait.
            </p>
            <div className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2">
              <FormField
                control={form.control}
                name="SellerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Eladó neve</FormLabel>
                    <FormControl>
                      <Input placeholder="Név" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {type === "elo" && (
                <>
                  <FormFieldInput
                    control={form.control}
                    name="SellerBirthName"
                    label="Eladó születési neve"
                    placeholder="Név"
                    description="Kérjük akkor is töltse ki, ha ugyanaz, mint a név."
                  />
                  <FormFieldInput
                    control={form.control}
                    name="SellerBirthPlaceAndDate"
                    label="Születési helye és ideje"
                    placeholder="Budapest, 1963. 04. 16."
                  />
                  <FormFieldInput
                    control={form.control}
                    name="SellerMothersName"
                    label="Édesanyja születési neve"
                    placeholder="Nagy Erzsébet"
                  />
                  <FormFieldInput
                    control={form.control}
                    name="SellerAddress"
                    label="Eladó Lakcíme"
                    placeholder="8000, Székesfehérvár, Petőfi u. 12."
                  />
                  <FormFieldInput
                    control={form.control}
                    name="SellerPhone"
                    label="Telefonszáma"
                    placeholder="+36301234567"
                  />
                  <FormFieldInput
                    control={form.control}
                    name="SellerEmail"
                    label="E-mail címe"
                    placeholder="elado@email.hu"
                  />
                </>
              )}
            </div>
          </Card>

          <Card className="flex flex-col space-y-1.5 p-4 drop-shadow transition-shadow ease-in-out hover:shadow-md">
            <h3 className="border-l-4 border-teal-500 pl-2 text-lg font-semibold leading-none tracking-tight ">
              Ingatlan adatai
            </h3>
            <p className="pb-4 text-sm text-muted-foreground">
              Kérjük adja meg az ingatlan adatait
            </p>
            <div className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2 ">
              <FormField
                control={form.control}
                name="REAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ingatlan címe</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="1223, Budapest, Nyár utca 18"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription></FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="REType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ingatlan megnevezése</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Válassza ki az ingatlan megnevezését" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="lakás">lakás</SelectItem>
                          <SelectItem value="kivett lakóház, udvar">
                            kivett lakóház, udvar
                          </SelectItem>
                          <SelectItem value="egyéb">egyéb</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-1 my-4 grid grid-cols-1 gap-4 rounded-md bg-slate-50 p-2 dark:bg-slate-900 md:col-span-2 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="ReKnowsToplotNR"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Tudja az ingatlan helyrajzi számát?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value: string) =>
                            field.onChange(value === "yes" ? true : false)
                          }
                          defaultValue={field.value === true ? "yes" : "no"}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="no" />
                            </FormControl>
                            <FormLabel className="font-normal">Nem</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="yes" />
                            </FormControl>
                            <FormLabel className="font-normal">Igen</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {watchFields[0] === true && (
                  <FormField
                    control={form.control}
                    name="REToplotNR"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Helyrajzi szám</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Budapest VI.kerület, belterület 34023/21"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                        <FormDescription>
                          Város, belterület szám
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <div className="col-span-1 my-4 grid grid-cols-1 gap-4 rounded-md bg-slate-50 p-2 dark:bg-slate-900 md:col-span-2 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="REAdditionalProp"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>
                        Tartozik az ingatlanhoz garázs, tároló, vagy kertrész?
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value: string) =>
                            field.onChange(value === "yes" ? true : false)
                          }
                          defaultValue={field.value === true ? "yes" : "no"}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="no" />
                            </FormControl>
                            <FormLabel className="font-normal">Nem</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="yes" />
                            </FormControl>
                            <FormLabel className="font-normal">Igen</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        Csak akkor válasszon igent, ha ezeknek az ellenértékét a
                        vételár tartalmazza.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                {watchFields[1] === true && (
                  <FormField
                    control={form.control}
                    name="AdditionalREType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ennek megnevezése</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl className="bg-background">
                              <SelectTrigger>
                                <SelectValue placeholder="Válasszon" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="garázs">garázs</SelectItem>
                              <SelectItem value="tároló">tároló</SelectItem>
                              <SelectItem value="kertrész">kertrész</SelectItem>
                              <SelectItem value="egyéb ingatlanrész">
                                egyéb ingatlanrész
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>
          </Card>
          <Card className="flex flex-col space-y-1.5 p-4 drop-shadow transition-shadow ease-in-out hover:shadow-md">
            <h3 className="border-l-4 border-teal-500 pl-2 text-lg font-semibold leading-none tracking-tight ">
              Szerződés adatai
            </h3>
            <p className="pb-4 text-sm text-muted-foreground">
              Kérjük töltse ki a szerződés adatait.
            </p>
            <div className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2 ">
              <FormField
                control={form.control}
                name="ConclusionDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-y-1">
                    <FormLabel className="mt-1.5">
                      Legkésőbb meddig kötnének szerződést?
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl className="">
                          <Button
                            variant={"outline"}
                            size={"lg"}
                            className={cn(
                              "h-12 w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: hu })
                            ) : (
                              <span>Válasszon egy dátumot</span>
                            )}
                            <CalendarIcon className="ml-auto size-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          locale={hu}
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="PurchasePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Mennyi lenne az ingatlan vételára? (forintban)
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex flex-row items-center">
                        <Input
                          placeholder={"10000000"}
                          {...field}
                          type="number"
                          className="pr-5"
                        />
                        <span className="absolute right-0 mr-1 mt-0 flex flex-row items-center rounded-md bg-muted p-2 text-sm">
                          ,- Ft
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                    <FormDescription>Pl. 56000000</FormDescription>
                  </FormItem>
                )}
              />
              {type === "elo" && (
                <div className="col-span-1 my-4 grid grid-cols-1 gap-4 rounded-md bg-slate-50 p-2 dark:bg-slate-900 md:col-span-2 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="WouldGiveBidSecAmount"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Adna foglalót?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value: string) =>
                              field.onChange(value === "yes" ? true : false)
                            }
                            defaultValue={field.value === true ? "yes" : "no"}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="no" />
                              </FormControl>
                              <FormLabel className="font-normal">Nem</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="yes" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Igen
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {watchFields[2] === true && (
                    <FormField
                      control={form.control}
                      name="BidSecAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Foglaló összege (forintban)</FormLabel>
                          <FormControl>
                            <div className="relative flex flex-row items-center">
                              <Input
                                placeholder={"1000000"}
                                {...field}
                                className="pr-5"
                              />
                              <span className="absolute right-0 mr-1 mt-0 flex flex-row items-center rounded-md bg-muted p-2 text-sm">
                                ,- Ft
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                          <FormDescription>Pl. 2000000</FormDescription>
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              )}

              <FormField
                control={form.control}
                name="PurchasePriceDueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-y-1">
                    <FormLabel className="mt-1.5">
                      Vételár teljesítésének dátuma
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl className="">
                          <Button
                            variant={"outline"}
                            size={"lg"}
                            className={cn(
                              "h-12 w-full bg-background pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: hu })
                            ) : (
                              <span>Válasszon egy dátumot</span>
                            )}
                            <CalendarIcon className="ml-auto size-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          locale={hu}
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
          <Button
            type="submit"
            size={"lg"}
            className="w-full md:w-fit"
            variant={"primary"}
            //disabled={Object.keys(formState.errors).length > 0}
          >
            {name} elkészítése
          </Button>
        </form>
      </Form>
    </>
  )
}
