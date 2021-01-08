const express = require('express')
const routes = express.Router()

const UserController = require('../app/controllers/user')
const UserValidator = require('../app/validators/user')

const SessionController = require('../app/controllers/session')
const SessionValidator = require('../app/validators/session')

const { redirectToAdminDashboard, onlyUsersCanAccess } = require('../app/middlewares/session')

// Login / Logout
routes.get('/', redirectToAdminDashboard, SessionController.loginForm)
routes.post('/login', SessionValidator.login, SessionController.login)
routes.post('/logout', SessionController.logout)

// Reset password / Forgot password
routes.get('/forgot-password', SessionController.forgotPasswordForm)
routes.post('/forgot-password', SessionValidator.forgotPassword, SessionController.forgotPassword)
routes.get('/reset-password', SessionController.resetPasswordForm)
routes.post('/reset-password', SessionValidator.resetPassword, SessionController.resetPassword)

// Rotas que o administrador irá acessar para gerenciar usuários
routes.get('/users', onlyUsersCanAccess, UserController.index) // Listagem de usuários cadastrados
routes.get('/users/create', onlyUsersCanAccess, UserController.create) // Mostrar formulário de novo usuário
routes.post('/users', UserValidator.post, UserController.post) // Cadastrar um usuário
routes.get('/users/:id/edit', onlyUsersCanAccess, UserController.edit) // Mostrar formulário de edição de usuário
routes.put('/users', UserValidator.put, UserController.put) // Atualizar um usuário
routes.delete('/users', UserController.delete) // Deletar um usuário

module.exports = routes