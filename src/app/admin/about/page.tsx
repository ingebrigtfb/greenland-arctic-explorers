"use client";

import { useEffect, useState } from "react";
import { getAbout, saveAbout } from "@/lib/content";
import type { AboutContent, ContentBlock } from "@/lib/types";
import { useToast } from "@/lib/ToastContext";
import ImageUpload from "@/components/admin/ImageUpload";
import { Save, Loader2, Plus, Trash2 } from "lucide-react";

const emptyBlock: ContentBlock = { headline: "", body: "" };

export default function AdminAbout() {
  const { toast } = useToast();
  const [form, setForm] = useState<Partial<AboutContent>>({
    overline: "Our Story",
    title: "About Us",
    blocks: [emptyBlock],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getAbout();
      if (data) setForm(data);
      setLoading(false);
    })();
  }, []);

  const update = (patch: Partial<AboutContent>) => setForm((p) => ({ ...p, ...patch }));

  const updateBlock = (i: number, patch: Partial<ContentBlock>) => {
    const blocks = [...(form.blocks || [])];
    blocks[i] = { ...blocks[i], ...patch };
    update({ blocks });
  };

  const addBlock = () => update({ blocks: [...(form.blocks || []), { ...emptyBlock }] });
  const removeBlock = (i: number) => update({ blocks: (form.blocks || []).filter((_, idx) => idx !== i) });

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveAbout(form);
      toast("About page saved");
    } catch {
      toast("Failed to save", "error");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="h-8 w-32 animate-pulse rounded-lg bg-mist" />
        <div className="h-64 animate-pulse rounded-xl bg-white" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-800 text-arctic-navy lg:text-3xl">About Page</h1>
          <p className="font-body text-sm text-granite">Edit about page content blocks</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-glacier px-5 py-2.5 font-heading text-sm font-600 text-white transition-all hover:bg-polar-teal disabled:opacity-50">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? "Saving…" : "Save"}
        </button>
      </div>

      <div className="space-y-6">
        <div className="rounded-xl border border-mist bg-white p-5 space-y-4">
          <div>
            <label className="mb-1.5 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Overline</label>
            <input type="text" value={form.overline || ""} onChange={(e) => update({ overline: e.target.value })}
              className="w-full rounded-xl border border-mist px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/20" />
          </div>
          <div>
            <label className="mb-1.5 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Title</label>
            <input type="text" value={form.title || ""} onChange={(e) => update({ title: e.target.value })}
              className="w-full rounded-xl border border-mist px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/20" />
          </div>
        </div>

        {(form.blocks || []).map((block, i) => (
          <div key={i} className="rounded-xl border border-mist bg-white p-5 space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-heading text-xs font-600 uppercase tracking-wider text-granite">Block {i + 1}</p>
              {(form.blocks || []).length > 1 && (
                <button onClick={() => removeBlock(i)} className="rounded-lg p-1.5 text-granite hover:bg-alert-red/10 hover:text-alert-red">
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
            <div>
              <label className="mb-1.5 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Headline</label>
              <input type="text" value={block.headline} onChange={(e) => updateBlock(i, { headline: e.target.value })}
                className="w-full rounded-xl border border-mist px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/20" />
            </div>
            <div>
              <label className="mb-1.5 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Body</label>
              <textarea value={block.body} onChange={(e) => updateBlock(i, { body: e.target.value })} rows={5}
                className="w-full rounded-xl border border-mist px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/20" />
            </div>
            <div>
              <label className="mb-1.5 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Image (optional)</label>
              <ImageUpload value={block.image} folder="about" onChange={(img) => updateBlock(i, { image: img })} />
            </div>
          </div>
        ))}

        <button onClick={addBlock}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-mist py-4 font-heading text-sm font-600 text-granite transition-all hover:border-glacier/40 hover:text-glacier">
          <Plus className="h-4 w-4" /> Add Content Block
        </button>
      </div>
    </div>
  );
}
