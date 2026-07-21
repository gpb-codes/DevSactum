FROM golang:1.22-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/server ./main.go

FROM alpine:3.19

RUN addgroup --system app && adduser --system -G app app

COPY --from=builder /app/server /app/server

USER app

EXPOSE 8000

CMD ["/app/server"]
