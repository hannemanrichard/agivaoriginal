import "../styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";

import ReactGA from "react-ga";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init("1376413936457231"); // facebookPixelId
        ReactPixel.pageView();

        router.events.on("routeChangeComplete", () => {
          ReactPixel.pageView();
        });
      });
  }, [router.events]);
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-ZRPK3YB45E"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  
    gtag('config', 'G-ZRPK3YB45E');
   `}
      </Script>{" "}
      <Component {...pageProps} />
    </>
  );
}
