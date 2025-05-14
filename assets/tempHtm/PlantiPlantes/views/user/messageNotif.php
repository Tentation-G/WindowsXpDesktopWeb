
<?php if (isset($_SESSION['message'])): ?>
    <div id="alert-message" class="alert-message">
        <?= htmlspecialchars($_SESSION['message']) ?>
        <div class="progress-bar">
            <div class="progress"></div>
        </div>
    </div>
<?php 
    unset($_SESSION['message']); // Supprime le message après l'affichage
endif;
?>