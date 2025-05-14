<?php
require_once('models/productModels.php');

function home() {

    $products = getRandomProducts(13);
    require('views/home/home.php');
}

function homeFleurs() {

    $products = getAllFleurs();
    require('views/home/fleur.php');
}

function homeTables() {

    $products = getAllTables();
    require('views/home/fleur.php');
}

function homeVelos() {

    $products = getAllVelos();
    require('views/home/fleur.php');
}

?>