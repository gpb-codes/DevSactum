# DevSactum - NestJS API

API complementaria de DevSactum desarrollada en **NestJS** (TypeScript).

## Stack

- **NestJS 10** - Framework Node.js
- **TypeORM** - ORM para PostgreSQL
- **PostgreSQL 16** - Base de datos
- **JWT** - Autenticacion
- **Passport** - Autenticacion

## Modulos

- **UsersModule** - Gestion de usuarios
- **PostsModule** - Publicaciones y feed
- **CommunitiesModule** - Comunidades
- **MessagesModule** - Chat directo y grupal
- **ReputationModule** - Sistema de reputacion
- **AuthModule** - Login y registro

## Endpoints

### Auth
- `POST /api/v1/auth/register` - Registrar usuario
- `POST /api/v1/auth/login` - Iniciar sesion

### Users
- `POST /api/v1/users` - Crear usuario
- `GET /api/v1/users/:id` - Obtener usuario
- `PUT /api/v1/users/:id` - Actualizar usuario
- `DELETE /api/v1/users/:id` - Eliminar usuario

### Posts
- `GET /api/v1/posts` - Feed
- `GET /api/v1/posts/:id` - Obtener post
- `POST /api/v1/posts` - Crear post
- `POST /api/v1/posts/:id/like` - Like
- `DELETE /api/v1/posts/:id` - Eliminar
- `GET /api/v1/posts/user/:userId` - Posts de usuario
- `GET /api/v1/posts/tag/:tag` - Posts por tag

### Communities
- `GET /api/v1/communities` - Listar
- `GET /api/v1/communities/:id` - Obtener
- `POST /api/v1/communities` - Crear
- `POST /api/v1/communities/:id/join` - Unirse
- `POST /api/v1/communities/:id/leave` - Salir

### Messages
- `POST /api/v1/messages` - Enviar
- `GET /api/v1/messages/direct/:userId1/:userId2` - Directos
- `GET /api/v1/messages/community/:communityId` - Comunidad
- `GET /api/v1/messages/unread/:userId` - No leidos

### Reputation
- `GET /api/v1/reputation/user/:userId` - Reputacion
- `GET /api/v1/reputation/user/:userId/history` - Historial
- `GET /api/v1/reputation/leaderboard` - Leaderboard

## Ejecutar localmente

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run start:dev

# Produccion
npm run build
npm run start:prod
```

## Variables de entorno

- `DB_HOST` - Host de PostgreSQL (default: localhost)
- `DB_PORT` - Puerto de PostgreSQL (default: 5432)
- `DB_USER` - Usuario de PostgreSQL (default: devsactum)
- `DB_PASSWORD` - Password de PostgreSQL (default: devsactum)
- `DB_NAME` - Nombre de la base de datos (default: devsactum)
- `JWT_SECRET` - Secreto JWT
- `PORT` - Puerto del servidor (default: 8001)
