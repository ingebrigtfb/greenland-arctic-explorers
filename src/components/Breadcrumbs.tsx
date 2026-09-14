import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { BreadcrumbCrumb } from "@/lib/jsonld";

/**
 * Visible breadcrumb trail. Pairs with breadcrumbJsonLd() — both are built from
 * the same crumb array so the markup and the structured data cannot drift.
 */
export default function Breadcrumbs({
  crumbs,
  tone = "light",
}: {
  crumbs: BreadcrumbCrumb[];
  tone?: "light" | "dark";
}) {
  const muted = tone === "dark" ? "text-frost/70" : "text-granite";
  const active = tone === "dark" ? "text-white" : "text-arctic-navy";
  const hover = tone === "dark" ? "hover:text-white" : "hover:text-glacier";

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 font-heading text-xs font-600">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1.5">
              {i > 0 && (
                <ChevronRight aria-hidden="true" className={`h-3 w-3 ${muted}`} />
              )}
              {isLast ? (
                <span className={active} aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.path}
                  className={`${muted} ${hover} rounded transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current`}
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
