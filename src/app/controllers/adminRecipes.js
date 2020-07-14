const fs = require('fs')
const data = require('../../data.json')

const AdminRecipes = require('../models/AdminRecipes')
const AdminChefs = require('../models/AdminChefs')

module.exports = {
    index(request, response) {
        let chef
        AdminRecipes.all(function (recipes) {
            return response.render('admin/recipes/index', {
                recipes,
                recipes_page: true
            })
        })
    },

    create(request, response) {
        AdminChefs.all(function (chefs) {
            return response.render('admin/recipes/create', {
                chefs,
                recipes_page: true
            })
        })
    },

    post(request, response) {
        const keys = Object.keys(request.body)

        for (key of keys) {
            if (request.body[key] == '' && key != 'information') {
                return response.send('Please, fill all fields.')
            }
        }

        AdminRecipes.create(request.body, function (id) {
            return response.redirect(`/admin/recipes/${id}`)
        })
    },

    show(request, response) {
        AdminRecipes.find(request.params.id, function (recipe) {
            return response.render('admin/recipes/show', {
                recipe,
                recipes_page: true
            })
        })

    },

    edit(request, response) {
        AdminRecipes.find(request.params.id, function (recipe) {
            AdminChefs.all(function (chefs) {
                return response.render('admin/recipes/edit', {
                    chefs,
                    recipe,
                    recipes_page: true
                })
            })
        })
    },

    put(request, response) {
        const keys = Object.keys(request.body)

        for (key of keys) {
            if (request.body[key] == '' && key != 'information') {
                return response.send('Please, fill all fields.')
            }
        }

        AdminRecipes.update(request.body, function (recipe) {
            return response.redirect(`/admin/recipes/${request.body.id}`)
        })
    },

    delete(request, response) {
        AdminRecipes.delete(request.body.id, function () {
            return response.redirect('/admin/recipes')
        })
    }
}