import { DataTypes } from "sequelize";
import { conexion } from "../database/conexion.js";
import { Usuario } from "./Usuario.js";

export const TipoUsuario = conexion.define("TipoUsuario",{
    id_tipo_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo_usuario: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false,
    tableName: "tbl_tipo_usuario"
})

TipoUsuario.hasMany(Usuario, {
    foreignKey: {
        name: "FK_tipo_usuario"
    }
})

