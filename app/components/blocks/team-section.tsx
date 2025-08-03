import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { TeamBlock } from "@/app/types/pages"

import { Icons } from "../icons"
import { Button } from "../ui/button"
//TODO: probably we donbt need this anymore
export default function TeamSection({ data }: { data: TeamBlock }) {
  return (
    <section className="grid grid-cols-1 gap-4 py-6">
      {data.members.map((member) => (
        <div
          className="items-top rounded-lg border bg-white shadow-sm dark:border-gray-800 dark:bg-slate-900 sm:grid sm:grid-cols-8"
          key={member.id}
        >
          <div className="aspect-square w-full sm:col-span-3 sm:aspect-auto sm:h-full">
            <Image
              src={member.image.url}
              width={300}
              height={300}
              alt={
                member.image.alternativeText ?? siteConfig.name
              }
              className="size-full rounded-t-lg object-cover object-top sm:rounded-l-lg"
            />
          </div>
          <div className="p-5 sm:col-span-5">
            <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {member.name}
            </h3>
            <span className="text-gray-500 dark:text-gray-400">
              {member.subtitle}
            </span>
            <p className="mb-4 mt-3 text-sm font-light text-gray-500 dark:text-gray-400">
              {member.description}
            </p>
            {member.website && (
              <Link href={member.website} target="_blank">
                <Button variant={"outline"}>
                  <Icons.link size={16} className="mr-2"></Icons.link> honlap
                </Button>
              </Link>
            )}
          </div>
        </div>
      ))}
      <Link href={"/szoftver-ugyvedeknek"} className="col-span-1">
        <div className="group mt-4 grid h-56 grid-cols-8 items-center  rounded-lg border-4 border-dashed bg-white shadow-sm  transition duration-200 ease-in-out hover:translate-y-1 dark:border-gray-700 dark:bg-slate-900">
          <div className="col-span-3 flex size-full items-center justify-center text-[100px] opacity-10 transition group-hover:opacity-30">
            ?
          </div>
          <div className="col-span-5 p-5">
            <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Talán ön?
            </h3>
            <span className="text-gray-500 dark:text-gray-400">
              Jelentkezzen partnernek!
            </span>
            <p className="mb-4 mt-3 text-sm font-light text-gray-500 dark:text-gray-400">
              Ha ön is szeretne csatlakozni hozzánk, kattintson ide és olvasson
              ügyvédeknek szóló ajánlatunkról.
            </p>
          </div>
        </div>
      </Link>
    </section>
  )
}
