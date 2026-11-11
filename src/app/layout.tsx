import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Analytics from "@/components/Analytics";

/** Google Analytics 4 측정 ID */
const GA_ID = "G-7RK2DB7D95";

export const metadata: Metadata = {
  metadataBase: new URL("https://ej-pro.github.io"),
  title: {
    default: "이재희 | AI Engineer",
    template: "%s | 이재희",
  },
  description: "AI Agent와 RAG를 구현하고 평가·배포까지 연결해 온 개발자 이재희의 포트폴리오입니다.",
  authors: [{ name: "이재희", url: "https://github.com/EJ-pro" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://ej-pro.github.io",
    siteName: "이재희 포트폴리오",
    title: "이재희 | AI Engineer",
    description: "AI Agent와 RAG를 구현하고 평가·배포까지 연결해 온 개발자 이재희의 포트폴리오입니다.",
  },
};

export const viewport: Viewport = {
  themeColor: "#EEF0F5",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- 정적 export라 빌드 시 폰트를 받지 않고 링크로 불러온다 */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans+KR:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        {children}
        <Analytics />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}
