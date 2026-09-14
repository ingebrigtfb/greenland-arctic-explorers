import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import LodgeDetailPage from "@/components/LodgeDetailPage";
import { getDetailMeta, getDetailItem, listCollectionSlugs } from "@/lib/seo";
import { buildPageMetadata } from "@/lib/site-metadata";
import { resolveDetailSlug } from "@/lib/catalogue";
import { lodgingJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";

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

  return buildPageMetadata({
    title: meta.title,
    description: meta.description ?? "",
    path: `/arctic-lodges/${slug}`,
    imageUrl: meta.imageUrl,
  });
}

export default async function LodgePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;

  // Legacy id-bearing URLs, and canonical slugs hit under the wrong section,
  // are 308'd to the canonical path rather than served at two addresses.
  const resolved = resolveDetailSlug("arctic-lodges", slug);
  if (resolved.kind === "notFound") notFound();
  if (resolved.kind === "redirect") permanentRedirect(resolved.to);

  const lodge = await getDetailItem(slug);
  if (!lodge) notFound();

  const path = `/arctic-lodges/${slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Arctic Lodges", path: "/arctic-lodges" },
    { name: lodge.title, path },
  ];

  return (
    <>
      <JsonLd data={lodgingJsonLd(lodge, path)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <LodgeDetailPage lodge={lodge} crumbs={crumbs} />
    </>
  );
}
