import Link from "next/link"
import { Icons } from "../icons"

export default function TOC({
  headings = [],
}: {
  headings: {
    id: string
    title: string
  }[]
}) {
  return (
    <div className="group flex w-full max-w-full flex-col self-center rounded-xl border bg-white p-10 shadow-sm transition duration-200 ease-in-out hover:shadow-md dark:border-teal-800 dark:bg-teal-950  lg:mx-0">
      <p className="mb-5 flex w-full flex-row items-center text-xl font-semibold text-gray-800 dark:text-gray-100">
        <Icons.bookOpen className="mr-3 size-5" /> Tartalomjegyzék
      </p>

      <ul className="list-outside list-disc pl-3 text-teal-600 sm:grid sm:grid-cols-2 sm:gap-x-10 lg:block lg:grid-cols-none">
        {headings.map((heading, index) => (
          <li
            key={index + "-" + heading.id}
            className="my-3 pl-1 transition-all hover:translate-x-1 sm:my-2 lg:my-3"
          >
            <Link
              href={`#${heading.id}`}
              className="text-foreground transition-all  duration-150 ease-in-out hover:text-teal-600  dark:text-white dark:hover:text-teal-400"
            >
              {heading.title}
            </Link>
          </li>
        ))}
      </ul>

      {headings.length === 0 && <p>Hamarosan... </p>}
    </div>
  )
}
