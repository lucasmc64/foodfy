const { update } = require('../controllers/user')
const User = require('../models/User')

async function post(request, response, next) {
    let { email, password, password_repeat } = request.body

    const keys = Object.keys(request.body)

    for(key of keys) {
        if(request.body[key] == '') {
            return response.render('admin/users/create', {
                users_page: true,
                user: request.body,
                error: 'Por favor, preencha todos os campos.'
            })
        }
    }

    let results = await User.findByEmail(email)

    if(results.rows.length != 0) {
        return response.render('admin/users/create', {
            users_page: true,
            user: request.body,
            error: 'Já existe um usuário cadastrado com este email.'
        })
    }

    if(password !== password_repeat) {
        return response.render('admin/users/create', {
            users_page: true,
            user: request.body,
            error: 'A senha e a repetição de senha estão diferentes.'
        })
    }

    next()
}

async function put(request, response, next) {
    let { password, password_repeat } = request.body

    console.log(request.body)
    const keys = Object.keys(request.body)

    for(key of keys) {
        if(request.body[key] == '') {
            return response.render('admin/users/create', {
                users_page: true,
                user: request.body,
                error: 'Por favor, preencha todos os campos.'
            })
        }
    }

    if(password !== password_repeat) {
        return response.render('admin/users/create', {
            users_page: true,
            user: request.body,
            error: 'A senha e a repetição de senha estão diferentes.'
        })
    }
    
    next()
}

module.exports = {
    post,
    put
}