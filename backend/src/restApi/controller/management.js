import { body, validationResult } from 'express-validator'
import path from 'path'
import grpc from 'grpc'
import config from '../../config/service'
const protoLoader = require("@grpc/proto-loader")

const PROTO_PATH = path.join(__dirname, '../../proto/management.proto')

exports.validationRules = (method) => {
    switch (method) {
        case 'create': {
            return [
                body('student_id').not().isEmpty().isNumeric(),
                body('project_id').not().isEmpty().isNumeric(),
            ]
        }
    }
}

exports.validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  
    return res.status(400).json({
        errors: extractedErrors
    })
}

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})

const managementProto = grpc.loadPackageDefinition(packageDefinition).management
const client = new managementProto.ManagementService(config.management.host +':'+ config.management.port, grpc.credentials.createInsecure())

const managementList = (options) => {
    return new Promise((resolve, reject) => {
      client.List(options, (error, response) => {
            if (error) { reject(error) }
            resolve(response)
        })
    })
}

exports.list = async (req, res, next) => {
    try {
        const result = await managementList()
        res.status(200).json({management: result})
    } catch(e) {
        res.json(e)
    }
}

const managementCreate = (options) => {
    return new Promise((resolve, reject) => {
      client.Create(options, (error, response) => {
            if (error) { reject(error) }
            resolve(response)
        })
    })
}

exports.create = async (req, res, next) => {
    try {
        const result = await managementCreate({
            'student_id': req.body.student_id,
            'project_id': req.body.project_id
        })
        res.status(201).json(result)
    } catch(e){
        res.status(500).json(e)
    }
}
