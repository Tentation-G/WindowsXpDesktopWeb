<?php ob_start(); //Commence l'enregistrement 

/////////////////////////////////////
// ANCIENNE PAGE DE TEST / BACKUP //
///////////////////////////////////

?>



<div class="home-container">

    <div class="card-lil-wrapper1">
        <?php for ($i = 0; $i < 3; $i++): ?>
            <div class="product-card">
                <img src="assets/images/<?php echo $products[$i]['image']; ?>" alt="Produit" class="product-image">
                <div class="product-details">
                    <h2 class="product-title"><?php echo $products[$i]['name']; ?></h2>
                    <p class="product-description"><?php echo $products[$i]['description']; ?></p>
                    <p class="product-price">€<?php echo number_format($products[$i]['price'], 2); ?></p>
                    <button class="product-button">Ajouter au panier</button>
                </div>
            </div>
        <?php endfor; ?>
    </div>

    <div class="card-lil-wrapper2">
        <div class="product-card2">
            <img src="assets/images/<?php echo $products[3]['image']; ?>" alt="Produit" class="product-image">
            <div class="product-details">
                <h2 class="product-title"><?php echo $products[3]['name']; ?></h2>
                <p class="product-description"><?php echo $products[3]['description']; ?></p>
                <p class="product-price">€<?php echo number_format($products[3]['price'], 2); ?></p>
                <button class="product-button">Ajouter au panier</button>
            </div>
        </div>
        <div class="product-card">
            <img src="assets/images/<?php echo $products[4]['image']; ?>" alt="Produit" class="product-image">
            <div class="product-details">
                <h2 class="product-title"><?php echo $products[4]['name']; ?></h2>
                <p class="product-description"><?php echo $products[4]['description']; ?></p>
                <p class="product-price">€<?php echo number_format($products[4]['price'], 2); ?></p>
                <button class="product-button">Ajouter au panier</button>
            </div>
        </div>
    </div>

    <div class="card-lil-wrapper4">
        <div class="product-card3">
            <img src="assets/images/fleurs/rose" alt="Produit" class="product-image">
            <div class="product-details">
                <h2 class="product-title">Titre du Produit</h2>
                <p class="product-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, natus.</p>
                <p class="product-price">€19.99</p>
                <button class="product-button">Ajouter au panier</button>
            </div>
        </div>
    </div>

    <div class="card-lil-wrapper3">
        <div class="product-card">
            <img src="assets/images/<?php echo $products[5]['image']; ?>" alt="Produit" class="product-image">
            <div class="product-details">
                <h2 class="product-title"><?php echo $products[5]['name']; ?></h2>
                <p class="product-description"><?php echo $products[5]['description']; ?></p>
                <p class="product-price">€<?php echo number_format($products[5]['price'], 2); ?></p>
                <button class="product-button">Ajouter au panier</button>
            </div>
        </div>
        <div class="product-card2">
            <img src="assets/images/<?php echo $products[6]['image']; ?>" alt="Produit" class="product-image">
            <div class="product-details">
                <h2 class="product-title"><?php echo $products[6]['name']; ?></h2>
                <p class="product-description"><?php echo $products[6]['description']; ?></p>
                <p class="product-price">€<?php echo number_format($products[6]['price'], 2); ?></p>
                <button class="product-button">Ajouter au panier</button>
            </div>
        </div>
    </div>

    <div class="card-lil-wrapper1">
        <?php for ($i = 7; $i < 10; $i++): ?>
            <div class="product-card">
                <img src="assets/images/<?php echo $products[$i]['image']; ?>" alt="Produit" class="product-image">
                <div class="product-details">
                    <h2 class="product-title"><?php echo $products[$i]['name']; ?></h2>
                    <p class="product-description"><?php echo $products[$i]['description']; ?></p>
                    <p class="product-price">€<?php echo number_format($products[$i]['price'], 2); ?></p>
                    <button class="product-button">Ajouter au panier</button>
                </div>
            </div>
        <?php endfor; ?>
    </div>

</div>

<?php
    $content = ob_get_clean(); //copie l'enregistrement dans la variable content
    $title = "card";
    require('./views/layout/template-fontpage.php');
?>