const express = require('express')
const Usuarios = require('../models/user.js')
//UNA INSTANCIA PARA MANEJAR RUTAS
const router = express.Router()

//CRUD

//C ---> Crear POST
//R ---> Leer  GET
//U ---> Actualizar PUT
//D ---> Borrar DELETE

// CREATE: Creamos los usuarios, nombre, apellido, email, password y favoritos(array)
router.post('/', async (req, res) => {
     try {
          //  A la colecion "Usuarios" le aplico un create, (con req.body tenemos acceso a los datos que nos hayan enviado desde el from en el elemento body)
          await Usuarios.create(req.body)
          // ¡si se crea correctamente¡
          res.status(201).send("Usuario agregado correctamente")
     } catch (error) {
          // Si hubo un error
          console.log(error)
          res.status(500).send("Error al crear el Usuario")
     }
})

//Nos devuelve todos los usuarios desde el back
router.get('/', async (req, res) => {
     try {
          //"find" es para que me devuelva todos los elementos, nos devuelve un arreglo
          const result = await Usuarios.find({})
          //si no esta vacio
          if (result.length) {
               res.status(200).send(result)
          }
          else {
               res.status(200).send("No hay Usuarios")
          }
     } catch (error) {
          console.log(error)
          res.status(404).send("Algo salio mal")
     }
})

//GET x ID : nos devuelve el usuario correspondiente al ID,  Obtener un usuario por ID (sin contraseña)
router.get('/:id', async (req, res) => {

     try {
          //"findById" es para que me devuelva los elementos con ese ID, y el select para que excluya esa propiedad
          const user = await Usuarios.findById(req.params.id).select('-password')

          if (!user) {
               return res.status(404).send('Usuario no encontrado');
          }
          //Mostramos el usuario traido desde el back
          res.status(200).send(user)

     } catch (error) {
          res.status(500).send("No data")

     }
})


// Editar un usuario
router.put('/:id', async (req, res) => {
     try {
          
          const id = req.params.id
          const newInfo = req.body

          const updatedUser = await Usuarios.findByIdAndUpdate(id, newInfo, { new: true });
          if (!updatedUser) {
               res.status(404).send('Usuario no encontrado');
          }
          
         //Mostramos el usuario modificado, traido desde el back
         res.status(200).send(updatedUser)
     } catch (error) {
          console.log(error)
          res.status(400).send("Error al editar los usuarios");
     }
});




//GET x NOMBRE

// router.get('/:titulo', async (req, res)=>{
//      //la-noche-estrellada
//      try {
//        //"find" es para que me devuelva todos los elementos
//        const result = await Discos.find({titulo: req.params.titulo})
//        res.status(200).send(result)
//      } catch (error) {
//        res.status(404).send("No data")
//      }
//    })


//    //UPDATE

//    router.put('/discos/:id', async (req, res)=>{
//      try {
//          const id = req.params.id
//          const newInfo = req.body

//          console.log("NEW INFO", newInfo)
//   await Discos.findByIdAndUpdate(id, newImfo, {new: true})

//          const arr = [ { nombreDeCancion: 'Cancion 1 del album', duracion: 4 } ]

//          await Discos.findByIdAndUpdate(id, {canciones: arr}, {new: true})

//        res.status(200).send("Elemento actualizado correctamente")
//      } catch (error) {
//        console.log(error)
//        res.status(500).send("Hubo un error en la actualizacion")
//      }
//    })


//    router.delete('/discos/:id', async (req, res)=>{
//      try {
//          const id = req.params.id
//          await Discos.findByIdAndDelete(id)

//        res.status(200).send("Elemento eliminado correctamente")
//      } catch (error) {
//        console.log(error)
//        res.status(500).send("Hubo un error en la eliminacion")
//      }
//    })



// router.get("/users/:uid", (req, res)=>{
//     console.log(req.params)
//     const uid = req.params.uid

//     const usuarioFiltrado = usuarios.filter((usuario)=>usuario.uid === uid)

//     res.status(200).send(usuarioFiltrado)
// })



module.exports = router