package repository

import (
	"database/sql"

	"github.com/gpb-codes/DevSactum/backend/go-api/internal/models"
	"github.com/google/uuid"
)

func SendMessage(msg *models.Message) error {
	query := `INSERT INTO messages (id, sender_id, receiver_id, community_id, content)
			  VALUES ($1, $2, $3, $4, $5) RETURNING is_read, created_at`
	return DB.QueryRow(query, msg.ID, msg.SenderID, msg.ReceiverID,
		msg.CommunityID, msg.Content).Scan(&msg.IsRead, &msg.CreatedAt)
}

func GetDirectMessages(userID1, userID2 uuid.UUID, limit, offset int) ([]models.Message, error) {
	query := `SELECT id, sender_id, receiver_id, community_id, content, is_read, created_at
			  FROM messages
			  WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)
			  ORDER BY created_at DESC LIMIT $3 OFFSET $4`
	rows, err := DB.Query(query, userID1, userID2, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var messages []models.Message
	for rows.Next() {
		var m models.Message
		err := rows.Scan(&m.ID, &m.SenderID, &m.ReceiverID, &m.CommunityID,
			&m.Content, &m.IsRead, &m.CreatedAt)
		if err != nil {
			if err == sql.ErrNoRows {
				return nil, nil
			}
			return nil, err
		}
		messages = append(messages, m)
	}
	return messages, nil
}

func GetCommunityMessages(communityID uuid.UUID, limit, offset int) ([]models.Message, error) {
	query := `SELECT id, sender_id, receiver_id, community_id, content, is_read, created_at
			  FROM messages WHERE community_id = $1
			  ORDER BY created_at DESC LIMIT $2 OFFSET $3`
	rows, err := DB.Query(query, communityID, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var messages []models.Message
	for rows.Next() {
		var m models.Message
		err := rows.Scan(&m.ID, &m.SenderID, &m.ReceiverID, &m.CommunityID,
			&m.Content, &m.IsRead, &m.CreatedAt)
		if err != nil {
			if err == sql.ErrNoRows {
				return nil, nil
			}
			return nil, err
		}
		messages = append(messages, m)
	}
	return messages, nil
}

func MarkAsRead(messageID uuid.UUID) error {
	_, err := DB.Exec("UPDATE messages SET is_read = true WHERE id = $1", messageID)
	return err
}

func GetUnreadCount(userID uuid.UUID) (int, error) {
	var count int
	err := DB.QueryRow("SELECT COUNT(*) FROM messages WHERE receiver_id = $1 AND is_read = false", userID).Scan(&count)
	return count, err
}
