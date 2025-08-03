import { cn } from "@/app/lib/utils"

export function SectionText({
  text,
  mustRender = false,
}: {
  text?: string
  mustRender?: boolean
}) {
  if (text) {
    return (
      <div
        className={cn(
          "prose prose-lg mb-10 max-w-full dark:prose-invert xl:prose-xl prose-h2:max-[360px]:text-2xl",
          mustRender && "content-visibility-visible",
          !mustRender && "content-visibility-auto"
        )}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    )
  }
  return null
}
