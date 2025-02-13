
/***************************************************
 * commonZindex.js
 ***************************************************/

/***************************************************
 * Variable globale pour incrémenter le z-index
 ***************************************************/

export let topZIndex = 1;

export function bringWindowToFront(win) {
    //console.log("bringWindowToFront");
    topZIndex++;
    win.style.zIndex = topZIndex;
    setActiveWindow(win)
}

export function lowerZIndex() {
    if (topZIndex > 1) {
        topZIndex--;
    }
}

function setActiveWindow(win) {
    const allWins = document.querySelectorAll(".window");
    allWins.forEach((other) => {
        other.classList.add("unselected");
    });
    win.classList.remove("unselected");
    //console.log("setActiveWindow");
}