import { pool } from '../config/database.js'

const getInteriors = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM Interiors ORDER BY material ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json( { error: error.message } )
  }
}

const getInteriorsById = async (req, res) => {
    const interiorId = req.params.interior_id;
    try {
      const results = await pool.query('SELECT * FROM Interiors WHERE interior_id=$1', [interiorId]);
      res.status(200).json(results.rows[0]);
    } catch (error) {
      res.status(409).json({ error: error.message });
    }
  }

export default {
  getInteriors,
  getInteriorsById
}
