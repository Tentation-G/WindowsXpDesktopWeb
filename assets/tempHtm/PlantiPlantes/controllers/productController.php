<?php
require_once('models/productModels.php');

function addProduct() {
    if (isset($_POST["bouton"])) {
        $name = $_POST["productName"];
        $image = $_POST["productImage"];
        $description = $_POST["productDescription"];
        $price = $_POST["productPrice"];
        $category_id = $_POST["productCat"];

        addProductToDB($name, $image, $description, $price, $category_id);

        header('Location: index.php?p=backOffice');
        exit();
    }

    require('views/layout/template-fontpage.php');
}