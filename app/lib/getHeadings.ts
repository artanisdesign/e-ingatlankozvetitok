import jsdom from "jsdom"

import { BlogPost } from "../types/blog"
import { Block, StaticPage } from "../types/pages"
import { slugify } from "./utils"

const { JSDOM } = jsdom

export default async function getHeadings(post: BlogPost | StaticPage) {
  let content = post.content
  const newItems: {
    id: string
    title: string
  }[] = []

  let dom = new JSDOM(post.content)
  //first on content
  const headings = Array.from(dom.window.document.getElementsByTagName("h2"))
  headings.map((p, index) => {
    const heading = p as HTMLHeadingElement
    heading.setAttribute(
      "id",
      heading.getAttribute("id") || slugify(heading.textContent + "-" + index)
    )
    newItems.push({
      id: heading.id,
      title: heading.textContent || "",
    })
  })
  post.content = dom.window.document.body.innerHTML
  //console.log(dom.window.document.querySelector("p")?.textContent)

  post.blocks?.map((element) => {
    if (element.__component === "shared.rich-text") {
      let domx = new JSDOM(`${element.body}`)
      const headings = Array.from(
        domx.window.document.getElementsByTagName("h2")
      )

      headings.map((p, index) => {
        const heading = p as HTMLHeadingElement
        heading.setAttribute(
          "id",
          heading.getAttribute("id") ||
            slugify(heading.textContent + "-" + index)
        )
        newItems.push({
          id: heading.id,
          title: heading.textContent || "",
        })
      })
      element.body = domx.window.document.body.innerHTML
    } else {
      if (element.__component === "blocks.contact-form") {
        newItems.push({
          id: "kapcsolatfelvetel",
          title: "Kapcsolatfelvétel",
        })
      }

      return element
    }
  })

  if (post.faq && post.faq.length > 0) {
    newItems.push({
      id: "gyakran-ismetelt-kerdesek",
      title: "Gyakran ismételt kérdések",
    })
  }

  return {
    content: content,
    headings: newItems,
    blocks: post.blocks,
  }
}
