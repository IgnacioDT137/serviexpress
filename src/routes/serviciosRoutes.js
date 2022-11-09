import { Router } from "express";
import { renderCrudServicio, crearServicio, renderEditServicio, actualizarServicio, borrarServicio, renderServicios } from "../controllers/ServicioController.js";

export const serviciosRouter = Router()

serviciosRouter.get("/admin/crudServicios", renderCrudServicio);

serviciosRouter.get("/admin/crudServicios/editar/:id_servicio", renderEditServicio)

serviciosRouter.post("/admin/crudServicios/editar/:id_servicio", actualizarServicio)

serviciosRouter.post("/crearServicio", crearServicio);

serviciosRouter.get("/admin/crudServicios/borrar/:id_servicio", borrarServicio)

serviciosRouter.get("/servicio", renderServicios)