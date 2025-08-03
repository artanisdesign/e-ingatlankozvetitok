import { useEffect, useState } from "react"

import { slugify } from "../lib/utils"

export const useHeadingsData = () => {
  const [loading, setLoading] = useState(true)
  const [nestedHeadings, setNestedHeadings] = useState<
    { id: string; title: string; items?: { id: string; title: string }[] }[]
  >([])

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll("h2"))

    //for of
    for (const heading of headingElements) {
      const hElement = heading as HTMLElement
      const id = hElement.getAttribute("id") || slugify(hElement.innerText)

      //add the id to the heading
      hElement.setAttribute("id", id)
      hElement.id = id
      //console.log(hElement)
    }

    const newNestedHeadings = getNestedHeadings(headingElements)
    setNestedHeadings(newNestedHeadings)
    setLoading(false)
  }, [])

  return { nestedHeadings, loading }
}

const getNestedHeadings = (headingElements: any[]) => {
  const nestedHeadings: {
    id: string
    title: string
    items: { id: string; title: string }[]
  }[] = []

  headingElements.forEach((heading, index) => {
    const { innerText: title, id } = heading

    if (heading.nodeName === "H2") {
      nestedHeadings.push({ id, title, items: [] })
    } else if (heading.nodeName === "H3" && nestedHeadings.length > 0) {
      nestedHeadings[nestedHeadings.length - 1].items.push({
        id,
        title,
      })
    }
  })

  return nestedHeadings
}
