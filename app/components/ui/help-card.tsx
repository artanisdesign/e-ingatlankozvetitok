import Link from "next/link"

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
  const className =
    "group flex flex-col rounded-xl border bg-white shadow-sm transition duration-200 ease-in-out hover:translate-y-1 hover:shadow-md dark:border-teal-800 dark:bg-teal-950"
  const content = (
    <div className="flex p-4 md:p-5">
      {icon}
      <div className="ml-5 grow">
        <h3 className="font-semibold text-gray-800 duration-100 ease-in-out group-hover:text-teal-600 dark:text-gray-200 dark:group-hover:text-teal-500">
          {title}
        </h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  )

  return basicLink ? (
    <a className={className} href={link} target={newPage ? "_blank" : "_self"}>
      {content}
    </a>
  ) : (
    <Link
      className={className}
      href={link}
      target={newPage ? "_blank" : "_self"}
    >
      {content}
    </Link>
  )
}
