package services

import (
	"errors"

	"github.com/gpb-codes/DevSactum/backend/go-api/internal/models"
	"github.com/gpb-codes/DevSactum/backend/go-api/internal/repository"
	"github.com/google/uuid"
)

type MessageService struct{}

func NewMessageService() *MessageService {
	return &MessageService{}
}

func (s *MessageService) SendMessage(senderID uuid.UUID, req *models.SendMessageRequest) (*models.Message, error) {
	if req.ReceiverID == nil && req.CommunityID == nil {
		return nil, errors.New("receiver_id or community_id required")
	}

	msg := &models.Message{
		ID:         uuid.New(),
		SenderID:   senderID,
		Content:    req.Content,
		ReceiverID: parseUUIDPtr(req.ReceiverID),
		CommunityID: parseUUIDPtr(req.CommunityID),
	}

	if err := repository.SendMessage(msg); err != nil {
		return nil, err
	}

	repository.AddReputationEvent(&models.ReputationEvent{
		ID:     uuid.New(),
		UserID: senderID,
		Points: 2,
		Reason: "Sent a message",
	})
	repository.IncrementReputation(senderID, 2)

	return msg, nil
}

func (s *MessageService) GetDirectMessages(userID1, userID2 uuid.UUID, limit, offset int) ([]models.Message, error) {
	return repository.GetDirectMessages(userID1, userID2, limit, offset)
}

func (s *MessageService) GetCommunityMessages(communityID uuid.UUID, limit, offset int) ([]models.Message, error) {
	return repository.GetCommunityMessages(communityID, limit, offset)
}

func (s *MessageService) GetUnreadCount(userID uuid.UUID) (int, error) {
	return repository.GetUnreadCount(userID)
}

func (s *MessageService) MarkAsRead(messageID uuid.UUID) error {
	return repository.MarkAsRead(messageID)
}

func parseUUIDPtr(s *string) *uuid.UUID {
	if s == nil {
		return nil
	}
	id, err := uuid.Parse(*s)
	if err != nil {
		return nil
	}
	return &id
}
