const express = require('express')
const routes = express.Router()

const UserController = require('../app/controllers/user')

const UserValidator = require('../app/validators/user')

// Rotas de perfil de um usuário logado
//routes.get('/profile', ProfileController.index) // Mostrar o formulário com dados do usuário logado
//routes.put('/profile', ProfileController.put) // Editar o usuário logado

// Rotas que o administrador irá acessar para gerenciar usuários
routes.get('/users', UserController.index) // Listagem de usuários cadastrados
routes.get('/users/create', UserController.create) // Mostrar formulário de novo usuário
routes.get('/users/:id/edit', UserController.edit) // Mostrar formulário de edição de usuário
routes.post('/users', UserValidator.post, UserController.post) // Cadastrar um usuário
//routes.put('/users', UserController.put) // Editar um usuário
//routes.delete('/users', UserController.delete) // Deletar um usuário

module.exports = routes