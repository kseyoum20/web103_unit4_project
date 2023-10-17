import { pool } from '../config/database.js';

const getAllCustomizedCars = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM CustomizedCars ORDER BY custom_car_id DESC');
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
}

const getCustomizedCarById = async (req, res) => {
  const customCarId = req.params.custom_car_id;
  try {
    const results = await pool.query('SELECT * FROM CustomizedCars WHERE custom_car_id=$1', [customCarId]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
}

const createCustomizedCar = async (req, res) => {
  const { car_id, color_id, roof_id, wheel_id, interior_id, total_price, name } = req.body;
  try {
    const results = await pool.query(`
      INSERT INTO CustomizedCars (car_id, color_id, roof_id, wheel_id, interior_id, total_price, name)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [car_id, color_id, roof_id, wheel_id, interior_id, total_price, name]
    );
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
}

const updateCustomizedCar = async (req, res) => {
  const customCarId = req.params.custom_car_id;
  const { car_id, color_id, roof_id, wheel_id, interior_id, total_price, name } = req.body;
  try {
    const results = await pool.query(`
      UPDATE CustomizedCars 
      SET car_id = $1, color_id = $2, roof_id = $3, wheel_id = $4, interior_id = $5, total_price = $6, name = $7 
      WHERE custom_car_id = $8`,
      [car_id, color_id, roof_id, wheel_id, interior_id, total_price, customCarId, name]
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
}

const deleteCustomizedCar = async (req, res) => {
  const customCarId = req.params.custom_car_id;
  try {
    const results = await pool.query('DELETE FROM CustomizedCars WHERE custom_car_id = $1', [customCarId]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
}

export default {
  getAllCustomizedCars,
  getCustomizedCarById,
  createCustomizedCar,
  updateCustomizedCar,
  deleteCustomizedCar
};
