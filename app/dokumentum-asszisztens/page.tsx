import { Metadata } from "next"

import { getDocumentAssistantData, getGlobals } from "../lib/api"
import { generateSeoObject } from "../lib/generate-seo-object"
import { AuthProvider } from "./context/AuthContext"
import MainPage from "./docgen-components/main-page"

const slug = "dokumentum-asszisztens"

export async function generateMetadata(): Promise<Metadata> {
  const metaGlobal = await getGlobals()
  const data = await getDocumentAssistantData()

  return generateSeoObject(metaGlobal, data, slug)
}

export default async function DocumentAssistantPage() {
  const data = await getDocumentAssistantData()

  return (
    <main id="main" role="main">
      <div className="relative mx-auto mb-6 max-w-7xl p-6 lg:py-10">
        <AuthProvider>{data && <MainPage data={data} />}</AuthProvider>
      </div>
    </main>
  )
}
