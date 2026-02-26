"use client";
import { use } from "react";
import CollectionEditor from "@/components/admin/CollectionEditor";
export default function EditActivity({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <CollectionEditor collection="activities" singular="Activity" itemId={id} />;
}
