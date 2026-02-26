"use client";

import { useEffect, useState } from "react";
import { getHero, saveHero } from "@/lib/content";
import type { HeroContent } from "@/lib/types";
import { useToast } from "@/lib/ToastContext";
import ImageUpload from "@/components/admin/ImageUpload";
import { Save, Loader2 } from "lucide-react";

export default function AdminHero() {
  const { toast } = useToast();
  const [form, setForm] = useState<Partial<HeroContent>>({
    title: "Greenland",
    subtitle: "Arctic Explorers",
    tagline: "We know nature – both on land and at sea!",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getHero();
      if (data) setForm(data);
      setLoading(false);
    })();
  }, []);

  const update = (patch: Partial<HeroContent>) => setForm((p) => ({ ...p, ...patch }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveHero(form);
      toast("Hero content saved");
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
          <p className="font-body text-sm text-granite">Edit the homepage hero banner</p>
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

      <div className="space-y-6">
        <div className="rounded-xl border border-mist bg-white p-5">
          <label className="mb-3 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Hero Image</label>
          <ImageUpload value={form.heroImage} folder="hero" onChange={(img) => update({ heroImage: img })} />
        </div>

        <div className="rounded-xl border border-mist bg-white p-5 space-y-4">
          <div>
            <label className="mb-1.5 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Title</label>
            <input type="text" value={form.title || ""} onChange={(e) => update({ title: e.target.value })}
              className="w-full rounded-xl border border-mist px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/20" />
          </div>
          <div>
            <label className="mb-1.5 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Subtitle</label>
            <input type="text" value={form.subtitle || ""} onChange={(e) => update({ subtitle: e.target.value })}
              className="w-full rounded-xl border border-mist px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/20" />
          </div>
          <div>
            <label className="mb-1.5 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Tagline</label>
            <input type="text" value={form.tagline || ""} onChange={(e) => update({ tagline: e.target.value })}
              className="w-full rounded-xl border border-mist px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/20" />
          </div>
        </div>

        <div className="rounded-xl border border-mist bg-white p-5 space-y-4">
          <p className="font-heading text-xs font-600 uppercase tracking-wider text-granite">Call to Action Buttons</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Primary Text</label>
              <input type="text" value={form.ctaPrimaryText || ""} onChange={(e) => update({ ctaPrimaryText: e.target.value })}
                className="w-full rounded-xl border border-mist px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/20" placeholder="e.g. Browse Expeditions" />
            </div>
            <div>
              <label className="mb-1.5 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Primary Link</label>
              <input type="text" value={form.ctaPrimaryHref || ""} onChange={(e) => update({ ctaPrimaryHref: e.target.value })}
                className="w-full rounded-xl border border-mist px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/20" placeholder="/tours" />
            </div>
            <div>
              <label className="mb-1.5 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Secondary Text</label>
              <input type="text" value={form.ctaSecondaryText || ""} onChange={(e) => update({ ctaSecondaryText: e.target.value })}
                className="w-full rounded-xl border border-mist px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/20" placeholder="e.g. Contact Us" />
            </div>
            <div>
              <label className="mb-1.5 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Secondary Link</label>
              <input type="text" value={form.ctaSecondaryHref || ""} onChange={(e) => update({ ctaSecondaryHref: e.target.value })}
                className="w-full rounded-xl border border-mist px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/20" placeholder="/contact-us" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
