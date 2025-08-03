import Link from "next/link"

import { Icons } from "@/app/components/icons"

export default function NotFoundPage() {
  return (
    <>
      <div className="mx-auto mt-16 flex size-full max-w-[50rem] flex-col">
        <div className="px-4 py-10 text-center sm:px-6 lg:px-8">
          <h1 className="block text-7xl font-bold text-gray-800 dark:text-white sm:text-9xl">
            404
          </h1>
          <h1 className="block text-2xl font-bold text-white"></h1>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Upsz.. valami hiba történt.
          </p>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Sajnos nem találjuk ezt az oldalt. Kérjük próbálja újra az alábbi
            gombok segítségével.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          <HelpCard
            title="Főoldal"
            subtitle="Kezdje az elején ahol minden megtalálható"
            link="/"
            icon={<Icons.home className="size-10" />}
          />

          <HelpCard
            title="Vevőknek"
            subtitle="Ha ingatlant venne itt találja a tudnivalókat"
            link="/ingatlan-tudnivalok-vevoknek"
            icon={<Icons.scrollText className="size-10" />}
          />

          <HelpCard
            title="Eladóknak"
            subtitle="Eladóként itt juthat hasznos tanácsokhoz"
            link="/ingatlan-tudnivalok-eladoknak"
            icon={<Icons.landmark className="size-10" />}
          />
          <HelpCard
            title="Írjon nekünk"
            subtitle="A kapcsolat oldalon keresztül"
            link="/kapcsolat"
            icon={<Icons.contact className="size-10" />}
          />
        </div>
      </div>
    </>
  )
}

const HelpCard = function ({
  title,
  subtitle,
  link,
  icon,
}: {
  title: string
  subtitle: string
  link: string
  icon: React.ReactNode
}) {
  return (
    <Link
      className="group flex flex-col rounded-xl border bg-white shadow-sm transition duration-200 ease-in-out hover:translate-y-1 hover:shadow-md dark:border-teal-800 dark:bg-teal-900"
      href={link}
    >
      <div className="p-4 md:p-5">
        <div className="flex">
          {icon}
          <div className="ml-5 grow">
            <h3 className="font-semibold text-gray-800 duration-100 ease-in-out group-hover:text-teal-600 dark:text-gray-200 dark:group-hover:text-teal-500">
              {title}
            </h3>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
