package services

import (
	"github.com/gpb-codes/DevSactum/backend/go-api/internal/models"
	"github.com/gpb-codes/DevSactum/backend/go-api/internal/repository"
	"github.com/google/uuid"
)

type PostService struct{}

func NewPostService() *PostService {
	return &PostService{}
}

func (s *PostService) CreatePost(userID uuid.UUID, req *models.CreatePostRequest) (*models.Post, error) {
	post := &models.Post{
		ID:     uuid.New(),
		UserID: userID,
		Content: req.Content,
		Code:    req.Code,
		Tags:    req.Tags,
	}

	if err := repository.CreatePost(post); err != nil {
		return nil, err
	}

	repository.AddReputationEvent(&models.ReputationEvent{
		ID:     uuid.New(),
		UserID: userID,
		Points: 5,
		Reason: "Created a post",
	})
	repository.IncrementReputation(userID, 5)

	return post, nil
}

func (s *PostService) GetPost(id uuid.UUID) (*models.Post, error) {
	return repository.GetPostByID(id)
}

func (s *PostService) GetFeed(limit, offset int) ([]models.Post, error) {
	if limit <= 0 {
		limit = 20
	}
	return repository.GetFeed(limit, offset)
}

func (s *PostService) GetPostsByUser(userID uuid.UUID, limit, offset int) ([]models.Post, error) {
	return repository.GetPostsByUserID(userID, limit, offset)
}

func (s *PostService) GetPostsByTag(tag string, limit, offset int) ([]models.Post, error) {
	return repository.GetPostsByTag(tag, limit, offset)
}

func (s *PostService) LikePost(postID, userID uuid.UUID) error {
	if err := repository.LikePost(postID); err != nil {
		return err
	}

	repository.AddReputationEvent(&models.ReputationEvent{
		ID:     uuid.New(),
		UserID: userID,
		Points: 1,
		Reason: "Liked a post",
	})
	repository.IncrementReputation(userID, 1)

	return nil
}

func (s *PostService) UnlikePost(postID uuid.UUID) error {
	return repository.UnlikePost(postID)
}

func (s *PostService) DeletePost(id uuid.UUID) error {
	return repository.DeletePost(id)
}
