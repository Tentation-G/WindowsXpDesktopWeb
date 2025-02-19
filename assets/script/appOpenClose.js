/******************************************************
 * appOpenClose.js
 ******************************************************/

/***************************************************
 *  Import pages pour fonctions
 ***************************************************/
import { bringWindowToFront, lowerZIndex, topZIndex } from "./commonZindex.js";

/***************************************************
 * Choix du mode de positionnement :
 *   "cascade" ou "random" ou "center"
 ***************************************************/
const POSITION_MODE = "random";

/***************************************************
 * Variables pour le mode Cascade
 ***************************************************/
let cascadeCount = 0;

/***************************************************
 * OUVERTURE (double-clic sur l'icône .icon)
 ***************************************************/
document.querySelectorAll(".icon").forEach((icon) => {
    icon.addEventListener("dblclick", () => {
        const targetGroup = icon.getAttribute("data-target");
        if (!targetGroup) return;

        const relatedWindows = document.querySelectorAll(
            `.window[data-target-group="${targetGroup}"]`
        );

        if (relatedWindows.length === 0) return;

        const footerItem = document.querySelector(
            `.taskbar [data-target-group="${targetGroup}"]`
        );


        relatedWindows.forEach((win) => {
            // Si la fenêtre est déjà ouverte
            if (win.style.display === "flex") {
                // On la ramène éventuellement au 1er plan
                if (typeof bringWindowToFront === "function") {
                    bringWindowToFront(win);
                }
                return;
            }

            // Sinon, on l'affiche
            win.style.display = "flex";

            // On applique la logique de positionnement
            switch (POSITION_MODE) {
                case "cascade":
                    positionWindowCascade(win);
                    break;
                case "random":
                    positionWindowRandom(win);
                    break;
                case "center":
                default:
                    positionWindowCenter(win);
                    break;
            }

            // On met la fenêtre au premier plan
            if (typeof bringWindowToFront === "function") {
                bringWindowToFront(win);
            }
        });

        // 3) Affiche l'élément du footer (s’il existe)
        if (footerItem) {
            footerItem.style.display = "flex";
        }

        // 4) Si c’est un dossier (folder-icon), on passe en "Open folder"
        if (icon.classList.contains("folder-icon")) {
            const iconImg = icon.querySelector("img");
            if (iconImg) {
                iconImg.src = "assets/img/icones/Open folder.png";
            }
        }
    });
});

/***************************************************
 * FERMETURE (bouton X)
 ***************************************************/
document.querySelectorAll('.window [aria-label="Close"]').forEach((btn) => {
    btn.addEventListener("click", () => {
        // Trouve la fenêtre parente du bouton
        const currentWindow = btn.closest(".window");
        if (!currentWindow) return;

        // Ferme la fenêtre
        currentWindow.style.display = "none";

        // Baisse le zIndex global pour les prochaines ouvertures
        lowerZIndex();

        // Récupère le groupe cible (ex: "txtRM")
        const targetGroup = currentWindow.getAttribute("data-target-group");
        if (!targetGroup) return;

        // Vérifie si c'est la dernière fenêtre ouverte avec ce groupe
        // Si oui, on peut aussi masquer le footerItem
        // => on va voir combien de fenêtres du même groupe sont encore affichées
        const otherOpenedWindows = document.querySelectorAll(
            `.window[data-target-group="${targetGroup}"]`
        );
        const stillOpen = [...otherOpenedWindows].some(win => win.style.display === "flex");

        // Si plus AUCUNE fenêtre de ce groupe n'est affichée, on masque le footer
        if (!stillOpen) {
            const footerItem = document.querySelector(
                `.taskbar [data-target-group="${targetGroup}"]`
            );
            if (footerItem) {
                footerItem.style.display = "none";
            }
        }

        // Récupère l'icône qui a data-target="txtRM"
        const relatedIcon = document.querySelector(`.icon[data-target="${targetGroup}"]`);
        if (!relatedIcon) return;

        // Si c’est un folder-icon, on repasse en "Closed folder"
        if (relatedIcon.classList.contains("folder-icon")) {
            const iconImg = relatedIcon.querySelector("img");
            if (iconImg) {
                iconImg.src = "assets/img/icones/Closed folder.png";
            }
        }
    });
});

/***************************************************
 * FONCTIONS DE POSITIONNEMENT
 ***************************************************/

// Positionne la fenêtre au centre
function positionWindowCenter(win) {
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const w = win.offsetWidth;
    const h = win.offsetHeight;
    win.style.left = (winWidth - w) / 2 + "px";
    win.style.top = (winHeight - h) / 2 + "px";
}

// Positionne la fenêtre en "cascade"
function positionWindowCascade(win) {
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const w = win.offsetWidth;
    const h = win.offsetHeight;

    // Centre de base
    const baseLeft = (winWidth - w) / 2;
    const baseTop = (winHeight - h) / 2;

    // Décalage en fonction du nombre de fenêtres ouvertes
    const offset = 30 * cascadeCount;
    let newLeft = baseLeft + offset;
    let newTop = baseTop + offset;

    // Empêche de dépasser l'écran (optionnel)
    if (newLeft + w > winWidth) {
        newLeft = winWidth - w;
    }
    if (newTop + h > winHeight) {
        newTop = winHeight - h;
    }

    win.style.left = newLeft + "px";
    win.style.top = newTop + "px";

    cascadeCount++;
}

// Positionne la fenêtre à un emplacement aléatoire
function positionWindowRandom(win) {
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const w = win.offsetWidth;
    const h = win.offsetHeight;

    const maxLeft = winWidth - w;
    const maxTop = winHeight - h;

    const randomLeft = Math.floor(Math.random() * maxLeft);
    const randomTop = Math.floor(Math.random() * maxTop);

    win.style.left = randomLeft + "px";
    win.style.top = randomTop + "px";
}
