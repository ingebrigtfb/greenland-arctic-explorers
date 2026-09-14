import type { JsonLdObject } from "@/lib/jsonld";

/** Renders one schema.org graph node as a server-rendered script tag. */
export default function JsonLd({ data }: { data: JsonLdObject | undefined }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
