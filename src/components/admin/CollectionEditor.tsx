"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getItemById, saveItem } from "@/lib/content";
import type { CollectionItem, ContentImage } from "@/lib/types";
import { useToast } from "@/lib/ToastContext";
import ImageUpload from "./ImageUpload";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

type CollectionName = "tours" | "races" | "lodges" | "activities";

interface Props {
  collection: CollectionName;
  singular: string;
  itemId: string | null; // null = new
}

const emptyItem: Partial<CollectionItem> = {
  title: "",
  shortDescription: "",
  longDescription: "",
  price: "",
  duration: "",
  location: "",
  tags: [],
  published: false,
  sortOrder: 0,
};

export default function CollectionEditor({ collection, singular, itemId }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [form, setForm] = useState<Partial<CollectionItem>>(emptyItem);
  const [loading, setLoading] = useState(!!itemId);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (!itemId) return;
    (async () => {
      const item = await getItemById(collection, itemId);
      if (item) {
        setForm(item);
      } else {
        toast("Item not found", "error");
        router.push(`/admin/${collection}`);
      }
      setLoading(false);
    })();
  }, [collection, itemId]);

  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const update = (patch: Partial<CollectionItem>) => {
    setForm((prev) => ({ ...prev, ...patch }));
    setDirty(true);
  };

  const handleSave = async () => {
    if (!form.title?.trim()) {
      toast("Title is required", "error");
      return;
    }
    setSaving(true);
    try {
      const id = await saveItem(collection, itemId, form);
      setDirty(false);
      toast(itemId ? `${singular} saved` : `${singular} created`);
      if (!itemId) router.push(`/admin/${collection}/${id}`);
    } catch {
      toast("Failed to save", "error");
    }
    setSaving(false);
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !(form.tags || []).includes(tag)) {
      update({ tags: [...(form.tags || []), tag] });
    }
    setTagInput("");
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-mist" />
        <div className="h-64 animate-pulse rounded-xl bg-white" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/admin/${collection}`} className="rounded-lg p-2 text-granite transition-colors hover:bg-frost-light hover:text-arctic-navy">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-display text-xl font-800 text-arctic-navy lg:text-2xl">
            {itemId ? `Edit ${singular}` : `New ${singular}`}
          </h1>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || !form.title?.trim()}
          className="inline-flex items-center gap-2 rounded-xl bg-glacier px-5 py-2.5 font-heading text-sm font-600 text-white transition-all hover:bg-polar-teal disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? "Saving…" : "Save"}
        </button>
      </div>

      <div className="space-y-6">
        {/* Featured image */}
        <div className="rounded-xl border border-mist bg-white p-5">
          <label className="mb-3 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Featured Image</label>
          <ImageUpload
            value={form.featuredImage}
            folder={collection}
            onChange={(img) => update({ featuredImage: img })}
          />
        </div>

        {/* Main fields */}
        <div className="rounded-xl border border-mist bg-white p-5 space-y-4">
          <div>
            <label className="mb-1.5 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Title *</label>
            <input
              type="text"
              value={form.title || ""}
              onChange={(e) => update({ title: e.target.value })}
              className="w-full rounded-xl border border-mist px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/20"
              placeholder={`${singular} title`}
            />
          </div>

          <div>
            <label className="mb-1.5 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Short Description</label>
            <textarea
              value={form.shortDescription || ""}
              onChange={(e) => update({ shortDescription: e.target.value })}
              rows={2}
              className="w-full rounded-xl border border-mist px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/20"
              placeholder="Brief summary (shown in cards)"
            />
          </div>

          <div>
            <label className="mb-1.5 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Long Description</label>
            <textarea
              value={form.longDescription || ""}
              onChange={(e) => update({ longDescription: e.target.value })}
              rows={8}
              className="w-full rounded-xl border border-mist px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/20"
              placeholder="Full description (supports markdown)"
            />
          </div>
        </div>

        {/* Meta fields */}
        <div className="rounded-xl border border-mist bg-white p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Price</label>
              <input
                type="text"
                value={form.price || ""}
                onChange={(e) => update({ price: e.target.value })}
                className="w-full rounded-xl border border-mist px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/20"
                placeholder="e.g. $2,495"
              />
            </div>
            <div>
              <label className="mb-1.5 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Duration</label>
              <input
                type="text"
                value={form.duration || ""}
                onChange={(e) => update({ duration: e.target.value })}
                className="w-full rounded-xl border border-mist px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/20"
                placeholder="e.g. 5 Days"
              />
            </div>
            <div>
              <label className="mb-1.5 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Location</label>
              <input
                type="text"
                value={form.location || ""}
                onChange={(e) => update({ location: e.target.value })}
                className="w-full rounded-xl border border-mist px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/20"
                placeholder="e.g. Ilulissat"
              />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="rounded-xl border border-mist bg-white p-5">
          <label className="mb-1.5 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Tags</label>
          <div className="mb-2 flex flex-wrap gap-1.5">
            {(form.tags || []).map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 rounded-md bg-frost-light px-2 py-1 font-heading text-[11px] font-600 text-glacier">
                {tag}
                <button onClick={() => update({ tags: (form.tags || []).filter((t) => t !== tag) })} className="text-glacier/50 hover:text-alert-red">×</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              className="flex-1 rounded-xl border border-mist px-4 py-2.5 font-body text-sm text-charcoal outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/20"
              placeholder="Add tag + Enter"
            />
            <button onClick={addTag} className="rounded-xl bg-frost-light px-4 py-2.5 font-heading text-xs font-600 text-glacier hover:bg-frost">Add</button>
          </div>
        </div>

        {/* Publishing */}
        <div className="rounded-xl border border-mist bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-heading text-sm font-600 text-arctic-navy">Published</p>
              <p className="font-body text-xs text-granite">Make this {singular.toLowerCase()} visible on the site</p>
            </div>
            <button
              onClick={() => update({ published: !form.published })}
              className={`relative h-7 w-12 rounded-full transition-colors ${form.published ? "bg-aurora-green" : "bg-mist"}`}
            >
              <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${form.published ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
          <div className="mt-4">
            <label className="mb-1.5 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Sort Order</label>
            <input
              type="number"
              value={form.sortOrder ?? 0}
              onChange={(e) => update({ sortOrder: parseInt(e.target.value) || 0 })}
              className="w-24 rounded-xl border border-mist px-4 py-2.5 font-body text-sm text-charcoal outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
