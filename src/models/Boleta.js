import { DataTypes } from "sequelize";
import { conexion } from "../database/conexion.js";

export const Boleta = conexion.define("Boleta", {
    id_boleta : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    valor: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
  timestamps: false,
  tableName: "tbl_boletas"
})

