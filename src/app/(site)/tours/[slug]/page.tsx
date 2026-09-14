import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import ContentDetailPage from "@/components/ContentDetailPage";
import { getDetailMeta, getDetailItem, listCollectionSlugs, extractBokunId } from "@/lib/seo";
import { buildPageMetadata } from "@/lib/site-metadata";
import { resolveDetailSlug } from "@/lib/catalogue";
import { touristTripJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";

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

  return buildPageMetadata({
    title: meta.title,
    description: meta.description ?? "",
    path: `/tours/${slug}`,
    imageUrl: meta.imageUrl,
  });
}

export default async function TourDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;

  // Legacy id-bearing URLs, and canonical slugs hit under the wrong section,
  // are 308'd to the canonical path rather than served at two addresses.
  const resolved = resolveDetailSlug("tours", slug);
  if (resolved.kind === "notFound") notFound();
  if (resolved.kind === "redirect") permanentRedirect(resolved.to);

  const item = await getDetailItem(slug);
  if (!item) notFound();

  const path = `/tours/${slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Tours", path: "/tours" },
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
        label="Tour"
        labelPlural="Tours"
        backHref="/tours"
      />
    </>
  );
}
