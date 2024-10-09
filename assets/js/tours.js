
//clase 07

// let nombre =  prompt("Ingresa Tu Nombre") 
// let edad = parseInt(prompt("Ingresa Tu Edad"))
// alert("Hola "+ nombre + " de " + edad +" años, te interesaria adquirir tickets")

//*******************************************************


//clase 08

// let nombre = prompt("Cuál es tu nombre?").toUpperCase();
// const p = document.querySelector("#welcome");

// if (nombre =="") {
//     alert("Debes completar un nombre");
//     nombre= prompt("Ingresa de Nuevo el nombre").toUpperCase();
// }
//     else if (nombre.length < 2) {
//     nombre = prompt("Demasiado corto, dinos, cuál es realmente tu nombre?").toUpperCase();
// }

// p.textContent = "Hola, " + nombre;

//*********************************************************

//clase 09

// let nombre = prompt("Cuál es tu nombre?").toUpperCase();
// while (nombre.length < 3) {
//     nombre = prompt(
//         "Mmmm, tu nombre no puede ser tan corto, ingresa al menos 3 letras",
//     ).toUpperCase();
// }

// const span = document.getElementById("welcome");
// span.textContent = `Hola, ${nombre}`;
// const i = document.querySelector("i");
// i.setAttribute("class", "fa fa-ticket");

//****************************************************************

//clase 11 en adelante


let edad = parseInt(prompt("Ingresa tu Edad"));

if (edad < 18) {
    swal(
        "Oh no!",
        "Tienes " + edad + " años, debes ser mayor de edad para obtener una entrada ", "info",
    );


    // selecciono todos los elemento button
    let boton = document.querySelectorAll(".boton");
    let botones = document.querySelectorAll("button");

    for (let i = 0; i < boton.length; i++) {
        // desabilito los botones
        boton[i].disabled = true;

        // remuevo la clase que se encuentra en los botones
        botones[i].classList.remove("tickes-btn");

        // agrego la clase para botones anulados
        botones[i].classList.add("tickes-btn-anulado");

        // cambio el texto de los botones
        botones[i].textContent = "Anulado";
    }
}

let tickets = {
    "Philadelphia": 3,
    "Toronto": 4,
    "Vancouver": 1,
    "New York City": 3,
    "Tokio": 2,
    "Mánchester": 5,
    "Buenos Aires": 1
}

let indice = 0



function getTickets(place) {

    for (let propiedad in tickets) {
        if ((propiedad === place) && (tickets[propiedad] > 0)) {
            tickets[propiedad] = tickets[propiedad] - 1
            console.log(tickets[propiedad])
            swal("Vendido!", "Tienes entradas para el " + place +
                " concierto", "success");


        } else if ((propiedad === place) && (tickets[propiedad] === 0)) {
            
            swal(
                "Oh no!",
                "¡No tienes suerte! Ya no quedan entradas para " +
                place + " concierto", "info",
            );

            if (place === "Philadelphia") {
                indice = 0
                //disableSoldOutButtons()
                //console.log(indice)
            }

            if (place === "Toronto") {
                indice = 1
                //disableSoldOutButtons()
                //console.log(indice)
            }

            if (place === "Vancouver") {
                indice = 2
                //disableSoldOutButtons()
                //console.log(indice)
            }

            if (place === "New York City") {
                indice = 3
                //disableSoldOutButtons()
                //console.log(indice)
            }

            if (place === "Tokio") {
                indice = 4
                //disableSoldOutButtons()
                //console.log(indice)
            }

            if (place === "Mánchester") {
                indice = 5
                //disableSoldOutButtons()
                //console.log(indice)
            }
            if (place === "Buenos Aires") {
                indice = 6
                //disableSoldOutButtons()
                // console.log(indice)

            }
            disableSoldOutButtons()
        }


    }
  
}

function disableSoldOutButtons() {
    // selecciono todos los elemento button
    let sold = document.querySelectorAll("button");

    // desabilito los botones
    sold[indice].disabled = true;

    // remuevo la clase que se encuentra en los botones
    sold[indice].classList.remove("tickes-btn");

    // agrego la clase para botones anulados
    sold[indice].classList.add("tickes-btn-anulado");

    // cambio el texto de los botones
    sold[indice].textContent = "Sold out";

    console.log(indice)
}


  // if (noTickets) {
    //     swal(
    //         "Oh no!",
    //         "¡No tienes suerte! Ya no quedan entradas para " +
    //         place, "info",
    //     );

    //     // let boton = document.getElementById('boton')
    //     // boton.disabled = true

    // } else {
    //     swal("Vendido!", "Tienes entradas para el " + place +
    //         " concierto", "success");

    // }

