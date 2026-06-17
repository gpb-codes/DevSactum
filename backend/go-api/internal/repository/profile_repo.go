package repository

import (
	"database/sql"

	"github.com/gpb-codes/DevSactum/backend/go-api/internal/models"
	"github.com/google/uuid"
	"github.com/lib/pq"
)

func CreateProfile(profile *models.Profile) error {
	query := `INSERT INTO profiles (id, user_id, stack, level, github_username, website, reputation_score)
			  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING created_at, updated_at`
	return DB.QueryRow(query, profile.ID, profile.UserID, pq.Array(profile.Stack),
		profile.Level, profile.GitHubUsername, profile.Website, profile.ReputationScore).Scan(&profile.CreatedAt, &profile.UpdatedAt)
}

func GetProfileByUserID(userID uuid.UUID) (*models.Profile, error) {
	profile := &models.Profile{}
	query := `SELECT id, user_id, stack, level, github_username, website, reputation_score, created_at, updated_at
			  FROM profiles WHERE user_id = $1`
	err := DB.QueryRow(query, userID).Scan(&profile.ID, &profile.UserID, pq.Array(&profile.Stack),
		&profile.Level, &profile.GitHubUsername, &profile.Website, &profile.ReputationScore, &profile.CreatedAt, &profile.UpdatedAt)
	if err != nil {
		return nil, err
	}
	return profile, nil
}

func UpdateProfile(profile *models.Profile) error {
	query := `UPDATE profiles SET stack = $2, level = $3, github_username = $4, website = $5, updated_at = NOW()
			  WHERE user_id = $1 RETURNING updated_at`
	return DB.QueryRow(query, profile.UserID, pq.Array(profile.Stack),
		profile.Level, profile.GitHubUsername, profile.Website).Scan(&profile.UpdatedAt)
}

func IncrementReputation(userID uuid.UUID, points int) error {
	_, err := DB.Exec("UPDATE profiles SET reputation_score = reputation_score + $2, updated_at = NOW() WHERE user_id = $1", userID, points)
	return err
}

func GetLeaderboard(limit int) ([]models.Profile, error) {
	query := `SELECT id, user_id, stack, level, github_username, website, reputation_score, created_at, updated_at
			  FROM profiles ORDER BY reputation_score DESC LIMIT $1`
	rows, err := DB.Query(query, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var profiles []models.Profile
	for rows.Next() {
		var p models.Profile
		err := rows.Scan(&p.ID, &p.UserID, pq.Array(&p.Stack), &p.Level,
			&p.GitHubUsername, &p.Website, &p.ReputationScore, &p.CreatedAt, &p.UpdatedAt)
		if err != nil {
			if err == sql.ErrNoRows {
				return nil, nil
			}
			return nil, err
		}
		profiles = append(profiles, p)
	}
	return profiles, nil
}
