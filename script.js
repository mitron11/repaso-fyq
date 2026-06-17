let totalScore = 0;
let atomoActual = {};
let playerAtom = { p: 0, e: 0, n: 0 };
let currentJuego = 1;
let modoHerramienta = 'sumar'; 

let g2RespuestaCorrecta = 0;

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

const DB_FUERZAS = [
    { f: 10, k: 100, x: 10 },   { f: 20, k: 100, x: 20 },   { f: 50, k: 500, x: 10 },   { f: 5, k: 50, x: 10 },
    { f: 15, k: 300, x: 5 },    { f: 40, k: 200, x: 20 },   { f: 30, k: 150, x: 20 },   { f: 8, k: 40, x: 20 },
    { f: 100, k: 500, x: 20 },  { f: 60, k: 200, x: 30 },   { f: 25, k: 250, x: 10 },   { f: 12, k: 60, x: 20 },
    { f: 9, k: 30, x: 30 },     { f: 18, k: 60, x: 30 },    { f: 4, k: 20, x: 20 },     { f: 35, k: 70, x: 50 },
    { f: 14, k: 28, x: 50 },    { f: 80, k: 400, x: 20 },   { f: 75, k: 150, x: 50 },   { f: 200, k: 1000, x: 20 },
    { f: 50, k: 100, x: 50 },   { f: 3, k: 30, x: 10 },     { f: 7, k: 70, x: 10 },     { f: 24, k: 120, x: 20 },
    { f: 45, k: 90, x: 50 },    { f: 16, k: 80, x: 20 },    { f: 27, k: 90, x: 30 },    { f: 11, k: 22, x: 50 },
    { f: 90, k: 300, x: 30 },   { f: 120, k: 400, x: 30 },  { f: 6, k: 12, x: 50 },     { f: 2, k: 10, x: 20 },
    { f: 15, k: 50, x: 30 },    { f: 21, k: 70, x: 30 },    { f: 32, k: 160, x: 20 },   { f: 13, k: 26, x: 50 },
    { f: 70, k: 350, x: 20 },   { f: 22, k: 110, x: 20 },   { f: 10, k: 20, x: 50 },    { f: 300, k: 1200, x: 25 }
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
    if (num === 2) generarDesafioDespeje();
}

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
    if (modoHerramienta === 'sumar') playerAtom[tipo]++;
    else if (modoHerramienta === 'restar' && playerAtom[tipo] > 0) playerAtom[tipo]--;
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

function generarDesafioDespeje() {
    document.getElementById('fb2').innerText = "";
    
    const ejercicio = DB_FUERZAS[Math.floor(Math.random() * DB_FUERZAS.length)];
    
    const tipoIncognita = Math.floor(Math.random() * 3);
    
    const panelDato1Lbl = document.getElementById('lbl-g2-dato1');
    const panelDato1Val = document.getElementById('val-g2-dato1');
    const panelDato2Lbl = document.getElementById('lbl-g2-dato2');
    const panelDato2Val = document.getElementById('val-g2-dato2');
    const enunciado = document.getElementById('g2-enunciado-incognita');
    
    let opciones = [];
    
    if (tipoIncognita === 0) {
        panelDato1Lbl.innerText = "FUERZA APLICADA";
        panelDato1Val.innerText = ejercicio.f + " N";
        panelDato2Lbl.innerText = "CONSTANTE (K)";
        panelDato2Val.innerText = ejercicio.k + " N/m";
        enunciado.innerText = "¿CUÁL ES EL ALARGAMIENTO (x)?";
        
        g2RespuestaCorrecta = ejercicio.x;
        opciones = [ejercicio.x, ejercicio.x + 10, ejercicio.x === 10 ? 40 : ejercicio.x - 5];
        formatUnit = " cm";
    } else if (tipoIncognita === 1) {
        panelDato1Lbl.innerText = "CONSTANTE (K)";
        panelDato1Val.innerText = ejercicio.k + " N/m";
        panelDato2Lbl.innerText = "ALARGAMIENTO (x)";
        panelDato2Val.innerText = ejercicio.x + " cm";
        enunciado.innerText = "¿CUÁNTA FUERZA (F) SE HA HECHO?";
        
        g2RespuestaCorrecta = ejercicio.f;
        opciones = [ejercicio.f, ejercicio.f + 15, ejercicio.f <= 10 ? 50 : ejercicio.f - 8];
        formatUnit = " N";
    } else {
        panelDato1Lbl.innerText = "FUERZA APLICADA";
        panelDato1Val.innerText = ejercicio.f + " N";
        panelDato2Lbl.innerText = "ALARGAMIENTO (x)";
        panelDato2Val.innerText = ejercicio.x + " cm";
        enunciado.innerText = "¿CUÁL ES LA CONSTANTE ELÁSTICA (K)?";
        
        g2RespuestaCorrecta = ejercicio.k;
        opciones = [ejercicio.k, ejercicio.k + 100, ejercicio.k <= 50 ? 200 : ejercicio.k - 40];
        formatUnit = " N/m";
    }
    
    opciones.sort(() => Math.random() - 0.5);
    
    const opcionesContenedor = document.getElementById('g2-opciones');
    opcionesContenedor.innerHTML = "";
    
    opciones.forEach(opc => {
        const btn = document.createElement('button');
        btn.className = "opt-btn";
        btn.innerText = opc + formatUnit;
        btn.onclick = () => verificarRespuestaDespeje(opc);
        opcionesContenedor.appendChild(btn);
    });
}

function verificarRespuestaDespeje(seleccionada) {
    const fb = document.getElementById('fb2');
    
    if (seleccionada === g2RespuestaCorrecta) {
        fb.className = "feedback correct";
        fb.innerText = "⭐ ¡CORRECTO! Despeje y cálculo impecables. +100 PTS";
        totalScore += 100;
        document.getElementById('score').innerText = totalScore;
        setTimeout(generarDesafioDespeje, 1500);
    } else {
        fb.className = "feedback wrong";
        fb.innerText = "❌ INCORRECTO. Revisa bien los despejes de la Ley de Hooke.";
    }
}

window.onload = () => {
    nuevoAtomo();
};
