// types/custom-elements.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    "gen-search-widget": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      configId: string
      location: string
      triggerId: string
      placeholder?: string
      ref?: React.Ref<HTMLElement>
    }
  }
}
