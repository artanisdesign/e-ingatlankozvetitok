import Link from "next/link"

import { HuMap } from "../icons/HuMap"
import { Button } from "../ui/button"

export function MapSection() {
  return (
    <div className="mx-auto mt-4 flex aspect-auto max-w-7xl flex-col justify-center px-6 py-12 lg:px-20">
      <h2 className="mb-4 max-w-2xl text-left text-2xl font-extrabold leading-none tracking-tight dark:text-white sm:text-3xl md:text-left md:text-4xl lg:-mx-10">
        Országosan elérhető ügyvédi hálózat
      </h2>
      <p className="font-light text-gray-500 dark:text-gray-400 md:text-lg lg:text-xl lg:-mx-10 mb-4 max-w-2xl">
        Az Illés és Szabó Ügyvédi Társulás ügyvéd tagjai Budapest számos
        kerületében, az agglomerációban és a vidéki nagyvárosokban is
        elérhetőek!
      </p>
      <Button
        size={"lg"}
        variant={"primary"}
        className="rounded-lg w-fit lg:-mx-10 z-10"
      >
        <Link href="/csapatunk">Csapatunk</Link>
      </Button>
      <HuMap />
    </div>
  )
}
