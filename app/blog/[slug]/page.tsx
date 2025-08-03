import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { BreadcrumbJsonLd } from "next-seo"
import readingTime from "reading-time"

import { siteConfig } from "@/config/site"
import { ReturnToBlogButton } from "@/app/blog/components/blog-button"
import { BlogThumbnailSidebar } from "@/app/blog/components/blog-thumbnail"
import { AuthorCard } from "@/app/components/blocks/author-card"
import { FAQSection } from "@/app/components/blocks/faq-section"
import { PageTitle } from "@/app/components/blocks/page-title"
import RelatedArticles from "@/app/components/blocks/related-articles"
import SearchBlock from "@/app/components/blocks/search-block"
import TOC from "@/app/components/blocks/toc"
import { Contract } from "@/app/components/header/contract-offer"
import { SectionImage } from "@/app/components/section-renderer/section-image"
import { SectionText } from "@/app/components/section-renderer/section-text"
import { Badge } from "@/app/components/ui/badge"
import {
  getAllPosts,
  getGlobals,
  getPostBySlug,
  getPostSlugs,
  getRecommendedArticles,
} from "@/app/lib/api"
import { generateSeoObject } from "@/app/lib/generate-seo-object"
import getHeadings from "@/app/lib/getHeadings"
import { getImageWithPlaceholder } from "@/app/lib/image-with-placeholder"
import SectionRenderer from "@/app/lib/section-renderer"
import { formatDate } from "@/app/lib/utils"
import { BlogPageProps, Category } from "@/app/types/blog"

export async function generateStaticParams() {
  return await getPostSlugs()
}

export async function generateMetadata(
  props: BlogPageProps
): Promise<Metadata> {
  const params = await props.params
  const metaGlobal = await getGlobals()
  const page = await getPostBySlug(params.slug)

  return generateSeoObject(metaGlobal, page, "blog/" + params.slug)
}

export default async function BlogDetailsPage(props: BlogPageProps) {
  const params = await props.params

  const { slug, documentId } = params

  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const recommendations = getRecommendedArticles(post?.documentId)

  //TODO: move this out to a helper function
  let textContent = post.content

  post.blocks.forEach((block) => {
    if (block.__component === "shared.rich-text") {
      textContent += block.body
    }
  })

  const stats = readingTime(textContent)

  const posts = await getAllPosts(6, post.slug)

  const { cover, blocks = [], author } = post

  const authorFullName = (author?.prefix ?? "") + " " + author.name

  const imageURL =
    cover && cover.formats.large?.url ? cover.formats.large?.url : ""

  let _base64

  try {
    if (cover?.formats.thumbnail?.url) {
      const { base64 } = await getImageWithPlaceholder(
        cover?.formats.thumbnail?.url ?? ""
      )
      _base64 = base64
    }
  } catch (e) {}

  const { content, blocks: newBlocks = [], headings } = await getHeadings(post)

  return (
    <article className="mx-auto mb-6 grid max-w-7xl gap-y-6 p-6 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-0 lg:py-10">
      {/* SEO */}
      <script
        type="application/ld+json"
        id="article-schema"
        dangerouslySetInnerHTML={{
          __html: `
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "datePublished": "${post.publishedAt}",
            "description": ${JSON.stringify(post.description)},
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "${siteConfig.url + "/blog/" + post.slug}"
            },
            "headline": ${JSON.stringify(post.title)},
            "image": [
              "${imageURL}"
            ],
            "dateModified": "${post.updatedAt}",
            "publisher": {
              "@type": "Organization",
              "name": "${siteConfig.name}",
              "url":"${siteConfig.url}",
              "logo":"${siteConfig.url + "/logo.svg"}"
            },
            "author": [
              {
                "@type": "Person",
                "name": "${author?.name ?? ""}",
                "email": "${author?.email ?? ""}",
                "honorificPrefix": "${author?.prefix ?? ""}",
                "url": "${siteConfig.url + "/ingatlan-ugyved/" + author?.slug}",
                "sameAs": [${(author?.sameAsLinks ?? "")
                  .split(",")
                  .map((link) => `"${link.trim()}"`)}]
              }
            ],
            "isAccessibleForFree": true
          }
              `,
        }}
      ></script>
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: "Blog",
            item: siteConfig.url + "/blog",
          },
          {
            position: 2,
            name: post.title,
            item: siteConfig.url + "/blog/" + post.slug,
          },
        ]}
        useAppDir={true}
      />

      <div className="col-span:3 relative w-full max-w-full lg:col-span-2">
        {/* authorlink*/}
        <Link
          href={"/ingatlan-ugyved/" + author.slug}
          className="group mb-6 flex flex-row items-center space-x-2 text-sm content-visibility-visible"
        >
          <Image
            src={author?.avatar?.url ?? ""}
            alt={author?.avatar?.alternativeText ?? "e-ingatlankozvetitok.hu"}
            width={48}
            height={48}
            sizes="(max-width: 768px) 48px, (max-width: 1200px) 48px, 48px"
            className="my-0 size-12 rounded-full bg-slate-400 ring-1 ring-gray-300/50 transition-all group-hover:ring-2 group-hover:ring-teal-500"
          />

          <div className="flex flex-col text-left leading-tight">
            <p className="m-1 text-sm font-semibold transition-colors group-hover:text-teal-500">
              {authorFullName}
            </p>
            <p className="m-1 break-words text-[12px] text-muted-foreground">
              {post?.publishedAt && (
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              )}
              {" • "}
              {Math.round(stats.minutes)} perc olvasás
              {post?.updatedAt &&
                formatDate(post.publishedAt) !== formatDate(post.updatedAt) && (
                  <time dateTime={post.updatedAt} className="flex sm:inline">
                    <span className="hidden sm:inline">{" • "}</span>
                    Frissítve: {formatDate(post.updatedAt)}
                  </time>
                )}
            </p>
          </div>
        </Link>

        <PageTitle title={post.title} />

        {cover && (
          <SectionImage
            image={cover}
            isPriority={true}
            base64={_base64}
            hideOnSmall={true}
          />
        )}
        {post && <SectionText text={content} mustRender={true} />}

        <span className="flex w-full flex-col pb-10 content-visibility-auto sm:content-visibility-visible lg:hidden lg:content-visibility-hidden">
          <TOC headings={headings} />
        </span>
        <span className="flex w-full flex-col hyphens-auto content-visibility-visible sm:content-visibility-visible">
          <SectionRenderer blocks={newBlocks} />
        </span>

        {post.categories && (
          <div className="mt-4 flex flex-col flex-wrap gap-4 content-visibility-auto sm:content-visibility-visible">
            <p className="text-sm text-gray-500">Kategóriák:</p>
            <div className="flex flex-row flex-wrap gap-4">
              {post.categories.map((category: Category, index: number) => (
                <Badge
                  variant="secondary"
                  className="text-xs md:text-sm"
                  size={"lg"}
                  key={index}
                >
                  {(category as Category).name}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {author && <AuthorCard author={author}></AuthorCard>}
      </div>

      <div className="hidden content-visibility-hidden lg:col-span-1 lg:block lg:content-visibility-visible">
        <TOC headings={headings} />
        <p className="mb-5  pt-6 text-xl font-semibold text-gray-800 dark:text-gray-300">
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

      <div className="content-visibility-auto sm:content-visibility-visible lg:col-span-3">
        {post && post.faq.length > 0 && <FAQSection data={post.faq} />}
      </div>
    </article>
  )
}
