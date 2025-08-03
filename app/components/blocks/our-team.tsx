import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { OurTeamBlock } from "@/app/types/pages"

import { Icons } from "../icons"
import { Button } from "../ui/button"

//TODO: probably we donbt need this anymore

export function OurTeam({ data }: { data: OurTeamBlock }) {
  return (
    <section className="bg-gray-50/80 dark:bg-gray-900/60">
      <div className="mx-auto grid max-w-7xl px-6 py-12 lg:grid-cols-12 lg:gap-20 lg:px-8 lg:py-24 xl:gap-20">
        <div className="mb-12 mr-auto place-self-start lg:col-span-4">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {data.title}
          </h2>
          <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:text-xl">
            {data.description}
          </p>
          {data.description2 && (
            <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:text-xl">
              {data.description2}
            </p>
          )}

          <Button
            size={"lg"}
            variant={"primary"}
            asChild
            className="mr-4  rounded-lg"
          >
            <Link href={data.url ?? "/csapatunk"}>
              Csapatunk <Icons.chevronRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
        <div className="col-span-1 lg:col-span-8 lg:mt-0 lg:flex">
          <div className="grid grid-cols-1 items-center justify-center gap-4 md:grid-cols-3">
            {data.Images.map((item, index) => (
              <div
                key={index}
                className="group relative col-span-1 mx-auto  max-w-sm shrink-0 items-center justify-center place-self-center overflow-hidden rounded-xl before:absolute before:inset-x-0 before:z-[1] before:size-full before:bg-gradient-to-t before:from-gray-900/[.7] sm:max-w-md  md:h-full md:max-h-full"
              >
                <Image
                  src={item.url}
                  width={300}
                  height={300}
                  alt={item.alternativeText ?? siteConfig.name}
                  className="size-full object-cover object-top grayscale transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 z-10 flex items-end justify-center p-4 text-center text-white">
                  <div className="flex flex-col items-end justify-center">
                    <h3 className="mb-2 text-xl font-bold tracking-tight text-white drop-shadow-lg">
                      {item.caption}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
