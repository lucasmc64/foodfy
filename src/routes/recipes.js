const express = require('express')
const routes = express.Router()

const multer = require('../app/middlewares/multer')

const RecipeController = require('../app/controllers/recipe')

routes.get('/recipes', RecipeController.index) // Mostrar a lista de receitas
routes.get('/recipes/create', RecipeController.create) // Mostrar formulário de nova receita
routes.post('/recipes', multer.array('photos', 6), RecipeController.post) // Cadastrar nova receita
routes.get('/recipes/:id', RecipeController.show) // Exibir detalhes de uma receita
routes.get('/recipes/:id/edit', RecipeController.edit) // Mostrar formulário de edição de receita
routes.put('/recipes', multer.array('photos', 6), RecipeController.put) // Editar uma receita
routes.delete('/recipes', RecipeController.delete) // Deletar uma receita

module.exports = routes