const Recipes = require('../models/Recipe')
const Chefs = require('../models/Chef')
const File = require('../models/File')
const { recipe } = require('./home')

module.exports = {
    async index (request, response) {
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
            return chef
        })

        const chefsWithFiles = await Promise.all(chefsPromise)

        return response.render('admin/chefs/index', {
            chefs: chefsWithFiles,
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

        async function getChefImages(chefId) {
            let results = await Chefs.files(chefId)

            const files = results.rows.map((file) => ({
                ...file,
                src: `${request.protocol}://${request.headers.host}${file.path.replace('public', '')}`
            }))

            return files
        }

        chef.files = await getChefImages(chef.id)
        chef.total_of_recipes = (await Chefs.totalOfRecipes(chef.id)).rows[0].total_of_recipes

        let recipes = await Recipes.findByChefId(request.params.id)
        recipes = recipes.rows

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

        return response.render('admin/chefs/show', {
            chef,
            recipes: recipesWithFiles,
            chefs_page: true
        })
    },
    
    async edit (request, response) {
        let results = await Chefs.find(request.params.id)
        const chef = results.rows[0]

        if (!chef) return response.send('Chef not found!')

        async function getChefImages(chefId) {
            let results = await Chefs.files(chefId)

            const files = results.rows.map((file) => ({
                ...file,
                src: `${request.protocol}://${request.headers.host}${file.path.replace('public', '')}`
            }))

            return files
        }

        chef.files = await getChefImages(chef.id)
        
        return response.render(`admin/chefs/edit`, {
            chef,
            chefs_page: true
        })
    },

    async put (request, response) {
        const keys = Object.keys(request.body)
        console.log(request.files)

        for (key of keys) {
            if (request.body[key] == ''  && key != 'removed_files') {
                return response.send('Please, fill all fields.')
            }
        }

        if(request.files.length != 0) {
            const newFilesPromise = request.files.map((file) => File.create({ ...file, chef_id: request.body.id }))
            await Promise.all(newFilesPromise)
        }

        if(request.body.removed_files) {
            const removedFiles = request.body.removed_files.split(',')
            const lastIndex = removedFiles.length - 1
            removedFiles.splice(lastIndex, 1)

            const removedFilesPromise = removedFiles.map((id) => File.delete(id))

            await Promise.all(removedFilesPromise)
        }

        await Chefs.update(request.body)
        
        return response.redirect(`/admin/chefs/${request.body.id}`)
    },

    async delete (request, response) {
        let total_of_recipes = (await Chefs.totalOfRecipes(request.body.id)).rows[0].total_of_recipes

        if (total_of_recipes > 0) {
            return response.send('This chef has recipes that cannot be deleted.')
        } 

        await Chefs.delete(request.body.id)

        return response.redirect('/admin/chefs')
        
    }
}