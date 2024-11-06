

// Función para obtener los datos de un álbum
async function obtenerAlbum() {

  const albumId = obtenerId()
  sidebar(albumId)

  try {
    var titulo = document.querySelector(".titulo");
    var anoDeLanazamiento = document.querySelector(".anoDeLanazamiento");
    var descripcion = document.querySelector(".descripcion");
    var portadaUrl = document.querySelector(".portadaUrl");


    const response = await axios.get(`http://localhost:5000/band/${albumId}`);

    // trae la info desde el back a los input
    titulo.value = response.data.titulo
    anoDeLanazamiento.value = response.data.anoDeLanazamiento
    descripcion.value = response.data.descripcion
    portadaUrl.value = response.data.portadaUrl

    //Función para enviar los datos del formulario y actualizar el álbum
    document.getElementById("editAlbumForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const id_ = obtenerId()
      var titulo2 = document.querySelector(".titulo");
      var anoDeLanazamiento2 = document.querySelector(".anoDeLanazamiento");
      var descripcion2 = document.querySelector(".descripcion");
      var portadaUrl2 = document.querySelector(".portadaUrl");

      const datosAlbumActualizados = {
        titulo: titulo2.value,
        anoDeLanazamiento: anoDeLanazamiento2.value,
        descripcion: descripcion2.value,
        portadaUrl: portadaUrl2.value
      }
      console.log(id_)
      try {
        const response = await axios.put(`http://localhost:5000/band/${id_}`, datosAlbumActualizados);
        console.log('Álbum actualizado:', response.data);

        swal({
          title: 'Album editado!',
          text: 'El album fue modificado correctamente!',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        window.location.href = `../pages/album.html?id=${id_}`

      } catch (error) {
       
        console.log(error)
        console.error('Error al actualizar el álbum:', error.response.data);
      }



    })


  } catch (error) {
    console.log(error)
    console.error("Error al obtener el álbum:", error);
    alert("Álbum no encontrado");
  };
}
obtenerAlbum()


//Funcion para obtener el id del album
function obtenerId() {
  // 1. Obtener la cadena de consulta
  const queryString = window.location.search;

  // 2. Quitar el '?'
  const paramsString = queryString.substring(1);

  // 3. Buscar el ID
  var albumId_;

  const [key, value] = paramsString.split('=');
  if (key === 'id') {
    albumId_ = value;

  };
  return albumId_
}

//funcion para enlaces del sidebar y boton cancelar
function sidebar(albumId) {
  index2 = document.querySelector(".index")
  editAlbum = document.querySelector(".editAlbum")
  addSong = document.querySelector(".addSong")
  logOut = document.querySelector(".logOut")
  cancelar = document.querySelector(".cancelar")

  index2.style.cursor = "pointer";
  editAlbum.style.cursor = "pointer";
  addSong.style.cursor = "pointer";
  logOut.style.cursor = "pointer";
  cancelar.style.cursor = "pointer";

  index2.addEventListener('click', () => window.location.href = "../index.html")
  editAlbum.addEventListener('click', () => window.location.href = `../pages/editAlbum.html?id=${albumId}`)

  // Construye la URL con el ID del álbum como query param
  addSong.addEventListener('click', () => window.location.href = `../pages/addSong.html?id=${albumId}`);

  logOut.addEventListener('click', () => window.location.href = "../pages/login.html")

  cancelar.addEventListener('click', () => window.location.href = `../pages/album.html?id=${albumId}`)

}


//funcion para validar que los campos no esten vacios
// function validacion() {
//   var titulo3 = document.querySelector(".titulo");
//   var anoDeLanazamiento3 = document.querySelector(".anoDeLanazamiento");
//   var descripcion3 = document.querySelector(".descripcion");
//   var portadaUrl3 = document.querySelector(".portadaUrl");

//   if ((titulo3.value === null || titulo3.value === '') || (anoDeLanazamiento3.value === null || anoDeLanazamiento3.value === '') || (descripcion3.value === null || descripcion3.value === '') || (portadaUrl3.value === null || portadaUrl3.value === '')) {
//     swal(
//       "Oh no!",
//       "Debes completar todo los campos", "info",
//     );

//     obtenerAlbum()

//   }

// }


