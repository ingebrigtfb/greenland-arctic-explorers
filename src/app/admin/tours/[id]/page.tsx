"use client";
import { use } from "react";
import CollectionEditor from "@/components/admin/CollectionEditor";
export default function EditTour({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <CollectionEditor collection="tours" singular="Tour" itemId={id} />;
}
