"use client";
import { use } from "react";
import CollectionEditor from "@/components/admin/CollectionEditor";
export default function EditLodge({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <CollectionEditor collection="lodges" singular="Lodge" itemId={id} />;
}
