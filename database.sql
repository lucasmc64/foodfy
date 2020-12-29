-- Criação do banco de dados

DROP DATABASE IF EXISTS foodfy;

CREATE DATABASE foodfy;

-- Criação de tabelas

-- -- Receitas

CREATE TABLE recipes (
   id SERIAL PRIMARY KEY,
   chef_id INT NULL,
   title TEXT NULL,
   ingredients TEXT[] NULL,
   preparation TEXT[] NULL,
   information TEXT NULL,
   created_at TIMESTAMP NULL,
   updated_at TIMESTAMP NULL
);

-- -- Chefs

CREATE TABLE chefs (
   id SERIAL PRIMARY KEY,
   name TEXT NULL,
   created_at TIMESTAMP NULL
);

-- -- Usuários

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  reset_token TEXT,
  reset_token_expires TEXT,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT(now()),
  updated_at TIMESTAMP DEFAULT(now())
);

-- -- Arquivos

CREATE TABLE files (
  id SERIAL PRIMARY KEY,
  name TEXT NULL,
  path TEXT NOT NULL,
  chef_id INT NULL,
  recipe_id INT NULL
);


-- Chaves estrangeiras

ALTER TABLE "recipes" ADD FOREIGN KEY ("chef_id") REFERENCES "chefs" ("id");

-- Procedure e trigger para atualizar a hora de atualização de uma receita

CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
	NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON recipes
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
