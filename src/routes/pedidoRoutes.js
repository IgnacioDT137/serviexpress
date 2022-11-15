import { Router } from "express";
import { renderPedidos, recibirPedido } from "../controllers/PedidoController.js";

export const pedidoRouter = Router();

pedidoRouter.get("/pedidos", renderPedidos);
pedidoRouter.get("/recibirPedido/:id_pedido", recibirPedido);