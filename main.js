import { preguntasYrespuestas } from "./preguntasyrespuestas.js";

let preguntasSeleccionadas = [];
let indiceActual = 0;

const contenedorPregunta = document.querySelector('#contenedor-pregunta');
const contenedorOpciones = document.querySelector('#contenedor-opciones');
const contenedorResultados = document.querySelector('#contenedor-resultados');

contenedorPregunta.innerHTML = '<h2 class="pregunta">Selecciona el tema:</h2>';

Object.keys(preguntasYrespuestas).forEach((opcion) => {
  contenedorOpciones.innerHTML += `<p class="opcion">${opcion}</p>`;
});

const opciones = contenedorOpciones.querySelectorAll('.opcion');
opciones.forEach((opcion) => {
  opcion.addEventListener('click', () => {
    const tema = opcion.innerHTML.trim();
    seleccionarTema(tema);
  });
});

function seleccionarTema(tema) {
  preguntasSeleccionadas = preguntasYrespuestas[tema];
  indiceActual = 0;
  mostrarPregunta(indiceActual);
}

function mostrarPregunta(indice) {
  const { pregunta, respuestas, respuestaCorrecta } = preguntasSeleccionadas[indice];
  contenedorPregunta.innerHTML = `<h2 class="pregunta">${pregunta}</h2>`;
  mostrarOpciones(respuestas, respuestaCorrecta);
}

function mostrarOpciones(respuestas, respuestaCorrecta) {
  contenedorOpciones.innerHTML = "";
  respuestas.forEach((opcion) => {
    const btn = document.createElement("button");
    btn.textContent = opcion;
    btn.classList.add("btn-respuesta");
    btn.addEventListener("click", () => verificarRespuesta(btn, opcion, respuestaCorrecta));
    contenedorOpciones.appendChild(btn);
  });
}

function verificarRespuesta(boton, opcion, correcta) {
  const botones = document.querySelectorAll(".btn-respuesta");


  botones.forEach(b => b.disabled = true);

  if (opcion === correcta) {
    boton.classList.add("btn-correcto");
    contenedorResultados.innerHTML = `<p style="color:green">✅ Correcto: ${opcion}</p>`;
  } else {
    boton.classList.add("btn-incorrecto");
    contenedorResultados.innerHTML = `<p style="color:red">❌ Incorrecto, la respuesta era: ${correcta}</p>`;

    botones.forEach(b => {
      if (b.textContent === correcta) {
        b.classList.add("btn-correcto");
      }
    });
  }

  indiceActual++;
  if (indiceActual < preguntasSeleccionadas.length) {
    setTimeout(() => mostrarPregunta(indiceActual), 2000);
  } else {
    setTimeout(() => {
      contenedorPregunta.innerHTML = "<h2> Juego terminado</h2>";
      contenedorOpciones.innerHTML = "";
    }, 2000);
  }
}
