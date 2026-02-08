import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "@/lib/server-session";
import { Card, CardTitle, CardValue } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function AdminDashboardPage() {
  const session = await getServerSession();
  if (!session) redirect("/login");
  if (session.role !== "ADMIN") redirect("/dashboard");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-xl font-semibold">Dashboard Admin</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Control total de usuarios, roles y reportes del sistema.
          </p>
        </div>
        <div className="flex gap-2">
          <Badge tone="neutral">Admin</Badge>
          <Badge tone="neutral">Ecuador</Badge>
          <Badge tone="neutral">BI</Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardTitle>Gestion de usuarios</CardTitle>
          <CardValue>Acceso total</CardValue>
          <p className="mt-2 text-xs text-slate-500">
            Asigna roles y elimina cuentas.
          </p>
        </Card>
        <Card>
          <CardTitle>Reportes criticos</CardTitle>
          <CardValue>Prioridad</CardValue>
          <p className="mt-2 text-xs text-slate-500">
            Exporta y revisa actividad del sistema.
          </p>
        </Card>
        <Card>
          <CardTitle>Estado del sistema</CardTitle>
          <CardValue>Operativo</CardValue>
          <p className="mt-2 text-xs text-slate-500">
            Backend y base de datos activos.
          </p>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold">Acciones rapidas</p>
            <p className="text-xs text-slate-500">
              Administra usuarios y revisa roles.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/users"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white"
            >
              Ver usuarios
            </Link>
            <Link
              href="/reports"
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700"
            >
              Ver reportes
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
