// dragIcons.js
const mainContainer = document.getElementById("mainContainer");
const Icons = document.querySelectorAll(".iconDrag");

Icons.forEach((icon) => {
    let offsetX = 0;
    let offsetY = 0;

    icon.addEventListener("mousedown", (e) => {
        e.preventDefault();
        offsetX = e.clientX - icon.offsetLeft;
        offsetY = e.clientY - icon.offsetTop;

        function onMouseMove(e) {
            const rect = mainContainer.getBoundingClientRect();
            let newLeft = e.clientX - rect.left - offsetX;
            let newTop = e.clientY - rect.top - offsetY;

            // Limite dans le conteneur
            const maxLeft = rect.width - icon.offsetWidth;
            const maxTop = rect.height - icon.offsetHeight;
            if (newLeft < 0) newLeft = 0;
            if (newLeft > maxLeft) newLeft = maxLeft;
            if (newTop < 0) newTop = 0;
            if (newTop > maxTop) newTop = maxTop;

            icon.style.position = "absolute";
            icon.style.left = newLeft + "px";
            icon.style.top = newTop + "px";
        }

        function onMouseUp() {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });
});
