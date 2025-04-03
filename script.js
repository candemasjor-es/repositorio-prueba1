const rojo = document.getElementById("rojo");
const verde = document.getElementById("verde");
const amarillo = document.getElementById("amarillo");
const azul = document.getElementById("azul");
const start = document.getElementById("start");
const nivel = document.getElementById("level");
const message = document.getElementById("message");
const ctx = document.getElementById("myChart");

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
    nivel.textContent = "Nivel: 1";
    message.textContent = "";
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
        nivel.textContent = "Nivel: " + secuencia.length;
    } else {
        message.textContent = "👎👎👎👎¡Fallaste! Intenta de nuevo 👎👎👎👎";
        guardarNivelEnLocalStorage(secuencia.length);
        actualizarGrafico();
    }
}

colores.forEach((color, index) => {
    color.addEventListener("click", () => manejarClick(index));
});

function guardarNivelEnLocalStorage(nivel) {
    const datos = JSON.parse(localStorage.getItem("niveles")) || [];
    const fecha = new Date().toLocaleDateString("es-ES");
    datos.push({ fecha, nivel });
    localStorage.setItem("niveles", JSON.stringify(datos));
}

function actualizarGrafico() {
    const datos = JSON.parse(localStorage.getItem("niveles")) || [];
    const etiquetas = datos.map(d => d.fecha);
    const niveles = datos.map(d => d.nivel);

    // Destruye gráfico anterior si existe
    if (window.miGrafico) {
        window.miGrafico.destroy();
    }

    window.miGrafico = new Chart(ctx, {
        type: "line",
        data: {
            labels: etiquetas,
            datasets: [{
                label: "Nivel alcanzado",
                data: niveles,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

actualizarGrafico();
start.addEventListener("click", reiniciarJuego);