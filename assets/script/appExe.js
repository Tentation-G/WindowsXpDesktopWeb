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
            console.log("Pas de logique définie pour :", exeId);
        }
    });
});

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
    const meowSound = new Audio('/assets/img/mp3/m-e-o-w.mp3');
    meowSound.play();
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
    toothlessDivDance.style.animationDuration = "10s";
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
