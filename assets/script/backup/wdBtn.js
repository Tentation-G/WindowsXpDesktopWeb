(() => {
    // Variable globale pour gérer l'ordre d'empilement (z-index)
    let topZIndex = 1;

    // Récupération du conteneur principal et de la zone de "taskbar"
    const mainContainer = document.getElementById("mainContainer");
    const minimizedArea = document.querySelector(".minimizedWindows"); // ex: <div class="minimizedWindows"></div>

    // Fonction utilitaire pour mettre une fenêtre au premier plan
    function bringWindowToFront(win) {
        topZIndex++;
        win.style.zIndex = topZIndex;
    }

    // Sélection de toutes les fenêtres
    const windows = document.querySelectorAll(".window");

    windows.forEach((win) => {
        // 1) Au clic (mousedown) sur la fenêtre, on la met au premier plan
        win.addEventListener("mousedown", () => {
            bringWindowToFront(win);
        });

        // 2) Récupération de la barre de titre contrôlant les boutons
        const titleBarControls = win.querySelector(".title-bar-controls");
        if (!titleBarControls) return; // si pas de contrôles, on ignore

        // On suppose 3 boutons : [Minimize, Maximize, Close]
        const [minimizeBtn, maximizeBtn, closeBtn] = titleBarControls.querySelectorAll("button") || [];

        // Variables pour le toggle Maximize
        let isMaximized = false;
        let originalLeft, originalTop, originalWidth, originalHeight;

        // --- MINIMIZE ---
        if (minimizeBtn) {
            minimizeBtn.addEventListener("click", () => {
                // On masque la fenêtre
                win.style.display = "none";

                // On crée un bouton dans la barre des tâches pour la restaurer
                if (minimizedArea) {
                    const restoreBtn = document.createElement("button");
                    // On récupère le titre de la fenêtre (si défini)
                    const windowTitle = win.querySelector(".title-bar-text")?.innerText || "Window";
                    restoreBtn.textContent = windowTitle;

                    minimizedArea.appendChild(restoreBtn);

                    // Au clic sur le bouton => restaurer la fenêtre
                    restoreBtn.addEventListener("click", () => {
                        win.style.display = "block";
                        minimizedArea.removeChild(restoreBtn);
                        bringWindowToFront(win);
                    });
                }
            });
        }

        // --- MAXIMIZE ---
        if (maximizeBtn) {
            maximizeBtn.addEventListener("click", () => {
                if (!isMaximized) {
                    // Sauvegarder la position et la taille actuelles
                    originalLeft = win.style.left;
                    originalTop = win.style.top;
                    originalWidth = win.style.width;
                    originalHeight = win.style.height;

                    // Étendre la fenêtre à la taille de #mainContainer
                    const rect = mainContainer.getBoundingClientRect();
                    win.style.left = "0px";
                    win.style.top = "0px";
                    win.style.width = rect.width + "px";
                    win.style.height = rect.height + "px";

                    isMaximized = true;
                } else {
                    // Restaurer la position et la taille initiales
                    win.style.left = originalLeft;
                    win.style.top = originalTop;
                    win.style.width = originalWidth;
                    win.style.height = originalHeight;

                    isMaximized = false;
                }

                // Passer la fenêtre devant
                bringWindowToFront(win);
            });
        }

        // --- CLOSE ---
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                // On masque la fenêtre
                win.style.display = "none";
                // Optionnel : on pourrait aussi supprimer un éventuel bouton minimisé
                // s'il existait pour cette fenêtre, etc.
            });
        }
    });
})();
