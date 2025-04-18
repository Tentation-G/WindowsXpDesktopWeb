/***************************************************
 * Changement et application du fond d'écran
 ***************************************************/

// Chemin commun des images de fond
const BASE_PATH = "assets/img/background-img/";

// Sélecteurs principaux
const items = document.querySelectorAll(".param-bg-item");
const displayImg = document.getElementById("current-bg");
const desktop = document.querySelector(".desktop-body");
const okBtn = document.getElementById("ok-btn");
const cancelBtn = document.getElementById("cancel-btn");
const settingsWin = document.querySelector(".param-windows");

// 1) Prévisualisation au clic sur une vignette
items.forEach(item => {
    item.addEventListener("click", () => {
        // a) Marque le <p> sélectionné
        document.querySelectorAll(".param-bg-item p")
            .forEach(p => p.classList.remove("selected"));
        const p = item.querySelector("p");
        if (p) p.classList.add("selected");

        // b) Affiche l'image dans la zone de preview
        const filename = item.dataset.filename;
        if (filename) {
            displayImg.src = BASE_PATH + filename;
            displayImg.alt = p ? p.textContent : "Fond sélectionné";
        }

        console.log("Preview :", displayImg.src);
    });
});

// 2) Application du fond au clic sur OK
okBtn.addEventListener("click", () => {
    const selectedP = document.querySelector(".param-bg-item p.selected");
    if (!selectedP) {
        console.warn("Aucune image sélectionnée.");
        return;
    }

    const item = selectedP.closest(".param-bg-item");
    const filename = item.dataset.filename;
    if (!filename) return;

    // Applique le background à .desktop-body
    desktop.style.backgroundImage = `url(${BASE_PATH + filename})`;
    desktop.style.backgroundSize = "cover";
    desktop.style.backgroundPosition = "center";

    console.log("Fond appliqué :", desktop.style.backgroundImage);
});
