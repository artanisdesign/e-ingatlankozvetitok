import { YouTubeEmbed } from "@next/third-parties/google"

import { YoutubeBlockData } from "@/app/types/pages"

export function YoutubeBlock({ data }: { data: YoutubeBlockData }) {
  const { title, description, youtubeId } = data

  return (
    <section className="relative my-16">
      <YouTubeEmbed
        videoid={youtubeId}
        //height={400}
        params=""
        playlabel="Lejátszás"
        style="margin: 0 auto;  overflow: hidden; border-radius: 12px; border: 1px solid #666; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);"
      />
      <p className="mt-4 text-center text-gray-800 dark:text-gray-200">
       {description}
      </p>
      <script
        type="application/ld+json"
        id="youtube-schema"
        dangerouslySetInnerHTML={{
          __html: `
            {
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "uploadDate": "${new Date().toISOString()}",
              "name": "${title}",
              "description": "${description}",            
              "embedUrl": "https://www.youtube.com/embed/${youtubeId}",      
              "thumbnailUrl":["https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg" ],   
              "url": "https://www.youtube.com/watch?v=${youtubeId}",
              "contentUrl": "https://www.youtube.com/v/${youtubeId}"
            }
                `,
        }}
      ></script>
    </section>
  )
}
