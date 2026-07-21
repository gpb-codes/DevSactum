-- DevSactum Database Initialization
-- This runs automatically on first PostgreSQL startup

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Schema for public
CREATE SCHEMA IF NOT EXISTS devsactum;

-- Set timezone
ALTER DATABASE devsactum SET timezone TO 'UTC';
