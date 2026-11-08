import type { Metadata } from "next";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
