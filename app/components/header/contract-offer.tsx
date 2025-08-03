import Link from "next/link"

import { cn } from "@/app/lib/utils"

import { Icons } from "../icons"

export const Contract = ({ hiddenCTA = false }: { hiddenCTA?: boolean }) => (
  <div className="mb-0 h-full flex-col justify-between rounded-xl bg-gradient-to-br  from-sky-600 to-teal-600 p-6 text-center shadow-xl md:mx-0 md:flex">
    <p className="relative mb-3 flex items-center justify-center gap-1.5 rounded-md bg-yellow-400 px-3 py-1.5 text-center text-sm font-bold uppercase text-blue-950 shadow-sm">
      Adásvételi szerződés
    </p>
    <span className="mt-0 flex flex-col py-3 text-sm text-white drop-shadow-md">
      A vételár{" "}
      <span className="flex-wrap text-5xl font-extrabold">
        0,45%<span className="text-sm font-normal">-a</span>
      </span>
    </span>
    <p className="mt-2 text-xs text-gray-300">
      (min. 150 000 Ft; max. 600 000 Ft)
    </p>
    <p className="mt-1 text-xs text-gray-300">Országszerte egységes áron!</p>

    <ul className="mt-4 space-y-2.5 text-sm ">
      <li className="flex space-x-2">
        <Icons.check className="size-5 text-yellow-300" />
        <span className="text-gray-100">Lakóingatlanra</span>
      </li>
      <li className="flex space-x-2">
        <Icons.check className="size-5 text-yellow-300" />
        <span className="text-gray-100">1 garázs</span>
      </li>
      <li className="flex space-x-2">
        <Icons.check className="size-5 text-yellow-300" />
        <span className="text-gray-100">1 tároló</span>
      </li>
      <li className="flex space-x-2">
        <Icons.check className="size-5 text-yellow-300" />
        <span className="text-gray-100">ÁFA</span>
      </li>
    </ul>
    {!hiddenCTA && (
      <Link
        className="mt-5 flex w-full items-center justify-center gap-x-3 rounded-md bg-white px-4 py-3 text-center text-sm font-medium text-teal-700 transition hover:bg-yellow-500 hover:shadow-md"
        href="/ingatlan-adasveteli-szerzodes"
      >
        Tovább
      </Link>
    )}
  </div>
)

export const ContractPhone = ({
  hiddenCTA = false,
}: {
  hiddenCTA?: boolean
}) => (
  <div className="mb-4 h-full flex-col rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 p-6 text-center shadow-xl sm:mb-0 md:flex md:w-[260px]">
    <p className="mb-3">
      <span className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 px-3 py-1.5 text-xs font-semibold uppercase text-gray-800 dark:bg-gray-600 dark:text-white">
        <Icons.phone className="size-4 " />
        Jogi Tanácsadás
      </span>
    </p>
    <p className="text-md mt-0 font-semibold text-white drop-shadow-sm">
      Eladna, újépítésűt venne?
    </p>

    <span className="mt-2 text-5xl font-extrabold text-white drop-shadow-md">
      49 000
      <span className="text-sm font-bold">Ft</span>
    </span>
    <p className="mt-2 text-sm text-gray-300">Rejtett költségek nélkül</p>

    <ul className="mt-7 space-y-2.5 text-sm md:block">
      <li className="flex space-x-2">
        <Icons.check className="size-5 text-yellow-300" />

        <span className="text-left text-gray-100">1 óra véleményezés</span>
      </li>

      <li className="flex space-x-2">
        <Icons.check className="size-5 text-yellow-300" />
        <span className="text-left text-gray-100">1 óra tanácsadás</span>
      </li>

      <li className="flex space-x-2">
        <Icons.check className="size-5 text-left text-yellow-300" />
        <span className="text-left text-gray-100">
          Telefon, Skype, Teams, Google Meet
        </span>
      </li>
      <li className="flex space-x-2">
        <Icons.check className="size-5 text-left text-yellow-300" />
        <span className="text-left text-gray-100">ÁFA</span>
      </li>
    </ul>

    {!hiddenCTA && (
      <Link
        className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-white px-4 py-3 text-center text-sm font-medium text-teal-700 transition hover:bg-gray-200 hover:shadow-md"
        href="/eladoi-tanacsadas"
      >
        Tovább
      </Link>
    )}
  </div>
)

export const ContractSmall = ({
  hiddenCTA = false,
  num = 0,
  showExtra = false,
}: {
  hiddenCTA?: boolean
  num?: number
  showExtra?: boolean
}) => (
  <div
    className={cn(
      "relative mb-0 h-full flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br from-sky-600 to-teal-600 p-6 text-center shadow-xl md:mx-0 md:flex",
      showExtra ? "md:p-10" : ""
    )}
  >
    <div className="absolute left-0 top-0 z-0 m-0 w-[170%] overflow-hidden rounded-xl opacity-90">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 1600 800"
      >
        <rect fill="#00567F" width="1600" height="800" />
        <g fillOpacity="0.09">
          <path
            fill="#125aff"
            d="M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z"
          />
          <path
            fill="#1372ff"
            d="M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z"
          />
          <path
            fill="#148bff"
            d="M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z"
          />
          <path
            fill="#15a3ff"
            d="M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z"
          />
          <path
            fill="#16BBFF"
            d="M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z"
          />
          <path
            fill="#32d0ff"
            d="M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z"
          />
          <path
            fill="#4ee1ff"
            d="M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z"
          />
          <path
            fill="#69eeff"
            d="M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z"
          />
          <path
            fill="#85f9ff"
            d="M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z"
          />
          <path
            fill="#A1FFFE"
            d="M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z"
          />
        </g>
      </svg>
    </div>
    <div className="z-1 relative">
      <p className="mb-5 mt-1">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-800/60 px-3 py-1.5 text-xs font-bold uppercase text-white shadow-sm">
          <Icons.trophy size={16} /> e-ingatlanügyvédek.hu
        </span>
      </p>
      <span
        className={cn(
          "mt-1 text-5xl  font-extrabold text-white drop-shadow-md",
          showExtra ? "py-4 text-6xl" : ""
        )}
      >
        {num.toLocaleString("HU-hu")}
        <span className="-mr-2 text-sm font-bold"> Ft</span>
      </span>
      <p className="mt-4 text-sm text-gray-300">Országszerte egységes áron!</p>

      {!hiddenCTA && (
        <Link
          className="mt-4 flex w-full items-center justify-center gap-x-3 self-center rounded-md bg-white px-4 py-3 text-center text-sm font-medium text-teal-700 transition hover:bg-gray-200 hover:shadow-md"
          href="/ingatlan-adasveteli-szerzodes"
        >
          Tovább az ajánlathoz
        </Link>
      )}
    </div>
  </div>
)
