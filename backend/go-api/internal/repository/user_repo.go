package repository

import (
	"github.com/gpb-codes/DevSactum/backend/go-api/internal/models"
	"github.com/google/uuid"
)

func CreateUser(user *models.User) error {
	query := `INSERT INTO users (id, email, username, password_hash, display_name, avatar_url, bio)
			  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING created_at, updated_at`
	return DB.QueryRow(query, user.ID, user.Email, user.Username, user.PasswordHash,
		user.DisplayName, user.AvatarURL, user.Bio).Scan(&user.CreatedAt, &user.UpdatedAt)
}

func GetUserByEmail(email string) (*models.User, error) {
	user := &models.User{}
	query := `SELECT id, email, username, password_hash, display_name, avatar_url, bio, created_at, updated_at
			  FROM users WHERE email = $1`
	err := DB.QueryRow(query, email).Scan(&user.ID, &user.Email, &user.Username, &user.PasswordHash,
		&user.DisplayName, &user.AvatarURL, &user.Bio, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func GetUserByID(id uuid.UUID) (*models.User, error) {
	user := &models.User{}
	query := `SELECT id, email, username, password_hash, display_name, avatar_url, bio, created_at, updated_at
			  FROM users WHERE id = $1`
	err := DB.QueryRow(query, id).Scan(&user.ID, &user.Email, &user.Username, &user.PasswordHash,
		&user.DisplayName, &user.AvatarURL, &user.Bio, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func GetUserByUsername(username string) (*models.User, error) {
	user := &models.User{}
	query := `SELECT id, email, username, password_hash, display_name, avatar_url, bio, created_at, updated_at
			  FROM users WHERE username = $1`
	err := DB.QueryRow(query, username).Scan(&user.ID, &user.Email, &user.Username, &user.PasswordHash,
		&user.DisplayName, &user.AvatarURL, &user.Bio, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func UpdateUser(user *models.User) error {
	query := `UPDATE users SET display_name = $2, avatar_url = $3, bio = $4, updated_at = NOW()
			  WHERE id = $1 RETURNING updated_at`
	return DB.QueryRow(query, user.ID, user.DisplayName, user.AvatarURL, user.Bio).Scan(&user.UpdatedAt)
}

func DeleteUser(id uuid.UUID) error {
	_, err := DB.Exec("DELETE FROM users WHERE id = $1", id)
	return err
}
