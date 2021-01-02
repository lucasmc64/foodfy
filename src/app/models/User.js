const { request } = require('express')
const db = require('../../config/db')

const { hash } = require('bcryptjs')

module.exports = {
    all() {
        let query = `SELECT * FROM users ORDER BY users.name ASC`

        return db.query(query)
    },

    async create(user) {
        try {
            let { name, email, password, is_admin } = user
    
            let query = `
                INSERT INTO users (
                    name,
                    email,
                    password${ is_admin ? ', is_admin' : '' }
                ) VALUES ($1, $2, $3${ is_admin ? ', $4' : '' })
                RETURNING id
            `
            
            const password_hash = await hash(password, 8)
    
            let values = [
                name,
                email,
                password_hash
            ]
    
            if(is_admin) values.push(true)

            return db.query(query, values)
        } catch (error) {
            console.log(error)
        }
    },

    findByEmail(email) {
        let query = `
            SELECT * FROM users WHERE users.email = $1
        `

        return db.query(query, [email])
    }
}