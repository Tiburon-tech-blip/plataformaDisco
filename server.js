
//0v71Bjxk67qRVRcE               larraalexis80

//mongodb+srv://larraalexis80:0v71Bjxk67qRVRcE@bonjovi.bf1uq.mongodb.net/?retryWrites=true&w=majority&appName=bonJovi

// LLAMAMOS A EXPRESS (DEPENDENCIA)
const express = require('express')

//Requerimos mongoose
const mongoose = require('mongoose')

//Requerimos la libreria para guardar variables de entorno
const dotenv = require('dotenv').config()

//console.log(process.env.DATABASE_URL)



//Importamos el router desde el lugar donde se encuentra el export
const router = require('./routes/index')

//Importamos los modelos
const Albumes = require('./models/album.js')
const Usuarios = require('./models/user.js')

//Pasmos la url sacada de mongo atlas
//const url = "mongodb+srv://larraalexis80:0v71Bjxk67qRVRcE@bonjovi.bf1uq.mongodb.net/?retryWrites=true&w=majority&appName=bonJovi"

//Definimos todo lo que no se quiera ver y lo llevamos variables de entorno para que se oculten
const url = process.env.DATABASE_URL
const PORT = process.env.PORT

//Generamos una instancia de expres y la gurdamos en app, es decir una copia de express
const app = express()

//EL ORGANIZADOR DE LA DATA; parsea o transformar la data para que la podamos entender y trabajar como objetos
app.use(express.json())

//nos permite generar la conexion con archivos estaticos o sea entrega HTML, las siguientes dos lineas conecta el from con el back
const path = require("path");
//Funcion que nos va permitir trabajar con archivos estaticos-Axios
app.use(express.static(path.join(__dirname, "public")));

//EL ORGANIZADOR DE LAS RUTAS, Cuando se haga una peticion lo mande a router; nos permite enrrutar
app.use('/', router)


//Conexion a la base de datos
const connectToMongo = async () => {
  try {
    await mongoose.connect(url)
    //FUNCION PARA LEVANTAR NUESTRO SERVIDOR, CON 2 PARAMETROS, 1 UN PUERTO MAYOR A 3000 Y EL 2 UNA FUNCION TIPO FLECHA
    app.listen(PORT, () => {
      //Mensje para saber que el servidor se este ejecutando o este levantado
      console.log("Servidor escuchando en puerto 5000 y DB conectada");
    });

  } catch (error) {
    //SI FALLA CAE ACA
    console.log(error)
  }
}

connectToMongo()