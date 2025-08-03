import dynamic from "next/dynamic"
import { FAQPageJsonLd } from "next-seo"

import { FAQ } from "@/app/types/pages"

const FaqAccordion = dynamic(() => import("./faq-accordion"))

export function FAQSection({ data }: { data: FAQ[] }) {
  return (
    <span className="mt-12 block border-y-DEFAULT">
      <div className="mx-auto  grid  max-w-full gap-10 bg-gray-50/80 p-6 dark:bg-slate-900/60 md:grid-cols-6">
        <FAQPageJsonLd
          useAppDir={true}
          mainEntity={data.map((faq) => ({
            questionName: faq.question,
            acceptedAnswerText: faq.answer,
          }))}
        />
        <div className="max-w-xs md:col-span-2">
          <h2
            id="gyakran-ismetelt-kerdesek"
            className="my-0 text-3xl font-bold dark:text-white md:mb-5 md:text-4xl md:leading-tight"
          >
            Gyakran
            <br />
            <span className="opacity-50">ismételt kérdések</span>
          </h2>
          <p className="mt-1 hidden text-sm text-muted-foreground md:block">
            Megpróbálunk választ adni a leggyakrabban felmerülő kérdésekre
          </p>
        </div>
        <div className="md:col-span-4">
   
          {data && data.length > 0 && <FaqAccordion data={data} />}
        </div>
      </div>
    </span>
  )
}
