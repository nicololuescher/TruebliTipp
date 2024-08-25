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
    type VARCHAR(100),
    country VARCHAR(100),
    region VARCHAR(100),
    description TEXT,
    tags VARCHAR(100),
    price FLOAT,
    rating INTEGER
);

INSERT INTO users (name, email, profile_pic) VALUES
('Alice', 'alice@gmail.com', 'https://randomuser.me/api/portraits'),
('Bob', 'bob@gmail.com', 'https://randomuser.me/api/portraits');

INSERT INTO wines (name, user_id, year, grapes, type, country, region, description, tags, price, rating) VALUES
('Château Margaux', 1, 2015, 'Cabernet Sauvignon', 'Red', 'France', 'Bordeaux', 'A legendary wine from one of Bordeauxs most prestigious estates, Château Margaux 2015 is a stunning example of the Margaux appellation.', 1, 650.00, 5),
('Penfolds Grange', 1, 2016, 'Shiraz', 'Red', 'Australia', 'South Australia', 'Penfolds Grange is Australias most iconic wine, known for its intense flavor and remarkable aging potential. ', 2, 800.00, 4),
('Nebbiolo', 2, 2018, 'Chardonnay', 'White', 'France', 'Burgundy', 'Domaine Leflaive Puligny-Montrachet is a benchmark white Burgundy, known for its elegance and complexity.', 3, 220.00, 3);