"use client"

import { useState } from "react"
import Image from "next/image"

import { cn } from "@/app/lib/utils"
import { Image as ImageData } from "@/app/types/blog"

export function SectionImage({
  image,
  height = "440px",
  isPriority = false,
  noCaption = false,
  base64 = undefined,
  fullWidth = false,
  isPortrait = false,
  hideOnSmall = false,
}: {
  image?: ImageData
  height?: "440px" | "cover"
  isPriority?: boolean
  noCaption?: boolean
  base64?: string
  fullWidth?: boolean
  isPortrait?: boolean
  hideOnSmall?: boolean
}) {
  const [isLoading, setLoading] = useState(true)
  const isCover = height === "cover"

  if (image) {
    return (
      <span
        className={cn(
          hideOnSmall &&
            "hidden content-visibility-hidden sm:block sm:content-visibility-visible"
        )}
      >
        <div
          className={cn(
            "relative my-4 w-full overflow-hidden rounded-2xl border bg-muted shadow-md md:mt-8 md:rounded-xl lg:h-[600px]",
            hideOnSmall &&
              "hidden content-visibility-hidden sm:block sm:content-visibility-visible",
            isCover &&
              "aspect-square content-visibility-visible lg:max-h-[500px]",
            !isCover &&
              "aspect-auto h-[300px] w-full sm:h-[380px] md:aspect-square md:h-[440px] lg:aspect-auto lg:h-[500px] xl:h-[550px]",
            fullWidth && "h-[300px] content-visibility-visible md:h-[380px]",
            isPortrait && "min-h-[600px] sm:mx-auto sm:w-3/5",
            noCaption && "mb-12 mt-0 md:mt-6",
            isPriority && "content-visibility-visible"
          )}
          // eslint-disable-next-line tailwindcss/classnames-order
        >
          <Image
            alt={image.alternativeText ?? "e-ingatlankozvetitok.hu"}
            src={image.url}
            //width={isCover ? 600 : 600}
            //height={isCover ? 600 : 200}
            fill
            sizes="(max-width: 768px) 80vw, 960px"
            placeholder={base64 ? "blur" : "empty"}
            blurDataURL={base64}
            quality={75}
            loading={hideOnSmall ? "lazy" : undefined}
            priority={hideOnSmall ? false : isPriority}
            onLoad={() => {
              setLoading(false)
            }}
            className={cn(
              "top-1/2 mx-auto my-0 object-cover object-top md:transition md:ease-in-out md:will-change-auto",
              isLoading ? "md:scale-110 md:blur-xl" : "md:scale-100 md:blur-0",
              isPortrait && "md:h-full lg:h-full xl:h-full",
              fullWidth && "top-1/2",
              hideOnSmall &&
                "hidden content-visibility-hidden sm:block sm:content-visibility-visible"
            )}
          />

          {isCover && !noCaption && (
            <div className="absolute inset-x-0 bottom-0 mx-auto max-w-md p-6 text-center lg:left-auto lg:mx-0 lg:text-left">
              <div className="inline-block rounded-lg bg-white/60 px-5 py-4 backdrop-blur-lg dark:bg-gray-800/70 md:p-4">
                <div className="block">
                  <p className="text-gray-800 dark:text-gray-200">
                    {image.caption}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        {image.caption && !isCover && !noCaption && (
          <p className="mb-6 text-center text-sm text-muted-foreground">
            {image.caption}
          </p>
        )}
      </span>
    )
  }

  return <></>
}
