const crypto = require('crypto')
const { hash } = require('bcryptjs')

const mailer = require('../../lib/mailer')

const User = require('../models/User')

module.exports = {
    loginForm(request, response) {
        return response.render('admin/session/login.njk')
    },

    login(request, response) {
        request.session.user_id = request.user.id
        return response.redirect('/admin/recipes')
    },

    logout(request, response) {
        request.session.destroy()
        return response.redirect('/')
    },

    forgotPasswordForm(request, response) {
        return response.render('admin/session/forgot-password')
    },

    async forgotPassword(request, response) {
        const user = request.user

        try {
            // Criar um token para esse usuário
            const token = crypto.randomBytes(20).toString('hex')

            // Criar uma expiração para esse token
            let now = new Date()
            now = now.setHours(now.getHours() + 1)

            await User.setToken({
                id: user.id,
                reset_token: token,
                reset_token_expires: now
            })

            // Enviar um email com o link de recuperação de senha
            await mailer.sendMail({
                to: user.email,
                from: 'no-reply@foodfy.com',
                subject: 'Recuperação de senha',
                html: `
                    <h1 style="text-align: center;">
                        Perdeu sua senha? Vamos resolver rapidinho!
                    </h1>
                    <p style="text-align: center;">
                        Não se preocupe, basta clicar no link abaixo para recuperar a sua senha.
                        <br>
                        <a href="http://localhost:3000/admin/reset-password?token=${token}" target="_blank">RECUPERAR SENHA</a>
                    </p>
                `
            })

            // Avisar o usuário que enviamos o email
            return response.render('admin/session/forgot-password', {
                success: 'Te enviamos um email para resetar a sua senha!'
            })
        } catch (error) {
            console.error(error)

            return response.render('admin/session/forgot-password', {
                error: 'Erro inesperado, tente novamente.'
            })
        }
    },

    resetPasswordForm(request, response) {
        return response.render('admin/session/reset-password', {
            token: request.query.token
        })
    },

    async resetPassword(request, response) {
        const user = request.user
        const { password, token } = request.body

        try {
            // Create a new password hash
            const password_hash = await hash(password, 8)

            // Update user
            await User.setNewPassword({
                id: user.id,
                password: password_hash
            })

            // Warns the user that he has a new password
            return response.render('admin/session/login', {
                success: 'Senha alterada com sucesso!'
            })
        } catch (error) {
            console.error(error)

            return response.render('admin/session/reset-password', {
                token: token,
                user: request.body,
                error: 'Erro inesperado, tente novamente.'
            })
        }
    }
}