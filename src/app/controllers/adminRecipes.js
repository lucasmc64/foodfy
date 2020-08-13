const Recipes = require('../models/Recipes')
const Chefs = require('../models/Chefs')
const File = require('../models/File')

module.exports = {
    async index (request, response) {
        const results = await Recipes.all()
        const recipes = results.rows

        return response.render('admin/recipes/index', {
            recipes,
            recipes_page: true,
            page_active: true
        })
    },

    async create (request, response) {
        const results = await Chefs.all()
        const chefs =  results.rows

        return response.render('admin/recipes/create', {
            chefs,
            recipes_page: true
        })
    },

    async post (request, response) {
        const keys = Object.keys(request.body)

        for (key of keys) {
            if (request.body[key] == '' && key != 'information'  && key != 'removed_files') {
                return response.send('Please, fill all fields.')
            }
        }

        console.log(request.files.length)
        
        if(request.files.length == 0) return response.send('Please, send at least one image')
        
        let results = await Recipes.create(request.body)
        const recipe_id = results.rows[0].id

        const filesPromise = request.files.map((file) => File.create({ ...file, recipe_id }))
        await Promise.all(filesPromise)
        
        return response.redirect(`/admin/recipes/${recipe_id}`)
    },

    async show (request, response) {
        let results = await Recipes.find(request.params.id)
        const recipe = results.rows[0]

        if(!recipe) return response.send('Recipe not foud.')

        results = await Recipes.files(recipe.id)

        const files = results.rows.map((file) => ({
            ...file,
            src: `${request.protocol}://${request.headers.host}${file.path.replace('public', '')}`
        }))

        return response.render('admin/recipes/show', {
            recipe,
            files,
            recipes_page: true
        })
    },

    async edit (request, response) {
        let results = await Recipes.find(request.params.id)
        const recipe = results.rows[0]

        if (!recipe) return response.send('Recipe not found.')

        results = await Chefs.all()
        const chefs =  results.rows

        results = await Recipes.files(recipe.id)
        let files = results.rows
        files = files.map((file) => ({
            ...file,
            src: `${request.protocol}://${request.headers.host}${file.path.replace('public', '')}`
        }))

        return response.render('admin/recipes/edit', {
            chefs,
            recipe,
            files,
            recipes_page: true
        })
    },

    async put (request, response) {
        const keys = Object.keys(request.body)
        console.log(request.body)
        for (key of keys) {
            if (request.body[key] == '' && key != 'information' && key != 'removed_files') {
                return response.send('Please, fill all fields.')
            }
        }

        if(request.files.length != 0) {
            const newFilesPromise = request.files.map((file) => File.create({ ...file, recipe_id: request.body.id }))
            await Promise.all(newFilesPromise)
        }

        if(request.body.removed_files) {
            const removedFiles = request.body.removed_files.split(',')
            const lastIndex = removedFiles.length - 1
            removedFiles.splice(lastIndex, 1)

            const removedFilesPromise = removedFiles.map((id) => File.delete(id))

            await Promise.all(removedFilesPromise)
        }

        await Recipes.update(request.body)

        return response.redirect(`/admin/recipes/${request.body.id}`)
    },

    async delete (request, response) {
        await Recipes.delete(request.body.id)

        return response.redirect('/admin/recipes')
    }
}