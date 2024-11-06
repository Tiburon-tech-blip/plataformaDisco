const express = require('express')
const Usuarios = require('../models/user.js')
//UNA INSTANCIA PARA MANEJAR RUTAS
const router = express.Router()

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// LOGEAR USUARIO
router.post('/', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Encuentra al usuario por email
      const user = await Usuarios.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Usuario o contraseña incorrectos.' });
      }
  
      // Verifica la contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Usuario o contraseña incorrectos.' });
      }
  
      // Genera token JWT
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      // Envía respuesta exitosa con el token
      res.status(200).json({ message: 'Inicio de sesión exitoso.', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al iniciar sesión.' });
    }
  });
  
  module.exports = router;