export type SiteConfig = typeof siteConfig

const isProd = process.env.ON_VERCEL !== "true"

const URL = isProd
  ? "https://e-ingatlankozvetitok.hu"
  : "https://cc-blog-sooty.vercel.app"

const NAME = "e-ingatlanközvetítők.hu"

const DESCRIPTION =
  "Tapasztalt ingatlan ügyvédek személyre szabott jogi segítséget nyújtanak az adásvételi folyamat minden lépésében. Átlátható díjszabás, gyors és hatékony ügyintézés, technológiai innováció a vevők és eladók teljes körű támogatására."

export const siteConfig = {
  title: NAME,
  siteTitle:
    "e-ingatlanközvítők.hu - az ingatlan ügyvédi társulás",
  name: NAME,
  url: URL,
  description: DESCRIPTION,
  sameURLs: [
    "https://e-ingatlankozvetitok.hu",
    "https://e-ingatlanközvetítők.hu",
  ],
  //GA_MEASUREMENT_ID: "G-W33WQZF8T3",
  GA_MEASUREMENT_ID: "GTM-NZZD4MMQ_",
  footerNav: [
    {
      title: "Szolgáltatások",
      id: "ProductLinks",
    },
    {
      title: "Társulás",
      id: "CompanyLinks",
    },
    {
      title: "Disclaimerek",
      id: "DisclaimerLinks",
    },
    {
      title: "Városok",
      id: "CityLinks",
    },
  ],
  links: {},
  defaultSeo: {
    description: DESCRIPTION,
    url: URL,
    openGraphDefaults: {
      title: NAME,
      description: DESCRIPTION,
      url: URL,
      siteName: NAME,
      images: [
        {
          url: "/og-image.jpg",
          width: 800,
          height: 505,
          alt: NAME,
        },
        {
          url: "/og-image-high.jpg",
          width: 1800,
          height: 1136,
          alt: NAME,
        },
      ],
      locale: "hu_HU",
      type: "website",
    },
  },
}
