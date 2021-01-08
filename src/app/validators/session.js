const User = require('../models/User')
const { compare } = require('bcryptjs')

async function login(request, response, next) {
    try {
        const { email, password } = request.body
    
        const user = (await User.findByEmail(email)).rows[0]
    
        if(!user) {
            return response.render('admin/session/login', {
                error: 'Usuário não cadastrado.',
                user: request.body
            })
        }
    
        const passed = await compare(password, user.password)
    
        if(!passed) {
            return response.render('admin/session/login', {
                error: 'Senha incorreta.',
                user: request.body
            })
        }
    
        request.user = user
    
        next()
    } catch (error) {
        console.error(error)
    }
}

async function forgotPassword(request, response, next) {
    try {
        const { email } = request.body
    
        const user = (await User.findByEmail(email)).rows[0]
    
        if(!user) {
            return response.render('admin/session/forgot-password', {
                user: request.body,
                error: 'Email não cadastrado.'
            })
        }
    
        request.user = user

        next()
    } catch (error) {
        console.error(error)
    }
}

async function resetPassword(request, response, next) {
    // Search for user
    const { email, password, password_repeat, token } = request.body

    const user = (await User.findByEmail(email)).rows[0]

    if(!user) {
        return response.render('admin/session/reset-password', {
            token: token,
            user: request.body,
            error: 'Usuário não cadastrado.'
        })
    }

    // Compare the passwords
    if(password !== password_repeat) {
        return response.render('admin/session/reset-password', {
            token: token,
            user: request.body,
            error: 'A senha e a repetição de senha estão diferentes.'
        })
    }

    // Check the token
    if(token !== user.reset_token || token === '') {
        return response.render('admin/session/reset-password', {
            token: token,
            user: request.body,
            error: 'Token inválido! Solicite um novo link para recuperação de senha.'
        })
    }

    // Verify that the token has not expired
    let now = new Date()
    now = now.setHours(now.getHours())

    if(now > user.reset_token_expires) {
        return response.render('admin/session/reset-password', {
            token: token,
            user: request.body,
            error: 'Token expirou! Solicite um novo link para recuperação de senha.'
        })
    }

    request.user = user

    next()
}

module.exports = {
    login,
    forgotPassword,
    resetPassword
}