import qs from "qs"

//import { siteConfig } from "@/config/site"
import { BlogPagePropsStatic, BlogPost } from "@/app/types/blog"
import { GlobalAttributes } from "@/app/types/globals"

import { Author, StaticPage } from "../types/pages"
import items from "./recommendations.json"

const onVercel = process.env.ON_VERCEL === "true"

const OPTIONS: RequestInit = {
  cache: onVercel ? "no-store" : "force-cache",
}

export async function getPageSlugs(): Promise<BlogPagePropsStatic["params"][]> {
  const query = qs.stringify(
    {
      //populate: "*",
      pagination: {
        pageSize: 1000,
        page: 1,
      },
      filters: {
        slug: {
          $notIn: ["csapatunk", "english"], //exclude team page
        },
      },
      fields: ["slug", "publishedAt", "updatedAt"],
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  )

  const pages = await getData("static-pages", query)

  return pages.data.map((page: any) => ({
    slug: page.slug,
    publishedAt: page.publishedAt,
    updatedAt: page.updatedAt,
  }))
}

export async function getDocumentAssistantData(): Promise<StaticPage | null> {
  const populateObject = {
    seo: { populate: "*" },
    cover: {
      populate: true,
    },
    blocks: {
      populate: "*",
    },
  }

  const query = qs.stringify(
    {
      populate: populateObject,
      pagination: {
        pageSize: 1000,
        page: 1,
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  )
  const pages = await getData("document-assistant", query)

  if (pages.data) {
    return pages.data as StaticPage
  } else {
    return null
  }
}

export async function getPageBySlug(
  slug: string,
  populateCategories = false
): Promise<StaticPage | null> {
  const populateObject = {
    seo: { populate: "*" },
    cover: {
      populate: true,
    },
    blocks: {
      populate: "*",
    },
    faq: true,
    page_categories: {
      populate: {
        static_pages: true,
      },
    },
    author: {
      populate: "avatar",
    },
  }

  const query = qs.stringify(
    {
      populate: populateObject,
      pagination: {
        pageSize: 1000,
        page: 1,
      },
      filters: {
        slug: {
          $eq: slug,
        },
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  )
  //console.log(query)
  const pages = await getData("static-pages", query)

  //console.log("ddddd", pages.data[0])

  if (pages.data.length > 0) {
    return pages.data[0] as StaticPage
  } else {
    return null
  }
}

export async function getPostSlugs(): Promise<BlogPagePropsStatic["params"][]> {
  const query = qs.stringify(
    {
      sort: ["publishedAt:asc"],
      //populate: "*",
      pagination: {
        pageSize: 1000,
        page: 1,
      },
      fields: ["slug", "publishedAt", "updatedAt", "documentId"],
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  )

  const slugs = await getData("articles", query)

  return slugs.data.map((post: any) => ({
    slug: post.slug,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    documentId: post.documentId,
    id: post.id,
  }))
}
//not being used currently
export async function getAllAuthors(
  limit: number = 1000,
  slug?: string
): Promise<Author[]> {
  const query = qs.stringify(
    {
      populate: {
        avatar: true,
      },
      sort: ["createdAt", "name"],
      pagination: {
        pageSize: limit ?? 1000,
        page: 1,
      },
      filters: {
        slug: {
          $eq: slug,
        },
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  )

  const authors = await getData("authors", query)

  return authors.data.map((author: Author) => author)
}

export async function getAuthorSlugs(): Promise<
  BlogPagePropsStatic["params"][]
> {
  const query = qs.stringify(
    {
      //populate: "*",
      pagination: {
        pageSize: 1000,
        page: 1,
      },
      fields: ["slug", "publishedAt", "updatedAt"],
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  )

  const slugs = await getData("authors", query)

  return slugs.data.map((post: any) => ({
    slug: post.slug,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
  }))
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const authors = await getAllAuthors(1, slug)

  if (authors.length > 0) {
    return authors[0]
  } else {
    return null
  }
}

export async function getAllPosts(
  limit: number = 1000,
  filteredSlug?: string,
  slug?: string,
  authorId?: string
): Promise<BlogPost[]> {
  const populateObject = {
    seo: { populate: "*" },
    cover: {
      populate: true,
    },
    blocks: {
      populate: "*",
    },
    faq: true,
    categories: true,
    author: {
      populate: "avatar",
    },
  }

  const query = qs.stringify(
    {
      sort: ["updatedAt:desc"],
      populate: populateObject,
      filters: {
        slug: {
          $nei: filteredSlug,
          $eq: slug,
        },
        author: {
          id: {
            $eq: authorId,
          },
        },
      },
      pagination: {
        pageSize: limit ?? 1000,
        page: 1,
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  )

  const posts = await getData("articles", query)

  return posts.data.map((post: any) => ({
    ...post,
    id: post.id,
  }))
}

export async function getFeaturedPost(limit: number = 1): Promise<BlogPost[]> {
  const populateObject = {
    seo: { populate: "*" },
    cover: {
      populate: true,
    },
    author: {
      populate: "avatar",
    },
  }

  const query = qs.stringify(
    {
      sort: ["updatedAt:desc"],
      populate: populateObject,
      filters: {
        isFeatured: {
          $eq: true,
        },
      },
      pagination: {
        pageSize: limit ?? 1000,
        page: 1,
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  )

  const posts = await getData("articles", query)

  return posts.data.map((post: any) => ({
    ...post,
    id: post.id,
  }))
}
export async function getAllEnglishPosts(
  limit: number = 1000
): Promise<BlogPost[]> {
  const populateObject = {
    cover: {
      populate: true,
    },
    seo: { populate: "*" },
    blocks: {
      populate: "*",
    },
    categories: true,
    author: {
      populate: "avatar",
    },
  }

  const query = qs.stringify(
    {
      sort: ["updatedAt:desc"],
      populate: populateObject,
      filters: {
        categories: {
          slug: {
            $eq: "english-content",
          },
        },
      },
      pagination: {
        pageSize: limit ?? 1000,
        page: 1,
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  )

  const posts = await getData("articles", query)

  return posts.data.map((post: any) => ({
    ...post,
    id: post.id,
  }))
}

export async function getPostsByAuthor(
  authorId: string,
  limit: number = 3
): Promise<BlogPost[] | null> {
  const posts = await getAllPosts(limit, undefined, undefined, authorId)
  return posts
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts(1, undefined, slug)

  if (posts.length > 0) {
    return posts[0]
  } else {
    return null
  }
}

export async function getGlobals(
  limit: number = 1000
): Promise<GlobalAttributes> {
  const query = qs.stringify(
    {
      pLevel: 4,
      pagination: {
        pageSize: limit ?? 1000,
        page: 1,
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  )

  const globals = await getData("global", query)
  //console.log("globals", globals)

  return globals.data as GlobalAttributes
}

async function getData(url: string, query: string) {
  return await fetch(`${process.env.STRAPI_URL}/api/${url}?${query}`, OPTIONS)
    .then((res) => res.json())
    .then((data) => data)
}

export function getRecommendedArticles(documentId: string) {
  const found = items.find((item: any) => item.doc_id === documentId)

  const recommendations =
    found?.recommendations.filter(
      (item: any) =>
        !item.title.includes(".hu") &&
        !item.slug.includes("adatvedelem") &&
        !item.slug.includes("importance") &&
        !item.slug.includes("legal") &&
        !item.slug.includes("hungar") &&
        !item.slug.includes("lawyer") &&
        !item.slug.includes("aszf")
    ) || []

  return recommendations.sort(() => Math.random() - 0.5).splice(0, 6)
}
