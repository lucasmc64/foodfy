const { use } = require('../../routes/users')
const User = require('../models/User')

module.exports = {
    async index(request, response) {
        const users = await User.all()

        return response.render('admin/users/index', {
            users: users.rows,
            users_page: true
        })
    },

    create(request, response) {
        return response.render('admin/users/create', {
            users_page: true
        })
    },

    async post(request, response) {
        const user_id = await User.create(request.body)

        request.session.user_id = user_id 

        return response.redirect('/admin/users')
    },

    edit(request, response) {
        return response.render('admin/users/edit', {
            users_page: true
        })
    }
}