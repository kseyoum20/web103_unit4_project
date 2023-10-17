import express from 'express'
import InteriorsController from '../controllers/interiors.js'

const router = express.Router()

router.get('/', InteriorsController.getInteriors)
router.get('/:interior_id', InteriorsController.getInteriorsById)

export default router
