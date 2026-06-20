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
  const meta = await getDetailMeta("activities", slug);

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

export default function ActivityDetailPage() {
  return (
    <ContentDetailPage
      collection="activities"
      label="Adventure"
      labelPlural="Adventures"
      backHref="/adventures"
    />
  );
}
