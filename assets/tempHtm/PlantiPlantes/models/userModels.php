<?php 
require('dbModels.php');

//insertion de l'inscription dans la base
function userRegister($email, $nom, $prenom, $tel, $pass, $confirm, $id_role) {
    $pdo = dbConnect();
    $pdoStatement = $pdo->prepare('INSERT INTO user (email, pass, nom, prenom, tel, id_role) VALUES (:email, :pass, :nom, :prenom, :tel, :id_role)');

    $pdoStatement->bindParam(':email', $email, PDO::PARAM_STR);
    $hashPassword = password_hash($pass, PASSWORD_BCRYPT);
    $pdoStatement->bindParam(':pass', $hashPassword, PDO::PARAM_STR);
    $pdoStatement->bindParam(':nom', $nom, PDO::PARAM_STR);
    $pdoStatement->bindParam(':prenom', $prenom, PDO::PARAM_STR);
    $pdoStatement->bindParam(':tel', $tel, PDO::PARAM_STR);
    $pdoStatement->bindValue(':id_role', 3, PDO::PARAM_INT);

    $pdoStatement->execute();
}

// Mise à jour d'un utilisateur | non utilisé atm
function updateUser($id, $email, $nom, $prenom, $tel, $pass, $id_role) {
    $pdo = dbConnect();
    $pdoStatement = $pdo->prepare('UPDATE user SET email = :email, nom = :nom, prenom = :prenom, tel = :tel, pass = :pass, id_role = :id_role WHERE id = :id');
    
    $pdoStatement->bindParam(':email', $email, PDO::PARAM_STR);
    $hashPassword = password_hash($pass, PASSWORD_BCRYPT);
    $pdoStatement->bindParam(':pass', $hashPassword, PDO::PARAM_STR);
    $pdoStatement->bindParam(':nom', $nom, PDO::PARAM_STR);
    $pdoStatement->bindParam(':prenom', $prenom, PDO::PARAM_STR);
    $pdoStatement->bindParam(':tel', $tel, PDO::PARAM_STR);
    $pdoStatement->bindParam(':id', $id, PDO::PARAM_INT);
    $pdoStatement->bindParam(':id_role', $id_role, PDO::PARAM_INT);
    
    return $pdoStatement->execute();
}

//verifiation de l'existance de l'email dans la base
function getUserByEmail($email) {
    $pdo = dbConnect();
    $pdoStatement = $pdo->prepare('SELECT * FROM user WHERE email = :email');
    $pdoStatement->bindParam(':email', $email, PDO::PARAM_STR);
    $pdoStatement->execute();

    return $pdoStatement->fetch();
}


// Récupération de tous les utilisateurs
function getAllUsers() {
    $pdo = dbConnect();
    $pdoStatement = $pdo->query('SELECT * FROM user order by id');
    return $pdoStatement->fetchAll();
}

function getAllUsersCard() {
    $pdo = dbConnect();
    $pdoStatement = $pdo->query('SELECT * FROM user order by is_connected and id_role desc');
    return $pdoStatement->fetchAll();
}

// Retourne le nombre d'utilisateurs connectés
function getAllConnectedUsers() {
    $pdo = dbConnect();
    $pdoStatement = $pdo->query('SELECT COUNT(*) as count FROM user WHERE is_connected = 1');
    $result = $pdoStatement->fetch();
    return $result['count'];
}

// Retourne le nombre d'utilisateurs connectés et actifs
function getAllConnectedActiveUsers() {
    $pdo = dbConnect();
    $pdoStatement = $pdo->query('SELECT COUNT(*) as count FROM user WHERE is_connected = 1 AND is_active = 1');
    $result = $pdoStatement->fetch();
    return $result['count'];
}

// Retourne le nombre d'utilisateurs déconnectés
function getAllDisconnectedUsers() {
    $pdo = dbConnect();
    $pdoStatement = $pdo->query('SELECT COUNT(*) as count FROM user WHERE is_connected = 0');
    $result = $pdoStatement->fetch();
    return $result['count'];
}

function getUserStatusCounts() {
    $pdo = dbConnect();
    $query = "SELECT 
                SUM(is_connected = TRUE) AS connected,
                SUM(is_connected = FALSE) AS disconnected
            FROM user";
    $stmt = $pdo->query($query);
    return $stmt->fetch();
}


// Récupération d'un utilisateur par son ID
function getUserById($id) {
    $pdo = dbConnect();
    $pdoStatement = $pdo->prepare('SELECT * FROM user WHERE id = :id');
    $pdoStatement->bindParam(':id', $id, PDO::PARAM_INT);
    $pdoStatement->execute();
    
    return $pdoStatement->fetch();
}

// Suppression d'un utilisateur
function deleteUser($id) {
    $pdo = dbConnect();
    $pdoStatement = $pdo->prepare('DELETE FROM user WHERE id = :id');
    $pdoStatement->bindParam(':id', $id, PDO::PARAM_INT);
    
    return $pdoStatement->execute();
}

// Creation de log pour Connexion et deconnexion utilisateur
function logUserAction($user_id, $action) {
    $pdo = dbConnect();
    $stmt = $pdo->prepare('INSERT INTO user_logs (user_id, action) VALUES (:user_id, :action)');
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->bindParam(':action', $action, PDO::PARAM_STR);
    $stmt->execute();
}

// Affichage des log dans le tab
function afficherLogs() {
    $pdo = dbConnect();
    $stmt = $pdo->query('SELECT * FROM user_logs JOIN user ON user_logs.user_id = user.id ORDER BY timestamp DESC');
    return $stmt->fetchAll(); // Retourne tous les logs
}

// Mise à jour de l'état de connexion à TRUE
function setUserConnected($userId) {
    $pdo = dbConnect();
    $query = "UPDATE user SET is_connected = TRUE WHERE id = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$userId]);
}
// Mise à jour de l'état de connexion à FALSE
function setUserDisconnected($userId) {
    $pdo = dbConnect();
    $query = "UPDATE user SET is_connected = FALSE WHERE id = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$userId]);
}
