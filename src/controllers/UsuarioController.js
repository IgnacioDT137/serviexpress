import { TipoUsuario } from "../models/TipoUsuario.js";
import { Usuario } from "../models/Usuario.js";


// renderizado de formularios
export const renderLogin = async (req, res) => {
    if (req.session.logueado) {
        return res.redirect("/")
    }
    const titulo = "Login"
    return res.render("login", {title: titulo})
}

export const renderRegistro = async (req, res) => {
    if (req.session.logueado) {
        return res.redirect("/")
    }
    const titulo = "Registro"
    return res.render("registro", {title: titulo})
}


// funciones de usuario general
export const login = async (req, res) => {
    try {
        const formulario = req.body
        const usuario = await Usuario.findOne({where: formulario})
        if (usuario != null) {

            req.session.logueado = true
            req.session.TipoUsuario = usuario.TipoUsuarioIdTipoUsuario
            req.session.username = usuario.username

            return res.render("login", {title: "Login", usuarioFound: true})
        } else {
            return res.render("login", {title: "Login", usuarioNotFound: true})
        }
    } catch (error) {
        return res.json(error)
    }
} 

export const registro = async (req, res) => {
    try {
        const usuario = {
            rut: req.body.rut,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            username: req.body.username,
            pwd: req.body.pwd
        }
        await Usuario.create(usuario)
        return res.render("registro", {title: "Registro", created: true})
    } catch (error) {
        return res.render("registro", {title: "Registro", registroError: true})
    }
} 

export const logOut = async (req, res) => {
    req.session.destroy()
    return res.redirect("/login")
}


// CRUD DE ADMINISTRADOR

// Renderizado de formularios
export const renderCrud = async (req, res) => {
    try {
        if (req.session.logueado && req.session.username == 'admin') {
            const tipos = await TipoUsuario.findAll()
            const usuarios = await Usuario.findAll()
            return res.render("crudUsuarios", {data: usuarios, tipos: tipos, title: "Crud Usuarios"})
        } else {
            return res.redirect("/")
        }
    } catch (error) {
        return res.json(error)
    }
}

export const renderEdit = async (req, res) => {
    try {
        if (req.session.logueado && req.session.username == 'admin') {
            const id_usuario = req.params.id_usuario
            const usuarioEdit = await Usuario.findOne({where: {
                id_usuario: id_usuario
            }})
            const tipos = await TipoUsuario.findAll()
            return res.render("editarUsuario", {data: usuarioEdit, title: "Editar Usuario", tipos: tipos})
        } else {
            return res.redirect("/")
        }
    } catch (error) {
        return res.json(error)
    }
}

// Funciones reales del CRUD
export const actualizarUsuario = async (req, res) => {
    try {
        const id_usuario = req.params.id_usuario
        const nuevosDatos = req.body
        await Usuario.update(nuevosDatos, {where: {id_usuario: id_usuario}})
        return res.redirect("/admin/crudUsuarios")
    } catch (error) {
        return res.json(error)
    }
}

export const crearUsuario = async (req, res) => {
    try {
        const nuevoUsuario = req.body
        await Usuario.create(nuevoUsuario)
        return res.redirect("/admin/crudUsuarios")
    } catch (error) {
        res.json(error)
    }
}

export const borrarUsuario = async (req, res) => {
    try {
        const id_usuario = req.params.id_usuario
        await Usuario.destroy({where: {id_usuario: id_usuario}})
        return res.redirect("/admin/crudUsuarios")
    } catch (error) {
        return res.json(error)
    }
}