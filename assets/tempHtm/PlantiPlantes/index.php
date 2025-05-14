<?php 
require ('core/config.php');
require ('core/function.php');
//require ('core/debug.php');

require('controllers/userController.php');
require('controllers/adminController.php');
require('controllers/homeController.php');
require('controllers/cartController.php');

//http://localhost/projet/plantes-mvc/?p=inscription
if(isset($_GET['p'])){

    switch ($_GET['p']) {
        // Sign in / log in / log out
        case 'inscription':
                inscription();
            break;
        case 'connexion':
                connexion();
            break;
        case 'deconnexion':
                deconnexion();
            break;
        
        // User
        case 'compte':
                compte();
            break;
        
        // home pages
        case 'home':
                home();
            break;
        case 'homeFleurs':
                homeFleurs();
            break;
        case 'homeTables':
                homeTables();
            break;
        case 'homeVelos':
                homeVelos();
            break;
        
        // Panier
        case 'addToCart':
            addToCart();
            break;
        
        case 'cart':
            viewCart();
            break;
        
        case 'removeFromCart':
            removeFromCart();
            break;
        
        // admin
        case 'backOffice':
                backOffice();
            break;
        case 'addProduct':
                addProduct();
            break;
        
        default:
                //page404();
                home();
            break;
    }
    
}else{
    //echo "Aucun paramètre d'url défini";
    home();
}

?>