import { pool } from '../config/database.js'

const getColors = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM Colors ORDER BY color_name ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json( { error: error.message } )
  }
}
const getColorsById = async (req, res) => {
  const colorId = req.params.color_id;
  try {
    const results = await pool.query('SELECT * FROM Colors WHERE color_id=$1', [colorId]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
}
export default {
  getColors,
  getColorsById
}
