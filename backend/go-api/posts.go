package main

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

func postRouter(db *pgxpool.Pool) http.Handler {
	r := chi.NewRouter()
	h := &postHandler{db: db}
	r.Get("/", h.list)
	r.Get("/{id}", h.get)
	r.Get("/user/{userId}", h.listByUser)
	r.Get("/tag/{tag}", h.listByTag)
	return r
}

type postHandler struct {
	db *pgxpool.Pool
}

func (h *postHandler) list(w http.ResponseWriter, r *http.Request) {
	limit := parseInt(r.URL.Query().Get("limit"), 20)
	offset := parseInt(r.URL.Query().Get("offset"), 0)

	rows, err := h.db.Query(r.Context(), `
		SELECT p.id, p.content, p.user_id, u.username, u.display_name,
		       COALESCE(p.tags, ''), COALESCE(p.code_snippet, ''), COALESCE(p.code_language, ''),
		       p.likes_count, p.comments_count, p.created_at
		FROM posts p
		LEFT JOIN users u ON u.id = p.user_id
		ORDER BY p.created_at DESC
		LIMIT $1 OFFSET $2`, limit, offset)
	if err != nil {
		jsonError(w, "Database error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var posts []Post
	for rows.Next() {
		var p Post
		if err := rows.Scan(&p.ID, &p.Content, &p.UserID, &p.Username, &p.DisplayName,
			&p.Tags, &p.CodeSnippet, &p.CodeLanguage,
			&p.LikesCount, &p.CommentsCount, &p.CreatedAt); err != nil {
			continue
		}
		posts = append(posts, p)
	}
	if posts == nil {
		posts = []Post{}
	}
	jsonResp(w, http.StatusOK, map[string]any{"posts": posts})
}

func (h *postHandler) get(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	var p Post
	err := h.db.QueryRow(r.Context(), `
		SELECT p.id, p.content, p.user_id, u.username, u.display_name,
		       COALESCE(p.tags, ''), COALESCE(p.code_snippet, ''), COALESCE(p.code_language, ''),
		       p.likes_count, p.comments_count, p.created_at
		FROM posts p
		LEFT JOIN users u ON u.id = p.user_id
		WHERE p.id = $1`, id).Scan(
		&p.ID, &p.Content, &p.UserID, &p.Username, &p.DisplayName,
		&p.Tags, &p.CodeSnippet, &p.CodeLanguage,
		&p.LikesCount, &p.CommentsCount, &p.CreatedAt)
	if err != nil {
		jsonError(w, "Post not found", http.StatusNotFound)
		return
	}
	jsonResp(w, http.StatusOK, map[string]any{"post": p})
}

func (h *postHandler) listByUser(w http.ResponseWriter, r *http.Request) {
	userID := chi.URLParam(r, "userId")
	limit := parseInt(r.URL.Query().Get("limit"), 20)
	offset := parseInt(r.URL.Query().Get("offset"), 0)

	rows, err := h.db.Query(r.Context(), `
		SELECT p.id, p.content, p.user_id, u.username, u.display_name,
		       COALESCE(p.tags, ''), COALESCE(p.code_snippet, ''), COALESCE(p.code_language, ''),
		       p.likes_count, p.comments_count, p.created_at
		FROM posts p
		LEFT JOIN users u ON u.id = p.user_id
		WHERE p.user_id = $1
		ORDER BY p.created_at DESC
		LIMIT $2 OFFSET $3`, userID, limit, offset)
	if err != nil {
		jsonError(w, "Database error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var posts []Post
	for rows.Next() {
		var p Post
		if err := rows.Scan(&p.ID, &p.Content, &p.UserID, &p.Username, &p.DisplayName,
			&p.Tags, &p.CodeSnippet, &p.CodeLanguage,
			&p.LikesCount, &p.CommentsCount, &p.CreatedAt); err != nil {
			continue
		}
		posts = append(posts, p)
	}
	if posts == nil {
		posts = []Post{}
	}
	jsonResp(w, http.StatusOK, map[string]any{"posts": posts})
}

func (h *postHandler) listByTag(w http.ResponseWriter, r *http.Request) {
	tag := chi.URLParam(r, "tag")
	limit := parseInt(r.URL.Query().Get("limit"), 20)
	offset := parseInt(r.URL.Query().Get("offset"), 0)

	rows, err := h.db.Query(r.Context(), `
		SELECT p.id, p.content, p.user_id, u.username, u.display_name,
		       COALESCE(p.tags, ''), COALESCE(p.code_snippet, ''), COALESCE(p.code_language, ''),
		       p.likes_count, p.comments_count, p.created_at
		FROM posts p
		LEFT JOIN users u ON u.id = p.user_id
		WHERE p.tags LIKE '%' || $1 || '%'
		ORDER BY p.created_at DESC
		LIMIT $2 OFFSET $3`, tag, limit, offset)
	if err != nil {
		jsonError(w, "Database error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var posts []Post
	for rows.Next() {
		var p Post
		if err := rows.Scan(&p.ID, &p.Content, &p.UserID, &p.Username, &p.DisplayName,
			&p.Tags, &p.CodeSnippet, &p.CodeLanguage,
			&p.LikesCount, &p.CommentsCount, &p.CreatedAt); err != nil {
			continue
		}
		posts = append(posts, p)
	}
	if posts == nil {
		posts = []Post{}
	}
	jsonResp(w, http.StatusOK, map[string]any{"posts": posts})
}

func parseInt(s string, defaultVal int) int {
	if s == "" {
		return defaultVal
	}
	v, err := strconv.Atoi(s)
	if err != nil {
		return defaultVal
	}
	return v
}

func jsonResp(w http.ResponseWriter, status int, data any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}

func jsonError(w http.ResponseWriter, msg string, status int) {
	jsonResp(w, status, map[string]string{"error": msg})
}
