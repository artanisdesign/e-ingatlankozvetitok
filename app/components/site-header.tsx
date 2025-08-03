/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import React from "react"
import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"

import logo from "../../public/logo.svg"
import { HeaderData } from "../types/globals"
import { NavigationMenuTop } from "./header/nav-menu"
import { Icons } from "./icons"
import { Button } from "./ui/button"

export default function SiteHeader({ data }: { data: HeaderData }) {
  return (
    <header className="z-100 flex w-full flex-wrap text-sm content-visibility-visible min-[900px]:flex-nowrap min-[900px]:justify-start">
      <div className="absolute left-0 top-0 h-14 w-full shadow-sm bg-background dark:bg-background/30 min-[900px]:shadow-none"></div>

      <div className="h-30 relative mx-auto flex h-14 w-full max-w-[85rem] items-center justify-between  px-3 min-[900px]:h-14 lg:px-6">
        <Link
          href="/"
          className="flex min-w-fit grow-0 items-center justify-between text-lg font-semibold text-gray-900 hover:text-teal-500 dark:text-white max-[380px]:text-base max-[350px]:text-xs lg:text-xl"
        >
          <Image
            src={logo}
            className="mr-2 h-auto w-9 sm:mr-4 sm:w-9"
            alt={"Logó"}
            unoptimized
          />

          {siteConfig.title}
        </Link>

        <div className="flex grow items-center justify-end">
          <span className="hidden content-visibility-hidden min-[900px]:flex min-[900px]:content-visibility-visible">
            <NavigationMenuTop data={data} />
          </span>
          <Button
            size={"sm"}
            variant="ghost"
            asChild
            className="sm:text-md xs:mr-0.5 -ml-5 rounded-lg text-sm sm:mr-2"
          >
            <Link href="/blog" aria-label="IngatlanBlog">
              <span className="flex max-[500px]:hidden">Ingatlan</span>Blog
            </Link>
          </Button>
          <Button
            size={"sm"}
            variant={"primary"}
            asChild
            className="m-0 hidden rounded-lg p-2 sm:p-3 md:flex"
          >
            <Link href="/kapcsolat" aria-label="Kapcsolat">
              <span className="flex max-[500px]:hidden">Kapcsolat</span>
              <Icons.mail className="hidden  max-[500px]:flex" />
            </Link>
          </Button>
          <Button
            size={"sm"}
            variant={"ghost"}
            asChild
            className=" sm:text-md xs:ml-0.5 -mr-2 rounded-lg text-sm sm:ml-2 sm:mr-0"
          >
            <Link href="/english" aria-label="English">
              <span className=" flex size-6 text-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 30"
                  width="24"
                  height="24"
                >
                  <clipPath id="t">
                    <path d="M25,15h25v15zv15h-25zh-25v-15zv-15h25z" />
                  </clipPath>
                  <path d="M0,0v30h50v-30z" fill="#012169" />
                  <path
                    d="M0,0 50,30M50,0 0,30"
                    stroke="#fff"
                    strokeWidth="6"
                  />
                  <path
                    d="M0,0 50,30M50,0 0,30"
                    clipPath="url(#t)"
                    stroke="#C8102E"
                    strokeWidth="4"
                  />
                  <path
                    d="M-1 11h22v-12h8v12h22v8h-22v12h-8v-12h-22z"
                    fill="#C8102E"
                    stroke="#FFF"
                    strokeWidth="2"
                  />
                </svg>
              </span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex h-14 w-full flex-row items-center justify-center content-visibility-visible max-[480px]:h-12 min-[900px]:hidden min-[900px]:content-visibility-hidden">
        <NavigationMenuTop data={data} />
      </div>
    </header>
  )
}
