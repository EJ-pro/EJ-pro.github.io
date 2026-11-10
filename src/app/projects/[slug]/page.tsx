import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudy from "@/components/CaseStudy";
import { cases, getCase } from "@/data/cases";

export const dynamicParams = false;

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  return {
    title: c.name,
    description: c.description,
    openGraph: { title: `${c.name} | 이재희`, description: c.description, images: [c.image] },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();
  return <CaseStudy c={c} />;
}
