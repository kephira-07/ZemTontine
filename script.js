document.addEventListener("DOMContentLoaded", () => {
    // Initialisation de AOS (Animations légères)
    AOS.init({
        once: true,
        duration: 800,
        offset: 60
    });
    
    // Initialisation du simulateur interactif
    initSimulator();

    // Gestion du Menu Mobile
    const menuBtn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const line3 = document.getElementById('line3');

    if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
            
            // Animation de l'icône burger en croix de façon organique
            if (menu.classList.contains('hidden')) {
                line1.style.transform = "none";
                line2.style.opacity = "1";
                line3.style.transform = "none";
            } else {
                line1.style.transform = "translateY(8px) rotate(45deg)";
                line2.style.opacity = "0";
                line3.style.transform = "translateY(-8px) rotate(-45deg)";
            }
        });

        // Fermer le menu mobile lors du clic sur un lien interne
        const links = menu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('hidden');
                line1.style.transform = "none";
                line2.style.opacity = "1";
                line3.style.transform = "none";
            });
        });
    }
});

// Fonction du simulateur financier
function initSimulator() {
    const regInput = document.getElementById('regInput');
    const ancInput = document.getElementById('ancInput');
    const regVal = document.getElementById('regVal');
    const ancVal = document.getElementById('ancVal');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const creditDisplay = document.getElementById('creditDisplay');
    
    const badgeCarb = document.getElementById('badgeCarb');
    const badgeScol = document.getElementById('badgeScol');

    if (!regInput || !ancInput) return;

    function calculate() {
        const reg = parseInt(regInput.value);
        const anc = parseInt(ancInput.value);

        // Mises à jour des étiquettes textuelles locales
        regVal.innerText = `${reg} jours / 7`;
        ancVal.innerText = `${anc} mois d'activité`;

        // Calcul du score de confiance
        const baseScore = 25;
        const regScore = reg * 8; // Max 56
        const ancScore = Math.min(anc * 2.5, 20); // Max 20
        const finalScore = Math.min(Math.round(baseScore + regScore + ancScore), 100);

        // Rendu du score
        scoreDisplay.innerHTML = `${finalScore} <span class="text-lg text-togoSand/60 font-normal">/100</span>`;

        // Calcul de la capacité de crédit en FCFA
        let creditAmount = 0;
        if (finalScore >= 40) {
            creditAmount = (finalScore - 30) * 1200;
        }
        
        // Séparateur de milliers pour le format monétaire africain (FCFA)
        const formattedCredit = creditAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " FCFA";
        creditDisplay.innerText = creditAmount > 0 ? formattedCredit : "0 FCFA (Épargnez encore)";

        // Activation dynamique des paliers de confiance avec les nouvelles couleurs Logo
        if (finalScore >= 55) {
            badgeCarb.className = "p-3.5 rounded-xl border border-logoEmerald/40 bg-logoEmerald/10 text-logoEmerald text-center scale-105 shadow-lg shadow-logoEmerald/5 transition-all duration-300";
        } else {
            badgeCarb.className = "p-3.5 rounded-xl border border-white/5 text-togoSand/40 text-center scale-100 transition-all duration-300";
        }

        if (finalScore >= 80) {
            badgeScol.className = "p-3.5 rounded-xl border border-logoEmerald/40 bg-logoEmerald/10 text-logoEmerald text-center scale-105 shadow-lg shadow-logoEmerald/5 transition-all duration-300";
        } else {
            badgeScol.className = "p-3.5 rounded-xl border border-white/5 text-togoSand/40 text-center scale-100 transition-all duration-300";
        }
    }

    regInput.addEventListener('input', calculate);
    ancInput.addEventListener('input', calculate);

    calculate(); // Calcul immédiat au chargement de la page
}

// Gestion des accordéons FAQ
function toggleFaq(id) {
    const answer = document.getElementById('ans-' + id);
    const icon = document.getElementById('icon-' + id);
    
    if (!answer || !icon) return;

    if (answer.classList.contains('hidden')) {
        answer.classList.remove('hidden');
        icon.innerText = "−";
        icon.style.transform = "rotate(180deg)";
        icon.style.color = "#C2410C"; // Activation couleur latérite
    } else {
        answer.classList.add('hidden');
        icon.innerText = "+";
        icon.style.transform = "rotate(0deg)";
        icon.style.color = "#059669"; // Retour au Vert Émeraude du logo
    }
}