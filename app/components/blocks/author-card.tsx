import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { formatDate } from "@/app/lib/utils"
import { Author } from "@/app/types/pages"

import { Icons } from "../icons"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Button } from "../ui/button"

export function AuthorCard({
  author,
  publishedAt,
  updatedAt,
}: {
  author: Author
  publishedAt?: string
  updatedAt?: string
}) {
  return (
    <div className="group mt-12 flex w-full flex-col gap-10 rounded-xl border bg-white p-6 shadow-sm transition duration-200 ease-in-out content-visibility-auto hover:shadow-md dark:border-gray-800 dark:bg-slate-900 sm:flex-row sm:content-visibility-visible md:flex-row md:p-10">
      <Avatar className="flex size-32 shrink-0 self-center ring-4 transition-all duration-500 ease-in-out group-hover:scale-110 sm:self-start">
        <Image
          src={author.avatar.url}
          alt={author.name}
          width={256}
          height={256}
          className="aspect-square size-full object-cover"
        />
        <AvatarFallback>
          {author.name
            .split(" ")
            .map((s) => s.charAt(0))
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex w-full flex-col gap-2">
        <div className="flex flex-row items-end justify-between text-sm">
          Szerző:{" "}
          <Button
            size={"lg"}
            variant={"outline"}
            className="flex rounded-lg"
            asChild
          >
            <Link href={siteConfig.url + "/csapatunk"}>
              <p className="flex font-semibold">
                Csapatunk <Icons.users className="ml-1 size-4" />
              </p>
            </Link>
          </Button>
        </div>
        <h3 className="text-2xl font-semibold">
          {author.prefix ?? ""} {author.name}
        </h3>
        <p className="hidden text-sm text-gray-500">{author.email}</p>
        <div className="prose prose-base mt-2 line-clamp-6 max-w-full dark:prose-invert">
          {author.description}
        </div>
        <Button
          size={"lg"}
          variant={"primary"}
          className="mt-5 flex w-min min-w-max rounded-lg"
          asChild
        >
          <Link href={"/ingatlan-ugyved/" + author.slug}>
            Szerzői profil <Icons.chevronRight className="ml-1 size-4" />
          </Link>
        </Button>

        <div className="text-sm text-gray-500">
          {publishedAt && (
            <>
              <hr className="my-4"></hr>
              <time dateTime={publishedAt}>
                Ez az oldal publikálva: {formatDate(publishedAt)}
              </time>
            </>
          )}
          {updatedAt &&
            publishedAt &&
            formatDate(publishedAt) !== formatDate(updatedAt) && (
              <time dateTime={updatedAt} className="inline">
                {" • "}Frissítve: {formatDate(updatedAt)}
              </time>
            )}
        </div>
      </div>
    </div>
  )
}
