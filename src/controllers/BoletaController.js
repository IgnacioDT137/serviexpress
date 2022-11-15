import {Boleta} from "../models/Boleta.js";
import {SolicitudServicio} from "../models/SolicitudServicio.js"
import { Servicio } from "../models/Servicio.js";

export const generarBoleta = async (req, res) => {
    try {
        const id_sol_servicio = req.params.id_sol_servicio
        const solicitud_servicio = await SolicitudServicio.findOne({where: {id_sol_servicio : id_sol_servicio}})
        const servicio = await Servicio.findOne({where: {id_servicio: solicitud_servicio.FK_servicio}})
        const fecha_1 = new Date();
        const fecha_final = fecha_1.toISOString().substring(0, 10)
        const newBoleta = {
            fecha: fecha_final,
            valor: servicio.valor_servicio,
            FK_sol_servicio: solicitud_servicio.id_sol_servicio
        }
        await Boleta.create(newBoleta);
        return res.render("error", {boletaGenerada: true, title: "Boleta generada!"})
      } catch (error) {
        console.log(error)
      }
}

export const renderBoletas = async (req, res) => {
  try {
    const boletas = await Boleta.findAll()
    return res.render("verBoletas", {data: boletas, title: "Registro de boletas"})
  } catch (error) {
    
  }
}

