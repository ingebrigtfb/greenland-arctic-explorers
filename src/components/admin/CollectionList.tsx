"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllItems, deleteItem } from "@/lib/content";
import type { CollectionItem } from "@/lib/types";
import { useToast } from "@/lib/ToastContext";
import ConfirmDialog from "./ConfirmDialog";
import { Plus, Pencil, Trash2, Search, Eye, EyeOff, GripVertical } from "lucide-react";

type CollectionName = "tours" | "races" | "lodges" | "activities";

interface Props {
  collection: CollectionName;
  title: string;
  singular: string;
}

export default function CollectionList({ collection, title, singular }: Props) {
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [deleteTarget, setDeleteTarget] = useState<CollectionItem | null>(null);
  const { toast } = useToast();

  const load = async () => {
    setLoading(true);
    const data = await getAllItems(collection);
    setItems(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, [collection]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteItem(collection, deleteTarget.id);
      setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
      toast(`${singular} deleted`);
    } catch {
      toast("Failed to delete", "error");
    }
    setDeleteTarget(null);
  };

  const filtered = items.filter((item) => {
    if (filter === "published" && !item.published) return false;
    if (filter === "draft" && item.published) return false;
    if (search && !item.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  if (loading) {
    return (
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="mb-1 h-8 w-32 animate-pulse rounded-lg bg-mist" />
            <div className="h-4 w-48 animate-pulse rounded bg-mist" />
          </div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 animate-pulse rounded-xl bg-white" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-800 text-arctic-navy lg:text-3xl">{title}</h1>
          <p className="font-body text-sm text-granite">{items.length} {items.length === 1 ? singular.toLowerCase() : title.toLowerCase()}</p>
        </div>
        <Link
          href={`/admin/${collection}/new`}
          className="inline-flex items-center gap-2 rounded-xl bg-glacier px-5 py-2.5 font-heading text-sm font-600 text-white transition-all hover:bg-polar-teal"
        >
          <Plus className="h-4 w-4" /> New {singular}
        </Link>
      </div>

      {/* Search + filter bar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-granite" />
          <input
            type="text"
            placeholder={`Search ${title.toLowerCase()}…`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-mist bg-white py-2.5 pl-10 pr-4 font-body text-sm text-charcoal outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/20"
          />
        </div>
        <div className="flex gap-1.5">
          {(["all", "published", "draft"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-2 font-heading text-[11px] font-600 uppercase tracking-wider transition-all ${
                filter === f ? "bg-glacier text-white" : "bg-white text-granite hover:bg-frost-light"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Item list */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-mist bg-white p-12 text-center">
          <p className="mb-2 font-heading text-sm font-600 text-arctic-navy">
            {items.length === 0 ? `No ${title.toLowerCase()} yet` : "No results"}
          </p>
          <p className="mb-4 font-body text-xs text-granite">
            {items.length === 0 ? `Create your first ${singular.toLowerCase()} to get started.` : "Try adjusting your search or filters."}
          </p>
          {items.length === 0 && (
            <Link
              href={`/admin/${collection}/new`}
              className="inline-flex items-center gap-2 rounded-lg bg-glacier px-4 py-2 font-heading text-xs font-600 text-white hover:bg-polar-teal"
            >
              <Plus className="h-3.5 w-3.5" /> Create First {singular}
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((item) => (
            <div key={item.id} className="flex items-center gap-4 rounded-xl border border-mist bg-white p-4 transition-all hover:border-glacier/20 hover:shadow-sm">
              <GripVertical className="hidden h-4 w-4 flex-shrink-0 text-mist lg:block" />
              {item.featuredImage?.url ? (
                <Image src={item.featuredImage.url} alt="" width={80} height={60} className="h-14 w-20 flex-shrink-0 rounded-lg object-cover" />
              ) : (
                <div className="flex h-14 w-20 flex-shrink-0 items-center justify-center rounded-lg bg-frost-light text-glacier">
                  <Image src="" alt="" width={0} height={0} className="hidden" />
                  <Plus className="h-4 w-4" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate font-heading text-sm font-600 text-arctic-navy">{item.title}</p>
                <p className="truncate font-body text-xs text-granite">{item.shortDescription || "No description"}</p>
              </div>
              <div className="flex items-center gap-2">
                {item.published ? (
                  <span className="flex items-center gap-1 rounded-md bg-aurora-green/10 px-2 py-1 font-heading text-[10px] font-600 text-aurora-green">
                    <Eye className="h-3 w-3" /> Live
                  </span>
                ) : (
                  <span className="flex items-center gap-1 rounded-md bg-granite/10 px-2 py-1 font-heading text-[10px] font-600 text-granite">
                    <EyeOff className="h-3 w-3" /> Draft
                  </span>
                )}
                <Link
                  href={`/admin/${collection}/${item.id}`}
                  className="rounded-lg p-2 text-granite transition-colors hover:bg-frost-light hover:text-glacier"
                  aria-label="Edit"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => setDeleteTarget(item)}
                  className="rounded-lg p-2 text-granite transition-colors hover:bg-alert-red/10 hover:text-alert-red"
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title={`Delete ${singular}?`}
        message={`"${deleteTarget?.title}" will be permanently deleted. This cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
