/******************************************************
 * introPage.js
 ******************************************************/

/* Variables globales pour la vitesse d'animation */
const DEFAULT_DELAY = 50; // Vitesse pour tous les blocs
const BLOCK_DELAY = 200; // Vitesse pour les blocs avec la classe "delay"

/* Son de lancement */
const lauchingSound = new Audio("assets/img/mp3/Windows xp startup.mp3");

/**
 * Transitions entre les blocs.
 *
 * Clé = "blockX" (la classe du bloc).
 * Valeur = un objet { yes: "blockY", no: "blockZ" }, ou "function" pour lancer du code.
 *
 * - block1: yes → block6, no → block2
 * - block2: yes → block5, no → block3
 * - block3: yes → block5, no → block4
 * - block4: (deux clics sur yes) → block5
 * - block5: (deux clics sur yes) → block6
 * - block6: yes → block8, no → block7
 * - block7: yes → function
 * - block8: yes → function
 */
const transitions = {
    'block1': { yes: 'block6', no: 'block2' },
    'block2': { yes: 'block5', no: 'block3' },
    'block3': { yes: 'block5', no: 'block4' },
    'block4': { yes: 'block5' },
    'block5': { yes: 'block6' },
    'block6': { yes: 'block8', no: 'block7' },
    'block7': { yes: 'function' },
    'block8': { yes: 'function' }
};

/**
 * Affiche un bloc (blockX) sans masquer les autres.
 * Si le bloc est un <pre>, son contenu sera animé ligne par ligne.
 *
 * Pour définir un délai personnalisé (ici BLOCK6_DELAY), ajoutez la classe "delay" au bloc.
 *
 * @param {string} blockClass - La classe du bloc à afficher.
 */
function showBlock(blockClass) {
    const block = document.querySelector('.' + blockClass);
    if (block) {
        block.style.display = 'block'; // On cumule l'affichage
        scrollToBot();
        // Si le bloc est un <pre>, lancer l'animation ligne par ligne avec le délai approprié
        if (block.tagName.toLowerCase() === 'pre') {
            const delay = block.classList.contains('delay') ? BLOCK_DELAY : DEFAULT_DELAY;
            animatePreLines(block, delay);
        }
    } else {
        console.warn('Bloc introuvable :', blockClass);
    }
}

var myDiv = document.getElementById("intro-scroll");
function scrollToBot() {
    if (myDiv) {
        myDiv.scrollTop = myDiv.scrollHeight;
    }
}

/**
 * Affiche le contenu d'un élément <pre> ligne par ligne.
 *
 * Attention : cette fonction remplace le contenu original du <pre> et
 * donc les écouteurs d’événements qui auraient été attachés aux éléments internes.
 *
 * @param {HTMLElement|string} target - L'élément ou le sélecteur de l'élément <pre>.
 * @param {number} [delay=DEFAULT_DELAY] - Délai en millisecondes entre chaque ligne.
 */
function animatePreLines(target, delay = DEFAULT_DELAY) {
    // Si target est un sélecteur, récupérer l'élément correspondant
    const preElement = typeof target === 'string' ? document.querySelector(target) : target;
    if (!preElement) return;

    // Récupérer le contenu HTML et découper par saut de ligne
    const content = preElement.innerHTML;
    const lines = content.split('\n');

    // Vider l'affichage initial
    preElement.innerHTML = "";
    let index = 0;

    // Fonction récursive pour afficher ligne par ligne
    function showNextLine() {
        if (index < lines.length) {
            preElement.innerHTML += lines[index] + "\n";
            index++;
            setTimeout(showNextLine, delay);
            scrollToBot(); // regles les probleme de scroll
        }
    }

    showNextLine();
}

/**
 * Gestion de l'interaction sur les choix via délégation d'événements.
 * On écoute sur le document et on traite les clics sur les éléments ayant la classe "choice".
 */
document.addEventListener('click', (event) => {
    const choiceElem = event.target.closest('.choice');
    if (!choiceElem) return;
    
    const answer = choiceElem.dataset.answer;  // "yes" ou "no"
    const parentPre = choiceElem.closest('pre');
    if (!parentPre) return;

    // Récupérer la classe (ex: "block1", "block2", etc.) présente sur le <pre>
    const blockClass = Array.from(parentPre.classList).find(c => c.startsWith('block'));
    if (!blockClass) return;

    // Désactiver les clics dans ce bloc pour éviter les doubles déclenchements
    parentPre.style.pointerEvents = 'none';

    // Déterminer la transition correspondante
    const next = transitions[blockClass]?.[answer];
    if (!next) {
        console.log(`Pas de transition pour ${blockClass} avec réponse: ${answer}`);
        return;
    }

    // Si la transition est "function", exécuter le code final
    if (next === 'function') {
        const introPage = document.querySelector('.intro-page');
        if (introPage) {
            introPage.style.opacity = '0';
            lauchingSound.play();
            setTimeout(() => {
                introPage.style.display = 'none';
            }, 1000);
        }
        return;
    }

    // Afficher le bloc suivant
    showBlock(next);
});
