//const windows = document.querySelectorAll(".window");
//const mainContainer = document.getElementById("mainContainer");
// si besoin pour limiter la taille, par ex. getBoundingClientRect()

windows.forEach((win) => {
    const handles = win.querySelectorAll(".resize-handle");

    let startX, startY, startWidth, startHeight, startLeft, startTop;

    handles.forEach((handle) => {
        handle.addEventListener("mousedown", (e) => {
            e.preventDefault(); // Éviter la sélection de texte, etc.

            // On mémorise la position de départ de la souris
            startX = e.clientX;
            startY = e.clientY;

            // Taille et position actuelles de la fenêtre
            startWidth = parseInt(window.getComputedStyle(win).width, 10);
            startHeight = parseInt(window.getComputedStyle(win).height, 10);
            startLeft = parseInt(window.getComputedStyle(win).left, 10);
            startTop = parseInt(window.getComputedStyle(win).top, 10);

            // On récupère la direction à partir de l’attribut data-direction
            const direction = handle.getAttribute("data-direction");

            // Fonctions internes
            function onMouseMove(e) {
                // Déplacements cumulés
                const diffX = e.clientX - startX;
                const diffY = e.clientY - startY;

                // Variables locales pour la nouvelle taille / position
                let newWidth = startWidth;
                let newHeight = startHeight;
                let newLeft = startLeft;
                let newTop = startTop;

                // Selon la direction, on modifie width/height/left/top
                if (direction.includes("right")) {
                    // on élargit vers la droite
                    newWidth = startWidth + diffX;
                }
                if (direction.includes("left")) {
                    // on élargit vers la gauche => il faut décaler le left et augmenter la width
                    newWidth = startWidth - diffX;
                    newLeft = startLeft + diffX;
                }
                if (direction.includes("bottom")) {
                    // on agrandit vers le bas
                    newHeight = startHeight + diffY;
                }
                if (direction.includes("top")) {
                    // on agrandit vers le haut => décale top et augmente la height
                    newHeight = startHeight - diffY;
                    newTop = startTop + diffY;
                }

                // Bloquer la taille minimale si besoin
                if (newWidth < 100) {
                    newWidth = 100;
                    // Ajuster left si on resize par la gauche
                    if (direction.includes("left")) {
                        newLeft = startLeft + (startWidth - 100);
                    }
                }
                if (newHeight < 50) {
                    newHeight = 50;
                    // Ajuster top si on resize par le haut
                    if (direction.includes("top")) {
                        newTop = startTop + (startHeight - 50);
                    }
                }

                // Appliquer les nouvelles valeurs
                win.style.width = newWidth + "px";
                win.style.height = newHeight + "px";
                win.style.left = newLeft + "px";
                win.style.top = newTop + "px";

                // Si besoin : empêcher de dépasser le mainContainer
                // -> calculer containerRect, etc. (comme dans le drag)
            }

            function onMouseUp() {
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            }

            // Écoute du mouvement sur le document
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        });
    });
});
