/********************************************************
 * 1) DRAG & DROP DES ICÔNES (folder-icon)
 ********************************************************/
(function initIconDragAndDrop() {
    const mainContainer = document.getElementById("mainContainer");
    const icons = document.querySelectorAll(".draggable.folder-icon");

    icons.forEach((icon) => {
        let offsetX = 0;
        let offsetY = 0;

        icon.addEventListener("mousedown", (e) => {
            e.preventDefault();

            // Écarte entre clic et coin sup-gauche de l'icône
            offsetX = e.clientX - icon.offsetLeft;
            offsetY = e.clientY - icon.offsetTop;

            function onMouseMove(e) {
                const rect = mainContainer.getBoundingClientRect();
                const maxLeft = rect.width - icon.offsetWidth;
                const maxTop = rect.height - icon.offsetHeight;

                let newLeft = e.clientX - rect.left - offsetX;
                let newTop = e.clientY - rect.top - offsetY;

                // Empêcher de sortir du conteneur
                if (newLeft < 0) newLeft = 0;
                if (newTop < 0) newTop = 0;
                if (newLeft > maxLeft) newLeft = maxLeft;
                if (newTop > maxTop) newTop = maxTop;

                icon.style.position = "absolute";
                icon.style.left = newLeft + "px";
                icon.style.top = newTop + "px";
            }

            function onMouseUp() {
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            }

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        });
    });
})();

/********************************************************
 * 2) OUVERTURE DES FENÊTRES AU DOUBLE CLIC SUR ICÔNE
 ********************************************************/
(function initFolderOpen() {
    const icons = document.querySelectorAll(".folder-icon");

    icons.forEach((icon) => {
        icon.addEventListener("dblclick", () => {
            // Récupère l'ID de la fenêtre associée (via data-target)
            const targetId = icon.getAttribute("data-target");
            const folderWindow = document.getElementById(targetId);
            if (!folderWindow) return;

            // Vérifier si la fenêtre est déjà "ouverte" (display: block)
            if (folderWindow.style.display === "block") {
                // Déjà ouverte, on ne fait rien
                return;
            }

            // Sinon, on l'affiche
            folderWindow.style.display = "block";

            // Centrer la fenêtre dans la zone visible
            const winWidth = window.innerWidth;
            const winHeight = window.innerHeight;
            const folderWidth = folderWindow.offsetWidth;
            const folderHeight = folderWindow.offsetHeight;

            folderWindow.style.left = (winWidth - folderWidth) / 2 + "px";
            folderWindow.style.top = (winHeight - folderHeight) / 2 + "px";

            // Optionnel : amener au premier plan
            bringWindowToFront(folderWindow);
        });
    });
})();

/********************************************************
 * 3) DRAG & DROP DES FENÊTRES (par la barre de titre)
 *    + Z-INDEX
 ********************************************************/
let topZIndex = 1; // Pour gérer l'ordre d'empilement

function bringWindowToFront(win) {
    topZIndex++;
    win.style.zIndex = topZIndex;
}

/**
 * On rend chaque fenêtre .window déplaçable via .title-bar
 * Au clic sur la fenêtre, on la passe en premier plan.
 */
(function initWindowDragAndZindex() {
    const mainContainer = document.getElementById("mainContainer");
    const windows = document.querySelectorAll(".window");

    windows.forEach((win) => {
        // Au clic n'importe où dans la fenêtre (mousedown), on la passe devant
        win.addEventListener("mousedown", () => {
            bringWindowToFront(win);
        });

        // On cible la barre de titre
        const titleBar = win.querySelector(".title-bar");
        if (!titleBar) return;

        let offsetX = 0;
        let offsetY = 0;

        titleBar.addEventListener("mousedown", (e) => {
            e.preventDefault();

            // On mémorise la distance entre la souris et le coin de la fenêtre
            offsetX = e.clientX - win.offsetLeft;
            offsetY = e.clientY - win.offsetTop;

            function onMouseMove(e) {
                const rect = mainContainer.getBoundingClientRect();
                const maxLeft = rect.width - win.offsetWidth;
                const maxTop = rect.height - win.offsetHeight;

                let newLeft = e.clientX - rect.left - offsetX;
                let newTop = e.clientY - rect.top - offsetY;

                if (newLeft < 0) newLeft = 0;
                if (newTop < 0) newTop = 0;
                if (newLeft > maxLeft) newLeft = maxLeft;
                if (newTop > maxTop) newTop = maxTop;

                win.style.left = newLeft + "px";
                win.style.top = newTop + "px";

                // On le repasse devant si on continue à déplacer
                bringWindowToFront(win);
            }

            function onMouseUp() {
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            }

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        });
    });
})();

/********************************************************
 * 4) GESTION DES BOUTONS MINIMIZE, MAXIMIZE, CLOSE
 ********************************************************/
(function initWindowControls() {
    const mainContainer = document.getElementById("mainContainer");
    const minimizedArea = document.querySelector(".minimizedWindows") || null;
    const windows = document.querySelectorAll(".window");

    windows.forEach((win) => {
        const titleBarControls = win.querySelector(".title-bar-controls");
        if (!titleBarControls) return;

        // On s’attend à l’ordre : [Minimize, Maximize, Close]
        const [minimizeBtn, maximizeBtn, closeBtn] =
            titleBarControls.querySelectorAll("button");

        // Variables pour le toggle Maximize
        let isMaximized = false;
        let originalLeft, originalTop, originalWidth, originalHeight;

        // --- MINIMIZE ---
        minimizeBtn.addEventListener("click", () => {
            // Masquer la fenêtre
            win.style.display = "none";

            // Créer un bouton dans la barre des tâches pour la restaurer
            if (minimizedArea) {
                const restoreBtn = document.createElement("button");
                const windowTitle =
                    win.querySelector(".title-bar-text")?.innerText || "Window";
                restoreBtn.textContent = windowTitle;
                minimizedArea.appendChild(restoreBtn);

                // Au clic sur le bouton => restaurer
                restoreBtn.addEventListener("click", () => {
                    win.style.display = "block";
                    minimizedArea.removeChild(restoreBtn);
                    bringWindowToFront(win);
                });
            }
        });

        // --- MAXIMIZE ---
        maximizeBtn.addEventListener("click", () => {
            if (!isMaximized) {
                // Sauvegarde de la position et taille d’origine
                originalLeft = win.style.left;
                originalTop = win.style.top;
                originalWidth = win.style.width;
                originalHeight = win.style.height;

                // On maximise par rapport à mainContainer
                const rect = mainContainer.getBoundingClientRect();
                win.style.left = 0;
                win.style.top = 0;
                win.style.width = rect.width + "px";
                win.style.height = rect.height + "px";

                isMaximized = true;
            } else {
                // Restauration des valeurs d’origine
                win.style.left = originalLeft;
                win.style.top = originalTop;
                win.style.width = originalWidth;
                win.style.height = originalHeight;

                isMaximized = false;
            }
            bringWindowToFront(win);
        });

        // --- CLOSE ---
        closeBtn.addEventListener("click", () => {
            win.style.display = "none";
            // Optionnel : si la fenêtre est fermée, on pourrait aussi
            // supprimer tout bouton minimisé associé, etc.
        });
    });
})();
