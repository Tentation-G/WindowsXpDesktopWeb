
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
    //setActiveTaskITem(win)
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

function setActiveTaskITem(win) {
    const allTaskItem = document.querySelectorAll(".taskbar-item");
    allTaskItem.forEach((other) => {
        other.classList.add("unselected");
    });
    win.classList.remove("unselected");
    //console.log("setActiveWindow");
}