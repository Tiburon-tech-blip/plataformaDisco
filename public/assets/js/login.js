



const loginForm = document.getElementById('formulario');


loginForm.addEventListener('submit', async (event) => {

  event.preventDefault();
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  validacion()

  try {
    const response = await fetch('https://plataformadisco-przk.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      // Almacenar el token JWT en el almacenamiento local
      localStorage.setItem('token', data.token);
      // Redirigir a la página principal o a una página protegida
      window.location.href = '../index.html';
    } else {
      const error = await response.json();
      //alert(error.message);
    }
  } catch (error) {
    console.error(error);
  }
});

function validacion() {
  var email = document.getElementById("email")
  var password = document.getElementById("password")
  var error = document.getElementById("error")
  var form = document.getElementById("formulario")
  error.style.color = "red"


  if ((email.value === null || email.value === '') || (password.value === null || password.value === '')) {
    swal(
      "Oh no!",
      "Debes completar todo los campos", "info",
    );
    
    //evt.preventDefault();
  }

  if (password.value.length > 0 && password.value.length <= 6) {

    // mensajeError.push('Ingresa tu Cotraseña');
    error.innerHTML = "La contraseña es muy corta, ingresa por lo menos 7 caracteres"
    //evt.preventDefault();
  } else {
    error.innerHTML = ""
  }

}