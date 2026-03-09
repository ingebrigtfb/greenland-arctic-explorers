"use client";

import { useEffect, useState } from "react";
import { getHero, saveHero } from "@/lib/content";
import type { HeroContent } from "@/lib/types";
import { useToast } from "@/lib/ToastContext";
import ImageUpload from "@/components/admin/ImageUpload";
import { Save, Loader2 } from "lucide-react";

export default function AdminHero() {
  const { toast } = useToast();
  const [form, setForm] = useState<Partial<HeroContent>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getHero();
      if (data) setForm(data);
      setLoading(false);
    })();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveHero(form);
      toast("Hero image saved");
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
          <h1 className="font-display text-2xl font-800 text-arctic-navy lg:text-3xl">Hero Section</h1>
          <p className="font-body text-sm text-granite">Change the homepage hero background image</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-glacier px-5 py-2.5 font-heading text-sm font-600 text-white transition-all hover:bg-polar-teal disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? "Saving…" : "Save"}
        </button>
      </div>

      <div className="rounded-xl border border-mist bg-white p-5">
        <label className="mb-3 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Hero Image</label>
        <ImageUpload value={form.heroImage} folder="hero" onChange={(img) => setForm((p) => ({ ...p, heroImage: img }))} />
      </div>
    </div>
  );
}
