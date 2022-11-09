import { DataTypes } from "sequelize";
import { conexion } from "../database/conexion.js";

export const SolicitudServicio = conexion.define("SolicitudServicio", {
    id_sol_servicio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    detalle_servicio: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    hora_reservada: {
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    timestamps: false,
    tableName: "tbl_solicitud_servicio"
})