// dragWindows.js
import { topZIndex, bringWindowToFront } from "./commonZindex.js";

const windows = document.querySelectorAll(".window");

windows.forEach((win) => {
    const titleBar = win.querySelector(".title-bar");
    if (!titleBar) return;

    let offsetX = 0;
    let offsetY = 0;

    titleBar.addEventListener("mousedown", (e) => {
        e.preventDefault();

        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;

        function onMouseMove(e) {
            const rect = mainContainer.getBoundingClientRect();
            let newLeft = e.clientX - rect.left - offsetX;
            let newTop = e.clientY - rect.top - offsetY;

            const maxLeft = rect.width - win.offsetWidth;
            const maxTop = rect.height - win.offsetHeight;

            if (newLeft < 0) newLeft = 0;
            if (newTop < 0) newTop = 0;
            if (newLeft > maxLeft) newLeft = maxLeft;
            if (newTop > maxTop) newTop = maxTop;

            win.style.position = "absolute";
            win.style.left = newLeft + "px";
            win.style.top = newTop + "px";
            bringWindowToFront(win);
        }

        function onMouseUp() {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });
});
