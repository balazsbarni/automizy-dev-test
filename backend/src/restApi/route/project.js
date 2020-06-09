import express from 'express'
import project from '../controller/project'
const router = express.Router()


router.get('/', project.list)

export default router