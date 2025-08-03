"use client"

import React from "react"
import Link from "next/link"

import { cn } from "@/app/lib/utils"

import { Icons } from "../icons"
import { NavigationMenuLink } from "../ui/navigation-menu"

export const MenuElement = ({
  title,
  url,
  description,
  icon,
  disabled = false,
  newTab = false,
  id,
}: {
  title: string
  url: string
  description: string
  icon?: string
  disabled?: boolean
  newTab?: boolean
  id?: string
}) => {
  const myIcon = (
    icon: string | undefined,
    title: string,
    className?: string
  ) => {
    // component does exist
    if (icon && icon.startsWith("data")) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={icon}
          alt={title}
          className={cn("mt-1 size-6 shrink-0", className)}
        />
      )
    } else if (typeof Icons[icon as keyof typeof Icons] !== "undefined") {
      return React.createElement(Icons[icon as keyof typeof Icons], {
        className: cn("mt-1 size-6 shrink-0", className),
      })
    }
    // component doesn't exist yet
    return <Icons.scrollText className="mt-1 size-6" />
  }

  if (disabled)
    return (
      <div
        className="group my-1 flex w-full gap-x-5 rounded-md border-2 border-dashed p-3"
        key={id}
      >
        {myIcon(icon, title, "opacity-10")}
        <div className="grow-0">
          <p className="font-medium text-gray-800 opacity-50 transition-colors dark:text-gray-200">
            {title}
          </p>
          <p className="line-clamp-2 text-sm text-gray-500 opacity-50 ">
            Hamarosan...
          </p>
        </div>
      </div>
    )

  if (newTab) {
    //external link
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        key={id}
        className="group flex gap-x-5 rounded-md p-4 text-teal-500 transition-colors hover:bg-gray-100 dark:text-teal-500 dark:hover:bg-gray-900"
      >
        {myIcon(icon, title)}
        <div className="grow-0">
          <p className="font-medium text-gray-800 dark:text-gray-200">
            {title}
          </p>
          <p className="line-clamp-2 text-sm text-gray-500 transition-colors group-hover:text-gray-800 dark:group-hover:text-gray-200">
            {description}
          </p>
        </div>
      </a>
    )
  }

  return (
    <NavigationMenuLink
      className="group flex gap-x-5 rounded-md p-4 text-teal-500 transition-colors hover:bg-gray-100 dark:text-teal-500 dark:hover:bg-gray-900"
      asChild
    >
      <Link href={url} key={id}>
        {myIcon(icon, title)}
        <div className="grow-0">
          <p className="font-medium text-gray-800 dark:text-gray-200">
            {title}
          </p>
          <p className="line-clamp-2 text-sm text-gray-500 transition-colors group-hover:text-gray-800 dark:group-hover:text-gray-200">
            {description}
          </p>
        </div>
      </Link>
    </NavigationMenuLink>
  )
}
