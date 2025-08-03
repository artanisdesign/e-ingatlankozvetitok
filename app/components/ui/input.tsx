import * as React from "react"

import { cn } from "@/app/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "w-full rounded-md border border-gray-200 px-4 py-3 text-sm focus:border-teal-500 focus:ring-teal-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-teal-700  dark:bg-teal-950 dark:text-gray-300",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
