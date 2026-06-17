let totalScore = 0;
let atomoActual = {};
let playerAtom = { p: 0, e: 0, n: 0 };
let currentJuego = 1;
let modoHerramienta = 'sumar'; 

// Variables globales para el Juego 2 (Fuerzas)
let g2AlargamientoCorrecto = 0;

// --- BASE DE DATOS JUEGO 1: 50 ELEMENTOS, IONES E ISÓTOPOS ---
const DB_ATOMOS = [
    { nombre: "Hidrógeno-1 (Átomo Neutro)", pistas: "Z = 1, A = 1", p: 1, e: 1, n: 0 },
    { nombre: "Deuterio (Isótopo de Hidrógeno)", pistas: "Z = 1, A = 2", p: 1, e: 1, n: 1 },
    { nombre: "Tritio (Isótopo de Hidrógeno)", pistas: "Z = 1, A = 3", p: 1, e: 1, n: 2 },
    { nombre: "Helio (He)", pistas: "Z = 2, A = 4", p: 2, e: 2, n: 2 },
    { nombre: "Litio (Li)", pistas: "Z = 3, A = 7", p: 3, e: 3, n: 4 },
    { nombre: "Catión Litio (Li⁺)", pistas: "Z = 3, A = 7, Carga = +1", p: 3, e: 2, n: 4 },
    { nombre: "Berilio (Be)", pistas: "Z = 4, A = 9", p: 4, e: 4, n: 5 },
    { nombre: "Boro (B)", pistas: "Z = 5, A = 11", p: 5, e: 5, n: 6 },
    { nombre: "Carbono-12 (Átomo Neutro)", pistas: "Z = 6, A = 12", p: 6, e: 6, n: 6 },
    { nombre: "Carbono-14 (Isótopo Radiactivo)", pistas: "Z = 6, A = 14", p: 6, e: 6, n: 8 },
    { nombre: "Nitrógeno (N)", pistas: "Z = 7, A = 14", p: 7, e: 7, n: 7 },
    { nombre: "Oxígeno (O)", pistas: "Z = 8, A = 16", p: 8, e: 8, n: 8 },
    { nombre: "Anión Óxido (O²⁻)", pistas: "Z = 8, A = 16, Carga = -2", p: 8, e: 10, n: 8 },
    { nombre: "Flúor (F)", pistas: "Z = 9, A = 19", p: 9, e: 9, n: 10 },
    { nombre: "Anión Fluoruro (F⁻)", pistas: "Z = 9, A = 19, Carga = -1", p: 9, e: 10, n: 10 },
    { nombre: "Neón (Ne)", pistas: "Z = 10, A = 20", p: 10, e: 10, n: 10 },
    { nombre: "Sodio (Na)", pistas: "Z = 11, A = 23", p: 11, e: 11, n: 12 },
    { nombre: "Catión Sodio (Na⁺)", pistas: "Z = 11, A = 23, Carga = +1", p: 11, e: 10, n: 12 },
    { nombre: "Magnesio (Mg)", pistas: "Z = 12, A = 24", p: 12, e: 12, n: 12 },
    { nombre: "Catión Magnesio (Mg²⁺)", pistas: "Z = 12, A = 24, Carga = +2", p: 12, e: 10, n: 12 },
    { nombre: "Aluminio (Al)", pistas: "Z = 13, A = 27", p: 13, e: 13, n: 14 },
    { nombre: "Catión Aluminio (Al³⁺)", pistas: "Z = 13, A = 27, Carga = +3", p: 13, e: 10, n: 14 },
    { nombre: "Silicio (Si)", pistas: "Z = 14, A = 28", p: 14, e: 14, n: 14 },
    { nombre: "Fósforo (P)", pistas: "Z = 15, A = 31", p: 15, e: 15, n: 16 },
    { nombre: "Azufre (S)", pistas: "Z = 16, A = 32", p: 16, e: 16, n: 16 },
    { nombre: "Anión Sulfuro (S²⁻)", pistas: "Z = 16, A = 32, Carga = -2", p: 16, e: 18, n: 16 },
    { nombre: "Cloro-35 (Átomo Neutro)", pistas: "Z = 17, A = 35", p: 17, e: 17, n: 18 },
    { nombre: "Cloro-37 (Isótopo)", pistas: "Z = 17, A = 37", p: 17, e: 17, n: 20 },
    { nombre: "Anión Cloruro (Cl⁻)", pistas: "Z = 17, A = 35, Carga = -1", p: 17, e: 18, n: 18 },
    { nombre: "Argón (Ar)", pistas: "Z = 18, A = 40", p: 18, e: 18, n: 22 },
    { nombre: "Potasio (K)", pistas: "Z = 19, A = 39", p: 19, e: 19, n: 20 },
    { nombre: "Catión Potasio (K⁺)", pistas: "Z = 19, A = 39, Carga = +1", p: 19, e: 18, n: 20 },
    { nombre: "Calcio (Ca)", pistas: "Z = 20, A = 40", p: 20, e: 20, n: 20 },
    { nombre: "Catión Calcio (Ca²⁺)", pistas: "Z = 20, A = 40, Carga = +2", p: 20, e: 18, n: 20 },
    { nombre: "Escandio (Sc)", pistas: "Z = 21, A = 45", p: 21, e: 21, n: 24 },
    { nombre: "Titanio (Ti)", pistas: "Z = 22, A = 48", p: 22, e: 22, n: 26 },
    { nombre: "Vanadio (V)", pistas: "Z = 23, A = 51", p: 23, e: 23, n: 28 },
    { nombre: "Cromo (Cr)", pistas: "Z = 24, A = 52", p: 24, e: 24, n: 28 },
    { nombre: "Manganeso (Mn)", pistas: "Z = 25, A = 55", p: 25, e: 25, n: 30 },
    { nombre: "Hierro-56 (Átomo Neutro)", pistas: "Z = 26, A = 56", p: 26, e: 26, n: 30 },
    { nombre: "Catión Hierro (Fe²⁺)", pistas: "Z = 26, A = 56, Carga = +2", p: 26, e: 24, n: 30 },
    { nombre: "Catión Hierro (Fe³⁺)", pistas: "Z = 26, A = 56, Carga = +3", p: 26, e: 23, n: 30 },
    { nombre: "Cobalto (Co)", pistas: "Z = 27, A = 59", p: 27, e: 27, n: 32 },
    { nombre: "Níquel (Ni)", pistas: "Z = 28, A = 59", p: 28, e: 28, n: 31 },
    { nombre: "Cobre (Cu)", pistas: "Z = 29, A = 64", p: 29, e: 29, n: 35 },
    { nombre: "Zinc (Zn)", pistas: "Z = 30, A = 65", p: 30, e: 30, n: 35 },
    { nombre: "Galio (Ga)", pistas: "Z = 31, A = 70", p: 31, e: 31, n: 39 },
    { nombre: "Germanio (Ge)", pistas: "Z = 32, A = 73", p: 32, e: 32, n: 41 },
    { nombre: "Arsénico (As)", pistas: "Z = 33, A = 75", p: 33, e: 33, n: 42 },
    { nombre: "Estroncio (Sr)", pistas: "Z = 38, A = 88", p: 38, e: 38, n: 50 }
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
    if (num === 2) generarDesafioFuerzas();
}

// --- JUEGO 1: EL CONSTRUCTOR ATÓMICO ---
function nuevoAtomo() {
    playerAtom = { p: 0, e: 0, n: 0 };
    modoHerramienta = 'sumar';
    setModoHerramienta('sumar');
    actualizarContadores();
    atomoActual = DB_ATOMOS[Math.floor(Math.random() * DB_ATOMOS.length)];
    document.getElementById('g1-nombre').innerText = atomoActual.nombre;
    document.getElementById('g1-pistas').innerText = atomoActual.pistas;
}

function setModoHerramienta(modo) {
    modoHerramienta = modo;
    document.getElementById('btn-mode-add').classList.toggle('active', modo === 'sumar');
    document.getElementById('btn-mode-sub').classList.toggle('active', modo === 'restar');
}

function gestionarClic(tipo) {
    if (modoHerramienta === 'sumar') {
        playerAtom[tipo]++;
    } else if (modoHerramienta === 'restar') {
        if (playerAtom[tipo] > 0) playerAtom[tipo]--;
    }
    actualizarContadores();
}

function gestionarClicDerecho(event, tipo) {
    event.preventDefault(); 
    if (playerAtom[tipo] > 0) playerAtom[tipo]--;
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
        fb.innerText = "⭐ ¡ÁTOMO CORRECTO! Configuración en perfecto equilibrio. +100 PTS";
        totalScore += 100;
        document.getElementById('score').innerText = totalScore;
        setTimeout(nuevoAtomo, 1500);
    } else {
        fb.className = "feedback wrong";
        fb.innerText = "❌ INESTABLE. Revisa los valores de las partículas.";
    }
}

// --- JUEGO 2: EL DINAMÓMETRO (SÚPER DIRECTO Y SENCILLO) ---
function generarDesafioFuerzas() {
    document.getElementById('fb2').innerText = "";
    
    // Parejas de números redondos muy fáciles para calcular mentalmente en cm
    // Estiramiento (m) = F / K. Luego pasamos a cm (m * 100)
    const combinacionesSencillas = [
        { f: 10, k: 10, cm: 100 },
        { f: 20, k: 20, cm: 100 },
        { f: 5,  k: 10, cm: 50 },
        { f: 15, k: 30, cm: 50 },
        { f: 40, k: 20, cm: 200 },
        { f: 30, k: 10, cm: 300 },
        { f: 8,  k: 4,  cm: 200 },
        { f: 50, k: 50, cm: 100 }
    ];
    
    const desafio = combinacionesSencillas[Math.floor(Math.random() * combinacionesSencillas.length)];
    g2AlargamientoCorrecto = desafio.cm;
    
    // Mostramos los datos de forma plana e industrial
    document.getElementById('g2-fuerza').innerText = desafio.f + " N";
    document.getElementById('g2-constante').innerText = desafio.k + " N/m";
    
    // Generamos las 3 opciones de respuesta (la correcta y dos alternativas incorrectas aleatorias)
    const opcionesContenedor = document.getElementById('g2-opciones');
    opcionesContenedor.innerHTML = "";
    
    const respuestasPosibles = [
        desafio.cm,
        desafio.cm + 50,
        desafio.cm === 50 ? 150 : desafio.cm - 50
    ];
    
    // Mezclamos el orden de las respuestas
    respuestasPosibles.sort(() => Math.random() - 0.5);
    
    respuestasPosibles.forEach(opcion => {
        const btn = document.createElement('button');
        btn.className = "opt-btn";
        btn.innerText = opcion + " cm";
        btn.onclick = () => verificarRespuestaFuerza(opcion);
        opcionesContenedor.appendChild(btn);
    });
}

function verificarRespuestaFuerza(seleccionada) {
    const fb = document.getElementById('fb2');
    
    if (seleccionada === g2AlargamientoCorrecto) {
        fb.className = "feedback correct";
        fb.innerText = "⭐ ¡CORRECTO! El dinamómetro marca el estiramiento exacto. +100 PTS";
        totalScore += 100;
        document.getElementById('score').innerText = totalScore;
        setTimeout(generarDesafioFuerzas, 1500);
    } else {
        fb.className = "feedback wrong";
        fb.innerText = "❌ INCORRECTO. Recuerda aplicar la Ley de Hooke (F = K · x).";
    }
}

window.onload = () => {
    nuevoAtomo();
};
