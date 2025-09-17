import React from "react"
import Image from "next/image"
import Link from "next/link"

import TypingText from "@/components/ui/shadcn-io/typing-text"

import { Icons } from "../icons"
import EINGLogo from "../icons/EINGLogo"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"

interface Hero158Props {
  title?: string
  subtitle?: string
  description?: string
  images?: [string, string, string] // three images
}

export default function Hero1({
  title = "Ingatlanközvetítő ügyvédek",
  subtitle = "hello",
  description = "Eladná az ingatlanát? Az Illés és Szabó Ügyvédi Társulás ingatlanközvetítő tagjai a stratégiai árazástól a szerződéskötésig mindent kézben tartanak.",
  images = [
    "https://res.cloudinary.com/cc-images/image/upload/v1758101228/Professzionalis_marketing_jogi_atvilagitas_es_szakerto_targyalas_egy_kezben_Veluenk_az_ingatlaneladas_egy_atlathato_es_biztonsagos_folyamat_bc7928efe8.jpg",
    "https://res.cloudinary.com/cc-images/image/upload/v1758100998/Szakertelem_es_jogi_biztonsag_egy_helyen_Ingatlankoezvetites_uegyvedekkel_hogy_Oennek_csak_az_alairassal_kelljen_foglalkoznia_89e3376957.jpg",
    "https://res.cloudinary.com/cc-images/image/upload/v1758101142/Szakertelem_amiben_megbizhat_Valassza_az_ingatlankoezvetites_es_az_uegyvedi_hatter_kombinaciojat_a_gyors_es_biztonsagos_eladasert_b3ab469ab0.jpg",
  ],
}: Hero158Props) {
  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden px-6">
      <div className="grid grid-cols-1 items-center gap-12 pb-16 pt-8 lg:pt-16 lg:grid-cols-2 lg:pb-24">
        {/* Left content */}
        <div className="flex flex-col items-center space-y-6 text-center lg:items-start lg:text-left">
          <Badge
            className="gap-2 rounded-full border border-teal-600 bg-white/80 px-3 py-1  dark:border-white/15 dark:bg-background dark:text-white/80 mb-1"
            variant={"outline"}
          >
            Az
            <EINGLogo className="size-5" />
            e-ingatlanügyvédek.hu bemutatja
          </Badge>
          <h1 className="flex min-h-24 items-center justify-center text-4xl font-extrabold leading-tight sm:text-5xl lg:min-h-32 lg:text-6xl">
            <noscript>{title}</noscript>
            <TypingText
              text={["Ingatlanközvetítő ügyvédek", "Ügyvéd ingatlanközvetítők"]}
              typingSpeed={120}
              pauseDuration={2500}
              showCursor={false}
              cursorCharacter="|"
              cursorClassName="bg-secondary ml-1 w-1 bg-amber-500 h-9 lg:h-10"
              className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl"
              //textColors={["#3b82f6", "#8b5cf6", "#06b6d4"]}
              variableSpeed={{ min: 50, max: 150 }}
            />
          </h1>

          {description && (
            <p className="mt-4 max-w-prose text-lg text-muted-foreground sm:text-xl">
              {description}
            </p>
          )}
          <div className="mt-8 flex w-full flex-wrap gap-4 sm:w-fit">
            <Button
              size={"lg"}
              variant={"primary"}
              asChild
              className="w-full sm:w-fit"
            >
              <Link
                href={"/ingatlankozvetito-ugyved"}
                className="flex h-10 flex-row items-center justify-center  text-center"
              >
                Csapatunk
                <Icons.chevronRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Right image collage */}
        <div className="relative grid grid-cols-2 gap-4 px-0 sm:gap-12 sm:px-4 lg:px-0">
          <div className="col-span-1 flex flex-col">
            <Image
              src={images[0]}
              alt="Dr. Surányi Balázs"
              width={400}
              height={500}
              className="h-auto w-full rounded-lg object-cover shadow transition-all duration-500 ease-in-out hover:scale-105"
            />
          </div>
          <div className="col-span-1 flex flex-col items-center justify-around gap-6 lg:gap-8">
            <Image
              src={images[1]}
              alt="Dr. Szabó Judit Anna"
              width={600}
              height={400}
              className="h-auto w-full rounded-lg object-cover shadow transition-all duration-500 ease-in-out hover:scale-105"
            />
            <Image
              src={images[2]}
              alt="Dr. Illés Géza"
              width={600}
              height={400}
              className="h-auto w-full rounded-lg object-cover shadow transition-all duration-500 ease-in-out hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
