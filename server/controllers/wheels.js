import { pool } from '../config/database.js'

const getWheels = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM Wheels ORDER BY wheel_type ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json( { error: error.message } )
  }
}
const getWheelsById = async (req, res) => {
    const wheelId = req.params.wheel_id;
    try {
      const results = await pool.query('SELECT * FROM Wheels WHERE wheel_id=$1', [wheelId]);
      res.status(200).json(results.rows[0]);
    } catch (error) {
      res.status(409).json({ error: error.message });
    }
  }
export default {
  getWheels,
  getWheelsById
}
