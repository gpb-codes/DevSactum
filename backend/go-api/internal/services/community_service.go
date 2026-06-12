package services

import (
	"errors"

	"github.com/gpb-codes/DevSactum/backend/go-api/internal/models"
	"github.com/gpb-codes/DevSactum/backend/go-api/internal/repository"
	"github.com/google/uuid"
)

type CommunityService struct{}

func NewCommunityService() *CommunityService {
	return &CommunityService{}
}

func (s *CommunityService) CreateCommunity(userID uuid.UUID, req *models.CreateCommunityRequest) (*models.Community, error) {
	existing, _ := repository.GetCommunityByName(req.Name)
	if existing != nil {
		return nil, errors.New("community name already taken")
	}

	community := &models.Community{
		ID:          uuid.New(),
		Name:        req.Name,
		Description: req.Description,
		Icon:        req.Icon,
	}

	if err := repository.CreateCommunity(community); err != nil {
		return nil, err
	}

	repository.JoinCommunity(community.ID, userID)

	return community, nil
}

func (s *CommunityService) GetCommunity(id uuid.UUID) (*models.Community, error) {
	return repository.GetCommunityByID(id)
}

func (s *CommunityService) ListCommunities(limit, offset int) ([]models.Community, error) {
	if limit <= 0 {
		limit = 20
	}
	return repository.ListCommunities(limit, offset)
}

func (s *CommunityService) JoinCommunity(communityID, userID uuid.UUID) error {
	isMember, _ := repository.IsMember(communityID, userID)
	if isMember {
		return errors.New("already a member")
	}

	if err := repository.JoinCommunity(communityID, userID); err != nil {
		return err
	}

	repository.AddReputationEvent(&models.ReputationEvent{
		ID:     uuid.New(),
		UserID: userID,
		Points: 3,
		Reason: "Joined a community",
	})
	repository.IncrementReputation(userID, 3)

	return nil
}

func (s *CommunityService) LeaveCommunity(communityID, userID uuid.UUID) error {
	return repository.LeaveCommunity(communityID, userID)
}

func (s *CommunityService) DeleteCommunity(id uuid.UUID) error {
	return repository.DeleteCommunity(id)
}
