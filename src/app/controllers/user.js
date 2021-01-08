const crypto = require('crypto')
const { hash } = require('bcryptjs')

const mailer = require('../../lib/mailer')

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
        return response.render('admin/users/create')
    },

    async post(request, response) {
        let { name, email, is_admin } = request.body

        const password = crypto.randomBytes(8).toString("hex")

        const password_hash = await hash(password, 8)

        const results = await User.create({
            name,
            email,
            password: password_hash,
            is_admin
        })

        await mailer.sendMail({
            to: email,
            from: 'no-reply@foodfy.com',
            subject: 'Bem vindo ao Foodfy!',
            html: `
                <h1 style="text-align: center;">
                    Com os cumprimentos de nosso DevChef!
                </h1>
                <p style="text-align: center;">
                    Olá, seu cadastro no Foodfy foi concluído com sucesso!
                    <br>
                    Sua senha foi gerada automaticamente por nosso sistema e aqui está ela: ${password}
                    <br>
                    <a href="http://localhost:3000/admin?email=${email}">Clique aqui</a> para acessar o site e já fazer seu primeiro login.
                </p>
            `
        })

        request.session.user_id = results.rows[0].id

        return response.redirect('/admin/users')
    },

    async edit(request, response) {
        const user_id_to_edit = request.params.id
        const user_id_logged = request.session.user_id

        let user_logged = (await User.findById(user_id_logged)).rows[0]
        
        if(user_id_to_edit !== user_id_logged && !user_logged.is_admin) {
            return response.redirect('admin/users', {
                error: 'Você não tem permissão para editar esse usuário.'
            })
        }
        
        let user_to_edit = (await User.findById(user_id_to_edit)).rows[0]

        const current_user = {
            id: user_logged.id,
            is_admin: user_logged.is_admin
        }

        return response.render('admin/users/edit', {
            user: user_to_edit,
            current_user: current_user
        })
    },

    async put(request, response) {
        const results = await User.update(request.body)

        return response.redirect(`users/${request.body.id}/edit`)
    },

    async delete(request, response) {
        const user_id = request.body.id
        
        await User.delete(user_id)

        return response.redirect('/admin/users')
    }
}