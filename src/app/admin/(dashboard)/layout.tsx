import { AdminShell } from "@/components/admin/AdminShell";

export const instant = false;

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
