"use client";

import { useLayoutEffect } from "react";

/** 페이지에 들어오면 부드러운 스크롤 없이 맨 위에서 시작한다 (주소에 #이 있으면 그 위치를 존중) */
export default function ScrollTop({ id }: { id: string }) {
  useLayoutEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [id]);
  return null;
}
