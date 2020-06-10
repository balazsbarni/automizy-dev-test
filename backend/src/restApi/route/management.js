import express from 'express'
import management from '../controller/management'
const router = express.Router()


router.get('/', management.list)
router.post('/', management.validationRules('create'), management.validate, management.create)

export default router