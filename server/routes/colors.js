import express from 'express'
import ColorsController from '../controllers/colors.js'

const router = express.Router()

router.get('/', ColorsController.getColors)
router.get('/:color_id', ColorsController.getColorsById)

export default router
