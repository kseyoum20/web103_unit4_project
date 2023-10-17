import express from 'express'
import CarsController from '../controllers/cars.js'

const router = express.Router()

router.get('/', CarsController.getCars)
router.get('/:car_id', CarsController.getCarById)
router.post('/', CarsController.createCar)
router.patch('/:car_id', CarsController.updateCar)
router.delete('/:car_id', CarsController.deleteCar)

export default router
