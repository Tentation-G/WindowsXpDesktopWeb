/******************************************************
 * appOpenClose.js
 ******************************************************/
import { bringWindowToFront, lowerZIndex, topZIndex } from "./commonZindex.js"

// Windows display mode : random | cascade | center
const POSITION_MODE = "random";
let cascadeCount = 0;
let currentLockedIcon = null; // Pour mémoriser l'icône verrouillée en attente

/***************************************************
 * OUVERTURE (double-clic sur l'icône .icon)
 ***************************************************/
document.querySelectorAll(".icon").forEach((icon) => {
    icon.addEventListener("dblclick", () => {
        // Vérifie si l'icône est verrouillée
        if (icon.classList.contains("lockedFolder") || icon.classList.contains("lockerFolder")) {
            openLockForm(icon);
        } else {
            openFolder(icon);
        }
    });
});

/***************************************************
 * OUVERTURE (click simple sur l'icône .iconlm => ouverture des app du launch menu)
 ***************************************************/
document.querySelectorAll(".iconlm").forEach((icon) => {
    icon.addEventListener("click", () => {
        // Vérifie si l'icône est verrouillée
        if (icon.classList.contains("lockedFolder") || icon.classList.contains("lockerFolder")) {
            openLockForm(icon);
        } else {
            openFolder(icon);
        }
    });
});

/***************************************************
 * OUVERTURE MENU CLICK DROIT
 ***************************************************/

const rightClickcMenu = document.getElementById("rightClickMenuId");

document.addEventListener("contextmenu", (event) => {

    event.preventDefault();

    rightClickcMenu.style.display = "block";
    rightClickcMenu.style.left = `${event.pageX}px`;
    rightClickcMenu.style.top = `${event.pageY}px`;
});

document.addEventListener("click", () => {
    rightClickcMenu.style.display = "none";
});

/**
 * Fonction d'ouverture normale du dossier.
 */
function openFolder(icon) {
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
        if (win.style.display === "flex") {
            if (typeof bringWindowToFront === "function") {
                bringWindowToFront(win);
            }
            return;
        }

        win.style.display = "flex";
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
        if (typeof bringWindowToFront === "function") {
            bringWindowToFront(win);
        }
    });

    if (footerItem) {
        footerItem.style.display = "flex";
    }

    if (icon.classList.contains("folder-icon")) {
        const iconImg = icon.querySelector("img");
        if (iconImg) {
            iconImg.src = "https://www.flavien-campeaux.ovh/assets/img/icones/Open_folder.png";
        }
    }
}

/**
 * Affiche le formulaire de code en utilisant la div déjà présente dans le HTML.
 */
function openLockForm(icon) {
    currentLockedIcon = icon; // Mémorise l'icône verrouillée sollicitée
    const lockDiv = document.getElementById("lockForm");
    if (!lockDiv) return;
    lockDiv.style.display = "block";

    bringWindowToFront(lockDiv);
    positionWindowCenter(lockDiv);

    // Réinitialise le formulaire
    const codeInput = lockDiv.querySelector("#codeInput");
    const errorMsg = lockDiv.querySelector("#errorMsg");
    if (codeInput) codeInput.value = "";
    if (errorMsg) errorMsg.style.display = "none";
}
/***************************************************
 * Initialisation du formulaire de code
 ***************************************************/
document.addEventListener("DOMContentLoaded", () => {
    const codeForm = document.getElementById("codeForm");
    if (codeForm) {
        codeForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const lockDiv = document.getElementById("lockForm");
            const codeInput = lockDiv.querySelector("#codeInput");
            const errorMsg = lockDiv.querySelector("#errorMsg");
            const correctCode = "ExamE6mdp*"; // Code correct
            if (codeInput.value === correctCode) {
                lockDiv.style.display = "none";
                if (currentLockedIcon) {
                    openFolder(currentLockedIcon);
                }
            } else {
                if (errorMsg) errorMsg.style.display = "block";
            }
        });
    }
});

/***************************************************
 * FERMETURE (bouton X)
 ***************************************************/
document.querySelectorAll('.window [aria-label="Close"]').forEach((btn) => {
    btn.addEventListener("click", () => {
        const currentWindow = btn.closest(".window");
        if (!currentWindow) return;

        currentWindow.style.display = "none";
        lowerZIndex();

        const targetGroup = currentWindow.getAttribute("data-target-group");
        if (!targetGroup) return;

        const otherOpenedWindows = document.querySelectorAll(
            `.window[data-target-group="${targetGroup}"]`
        );
        const stillOpen = [...otherOpenedWindows].some(win => win.style.display === "flex");

        if (!stillOpen) {
            const footerItem = document.querySelector(
                `.taskbar [data-target-group="${targetGroup}"]`
            );
            if (footerItem) {
                footerItem.style.display = "none";
            }
        }

        const relatedIcon = document.querySelector(`.icon[data-target="${targetGroup}"]`);
        if (!relatedIcon) return;

        if (relatedIcon.classList.contains("folder-icon")) {
            const iconImg = relatedIcon.querySelector("img");
            if (iconImg) {
                iconImg.src = "https://www.flavien-campeaux.ovh/assets/img/icones/Closed_folder.png";
            }
        }
    });
});

/***************************************************
 * FONCTIONS DE POSITIONNEMENT
 ***************************************************/
function positionWindowCenter(win) {
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const w = win.offsetWidth;
    const h = win.offsetHeight;
    win.style.left = (winWidth - w) / 2 + "px";
    win.style.top = (winHeight - h) / 2 + "px";
}

function positionWindowCascade(win) {
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const w = win.offsetWidth;
    const h = win.offsetHeight;
    const baseLeft = (winWidth - w) / 2;
    const baseTop = (winHeight - h) / 2;
    const offset = 30 * cascadeCount;
    let newLeft = baseLeft + offset;
    let newTop = baseTop + offset;
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

/***************************************************
 * Ouverture du menu demarré
 ***************************************************/

const md = document.getElementById("launch-menu");
const powerBtn = document.getElementById("powerBtn");

powerBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    openLaunchMenu();
});

document.addEventListener("click", (event) => {
    const isClickInsideMenu = md.contains(event.target);
    
    if (!isClickInsideMenu && window.getComputedStyle(md).display === "flex") {
        md.style.display = "none";
    }
});

function openLaunchMenu() {
    md.style.display = (window.getComputedStyle(md).display === "none") ? "flex" : "none";
}

/***************************************************
 * Eteignage de la machine
 ***************************************************/

const turnoffbtn = document.getElementById("turnOffBtn");
const turningOffSound = new Audio("assets/img/mp3/Windows xp shutting down.mp3");

turnoffbtn.addEventListener("click", turnOffCommuter);

function turnOffCommuter() {
    turningOffSound.play()
    setTimeout(function() {
        location.reload(true);
    }, 3000);
    
}