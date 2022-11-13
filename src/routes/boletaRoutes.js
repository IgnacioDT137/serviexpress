import { Router } from "express";
import { renderSolicitudes } from "../controllers/ServicioController.js";
import { generarBoleta, renderBoletas } from "../controllers/BoletaController.js"

export const boletaRouter = Router();

boletaRouter.get("/solicitudes", renderSolicitudes);

boletaRouter.get("/generarBoleta/:id_sol_servicio", generarBoleta);

boletaRouter.get("/boletas", renderBoletas)