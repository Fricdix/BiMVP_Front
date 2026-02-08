import { cookies } from "next/headers";
import { Card, CardTitle, CardValue } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  SalesLine,
  ConversionBar,
  CategoryPie,
} from "@/components/charts/kpi-charts";

type SummaryResponse = {
  kpi: { sales: number; growthPct: number; conversion: number } | null;
  prev: { sales: number; growthPct: number; conversion: number } | null;
  categories: { name: string; value: number }[];
};

type TimeSeriesResponse = {
  points: {
    date: string;
    sales: number;
    growthPct: number;
    conversion: number;
  }[];
};

type InfluencerItem = {
  id: string;
  name: string;
  platform: "TIKTOK" | "YOUTUBE" | "INSTAGRAM" | "TWITTER";
  country: string;
  followers: number;
  engagementPct: number;
  score: number;
  level: "ALTO" | "MEDIO" | "BAJO";
};

type RecommendationItem = {
  id: string;
  matchScore: number;
  note: string;
  product: {
    id: string;
    name: string;
    category: string;
    priceUsd: number | null;
    businessScore: number;
    level: string;
  };
  influencer: {
    id: string;
    name: string;
    platform: "TIKTOK" | "YOUTUBE" | "INSTAGRAM" | "TWITTER";
    followers: number;
    engagementPct: number;
    level: "ALTO" | "MEDIO" | "BAJO";
    country: string;
  };
};

function platformLabel(p: "TIKTOK" | "YOUTUBE" | "INSTAGRAM" | "TWITTER") {
  if (p === "TIKTOK") return "TikTok";
  if (p === "YOUTUBE") return "YouTube";
  if (p === "INSTAGRAM") return "Instagram";
  return "Twitter/X";
}

function levelBadge(level: "ALTO" | "MEDIO" | "BAJO") {
  if (level === "ALTO") return "success";
  if (level === "MEDIO") return "warning";
  return "neutral";
}

export default async function DashboardPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const cookieHeader = cookies().toString();

  const [summaryRes, tsRes, infRes, recRes] = await Promise.all([
    fetch(`${baseUrl}/api/dashboard/summary`, {
      cache: "no-store",
      headers: { cookie: cookieHeader },
    }),
    fetch(`${baseUrl}/api/dashboard/timeseries`, {
      cache: "no-store",
      headers: { cookie: cookieHeader },
    }),
    fetch(`${baseUrl}/api/influencers?platform=ALL`, {
      cache: "no-store",
      headers: { cookie: cookieHeader },
    }),
    fetch(`${baseUrl}/api/recommendations`, {
      cache: "no-store",
      headers: { cookie: cookieHeader },
    }),
  ]);

  const summary: SummaryResponse = summaryRes.ok
    ? await summaryRes.json()
    : { kpi: null, prev: null, categories: [] };

  const ts: TimeSeriesResponse = tsRes.ok ? await tsRes.json() : { points: [] };

  const influencersData = infRes.ok
    ? await infRes.json()
    : { items: [] as InfluencerItem[] };
  const influencers: InfluencerItem[] = influencersData.items ?? [];

  const recData = recRes.ok
    ? await recRes.json()
    : { items: [] as RecommendationItem[] };
  const recommendations: RecommendationItem[] = recData.items ?? [];

  const kpi = summary.kpi;
  const prev = summary.prev;

  const delta = (curr: number, prevVal: number | null) => {
    if (prevVal === null || prevVal === 0) return null;
    return ((curr - prevVal) / Math.abs(prevVal)) * 100;
  };

  const salesDelta = kpi && prev ? delta(kpi.sales, prev.sales) : null;
  const growthDelta = kpi && prev ? delta(kpi.growthPct, prev.growthPct) : null;
  const convDelta = kpi && prev ? delta(kpi.conversion, prev.conversion) : null;

  const topInfluencers = [...influencers]
    .sort((a, b) => (b.followers || 0) - (a.followers || 0))
    .slice(0, 6);

  const topRecs = [...recommendations]
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">
            Panel de Inteligencia de Negocios
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Análisis agregado del mercado tecnológico del Ecuador (MVP)
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border px-3 py-1 text-xs text-slate-600 dark:text-slate-300">
            Ecuador
          </span>
          <span className="rounded-full border px-3 py-1 text-xs text-slate-600 dark:text-slate-300">
            BI
          </span>
          <span className="rounded-full border px-3 py-1 text-xs text-slate-600 dark:text-slate-300">
            MySQL
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardTitle>Productos analizados</CardTitle>
          <CardValue>
            {kpi
              ? kpi.sales.toLocaleString("es-EC", { maximumFractionDigits: 0 })
              : "—"}
          </CardValue>
          {salesDelta !== null && (
            <Badge tone={salesDelta >= 0 ? "success" : "danger"}>
              {salesDelta.toFixed(1)}%
            </Badge>
          )}
        </Card>

        <Card>
          <CardTitle>Crecimiento del mercado</CardTitle>
          <CardValue>{kpi ? `${kpi.growthPct.toFixed(2)}%` : "—"}</CardValue>
          {growthDelta !== null && (
            <Badge tone={growthDelta >= 0 ? "success" : "danger"}>
              {growthDelta.toFixed(1)}%
            </Badge>
          )}
        </Card>

        <Card>
          <CardTitle>Conversión estimada</CardTitle>
          <CardValue>{kpi ? `${kpi.conversion.toFixed(2)}%` : "—"}</CardValue>
          {convDelta !== null && (
            <Badge tone={convDelta >= 0 ? "success" : "danger"}>
              {convDelta.toFixed(1)}%
            </Badge>
          )}
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="flex items-baseline justify-between">
            <CardTitle>Tendencia agregada</CardTitle>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Últimos días (demo)
            </p>
          </div>
          <SalesLine data={ts.points ?? []} />
        </Card>

        <Card>
          <div className="flex items-baseline justify-between">
            <CardTitle>Conversión por período</CardTitle>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Últimos días (demo)
            </p>
          </div>
          <ConversionBar data={ts.points ?? []} />
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <div className="flex items-baseline justify-between">
            <CardTitle>Categorías (Ecuador)</CardTitle>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Distribución
            </p>
          </div>
          <CategoryPie data={summary.categories ?? []} />
        </Card>

        <Card className="lg:col-span-2">
          <CardTitle>Notas del análisis</CardTitle>
          <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <p>
              • Dashboard BI orientado a análisis general del Ecuador (mercado
              tecnológico).
            </p>
            <p>
              • Reportes con filtros por fecha/categoría y exportación PDF/CSV.
            </p>
            <p>
              • Gestión de usuarios por roles (ADMIN/ANALYST) para control de
              acceso.
            </p>
          </div>
        </Card>
      </div>

      <div className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-base font-semibold">
            Influencers y colaboradores Tech
          </h2>
          <a
            href="/influencers"
            className="text-sm text-blue-600 hover:underline"
          >
            Ver todos
          </a>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {topInfluencers.map((inf) => (
            <Card key={inf.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">{inf.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {platformLabel(inf.platform)} · {inf.country}
                  </div>
                </div>
                <Badge tone={levelBadge(inf.level)}>{inf.level}</Badge>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-lg bg-slate-50 p-2 text-center dark:bg-slate-900/40">
                  <div className="text-sm font-semibold">
                    {(inf.followers || 0).toLocaleString("es-EC")}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Seguidores
                  </div>
                </div>
                <div className="rounded-lg bg-slate-50 p-2 text-center dark:bg-slate-900/40">
                  <div className="text-sm font-semibold">
                    {(inf.engagementPct || 0).toFixed(1)}%
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Engagement
                  </div>
                </div>
                <div className="rounded-lg bg-slate-50 p-2 text-center dark:bg-slate-900/40">
                  <div className="text-sm font-semibold">{inf.score}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Puntaje
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {topInfluencers.length === 0 && (
            <Card className="p-4 lg:col-span-3">
              <div className="text-sm text-slate-600 dark:text-slate-300">
                No existen registros de influencers para el período analizado.
              </div>
            </Card>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-base font-semibold">
            Recomendaciones estratégicas
          </h2>
          <a
            href="/recommendations"
            className="text-sm text-blue-600 hover:underline"
          >
            Ver todas
          </a>
        </div>

        <div className="grid gap-4">
          {topRecs.map((r, idx) => (
            <Card key={r.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Coincidencia #{idx + 1}
                  </div>
                  <div className="mt-1 text-sm font-semibold">
                    {r.product.name} → {r.influencer.name}
                  </div>
                  <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    {r.product.category} ·{" "}
                    {platformLabel(r.influencer.platform)} ·{" "}
                    {r.influencer.country}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Puntaje
                  </div>
                  <div className="text-lg font-semibold">{r.matchScore}</div>
                </div>
              </div>

              <div className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                <span className="font-medium">Nota:</span> {r.note}
              </div>
            </Card>
          ))}

          {topRecs.length === 0 && (
            <Card className="p-4">
              <div className="text-sm text-slate-600 dark:text-slate-300">
                No se han generado recomendaciones estratégicas para los datos
                actuales.
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
