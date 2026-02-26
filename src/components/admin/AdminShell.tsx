"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuthInstance } from "@/lib/firebase";
import { useState } from "react";
import {
  LayoutDashboard,
  Map,
  Mountain,
  Home,
  Tent,
  Waves,
  Info,
  Phone,
  ImageIcon,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Hero", href: "/admin/hero", icon: ImageIcon },
  { label: "Tours", href: "/admin/tours", icon: Map },
  { label: "Races", href: "/admin/races", icon: Mountain },
  { label: "Arctic Lodges", href: "/admin/lodges", icon: Home },
  { label: "Activities", href: "/admin/activities", icon: Waves },
  { label: "About", href: "/admin/about", icon: Info },
  { label: "Contact", href: "/admin/contact", icon: Phone },
];

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(getAuthInstance(), email, password);
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ice-gray px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Image src="/gax-logo.png" alt="GAX" width={64} height={64} className="mx-auto mb-4 h-16 w-16" />
          <h1 className="font-display text-2xl font-800 text-arctic-navy">Admin Login</h1>
          <p className="mt-1 font-body text-sm text-granite">Sign in to manage site content</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-mist bg-white px-4 py-3 font-body text-sm text-charcoal outline-none transition-all focus:border-glacier focus:ring-2 focus:ring-glacier/20"
            />
          </div>
          <div>
            <label className="mb-1.5 block font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-mist bg-white px-4 py-3 font-body text-sm text-charcoal outline-none transition-all focus:border-glacier focus:ring-2 focus:ring-glacier/20"
            />
          </div>
          {error && <p className="font-body text-sm text-alert-red">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-glacier px-6 py-3 font-heading text-sm font-600 text-white transition-all hover:bg-polar-teal disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

function NoAccess() {
  const { logout } = useAuth();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ice-gray px-6 text-center">
      <h1 className="mb-2 font-display text-2xl font-800 text-arctic-navy">No Access</h1>
      <p className="mb-6 font-body text-sm text-stone">Your account does not have admin privileges.</p>
      <button onClick={logout} className="rounded-xl bg-glacier px-6 py-3 font-heading text-sm font-600 text-white hover:bg-polar-teal">
        Sign Out
      </button>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ice-gray">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-glacier border-t-transparent" />
        <p className="font-heading text-sm font-600 text-glacier">Loading…</p>
      </div>
    </div>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading, logout } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (loading) return <LoadingScreen />;
  if (!user) return <LoginForm />;
  if (!isAdmin) return <NoAccess />;

  return (
    <div className="flex min-h-screen bg-ice-gray">
      {/* Sidebar (desktop) */}
      <aside className="hidden w-60 flex-shrink-0 border-r border-mist bg-white lg:flex lg:flex-col">
        <div className="flex h-16 items-center gap-3 border-b border-mist px-5">
          <Image src="/gax-logo.png" alt="GAX" width={36} height={36} className="h-9 w-9" />
          <span className="font-display text-sm font-700 text-arctic-navy">Admin</span>
        </div>
        <nav className="flex-1 overflow-y-auto p-3">
          {navItems.map((item) => {
            const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`mb-0.5 flex items-center gap-3 rounded-lg px-3 py-2.5 font-heading text-[13px] font-500 transition-all duration-150 ${
                  active ? "bg-frost-light text-glacier font-600" : "text-stone hover:bg-frost-light/50 hover:text-arctic-navy"
                }`}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-mist p-3">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 font-heading text-[13px] font-500 text-granite transition-all hover:bg-frost-light/50 hover:text-alert-red"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-mist bg-white px-4 lg:hidden">
          <div className="flex items-center gap-2">
            <Image src="/gax-logo.png" alt="GAX" width={32} height={32} className="h-8 w-8" />
            <span className="font-display text-sm font-700 text-arctic-navy">Admin</span>
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-lg p-2 text-granite hover:bg-frost-light">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </header>

        {/* Mobile nav drawer */}
        {mobileOpen && (
          <div className="border-b border-mist bg-white p-3 lg:hidden">
            {navItems.map((item) => {
              const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`mb-0.5 flex items-center gap-3 rounded-lg px-3 py-2.5 font-heading text-[13px] font-500 transition-all ${
                    active ? "bg-frost-light text-glacier font-600" : "text-stone hover:bg-frost-light/50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={logout}
              className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 font-heading text-[13px] font-500 text-granite hover:text-alert-red"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
