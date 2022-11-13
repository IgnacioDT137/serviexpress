import { DataTypes } from "sequelize";
import { conexion } from "../database/conexion.js";
import { Servicio } from "./Servicio.js";

export const Producto = conexion.define("Producto", {
  id_producto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  valor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  timestamps: false,
  tableName: "tbl_productos"
});

Producto.hasOne(Servicio, {
  foreignKey: {
    name: "FK_producto"
  }
})