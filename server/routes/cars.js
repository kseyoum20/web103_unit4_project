import express from 'express'
import CarsController from '../controllers/cars.js'

const router = express.Router()

router.get('/', CarsController.getCars)
router.get('/:car_id', CarsController.getCarsById)

export default router
