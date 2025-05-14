<?php 
require('models/userModels.php');
function inscription() {
    if(isset($_POST["bouton"])){
        $email      = $_POST["email"];
        $nom        = $_POST["nom"];
        $prenom     = $_POST["prenom"];
        $tel        = $_POST["tel"];
        $pass       = $_POST["pass"];
        $confirm    = $_POST["confirm"];
        $id_role    = 3;

        $errors = [];

        $errors = isValidFields($email, $nom, $prenom, $tel, $pass, $confirm);

        //si erreurs pas d'envoie des datas du form
        if(count($errors) == 0){
            userRegister($email, $nom, $prenom, $tel,$pass, $confirm, $id_role);

            // Connexion de l'utilisateur
            $user = getUserByEmail($email); // Récupérer l'utilisateur nouvellement inscrit
            if ($user) {
                // Démarrer la session et stocker les informations de l'utilisateur
                $_SESSION['user'] = [
                    'id' => $user['id'],
                    'user_id' => $user['id'],
                    'email' => $user['email'],
                    'nom' => $user['nom'],
                    'prenom' => $user['prenom'],
                    'tel' => $user['tel'],
                    'id_role' => $user['id_role']
                ];
            }
            // Redirection backOffice si Admin Sinon Home
            if (isAdmin()) {
                header('Location:?p=backOffice');
            }
            else {
                header('Location: index.php');
            }  
        }

        
    }
    require('views/user/inscriptionView.php');
}

//verif si les champs sont valide 
function isValidFields($email, $nom, $prenom, $tel, $pass, $confirm) {
    $errors = [];

    // Validation de l'email
    if (empty($email)) {
        $errors[] = "Le champ Email est requis.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "L'email n'est pas valide.";
    } else {
        $user = getUserByEmail($email);
        if ($user) {
            $errors[] = "Cet email est déjà associé à un compte.";
        }
    }

    // Validation du nom
    if (empty($nom)) {
        $errors[] = "Le champ Nom est requis.";
    }

    // Validation du prénom
    if (empty($prenom)) {
        $errors[] = "Le champ Prénom est requis.";
    }

    // Validation du téléphone
    if (empty($tel)) {
        $errors[] = "Le champ Téléphone est requis.";
    } elseif (!preg_match("/^\+?[0-9]{10,15}$/", $tel)) {
        $errors[] = "Numéro de Téléphone invalide.";
    }

    // Validation du mot de passe
    if (empty($pass)) {
        $errors[] = "Le champ Mot de passe est requis.";
    // } elseif (strlen($pass) < 8) {
    //     $errors[] = "Le mot de passe doit contenir au moins 8 caractères.";
    // } elseif (!preg_match("/[A-Z]/", $pass) || !preg_match("/[a-z]/", $pass) || !preg_match("/[0-9]/", $pass) || !preg_match("/[\W]/", $pass)) {
    //     $errors[] = "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.";
    }

    // Validation de la confirmation du mot de passe
    if (empty($confirm)) {
        $errors[] = "Le champ Confirmation du mot de passe est requis.";
    } elseif ($pass !== $confirm) {
        $errors[] = "Les mots de passe ne correspondent pas.";
    }

    return $errors;
}


function connexion() {
    //clear le tab de débug
    //$_SESSION = array();

    if (isset($_POST["bouton"])) {
        $email = $_POST["email"];
        $pass = $_POST["pass"];

        $errors = [];

        // verif si les champs sont vide
        if (empty($email)) {
            $errors[] = "Le champ Email est requis.";
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors[] = "L'email n'est pas valide.";
        }
        if (empty($pass)) {
            $errors[] = "Le champ Mot de passe est requis.";
        }

        //si pas d'erreur => tentative de connexion 
        if (count($errors) == 0) {
            // Verif si l'email existe dans la base
            $user = getUserByEmail($email);
            if ($user) {
                // Verif si le mdp est le bon
                if (password_verify($pass, $user['pass'])) {

                    // start + stock les info si le rest est good
                    $_SESSION['user'] = [
                        'id' => $user['id'],
                        'user_id' => $user['id'],
                        'email' => $user['email'],
                        'nom' => $user['nom'],
                        'prenom' => $user['prenom'],
                        'tel' => $user['tel'],
                        'id_role' => $user['id_role']
                    ];
                    // Redirection backOffice si Admin Sinon Home
                    if (isAdmin() or isMod()) {
                        $_SESSION['message'] = "Vous êtes bien connecté.";
                        header('Location:?p=backOffice');
                    }
                    else {
                        $_SESSION['message'] = "Vous êtes bien connecté.";
                        header('Location: index.php');
                    }
                    exit(); //javais oublié ca, dcp il n'y avait pas de message dans message 
                } else {
                    $errors[] = "Email ou Mot de passe incorrect.";
                }
            } else {
                $errors[] = "Email ou Mot de passe incorrect.";
            }
        }
    }

    require('views/user/connexionView.php');
}

function deconnexion() {
    // Supprime la session utilisateur
    unset($_SESSION['user']);
    $_SESSION['message'] = "Vous êtes bien déconnecté.";

    // Redirection vers la page d'accueil
    header("location:" . URL . "index.php");
    exit();
}

function compte() {
    require('views/user/compte.php');
}

?>