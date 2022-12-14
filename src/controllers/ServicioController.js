import { conexion } from "../database/conexion.js";
import { Producto } from "../models/Producto.js";
import { Servicio } from "../models/Servicio.js";
import { SolicitudServicio } from "../models/SolicitudServicio.js";
import { QueryTypes } from "sequelize";

export const renderFormulario = (req, res) => {
  try {
    res.send("Formulario de servicio");
  } catch (error) {
    res.json(error);
  }
}

export const renderServicios = async (req, res) => {
  try {
        const servicios = await conexion.query("select * from tbl_servicio ts inner join tbl_productos tp on ts.FK_producto = tp.id_producto", {type: QueryTypes.SELECT});
        return res.render("servicio", {data: servicios, title: "Servicios"})
  } catch (error) {
      return res.json(error)
  }
}

export const renderFormularioServicio = async (req, res) => {
  try {
        const id_servicio = req.params.id_servicio
        const servicio = await Servicio.findOne({where: {id_servicio : id_servicio}})
        return res.render("solicitarServicio", {data: servicio, title: "Reserva de hora"})
  } catch (error) {
      return res.json(error)
  }
}

export const solicitudServicio = async (req, res) => {
  try {
    const newSolicitud = {
      detalle_servicio: req.body.detalle_servicio,
      hora_reservada: req.body.hora_reservada,
      FK_usuario: req.session.id_usuario,
      FK_servicio: req.params.id_servicio,
    }
    await SolicitudServicio.create(newSolicitud);

    const servicio = await Servicio.findOne({where: {id_servicio: req.params.id_servicio}})
    const producto = await Producto.findOne({where: {id_producto: servicio.FK_producto}})
    await producto.update({stock: producto.stock - 1})
    return res.render("solicitarServicio", {solicitado: true, title: "Reserva de hora", data: {}})
  } catch (error) {
    return res.json(error)
  }
}

export const renderSolicitudes = async (req, res) => {
  try {
    const solicitudes = await SolicitudServicio.findAll()
    return res.render("generarBoleta", {data: solicitudes, title: "Solicitudes de servicio"})
  } catch (error) {
    return res.json(error)
  }
}

export const renderhistorialSolicitudes = async (req, res) => {
  try {
    const id_usuario = req.session.id_usuario
    const solicitudes = await SolicitudServicio.findAll({where: {FK_usuario: id_usuario}})
    return res.render("historialSolicitudes", {data: solicitudes, title: "Historial solicitudes"})
  } catch (error) {
    return res.json(error)
  }
}


// Funciones de CRUD

export const renderCrudServicio = async (req, res) => {
  try {
      if (req.session.logueado && req.session.TipoUsuario == 3) {
          const servicios = await Servicio.findAll()
          const productos = await Producto.findAll()
          return res.render("crudServicios", {data: servicios, title: "Crud Servicios", prods: productos})
      } else {
          return res.redirect("/")
      }
  } catch (error) {
      return res.json(error)
  }
}

export const crearServicio = async (req, res) => {
  try {
      const nuevoServicio = req.body
      await Servicio.create(nuevoServicio)
      return res.redirect("/admin/crudServicios")
  } catch (error) {
      return res.render("error", {errorServ: true, title: "Error"})
  }
}

export const borrarServicio = async (req, res) => {
  try {
      const id_servicio = req.params.id_servicio
      await Servicio.destroy({where: {id_servicio: id_servicio}})
      return res.redirect("/admin/crudServicios")
  } catch (error) {
      return res.json(error) 
  }
}

export const renderEditServicio = async (req, res) => {
  try {
      if (req.session.logueado && req.session.TipoUsuario == 3) {
          const id_servicio = req.params.id_servicio
          const servicioEdit = await Servicio.findOne({where: {
              id_servicio: id_servicio
          }})
          return res.render("editarServicio", {data: servicioEdit, title: "Editar Servicio"})
      } else {
          return res.redirect("/admin/crudServicios")
      }
  } catch (error) {
      return res.json(error)
  }
}

export const actualizarServicio = async (req, res) => {
  try {
      const id_servicio = req.params.id_servicio
      const nuevosDatos = req.body
      await Servicio.update(nuevosDatos, {where: {id_servicio: id_servicio}})
      return res.redirect("/admin/crudServicios")
  } catch (error) {
      return res.json(error)
  }
}


