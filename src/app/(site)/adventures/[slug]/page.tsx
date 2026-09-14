import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentDetailPage from "@/components/ContentDetailPage";
import { getDetailMeta, getDetailItem, listCollectionSlugs, extractBokunId } from "@/lib/seo";
import { buildOpenGraph } from "@/lib/site-metadata";
import { touristTripJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";

type Params = { slug: string };

export const revalidate = 3600;

export async function generateStaticParams() {
  return listCollectionSlugs("activities");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getDetailMeta(slug);

  if (!meta) {
    return { title: "Adventure Not Found" };
  }

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/adventures/${slug}`,
    },
    openGraph: buildOpenGraph({
      title: `${meta.title} — Greenland Arctic Xplorers`,
      description: meta.description ?? "",
      url: `/adventures/${slug}`,
      imageUrl: meta.imageUrl,
    }),
  };
}

export default async function ActivityDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const item = await getDetailItem(slug);
  if (!item) notFound();

  const path = `/adventures/${slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Adventures", path: "/adventures" },
    { name: item.title, path },
  ];

  return (
    <>
      <JsonLd data={touristTripJsonLd(item, path)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <ContentDetailPage
        crumbs={crumbs}
        item={item}
        bokunId={extractBokunId(slug)}
        label="Adventure"
        labelPlural="Adventures"
        backHref="/adventures"
      />
    </>
  );
}
