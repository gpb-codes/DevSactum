package services

import (
	"errors"
	"os"
	"time"

	"github.com/gpb-codes/DevSactum/backend/go-api/internal/models"
	"github.com/gpb-codes/DevSactum/backend/go-api/internal/repository"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type AuthService struct{}

func NewAuthService() *AuthService {
	return &AuthService{}
}

func (s *AuthService) Register(req *models.CreateUserRequest) (*models.User, error) {
	existing, _ := repository.GetUserByEmail(req.Email)
	if existing != nil {
		return nil, errors.New("email already registered")
	}

	existing, _ = repository.GetUserByUsername(req.Username)
	if existing != nil {
		return nil, errors.New("username already taken")
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	user := &models.User{
		ID:           uuid.New(),
		Email:        req.Email,
		Username:     req.Username,
		PasswordHash: string(hash),
		DisplayName:  req.DisplayName,
	}

	if err := repository.CreateUser(user); err != nil {
		return nil, err
	}

	profile := &models.Profile{
		ID:              uuid.New(),
		UserID:          user.ID,
		Stack:           []string{},
		Level:           "junior",
		ReputationScore: 0,
	}
	repository.CreateProfile(profile)

	return user, nil
}

func (s *AuthService) Login(req *models.LoginRequest) (*models.User, error) {
	user, err := repository.GetUserByEmail(req.Email)
	if err != nil {
		return nil, errors.New("invalid credentials")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password)); err != nil {
		return nil, errors.New("invalid credentials")
	}

	return user, nil
}

func (s *AuthService) GenerateToken(userID uuid.UUID) (string, error) {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		secret = "devsactum-secret-key-change-in-production"
	}

	token := uuid.New().String()
	return token, nil
}

func (s *AuthService) GetUser(id uuid.UUID) (*models.User, error) {
	return repository.GetUserByID(id)
}

func (s *AuthService) UpdateUser(user *models.User) error {
	user.UpdatedAt = time.Now()
	return repository.UpdateUser(user)
}

func (s *AuthService) DeleteUser(id uuid.UUID) error {
	return repository.DeleteUser(id)
}
