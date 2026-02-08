import { cookies } from "next/headers";
import { Card, CardTitle, CardValue } from "@/components/ui/card";

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

function platformLabel(p: RecommendationItem["influencer"]["platform"]) {
  if (p === "TIKTOK") return "TikTok";
  if (p === "YOUTUBE") return "YouTube";
  if (p === "INSTAGRAM") return "Instagram";
  return "Twitter/X";
}

export default async function RecommendationsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const cookieHeader = cookies().toString();

  const res = await fetch(`${baseUrl}/api/recommendations`, {
    cache: "no-store",
    headers: { cookie: cookieHeader },
  });

  const data = res.ok
    ? await res.json()
    : { items: [] as RecommendationItem[] };
  const items: RecommendationItem[] = data.items ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Recomendaciones Estratégicas</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Emparejamiento producto ↔ influencer para campañas a nivel país
          (Ecuador).
        </p>
      </div>

      <div className="grid gap-4">
        {items.map((r, idx) => (
          <Card key={r.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Coincidencia #{idx + 1}
                </div>
                <CardTitle className="mt-1">{r.product.name}</CardTitle>
                <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Categoría:{" "}
                  <span className="font-medium">{r.product.category}</span> ·
                  Nivel: <span className="font-medium">{r.product.level}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Puntaje
                </div>
                <CardValue>{r.matchScore}</CardValue>
              </div>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/40">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Producto
                </div>
                <div className="mt-1 text-sm font-semibold">
                  {r.product.name}
                </div>
                <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Precio:{" "}
                  <span className="font-medium">
                    {r.product.priceUsd ? `$${r.product.priceUsd}` : "—"}
                  </span>{" "}
                  · Business Score:{" "}
                  <span className="font-medium">{r.product.businessScore}</span>
                </div>
              </div>

              <div className="rounded-xl border bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/40">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Influencer
                </div>
                <div className="mt-1 text-sm font-semibold">
                  {r.influencer.name}
                </div>
                <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {platformLabel(r.influencer.platform)} ·{" "}
                  {r.influencer.country} · Seguidores:{" "}
                  <span className="font-medium">
                    {(r.influencer.followers || 0).toLocaleString("es-EC")}
                  </span>
                </div>
                <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Engagement:{" "}
                  <span className="font-medium">
                    {r.influencer.engagementPct}%
                  </span>{" "}
                  · Nivel:{" "}
                  <span className="font-medium">{r.influencer.level}</span>
                </div>
              </div>
            </div>

            <div className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              <span className="font-medium">Nota:</span> {r.note}
            </div>
          </Card>
        ))}

        {items.length === 0 && (
          <Card className="p-4">
            <div className="text-sm text-slate-600 dark:text-slate-300">
              No hay recomendaciones todavía. Corre el seed otra vez:
              <span className="ml-2 rounded bg-slate-100 px-2 py-1 font-mono text-xs dark:bg-slate-800">
                npx prisma db seed
              </span>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
