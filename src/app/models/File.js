const db = require('../../config/db')
const fs = require('fs')

module.exports = {
    create({ filename, path, recipe_id, chef_id }) {
        const query = `
            INSERT INTO files (
                name,
                path,
                ${ recipe_id ? "recipe_id" : "chef_id" }
            ) VALUES ($1, $2, $3)
            RETURNING id
        `

        const values = [
            filename,
            path,
            recipe_id ? recipe_id : chef_id
        ]

        return db.query(query, values)
    },

    async delete(id) {
        try {
            const results = await db.query('SELECT * FROM files WHERE id = $1', [id])
            const file = results.rows[0]
    
            fs.unlinkSync(file.path)
            
            return db.query('DELETE FROM files WHERE id = $1', [id])
        }catch(error){
            console.log(error)
        }
    }
}