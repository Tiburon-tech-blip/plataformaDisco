document.querySelector(".ocultar").style.display = 'none';
document.querySelector(".ocultar2").style.display = 'none';

sidebar()

//Función para enviar los datos del formulario y actualizar el álbum
document.getElementById("addAlbumForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    document.querySelector(".ocultar").style.display = 'none';
    document.querySelector(".ocultar2").style.display = 'none';

    //funcion agregar album
    //async function agregarAlbum() {
    try {
        var titulo = document.querySelector(".titulo");
        var anoDeLanazamiento = document.querySelector(".anoDeLanazamiento");
        var descripcion = document.querySelector(".descripcion");
        var portadaUrl = document.querySelector(".portadaUrl");

        const nuevoAlbum = {
            titulo: titulo.value,
            anoDeLanazamiento: anoDeLanazamiento.value,
            descripcion: descripcion.value,
            portadaUrl: portadaUrl.value
        }

        const response = await axios.post('https://plataformadisco-przk.onrender.com/band', nuevoAlbum);


        if (response.status >= 200 && response.status < 300) {
            swal({
                title: 'Agregado!',
                text: 'El album fue cargado correctamente!',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            window.location.href = "../index.html"
            //document.querySelector(".editAlbum").style.display = 'block';
            //document.querySelector(".addSong").style.display = 'block';

            console.log('POST realizado con éxito:', response.data);
        } else {
            console.log('El POST fue procesado, pero con un estado inesperado:', response.status);
        }

        console.log('Álbum agregado:', response.data);
    } catch (error) {
        console.error('Error al agregar el álbum:', error.response ? error.response.data : error.message);
    }
})

//funcion para enlaces del sidebar y boton cancelar
function sidebar(albumId) {
    index = document.querySelector(".index")
   // editAlbum = document.querySelector(".editAlbum")
    // addSong = document.querySelector(".addSong")
    logOut = document.querySelector(".logOut")
    

    index.style.cursor = "pointer";
    //editAlbum.style.cursor = "pointer";
    // addSong.style.cursor = "pointer";
    logOut.style.cursor = "pointer";
    

    index.addEventListener('click', () => window.location.href = "../index.html")
    //editAlbum.addEventListener('click', () => window.location.href = `../pages/editAlbum.html?id=${albumId}`)

    // // Construye la URL con el ID del álbum como query param
    // addSong.addEventListener('click', () => window.location.href = `../pages/addSong.html?id=${albumId}`);

    logOut.addEventListener('click', () => window.location.href = "../pages/login.html")

}

