// --- SISTEMA DE NAVEGACIÓN ---
function switchGame(gameNum) {
    document.getElementById('juego1').classList.add('hidden');
    document.getElementById('juego2').classList.add('hidden');
    document.getElementById('btn-game1').classList.remove('active');
    document.getElementById('btn-game2').classList.remove('active');

    document.getElementById(`juego${gameNum}`).classList.remove('hidden');
    document.getElementById(`btn-game${gameNum}`).classList.add('active');
    
    if(gameNum === 1) initGame1();
    if(gameNum === 2) initGame2();
}

// --- LOGICA JUEGO 1: ATOMIC ALCHEMY ---
let g1Score = 0;
let g1Time = 30;
let g1TimerInterval;
let currentTargetAtom = {};
let playerAtom = { p: 0, e: 0, n: 0 };

const elementsDb = [
    { name: "Aluminio (Al)", z: 13, a: 27, p: 13, e: 13, n: 14 },
    { name: "Estroncio (Sr)", z: 38, a: 88, p: 38, e: 38, n: 50 },
    { name: "Neón (Ne)", z: 10, a: 20, p: 10, e: 10, n: 10 },
    { name: "Oxígeno (O)", z: 8, a: 16, p: 8, e: 8, n: 8 }
];

function initGame1() {
    g1Score = 0;
    document.getElementById('g1-score').innerText = g1Score;
    nextAtom();
}

function nextAtom() {
    clearInterval(g1TimerInterval);
    playerAtom = { p: 0, e: 0, n: 0 };
    updateParticlesDisplay();
    document.getElementById('g1-feedback').innerText = "";
    
    currentTargetAtom = elementsDb[Math.floor(Math.random() * elementsDb.length)];
    document.getElementById('g1-target-name').innerText = currentTargetAtom.name;
    document.getElementById('g1-clues').innerText = `Z = ${currentTargetAtom.z}, A = ${currentTargetAtom.a}`;
    
    g1Time = 30;
    document.getElementById('g1-time').innerText = g1Time;
    g1TimerInterval = setInterval(() => {
        g1Time--;
        document.getElementById('g1-time').innerText = g1Time;
        if(g1Time <= 0) {
            clearInterval(g1TimerInterval);
            document.getElementById('g1-feedback').className = "feedback wrong";
            document.getElementById('g1-feedback').innerText = "¡Tiempo agotado! El átomo colapsó.";
        }
    }, 1000);
}

function changeParticle(type, amount) {
    playerAtom[type] = Math.max(0, playerAtom[type] + amount);
    updateParticlesDisplay();
}

function updateParticlesDisplay() {
    document.getElementById('val-p').innerText = playerAtom.p;
    document.getElementById('val-e').innerText = playerAtom.e;
    document.getElementById('val-n').innerText = playerAtom.n;
}

function checkAtomicGame() {
    if(g1Time <= 0) return;

    if(playerAtom.p === currentTargetAtom.p && 
       playerAtom.e === currentTargetAtom.e && 
       playerAtom.n === currentTargetAtom.n) {
        g1Score += 100;
        document.getElementById('g1-score').innerText = g1Score;
        document.getElementById('g1-feedback').className = "feedback correct";
        document.getElementById('g1-feedback').innerText = "¡Excelente! Átomo perfectamente estable.";
        clearInterval(g1TimerInterval);
        setTimeout(nextAtom, 2000);
    } else {
        document.getElementById('g1-feedback').className = "feedback wrong";
        document.getElementById('g1-feedback').innerText = "¡Inestable! Revisa los cálculos de Z y A.";
    }
}


// --- LOGICA JUEGO 2: FÓRMULA SPRINT ---
let g2Score = 0;
let g2Streak = 0;
let currentQuestion = {};

const quizDb = [
    { q: "¿Cuál es la fórmula sistemática con prefijos del PbO₂?", a: "Dióxido de plomo", o: ["Óxido de plomo", "Dióxido de plomo", "Monóxido de plomo", "Plomo de oxígeno"] },
    { q: "¿Cuál es la fórmula del compuesto FeH₃?", a: "Trihidruro de hierro", o: ["Hidruro de hierro", "Trihidruro de hierro", "Óxido férrico", "Dihidruro de hierro"] },
    { q: "Calcula la masa molecular del Butano (C₄H₁₀) si C=12u y H=1u.", a: "58 u", o: ["44 u", "58 u", "13 u", "50 u"] },
    { q: "¿Cuántos moles hay en 150g de NaCl? (Masa molar = 58,5 g/mol)", a: "2,56 moles", o: ["1,50 moles", "2,56 moles", "5,85 moles", "3,12 moles"] },
    { q: "¿Qué ión forma el Oxígeno (Z=8) al ganar 2 electrones?", a: "Anión O²⁻", o: ["Catión O²⁺", "Anión O²⁻", "Anión O⁻", "Catión O⁺"] }
];

function initGame2() {
    g2Score = 0;
    g2Streak = 0;
    document.getElementById('g2-score').innerText = g2Score;
    document.getElementById('g2-streak').innerText = g2Streak;
    nextQuestion();
}

function nextQuestion() {
    document.getElementById('g2-feedback').innerText = "";
    currentQuestion = quizDb[Math.floor(Math.random() * quizDb.length)];
    document.getElementById('g2-question').innerText = currentQuestion.q;
    
    const optionsContainer = document.getElementById('g2-options');
    optionsContainer.innerHTML = "";
    
    currentQuestion.o.forEach(option => {
        const btn = document.createElement('button');
        btn.className = "option-btn";
        btn.innerText = option;
        btn.onclick = () => checkQuizGame(option);
        optionsContainer.appendChild(btn);
    });
}

function checkQuizGame(selected) {
    if(selected === currentQuestion.a) {
        g2Score += 50 + (g2Streak * 10);
        g2Streak++;
        document.getElementById('g2-feedback').className = "feedback correct";
        document.getElementById('g2-feedback').innerText = "🔥 ¡Correcto! ¡Sigue así!";
    } else {
        g2Streak = 0;
        document.getElementById('g2-feedback').className = "feedback wrong";
        document.getElementById('g2-feedback').innerText = `Incorrecto. La respuesta era: ${currentQuestion.a}`;
    }
    
    document.getElementById('g2-score').innerText = g2Score;
    document.getElementById('g2-streak').innerText = g2Streak;
    
    setTimeout(nextQuestion, 2000);
}

// Iniciar el primer juego de entrada
window.onload = () => {
    initGame1();
};
