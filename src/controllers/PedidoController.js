import { Pedido } from "../models/Pedido.js"
import { Producto } from "../models/Producto.js"

export const renderPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();
    return res.render("controlPedidos", {data: pedidos, title: "Pedidos realizados"});
  } catch (error) {
    return res.json(error)
  }
}

export const recibirPedido = async (req, res) => {
  try {
    const fechaFinal = new Date().toISOString().substring(0, 10);
    const pedido = await Pedido.findOne({where: {id_pedido: req.params.id_pedido}});
    await pedido.update({fecha_llegada: fechaFinal});
    
    const producto = await Producto.findOne({where: {id_producto: pedido.FK_producto}});
    await producto.update({stock: producto.stock + pedido.cantidad})

    return res.redirect("/pedidos")
  } catch (error) {
    return res.json(error)
  }
}