const fs = require('fs')
const data = require('../../data.json')
const { response } = require('express')

exports.index = function (request, response) {
    return response.render('admin/chefs/index', {
        chefs_page: true
    })
}

exports.create = function (request, response) {
    return response.render('admin/chefs/create', {
        chefs_page: true
    })
}

exports.post = function (request, response) {
    return response.send('Done.')
}

exports.show = function (request, response) {
    return response.render('admin/chefs/show', {
        chefs_page: true
    })
}