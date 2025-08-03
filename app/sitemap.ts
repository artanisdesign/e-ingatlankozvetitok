// app/sitemap.js
import { MetadataRoute } from "next"
export const dynamic = 'force-static'
import { siteConfig } from "@/config/site"

import { getAllAuthors, getPageSlugs, getPostSlugs } from "./lib/api"

const URL = siteConfig.url

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getPageSlugs()
  const posts_ = await getPostSlugs()
  const authors = await getAllAuthors()

  //TODO: Double check before prod

  const postRoutes = posts_.map(({ slug, publishedAt, updatedAt }) => ({
    url: `${URL}/blog/${slug}`,
    lastModified: updatedAt || publishedAt,
  }))

  const authorRoutes = authors.map((item) => ({
    url: `${URL}/ingatlan-ugyved/${item.slug}`,
    lastModified: item.updatedAt || item.publishedAt,
  }))

  const pageRoutes = pages.map(({ slug, publishedAt, updatedAt }) => ({
    url: `${URL}/${slug}`,
    lastModified: updatedAt || publishedAt,
  }))

  const routes = ["", "/kapcsolat", "/blog", "/csapatunk", "/dokumentum-asszisztens","/english"].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }))

  return [...routes, ...postRoutes, ...pageRoutes, ...authorRoutes]
}
