<?php
require_once('models/productModels.php');
require_once('models/cartModels.php');

function addToCart() {
    if (isConnect()) {
        $uid = (int)$_SESSION['user']['id'];
        if (!empty($_POST['product_id'])) {
            addCartItem($uid, (int)$_POST['product_id']);
        }
        header('Location: ?p=cart');
        exit;
    }  else {
        header('Location: ?p=connexion');
    }
}

function viewCart() {
    $uid   = (int)$_SESSION['user']['id'];
    $items = getCartItemsForUser($uid);
    require('views/home/cart.php');
}

function removeFromCart() {
    if (isConnect()) {
        $uid = (int)$_SESSION['user']['id'];
        if (!empty($_GET['product_id'])) {
            removeCartItem($uid, (int)$_GET['product_id']);
        }
        header('Location: ?p=cart');
        exit;
    } else {
        header('Location: ?p=connexion');
        exit;
    }
}
