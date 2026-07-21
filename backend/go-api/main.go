package main

import (
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/jackc/pgx/v5/pgxpool"
)

func main() {
	port := os.Getenv("GO_API_PORT")
	if port == "" {
		port = "8000"
	}

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true,
	}))

	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("OK"))
	})

	r.Route("/api/v1", func(r chi.Router) {
		r.Mount("/posts", postRoutes())
		r.Mount("/communities", communityRoutes())
		r.Mount("/reputation", reputationRoutes())
	})

	log.Printf("Go API running on port %s", port)
	http.ListenAndServe(":"+port, r)
}

func postRoutes() http.Handler {
	r := chi.NewRouter()
	r.Get("/", listPosts)
	r.Get("/{id}", getPost)
	r.Get("/user/{userId}", listUserPosts)
	r.Get("/tag/{tag}", listPostsByTag)
	return r
}

func communityRoutes() http.Handler {
	r := chi.NewRouter()
	r.Get("/", listCommunities)
	r.Get("/{id}", getCommunity)
	return r
}

func reputationRoutes() http.Handler {
	r := chi.NewRouter()
	r.Get("/user/{userId}", getReputationProfile)
	r.Get("/user/{userId}/history", getReputationHistory)
	r.Get("/leaderboard", getLeaderboard)
	return r
}

// Handler stubs - will be implemented with DB queries

func listPosts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"posts":[]}`))
}

func getPost(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"post":{}}`))
}

func listUserPosts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"posts":[]}`))
}

func listPostsByTag(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"posts":[]}`))
}

func listCommunities(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"communities":[]}`))
}

func getCommunity(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"community":{}}`))
}

func getReputationProfile(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"profile":{}}`))
}

func getReputationHistory(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"events":[]}`))
}

func getLeaderboard(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"leaderboard":[]}`))
}

func initDB() *pgxpool.Pool {
	// Will be implemented with actual DB connection
	return nil
}
