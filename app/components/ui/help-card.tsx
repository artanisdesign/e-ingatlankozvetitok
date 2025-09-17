import Link from "next/link"

import { Tilt } from "./tilted-card"

export function HelpCard({
  title,
  subtitle,
  link,
  icon,
  newPage = false,
  basicLink = false,
}: {
  title: string
  subtitle: string
  link: string
  icon: React.ReactNode
  newPage?: boolean
  basicLink?: boolean
}) {
  const 
  className =
    "group flex flex-col h-full rounded-xl border bg-white shadow-sm transition hover:shadow-md dark:border-teal-900 dark:bg-gray-900/60 dark:hover:border-teal-500 dark:hover:ring-1 dark:hover:ring-teal-500"
  const content = (
    <div className="flex p-4 hover:text-teal-500 md:p-5 transition-colors flex-shrink-0">
      {icon}
      <div className="ml-5 grow">
        <h3 className="font-semibold text-gray-800 duration-300 ease-in-out transition-colors  dark:text-gray-200 ">
          {title}
        </h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  )

  return basicLink ? (
    <Tilt scale={1.025} className="grid">
      <a
        className={className}
        href={link}
        target={newPage ? "_blank" : "_self"}
      >
        {content}
      </a>
    </Tilt>
  ) : (
    <Tilt scale={1.025} className="grid">
      <Link
        className={className}
        href={link}
        target={newPage ? "_blank" : "_self"}
      >
        {content}
      </Link>
    </Tilt>
  )
}
