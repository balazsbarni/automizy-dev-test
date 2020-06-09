import { body, validationResult } from 'express-validator'
import path from 'path'
import grpc from 'grpc'
import protoLoader from '@grpc/proto-loader'
import config from '../../config/service'

const PROTO_PATH = path.join(__dirname, '../../proto/project.proto')

exports.validationRules = (method) => {
    switch (method) {
        case 'create': {
            return [
                body('name').not().isEmpty()
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

// Load in our service definition
const projectProto = grpc.loadPackageDefinition(packageDefinition).proto
const client = new projectProto.ProjectService(`${config.project.host}:${config.project.port}`, grpc.credentials.createInsecure())

const projectList = (options) => {
    return new Promise((resolve, reject) => {
      client.List(options, (error, response) => {
            if (error) { reject(error) }
            resolve(response)
        })
    })
}

exports.list = async (req, res, next) => {
    try {
        const result = await projectList()
        res.status(200).json(result)
    } catch(err) {
        res.json(err)
    }
}
