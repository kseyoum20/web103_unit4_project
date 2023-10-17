import { pool } from '../config/database.js'

const getCars = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM Cars ORDER BY car_id ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json( { error: error.message } )
  }
}
const getCarsById = async (req, res) => {
    const carId = req.params.car_id;
    try {
      const results = await pool.query('SELECT * FROM Cars WHERE car_id=$1', [carId]);
      res.status(200).json(results.rows[0]);
    } catch (error) {
      res.status(409).json({ error: error.message });
    }
  }

export default {
  getCars,
  getCarsById
}
