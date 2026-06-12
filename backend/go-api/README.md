# DevSactum - Go API

API principal de DevSactum desarrollada en **Go** con **Gin**.

## Stack

- **Go 1.22** - Lenguaje de programacion
- **Gin** - Framework HTTP
- **PostgreSQL 16** - Base de datos
- **bcrypt** - Encriptacion de passwords

## Endpoints

### Auth
- `POST /api/v1/auth/register` - Registrar usuario
- `POST /api/v1/auth/login` - Iniciar sesion
- `GET /api/v1/auth/user/:id` - Obtener perfil
- `PUT /api/v1/auth/user/:id` - Actualizar perfil

### Posts
- `GET /api/v1/posts` - Feed principal
- `GET /api/v1/posts/:id` - Obtener post
- `POST /api/v1/posts` - Crear post
- `POST /api/v1/posts/:id/like` - Like a post
- `DELETE /api/v1/posts/:id` - Eliminar post
- `GET /api/v1/posts/user/:user_id` - Posts de un usuario
- `GET /api/v1/posts/tag/:tag` - Posts por tag

### Communities
- `GET /api/v1/communities` - Listar comunidades
- `GET /api/v1/communities/:id` - Obtener comunidad
- `POST /api/v1/communities` - Crear comunidad
- `POST /api/v1/communities/:id/join` - Unirse a comunidad
- `POST /api/v1/communities/:id/leave` - Salir de comunidad

### Messages
- `POST /api/v1/messages` - Enviar mensaje
- `GET /api/v1/messages/direct/:user_id_1/:user_id_2` - Mensajes directos
- `GET /api/v1/messages/community/:community_id` - Mensajes de comunidad
- `GET /api/v1/messages/unread` - Conteo de no leidos

### Reputation
- `GET /api/v1/reputation/user/:user_id` - Reputacion de usuario
- `GET /api/v1/reputation/user/:user_id/history` - Historial de reputacion
- `GET /api/v1/reputation/leaderboard` - Leaderboard

## Ejecutar localmente

```bash
# Instalar dependencias
go mod download

# Ejecutar
go run ./cmd/api

# O construir
go build -o server ./cmd/api
./server
```

## Variables de entorno

- `DATABASE_URL` - URL de conexion a PostgreSQL
- `PORT` - Puerto del servidor (default: 8000)
