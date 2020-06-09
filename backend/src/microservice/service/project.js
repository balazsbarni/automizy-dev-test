import path from 'path'
import grpc from 'grpc'
const protoLoader = require("@grpc/proto-loader")
import config from '../../config/service'
import db from '../../microservice/database/connect'
import ProjectModel from '../../microservice/database/model/project'

const PROTO_PATH = path.join(__dirname, '../../proto/project.proto')
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})

const projectProto = grpc.loadPackageDefinition(packageDefinition).project
const server = new grpc.Server()
const projectModel = ProjectModel(db)

const List = async (call, callback) => {
    try {
        const result = await projectModel.findAll()
        callback(null, { projects: result })
    } catch(err) {
        callback({
            code: grpc.status.ABORTED,
            details: 'Aborted'
        })
    }
}

const Create = async (call, callback) => {
    const project = call.request
    try {
        const result = await projectModel.create(project)
        callback(null, result)
    } catch(err) {
        switch(err.name) {
            case 'SequelizeUniqueConstraintError':
                const jsErr = new Error('ALREADY_EXISTS')
                jsErr.code = grpc.status.ALREADY_EXISTS
                jsErr.metadata = dbErrorCollector({ errors: err.errors })
                callback(jsErr)
                break
            default:
                callback({
                    code: grpc.status.ABORTED,
                    details: 'ABORTED'
                })
        }
    }
}

const Read = async (call, callback) => {
    const id = call.request.id
    try {
        const result = await projectModel.findByPk(id)
        if(result) {
            callback(null, result)
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: 'Not found'
            })
        }
    } catch(err) {
        callback({
            code: grpc.status.ABORTED,
            details: 'Aborted'
        })
    }
}

const Update = async (call, callback) => {
    const project = call.request
    try {
        const affectedRows = await projectModel.update(
            {
                'name': project.name, 
                'desc': project.desc
            },
            {
                where: { id: project.id }
            }
        )
        if(affectedRows[0]) {
            callback(null, affectedRows)
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: 'Not found'
            })
        }
    } catch(err) {
        callback({
            code: grpc.status.ABORTED,
            details: 'Aborted'
        })
    }
}


const Delete = async (call, callback) => {
    const id = call.request.id
    try {
        const result = await projectModel.destroy({ where: { 'id': id } })
        if(result) {
            callback(null, result)
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: 'Not found'
            })
        }
    } catch(err) {
        callback({
            code: grpc.status.ABORTED,
            details: 'Aborted'
        })
    }
}


const dbErrorCollector=({errors}) => {
    const metadata = new grpc.Metadata()
    const error = errors.map(item => {
        metadata.set(item.path, item.type)
    })
    return metadata
}

const exposedFunctions = {
    List,
    Create,
    Read,
    Update,
    Delete
}

server.addService(projectProto.ProjectService.service, exposedFunctions)
server.bind(config.project.host +':'+ config.project.port, grpc.ServerCredentials.createInsecure())

db.sequelize.sync().then(() => {
    console.log('Re-sync db.')
    server.start()
    console.log(`Server running at ${config.project.host} : ${config.project.port}`)
}).catch(err => {
    console.log(`Can not start server at ${config.project.host} : ${config.project.port}`)
    console.log(err)
})
