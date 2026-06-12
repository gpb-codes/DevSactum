package repository

import (
	"database/sql"

	"github.com/gpb-codes/DevSactum/backend/go-api/internal/models"
	"github.com/google/uuid"
	"github.com/lib/pq"
)

func CreatePost(post *models.Post) error {
	query := `INSERT INTO posts (id, user_id, content, code, tags)
			  VALUES ($1, $2, $3, $4, $5) RETURNING likes_count, comments_count, created_at, updated_at`
	return DB.QueryRow(query, post.ID, post.UserID, post.Content, post.Code,
		pq.Array(post.Tags)).Scan(&post.LikesCount, &post.CommentsCount, &post.CreatedAt, &post.UpdatedAt)
}

func GetPostByID(id uuid.UUID) (*models.Post, error) {
	post := &models.Post{}
	query := `SELECT id, user_id, content, code, tags, likes_count, comments_count, created_at, updated_at
			  FROM posts WHERE id = $1`
	err := DB.QueryRow(query, id).Scan(&post.ID, &post.UserID, &post.Content, &post.Code,
		pq.Array(&post.Tags), &post.LikesCount, &post.CommentsCount, &post.CreatedAt, &post.UpdatedAt)
	if err != nil {
		return nil, err
	}
	return post, nil
}

func GetPostsByUserID(userID uuid.UUID, limit, offset int) ([]models.Post, error) {
	query := `SELECT id, user_id, content, code, tags, likes_count, comments_count, created_at, updated_at
			  FROM posts WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3`
	rows, err := DB.Query(query, userID, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var posts []models.Post
	for rows.Next() {
		var p models.Post
		err := rows.Scan(&p.ID, &p.UserID, &p.Content, &p.Code, pq.Array(&p.Tags),
			&p.LikesCount, &p.CommentsCount, &p.CreatedAt, &p.UpdatedAt)
		if err != nil {
			if err == sql.ErrNoRows {
				return nil, nil
			}
			return nil, err
		}
		posts = append(posts, p)
	}
	return posts, nil
}

func GetFeed(limit, offset int) ([]models.Post, error) {
	query := `SELECT id, user_id, content, code, tags, likes_count, comments_count, created_at, updated_at
			  FROM posts ORDER BY created_at DESC LIMIT $1 OFFSET $2`
	rows, err := DB.Query(query, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var posts []models.Post
	for rows.Next() {
		var p models.Post
		err := rows.Scan(&p.ID, &p.UserID, &p.Content, &p.Code, pq.Array(&p.Tags),
			&p.LikesCount, &p.CommentsCount, &p.CreatedAt, &p.UpdatedAt)
		if err != nil {
			if err == sql.ErrNoRows {
				return nil, nil
			}
			return nil, err
		}
		posts = append(posts, p)
	}
	return posts, nil
}

func GetPostsByTag(tag string, limit, offset int) ([]models.Post, error) {
	query := `SELECT id, user_id, content, code, tags, likes_count, comments_count, created_at, updated_at
			  FROM posts WHERE $1 = ANY(tags) ORDER BY created_at DESC LIMIT $2 OFFSET $3`
	rows, err := DB.Query(query, tag, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var posts []models.Post
	for rows.Next() {
		var p models.Post
		err := rows.Scan(&p.ID, &p.UserID, &p.Content, &p.Code, pq.Array(&p.Tags),
			&p.LikesCount, &p.CommentsCount, &p.CreatedAt, &p.UpdatedAt)
		if err != nil {
			if err == sql.ErrNoRows {
				return nil, nil
			}
			return nil, err
		}
		posts = append(posts, p)
	}
	return posts, nil
}

func LikePost(postID uuid.UUID) error {
	_, err := DB.Exec("UPDATE posts SET likes_count = likes_count + 1, updated_at = NOW() WHERE id = $1", postID)
	return err
}

func UnlikePost(postID uuid.UUID) error {
	_, err := DB.Exec("UPDATE posts SET likes_count = GREATEST(likes_count - 1, 0), updated_at = NOW() WHERE id = $1", postID)
	return err
}

func DeletePost(id uuid.UUID) error {
	_, err := DB.Exec("DELETE FROM posts WHERE id = $1", id)
	return err
}
