CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username varchar(255) NOT NULL,
    firstname varchar(255) NOT NULL,
    lastname varchar(255) NOT NULL,
    password varchar(255) NOT NULL
);