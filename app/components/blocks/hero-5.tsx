import { Mail, MapPin, MessageCircle, Phone } from "lucide-react"

import { Tilt } from "../ui/tilted-card"

const DATA = [
  {
    id: 1,
    title: "Örökölt ingatlant ad el",
    description: "Megterhelő élethelyzetekben is segítünk döntést hozni.",
  },
  {
    id: 2,
    title: "Válás után értékesít lakást",
    description: "Segítünk az optimális megoldás megtalálásában.",
  },
  {
    id: 3,
    title: "Első lakását adja el",
    description: "Egy ingatlanközvetítő ügyvéd áll az eladó mellett.",
  },
  {
    id: 4,
    title: "Gyerekkel költözik",
    description: "Segítünk a CSOK átvitelben.",
  },
  {
    id: 5,
    title: "Befektetési célú ingatlant ad el",
    description: "Intézzük rejtett költségek és felesleges körök nélkül.",
  },
  {
    id: 6,
    title: "Külföldről, vagy más városból ad el",
    description: "Szakertő kezekben a teljes ügyintézés.",
  },
]

const Hero5 = () => {
  return (
    <section className="bg-white py-32 dark:bg-gray-900/40 ">
      <div className="mx-auto max-w-7xl  px-6">
        <div className="flex flex-col items-center text-center">
          <h2 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
            Mikor tudunk Önnek a legtöbbet segíteni lakása eladásakor?
          </h2>
          <h3 className="mb-8 text-muted-foreground lg:text-2xl">
            Ügyfeleink tapasztalatai alapján összegyűjtöttük, mely
            élethelyzetekben éri meg az e-ingatlanközvetítőkre bízni az eladást:
          </h3>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {DATA.map(({ id, title, description }, index) => (
            <Tilt scale={1.02} key={id} className="grid">
              <div
                key={id}
                className="rounded-lg border bg-gray-50 p-6  dark:border-teal-700 dark:bg-gray-900 h-full"
              >
                <span className="mb-3 flex flex-col items-start justify-center rounded-full text-3xl font-extrabold text-secondary">
                  {index + 1}.
                </span>
                <div className="mb-2 text-lg font-semibold">{title}</div>
                <div className="text-sm text-gray-950 dark:text-muted-foreground">
                  {description}
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Hero5 }
