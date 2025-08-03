import { Resend } from "resend"

interface Env {
  RESEND_KEY: string
  APP_URL: string
}
const allowedOrigins = [
  "https://e-ingatlanugyvedek.hu",
  "https://szerzodes-asszisztens.hu",
  "https://dev.szerzodes-asszisztens.hu",
]

function getCorsHeaders(origin: string | null): Headers {
  const headers = new Headers({
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    "content-type": "application/json;charset=UTF-8",
  })

  if (origin && allowedOrigins.includes(origin)) {
    headers.set("Access-Control-Allow-Origin", origin)
  }

  return headers
}

const fromEmail = "e-ingatlanügyvédek.hu weboldal <info@e-ingatlanugyvedek.hu>"
const toEmails = ["artanis99+eingatlan@gmail.com", "judit.szabo@igm.jogasz.hu"]

const fromEmailToSender = "e-ingatlanügyvédek.hu<info@e-ingatlanugyvedek.hu>"

const thankyouHtml = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html dir="ltr" lang="en"><head><link rel="preload" as="image" href="https://e-ingatlanugyvedek.hu/logo_96.png"/><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"/><meta name="x-apple-disable-message-reformatting"/><!--$--></head><div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">e-ingatlanügyvédek.hu: Köszönjük a megkeresést!<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div></div><body style="background-color:rgb(255,255,255);font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;;font-size:1rem;line-height:1.5rem"><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;background-color:rgb(255,255,255);padding:1rem"><tbody><tr style="width:100%"><td><img height="44" src="https://e-ingatlanugyvedek.hu/logo_96.png" style="display:block;outline:none;border:none;text-decoration:none;margin-bottom:-1rem" width="44"/><h1 style="margin-top:2rem;margin-bottom:0px;line-height:2rem">Köszönjük a megkeresést!</h1><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"><tbody><tr><td><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"><tbody style="width:100%"><tr style="width:100%"><p style="font-size:1rem;line-height:1.5rem;margin:16px 0">Kedves <strong>[[name]]</strong>!</p><p style="font-size:1rem;line-height:1.5rem;margin:16px 0">Hálásak vagyunk, hogy az<!-- --> <strong>e-ingatlanügyvédek.hu</strong> csapatát választotta. Hamarosan felvesszük Önnel a kapcsolatot.</p><p style="font-size:1rem;line-height:1.5rem;margin:16px 0">Üdvözlettel, <br/><strong>Illés és Szabó Ügyvédi Társulás</strong></p></tr></tbody></table></td></tr></tbody></table><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"><tbody><tr><td><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"><tbody style="width:100%"><tr style="width:100%"><p style="font-size:0.75rem;line-height:1rem;margin:16px 0">Dear <strong>[[name]]</strong>!</p><p style="font-size:0.75rem;line-height:1rem;margin:16px 0">Thank you for choosing the<!-- --> <strong>e-ingatlanügyvédek.hu</strong> team. We’ve received your message and will be in touch with you soon to assist with your real estate legal needs.</p><p style="font-size:0.75rem;line-height:1rem;margin:16px 0">Best regards, <br/><strong> Illés and Szabó Lawyers’ Association</strong></p></tr></tbody></table></td></tr></tbody></table><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="background:rgb(245, 244, 245);border-radius:8px;margin-bottom:0px;margin-top:30px;padding:10px"><tbody><tr><td><p style="font-size:0.75rem;line-height:1rem;margin:16px 0">Üzenet/Message:</p><style>
        meta ~ .cino {
          display: none !important;
          opacity: 0 !important;
        }

        meta ~ .cio {
          display: block !important;
        }
      </style><code class=" cino" style="font-size:0.75rem;line-height:1rem">Név/Name: <!-- -->[[name]]<br/>Email: <!-- -->[[email]]<br/>Telefonszám/Phone no.: <!-- -->[[phone]]</code><span class=" cio" style="display:none;font-size:0.75rem;line-height:1rem">Név/Name: <!-- -->[[name]]<br/>Email: <!-- -->[[email]]<br/>Telefonszám/Phone no.: <!-- -->[[phone]]</span></td></tr></tbody></table></td></tr></tbody></table><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;margin-top:0px;padding:1rem"><tbody><tr style="width:100%"><td><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"><tbody><tr><td><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"><tbody style="width:100%"><tr style="width:100%"><td data-id="__react-email-column" style="font-size:0.875rem;line-height:1.25rem"><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:0.25rem;padding-bottom:0.25rem"><tbody style="width:100%"><tr style="width:100%"><a href="https://e-ingatlanugyvedek.hu/szolgaltatasok" style="color:#067df7;text-decoration:none" target="_blank">Szolgáltatások</a></tr></tbody></table><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:0.25rem;padding-bottom:0.25rem"><tbody style="width:100%"><tr style="width:100%"><a href="https://e-ingatlanugyvedek.hu/dijszabas" style="color:#067df7;text-decoration:none" target="_blank">Díjszabás</a></tr></tbody></table><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:0.25rem;padding-bottom:0.25rem"><tbody style="width:100%"><tr style="width:100%"><a href="https://e-ingatlanugyvedek.hu/blog" style="color:#067df7;text-decoration:none" target="_blank">IngatlanBlog</a></tr></tbody></table></td><td data-id="__react-email-column" style="font-size:0.875rem;line-height:1.25rem"><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:0.25rem;padding-bottom:0.25rem"><tbody style="width:100%"><tr style="width:100%"><a href="https://e-ingatlanugyvedek.hu/aszf" style="color:#067df7;text-decoration:none" target="_blank">ÁSZF</a> </tr></tbody></table><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:0.25rem;padding-bottom:0.25rem"><tbody style="width:100%"><tr style="width:100%"><a href="https://e-ingatlanugyvedek.hu/kapcsolat" style="color:#067df7;text-decoration:none" target="_blank">Kapcsolat</a> </tr></tbody></table><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:0.25rem;padding-bottom:0.25rem"><tbody style="width:100%"><tr style="width:100%"><a href="https://e-ingatlanugyvedek.hu/english" style="color:#067df7;text-decoration:none" target="_blank">English</a> </tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><hr style="width:100%;border:none;border-top:1px solid #eaeaea"/><p style="font-size:0.75rem;line-height:1rem;margin:16px 0;font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;;font-weight:600">e-ingatlanügyvédek.hu</p><p style="font-size:0.75rem;line-height:1rem;margin:16px 0;margin-bottom:45px;color:rgb(156,163,175)">Telefon / Phone no.:<!-- --> <a href="tel:+36707191347" style="color:#067df7;text-decoration:none" target="_blank">+36 70 719 1347</a></p><p style="font-size:0.75rem;line-height:1rem;margin:16px 0;margin-bottom:45px;color:rgb(156,163,175)">1024, Budapest, Lövőház utca 2-6.</p></td></tr></tbody></table><!--/$--></body></html>
`

const templateHtml = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><!--$--><div><h2>Általános kapcsolatfelvétel</h2><h2>Név: <!-- -->[[name]]</h2><h2>Email: <!-- -->[[email]]</h2><h2>Telefonszám: <!-- -->[[phone]]</h2><h2>Mikor: <!-- -->[[when]]</h2><h2>Ügytípus: [[business]]</h2><h2>Város: <!-- -->[[city]]</h2><h4>Oldal: <!-- -->[[path]]</h4></div><!--/$-->
`

const templateLawyer = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><!--$--><div><h2>Ügyvédi kapcsolatfelvétel</h2><h2>Név: <!-- -->[[name]]</h2><h2>Email: <!-- -->[[email]]</h2><h2>Telefonszám: <!-- -->[[phonenumber]]</h2><h2>Kamara/kasz: <!-- -->[[guild]]</h2></div><!--/$-->
`

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context

  const resend = new Resend(env.RESEND_KEY)

  const origin = request.headers.get("Origin")

  const headers = getCorsHeaders(origin)

  if (!origin || !allowedOrigins.includes(origin)) {
    return new Response("Origin not allowed", { status: 403 })
  }

  let formData = (await context.request.json()) as any

  try {
    let data = {}

    if (formData.formid === "contact-form") {
      data = await resend.emails.send({
        from: fromEmail,
        to: toEmails,
        subject: "Általános kapcsolatfelvétel: " + formData.name,
        html: templateHtml
          .replaceAll("[[name]]", formData.name)
          .replaceAll("[[email]]", formData.email)
          .replaceAll("[[phone]]", formData.phonenumber)
          .replaceAll("[[when]]", formData.when)
          .replaceAll("[[business]]", formData.business)
          .replaceAll("[[city]]", formData.city)
          .replaceAll("[[path]]", formData.path),
      })

      try {
        //this is prod now
        await fetch("https://sendlead-k3mizzwdpq-oa.a.run.app", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            apikey: "zGf7KC4KpXe9Ps39oqqIdUZvWeUEIQ93",
            "Content-Type": "application/json",
          },
        })
      } catch (error) {
        console.error(error)
      }
    }

    if (formData.formid === "contact-form-real-estate") {
      data = await resend.emails.send({
        from: fromEmail,
        to: toEmails,
        subject: "Kapcsolatfelvétel ingatlanközvetítővel: " + formData.name,
        html: templateHtml
          .replaceAll("[[name]]", formData.name)
          .replaceAll("[[email]]", formData.email)
          .replaceAll("[[phone]]", formData.phonenumber)
          .replaceAll("[[when]]", formData.where)
          .replaceAll("[[path]]", formData.path),
      })
    }

    if (formData.formid === "contact-form-mortgage") {
      data = await resend.emails.send({
        from: fromEmail,
        to: toEmails,
        subject: "Hitelközvetítő kapcsolatfelvétel: " + formData.name,
        html: templateHtml
          .replaceAll("[[name]]", formData.name)
          .replaceAll("[[email]]", formData.email)
          .replaceAll("[[phone]]", formData.phonenumber)
          .replaceAll("[[when]]", formData.what)
          .replaceAll("[[path]]", formData.path),
      })

      try {
        //sending to hitelesandras
        const form = new FormData()

        form.append("nl_id", "105947")
        form.append("ns_id", "316770")
        form.append("mssys_formver", "1748596010")
        form.append("mssys_submit_params", Date.now().toString())
        form.append("mssys_lastname", formData.name.split(" ")[0] ?? "")
        form.append("address_1587110382", "")
        form.append("mssys_firstname", formData.name.split(" ")[1] ?? "")
        form.append("email", formData.email)
        form.append("email2", formData.email)

        form.append("mssys_mobile", formData.phonenumber)
        form.append("mssys_int_mobile", "")
        form.append("mssys_int_mobile_numpart", "")
        form.append("megjegyzes", formData.what)
        form.append("local-time-zone", "Europe/Budapest")

       const result =  await fetch(
          "https://form.salesautopilot.com/t/sub/regisztraciosurlapvalasterapia",
          {
            method: "POST",
            body: form,
            headers: {
              Referer: "https://salesautopilot.s3.amazonaws.com/"
            },
          }
        )
        //get the response text 
        const responseText = await result.text()
        //console.log("Response from hitelesandras:", responseText)
        console.log("Form sent to hitelesandras")
      } catch (error) {
        console.error(error)
      }
    }

    if (formData.formid === "lawyer-contact-form") {
      data = await resend.emails.send({
        from: fromEmail,
        to: toEmails,
        subject: "Ügyvédi kapcsolatfelvétel: " + formData.name,
        html: templateLawyer
          .replaceAll("[[name]]", formData.name)
          .replaceAll("[[email]]", formData.email)
          .replaceAll("[[phonenumber]]", formData.phonenumber)
          .replaceAll("[[guild]]", formData.guild),
      })
    }

    if (formData.formid === "szerzodes-asszisztens-ugyvedek") {
      data = await resend.emails.send({
        from: fromEmail,
        to: toEmails,
        subject: "Szerződés Asszisztens: " + formData.name,
        html: templateLawyer
          .replaceAll("[[name]]", formData.name)
          .replaceAll("[[email]]", formData.email)
          .replaceAll("[[phonenumber]]", formData.phonenumber)
          .replaceAll("[[guild]]", formData.kasz),
      })
      return new Response(
        JSON.stringify({
          message: "sent",
        }),
        {
          status: 200,
          headers,
        }
      )
    }

    try {
      data = await resend.emails.send({
        from: fromEmailToSender,
        to: formData.email,
        subject: "Köszönjük a megkeresést!",
        html: thankyouHtml
          .replaceAll("[[name]]", formData.name)
          .replaceAll("[[email]]", formData.email)
          .replaceAll("[[phone]]", formData.phonenumber),
        text: "Köszönjük a megkeresést! Hamarosan válaszolunk.",
      })
    } catch (error) {
      console.error(error)
    }

    return new Response(
      JSON.stringify({
        message: "sent",
      }),
      {
        status: 200,
        headers,
      }
    )
  } catch (error) {
    return new Response("Error sending message", { status: 500, headers })
  }
}

// Respond to OPTIONS method
export const onRequestOptions: PagesFunction = async ({ request }) => {
  const origin = request.headers.get("Origin")
  const headers = getCorsHeaders(origin)

  return new Response(null, {
    status: 204,
    headers,
  })
}
