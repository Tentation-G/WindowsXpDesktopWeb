<?php ob_start(); //Commence l'enregistrement  ?>

<link rel="stylesheet" href="assets\css\fullSizeMainReset.css">

<div class="form-container">
    <div class="form-wrapper">
        <h2 class="center">Inscription</h2>
        <form action="index.php?p=inscription" class="" method="post">
            <?php 
            if (isset($errors) && count($errors) > 0) {
                echo "<div style='background:#ff000017;padding:10px'>";
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
                <input type="text" id="nom" name="nom" required="">
                <label for="nom">Nom</label>
            </div>
            <div class="user-box">               
                <input type="text" id="prenom" name="prenom" required="">
                <label for="prenom">Prenom</label>
            </div>
            <div class="user-box">                
                <input type="tel" id="tel" name="tel" required="">
                <label for="tel">Telephone</label>
            </div>
            <div class="user-box">                
                <input type="password" id="pass" name="pass" required="">
                <label for="pass">Mot de passe</label>
            </div>
            <div class="user-box">               
                <input type="password" id="confirm-password" name="confirm" required="">
                <label for="confirm-password">Confirmation de votre mot de passe</label>
            </div>

            <div class="item-center">
                <input type="submit" name="bouton" value="S'inscrire" class="form-btn">
            </div>
            
            <a href="<?= URL; ?>?p=connexion">Deja inscrit ?</a>
        </form>
    </div>
</div>

<?php
    $content = ob_get_clean(); //copie l'enregistrement dans la variable content
    $title = "Inscription";
    require('./views/layout/template-fontpage.php');
?>