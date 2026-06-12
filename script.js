let totalScore = 0;
let atomoActual = {};
let playerAtom = { p: 0, e: 0, n: 0 };
let currentJuego = 1;
let modoHerramienta = 'sumar'; // 'sumar' o 'restar'

// Base de datos obtenida directamente del temario oficial
const DB_ATOMOS = [
    { nombre: "Aluminio (Al)", pistas: "Z = 13, A = 27", p: 13, e: 13, n: 14 },
    { nombre: "Estroncio (Sr)", pistas: "Z = 38, A = 88", p: 38, e: 38, n: 50 },
    { nombre: "Neón (Ne)", pistas: "Z = 10, N = 10 (Estable)", p: 10, e: 10, n: 10 },
    { nombre: "Oxígeno (O)", pistas: "Z = 8, A = 16", p: 8, e: 8, n: 8 }
];

const DB_FISICA = [
    { q: "Conectamos una bombilla de R=500 Ω a una pila de V=9V. ¿Qué intensidad circula?", a: "0.018 A", o: ["0.018 A", "55.5 A", "4500 A", "1.8 A"] },
    { q: "Circulan 4 A por una plancha enchufada a la red de V=220V. ¿Cuál es su resistencia?", a: "55 Ω", o: ["880 Ω", "55 Ω", "0.018 Ω", "110 Ω"] },
    { q: "Estiramos 50 cm (0.5m) un muelle horizontal con K=1200 N/m. ¿Qué fuerza ejercemos?", a: "600 N", o: ["2400 N", "1200 N", "600 N", "60 N"] },
    { q: "Colgamos una masa de 2 kg (F=19.6N) de un muelle vertical con K=650 N/m. ¿Cuánto se estira?", a: "3 cm (0.03m)", o: ["3 cm (0.03m)", "15 cm (0.15m)", "30 cm (0.3m)", "1.3 cm (0.013m)"] }
];

function cambiarJuego(num) {
    currentJuego = num;
    document.getElementById('game1').classList.toggle('hidden', num !== 1);
    document.getElementById('game2').classList.toggle('hidden', num !== 2);
    document.getElementById('tab1').classList.toggle('active', num === 1);
    document.getElementById('tab2').classList.toggle('active', num === 2);
    
    document.getElementById('fb1').innerText = "";
    document.getElementById('fb2').innerText = "";

    if (num === 1) nuevoAtomo();
    if (num === 2) nuevaPreguntaFisica();
}

// --- JUEGO 1: CONSTRUCTOR ATÓMICO (CORREGIDO) ---
function nuevoAtomo() {
    playerAtom = { p: 0, e: 0, n: 0 };
    modoHerramienta = 'sumar'; // Reinicia el modo por comodidad al cambiar de pantalla
    setModoHerramienta('sumar');
    actualizarContadores();
    atomoActual = DB_ATOMOS[Math.floor(Math.random() * DB_ATOMOS.length)];
    document.getElementById('g1-nombre').innerText = atomoActual.nombre;
    document.getElementById('g1-pistas').innerText = atomoActual.pistas;
}

// Cambiar el estado global de la herramienta al pulsar los botones de modo
function setModoHerramienta(modo) {
    modoHerramienta = modo;
    document.getElementById('btn-mode-add').classList.toggle('active', modo === 'sumar');
    document.getElementById('btn-mode-sub').classList.toggle('active', modo === 'restar');
}

// Función de clic principal corregida: evalúa estrictamente el modo activo
function gestionarClic(tipo) {
    if (modoHerramienta === 'sumar') {
        playerAtom[tipo]++;
    } else if (modoHerramienta === 'restar') {
        if (playerAtom[tipo] > 0) {
            playerAtom[tipo]--;
        }
    }
    actualizarContadores();
}

// Atajo de accesibilidad: clic derecho siempre resta independientemente del modo
function gestionarClicDerecho(event, tipo) {
    event.preventDefault(); 
    if (playerAtom[tipo] > 0) {
        playerAtom[tipo]--;
    }
    actualizarContadores();
}

function actualizarContadores() {
    document.getElementById('c-p').innerText = playerAtom.p;
    document.getElementById('c-e').innerText = playerAtom.e;
    document.getElementById('c-n').innerText = playerAtom.n;
}

function validarAtomo() {
    const fb = document.getElementById('fb1');
    if (playerAtom.p === atomoActual.p && playerAtom.e === atomoActual.e && playerAtom.n === atomoActual.n) {
        fb.className = "feedback correct";
        fb.innerText = "✨ ¡Espectacular! Átomo estable y correcto. +100pts";
        totalScore += 100;
        document.getElementById('score').innerText = totalScore;
        setTimeout(nuevoAtomo, 1800);
    } else {
        fb.className = "feedback wrong";
        fb.innerText = "❌ Inestable. ¡Ajusta las partículas sumando o restando!";
    }
}

// --- JUEGO 2: CONECTOR ELÉCTRICO ---
function nuevaPreguntaFisica() {
    const p = DB_FISICA[Math.floor(Math.random() * DB_FISICA.length)];
    document.getElementById('g2-enunciado').innerText = p.q;
    
    const contenedor = document.getElementById('g2-opciones');
    contenedor.innerHTML = "";
    
    p.o.forEach(opt => {
        const b = document.createElement('button');
        b.className = "opt-btn";
        b.innerText = opt;
        b.onclick = () => verificarFisica(opt, p.a);
        contenedor.appendChild(b);
    });
}

function verificarFisica(elegida, correcta) {
    const fb = document.getElementById('fb2');
    if (elegida === correcta) {
        fb.className = "feedback correct";
        fb.innerText = "⚡ ¡Conexión perfecta! Circuito cerrado con éxito. +100pts";
        totalScore += 100;
        document.getElementById('score').innerText = totalScore;
        setTimeout(nuevaPreguntaFisica, 1800);
    } else {
        fb.className = "feedback wrong";
        fb.innerText = "💥 ¡Cortocircuito! Intenta con otra respuesta.";
    }
}

window.onload = () => {
    nuevoAtomo();
};
