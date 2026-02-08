# BI Dashboard MVP (Next.js 14 + PostgreSQL)

## 1) Requisitos
- Node.js 18+
- PostgreSQL

## 2) Configuración
```bash
cp .env.example .env
# edita DATABASE_URL y JWT_SECRET
```

## 3) Instalar dependencias
```bash
npm install
```

## 4) Migraciones + seed (datos demo)
```bash
npm run prisma:generate
npm run prisma:migrate
npm run db:seed
```

## 5) Ejecutar
```bash
npm run dev
```

## Credenciales demo
- Admin: `admin@demo.com` / `Admin123*`
- Analista: `analyst@demo.com` / `Analyst123*`

## Módulos
- Autenticación (login/registro) + rutas protegidas
- Dashboard (KPIs + gráficos)
- Reportes (filtros + exportar PDF/CSV)
- Admin Usuarios (CRUD + roles)
- Perfil

