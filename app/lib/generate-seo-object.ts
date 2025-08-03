import { Metadata } from "next"

import { siteConfig } from "@/config/site"

import { BlogPost } from "../types/blog"
import { GlobalAttributes } from "../types/globals"
import { Author, StaticPage } from "../types/pages"

interface onlyTitle {
  title: string
  author?: any
  seo?: any
}

export function generateSeoObject(
  metaGlobal: GlobalAttributes,
  entity:
    | StaticPage
    | null
    | BlogPost
    | Partial<BlogPost>
    | onlyTitle
    | Partial<StaticPage>,
  fullSlug: string
) {
  //default
  const generatedMetadata: Metadata = {
    ...siteConfig.defaultSeo,
    openGraph: {
      ...(siteConfig.defaultSeo.openGraphDefaults ?? {}),
    },
  }

  if (metaGlobal) {
    generatedMetadata.description = metaGlobal.siteDescription
    generatedMetadata.title = metaGlobal.siteTitle
    if (generatedMetadata.openGraph) {
      generatedMetadata.openGraph.title = metaGlobal.siteTitle
      generatedMetadata.openGraph.description = metaGlobal.siteDescription
    }
  }

  const entityTitle = entity?.title ?? null

  if (entityTitle) {
    generatedMetadata.title = entityTitle
    if (generatedMetadata.openGraph) {
      generatedMetadata.openGraph.title = entityTitle + " | " + siteConfig.name
    }
  }

  if (fullSlug) {
    if (generatedMetadata.openGraph) {
      generatedMetadata.openGraph.url =
        siteConfig.defaultSeo.url + "/" + fullSlug
    }
  }
  if (fullSlug) {
    generatedMetadata.alternates = {
      canonical: "/" + fullSlug,
    }
  }

  if (entity && entity.seo) {
    const {
      metaTitle,
      metaDescription,
      metaImage,
      keywords = "",
      metaSocial = [],
    } = entity.seo

    if (metaTitle) {
      generatedMetadata.title = metaTitle
      if (generatedMetadata.openGraph) {
        generatedMetadata.openGraph.title = metaTitle + " | " + siteConfig.name
      }
    }
    if (keywords) {
      generatedMetadata.keywords = keywords
    }
    if (entity && entity.author) {
      const author = entity.author
      generatedMetadata.authors = [
        {
          name: (author.prefix ?? "") + " " + author.name,
          url: siteConfig.url + "/ingatlan-ugyved/" + author.slug,
        },
      ]
    }

    if (metaDescription) {
      generatedMetadata.description = metaDescription
      if (generatedMetadata.openGraph) {
        generatedMetadata.openGraph.description = metaDescription
      }
    }

    if (metaImage && metaImage.formats) {
      if (generatedMetadata.openGraph) {
        const formats = metaImage.formats

        const format =
          formats["large"] ??
          formats["medium"] ??
          formats["small"] ??
          formats["thumbnail"] ??
          null

        if (format) {
          generatedMetadata.openGraph.images = [
            {
              url: format.url,
              width: format.width,
              height: format.height,
              alt:
                metaImage?.alternativeText ??
                generatedMetadata.openGraph?.title,
            },
          ]
        }
      }
    }

    if (metaSocial.length > 0) {
      if (generatedMetadata.openGraph) {
        generatedMetadata.openGraph.title = metaSocial[0].title
        generatedMetadata.openGraph.description = metaSocial[0].description
      }
    } else {
      if (generatedMetadata.openGraph) {
        generatedMetadata.openGraph.title = metaTitle
        generatedMetadata.openGraph.description = metaDescription
      }
    }
  }

  return generatedMetadata
}
