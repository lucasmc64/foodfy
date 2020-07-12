const fs = require('fs')
const data = require('../../data.json')
const { response } = require('express')

module.exports = {
    index (request, response) {
        return response.render('admin/chefs/index', {
            chefs_page: true
        })
    },

    create (request, response) {
        return response.render('admin/chefs/create', {
            chefs_page: true
        })
    },

    post (request, response) {
        return response.send('Done.')
    },

    show (request, response) {
        return response.render('admin/chefs/show', {
            chefs_page: true
        })
    },
    
    edit (request, response) {
        return response.render('admin/chefs/edit', {
            chefs_page: true
        })
    }
}