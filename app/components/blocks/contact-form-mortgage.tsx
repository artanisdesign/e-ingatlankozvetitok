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
  what: z.enum(
    [
      "piaci-hitel",
      "allamilag-tamogatott-hitel",
      "hitelkivaltas",
      "tanacsadas",
    ],
    {
      errorMap: (issue, ctx) => ({ message: "Kérjük válasszon hiteltípust!" }),
    }
  ),

  formid: z.string().optional(),
  path: z.string().optional(),
})

export default function ContactFormMortgage({
  noHelpCards = false,
  title = "Kapcsolatfelvétel hitelközvetítővel",
}: {
  noHelpCards?: boolean
  title?: string
}) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()

  const defaultValues = {
    name: "",
    email: "",
    phonenumber: "",
    what: undefined,
    formid: "contact-form-mortgage",
    path: pathname,
  }

  let mergedSchema = formSchema
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
              link="mailto:info@e-ingatlanugyvedek.hu?subject=Érdeklődés hitelközvetítéssel kapcsolatban"
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
            name="what"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <SelectTrigger aria-label="Milyen hitel érdekli Önt?">
                      {field.value ? (
                        <SelectValue placeholder="Milyen hitel érdekli Önt?" />
                      ) : (
                        "Milyen hitel érdekli Önt?"
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="piaci-hitel">Piaci hitel</SelectItem>
                      <SelectItem value="allamilag-tamogatott-hitel">
                        Állami támogatott hitel
                      </SelectItem>
                      <SelectItem value="hitelkivaltas">
                        Hitelkiváltás
                      </SelectItem>
                      <SelectItem value="tanacsadas">Tanácsadás</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
              <strong>
                Az adatmegadás nem jár kötelezettséggel, és csak az Illés és
                Szabó Ügyvédi Társulás hitelközvetítő partnerével történő
                kapcsolatfelvétel célját szolgálja. Az adatait a HitelesAndrás
                Kft. részére továbbítjuk, de mi is kezeljük.{" "}
              </strong>
              A Küldés gombra kattintva elfogadja az általunk alkalmazott{" "}
              <Link href={"/aszf"} className="underline">
                Általános Szerződési Feltételeket
              </Link>{" "}
              valamint az{" "}
              <Link href={"/adatvedelem-cookiek"} className="underline">
                Adatvédelmi tájékoztatót
              </Link>
              . A HitelesAndrás Kft.{" "}
              <Link
                href={"https://hitelesandras.hu/adatvedelmi-szabalyzat/"}
                className="underline"
                target="_blank"
              >
                Adatkezelési Tájékoztatóját itt
              </Link>{" "}
              találja.
            </p>
          </div>
        </form>
      </Form>
    </div>
  )
}
