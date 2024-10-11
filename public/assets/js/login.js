

let email = document.getElementById("email")
let password = document.getElementById("password")
let error = document.getElementById("error")
let form = document.getElementById("formulario")
form.style.color= "red"


form.addEventListener('submit', function (evt) {
   // evt.preventDefault();
    console.log("envio");
    let mensajeError = [];

    if((email.value === null || email.value === '') || (password.value === null || password.value === '')){
        swal(
            "Oh no!",
            "Debes completar todo los campos", "info",
        );
        // mensajeError.push("Ingresa tu email");
        evt.preventDefault();
    }

    if(password.value.length > 0 && password.value.length <=6){
        // mensajeError.push('Ingresa tu Cotraseña');
        error.innerHTML="La contraseña es muy corta, ingresa por lo menos 7 caracteres"
        evt.preventDefault();
    } else {
        error.innerHTML=""
    }

    //error.innerHTML = mensajeError.join(',');

})