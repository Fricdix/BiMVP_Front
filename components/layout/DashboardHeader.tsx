import { APP_CONFIG } from "@/lib/app-config";

export default function DashboardHeader() {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-xl font-semibold">{APP_CONFIG.title}</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {APP_CONFIG.subtitle}
        </p>
        <p className="mt-1 text-xs text-slate-400">{APP_CONFIG.scope}</p>
      </div>

      <div className="flex gap-2">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs dark:bg-slate-800">
          Ecuador
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs dark:bg-slate-800">
          BI
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs dark:bg-slate-800">
          MySQL
        </span>
      </div>
    </div>
  );
}
