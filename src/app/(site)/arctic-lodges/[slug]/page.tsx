"use client";

import ContentDetailPage from "@/components/ContentDetailPage";

export default function LodgeDetailPage() {
  return (
    <ContentDetailPage
      collection="lodges"
      label="Lodge"
      labelPlural="Arctic Lodges"
      backHref="/arctic-lodges"
    />
  );
}
