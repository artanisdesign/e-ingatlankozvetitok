import { Metadata } from "next"

import { AuthProvider } from "../dokumentum-asszisztens/context/AuthContext"
import { getDocumentAssistantData, getGlobals } from "../lib/api"
import { generateSeoObject } from "../lib/generate-seo-object"
import SearchPage from "./search-page"


const slug = "kereso"
/*
export async function generateMetadata(): Promise<Metadata> {
  const metaGlobal = await getGlobals()
  const data = await getDocumentAssistantData()

  return generateSeoObject(metaGlobal, data, slug)
}*/

export default async function DocumentAssistantPage() {
  return (
    <main id="main" role="main">
    
      <div className="relative mx-auto mb-6 max-w-7xl p-6 lg:py-10">
        
        <AuthProvider>
          <SearchPage></SearchPage>
        </AuthProvider>
      </div>
    </main>
  )
}
