export type SiteConfig = typeof siteConfig

const isProd = process.env.ON_VERCEL !== "true"

const URL = isProd
  ? "https://e-ingatlankozvetitok.hu"
  : "https://e-ingatlanugyvedek.vercel.app"

const NAME = "e-ingatlanközvetítők.hu"

const DESCRIPTION =
  "Ingatlanközvetítés ügyvédekkel: biztonságos, átlátható és gyors adásvétel 3,5%+ÁFA jutalékkal. Kérjen ajánlatot még ma!"

export const siteConfig = {
  title: NAME,
  siteTitle: "e-ingatlanközvítők.hu",
  name: NAME,
  url: URL,
  description: DESCRIPTION,
  sameURLs: [
    "https://e-ingatlankozvetitok.hu",
    "https://e-ingatlanközvetítők.hu",
  ],
  GA_MEASUREMENT_ID: "GTM-TXL83LMH",
  footerNav: [
    {
      title: "Rólunk",
      id: "ProductLinks",
    },
    {
      title: "Tudástár",
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
          url: "/og_image_n.png",
          width: 1200,
          height: 630,
          alt: NAME,
        },
      ],
      locale: "hu_HU",
      type: "website",
    },
  },
}
