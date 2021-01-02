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
        const user = await User.create(request.body)

        request.session.user = user 

        return response.redirect('/admin/users')
    },

    async edit(request, response) {
        const user_id = request.params.id
        let current_user = request.session.user

        current_user = (await User.findById(current_user.rows[0].id)).rows[0]
        let user = (await User.findById(user_id)).rows[0]

        if(user_id !== current_user.id && !current_user.is_admin) {
            return response.redirect('admin/users', {
                error: 'Você não tem permissão para editar esse usuário.'
            })
        }

        return response.render('admin/users/edit', {
            user: user,
            users_page: true
        })
    },
    async put(request, response) {
        const user = await User.update(request.body)
        console.log(user.rows[0])

        return response.render('admin/users/edit', {
            user: user.rows[0],
            users_page: true
        })
    }
}