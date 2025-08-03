import { siteConfig } from "@/config/site"

import { AlertBox } from "../components/blocks/alert-box"
import { BasicCTA } from "../components/blocks/basic-cta"
import { MainFeatures } from "../components/blocks/main-features"
import { MapSection } from "../components/blocks/map-section"
import { OurTeam } from "../components/blocks/our-team"
import { OutlinedFeatureBlock } from "../components/blocks/outlined-feature-block"
import { TwoImageHero } from "../components/blocks/two-image-hero"
import { YoutubeBlock } from "../components/blocks/youtube-block"
import BlogArticles from "../components/blogArticles"
import { SectionImage } from "../components/section-renderer/section-image"
import { SectionQuote } from "../components/section-renderer/section-quote"
import { SectionText } from "../components/section-renderer/section-text"
import {
  AlertBoxBlock,
  BasicCTABlock,
  Block,
  FeaturesBlock,
  OutlinedFeature,
  TwoImageHeroBlock,
  YoutubeBlockData,
} from "../types/pages"
import DynamicSectionRenderer from "./dynamic-sections"

function renderSection(section: Block, index: number) {
  switch (section.__component) {
    case "blocks.our-team":
      return false //<OurTeam data={section as OurTeamBlock} />
    case "blocks.two-image-hero":
      return <TwoImageHero data={section as TwoImageHeroBlock} key={index} />
    case "blocks.outlined-feature":
      return (
        <OutlinedFeatureBlock data={section as OutlinedFeature} key={index} />
      )
    case "blocks.basic-cta":
      return <BasicCTA key={index} data={section as BasicCTABlock} />
    case "shared.youtube-video":
      return <YoutubeBlock key={index} data={section as YoutubeBlockData} />
    case "blocks.alert-box":
      return <AlertBox data={section as AlertBoxBlock} key={index} />
    case "shared.rich-text":
      return <SectionText text={section.body} key={index} />
    case "shared.media":
      return (
        <SectionImage
          image={section.file}
          isPortrait={section.isPortrait}
          key={index}
        />
      )
    case "shared.quote":
      return (
        <SectionQuote title={section.title} text={section.body} key={index} />
      )
    case "blocks.features":
      return (
        <div key={index}>
          {/* @ts-expect-error Async Server Component */}
          <BlogArticles />
          <MainFeatures data={section as FeaturesBlock} />
        </div>
      )
    default:
      return <DynamicSectionRenderer section={section} key={index} />
  }
}

export default function SectionRenderer({ blocks = [] }: { blocks: Block[] }) {
  const media = blocks.filter(
    (block) => block.__component === "shared.media" && block.author
  )

  const sections = blocks.map((section: any, index: number) => {
    return renderSection(section, index)
  })

  const mediaLD = media.map((item) => {
    if (!item.author) return null
    const { author: data } = item
    const fullName = data.prefix + " " + data.name
    return {
      "@context": "https://schema.org/",
      "@type": "ImageObject",
      contentUrl: item.file?.url,
      license: "https://creativecommons.org/licenses/by/4.0/",
      acquireLicensePage: "https://creativecommons.org/licenses/by/4.0/",
      creditText: fullName,
      creator: {
        "@type": "Person",
        name: data.name,
        honorificPrefix: data.prefix ?? "",
        email: data.email,
        url: siteConfig.url + "/ingatlan-ugyved/" + data.slug,
        sameAs: data.sameAsLinks.split(",").map((link) => `${link.trim()}`),
      },
      copyrightNotice: fullName,
    }
  })

  //TODO: helper
  return (
    <>
      {media && media.length > 0 && (
        <script
          type="application/ld+json"
          id="article-schema"
          dangerouslySetInnerHTML={{
            __html: `
          ${JSON.stringify(mediaLD)}
            `,
          }}
        ></script>
      )}

      {sections}
    </>
  )
}
