"use client";

import { useEffect } from "react";

type Gtag = (...args: unknown[]) => void;

/**
 * GA4 맞춤 이벤트.
 * - resume_download: 이력서 PDF 받기 버튼 (location = 버튼이 있는 영역)
 * - open_live_site: 운영 중인 서비스·Play 스토어 링크
 */
export default function Analytics() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      const gtag = (window as unknown as { gtag?: Gtag }).gtag;
      if (!gtag) return;
      if (a.hasAttribute("download")) {
        gtag("event", "resume_download", { location: a.closest("footer") ? "footer" : a.closest("section")?.id || window.location.pathname, file_name: a.getAttribute("download") ?? "" });
        return;
      }
      const href = a.getAttribute("href") ?? "";
      if (/streamlit\.app|netlify\.app|play\.google\.com/.test(href)) {
        gtag("event", "open_live_site", { link_url: href, location: a.closest("section")?.id || window.location.pathname });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
