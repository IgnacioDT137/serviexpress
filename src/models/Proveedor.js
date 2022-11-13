import { DataTypes } from "sequelize";
import { conexion } from "../database/conexion.js";
import { Producto } from "./Producto.js";

export const Proveedor = conexion.define("Proveedor", {
  id_proveedor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  telefono: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false,
  tableName: "tbl_proveedores"
})

Proveedor.hasMany(Producto, {
  foreignKey: {
    name: "FK_proveedor"
  }
})