package repository

import (
	"database/sql"

	"github.com/gpb-codes/DevSactum/backend/go-api/internal/models"
	"github.com/google/uuid"
)

func CreateCommunity(community *models.Community) error {
	query := `INSERT INTO communities (id, name, description, icon)
			  VALUES ($1, $2, $3, $4) RETURNING member_count, is_featured, created_at`
	return DB.QueryRow(query, community.ID, community.Name, community.Description,
		community.Icon).Scan(&community.MemberCount, &community.IsFeatured, &community.CreatedAt)
}

func GetCommunityByID(id uuid.UUID) (*models.Community, error) {
	c := &models.Community{}
	query := `SELECT id, name, description, icon, member_count, is_featured, created_at
			  FROM communities WHERE id = $1`
	err := DB.QueryRow(query, id).Scan(&c.ID, &c.Name, &c.Description, &c.Icon,
		&c.MemberCount, &c.IsFeatured, &c.CreatedAt)
	if err != nil {
		return nil, err
	}
	return c, nil
}

func GetCommunityByName(name string) (*models.Community, error) {
	c := &models.Community{}
	query := `SELECT id, name, description, icon, member_count, is_featured, created_at
			  FROM communities WHERE name = $1`
	err := DB.QueryRow(query, name).Scan(&c.ID, &c.Name, &c.Description, &c.Icon,
		&c.MemberCount, &c.IsFeatured, &c.CreatedAt)
	if err != nil {
		return nil, err
	}
	return c, nil
}

func ListCommunities(limit, offset int) ([]models.Community, error) {
	query := `SELECT id, name, description, icon, member_count, is_featured, created_at
			  FROM communities ORDER BY member_count DESC LIMIT $1 OFFSET $2`
	rows, err := DB.Query(query, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var communities []models.Community
	for rows.Next() {
		var c models.Community
		err := rows.Scan(&c.ID, &c.Name, &c.Description, &c.Icon,
			&c.MemberCount, &c.IsFeatured, &c.CreatedAt)
		if err != nil {
			if err == sql.ErrNoRows {
				return nil, nil
			}
			return nil, err
		}
		communities = append(communities, c)
	}
	return communities, nil
}

func JoinCommunity(communityID, userID uuid.UUID) error {
	_, err := DB.Exec(`INSERT INTO community_members (id, community_id, user_id, role)
					   VALUES ($1, $2, $3, 'member') ON CONFLICT DO NOTHING`, uuid.New(), communityID, userID)
	if err != nil {
		return err
	}
	_, err = DB.Exec("UPDATE communities SET member_count = member_count + 1 WHERE id = $1", communityID)
	return err
}

func LeaveCommunity(communityID, userID uuid.UUID) error {
	_, err := DB.Exec("DELETE FROM community_members WHERE community_id = $1 AND user_id = $2", communityID, userID)
	if err != nil {
		return err
	}
	_, err = DB.Exec("UPDATE communities SET member_count = MAX(member_count - 1, 0) WHERE id = $1", communityID)
	return err
}

func IsMember(communityID, userID uuid.UUID) (bool, error) {
	var count int
	err := DB.QueryRow("SELECT COUNT(*) FROM community_members WHERE community_id = $1 AND user_id = $2",
		communityID, userID).Scan(&count)
	return count > 0, err
}

func DeleteCommunity(id uuid.UUID) error {
	_, err := DB.Exec("DELETE FROM communities WHERE id = $1", id)
	return err
}
