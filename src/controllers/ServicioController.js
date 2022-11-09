import { Servicio } from "../models/Servicio.js";

export const renderFormulario = (req, res) => {
  try {
    res.send("Formulario de servicio");
  } catch (error) {
    res.json(error);
  }
}

export const solicitudServicio = (req, res) => {
  try {
    // TODO: la wea
  } catch (error) {
    // TODO: manejar el error
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

// Funciones de CRUD

export const renderCrudServicio = async (req, res) => {
  try {
      if (req.session.logueado && req.session.username == 'admin') {
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
      if (req.session.logueado && req.session.username == 'admin') {
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


