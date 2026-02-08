import { cookies } from "next/headers";
import { Card, CardTitle, CardValue } from "@/components/ui/card";

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

function badgeColor(level: InfluencerItem["level"]) {
  if (level === "ALTO")
    return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200";
  if (level === "MEDIO")
    return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200";
  return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-200";
}

function platformLabel(p: InfluencerItem["platform"]) {
  if (p === "TIKTOK") return "TikTok";
  if (p === "YOUTUBE") return "YouTube";
  if (p === "INSTAGRAM") return "Instagram";
  return "Twitter/X";
}

export default async function InfluencersPage({
  searchParams,
}: {
  searchParams: { platform?: string };
}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const cookieHeader = cookies().toString();
  const platform = (searchParams.platform || "ALL").toUpperCase();

  const res = await fetch(`${baseUrl}/api/influencers?platform=${platform}`, {
    cache: "no-store",
    headers: { cookie: cookieHeader },
  });

  const data = res.ok ? await res.json() : { items: [] as InfluencerItem[] };
  const items: InfluencerItem[] = data.items ?? [];

  const total = items.length;
  const totalFollowers = items.reduce((acc, i) => acc + (i.followers || 0), 0);
  const avgEng =
    total === 0
      ? 0
      : items.reduce((acc, i) => acc + (i.engagementPct || 0), 0) / total;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Influencers Tech (Ecuador)</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Influencers del mercado tecnológico a nivel país (datos demo).
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <a
          href="/influencers?platform=ALL"
          className={`rounded-full border px-3 py-1 text-sm ${
            platform === "ALL"
              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
              : "bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-200"
          }`}
        >
          Todos
        </a>
        <a
          href="/influencers?platform=TIKTOK"
          className={`rounded-full border px-3 py-1 text-sm ${
            platform === "TIKTOK"
              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
              : "bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-200"
          }`}
        >
          TikTok
        </a>
        <a
          href="/influencers?platform=YOUTUBE"
          className={`rounded-full border px-3 py-1 text-sm ${
            platform === "YOUTUBE"
              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
              : "bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-200"
          }`}
        >
          YouTube
        </a>
        <a
          href="/influencers?platform=INSTAGRAM"
          className={`rounded-full border px-3 py-1 text-sm ${
            platform === "INSTAGRAM"
              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
              : "bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-200"
          }`}
        >
          Instagram
        </a>
        <a
          href="/influencers?platform=TWITTER"
          className={`rounded-full border px-3 py-1 text-sm ${
            platform === "TWITTER"
              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
              : "bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-200"
          }`}
        >
          Twitter/X
        </a>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardTitle>Total influencers</CardTitle>
          <CardValue>{total}</CardValue>
        </Card>
        <Card>
          <CardTitle>Seguidores totales</CardTitle>
          <CardValue>{totalFollowers.toLocaleString("es-EC")}</CardValue>
        </Card>
        <Card>
          <CardTitle>Engagement promedio</CardTitle>
          <CardValue>{avgEng.toFixed(2)}%</CardValue>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {items.map((inf) => (
          <Card key={inf.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold">{inf.name}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {platformLabel(inf.platform)} · {inf.country}
                </div>
              </div>
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${badgeColor(inf.level)}`}
              >
                {inf.level}
              </span>
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

        {items.length === 0 && (
          <Card className="p-4 lg:col-span-3">
            <div className="text-sm text-slate-600 dark:text-slate-300">
              No hay influencers para el filtro seleccionado.
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
