import express from 'express'
import student from './student'
import project from './project'
const router = express()

// Documentation
// https://expressjs.com/en/api.html#router

// Hallgatókat kezelő útvonalak
router.use('/student', student)

router.use('/project', project)

export default router