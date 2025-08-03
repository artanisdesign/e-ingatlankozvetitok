import React from "react"

import { FeaturesBlock } from "@/app/types/pages"

import { Icons } from "../icons"

export function MainFeatures({ data }: { data: FeaturesBlock }) {
  return (
    <section className="">
      <div className="mx-auto max-w-7xl gap-8 px-6 py-12 lg:px-8 lg:py-16">
        <div className="mb-8 max-w-screen-md lg:mb-16">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {data.title}
          </h2>
          <p className="font-light text-gray-500 dark:text-gray-400 md:text-lg lg:text-xl">
            {data.description}
          </p>
        </div>
        <div className="space-y-8 ">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
              <div className="space-y-6 lg:space-y-10">
                {data.features
                  .filter((_e, i) => (i % 2) - 1)
                  .map((feature) => (
                    <Feature
                      title={feature.title}
                      description={feature.description}
                      icon={feature.icon}
                      key={feature.id}
                    />
                  ))}
              </div>

              <div className="space-y-6 lg:space-y-10">
                {data.features
                  .filter((_e, i) => i % 2)
                  .map((feature) => (
                    <Feature
                      title={feature.title}
                      description={feature.description}
                      icon={feature.icon}
                      key={feature.id}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const myIcon = (icon: string, title: string) => {
  // component does exist
  if (typeof icon !== "undefined" && icon.startsWith("data")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={icon} alt={title} className="mt-2 size-8 shrink-0" />
    )
  } else if (typeof Icons[icon as keyof typeof Icons] !== "undefined") {
    return React.createElement(Icons[icon as keyof typeof Icons], {
      className: "mt-2 h-8 w-8 shrink-0 text-gray-800 dark:text-white",
    })
  }

  // component doesn't exist yet
  return (
    <Icons.scrollText className="mt-2 size-8 shrink-0 text-gray-800 dark:text-white" />
  )
}

const Feature = ({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: string
}) => (
  <div className="group flex rounded-lg p-4  transition-colors">
    <div className="size-8 shrink-0">{myIcon(icon, title)}</div>
    <div className="ml-5 sm:ml-8">
      <h3 className="text-base font-semibold text-gray-800 transition-colors group-hover:text-teal-500 dark:text-gray-200 sm:text-lg">
        {title}
      </h3>
      <p className="mt-1 text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  </div>
)
