import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentDetailPage from "@/components/ContentDetailPage";
import { getDetailMeta, getDetailItem, listCollectionSlugs, extractBokunId } from "@/lib/seo";
import { buildOpenGraph } from "@/lib/site-metadata";

type Params = { slug: string };

export const revalidate = 3600;

export async function generateStaticParams() {
  return listCollectionSlugs("tours");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getDetailMeta(slug);

  if (!meta) {
    return { title: "Tour Not Found" };
  }

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/tours/${slug}`,
    },
    openGraph: buildOpenGraph({
      title: `${meta.title} — Greenland Arctic Xplorers`,
      description: meta.description ?? "",
      url: `/tours/${slug}`,
      imageUrl: meta.imageUrl,
    }),
  };
}

export default async function TourDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const item = await getDetailItem(slug);
  if (!item) notFound();

  return (
    <ContentDetailPage
      item={item}
      bokunId={extractBokunId(slug)}
      label="Tour"
      labelPlural="Tours"
      backHref="/tours"
    />
  );
}
