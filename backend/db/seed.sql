CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    profile_pic VARCHAR(100)
);

CREATE TABLE wines (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    name VARCHAR(100),
    year INTEGER,
    grapes VARCHAR(100),
    country VARCHAR(100),
    region VARCHAR(100),
    description TEXT,
    tags INTEGER,
    price FLOAT
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE followers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    follower_id INTEGER
);

INSERT INTO users (name, email, profile_pic) VALUES
('Alice', 'alice@gmail.com', 'https://randomuser.me/api/portraits'),
('Bob', 'bob@gmail.com', 'https://randomuser.me/api/portraits');

INSERT INTO wines (name, user_id, year, grapes, country, region, description, tags, price) VALUES
('Wine1', 1, 2010, 'grapes1', 'country1', 'region1', 'description1', 1, 10.00),
('Wine2', 1, 2011, 'grapes2', 'country2', 'region2', 'description2', 2, 20.00),
('Wine3', 2, 2012, 'grapes3', 'country3', 'region3', 'description3', 3, 30.00);

INSERT INTO tags (name) VALUES
('tag1'),
('tag2'),
('tag3');

INSERT INTO followers (user_id, follower_id) VALUES
(1, 2),
(2, 1);