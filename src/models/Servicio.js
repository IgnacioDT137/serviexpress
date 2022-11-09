import { DataTypes } from "sequelize";
import { conexion } from "../database/conexion.js";
import { SolicitudServicio } from "./SolicitudServicio.js"

export const Servicio = conexion.define("Servicio", {
    id_servicio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_servicio: {
        type: DataTypes.STRING(20),
        unique: true, 
        allowNull: false
    },
    descripcion_servicio: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    valor_servicio: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    
},{
    timestamps: false,
    tableName: "tbl_servicio"
})
Servicio.hasMany(SolicitudServicio)