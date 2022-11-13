import { DataTypes } from "sequelize";
import { conexion } from "../database/conexion.js";
import {Boleta} from "./Boleta.js"

export const SolicitudServicio = conexion.define("SolicitudServicio", {
    id_sol_servicio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    detalle_servicio: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    hora_reservada: {
        type: DataTypes.DATE,
        allowNull: false
    },
},{
    timestamps: false,
    tableName: "tbl_solicitud_servicio"
})


SolicitudServicio.hasOne(Boleta, {
    foreignKey: {
        name: "FK_sol_servicio"
    }
})
