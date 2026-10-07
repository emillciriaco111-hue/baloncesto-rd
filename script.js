// ==============================================
// ELEMENTOS DE LA PÁGINA
// ==============================================

const reloj =
    document.getElementById("reloj");

const fecha =
    document.getElementById("fecha");

const nombre =
    document.getElementById("nombre");

const lugar =
    document.getElementById("lugar");

const btnEntrada =
    document.getElementById("btnEntrada");

const btnSalida =
    document.getElementById("btnSalida");

const btnLimpiar =
    document.getElementById("btnLimpiar");

const estado =
    document.getElementById("estado");

const mensaje =
    document.getElementById("mensaje");

const ultimaEntrada =
    document.getElementById("ultimaEntrada");

const ultimaSalida =
    document.getElementById("ultimaSalida");

const tiempoTrabajado =
    document.getElementById("tiempoTrabajado");

const tabla =
    document.getElementById("tabla");



// ==============================================
// VARIABLES
// ==============================================

// NO SE GUARDA EN BASE DE DATOS
// NO SE GUARDA EN LOCALSTORAGE

let sesionActual = null;

let registros = [];



// ==============================================
// RELOJ
// ==============================================

function actualizarReloj() {

    const ahora =
        new Date();


    reloj.textContent =
        ahora.toLocaleTimeString(
            "es-DO"
        );


    fecha.textContent =
        ahora.toLocaleDateString(
            "es-DO",
            {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );

}


actualizarReloj();


setInterval(
    actualizarReloj,
    1000
);



// ==============================================
// OBTENER HORA
// ==============================================

function obtenerHora(
    fechaRegistro
) {

    return new Date(
        fechaRegistro
    ).toLocaleTimeString(
        "es-DO",
        {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }
    );

}



// ==============================================
// OBTENER FECHA
// ==============================================

function obtenerFecha(
    fechaRegistro
) {

    return new Date(
        fechaRegistro
    ).toLocaleDateString(
        "es-DO"
    );

}



// ==============================================
// CALCULAR TIEMPO
// ==============================================

function calcularTiempo(
    entrada,
    salida
) {

    const inicio =
        new Date(
            entrada
        );


    const fin =
        new Date(
            salida
        );


    const diferencia =
        fin - inicio;


    const minutosTotales =
        Math.max(
            0,
            Math.floor(
                diferencia / 60000
            )
        );


    const horas =
        Math.floor(
            minutosTotales / 60
        );


    const minutos =
        minutosTotales % 60;


    return (
        horas +
        "h " +
        String(
            minutos
        ).padStart(
            2,
            "0"
        ) +
        "m"
    );

}



// ==============================================
// MENSAJES
// ==============================================

function mostrarMensaje(
    texto,
    tipo
) {

    mensaje.textContent =
        texto;


    if (
        tipo === "error"
    ) {

        mensaje.style.color =
            "#d64545";

    }

    else if (
        tipo === "ok"
    ) {

        mensaje.style.color =
            "#1f9d63";

    }

    else {

        mensaje.style.color =
            "#155eef";

    }

}



// ==============================================
// PONCHAR ENTRADA
// ==============================================

btnEntrada.addEventListener(
    "click",
    function () {


        const estudiante =
            nombre.value.trim();


        const empresa =
            lugar.value;



        // VALIDAR NOMBRE

        if (
            estudiante === ""
        ) {

            mostrarMensaje(
                "⚠️ Escribe tu nombre.",
                "error"
            );


            nombre.focus();


            return;

        }



        // VALIDAR EMPRESA

        if (
            empresa === ""
        ) {

            mostrarMensaje(
                "⚠️ Selecciona tu lugar de pasantía.",
                "error"
            );


            return;

        }



        // EVITAR DOBLE ENTRADA

        if (
            sesionActual !== null
        ) {

            mostrarMensaje(
                "⚠️ Ya tienes una entrada activa.",
                "error"
            );


            return;

        }



        // HORA DE ENTRADA

        const ahora =
            new Date();



        sesionActual = {

            estudiante:
                estudiante,

            lugar:
                empresa,

            entrada:
                ahora,

            salida:
                null

        };



        ultimaEntrada.textContent =
            obtenerHora(
                ahora
            );


        ultimaSalida.textContent =
            "--:--";


        tiempoTrabajado.textContent =
            "En curso";


        mostrarMensaje(

            "✅ Entrada registrada a las " +

            obtenerHora(
                ahora
            ),

            "ok"

        );


        cambiarEstado();

    }
);



// ==============================================
// PONCHAR SALIDA
// ==============================================

btnSalida.addEventListener(
    "click",
    function () {


        if (
            sesionActual === null
        ) {

            mostrarMensaje(
                "⚠️ Primero debes registrar una entrada.",
                "error"
            );


            return;

        }



        const horaSalida =
            new Date();



        sesionActual.salida =
            horaSalida;



        const tiempo =
            calcularTiempo(

                sesionActual.entrada,

                horaSalida

            );



        ultimaSalida.textContent =
            obtenerHora(
                horaSalida
            );


        tiempoTrabajado.textContent =
            tiempo;



        // AGREGAR AL HISTORIAL DE LA PÁGINA

        registros.unshift({

            estudiante:
                sesionActual.estudiante,

            lugar:
                sesionActual.lugar,

            entrada:
                sesionActual.entrada,

            salida:
                horaSalida,

            tiempo:
                tiempo

        });



        mostrarHistorial();



        mostrarMensaje(

            "✅ Salida registrada. Tiempo realizado: " +

            tiempo,

            "ok"

        );



        // TERMINAR SESIÓN

        sesionActual =
            null;


        nombre.value =
            "";


        lugar.value =
            "";


        cambiarEstado();

    }
);



// ==============================================
// CAMBIAR ESTADO
// ==============================================

function cambiarEstado() {


    if (
        sesionActual
    ) {


        estado.textContent =
            "EN PASANTÍA";


        estado.className =
            "estado dentro";


        btnEntrada.disabled =
            true;


        btnSalida.disabled =
            false;


        nombre.disabled =
            true;


        lugar.disabled =
            true;

    }


    else {


        estado.textContent =
            "FUERA";


        estado.className =
            "estado fuera";


        btnEntrada.disabled =
            false;


        btnSalida.disabled =
            true;


        nombre.disabled =
            false;


        lugar.disabled =
            false;

    }

}



// ==============================================
// MOSTRAR HISTORIAL
// ==============================================

function mostrarHistorial() {


    tabla.innerHTML =
        "";



    if (
        registros.length === 0
    ) {


        tabla.innerHTML = `

            <tr class="fila-vacia">

                <td colspan="6">

                    No hay registros todavía.

                </td>

            </tr>

        `;


        return;

    }



    registros.forEach(
        function (
            registro
        ) {


            const fila =
                document.createElement(
                    "tr"
                );



            fila.innerHTML = `

                <td>
                    ${escaparHTML(
                        registro.estudiante
                    )}
                </td>

                <td>
                    ${escaparHTML(
                        registro.lugar
                    )}
                </td>

                <td>
                    ${obtenerFecha(
                        registro.entrada
                    )}
                </td>

                <td>
                    ${obtenerHora(
                        registro.entrada
                    )}
                </td>

                <td>
                    ${obtenerHora(
                        registro.salida
                    )}
                </td>

                <td>
                    ${registro.tiempo}
                </td>

            `;



            tabla.appendChild(
                fila
            );

        }
    );

}



// ==============================================
// EVITAR HTML EN EL NOMBRE
// ==============================================

function escaparHTML(
    texto
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        texto;


    return div.innerHTML;

}



// ==============================================
// LIMPIAR HISTORIAL
// ==============================================

btnLimpiar.addEventListener(
    "click",
    function () {


        if (
            registros.length === 0
        ) {

            mostrarMensaje(
                "No hay registros para eliminar.",
                "normal"
            );


            return;

        }



        const confirmar =
            confirm(
                "¿Seguro que quieres limpiar el historial?"
            );


        if (
            confirmar
        ) {


            registros =
                [];


            mostrarHistorial();


            ultimaEntrada.textContent =
                "--:--";


            ultimaSalida.textContent =
                "--:--";


            tiempoTrabajado.textContent =
                "0h 00m";


            mostrarMensaje(
                "Historial limpiado.",
                "normal"
            );

        }

    }
);



// ==============================================
// INICIAR
// ==============================================

cambiarEstado();

mostrarHistorial();