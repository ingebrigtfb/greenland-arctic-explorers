"use client";

import { useEffect, useState } from "react";
import { getAbout, saveAbout } from "@/lib/content";
import type { AboutContent, ContentBlock, TeamMember } from "@/lib/types";
import { useToast } from "@/lib/ToastContext";
import ImageUpload from "@/components/admin/ImageUpload";
import {
  Save,
  Loader2,
  Plus,
  Trash2,
  GripVertical,
  Users,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

const emptyBlock: ContentBlock = { headline: "", body: "" };
const emptyMember: TeamMember = { name: "", role: "", group: "team" };

export default function AdminAbout() {
  const { toast } = useToast();
  const [form, setForm] = useState<Partial<AboutContent>>({
    overline: "Our Story",
    title: "About Us",
    blocks: [emptyBlock],
    team: [],
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

  const update = (patch: Partial<AboutContent>) =>
    setForm((p) => ({ ...p, ...patch }));

  const updateBlock = (i: number, patch: Partial<ContentBlock>) => {
    const blocks = [...(form.blocks || [])];
    blocks[i] = { ...blocks[i], ...patch };
    update({ blocks });
  };

  const addBlock = () =>
    update({ blocks: [...(form.blocks || []), { ...emptyBlock }] });
  const removeBlock = (i: number) =>
    update({ blocks: (form.blocks || []).filter((_, idx) => idx !== i) });

  /* ── Team member helpers ── */

  const team = form.team || [];

  const updateMember = (i: number, patch: Partial<TeamMember>) => {
    const next = [...team];
    next[i] = { ...next[i], ...patch };
    update({ team: next });
  };

  const addMember = () => update({ team: [...team, { ...emptyMember }] });

  const removeMember = (i: number) =>
    update({ team: team.filter((_, idx) => idx !== i) });

  const moveMember = (i: number, dir: -1 | 1) => {
    const next = [...team];
    const target = i + dir;
    if (target < 0 || target >= next.length) return;
    [next[i], next[target]] = [next[target], next[i]];
    update({ team: next });
  };

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

  const inputClass =
    "w-full rounded-xl border border-mist px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/20";
  const labelClass =
    "mb-1.5 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite";

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-800 text-arctic-navy lg:text-3xl">
            About Page
          </h1>
          <p className="font-body text-sm text-granite">
            Edit about page content blocks &amp; team members
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-glacier px-5 py-2.5 font-heading text-sm font-600 text-white transition-all hover:bg-polar-teal disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saving ? "Saving…" : "Save"}
        </button>
      </div>

      <div className="space-y-6">
        {/* Overline + Title */}
        <div className="rounded-xl border border-mist bg-white p-5 space-y-4">
          <div>
            <label className={labelClass}>Overline</label>
            <input
              type="text"
              value={form.overline || ""}
              onChange={(e) => update({ overline: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              value={form.title || ""}
              onChange={(e) => update({ title: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        {/* Content blocks */}
        {(form.blocks || []).map((block, i) => (
          <div
            key={i}
            className="rounded-xl border border-mist bg-white p-5 space-y-4"
          >
            <div className="flex items-center justify-between">
              <p className="font-heading text-xs font-600 uppercase tracking-wider text-granite">
                Block {i + 1}
              </p>
              {(form.blocks || []).length > 1 && (
                <button
                  onClick={() => removeBlock(i)}
                  className="rounded-lg p-1.5 text-granite hover:bg-alert-red/10 hover:text-alert-red"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
            <div>
              <label className={labelClass}>Headline</label>
              <input
                type="text"
                value={block.headline}
                onChange={(e) => updateBlock(i, { headline: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Body</label>
              <textarea
                value={block.body}
                onChange={(e) => updateBlock(i, { body: e.target.value })}
                rows={5}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Image (optional)</label>
              <ImageUpload
                value={block.image}
                folder="about"
                onChange={(img) => updateBlock(i, { image: img })}
              />
            </div>
          </div>
        ))}

        <button
          onClick={addBlock}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-mist py-4 font-heading text-sm font-600 text-granite transition-all hover:border-glacier/40 hover:text-glacier"
        >
          <Plus className="h-4 w-4" /> Add Content Block
        </button>

        {/* ── Team Members ── */}
        <div className="mt-4 border-t border-mist pt-8">
          <div className="mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-glacier" />
            <h2 className="font-display text-xl font-700 text-arctic-navy">
              Team Members
            </h2>
          </div>
          <p className="mb-6 font-body text-sm text-granite">
            Add team members with a photo, name, role, and optional short bio.
            Drag to reorder.
          </p>

          <div className="space-y-4">
            {team.map((member, i) => (
              <div
                key={i}
                className="group rounded-xl border border-mist bg-white p-5"
              >
                <div className="flex items-start gap-4">
                  {/* Reorder + grip */}
                  <div className="flex flex-col items-center gap-1 pt-1">
                    <GripVertical className="h-4 w-4 text-granite/40" />
                    <button
                      onClick={() => moveMember(i, -1)}
                      disabled={i === 0}
                      className="rounded p-0.5 text-granite/50 hover:text-glacier disabled:opacity-30"
                      aria-label="Move up"
                    >
                      <ChevronUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => moveMember(i, 1)}
                      disabled={i === team.length - 1}
                      className="rounded p-0.5 text-granite/50 hover:text-glacier disabled:opacity-30"
                      aria-label="Move down"
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Photo */}
                  <div className="w-32 shrink-0">
                    <label className={labelClass}>Photo</label>
                    <ImageUpload
                      value={member.photo}
                      folder="team"
                      onChange={(img) => updateMember(i, { photo: img })}
                    />
                  </div>

                  {/* Fields */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <label className={labelClass}>Name</label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) =>
                          updateMember(i, { name: e.target.value })
                        }
                        placeholder="Full name"
                        className={inputClass}
                      />
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className={labelClass}>Role</label>
                        <input
                          type="text"
                          value={member.role}
                          onChange={(e) =>
                            updateMember(i, { role: e.target.value })
                          }
                          placeholder="e.g. Founder, Guide, Co-founder"
                          className={inputClass}
                        />
                      </div>
                      <div className="w-44">
                        <label className={labelClass}>Group</label>
                        <select
                          value={member.group || "team"}
                          onChange={(e) =>
                            updateMember(i, {
                              group: e.target.value as "founders" | "team",
                            })
                          }
                          className={inputClass}
                        >
                          <option value="founders">Founders</option>
                          <option value="team">Team</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Bio (optional)</label>
                      <textarea
                        value={member.bio || ""}
                        onChange={(e) =>
                          updateMember(i, { bio: e.target.value })
                        }
                        rows={2}
                        placeholder="A short description…"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => removeMember(i)}
                    className="rounded-lg p-1.5 text-granite opacity-0 transition-opacity group-hover:opacity-100 hover:bg-alert-red/10 hover:text-alert-red"
                    aria-label="Remove member"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addMember}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-mist py-4 font-heading text-sm font-600 text-granite transition-all hover:border-glacier/40 hover:text-glacier"
          >
            <Plus className="h-4 w-4" /> Add Team Member
          </button>
        </div>
      </div>
    </div>
  );
}
