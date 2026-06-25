// 1. INITIALISATION DES ANIMATIONS ET DE LA LOGIQUE COMPLÈTE
document.addEventListener("DOMContentLoaded", () => {
    // Initialisation fluide de AOS (Animations au défilement)
    AOS.init({
        once: true,      // Joue l'animation une seule fois au défilement
        duration: 800,   // Durée de l'animation en millisecondes
        offset: 80       // Déclenchement anticipé de l'affichage
    });
    
    // Initialisation du simulateur
    initSimulator();
});

// 2. LOGIQUE DU SIMULATEUR DE PERFORMANCE ET DE SCORE
function initSimulator() {
    const regInput = document.getElementById('regInput');
    const ancInput = document.getElementById('ancInput');
    const regVal = document.getElementById('regVal');
    const ancVal = document.getElementById('ancVal');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const badgeCarb = document.getElementById('badgeCarb');
    const badgeScol = document.getElementById('badgeScol');

    // Sortie immédiate si un des éléments manque à l'appel
    if (!regInput || !ancInput) return;

    function calculateScore() {
        const reg = parseInt(regInput.value);
        const anc = parseInt(ancInput.value);
        
        // Mise à jour visuelle des chiffres sous les curseurs
        regVal.innerText = `${reg} / 10`;
        ancVal.innerText = `${anc} mois`;

        // Calcul dynamique optimisé (Formule équilibrée)
        const totalScore = Math.min(Math.round(45 + (reg * 4.2) + (anc * 1.3)), 100);
        scoreDisplay.innerHTML = `${totalScore} <span class="text-lg text-white font-normal">/100</span>`;

        // Gestion de l'allumage progressif et premium des badges d'objectifs
        if (totalScore >= 62) {
            badgeCarb.className = "p-4 rounded-xl border border-[#F59E0B]/40 bg-[#F59E0B]/10 text-[#F59E0B] transition-all duration-300 scale-105 shadow-md shadow-[#F59E0B]/5";
        } else {
            badgeCarb.className = "p-4 rounded-xl border border-white/5 text-slate-500 transition-all duration-300 scale-100";
        }

        if (totalScore >= 82) {
            badgeScol.className = "p-4 rounded-xl border border-[#F59E0B]/40 bg-[#F59E0B]/10 text-[#F59E0B] transition-all duration-300 scale-105 shadow-md shadow-[#F59E0B]/5";
        } else {
            badgeScol.className = "p-4 rounded-xl border border-white/5 text-slate-500 transition-all duration-300 scale-100";
        }
    }

    // Écoute des événements sur les inputs en temps réel
    regInput.addEventListener('input', calculateScore);
    ancInput.addEventListener('input', calculateScore);
    
    // Premier calcul au chargement de la page
    calculateScore();
}

// 3. INTERACTION DE LA FAQ (ACCORDÉONS SIMPLES)
function toggleFaq(id) {
    const answer = document.getElementById('ans-' + id);
    const icon = document.getElementById('icon-' + id);
    
    if (!answer || !icon) return;

    if (answer.classList.contains('hidden')) {
        answer.classList.remove('hidden');
        icon.style.transform = "rotate(45deg)"; // Le + devient une croix de fermeture de façon fluide
        icon.style.color = "#F59E0B";          // Changement vers l'accent safran
    } else {
        answer.classList.add('hidden');
        icon.style.transform = "rotate(0deg)";
        icon.style.color = "#1D4ED8";          // Retour au bleu corporate
    }
}