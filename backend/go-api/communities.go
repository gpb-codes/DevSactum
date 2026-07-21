package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

func communityRouter(db *pgxpool.Pool) http.Handler {
	r := chi.NewRouter()
	h := &communityHandler{db: db}
	r.Get("/", h.list)
	r.Get("/{id}", h.get)
	return r
}

type communityHandler struct {
	db *pgxpool.Pool
}

func (h *communityHandler) list(w http.ResponseWriter, r *http.Request) {
	limit := parseInt(r.URL.Query().Get("limit"), 20)
	offset := parseInt(r.URL.Query().Get("offset"), 0)

	rows, err := h.db.Query(r.Context(), `
		SELECT id, name, COALESCE(description, ''), COALESCE(icon, ''),
		       members_count, online_count, creator_id, created_at
		FROM communities
		ORDER BY members_count DESC
		LIMIT $1 OFFSET $2`, limit, offset)
	if err != nil {
		jsonError(w, "Database error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var communities []Community
	for rows.Next() {
		var c Community
		if err := rows.Scan(&c.ID, &c.Name, &c.Description, &c.Icon,
			&c.MembersCount, &c.OnlineCount, &c.CreatorID, &c.CreatedAt); err != nil {
			continue
		}
		communities = append(communities, c)
	}
	if communities == nil {
		communities = []Community{}
	}
	jsonResp(w, http.StatusOK, map[string]any{"communities": communities})
}

func (h *communityHandler) get(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	var c Community
	err := h.db.QueryRow(r.Context(), `
		SELECT id, name, COALESCE(description, ''), COALESCE(icon, ''),
		       members_count, online_count, creator_id, created_at
		FROM communities WHERE id = $1`, id).Scan(
		&c.ID, &c.Name, &c.Description, &c.Icon,
		&c.MembersCount, &c.OnlineCount, &c.CreatorID, &c.CreatedAt)
	if err != nil {
		jsonError(w, "Community not found", http.StatusNotFound)
		return
	}
	jsonResp(w, http.StatusOK, map[string]any{"community": c})
}
