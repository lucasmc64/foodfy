const fs = require('fs')
const data = require('../../data.json')

module.exports = {
    index (request, response) {
        return response.render('admin/recipes/index', {
            data: data.recipes,
            recipes_page: true
        })
    },

    create (request, response) {
        return response.render('admin/recipes/create', {
            recipes_page: true
        })
    },

    post (request, response) {
        const {
            image,
            title,
            author,
            ingredients,
            preparation,
            information
        } = request.body
    
        let id = 1
        const lastRecipe = data.recipes[data.recipes.length - 1]
    
        if (lastRecipe) {
            id = lastRecipe.id + 1
        }
    
        data.recipes.push({
            id,
            image,
            title,
            author,
            ingredients,
            preparation,
            information
        })
    
        fs.writeFile('data.json', JSON.stringify(data, null, 4), function (error) {
            if (error) {
                return response.send('Write file error!')
            }
    
            return response.redirect('/admin/recipes/recipes')
        })
    
        return response.json(data)
    },

    show (request, response) {
        const id = request.params.id
    
        const foundFood = data.recipes.find((item) => item.id == id)
    
        if (!foundFood) {
            return response.send('Food not found.')
        }
    
        return response.render('admin/recipes/show', {
            data: foundFood,
            recipes_page: true
        })
    },

    edit (request, response) {
        const { id } = request.params
    
        const foundFood = data.recipes.find((item) => item.id == id)
    
        if (!foundFood) {
            return response.send('Food not found.')
        }
    
        return response.render('admin/recipes/edit', {
            data: foundFood,
            recipes_page: true
        })
    },

    put (request, response) {
        const { 
            id, 
            image,
            title,
            author,
            ingredients,
            preparation,
            information 
        } = request.body
        
        let index = 0
    
        let foundFood = data.recipes.find((item, foundIndex) => {
            if (item.id == id) {
                index = foundIndex
                return true
            }
        })
        
        if (!foundFood) {
            return response.send('Food not found.')
        }
    
        const recipe = {
            id,
            image,
            title,
            author,
            ingredients,
            preparation,
            information
        }
    
        data.recipes[index] = recipe
    
        fs.writeFile('data.json', JSON.stringify(data, null, 4), function (error) {
            if (error) {
                return response.send('Write file error.')
            }
    
            return response.redirect('/admin/recipes')
        })
    },

    delete (request, response) {
        const { id } = request.body
    
        const filteredFoods = data.recipes.filter((item) => item.id != id)
    
        data.recipes = filteredFoods
    
        fs.writeFile('data.json', JSON.stringify(data, null, 4), function (error) {
            if (error) {
                return response.send('Write file error.')
            }
    
            return response.redirect('/admin/recipes/recipes')
        })
    }    
}