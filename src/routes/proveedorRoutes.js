import { Router } from "express";
import { renderCrud, borrarProveedor, crearProveedor, renderEditProveedor, actualizarProveedor } from "../controllers/ProveedorController.js";

export const proveedorRouter = Router();

proveedorRouter.get("/admin/crudProveedores", renderCrud);

proveedorRouter.get("/admin/crudProveedores/borrar/:id_proveedor", borrarProveedor)

proveedorRouter.post("/crearProveedor", crearProveedor)

proveedorRouter.get("/admin/crudProveedores/editar/:id_proveedor", renderEditProveedor)

proveedorRouter.post("/admin/crudProveedores/editar/:id_proveedor", actualizarProveedor)