// wdbtn.js
import { bringWindowToFront } from "./commonZindex.js";

(() => {
    const mainContainer = document.getElementById("mainContainer");
    const minimizedArea = document.querySelector(".minimizedWindows");

    const windows = document.querySelectorAll(".window");

    windows.forEach((win) => {
        win.dataset.isMaximized = "false";

        win.addEventListener("mousedown", () => {
            bringWindowToFront(win);
        });

        const titleBarControls = win.querySelector(".title-bar-controls");
        if (!titleBarControls) return;

        const [minimizeBtn, maximizeBtn, closeBtn] =
            titleBarControls.querySelectorAll("button") || [];

        function doMaximize() {
            if (win.dataset.isMaximized === "true") return;
            win.dataset.originalLeft = win.style.left;
            win.dataset.originalTop = win.style.top;
            win.dataset.originalWidth = win.style.width;
            win.dataset.originalHeight = win.style.height;

            const rect = mainContainer.getBoundingClientRect();
            win.style.left = "0px";
            win.style.top = "0px";
            win.style.width = rect.width + "px";
            win.style.height = rect.height + "px";

            win.dataset.isMaximized = "true";
            bringWindowToFront(win);

            if (maximizeBtn) {
                maximizeBtn.setAttribute("aria-label", "Restore");
            }
        }

        function doRestore() {
            if (win.dataset.isMaximized !== "true") return;

            win.style.left = win.dataset.originalLeft;
            win.style.top = win.dataset.originalTop;
            win.style.width = win.dataset.originalWidth;
            win.style.height = win.dataset.originalHeight;

            win.dataset.isMaximized = "false";
            bringWindowToFront(win);

            if (maximizeBtn) {
                maximizeBtn.setAttribute("aria-label", "Maximize");
            }
        }

        if (minimizeBtn) {
            minimizeBtn.addEventListener("click", () => {
                win.style.display = "none";
                if (minimizedArea) {
                    const restoreBtn = document.createElement("button");
                    const windowTitle =
                        win.querySelector(".title-bar-text")?.innerText || "Window";
                    restoreBtn.textContent = windowTitle;
                    minimizedArea.appendChild(restoreBtn);

                    restoreBtn.addEventListener("click", () => {
                        win.style.display = "block";
                        minimizedArea.removeChild(restoreBtn);
                        bringWindowToFront(win);
                    });
                }
            });
        }

        if (maximizeBtn) {
            maximizeBtn.addEventListener("click", () => {
                if (win.dataset.isMaximized === "true") {
                    doRestore();
                } else {
                    doMaximize();
                }
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                win.style.display = "none";
                win.dataset.isMaximized = "false";
                if (maximizeBtn) {
                    maximizeBtn.setAttribute("aria-label", "Maximize");
                }
            });
        }
    });
})();
