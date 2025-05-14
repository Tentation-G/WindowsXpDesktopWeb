<?php
require('../../models/userModels.php');
require('../../core\function.php');


session_start();
if (isAdmin()) {
    if (isset($_GET['id']) && is_numeric($_GET['id'])) {
        $userId = $_GET['id'];
        if (deleteUser($userId)) {
            $_SESSION['message'] = "Utilisateur supprimé avec succès.";
        } else {
            $_SESSION['message'] = "Erreur lors de la suppression de l'utilisateur.";
        }
    }
} else {
    $_SESSION['message'] = "Vous n'avez pas les droit de supprimer un Utilisateur.";
}
header('Location: ../../?p=backOffice');
exit();
