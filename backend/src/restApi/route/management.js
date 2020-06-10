import express from 'express'
import management from '../controller/management'
const router = express.Router()


router.get('/', management.list)
router.post('/', management.validationRules('create'), management.validate, management.create)
router.delete('/:id', management.delete)
router.get('/:id', management.read)
router.get('/student/:id', management.listByStudent)
router.get('/project/:id', management.listByProject)

export default router