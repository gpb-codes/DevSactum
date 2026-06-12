package repository

import (
	"github.com/gpb-codes/DevSactum/backend/go-api/internal/models"
	"github.com/google/uuid"
)

func AddReputationEvent(event *models.ReputationEvent) error {
	query := `INSERT INTO reputation_events (id, user_id, points, reason)
			  VALUES ($1, $2, $3, $4) RETURNING created_at`
	return DB.QueryRow(query, event.ID, event.UserID, event.Points, event.Reason).Scan(&event.CreatedAt)
}

func GetReputationHistory(userID uuid.UUID, limit int) ([]models.ReputationEvent, error) {
	query := `SELECT id, user_id, points, reason, created_at
			  FROM reputation_events WHERE user_id = $1
			  ORDER BY created_at DESC LIMIT $2`
	rows, err := DB.Query(query, userID, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var events []models.ReputationEvent
	for rows.Next() {
		var e models.ReputationEvent
		err := rows.Scan(&e.ID, &e.UserID, &e.Points, &e.Reason, &e.CreatedAt)
		if err != nil {
			return nil, err
		}
		events = append(events, e)
	}
	return events, nil
}

func GetUserReputation(userID uuid.UUID) (int, error) {
	var total int
	err := DB.QueryRow("SELECT COALESCE(SUM(points), 0) FROM reputation_events WHERE user_id = $1", userID).Scan(&total)
	return total, err
}
