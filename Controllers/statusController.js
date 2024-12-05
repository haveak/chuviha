const pool = require('../db')

class StatusController{
    
    async getAllStatus(req,res) {
        try{
            const status = await pool.query(`SELECT * FROM statuses`)
            res.json(status.rows)
        } catch(error){
            console.log(error)
        }
    }

    async getStatusById(req, res){
        const id = req.params.id
        try{
            const status = await pool.query(`SELECT * FROM statuses WHERE id = $1`, [id])
            res.json(status.rows)
        } catch (error){
            console.error('error', error)
        }
    }

    async createStatus(req, res){
        const {username_id, loan_date, return_date, count} = req.body
        try{
            const status = await pool.query(`INSERT INTO statuses (username_id, loan_date, return_date, count) VALUES ($1, $2, $3, $4) RETURNING *`, [username_id, loan_date, return_date, count]) 
            res.json(status.rows)
        } catch (error) {
            console.error('error', error)
        }
    }

    async updateStatus(req,res) {
        const id = parseInt(req.params.id, 10)
        const {username_id, loan_date, return_date, count} = req.body
        try{
            const status = await pool.query(`UPDATE statuses SET username_id = $1, loan_date = $2, return_date = $3, count = $4 WHERE id = $5 RETURNING *`, [username_id, loan_date, return_date, count, id])
            res.json(status.rows)
        } catch (error){
            console.error('error', error)
        }
    }

    async deleteStatus(req,res) {
        const id = req.params.id
        const status = await pool.query(`DELETE FROM statuses WHERE id = $1`, [id])
        res.json(status.rows[0])
    }
}

module.exports = new StatusController