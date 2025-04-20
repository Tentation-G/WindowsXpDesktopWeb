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

/***************************************************
 * Changement de page de fenetre de param
 ***************************************************/

document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.param-panel-btn-select');
    const panels = document.querySelectorAll('[role="tabpanel"]');

    // Initi
    const initTab = document.querySelector('.param-panel-btn-select[aria-selected="true"]');
    if (initTab) {
        const initId = initTab.getAttribute('aria-controls');
        panels.forEach(panel => panel.style.display = 'none');
        const initPanel = document.getElementById(initId);
        if (initPanel) initPanel.style.display = 'block';
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // reset selection item
            tabs.forEach(t => t.setAttribute('aria-selected', 'false'));

            // select du bon
            tab.setAttribute('aria-selected', 'true');

            // tous les deselectionner
            panels.forEach(panel => panel.style.display = 'none');

            // recup le bon pour l'afficher
            const targetId = tab.getAttribute('aria-controls');
            const targetPanel = document.getElementById(targetId);

            // L’afficher
            if (targetPanel) {
                targetPanel.style.display = 'block';
            }
        });
    });
});

/***************************************************
 * Changement effet visuel
 ***************************************************/

//const crtDiv = document.getElementsByClassName("crt");
const crtDiv = document.getElementById("crt");

document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function () {

        const val = this.value
        const checked = this.checked

        if (val === "crtEffect") {
            crtDiv.style.display = checked ? "block" : "none";
        }
    });
});