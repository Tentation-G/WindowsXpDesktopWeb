<?php ob_start(); //Commence l'enregistrement  ?>


<div class="products-container">
    <div class="cards-containerBis">
    <?php foreach ($products as $product): ?>
        <div class="product-card">
        <?php 
          // fonction existante pour bâtir le chemin complet de l'image
            $img = get_image_path($product['category_id'], $product['image']);
        ?>
        <img src="<?= $img ?>" alt="<?= htmlspecialchars($product['name']) ?>" class="product-image">

        <div class="product-details">
            <h2 class="product-title"><?= htmlspecialchars($product['name']) ?></h2>
            <p class="product-description"><?= nl2br(htmlspecialchars($product['description'])) ?></p>
            <span class="product-price"><?= number_format($product['price'], 2, ',', ' ') ?> €</span>

            <!-- <button class="product-button">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i> Ajouter au panier
            </button> -->

            <form action="?p=addToCart" method="post">
                <input type="hidden" name="product_id" value="<?= $product['product_id'] ?>">
                <button type="submit" class="product-button">
                    <i class="fa fa-shopping-cart"></i> Ajouter au panier
                </button>
            </form>
        </div>
        </div>
    <?php endforeach; ?>
    </div>
</div>


<?php
    $content = ob_get_clean(); //copie l'enregistrement dans la variable content
    $title = "home";
    require('./views/layout/template-fontpage.php');
?>