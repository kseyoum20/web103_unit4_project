import { pool } from '../config/database.js'

const getCars = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM Cars ORDER BY car_id DESC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const getCarById = async (req, res) => {
  const carId = req.params.car_id
  try {
    const results = await pool.query('SELECT * FROM Cars WHERE car_id=$1', [carId])
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const createCar = async (req, res) => {
  const { model_name, base_price, description, image_path } = req.body
  try {
    const results = await pool.query(`
      INSERT INTO Cars (model_name, base_price, description, image_path)
      VALUES($1, $2, $3, $4)
      RETURNING *`,
      [model_name, base_price, description, image_path]
    )
    res.status(201).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const updateCar = async (req, res) => {
  const carId = req.params.car_id
  const { model_name, base_price, description, image_path } = req.body
  try {
    const results = await pool.query(`
      UPDATE Cars SET model_name = $1, base_price = $2, description = $3, image_path = $4 WHERE car_id = $5`,
      [model_name, base_price, description, image_path, carId]
    )
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const deleteCar = async (req, res) => {
  const carId = req.params.car_id
  try {
    const results = await pool.query('DELETE FROM Cars WHERE car_id = $1', [carId])
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export default {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar
}
