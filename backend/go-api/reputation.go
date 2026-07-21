package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

func reputationRouter(db *pgxpool.Pool) http.Handler {
	r := chi.NewRouter()
	h := &reputationHandler{db: db}
	r.Get("/user/{userId}", h.getProfile)
	r.Get("/user/{userId}/history", h.getHistory)
	r.Get("/leaderboard", h.getLeaderboard)
	return r
}

type reputationHandler struct {
	db *pgxpool.Pool
}

func (h *reputationHandler) getProfile(w http.ResponseWriter, r *http.Request) {
	userID := chi.URLParam(r, "userId")
	var p ReputationProfile
	err := h.db.QueryRow(r.Context(), `
		SELECT rp.id, rp.user_id, COALESCE(u.display_name, ''),
		       COALESCE(u.username, ''), COALESCE(rp.stack, ''),
		       COALESCE(rp.level, 'junior'), rp.reputation_score,
		       COALESCE(rp.title, ''), COALESCE(rp.bio, ''), rp.created_at
		FROM reputation_profiles rp
		LEFT JOIN users u ON u.id = rp.user_id
		WHERE rp.user_id = $1`, userID).Scan(
		&p.ID, &p.UserID, &p.DisplayName, &p.Username, &p.Stack,
		&p.Level, &p.ReputationScore, &p.Title, &p.Bio, &p.CreatedAt)
	if err != nil {
		jsonResp(w, http.StatusOK, map[string]any{
			"profile": map[string]any{
				"user_id":          userID,
				"reputation_score": 0,
				"level":            "junior",
				"stack":            "",
				"title":            "",
				"bio":              "",
			},
		})
		return
	}
	jsonResp(w, http.StatusOK, map[string]any{"profile": p})
}

func (h *reputationHandler) getHistory(w http.ResponseWriter, r *http.Request) {
	userID := chi.URLParam(r, "userId")

	rows, err := h.db.Query(r.Context(), `
		SELECT id, user_id, event_type, points, COALESCE(description, ''), created_at
		FROM reputation_events
		WHERE user_id = $1
		ORDER BY created_at DESC
		LIMIT 50`, userID)
	if err != nil {
		jsonError(w, "Database error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var events []ReputationEvent
	for rows.Next() {
		var e ReputationEvent
		if err := rows.Scan(&e.ID, &e.UserID, &e.EventType, &e.Points, &e.Description, &e.CreatedAt); err != nil {
			continue
		}
		events = append(events, e)
	}
	if events == nil {
		events = []ReputationEvent{}
	}
	jsonResp(w, http.StatusOK, map[string]any{"events": events})
}

func (h *reputationHandler) getLeaderboard(w http.ResponseWriter, r *http.Request) {
	limit := parseInt(r.URL.Query().Get("limit"), 20)

	rows, err := h.db.Query(r.Context(), `
		SELECT rp.user_id, rp.reputation_score, rp.level
		FROM reputation_profiles rp
		ORDER BY rp.reputation_score DESC
		LIMIT $1`, limit)
	if err != nil {
		jsonError(w, "Database error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var entries []LeaderboardEntry
	for rows.Next() {
		var e LeaderboardEntry
		if err := rows.Scan(&e.UserID, &e.Score, &e.Level); err != nil {
			continue
		}
		entries = append(entries, e)
	}
	if entries == nil {
		entries = []LeaderboardEntry{}
	}
	jsonResp(w, http.StatusOK, map[string]any{"leaderboard": entries})
}
