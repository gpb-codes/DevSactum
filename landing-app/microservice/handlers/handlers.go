package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type HealthResponse struct {
	Status    string `json:"status"`
	Service   string `json:"service"`
	Port      string `json:"port"`
	Timestamp string `json:"timestamp"`
}

type StatusResponse struct {
	Service  string        `json:"service"`
	Version  string        `json:"version"`
	Company  string        `json:"company"`
	Uptime   string        `json:"uptime"`
	Backends []BackendInfo `json:"backends"`
}

type BackendInfo struct {
	Name     string `json:"name"`
	Port     string `json:"port"`
	Status   string `json:"status"`
	Language string `json:"language"`
}

type StatsResponse struct {
	TotalVisits     int    `json:"totalVisits"`
	ActiveUsers     int    `json:"activeUsers"`
	RegisteredBeta  int    `json:"registeredBeta"`
	LaunchDate      string `json:"launchDate"`
	DaysUntilLaunch int    `json:"daysUntilLaunch"`
}

type TeamResponse struct {
	Company string       `json:"company"`
	Members []TeamMember `json:"members"`
}

type TeamMember struct {
	Name     string `json:"name"`
	Role     string `json:"role"`
	Initials string `json:"initials"`
}

var startTime = time.Now()

func HealthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, HealthResponse{
		Status:    "ok",
		Service:   "devsactum-microservice",
		Port:      "8000",
		Timestamp: time.Now().UTC().Format(time.RFC3339),
	})
}

func GetStatus(c *gin.Context) {
	uptime := time.Since(startTime)
	c.JSON(http.StatusOK, StatusResponse{
		Service: "DevSactum Go Microservice",
		Version: "1.0.0",
		Company: "Dräkkar Labs",
		Uptime:  uptime.Round(time.Second).String(),
		Backends: []BackendInfo{
			{Name: "Go Microservice", Port: "8000", Status: "running", Language: "Go"},
			{Name: "NestJS API", Port: "3001", Status: "running", Language: "TypeScript"},
			{Name: "Next.js Frontend", Port: "3000", Status: "running", Language: "TypeScript"},
		},
	})
}

func GetStats(c *gin.Context) {
	launchDate := time.Date(2026, 9, 30, 0, 0, 0, 0, time.UTC)
	daysUntil := int(time.Until(launchDate).Hours() / 24)
	if daysUntil < 0 {
		daysUntil = 0
	}

	c.JSON(http.StatusOK, StatsResponse{
		TotalVisits:     1247,
		ActiveUsers:     89,
		RegisteredBeta:  342,
		LaunchDate:      "2026-09-30",
		DaysUntilLaunch: daysUntil,
	})
}

func GetTeam(c *gin.Context) {
	c.JSON(http.StatusOK, TeamResponse{
		Company: "Dräkkar Labs",
		Members: []TeamMember{
			{Name: "Gabriel Pedreros", Role: "CEO & Fundador", Initials: "GP"},
			{Name: "Pablo Cocío", Role: "CTO & Co-fundador", Initials: "PC"},
		},
	})
}
