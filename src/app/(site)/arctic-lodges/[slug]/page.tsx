import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LodgeDetailPage from "@/components/LodgeDetailPage";
import { getDetailMeta, getDetailItem, listCollectionSlugs } from "@/lib/seo";
import { buildOpenGraph } from "@/lib/site-metadata";

type Params = { slug: string };

export const revalidate = 3600;

export async function generateStaticParams() {
  return listCollectionSlugs("lodges");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getDetailMeta(slug);

  if (!meta) {
    return { title: "Lodge Not Found" };
  }

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/arctic-lodges/${slug}`,
    },
    openGraph: buildOpenGraph({
      title: `${meta.title} — Greenland Arctic Xplorers`,
      description: meta.description ?? "",
      url: `/arctic-lodges/${slug}`,
      imageUrl: meta.imageUrl,
    }),
  };
}

export default async function LodgePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const lodge = await getDetailItem(slug);
  if (!lodge) notFound();

  return <LodgeDetailPage lodge={lodge} />;
}
