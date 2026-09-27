const botonDato = document.getElementById("btnDato");
const textoDato = document.getElementById("dato");

const datos = [
    "Cada equipo tiene cinco jugadores en cancha.",
    "Una canasta puede valer uno, dos o tres puntos.",
    "El baloncesto fue creado por James Naismith en 1891.",
    "República Dominicana ha participado en importantes competencias internacionales.",
    "El baloncesto es uno de los deportes más populares en muchos barrios dominicanos.",
    "Los clubes deportivos ayudan al desarrollo de jóvenes jugadores.",
    "Un partido de baloncesto requiere comunicación y trabajo en equipo.",
    "La línea de tres puntos permite conseguir tres puntos con un solo lanzamiento."
];

function mostrarDato() {

    const numeroAleatorio = Math.floor(
        Math.random() * datos.length
    );

    textoDato.textContent = datos[numeroAleatorio];

    botonDato.textContent = "Mostrar otro dato";
}

botonDato.addEventListener("click", mostrarDato);