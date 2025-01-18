// 1. Gestion de l’ouverture au double-clic
document.querySelectorAll(".folder-icon").forEach((icon) => {
    icon.addEventListener("dblclick", () => {
        // Récupérer l'ID du dossier à ouvrir
        const targetId = icon.getAttribute("data-target");
        const folderWindow = document.getElementById(targetId);

        // Vérifier si la fenêtre est déjà affichée
        if (folderWindow.style.display === "block") {
            // Rien ne se passe, la fenêtre est déjà ouverte
            return;
        }

        // Afficher la fenêtre
        folderWindow.style.display = "block";

        // Centrer la fenêtre
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        const folderWidth = folderWindow.offsetWidth;
        const folderHeight = folderWindow.offsetHeight;

        folderWindow.style.left = (winWidth - folderWidth) / 2 + "px";
        folderWindow.style.top = (winHeight - folderHeight) / 2 + "px";

        // Changer l'icône du dossier en "ouvert"
        const iconImg = icon.querySelector("img");
        if (iconImg) {
            iconImg.src = "assets/img/icones/Open folder.png";
        }
    });
});

// 2. Gestion de la fermeture via le bouton X
document.querySelectorAll('.window [aria-label="Close"]').forEach((btn) => {
    btn.addEventListener("click", () => {
        // Retrouver la fenêtre parente
        const folderWindow = btn.closest(".window");
        folderWindow.style.display = "none";

        // Récupérer l'id
        const folderId = folderWindow.id;
        // Retrouver l'icône correspondante
        const relatedIcon = document.querySelector(`.folder-icon[data-target="${folderId}"]`);

        // Si icône trouvée, on remet l'image "Closed folder"
        if (relatedIcon) {
            const iconImg = relatedIcon.querySelector("img");
            if (iconImg) {
                iconImg.src = "assets/img/icones/Closed folder.png";
            }
        }
    });
});
