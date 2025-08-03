import Link from "next/link"

export default function MobileBanner() {
  return (
    <div className="mx-auto mb-12 flex w-full justify-center">
      <Link
        className="group flex items-center justify-between rounded-full border border-white/[.1] bg-teal-600/[.9]  p-1 pl-2 shadow-md max-[440px]:w-full max-[440px]:rounded-xl sm:p-2 sm:pl-4"
        href="/ingatlan-adasveteli-szerzodes"
      >
        <p className="text-md mx-2 flex items-center text-center text-white max-[440px]:mx-8 max-[440px]:inline-block max-[440px]:w-full max-[380px]:mx-2 sm:text-lg">
          Adásvételi szerződés:{" "}
          <strong className="ml-3 text-xl max-[440px]:block">175 000 Ft</strong>
        </p>
        <span className="inline-flex items-center justify-center gap-x-2 rounded-full bg-yellow-500 px-3 py-2 text-sm font-semibold text-gray-700 group-hover:bg-yellow-400 max-[440px]:mr-1">
          Akció
          <svg
            className="size-2.5"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </Link>
    </div>
  )
}
