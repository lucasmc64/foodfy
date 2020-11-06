const { Pool } = require('pg')

module.exports = new Pool ({
    user: 'lucasmc64',
    password: 'Oceania06',
    host: 'localhost',
    port: '5432',
    database: 'foodfy'
})