

let titulo = document.getElementById("titulo")
let duracion = document.getElementById("duracion")
let url = document.getElementById("url")
let form = document.getElementById("formAddAlbum")



form.addEventListener('submit', function (evt) {
    //evt.preventDefault();
    console.log("envio");
    let mensajeError = [];

    if((titulo.value === null || titulo.value === '') || (duracion.value === null || duracion.value === '') || (url.value === null || url.value === '')){
        swal(
            "Oh no!",
            "Debes completar todo los campos", "info",
        );
        evt.preventDefault();       
    }

    
})




const agregarCancion = async () => {
    const albumId = 'ID_DEL_ALBUM'; // Reemplaza con el ID del álbum
    const nuevaCancion = {
        titulo: 'Nombre de la Canción',
        duracion: '3:45', // Duración de la canción
    };

    try {
        const respuesta = await axios.post(`http://localhost:3000/api/albums/${albumId}/canciones`, nuevaCancion);
        console.log('Canción agregada:', respuesta.data);
    } catch (error) {
        console.error('Error al agregar la canción:', error.response.data);
    }
};

//agregarCancion();

