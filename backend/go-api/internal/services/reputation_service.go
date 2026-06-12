package services

import (
	"github.com/gpb-codes/DevSactum/backend/go-api/internal/models"
	"github.com/gpb-codes/DevSactum/backend/go-api/internal/repository"
	"github.com/google/uuid"
)

type ReputationService struct{}

func NewReputationService() *ReputationService {
	return &ReputationService{}
}

func (s *ReputationService) GetUserReputation(userID uuid.UUID) (int, error) {
	return repository.GetUserReputation(userID)
}

func (s *ReputationService) GetReputationHistory(userID uuid.UUID, limit int) ([]models.ReputationEvent, error) {
	if limit <= 0 {
		limit = 20
	}
	return repository.GetReputationHistory(userID, limit)
}

func (s *ReputationService) GetLeaderboard(limit int) ([]models.Profile, error) {
	if limit <= 0 {
		limit = 10
	}
	return repository.GetLeaderboard(limit)
}

func (s *ReputationService) AddEvent(userID uuid.UUID, points int, reason string) error {
	return repository.AddReputationEvent(&models.ReputationEvent{
		ID:     uuid.New(),
		UserID: userID,
		Points: points,
		Reason: reason,
	})
}
