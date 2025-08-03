export function PageTitle({ title }: { title: string }) {
  return (
    <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight content-visibility-visible max-[360px]:text-2xl md:text-4xl lg:text-5xl">
      {title}
    </h1>
  )
}
