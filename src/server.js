const express = require('express') // Importa o express
const nunjucks = require('nunjucks') // Importa o Nunjucks
const methodOverride = require('method-override')

const routes = require('./routes')
const session = require('./config/session')

const server = express() // Usa o express para montar o servidor

server.use(session)
server.use(function(request, response, next) {
    response.locals.session = request.session
    next()
})

server.use(express.urlencoded({ extended: true }))
server.use(express.static('public')) // Força o express a usar "arquivos etáticos", ou seja, CSS e JS utilizados pelas páginas
server.use(methodOverride('_method'))
server.use(routes)

server.set('view engine', 'njk') // Seta que tipo de arquivo vai ser mostrado e que será uma View Engine que irá gerar as páginas

nunjucks.configure('src/app/views', { // Configuração do Nunjucks: o primeiro parâmetro é o nome da pasta onde estarão os arquivos, o segundo parâmetro é um objeto de configurações adicionais
    express: server, // Define o servidor no qual o Nunjucks vai funcionar
    autoescape: false, // Permite que, ao passar dados de variáveis para tags HTML, caso tenha alguma tag no conteúdo da variável, essa opção faz com que ela seja interpretada como tag e não como texto.
    noCache: true // Para que não seja guardado Cache e sempre que o servidor reiniciar o conteúdo mais atual seja mostrado
})

server.listen('6363', function() { //Porta do localhost
    console.log('server is running') //Quando o servidor executar ele roda esse comando
})