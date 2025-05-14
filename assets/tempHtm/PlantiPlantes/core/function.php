<?php
// isConnect() permet de savoir si un utilisateur est connecté au site 
function isConnect(): bool
{
    if (isset($_SESSION["user"])) {
        return true;
    } else {
        return false;
    }
}

// isAdmin() permet de savoir si la personne est admin ou pas
function isAdmin(): bool
{
    if ( isConnect() && $_SESSION["user"]['id_role']==1) {
        return true;
    } else {
        return false;
    }
} 

function isMod(): bool
{
    if ( isConnect() && $_SESSION["user"]['id_role']==2) {
        return true;
    } else {
        return false;
    }
}

// Détermine le chemin en fonction de la catégorie
function get_image_path($category_id, $image_name) {
    switch ($category_id) {
        case 1:
            $image_path = "assets/images/fleurs/";
            break;
        case 2:
            $image_path = "assets/images/tables/";
            break;
        case 3:
            $image_path = "assets/images/velos/";
            break;
        default:
            $image_path = "assets/images/";
            break;
    }
    return $image_path . $image_name;
}
