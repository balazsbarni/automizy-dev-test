import express from 'express'
import student from './student'
import project from './project'
import management from './management'
const router = express()

// Documentation
// https://expressjs.com/en/api.html#router

// Hallgatókat kezelő útvonalak
router.use('/student', student)

router.use('/project', project)

router.use('/management', management)

export default router