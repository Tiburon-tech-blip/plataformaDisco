const express = require('express')
const Albumes = require('../models/album.js')
//UNA INSTANCIA PARA MANEJAR RUTAS
const router = express.Router()

//CRUD

//C ---> Crear POST
//R ---> Leer  GET
//U ---> Actualizar PUT
//D ---> Borrar DELETE


// ALBUM

// Agregar un album
router.post('/', async (req, res) => {
  try {
    await Albumes.create(req.body)
    res.status(201).send("Disco agregado correctamente")
  } catch (error) {
    console.log(error)
    res.status(500).send("Error al crear el disco")
  }
})
//******************************************************************************* */

// Editar un album
router.put('/:id', async (req, res) => {
  try {
    const updatedAlbum = await Albumes.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAlbum) {
      res.status(404).send('Album no encontrado');
    }
    res.status(200).send(updatedAlbum);

  } catch (error) {
    console.log(error)
    res.status(500).send("Hubo un error en la actualizacion")
  }
});
//******************************************************************************* */

// Agregar una canción al  album
// Ruta para agregar una canción a un álbum
router.post('/:albumId/songs', async (req, res) => {
  const { albumId } = req.params;
  const { titulo, duracion, urlDeCancion } = req.body;

  try {
    const album = await Albumes.findById(albumId);
    if (!album) {
      return res.status(404).send('Álbum no encontrado');
    }

    const newSong = { titulo, duracion, urlDeCancion };
    album.canciones.push(newSong);
    await album.save();

    res.status(201).send(newSong);
  } catch (error) {
    console.log(error)
    res.status(500).send('Error al agregar la canción');
  }
});
//******************************************************************************* */

// Ruta para listar canciones de un álbum
router.get('/:albumId/songs', async (req, res) => {
  
  try {
    const albumId = req.params.albumId;
    const album = await Albumes.findById(albumId).populate('canciones');
    res.json(album.canciones);
     
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al listar las canciones', error });
  }
});
//******************************************************** */


// Ruta para eliminar una canción de un Album
router.delete('/:albumId/songs/:songId', async (req, res) => {
  const { albumId, songId } = req.params;

  try {
    const album = await Albumes.findById(albumId);
    if (!album) {
      return res.status(404).send('Álbum no encontrado');
    }

    // Filtrar la canción a eliminar
    album.canciones = album.canciones.filter(song => song._id.toString() !== songId);
    await album.save();

    res.status(200).send('Canción eliminada correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar la canción');
  }
});
//********************************************************************************* */

// Obtener todos los albums
//Nos devuelve todos los Albumes desde el back
router.get('/', async (req, res) => {
  try {
    //"find" es para que me devuelva todos los elementos, nos devuelve un arreglo
    const albums = await Albumes.find({})
    //si no esta vacio
    if (albums.length) {
      res.status(200).send(albums)
    }
    else {
      res.status(200).send("No hay Albumes")
    }
  } catch (error) {
    console.log(error)
    res.status(404).send("Algo salio mal")
  }
})
//*********************************************************************************** */

// Obtener un album específico segun id
router.get('/:id', async (req, res) => {
  try {
    const album = await Albumes.findById(req.params.id);
    if (!album) {
      return res.status(404).send('Album no encontrado');
    }
    res.status(200).send(album)
    //res.json(album);
  } catch (error) {
    console.log(error)
    res.status(404).send("Algo salio mal")
    //res.status(400).json({ error: error.message });
  }
});
//****************************************************************************** */


// Eliminar un album
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const deletedAlbum = await Albumes.findByIdAndDelete(id);
    if (!deletedAlbum) {
      return res.status(404).send('Album no encontrado');
    }
    res.status(200).send("Elemento eliminado correctamente");
    //res.json({ message: 'Album eliminado correctamente' });
  } catch (error) {
    res.status(500).send("Hubo un error en la eliminacion");
    //res.status(400).json({ error: error.message });
  }
});

//************************************************************************************** */



module.exports = router