import { pool } from '../config/database.js'

const getRoofs = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM Roofs ORDER BY type ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json( { error: error.message } )
  }
}

const getRoofsById = async (req, res) => {
  const roofId = req.params.roof_id;
  try {
    const results = await pool.query('SELECT * FROM Roofs WHERE roof_id=$1', [roofId]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
}

export default {
  getRoofs,
  getRoofsById
}
