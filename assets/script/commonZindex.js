
/***************************************************
 * commonZindex.js
 ***************************************************/

/***************************************************
 * Variable globale pour incrémenter le z-index
 ***************************************************/

export let topZIndex = 1;

export function bringWindowToFront(win) {
    console.log(topZIndex);
    topZIndex++;
    win.style.zIndex = topZIndex;
}

export function lowerZIndex() {
    if (topZIndex > 1) {
        topZIndex--;
    }
}