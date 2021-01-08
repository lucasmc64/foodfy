const db = require('../../config/db')

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
    
            let values = [
                name,
                email,
                password
            ]
    
            if(is_admin) values.push(true)

            return db.query(query, values)
        } catch (error) {
            console.error(error)
        }
    },

    async update(user) {
        try {
            let { id, name, email, is_admin } = user

            let query = `
                UPDATE users SET
                    name=($1),
                    email=($2),
                    is_admin=($3)
                WHERE id = $4
            `
            
            let values = [
                name,
                email
            ]

            is_admin ? values.push(true) : values.push(false)

            values.push(id)

            return db.query(query, values)
        } catch (error) {
            console.error(error)
        }
    },

    async setToken(user) {
        const { id, reset_token, reset_token_expires } = user

        let query = `
            UPDATE users SET
                reset_token=($1),
                reset_token_expires=($2)
            WHERE id = $3
        `

        let values = [
            reset_token,
            reset_token_expires,
            id
        ]

        return db.query(query, values)
    },

    async setNewPassword(user) {
        const { id, password } = user

        let query = `
            UPDATE users SET
                password=($1),
                reset_token=($2),
                reset_token_expires=($3)
            WHERE id = $4
        `

        const reset_token = '', reset_token_expires = ''

        let values = [
            password,
            reset_token,
            reset_token_expires,
            id
        ]

        return db.query(query, values)
    },

    async delete(id) {
        let query = `
            DELETE FROM users WHERE id = $1
        `
        let values = [
            id
        ]

        return db.query(query, values)
    },

    findByEmail(email) {
        let query = `
            SELECT * FROM users WHERE users.email = $1
        `

        return db.query(query, [email])
    },

    findById(id) {
        let query = `
            SELECT * FROM users WHERE users.id = $1
        `

        return db.query(query, [id])
    }
}