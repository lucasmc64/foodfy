const express = require('express')

const PageController = require('./controllers/PageControllers')

const pageController = new PageController

const routes = express.Router()

routes.get('/', pageController.index)

routes.get('/about', pageController.about)

routes.get('/recipies', pageController.recipies)

routes.get('/recipies/:id', pageController.recipie)

module.exports = routes;