<?php ob_start(); //Commence l'enregistrement  ?>
<div class="compte-container">
    <h1>Mon espace perso</h1>
    <div class="">
        <ul>
            <li>Email : <?= $_SESSION['user']['email'] ?></li>
            <li>Nom : <?= $_SESSION['user']['nom'] ?></li>
            <li>Prenom : <?= $_SESSION['user']['prenom'] ?></li>
        </ul>
    </div>
    <a href="<?= URL; ?>compte.php?action=delete" class="btn btn-yellow " onclick="return confirm('Etes vous sûr de vouloir supprimer votre compte?')">Supprimer mon compte</a>
</div>

<?php
    $content = ob_get_clean(); //copie l'enregistrement dans la variable content
    $title = "Compte";
    require('./views/layout/template-fontpage.php');
?>