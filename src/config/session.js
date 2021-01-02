const session = require('express-session')
const pgSession = require('connect-pg-simple')(session) // Retorna uma função
const db = require('./db')

module.exports = session({
    store: new pgSession({ // Armazenamento da sessão
        pool: db // Banco de dados
    }),
    secret: 'my-precious', // "Senha"
    resave: false, // Salvar a sessão a todo reload
    saveUninitialized: false, // Salvar a sessão sem haver dados
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000 // Quanto tempo a sessão vai ficar ativa em milissegundos (nesse caso 30 dias)
    }
})