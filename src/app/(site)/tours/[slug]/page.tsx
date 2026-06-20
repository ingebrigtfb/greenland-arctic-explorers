import type { Metadata } from "next";
import ContentDetailPage from "@/components/ContentDetailPage";
import { getDetailMeta } from "@/lib/seo";
import { buildOpenGraph } from "@/lib/site-metadata";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getDetailMeta("tours", slug);

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

export default function TourDetailPage() {
  return (
    <ContentDetailPage
      collection="tours"
      label="Tour"
      labelPlural="Tours"
      backHref="/tours"
    />
  );
}
