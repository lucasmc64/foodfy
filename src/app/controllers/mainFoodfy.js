const Recipes = require('../models/Recipes')
const Chefs = require('../models/Chefs')

module.exports = {
    index(request, response) { //Rota
        Recipes.all(function (recipes) {
            return response.render('main/index', {
                recipes
            }) //Renderiza a página
        })
    },

    about(request, response) { //Rota
        return response.render('main/about', {
            about_page: true
        }) //Renderiza a página
    },

    recipes(request, response) { //Rota
        Recipes.all(function (recipes) {
            console.log(recipes)
            return response.render('main/recipes', {
                recipes,
                recipes_page: true
            }) //Renderiza a página
        })
    },

    recipe(request, response) { //Rota
        
        Recipes.find(request.params.id, function (recipe) {
            return response.render('main/recipe', {
                recipe,
                recipes_page: true
            }) //Renderiza a página
        })
    },

    chefs(request, response) {
        Chefs.all(function (chefs) {
            console.log(chefs)
            return response.render('main/chefs', {
                chefs,
                chefs_page: true
            })
        })
    }
}