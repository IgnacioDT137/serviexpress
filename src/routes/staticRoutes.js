import { Router } from "express";
import {renderIndex, renderNosotros, renderContacto} from "../controllers/StaticController.js"

export const staticRouter = Router()

// Rutas de renderizado que no requieren de envio de datos, paginas estaticas

staticRouter.get("/", renderIndex)

staticRouter.get("/nosotros", renderNosotros)

staticRouter.get("/contacto", renderContacto)




