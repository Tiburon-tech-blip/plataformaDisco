//Requerimos express
const express = require('express')

//UNA INSTANCIA PARA MANEJAR RUTAS: gestiona rutas a medida que nuestro codigo vaya escalando
const router = express.Router()


//Rutas
//A quien haya iniciado la comunicacion debemos enviarle una respuesta, "/" es la ruta de acceso, es decir el lugar donde queremos abrir la puerta
router.get("/", (req, res)=>{
    res.status(200).send("Hell World")
})

//Otras rutas
router.get("/users", (req, res)=>{
    res.status(200).send("Hasta luego")
})

router.get("/products", (req, res)=>{
    res.status(200).send("Hola")
})

//Exportamos la variable router, para lugo importarla en el archivo donde levantamos el servidor
module.exports = router