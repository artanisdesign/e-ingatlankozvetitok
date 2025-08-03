"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"

import { Icons } from "../icons"
import { HelpCard } from "../ui/help-card"
import { Input } from "../ui/input"
import { useToast } from "../ui/use-toast"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Név túl rövid",
  }),
  email: z.string().email({
    message: "Hibás email cím",
  }),
  phonenumber: z.string().min(6, {
    message: "Telefonszám túl rövid",
  }),
  when: z.enum(["now", "morning", "afternoon", "evening"], {
    errorMap: (issue, ctx) => ({ message: "Kérjük válasszon időpontot!" }),
  }),
  /* business: z.enum(
    ["contract", "consultancy-to-sell", "consultancy-to-buy", "other"],
    {
      errorMap: (issue, ctx) => ({ message: "Kérjük válasszon ügytípust!" }),
    }
  ),*/
  city: z.enum(
    [
      "budapest",
      "kaposvar",
      "pecs",
      "szeged",
      "other",
      "video",
      "budapest-ii",
      "budapest-iii",
      "budapest-xi",
      "budapest-xii",
      "budapest-xiii",
      "eger",
      "vecses",
      "gyor",
      "kecskemet",
      "budapest-iv",
      "budapest-vii",
      "budapest-x",
      "budapest-xiv",
      "budapest-v",
      "szigetszentmiklos",
    ],
    {
      errorMap: (issue, ctx) => ({ message: "Kérjük válasszon várost!" }),
    }
  ),
  formid: z.string().optional(),
  path: z.string().optional(),
})

export default function ContactForm({
  noHelpCards = false,
  title = "Kapcsolatfelvétel",
  noCities = true,
}: {
  noHelpCards?: boolean
  title?: string
  noCities?: boolean
}) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()

  const defaultValues = {
    name: "",
    email: "",
    phonenumber: "",
    when: undefined,
    business: undefined,
    city: undefined,
    formid: "contact-form",
    path: pathname,
  }

  let mergedSchema = formSchema
  if (noCities) {
    mergedSchema = formSchema.setKey(
      "city",
      z.enum([""]).default("").optional()
    )
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(mergedSchema),
    defaultValues,
  })

  const EMAIL_URL =
    process.env.NEXT_PUBLIC_EMAIL_FUNCTION_URL ??
    "http://localhost:8788/api/send-email"

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      const res = await fetch(EMAIL_URL, {
        method: "POST",
        body: JSON.stringify(values),
      })
      await res.json()
      form.reset(defaultValues)
      toast({
        title: "Üzenet elküldve, hamarosan keressük Önt!",
        variant: "success",
      })
    } catch (e) {
      console.log("err", e)
      toast({
        title:
          "Hiba történt, kérjük próbálja újra később vagy érdeklődjön telefonon!",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mb-8 grid rounded-xl border bg-white/60 p-4 dark:border-teal-800 dark:bg-teal-950/40 sm:p-6 lg:p-8">
      <h2
        className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200"
        id="kapcsolatfelvetel"
      >
        {title}
      </h2>
      {!noHelpCards && (
        <>
          <p className="mb-8 text-gray-600 dark:text-gray-400">
            Hívjon minket az alábbi számon vagy töltse ki a lenti űrlapot és
            hamarosan keressük Önt!
          </p>
          <div className="mb-8 grid grid-cols-1 gap-6 text-gray-600 dark:text-gray-400 sm:grid-cols-2">
            <HelpCard
              title="Ügyfélszolgálat"
              subtitle="Telefon: +36 70 719 1347"
              icon={
                <Icons.phone className="mt-1.5 size-6 shrink-0 text-gray-800 dark:text-gray-200" />
              }
              link="tel:+36707191347"
              basicLink
            />
            <HelpCard
              title="Email"
              subtitle="info@e-ingatlanugyvedek.hu"
              icon={
                <Icons.mail className="mt-1.5 size-6 shrink-0 text-gray-800 dark:text-gray-200" />
              }
              link="mailto:info@e-ingatlanugyvedek.hu?subject=Érdeklődés"
              basicLink
            />
          </div>
        </>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Teljes név" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phonenumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Telefonszám" {...field} type="tel" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="when"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <SelectTrigger aria-label="Mikor alkalmas Önnek?">
                      {field.value ? (
                        <SelectValue placeholder="Mikor alkalmas Önnek?" />
                      ) : (
                        "Mikor alkalmas Önnek?"
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="now">Azonnal</SelectItem>
                      <SelectItem value="morning">Reggel</SelectItem>
                      <SelectItem value="afternoon">Délután</SelectItem>
                      <SelectItem value="evening">Este</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="business"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <SelectTrigger aria-label="Miben segíthetünk?">
                      {field.value ? (
                        <SelectValue placeholder="Miben segíthetünk?" />
                      ) : (
                        "Miben segíthetünk?"
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contract">
                        Adásvételi szerződés
                      </SelectItem>
                      <SelectItem value="consultancy-to-sell">
                        Tanácsadás eladóknak
                      </SelectItem>
                      <SelectItem value="consultancy-to-buy">
                        Tanácsadás új építésű lakás vásárlásához
                      </SelectItem>
                      <SelectItem value="szavatossagi-tanacsadas">
                        Szavatossági tanácsadás
                      </SelectItem>
                      <SelectItem value="ajandekozasi-szerzodes">
                        Ajándékozási szerződés
                      </SelectItem>
                      <SelectItem value="hasznalati-megosztai-szerzodes">
                        Használati megosztási szerződés
                      </SelectItem>
                      <SelectItem value="ugyleti-meghatalmazas">
                        Ügyleti meghatalmazás
                      </SelectItem>
                      <SelectItem value="other">Egyedi ajánlat</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />*/}
          {!noCities && (
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <SelectTrigger aria-label="Melyik városban keres ügyvédet?">
                        {field.value ? (
                          <SelectValue placeholder="Melyik városban keres ügyvédet?" />
                        ) : (
                          "Melyik városban keres ügyvédet?"
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="budapest">Budapest</SelectItem>
                        <SelectItem value="budapest-ii">
                          Budapest II. kerület
                        </SelectItem>
                        <SelectItem value="budapest-iii">
                          Budapest III. kerület
                        </SelectItem>
                        <SelectItem value="budapest-iv">
                          Budapest IV. kerület
                        </SelectItem>
                        <SelectItem value="budapest-v">
                          Budapest V. kerület
                        </SelectItem>
                        <SelectItem value="budapest-vii">
                          Budapest VII. kerület
                        </SelectItem>
                        <SelectItem value="budapest-x">
                          Budapest X. kerület
                        </SelectItem>
                        <SelectItem value="budapest-xi">
                          Budapest XI. kerület
                        </SelectItem>
                        <SelectItem value="budapest-xii">
                          Budapest XII. kerület
                        </SelectItem>
                        <SelectItem value="budapest-xiii">
                          Budapest XIII. kerület
                        </SelectItem>
                        <SelectItem value="budapest-xiv">
                          Budapest XIV. kerület
                        </SelectItem>
                        <SelectItem value="eger">Eger</SelectItem>
                        <SelectItem value="gyor">Győr</SelectItem>
                        <SelectItem value="kaposvar">Kaposvár</SelectItem>
                        <SelectItem value="kecskemet">Kecskemét</SelectItem>
                        <SelectItem value="pecs">Pécs</SelectItem>
                        <SelectItem value="szeged">Szeged</SelectItem>
                        <SelectItem value="szigetszentmiklos">
                          Szigetszentmiklós
                        </SelectItem>
                        <SelectItem value="vecses">Vecsés</SelectItem>
                        <SelectItem value="other">Más városban</SelectItem>
                        <SelectItem value="video">
                          Videó ügyvéd (Skype, Teams, Google Meet)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-x-3 rounded-md border border-transparent bg-teal-600 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 focus:ring-offset-white disabled:pointer-events-none disabled:opacity-50 dark:focus:ring-offset-gray-800 lg:text-base"
          >
            {loading && (
              <>
                <Icons.spinner className="mr-2 size-4 animate-spin" />
                Küldés
              </>
            )}
            {!loading && "Küldés"}
          </button>
          <div className="mt-3 pt-4 text-center">
            <p className="text-xs text-gray-500">
              Felhívjuk a figyelmét, hogy minden telefonhívást rögzítünk. A
              Küldés gombra kattintva elfogadja az{" "}
              <Link href={"/aszf"} className="underline">
                Általános Szerződési Feltételeket
              </Link>{" "}
              valamint az{" "}
              <Link href={"/adatvedelem-cookiek"} className="underline">
                Adatvédelmi tájékoztatót
              </Link>
              .
            </p>
          </div>
        </form>
      </Form>
    </div>
  )
}
