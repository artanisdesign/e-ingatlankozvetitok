import { Author, Block, FAQ } from "./pages"

export interface BlogPageProps {
  params: Promise<{
    slug: string
    publishedAt: string
    updatedAt: string
    documentId: string
    id: string
  }>
}
export interface BlogPagePropsStatic {
  params: {
    slug: string
    publishedAt: string
    updatedAt: string
    documentId: string
    id: string
  }
}

export interface BlogPost {
  id: string
  documentId: string
  title: string
  description: string
  content: string
  publishedAt: string
  slug: string
  createdAt: string
  updatedAt: string
  cover?: Image
  seo?: SEO
  author: Author
  faq: FAQ[]
  blocks: Block[]
  categories: Category[]
  isFeatured?: boolean
}

export interface Category {
  id: number
  name: string
  slug: string
  description: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}
export interface StaticPageCategory {
  id: number
  title: string
  content: string
  publishedAt: string
  slug: string
  createdAt: string
  updatedAt: string
}

export interface Image {
  id: number
  name: string
  alternativeText: string
  caption: string
  width: number
  height: number
  formats: Formats
  hash: string
  size: number
  url: string
  previewUrl: null
  provider: string
  createdAt: Date
  updatedAt: Date
}

export interface Formats {
  large?: ImgFormat
  small?: ImgFormat
  medium?: ImgFormat
  thumbnail?: ImgFormat
}

export interface ImgFormat {
  ext: string
  url: string
  hash: string
  name: string
  path: null
  size: number
  width: number
  height: number
}

export interface SEO {
  id?: number
  metaTitle?: string
  metaDescription?: string
  keywords?: string
  metaRobots?: null
  structuredData?: null
  metaViewport?: null
  canonicalURL?: null
  metaImage?: Image
  metaSocial?: SeoSocial[]
}

export interface SeoSocial {
  id: number
  socialNetwork: string
  title: string
  description: string
}
