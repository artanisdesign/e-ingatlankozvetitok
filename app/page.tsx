import Link from "next/link"
import { notFound } from "next/navigation"

import ContactForm from "./components/blocks/contact-form"
import { MainHero } from "./components/blocks/hero-section"
import { Icons } from "./components/icons"
import { getGlobals } from "./lib/api"
import SectionRenderer from "./lib/section-renderer"

export default async function IndexPage() {
  const global = await getGlobals()
  const { Blocks = [] } = global

  if (!global) {
    notFound()
  }

  return (
    <>
      <MainHero />
      <SectionRenderer blocks={Blocks} />
      <div className="mx-auto mb-20 mt-12 grid max-w-7xl items-center gap-6 p-6 content-visibility-auto sm:content-visibility-visible lg:grid-cols-2 lg:gap-16 2xl:p-0">
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
    </>
  )
}
