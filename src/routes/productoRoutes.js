import { Router } from "express";
import { renderProductos, pedirProducto } from "../controllers/ProductoController.js";

export const productoRouter = Router();

productoRouter.get("/productos", renderProductos);
productoRouter.post("/pedirProducto/:id_producto" ,pedirProducto);