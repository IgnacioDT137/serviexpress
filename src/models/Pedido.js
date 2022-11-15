import { DataTypes } from "sequelize";
import { conexion } from "../database/conexion.js";

export const Pedido = conexion.define("Pedido", {
  id_pedido: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_pedido: {
    type: DataTypes.DATE,
    allowNul: false
  },
  fecha_llegada: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  timestamps: false,
  tableName: "tbl_pedidos"
});


  