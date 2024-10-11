//requerimos mongoose, con la cual vamos a realizar la creacion de nuestro modelo, o sea nos permite crear el molde de los elementos que vamos a agregar
const mongoose = require('mongoose')

const Usuarios = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        minLength: [2, "El nombre debe tener al menos 2 caracteres"]
    },

    apellido: {
        type: String,
        required: [true, "El apellido es obligatorio"],
        minLength: [2, "El apellido debe tener al menos 2 caracteres"]
    },

    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                return emailRegex.test(v);
            },
            message: ' Este mail no es válido!'
        },

    },

    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
        minLength: [6, "La contraseña debe tener al menos 6 caracteres"],
        maxLength: [20, "La contraseña no puede exceder los 20 caracteres"],

        validate: {
            validator: function (password) {
                // Expresión regular para validar al menos un número, una letra mayúscula y un carácter especial
                const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
                return passwordRegex.test(password);
            },
            message:
                "La contraseña debe contener al menos una letra mayúscula, un número y un carácter especial",
        },
    },

    favoritos: [
        {
            tituloAlbum: { type: String }

        }
    ]
})

module.exports = mongoose.model("Usuarios", Usuarios)

//importar:  const Usuarios = require('./models/user.js')


