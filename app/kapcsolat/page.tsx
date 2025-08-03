import { Metadata } from "next"
import Link from "next/link"
import { CorporateContactJsonLd } from "next-seo"

import { siteConfig } from "@/config/site"

import ContactForm from "../components/blocks/contact-form"
import { Icons } from "../components/icons"
import { HelpCard } from "../components/ui/help-card"

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      canonical: "/kapcsolat",
    },
    title: "Kapcsolat",
  }
}

export default async function ContactPage() {
  return (
    <section className="relative mx-auto max-w-7xl p-6 lg:py-10">
      <CorporateContactJsonLd
        url={siteConfig.url}
        useAppDir={true}
        logo={siteConfig.url + "/logo.svg"}
        contactPoint={[
          {
            telephone: "+36707191347",
            contactType: "Ügyfélszolgálat",
            email: "info@e-ingatlanugyvedek.hu",
            areaServed: "HU",
            availableLanguage: ["English", "Hungarian"],
          },
        ]}
      />
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white sm:text-5xl">
          Kapcsolatfelvétel
        </h1>
        <p className="mt-24 text-gray-600 dark:text-gray-400">
          Töltse ki az alábbi űrlapot, és 1 munkanapon belül visszahívjuk!
        </p>
      </div>

      <div className="mb-16 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        <HelpCard
          title="+36 70 719 1347"
          subtitle="Hívjon minket a fenti telefonszámon"
          icon={
            <Icons.phone className="mt-1.5 size-6 shrink-0 text-gray-800 dark:text-gray-200" />
          }
          link="tel:+36707191347"
          basicLink
        />
        <HelpCard
          title="1024 Budapest Lövőház utca 2-6"
          subtitle="Mammut I. 4. emelet"
          icon={
            <Icons.mapPin className="mt-1.5 size-6 shrink-0 text-gray-800 dark:text-gray-200" />
          }
          link="https://goo.gl/maps/gMaCH282X4FpsAcFA"
          newPage
          basicLink
        />
        <HelpCard
          title="Waze Útvonal"
          subtitle="1024 Budapest Lövőház utca 2-6"
          icon={
            <Icons.car className="mt-1.5 size-6 shrink-0 text-gray-800 dark:text-gray-200" />
          }
          link="https://waze.com/ul?ll=47.50845,19.02631&navigate=yes"
          newPage
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
      <div className="mt-12 grid items-center gap-6 lg:grid-cols-2 lg:gap-16 ">
        <ContactForm noHelpCards />

        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          <div className="flex gap-x-7 py-6">
            <svg
              className="mt-1.5 size-6 shrink-0 text-gray-800 dark:text-gray-200"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
            </svg>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                Tudásbázis
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Itt talál választ az ingatlanügyekkel kapcsolatos leggyakoribb
                kérdésekre.
              </p>
              <Link
                className="mt-2 inline-flex items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                href="/tudasbazis"
              >
                Tovább a tudásbázisra
                <svg
                  className="size-2.5 transition ease-in-out group-hover:translate-x-1"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.975821 6.92249C0.43689 6.92249 -3.50468e-07 7.34222 -3.27835e-07 7.85999C-3.05203e-07 8.37775 0.43689 8.79749 0.975821 8.79749L12.7694 8.79748L7.60447 13.7596C7.22339 14.1257 7.22339 14.7193 7.60447 15.0854C7.98555 15.4515 8.60341 15.4515 8.98449 15.0854L15.6427 8.68862C16.1191 8.23098 16.1191 7.48899 15.6427 7.03134L8.98449 0.634573C8.60341 0.268455 7.98555 0.268456 7.60447 0.634573C7.22339 1.00069 7.22339 1.59428 7.60447 1.9604L12.7694 6.92248L0.975821 6.92249Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
            </div>
          </div>

          <div className="flex gap-x-7 py-6">
            <Icons.messageDashed className="mt-1.5 size-6 shrink-0 text-gray-800 dark:text-gray-200" />
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                IngatlanBlog
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Olvasson a legfrissebb trendekről, jogi tanácsokról és piaci
                hírekről szakértői blogunkban.
              </p>
              <Link
                className="mt-2 inline-flex items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                href="/blog"
              >
                Tovább a cikkekhez
                <svg
                  className="size-2.5 transition ease-in-out group-hover:translate-x-1"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.975821 6.92249C0.43689 6.92249 -3.50468e-07 7.34222 -3.27835e-07 7.85999C-3.05203e-07 8.37775 0.43689 8.79749 0.975821 8.79749L12.7694 8.79748L7.60447 13.7596C7.22339 14.1257 7.22339 14.7193 7.60447 15.0854C7.98555 15.4515 8.60341 15.4515 8.98449 15.0854L15.6427 8.68862C16.1191 8.23098 16.1191 7.48899 15.6427 7.03134L8.98449 0.634573C8.60341 0.268455 7.98555 0.268456 7.60447 0.634573C7.22339 1.00069 7.22339 1.59428 7.60447 1.9604L12.7694 6.92248L0.975821 6.92249Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
            </div>
          </div>

          <div className=" flex gap-x-7 py-6">
            <Icons.phone className="mt-1.5 size-6 shrink-0 text-gray-800 dark:text-gray-200" />
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                Ügyfélszolgálat
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Amennyiben azonnali segítségre van szüksége, hívja
                ügyfélszolgálati csapatunkat.
              </p>
              <Link
                className="mt-2 inline-flex items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                href="tel:+36707191347"
              >
                Ügyfélszolgálat
                <svg
                  className="size-2.5 transition ease-in-out group-hover:translate-x-1"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.975821 6.92249C0.43689 6.92249 -3.50468e-07 7.34222 -3.27835e-07 7.85999C-3.05203e-07 8.37775 0.43689 8.79749 0.975821 8.79749L12.7694 8.79748L7.60447 13.7596C7.22339 14.1257 7.22339 14.7193 7.60447 15.0854C7.98555 15.4515 8.60341 15.4515 8.98449 15.0854L15.6427 8.68862C16.1191 8.23098 16.1191 7.48899 15.6427 7.03134L8.98449 0.634573C8.60341 0.268455 7.98555 0.268456 7.60447 0.634573C7.22339 1.00069 7.22339 1.59428 7.60447 1.9604L12.7694 6.92248L0.975821 6.92249Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
            </div>
          </div>

          <div className=" flex gap-x-7 py-6">
            <Icons.mail className="mt-1.5 size-6 shrink-0 text-gray-800 dark:text-gray-200" />
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                Írjon nekünk emailt
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Ha inkább e-mailben szeretne kapcsolatba lépni velünk:
              </p>
              <Link
                className="mt-2 inline-flex items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                href="mailto:info@e-ingatlanugyvedek.hu?subject=Érdeklődés"
              >
                info@e-ingatlanugyvedek.hu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
