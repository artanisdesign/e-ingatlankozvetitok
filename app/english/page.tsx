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
  const authors = await getAllAuthors()
  const posts = await getAllEnglishPosts()
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

      <section className="mx-auto max-w-7xl items-start gap-8 md:grid md:grid-cols-2">
        <div className="mb-10 flex flex-col items-start justify-center rounded-xl bg-gray-50/80 p-8 dark:bg-gray-900/60 lg:mb-6 lg:items-start">
          <h2 className=" text-left text-lg font-bold leading-tight tracking-tight text-teal-500 lg:text-2xl">
            Full-service legal assistance
          </h2>
          <ul className="mt-4 min-w-[280px] space-y-4 text-sm">
            <li className="flex space-x-2">
              <Icons.check className="size-7 text-teal-500" />
              <span className=" pl-2 text-lg leading-7">
                Legal due diligence
              </span>
            </li>
            <li className="flex space-x-2">
              <Icons.check className="size-7 text-teal-500" />
              <span className=" pl-2 text-lg leading-7">
                Customized contract drafting
              </span>
            </li>
            <li className="flex space-x-2">
              <Icons.check className="size-7 text-teal-500" />
              <span className=" pl-2 text-lg leading-7">
                Efficient property registration
              </span>
            </li>
            <li className="flex space-x-2">
              <Icons.check className="size-7 text-teal-500" />
              <span className=" pl-2 text-lg leading-7">
                Local building regulations
              </span>
            </li>
          </ul>
        </div>
        <div className="mb-6 flex flex-col items-start justify-center rounded-xl bg-gray-50/80 p-8 dark:bg-gray-900/60 lg:items-start">
          <h2 className=" text-left text-lg font-bold leading-tight tracking-tight text-teal-500 lg:text-2xl">
            5+ locations across Hungary
          </h2>
          <ul className="mt-4 min-w-[280px] space-y-4  text-sm">
            <li className="flex space-x-2">
              <Icons.check className="size-7 text-teal-500" />
              <span className=" pl-2 text-lg leading-7">Budapest</span>
            </li>
            <li className="flex space-x-2">
              <Icons.check className="size-7 text-teal-500" />
              <span className=" pl-2 text-lg leading-7">Szeged</span>
            </li>
            <li className="flex space-x-2">
              <Icons.check className="size-7 text-teal-500" />
              <span className=" pl-2 text-lg leading-7">Pécs</span>
            </li>
            <li className="flex space-x-2">
              <Icons.check className="size-7 text-teal-500" />
              <span className=" pl-2 text-lg leading-7">Kaposvár and more</span>
            </li>
          </ul>
        </div>
      </section>

      <div className="mx-auto mb-10  py-10  lg:py-14">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="lg:w-3/4">
            <h2 className="text-3xl font-bold lg:text-4xl">
              20+ Expert Partners Across Hungary
            </h2>
            <p className="mt-3 leading-relaxed">
              Our network includes over 20 seasoned property lawyers, each
              skilled in offering comprehensive legal support. Our partners are
              not just experts in property law - they provide:
            </p>
          </div>

          <div className="space-y-6 lg:space-y-10">
            <div className="flex">
              <div className="ms-5 sm:ms-8">
                <h3 className="text-base font-semibold text-gray-900 dark:text-neutral-200 sm:text-lg">
                  Negotiation Assistance
                </h3>
                <p className="mt-1 text-gray-600 dark:text-neutral-400">
                  Leverage our deep understanding of the local market. We
                  advocate on your behalf with sellers, buyers, and realtors,
                  ensuring you get the best possible terms in your transactions.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="ms-5 sm:ms-8">
                <h3 className="text-base font-semibold text-gray-900 dark:text-neutral-200 sm:text-lg">
                  Bilingual Drafting
                </h3>
                <p className="mt-1 text-gray-600 dark:text-neutral-400">
                  Whether you&apos;re a local or an international client, our
                  legal documents are meticulously drafted in both Hungarian and
                  English to ensure clarity and precision.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="ms-5 sm:ms-8">
                <h3 className="text-base font-semibold text-gray-900 dark:text-neutral-200 sm:text-lg">
                  Tax Advice
                </h3>
                <p className="mt-1 text-gray-600 dark:text-neutral-400">
                  Navigate the complexities of property-related taxes in Hungary
                  with expert guidance tailored to your financial advantages.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EnglishPricing />

      <h2 className="mb-10 text-3xl font-bold lg:text-4xl">Offices</h2>
      <div className="my-10 overflow-hidden rounded-lg">
        <iframe
          src="https://www.google.com/maps/d/embed?mid=1FiugrTxe0Zv3bZ3Rhe5QYXrMRVLdQd0&ehbc=2E312F&noprof=1"
          width="100%"
          height="600"
          loading="lazy"
        ></iframe>
      </div>

      <div className="mx-auto my-20 max-w-7xl text-center lg:mb-20">
        <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          RealEstateBlog
        </h2>
        <p className="mt-1 text-gray-600 dark:text-gray-400 md:text-lg lg:text-xl">
          Discover expert insights and the latest trends in the Hungarian
          residential real estate market with our dedicated blog—your trusted
          resource for making informed property decisions.
        </p>
      </div>
      <div className="mb-20 grid gap-10 lg:grid-cols-2 xl:gap-y-16">
        {posts.map(
          (post, index) =>
            index > 0 && <BlogThumbnailGrid post={post} key={post.id} />
        )}
      </div>

      <ContactFormEnglish />
    </section>
  )
}
