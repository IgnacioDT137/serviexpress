import { Router } from "express";
import { login, registro, renderLogin, renderRegistro, logOut, renderCrud, crearUsuario, borrarUsuario, renderEdit, actualizarUsuario, renderMiCuenta } from "../controllers/UsuarioController.js";

export const usuarioRouter = Router();

//funciones generales de usuario

usuarioRouter.get("/miCuenta", renderMiCuenta)

// Rutas de renderizado de formularios
usuarioRouter.get("/login", renderLogin)

usuarioRouter.get("/registro", renderRegistro)


// rutas de funciones reales
usuarioRouter.get("/cerrarSesion", logOut)

usuarioRouter.post("/registro", registro);

usuarioRouter.post("/login", login);

// funciones de crud
usuarioRouter.get("/admin/crudUsuarios", renderCrud);

usuarioRouter.get("/admin/crudUsuarios/editar/:id_usuario", renderEdit)

// rutas de funciones reales del crud
usuarioRouter.get("/borrarUsuario/:id_usuario", borrarUsuario);

usuarioRouter.post("/crearUsuario", crearUsuario);

usuarioRouter.post("/admin/crudUsuarios/editar/:id_usuario", actualizarUsuario)