


function addSong() {
    var albumId_ = obtenerId()
    var albumId = albumId_; // Reemplaza con el ID del álbum
    sidebar(albumId)

    // Escucha el evento de envío del formulario
    document.getElementById('formAddAlbum').addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita el envío del formulario por defecto

        var albumId_ = obtenerId()
        var albumId = albumId_; // Reemplaza con el ID del álbum

        const nuevaCancion = {
            titulo: titulo.value,
            duracion: duracion.value, // Duración de la canción
            urlDeCancion: url.value
        }

        try {
            //addSong2 = document.querySelector(".addSong")
            const response = await axios.post(`http://localhost:5000/band/${albumId}/songs`, nuevaCancion);
            console.log('Canción agregada:', response.data);

            //if (response.data.success) {
            swal({
                title: "Ok!",
                text: "La cancion fue agregada correctamente",
                icon: "success",
            });
            //alert('Cancion agregada exitosamente.');

            window.location.href = `../pages/album.html?id=${albumId}`;
            // }


        } catch (error) {
            console.error('Error en el envío:', error);
            //alert('Hubo un error al agregar las canciones.');
            validacion()
        }
    });

}

addSong()

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

//funcion para validar que los campos no esten vacios
function validacion() {
    let titulo = document.getElementById("titulo")
    let duracion = document.getElementById("duracion")
    let url = document.getElementById("url")
    var form = document.getElementById("formAddAlbum")

    if ((titulo.value === null || titulo.value === '') || (duracion.value === null || duracion.value === '') || (url.value === null || url.value === '')) {
        swal(
            "Oh no!",
            "Debes completar todo los campos", "info",
        );

    }

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


