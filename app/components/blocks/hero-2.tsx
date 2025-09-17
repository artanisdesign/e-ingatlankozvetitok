import Image from "next/image"
import Link from "next/link"

import { Icons } from "../icons"
import { Button } from "../ui/button"

interface Cta11Props {
  heading?: string
  description?: string
  imageSrc?: string
  imageAlt?: string
  buttonText?: string
  buttonHref?: string
}

const Hero2 = ({
  heading = "Átlagosan 21 nap alatt adunk el egy lakást ",
  imageSrc = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
  imageAlt = "Call to action image",
}: Cta11Props) => {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex w-full flex-col overflow-hidden rounded-lg bg-white p-0 drop-shadow dark:bg-gray-900 dark:ring-2 dark:ring-teal-600   md:flex-row md:rounded-xl">
          <div className="w-full  flex-1 items-center justify-center md:flex md:w-1/2">
            <div className="relative flex h-full items-center self-center overflow-hidden">
              <Image
                src={
                  "https://res.cloudinary.com/cc-images/image/upload/v1758101636/Szakerto_ingatlankoezvetito_csapatunk_a_jogi_atvilagitastol_a_professzionalis_fotozason_at_a_sikeres_targyalasig_mindenben_tamogatja_Oent_hogy_az_eladas_nyereseges_legyen_cad19f5a76.jpg"
                }
                width={1200}
                height={800}
                alt={"Ingatlanközvetítői csapatunk"}
                className="m-0 size-full object-cover object-center transition-all duration-500 ease-in-out hover:translate-y-1 hover:scale-105"
              />
            </div>
          </div>
          <div className="flex-1 p-8 md:p-8 lg:p-16">
            <h2 className="y-6 mb-3 text-pretty text-4xl font-bold  ">
              {heading}
            </h2>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-lg">
              Ingatlanközvetítői díj: 3-3,5% + ÁFA. <br />
              <br />
              Országos hálózat, ingatlanjogra szakosodott ügyvédek, évtizedes
              piaci tapasztalat.
            </p>
            <Button size={"lg"} variant={"secondary"} asChild className="w-full sm:w-fit">
              <Link
                href={"/ingatlankozvetites"}
                className="flex h-10 flex-row items-center justify-center  text-center"
              >
                Ajánlatunk
                <Icons.chevronRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Hero2 }
