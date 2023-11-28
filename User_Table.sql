CREATE EXTENSION IF NOT EXISTS "pgcrypto";
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id VARCHAR(8),
    username VARCHAR(50),
    email VARCHAR(100),
    password_hash CHAR(60),
    --
    CONSTRAINT null_user_id CHECK (user_id IS NOT NULL),
    CONSTRAINT null_username CHECK (username IS NOT NULL),
    CONSTRAINT null_email CHECK (email IS NOT NULL),
    CONSTRAINT null_password_hash CHECK (password_hash IS NOT NULL)
    --
    CONSTRAINT users_PK PRIMARY KEY (user_id)
);

-- Example of inserting a user with a hashed password using pgcrypto
INSERT INTO users (username, email, password_hash)
VALUES ('john_doe', 'john@example.com', crypt('secure_password', gen_salt('bf')));
