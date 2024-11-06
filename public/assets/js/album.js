let listado = ``
b = 0
con = 0

const getAlbum = async () => {
    //obtengo el id desde la url
    try {
        // 1. Obtener la cadena de consulta
        const queryString = window.location.search;

        // 2. Quitar el '?'
        const paramsString = queryString.substring(1);


        // 3. Buscar el ID
        var albumId;

        const [key, value] = paramsString.split('=');
        if (key === 'id') {
            albumId = value;
        }


        // Ahora 'id' contiene el valor del parámetro 'id'
        //console.log(albumId);

        const response = await axios.get(`https://plataformadisco-przk.onrender.com/band/${albumId}`)
        albumToUse = response.data;
        renderAlbum(albumToUse);
        renderSong(albumId);
        sidebar();
    }
    catch (error) {
        console.log(error)

        swal({
            title: 'Error!',
            text: `${error}`,
            icon: 'error',
            confirmButtonText: 'Ok'
        })

        setTimeout(pausa, 5000);
        function pausa() {
            redirect('../index.html')
        }
    }
}

getAlbum()

function redirect(index) {
    // Construye la URL con el ID del álbum como query param
    window.location.href = index;
}

function renderAlbum(album) {
    const h2 = document.querySelector(".titulo")
    const p = document.querySelector(".parrafo")
    h2.textContent = album.titulo
    p.textContent = album.descripcion
}

// Función para listar canciones de un álbum

const renderSong = async (albumId) => {
    try {
        const response = await axios.get(`https://plataformadisco-przk.onrender.com/band/${albumId}/songs`);

        //listo la lista de canciones de cada album
        response.data.map((song) => {
            console.log(song)
            lista(song)
        })

        //Redireccionamiento a los link de yotube
        musicIcon = document.querySelectorAll(".musicIcon")
        const deleteIcon = document.querySelectorAll(".deleteIcon")
        response.data.map((song) => {

            musicIcon[con].addEventListener('click', () => window.open(song.urlDeCancion, '_blank'))
            con = con + 1
        })
        con = 0

        //Al hacer clik en el tacho capturo el id de la cancion y ejecuto la funcion para borrar la cancion
        deleteIcon.forEach(song => {
            song.addEventListener('click', () => {
                const songId = song.getAttribute('data-song-id');
                // Llama a la función redirect con el ID del álbum
                deleteSong(songId);
            });
        });


    } catch (error) {
        console.log(error)
        console.error('Error al obtener las canciones:', error);
    }
};

//funcion lista de canciones
const lista = (song) => {
    b = b + 1
    listado = listado + `
    <li class="esp_span">
        <span class="number">${b}.</span>
        <span class="musica">«${song.titulo}»</span>
        <span class="time">${song.duracion}</span>
        <span class="borrar"><i class="fa-solid fa-trash-can deleteIcon tacho" data-song-id= ${song._id}></i></span>
        <span class="escuchar"><a class="musicIcon"><i class="fa-solid fa-music reproducir"></i></a></span>

    </li>
`
    document.querySelector(".listaMusical").innerHTML = listado;

}

function sidebar() {
    index2 = document.querySelector(".index")
    editAlbum = document.querySelector(".editAlbum")
    addSong = document.querySelector(".addSong")
    logOut = document.querySelector(".logOut")

    index2.style.cursor = "pointer";
    editAlbum.style.cursor = "pointer";
    addSong.style.cursor = "pointer";
    logOut.style.cursor = "pointer";

    // 1. Obtener la cadena de consulta
    const queryString2 = window.location.search;
    // 2. Quitar el '?'
    const paramsString2 = queryString2.substring(1);
    // 3. Buscar el ID
    let albumId2;
    const [key, value] = paramsString2.split('=');
    if (key === 'id') {
        albumId2 = value;
    }
    index2.addEventListener('click', () => window.location.href = "../index.html")

    editAlbum.addEventListener('click', () => window.location.href = `../pages/editAlbum.html?id=${albumId2}`)

    // Construye la URL con el ID del álbum como query param
    addSong.addEventListener('click', () => window.location.href = `../pages/addSong.html?id=${albumId2}`);

    // redirectAddSong(albumId2)
    //addSong.addEventListener('click', () => window.location.href = "../pages/addSong.html")
    logOut.addEventListener('click', () => window.location.href = "../pages/login.html")

}


//Funcion eliminar cancion
const deleteSong = async (songId) => {
    try {
        // 1. Obtener la cadena de consulta
        const queryString = window.location.search;

        // 2. Quitar el '?'
        const paramsString = queryString.substring(1);

        // 3. Buscar el ID
        let albumId;

        const [key, value] = paramsString.split('=');
        if (key === 'id') {
            albumId = value;
        }

        //const songId = song.getAttribute('data-song-id')

        console.log(albumId)
        console.log(songId)


        const response = await axios.delete(`https://plataformadisco-przk.onrender.com/band/${albumId}/songs/${songId}`);
        console.log(response.data);
        console.log("cancion Borrada exitosamente")

        //swal("ok!", "Esta cancion fue borrada correctamente", "success");

        swal({
            title: "Ok!",
            text: "Esta cancion fue borrada exitosamente",
            icon: "success",
        });

        location.reload()
    } catch (error) {
        console.log(error)
        console.error('Error al eliminar la canción:', error.response.data);
    }
};
