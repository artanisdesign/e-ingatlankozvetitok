import Image from "next/image"
import Link from "next/link"
import {
  Facebook,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "lucide-react"

import { siteConfig } from "@/config/site"
import { FooterData, LinkData } from "@/app/types/globals"

import logo from "../../public/logo.svg"
import TikTokSVG from "./icons/TikTokSVG"
import { ThemeToggle } from "./theme-toggle"
import { Separator } from "./ui/separator"

export default function Footer({ data }: { data: FooterData }) {
  return (
    <footer className="border-t border-t-teal-700/50 bg-teal-950 content-visibility-auto sm:content-visibility-visible">
      <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:pt-20 ">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          <div className="col-span-full mb-6 md:mb-3 lg:col-span-1">
            <Image
              src={logo}
              height={36}
              width={36}
              alt={"E-ingatlan ügyvédek"}
              className="mb-4"
              unoptimized
            />
            <Link
              className="text-md flex-none font-semibold text-white"
              href="/"
              aria-label="e-ingatlankozvetitok.hu"
            >
              e-ingatlankozvetitok.hu
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Tapasztalt ingatlan ügyvédek személyre szabott jogi segítséget
              nyújtanak az adásvételi folyamat minden lépésében.
              <br />
              <br />
              Kövess minket a közösségi csatornákon is!
            </p>
            <div className="mt-8 flex flex-row items-center gap-6">
              <Link
                href="https://www.facebook.com/people/e-ingatlanügyvédekhu/61554936975477/"
                prefetch={false}
                aria-label="Facebook"
                title="Facebook"
                target="_blank"
              >
                <Facebook className="text-muted-foreground transition-colors hover:text-white"></Facebook>
              </Link>
              <Link
                href="https://www.instagram.com/eingatlanugyvedek.hu"
                prefetch={false}
                aria-label="Instagram"
                title="Instagram"
                target="_blank"
              >
                <InstagramIcon className="text-muted-foreground transition-colors hover:text-white" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/e-ingatlanugyvedek"
                prefetch={false}
                aria-label="Linkedin"
                title="Linkedin"
                target="_blank"
              >
                <LinkedinIcon className="text-muted-foreground transition-colors hover:text-white" />
              </Link>
              <Link
                href="https://www.youtube.com/@e-ingatlanugyvedek"
                prefetch={false}
                aria-label="Youtube"
                title="Youtube"
                target="_blank"
              >
                <YoutubeIcon className="text-muted-foreground transition-colors hover:text-white" />
              </Link>

              <Link
                href="https://www.tiktok.com/@eingatlanugyvedek.hu"
                prefetch={false}
                aria-label="TikTok"
                title="TikTok"
                target="_blank"
              >
                <TikTokSVG className="text-muted-foreground transition-colors hover:text-white" />
              </Link>
            </div>
          </div>
          {siteConfig.footerNav
            .filter((item) => item.id !== "CityLinks")
            .map((nav) => (
              <div className="col-span-1" key={nav.id}>
                <p className="mb-2 font-bold text-gray-50">{nav.title}</p>

                {(data[nav.id as keyof FooterData] as LinkData[]).map(
                  (submenu) => (
                    <p key={submenu.id}>
                      <Link
                        className="my-1.5 inline-flex gap-x-2 text-gray-300 transition-colors hover:text-gray-50"
                        href={submenu.url}
                        target={submenu.newTab ? "_blank" : undefined}
                      >
                        {submenu.title}
                      </Link>
                    </p>
                  )
                )}
              </div>
            ))}
        </div>
        <Separator className="my-10 bg-muted-foreground/20" />

        {siteConfig.footerNav
          .filter((item) => item.id === "CityLinks")
          .map((nav) => (
            <div className="col-span-1" key={nav.id}>
              <p className="mb-2 font-bold text-gray-50">{nav.title}</p>
              <div
                className="grid grid-cols-2 flex-wrap gap-1 sm:flex sm:gap-x-6 md:flex-row"
                key={nav.id}
              >
                {(data[nav.id as keyof FooterData] as LinkData[]).map(
                  (submenu) => (
                    <p key={submenu.id}>
                      <Link
                        className="my-1.5 inline-flex gap-x-2 text-gray-300 transition-colors  hover:text-gray-50"
                        href={submenu.url}
                        target={submenu.newTab ? "_blank" : undefined}
                      >
                        {submenu.title}
                      </Link>
                    </p>
                  )
                )}
              </div>
            </div>
          ))}

        <div className="mt-5 flex flex-row items-center justify-between sm:mt-12">
          <p className="mr-6 flex flex-row flex-wrap text-sm text-gray-300 gap-2">
            Minden jog fenntartva! ©{" "}
            <span className="flex flex-wrap">
              Illés és Szabó Ügyvédi Társulás megbízásából:
              e-ingatlanügyvédek.hu Kft.
            </span>
          </p>

          <ThemeToggle isDarkBg />
        </div>
      </div>
    </footer>
  )
}
