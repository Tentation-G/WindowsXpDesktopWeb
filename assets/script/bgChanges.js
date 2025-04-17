/***************************************************
 * Changement Fond d'écran
 ***************************************************/
document.querySelectorAll(".param-bg-item").forEach(item => {
    item.addEventListener("click", () => {
        // 1) on enlève la classe 'selected' de tous les <p>
        document.querySelectorAll(".param-bg-item p").forEach(p => {
            p.classList.remove("selected");
        });
        // 2) on ajoute 'selected' au <p> enfant de l'item cliqué
        const p = item.querySelector("p");
        if (p) {
            p.classList.add("selected");
        }
        selectParam();
    });
});

function selectParam() {
    console.log("ça clique !");
}
