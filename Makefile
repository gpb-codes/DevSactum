.PHONY: help infra infra-down dev-nestjs dev-go dev-python build-nestjs build-go test-nestjs lint-nestjs clean

help:
	@echo "DevSactum - Comandos de desarrollo"
	@echo ""
	@echo "Infraestructura:"
	@echo "  make infra        Iniciar servicios (postgres, redis, minio, rabbitmq)"
	@echo "  make infra-down   Detener servicios"
	@echo ""
	@echo "Desarrollo local:"
	@echo "  make dev-nestjs   Iniciar NestJS en modo watch"
	@echo "  make dev-go       Compilar y ejecutar Go API"
	@echo "  make dev-python   Ejecutar Python Worker"
	@echo ""
	@echo "Compilar:"
	@echo "  make build-nestjs Compilar NestJS"
	@echo "  make build-go     Compilar Go API"
	@echo ""
	@echo "Testing:"
	@echo "  make test-nestjs  Ejecutar tests de NestJS"
	@echo ""
	@echo "Utils:"
	@echo "  make lint-nestjs  Lint NestJS"
	@echo "  make clean        Limpiar archivos generados"

infra:
	docker compose -f docker-compose.yml up -d postgres redis minio rabbitmq minio-setup

infra-down:
	docker compose -f docker-compose.yml down

dev-nestjs:
	cd backend/nestjs-api && npm run dev

dev-go:
	cd backend/go-api && go run .

dev-python:
	cd backend/python-worker && python -m worker

build-nestjs:
	cd backend/nestjs-api && npm run build

build-go:
	cd backend/go-api && go build -o server.exe .

test-nestjs:
	cd backend/nestjs-api && npm test

lint-nestjs:
	cd backend/nestjs-api && npm run lint

clean:
	rm -rf backend/nestjs-api/dist
	rm -f backend/go-api/server.exe
	rm -rf backend/nestjs-api/node_modules
