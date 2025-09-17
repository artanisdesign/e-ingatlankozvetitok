import React from "react"
import { Tilt } from "../ui/tilted-card"

const DATA = [
  {
    id: 1,
    title: "Profi fotózás, 3D látványképek",
    description:
      "Látványos, minőségi fotókkal és modern 3D látványtervekkel mutatjuk be ingatlanod, hogy már az első pillantásra felkeltse az érdeklődők figyelmét.",
  },
  {
    id: 2,
    title: "Home staging",
    description:
      "Stílusos berendezéssel és tudatos téralakítással tesszük vonzóbbá az ingatlant, így gyorsabban és magasabb áron találhat gazdára.",
  },
  {
    id: 3,
    title: "Ügyvéd által szövegezett hirdetés",
    description:
      "Biztonságos és jogilag pontos hirdetésszöveget készítünk, amely megnyugtatja a vevőket és növeli a bizalmat.",
  },
  {
    id: 4,
    title: "Tulajdoni lap ellenőrzése, jogi átvilágítás",
    description:
      "Már az értékesítés elején kiszűrjük az esetleges kockázatokat, így az adásvétel teljes folyamatát biztonságossá tesszük.",
  },
  {
    id: 5,
    title: "Alapító okirat és SZMSZ beszerzése",
    description:
      "Társasházi lakás esetén elintézzük a szükséges dokumentumok beszerzését, hogy minden információ a rendelkezésedre álljon.",
  },
  {
    id: 6,
    title:
      "Energetikai tanúsítvány, villamos biztonsági felülvizsgálati jegyzőkönyv ügyintézése",
    description:
      "Gyorsan és gördülékenyen intézzük az előírt dokumentumokat, hogy az értékesítés zökkenőmentes legyen.",
  },
  {
    id: 7,
    title: "Alku, vételi szándéknyilatkozatok továbbítása",
    description:
      "Képviselünk a tárgyalások során, segítünk a lehető legjobb feltételek elérésében, és kezeljük a hivatalos nyilatkozatokat.",
  },
  {
    id: 8,
    title: "Közreműködés az adásvételi szerződés előkészítésében",
    description:
      "Összehangoljuk a feleket és támogatjuk az ügyvédi munkát, hogy a szerződés gyorsan, pontosan és mindenki számára megnyugtatóan készüljön el.",
  },
]

const Hero4 = () => {
  return (
    <section className="container py-16">
      <div className="mx-auto flex flex-col items-center text-center">
        <div className="flex max-w-5xl flex-col items-center text-center">
          <h2 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
            Mit kap nálunk a pénzéért?
          </h2>
          <h3 className="mb-8 max-w-5xl text-muted-foreground lg:text-2xl">
            Válassza az e-ingatlanközvetítők.hu csapatát és dőljön hátra, ez
            mind a mi feladatunk:
          </h3>
        </div>

        <div className="flex max-w-3xl flex-col justify-center gap-4">
          {DATA.map(({ id, title, description }) => (
            <Tilt scale={1.1} key={id}>
            <div key={id} className="flex items-start gap-4 py-4">
              <div className="size-8 shrink-0 lg:size-12">
                <svg
                  className="mt-2 size-6 text-green-500 dark:text-green-400 lg:me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-lg font-semibold">{title}</div>
                <div className="text-sm text-gray-950 dark:text-muted-foreground">
                  {description}
                </div>
              </div>
            </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Hero4 }
