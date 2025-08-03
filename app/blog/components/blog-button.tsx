import Link from "next/link"

import { Icons } from "../../components/icons"

export function ReturnToBlogButton({
  title,
  isForward = false,
}: {
  title: string
  isForward: boolean
}) {
  return (
    <div className="my-2 text-center">
      <Link
        className="inline-flex items-center justify-center gap-x-2 rounded-full border bg-white px-4 py-3 text-center text-sm font-medium text-teal-600 transition hover:border-gray-300 hover:text-teal-700 hover:shadow-sm focus:outline-none dark:border-gray-700 dark:bg-slate-900 dark:text-teal-500 dark:hover:border-gray-600 dark:hover:text-teal-400 dark:hover:shadow-slate-700/[.7] "
        href="/blog"
      >
        {!isForward && <Icons.chevronLeft className="size-4 " />}

        {title}
        {isForward && <Icons.chevronRight className="size-4 " />}
      </Link>
    </div>
  )
}
