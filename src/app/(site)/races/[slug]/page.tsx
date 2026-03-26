"use client";

import ContentDetailPage from "@/components/ContentDetailPage";

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
