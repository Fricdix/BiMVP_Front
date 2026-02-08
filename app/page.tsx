import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.08),_transparent_55%),_linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_35%,_#ffffff_100%)] text-slate-900">
      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-blue-600 shadow-[0_12px_30px_rgba(37,99,235,0.35)]" />
          <div>
            <p className="text-sm font-semibold tracking-wide">BI Dashboard</p>
            <p className="text-xs text-slate-500">MVP · Ecuador</p>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          <a className="hover:text-slate-900" href="#producto">
            Producto
          </a>
          <a className="hover:text-slate-900" href="#kpis">
            KPIs
          </a>
          <a className="hover:text-slate-900" href="#influencers">
            Influencers
          </a>
          <a className="hover:text-slate-900" href="#reportes">
            Reportes
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:border-slate-300"
          >
            Iniciar sesion
          </Link>
        </div>
      </header>

      <main className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-6">
        <div className="absolute -left-24 top-32 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute right-6 top-12 h-40 w-40 rounded-full bg-indigo-300/40 blur-3xl" />

        <section className="relative z-10 grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-blue-600/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
              BI Dashboard MVP
            </p>
            <h1 className="font-display text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
              Inteligencia de negocios para tomar decisiones en tiempo real.
            </h1>
            <p className="text-base text-slate-600 md:text-lg">
              Visualiza KPIs, crecimiento del mercado, conversiones y perfiles
              de influencers en un solo lugar. Diseñado para equipos de analisis
              que necesitan claridad y velocidad.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/login"
                className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(37,99,235,0.35)] hover:bg-blue-700"
              >
                Entrar al dashboard
              </Link>
              <Link
                href="/register"
                className="rounded-full border border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-blue-700 hover:border-blue-300"
              >
                Crear cuenta
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 text-xs text-slate-500">
              <span>Datos reales de Ecuador</span>
              <span>KPIs diarios y series historicas</span>
              <span>Recomendaciones estrategicas</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-4 -top-6 h-24 w-24 rounded-3xl bg-indigo-500/20 blur-2xl" />
            <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Snapshot del MVP
              </p>
              <div className="mt-4 grid gap-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Ventas del periodo</p>
                  <p className="font-display text-2xl font-semibold text-slate-900">
                    $21.5K
                  </p>
                  <p className="text-xs text-emerald-600">+9.3% vs ayer</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs text-slate-500">Conversion</p>
                    <p className="text-lg font-semibold text-slate-900">4.8%</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs text-slate-500">Influencers</p>
                    <p className="text-lg font-semibold text-slate-900">
                      +8 activos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="producto" className="mt-20 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Panel de KPIs",
              text: "Mide ventas, crecimiento y conversion diaria en un tablero unico.",
            },
            {
              title: "Analisis de mercado",
              text: "Categoria y demanda con insights claros para decisiones rapidas.",
            },
            {
              title: "Influencers y match",
              text: "Recomendaciones de colaboraciones con puntajes de afinidad.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="font-display text-lg font-semibold">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{item.text}</p>
            </div>
          ))}
        </section>

        <section
          id="kpis"
          className="mt-20 grid gap-10 rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-sm md:grid-cols-[1fr_1.1fr]"
        >
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              KPIs esenciales
            </p>
            <h2 className="font-display text-3xl font-semibold">
              Datos diarios para equipos de analisis exigentes.
            </h2>
            <p className="text-sm text-slate-600">
              El MVP centraliza ventas, crecimiento y conversion, mostrando la
              evolucion del mercado y alertas de variacion por categoria.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Ventas", value: "$21.5K" },
              { label: "Crecimiento", value: "+9.3%" },
              { label: "Conversion", value: "4.8%" },
              { label: "Score negocio", value: "8.4" },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-2xl border border-slate-200 bg-white p-4"
              >
                <p className="text-xs text-slate-500">{kpi.label}</p>
                <p className="text-lg font-semibold text-slate-900">
                  {kpi.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="reportes"
          className="mt-20 grid gap-6 md:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="font-display text-2xl font-semibold">
              Reportes listos para presentar
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Filtra por rango de fechas, categoria y exporta en PDF o CSV.
              Ideal para reuniones con liderazgo o clientes.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                Exportacion PDF
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                Indicadores clave
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                Roles y permisos
              </span>
            </div>
          </div>
          <div
            id="influencers"
            className="rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-500 p-8 text-white"
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">
              Influencers
            </h3>
            <p className="mt-4 text-xl font-semibold">
              Match inteligente con creadores que impulsan conversiones.
            </p>
            <p className="mt-3 text-sm text-blue-100">
              Ranking por engagement, alcance y score de negocio.
            </p>
          </div>
        </section>

        <section className="mt-20 rounded-3xl bg-slate-900 px-8 py-10 text-white">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-2xl font-semibold">
                Listo para ver el dashboard en accion?
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Accede con tu cuenta y revisa el panel de BI completo.
              </p>
            </div>
            <Link
              href="/login"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900"
            >
              Iniciar sesion
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
