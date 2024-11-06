

// let email = document.getElementById("email")
// let password = document.getElementById("password")
// let error = document.getElementById("error")
// let form = document.getElementById("formulario")
// error.style.color= "red"


// form.addEventListener('submit', function (evt) {
//    // evt.preventDefault();
//     console.log("envio");
    

//     if((email.value === null || email.value === '') || (password.value === null || password.value === '')){
//         swal(
//             "Oh no!",
//             "Debes completar todo los campos", "info",
//         );
//         // mensajeError.push("Ingresa tu email");
//         evt.preventDefault();
//     }

//     if(password.value.length > 0 && password.value.length <=6){

//         // mensajeError.push('Ingresa tu Cotraseña');
//         error.innerHTML="La contraseña es muy corta, ingresa por lo menos 7 caracteres"
//         evt.preventDefault();
//     } else {
//         error.innerHTML=""
//     }

// })



const loginForm = document.getElementById('formulario');


loginForm.addEventListener('submit', async (event) => {
  
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password})
    });

    if (response.ok) {
      const data = await response.json();
      // Almacenar el token JWT en el almacenamiento local
      localStorage.setItem('token', data.token);
      // Redirigir a la página principal o a una página protegida
      window.location.href = '../index.html';
    } else {
      const error = await response.json();
      alert(error.message);
    }
  } catch (error) {
    console.error(error);
  }
});