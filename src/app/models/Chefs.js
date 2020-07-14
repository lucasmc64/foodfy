const db = require('../../config/db')

module.exports = {
    all(callback) {
        let query = `SELECT chefs.*, count(recipes.title) AS total_of_recipes FROM chefs, recipes WHERE chefs.id = recipes.chef_id GROUP BY chefs.id`

        db.query(query, function (error, results) {
            if (error) throw `Database error: ${error}`

            callback(results.rows)
        })
    },

    create(chef, callback) {
        let {
            name,
            avatar_url
        } = chef

        let query = `
            INSERT INTO chefs (
                name,
                avatar_url,
                created_at
            ) VALUES ($1, $2, $3)
            RETURNING id
        `
        const today = new Date()

        let values = [
            name,
            avatar_url,
            `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
        ]

        db.query(query, values, function (error, results) {
            if (error) throw `Database error: ${error}`

            callback(results.rows[0])
        })
    },

    find (id, callback) {
        let query = `
            SELECT chefs.*, count(recipes.title) AS total_of_recipes FROM chefs, recipes WHERE chefs.id = $1 GROUP BY chefs.id
        `

        let values = [id]

        db.query(query, values, function (error, results) {
            if (error) throw `Database error: ${error}`

            callback(results.rows[0])
        })
    },

    update (chef, callback) {
        const query = `
            UPDATE chefs SET
                name=($1),
                avatar_url=($2)
            WHERE id = $3
            `
        const values = [
            chef.name,
            chef.avatar_url,
            chef.id
        ]

        db.query(query, values, function (error, results) {
            if (error) throw `Database error. ${error}`

            callback()
        })
    },

    delete (id, callback) {
        let query = `
            DELETE FROM chefs WHERE id = $1
        `

        let values = [id]

        db.query(query, values, function (error, results) {
            if (error) throw `Database error: ${error}`

            callback()
        })
    }
}