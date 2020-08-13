const Recipes = require('../models/Recipes')
const Chefs = require('../models/Chefs')
const File = require('../models/File')
const { recipe } = require('./mainFoodfy')

module.exports = {
    async index (request, response) {
        const results = await Chefs.all()
        const chefs =  results.rows
        console.log(chefs)

        return response.render('admin/chefs/index', {
            chefs,
            chefs_page: true
        })
    },

    create (request, response) {
        return response.render('admin/chefs/create', {
            chefs_page: true
        })
    },

    async post (request, response) {
        const keys = Object.keys(request.body)

        for (key of keys) {
            if (request.body[key] == '') {
                return response.send('Please, fill all fields.')
            }
        }
        console.log(request.body)
        console.log(request.files)

        if(request.files.length == 0) return response.send('Please, send at least one image')

        let results = await Chefs.create(request.body)
        const chef_id = results.rows[0].id

        const filesPromise = request.files.map((file) => File.create({ ...file, chef_id }))
        await Promise.all(filesPromise)

        return response.redirect(`/admin/chefs/${chef_id}`)
    },

    async show (request, response) {
        let chef = await Chefs.find(request.params.id)
        chef = chef.rows[0]

        if (!chef) return response.send('Chef not found!')

        let recipes = await Recipes.findByChefId(request.params.id)
        recipes = recipes.rows

        let numberOfRecipes = await Chefs.numberOfRecipesPerChef()
        numberOfRecipes = numberOfRecipes.rows
        numberOfRecipes = numberOfRecipes.find((item) => item.chef_id == chef.id)
        chef.total_of_recipes = numberOfRecipes.total_of_recipes
        console.log(recipes)

        const filesPromise = recipes.map((recipe) => Recipes.files(recipe.id))
        let results = await Promise.all(filesPromise)
        console.log(results.rows)

        for(recipe in recipes) {
            let file = results.rows[0]
            file = {
                ...file,
                src: `${request.protocol}://${request.headers.host}${file.path.replace('public', '')}`
            }

            recipe = {
                ...recipe,
                file
            }
        }

        return response.render('admin/chefs/show', {
            chef,
            recipes,
            files,
            chefs_page: true
        })
    },
    
    async edit (request, response) {
        const chef = await Chefs.find(request.params.id)

        if (!chef) return response.send('Chef not found!')

        return response.render(`admin/chefs/edit`, {
            chef,
            chefs_page: true
        })
    },

    async put (request, response) {
        const keys = Object.keys(request.body)

        for (key of keys) {
            if (request.body[key] == '') {
                return response.send('Please, fill all fields.')
            }
        }

        Chefs.update(request.body, function () {
            return response.redirect(`/admin/chefs/${request.body.id}`)
        })
    },

    delete (request, response) {
        Recipes.findByChefId(request.body.id, function (recipes) {
            if (recipes.length > 0) {
                return response.send('This chef has recipes that cannot be deleted.')
            } 

            Chefs.delete(request.body.id, function () {
                return response.redirect('/admin/chefs')
            })
        })
        
    }
}