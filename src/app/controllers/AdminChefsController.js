const fs = require('fs')
const data = require('../../data.json')
const { response } = require('express')

exports.index = function (request, response) {
    return response.render('admin/chefs/index', {
        chefs_page: true
    })
}

exports.create = function (request, response) {
    return response.render('admin/chefs/create')
}

exports.post = function (request, require) {
    return response.send('Done.')
}