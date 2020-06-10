import path from 'path'
import grpc from 'grpc'
const protoLoader = require("@grpc/proto-loader")
import config from '../../config/service'
import db from '../../microservice/database/connect'
import ManagementModel from '../../microservice/database/model/management'
import StudentModel from '../../microservice/database/model/student'
import ProjectModel from '../../microservice/database/model/project'

const PROTO_PATH = path.join(__dirname, '../../proto/management.proto')
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})

const managementProto = grpc.loadPackageDefinition(packageDefinition).management
const server = new grpc.Server()
const managementModel = ManagementModel(db)
const projectModel = ProjectModel(db)
const studentModel = StudentModel(db)

managementModel.hasOne(studentModel, { constraints: false, foreignKey: 'id', sourceKey: 'student_id'})
managementModel.hasOne(projectModel, { constraints: false, foreignKey: 'id', sourceKey: 'project_id'})

const List = async (call, callback) => {
    try {
        const result = await managementModel.findAll()
        callback(null, { managements: result })
    } catch(err) {
        callback({
            code: grpc.status.ABORTED,
            details: 'Aborted'
        })
    }
}

const Create = async (call, callback) => {
    const management = call.request
    try {
        const result = await managementModel.create(management)
        callback(null, result)
    } catch(err) {
        callback({
            code: grpc.status.ABORTED,
            details: 'ABORTED'
        })
    }
}

const Read = async (call, callback) => {
    const id = call.request.id
    try {
        const result = await managementModel.findByPk(id)
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

const Delete = async (call, callback) => {
    const id = call.request.id
    try {
        const result = await managementModel.destroy({ where: { 'id': id } })
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

const ListByProject = async (call, callback) => {
    const id = call.request.id
    try {
        const result = await managementModel.findAll({
            include: [{
              model: studentModel,
            }],
            where: { project_id: id }
          })
        const students = result.map(e => e.student)
        if(result) {
            callback(null, { students })
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

const ListByStudent = async (call, callback) => {
    const id = call.request.id
    try {
        const result = await managementModel.findAll({
            include: [{
              model: projectModel,
            }],
            where: { student_id: id }
          })
        const projects = result.map(e => e.project)
        if(result) {
            callback(null, { projects })
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
    Delete,
    ListByProject,
    ListByStudent
}

server.addService(managementProto.ManagementService.service, exposedFunctions)
server.bind(config.management.host +':'+ config.management.port, grpc.ServerCredentials.createInsecure())

db.sequelize.sync().then(() => {
    console.log('Re-sync db.')
    server.start()
    console.log(`Server running at ${config.management.host} : ${config.management.port}`)
}).catch(err => {
    console.log(`Can not start server at ${config.management.host} : ${config.management.port}`)
    console.log(err)
})
