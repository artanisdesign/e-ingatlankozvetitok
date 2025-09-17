import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { BlogThumbnailGrid } from "../blog/components/blog-thumbnail"
import ContactFormEnglish from "../components/blocks/contact-form-english"
import { EnglishPricing } from "../components/blocks/english-pricing"
import { Icons } from "../components/icons"
import { SectionImage } from "../components/section-renderer/section-image"
import {
  getAllAuthors,
  getAllEnglishPosts,
  getGlobals,
  getPageBySlug,
} from "../lib/api"
import { generateSeoObject } from "../lib/generate-seo-object"
import getHeadings from "../lib/getHeadings"
import { getImageWithPlaceholder } from "../lib/image-with-placeholder"
import { cn } from "../lib/utils"

const slug = "english"

export async function generateMetadata(): Promise<Metadata> {
  const metaGlobal = await getGlobals()
  const page = await getPageBySlug(slug)

  return generateSeoObject(metaGlobal, page, slug)
}

export default async function EnglishPage() {
  const page = await getPageBySlug(slug)
  //const authors = await getAllAuthors()
  //const posts = await getAllEnglishPosts()
  if (!page) {
    notFound()
  }
  const { cover, title = "" } = page

  let _base64

  try {
    if (cover?.formats.thumbnail?.url) {
      const { base64 } = await getImageWithPlaceholder(
        cover?.formats.thumbnail?.url ?? ""
      )
      _base64 = base64
    }
  } catch (e) {}

  const { content } = await getHeadings(page)

  return (
    <section className="relative mx-auto max-w-7xl p-6 lg:py-10">
      <h1 className="my-4 text-center text-3xl font-extrabold leading-tight tracking-tight content-visibility-visible max-[360px]:text-2xl md:text-4xl lg:text-left lg:text-5xl">
        {title}
      </h1>

      <div className="mb-10 grid gap-x-12 md:grid-cols-12 lg:grid-cols-12">
        <div className="grid place-content-start md:col-span-12  lg:col-span-6 lg:pt-8">
          <div
            className={cn(
              "my-5 pb-5 text-center text-lg font-light italic leading-normal tracking-wide lg:pt-20 lg:text-2xl"
            )}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        <div className="md:col-span-12 lg:col-span-6 ">
          {cover && (
            <SectionImage
              image={cover}
              height="cover"
              isPriority={true}
              base64={_base64}
            />
          )}
        </div>
      </div>
 



      <ContactFormEnglish />
    </section>
  )
}
