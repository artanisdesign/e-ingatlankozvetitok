"use client"

import { useEffect } from "react"

//import Script from "next/script"

export default function GoogleAnalytics({
  GA_MEASUREMENT_ID,
}: {
  GA_MEASUREMENT_ID: string
}) {
  useEffect(() => {
    //setTimeout(loadGA, 2000)

    function loadGA() {
      const script1 = document.createElement("script")
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
      script1.async = true
      document.head.appendChild(script1)

      const script2 = document.createElement("script")
      script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('consent', 'default', {
          'analytics_storage': 'granted',
          'ad_storage' : 'granted',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied',
      });

      gtag('config', '${GA_MEASUREMENT_ID}');
    `
      document.head.appendChild(script2)
    }
    const onFirstInteraction = () => {
      loadGA()
      window.removeEventListener("scroll", onFirstInteraction)
      window.removeEventListener("mousemove", onFirstInteraction)
      window.removeEventListener("keydown", onFirstInteraction)
    }

    window.addEventListener("scroll", onFirstInteraction)
    window.addEventListener("mousemove", onFirstInteraction)
    window.addEventListener("keydown", onFirstInteraction)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <></>
  /*
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />

      <Script id="google-analytics" strategy="lazyOnload">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('consent', 'default', {
    'analytics_storage': 'granted',
    'ad_storage' : 'granted',
      'ad_user_data': 'denied',
  'ad_personalization': 'denied',
});

gtag('config', '${GA_MEASUREMENT_ID}');
`}
      </Script>
    </>
  )*/
}

/*


<Script id='google-analytics' strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('consent', 'default', {
                    'analytics_storage': 'denied'
                });
                
                gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                });
                `,
                }}


            />

<>
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-W33WQZF8T3"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-W33WQZF8T3');
`}
</Script>
</>
*/
