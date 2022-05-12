CREATE DATABASE pg_basic_rest;

CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255) NOT NULL
);
