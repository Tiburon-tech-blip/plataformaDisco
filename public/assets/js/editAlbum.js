

let titulo = document.getElementById("titulo")
let descripcion = document.getElementById("descripcion")
let url = document.getElementById("url")
let form = document.getElementById("formAddAlbum")



form.addEventListener('submit', function (evt) {
    
    //evt.preventDefault();
    console.log("envio");
    let mensajeError = [];

    if((titulo.value === null || titulo.value === '') || (descripcion.value === null || descripcion.value === '') || (url.value === null || url.value === '')){
        swal(
            "Oh no!",
            "Debes completar todo los campos", "info",
        );
        evt.preventDefault();  
    }

    
})