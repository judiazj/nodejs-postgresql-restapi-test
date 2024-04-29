CREATE DATABASE IF NOT EXISTS companydb;

CREATE TABLE employee(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) DEFAULT NULL,
    salary NUMERIC(5) DEFAULT 0 CHECK (salary >= 0)
);


INSERT INTO employee VALUES
    (1, 'Juan', 1000),
    (2, 'Vanessa', 1900),
    (3, 'Blanca', 7000),
    (4, 'Berny', 6300);