import { Sequelize } from "sequelize";

export const conexion = new Sequelize({
    dialect: "mysql", 
    host: "us-cdbr-east-06.cleardb.net",
    port: 3306,
    database: "heroku_bdccc5606f2bf19",
    username: "bf02de5bfeacfb",
    password: "a6376203"
})