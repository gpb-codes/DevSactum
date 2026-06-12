package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/gpb-codes/DevSactum/backend/go-api/internal/handlers"
	"github.com/gpb-codes/DevSactum/backend/go-api/internal/repository"
	"github.com/gpb-codes/DevSactum/backend/go-api/internal/services"
)

func main() {
	if err := repository.Connect(); err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	defer repository.DB.Close()

	authService := services.NewAuthService()
	postService := services.NewPostService()
	communityService := services.NewCommunityService()
	messageService := services.NewMessageService()
	reputationService := services.NewReputationService()

	authHandler := handlers.NewAuthHandler(authService)
	postHandler := handlers.NewPostHandler(postService)
	communityHandler := handlers.NewCommunityHandler(communityService)
	messageHandler := handlers.NewMessageHandler(messageService)
	reputationHandler := handlers.NewReputationHandler(reputationService)

	r := gin.Default()

	r.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok", "service": "go-api"})
	})

	api := r.Group("/api/v1")
	{
		auth := api.Group("/auth")
		{
			auth.POST("/register", authHandler.Register)
			auth.POST("/login", authHandler.Login)
			auth.GET("/user/:id", authHandler.GetProfile)
			auth.PUT("/user/:id", authHandler.UpdateProfile)
		}

		posts := api.Group("/posts")
		{
			posts.GET("", postHandler.GetFeed)
			posts.GET("/:id", postHandler.GetPost)
			posts.POST("", postHandler.CreatePost)
			posts.POST("/:id/like", postHandler.LikePost)
			posts.DELETE("/:id", postHandler.DeletePost)
			posts.GET("/user/:user_id", postHandler.GetUserPosts)
			posts.GET("/tag/:tag", postHandler.GetPostsByTag)
		}

		communities := api.Group("/communities")
		{
			communities.GET("", communityHandler.ListCommunities)
			communities.GET("/:id", communityHandler.GetCommunity)
			communities.POST("", communityHandler.CreateCommunity)
			communities.POST("/:id/join", communityHandler.JoinCommunity)
			communities.POST("/:id/leave", communityHandler.LeaveCommunity)
		}

		messages := api.Group("/messages")
		{
			messages.POST("", messageHandler.SendMessage)
			messages.GET("/direct/:user_id_1/:user_id_2", messageHandler.GetDirectMessages)
			messages.GET("/community/:community_id", messageHandler.GetCommunityMessages)
			messages.GET("/unread", messageHandler.GetUnreadCount)
		}

		reputation := api.Group("/reputation")
		{
			reputation.GET("/user/:user_id", reputationHandler.GetUserReputation)
			reputation.GET("/user/:user_id/history", reputationHandler.GetReputationHistory)
			reputation.GET("/leaderboard", reputationHandler.GetLeaderboard)
		}
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	log.Printf("Go API running on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal(err)
	}
}
