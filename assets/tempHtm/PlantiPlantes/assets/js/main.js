document.querySelectorAll('.footer-el .title').forEach(title => {
    title.addEventListener('click', () => {
        const nav = title.nextElementSibling; // Sélectionne l'élément <nav> juste après le titre
        nav.classList.toggle('open'); // Basculer la classe 'open' sur <nav>
    });
});

// window.addEventListener("beforeunload", function () {
//     navigator.sendBeacon("?p=deconnexion");
// });

window.onload = function() {
    var alertMessage = document.getElementById("alert-message");
    if (alertMessage) {
        var progressBar = alertMessage.querySelector('.progress');

        // reset barre de progression
        progressBar.style.width = '0%';

        var startTime = Date.now();
        var duration = 3000; // Durée de l'animation

        function animateProgress() {
            var currentTime = Date.now();
            var elapsedTime = currentTime - startTime;
            var progress = Math.min((elapsedTime / duration) * 100, 100);

            progressBar.style.width = progress + '%';

            if (progress < 100) {
                requestAnimationFrame(animateProgress);
            } else {
                alertMessage.style.opacity = 0; 

                setTimeout(function() {
                    alertMessage.style.display = 'none';
                    //alertMessage.remove();
                }, 500);
            }
        }

        animateProgress();
    }
};



