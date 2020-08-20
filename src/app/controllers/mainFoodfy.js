const Recipes = require('../models/Recipes')
const Chefs = require('../models/Chefs')

module.exports = {
    async index(request, response) { //Rota
        let results = await Recipes.all()
        const recipes = results.rows

        if(!recipes) return response.send('Recipes not found.')

        async function getRecipeImages(recipeId) {
            let results = await Recipes.files(recipeId)

            const files = results.rows.map((file) => ({
                ...file,
                src: `${request.protocol}://${request.headers.host}${file.path.replace('public', '')}`
            }))

            return files
        }

        const recipesPromise = recipes.map(async (recipe) => {
            recipe.files = await getRecipeImages(recipe.id)
            return recipe
        })

        const recipesWithFiles = await Promise.all(recipesPromise)

        return response.render('main/index', {
            recipes: recipesWithFiles
        }) //Renderiza a página
    },

    about(request, response) { //Rota
        return response.render('main/about', {
            about_page: true
        }) //Renderiza a página
    },

    recipes(request, response) { //Rota
        let filter = request.query.filter
        
        if (filter) {
            Recipes.search(filter, function (recipes) {
                return response.render('main/recipes', {
                    recipes,
                    filter,
                    recipes_page: true
                }) //Renderiza a página
            })
        } else {
            Recipes.all(function (recipes) {
                return response.render('main/recipes', {
                    recipes,
                    recipes_page: true
                }) //Renderiza a página
            })
        }
    },

    async recipe(request, response) { //Rota
        let results = await Recipes.find(request.params.id)
        const recipe = results.rows[0]

        if(!recipe) return response.send('Recipe not foud.')

        results = await Recipes.files(recipe.id)

        const files = results.rows.map((file) => ({
            ...file,
            src: `${request.protocol}://${request.headers.host}${file.path.replace('public', '')}`
        }))

        recipe.files = files

        return response.render('main/recipe', {
            recipe,
            recipes_page: true
        }) //Renderiza a página
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