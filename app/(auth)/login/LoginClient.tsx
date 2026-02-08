"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const nextParam = sp.get("next");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    const data = await res.json().catch(() => null);
    setLoading(false);

    if (!res.ok) {
      setErr(data?.message || "No se pudo iniciar sesión");
      return;
    }

    const role = data?.session?.role as
      | "USER"
      | "ANALYST"
      | "ADMIN"
      | undefined;
    const safeNext =
      nextParam && (role === "ADMIN" || !nextParam.startsWith("/admin"))
        ? nextParam
        : null;
    const target =
      safeNext || (role === "ADMIN" ? "/admin/dashboard" : "/dashboard");
    router.replace(target);
    router.refresh();
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(14,116,144,0.15),_transparent_55%),_linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_35%,_#ffffff_100%)]">
      <div className="pointer-events-none absolute -left-24 top-24 h-64 w-64 rounded-full bg-cyan-200/40 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-10 h-40 w-40 rounded-full bg-amber-200/50 blur-3xl" />

      <div className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-12 px-6 py-12 md:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-600"
          >
            BI Dashboard MVP
          </Link>
          <h1 className="font-display text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
            Bienvenido al centro de decisiones del mercado tech.
          </h1>
          <p className="text-base text-slate-600 md:text-lg">
            Accede a KPIs diarios, alertas de conversion y recomendaciones de
            influencers. Todo en un solo panel, listo para actuar.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
              <p className="text-xs text-slate-500">Crecimiento semanal</p>
              <p className="text-lg font-semibold text-slate-900">+9.3%</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
              <p className="text-xs text-slate-500">Influencers activos</p>
              <p className="text-lg font-semibold text-slate-900">8 perfiles</p>
            </div>
          </div>
        </section>

        <Card className="w-full max-w-md rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Acceso seguro
              </p>
              <h1 className="mt-2 text-xl font-semibold">Iniciar sesión</h1>
              <p className="text-sm text-slate-500">
                Usa tu cuenta para continuar.
              </p>
            </div>
            <div className="hidden h-12 w-12 rounded-2xl bg-cyan-500/15 md:block" />
          </div>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
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
            </div>
            {err && <p className="text-sm text-red-600">{err}</p>}
            <Button disabled={loading} className="w-full">
              {loading ? "Ingresando…" : "Ingresar"}
            </Button>
          </form>

          <div className="mt-4 text-sm text-slate-600">
            ¿No tienes cuenta?{" "}
            <Link className="text-cyan-700 hover:underline" href="/register">
              Registrate
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
