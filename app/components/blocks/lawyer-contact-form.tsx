"use client"

import { useState } from "react"
import Link from "next/link"
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

import { Icons } from "../icons"
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
  guild: z.string().min(2, {
    message: "Kamara neve túl rövid",
  }),
  formid: z.string().optional(),
})

export default function LawyerContactForm() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const defaultValues = {
    name: "",
    email: "",
    phonenumber: "",
    guild: "",
    formid: "lawyer-contact-form",
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })
  const EMAIL_URL =
    process.env.NEXT_PUBLIC_EMAIL_FUNCTION_URL ?? "/api/send-email"

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
        title: "Üzenet elküldve, hamarosan visszahívjuk!",
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
    <div className="grid rounded-xl border bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950 sm:p-6 lg:p-8">
      <h3 className="mb-8 text-xl font-semibold text-gray-800 dark:text-gray-200">
        Ha többet szeretne megtudni a társulási feltételekről, adja meg az
        elérhetőségeit és megkeressük Önt!
      </h3>

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
            name="guild"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Nyilvántartó kamara" {...field} />
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
              A Küldés gombra kattintva elfogadja az{" "}
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
