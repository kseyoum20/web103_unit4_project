import express from 'express'
import CustomCarsController from '../controllers/customizedCars.js'

const router = express.Router()

router.get('/', CustomCarsController.getAllCustomizedCars)
router.get('/:custom_car_id', CustomCarsController.getCustomizedCarById)   // Changed parameter name
router.post('/', CustomCarsController.createCustomizedCar)
router.patch('/:custom_car_id', CustomCarsController.updateCustomizedCar)  // Changed parameter name
router.delete('/:custom_car_id', CustomCarsController.deleteCustomizedCar) // Changed parameter name

export default router
