/******************************************************
 * appOpenClose.js
 ******************************************************/

/***************************************************
 *  Import page.s pour fonction.s
 ***************************************************/
import { bringWindowToFront,lowerZIndex, topZIndex } from "./commonZindex.js";

/***************************************************
 * Choix du mode de positionnement :
 *   "cascade" ou "random"
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
        const targetId = icon.getAttribute("data-target");
        const relatedWindow = document.getElementById(targetId);
        if (!relatedWindow) return;

        // Si déjà ouvert
        if (relatedWindow.style.display === "flex") {
            return;
        }

        // On affiche la fenêtre
        relatedWindow.style.display = "flex";

        // On positionne selon le mode choisi
        if (POSITION_MODE === "cascade") {
            positionWindowCascade(relatedWindow);
        } else if (POSITION_MODE === "random") {
            positionWindowRandom(relatedWindow);
        } else {
            positionWindowCenter(relatedWindow);
        }

        // On la met au premier plan (nécessite bringWindowToFront(win) global)
        if (typeof bringWindowToFront === "function") {
            bringWindowToFront(relatedWindow);
        }

        // Si c’est un dossier (folder-icon), on passe en "Open folder"
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
        const currentWindow = btn.closest(".window");
        currentWindow.style.display = "none";

        // Baisser le zIdex pour futur ouverture de fenetre
        lowerZIndex(); 

        // Récupérer l'icône associée
        const windowId = currentWindow.id;
        const relatedIcon = document.querySelector(`.icon[data-target="${windowId}"]`);
        if (!relatedIcon) return;

        // Si c’est un folder-icon, remettre en "Closed folder"
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

    // S'assurer de ne pas dépasser l'écran (optionnel)
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
