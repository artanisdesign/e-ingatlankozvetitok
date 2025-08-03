import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Icons } from "@/app/components/icons"
import { BlogPost } from "@/app/types/blog"

export function BlogThumbnailSidebar({ post }: { post?: BlogPost }) {
  const { cover } = post ?? { cover: null }

  if (post) {
    return (
      <Link
        className="group overflow-hidden rounded-xl"
        href={"/blog/" + post.slug}
      >
        <div className="block">
          <div className="relative block h-48 w-full shrink-0 overflow-hidden rounded-xl  border bg-muted">
            {cover && cover.url && (
              <Image
                src={cover.url}
                alt={cover.alternativeText ?? siteConfig.name}
                width={400}
                height={300}
                className="size-full rounded-xl object-cover object-top transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            )}
          </div>

          <div className="m-4 ml-6 mt-6">
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-gray-300 dark:group-hover:text-white">
              {post.title}
            </h3>
            <p className="mt-3 line-clamp-3 text-gray-600 dark:text-gray-400">
              {post.description}
            </p>
            <p className="mt-4 inline-flex items-center gap-x-1  font-medium text-teal-600 hover:text-teal-600 dark:text-teal-500 ">
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
          </div>
        </div>
      </Link>
    )
  }
  return null
}

export function BlogCompactSidebar({ post }: { post?: BlogPost }) {
  const { cover } = post ?? { cover: null }

  if (post) {
    return (
      <Link
        className="group flex flex-col overflow-hidden rounded-xl"
        href={"/blog/" + post.slug}
      >
        <h3 className="flex items-baseline text-lg font-semibold text-gray-800 group-hover:text-teal-600 dark:text-gray-300 dark:group-hover:text-teal-500">
          <Icons.blog className="mr-3 size-4 shrink-0 text-teal-500" />{" "}
          {post.title}
        </h3>
      </Link>
    )
  }
  return null
}

//TODO: default image, and componetize this
export function BlogThumbnailGrid({ post }: { post?: BlogPost }) {
  const { cover } = post ?? { cover: null }

  if (post) {
    return (
      <Link
        className="group overflow-hidden rounded-xl"
        href={"/blog/" + post.slug}
      >
        <div className="sm:flex">
          <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-xl border bg-muted sm:w-56">
            {cover && cover.url && (
              <Image
                src={cover.url}
                alt={cover.alternativeText ?? siteConfig.name}
                width={300}
                height={200}
                className="size-full rounded-xl object-cover object-top transition-transform duration-300 ease-in-out hover:scale-110"
              />
            )}
          </div>

          <div className="flow mt-4 px-4 sm:ml-6 sm:mt-0 sm:px-0">
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-gray-300 dark:group-hover:text-white">
              {post.title}
            </h3>
            <p className="mt-3 line-clamp-2 text-gray-600 dark:text-gray-400">
              {post.description}
            </p>
            <p className="mt-4 inline-flex items-center gap-x-1  text-sm font-medium text-teal-600 hover:text-teal-600 dark:text-teal-500">
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
          </div>
        </div>
      </Link>
    )
  }
  return null
}
