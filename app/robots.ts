import { MetadataRoute } from "next"
export const dynamic = 'force-static'
const notOnVercel = process.env.ON_VERCEL !== "true"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: !notOnVercel ? "/" : undefined,
      allow: notOnVercel ? "/" : undefined,
    },
    sitemap: notOnVercel
      ? "https://e-ingatlankozvetitok.hu/sitemap.xml"
      : undefined,
  }
}
