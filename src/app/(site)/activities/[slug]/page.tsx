"use client";

import ContentDetailPage from "@/components/ContentDetailPage";

export default function ActivityDetailPage() {
  return (
    <ContentDetailPage
      collection="activities"
      label="Activity"
      labelPlural="Activities"
      backHref="/activities"
    />
  );
}
