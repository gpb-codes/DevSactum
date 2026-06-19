package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/gpb-codes/DevSactum/backend/go-api/internal/handlers"
	"github.com/gpb-codes/DevSactum/backend/go-api/internal/middleware"
	"github.com/gpb-codes/DevSactum/backend/go-api/internal/repository"
	"github.com/gpb-codes/DevSactum/backend/go-api/internal/services"
	ws "github.com/gpb-codes/DevSactum/backend/go-api/internal/websocket"
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
	jobService := services.NewJobService()

	authHandler := handlers.NewAuthHandler(authService)
	postHandler := handlers.NewPostHandler(postService)
	communityHandler := handlers.NewCommunityHandler(communityService)
	messageHandler := handlers.NewMessageHandler(messageService)
	reputationHandler := handlers.NewReputationHandler(reputationService)
	jobHandler := handlers.NewJobHandler(jobService)

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
			auth.GET("/user/:id", middleware.OptionalAuthMiddleware(), authHandler.GetProfile)
			auth.PUT("/user/:id", middleware.AuthMiddleware(), authHandler.UpdateProfile)
		}

		posts := api.Group("/posts")
		{
			posts.GET("", middleware.OptionalAuthMiddleware(), postHandler.GetFeed)
			posts.GET("/:id", middleware.OptionalAuthMiddleware(), postHandler.GetPost)
			posts.POST("", middleware.AuthMiddleware(), postHandler.CreatePost)
			posts.POST("/:id/like", middleware.AuthMiddleware(), postHandler.LikePost)
			posts.DELETE("/:id", middleware.AuthMiddleware(), postHandler.DeletePost)
			posts.GET("/user/:user_id", middleware.OptionalAuthMiddleware(), postHandler.GetUserPosts)
			posts.GET("/tag/:tag", middleware.OptionalAuthMiddleware(), postHandler.GetPostsByTag)
		}

		communities := api.Group("/communities")
		{
			communities.GET("", communityHandler.ListCommunities)
			communities.GET("/:id", communityHandler.GetCommunity)
			communities.POST("", middleware.AuthMiddleware(), communityHandler.CreateCommunity)
			communities.POST("/:id/join", middleware.AuthMiddleware(), communityHandler.JoinCommunity)
			communities.POST("/:id/leave", middleware.AuthMiddleware(), communityHandler.LeaveCommunity)
		}

		messages := api.Group("/messages")
		{
			messages.POST("", middleware.AuthMiddleware(), messageHandler.SendMessage)
			messages.GET("/direct/:user_id_1/:user_id_2", middleware.AuthMiddleware(), messageHandler.GetDirectMessages)
			messages.GET("/community/:community_id", messageHandler.GetCommunityMessages)
			messages.GET("/unread", middleware.AuthMiddleware(), messageHandler.GetUnreadCount)
		}

		reputation := api.Group("/reputation")
		{
			reputation.GET("/user/:user_id", reputationHandler.GetUserReputation)
			reputation.GET("/user/:user_id/history", reputationHandler.GetReputationHistory)
			reputation.GET("/leaderboard", reputationHandler.GetLeaderboard)
		}

		jobs := api.Group("/jobs")
		{
			jobs.GET("", jobHandler.GetJobs)
			jobs.GET("/:id", jobHandler.GetJob)
			jobs.POST("", middleware.AuthMiddleware(), jobHandler.CreateJob)
			jobs.PATCH("/:id", middleware.AuthMiddleware(), jobHandler.UpdateJob)
			jobs.DELETE("/:id", middleware.AuthMiddleware(), jobHandler.DeleteJob)
			jobs.POST("/:id/apply", middleware.AuthMiddleware(), jobHandler.ApplyToJob)
			jobs.GET("/:id/applications", middleware.AuthMiddleware(), jobHandler.GetJobApplications)
			jobs.PATCH("/applications/:applicationId", middleware.AuthMiddleware(), jobHandler.UpdateApplicationStatus)
		}

		company := api.Group("/company")
		{
			company.GET("/dashboard", middleware.AuthMiddleware(), jobHandler.GetCompanyDashboard)
			company.GET("/jobs", middleware.AuthMiddleware(), jobHandler.GetCompanyJobs)
		}
	}

	ws.RegisterRoutes(r)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	log.Printf("Go API running on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal(err)
	}
}
