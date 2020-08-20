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
            recipes: recipesWithFiles.splice(0, 6)
        }) //Renderiza a página
    },

    about(request, response) { //Rota
        return response.render('main/about', {
            about_page: true
        }) //Renderiza a página
    },

    async recipes(request, response) { //Rota
        let filter = request.query.filter
        
        if (filter) {
            let results = await Recipes.search(filter)
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

            return response.render('main/recipes', {
                recipes: recipesWithFiles,
                filter,
                recipes_page: true
            }) //Renderiza a página
        } else {
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

            return response.render('main/recipes', {
                recipes: recipesWithFiles,
                recipes_page: true
            }) //Renderiza a página
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

    async chefs(request, response) {
        const results = await Chefs.all()
        const chefs =  results.rows
        
        if(!chefs) return response.send('Chefs not found.')

        async function getChefImages(chefId) {
            let results = await Chefs.files(chefId)

            const files = results.rows.map((file) => ({
                ...file,
                src: `${request.protocol}://${request.headers.host}${file.path.replace('public', '')}`
            }))

            return files
        }

        const chefsPromise = chefs.map(async (chef) => {
            chef.files = await getChefImages(chef.id)
            chef.total_of_recipes = (await Chefs.totalOfRecipes(chef.id)).rows[0].total_of_recipes
            return chef
        })

        const chefsWithFiles = await Promise.all(chefsPromise)

        return response.render('main/chefs', {
            chefs: chefsWithFiles,
            chefs_page: true
        })
    }
}