import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PageTitle } from "../components/blocks/page-title"
import { Icons } from "../components/icons"
import { SectionText } from "../components/section-renderer/section-text"
import { HelpCard } from "../components/ui/help-card"
import { getAllAuthors, getGlobals, getPageBySlug } from "../lib/api"
import { generateSeoObject } from "../lib/generate-seo-object"
import getHeadings from "../lib/getHeadings"
import { getImageWithPlaceholder } from "../lib/image-with-placeholder"
import SzaLogo from "../components/icons/SzaLogo"

const slug = "csapatunk"

export async function generateMetadata(): Promise<Metadata> {
  const metaGlobal = await getGlobals()
  const page = await getPageBySlug(slug)

  return generateSeoObject(metaGlobal, page, slug)
}

export default async function TeamPage() {
  const page = await getPageBySlug(slug)
  const authors = await getAllAuthors()

  if (!page) {
    notFound()
  }
  const { cover } = page

  let _base64

  try {
    if (cover?.formats.thumbnail?.url) {
      const { base64 } = await getImageWithPlaceholder(
        cover?.formats.thumbnail?.url ?? ""
      )
      _base64 = base64
    }
  } catch (e) {}

  const { content } = await getHeadings(page)

  return (
    <section className="relative mx-auto max-w-7xl p-6 lg:py-10">
      <div className="mb-20 ">
        <PageTitle title={page?.title} />
        <SectionText text={content} mustRender={true} />
      </div>

      <div className="mb-20 grid grid-cols-1 items-center justify-center gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {authors.map((item, index) => (
          <div
            key={index}
            className="group relative col-span-1 mx-auto  w-full shrink-0 items-center justify-center place-self-center overflow-hidden rounded-xl before:absolute before:inset-x-0 before:z-[1] before:size-full before:bg-gradient-to-t sm:max-w-md   md:h-full md:max-h-full"
          >
            <Link
              href={"/ingatlan-ugyved/" + item.slug}
              className="group col-span-1 flex h-full flex-col items-center justify-center rounded-xl border-4 border-dashed  p-2  dark:border-gray-700 dark:bg-slate-900"
            >
              <Image
                src={item.avatar.url}
                width={300}
                height={300}
                alt={item.name}
                className="size-full rounded-xl object-cover object-top grayscale transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:grayscale-0 "
              />
              <div className="absolute inset-0 z-10 flex items-end justify-center rounded-xl bg-gradient-to-t from-gray-700/60 to-transparent to-40%  p-4 text-center text-white  dark:from-black/70">
                <div className="flex flex-col items-end justify-center drop-shadow-lg">
                  <h3 className="mb-3 text-lg font-bold tracking-tight text-white drop-shadow-2xl">
                    {item.prefix + " " + item.name}
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
        <Link
          href={"/szoftver-ugyvedeknek"}
          className="group col-span-1 flex h-full flex-col items-center justify-center rounded-xl border-4 border-dashed bg-white p-5 shadow-sm  transition duration-200 ease-in-out hover:scale-105 dark:border-gray-700 dark:bg-slate-900"
        >
          <h3 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Talán ön?
          </h3>
          <span className="text-center text-gray-500 dark:text-gray-400">
            Jelentkezzen partnernek!
          </span>
          <p className="my-6 text-center text-sm font-light text-gray-500 dark:text-gray-400 xl:mt-10">
            Ha ön is szeretne csatlakozni hozzánk, kattintson ide és olvasson
            ügyvédeknek szóló ajánlatunkról.
          </p>
        </Link>
      </div>
      <div className="my-10 overflow-hidden rounded-lg">
        <iframe
          src="https://www.google.com/maps/d/embed?mid=1FiugrTxe0Zv3bZ3Rhe5QYXrMRVLdQd0&ehbc=2E312F&noprof=1"
          width="100%"
          height="600"
          loading="lazy"
        ></iframe>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <HelpCard
          title="Vevőknek"
          subtitle="Ha ingatlant venne itt találja a tudnivalókat"
          link="/ingatlan-tudnivalok-vevoknek"
          icon={<Icons.scrollText className="size-10 p-1" />}
        />
        <HelpCard
          title="Eladóknak"
          subtitle="Eladóként itt juthat hasznos tanácsokhoz"
          link="/ingatlan-tudnivalok-eladoknak"
          icon={<Icons.landmark className="size-10 p-1" />}
        />
        <HelpCard
          title="Ügyvédeknek"
          subtitle="Együttműködési lehetőségek "
          link="/szoftver-ugyvedeknek"
          icon={<Icons.scale className="size-10 p-1" />}
        />
        <HelpCard
          title="Szerződés Asszisztens"
          subtitle="A szerződés író szoftver"
          link="https://szerzodes-asszisztens.hu"
          basicLink={true}
          newPage={true}
          icon={<SzaLogo className="size-11 p-1" />}
        />
      </div>
    </section>
  )
}
