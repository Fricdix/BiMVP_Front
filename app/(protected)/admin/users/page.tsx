"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type User = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ANALYST" | "ADMIN";
  createdAt: string;
};

function roleLabel(role: User["role"]) {
  if (role === "ADMIN") return "ADMIN (Gestión total)";
  if (role === "ANALYST") return "ANALYST (Análisis/Reportes)";
  return "USER (Lectura)";
}

export default function UsersAdminPage() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [roleDrafts, setRoleDrafts] = useState<Record<string, User["role"]>>(
    {},
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<User["role"]>("USER");

  async function load() {
    setLoading(true);
    const res = await fetch(`${apiBase}/api/users`, {
      credentials: "include",
    });
    const data = await res.json().catch(() => null);
    setLoading(false);
    if (!res.ok) {
      setErr(data?.message || "No se pudo cargar");
      return;
    }
    const fetched = data.users || [];
    setUsers(fetched);
    setRoleDrafts((prev) => {
      const next = { ...prev };
      fetched.forEach((u: User) => {
        if (!next[u.id]) next[u.id] = u.role;
      });
      return next;
    });
  }

  useEffect(() => {
    load();
  }, []);

  async function createUser(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    const res = await fetch(`${apiBase}/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
      credentials: "include",
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      setErr(data?.message || "No se pudo crear");
      return;
    }
    setName("");
    setEmail("");
    setPassword("");
    setRole("USER");
    load();
  }

  async function removeUser(id: string) {
    setErr(null);
    const res = await fetch(`${apiBase}/api/users/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      setErr(data?.message || "No se pudo eliminar");
      return;
    }
    load();
  }

  async function updateRole(id: string) {
    setErr(null);
    const role = roleDrafts[id];
    const res = await fetch(`${apiBase}/api/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
      credentials: "include",
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      setErr(data?.message || "No se pudo actualizar");
      return;
    }
    load();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-xl font-semibold">Gestión de Usuarios (Admin)</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Control de acceso al sistema BI del mercado tecnológico del Ecuador
            (roles)
          </p>
        </div>
        <div className="flex gap-2">
          <Badge tone="neutral">Ecuador</Badge>
          <Badge tone="neutral">Roles</Badge>
          <Badge tone="neutral">Admin</Badge>
        </div>
      </div>

      <Card>
        <form onSubmit={createUser} className="grid gap-3 p-4 md:grid-cols-5">
          <div>
            <p className="text-sm mb-1">Nombre</p>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="md:col-span-2">
            <p className="text-sm mb-1">Email</p>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </div>
          <div>
            <p className="text-sm mb-1">Contraseña</p>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
          </div>
          <div>
            <p className="text-sm mb-1">Rol</p>
            <select
              className="h-10 w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-3 text-sm"
              value={role}
              onChange={(e) => setRole(e.target.value as User["role"])}
            >
              <option value="USER">USER</option>
              <option value="ANALYST">ANALYST</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          <div className="md:col-span-5 flex items-center justify-between gap-2">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              USER: lectura · ANALYST: reportes/exportación · ADMIN: gestión
              total
            </p>
            <Button type="submit">Crear usuario</Button>
          </div>
        </form>
      </Card>

      {err ? (
        <Card>
          <div className="p-4 text-sm text-red-600">{err}</div>
        </Card>
      ) : null}

      <Card>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <p className="font-semibold">Usuarios registrados</p>
            <Badge tone="neutral">{users.length}</Badge>
          </div>

          {loading ? (
            <p className="mt-3 text-sm text-slate-500">Cargando…</p>
          ) : (
            <div className="mt-4 grid gap-2">
              {users.map((u) => (
                <div
                  key={u.id}
                  className="flex flex-col gap-2 rounded-lg border border-[rgb(var(--border))] p-3 md:flex-row md:items-center md:justify-between"
                >
                  <div className="min-w-0">
                    <p className="font-semibold">{u.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {u.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      tone={
                        u.role === "ADMIN"
                          ? "success"
                          : u.role === "ANALYST"
                            ? "warning"
                            : "neutral"
                      }
                    >
                      {roleLabel(u.role)}
                    </Badge>
                    <select
                      className="h-9 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-2 text-xs"
                      value={roleDrafts[u.id] || u.role}
                      onChange={(e) =>
                        setRoleDrafts((prev) => ({
                          ...prev,
                          [u.id]: e.target.value as User["role"],
                        }))
                      }
                    >
                      <option value="USER">USER</option>
                      <option value="ANALYST">ANALYST</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                    <Button
                      variant="secondary"
                      onClick={() => updateRole(u.id)}
                    >
                      Actualizar
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => removeUser(u.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
