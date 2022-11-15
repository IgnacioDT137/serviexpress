import { Proveedor } from "../models/Proveedor.js";


// ESTO SOLO CONTENDRA FUNCIONES DEL CRUD
export const renderCrud = async (req, res) => {
  try {
    const proveedores = await Proveedor.findAll()
    return res.render("crudProveedores", {data: proveedores, title: "Crud Proveedores"})
  } catch (error) {
    return res.json(error)
  }
}

export const crearProveedor = async (req, res) => {
  try {
    await Proveedor.create(req.body);
    return res.redirect("/admin/crudProveedores")
  } catch (error) {
    return res.json(error)
  }
}

export const borrarProveedor = async (req, res) => {
  try {
    const id_proveedor = req.params.id_proveedor
    await Servicio.destroy({where: {id_proveedor: id_proveedor}})
    return res.redirect("/admin/crudProveedores")
  } catch (error) {
    return res.json(error) 
  }
}

export const renderEditProveedor = async (req, res) => {
  try {
    if (req.session.logueado && req.session.TipoUsuario == 3) {
      const id_proveedor = req.params.id_proveedor;
      const proveedorEdit = await Proveedor.findOne({
        where: {
          id_proveedor: id_proveedor,
        },
      });
      return res.render("editarProveedor", {
        data: proveedorEdit,
        title: "Editar Proveedor",
      });
    } else {
      return res.redirect("/admin/crudProveedores");
    }
  } catch (error) {
    return res.json(error);
  }
};

export const actualizarProveedor = async (req, res) => {
    try {
        const id_proveedor = req.params.id_proveedor
        const nuevosDatos = req.body
        await Proveedor.update(nuevosDatos, {where: {id_proveedor: id_proveedor}})
        return res.redirect("/admin/crudProveedores")
    } catch (error) {
        return res.json(error)
    }
  }