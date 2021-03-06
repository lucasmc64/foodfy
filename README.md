![Foodfy](./readme-images/01-foodfy.png)

# Foodfy &#127829;

*Esse foi um projeto desenvolvido com a intenção de aprender novas tecnologias e exercitar conceitos.*

## Objetivo &#127919;

Foodfy é um site de receitas que visa ensinar ao internauta fazer comidas deliciosas e possibilitar as pessoas a compartilharem sus segredos culinários.

## Desafios

Segue uma tabela com os desafios do Foodfy caso você queira replicá-lo por si mesmo.

| Feito?   | Desafio                                                      |
| -------- | ------------------------------------------------------------ |
| &#9989;  | [01 - Construindo o Foodfy](https://github.com/Rocketseat/bootcamp-launchbase-desafios-02/blob/master/desafios/02-foodfy.md) |
| &#9989;  | [02 - Refatorando o Foodfy](https://github.com/Rocketseat/bootcamp-launchbase-desafios-03/blob/master/desafios/03-refatorando-foodfy.md) |
| &#9989;  | [03 - Administração do Foodfy](https://github.com/Rocketseat/bootcamp-launchbase-desafios-04/blob/master/desafios/04-admin-foodfy.md) |
| &#9989;  | [04 - Persistindo Dados no Foodfy](https://github.com/Rocketseat/bootcamp-launchbase-desafios-05/blob/master/desafios/05-persistindo-dados-foodfy.md) |
| &#9989;  | [05 - Envio de Imagens no Foodfy](https://github.com/Rocketseat/bootcamp-launchbase-desafios-07/blob/master/desafios/07-foodfy-envio-imagens.md) |
| &#9989;  | [06 - Apresentação e Organização de Receitas no Foodfy](https://github.com/Rocketseat/bootcamp-launchbase-desafios-08/blob/master/desafios/08-apresentacao-organizacao-receitas-foodfy.md) |
| &#9989;  | [07 - Sistema de Login do Foodfy](https://github.com/Rocketseat/bootcamp-launchbase-desafios-10/blob/master/desafios/10-sistema-login-foodfy.md) |

## Alguns detalhes &#128220;

* O banco de dados usado é o PostgreSQL.
* O backend é construído com Node.JS.
* O fontend é construído com o framework ReactJS.

## Como rodar o projeto em minha máquina? &#129300;

O primeiro passo é clonar o projeto, seja via terminal ou GitHub Desktop, ou mesmo baixando o arquivo compactado (.zip). Após isso, siga adiante.

## Requisitos &#128736;

* Ter o Node.JS instalado.
* Ter o PostgreSQL instalado.
* (Opcional) Ter o Postbird instalado.
* (Opcional) Ter o Yarn instalado.

### Instalando dependências &#128269;

Com o Node.JS instalado, acesse cada um dos diretórios (**server**, **web** e **mobile**) via terminal e rode o comando `npm install`. Caso você prefira usar o Yarn, basta rodar o comando `yarn`.

### Criando banco de dados e tabelas no PostgreSQL &#129405;

Inicie o servidor e utilizando a ferramenta Postbird (ou de outra maneira, caso queira), crie através de queries um banco de dados chamado *foodfy*.

```sql
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
   views INT DEFAULT(0),
   created_at TIMESTAMP DEFAULT(now()),
   updated_at TIMESTAMP DEFAULT(now())
);

-- -- Chefs

CREATE TABLE chefs (
   id SERIAL PRIMARY KEY,
   name TEXT NULL,
   created_at TIMESTAMP DEFAULT(now())
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

-- Procedure e trigger para atualizar a hora de atualização de receitas e usuários

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

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- Tabela e configs para o controle de sessão (connect-pg-simple)

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");
```

### Configurando o Nodemailer &#128231;

Acesse o arquivo */src/lib/mailer.js* e o abra no editor que preferir. Altere os parâmetros **user** e **pass** conforme seu servidor SMTP.

### Configurando conexão com o servidor &#129520;

Dentro da pasta do projeto entre em */src/config* e abra o arquivo *db.js* em uma IDE ou editor de código.

No arquivo, altere as informações de **user** e **password** (entre outras) de acordo com a configuração feita no PostgreSQL.

### Definitivamente rodando o projeto! &#10024;

Se tudo deu certo, agora basta acessar a pasta do projeto pelo terminal e digitar o comando `npm start` ou `yarn start`. Uma aba será aberta no seu navegador padrão com o projeto rodando!
