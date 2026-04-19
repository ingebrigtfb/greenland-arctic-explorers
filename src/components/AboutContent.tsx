"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getAbout } from "@/lib/content";
import type { AboutContent as AboutData, TeamMember } from "@/lib/types";
import { Users } from "lucide-react";

export default function AboutContent() {
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAbout()
      .then((d) => {
        if (d) setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const team: TeamMember[] = data?.team || [];
  const founders = team.filter((m) => m.group === "founders");
  const members = team.filter((m) => !m.group || m.group === "team");

  function renderGrid(people: TeamMember[]) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {people.map((member, i) => (
          <div key={i}>
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-border">
              {member.photo?.url ? (
                <Image
                  src={member.photo.url}
                  alt={member.photo.alt || member.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="font-display text-4xl font-700 text-border/60">
                    {member.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </span>
                </div>
              )}
            </div>
            <div className="px-1 py-3">
              <h3 className="font-display text-sm font-700 text-navy">
                {member.name}
              </h3>
              <p className="mt-0.5 font-heading text-xs font-500 text-glacier">
                {member.role}
              </p>
              {member.bio && (
                <p className="mt-2 font-body text-xs leading-relaxed text-charcoal/60">
                  {member.bio}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (loading) {
    return (
      <section className="mx-auto max-w-4xl px-6 pt-40 pb-24 text-center lg:px-12">
        <div className="mb-3 mx-auto h-3 w-20 animate-pulse rounded bg-mist" />
        <div className="mb-10 mx-auto h-9 w-48 animate-pulse rounded bg-mist" />
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="h-4 w-full animate-pulse rounded bg-mist" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-mist" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-mist" />
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-6 pt-40 pb-24 text-center lg:px-12">
      {/* Overline + Title */}
      <p className="mb-3 font-heading text-xs font-600 uppercase tracking-[0.15em] text-glacier">
        {data?.overline || "Our Story"}
      </p>
      <h1 className="mb-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-800 leading-tight text-navy">
        {data?.title || "About Us"}
      </h1>

      {/* Content blocks */}
      {data?.blocks && data.blocks.length > 0 ? (
        <div className="space-y-16 text-left">
          {data.blocks.map((block, i) => (
            <div
              key={i}
              className={`flex flex-col gap-8 ${
                block.image
                  ? i % 2 === 0
                    ? "lg:flex-row"
                    : "lg:flex-row-reverse"
                  : "items-center"
              }`}
            >
              {block.image?.url && (
                <div className="lg:w-2/5">
                  <div className="overflow-hidden rounded-2xl">
                    <Image
                      src={block.image.url}
                      alt={block.image.alt || block.headline}
                      width={600}
                      height={400}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </div>
              )}
              <div className={block.image ? "lg:w-3/5" : "w-full"}>
                {block.headline && (
                  <h2 className="mb-4 font-display text-2xl font-700 text-navy lg:text-3xl">
                    {block.headline}
                  </h2>
                )}
                {block.body && (
                  <div className="font-body text-lg leading-relaxed text-charcoal/80 whitespace-pre-line">
                    {block.body}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mx-auto max-w-2xl font-body text-lg leading-relaxed text-charcoal/80">
          Founded in 2022, Greenland Arctic Xplorers was born from a passion for
          sharing the raw beauty of the Arctic with the world. Our team of local
          guides and expedition leaders brings decades of combined experience.
        </p>
      )}

      {/* ── Founders ── */}
      {founders.length > 0 && (
        <div className="mt-24 text-center">
          <div className="mb-2 flex items-center justify-center gap-2.5">
            <Users className="h-5 w-5 text-glacier" />
            <p className="font-heading text-xs font-600 uppercase tracking-[0.15em] text-glacier">
              Founders
            </p>
          </div>
          <div className="mb-10" />
          {renderGrid(founders)}
        </div>
      )}

      {/* ── Team ── */}
      {members.length > 0 && (
        <div className="mt-20 text-center">
          <div className="mb-2 flex items-center justify-center gap-2.5">
            <Users className="h-5 w-5 text-glacier" />
            <p className="font-heading text-xs font-600 uppercase tracking-[0.15em] text-glacier">
              The Crew
            </p>
          </div>
          <div className="mb-10" />
          {renderGrid(members)}
        </div>
      )}
    </section>
  );
}
