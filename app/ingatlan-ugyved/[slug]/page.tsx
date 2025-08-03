import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { BreadcrumbJsonLd } from "next-seo"

import { siteConfig } from "@/config/site"
import { ReturnToBlogButton } from "@/app/blog/components/blog-button"
import { BlogCompactSidebar } from "@/app/blog/components/blog-thumbnail"
import ContactForm from "@/app/components/blocks/contact-form"
import { PageTitle } from "@/app/components/blocks/page-title"
import { Contract } from "@/app/components/header/contract-offer"
import { Icons } from "@/app/components/icons"
import { SectionText } from "@/app/components/section-renderer/section-text"
import { Avatar, AvatarImage } from "@/app/components/ui/avatar"
import {
  getAuthorBySlug,
  getAuthorSlugs,
  getGlobals,
  getPostsByAuthor,
} from "@/app/lib/api"
import { generateSeoObject } from "@/app/lib/generate-seo-object"
import { BlogPageProps, BlogPost } from "@/app/types/blog"

export async function generateStaticParams() {
  return await getAuthorSlugs()
}

export async function generateMetadata(
  props: BlogPageProps
): Promise<Metadata> {
  const params = await props.params
  const metaGlobal = await getGlobals()

  const author = await getAuthorBySlug(params.slug)
  if (!author) {
    return generateSeoObject(metaGlobal, null, "ingatlan-ugyved/" + params.slug)
  }

  const {
    name,
    slug,
    prefix = "",
    avatar,
    experience = "",
    description = "",
  } = author || {}

  const fullName = prefix + " " + name

  const obj: Partial<BlogPost> = {
    title: fullName,
    id: author.id.toString(),
    description: description ?? "",
    slug: slug,
    content: experience,
    author: author,
    seo: {
      metaTitle: fullName,
      metaDescription: description ?? "",
      metaImage: avatar,
    },
  }

  return generateSeoObject(metaGlobal, obj, "ingatlan-ugyved/" + params.slug)
}

export default async function LawyerPage(props: BlogPageProps) {
  const params = await props.params
  const { slug: id } = params

  const author = await getAuthorBySlug(id)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id.toString(), 4)

  const {
    name,
    slug,
    prefix = "",
    avatar,
    experience,
    university,
    email,
    chamber,
    chamber_number,
  } = author || {}

  const office_url = author?.office_url || ""
  const sameAsLinks = author?.sameAsLinks || ""

  const fullName = prefix + " " + name

  return (
    <article className="relative mx-auto mb-6 max-w-7xl p-6 lg:py-10">
      <div className="grid gap-y-6 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-0">
        <div className="col-span:3 w-full max-w-full lg:col-span-2">
          {/* SEO */}
          <script
            type="application/ld+json"
            id="author-schema"
            dangerouslySetInnerHTML={{
              __html: `
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "email": ${JSON.stringify(email)},
              "image": "${avatar.formats.large?.url}",
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": ${JSON.stringify(university)}
              },
              "name": ${JSON.stringify(name)},
              "honorificPrefix": ${JSON.stringify(prefix)},
              "url": ${JSON.stringify(office_url)},
              "sameAs": [${sameAsLinks
                .split(",")
                .map((link: string) => `"${link.trim()}"`)}],
              "memberOf": {
                "@type": "Organization",
                "name": ${JSON.stringify(chamber)}
              }              
            }
                `,
            }}
          ></script>

          <BreadcrumbJsonLd
            itemListElements={[
              {
                position: 1,
                name: "Csapatunk",
                item: siteConfig.url + "/csapatunk",
              },
              {
                position: 2,
                name: fullName,
                item: siteConfig.url + "/ingatlan-ugyved/" + slug,
              },
            ]}
            useAppDir={true}
          />

          <div className=" flex w-full flex-row items-center justify-center p-10 pb-16 sm:pb-10 lg:hidden">
            <Avatar className="flex h-fit w-4/5 shrink-0 self-center ring-4 transition-all duration-500 ease-in-out hover:scale-110 sm:w-2/5 sm:self-start md:w-[30%] ">
              <Image
                src={avatar.url}
                alt={name}
                width={512}
                height={512}
                className="aspect-square size-full object-cover"
              />
            </Avatar>
          </div>
          <div className="my-12 mt-8">
            <PageTitle title={fullName} />
          </div>

          <SectionText text={experience} />

          <div className="group my-12 flex w-full flex-col gap-y-6 rounded-xl border bg-white p-6 shadow-sm transition duration-200 ease-in-out hover:shadow-md dark:border-gray-800 dark:bg-slate-900 md:flex-col  md:p-10">
            <h2 className="mb-2 text-2xl font-semibold">Adatok</h2>
            <p className="text-md flex flex-row flex-wrap gap-x-2">
              <Icons.landmark className="mb-2 mr-2 size-6 shrink-0" />
              Egyetem:<strong> {university}</strong>
            </p>
            <p className="text-md flex flex-row flex-wrap gap-x-2">
              <Icons.scale className="mb-2 mr-2 size-6 shrink-0" />
              Kamara:<strong> {chamber}</strong>
            </p>
            <p className="text-md flex flex-row flex-wrap gap-x-2">
              <Icons.tag className=" mb-2 mr-2 size-6 shrink-0" />
              Kamarai Azonosító Szám (KASZ):<strong> {chamber_number}</strong>
            </p>
            {office_url && (
              <p className="text-md hidden gap-x-2">
                <Icons.link className=" mb-2 mr-2 size-6 shrink-0" />
                Weboldal:{" "}
                <Link href={office_url} className="hover:text-teal-500">
                  <strong> {office_url}</strong>
                </Link>
              </p>
            )}

            <p className="hidden">
              <Icons.mail className=" mb-2 mr-2 size-6 shrink-0" />
              Email:{" "}
              <Link
                href={
                  "mailto:" +
                  email +
                  "?subject=e-ingatlanugyvedek.hu megkeresés"
                }
                className="hover:text-teal-500"
              >
                <strong> {email}</strong>
              </Link>
            </p>
          </div>
          <ContactForm
            noHelpCards
            title="Kapcsolatfelvétel az ügyvéddel"
            noCities
          />
        </div>

        <div className="lg:col-span-1 lg:block">
          <div className=" hidden w-full flex-row items-center justify-center p-10 lg:flex">
            <Avatar className="flex h-fit w-[90%] shrink-0 self-center ring-4 transition-all duration-500 ease-in-out hover:scale-110 sm:self-start">
              <Image
                src={avatar.url}
                alt={name}
                width={512}
                height={512}
                className="aspect-square size-full object-cover"
              />
            </Avatar>
          </div>

          <p className="mb-5  pt-6 text-xl font-semibold text-gray-800 dark:text-gray-300">
            A szerző legutóbbi bejegyzései
          </p>

          <div className="grid grid-cols-1 items-center justify-center gap-y-8">
            <div className="flex max-w-full flex-col gap-y-6 self-center rounded-xl border bg-white p-8 shadow-sm transition duration-200 ease-in-out hover:shadow-md dark:border-gray-800 dark:bg-slate-900 sm:mx-0 lg:mx-0">
              {posts &&
                posts.length > 0 &&
                posts.map((post, i) => (
                  <BlogCompactSidebar post={post} key={i} />
                ))}

              {posts && posts.length === 0 && <p>Még nincs bejegyzése</p>}
            </div>
            <ReturnToBlogButton title="További cikkek" isForward={true} />
            <p className="mb-0 hidden pt-6 text-xl font-semibold text-gray-800 dark:text-gray-300 lg:block">
              Ajánlatunk
            </p>
            <div className="hidden p-5 pt-0 lg:block">
              <Contract />
            </div>
          </div>
        </div>
        <div className="lg:col-span-3"></div>
      </div>
    </article>
  )
}
