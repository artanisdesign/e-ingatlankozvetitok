import Link from "next/link"

import { BasicCTABlock } from "@/app/types/pages"

import { Icons } from "../icons"
import { Button } from "../ui/button"

export function BasicCTA({ data }: { data: BasicCTABlock }) {
  const { title, body, buttonText, buttonLink, topText } = data

  return (
    <section className="relative my-6 mb-12 overflow-hidden  rounded-2xl bg-gradient-to-tr from-teal-700 to-sky-400  p-6 drop-shadow-md sm:p-8 md:p-10">
      <div className="absolute left-0 top-0 z-0 size-full opacity-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 800 2500"
        >
          <rect fill="#00567F" width="800" height="2500" />
          <g fillOpacity="1">
            <circle fill="#00567F" cx="400" cy="400" r="600" />
            <circle fill="#005f8d" cx="400" cy="400" r="500" />
            <circle fill="#00689b" cx="400" cy="400" r="400" />
            <circle fill="#0071a9" cx="400" cy="400" r="300" />
            <circle fill="#007bb8" cx="400" cy="400" r="200" />
            <circle fill="#0284C7" cx="400" cy="400" r="100" />
          </g>
        </svg>
      </div>
      <div className="relative z-10 flex flex-col items-center ">
        <div className="flex w-full items-center justify-center">
          {topText && buttonLink && (
            <Link
              className="group mb-6 inline-flex items-center justify-center gap-x-2 self-center rounded-full  bg-slate-900 p-1 pr-2 text-center text-sm font-medium text-teal-50 transition hover:text-teal-500 focus:outline-none"
              href={buttonLink}
            >
              <span className="mr-2 rounded-full bg-teal-600 p-1 px-2 transition group-hover:text-white">
                Új
              </span>
              {topText}
              <Icons.chevronRight className="size-4 " />
            </Link>
          )}
        </div>
        <h3 className="mb-6 text-center text-2xl font-extrabold text-white  drop-shadow-lg sm:text-4xl md:text-4xl">
          {title}
        </h3>
        <p className="mb-8 text-center text-lg text-gray-50 ">{body}</p>
        {buttonLink && buttonText && (
          <Button
            size={"lg"}
            asChild
            className="flex h-12 w-full flex-row items-center  bg-white text-center text-teal-900 shadow-sm transition hover:bg-yellow-500 hover:shadow-md sm:w-fit sm:min-w-[240px]"
            variant={"secondary"}
          >
            <Link
              href={buttonLink}
              className="flex h-10 w-full flex-row items-center justify-center p-6 text-center"
            >
              {buttonText}
              <Icons.chevronRight className="ml-1 size-4" />
            </Link>
          </Button>
        )}
      </div>
    </section>
  )
}
