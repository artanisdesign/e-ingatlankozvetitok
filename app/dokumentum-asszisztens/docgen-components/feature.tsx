"use client"

import { SectionImage } from "@/app/components/section-renderer/section-image"
import { SectionText } from "@/app/components/section-renderer/section-text"
import SectionRenderer from "@/app/lib/section-renderer"
import { StaticPage } from "@/app/types/pages"

export default function Feature({ data }: { data: StaticPage }) {
  const { cover, blocks = [], content } = data

  return (
    <div className="">
      <div className="mb-10 grid gap-x-12 md:grid-cols-12 lg:grid-cols-12">
        <div className="grid place-content-start md:col-span-12 md:mt-12 lg:col-span-6 lg:pt-0">
          <SectionText text={content} mustRender={true} />
        </div>
        <div className="md:col-span-12 lg:col-span-6 ">
          {cover && (
            <SectionImage image={cover} height="cover" isPriority={true} />
          )}
        </div>
      </div>
      <div>
        <SectionRenderer blocks={blocks} />
      </div>
    </div>
  )
}
