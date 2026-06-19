# DevSactum

Plataforma social para desarrolladores. Construye tu perfil tecnico, comparte codigo, unete a comunidades y gana reputacion.

## Stack

| Capa | Tecnologia | Puerto |
|------|------------|--------|
| Frontend | Next.js 15 + TypeScript + Tailwind CSS 4 | 3000 |
| Backend Principal | Go + Gin | 8000 |
| Backend Complementario | NestJS + TypeORM | 8001 |
| Base de datos | PostgreSQL 16 (SQLite en dev) | 5432 |

## Funcionalidades

- **Auth** - Registro y login de usuarios (JWT)
- **Perfiles** - Stack tecnico, nivel (junior/senior), GitHub username
- **Feed** - Publicaciones con codigo, tags y likes
- **Comunidades** - Grupos tematicos para developers
- **Chat** - Mensajes directos y dentro de comunidades
- **Reputacion** - Sistema de puntos y leaderboard
- **Bolsa de Empleo** - Ofertas de trabajo, postulaciones, dashboard de empresas
- **Portafolio** - Proyectos personales destacados
- **Freelancing** - Proyectos y propuestas freelance
- **Validacion Tecnica** - Evaluaciones de habilidades
- **Pagos** - Suscripciones Pro/Enterprise via PayPal

## Quick Start

```bash
# Docker (recomendado)
docker-compose up --build
```

- Frontend: http://localhost:3000
- Go API: http://localhost:8000
- NestJS API: http://localhost:8001

## Desarrollo Local

```bash
# Frontend
cd Frontend/devsactum-next
npm install
npm run dev

# Go API
cd backend/go-api
go mod download
go run ./cmd/api

# NestJS API
cd backend/nestjs-api
npm install
npm run start:dev
```

## Estructura

```
DevSactum/
├── Frontend/
│   └── devsactum-next/    # Next.js 15 frontend (SPA)
├── backend/
│   ├── go-api/            # Go + Gin API (:8000)
│   └── nestjs-api/        # NestJS API (:8001)
├── database/
│   └── schema.sql         # Schema PostgreSQL
└── docker-compose.yml
```

## API Endpoints

### Go API (`:8000`)

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| POST | `/api/v1/auth/register` | Registrar usuario |
| POST | `/api/v1/auth/login` | Iniciar sesion |
| GET | `/api/v1/posts` | Feed principal |
| POST | `/api/v1/posts` | Crear post |
| POST | `/api/v1/posts/:id/like` | Like a post |
| GET | `/api/v1/communities` | Listar comunidades |
| POST | `/api/v1/communities` | Crear comunidad |
| POST | `/api/v1/communities/:id/join` | Unirse a comunidad |
| POST | `/api/v1/messages` | Enviar mensaje |
| GET | `/api/v1/reputation/leaderboard` | Leaderboard |
| GET | `/api/v1/jobs` | Listar empleos |
| POST | `/api/v1/jobs` | Crear empleo |
| POST | `/api/v1/jobs/:id/apply` | Postularse a empleo |
| GET | `/api/v1/company/dashboard` | Dashboard de empresa |

### NestJS API (`:8001`)

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| POST | `/api/v1/auth/register` | Registrar usuario |
| POST | `/api/v1/auth/login` | Iniciar sesion |
| GET | `/api/v1/posts` | Feed |
| GET | `/api/v1/posts/tag/:tag` | Posts por tag |
| GET | `/api/v1/communities` | Comunidades |
| GET | `/api/v1/messages/unread/:userId` | Mensajes no leidos |
| GET | `/api/v1/reputation/leaderboard` | Leaderboard |
| GET | `/api/v1/jobs` | Listar empleos |
| POST | `/api/v1/jobs` | Crear empleo |
| POST | `/api/v1/jobs/:id/apply` | Postularse |
| GET | `/api/v1/portfolio/user/:userId` | Portafolio de usuario |
| GET | `/api/v1/freelance` | Proyectos freelance |
| POST | `/api/v1/freelance/:id/bid` | Enviar propuesta |
| GET | `/api/v1/validations/user/:userId` | Validaciones de usuario |
| GET | `/api/v1/company/dashboard` | Dashboard de empresa |

## Database

PostgreSQL con las siguientes tablas:

- `users` - Usuarios
- `profiles` - Perfiles tecnicos
- `posts` - Publicaciones
- `communities` - Comunidades
- `community_members` - Membresias
- `messages` - Mensajes
- `reputation_events` - Eventos de reputacion
- `jobs` - Ofertas de empleo
- `job_applications` - Postulaciones
- `job_bookmarks` - Empleos guardados
- `portfolios` - Portafolios
- `freelance_projects` - Proyectos freelance
- `freelance_bids` - Propuestas freelance
- `validations` - Validaciones tecnicas
- `subscriptions` - Suscripciones

## License

MIT
