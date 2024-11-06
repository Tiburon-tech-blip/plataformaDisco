const express = require('express')
const Usuarios = require('../models/user.js')
//UNA INSTANCIA PARA MANEJAR RUTAS
const router = express.Router()

//const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
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





//CREAR USUARIO
// router.post('/register', async (req, res) => {
//     try {
//       const { nombre, apellido, email, password } = req.body;
  
//       // Verificar si el email ya está en uso
//       const existingUser = await Usuarios.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({ message: 'Email ya está en uso.' });
//       }
  
//       // Encriptar la contraseña
//       const hashedPassword = await bcrypt.hash(password, 10);
  
//       // Crear nuevo usuario
//       const newUser = new Usuarios({ nombre, apellido, email, password: hashedPassword });
//       await newUser.save();
  
//       // Generar token JWT
//       const token = jwt.sign({ userId: newUser._id }, process.env.TOKEN , { expiresIn: '1h' });
//       res.cookie("token",token) //quiero que almacenes en el front un objeto que el nombre de su propierdad sea token y su valor es el token generado
  
//       // Enviar respuesta exitosa con el token
//       res.status(201).json({ message: 'Usuario registrado exitosamente,se te redigira al login', token });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Error al registrar usuario.' });
//     }
//   });
  



module.exports = router