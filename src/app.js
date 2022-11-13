// importacion de los modulos necesarios para el funcionamiento de la app
import express from "express";
import { staticRouter } from "./routes/staticRoutes.js";
import {join, dirname} from "path";
import {fileURLToPath} from "url";
import { usuarioRouter } from "./routes/usuarioRoutes.js";
import { conexion } from "./database/conexion.js";
import session from "express-session"
import { serviciosRouter } from "./routes/serviciosRoutes.js";
import { boletaRouter } from "./routes/boletaRoutes.js";

// importacion de los modelos
import {TipoUsuario} from "./models/TipoUsuario.js";
import {Usuario} from "./models/Usuario.js";
import { Servicio } from "./models/Servicio.js";
import { SolicitudServicio } from "./models/SolicitudServicio.js";
import { Boleta } from "./models/Boleta.js"

// creacion de la app
const app = express();

// esta variable nos ayuda a obtener el directorio en el que se encuantra el archivo principal
const __dirname = dirname(fileURLToPath(import.meta.url))

// en esta perte se configuran algunas cosas de la app, como el motor de plantillas, en este caso, ejs
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"))
app.set("json spaces", 4)

// aca se crea la session de la app, se puede acceder a ella y usar sus variables en caso de ser necesario
app.use(session({
    secret: "fenix",
    resave: true,
    saveUninitialized: true
}))

// en esta parte se declaran variables locales que la app va a usar, en este caso tipo de usuario para poder validar el acceso a las rutas
app.use((req, res, next) => {
    res.locals.TipoUsuario = req.session.TipoUsuario
    res.locals.rut = req.session.rut
    next()
})

// esta linea sirve para que la app pueda utilizar datos de los formularios
app.use(express.urlencoded({extended: true}));

// en esta parte se le dice a la app que utilice las rutas declaradas en otros archivos y que ya fueron importadas 
app.use(staticRouter)
app.use(usuarioRouter)
app.use(serviciosRouter)
app.use(boletaRouter)

// declaracion de la carpeta para archivos estaticos (css, js e imagenes)
app.use(express.static(__dirname + "/public"))

const main = async () => {
    try {
        await conexion.authenticate(); // se prueba la conexion a la base de datos
        console.log("Conectado a la base de datos"); 
        await conexion.sync({force: false}) //para reiniciar base de datos poner true
        console.log("Tablas creadas");
        app.listen(3000) // se inicia la app en el puerto 3000
        console.log("app en http://localhost:3000");
    } catch (error) {
        console.log(error);
    }
}

main()

