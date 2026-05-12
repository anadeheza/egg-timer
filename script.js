let secsTotales = 300 
let intervalo 
let restante

const mensaje = document.getElementById('message-container')
const alarma = document.getElementById('alarma')
const fondo = document.getElementById('fondo')

let minutos = document.getElementById('minutos')
let segundos = document.getElementById('segundos')
let iniciar = document.getElementById('iniciar')

function render(secsTotales) {
    let mins = Math.floor(secsTotales /  60 )
    let secs = secsTotales % 60  

    minutos.textContent = mins < 10 ? '0' + mins : mins 
    segundos.textContent = secs < 10 ? '0' + secs : secs  
}

function iniciarTemporizador() {
    iniciar.textContent = 'Reset'
    const puntoInicio = document.querySelector('input[name="inicio"]:checked').value;
    const tipoHuevo = document.getElementById('tipoHuevo').value;

    let tiempos = { liquido: 6, cremoso: 8, duro: 10 };
    let tiempo = tiempos[tipoHuevo];

    if (puntoInicio === 'fria') {
        tiempo += 3;
    }

    restante = tiempo * 60;
    render(restante);

    clearInterval(intervalo);

    mensaje.className = "msg-hidden"
    mensaje.textContent = ""
    alarma.pause()
    alarma.currentTime = 0 

    fondo.play()

    intervalo = setInterval(() => {
        restante--;
        render(restante);

        if (restante <= 0) {
            finalizar(intervalo);
        }
    }, 1000);
}

function finalizar() {
    clearInterval(intervalo)
    
    mensaje.textContent = "Saca tus huevos!"
    mensaje.className = "msg-visible"

    fondo.pause()

    vueltas = 0 
    reproducirFin()
}

function reproducirFin() {
    alarma.play()
    vueltas ++ 

    alarma.onended = () => {
        if(vueltas < 3) {
            alarma.play()
            vueltas++
        } else {
            alarma.onended = null 
        }
    }
}

iniciar.addEventListener('click', iniciarTemporizador);

document.getElementById('reiniciar').addEventListener('click', () => {
    clearInterval(intervalo);
    render(0);
    mensaje.className = "msg-hidden"
    alarma.pause()
    fondo.pause()
    alarma.currentTime = 0 
});
