<?php ob_start(); //Commence l'enregistrement  ?>

<link rel="stylesheet" href="assets\css\fullSizeMainReset.css">

<div class="form-container">
    <div class="form-wrapper">
        <h2 class="center">Connexion</h2>
        <form action="index.php?p=connexion" class="" method="post">
        <?php 
            if (isset($errors) && count($errors) > 0) {
                echo "<div style='background:#ff000017;padding:10px;'>";
                foreach ($errors as $error) {
                    echo "<p style='color:red;'>$error</p>";
                }
                echo "</div>";
            }
        ?>
            <div class="user-box">
                <input type="text" id="email" name="email" required="">
                <label for="email">Email</label>
            </div>
            <div class="user-box">
                <input type="password" id="pass" name="pass" required="">
                <label for="pass">Mot de Passe</label>
            </div>
            <div class="item-center">
                <input type="submit" name="bouton" value="Se connecter" class="form-btn">
            </div>
            

            <a href="<?= URL; ?>?p=inscription">Pas encore inscrit ?</a>
        </form>
    </div>
</div>

<?php
    $content = ob_get_clean(); //copie l'enregistrement dans la variable content
    $title = "Connexion";
    require('./views/layout/template-fontpage.php');
?>