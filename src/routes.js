const express = require('express')

const mainFoodfyController = require('./app/controllers/mainFoodfy')
const adminRecipesController = require('./app/controllers/adminRecipes')
const adminChefsController = require('./app/controllers/adminChefs')

const routes = express.Router()

routes.get('/', mainFoodfyController.index) // Página principal do site
routes.get('/about', mainFoodfyController.about) // Sobre o Foodfy
routes.get('/recipes', mainFoodfyController.recipes) // Todas as comidas que tem receita
routes.get('/recipes/:id', mainFoodfyController.recipe) // Receita de comida específica
routes.get('/chefs', mainFoodfyController.chefs) // Lista todos os chefs

routes.get('/admin/recipes', adminRecipesController.index) // Mostrar a lista de receitas
routes.get('/admin/recipes/create', adminRecipesController.create) // Mostrar formulário de nova receita
routes.post('/admin/recipes', adminRecipesController.post) // Cadastrar nova receita
routes.get('/admin/recipes/:id', adminRecipesController.show) // Exibir detalhes de uma receita
routes.get('/admin/recipes/:id/edit', adminRecipesController.edit) // Mostrar formulário de edição de receita
routes.put('/admin/recipes', adminRecipesController.put) // Editar uma receita
routes.delete('/admin/recipes', adminRecipesController.delete) // Deletar uma receita

routes.get('/admin/chefs', adminChefsController.index) // Listagem de chefs
routes.get('/admin/chefs/create', adminChefsController.create) // Mostrar formulário de novo chef
routes.post('/admin/chefs', adminChefsController.post) 
routes.get('/admin/chefs/:id', adminChefsController.show) // Exibir detalhes de um chef
routes.get('/admin/chefs/:id/edit', adminChefsController.edit) // Mostrar formulário de edição de chef
routes.put('/admin/chefs', adminChefsController.put) // Editar um chef
routes.delete('/admin/chefs', adminChefsController.delete) // Deletar um chef

module.exports = routes;