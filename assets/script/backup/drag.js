const mainContainer = document.getElementById("mainContainer");

// Sélectionner toutes les icônes sur le bureau
const folderIcons = document.querySelectorAll(".folder-icon");

folderIcons.forEach((icon) => {
    let offsetX = 0;
    let offsetY = 0;

    icon.addEventListener("mousedown", (e) => {
        e.preventDefault();

        // Calcul du décalage
        offsetX = e.clientX - icon.offsetLeft;
        offsetY = e.clientY - icon.offsetTop;

        // Fonctions internes
        function onMouseMove(e) {
            const rect = mainContainer.getBoundingClientRect();
            let newLeft = e.clientX - rect.left - offsetX;
            let newTop = e.clientY - rect.top - offsetY;

            // Limiter dans le conteneur main
            const maxLeft = rect.width - icon.offsetWidth;
            const maxTop = rect.height - icon.offsetHeight;
            if (newLeft < 0) newLeft = 0;
            if (newLeft > maxLeft) newLeft = maxLeft;
            if (newTop < 0) newTop = 0;
            if (newTop > maxTop) newTop = maxTop;

            icon.style.left = newLeft + "px";
            icon.style.top = newTop + "px";
            icon.style.position = "absolute"; // si pas déjà dans le CSS
        }

        function onMouseUp() {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });
});



// Sélectionne toutes les fenêtres
const windows = document.querySelectorAll(".window");

windows.forEach((win) => {
    // On récupère l'élément .title-bar dedans
    const titleBar = win.querySelector(".title-bar");

    let offsetX = 0;
    let offsetY = 0;

    // On attache le mousedown à la title-bar seulement
    titleBar.addEventListener("mousedown", (e) => {
        e.preventDefault();

        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;

        function onMouseMove(e) {
            const rect = mainContainer.getBoundingClientRect();
            let newLeft = e.clientX - rect.left - offsetX;
            let newTop = e.clientY - rect.top - offsetY;

            // Limiter le déplacement
            const maxLeft = rect.width - win.offsetWidth;
            const maxTop = rect.height - win.offsetHeight;
            if (newLeft < 0) newLeft = 0;
            if (newLeft > maxLeft) newLeft = maxLeft;
            if (newTop < 0) newTop = 0;
            if (newTop > maxTop) newTop = maxTop;

            win.style.left = newLeft + "px";
            win.style.top = newTop + "px";
            win.style.position = "absolute"; // ou dans le CSS
        }

        function onMouseUp() {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });
});
