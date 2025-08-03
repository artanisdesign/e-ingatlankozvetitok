import Link from "next/link"

import { Icons } from "../icons"

export default function RelatedArticles({
  related = [],
}: {
  related: {
    id: string
    title: string
    slug: string
  }[]
}) {
  if (related.length === 0) {
    return null
  }
  return (
    <div className="my-8 flex w-full max-w-full flex-col self-center rounded-xl border bg-slate-50 p-8 pb-4 dark:border-gray-800 dark:bg-slate-900 lg:mx-0">
      <p className="mb-4 flex w-full flex-row items-center text-xl font-semibold text-gray-800 dark:text-gray-100">
        <Icons.workflow className="mr-3 size-5" />
        Kapcsolódó cikkek
      </p>

      <ul className="text-teal-600 sm:grid sm:grid-cols-2 sm:gap-x-10 lg:block lg:grid-cols-none">
        {related.map((heading, index) => (
          <li
            key={index + "-" + heading.id}
            className="group my-3 flex flex-row items-start border-dashed border-gray-200 font-semibold transition-all duration-150 ease-in-out last:border-none hover:translate-x-1 dark:border-none sm:my-3 lg:my-4 lg:border-b-2"
          >
            <Icons.link className="mr-2 mt-1 size-4 shrink-0" />
            <Link
              href={`/${heading.slug}`}
              className="pb-3  pl-1  text-foreground hover:text-teal-600  dark:text-white dark:hover:text-teal-400 "
            >
              {heading.title}
            </Link>
          </li>
        ))}
      </ul>

      {related.length === 0 && <p>Hamarosan... </p>}
    </div>
  )
}
