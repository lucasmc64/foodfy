const db = require('../../config/db')

module.exports = {
    all() {
        let query = `
            SELECT recipes.*, chefs.name AS chef FROM recipes LEFT JOIN chefs ON (chefs.id = recipes.chef_id) ORDER BY created_at DESC
        `

        return db.query(query)
    },

    mostAccessed() {
        let query = `
            SELECT recipes.*, chefs.name AS chef FROM recipes LEFT JOIN chefs ON (chefs.id = recipes.chef_id) ORDER BY views DESC
        `

        return db.query(query)
    },

    create(recipe) {
        let {
            chef_id,
            title,
            ingredients,
            preparation,
            information
        } = recipe

        let query = `
            INSERT INTO recipes (
                chef_id,
                title,
                ingredients,
                preparation,
                information
            ) VALUES ($1, $2, $3, $4, $5)
            RETURNING id
        `
        const today = new Date()

        let values = [
            chef_id,
            title,
            ingredients,
            preparation,
            information
        ]

        return db.query(query, values)
    },

    async find (id) {
        let query = `
            SELECT recipes.*, chefs.name AS chef FROM recipes LEFT JOIN chefs ON (chefs.id = recipes.chef_id) WHERE recipes.id = $1
        `

        let values = [id]

        let views = (await db.query(`SELECT views FROM recipes WHERE id = $1`, [id])).rows[0].views
        views = views + 1
        await db.query(`UPDATE recipes SET views=($1) WHERE id = $2`, [views, id])

        return db.query(query, values)
    },

    findByChefId (id) {
        let query = `
            SELECT recipes.*, chefs.name AS chef FROM recipes LEFT JOIN chefs ON (chefs.id = recipes.chef_id) WHERE recipes.chef_id = $1 ORDER BY recipes.id ASC
        `

        let values = [id]

        return db.query(query, values)
    },

    search (filter) {
        let query = `
            SELECT recipes.*, chefs.name AS chef FROM recipes LEFT JOIN chefs ON (chefs.id = recipes.chef_id) WHERE recipes.title ILIKE '%${filter}%' ORDER BY updated_at DESC
        `

        return db.query(query)
    },

    update (recipe) {
        const query = `
            UPDATE recipes SET
                chef_id=($1),
                title=($2),
                ingredients=($3),
                preparation=($4),
                information=($5)
            WHERE id = $6
            `
        const values = [
            recipe.chef_id,
            recipe.title,
            recipe.ingredients,
            recipe.preparation,
            recipe.information,
            recipe.id
        ]

        return db.query(query, values)
    },

    delete (id) {
        let query = `
            DELETE FROM recipes WHERE id = $1
        `

        let values = [id]

        return db.query(query, values)
    },

    files(id) {
        return db.query('SELECT * FROM files WHERE recipe_id = $1', [id])
    }
}