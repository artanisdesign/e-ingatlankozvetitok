import { getAllPosts, getFeaturedPost } from "@/app/lib/api"

import { ReturnToBlogButton } from "../blog/components/blog-button"
import { BlogFeaturedPost } from "../blog/components/blog-featured-post"
import { BlogMainPost } from "../blog/components/blog-main-post"
import { BlogThumbnailGrid } from "../blog/components/blog-thumbnail"

export default async function BlogArticles() {
  const posts = await getAllPosts(8)
  const featuredPosts = await getFeaturedPost()
  let filteredPosts = posts.filter((post) => !post.isFeatured)
  //if filteredPosts is 7 item, remove the last one
  if (filteredPosts.length === 8) {
    filteredPosts.pop()
  }

  return (
    <section className="bg-zinc-100/60 py-12  dark:bg-teal-950/20 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
       
        <div className="mx-auto mb-10 max-w-7xl text-center lg:mb-20">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            IngatlanBlog
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400 md:text-lg lg:text-xl">
            Mindent, amit az ingatlanokról és az ingatlanpiacról tudni érdemes!
          </p>
        </div>
        <BlogFeaturedPost post={featuredPosts[0]} />
        <BlogMainPost post={filteredPosts[0]} />
        <div className="mb-20 grid gap-10 lg:grid-cols-2 xl:gap-y-16">
          {filteredPosts.map(
            (post, index) =>
              index > 0 && <BlogThumbnailGrid post={post} key={post.id} />
          )}
        </div>
        <ReturnToBlogButton title="További cikkek" isForward={true} />
      </div>
    </section>
  )
}
