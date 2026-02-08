import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getServerSession } from "@/lib/server-session";

function roleTone(role: string) {
  if (role === "ADMIN") return "success";
  if (role === "ANALYST") return "warning";
  return "neutral";
}

function roleDesc(role: string) {
  if (role === "ADMIN") return "Administra usuarios y datos del sistema";
  if (role === "ANALYST") return "Analiza, filtra y exporta reportes";
  return "Acceso de lectura al dashboard y reportes";
}

export default async function ProfilePage() {
  const user = await getServerSession();
  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Perfil</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Cuenta y permisos para el sistema BI del mercado tecnológico del
          Ecuador
        </p>
      </div>

      <Card>
        <div className="grid gap-4 p-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Nombre</p>
            <p className="font-semibold">{user.name}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
            <p className="font-semibold">{user.email}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Rol</p>
            <div className="flex items-center gap-2">
              <Badge tone={roleTone(user.role)}>{user.role}</Badge>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {roleDesc(user.role)}
              </span>
            </div>
          </div>

          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Alcance del sistema
            </p>
            <Badge tone="neutral">
              Análisis agregado a nivel país (Ecuador)
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
