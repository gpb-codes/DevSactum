# DevSactum

Plataforma social para desarrolladores. Construye tu perfil tecnico, comparte codigo, unete a comunidades y gana reputacion.

## Stack

| Capa | Tecnologia | Puerto |
|------|------------|--------|
| Frontend | Next.js 14 + TypeScript | 3000 |
| Backend Principal | Go + Gin | 8000 |
| Backend Complementario | NestJS + TypeORM | 8001 |
| Base de datos | PostgreSQL 16 | 5432 |

## Funcionalidades

- **Auth** - Registro y login de usuarios
- **Perfiles** - Stack tecnico, nivel (junior/senior), GitHub username
- **Feed** - Publicaciones con codigo, tags y likes
- **Comunidades** - Grupos tematicos para developers
- **Chat** - Mensajes directos y dentro de comunidades
- **Reputacion** - Sistema de puntos y leaderboard

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
pnpm install
pnpm dev

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
│   └── devsactum-next/    # Next.js frontend
├── backend/
│   ├── go-api/            # Go + Gin API
│   └── nestjs-api/        # NestJS API
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

## Database

PostgreSQL con las siguientes tablas:

- `users` - Usuarios
- `profiles` - Perfiles tecnicos
- `posts` - Publicaciones
- `communities` - Comunidades
- `community_members` - Membresias
- `messages` - Mensajes
- `reputation_events` - Eventos de reputacion

## License

MIT
