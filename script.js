const rojo = document.getElementById("rojo");
const verde = document.getElementById("verde");
const amarillo = document.getElementById("amarillo");
const azul = document.getElementById("azul");
const start = document.getElementById("start");
const colores = [rojo, verde, amarillo, azul];

let secuencia = [];
let jugadorPaso = 0;
let esperandoInput = false;

function iluminarColor(color) {
    colores[color].classList.add("light");
    setTimeout(() => apagarColor(color), 500);
}

function apagarColor(color) {
    colores[color].classList.remove("light");
}

function reproducirSecuencia() {
    esperandoInput = false;
    let i = 0;
    const intervalo = setInterval(() => {
        iluminarColor(secuencia[i]);
        i++;
        if (i >= secuencia.length) {
            clearInterval(intervalo);
            esperandoInput = true;
        }
    }, 800);
}

function agregarColor() {
    const colorAleatorio = Math.floor(Math.random() * 4);
    secuencia.push(colorAleatorio);
}

function reiniciarJuego() {
    secuencia = [];
    jugadorPaso = 0;
    agregarColor();
    reproducirSecuencia();
}

function manejarClick(colorIndex) {
    if (!esperandoInput) return;
    iluminarColor(colorIndex);

    if (colorIndex === secuencia[jugadorPaso]) {
        jugadorPaso++;
        if (jugadorPaso === secuencia.length) {
            jugadorPaso = 0;
            agregarColor();
            setTimeout(reproducirSecuencia, 1000);
        }
        console.log(secuencia);
    } else {
        alert("¡Fallaste! Intenta de nuevo.");
    }
}

colores.forEach((color, index) => {
    color.addEventListener("click", () => manejarClick(index));
});


start.addEventListener("click", reiniciarJuego);