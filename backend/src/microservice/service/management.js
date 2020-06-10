import path from 'path'
import grpc from 'grpc'
const protoLoader = require("@grpc/proto-loader")
import config from '../../config/service'
import db from '../../microservice/database/connect'
import ManagementModel from '../../microservice/database/model/management'

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
    // Read,
    // Update,
    // Delete
}

server.addService(projectProto.ManagementService.service, exposedFunctions)
server.bind(config.management.host +':'+ config.management.port, grpc.ServerCredentials.createInsecure())

db.sequelize.sync().then(() => {
    console.log('Re-sync db.')
    server.start()
    console.log(`Server running at ${config.management.host} : ${config.management.port}`)
}).catch(err => {
    console.log(`Can not start server at ${config.management.host} : ${config.management.port}`)
    console.log(err)
})
