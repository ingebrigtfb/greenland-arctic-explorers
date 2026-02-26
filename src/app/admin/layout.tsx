import AdminShell from "@/components/admin/AdminShell";

export const metadata = {
  title: "Admin — Greenland Arctic Xplorers",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
