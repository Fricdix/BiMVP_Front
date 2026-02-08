"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"USER" | "ANALYST">("USER");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    setSuccess(null);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });
    const data = await res.json().catch(() => null);
    setLoading(false);

    if (!res.ok) {
      setErr(data?.message || "No se pudo registrar");
      return;
    }
    setSuccess(data?.message || "Registro exitoso. Inicia sesión.");
    setTimeout(() => router.replace("/login"), 1200);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(2,132,199,0.12),_transparent_55%),_linear-gradient(180deg,_#f8fafc_0%,_#ecfeff_40%,_#ffffff_100%)]">
      <div className="pointer-events-none absolute -left-24 top-24 h-64 w-64 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="pointer-events-none absolute right-12 bottom-16 h-44 w-44 rounded-full bg-emerald-200/40 blur-3xl" />

      <div className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-12 px-6 py-12 md:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-600"
          >
            BI Dashboard MVP
          </Link>
          <h1 className="font-display text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
            Crea tu cuenta y convierte datos en decisiones.
          </h1>
          <p className="text-base text-slate-600 md:text-lg">
            Define tu rol, recibe insights diarios y participa en el analisis
            del mercado tecnologico del Ecuador.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
              <p className="text-xs text-slate-500">Panel colaborativo</p>
              <p className="text-lg font-semibold text-slate-900">
                Roles claros
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
              <p className="text-xs text-slate-500">Reportes listos</p>
              <p className="text-lg font-semibold text-slate-900">PDF & CSV</p>
            </div>
          </div>
        </section>

        <Card className="w-full max-w-md rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Nuevo acceso
              </p>
              <h1 className="mt-2 text-xl font-semibold">Crear cuenta</h1>
              <p className="text-sm text-slate-500">
                Solo usuarios y analistas.
              </p>
            </div>
            <div className="hidden h-12 w-12 rounded-2xl bg-emerald-500/15 md:block" />
          </div>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm">Nombre</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-sm">Email</label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
            </div>
            <div>
              <label className="text-sm">Contraseña</label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
              />
              <p className="mt-1 text-xs text-slate-500">
                Minimo 8 caracteres. Recomendado: mayuscula, numero y simbolo.
              </p>
            </div>
            <div>
              <label className="text-sm">Rol</label>
              <select
                className="h-10 w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-3 text-sm outline-none transition focus:ring-2 focus:ring-emerald-300"
                value={role}
                onChange={(e) => setRole(e.target.value as "USER" | "ANALYST")}
              >
                <option value="USER">Usuario</option>
                <option value="ANALYST">Analista</option>
              </select>
            </div>
            {err && <p className="text-sm text-red-600">{err}</p>}
            {success && <p className="text-sm text-emerald-600">{success}</p>}
            <Button disabled={loading} className="w-full">
              {loading ? "Creando…" : "Registrarme"}
            </Button>
          </form>

          <div className="mt-4 text-sm text-slate-600">
            ¿Ya tienes cuenta?{" "}
            <Link className="text-emerald-700 hover:underline" href="/login">
              Inicia sesion
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
