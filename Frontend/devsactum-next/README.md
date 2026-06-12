# DevSactum - Frontend

Aplicacion web para la plataforma social de desarrolladores.

## Stack

- **Next.js 14** - Framework React
- **TypeScript** - Tipado estatico
- **Tailwind CSS** - Estilos

## Backends

- **Go API** (puerto 8000) - API principal con Gin
- **NestJS API** (puerto 8001) - API complementaria con TypeORM

## Getting Started

```bash
# Instalar dependencias
pnpm install

# Desarrollo
pnpm dev

# Build
pnpm build

# Start
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Estructura

```
src/
  components/    - Componentes UI
  features/      - Modulos por feature
  hooks/         - Custom hooks
  lib/           - Utilidades
  store/         - Estado global
  types/         - Tipos TypeScript
```

## API

El frontend se conecta a dos backends:

### Go API (Principal)
- Auth, Posts, Communities, Messages, Reputation
- Puerto: 8000

### NestJS API (Complementaria)
- Endpoints adicionales
- Puerto: 8001
