//CREAR USUARIO 

const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
 console.log(nombre)
  try {
    const response = await fetch('http://localhost:5000/signup', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, apellido, email, password })
    });

    if (response.ok) {
      const data = await response.json();
      alert(data.message);
      window.location.href = '../pages/login.html';
    } else {
      const error = await response.json();
      alert(error.message);
    }
  } catch (error) {
    console.error(error);
  }
});
