"use client";

import Link from "next/link";
import { Map, Mountain, Home, Waves, ImageIcon, Info, Phone } from "lucide-react";

const sections = [
  { label: "Hero", href: "/admin/hero", icon: ImageIcon, description: "Edit homepage hero section" },
  { label: "Tours", href: "/admin/tours", icon: Map, description: "Manage expedition tours" },
  { label: "Races", href: "/admin/races", icon: Mountain, description: "Manage races & events" },
  { label: "Arctic Lodges", href: "/admin/lodges", icon: Home, description: "Manage lodge listings" },
  { label: "Activities", href: "/admin/activities", icon: Waves, description: "Manage activities" },
  { label: "About", href: "/admin/about", icon: Info, description: "Edit about page content" },
  { label: "Contact", href: "/admin/contact", icon: Phone, description: "Edit contact info" },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="mb-1 font-display text-2xl font-800 text-arctic-navy lg:text-3xl">Dashboard</h1>
      <p className="mb-8 font-body text-sm text-granite">Manage your site content</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.href}
              href={s.href}
              className="group flex items-start gap-4 rounded-xl border border-mist bg-white p-5 transition-all duration-200 hover:border-glacier/30 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-frost-light text-glacier transition-colors group-hover:bg-glacier group-hover:text-white">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-heading text-sm font-600 text-arctic-navy">{s.label}</p>
                <p className="font-body text-xs text-granite">{s.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
