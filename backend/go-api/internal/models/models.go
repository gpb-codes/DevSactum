package models

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID           uuid.UUID  `json:"id" db:"id"`
	Email        string     `json:"email" db:"email"`
	Username     string     `json:"username" db:"username"`
	PasswordHash string     `json:"-" db:"password_hash"`
	DisplayName  *string    `json:"display_name" db:"display_name"`
	AvatarURL    *string    `json:"avatar_url" db:"avatar_url"`
	Bio          *string    `json:"bio" db:"bio"`
	CreatedAt    time.Time  `json:"created_at" db:"created_at"`
	UpdatedAt    time.Time  `json:"updated_at" db:"updated_at"`
}

type Profile struct {
	ID               uuid.UUID `json:"id" db:"id"`
	UserID           uuid.UUID `json:"user_id" db:"user_id"`
	Stack            []string  `json:"stack" db:"stack"`
	Level            string    `json:"level" db:"level"`
	GitHubUsername    *string   `json:"github_username" db:"github_username"`
	Website          *string   `json:"website" db:"website"`
	ReputationScore  int       `json:"reputation_score" db:"reputation_score"`
	CreatedAt        time.Time `json:"created_at" db:"created_at"`
	UpdatedAt        time.Time `json:"updated_at" db:"updated_at"`
}

type Post struct {
	ID            uuid.UUID `json:"id" db:"id"`
	UserID        uuid.UUID `json:"user_id" db:"user_id"`
	Content       string    `json:"content" db:"content"`
	Code          *string   `json:"code" db:"code"`
	Tags          []string  `json:"tags" db:"tags"`
	LikesCount    int       `json:"likes_count" db:"likes_count"`
	CommentsCount int       `json:"comments_count" db:"comments_count"`
	CreatedAt     time.Time `json:"created_at" db:"created_at"`
	UpdatedAt     time.Time `json:"updated_at" db:"updated_at"`
}

type Community struct {
	ID          uuid.UUID `json:"id" db:"id"`
	Name        string    `json:"name" db:"name"`
	Description *string   `json:"description" db:"description"`
	Icon        *string   `json:"icon" db:"icon"`
	MemberCount int       `json:"member_count" db:"member_count"`
	IsFeatured  bool      `json:"is_featured" db:"is_featured"`
	CreatedAt   time.Time `json:"created_at" db:"created_at"`
}

type Message struct {
	ID          uuid.UUID  `json:"id" db:"id"`
	SenderID    uuid.UUID  `json:"sender_id" db:"sender_id"`
	ReceiverID  *uuid.UUID `json:"receiver_id" db:"receiver_id"`
	CommunityID *uuid.UUID `json:"community_id" db:"community_id"`
	Content     string     `json:"content" db:"content"`
	IsRead      bool       `json:"is_read" db:"is_read"`
	CreatedAt   time.Time  `json:"created_at" db:"created_at"`
}

type ReputationEvent struct {
	ID        uuid.UUID `json:"id" db:"id"`
	UserID    uuid.UUID `json:"user_id" db:"user_id"`
	Points    int       `json:"points" db:"points"`
	Reason    string    `json:"reason" db:"reason"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
}

type CreateUserRequest struct {
	Email       string  `json:"email" binding:"required,email"`
	Username    string  `json:"username" binding:"required,min=3,max=50"`
	Password    string  `json:"password" binding:"required,min=6"`
	DisplayName *string `json:"display_name"`
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type CreatePostRequest struct {
	Content string   `json:"content" binding:"required"`
	Code    *string  `json:"code"`
	Tags    []string `json:"tags"`
}

type CreateCommunityRequest struct {
	Name        string  `json:"name" binding:"required,min=3,max=100"`
	Description *string `json:"description"`
	Icon        *string `json:"icon"`
}

type SendMessageRequest struct {
	ReceiverID  *string `json:"receiver_id"`
	CommunityID *string `json:"community_id"`
	Content     string  `json:"content" binding:"required"`
}

type Job struct {
	ID             uuid.UUID `json:"id" db:"id"`
	CompanyID      uuid.UUID `json:"company_id" db:"company_id"`
	Title          string    `json:"title" db:"title"`
	Location       *string   `json:"location" db:"location"`
	Remote         bool      `json:"remote" db:"remote"`
	JobType        string    `json:"job_type" db:"job_type"`
	ExperienceLevel string   `json:"experience_level" db:"experience_level"`
	SalaryMin      *int      `json:"salary_min" db:"salary_min"`
	SalaryMax      *int      `json:"salary_max" db:"salary_max"`
	Currency       string    `json:"currency" db:"currency"`
	Description    *string   `json:"description" db:"description"`
	Requirements   []string  `json:"requirements" db:"requirements"`
	Benefits       []string  `json:"benefits" db:"benefits"`
	Tags           []string  `json:"tags" db:"tags"`
	ApplicantsCount int     `json:"applicants_count" db:"applicants_count"`
	IsFeatured     bool      `json:"is_featured" db:"is_featured"`
	IsUrgent       bool      `json:"is_urgent" db:"is_urgent"`
	IsActive       bool      `json:"is_active" db:"is_active"`
	PostedAt       time.Time `json:"posted_at" db:"posted_at"`
	UpdatedAt      time.Time `json:"updated_at" db:"updated_at"`
}

type JobApplication struct {
	ID           uuid.UUID `json:"id" db:"id"`
	JobID        uuid.UUID `json:"job_id" db:"job_id"`
	DeveloperID  uuid.UUID `json:"developer_id" db:"developer_id"`
	Status       string    `json:"status" db:"status"`
	CoverLetter  *string   `json:"cover_letter" db:"cover_letter"`
	Portfolio    *string   `json:"portfolio" db:"portfolio"`
	AppliedAt    time.Time `json:"applied_at" db:"applied_at"`
}

type CreateJobRequest struct {
	Title           string   `json:"title" binding:"required"`
	Location        *string  `json:"location"`
	Remote          bool     `json:"remote"`
	JobType         string   `json:"job_type"`
	ExperienceLevel string   `json:"experience_level"`
	SalaryMin       *int     `json:"salary_min"`
	SalaryMax       *int     `json:"salary_max"`
	Currency        string   `json:"currency"`
	Description     *string  `json:"description"`
	Requirements    []string `json:"requirements"`
	Benefits        []string `json:"benefits"`
	Tags            []string `json:"tags"`
	IsFeatured      bool     `json:"is_featured"`
	IsUrgent        bool     `json:"is_urgent"`
}

type ApplyToJobRequest struct {
	CoverLetter string `json:"cover_letter" binding:"required"`
	Portfolio   string `json:"portfolio"`
}
