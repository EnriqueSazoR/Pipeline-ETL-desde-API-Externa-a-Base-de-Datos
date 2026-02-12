CREATE DATABASE crypto_etl;

-- =============================================
-- CRYPTO ETL PIPELINE - DATABASE SCHEMA
-- PostgreSQL
-- =============================================

-- =========================
-- 1. TABLE: coins
-- =========================
CREATE TABLE IF NOT EXISTS coins (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	symbol VARCHAR(10) NOT NULL,
	source VARCHAR(50) DEFAULT 'coingecko',
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	UNIQUE(symbol)

);

-- =========================
-- 2. TABLE: price_history
-- =========================
CREATE TABLE IF NOT EXISTS price_history (
	id BIGSERIAL PRIMARY KEY,
	coin_id INT NOT NULL,
	price DECIMAL(18,8) NOT NULL,
	market_cap DECIMAL(20,2),
	volume_24h DECIMAL(20,2),
	price_timestamp TIMESTAMP NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


	CONSTRAINT fk_coin
		FOREIGN KEY (coin_id)
		REFERENCES coins(id)
		ON DELETE CASCADE
);

-- Índice para consultas por fecha
CREATE INDEX idx_price_timestamp
ON price_history(price_timestamp);

-- Índice compuesto para incremental
CREATE UNIQUE INDEX uq_coin_timestamp
ON price_history(coin_id, price_timestamp);

-- =========================
-- 3. TABLE: etl_metadata
-- =========================
CREATE TABLE IF NOT EXISTS etl_metadata (
	process_name VARCHAR(50) PRIMARY KEY,
	last_processed_at TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert inicial del proceso
INSERT INTO etl_metadata (process_name, last_processed_at)
VALUES ('crypto_price_etl', NULL)
ON CONFLICT (process_name) DO NOTHING;

-- =========================
-- 4. TABLE: etl_log
-- =========================
CREATE TABLE IF NOT EXISTS etl_log (
	id SERIAL PRIMARY KEY,
	run_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	status VARCHAR(20) NOT NULL,
	rows_inserted INT DEFAULT 0,
	error_message TEXT
);

