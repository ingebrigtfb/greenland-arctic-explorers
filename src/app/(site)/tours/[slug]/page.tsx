"use client";

import ContentDetailPage from "@/components/ContentDetailPage";

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
