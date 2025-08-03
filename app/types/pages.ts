import { Category, Image, SEO } from "./blog"

export interface StaticPageProps {
  params: Promise<{
    slug: string
    publishedAt: string
    updatedAt: string
    documentId: string
    id: string
  }>
}

export interface StaticPage {
  title: string
  documentId: string
  id: string
  content: string
  publishedAt: string
  slug: string
  createdAt: string
  updatedAt: string
  cover?: Image
  seo?: SEO
  blocks?: Block[]
  faq: FAQ[]
  author: Author
  isSummaryPage: boolean | null
  fullWidthCover: boolean | null
  page_categories: {
    id: string
    name: string
    slug: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    static_pages: Category[]
  }[]
}

export interface FAQ {
  question: string
  answer: string
  id: number
}

export interface Author {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  university: string
  chamber: string
  chamber_number: string
  experience: string
  office_url: string
  sameAsLinks: string
  avatar: Image
  description?: string
  prefix: string
  slug: string
}

export interface FAQ {
  question: string
  answer: string
  id: number
}

export interface Block {
  id_: string
  __component:
    | "shared.rich-text"
    | "shared.media"
    | "shared.quote"
    | "blocks.our-team"
    | "blocks.features"
    | "blocks.two-image-hero"
    | "blocks.testimonials"
    | "blocks.contact-form"
    | "blocks.team"
    | "blocks.bank-account-picker"
    | "calculators.ujepitesu-lakasok-jotallas"
    | "calculators.country-select"
    | "calculators.lawyer-fee"
    | "blocks.alert-box"
    | "blocks.basic-cta"
    | "blocks.outlined-feature"
    | "shared.youtube-video"

  title?: string
  body?: string
  file?: Image
  type?: string
  isPortrait?: boolean
  isCompare?: boolean
  author?: Author
}

export interface TeamBlock extends Block {
  __component: "blocks.team"
  members: {
    id: string
    name: string
    description: string
    subtitle: string
    image: Image
    website?: string
  }[]
}

export interface FeaturesBlock extends Block {
  __component: "blocks.features"
  description: string
  features: {
    id: string
    title: string
    description: string
    icon: string
  }[]
}

export interface OutlinedFeature extends Block {
  __component: "blocks.outlined-feature"
  description: string
  description2?: string
  images?: Image[]
}

export interface TwoImageHeroBlock extends Block {
  __component: "blocks.two-image-hero"
  description: string
  description2?: string
  images: Image[]
}

export interface OurTeamBlock extends Block {
  __component: "blocks.our-team"
  description: string
  description2?: string
  url: string
  Images: Image[]
}

export interface TestimonialsBlock extends Block {
  __component: "blocks.testimonials"
  description: string
  testimonials: {
    id: string
    body: string
    name: string
    location: string
  }[]
}

export interface AlertBoxBlock extends Block {
  __component: "blocks.alert-box"
  description: string
}

export interface BasicCTABlock extends Block {
  __component: "blocks.basic-cta"
  description: string
  buttonText?: string
  buttonLink?: string
  topText?: string
}

export interface YoutubeBlockData extends Block {
  __component: "shared.youtube-video"
  description: string
  youtubeId: string
}
