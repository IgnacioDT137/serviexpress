import { Pedido } from "../models/Pedido.js";
import { Producto } from "../models/Producto.js"

export const renderProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    return res.render("productos", {data: productos, title: "Productos del taller"})
  } catch (error) {
    return res.json(error)
  }
}

export const pedirProducto = async (req, res) => {
  try {
    const fecha = new Date()
    const fechaFinal = fecha.toISOString().substring(0, 10)
    const newPedido = {
      cantidad: req.body.cantidad,
      fecha_pedido: fechaFinal,
      FK_producto: req.params.id_producto
    }
    await Pedido.create(newPedido)
    return res.redirect("/productos")
  } catch (error) {
    return res.json(error)
  }
}