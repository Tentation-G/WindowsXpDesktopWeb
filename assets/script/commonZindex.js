// commonZindex.js

// Variable globale pour incrémenter le z-index
export let topZIndex = 1;

export function bringWindowToFront(win) {
    topZIndex++;
    win.style.zIndex = topZIndex;
}