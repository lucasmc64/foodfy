const fs = require('fs')
const data = require('../../data.json')

const AdminChefs = require('../models/AdminChefs')

module.exports = {
    index (request, response) {
        AdminChefs.all (function (chefs) {
            return response.render('admin/chefs/index', {
                chefs,
                chefs_page: true
            })
        })
    },

    create (request, response) {
        return response.render('admin/chefs/create', {
            chefs_page: true
        })
    },

    post (request, response) {
        const keys = Object.keys(request.body)

        for (key of keys) {
            if (request.body[key] == '') {
                return response.send('Please, fill all fields.')
            }
        }

        AdminChefs.create(request.body, function (chef) {
            return response.redirect(`/admin/chefs/${chef.id}`)
        })
    },

    show (request, response) {
        AdminChefs.find(request.params.id, function (chef) {
            if (!chef) return response.send('Chef not found!')

            return response.render('admin/chefs/show', {
                chef,
                chefs_page: true
            })
        })
    },
    
    edit (request, response) {
        AdminChefs.find(request.params.id, function (chef) {
            if (!chef) return response.send('Chef not found!')

            return response.render(`admin/chefs/${request.params.id}/edit`, {
                chef,
                chefs_page: true
            })
        })
    },

    put (request, response) {
        const keys = Object.keys(request.body)

        for (key of keys) {
            if (request.body[key] == '') {
                return response.send('Please, fill all fields.')
            }
        }

        AdminChefs.update(request.body, function () {
            return response.redirect(`/instructors/${request.body.id}`)
        })
    }
}