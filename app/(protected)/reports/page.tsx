"use client";

import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type Report = {
  id: string;
  title: string;
  category: string;
  fromDate: string;
  toDate: string;
  createdAt: string;
  createdBy: { name: string; email: string };
  metrics: { name: string; value: number }[];
};

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);

  const query = useMemo(() => {
    const sp = new URLSearchParams();
    sp.set("category", category || "all");
    if (from) sp.set("from", from);
    if (to) sp.set("to", to);
    return sp.toString();
  }, [category, from, to]);

  async function load() {
    setLoading(true);
    const res = await fetch(`/api/reports?${query}`);
    const data = await res.json().catch(() => null);
    setLoading(false);
    if (!res.ok) return;
    setReports(data?.reports ?? []);
    setCategories(data?.categories ?? []);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  function exportFile(fmt: "csv" | "pdf") {
    const url = `/api/reports/export?format=${fmt}&${query}`;
    window.open(url, "_blank");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-xl font-semibold">
            Reportes de Mercado (Ecuador)
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Filtros y exportación de reportes agregados a nivel país (mercado
            tecnológico)
          </p>
        </div>
        <div className="flex gap-2">
          <Badge tone="neutral">Ecuador</Badge>
          <Badge tone="neutral">Business Intelligence</Badge>
          <Badge tone="neutral">Demo</Badge>
        </div>
      </div>

      <Card>
        <div className="grid gap-3 md:grid-cols-5">
          <div>
            <p className="text-sm mb-1">Desde</p>
            <Input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>

          <div>
            <p className="text-sm mb-1">Hasta</p>
            <Input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <p className="text-sm mb-1">Categoría de producto (mercado)</p>
            <select
              className="h-10 w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-3 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">Todas</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end gap-2">
            <Button
              variant="secondary"
              onClick={() => exportFile("csv")}
              disabled={loading}
            >
              Exportar CSV
            </Button>
            <Button onClick={() => exportFile("pdf")} disabled={loading}>
              Exportar PDF
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid gap-4">
        {loading ? (
          <Card>
            <div className="p-4 text-sm text-slate-500">Cargando…</div>
          </Card>
        ) : reports.length === 0 ? (
          <Card>
            <div className="p-4 text-sm text-slate-500">
              No hay reportes con esos filtros.
            </div>
          </Card>
        ) : (
          reports.map((r) => (
            <Card key={r.id}>
              <div className="flex flex-col gap-3 p-4 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{r.title}</p>
                    <Badge tone="neutral">{r.category}</Badge>
                    <Badge tone="neutral">Ecuador</Badge>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {format(new Date(r.createdAt), "dd/MM/yyyy")} · Rango:{" "}
                    {format(new Date(r.fromDate), "dd/MM/yyyy")} -{" "}
                    {format(new Date(r.toDate), "dd/MM/yyyy")}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Autor: {r.createdBy?.name} ({r.createdBy?.email})
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {(r.metrics ?? []).slice(0, 6).map((m, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-3 py-2"
                    >
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {m.name}
                      </p>
                      <p className="text-sm font-semibold">{m.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
