import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

//import Script from "next/script"
//import { ArticleJsonLd } from "next-seo"

import { siteConfig } from "@/config/site"
import {
  getAllPosts,
  getGlobals,
  getPageBySlug,
  getPageSlugs,
  getRecommendedArticles,
} from "@/app/lib/api"
import { StaticPageProps } from "@/app/types/pages"

import { ReturnToBlogButton } from "../blog/components/blog-button"
import { BlogThumbnailSidebar } from "../blog/components/blog-thumbnail"
import { AuthorCard } from "../components/blocks/author-card"
import { FAQSection } from "../components/blocks/faq-section"
import { PageTitle } from "../components/blocks/page-title"
import TOC from "../components/blocks/toc"
import { ClientRun } from "../components/client-run"
import { Contract } from "../components/header/contract-offer"
import { Icons } from "../components/icons"
import SzaLogo from "../components/icons/SzaLogo"
import { SectionImage } from "../components/section-renderer/section-image"
import { SectionText } from "../components/section-renderer/section-text"
import { Card, CardHeader, CardTitle } from "../components/ui/card"
import { HelpCard } from "../components/ui/help-card"
import { generateSeoObject } from "../lib/generate-seo-object"
import getHeadings from "../lib/getHeadings"
import { getImageWithPlaceholder } from "../lib/image-with-placeholder"
import SectionRenderer from "../lib/section-renderer"
import { Category, StaticPageCategory } from "../types/blog"

export async function generateStaticParams() {
  return await getPageSlugs()
}

export async function generateMetadata(
  props: StaticPageProps
): Promise<Metadata> {
  const params = await props.params
  const metaGlobal = await getGlobals()
  const page = await getPageBySlug(params.slug)

  return generateSeoObject(metaGlobal, page, params.slug)
}

export default async function StaticPageDetails(props: StaticPageProps) {
  const params = await props.params
  const { slug } = params

  const page = await getPageBySlug(slug)

  const posts = await getAllPosts(5)
  if (!page) {
    notFound()
  }

  const {
    cover,
    blocks = [],
    isSummaryPage = false,
    fullWidthCover = false,
    author,
  } = page || {}

  let extraCategories

  if (isSummaryPage) {
    const page = await getPageBySlug(slug, true)
    if (page?.page_categories) {
      extraCategories = page.page_categories
    }
  }

  const recommendations = getRecommendedArticles(page?.documentId)

  const cats =
    extraCategories && extraCategories.length > 0 ? extraCategories : []

  const { static_pages } = (cats[0] && cats[0]) ?? {
    static_pages: null,
  }
  let categories = static_pages ?? []

  categories = categories.filter((category: Category) => category.slug !== slug)

  const imageURL =
    cover && cover && cover.formats.large?.url ? cover.formats.large?.url : ""
  const isDifferentHeader =
    cover && !fullWidthCover && !isSummaryPage ? true : false

  let _base64

  try {
    if (cover?.formats.thumbnail?.url) {
      const { base64 } = await getImageWithPlaceholder(
        cover?.formats.thumbnail?.url ?? ""
      )
      _base64 = base64
    }
  } catch (e) {}

  const { content, blocks: newBlocks = [], headings } = await getHeadings(page)

  return (
    <article className="relative mx-auto mb-6 max-w-7xl p-6 lg:py-10">
      {author && (
        <script
          type="application/ld+json"
          id="article-schema"
          dangerouslySetInnerHTML={{
            __html: `
            {
              "@context": "https://schema.org",
              "@type": "Article",
              "datePublished": "${page.publishedAt}",
              "description": "${page.seo?.metaDescription ?? ""}",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "${siteConfig.url + "/" + page.slug}"
              },
              "headline": ${JSON.stringify(page.title)},
              "image": [
                "${imageURL}"
              ],
              "dateModified": "${page.updatedAt}",
              "publisher": {
                "@type": "Organization",
                "name": "${siteConfig.name}",
                "url":"${siteConfig.url}",
                "logo":"${siteConfig.url + "/logo.svg"}"
              },
              "author": [
                {
                  "@type": "Person",
                  "name": "${author.name}",
                  "honorificPrefix": "${author.prefix ?? ""}",
                  "email": "${author?.email}",
                  "url": "${
                    siteConfig.url + "/ingatlan-ugyved/" + author.slug
                  }",
                  "sameAs": [${author.sameAsLinks
                    .split(",")
                    .map((link) => `"${link.trim()}"`)}]
                }
              ],
              "isAccessibleForFree": true
            }
                `,
          }}
        ></script>
      )}

      {!isDifferentHeader && cover && (
        <SectionImage
          image={cover}
          isPriority={true}
          noCaption
          base64={_base64}
          fullWidth={true}
          hideOnSmall={true}
        />
      )}

      {isDifferentHeader && (
        <div className="mb-10 grid gap-x-12 md:grid-cols-12 lg:grid-cols-12">
          <div className="grid place-content-start md:col-span-12 md:mt-12 lg:col-span-6 lg:pt-8">
            <PageTitle title={page?.title} />
            <SectionText text={content} mustRender={true} />
          </div>
          <div className="md:col-span-12 lg:col-span-6">
            {cover && (
              <SectionImage
                image={cover}
                height="cover"
                isPriority={true}
                base64={_base64}
                hideOnSmall={true}
              />
            )}
          </div>
        </div>
      )}

      <div className="gap-20 lg:grid lg:grid-cols-12">
        {page && (
          <div className="lg:col-span-8">
            {!isDifferentHeader && (
              <>
                <PageTitle title={page?.title} />
                <SectionText text={page.content} />
              </>
            )}

            {!isSummaryPage && (
              <>
                {/* <div className="lg:hidden">
                  <MobileBanner />
                </div>*/}

                <span className="flex w-full flex-col pb-10 lg:hidden">
                  <TOC headings={headings} />
                </span>
              </>
            )}

            <div className="content-visibility-visible sm:content-visibility-visible">
              <SectionRenderer blocks={newBlocks} />
            </div>

            {isSummaryPage && categories.length > 0 && (
              <div className="grid gap-6 pt-4 content-visibility-auto sm:content-visibility-visible 2xl:grid-cols-1">
                {categories.map((category: Category) => (
                  <Link
                    href={"/" + category.slug}
                    key={category.id}
                    className="group"
                  >
                    <Card className="bg-gray-50/50 py-4 transition group-hover:translate-y-1 group-hover:shadow-md dark:bg-gray-950">
                      <CardHeader className="relative flex  h-full flex-row  items-center justify-between">
                        <CardTitle className="mr-2 text-lg transition-all group-hover:text-teal-500 sm:text-2xl ">
                          {(category as unknown as StaticPageCategory).title}
                        </CardTitle>
                        <Icons.arrowRight className="size-8 shrink-0 text-teal-200 transition ease-in-out group-hover:text-amber-500 dark:text-teal-900" />
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            )}

            {author && (
              <AuthorCard
                author={author}
                publishedAt={page.publishedAt}
                updatedAt={page.updatedAt}
              ></AuthorCard>
            )}
            {!author && <hr className="my-20"></hr>}

            <div className="mt-12 grid gap-4 content-visibility-auto sm:grid-cols-2 sm:content-visibility-visible">
              <HelpCard
                title="Vevőknek"
                subtitle="Ha ingatlant venne itt találja a tudnivalókat"
                link="/ingatlan-tudnivalok-vevoknek"
                icon={<Icons.scrollText className="size-10 p-1" />}
              />

              <HelpCard
                title="Eladóknak"
                subtitle="Eladóként itt juthat hasznos tanácsokhoz"
                link="/ingatlan-tudnivalok-eladoknak"
                icon={<Icons.landmark className="size-10 p-1" />}
              />

              <HelpCard
                title="Tudásbázis"
                subtitle="Válaszok a leggyakoribb kérdésekre"
                link="/tudasbazis"
                icon={<Icons.bookOpen className="size-10 p-1" />}
              />
              <HelpCard
                title="IngatlanBlog"
                subtitle="Amit az ingatlanokról tudni érdemes"
                link="/blog"
                icon={<Icons.newspaper className="size-10 p-1" />}
              />
              <HelpCard
                title="Ügyvédeknek"
                subtitle="Együttműködési lehetőségek "
                link="/szoftver-ugyvedeknek"
                icon={<Icons.scale className="size-10 p-1" />}
              />
              <HelpCard
                title="Szerződés Asszisztens"
                subtitle="A szerződés író szoftver"
                link="https://szerzodes-asszisztens.hu"
                basicLink={true}
                newPage={true}
                icon={<SzaLogo className="size-11 p-1" />}
              />
            </div>
          </div>
        )}

        <div className="hidden space-y-4 content-visibility-hidden  lg:col-span-4 lg:block lg:content-visibility-visible">
          {!isSummaryPage && <TOC headings={headings} />}

          <p className="mb-5 pt-6 text-xl font-semibold text-gray-800 dark:text-gray-300">
            Legutóbbi bejegyzések
          </p>
          <div className="grid grid-cols-1 gap-y-8">
            {posts.map((post, i) => (
              <BlogThumbnailSidebar post={post} key={i} />
            ))}
            <ReturnToBlogButton title="További cikkek" isForward={true} />
            <p className="mb-0 pt-6 text-xl font-semibold text-gray-800 dark:text-gray-300">
              Ajánlatunk
            </p>
            <div className="p-5 pt-0">
              <Contract />
            </div>
          </div>
        </div>
      </div>
      {page.faq && page.faq.length > 0 && <FAQSection data={page.faq} />}
      <ClientRun />
    </article>
  )
}
