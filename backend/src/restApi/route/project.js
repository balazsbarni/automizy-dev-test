import express from 'express'
import project from '../controller/project'
const router = express.Router()


router.get('/', project.list)
router.post('/', project.validationRules('create'), project.validate, project.create)
router.get('/:id', project.read)
router.put('/:id', project.update)
router.delete('/:id', project.delete)

export default router