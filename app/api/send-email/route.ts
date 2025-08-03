import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { Resend } from "resend"

import {
  EmailTemplate,
  EmailTemplateLawyer,
} from "@/email-templates/contanct-form-template"

const resend = new Resend(process.env.RESEND_KEY)

const fromEmail = "e-ingatlanügyvédek.hu weboldal <info@e-ingatlanugyvedek.hu>"
const toEmails = ["artanis99+eingatlan@gmail.com", "judit.szabo@igm.jogasz.hu"]

export async function POST(request: Request) {
  const headersList = await headers()

  const referer = headersList.get("referer") //TODO: remove localhost on PROD
  if (
    !referer?.includes(process.env.APP_URL as string) &&
    !referer?.includes("https://cc-blog-sooty.vercel.app")
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const formData = await request.json()

  try {
    let data = {}
    if (formData.formid === "contact-form") {
      data = await resend.emails.send({
        from: fromEmail,
        to: toEmails,
        subject: "Általános kapcsolatfelvétel: " + formData.name,
        react: EmailTemplate(formData),
      })
    }
    if (formData.formid === "lawyer-contact-form") {
      data = await resend.emails.send({
        from: fromEmail,
        to: toEmails,
        subject: "Ügyvédi kapcsolatfelvétel: " + formData.name,
        react: EmailTemplateLawyer(formData),
      })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error })
  }
}
