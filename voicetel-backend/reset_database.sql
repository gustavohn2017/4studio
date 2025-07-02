-- Reset database with proper encoding
\c postgres;

-- Force disconnect all connections to the database
SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'voicetel_db'
AND pid <> pg_backend_pid();

-- Drop and recreate database with UTF-8 encoding
DROP DATABASE IF EXISTS voicetel_db;
CREATE DATABASE voicetel_db WITH ENCODING 'UTF8';

-- Connect to the newly created database
\c voicetel_db;

-- Set proper encoding for the session
SET client_encoding TO 'UTF8';

-- Show current encoding
SHOW client_encoding;
