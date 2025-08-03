import { Metadata } from "next"

import { BlogMainPost } from "@/app/blog/components/blog-main-post"
import { BlogThumbnailGrid } from "@/app/blog/components/blog-thumbnail"
import { PageTitle } from "@/app/components/blocks/page-title"
import { getAllPosts, getGlobals } from "@/app/lib/api"

import { generateSeoObject } from "../lib/generate-seo-object"
import { BlogPageProps } from "../types/blog"
import { BlogFeaturedPost } from "./components/blog-featured-post"

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const metaGlobal = await getGlobals()

  return generateSeoObject(
    metaGlobal,
    {
      title: "IngatlanBlog",
    },
    "blog"
  )
}

export default async function BlogPage() {
  const posts = await getAllPosts()
  const filteredPosts = posts.filter((post) => !post.isFeatured)
  const featuredPosts = posts.filter((post) => post.isFeatured)
  return (
    <main id="main" role="main">
      <div className="relative mx-auto mb-6 max-w-7xl p-6 lg:py-10">
        <PageTitle title="IngatlanBlog" />
        <BlogMainPost post={filteredPosts[0]} />
        <BlogFeaturedPost post={featuredPosts[0]} />
        <div className="grid gap-10 lg:grid-cols-2 xl:gap-y-16">
          {filteredPosts.map(
            (post, index) =>
              index > 0 && <BlogThumbnailGrid post={post} key={post.id} />
          )}
        </div>
      </div>
    </main>
  )
}
