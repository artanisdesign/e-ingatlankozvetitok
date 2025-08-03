import Link from "next/link"

import { Contract, ContractPhone } from "../header/contract-offer"
import { Button } from "../ui/button"

export function MainHero() {
  return (
    <section className="py-6 pt-2 content-visibility-visible md:py-12">
      <div className="mx-auto grid max-w-7xl px-6 py-4 md:flex md:gap-8 lg:gap-10 lg:px-8 xl:gap-12">
        <div className="m-auto place-self-center md:mr-auto lg:col-span-6 ">
          <h1 className="mb-4 max-w-2xl text-left text-3xl font-extrabold leading-none tracking-tight dark:text-white sm:text-4xl md:text-left md:text-5xl xl:text-5xl">
            Illés és Szabó Ügyvédi Társulás - az ingatlanjog nálunk kezdődik!
          </h1>
          <p className="mb-6 max-w-2xl text-left font-light text-gray-500 dark:text-gray-400 md:text-left md:text-lg lg:mb-8 lg:text-xl">
            Legyen szó lakásvásárlásról, ház ajándékozásról vagy termőföld
            adásvételről – országszerte teljes körű jogi támogatást biztosítunk
            ingatlanügyekben.
          </p>
          <div className="mb-4 flex flex-col items-center justify-center gap-4 px-4 pt-4 sm:flex-row sm:justify-start sm:gap-4 sm:px-0 md:mb-0 ">
            <Button
              size={"lg"}
              variant={"primary"}
              asChild
              className="w-full rounded-lg sm:w-fit"
            >
              <Link href="/e-ingatlanuegyvedek-hu-irodaink">Irodáink</Link>
            </Button>
            <Button
              size={"lg"}
              variant={"secondary"}
              asChild
              className="w-full rounded-lg sm:w-fit"
            >
              <Link href="/szolgaltatasok">Szolgáltatások</Link>
            </Button>
            <Button
              size={"lg"}
              variant={"outline"}
              asChild
              className="w-full rounded-lg sm:w-fit"
            >
              <Link href="/kapcsolat">Kapcsolat</Link>
            </Button>
          </div>
        </div>
        <div className="items-top grid w-full grid-cols-1 justify-center gap-4 pt-6 sm:grid-cols-2 sm:gap-8 sm:p-4 md:hidden ">
          <div className="col-span-1 mx-auto h-min min-w-[270px] max-w-xs items-start justify-center rounded-xl shadow-2xl sm:w-full">
            <Contract />
          </div>
          <div className="col-span-1 mx-auto hidden min-w-[270px] max-w-xs items-start justify-center rounded-xl shadow-lg sm:mt-8 sm:block sm:w-full">
            <ContractPhone />
          </div>
        </div>
        <div className="hidden flex-none shrink-0 gap-x-3 md:flex md:w-[260px] lg:col-span-6 lg:mt-0 lg:grid lg:w-[530px] lg:grid-cols-2">
          <div className="relative z-10  h-min w-full shrink-0 rounded-xl shadow-2xl">
            <Contract />
          </div>
          <div className="relative z-0 ml-2 mt-8 hidden h-min w-full shrink-0 rounded-xl shadow-lg lg:flex">
            <ContractPhone />
          </div>
        </div>
      </div>
    </section>
  )
}
