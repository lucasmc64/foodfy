const db = require('../../config/db')

module.exports = {
    all(callback) {
        let query = `
            SELECT recipes.*, chefs.name AS chef FROM recipes LEFT JOIN chefs ON (chefs.id = recipes.chef_id) ORDER BY id ASC
        `

        db.query(query, function (error, results) {
            if (error) throw `Database error: ${error}`

            callback(results.rows)
        })
    },

    create(recipe, callback) {
        let {
            chef_id,
            image,
            title,
            ingredients,
            preparation,
            information
        } = recipe

        let query = `
            INSERT INTO recipes (
                chef_id,
                image,
                title,
                ingredients,
                preparation,
                information,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `
        const today = new Date()

        let values = [
            chef_id,
            image,
            title,
            ingredients,
            preparation,
            information,
            `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
        ]

        db.query(query, values, function (error, results) {
            if (error) throw `Database error: ${error}`

            callback(results.rows[0].id)
        })
    },

    find (id, callback) {
        let query = `
        SELECT recipes.*, chefs.name AS chef FROM recipes LEFT JOIN chefs ON (chefs.id = recipes.chef_id) WHERE recipes.id = $1
        `

        let values = [id]

        db.query(query, values, function (error, results) {
            if (error) throw `Database error: ${error}`

            callback(results.rows[0])
        })
    },

    findByChefId (id, callback) {
        let query = `
            SELECT recipes.*, chefs.name AS chef FROM recipes LEFT JOIN chefs ON (chefs.id = recipes.chef_id) WHERE recipes.chef_id = $1 ORDER BY recipes.id ASC
        `

        let values = [id]

        db.query(query, values, function (error, results) {
            if (error) throw `Database error: ${error}`

            callback(results.rows)
        })
    },

    search (filter, callback) {
        let query = `
            SELECT recipes.*, chefs.name AS chef FROM recipes LEFT JOIN chefs ON (chefs.id = recipes.chef_id) WHERE recipes.title ILIKE '%${filter}%' ORDER BY id ASC
        `

        db.query(query, function (error, results) {
            if (error) throw `Database error: ${error}`

            callback(results.rows)
        })
    },

    update (recipe, callback) {
        const query = `
            UPDATE recipes SET
                chef_id=($1),
                image=($2),
                title=($3),
                ingredients=($4),
                preparation=($5),
                information=($6)
            WHERE id = $7
            `
        const values = [
            recipe.chef_id,
            recipe.image,
            recipe.title,
            recipe.ingredients,
            recipe.preparation,
            recipe.information,
            recipe.id
        ]

        db.query(query, values, function (error, results) {
            if (error) throw `Database error. ${error}`

            callback()
        })
    },

    delete (id, callback) {
        let query = `
            DELETE FROM recipes WHERE id = $1
        `

        let values = [id]

        db.query(query, values, function (error, results) {
            if (error) throw `Database error: ${error}`

            callback()
        })
    }
}