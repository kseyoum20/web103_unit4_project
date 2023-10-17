import { pool } from './database.js'
import './dotenv.js'

const createCarsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS CustomizedCars;
    DROP TABLE IF EXISTS Cars;
    DROP TABLE IF EXISTS Colors;
    DROP TABLE IF EXISTS Roofs;
    DROP TABLE IF EXISTS Wheels;
    DROP TABLE IF EXISTS Interiors;

    CREATE TABLE IF NOT EXISTS Cars (
        car_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        base_price INT NOT NULL
    )
  `

  try {
    const res = await pool.query(createTableQuery)
    console.log('🎉 Cars table created successfully')
  } catch (err) {
    console.error('⚠️ error creating Cars table', err)
  }
}

const createColorsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS Colors;

    CREATE TABLE IF NOT EXISTS Colors (
        color_id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        price INT NOT NULL
    )
  `

  try {
    const res = await pool.query(createTableQuery)
    console.log('🎉 Colors table created successfully')
  } catch (err) {
    console.error('⚠️ error creating Colors table', err)
  }
}

const createRoofsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS Roofs;

    CREATE TABLE IF NOT EXISTS Roofs (
        roof_id SERIAL PRIMARY KEY,
        type VARCHAR(30) NOT NULL,
        price INT NOT NULL
    )
  `

  try {
    const res = await pool.query(createTableQuery)
    console.log('🎉 Roofs table created successfully')
  } catch (err) {
    console.error('⚠️ error creating Roofs table', err)
  }
}

const createWheelsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS Wheels;

    CREATE TABLE IF NOT EXISTS Wheels (
        wheel_id SERIAL PRIMARY KEY,
        style VARCHAR(30) NOT NULL,
        price INT NOT NULL
    )
  `

  try {
    const res = await pool.query(createTableQuery)
    console.log('🎉 Wheels table created successfully')
  } catch (err) {
    console.error('⚠️ error creating Wheels table', err)
  }
}

const createInteriorsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS Interiors;

    CREATE TABLE IF NOT EXISTS Interiors (
        interior_id SERIAL PRIMARY KEY,
        design VARCHAR(30) NOT NULL,
        price INT NOT NULL
    )
  `

  try {
    const res = await pool.query(createTableQuery)
    console.log('🎉 Interiors table created successfully')
  } catch (err) {
    console.error('⚠️ error creating Interiors table', err)
  }
}

const createCustomizedCarsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS CustomizedCars;

    CREATE TABLE IF NOT EXISTS CustomizedCars (
        custom_car_id SERIAL PRIMARY KEY,
        car_id INT REFERENCES Cars(car_id),
        color_id INT REFERENCES Colors(color_id),
        roof_id INT REFERENCES Roofs(roof_id),
        wheel_id INT REFERENCES Wheels(wheel_id),
        interior_id INT REFERENCES Interiors(interior_id),
        total_price INT NOT NULL
    )
  `

  try {
    const res = await pool.query(createTableQuery)
    console.log('🎉 CustomizedCars table created successfully')
  } catch (err) {
    console.error('⚠️ error creating CustomizedCars table', err)
  }
}

// Uncomment the lines below to run the functions

// await createCarsTable()
// await createColorsTable()
// await createRoofsTable()
// await createWheelsTable()
// await createInteriorsTable()
// await
