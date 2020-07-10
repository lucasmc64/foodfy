const fs = require('fs')
const data = require('../../data.json')

exports.index = function (request, response) {
    return response.render('admin/chefs/index', {
        chefs_page: true
    })
}

exports.create = function (request, response) {
    return
}