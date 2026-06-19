package main

import (
	"log"
	"net/http"
	"os"

	"devsactum-microservice/handlers"

	"github.com/gin-gonic/gin"
)

func main() {
	port := os.Getenv("GO_PORT")
	if port == "" {
		port = "8000"
	}

	gin.SetMode(gin.ReleaseMode)
	r := gin.New()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	// CORS middleware
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}
		c.Next()
	})

	// Health check
	r.GET("/health", handlers.HealthCheck)
	r.GET("/api/status", handlers.GetStatus)
	r.GET("/api/stats", handlers.GetStats)
	r.GET("/api/team", handlers.GetTeam)

	log.Printf("Go microservice running on port %s", port)
	log.Printf("Health: http://localhost:%s/health", port)

	if err := r.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
