import { Servicio } from "../models/Servicio.js";
import { SolicitudServicio } from "../models/SolicitudServicio.js";

export const renderFormulario = (req, res) => {
  try {
    res.send("Formulario de servicio");
  } catch (error) {
    res.json(error);
  }
}

export const renderServicios = async (req, res) => {
  try {
        const servicios = await Servicio.findAll()
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
      UsuarioIdUsuario: req.session.id_usuario,
      ServicioIdServicio: req.params.id_servicio,
    }
    await SolicitudServicio.create(newSolicitud);
    return res.render("solicitarServicio", {solicitado: true, title: "Reserva de hora", data: {}})
  } catch (error) {
    return res.json(error)
  }
}

// Funciones de CRUD

export const renderCrudServicio = async (req, res) => {
  try {
      if (req.session.logueado && req.session.TipoUsuario == 3) {
          const servicios = await Servicio.findAll()
          return res.render("crudServicios", {data: servicios, title: "Crud Servicios"})
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
      res.json(error)
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


