import type { Metadata } from "next";
import LodgeDetailPage from "@/components/LodgeDetailPage";
import { getDetailMeta } from "@/lib/seo";
import { buildOpenGraph } from "@/lib/site-metadata";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getDetailMeta("lodges", slug);

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

export default function LodgePage() {
  return <LodgeDetailPage />;
}
