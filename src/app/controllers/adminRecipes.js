const Recipes = require('../models/Recipes')
const Chefs = require('../models/Chefs')

module.exports = {
    index (request, response) {
        Recipes.all(function (recipes) {
            return response.render('admin/recipes/index', {
                recipes,
                recipes_page: true,
                page_active: true
            })
        })
    },

    create (request, response) {
        Chefs.all(function (chefs) {
            return response.render('admin/recipes/create', {
                chefs,
                recipes_page: true
            })
        })
    },

    post (request, response) {
        const keys = Object.keys(request.body)

        for (key of keys) {
            if (request.body[key] == '' && key != 'information') {
                return response.send('Please, fill all fields.')
            }
        }

        Recipes.create(request.body, function (id) {
            return response.redirect(`/admin/recipes/${id}`)
        })
    },

    show (request, response) {
        Recipes.find(request.params.id, function (recipe) {
            return response.render('admin/recipes/show', {
                recipe,
                recipes_page: true
            })
        })

    },

    edit (request, response) {
        Recipes.find(request.params.id, function (recipe) {
            Chefs.all(function (chefs) {
                return response.render('admin/recipes/edit', {
                    chefs,
                    recipe,
                    recipes_page: true
                })
            })
        })
    },

    put (request, response) {
        const keys = Object.keys(request.body)

        for (key of keys) {
            if (request.body[key] == '' && key != 'information') {
                return response.send('Please, fill all fields.')
            }
        }

        Recipes.update(request.body, function (recipe) {
            return response.redirect(`/admin/recipes/${request.body.id}`)
        })
    },

    delete (request, response) {
        Recipes.delete(request.body.id, function () {
            return response.redirect('/admin/recipes')
        })
    }
}