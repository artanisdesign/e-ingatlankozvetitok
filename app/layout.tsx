/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import "@/styles/globals.css"
import { Metadata } from "next"
import { LocalBusinessJsonLd, LogoJsonLd } from "next-seo"
import NextTopLoader from "nextjs-toploader"

import { siteConfig } from "@/config/site"
import Footer from "@/app/components/footer"
import SiteHeader from "@/app/components/site-header"
import { TailwindIndicator } from "@/app/components/tailwind-indicator"
import { ThemeProvider } from "@/app/components/theme-provider"
import { Toaster } from "@/app/components/ui/toaster"
import { getGlobals } from "@/app/lib/api"
import { fontSans } from "@/app/lib/fonts"
import { cn } from "@/app/lib/utils"

import GoogleAnalytics from "./components/GoogleAnalytics"
import CookieBanner from "./components/cookie-banner"
import { Icons } from "./components/icons"
import BgSvg from "./components/ui/bg-svg"

const notOnVercel = process.env.ON_VERCEL !== "true"

export async function generateViewport({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  return {
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "#ffffff" },
      { media: "(prefers-color-scheme: dark)", color: "#000000" },
    ],
  }
}

function Loading() {
  return (
    <Icons.spinner className="size-4 animate-spin place-self-center self-center text-teal-600" />
  )
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const meta = await getGlobals()

  return {
    title: {
      default: meta.siteTitle ?? siteConfig.siteTitle,
      template: `%s`,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: "/",
    },
    publisher: siteConfig.name,
    description: meta.siteDescription ?? siteConfig.description,
    icons: {
      icon: {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
      shortcut: "/logo_96.png",
      apple: "/apple-touch-icon.png",
      other: [
        { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#0d9488" },
        {
          rel: "icon",
          url: "/logo.svg",
          type: "image/svg+xml",
        },
        { rel: "icon", url: "/favicon-16x16.png", sizes: "16x16" },
        { rel: "icon", url: "/favicon-32x32.png", sizes: "32x32" },
        { rel: "icon", url: "/logo_96.png", sizes: "96x96" },
        { rel: "icon", url: "/logo_144.png", sizes: "144x144" },
        { rel: "icon", url: "/logo_192.png", sizes: "192x192" },
        { rel: "icon", url: "/logo_480.png", sizes: "480x480" },
        { rel: "icon", url: "/logo_512.png", sizes: "512x512" },
      ],
    },
    robots: {
      follow: notOnVercel,
      index: notOnVercel,
    },
    openGraph: {
      ...siteConfig.defaultSeo.openGraphDefaults,
    },
    bookmarks: [siteConfig.url],
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const meta = await getGlobals()
  const { Footer: footerData, NavMenu: headerData } = meta

  return (
    <html lang="hu" suppressHydrationWarning className="scroll-smooth">
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <LogoJsonLd
          logo={siteConfig.url + "/logo.svg"}
          url={siteConfig.url}
          useAppDir={true}
          name={siteConfig.name}
        />
        <LocalBusinessJsonLd
          type="LegalService"
          id={siteConfig.url}
          useAppDir={true}
          name={siteConfig.name}
          description={siteConfig.description}
          url={siteConfig.url}
          telephone="+36707191347"
          priceRange="$$"
          //department={[]}
          address={{
            streetAddress: "Lövőház utca 2-6, Mammut I. 4. emelet",
            addressLocality: "Budapest",
            addressRegion: "Budapest",
            postalCode: "1024",
            addressCountry: "HU",
          }}
          images={[
            siteConfig.url + "/logo.svg",
            "https://res.cloudinary.com/cc-images/image/upload/f_auto,c_limit,w_828,q_75/v1693306391/dylan_gillis_Kdeq_A3a_Tn_BY_unsplash_8b188f121d.jpg",
          ]}
          sameAs={siteConfig.sameURLs}
          makesOffer={
            undefined /*[
            {
              priceSpecification: {
                type: "UnitPriceSpecification",
                priceCurrency: "HUF",
                price: "175000",
              },
              itemOffered: {
                name: "Ingatlan adásvételi szerződés ügyvédi munkadíja",
                description:
                  "Segítjük a vevőt az eladóval való tárgyalások során, azonosítjuk az ingatlan terheit és javaslatot teszünk a tehermentesítés menetére, megszerkesztjük az adásvételi szerződést és a kapcsolódó okiratokat. A szerződés aláírását és ellenjegyzését követően eljárunk a földhivatal előtt a vevő tulajdonjogának bejegyzése iránt. A fix munkadíj tartalmazza az e-hiteles tulajdoni lap árát és a földhivatali eljáráshoz szükséges okiratok postázásának költségét (elsőbbségi, ajánlott levélküldeményként). Az ügyvédi munkadíj nem tartalmazza a földhivatali eljárás díját. Az ügyvédi munkadíj már tartalmazza az általános forgalmi adó összegét is.",
              },
            },
            {
              priceSpecification: {
                type: "UnitPriceSpecification",
                priceCurrency: "HUF",
                price: "45000",
              },
              itemOffered: {
                name: "Eladói tanácsadás ügyvédi munkadíja",
                description:
                  "Átnézzük és véleményezzük a vevő ügyvédje által megszerkesztett adásvételi szerződést, majd Skype, Teams, illetve Google Meet szolgáltatáson keresztül tanácsokat adunk a minket megbízó eladónak, hogy milyen módosításokat kérjen annak érdekében, hogy a következők megfelelően tükrözzék az eladó érdekeit.",
              },
            },
          ]*/
          }
        />

        <NextTopLoader height={2} color={"rgb(13 148 136)"} showSpinner={false} />

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <BgSvg />

          <SiteHeader data={headerData} />

          {children}
          <Footer data={footerData} />

          <TailwindIndicator />
          <Toaster />
          <CookieBanner />
        </ThemeProvider>
        {
          // Google Analytics
          notOnVercel && (
            <GoogleAnalytics GA_MEASUREMENT_ID={siteConfig.GA_MEASUREMENT_ID} />
          )
        }
      </body>
    </html>
  )
}
