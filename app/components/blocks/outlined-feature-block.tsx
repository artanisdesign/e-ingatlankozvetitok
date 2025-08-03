import Image from "next/image"

import { cn } from "@/app/lib/utils"
import { OutlinedFeature } from "@/app/types/pages"

export function OutlinedFeatureBlock({ data }: { data: OutlinedFeature }) {
  return (
    <section className="group my-8 flex w-full max-w-full flex-col rounded-xl border bg-white shadow-sm dark:border-gray-800 dark:bg-slate-900">
      <div
        className={cn(
          "p-8 sm:p-8 lg:p-8 ",
          data.images && data.images.length
            ? "place-items-start gap-8 xl:grid xl:grid-cols-2"
            : ""
        )}
      >
        <div className="font-light text-gray-500 dark:text-gray-400 md:text-lg lg:text-xl">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {data.title}
          </h2>
          <p className="mb-4 text-lg">{data.description}</p>
          {data.description2 && <p className="text-lg">{data.description2}</p>}
        </div>
        {data.images && data.images.length > 0 && (
          <div className="hidden place-items-center content-center justify-items-center xl:grid xl:grid-cols-1">
            <Image
              src={data.images[0].url}
              width={300}
              height={400}
              alt={data.images[0].alternativeText}
              className={cn(
                " rounded-lg ",
                data.images.length > 1 ? "w-[70%] shadow-xl" : "w-full"
              )}
            />
            {data.images[1] && (
              <Image
                src={data.images[1].url}
                width={300}
                height={400}
                alt={data.images[1].alternativeText}
                className="-mt-8 ml-16 w-[70%] rounded-lg shadow-xl"
              />
            )}
          </div>
        )}
      </div>
    </section>
  )
}
