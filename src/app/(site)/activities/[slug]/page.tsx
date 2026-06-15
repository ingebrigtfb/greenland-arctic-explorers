"use client";

import ContentDetailPage from "@/components/ContentDetailPage";

export default function ActivityDetailPage() {
  return (
    <ContentDetailPage
      collection="activities"
      label="Adventure"
      labelPlural="Adventures"
      backHref="/activities"
    />
  );
}
