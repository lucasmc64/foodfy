const express = require('express') // Importa o express
const nunjucks = require('nunjucks') // Importa o Nunjucks

const server = express() // Usa o express para montar o servidor

const data = require('./data')

server.use(express.static('public')) // Força o express a usar "arquivos etáticos", ou seja, CSS e JS utilizados pelas páginas

server.set('view engine', 'njk') // Seta que tipo de arquivo vai ser mostrado e que será uma View Engine que irá gerar as páginas

nunjucks.configure('views', { // Configuração do Nunjucks: o primeiro parâmetro é o nome da pasta onde estarão os arquivos, o segundo parâmetro é um objeto de configurações adicionais
    express: server, // Define o servidor no qual o Nunjucks vai funcionar
    autoescape: false, // Permite que, ao passar dados de variáveis para tags HTML, caso tenha alguma tag no conteúdo da variável, essa opção faz com que ela seja interpretada como tag e não como texto.
    noCache: true // Para que não seja guardado Cache e sempre que o servidor reiniciar o conteúdo mais atual seja mostrado
})


server.get('/', function(request, response) { //Rota
    banner = {
        title: "As melhores receitas",
        subtitle: "Aprenda a construir os melhores pratos com receitas criadas por profissionais do mundo inteiro.",
        image_name: "chef"
    }

    main_title = "Mais acessadas"

    return response.render('home', {
        banner: banner,
        main_title: main_title,
        data: data
    }) //Renderiza a página
})

server.get('/about', function(request, response) { //Rota
    const data_about = [
        {
            title: "Sobre o Foodfy",
            content: "Suspendisse placerat neque neque. Morbi dictum nulla non sapien rhoncus, et mattis erat commodo. Aliquam vel lacus a justo mollis luctus. Proin vel auctor eros, sed eleifend nunc. Curabitur eget tincidunt risus. Mauris malesuada facilisis magna, vitae volutpat sapien tristique eu. Morbi metus nunc, interdum in erat placerat, aliquam iaculis massa. Duis vulputate varius justo pharetra maximus. In vehicula enim nec nibh porta tincidunt. Vestibulum at ultrices turpis, non dictum metus. Vivamus ligula ex, semper vitae eros ut, euismod convallis augue.<br/><br/>Fusce nec pulvinar nunc. Duis porttitor tincidunt accumsan. Quisque pulvinar mollis ipsum ut accumsan. Proin ligula lectus, rutrum vel nisl quis, efficitur porttitor nisl. Morbi ut accumsan felis, eu ultrices lacus. Integer in tincidunt arcu, et posuere ligula. Morbi cursus facilisis feugiat. Praesent euismod nec nisl at accumsan. Donec libero neque, vulputate semper orci et, malesuada sodales eros. Nunc ut nulla faucibus enim ultricies euismod."
        },
        {
            title: "Como tudo começou…",
            content: "Suspendisse placerat neque neque. Morbi dictum nulla non sapien rhoncus, et mattis erat commodo. Aliquam vel lacus a justo mollis luctus. Proin vel auctor eros, sed eleifend nunc. Curabitur eget tincidunt risus. Mauris malesuada facilisis magna, vitae volutpat sapien tristique eu. Morbi metus nunc, interdum in erat placerat, aliquam iaculis massa. Duis vulputate varius justo pharetra maximus. In vehicula enim nec nibh porta tincidunt. Vestibulum at ultrices turpis, non dictum metus. Vivamus ligula ex, semper vitae eros ut, euismod convallis augue.<br/><br/>Fusce nec pulvinar nunc. Duis porttitor tincidunt accumsan. Quisque pulvinar mollis ipsum ut accumsan. Proin ligula lectus, rutrum vel nisl quis, efficitur porttitor nisl. Morbi ut accumsan felis, eu ultrices lacus. Integer in tincidunt arcu, et posuere ligula. Morbi cursus facilisis feugiat. Praesent euismod nec nisl at accumsan. Donec libero neque, vulputate semper orci et, malesuada sodales eros. Nunc ut nulla faucibus enim ultricies euismod."
        },
        {
            title: "Nossas receitas",
            content: "Fusce nec pulvinar nunc. Duis porttitor tincidunt accumsan. Quisque pulvinar mollis ipsum ut accumsan. Proin ligula lectus, rutrum vel nisl quis, efficitur porttitor nisl. Morbi ut accumsan felis, eu ultrices lacus. Integer in tincidunt arcu, et posuere ligula. Morbi cursus facilisis feugiat. Praesent euismod nec nisl at accumsan. Donec libero neque, vulputate semper orci et, malesuada sodales eros. Nunc ut nulla faucibus enim ultricies euismod."
        }
    ]

    return response.render('about', {
        data: data_about,
        about_page: true
    }) //Renderiza a página
})

server.get('/recipies', function(request, response) { //Rota
    return response.render('recipies', {
        data: data,
        recipies_page: true
    }) //Renderiza a página
})


server.listen('6363', function() { //Porta do localhost
    console.log('server is running') //Quando o servidor executar ele roda esse comando
})