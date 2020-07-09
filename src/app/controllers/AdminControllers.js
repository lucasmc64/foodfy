const fs = require('fs')
const data = require('../../data.json')

exports.index = function (request, response) {
    console.log(data.recipes)
    return response.render('admin/index', {
        data: data.recipes
    })
}

exports.create = function (request, response) {
    return response.render('admin/create')
}

exports.post = function (request, response) {
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

        return response.redirect('/admin/recipes')
    })

    return response.json(data)
}

exports.show = function (request, response) {
    const id = request.params.id

    const foundFood = data.recipes.find((item) => item.id == id)

    if (!foundFood) {
        return response.send('Food not found.')
    }

    return response.render('admin/show', {
        data: foundFood
    })
}

exports.edit = function (request, response) {
    const { id } = request.params

    const foundFood = data.recipes.find((item) => item.id == id)

    if (!foundFood) {
        return response.send('Food not found.')
    }

    return response.render('admin/edit', {
        data: foundFood
    })
}

exports.put = function (request, response) {
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
}

exports.delete = function (request, response) {
    const { id } = request.body

    const filteredFoods = data.recipes.filter((item) => item.id != id)

    data.recipes = filteredFoods

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function (error) {
        if (error) {
            return response.send('Write file error.')
        }

        return response.redirect('/admin/recipes')
    })
}