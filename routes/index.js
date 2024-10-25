//Requerimos express
const express = require('express')
//Importamos los modelos
const Albumes = require('../models/album.js')
const Usuarios = require('../models/user.js')

//UNA INSTANCIA PARA MANEJAR RUTAS: gestiona rutas a medida que nuestro codigo vaya escalando
const router = express.Router()

//Importamos las rutas
const albums = require('./band.js')
const users = require('./user.js')

//router.use 
router.use('/band', albums)
router.use('/user', users)


//Exportamos la variable router, para lugo importarla en el archivo donde levantamos el servidor
module.exports = router