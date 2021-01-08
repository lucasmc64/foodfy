const { Pool } = require('pg')

module.exports = new Pool ({
    user: 'USER',
    password: 'PASSWORD',
    host: 'localhost',
    port: '5432',
    database: 'foodfy'
})