import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { BlogPost } from "@/app/types/blog"

export function BlogMainPost({ post }: { post?: BlogPost }) {
  const { cover } = post ?? { cover: null }

  const author = post && post.author && post.author

  if (post) {
    return (
      <div className="mb-16 mt-10 grid gap-8 sm:grid-cols-2 sm:items-center lg:mb-24">
        <div className="sm:order-2">
          <div className="relative overflow-hidden rounded-lg border  bg-muted pt-[50%] sm:pt-[100%]">
            {cover && cover.url && (
              <Image
                src={cover.url}
                alt={cover.alternativeText ?? siteConfig.name}
                width={600}
                height={600}
                className=" absolute left-0 top-0 size-full rounded-lg object-cover  object-top"
              />
            )}
          </div>
        </div>

        <div className="px-4 sm:order-1 sm:col-span-1 sm:px-0">
          <p className="mb-5 inline-flex items-center gap-1.5 rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200">
            Legfrissebb
          </p>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 md:text-3xl lg:text-4xl lg:leading-tight xl:text-5xl xl:leading-tight">
            <Link
              className="hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-500"
              href={"/blog/" + post.slug}
            >
              {post.title}
            </Link>
          </h2>
          <Link className="group" href={"/ingatlan-ugyved/" + author?.slug}>
            <div className="mt-6 flex items-center sm:mt-10">
              <div className="shrink-0">
                <Image
                  src={author?.avatar?.url ?? ""}
                  alt={
                    author?.avatar?.alternativeText ?? "e-ingatlankozvetitok.hu"
                  }
                  width={128}
                  height={128}
                  className="size-10 rounded-full bg-slate-400 ring-1 ring-gray-300/50 "
                />
              </div>

              <div className="ml-3 sm:ml-4">
                <p className="font-semibold text-gray-800 transition-colors group-hover:text-teal-500 dark:text-gray-200 sm:mb-1">
                  {author?.prefix + " " + author?.name}
                </p>
              </div>
            </div>
          </Link>
          <div className="mt-5">
            <Link
              className="group overflow-hidden rounded-xl"
              href={"/blog/" + post.slug}
            >
              <p className="text-md mt-4 inline-flex items-center gap-x-1 font-medium text-teal-600 group-hover:text-teal-600 dark:text-teal-500 ">
                Tovább
                <svg
                  className="size-2.5 transition-transform duration-300 group-hover:translate-x-1"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </p>
            </Link>
          </div>
        </div>
      </div>
    )
  }
  return null
}
