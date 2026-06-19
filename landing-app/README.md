# DevSactum Landing — Fullstack

Landing page de DevSactum construida con **Next.js 15**, **NestJS** y **Go**.

## Arquitectura

| Servicio      | Tecnología | Puerto  |
|---------------|------------|---------|
| Frontend      | Next.js 15 | :3000   |
| API Backend   | NestJS     | :3001   |
| Microservice  | Go + Gin   | :8000   |

## Desarrollo

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

### Backend (NestJS)
```bash
cd backend
npm install
npm run start:dev
```

### Microservice (Go)
```bash
cd microservice
go run main.go
```

### Docker Compose
```bash
docker-compose up --build
```

## Endpoints API

| Método | URL                          | Descripción           |
|--------|------------------------------|-----------------------|
| GET    | /api/health                  | Health check NestJS   |
| GET    | /api/status                  | Status del sistema    |
| POST   | /api/contact                 | Enviar mensaje        |
| GET    | /api/contact                 | Listar mensajes       |
| POST   | /api/chatbot                 | Chat con DevBot       |
| GET    | /health                      | Health check Go       |
| GET    | /api/status                  | Status Go microservice|
| GET    | /api/stats                   | Estadísticas          |
| GET    | /api/team                    | Equipo                |

## Empresa

**Dräkkar Labs** — La Pintana, Santiago, Chile
- Instagram: [@drakkar_labs](https://www.instagram.com/drakkar_labs/)
- GitHub: [gpb-industries/DRAKKAR](https://github.com/gpb-industries/DRAKKAR)
- Web: [drakkar-labs.pages.dev](https://drakkar-labs.pages.dev/)
