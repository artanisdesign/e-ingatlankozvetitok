import Image from "next/image"

import { TwoImageHeroBlock } from "@/app/types/pages"

export function TwoImageHero({ data }: { data: TwoImageHeroBlock }) {
  return (
    <section className="bg-gray-50/80 dark:bg-gray-900/60">
      <div className="mx-auto max-w-7xl items-center gap-8 px-6 py-4 md:py-12 lg:grid lg:grid-cols-2 lg:px-8 lg:py-16">
        <div className="my-8 grid grid-cols-2 gap-4">
          <Image
            src={data.images[0].url}
            width={300}
            height={400}
            alt={data.images[0].alternativeText}
            className="mt-5 w-full rounded-lg"
          />
          {data.images[1] && (
            <Image
              src={data.images[1].url}
              width={300}
              height={400}
              alt={data.images[1].alternativeText}
              className="w-full rounded-lg"
            />
          )}
        </div>
        <div className="my-8 font-light text-gray-500 dark:text-gray-400 md:text-lg lg:text-xl">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {data.title}
          </h2>
          <p className="mb-4">{data.description}</p>
          {data.description2 && <p className="">{data.description2}</p>}
        </div>
      </div>
    </section>
  )
}
