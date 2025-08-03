"use client"

import { useState } from "react"
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
    message: "Name too short",
  }),
  email: z.string().email({
    message: "Invalid email",
  }),
  phonenumber: z.string().min(6, {
    message: "Phone number too short",
  }),
  when: z.enum(["now", "morning", "afternoon", "evening"], {
    errorMap: (issue, ctx) => ({ message: "Please select a timeslot!" }),
  }),
  business: z.enum(
    [
      "contract",
      "consultancy-to-sell",
      "consultancy-to-buy",
      "other",
      "szavatossagi-tanacsadas",
      "ajandekozasi-szerzodes",
      "hasznalati-megosztai-szerzodes",
      "ugyleti-meghatalmazas",
    ],
    {
      errorMap: (issue, ctx) => ({ message: "Please select" }),
    }
  ),
  formid: z.string().optional(),
  path: z.string().optional(),
})

export default function ContactFormEnglish({
  noHelpCards = false,
}: {
  noHelpCards?: boolean
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
        title: "Message sent successfully! We will contact you soon.",
        variant: "success",
      })
    } catch (e) {
      console.log("err", e)
      toast({
        title:
          "An error occurred while sending the message. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid rounded-xl border bg-white/60 p-4 dark:border-gray-800 dark:bg-gray-950/40 sm:p-6 lg:p-8">
      <h2
        className="mb-4 text-3xl font-semibold text-gray-800 dark:text-gray-200"
        id="contact-us"
      >
        Contact Us
      </h2>
      {!noHelpCards && (
        <>
          <p className="mb-8 text-gray-600 dark:text-gray-400">
            We&apos;re here to assist you. Please fill out the form below to get
            in touch with our legal team. We will respond within one business
            day.
          </p>
          <div className="mb-8 grid grid-cols-1 gap-6 text-gray-600 dark:text-gray-400 sm:grid-cols-2">
            <HelpCard
              title="Call Center"
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
                  <Input placeholder="Full Name" {...field} />
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
                  <Input placeholder="Phone number" {...field} type="tel" />
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
                    <SelectTrigger aria-label="Best time to contact you?">
                      {field.value ? (
                        <SelectValue placeholder="Best time to contact you?" />
                      ) : (
                        "Best time to contact you?"
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="now">Immediately</SelectItem>
                      <SelectItem value="morning">Morning</SelectItem>
                      <SelectItem value="afternoon">Afternoon</SelectItem>
                      <SelectItem value="evening">Evening</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
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
                    <SelectTrigger aria-label="How can we help you?">
                      {field.value ? (
                        <SelectValue placeholder="How can we help you?" />
                      ) : (
                        "How can we help you?"
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contract">
                        Sale and purchase contract
                      </SelectItem>
                      <SelectItem value="consultancy-to-sell">
                        Advice for sellers
                      </SelectItem>
                      <SelectItem value="consultancy-to-buy">
                        Advice for buyers of new apartments
                      </SelectItem>
                      <SelectItem value="szavatossagi-tanacsadas">
                        Warranty issues
                      </SelectItem>
                      <SelectItem value="ajandekozasi-szerzodes">
                        Gift agreement
                      </SelectItem>
                      <SelectItem value="hasznalati-megosztai-szerzodes">
                        Co-ownership agreement
                      </SelectItem>
                      <SelectItem value="ugyleti-meghatalmazas">
                        Power of Attorney
                      </SelectItem>
                      <SelectItem value="other">Something else</SelectItem>
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
                Send
              </>
            )}
            {!loading && "Send"}
          </button>
          <div className="mt-3 pt-4 text-center">
            <p className="text-xs text-gray-500">
              By clicking the Send button, you accept the General Terms and
              Conditions and the Privacy Policy. Please note that we record all
              phone calls.
            </p>
          </div>
        </form>
      </Form>
    </div>
  )
}
