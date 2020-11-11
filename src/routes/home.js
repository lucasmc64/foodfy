const express = require('express')
const routes = express.Router()

const HomeController = require('../app/controllers/home')

routes.get('/', HomeController.index) // Página principal do site
routes.get('/about', HomeController.about) // Sobre o Foodfy
routes.get('/recipes', HomeController.recipes) // Todas as comidas que tem receita
routes.get('/recipes/:id', HomeController.recipe) // Receita de comida específica
routes.get('/chefs', HomeController.chefs) // Lista todos os chefs

module.exports = routes