import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "@/lib/server-session";
import { ThemeToggle } from "@/components/shell/theme-toggle";
import { LogoutButton } from "@/components/shell/logout-button";

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session) redirect("/login");

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/reports", label: "Reportes" },
    { href: "/profile", label: "Perfil" },
  ];
  if (session.role === "ADMIN") {
    links.splice(1, 0, { href: "/admin/dashboard", label: "Admin" });
    links.splice(3, 0, { href: "/admin/users", label: "Usuarios" });
  }

  return (
    <div className="min-h-screen">
      <div className="flex">
        <aside className="hidden md:block md:w-64 border-r border-[rgb(var(--border))] bg-[rgb(var(--card))]">
          <div className="p-5">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-brand-600" />
              <div>
                <p className="text-sm font-semibold">BI Dashboard</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  MVP
                </p>
              </div>
            </div>
          </div>
          <nav className="px-3 pb-6">
            <ul className="space-y-1">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="flex-1">
          <header className="sticky top-0 z-10 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/80 backdrop-blur">
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Bienvenido,
                </p>
                <p className="font-semibold">{session.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <LogoutButton variant="ghost" />
              </div>
            </div>
          </header>

          <div className="p-4 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
