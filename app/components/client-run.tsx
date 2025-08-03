"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function ClientRun() {
  const pathname = usePathname()

  useEffect(() => {
    // console.log("ClientRun", pathname)
    if (!pathname.startsWith("/foglalo-es")) {
      return
    }

    const tables = Array.from(document.querySelectorAll("table"))

    for (const table of tables) {
      const tableElements = Array.from(
        table.querySelectorAll("thead > tr > th")
      )

      let headers = []
      for (const _table of tableElements) {
        headers.push(_table.innerHTML.replace(/(<([^>]+)>)/gi, ""))
      }
      const rowElements = Array.from(table.querySelectorAll("tbody > tr > td"))
      let i = 0
      for (const row of rowElements) {
        if (headers[i]) {
          table.classList.add("resp-table")

          row.setAttribute("data-label", headers[i])
          //set class
          row.classList.add(
            "border-b-[1px]",
            "border-gray-200",
            "dark:border-gray-800"
          )

          i++
          if (i == headers.length) {
            i = 0
          }
        }
      }
    }
  }, [pathname])

  return <></>
}
