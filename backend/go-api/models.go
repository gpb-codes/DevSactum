package main

type Post struct {
	ID            string `json:"id"`
	Content       string `json:"content"`
	UserID        string `json:"user_id"`
	Username      string `json:"username,omitempty"`
	DisplayName   string `json:"display_name,omitempty"`
	Tags          string `json:"tags,omitempty"`
	CodeSnippet   string `json:"code_snippet,omitempty"`
	CodeLanguage  string `json:"code_language,omitempty"`
	LikesCount    int    `json:"likes_count"`
	CommentsCount int    `json:"comments_count"`
	CreatedAt     string `json:"created_at"`
}

type Community struct {
	ID           string `json:"id"`
	Name         string `json:"name"`
	Description  string `json:"description,omitempty"`
	Icon         string `json:"icon,omitempty"`
	MembersCount int    `json:"members_count"`
	OnlineCount  int    `json:"online_count"`
	CreatorID    string `json:"creator_id,omitempty"`
	CreatedAt    string `json:"created_at"`
}

type ReputationProfile struct {
	ID              string `json:"id"`
	UserID          string `json:"user_id"`
	DisplayName     string `json:"display_name,omitempty"`
	Username        string `json:"username,omitempty"`
	Stack           string `json:"stack,omitempty"`
	Level           string `json:"level,omitempty"`
	ReputationScore int    `json:"reputation_score"`
	Title           string `json:"title,omitempty"`
	Bio             string `json:"bio,omitempty"`
	CreatedAt       string `json:"created_at,omitempty"`
}

type ReputationEvent struct {
	ID          string `json:"id"`
	UserID      string `json:"user_id"`
	EventType   string `json:"event_type"`
	Points      int    `json:"points"`
	Description string `json:"description,omitempty"`
	CreatedAt   string `json:"created_at"`
}

type LeaderboardEntry struct {
	UserID string `json:"userId"`
	Score  int    `json:"score"`
	Level  string `json:"level"`
}
