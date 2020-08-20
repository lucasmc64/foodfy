const db = require('../../config/db')

module.exports = {
    all() {
        let query = `SELECT chefs.* FROM chefs, recipes GROUP BY chefs.id`

        return db.query(query)
    },

    create(chef) {
        let {
            name,
            avatar_url
        } = chef

        let query = `
            INSERT INTO chefs (
                name,
                created_at
            ) VALUES ($1, $2)
            RETURNING id
        `
        const today = new Date()

        let values = [
            name,
            `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
        ]

        return db.query(query, values)
    },

    find (id) {
        let query = `
            SELECT chefs.*, count(recipes.title) AS total_of_recipes FROM chefs, recipes WHERE chefs.id = $1 GROUP BY chefs.id
        `

        let values = [id]

        return db.query(query, values)
    },

    update (chef) {
        const query = `
            UPDATE chefs SET
                name=($1)
            WHERE id = $2
            `
        const values = [
            chef.name,
            chef.id
        ]

        return db.query(query, values)
    },

    delete (id) {
        let query = `
            DELETE FROM chefs WHERE id = $1
        `

        let values = [id]

        return db.query(query, values)
    },

    files(id) {
        return db.query('SELECT * FROM files WHERE chef_id = $1', [id])
    },

    totalOfRecipes(id) {
        let query = `SELECT COUNT(recipes.title) AS total_of_recipes FROM recipes WHERE recipes.chef_id = $1`

        return db.query(query, [id])
    }
}