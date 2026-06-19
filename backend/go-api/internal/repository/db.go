package repository

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func Connect() error {
	dsn := os.Getenv("DATABASE_URL")
	dbDriver := os.Getenv("DB_DRIVER")

	if dbDriver == "sqlite" || dsn == "" {
		log.Println("Trying SQLite fallback...")
		dbPath := os.Getenv("DB_PATH")
		if dbPath == "" {
			dbPath = "devsactum.db"
		}

		var err error
		DB, err = sql.Open("sqlite3", dbPath+"?_journal_mode=WAL&_busy_timeout=5000")
		if err != nil {
			return fmt.Errorf("failed to open sqlite: %w", err)
		}

		DB.SetMaxOpenConns(1)
		initSQLite()
		log.Println("Connected to SQLite:", dbPath)
		return nil
	}

	var err error
	DB, err = sql.Open("postgres", dsn)
	if err != nil {
		return fmt.Errorf("failed to open database: %w", err)
	}

	if err = DB.Ping(); err != nil {
		return fmt.Errorf("failed to ping database: %w", err)
	}

	DB.SetMaxOpenConns(25)
	DB.SetMaxIdleConns(5)

	return nil
}

func initSQLite() {
	tables := `
	CREATE TABLE IF NOT EXISTS users (
		id TEXT PRIMARY KEY,
		email TEXT UNIQUE NOT NULL,
		username TEXT UNIQUE NOT NULL,
		password_hash TEXT NOT NULL,
		display_name TEXT,
		avatar_url TEXT,
		bio TEXT,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);
	CREATE TABLE IF NOT EXISTS profiles (
		id TEXT PRIMARY KEY,
		user_id TEXT UNIQUE NOT NULL,
		stack TEXT DEFAULT '',
		level TEXT DEFAULT 'junior',
		github_username TEXT,
		website TEXT,
		bio TEXT,
		title TEXT,
		reputation_score INTEGER DEFAULT 0,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (user_id) REFERENCES users(id)
	);
	CREATE TABLE IF NOT EXISTS posts (
		id TEXT PRIMARY KEY,
		user_id TEXT NOT NULL,
		content TEXT NOT NULL,
		code TEXT,
		tags TEXT DEFAULT '',
		likes_count INTEGER DEFAULT 0,
		comments_count INTEGER DEFAULT 0,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (user_id) REFERENCES users(id)
	);
	CREATE TABLE IF NOT EXISTS communities (
		id TEXT PRIMARY KEY,
		name TEXT UNIQUE NOT NULL,
		description TEXT,
		icon TEXT,
		member_count INTEGER DEFAULT 0,
		is_featured INTEGER DEFAULT 0,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);
	CREATE TABLE IF NOT EXISTS community_members (
		id TEXT PRIMARY KEY,
		community_id TEXT NOT NULL,
		user_id TEXT NOT NULL,
		role TEXT DEFAULT 'member',
		joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (community_id) REFERENCES communities(id),
		FOREIGN KEY (user_id) REFERENCES users(id)
	);
	CREATE TABLE IF NOT EXISTS messages (
		id TEXT PRIMARY KEY,
		sender_id TEXT NOT NULL,
		receiver_id TEXT,
		community_id TEXT,
		content TEXT NOT NULL,
		is_read INTEGER DEFAULT 0,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (sender_id) REFERENCES users(id)
	);
	CREATE TABLE IF NOT EXISTS reputation_events (
		id TEXT PRIMARY KEY,
		user_id TEXT NOT NULL,
		points INTEGER NOT NULL,
		reason TEXT NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (user_id) REFERENCES users(id)
	);
	CREATE TABLE IF NOT EXISTS jobs (
		id TEXT PRIMARY KEY,
		company_id TEXT NOT NULL,
		title TEXT NOT NULL,
		location TEXT,
		remote INTEGER DEFAULT 0,
		job_type TEXT DEFAULT 'full-time',
		experience_level TEXT DEFAULT 'mid',
		salary_min INTEGER,
		salary_max INTEGER,
		currency TEXT DEFAULT 'USD',
		description TEXT,
		requirements TEXT DEFAULT '',
		benefits TEXT DEFAULT '',
		tags TEXT DEFAULT '',
		applicants_count INTEGER DEFAULT 0,
		is_featured INTEGER DEFAULT 0,
		is_urgent INTEGER DEFAULT 0,
		is_active INTEGER DEFAULT 1,
		posted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (company_id) REFERENCES users(id)
	);
	CREATE TABLE IF NOT EXISTS job_applications (
		id TEXT PRIMARY KEY,
		job_id TEXT NOT NULL,
		developer_id TEXT NOT NULL,
		status TEXT DEFAULT 'pending',
		cover_letter TEXT,
		portfolio TEXT,
		applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (job_id) REFERENCES jobs(id),
		FOREIGN KEY (developer_id) REFERENCES users(id)
	);
	CREATE TABLE IF NOT EXISTS job_bookmarks (
		id TEXT PRIMARY KEY,
		job_id TEXT NOT NULL,
		user_id TEXT NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (job_id) REFERENCES jobs(id),
		FOREIGN KEY (user_id) REFERENCES users(id)
	);
	CREATE TABLE IF NOT EXISTS portfolios (
		id TEXT PRIMARY KEY,
		user_id TEXT NOT NULL,
		title TEXT NOT NULL,
		description TEXT,
		url TEXT,
		image_url TEXT,
		tags TEXT DEFAULT '',
		is_featured INTEGER DEFAULT 0,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (user_id) REFERENCES users(id)
	);
	CREATE TABLE IF NOT EXISTS freelance_projects (
		id TEXT PRIMARY KEY,
		client_id TEXT NOT NULL,
		title TEXT NOT NULL,
		description TEXT,
		budget_min INTEGER,
		budget_max INTEGER,
		currency TEXT DEFAULT 'USD',
		deadline TEXT,
		skills TEXT DEFAULT '',
		status TEXT DEFAULT 'open',
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (client_id) REFERENCES users(id)
	);
	CREATE TABLE IF NOT EXISTS freelance_bids (
		id TEXT PRIMARY KEY,
		project_id TEXT NOT NULL,
		developer_id TEXT NOT NULL,
		amount INTEGER NOT NULL,
		proposal TEXT,
		estimated_days INTEGER,
		status TEXT DEFAULT 'pending',
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (project_id) REFERENCES freelance_projects(id),
		FOREIGN KEY (developer_id) REFERENCES users(id)
	);
	CREATE TABLE IF NOT EXISTS validations (
		id TEXT PRIMARY KEY,
		user_id TEXT NOT NULL,
		skill TEXT NOT NULL,
		score INTEGER DEFAULT 0,
		max_score INTEGER DEFAULT 100,
		status TEXT DEFAULT 'pending',
		completed_at DATETIME,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (user_id) REFERENCES users(id)
	);
	CREATE TABLE IF NOT EXISTS subscriptions (
		id TEXT PRIMARY KEY,
		user_id TEXT NOT NULL,
		plan TEXT NOT NULL,
		status TEXT DEFAULT 'active',
		paypal_subscription_id TEXT,
		amount INTEGER NOT NULL,
		currency TEXT DEFAULT 'USD',
		billing_cycle TEXT DEFAULT 'monthly',
		started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		expires_at DATETIME,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (user_id) REFERENCES users(id)
	);
	`
	_, err := DB.Exec(tables)
	if err != nil {
		log.Printf("Warning: could not create tables: %v", err)
	}
}
