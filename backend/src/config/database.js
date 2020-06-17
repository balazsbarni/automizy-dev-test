module.exports={
    database: {
        HOST: process.env.DB_HOST || "127.0.0.1",
        USER: process.env.MYSQL_USER || "root",
        PASSWORD: process.env.MYSQL_ROOT_PASSWORD || "root",
        DB: process.env.MYSQL_DATABASE || "app",
        PORT: process.env.DB_PORT || 3308,
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        logging: true
    }
}