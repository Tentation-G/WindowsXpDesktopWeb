/******************************************************
 * wdbtn.js
 * Gère : Minimize, Maximize/Restore, Close,
 *        + toggle via barre des tâches (taskbar-item).
 ******************************************************/

/***************************************************
 *  Import pour fonctions zIndex
 ***************************************************/
import { bringWindowToFront, topZIndex, lowerZIndex } from "./commonZindex.js";

/***************************************************
 * 1) GESTION DES BOUTONS DANS LE TITLE-BAR
 ***************************************************/
(() => {
    // Sélectionne le conteneur principal pour calculer
    // la taille en mode "maximize"
    const mainContainer = document.getElementById("mainContainer");

    // Sélection de toutes les fenêtres
    const windows = document.querySelectorAll(".window");

    windows.forEach((win) => {
        // Indicateur d'état maximisé
        win.dataset.isMaximized = "false";

        // Quand on clique sur la fenêtre, on la met au 1er plan
        win.addEventListener("mousedown", () => {
            bringWindowToFront(win);

        });

        // Trouve la barre de titre
        const titleBarControls = win.querySelector(".title-bar-controls");
        if (!titleBarControls) return;

        // On récupère dans l'ordre les 3 boutons éventuels
        const [minimizeBtn, maximizeBtn, closeBtn] =
            titleBarControls.querySelectorAll("button") || [];

        /****************************************
         * FONCTIONS INTERNES
         ****************************************/
        function doMaximize() {
            if (win.dataset.isMaximized === "true") return;

            // On sauvegarde la taille et la position actuelles
            win.dataset.originalLeft = win.style.left;
            win.dataset.originalTop = win.style.top;
            win.dataset.originalWidth = win.style.width;
            win.dataset.originalHeight = win.style.height;

            // Calcule la taille du mainContainer
            if (mainContainer) {
                const rect = mainContainer.getBoundingClientRect();
                win.style.left = "0px";
                win.style.top = "0px";
                win.style.width = rect.width + "px";
                win.style.height = rect.height + "px";
            } else {
                // Fallback si pas de mainContainer :
                // prendre la taille de la fenêtre viewport
                win.style.left = "0px";
                win.style.top = "0px";
                win.style.width = "100vw";
                win.style.height = "100vh";
            }

            // Passe en mode maximisé
            win.dataset.isMaximized = "true";
            bringWindowToFront(win);

            if (maximizeBtn) {
                maximizeBtn.setAttribute("aria-label", "Restore");
            }
        }

        function doRestore() {
            if (win.dataset.isMaximized !== "true") return;

            // Restaure la position et la taille d'origine
            win.style.left = win.dataset.originalLeft;
            win.style.top = win.dataset.originalTop;
            win.style.width = win.dataset.originalWidth;
            win.style.height = win.dataset.originalHeight;

            win.dataset.isMaximized = "false";
            bringWindowToFront(win);

            if (maximizeBtn) {
                maximizeBtn.setAttribute("aria-label", "Maximize");
            }
        }

        /****************************************
         * BOUTON MINIMIZE
         ****************************************/
        if (minimizeBtn) {
            minimizeBtn.addEventListener("click", () => {
                // Masque la fenêtre (comme un "minimize" XP)
                win.style.display = "none";
                // (Optionnel) On peut descendre le z-index si nécessaire
                if (typeof lowerZIndex === "function") {
                    lowerZIndex();
                }
            });
        }

        /****************************************
         * BOUTON MAXIMIZE
         ****************************************/
        if (maximizeBtn) {
            maximizeBtn.addEventListener("click", () => {
                if (win.dataset.isMaximized === "true") {
                    doRestore();
                } else {
                    doMaximize();
                }
            });
        }

        /****************************************
         * BOUTON CLOSE
         ****************************************/
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                // Ferme la fenêtre
                win.style.display = "none";
                win.dataset.isMaximized = "false";
                if (maximizeBtn) {
                    maximizeBtn.setAttribute("aria-label", "Maximize");
                }

                // Optionnel: On pourrait baisser le z-index
                if (typeof lowerZIndex === "function") {
                    lowerZIndex();
                }

                // Masquer le bouton de la barre des tâches
                // seulement s'il n'y a plus de fenêtre du même groupe
                const group = win.getAttribute("data-target-group");
                if (group) {
                    const otherWins = document.querySelectorAll(
                        `.window[data-target-group="${group}"]`
                    );
                    const stillOpen = [...otherWins].some(
                        (w) => w.style.display !== "none"
                    );
                    if (!stillOpen) {
                        const taskbarItem = document.querySelector(
                            `.taskbar-item[data-target="${group}"]`
                        );
                        if (taskbarItem) {
                            taskbarItem.style.display = "none";
                        }
                    }
                }
            });
        }
    });
})();

/***************************************************
 * 2) GESTION DU CLIC SUR LA BARRE DES TÂCHES (TOGGLE)
 ***************************************************/
(() => {
    const taskbarItems = document.querySelectorAll(".taskbar-item");

    taskbarItems.forEach((item) => {
        item.addEventListener("click", () => {
            const targetGroup = item.getAttribute("data-target");
            if (!targetGroup) return;

            // Sélection de toutes les fenêtres associées
            const relatedWindows = document.querySelectorAll(
                `.window[data-target-group="${targetGroup}"]`
            );

            relatedWindows.forEach((win) => {
                if (win.style.display === "none" || !win.style.display) {
                    // Si la fenêtre est minimisée / fermée => on l'ouvre
                    win.style.display = "flex";
                    // La remettre au premier plan
                    if (typeof bringWindowToFront === "function") {
                        bringWindowToFront(win);
                    }
                } else {
                    // Sinon => on la minimise
                    win.style.display = "none";
                    // if (typeof lowerZIndex === "function") {
                    //     lowerZIndex();
                    // }
                }
            });
        });
    });
})();
