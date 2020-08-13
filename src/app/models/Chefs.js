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
                name=($1),
                avatar_url=($2)
            WHERE id = $3
            `
        const values = [
            chef.name,
            chef.avatar_url,
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

    numberOfRecipesPerChef() {
        let query = `SELECT chefs.id AS chef_id, COUNT(recipes.title) AS total_of_recipes FROM chefs, recipes WHERE chefs.id = recipes.chef_id GROUP BY chefs.id`

        return db.query(query)
    }
}