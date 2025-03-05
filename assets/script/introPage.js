/******************************************************
 * introPage.js
 ******************************************************/

/**
   * Transitions entre les blocs.
   *
   * Clé = "blockX" (la classe du bloc).
   * Valeur = un objet { yes: "blockY", no: "blockZ" }, ou "function" pour lancer du code.
   *
   * - block1: yes → block6, no → block2
   * - block2: yes → block5, no → block3
   * - block3: yes → block5, no → block4
   * - block4: oui, 2 × (yes) → block5 (on ne gère pas "no")
   * - block5: oui, 2 × (yes) → block6
   * - block6: yes → déclenche juste une fonction (pas de nouveau bloc)
   */
const transitions = {
    'block1': { yes: 'block6', no: 'block2' },
    'block2': { yes: 'block5', no: 'block3' },
    'block3': { yes: 'block5', no: 'block4' },
    'block4': { yes: 'block5' }, // les deux spans = yes => bloc5
    'block5': { yes: 'block6' }, // les deux spans = yes => bloc6
    'block6': { yes: 'function' } // un seul span = yes => fonction
};

/**
 * Affiche un bloc (blockX) sans cacher les autres
 */
function showBlock(blockClass) {
    const block = document.querySelector('.' + blockClass);
    if (block) {
        block.style.display = 'block'; // on cumule l'affichage
    } else {
        console.warn('Bloc introuvable :', blockClass);
    }
}

/**
 * À l’écoute des clics sur tous les éléments .choice
 */
document.querySelectorAll('.choice').forEach(span => {
    span.addEventListener('click', (event) => {
        const answer = event.target.dataset.answer;  // "yes" ou "no"
        const parentPre = event.target.closest('pre');
        if (!parentPre) return;

        // Récup classe block1, block2... Ex. "block1"
        const blockClass = [...parentPre.classList].find(c => c.startsWith('block'));
        if (!blockClass) return;

        // Désactiver les clics dans ce bloc pour ne plus pouvoir y recliquer
        parentPre.style.pointerEvents = 'none';

        // Chercher la transition correspondante
        // ex. transitions['block1'][yes] => 'block6'
        const next = transitions[blockClass]?.[answer];
        if (!next) {
            console.log(`Pas de transition pour ${blockClass} avec réponse: ${answer}`);
            return;
        }

        // Si la transition = "function", on exécute un code final au lieu d'afficher un bloc
        if (next === 'function') {
            const introPage = document.querySelector('.intro-page');
            introPage.style.opacity = '0';
            setTimeout(() => {
                introPage.style.display = 'none';
            }, 1000);

            return;
        }

        showBlock(next);
    });
});