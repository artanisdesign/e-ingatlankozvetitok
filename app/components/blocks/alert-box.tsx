import { AlertTriangle } from "lucide-react"

import { cn } from "@/app/lib/utils"
import { AlertBoxBlock } from "@/app/types/pages"

import { Alert, AlertDescription, AlertTitle } from "../ui/alert"

export function AlertBox({ data }: { data: AlertBoxBlock }) {
  return (
    <div>
      <Alert variant={"danger"} className="my-6">
        <AlertTriangle className="size-6" />
        <AlertTitle className="ml-2 text-lg text-foreground">{data.title}</AlertTitle>
        <AlertDescription className="ml-2 mt-6">
          <div
            className={cn(
              "prose mb-10 max-w-full text-orange-800 dark:prose-invert dark:text-orange-400 prose-h2:max-[360px]:text-2xl"
            )}
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </AlertDescription>
      </Alert>
    </div>
  )
}
