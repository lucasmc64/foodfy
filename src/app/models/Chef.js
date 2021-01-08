const db = require('../../config/db')

module.exports = {
    all() {
        let query = `SELECT chefs.* FROM chefs ORDER BY chefs.name ASC`

        return db.query(query)
    },

    create(chef) {
        let {
            name
        } = chef
        
        let query = `
            INSERT INTO chefs (
                name
            ) VALUES ($1)
            RETURNING id
        `
        const today = new Date()

        let values = [
            name
        ]

        return db.query(query, values)
    },

    find (id) {
        let query = `
            SELECT chefs.*, (SELECT count(recipes.title) AS total_of_recipes FROM recipes) FROM chefs WHERE chefs.id = $1
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