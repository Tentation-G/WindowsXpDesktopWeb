<?php



require_once 'models/productModels.php';

function addCartItem(int $user_id, int $product_id): void {
    $pdo = dbConnect();
    $sql = "UPDATE cart 
            SET quantity = quantity + 1, added_at = NOW()
            WHERE user_id = :uid AND product_id = :pid";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':uid'=>$user_id, ':pid'=>$product_id]);

    if ($stmt->rowCount() === 0) {
        $sql = "INSERT INTO cart (user_id, product_id) 
                VALUES (:uid, :pid)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':uid'=>$user_id, ':pid'=>$product_id]);
    }
}

function getCartItemsForUser(int $user_id): array {
    $pdo = dbConnect();
    $sql = "SELECT p.product_id, p.name, p.price, p.image, c.quantity,
                   (c.quantity * p.price) AS total
            FROM cart c
            JOIN products p ON p.product_id = c.product_id
            WHERE c.user_id = :uid";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':uid'=>$user_id]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function removeCartItem(int $user_id, int $product_id): void {
    $pdo = dbConnect();
    $sql = "DELETE FROM cart 
            WHERE user_id = :uid
            AND product_id = :pid";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':uid' => $user_id,
        ':pid' => $product_id,
    ]);
}