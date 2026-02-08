import Link from "next/link";
import { ThemeToggle } from "@/components/shell/theme-toggle";
import { LogoutButton } from "@/components/shell/logout-button";
import { getMe } from "@/lib/server/me";

export async function AppShell({ children }: { children: React.ReactNode }) {
  const me = await getMe().catch(() => null);

  return (
    <div className="min-h-screen">
      <div className="flex">
        <aside className="hidden md:block w-64 shrink-0 border-r border-[rgb(var(--border))] bg-[rgb(var(--card))]">
          <div className="p-4">
            <div className="text-sm font-semibold tracking-tight">
              BI Ecuador
            </div>
            <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              Mercado Tecnológico · MVP · Next.js 14
            </div>
          </div>

          <nav className="px-2 pb-4 text-sm">
            <NavLink href="/dashboard" label="Dashboard (Ecuador)" />
            <NavLink href="/reports" label="Reportes de Mercado" />
            <NavLink href="/influencers" label="Influencers Tech" />
            <NavLink
              href="/recommendations"
              label="Recomendaciones Estratégicas"
            />
            <NavLink href="/profile" label="Perfil" />
            {me?.role === "ADMIN" ? (
              <NavLink href="/admin/users" label="Usuarios (Admin)" />
            ) : null}
          </nav>
        </aside>

        <div className="flex-1">
          <header className="sticky top-0 z-10 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/80 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="md:hidden text-sm font-semibold">
                  BI Ecuador
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium">
                    Hola, {me?.name ?? "—"}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    Rol: {me?.role ?? "—"} · Alcance: Ecuador
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ThemeToggle />
                <LogoutButton />
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
    >
      <span>{label}</span>
      <span className="text-xs text-slate-400">›</span>
    </Link>
  );
}
