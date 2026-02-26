"use client";

import { useEffect, useState } from "react";
import { getContact, saveContact } from "@/lib/content";
import type { ContactContent } from "@/lib/types";
import { useToast } from "@/lib/ToastContext";
import { Save, Loader2, Plus, Trash2 } from "lucide-react";

export default function AdminContact() {
  const { toast } = useToast();
  const [form, setForm] = useState<Partial<ContactContent>>({
    overline: "Get In Touch",
    title: "Contact Us",
    introText: "",
    address: "3905 Qinngorput\nNuuk, Greenland",
    phone: "+299 260720",
    email: "info@gax.gl",
    mapLink: "",
    contactFormEmail: "",
    socialLinks: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getContact();
      if (data) setForm(data);
      setLoading(false);
    })();
  }, []);

  const update = (patch: Partial<ContactContent>) => setForm((p) => ({ ...p, ...patch }));

  const addSocial = () => {
    update({ socialLinks: [...(form.socialLinks || []), { platform: "", url: "" }] });
  };

  const updateSocial = (i: number, patch: Partial<{ platform: string; url: string }>) => {
    const links = [...(form.socialLinks || [])];
    links[i] = { ...links[i], ...patch };
    update({ socialLinks: links });
  };

  const removeSocial = (i: number) => {
    update({ socialLinks: (form.socialLinks || []).filter((_, idx) => idx !== i) });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveContact(form);
      toast("Contact page saved");
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
          <h1 className="font-display text-2xl font-800 text-arctic-navy lg:text-3xl">Contact Page</h1>
          <p className="font-body text-sm text-granite">Edit contact information</p>
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
          <div>
            <label className="mb-1.5 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Intro Text</label>
            <textarea value={form.introText || ""} onChange={(e) => update({ introText: e.target.value })} rows={3}
              className="w-full rounded-xl border border-mist px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/20" />
          </div>
        </div>

        <div className="rounded-xl border border-mist bg-white p-5 space-y-4">
          <p className="font-heading text-xs font-600 uppercase tracking-wider text-granite">Contact Details</p>
          <div>
            <label className="mb-1.5 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Address</label>
            <textarea value={form.address || ""} onChange={(e) => update({ address: e.target.value })} rows={2}
              className="w-full rounded-xl border border-mist px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/20" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Phone</label>
              <input type="text" value={form.phone || ""} onChange={(e) => update({ phone: e.target.value })}
                className="w-full rounded-xl border border-mist px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/20" />
            </div>
            <div>
              <label className="mb-1.5 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Email</label>
              <input type="email" value={form.email || ""} onChange={(e) => update({ email: e.target.value })}
                className="w-full rounded-xl border border-mist px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/20" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Map Link (URL)</label>
              <input type="url" value={form.mapLink || ""} onChange={(e) => update({ mapLink: e.target.value })}
                className="w-full rounded-xl border border-mist px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/20" placeholder="Google Maps URL" />
            </div>
            <div>
              <label className="mb-1.5 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Contact Form Email</label>
              <input type="email" value={form.contactFormEmail || ""} onChange={(e) => update({ contactFormEmail: e.target.value })}
                className="w-full rounded-xl border border-mist px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/20" placeholder="Where form submissions go" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-mist bg-white p-5 space-y-4">
          <p className="font-heading text-xs font-600 uppercase tracking-wider text-granite">Social Links</p>
          {(form.socialLinks || []).map((link, i) => (
            <div key={i} className="flex items-center gap-3">
              <input type="text" value={link.platform} onChange={(e) => updateSocial(i, { platform: e.target.value })} placeholder="Platform"
                className="w-32 rounded-xl border border-mist px-4 py-2.5 font-body text-sm text-charcoal outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/20" />
              <input type="url" value={link.url} onChange={(e) => updateSocial(i, { url: e.target.value })} placeholder="URL"
                className="flex-1 rounded-xl border border-mist px-4 py-2.5 font-body text-sm text-charcoal outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/20" />
              <button onClick={() => removeSocial(i)} className="rounded-lg p-2 text-granite hover:bg-alert-red/10 hover:text-alert-red">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button onClick={addSocial}
            className="inline-flex items-center gap-2 rounded-lg border border-dashed border-mist px-4 py-2 font-heading text-xs font-600 text-granite hover:border-glacier/40 hover:text-glacier">
            <Plus className="h-3.5 w-3.5" /> Add Social Link
          </button>
        </div>
      </div>
    </div>
  );
}
