import { pool } from '../config/database.js'

const getWheels = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM Wheels ORDER BY wheel_type ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json( { error: error.message } )
  }
}

export default {
  getWheels
}
