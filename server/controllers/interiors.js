import { pool } from '../config/database.js'

const getInteriors = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM Interiors ORDER BY material ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json( { error: error.message } )
  }
}

export default {
  getInteriors
}
