"use client"

import { FAQ } from "@/app/types/pages"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"

export default function FaqAccordion({ data = [] }: { data: FAQ[] }) {
  return (
    <Accordion type="single" collapsible defaultValue="0">
      {data.map((faq, index) => (
        <AccordionItem value={"" + index} key={"" + index}>
          <AccordionTrigger className=" group inline-flex w-full items-center justify-between gap-x-3 py-6 text-left font-semibold text-gray-800 transition hover:text-gray-500 hover:no-underline dark:text-gray-200 dark:hover:text-gray-400 md:text-lg">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-justify text-sm text-gray-700 dark:text-gray-300 md:text-left">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
