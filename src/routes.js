const express = require('express')

const recipesController = require('./app/controllers/RecipesController')
const adminController = require('./app/controllers/AdminController')
const adminChefsController = require('./app/controllers/AdminChefsController')

const routes = express.Router()

routes.get('/', recipesController.index) // Página principal do site
routes.get('/about', recipesController.about) // Sobre o Foodfy
routes.get('/recipes', recipesController.recipes) // Todas as comidas que tem receita
routes.get('/recipes/:id', recipesController.recipe) // Receita de comida específica

routes.get('/admin/recipes', adminController.recipes) // Mostrar a lista de receitas
routes.get('/admin/recipes/create', adminController.create) // Mostrar formulário de nova receita
routes.post('/admin/recipes', adminController.post) // Cadastrar nova receita
routes.get('/admin/recipes/:id', adminController.show) // Exibir detalhes de uma receita
routes.get('/admin/recipes/:id/edit', adminController.edit) // Mostrar formulário de edição de receita
routes.put('/admin/recipes', adminController.put) // Editar uma receita
routes.delete('/admin/recipes', adminController.delete) // Deletar uma receita

routes.get('/admin/chefs', adminChefsController.index) // Listagem de chefs
routes.get('/admin/chefs/create', adminChefsController.create) // Mostrar formulário de novo chef
routes.post('/admin/chefs', adminChefsController.post) 
routes.get('/admin/chefs/:id', adminChefsController.show)

module.exports = routes;