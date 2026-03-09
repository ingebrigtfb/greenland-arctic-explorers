"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getItemById, saveItem } from "@/lib/content";
import type { CollectionItem, ContentImage } from "@/lib/types";
import { useToast } from "@/lib/ToastContext";
import ImageUpload from "./ImageUpload";
import GalleryUpload from "./GalleryUpload";
import RichTextEditor from "./RichTextEditor";
import { ArrowLeft, Save, Loader2, Video, Eye, EyeOff, Images } from "lucide-react";
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
            <RichTextEditor
              value={form.longDescription || ""}
              onChange={(html) => update({ longDescription: html })}
              placeholder="Full description — use the toolbar to format text"
            />
          </div>
        </div>

        {/* Video */}
        <div className="rounded-xl border border-mist bg-white p-5">
          <label className="mb-1.5 flex items-center gap-2 font-heading text-[11px] font-600 uppercase tracking-wider text-granite">
            <Video className="h-3.5 w-3.5" />
            Video Link
          </label>
          <input
            type="url"
            value={form.videoUrl || ""}
            onChange={(e) => update({ videoUrl: e.target.value })}
            className="w-full rounded-xl border border-mist px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/20"
            placeholder="YouTube or Vimeo URL (e.g. https://youtube.com/watch?v=...)"
          />
          {form.videoUrl && (
            <p className="mt-2 font-body text-xs text-granite">
              Video will be embedded on the public page below the description.
            </p>
          )}
        </div>

        {/* Gallery */}
        <div className="rounded-xl border border-mist bg-white p-5">
          <label className="mb-3 flex items-center gap-2 font-heading text-[11px] font-600 uppercase tracking-wider text-granite">
            <Images className="h-3.5 w-3.5" />
            Gallery Images
          </label>
          <GalleryUpload
            value={form.gallery || []}
            folder={collection}
            onChange={(images) => update({ gallery: images })}
          />
          <p className="mt-2 font-body text-xs text-granite">
            These images will be displayed below the video on the public page.
          </p>
        </div>

        {/* Meta fields */}
        <div className="rounded-xl border border-mist bg-white p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            <div>
              <label className="mb-1.5 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Date</label>
              <input
                type="date"
                value={form.date || ""}
                onChange={(e) => update({ date: e.target.value })}
                className="w-full rounded-xl border border-mist px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/20"
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
        <div className={`rounded-xl border-2 p-5 transition-colors ${form.published ? "border-aurora-green/30 bg-aurora-green/5" : "border-mist bg-white"}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${form.published ? "bg-aurora-green/15 text-aurora-green" : "bg-mist text-granite"}`}>
                {form.published ? <Eye className="h-4.5 w-4.5" /> : <EyeOff className="h-4.5 w-4.5" />}
              </div>
              <div>
                <p className="font-heading text-sm font-600 text-arctic-navy">
                  {form.published ? "Published" : "Draft"}
                </p>
                <p className="font-body text-xs text-granite">
                  {form.published ? "Visible on the site" : `This ${singular.toLowerCase()} is hidden`}
                </p>
              </div>
            </div>
            <button
              onClick={() => update({ published: !form.published })}
              role="switch"
              aria-checked={form.published}
              className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors duration-200 ${form.published ? "bg-aurora-green" : "bg-mist"}`}
            >
              <span className={`inline-block h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200 ${form.published ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
