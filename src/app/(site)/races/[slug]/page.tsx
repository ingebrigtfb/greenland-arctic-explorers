import type { Metadata } from "next";
import ContentDetailPage from "@/components/ContentDetailPage";
import { getDetailMeta } from "@/lib/seo";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getDetailMeta("races", slug);

  if (!meta) {
    return { title: "Race Not Found" };
  }

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/races/${slug}`,
    },
    openGraph: {
      title: `${meta.title} — Greenland Arctic Xplorers`,
      description: meta.description,
      url: `/races/${slug}`,
      images: meta.imageUrl ? [{ url: meta.imageUrl }] : undefined,
    },
  };
}

export default function RaceDetailPage() {
  return (
    <ContentDetailPage
      collection="races"
      label="Race"
      labelPlural="Races"
      backHref="/races"
    />
  );
}
