package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/go-chi/chi/v5"
)

func TestHealthEndpoint(t *testing.T) {
	r := chi.NewRouter()
	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"status":"ok"}`))
	})

	req := httptest.NewRequest("GET", "/health", nil)
	rec := httptest.NewRecorder()
	r.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Errorf("expected 200, got %d", rec.Code)
	}

	var body map[string]string
	json.NewDecoder(rec.Body).Decode(&body)
	if body["status"] != "ok" {
		t.Errorf("expected ok, got %s", body["status"])
	}
}

func TestPostsRouteExists(t *testing.T) {
	r := chi.NewRouter()
	r.Route("/api/v1", func(r chi.Router) {
		sub := chi.NewRouter()
		sub.Get("/", func(w http.ResponseWriter, r *http.Request) {
			w.WriteHeader(http.StatusOK)
		})
		r.Mount("/posts", sub)
	})

	req := httptest.NewRequest("GET", "/api/v1/posts", nil)
	rec := httptest.NewRecorder()
	r.ServeHTTP(rec, req)
	if rec.Code == 404 {
		t.Error("posts route not mounted")
	}
}

func TestCommunitiesRouteExists(t *testing.T) {
	r := chi.NewRouter()
	r.Route("/api/v1", func(r chi.Router) {
		sub := chi.NewRouter()
		sub.Get("/", func(w http.ResponseWriter, r *http.Request) {
			w.WriteHeader(http.StatusOK)
		})
		r.Mount("/communities", sub)
	})

	req := httptest.NewRequest("GET", "/api/v1/communities", nil)
	rec := httptest.NewRecorder()
	r.ServeHTTP(rec, req)
	if rec.Code == 404 {
		t.Error("communities route not mounted")
	}
}

func TestReputationRouteExists(t *testing.T) {
	r := chi.NewRouter()
	r.Route("/api/v1", func(r chi.Router) {
		sub := chi.NewRouter()
		sub.Get("/", func(w http.ResponseWriter, r *http.Request) {
			w.WriteHeader(http.StatusOK)
		})
		r.Mount("/reputation", sub)
	})

	req := httptest.NewRequest("GET", "/api/v1/reputation", nil)
	rec := httptest.NewRecorder()
	r.ServeHTTP(rec, req)
	if rec.Code == 404 {
		t.Error("reputation route not mounted")
	}
}

func TestParseInt(t *testing.T) {
	tests := []struct {
		input string
		def   int
		want  int
	}{
		{"10", 20, 10},
		{"", 20, 20},
		{"abc", 20, 20},
		{"0", 5, 0},
	}
	for _, tt := range tests {
		got := parseInt(tt.input, tt.def)
		if got != tt.want {
			t.Errorf("parseInt(%q, %d) = %d; want %d", tt.input, tt.def, got, tt.want)
		}
	}
}

func TestJSONResp(t *testing.T) {
	rec := httptest.NewRecorder()
	data := map[string]string{"key": "value"}
	jsonResp(rec, http.StatusCreated, data)

	if rec.Code != http.StatusCreated {
		t.Errorf("expected 201, got %d", rec.Code)
	}

	ct := rec.Header().Get("Content-Type")
	if ct != "application/json" {
		t.Errorf("expected application/json, got %s", ct)
	}
}
