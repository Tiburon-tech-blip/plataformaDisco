
//requerimos mongoose, con la cual vamos a realizar la creacion de nuestro modelo, o sea nos permite crear el molde de los elementos que vamos a agregar
const mongoose = require('mongoose')


const Albumes = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, "El titulo es obligatorio"]
    },

    descripcion: {
        type: String,
        required: [true, "La descripcion es obligatoria"],
        minLength: [5, "La contraseña debe tener al menos 6 caracteres"],
        maxLength: [200, "La contraseña no puede exceder los 20 caracteres"]
    },

    anoDeLanazamiento: {
        type: Number,
        required: [true, "El año de lanzamiento es obligatorio"],
        min: [1, "la antiguedad no puede ser igual o menor a cero"]
    },

    canciones: [
        {
            titulo: {
                type: String,
                required: [true, "El titulo de la cancion es obligatoria"]
            },
            duracion: {
                type: String,
                required: [true, "La duracion de la cancion es obligatoria"]
            },
        }
    ],

    portadaUrl: {
        type: String,
        required: [true, "La URL es obligatoria"]
    }
})

module.exports = mongoose.model("Albumes", Albumes)

//importar:  const Albumes = require('./models/album.js')