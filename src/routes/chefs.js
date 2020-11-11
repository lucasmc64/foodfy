const express = require('express')
const routes = express.Router()

const multer = require('../app/middlewares/multer')

const ChefController = require('../app/controllers/chef')

routes.get('/chefs', ChefController.index) // Listagem de chefs
routes.get('/chefs/create', ChefController.create) // Mostrar formulário de novo chef
routes.post('/chefs', multer.array('photos', 1), ChefController.post) 
routes.get('/chefs/:id', ChefController.show) // Exibir detalhes de um chef
routes.get('/chefs/:id/edit', ChefController.edit) // Mostrar formulário de edição de chef
routes.put('/chefs', multer.array('photos', 1), ChefController.put) // Editar um chef
routes.delete('/chefs', ChefController.delete) // Deletar um chef

module.exports = routes