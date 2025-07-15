/*********************************************************
 * appExe.js
 * Gère les comportements spécifiques aux "EXE" (classe .iconExe).
 *********************************************************/

/*********************************************************
 * “Catalogue” des exe et de leurs fonctions. 
 * L'ID "exeLeCat" correspond à data-exe="exeLeCat" dans le HTML.
 *********************************************************/

const exeLogic = {
    exeLeCat: toggleCatExe,
    exeLeDragonNoir: toogleToothLessExe,
    exeDanceParty: startDanceParty,
    exeMiroir: toogleMiroitionExe,
    exePanel: tooglePanelExe,
};

/*********************************************************
 * Attacher le double-clic sur .iconExe, qui a data-exe="..."
 *********************************************************/
document.querySelectorAll(".iconExe").forEach((exeIcon) => {
    exeIcon.addEventListener("dblclick", () => {
        const exeId = exeIcon.getAttribute("data-exe");
        const fn = exeLogic[exeId];
        if (typeof fn === "function") {
            fn();
        } else {
            //console.log("Pas de logique définie pour :", exeId);
        }
    });
});

/*********************************************************
 * Logic Panel.exe
 *********************************************************/

const waitBeforeOpeningDuration = 1000; // 2 secondes
const panelContainerDiv = document.getElementById("panelWrapper");
const cuboidRotationDiv = document.getElementById("cube-rotation");
var isPanelAlreadyOpen = 0;

/**
 * Pause en ms
 * @param {number} ms
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fait clignoter #panelWrapper en alternant opacity 0/1.
 * @param {number} blinkDuration  Durée totale du clignotement (en ms)
 * @param {number} blinkInterval  Intervalle entre chaque switch d’opacité (en ms)
 * @returns {Promise<void>}
 */
function clignotement(blinkDuration, blinkInterval) {
    return new Promise(resolve => {
        if (!panelContainerDiv) {
            resolve();
            return;
        }

        let elapsed = 0;
        let visible = false;
        panelContainerDiv.style.display = 'flex';
        panelContainerDiv.style.opacity = '0';

        const iv = setInterval(() => {
            visible = !visible;
            panelContainerDiv.style.opacity = visible ? '1' : '0';

            elapsed += blinkInterval;
            if (elapsed >= blinkDuration) {
                clearInterval(iv);
                panelContainerDiv.style.opacity = '1';
                resolve();
            }
        }, blinkInterval);
    });
}

/**
 * Affiche le panel, enchaîne plusieurs phases de clignotement,
 * puis déclenche l’animation 3D.
 */
async function tooglePanelExe() {
    if(isPanelAlreadyOpen == 0) {
        // 1) Affiche immédiatement (mais opacité à 0)
        panelContainerDiv.style.display = 'flex';
        panelContainerDiv.style.opacity = '0';
        isPanelAlreadyOpen = 1;

        // 2) Petite pause avant de démarrer le glitch
        await sleep(waitBeforeOpeningDuration);

        // crée un tableau de paires [durée, intervalle] aléatoires
        const patterns = Array.from({length: 6}, () => {
            const d = 100 + Math.random()*400;   // 100–500 ms de glitch
            const i = 20 + Math.random()*180;    // intervalle 20–200 ms
            return [d, i];
        });

        // applique-les les uns après les autres
        for (const [d,i] of patterns) {
            await clignotement(d, i);
        }

        // extinctions par petits sursauts
        await clignotement(300, 100);

        await sleep(waitBeforeOpeningDuration * 2);

        // animation d'ouverture
        // reset
        cuboidRotationDiv.classList.remove('cube-animation-rotation');
        // force reflow (je sais pas ce que c'est, mais ca fonctionne, donc on touche pas)
        void cuboidRotationDiv.offsetWidth;
        // animation
        cuboidRotationDiv.classList.add('cube-animation-rotation');
    }
}




/*********************************************************
 * Logic Le Cat.exe
 *********************************************************/

let catModeActive = false;
let catMeowClick = true;
const meowAudio = document.getElementById('meow');
const bodyCatModeActive = document.body;


// Active / désactive l'exe "Le Cat"
function toggleCatExe() {
    if (!catModeActive) {
        activateCatMode();
    } else {
        deactivateCatMode();
    }
}

function activateCatMode() {
    catModeActive = true;
    catMeowClick = true; // Remettre en true pour Activer le Meow suave 
    document.body.classList.add("cat-mode-active");

    if (catMeowClick == true) {
        bodyCatModeActive.addEventListener('mousedown', () => {
            //meowAudio.currentTime = 0;
            //meowAudio.play();
            if (catMeowClick == true) {
                playMeowSound()
            }
        });
    }
}

function playMeowSound() {
    const meowSound = new Audio("/assets/img/mp3/japan-oppai-sound.mp3");

    meowSound.addEventListener("loadedmetadata", () => {
        const totalDuration = meowSound.duration;
        const halfDuration = totalDuration / 2;
        meowSound.play();

        setTimeout(() => {
            meowSound.pause();
            meowSound.currentTime = 0;
        }, halfDuration * 1000);
    });
}

function deactivateCatMode() {
    catModeActive = false;
    catMeowClick = false;
    document.body.classList.remove("cat-mode-active");
    document.body.removeEventListener('mousedown', playMeowSound);
}

/*********************************************************
 * Logic Le Dragon Noir (Toothless / CrocMou)
 *********************************************************/

const toothlessDanceDuration = 12000; // adapter a la animationDuration
const toothlessDivDance = document.getElementById('toothless');
const toothlessSongSound = new Audio('/assets/img/mp3/ToothlessDancingSong.mp3');

toothlessSongSound.volume = 0.3;

function toogleToothLessExe() {
    toothlessDivDance.style.display = 'block';
    toothlessDivDance.style.animationDuration = "11s";
    toothlessDivDance.classList.add("toothless-gif-animation");

    toothlessSongSound.play();

    setTimeout(() => {
        toothlessDivDance.classList.remove("toothless-gif-animation");
        toothlessSongSound.currentTime = 0;
    }, toothlessDanceDuration);
}

/*********************************************************
 * Logic danceParty.exe
 *********************************************************/

let dancePartyLaunched = false;

function startDanceParty() {
    if (dancePartyLaunched) return;
    dancePartyLaunched = true;

    const partyExeDiv = document.getElementById("partyExe");
    if (!partyExeDiv) return;

    partyExeDiv.style.display = "block";
    partyExeDiv.querySelector(".confettiesGif")?.style.setProperty("display", "block");
    partyExeDiv.querySelector(".catDancingGif")?.style.setProperty("display", "block");

    const colorInterval = setInterval(changePartyColor, 300);

    setTimeout(() => {
        partyExeDiv.style.display = "none";
        partyExeDiv.querySelector(".confettiesGif")?.style.setProperty("display", "none");
        partyExeDiv.querySelector(".catDancingGif")?.style.setProperty("display", "none");
        clearInterval(colorInterval);
        dancePartyLaunched = false;
    }, 10000);
}

function changePartyColor() {
    const partyExeDiv = document.getElementById("partyExe");
    if (!partyExeDiv) return;
    const bgDiv = partyExeDiv.querySelector(".background-color-changement");
    if (!bgDiv) return;
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    bgDiv.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.5)`;
}

/*********************************************************
 * Logic Miroi.exe
 *********************************************************/

let miroired = false;

function toogleMiroitionExe() {
    if (miroired == false) {
        document.body.style.transform = "scaleX(-1)";
        miroired = true;
    }
    else {
        document.body.style.transform = "scaleX(1)";
        miroired = false;
    }

}


