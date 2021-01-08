const { update } = require('../controllers/user')
const User = require('../models/User')

async function post(request, response, next) {
    let { email } = request.body

    const keys = Object.keys(request.body)

    for(key of keys) {
        if(request.body[key] == '') {
            return response.render('admin/users/create', {
                user: request.body,
                error: 'Por favor, preencha todos os campos.'
            })
        }
    }

    let results = await User.findByEmail(email)

    if(results.rows.length != 0) {
        return response.render('admin/users/create', {
            user: request.body,
            error: 'Já existe um usuário cadastrado com este email.'
        })
    }

    next()
}

async function put(request, response, next) {
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
    
    next()
}

module.exports = {
    post,
    put
}